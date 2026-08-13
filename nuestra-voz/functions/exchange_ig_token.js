/**
 * exchange_ig_token.js — Intercambia un token momentáneo de Instagram (1h)
 * por uno de larga duración (60 días) y lo guarda en Secret Manager.
 *
 * Uso:
 *   node exchange_ig_token.js <SHORT_LIVED_TOKEN> <APP_SECRET>
 *
 * El token resultante se renueva automáticamente cada 7 días
 * por la Cloud Function `refreshInstagramToken`.
 */

const axios = require("axios");

async function exchangeToken(shortToken, appSecret) {
  console.log("🔄 Intercambiando token momentáneo por token de 60 días...\n");

  try {
    // Paso 1: Exchange short-lived → long-lived
    const res = await axios.get("https://graph.instagram.com/access_token", {
      params: {
        grant_type: "ig_exchange_token",
        client_secret: appSecret,
        access_token: shortToken,
      },
    });

    const longToken = res.data.access_token;
    const expiresIn = res.data.expires_in; // ~5184000 (60 días en segundos)

    console.log("✅ Token de 60 días obtenido exitosamente!");
    console.log(`   Expira en: ${Math.round(expiresIn / 86400)} días`);
    console.log(`   Token (primeros 20 chars): ${longToken.substring(0, 20)}...`);
    console.log("");

    // Paso 2: Verificar que funciona
    console.log("🔍 Verificando token contra la API...");
    const me = await axios.get("https://graph.instagram.com/me", {
      params: {
        fields: "id,username",
        access_token: longToken,
      },
    });
    console.log(`   ✅ Cuenta verificada: @${me.data.username} (ID: ${me.data.id})`);
    console.log("");

    // Paso 3: Guardar en Secret Manager (si estamos en GCP)
    try {
      const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
      const client = new SecretManagerServiceClient();

      await client.addSecretVersion({
        parent: "projects/nuestravoz-uy/secrets/INSTAGRAM_LOGIN_TOKEN",
        payload: { data: Buffer.from(longToken) },
      });
      console.log("🔐 Token guardado en Secret Manager (INSTAGRAM_LOGIN_TOKEN)");
    } catch (smErr) {
      console.warn(`⚠️  No se pudo guardar en Secret Manager: ${smErr.message}`);
      console.log("   Guardalo manualmente con:");
      console.log(`   gcloud secrets versions add INSTAGRAM_LOGIN_TOKEN --data-file=- --project=nuestravoz-uy <<< "${longToken}"`);
    }

    // Paso 4: También actualizar el .env local
    console.log("");
    console.log("📝 Para actualizar el .env local, copiá esta línea:");
    console.log(`INSTAGRAM_LOGIN_ACCESS_TOKEN=${longToken}`);
    console.log("");
    console.log("═══════════════════════════════════════════════════════════");
    console.log("TOKEN COMPLETO (copiá si necesitás guardarlo manualmente):");
    console.log("═══════════════════════════════════════════════════════════");
    console.log(longToken);
    console.log("═══════════════════════════════════════════════════════════");

    return longToken;
  } catch (error) {
    if (error.response?.data?.error) {
      const e = error.response.data.error;
      console.error(`❌ Error Meta API (Code ${e.code}): ${e.message}`);
      if (e.code === 190) {
        console.error("   → El token momentáneo ya expiró. Generá uno nuevo desde:");
        console.error("   → https://developers.facebook.com/tools/explorer/");
      }
    } else {
      console.error("❌ Error:", error.message);
    }
    process.exit(1);
  }
}

// ── Main ──
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║  Exchange Instagram Token — Nuestra Voz                  ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║  Uso:                                                     ║
║    node exchange_ig_token.js <TOKEN_MOMENTÁNEO> <APP_SECRET>║
║                                                           ║
║  Cómo obtener cada uno:                                   ║
║                                                           ║
║  TOKEN_MOMENTÁNEO:                                        ║
║    1. Ir a developers.facebook.com/tools/explorer          ║
║    2. Seleccionar tu app de Instagram                      ║
║    3. Click "Generate Access Token"                        ║
║    4. Autorizar los permisos                               ║
║    5. Copiar el token                                      ║
║                                                           ║
║  APP_SECRET:                                              ║
║    1. Ir a developers.facebook.com                        ║
║    2. Tu App → Configuración → Básica                     ║
║    3. Copiar "Clave secreta de la aplicación"             ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
  process.exit(0);
}

exchangeToken(args[0], args[1]);
