/* ============================================================
   NUESTRA VOZ — Firebase Integration
   Auth + Firestore + Storage
   ============================================================ */

// ── Firebase Config ────────────────────────────────────────
// IMPORTANTE: Reemplazar con los valores reales de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDRIsJDO2zM1E2WK8tmOykVf47VKq1cqDI",
  authDomain: "nuestravoz-uy.firebaseapp.com",
  projectId: "nuestravoz-uy",
  storageBucket: "nuestravoz-uy.firebasestorage.app",
  messagingSenderId: "499775575806",
  appId: "1:499775575806:web:d758b5e7e09743cff377af",
  measurementId: "G-FEJBF5YN9Z"
};

// Global Firebase instances
var app, auth, db, storage;

// Auto-initialize Firebase if SDK is present
if (typeof firebase !== 'undefined') {
  if (!firebase.apps || !firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app();
  }
  auth = firebase.auth();
  db = firebase.firestore();
  storage = firebase.storage();
}

function initFirebase() {
  if (typeof firebase === 'undefined') {
    console.warn('Firebase SDK no cargado. Upload deshabilitado.');
    return false;
  }
  if (!firebase.apps || !firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app();
  }
  auth = firebase.auth();
  db = firebase.firestore();
  storage = firebase.storage();

  // Listen to auth state
  auth.onAuthStateChanged(user => {
    updateUIForAuth(user);
  });

  return true;
}

// ── Auth ────────────────────────────────────────────────────
async function registerOperator(email, password, profile) {
  try {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    const uid = cred.user.uid;

    // Save profile in Firestore
    await db.collection('operadores').doc(uid).set({
      nombre: profile.nombre,
      email: email,
      telefono: profile.telefono,
      especialidad: profile.especialidad,
      plan: profile.plan,
      creadoEn: firebase.firestore.FieldValue.serverTimestamp(),
      estado: 'pendiente_pago',
      canales: {},
      publicaciones: 0,
    });

    return { success: true, uid };
  } catch (err) {
    console.error('Error en registro:', err);
    return { success: false, error: getAuthError(err.code) };
  }
}

async function loginOperator(email, password) {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    return { success: true };
  } catch (err) {
    return { success: false, error: getAuthError(err.code) };
  }
}

async function loginWithGoogle() {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const result = await auth.signInWithPopup(provider);
    const gUser  = result.user;

    const nombre = gUser.displayName || gUser.email.split('@')[0];
    const email  = gUser.email;
    const foto   = gUser.photoURL || '';
    const uid    = gUser.uid;

    // Upsert en Firestore
    await db.collection('operadores').doc(uid).set({
      nombre, email, foto,
      telefono:     '',
      especialidad: '',
      plan:         'profesional',
      estado:       'pendiente_pago',
      creadoEn:     firebase.firestore.FieldValue.serverTimestamp(),
      actualizadoEn: firebase.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });

    return { success: true, uid, nombre, email, foto };
  } catch (err) {
    console.error('loginWithGoogle error:', err);
    return { success: false, error: getAuthError(err.code) || err.message };
  }
}

function logoutOperator() {
  return auth.signOut();
}

function getAuthError(code) {
  const errors = {
    'auth/email-already-in-use': 'Este email ya está registrado.',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
    'auth/invalid-email': 'Email inválido.',
    'auth/user-not-found': 'No existe una cuenta con este email.',
    'auth/wrong-password': 'Contraseña incorrecta.',
    'auth/too-many-requests': 'Demasiados intentos. Esperá unos minutos.',
  };
  return errors[code] || 'Error de autenticación. Intentá de nuevo.';
}

