
const axios = require('axios');

const GRAPH_API_VERSION = "v21.0";
const META_PAGE_ID = process.env.META_PAGE_ID;
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const INSTAGRAM_LOGIN_USER_ID = process.env.INSTAGRAM_LOGIN_USER_ID;
const INSTAGRAM_LOGIN_ACCESS_TOKEN = process.env.INSTAGRAM_LOGIN_ACCESS_TOKEN;

async function publishToFacebookPage(text, imageUrl) {
  const base = `https://graph.facebook.com/${GRAPH_API_VERSION}/${META_PAGE_ID}`;
  console.log("➡️ Publicando en Facebook Page...");
  const res = await axios.post(`${base}/photos`, null, {
    params: { url: imageUrl, caption: text, access_token: META_ACCESS_TOKEN },
  });
  return res.data;
}

async function publishToInstagram(text, imageUrl) {
  console.log("➡️ Publicando en Instagram...");
  const base = `https://graph.instagram.com/${GRAPH_API_VERSION}/${INSTAGRAM_LOGIN_USER_ID}`;
  
  console.log("   Paso 1: Creando contenedor en IG...");
  const container = await axios.post(`${base}/media`, null, {
    params: { image_url: imageUrl, caption: text, access_token: INSTAGRAM_LOGIN_ACCESS_TOKEN },
  });
  
  console.log("   Paso 2: Publicando contenedor IG...");
  const publish = await axios.post(`${base}/media_publish`, null, {
    params: { creation_id: container.data.id, access_token: INSTAGRAM_LOGIN_ACCESS_TOKEN },
  });
  
  return publish.data;
}

async function runTest() {
  const imageUrl = "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  const text = "PRUEBA AUTOMÁTICA FINAL (FB e IG)\n\nPipeline actualizado y funcionando.";

  try {
    const fbResult = await publishToFacebookPage(text, imageUrl);
    console.log("✅ Facebook Exitoso! ID:", fbResult.id || fbResult.post_id);
  } catch (err) {
    console.error("❌ Error en Facebook:", err.response ? JSON.stringify(err.response.data, null, 2) : err.message);
  }

  try {
    const igResult = await publishToInstagram(text, imageUrl);
    console.log("✅ Instagram Exitoso! ID:", igResult.id);
  } catch (err) {
    console.error("❌ Error en Instagram:", err.response ? JSON.stringify(err.response.data, null, 2) : err.message);
  }
}

runTest();
