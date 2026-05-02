const SDK_CODE = `import { IntegrityEngine } from '@humaniskind/sdk-v1';

const engine = new IntegrityEngine({
  policyId:   'p_0x882a…',
  merkleRoot: '0x77f2…'
});

const result = await engine.validate(llmOutput);

if (result.ethicalState === 2) {
  stream.kill();
}

const trace = await engine.trace();
// → HK_TRACE_v1_0x551277a…`;

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
    subtitle: "INFRAESTRUCTURA DETERMINÍSTICA DE GOBERNANZA DE IA",
    description: "Proporcionamos la capa de protocolo que transforma los sistemas de IA probabilísticos en infraestructura verificable, auditable y controlada por humanos. La ética no es una característica — es la restricción de diseño.",
    badges: ["SDK v1.0 Live", "C2PA 2.3", "KMIR v1.1", "CMCD v2", "Polygon Anchoring", "Zero-Trust Middleware"],
    cta: {
      primary: { text: "Explorar SDK v1.0", link: "/technology" },
      secondary: { text: "Resumen Ejecutivo", link: "/executive-summary" }
    }
  },
  problem: {
    title: "El Problema",
    description: "Cada empresa que implementa IA enfrenta la misma brecha estructural: los sistemas de IA generan decisiones — resúmenes de contratación, alertas de préstamos, triaje de pacientes — pero no producen prueba criptográfica de que esas decisiones se mantuvieron dentro de la política en el momento en que fueron tomadas.",
    highlight: "Los logs te dicen qué pasó. No pueden probar qué estaba autorizado a pasar. Esa distinción es toda la responsabilidad legal."
  },
  solution: {
    title: "La Solución",
    description: "HIK es una capa middleware agnóstica al modelo que intercepta cada interacción de IA en el límite de salida — antes de que llegue a cualquier flujo de trabajo. En el momento de la aplicación, genera un Sacred Trace™.",
    highlight: "Si la salida viola la política, la compuerta se activa. La salida nunca llega al flujo de trabajo. El recibo demuestra que la compuerta se mantuvo."
  },
  trinityProtocol: {
    title: "El Protocolo de Aplicación", subtitle: "Arquitectura Central",
    layers: [
      { id: "01", name: "Proveniencia de Contenido", description: "Estándar C2PA 2.3 para la firma criptográfica de cada fragmento de contenido. Cada segmento de video fMP4 incluye un hash de su predecesor, creando una cadena de custodia inquebrantable desde el origen hasta la salida.", tags: ["C2PA 2.3", "VSI", "Merkle Anchoring"] },
      { id: "02", name: "Kernel Ético de Ejecución", description: "KMIR — el Kernel para Reconocimiento de Intención basado en Manifiesto. Valida cada salida de IA contra la Intención Soberana declarada antes de la entrega. Si el sistema se desvía, la aplicación es automática.", tags: ["KMIR v1.1", "manifesto.json", "@ethics_constrained"] },
      { id: "03", name: "Pulso de Telemetría en Vivo", description: "Las claves extendidas CMCD v2 transmiten el Estado Ético de cada fragmento en vivo en tiempo real. La integridad se vuelve observable a nivel de infraestructura — no después del hecho, sino durante la transmisión.", tags: ["CMCD v2", "hik-es", "hik-ps", "Real-time"] },
      { id: "04", name: "Cascada de Aplicación Multicapa", description: "Evaluación semántica y telemetría de hardware por debajo del milisegundo. No solo para wrappers de LLMs — nuestra capacidad de Gobernanza de Transmisiones en Vivo puede cortar activamente fuentes de cámaras de seguridad físicas o sesiones en vivo en pleno vuelo si ocurre una violación.", tags: ["Sub-milisegundo", "Kill-Switch en Vivo", "Hardware Enclaves"] }
    ]
  },
  sacredTrace: {
    title: "Sacred Trace™", subtitle: "Núcleo Criptográfico",
    description: "Cada interacción produce un recibo criptográfico inmutable y reproducible — el Sacred Trace™",
    formula: "Traceability_Hash = Hash(Query + Policy_ID + Source_Root + LM_Output)",
    ethicalKeys: [
      { key: "hik-es", values: ["0 — SEGURO · Salida verificada", "1 — DESVÍO · Desviación de intención detectada", "2 — DETENER · Transmisión cortada"] },
      { key: "hik-ps", description: "Puntuación de Proveniencia — verificación en tiempo real del fragmento VSI contra el Source Root. Rango: 0.0 → 1.0" }
    ],
    sdkApi: [
      { method: ".anchor()", description: "Crea un Árbol Merkle del corpus fuente. Retorna el hash MerkleRoot para vinculación de políticas." },
      { method: ".validate()", description: "Compara la salida del LLM contra las restricciones del Manifiesto de Políticas declarado. Retorna estado hik-es." },
      { method: ".trace()", description: "Genera el recibo final Sacred Trace™. Anclado on-chain vía Polygon." }
    ]
  },
  sdkCode: SDK_CODE,
  architectureFlow: [
    { label: "Consulta del Usuario", sublabel: "Entrada" },
    { label: "Manifiesto de Políticas", sublabel: "manifesto.json · solo lectura" },
    { label: "Corpus Fuente", sublabel: "Merkle Root · anclado" },
    { label: "Procesamiento LLM", sublabel: "Guardrails KMIR · activos" },
    { label: "Guardia Semántica", sublabel: "Validación de intención" },
    { label: "Sacred Trace™", sublabel: "Recibo criptográfico" }
  ],
  whatHikProduces: [
    { title: "Recibos Criptográficos", description: "Admisibles en tribunales, listos para reguladores, verificables por máquinas." },
    { title: "Aplicación Doble Compuerta", description: "GATE 1 entrada / GATE 2 salida en menos de 1 milisegundo." },
    { title: "Anclaje Blockchain", description: "Prueba vía Polygon — reproducible por cualquier auditor o tribunal." },
    { title: "Agnóstico al Modelo", description: "Se integra en pipelines de IA existentes sin reemplazarlos." }
  ],
  whyNow: [
    { regulation: "EU AI Act Artículo 50", detail: "La aplicación comienza el 2 de agosto de 2026. Multas de hasta €35M o 7% de los ingresos globales por violación." },
    { regulation: "NYC Ley Local 144", detail: "Activa ahora. Penalidades diarias por candidato para herramientas automatizadas de decisión laboral." },
    { regulation: "GDPR Artículo 22", detail: "Litigado. Los auditores externos no pueden depender de logs de servidor que no pueden probar la integridad de la salida." }
  ],
  team: [
    { name: "Martín Riotorto", role: "Fundador y Arquitecto Principal", location: "Montevideo, Uruguay", bio: "Más de 20 años en infraestructura de telecomunicaciones, sistemas de contenido en tiempo real y herramientas de integridad de IA. Ex contribuidor al ecosistema C2PA." },
    { name: "Matías Mospan", role: "Co-Fundador y Líder de Plataforma", location: "Argentina", bio: "Arquitecto de plataforma responsable de la capa de infraestructura empresarial de HIK — despliegue en GKE, pipelines de aplicación multi-tenant y el motor de aplicación de próxima generación." },
    { name: "Federico Brubacher", role: "Asesor Estratégico Externo", location: "Uruguay", bio: "Líder tecnológico senior con profunda experiencia en infraestructura empresarial y cloud. Asesora a HIK en posicionamiento estratégico, arquitectura empresarial y escalamiento global." }
  ],
  roadmap: { phases: [
    { phase: "Fase 1", version: "SDK v1.0", status: "LIVE", statusColor: "green", title: "Integridad de Activos Estáticos", items: ["Recibos criptográficos Sacred Trace™", "Corpus fuente anclado con Merkle", "Anclaje blockchain en Polygon", "GATE 1 (entrada) y GATE 2 (salida) activos"] },
    { phase: "Fase 2", version: "Infraestructura Live", status: "LIVE", statusColor: "green", title: "Infraestructura en Vivo", items: ["IPFS pinning activo", "Nodo EVM privado en GCP/Kubernetes", "Inyección de headers de telemetría CMCD v2", "Integración con Gemini 2.5 Flash activa"] },
    { phase: "Fase 3", version: "Go Core + KMIR", status: "LIVE", statusColor: "green", title: "Binario Go Core + KMIR v1.1", items: ["Aplicación atómica fail-close en menos de 1ms", "Binario estático Go para ejecución P99 sub-milisegundo", "Kernel Ético KMIR con coincidencia difusa", "Compuerta estructural ante categorías de intención prohibidas"] },
    { phase: "Fase 4", version: "Edge Interdiction", status: "LIVE", statusColor: "green", title: "Interdicción de Hardware y Borde", items: ["Integración con enclaves de hardware (cámaras inteligentes)", "Despliegue edge en CDN de latencia ultra baja", "Interdicción de transmisiones en sub-milisegundo", "Intercepción stateless en el borde"] },
    { phase: "Fase 5", version: "Capa Empresarial", status: "PLANIFICADO", statusColor: "gray", title: "Capa Empresarial", items: ["Pipelines de aplicación multi-tenant", "Dashboard del SDK", "SLA empresarial", "Integraciones nativas para RRHH, FinTech, HealthTech"] }
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
    closingVision: ["Tres personas. Tres continentes. Un protocolo.", "No estamos tratando de detener la IA.", "Estamos haciendo al Humano tan visible que se convierta en el estándar de oro de la web.", "En un mundo de copias infinitas, la intención humana original es la única escasez verdadera."]
  },
  manifesto: { sections: [
    { number: "I", title: "El Problema Que Nos Negamos a Aceptar", content: ["Cada empresa que implementa IA opera bajo una suposición compartida: que los sistemas probabilísticos pueden hacerse seguros mediante supervisión probabilística. Logs revisados después del hecho. Barreras que aconsejan pero no imponen.", "Rechazamos esa suposición.", "En entornos regulados — decisiones de RRHH, riesgo financiero, triaje sanitario, inferencia legal — el momento del fallo no es recuperable."], quote: "La seguridad forense de IA no es seguridad. Es arqueología." },
    { number: "II", title: "Lo Que Estamos Construyendo", content: ["HumanisKind (HIK) es middleware de gobernanza de IA determinística. No es un wrapper. No es un filtro de prompts. Es una capa de protocolo impuesta criptográficamente.", "Cada interacción produce un Sacred Trace™ — un recibo criptográfico inmutable que ancla la consulta, el manifiesto de políticas, el corpus fuente y la salida en una cadena verificable única.", "Esto no es ética de IA como filosofía. Es ética de IA como infraestructura."] },
    { number: "III", title: "Por Qué Ahora", content: ["La fecha límite del Artículo 5 del EU AI Act llega el 2 de agosto de 2026. La Ley Local 144 de NYC ya está vigente. El Artículo 22 del GDPR ha sido litigado.", "La brecha no es la conciencia técnica. La brecha son las herramientas.", "Esa es la brecha que HIK fue construido para cerrar."] },
    { number: "IV", title: "Nuestros Compromisos", content: ["Nunca oscureceremos lo que hace el sistema. HIK es source-available bajo FCL-1.0.", "Nunca reclamaremos seguridad que no podamos demostrar. Cada capacidad publicada está implementada y probada.", "Trataremos la gobernanza como una restricción de diseño, no como una característica."], quote: "Mientras otros construyen capas para ayudar a las máquinas a entender a los humanos, nosotros construimos capas para ayudar a los humanos a confiar en las máquinas." },
    { number: "V", title: "La Visión Más Allá del Cumplimiento", content: ["El cumplimiento es el piso, no el techo.", "Un mundo donde 'generado por IA' no sea un descargo de responsabilidad sino una especificación — que incluya quién lo autorizó, bajo qué restricciones, con qué proveniencia.", "No estamos construyendo un producto. Estamos construyendo la infraestructura para la inteligencia responsable."] }
  ]},
  footer: { copyright: "© 2026 Human Is Kind™", tagline: "Infraestructura de gobernanza, no autoridad interpretativa.", trademark: "HIK™ y Sacred Trace™ son marcas en proceso de registro. Licenciado bajo FCL-1.0-Apache-2.0.", contact: "contact@humaniskind.com" },
  ui: {
    contactUs: "Contáctanos",
    scroll: "Scroll",
    viewTechSpec: "Ver especificación técnica completa",
    readManifesto: "Leer el Manifiesto de los Fundadores",
    requestPitchDeck: "Solicitar Pitch Deck",
    requestAccess: "Solicitar Acceso",
    exploreTech: "Explorar Tecnología",
    exploreSDK: "Explorar SDK v1.0",
    readyTitle: "¿Listo para hacer la IA observable en tiempo de ejecución?",
    readyDesc: "SDK v1.0, Infraestructura Live, Go Core v5.0 y Edge Interdiction están 100% ACTIVOS hoy.",
    teamTitle: "Tres Personas. Tres Continentes. Un Protocolo.",
    theTeam: "El Equipo",
    signedBy: "Firmado Por",
    regulatoryLandscape: "Panorama Regulatorio",
    whyNowTitle: "Por Qué Ahora",
    whatProduces: "Lo Que HIK Produce",
    verifiableAI: "IA Verificable en Tiempo Real",
    quickIntegration: "Integración Rápida",
    architectureFlowLabel: "Flujo de Arquitectura",
    architectureFlowTitle: "De la Consulta al Trace",
    cryptographicCore: "Núcleo Criptográfico",
    sacredTraceEthical: "Sacred Trace™ y Pulso Ético",
    coreArchitecture: "Arquitectura Central",
    originsLabel: "Orígenes",
    developmentRoadmap: "Hoja de Ruta de Desarrollo",
    roadmapTitle: "Hoja de Ruta Arquitectónica de HIK",
    roadmapDesc: "Del Manifiesto a la Infraestructura — Estado en Vivo",
    manifestoLabel: "Human Is Kind™ — Est. 2026",
    manifestoTitle: "El Manifiesto de los Fundadores",
    manifestoDesc: "Sobre por qué la gobernanza determinística no es una característica — es la base.",
    executiveSummary: "Resumen Ejecutivo",
    techHero: "Tecnología — Human Is Kind™",
    techTitle: "Infraestructura Determinística\nde Gobernanza de IA",
    techDesc: "Proporcionamos la capa de protocolo que transforma los sistemas de IA probabilísticos en infraestructura verificable, auditable y controlada por humanos.",
    buildingInfra: "Construyendo la infraestructura para la inteligencia responsable",
    buildingDesc: "SDK v1.0 está activo. Únete a nosotros en la construcción de la capa de gobernanza que el mundo necesita.",
    interestedMore: "¿Interesado en saber más?",
    currentStatus: "Estado Actual",
    currentStatusDesc: "Desde SDK v1.0 hasta Edge Interdiction, HIK v5.0 está ACTIVO. Ejecución fail-close sub-milisegundo, Kernel Ético KMIR, e integración con hardware enclaves desplegados y operativos.",
    exploreArchive: "Explorar el Archivo Personal",
    navigation: "Navegación",
    contact: "Contacto"
  }
};
