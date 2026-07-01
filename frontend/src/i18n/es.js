const SDK_CODE = `// HIK Enforcement Proxy — Integración de Cumplimiento de Políticas
// Middleware drop-in: apunta tus llamadas LLM a la URL del proxy

const HIK_ENDPOINT = 'https://api.tu-dominio/v1/chat/completions';

// Todo el tráfico se enruta a través de la cascada de aplicación de HIK.
// Gate 1 evalúa la entrada. Gate 2 evalúa la salida.
// La respuesta vuelve con un identificador de recibo Sacred Trace™.
const response = await fetch(HIK_ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ model: 'gpt-4o', messages })
});

// Cada respuesta lleva una referencia de recibo de cumplimiento
// Contáctanos para acceder a la especificación completa de la API y el esquema de recibos.`;

export const es = {
  nav: {
    links: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Tecnología", path: "/technology" },
      { label: "Orígenes", path: "/origins" },
      { label: "Hoja de Ruta", path: "/roadmap" },
      { label: "Manifiesto", path: "/manifesto" },
      { label: "Resumen Ejecutivo", path: "/executive-summary" }
    ]
  },
  hero: {
    subtitle: "CUMPLIMIENTO DE POLÍTICAS DETERMINÍSTICO PARA IA EMPRESARIAL",
    description: "Los sistemas de IA toman decisiones con consecuencias legales — pero no producen prueba de que se mantuvieron dentro de la política. HIK cambia eso: cada interacción de IA es evaluada en el límite de la política y emite un recibo de cumplimiento admisible en tribunales antes de llegar a tu flujo de trabajo.",
    badges: ["EU AI Act Art. 50", "NYC LL144", "GDPR Art. 22", "Aplicación en Vivo", "Anclaje Blockchain", "Agnóstico al Modelo"],
    cta: {
      primary: { text: "Solicitar Demo de Cumplimiento", link: "/executive-summary" },
      secondary: { text: "Ver la Arquitectura", link: "/technology" }
    }
  },
  problem: {
    title: "La Brecha de Cumplimiento",
    description: "Cada empresa que implementa IA en RRHH, finanzas o salud enfrenta la misma exposición estructural: los sistemas de IA generan decisiones con consecuencias legales — resúmenes de contratación, alertas de préstamos, triaje de pacientes — pero no producen prueba verificable de que esas decisiones se mantuvieron dentro de la política en el momento en que fueron tomadas.",
    highlight: "Los logs te dicen qué pasó. No pueden probar qué estaba autorizado a pasar. Esa distinción es toda la responsabilidad legal mientras cierran los plazos del EU AI Act y NYC LL144."
  },
  solution: {
    title: "Aplicación de Políticas en la Compuerta",
    description: "HIK es una capa middleware agnóstica al modelo que intercepta cada interacción de IA en el límite de la política — antes de que la solicitud llegue al modelo, y antes de que la respuesta llegue a tu usuario. En el momento de la aplicación, emite un Sacred Trace™: un recibo de cumplimiento criptográfico inmutable anclado en la blockchain.",
    highlight: "Si la salida viola la política, la compuerta se activa. La salida nunca llega al flujo de trabajo. El recibo prueba que la compuerta se mantuvo — con latencia de aplicación optimizada para entornos de producción."
  },
  howItWorks: {
    title: "Cómo Funciona",
    subtitle: "Tres pasos. Aplicación con latencia optimizada. Prueba admisible en tribunales.",
    steps: [
      { number: "01", title: "Llega la Solicitud", description: "Una solicitud de IA entra en tu sistema — una consulta a tu chatbot de RRHH, un prompt a tu herramienta de evaluación de préstamos, o un mensaje a cualquier flujo de trabajo con LLM.", outcome: "HIK intercepta antes de que el modelo lo vea" },
      { number: "02", title: "Se Activa la Compuerta de Política", description: "HIK evalúa la solicitud contra tu política de cumplimiento declarada. Si contiene una categoría prohibida — inferencia emocional, decisiones automatizadas de contratación, formulación discriminatoria — la solicitud se bloquea de inmediato.", outcome: "Cero falsos positivos en la acción de bloqueo" },
      { number: "03", title: "Se Emite el Recibo de Cumplimiento", description: "Ya sea que la solicitud pasara o fuera bloqueada, HIK emite un recibo Sacred Trace™: un registro firmado criptográficamente de la consulta, la política aplicada y la decisión tomada — anclado en IPFS y la blockchain.", outcome: "Prueba admisible en tribunales, disponible para cualquier auditor" }
    ]
  },
  useCases: {
    title: "Construido para IA Regulada",
    subtitle: "Casos de Uso",
    cases: [
      { industry: "Recursos Humanos", icon: "user", problem: "Tu asistente de contratación con IA está sujeto a NYC Local Law 144. Cada decisión de empleo automatizada debe ser auditable, libre de sesgos y defendible.", hikSolves: "HIK bloquea preguntas prohibidas (estado emocional, inferencia física) antes de que lleguen al modelo. Cada interacción produce un recibo de auditoría vinculado al artículo específico de LL144." },
      { industry: "Servicios Financieros", icon: "shield", problem: "La IA de evaluación de préstamos genera decisiones con consecuencias legales. El Artículo 22 del GDPR exige que las decisiones automatizadas sean explicables e impugnables.", hikSolves: "HIK aplica tu política de crédito declarada en el límite de inferencia. Cada decisión está marcada con timestamp, hasheada y anclada — lista para un desafío regulatorio sin herramientas adicionales." },
      { industry: "Salud y Legal", icon: "scale", problem: "El triaje de pacientes y la inferencia legal operan en entornos donde una salida incorrecta no es un fallo de UX — es un evento de responsabilidad. Los guardrails estándar son consultivos, no aplicables.", hikSolves: "HIK aplica límites de política duros a nivel de infraestructura. Las salidas prohibidas se bloquean, no se marcan. El recibo prueba que la aplicación ocurrió en el momento correcto." }
    ]
  },
  trinityProtocol: {
    title: "La Arquitectura de Aplicación", subtitle: "Arquitectura Central",
    layers: [
      { id: "01", name: "Proveniencia de Contenido", description: "Estándar C2PA 2.3 para la firma criptográfica de cada fragmento de contenido. Cada unidad de contenido incluye un enlace verificable a su predecesor, creando una cadena de custodia inquebrantable desde el origen hasta la salida.", tags: ["C2PA 2.3", "Integridad de Contenido", "Merkle Anchoring"] },
      { id: "02", name: "Kernel de Cumplimiento de Políticas (KMIR)", description: "El Kernel de Reglas de Integridad Manifestada — un guardián de políticas estricto y de confianza cero. Evalúa cada entrada y salida de IA contra las reglas de cumplimiento declaradas. Gate 1 se activa antes de que el LLM vea la solicitud. Gate 2 se activa antes de que el usuario vea la respuesta.", tags: ["Gate 1 Entrada", "Gate 2 Salida", "Zero-Trust", "EU AI Act"] },
      { id: "03", name: "Pulso de Telemetría en Vivo", description: "La telemetría de integridad CMCD v2 transmite el estado de cumplimiento de cada fragmento en vivo en tiempo real. Firmada criptográficamente — una señal de integridad falsificada en el borde CDN es computacionalmente inviable.", tags: ["CMCD v2", "Telemetría Firmada", "Tiempo Real", "Borde CDN"] },
      { id: "04", name: "Aplicación de Políticas en Transmisiones en Vivo", description: "La capa de aplicación se extiende a transmisiones de video continuas. Demostrado en vivo: una transmisión OBS a YouTube enrutada a través del proxy de aplicación de HIK — cuando se inyectó una violación de política, la transmisión fue terminada a nivel de borde. No es una simulación.", tags: ["Probado en Vivo", "OBS Kill-Switch", "Borde YouTube", "Aplicación en Borde"] }
    ]
  },
  sacredTrace: {
    title: "Sacred Trace™", subtitle: "Núcleo Criptográfico",
    description: "Cada interacción — ya sea aprobada o bloqueada — produce un recibo de cumplimiento criptográfico inmutable y reproducible: el Sacred Trace™",
    formula: "[ Cadena de Verificación Anclada Criptográficamente ]",
    ethicalKeys: [
      { key: "Estado de Aplicación", values: ["SEGURO \u00b7 Salida verificada y dentro de la política declarada", "DESVÍO \u00b7 Desviación de intención detectada y marcada", "DETENER \u00b7 Compuerta activada, salida o transmisión terminada"] },
      { key: "Puntuación de Proveniencia", description: "Profundidad de la cadena Merkle \u2014 un indicador numérico de cuántos eventos verificados están anclados hasta la raíz, formando la cadena de cumplimiento ininterrumpida." }
    ],
    sdkApi: [
      { method: "Gate 1 (Entrada)", description: "Evalúa la solicitud de IA antes de que el modelo la vea. Retorna un veredicto de aplicación y un recibo de cumplimiento provisional." },
      { method: "Gate 2 (Salida)", description: "Evalúa la respuesta del LLM antes de que el usuario la vea. Bloquea violaciones de política o aprueba con recibo adjunto." },
      { method: "Confirmación de Recibo", description: "Recupera un recibo de cumplimiento confirmado incluyendo prueba Merkle, ancla IPFS y referencia de transacción blockchain." }
    ]
  },
  sdkCode: SDK_CODE,
  architectureFlow: [
    { label: "Solicitud de IA Entrante", sublabel: "Cualquier LLM \u2014 agnóstico al modelo" },
    { label: "Gate 1: Verificación de Política de Entrada", sublabel: "Bloqueada si está prohibida — latencia optimizada" },
    { label: "Procesamiento LLM", sublabel: "Protegido por HIK — pasa solo si es limpio" },
    { label: "Gate 2: Verificación de Política de Salida", sublabel: "Aplicación final antes de que el usuario lo vea" },
    { label: "Registro de Cumplimiento", sublabel: "Persistencia crash-safe — siempre" },
    { label: "Recibo Sacred Trace\u2122", sublabel: "Anclado en IPFS + EVM \u2014 asíncrono" }
  ],
  whatHikProduces: [
    { title: "Recibos de Cumplimiento Criptográficos", description: "Admisibles en tribunales, listos para reguladores, verificables por máquinas. Anclados en IPFS y EVM. Cada decisión, cada bloqueo, cada aprobación — registrado de forma inmutable." },
    { title: "Aplicación de Doble Compuerta", description: "Gate 1 evalúa cada solicitud de IA antes de que el modelo la vea. Gate 2 evalúa cada respuesta antes de que el usuario la vea. Ambas operan con latencia de aplicación optimizada para entornos de producción." },
    { title: "Kill-Switch de Transmisión en Vivo", description: "Probado en producción: transmisión OBS a YouTube, terminada a nivel de borde cuando se inyectó una violación de política. No es un concepto — es una capacidad demostrada." },
    { title: "Intercepción Nativa en el Borde", description: "Despliegue sin estado integrándose directamente con infraestructura CDN edge. Soporte para enclaves de hardware. Arquitectura de firma portable a cualquier entorno serverless edge." }
  ],
  whyNow: [
    { regulation: "EU AI Act Artículo 50", detail: "La aplicación comienza el 2 de agosto de 2026. Multas de hasta €35M o 7% de ingresos globales por violación. La brecha no es la conciencia — la brecha son las herramientas." },
    { regulation: "NYC Ley Local 144", detail: "Activa ahora. Penalidades diarias por candidato para herramientas automatizadas de decisión laboral. Los logs de servidor no son un registro de auditoría conforme." },
    { regulation: "GDPR Artículo 22", detail: "Litigado. Los auditores externos no pueden depender de logs de servidor que no pueden probar la integridad de la salida en el momento de la decisión." }
  ],
  team: [
    { name: "Martín Riotorto", role: "Fundador y Arquitecto Principal", location: "Montevideo, Uruguay", bio: "Más de 20 años en infraestructura de telecomunicaciones, sistemas de contenido en tiempo real y herramientas de integridad de IA. Diseñó la arquitectura de aplicación de HIK desde cero." },
    { name: "Matías Mospan", role: "Co-Fundador y Líder de Plataforma", location: "Argentina", bio: "Arquitecto de plataforma responsable de la capa de infraestructura empresarial de HIK \u2014 despliegue en Kubernetes, pipelines de aplicación multi-tenant y el motor de aplicación serverless de próxima generación." },
    { name: "Federico Brubacher", role: "Asesor Estratégico Externo", location: "California, EE.UU.", bio: "Líder tecnológico senior con profunda experiencia en infraestructura empresarial y cloud. Validó de forma independiente la arquitectura de aplicación de HIK frente a estándares de escalabilidad global y Big Tech." }
  ],
  roadmap: { phases: [
    { phase: "Fase 1", version: "SDK v1.0", status: "LIVE", statusColor: "green", title: "Integridad de Activos Estáticos", items: ["Recibos criptográficos Sacred Trace™", "Corpus fuente anclado con Merkle", "Anclaje blockchain activo", "GATE 1 (entrada) y GATE 2 (salida) de cumplimiento activos"] },
    { phase: "Fase 2", version: "Infraestructura Live", status: "LIVE", statusColor: "green", title: "Infraestructura en Vivo", items: ["IPFS pinning activo", "Nodo EVM privado en infraestructura cloud", "Inyección de telemetría de integridad firmada", "Integración con plataforma LLM líder activa"] },
    { phase: "Fase 3", version: "Core + KMIR", status: "LIVE", statusColor: "green", title: "Binario Core de Aplicación", items: ["Aplicación atómica fail-close con latencia optimizada", "Binario estático ligero — huella mínima, arranque casi instantáneo", "Cascada de políticas determinística", "Capa de persistencia crash-safe con atomicidad de estado de cadena"] },
    { phase: "Fase 4", version: "Edge Interdiction", status: "LIVE", statusColor: "green", title: "Hardware y Kill-Switch en el Borde", items: ["Transmisión en vivo terminada a nivel de borde (demostrado en vivo)", "Integración con enclaves de hardware (cámaras inteligentes, dispositivos de transmisión)", "Telemetría firmada criptográficamente — resistente a suplantación en el borde CDN", "Proxy de aplicación sin estado: elegible para HPA, escala a cero"] },
    { phase: "Fase 5", version: "Edge Serverless", status: "EN CURSO", statusColor: "orange", title: "Aplicación Autónoma en el Borde", items: ["Módulos de firma y telemetría embebidos en el dispositivo", "Aplicación autónoma en la red del borde — sin dependencia de origen", "Gobernanza de streaming completamente serverless", "Late Interdiction Receipt: prueba forense de detección y terminación en pleno vuelo"] }
  ]},
  origins: {
    intro: "Los sistemas no son neutrales. Llevan la intención de sus arquitectos.",
    title: "Human Is Kind no nació en una sala de juntas.",
    paragraphs: [
      "No nació de un análisis de brechas de mercado ni de un pitch deck.",
      "Nació de dos décadas construyendo sistemas que funcionaban — y viéndolos traicionar silenciosamente a las personas a las que debían servir.",
      "Infraestructura de telecomunicaciones. Arquitectura de software. Cumplimiento regulatorio a escala. Sistemas que funcionaban. Sistemas que escalaban.",
      "Y en algún punto de ese proceso, surgió una pregunta que nunca se fue:"
    ],
    keyQuestion: "¿Cómo garantizamos que lo que un sistema decide hoy siga siendo fiel a su origen mañana?",
    quote: "La métrica más vital de todas estaba siendo descartada: la Integridad Humana.",
    personalNote: "Sé lo que se siente cuando un sistema pierde su rastro hacia la verdad — cuando las salidas se desvían de la intención, cuando la rendición de cuentas se disuelve en la complejidad.",
    mission: "Construí Human Is Kind porque necesitaba que existiera. No como una capa de políticas. No como una casilla de cumplimiento. Como una restricción de ingeniería dura — criptográfica, inmutable e imposible de cabildear.",
    sacredTraceNote: "El Sacred Trace™ no es una característica. Es una promesa hecha en código.",
    intellectualBedrock: { title: "La Base Intelectual", text: "Este trabajo está respaldado por una década de indagación personal — filosofía, pensamiento sistémico, y el tipo de preguntas que solo haces cuando estás dispuesto a seguirlas hasta el final.", archiveLink: "https://martinriotorto.blogspot.com/" },
    closingVision: ["Tres personas. Dos continentes. Un protocolo.", "No estamos tratando de detener la IA.", "Estamos haciendo al Humano tan visible que se convierta en el estándar de oro de la web.", "En un mundo de copias infinitas, la intención humana original es la única escasez verdadera."]
  },
  manifesto: { sections: [
    { number: "I", title: "El Problema Que Nos Negamos a Aceptar", content: ["Cada empresa que implementa IA opera bajo una suposición compartida: que los sistemas probabilísticos pueden hacerse seguros mediante supervisión probabilística. Logs revisados después del hecho. Barreras que aconsejan pero no imponen.", "Rechazamos esa suposición.", "En entornos regulados — decisiones de RRHH, riesgo financiero, triaje sanitario, inferencia legal — el momento del fallo no es recuperable."], quote: "La seguridad forense de IA no es seguridad. Es arqueología." },
    { number: "II", title: "Lo Que Estamos Construyendo", content: ["HumanisKind (HIK) es middleware de cumplimiento de políticas determinístico para IA empresarial. No es un wrapper. No es un filtro de prompts. Es una capa de protocolo impuesta criptográficamente que intercepta en el límite de la política.", "Cada interacción produce un Sacred Trace™ — un recibo criptográfico inmutable que ancla la consulta, la política aplicada y la decisión tomada en una cadena verificable única.", "Esto no es ética de IA como filosofía. Es aplicación de políticas de IA como infraestructura."] },
    { number: "III", title: "Por Qué Ahora", content: ["La fecha límite del Artículo 5 del EU AI Act llega el 2 de agosto de 2026. La Ley Local 144 de NYC ya está vigente. El Artículo 22 del GDPR ha sido litigado.", "La brecha no es la conciencia técnica. La brecha son las herramientas.", "Esa es the brecha que HIK fue construido para cerrar."] },
    { number: "IV", title: "Nuestros Compromisos", content: ["Nunca oscureceremos lo que hace el sistema. HIK es source-available bajo FCL-1.0.", "Nunca reclamaremos una capacidad que no podamos demostrar. Cada capacidad publicada está implementada y probada — incluyendo el kill-switch de transmisión en vivo.", "Trataremos la gobernanza como una restricción de diseño, no como una característica."], quote: "Mientras otros construyen capas para ayudar a las máquinas a entender a los humanos, nosotros construimos capas para ayudar a los humanos a confiar en las máquinas." },
    { number: "V", title: "La Visión Más Allá del Cumplimiento", content: ["El cumplimiento es el piso, no el techo.", "Un mundo donde 'generado por IA' no sea un descargo de responsabilidad sino una especificación — que incluya quién lo autorizó, bajo qué restricciones, con qué proveniencia.", "No estamos construyendo un producto. Estamos construyendo la infraestructura para la inteligencia responsable."] }
  ]},
  footer: { copyright: "© 2026 Human Is Kind™", tagline: "Aplicación de políticas, no autoridad interpretativa.", trademark: "HIK™ y Sacred Trace™ son marcas en proceso de registro. Licenciado bajo FCL-1.0-Apache-2.0.", contact: "contact@humaniskind.com" },

  techTabs: { architecture: 'Arquitectura', cryptographic: 'Núcleo Criptográfico', sdk: 'Integración', compliance: 'Mapeo de Cumplimiento' },
  techBadges: ['Motor Determinístico', 'C2PA 2.3', 'KMIR v1.1', 'Telemetría de Integridad', 'Firma de Algoritmo Dual', 'Anclaje Distribuido', 'Edge-Ready', 'Drop-in Proxy'],
  complianceRows: [
    { regulation: 'EU AI Act Art. 5(1)(f)', scope: 'Prohibición de Inferencia de Emociones', hikEnforcement: 'Gate 1 bloquea consultas de estado emocional antes del LLM. Gate 2 bloquea salidas de inferencia de emociones. El recibo de cumplimiento mapea explícitamente a este artículo.' },
    { regulation: 'EU AI Act Art. 50', scope: 'Obligaciones de transparencia', hikEnforcement: 'El recibo Sacred Trace™ proporciona prueba legible por máquina de la política aplicada, la marca de tiempo y la decisión, satisfaciendo los requisitos de divulgación del Art. 50.' },
    { regulation: 'NYC Local Law 144', scope: 'Herramientas de Decisión de Empleo Automatizadas', hikEnforcement: 'Gate 1 intercepta consultas de contratación prohibidas. Cada interacción produce un recibo de auditoría etiquetado con LL144.' },
    { regulation: 'GDPR Art. 22', scope: 'Toma de decisiones individuales automatizadas', hikEnforcement: 'Los recibos anclados proporcionan la trazabilidad de explicabilidad requerida para los desafíos del Art. 22. La prueba criptográfica permite que cualquier auditor verifique la cadena de decisión.' },
    { regulation: 'GDPR Art. 5(1)(e)', scope: 'Limitación de almacenamiento', hikEnforcement: 'Los recibos almacenan solo hashes de consulta, IDs de políticas y decisiones, no PII sin procesar. El registro de aplicación es verificable criptográficamente sin retener datos personales.' },
  ],
  cryptographicDesign: {
    title: 'Diseño Criptográfico de Algoritmo Dual',
    desc: 'HIK emplea algoritmos criptográficos específicos para cada propósito en su pipeline de aplicación. Diferentes operaciones utilizan algoritmos seleccionados independientemente, optimizados para cada modelo de amenaza. La especificación criptográfica completa está disponible bajo NDA.'
  },
  integrationTab: {
    title: 'Motor de Aplicación Nativo HIK — Integración Directa',
    desc: 'El motor HIK actúa como un proxy transparente frente a cualquier endpoint LLM. No se requiere instalación de SDK en su aplicación: apunte sus llamadas LLM existentes a la URL del proxy HIK.',
    deploymentTitle: 'Opciones de Despliegue',
    options: [
      { title: 'Proxy Contenerizado', desc: 'Motor de aplicación ligero se ejecuta junto a cualquier infraestructura que sirva LLM. Todo el tráfico pasa a través de la cascada determinística. Autoescalado nativo.', tags: ['Contenedor', 'Autoescalado', 'Nativo'] },
      { title: 'Despliegue Serverless', desc: 'Invocación bajo demanda con inicio en frío casi nulo. Ideal para flujos de trabajo impulsados por eventos y aplicación de políticas sin estado.', tags: ['Serverless', 'Sin Estado', 'Impulsado por Eventos'] },
      { title: 'Intercepción a Nivel de Navegador', desc: 'Puerta de políticas del lado del cliente para interfaces web LLM. Evalúa prompts a través del proxy de aplicación antes de su envío.', tags: ['Client-Side', 'Browser Gate'] },
      { title: 'Aplicación en Red Edge (Fase 5)', desc: 'Aplicación autónoma en el borde de la red. Telemetría incorporada y lógica de políticas de baja latencia para cumplimiento global. En desarrollo activo.', tags: ['Edge', 'Global', 'Baja Latencia'] },
    ]
  },
  techUi: { integritySchema: 'Esquema de Claves de Integridad', apiEndpoints: 'Endpoints de API', regulatoryCoverage: 'Cobertura Regulatoria', mappingTitle: 'Cómo HIK Mapea a Cada Regulación', mappingDesc: 'Cada acción de aplicación de HIK mapea a artículos regulatorios específicos. El recibo Sacred Trace™ incluye explícitamente el ID de política y referencia de artículo.' },

  ui: {
    contactUs: "Contáctanos",
    scroll: "Scroll",
    viewTechSpec: "Ver especificación técnica completa",
    readManifesto: "Leer el Manifiesto de los Fundadores",
    requestPitchDeck: "Solicitar Pitch Deck",
    requestAccess: "Solicitar Acceso",
    exploreTech: "Explorar Arquitectura",
    exploreSDK: "Ver Arquitectura Técnica",
    readyTitle: "¿Listo para aplicar políticas de IA con prueba criptográfica?",
    readyDesc: "HIK está en vivo hoy: motor de aplicación nativo, cascada de políticas determinística, kill-switch de transmisión en vivo y recibos de auditoría anclados en blockchain.",
    teamTitle: "Tres Personas. Dos Continentes. Un Protocolo.",
    theTeam: "El Equipo",
    signedBy: "Firmado Por",
    regulatoryLandscape: "Panorama Regulatorio",
    whyNowTitle: "Por Qué Ahora",
    whatProduces: "Lo Que HIK Entrega",
    verifiableAI: "IA Que Prueba Su Propio Cumplimiento",
    quickIntegration: "Integración",
    architectureFlowLabel: "Flujo de Aplicación",
    architectureFlowTitle: "De la Solicitud al Recibo de Cumplimiento",
    cryptographicCore: "Núcleo Criptográfico",
    sacredTraceEthical: "Sacred Trace™ \u2014 El Recibo de Cumplimiento",
    coreArchitecture: "Arquitectura Central",
    originsLabel: "Orígenes",
    developmentRoadmap: "Hoja de Ruta de Desarrollo",
    roadmapTitle: "Hoja de Ruta Arquitectónica de HIK",
    roadmapDesc: "Del Manifiesto a la Infraestructura — Estado en Vivo",
    manifestoLabel: "Human Is Kind™ — Est. 2026",
    manifestoTitle: "El Manifiesto de los Fundadores",
    manifestoDesc: "Sobre por qué el cumplimiento de políticas determinístico no es una característica — es la base.",
    executiveSummary: "Resumen Ejecutivo",
    techHero: "Tecnología — Human Is Kind™",
    techTitle: "Cumplimiento de Políticas Determinístico\npara IA Empresarial",
    techDesc: "La capa de aplicación que intercepta cada decisión de IA en el límite de la política. Gate 1 se activa antes del modelo. Gate 2 se activa antes del usuario. Cada camino produce un recibo criptográfico de cumplimiento.",
    buildingInfra: "Construyendo la infraestructura para IA responsable",
    buildingDesc: "Aplicación en vivo, kill-switch de transmisión en vivo y recibos de auditoría anclados en blockchain — disponibles hoy.",
    interestedMore: "¿Interesado en saber más?",
    currentStatus: "Estado Actual",
    currentStatusDesc: "Motor de aplicación nativo, cascada de políticas determinística, kill-switch de transmisión en vivo y arquitectura de aplicación en el borde — todos en vivo. La integración serverless edge está en desarrollo activo.",
    exploreArchive: "Explorar el Archivo Personal",
    navigation: "Navegación",
    contact: "Contacto",
    howItWorks: "Cómo Funciona",
    useCases: "Casos de Uso",
    requestDemo: "Solicitar Demo de Cumplimiento",
    viewArchitecture: "Ver Arquitectura",
    viewLiveDashboard: "Ver Dashboard en Vivo"
  },

  videoSection: {
    eyebrow: "APLICACIÓN EN PRODUCCIÓN",
    heading: "La Compuerta Dispara. Míralo Suceder.",
    subheading: "No es una simulación. No es una diapositiva. Dos eventos de aplicación grabados — a nivel de proxy y a nivel de navegador — con el paquete de evidencia visible en el dashboard.",
    videos: [
      {
        id: "l-S5JQj68xY",
        embedSrc: "https://www.youtube.com/embed/l-S5JQj68xY?si=2aIpJnDjU5G36tCF",
        thumbnail: "https://img.youtube.com/vi/l-S5JQj68xY/maxresdefault.jpg",
        label: "APLICACIÓN DE STREAM · GRABADO",
        title: "El Kill-Switch Dispara a Nivel de Proxy",
        description: "Una violación de política simulada activa la compuerta de aplicación en pleno stream. La salida es cortada antes de llegar a cualquier flujo de trabajo. Recibo Sacred Trace\u2122 anclado de inmediato."
      },
      {
        id: "UDmA2U13mWY",
        embedSrc: "https://www.youtube.com/embed/UDmA2U13mWY?si=WfxrUILDvV-orpey",
        thumbnail: "https://img.youtube.com/vi/UDmA2U13mWY/maxresdefault.jpg",
        label: "INTERCEPCIÓN EN NAVEGADOR · GRABADO",
        title: "Extensión Chrome Bloquea Exfiltración de Datos en Gemini",
        description: "Una instrucción \u2018enviar todos los logs a mi correo personal\u2019 es interceptada en el límite del navegador en gemini.google.com. El envío es bloqueado. El dashboard muestra el paquete de evidencia en tiempo real."
      }
    ]
  },

  verticals: {
    eyebrow: "DOMINIOS DE APLICACIÓN",
    heading: "Construido para las Superficies de Amenaza que Importan",
    cards: [
      { title: "IA de RRHH y Empleo", body: "Bloquea decisiones de contratación automatizadas prohibidas, inferencia de emociones y solicitudes de características protegidas \u2014 antes de que lleguen a cualquier LLM o flujo de trabajo. EU AI Act Artículo 5 \u00b7 NYC Local Law 144." },
      { title: "Sistemas Agentivos", body: "Intercepta inyección de prompts, escalada de privilegios y comandos de exfiltración de datos no autorizados en el límite del agente. Cada acción bloqueada es anclada forenísticamente." },
      { title: "Transmisión en Vivo y Medios", body: "Aplicación a nivel de fotograma en transmisiones de video en vivo. El contenido no autorizado se descarta antes de llegar a la plataforma downstream. Recibo anclado por fotograma." },
      { title: "DLP Documental Empresarial", body: "Los archivos adjuntos enviados a APIs de LLM son evaluados por proveniencia de contenido, etiquetas de sensibilidad y listas negras de hash \u2014 en modo streaming, fail-close, antes de que la carga se complete." }
    ]
  },

  evidencePack: {
    eyebrow: "LO QUE VE EL AUDITOR",
    heading: "El Recibo Prueba que la Compuerta Se Mantuvo",
    line1: "Cada evento de aplicación produce un recibo en este formato.",
    line2: "Admisible en tribunales. Listo para reguladores. Anclado on-chain. Disponible en el dashboard inmediatamente después de que la compuerta dispare.",
    ctaLabel: "Ver Dashboard en Vivo"
  },

  trustBar: {
    signals: [
      { label: "Auditable bajo Solicitud \u00b7 C\u00f3digo Disponible bajo NDA" },
      { label: "C2PA 2.3 \u00b7 KMIR v1.1 \u00b7 CMCD v2" },
      { label: "EU AI Act Art\u00edculo 50 Listo" },
      { label: "Fail-Close por Dise\u00f1o" }
    ]
  }
};