// ── Upload Material ────────────────────────────────────────
async function uploadMaterial(file, metadata) {
  const user = auth.currentUser;
  if (!user) throw new Error('No autenticado');

  const uid = user.uid;
  const timestamp = Date.now();
  const ext = file.name.split('.').pop();
  const filename = `${uid}/${timestamp}_${sanitizeFilename(file.name)}`;

  // Upload to Firebase Storage
  const ref = storage.ref(`materiales/${filename}`);
  const uploadTask = ref.put(file, {
    customMetadata: {
      operadorId: uid,
      titulo: metadata.titulo,
      tipo: metadata.tipo,
    }
  });

  // Track progress
  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (metadata.onProgress) metadata.onProgress(progress);
      },
      (error) => reject(error),
      async () => {
        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

        // Save record in Firestore
        const docRef = await db.collection('materiales').add({
          operadorId: uid,
          titulo: metadata.titulo,
          descripcion: metadata.descripcion || '',
          tipo: metadata.tipo, // 'taller', 'ebook', 'sesion', 'articulo', 'video'
          canalesDestino: metadata.canales || [],
          archivoURL: downloadURL,
          archivoNombre: file.name,
          archivoTamaño: file.size,
          estado: 'subido', // subido -> en_revision -> publicado
          creadoEn: firebase.firestore.FieldValue.serverTimestamp(),
          publicadoEn: null,
          precio: metadata.precio || 0,
          moneda: metadata.moneda || 'UYU',
        });

        // Update operator stats
        await db.collection('operadores').doc(uid).update({
          publicaciones: firebase.firestore.FieldValue.increment(1),
        });

        resolve({ id: docRef.id, url: downloadURL });
      }
    );
  });
}

// ── Get Operator Materials ─────────────────────────────────
async function getMateriales(uid) {
  const snapshot = await db.collection('materiales')
    .where('operadorId', '==', uid)
    .orderBy('creadoEn', 'desc')
    .get();

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// ── Get Operator Profile ───────────────────────────────────
async function getOperadorProfile(uid) {
  const doc = await db.collection('operadores').doc(uid).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

// ── Update Channel Config ──────────────────────────────────
async function updateChannelConfig(uid, channel, config) {
  await db.collection('operadores').doc(uid).update({
    [`canales.${channel}`]: {
      ...config,
      actualizadoEn: firebase.firestore.FieldValue.serverTimestamp(),
    }
  });
}

// ── Admin: Get All Pending Materials ───────────────────────
async function getPendingMaterials() {
  const snapshot = await db.collection('materiales')
    .where('estado', '==', 'subido')
    .orderBy('creadoEn', 'desc')
    .get();

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// ── Admin: Mark as Published ───────────────────────────────
async function markAsPublished(materialId, canales) {
  await db.collection('materiales').doc(materialId).update({
    estado: 'publicado',
    publicadoEn: firebase.firestore.FieldValue.serverTimestamp(),
    canalesPublicados: canales,
  });
}

// ── UI State ───────────────────────────────────────────────
function updateUIForAuth(user) {
  const navCta = document.querySelector('.nav-cta');
  if (!navCta) return;

  // Always keep Ingresar, Mi Panel, and Publicar Ahora accessible
  navCta.innerHTML = `
    <a href="#" class="btn btn-outline" onclick="openModal('loginModal')">
      <i class="fa-solid fa-right-to-bracket"></i> Ingresar
    </a>
    <a href="mi-panel.html" class="btn btn-outline" style="border-color:var(--primary-light);color:var(--primary-light)">
      <i class="fa-solid fa-gauge"></i> Mi Panel
    </a>
    <a href="#" class="btn btn-primary" onclick="openRegisterModal('profesional')">
      <i class="fa-solid fa-rocket"></i> Publicar Ahora
    </a>
  `;
}

// ── Helpers ────────────────────────────────────────────────
function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_').toLowerCase();
}

// ── Initialize on load ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initFirebase();
});

// ── Export for use in main.js ──────────────────────────────
window.NuestraVozFirebase = {
  registerOperator,
  loginOperator,
  loginWithGoogle,
  logoutOperator,
  uploadMaterial,
  getMateriales,
  getOperadorProfile,
  updateChannelConfig,
  getPendingMaterials,
  markAsPublished,
};
