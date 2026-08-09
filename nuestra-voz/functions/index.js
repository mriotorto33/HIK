const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
const axios = require("axios");
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");

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
      name: "projects/nuestravoz-uy/secrets/instagram-login-token/versions/latest",
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

async function publishToInstagram(text, imageUrl) {
  if (!imageUrl) {
    console.warn("⚠️ [publishToInstagram] Instagram requiere imagen. Se omite publicación en IG (solo texto no soportado).");
    return null;
  }
  const token = await getInstagramToken();
  const base = `https://graph.instagram.com/${GRAPH_API_VERSION}/${INSTAGRAM_LOGIN_USER_ID}`;
  console.log(`🚀 [publishToInstagram] Creando contenedor de media para User ID ${INSTAGRAM_LOGIN_USER_ID}...`);
  
  let containerId;
  try {
    const container = await axios.post(`${base}/media`, null, {
      params: { image_url: imageUrl, caption: text, access_token: token },
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
            const ig = await publishToInstagram(text, data.imagenUrl || null);
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
      name: "projects/nuestravoz-uy/secrets/instagram-login-token/versions/latest",
    });
    const currentToken = version.payload.data.toString().trim();

    const res = await axios.get("https://graph.instagram.com/refresh_access_token", {
      params: { grant_type: "ig_refresh_token", access_token: currentToken },
    });

    await secretClient.addSecretVersion({
      parent: "projects/nuestravoz-uy/secrets/instagram-login-token",
      payload: { data: Buffer.from(res.data.access_token) },
    });
    console.log("✅ Token de Instagram renovado exitosamente, vence en", res.data.expires_in, "segundos");
  } catch (error) {
    const formattedError = formatMetaError(error, "refreshInstagramToken");
    console.error("❌ Error al renovar token de Instagram:", formattedError);
  }
});
