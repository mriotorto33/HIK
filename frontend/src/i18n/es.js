const SDK_CODE = `import { IntegrityEngine } from '@humaniskind/sdk-v1';

const engine = new IntegrityEngine({
  policyId:   'p_0x882a\u2026',
  merkleRoot: '0x77f2\u2026'
});

const result = await engine.validate(llmOutput);

if (result.ethicalState === 2) {
  stream.kill();
}

const trace = await engine.trace();
// \u2192 HK_TRACE_v1_0x551277a\u2026`;

export const es = {
  nav: {
    links: [
      { label: "Tecnolog\u00eda", path: "/technology" },
      { label: "Or\u00edgenes", path: "/origins" },
      { label: "Hoja de Ruta", path: "/roadmap" },
      { label: "Manifiesto", path: "/manifesto" },
      { label: "Resumen Ejecutivo", path: "/executive-summary" }
    ]
  },
  hero: {
    subtitle: "INFRAESTRUCTURA DETERMIN\u00cdSTICA DE GOBERNANZA DE IA",
    description: "Proporcionamos la capa de protocolo que transforma los sistemas de IA probabil\u00edsticos en infraestructura verificable, auditable y controlada por humanos. La \u00e9tica no es una caracter\u00edstica \u2014 es la restricci\u00f3n de dise\u00f1o.",
    badges: ["SDK v1.0 Live", "C2PA 2.3", "KMIR v1.1", "CMCD v2", "Polygon Anchoring", "Zero-Trust Middleware"],
    cta: {
      primary: { text: "Explorar SDK v1.0", link: "/technology" },
      secondary: { text: "Resumen Ejecutivo", link: "/executive-summary" }
    }
  },
  problem: {
    title: "El Problema",
    description: "Cada empresa que implementa IA enfrenta la misma brecha estructural: los sistemas de IA generan decisiones \u2014 res\u00famenes de contrataci\u00f3n, alertas de pr\u00e9stamos, triaje de pacientes \u2014 pero no producen prueba criptogr\u00e1fica de que esas decisiones se mantuvieron dentro de la pol\u00edtica en el momento en que fueron tomadas.",
    highlight: "Los logs te dicen qu\u00e9 pas\u00f3. No pueden probar qu\u00e9 estaba autorizado a pasar. Esa distinci\u00f3n es toda la responsabilidad legal."
  },
  solution: {
    title: "La Soluci\u00f3n",
    description: "HIK es una capa middleware agnóstica al modelo que intercepta cada interacción de IA en el l\u00edmite de salida \u2014 antes de que llegue a cualquier flujo de trabajo. En el momento de la aplicaci\u00f3n, genera un Sacred Trace\u2122.",
    highlight: "Si la salida viola la pol\u00edtica, la compuerta se activa. La salida nunca llega al flujo de trabajo. El recibo demuestra que la compuerta se mantuvo."
  },
  trinityProtocol: {
    title: "El Protocolo Trinity", subtitle: "Arquitectura Central",
    layers: [
      { id: "01", name: "Proveniencia de Contenido", description: "Est\u00e1ndar C2PA 2.3 para la firma criptogr\u00e1fica de cada fragmento de contenido. Cada segmento de video fMP4 incluye un hash de su predecesor, creando una cadena de custodia inquebrantable desde el origen hasta la salida.", tags: ["C2PA 2.3", "VSI", "Merkle Anchoring"] },
      { id: "02", name: "Kernel \u00c9tico de Ejecuci\u00f3n", description: "KMIR \u2014 el Kernel para Reconocimiento de Intenci\u00f3n basado en Manifiesto. Valida cada salida de IA contra la Intenci\u00f3n Soberana declarada antes de la entrega. Si el sistema se desv\u00eda, la aplicaci\u00f3n es autom\u00e1tica.", tags: ["KMIR v1.1", "manifesto.json", "@ethics_constrained"] },
      { id: "03", name: "Pulso de Telemetr\u00eda en Vivo", description: "Las claves extendidas CMCD v2 transmiten el Estado \u00c9tico de cada fragmento en vivo en tiempo real. La integridad se vuelve observable a nivel de infraestructura \u2014 no despu\u00e9s del hecho, sino durante la transmisi\u00f3n.", tags: ["CMCD v2", "hik-es", "hik-ps", "Real-time"] }
    ]
  },
  sacredTrace: {
    title: "Sacred Trace\u2122", subtitle: "N\u00facleo Criptogr\u00e1fico",
    description: "Cada interacci\u00f3n produce un recibo criptogr\u00e1fico inmutable y reproducible \u2014 el Sacred Trace\u2122",
    formula: "Traceability_Hash = Hash(Query + Policy_ID + Source_Root + LM_Output)",
    ethicalKeys: [
      { key: "hik-es", values: ["0 \u2014 SEGURO \u00b7 Salida verificada", "1 \u2014 DESV\u00cdO \u00b7 Desviaci\u00f3n de intenci\u00f3n detectada", "2 \u2014 DETENER \u00b7 Transmisi\u00f3n cortada"] },
      { key: "hik-ps", description: "Puntuaci\u00f3n de Proveniencia \u2014 verificaci\u00f3n en tiempo real del fragmento VSI contra el Source Root. Rango: 0.0 \u2192 1.0" }
    ],
    sdkApi: [
      { method: ".anchor()", description: "Crea un \u00c1rbol Merkle del corpus fuente. Retorna el hash MerkleRoot para vinculaci\u00f3n de pol\u00edticas." },
      { method: ".validate()", description: "Compara la salida del LLM contra las restricciones del Manifiesto de Pol\u00edticas declarado. Retorna estado hik-es." },
      { method: ".trace()", description: "Genera el recibo final Sacred Trace\u2122. Anclado on-chain v\u00eda Polygon." }
    ]
  },
  sdkCode: SDK_CODE,
  architectureFlow: [
    { label: "Consulta del Usuario", sublabel: "Entrada" },
    { label: "Manifiesto de Pol\u00edticas", sublabel: "manifesto.json \u00b7 solo lectura" },
    { label: "Corpus Fuente", sublabel: "Merkle Root \u00b7 anclado" },
    { label: "Procesamiento LLM", sublabel: "Guardrails KMIR \u00b7 activos" },
    { label: "Guardia Sem\u00e1ntica", sublabel: "Validaci\u00f3n de intenci\u00f3n" },
    { label: "Sacred Trace\u2122", sublabel: "Recibo criptogr\u00e1fico" }
  ],
  whatHikProduces: [
    { title: "Recibos Criptogr\u00e1ficos", description: "Admisibles en tribunales, listos para reguladores, verificables por m\u00e1quinas." },
    { title: "Aplicaci\u00f3n Doble Compuerta", description: "GATE 1 entrada / GATE 2 salida en menos de 1 milisegundo." },
    { title: "Anclaje Blockchain", description: "Prueba v\u00eda Polygon \u2014 reproducible por cualquier auditor o tribunal." },
    { title: "Agn\u00f3stico al Modelo", description: "Se integra en pipelines de IA existentes sin reemplazarlos." }
  ],
  whyNow: [
    { regulation: "EU AI Act Art\u00edculo 50", detail: "La aplicaci\u00f3n comienza el 2 de agosto de 2026. Multas de hasta \u20ac35M o 7% de los ingresos globales por violaci\u00f3n." },
    { regulation: "NYC Ley Local 144", detail: "Activa ahora. Penalidades diarias por candidato para herramientas automatizadas de decisi\u00f3n laboral." },
    { regulation: "GDPR Art\u00edculo 22", detail: "Litigado. Los auditores externos no pueden depender de logs de servidor que no pueden probar la integridad de la salida." }
  ],
  team: [
    { name: "Mart\u00edn Riotorto", role: "Fundador y Arquitecto Principal", location: "Montevideo, Uruguay", bio: "M\u00e1s de 20 a\u00f1os en infraestructura de telecomunicaciones, sistemas de contenido en tiempo real y herramientas de integridad de IA. Ex contribuidor al ecosistema C2PA." },
    { name: "Mat\u00edas Mospan", role: "Co-Fundador y L\u00edder de Plataforma", location: "Argentina", bio: "Arquitecto de plataforma responsable de la capa de infraestructura empresarial de HIK \u2014 despliegue en GKE, pipelines de aplicaci\u00f3n multi-tenant y el motor de aplicaci\u00f3n de pr\u00f3xima generaci\u00f3n." },
    { name: "Federico Brubacher", role: "Asesor Estrat\u00e9gico Externo", location: "Uruguay", bio: "L\u00edder tecnol\u00f3gico senior con profunda experiencia en infraestructura empresarial y cloud. Asesora a HIK en posicionamiento estrat\u00e9gico, arquitectura empresarial y escalamiento global." }
  ],
  roadmap: { phases: [
    { phase: "Fase 1", version: "SDK v1.0", status: "LIVE", statusColor: "green", title: "Integridad de Activos Est\u00e1ticos", items: ["Recibos criptogr\u00e1ficos Sacred Trace\u2122", "Corpus fuente anclado con Merkle", "Anclaje blockchain en Polygon", "GATE 1 (entrada) y GATE 2 (salida) activos"] },
    { phase: "Fase 2", version: "Infraestructura Live", status: "LIVE", statusColor: "green", title: "Infraestructura en Vivo", items: ["IPFS pinning activo", "Nodo EVM privado en GCP/Kubernetes", "Inyecci\u00f3n de headers de telemetr\u00eda CMCD v2", "Integraci\u00f3n con Gemini 2.5 Flash activa"] },
    { phase: "Fase 3", version: "Go Core + KMIR", status: "DEV ACTIVO", statusColor: "amber", title: "Binario Go Core + KMIR v1.1", items: ["Aplicaci\u00f3n at\u00f3mica fail-close en menos de 1ms", "Binario est\u00e1tico Go para ejecuci\u00f3n P99 sub-milisegundo", "Kernel \u00c9tico KMIR con coincidencia difusa", "Compuerta estructural ante categor\u00edas de intenci\u00f3n prohibidas"] },
    { phase: "Fase 4", version: "Capa Empresarial", status: "PLANIFICADO", statusColor: "gray", title: "Capa Empresarial", items: ["Pipelines de aplicaci\u00f3n multi-tenant", "Dashboard del SDK", "SLA empresarial", "Integraciones nativas para RRHH, FinTech, HealthTech"] }
  ]},
  origins: {
    intro: "Los sistemas no son neutrales. Llevan la intenci\u00f3n de sus arquitectos.",
    title: "Human Is Kind no naci\u00f3 en una sala de juntas.",
    paragraphs: [
      "No naci\u00f3 de un an\u00e1lisis de brechas de mercado ni de un pitch deck.",
      "Naci\u00f3 de dos d\u00e9cadas construyendo sistemas que funcionaban \u2014 y vi\u00e9ndolos traicionar silenciosamente a las personas a las que deb\u00edan servir.",
      "Infraestructura de telecomunicaciones. Arquitectura de software. Cumplimiento regulatorio a escala. Sistemas que funcionaban. Sistemas que escalaban.",
      "Y en alg\u00fan punto de ese proceso, surgi\u00f3 una pregunta que nunca se fue:"
    ],
    keyQuestion: "\u00bfC\u00f3mo garantizamos que lo que un sistema decide hoy siga siendo fiel a su origen ma\u00f1ana?",
    quote: "La m\u00e9trica m\u00e1s vital de todas estaba siendo descartada: la Integridad Humana.",
    personalNote: "S\u00e9 lo que se siente cuando un sistema pierde su rastro hacia la verdad \u2014 cuando las salidas se desv\u00edan de la intenci\u00f3n, cuando la rendici\u00f3n de cuentas se disuelve en la complejidad.",
    mission: "Constru\u00ed Human Is Kind porque necesitaba que existiera. No como una capa de pol\u00edticas. No como una casilla de cumplimiento. Como una restricci\u00f3n de ingenier\u00eda dura \u2014 criptogr\u00e1fica, inmutable e imposible de cabildear.",
    sacredTraceNote: "El Sacred Trace\u2122 no es una caracter\u00edstica. Es una promesa hecha en c\u00f3digo.",
    intellectualBedrock: { title: "La Base Intelectual", text: "Este trabajo est\u00e1 respaldado por una d\u00e9cada de indagaci\u00f3n personal \u2014 filosof\u00eda, pensamiento sist\u00e9mico, y el tipo de preguntas que solo haces cuando est\u00e1s dispuesto a seguirlas hasta el final.", archiveLink: "https://martinriotorto.blogspot.com/" },
    closingVision: ["Tres personas. Tres continentes. Un protocolo.", "No estamos tratando de detener la IA.", "Estamos haciendo al Humano tan visible que se convierta en el est\u00e1ndar de oro de la web.", "En un mundo de copias infinitas, la intenci\u00f3n humana original es la \u00fanica escasez verdadera."]
  },
  manifesto: { sections: [
    { number: "I", title: "El Problema Que Nos Negamos a Aceptar", content: ["Cada empresa que implementa IA opera bajo una suposici\u00f3n compartida: que los sistemas probabil\u00edsticos pueden hacerse seguros mediante supervisi\u00f3n probabil\u00edstica. Logs revisados despu\u00e9s del hecho. Barreras que aconsejan pero no imponen.", "Rechazamos esa suposici\u00f3n.", "En entornos regulados \u2014 decisiones de RRHH, riesgo financiero, triaje sanitario, inferencia legal \u2014 el momento del fallo no es recuperable."], quote: "La seguridad forense de IA no es seguridad. Es arqueolog\u00eda." },
    { number: "II", title: "Lo Que Estamos Construyendo", content: ["HumanisKind (HIK) es middleware de gobernanza de IA determin\u00edstica. No es un wrapper. No es un filtro de prompts. Es una capa de protocolo impuesta criptogr\u00e1ficamente.", "Cada interacci\u00f3n produce un Sacred Trace\u2122 \u2014 un recibo criptogr\u00e1fico inmutable que ancla la consulta, el manifiesto de pol\u00edticas, el corpus fuente y la salida en una cadena verificable \u00fanica.", "Esto no es \u00e9tica de IA como filosof\u00eda. Es \u00e9tica de IA como infraestructura."] },
    { number: "III", title: "Por Qu\u00e9 Ahora", content: ["La fecha l\u00edmite del Art\u00edculo 5 del EU AI Act llega el 2 de agosto de 2026. La Ley Local 144 de NYC ya est\u00e1 vigente. El Art\u00edculo 22 del GDPR ha sido litigado.", "La brecha no es la conciencia t\u00e9cnica. La brecha son las herramientas.", "Esa es la brecha que HIK fue construido para cerrar."] },
    { number: "IV", title: "Nuestros Compromisos", content: ["Nunca oscureceremos lo que hace el sistema. HIK es source-available bajo FCL-1.0.", "Nunca reclamaremos seguridad que no podamos demostrar. Cada capacidad publicada est\u00e1 implementada y probada.", "Trataremos la gobernanza como una restricci\u00f3n de dise\u00f1o, no como una caracter\u00edstica."], quote: "Mientras otros construyen capas para ayudar a las m\u00e1quinas a entender a los humanos, nosotros construimos capas para ayudar a los humanos a confiar en las m\u00e1quinas." },
    { number: "V", title: "La Visi\u00f3n M\u00e1s All\u00e1 del Cumplimiento", content: ["El cumplimiento es el piso, no el techo.", "Un mundo donde 'generado por IA' no sea un descargo de responsabilidad sino una especificaci\u00f3n \u2014 que incluya qui\u00e9n lo autoriz\u00f3, bajo qu\u00e9 restricciones, con qu\u00e9 proveniencia.", "No estamos construyendo un producto. Estamos construyendo la infraestructura para la inteligencia responsable."] }
  ]},
  footer: { copyright: "\u00a9 2026 Human Is Kind\u2122", tagline: "Infraestructura de gobernanza, no autoridad interpretativa.", trademark: "HIK\u2122 y Sacred Trace\u2122 son marcas en proceso de registro. Licenciado bajo FCL-1.0-Apache-2.0.", contact: "contact@humaniskind.com" },
  ui: {
    contactUs: "Cont\u00e1ctanos",
    scroll: "Scroll",
    viewTechSpec: "Ver especificaci\u00f3n t\u00e9cnica completa",
    readManifesto: "Leer el Manifiesto de los Fundadores",
    requestPitchDeck: "Solicitar Pitch Deck",
    requestAccess: "Solicitar Acceso",
    exploreTech: "Explorar Tecnolog\u00eda",
    exploreSDK: "Explorar SDK v1.0",
    readyTitle: "\u00bfListo para hacer la IA observable en tiempo de ejecuci\u00f3n?",
    readyDesc: "SDK v1.0 est\u00e1 activo. Integridad de activos est\u00e1ticos disponible hoy. Aplicaci\u00f3n de transmisi\u00f3n en vivo en v2.0.",
    teamTitle: "Tres Personas. Tres Continentes. Un Protocolo.",
    theTeam: "El Equipo",
    signedBy: "Firmado Por",
    regulatoryLandscape: "Panorama Regulatorio",
    whyNowTitle: "Por Qu\u00e9 Ahora",
    whatProduces: "Lo Que HIK Produce",
    verifiableAI: "IA Verificable en Tiempo Real",
    quickIntegration: "Integraci\u00f3n R\u00e1pida",
    architectureFlowLabel: "Flujo de Arquitectura",
    architectureFlowTitle: "De la Consulta al Trace",
    cryptographicCore: "N\u00facleo Criptogr\u00e1fico",
    sacredTraceEthical: "Sacred Trace\u2122 y Pulso \u00c9tico",
    coreArchitecture: "Arquitectura Central",
    originsLabel: "Or\u00edgenes",
    developmentRoadmap: "Hoja de Ruta de Desarrollo",
    roadmapTitle: "Hoja de Ruta Arquitect\u00f3nica de HIK",
    roadmapDesc: "Del Manifiesto a la Infraestructura \u2014 Estado en Vivo",
    manifestoLabel: "Human Is Kind\u2122 \u2014 Est. 2026",
    manifestoTitle: "El Manifiesto de los Fundadores",
    manifestoDesc: "Sobre por qu\u00e9 la gobernanza determin\u00edstica no es una caracter\u00edstica \u2014 es la base.",
    executiveSummary: "Resumen Ejecutivo",
    techHero: "Tecnolog\u00eda \u2014 Human Is Kind\u2122",
    techTitle: "Infraestructura Determin\u00edstica\nde Gobernanza de IA",
    techDesc: "Proporcionamos la capa de protocolo que transforma los sistemas de IA probabil\u00edsticos en infraestructura verificable, auditable y controlada por humanos.",
    buildingInfra: "Construyendo la infraestructura para la inteligencia responsable",
    buildingDesc: "SDK v1.0 est\u00e1 activo. \u00danete a nosotros en la construcci\u00f3n de la capa de gobernanza que el mundo necesita.",
    interestedMore: "\u00bfInteresado en saber m\u00e1s?",
    currentStatus: "Estado Actual",
    currentStatusDesc: "SDK v1.0 activo. GATE 1 / GATE 2 activos. Ejecutando en Gemini 2.5 Flash. IPFS pinning y nodo EVM privado en GCP activos. Binario Go core en desarrollo activo.",
    exploreArchive: "Explorar el Archivo Personal",
    navigation: "Navegaci\u00f3n",
    contact: "Contacto"
  }
};
