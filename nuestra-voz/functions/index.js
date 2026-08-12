const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
const axios = require("axios");
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
const sharp = require("sharp");
const path = require("path");
const os = require("os");
const fs = require("fs");

admin.initializeApp();
let secretClient = null;

const GRAPH_API_VERSION = "v21.0";
const META_PAGE_ID = process.env.META_PAGE_ID;
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const INSTAGRAM_LOGIN_USER_ID = process.env.INSTAGRAM_LOGIN_USER_ID;

/**
 * Formatea errores de Meta API / HTTP con contexto detallado
 */
function formatMetaError(error, serviceName) {
  if (error.response && error.response.data && error.response.data.error) {
    const errObj = error.response.data.error;
    const subcodeStr = errObj.error_subcode ? ` / Subcode ${errObj.error_subcode}` : "";
    return `[${serviceName}] Error Meta API (Code ${errObj.code}${subcodeStr}): ${errObj.message} (Type: ${errObj.type})`;
  }
  if (error.response) {
    return `[${serviceName}] Error HTTP ${error.response.status}: ${JSON.stringify(error.response.data)}`;
  }
  return `[${serviceName}] Error de red/sistema: ${error.message}`;
}

/**
 * Obtiene el token de IG desde Secret Manager, con fallback a process.env
 */
async function getInstagramToken() {
  if (!secretClient) {
    const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
    secretClient = new SecretManagerServiceClient();
  }
  try {
    const [version] = await secretClient.accessSecretVersion({
      name: "projects/nuestravoz-uy/secrets/INSTAGRAM_LOGIN_TOKEN/versions/latest",
    });
    const token = version.payload.data.toString().trim();
    console.log("🔑 [getInstagramToken] Token obtenido exitosamente desde Secret Manager (instagram-login-token).");
    return token;
  } catch (error) {
    console.warn(`⚠️ [getInstagramToken] No se pudo leer instagram-login-token de Secret Manager (${error.message}). Usando fallback de process.env.INSTAGRAM_LOGIN_ACCESS_TOKEN.`);
    const envToken = process.env.INSTAGRAM_LOGIN_ACCESS_TOKEN;
    if (!envToken) {
      console.error("❌ [getInstagramToken] CRÍTICO: No hay token disponible ni en Secret Manager ni en process.env.INSTAGRAM_LOGIN_ACCESS_TOKEN.");
    } else {
      console.log("🔑 [getInstagramToken] Usando token desde variable de entorno process.env.INSTAGRAM_LOGIN_ACCESS_TOKEN.");
    }
    return envToken;
  }
}

/**
 * Descarga una imagen, la recorta a 1:1 (cuadrado) si el aspect ratio está
 * fuera del rango válido de Instagram (4:5 a 1.91:1), y la sube de vuelta
 * a Firebase Storage. Retorna la nueva URL pública.
 * Si la imagen ya está dentro del rango aceptado, retorna la URL original.
 */
