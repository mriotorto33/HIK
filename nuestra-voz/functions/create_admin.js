const admin = require("firebase-admin");
// No args needed for initializeApp if running locally via Firebase CLI with credentials or emulators
admin.initializeApp({
  projectId: "nuestravoz-uy"
});

async function createAdmin() {
  const email = "cecilia@nuestravoz.uy";
  const password = "Password123!";
  
  try {
    console.log(`Intentando crear usuario ${email}...`);
    const user = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: "Cecilia",
    });
    console.log("Usuario creado con éxito. UID:", user.uid);
    
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log("¡Custom claim de 'admin' asignado correctamente!");
    process.exit(0);
  } catch (error) {
    if (error.code === 'auth/email-already-exists') {
      console.log("El usuario ya existe. Asignando claim de admin...");
      const user = await admin.auth().getUserByEmail(email);
      await admin.auth().setCustomUserClaims(user.uid, { admin: true });
      console.log("¡Custom claim de 'admin' asignado correctamente al usuario existente!");
      process.exit(0);
    } else {
      console.error("Error inesperado:", error);
      process.exit(1);
    }
  }
}

createAdmin();
