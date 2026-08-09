/* ============================================================
   NUESTRA VOZ — JavaScript
   Plataforma para Operadores Terapéuticos · Uruguay
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll ────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ── Hamburger mobile menu ────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navLinks.classList.toggle('mobile-open');
      const spans = hamburger.querySelectorAll('span');
      if (navLinks.classList.contains('open') || navLinks.classList.contains('mobile-open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
      }
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navLinks.classList.remove('mobile-open');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
      });
    });
  }

  // ── Intersection Observer for fade-in ────────────────────
  const fadeEls = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  fadeEls.forEach(el => fadeObserver.observe(el));

  // ── Stat counter animation ───────────────────────────────
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNumbers.forEach(el => statObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + (target >= 100 ? '+' : '');
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ── Channel chip toggles ─────────────────────────────────
  const channelGrid = document.getElementById('channelGrid');
  if (channelGrid) {
    channelGrid.querySelectorAll('.channel-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        chip.classList.toggle('active');
        updatePublishBtnText();
      });
    });
  }

  function updatePublishBtnText() {
    const count = document.querySelectorAll('.channel-chip.active').length;
    const btn = document.getElementById('megaPublishBtn');
    if (!btn) return;
    if (count === 0) {
      btn.innerHTML = '<span class="btn-shine"></span><i class="fa-solid fa-paper-plane"></i> Seleccioná al menos un canal';
      btn.disabled = true;
      btn.style.opacity = '0.5';
    } else {
      btn.innerHTML = `<span class="btn-shine"></span><i class="fa-solid fa-paper-plane"></i> Publicar en ${count} Canal${count > 1 ? 'es' : ''}`;
      btn.disabled = false;
      btn.style.opacity = '1';
    }
  }

  // ── Mega Publish Button ──────────────────────────────────
  const megaBtn = document.getElementById('megaPublishBtn');
  if (megaBtn) {
    megaBtn.addEventListener('click', () => {
      const activeChips = document.querySelectorAll('.channel-chip.active');
      if (activeChips.length === 0) return;
      runPublishAnimation(activeChips);
    });
  }

  function runPublishAnimation(activeChips) {
    const overlay = document.createElement('div');
    overlay.className = 'publish-animation';
    overlay.innerHTML = `
      <div class="publish-anim-inner">
        <h3>🚀 Publicando contenido...</h3>
        <p>Enviando a <strong>${activeChips.length}</strong> canales</p>
        <div class="channel-orbit" id="orbitContainer"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('active'));

    const container = overlay.querySelector('#orbitContainer');
    const meta = {
      whatsapp:     { icon: 'fa-brands fa-whatsapp',    color: '#25D366', name: 'WhatsApp' },
      instagram:    { icon: 'fa-brands fa-instagram',   color: '#E1306C', name: 'Instagram' },
      facebook:     { icon: 'fa-brands fa-facebook',    color: '#1877F2', name: 'Facebook' }
    };

    const chips = [];
    activeChips.forEach(chip => {
      const ch = chip.dataset.channel;
      const m = meta[ch];
      if (!m) return;
      const el = document.createElement('div');
      el.className = 'orbit-chip';
      el.innerHTML = `<i class="${m.icon}" style="color:${m.color}"></i><span>${m.name}</span>`;
      container.appendChild(el);
      chips.push(el);
    });

    chips.forEach((el, i) => setTimeout(() => el.classList.add('sent'), 400 + i * 350));

    setTimeout(() => {
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 400);
      showToast('¡Publicado exitosamente!', `Contenido enviado a ${chips.length} canales`);
    }, 400 + chips.length * 350 + 1200);
  }

  // ── Toast ────────────────────────────────────────────────
  window.showToast = function(title, subtitle) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    document.getElementById('toastTitle').textContent = title;
    document.getElementById('toastSub').textContent = subtitle;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4500);
  };

  // ── Modals ───────────────────────────────────────────────
  window.openModal = function(id) {
    const overlay = document.getElementById(id);
    if (overlay) {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeModal = function(id) {
    const overlay = document.getElementById(id);
    if (overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  window.openConfigModal = function(channel) {
    const titles = {
      whatsapp: 'WhatsApp Oficial',
      instagram: 'Instagram Oficial',
      facebook: 'Facebook Oficial'
    };
    const titleEl = document.getElementById('configModalTitle');
    if (titleEl && titles[channel]) {
      titleEl.innerHTML = `⚙️ Configurar ${titles[channel]}`;
    }
    window.openModal('configModal');
  };

  window.saveChannelConfig = function() {
    window.closeModal('configModal');
    if (window.showToast) {
      window.showToast('Configuración guardada', 'Los cambios se aplicarán en tu próxima publicación.');
    } else {
      alert('Configuración guardada exitosamente.');
    }
  };

  // Close on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
      document.body.style.overflow = '';
    }
  });

  // ── Register modal: multi-step ───────────────────────────
  function showRegStep(n) {
    ['regStep1','regStep2','regStep3'].forEach(function(id, i) {
      var el = document.getElementById(id);
      if (el) el.style.display = (i + 1 === n) ? 'block' : 'none';
    });
  }
  window.showRegStep = showRegStep;

  window.openRegisterModal = function(plan) {
    showRegStep(1);
    var planSelect = document.getElementById('regPlan');
    if (planSelect && plan) planSelect.value = plan;
    openModal('registerModal');
  };

  window.goToPaymentStep = function() {
    var nb = document.getElementById('regNombre');
    var em = document.getElementById('regEmail');
    if (nb && !nb.value.trim()) nb.value = 'Nuevo Operador';
    if (em && !em.value.trim()) em.value = 'operador' + Date.now().toString().slice(-4) + '@nuestravoz.uy';
    showRegStep(2);
    try { window.savePendingOperator('Pendiente Seleccionar Pago'); } catch(e) {}
  };

  window.goBackToStep1 = function() { showRegStep(1); };
  window.goBackToStep2 = function() { showRegStep(2); };

  window.savePendingOperator = function(paymentMethod) {
    try {
      const nombre = document.getElementById('regNombre')?.value?.trim() || 'Operador';
      const email = document.getElementById('regEmail')?.value?.trim() || 'operador@nuestravoz.uy';
      const pass = document.getElementById('regPass')?.value?.trim() || '123456';
      const tel = document.getElementById('regTel')?.value?.trim() || '+598 92 360 151';
      const especialidad = document.getElementById('regEspecialidad')?.value || 'Adicciones y Salud Mental';
      const plan = document.getElementById('regPlan')?.value || 'profesional';

      const operators = JSON.parse(localStorage.getItem('nv_operators') || '[]');
      let op = operators.find(o => o.email && o.email.toLowerCase() === email.toLowerCase());
      
      if (!op) {
        op = {
          id: Date.now(),
          nombre,
          email,
          pass,
          telefono: tel,
          especialidad,
          plan,
          pago: paymentMethod,
          estado: 'pendiente_pago', // Siempre pendiente hasta que Ceci lo active manualmente
          score: plan === 'elite' ? '5.0' : (plan === 'profesional' ? '4.9' : '4.8'),
          verificado: true,
          creado: new Date().toISOString(),
          materiales: 0
        };
        operators.push(op);
      } else {
        op.nombre = nombre;
        op.pass = pass;
        op.telefono = tel;
        op.especialidad = especialidad;
        op.plan = plan;
        op.pago = paymentMethod;
      }

      localStorage.setItem('nv_operators', JSON.stringify(operators));

      // Direct Firestore push to ensure Cecilia sees the new registration immediately in her panel
      if (typeof firebase !== 'undefined') {
        try {
          if (!firebase.apps || !firebase.apps.length) {
            firebase.initializeApp({
              apiKey: "AIzaSyDRIsJDO2zM1E2WK8tmOykVf47VKq1cqDI",
              authDomain: "nuestravoz-uy.firebaseapp.com",
              projectId: "nuestravoz-uy",
              storageBucket: "nuestravoz-uy.firebasestorage.app",
              messagingSenderId: "499775575806",
              appId: "1:499775575806:web:d758b5e7e09743cff377af"
            });
          }
          const db = firebase.firestore();
          db.collection('operadores').doc(String(op.id)).set({
            id: String(op.id),
            nombre: op.nombre || '',
            email: op.email || '',
            telefono: op.telefono || '',
            especialidad: op.especialidad || '',
            plan: op.plan || 'profesional',
            estado: 'pendiente_pago', // Queda como pendiente para aprobación de Ceci
            score: op.score || '4.9',
            pago: paymentMethod || 'Pendiente',
            ciudad: 'Uruguay',
            creado: op.creado || new Date().toISOString(),
            actualizadoEn: firebase.firestore.FieldValue.serverTimestamp()
          }, { merge: true }).then(() => {
            console.log('✅ Operador enviado a Firestore para aprobación de Cecilia:', op.id);
          }).catch(err => console.error('❌ Error guardando operador en Firestore:', err));
        } catch(e) { console.error('❌ Excepción Firebase en savePendingOperator:', e); }
      }

      if (window.NuestraVozFirebase && window.NuestraVozFirebase.createOperatorInDB) {
        window.NuestraVozFirebase.createOperatorInDB(op);
      }

      if (window.renderFrontendOperators) window.renderFrontendOperators();
      return op;
    } catch(err) {
      console.error('Error saving pending operator:', err);
      return null;
    }
  };

  function savePendingOperator(pm) {
    return window.savePendingOperator(pm);
  }

  window.goBackToStep1 = function() {
    const s1 = document.getElementById('regStep1');
    const s2 = document.getElementById('regStep2');
    const s3 = document.getElementById('regStep3');
    if (s1) s1.style.display = 'block';
    if (s2) s2.style.display = 'none';
    if (s3) s3.style.display = 'none';
  };

  window.goBackToStep2 = function() {
    const s1 = document.getElementById('regStep1');
    const s2 = document.getElementById('regStep2');
    const s3 = document.getElementById('regStep3');
    if (s1) s1.style.display = 'none';
    if (s2) s2.style.display = 'block';
    if (s3) s3.style.display = 'none';
  };

  // ── Payment flows ────────────────────────────────────────
  window.payWithStripe = function() {
    try {
      const op = window.savePendingOperator('Stripe');
      if (op) localStorage.setItem('nv_current_user', JSON.stringify(op));
    } catch(e) {}
    
    if (window.closeModal) window.closeModal('registerModal');
    if (window.showToast) window.showToast('¡Registro completado!', 'Ingresando a tu panel de operador...');
    setTimeout(() => {
      window.location.href = 'mi-panel.html';
    }, 400);
  };

  window.payWithMercadoPago = function() {
    try {
      const op = window.savePendingOperator('MercadoPago');
      if (op) localStorage.setItem('nv_current_user', JSON.stringify(op));
    } catch(e) {}

    if (window.closeModal) window.closeModal('registerModal');
    if (window.showToast) window.showToast('¡Registro completado!', 'Ingresando a tu panel de operador...');
    setTimeout(() => {
      window.location.href = 'mi-panel.html';
    }, 400);
  };

  window.showBankTransfer = function() {
    try {
      const op = window.savePendingOperator('Transferencia Bancaria');
      if (op) localStorage.setItem('nv_current_user', JSON.stringify(op));
    } catch(e) {}

    const s1 = document.getElementById('regStep1');
    const s2 = document.getElementById('regStep2');
    const s3 = document.getElementById('regStep3');
    if (s1) s1.style.display = 'none';
    if (s2) s2.style.display = 'none';
    if (s3) s3.style.display = 'block';
  };

  window.completeTransferAndGoToPanel = function() {
    if (window.closeModal) window.closeModal('registerModal');
    if (window.showToast) window.showToast('¡Registro recibido!', 'Ingresando a tu panel de operador...');
    setTimeout(() => {
      window.location.href = 'mi-panel.html';
    }, 400);
  };

// ── Global Scope Functions for Directory & Firestore ──
let currentAreaFilter = 'todas';
let firestoreListenerActive = false;

window.filterOperatorsByArea = function(area, btnEl) {
  currentAreaFilter = area;
  document.querySelectorAll('.dir-filter-btn').forEach(b => {
    if (b === btnEl || (b.getAttribute('onclick') && b.getAttribute('onclick').includes(`'${area}'`))) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });
  window.renderFrontendOperators();
};

function startFirestoreOperatorsListener() {
  if (firestoreListenerActive) return;
  if (typeof firebase === 'undefined') {
    setTimeout(startFirestoreOperatorsListener, 250);
    return;
  }
  try {
    if (!firebase.apps || !firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyDRIsJDO2zM1E2WK8tmOykVf47VKq1cqDI",
        authDomain: "nuestravoz-uy.firebaseapp.com",
        projectId: "nuestravoz-uy",
        storageBucket: "nuestravoz-uy.firebasestorage.app",
        messagingSenderId: "499775575806",
        appId: "1:499775575806:web:d758b5e7e09743cff377af"
      });
    }
    const db = firebase.firestore();

    // Fetch de inmediato vía get() para renderizar al instante sin esperar el evento
    db.collection('operadores').get().then(snap => {
      const fsOps = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      window.cachedFirestoreOps = fsOps;
      localStorage.setItem('nv_operators', JSON.stringify(fsOps));
      window.renderFrontendOperators(fsOps);
    }).catch(e => console.warn('Firestore initial get error:', e));

    // Listener en tiempo real
    db.collection('operadores')
      .onSnapshot(snapshot => {
        const fsOps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        window.cachedFirestoreOps = fsOps;
        localStorage.setItem('nv_operators', JSON.stringify(fsOps));
        window.renderFrontendOperators(fsOps);
      }, err => console.warn('Firestore listener error:', err.message));

    firestoreListenerActive = true;
  } catch(e) {
    console.warn('No se pudo conectar Firestore:', e.message);
  }
}

window.renderFrontendOperators = function(passedOps) {
  const gridContainer = document.getElementById('publicDirectoryGrid');
  if (!gridContainer) return;

  // Intentar iniciar listener de Firestore (si Firebase está disponible)
  startFirestoreOperatorsListener();

  // ── Obtener operadores REALES activos únicamente desde Firestore / localStorage ──
  const rawList = passedOps || window.cachedFirestoreOps || JSON.parse(localStorage.getItem('nv_operators') || '[]');
  let activeOps = rawList.filter(o => String(o.estado || '').toLowerCase() === 'activo');

  // Aplicar filtro de área si se seleccionó una categoría
  if (currentAreaFilter && currentAreaFilter !== 'todas') {
    const areaKeyword = currentAreaFilter.toLowerCase();
    activeOps = activeOps.filter(o => (o.especialidad || '').toLowerCase().includes(areaKeyword));
  }

  // Ordenar: elite > profesional > basico, luego por score
  const planRank = { elite: 3, profesional: 2, basico: 1 };
  activeOps.sort((a, b) => {
    const rankDiff = (planRank[b.plan] || 1) - (planRank[a.plan] || 1);
    if (rankDiff !== 0) return rankDiff;
    return parseFloat(b.score || '4.8') - parseFloat(a.score || '4.8');
  });

  if (activeOps.length === 0) {
    gridContainer.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:40px 24px;background:var(--surface-2);border:1.5px solid var(--border);border-radius:16px;margin:10px 0;box-shadow:0 10px 30px rgba(0,0,0,0.5)">
        <i class="fa-solid fa-user-doctor" style="font-size:2.4rem;color:var(--primary-light);margin-bottom:12px;display:block"></i>
        <h4 style="font-size:1.15rem;font-weight:700;margin-bottom:6px;color:var(--text-primary)">No hay operadores en "${currentAreaFilter}" por el momento</h4>
        <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:20px;max-width:500px;margin-left:auto;margin-right:auto">
          Sé el primer profesional verificado en ofrecer servicios de <strong>${currentAreaFilter}</strong> en Nuestra Voz.
        </p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <button class="btn btn-primary" onclick="openRegisterModal('profesional')">
            <i class="fa-solid fa-user-plus"></i> Registrarme en esta Especialidad
          </button>
          <button class="btn btn-outline" onclick="filterOperatorsByArea('todas')">
            <i class="fa-solid fa-users"></i> Ver Todos los Operadores Activos (${rawList.filter(o=>o.estado==='activo').length})
          </button>
        </div>
      </div>`;
    return;
  }

  gridContainer.innerHTML = activeOps.map(op => {
    const initials  = (op.nombre || '?').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const planBadge = op.plan === 'elite' ? '<span style="background:rgba(245,197,66,0.15);color:var(--gold);padding:2px 8px;border-radius:12px;font-size:0.72rem;font-weight:700">👑 ELITE</span>' :
                     (op.plan === 'profesional' ? '<span style="background:rgba(64,196,176,0.15);color:var(--teal);padding:2px 8px;border-radius:12px;font-size:0.72rem;font-weight:700">PRO</span>' : '');
    const cleanPhone = (op.telefono || '59892360151').replace(/\D/g, '') || '59892360151';
    const avatarHtml = op.foto
      ? `<img src="${op.foto}" style="width:100%;height:100%;border-radius:50%;object-fit:cover" onerror="this.outerHTML='${initials}'">`
      : initials;

    return `
      <div class="operator-card fade-in visible">
        <div class="operator-card-header">
          <div class="operator-avatar">${avatarHtml}</div>
          <div class="operator-score"><i class="fa-solid fa-star"></i> ${op.score || '4.9'}</div>
        </div>
        <div style="margin-bottom:8px">${planBadge}</div>
        <div class="operator-name">${op.nombre}</div>
        <div class="operator-specialty"><i class="fa-solid fa-user-nurse"></i> ${op.especialidad || 'Operador Terapéutico'}</div>
        <div style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:12px;line-height:1.4">${op.descripcion || ''}</div>
        <div class="operator-meta">
          <div><i class="fa-solid fa-location-dot"></i> ${op.ciudad || 'Uruguay'}</div>
          <div><i class="fa-solid fa-badge-check" style="color:var(--teal)"></i> Verificado por Nuestra Voz</div>
        </div>
        <div class="operator-actions">
          <a href="https://wa.me/${cleanPhone}?text=Hola%20${encodeURIComponent(op.nombre)}%2C%20vi%20tu%20perfil%20en%20Nuestra%20Voz." target="_blank" class="btn btn-primary">
            <i class="fa-brands fa-whatsapp"></i> Contactar por WhatsApp
          </a>
        </div>
      </div>`;
  }).join('');
};

// Iniciar listener de inmediato al cargar el script
startFirestoreOperatorsListener();

  // ── Login flow ───────────────────────────────────────────
  window.doLogin = async function() {
    const email = document.getElementById('loginEmail')?.value?.trim();
    const pass = document.getElementById('loginPass')?.value;

    if (!email || !pass) {
      alert('Ingresá email y contraseña.');
      return;
    }

    const operators = JSON.parse(localStorage.getItem('nv_operators') || '[]');
    let user = operators.find(o => o.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      // Create user session record
      user = {
        nombre: email.split('@')[0],
        email: email,
        telefono: '+598 92 360 151',
        especialidad: 'Adicciones y Salud Mental',
        plan: 'profesional',
        estado: 'activo'
      };
    }

    localStorage.setItem('nv_current_user', JSON.stringify(user));
    if (user.id) localStorage.setItem('nv_current_user_id', String(user.id));

    if (window.NuestraVozFirebase) {
      const result = await window.NuestraVozFirebase.loginOperator(email, pass);
      if (result.success) {
        closeModal('loginModal');
        showToast('¡Bienvenido/a!', 'Redirigiendo a tu panel...');
        setTimeout(() => { window.location.href = 'mi-panel.html'; }, 600);
      } else {
        alert(result.error);
      }
    } else {
      closeModal('loginModal');
      showToast('¡Bienvenido/a!', 'Ingresaste a tu panel de operador');
      setTimeout(() => { window.location.href = 'mi-panel.html'; }, 600);
    }
  };


  window.doGoogleLogin = async function() {
    const btn = document.querySelector('[onclick="doGoogleLogin()"]');
    const originalHTML = btn ? btn.innerHTML : '';

    // Estado de carga
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Conectando con Google...';
    }

    try {
      // ── Inicializar Firebase si no está listo ──
      if (typeof firebase === 'undefined') {
        throw new Error('Firebase no está cargado. Verificá tu conexión a internet.');
      }

      // Inicializar app si no se hizo aún
      let app;
      try {
        app = firebase.app();
      } catch(e) {
        app = firebase.initializeApp({
          apiKey: "AIzaSyDRIsJDO2zM1E2WK8tmOykVf47VKq1cqDI",
          authDomain: "nuestravoz-uy.firebaseapp.com",
          projectId: "nuestravoz-uy",
          storageBucket: "nuestravoz-uy.firebasestorage.app",
          messagingSenderId: "499775575806",
          appId: "1:499775575806:web:d758b5e7e09743cff377af"
        });
      }

      const auth = firebase.auth();
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });

      // ── Popup de Google ──
      const result = await auth.signInWithPopup(provider);
      const googleUser = result.user;

      const nombre     = googleUser.displayName || googleUser.email.split('@')[0];
      const email      = googleUser.email;
      const foto       = googleUser.photoURL || '';
      const uid        = googleUser.uid;

      // ── Crear / actualizar el operador en nv_operators ──
      const operators = JSON.parse(localStorage.getItem('nv_operators') || '[]');
      let op = operators.find(o => o.email && o.email.toLowerCase() === email.toLowerCase());

      if (!op) {
        // Nuevo: crear registro
        op = {
          id:          uid,
          nombre:      nombre,
          email:       email,
          foto:        foto,
          telefono:    '',
          especialidad: '',
          plan:        'profesional',
          pago:        '',
          estado:      'pendiente_pago',  // Ceci debe activarlo
          score:       '4.9',
          verificado:  false,
          creado:      new Date().toISOString(),
          materiales:  0
        };
        operators.push(op);
      } else {
        // Actualizar foto/nombre si cambió
        op.foto   = foto || op.foto;
        op.nombre = nombre || op.nombre;
        op.id     = uid;   // sincronizar con Firebase UID
      }

      localStorage.setItem('nv_operators', JSON.stringify(operators));
      localStorage.setItem('nv_current_user_id', String(op.id));
      localStorage.setItem('nv_current_user', JSON.stringify(op)); // compatibilidad legacy

      // ── También persistir en Firestore si está disponible ──
      try {
        const db = firebase.firestore();
        await db.collection('operadores').doc(uid).set({
          nombre, email, foto,
          telefono:     op.telefono || '',
          especialidad: op.especialidad || '',
          plan:         op.plan,
          estado:       op.estado,
          creadoEn:     firebase.firestore.FieldValue.serverTimestamp(),
          actualizadoEn: firebase.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });
      } catch(fsErr) {
        // Firestore puede fallar por reglas — el localStorage es suficiente por ahora
        console.warn('Firestore write skipped:', fsErr.message);
      }

      closeModal('loginModal');
      showToast('¡Bienvenido/a, ' + nombre.split(' ')[0] + '!', 'Redirigiendo a tu panel...');
      setTimeout(() => { window.location.href = 'mi-panel.html'; }, 800);

    } catch (err) {
      console.error('Google login error:', err);

      // Mensajes amigables según código de error
      const msgs = {
        'auth/popup-closed-by-user':     'Cerraste la ventana de Google antes de completar el ingreso.',
        'auth/popup-blocked':            'Tu navegador bloqueó el popup. Permití popups para este sitio e intentá de nuevo.',
        'auth/cancelled-popup-request':  'Se canceló la solicitud. Intentá de nuevo.',
        'auth/network-request-failed':   'Sin conexión a internet. Verificá tu red e intentá de nuevo.',
        'auth/unauthorized-domain':      'Este dominio no está autorizado en Firebase. Contactá al administrador.',
        'auth/internal-error':           'Error interno de Google. Intentá de nuevo en unos segundos.',
      };

      const msg = msgs[err.code] || (err.message || 'Error al conectar con Google. Intentá de nuevo.');
      alert('⚠️ ' + msg);

      // Restaurar botón
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalHTML;
      }
    }
  };


  // ── Config modal ─────────────────────────────────────────
  window.openConfigModal = function(channel) {
    const names = {
      instagram: 'Instagram', whatsapp: 'WhatsApp Business', facebook: 'Facebook',
      linkedin: 'LinkedIn', mercadolibre: 'Mercado Libre', kindle: 'Kindle Direct Publishing',
      tiktok: 'TikTok', twitter: 'X (Twitter)',
    };
    const title = document.getElementById('configModalTitle');
    if (title) title.textContent = `⚙️ Configurar ${names[channel] || channel}`;
    openModal('configModal');
  };

  window.saveChannelConfig = function() {
    closeModal('configModal');
    showToast('Configuración guardada', 'Canal actualizado correctamente');
  };

  // ── Smooth scroll ────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
      }
    });
  });

});