async function prepareImageForInstagram(imageUrl, pubId) {
  console.log(`📏 [prepareImageForInstagram] Verificando aspect ratio de: ${imageUrl}`);

  // Descargar imagen
  let imageBuffer;
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer", timeout: 30000 });
    imageBuffer = Buffer.from(response.data);
  } catch (err) {
    console.warn(`⚠️ [prepareImageForInstagram] No se pudo descargar la imagen: ${err.message}. Usando URL original.`);
    return imageUrl;
  }

  // Obtener metadatos
  const meta = await sharp(imageBuffer).metadata();
  const { width, height } = meta;
  if (!width || !height) {
    console.warn("⚠️ [prepareImageForInstagram] No se pudieron obtener dimensiones. Usando URL original.");
    return imageUrl;
  }

  const ratio = width / height;
  const MIN_RATIO = 4 / 5;   // 0.8  (portrait máximo)
  const MAX_RATIO = 1.91;    // landscape máximo

  console.log(`📐 [prepareImageForInstagram] Dimensiones: ${width}x${height} | Ratio: ${ratio.toFixed(3)} | Rango IG: [${MIN_RATIO}, ${MAX_RATIO}]`);

  if (ratio >= MIN_RATIO && ratio <= MAX_RATIO) {
    console.log("✅ [prepareImageForInstagram] Ratio dentro del rango de Instagram. No se necesita recorte.");
    return imageUrl;
  }

  // Recortar al cuadrado máximo posible (centrado)
  console.log(`✂️ [prepareImageForInstagram] Ratio fuera de rango (${ratio.toFixed(3)}). Recortando a cuadrado 1:1 centrado...`);
  const size = Math.min(width, height);
  const left = Math.floor((width - size) / 2);
  const top  = Math.floor((height - size) / 2);

  let croppedBuffer;
  try {
    croppedBuffer = await sharp(imageBuffer)
      .extract({ left, top, width: size, height: size })
      .jpeg({ quality: 92 })
      .toBuffer();
  } catch (err) {
    console.warn(`⚠️ [prepareImageForInstagram] Error al recortar: ${err.message}. Usando URL original.`);
    return imageUrl;
  }

  // Subir imagen recortada a Firebase Storage
  try {
    const bucket = admin.storage().bucket();
    const destPath = `publicaciones/${pubId}_ig_square.jpg`;
    const file = bucket.file(destPath);
    await file.save(croppedBuffer, { metadata: { contentType: "image/jpeg" } });
    await file.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destPath}`;
    console.log(`🖼️ [prepareImageForInstagram] Imagen cuadrada subida exitosamente: ${publicUrl}`);
    return publicUrl;
  } catch (err) {
    console.warn(`⚠️ [prepareImageForInstagram] Error al subir imagen recortada: ${err.message}. Usando URL original.`);
    return imageUrl;
  }
}

async function publishToFacebookPage(text, imageUrl) {
  const base = `https://graph.facebook.com/${GRAPH_API_VERSION}/${META_PAGE_ID}`;
  console.log(`🚀 [publishToFacebookPage] Publicando en Page ID ${META_PAGE_ID}... (Imagen: ${imageUrl ? "Sí" : "No"})`);
  try {
    let res;
    if (imageUrl) {
      res = await axios.post(`${base}/photos`, null, {
        params: { url: imageUrl, caption: text, access_token: META_ACCESS_TOKEN },
      });
    } else {
      res = await axios.post(`${base}/feed`, null, {
        params: { message: text, access_token: META_ACCESS_TOKEN },
      });
    }
    console.log(`✅ [publishToFacebookPage] Publicado exitosamente. Post ID: ${res.data.id || res.data.post_id}`);
    return res.data;
  } catch (error) {
    const formattedError = formatMetaError(error, "Facebook");
    console.error(formattedError);
    throw new Error(formattedError);
  }
}

async function publishToInstagram(text, imageUrl, pubId) {
  if (!imageUrl) {
    console.warn("⚠️ [publishToInstagram] Instagram requiere imagen. Se omite publicación en IG (solo texto no soportado).");
    return null;
  }

  // Auto-corregir aspect ratio antes de publicar
  const safeImageUrl = await prepareImageForInstagram(imageUrl, pubId || "tmp");

  const token = await getInstagramToken();
  const base = `https://graph.instagram.com/${GRAPH_API_VERSION}/${INSTAGRAM_LOGIN_USER_ID}`;
  console.log(`🚀 [publishToInstagram] Creando contenedor de media para User ID ${INSTAGRAM_LOGIN_USER_ID}...`);
  console.log(`🖼️ [publishToInstagram] URL de imagen a usar: ${safeImageUrl}`);
  
  let containerId;
  try {
    const container = await axios.post(`${base}/media`, null, {
      params: { image_url: safeImageUrl, caption: text, access_token: token },
    });
    containerId = container.data.id;
    console.log(`📦 [publishToInstagram] Contenedor creado exitosamente. ID: ${containerId}`);
  } catch (error) {
    const formattedError = formatMetaError(error, "Instagram Container");
    console.error(formattedError);
    throw new Error(formattedError);
  }

  // Instagram requiere unos segundos para procesar la imagen antes de publicarla
  console.log("⏳ [publishToInstagram] Esperando 10 segundos a que Instagram procese la imagen...");
  await new Promise(resolve => setTimeout(resolve, 10000));

  try {
    const publish = await axios.post(`${base}/media_publish`, null, {
      params: { creation_id: containerId, access_token: token },
    });
    console.log(`✅ [publishToInstagram] Publicado exitosamente en Instagram. Post ID: ${publish.data.id}`);
    return publish.data;
  } catch (error) {
    const formattedError = formatMetaError(error, "Instagram Publish");
    console.error(formattedError);
    throw new Error(formattedError);
  }
}

