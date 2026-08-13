const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "nuestravoz-uy.firebasestorage.app"
});

const bucket = admin.storage().bucket();

async function deleteAll() {
  const [files] = await bucket.getFiles();
  console.log(`Found ${files.length} files to delete...`);
  for (const file of files) {
    await file.delete();
    console.log(`Deleted: ${file.name}`);
  }
  console.log("Done!");
}

deleteAll().catch(console.error);