/**
 * Triggered on onCreate/onUpdate (onWrite) when a publication's status is "Publicado en Redes".
 */
exports.publishToMeta = functions.firestore
    .document("publicaciones/{pubId}")
    .onWrite(async (change, context) => {
      // Ignorar si el documento fue eliminado
      if (!change.after.exists) return null;

      const data = change.after.data();
      const pubId = context.params.pubId;

      if (data.estado === "Publicado en Redes") {
        const fbAlreadyDone = data.fbStatus === "success";
        const igAlreadyDone = data.igStatus === "success" || data.igStatus === "skipped_no_image";

        if (fbAlreadyDone && igAlreadyDone) {
          console.log(`ℹ️ [publishToMeta] Publicación ${pubId} ya enviada previamente a todas las redes Meta. Omitiendo.`);
          return null;
        }

        console.log(`\n🔔 [publishToMeta] Procesando publicación ID: ${pubId} ("${data.titulo}")`);
        const text = `${data.titulo}\n\n${data.texto}\n\nOperador: ${data.operadorNombre || "Nuestra Voz"}`;
        const updates = {};
        const canales = data.canales || [];

        // Evaluar publicación en Facebook
        if (canales.includes("Facebook") && !fbAlreadyDone) {
          try {
            const fb = await publishToFacebookPage(text, data.imagenUrl || null);
            updates.fbStatus = "success";
            updates.fbPostId = fb.id || fb.post_id || null;
            updates.fbError = admin.firestore.FieldValue.delete();
          } catch (error) {
            updates.fbStatus = "error";
            updates.fbError = error.message;
          }
        }

        // Evaluar publicación en Instagram
        if (canales.includes("Instagram") && !igAlreadyDone) {
          try {
            const ig = await publishToInstagram(text, data.imagenUrl || null, pubId);
            updates.igStatus = ig ? "success" : "skipped_no_image";
            updates.igPostId = ig ? ig.id : null;
            updates.igError = admin.firestore.FieldValue.delete();
          } catch (error) {
            updates.igStatus = "error";
            updates.igError = error.message;
          }
        }

        updates.metaSyncDate = admin.firestore.FieldValue.serverTimestamp();
        await change.after.ref.update(updates);
      }

      return null;
    });

/**
 * Pub/Sub Cron Job para renovar el token de Instagram automáticamente.
 * Corre cada 168 horas (7 días).
 */
exports.refreshInstagramToken = functions.pubsub.schedule("every 168 hours").onRun(async () => {
  if (!secretClient) {
    const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
    secretClient = new SecretManagerServiceClient();
  }
  try {
    const [version] = await secretClient.accessSecretVersion({
      name: "projects/nuestravoz-uy/secrets/INSTAGRAM_LOGIN_TOKEN/versions/latest",
    });
    const currentToken = version.payload.data.toString().trim();

    const res = await axios.get("https://graph.instagram.com/refresh_access_token", {
      params: { grant_type: "ig_refresh_token", access_token: currentToken },
    });

    await secretClient.addSecretVersion({
      parent: "projects/nuestravoz-uy/secrets/INSTAGRAM_LOGIN_TOKEN",
      payload: { data: Buffer.from(res.data.access_token) },
    });
    console.log("✅ Token de Instagram renovado exitosamente, vence en", res.data.expires_in, "segundos");
  } catch (error) {
    const formattedError = formatMetaError(error, "refreshInstagramToken");
    console.error("❌ Error al renovar token de Instagram:", formattedError);
  }
});
