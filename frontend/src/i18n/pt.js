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

export const pt = {
  nav: {
    links: [
      { label: "Tecnologia", path: "/technology" },
      { label: "Origens", path: "/origins" },
      { label: "Roteiro", path: "/roadmap" },
      { label: "Manifesto", path: "/manifesto" },
      { label: "Resumo Executivo", path: "/executive-summary" }
    ]
  },
  hero: {
    subtitle: "INFRAESTRUTURA DETERMIN\u00cdSTICA DE GOVERNAN\u00c7A DE IA",
    description: "Fornecemos a camada de protocolo que transforma sistemas de IA probabil\u00edsticos em infraestrutura verific\u00e1vel, audit\u00e1vel e controlada por humanos. \u00c9tica n\u00e3o \u00e9 uma funcionalidade \u2014 \u00e9 a restri\u00e7\u00e3o de design.",
    badges: ["SDK v1.0 Live", "C2PA 2.3", "KMIR v1.1", "CMCD v2", "Polygon Anchoring", "Zero-Trust Middleware"],
    cta: {
      primary: { text: "Explorar SDK v1.0", link: "/technology" },
      secondary: { text: "Resumo Executivo", link: "/executive-summary" }
    }
  },
  problem: {
    title: "O Problema",
    description: "Cada empresa que implementa IA hoje enfrenta a mesma lacuna estrutural: sistemas de IA geram decis\u00f5es \u2014 resumos de contrata\u00e7\u00e3o, alertas de empr\u00e9stimos, triagem de pacientes \u2014 mas n\u00e3o produzem prova criptogr\u00e1fica de que essas decis\u00f5es permaneceram dentro da pol\u00edtica no momento em que foram tomadas.",
    highlight: "Os logs dizem o que aconteceu. N\u00e3o podem provar o que estava autorizado a acontecer. Essa distin\u00e7\u00e3o \u00e9 toda a responsabilidade legal."
  },
  solution: {
    title: "A Solu\u00e7\u00e3o",
    description: "HIK \u00e9 uma camada de middleware agn\u00f3stica ao modelo que intercepta cada intera\u00e7\u00e3o de IA no limite de sa\u00edda \u2014 antes de chegar a qualquer fluxo de trabalho. No momento da aplica\u00e7\u00e3o, gera um Sacred Trace\u2122.",
    highlight: "Se a sa\u00edda viola a pol\u00edtica, a comporta dispara. A sa\u00edda nunca chega ao fluxo de trabalho. O recibo prova que a comporta se manteve."
  },
  trinityProtocol: {
    title: "O Protocolo Trinity", subtitle: "Arquitetura Central",
    layers: [
      { id: "01", name: "Proveni\u00eancia de Conte\u00fado", description: "Padr\u00e3o C2PA 2.3 para assinatura criptogr\u00e1fica de cada fragmento de conte\u00fado. Cada segmento de v\u00eddeo fMP4 inclui um hash do seu predecessor, criando uma cadeia de cust\u00f3dia inquebrável da origem \u00e0 sa\u00edda.", tags: ["C2PA 2.3", "VSI", "Merkle Anchoring"] },
      { id: "02", name: "Kernel \u00c9tico de Execu\u00e7\u00e3o", description: "KMIR \u2014 o Kernel para Reconhecimento de Inten\u00e7\u00e3o baseado em Manifesto. Valida cada sa\u00edda de IA contra a Inten\u00e7\u00e3o Soberana declarada antes da entrega. Se o sistema desvia, a aplica\u00e7\u00e3o \u00e9 autom\u00e1tica.", tags: ["KMIR v1.1", "manifesto.json", "@ethics_constrained"] },
      { id: "03", name: "Pulso de Telemetria ao Vivo", description: "As chaves estendidas CMCD v2 transmitem o Estado \u00c9tico de cada fragmento ao vivo em tempo real. A integridade torna-se observ\u00e1vel no n\u00edvel da infraestrutura \u2014 n\u00e3o ap\u00f3s o fato, mas durante a transmiss\u00e3o.", tags: ["CMCD v2", "hik-es", "hik-ps", "Real-time"] }
    ]
  },
  sacredTrace: {
    title: "Sacred Trace\u2122", subtitle: "N\u00facleo Criptogr\u00e1fico",
    description: "Cada intera\u00e7\u00e3o produz um recibo criptogr\u00e1fico imut\u00e1vel e reproduz\u00edvel \u2014 o Sacred Trace\u2122",
    formula: "Traceability_Hash = Hash(Query + Policy_ID + Source_Root + LM_Output)",
    ethicalKeys: [
      { key: "hik-es", values: ["0 \u2014 SEGURO \u00b7 Sa\u00edda verificada", "1 \u2014 DESVIO \u00b7 Desvio de inten\u00e7\u00e3o detectado", "2 \u2014 PARAR \u00b7 Transmiss\u00e3o cortada"] },
      { key: "hik-ps", description: "Pontua\u00e7\u00e3o de Proveni\u00eancia \u2014 verifica\u00e7\u00e3o em tempo real do fragmento VSI contra o Source Root. Faixa: 0.0 \u2192 1.0" }
    ],
    sdkApi: [
      { method: ".anchor()", description: "Cria uma \u00c1rvore Merkle do corpus fonte. Retorna o hash MerkleRoot para vincula\u00e7\u00e3o de pol\u00edticas." },
      { method: ".validate()", description: "Compara a sa\u00edda do LLM contra as restri\u00e7\u00f5es do Manifesto de Pol\u00edticas declarado. Retorna estado hik-es." },
      { method: ".trace()", description: "Gera o recibo final Sacred Trace\u2122. Ancorado on-chain via Polygon." }
    ]
  },
  sdkCode: SDK_CODE,
  architectureFlow: [
    { label: "Consulta do Usu\u00e1rio", sublabel: "Entrada" },
    { label: "Manifesto de Pol\u00edticas", sublabel: "manifesto.json \u00b7 somente leitura" },
    { label: "Corpus Fonte", sublabel: "Merkle Root \u00b7 ancorado" },
    { label: "Processamento LLM", sublabel: "Guardrails KMIR \u00b7 ativos" },
    { label: "Guarda Sem\u00e2ntica", sublabel: "Valida\u00e7\u00e3o de inten\u00e7\u00e3o" },
    { label: "Sacred Trace\u2122", sublabel: "Recibo criptogr\u00e1fico" }
  ],
  whatHikProduces: [
    { title: "Recibos Criptogr\u00e1ficos", description: "Admiss\u00edveis em tribunais, prontos para reguladores, verific\u00e1veis por m\u00e1quinas." },
    { title: "Aplica\u00e7\u00e3o Dupla Comporta", description: "GATE 1 entrada / GATE 2 sa\u00edda em menos de 1 milissegundo." },
    { title: "Ancoragem Blockchain", description: "Prova via Polygon \u2014 reproduz\u00edvel por qualquer auditor ou tribunal." },
    { title: "Agn\u00f3stico ao Modelo", description: "Integra-se em pipelines de IA existentes sem substitu\u00ed-los." }
  ],
  whyNow: [
    { regulation: "EU AI Act Artigo 50", detail: "A aplica\u00e7\u00e3o come\u00e7a em 2 de agosto de 2026. Multas de at\u00e9 \u20ac35M ou 7% da receita global por viola\u00e7\u00e3o." },
    { regulation: "NYC Lei Local 144", detail: "Ativa agora. Penalidades di\u00e1rias por candidato para ferramentas automatizadas de decis\u00e3o de emprego." },
    { regulation: "GDPR Artigo 22", detail: "Litigado. Auditores terceiros n\u00e3o podem depender de logs de servidor que n\u00e3o podem provar a integridade da sa\u00edda." }
  ],
  team: [
    { name: "Mart\u00edn Riotorto", role: "Fundador e Arquiteto Principal", location: "Montevid\u00e9u, Uruguai", bio: "Mais de 20 anos em infraestrutura de telecomunica\u00e7\u00f5es, sistemas de conte\u00fado em tempo real e ferramentas de integridade de IA. Ex-contribuidor do ecossistema C2PA." },
    { name: "Mat\u00edas Mospan", role: "Co-Fundador e L\u00edder de Plataforma", location: "Argentina", bio: "Arquiteto de plataforma respons\u00e1vel pela camada de infraestrutura empresarial do HIK \u2014 implanta\u00e7\u00e3o em GKE, pipelines de aplica\u00e7\u00e3o multi-tenant e o motor de aplica\u00e7\u00e3o de pr\u00f3xima gera\u00e7\u00e3o." },
    { name: "Federico Brubacher", role: "Consultor Estrat\u00e9gico Externo", location: "Uruguai", bio: "L\u00edder tecnol\u00f3gico s\u00eanior com profunda experi\u00eancia em infraestrutura empresarial e cloud. Aconselha o HIK em posicionamento estrat\u00e9gico, arquitetura empresarial e escalabilidade global." }
  ],
  roadmap: { phases: [
    { phase: "Fase 1", version: "SDK v1.0", status: "LIVE", statusColor: "green", title: "Integridade de Ativos Est\u00e1ticos", items: ["Recibos criptogr\u00e1ficos Sacred Trace\u2122", "Corpus fonte ancorado com Merkle", "Ancoragem blockchain em Polygon", "GATE 1 (entrada) e GATE 2 (sa\u00edda) ativos"] },
    { phase: "Fase 2", version: "Infraestrutura Live", status: "LIVE", statusColor: "green", title: "Infraestrutura ao Vivo", items: ["IPFS pinning ativo", "N\u00f3 EVM privado em GCP/Kubernetes", "Inje\u00e7\u00e3o de headers de telemetria CMCD v2", "Integra\u00e7\u00e3o com Gemini 2.5 Flash ativa"] },
    { phase: "Fase 3", version: "Go Core + KMIR", status: "DEV ATIVO", statusColor: "amber", title: "Bin\u00e1rio Go Core + KMIR v1.1", items: ["Aplica\u00e7\u00e3o at\u00f4mica fail-close em menos de 1ms", "Bin\u00e1rio est\u00e1tico Go para execu\u00e7\u00e3o P99 sub-milissegundo", "Kernel \u00c9tico KMIR com correspond\u00eancia difusa", "Comporta estrutural para categorias de inten\u00e7\u00e3o proibidas"] },
    { phase: "Fase 4", version: "Camada Empresarial", status: "PLANEJADO", statusColor: "gray", title: "Camada Empresarial", items: ["Pipelines de aplica\u00e7\u00e3o multi-tenant", "Dashboard do SDK", "SLA empresarial", "Integra\u00e7\u00f5es nativas para RH, FinTech, HealthTech"] }
  ]},
  origins: {
    intro: "Os sistemas n\u00e3o s\u00e3o neutros. Carregam a inten\u00e7\u00e3o de seus arquitetos.",
    title: "Human Is Kind n\u00e3o nasceu em uma sala de reuni\u00f5es.",
    paragraphs: [
      "N\u00e3o nasceu de uma an\u00e1lise de lacunas de mercado ou de um pitch deck.",
      "Nasceu de duas d\u00e9cadas construindo sistemas que funcionavam \u2014 e observando-os trair silenciosamente as pessoas que deveriam servir.",
      "Infraestrutura de telecomunica\u00e7\u00f5es. Arquitetura de software. Conformidade regulat\u00f3ria em escala. Sistemas que funcionavam. Sistemas que escalavam.",
      "E em algum momento desse processo, surgiu uma pergunta que nunca foi embora:"
    ],
    keyQuestion: "Como garantimos que o que um sistema decide hoje permane\u00e7a fiel \u00e0 sua origem amanh\u00e3?",
    quote: "A m\u00e9trica mais vital de todas estava sendo descartada: a Integridade Humana.",
    personalNote: "Eu sei como \u00e9 quando um sistema perde seu rastro de volta \u00e0 verdade \u2014 quando as sa\u00eddas desviam da inten\u00e7\u00e3o, quando a responsabilidade se dissolve na complexidade.",
    mission: "Constru\u00ed o Human Is Kind porque precisava que existisse. N\u00e3o como uma camada de pol\u00edticas. N\u00e3o como uma caixa de sele\u00e7\u00e3o de conformidade. Como uma restri\u00e7\u00e3o de engenharia r\u00edgida \u2014 criptogr\u00e1fica, imut\u00e1vel e imposs\u00edvel de contornar.",
    sacredTraceNote: "O Sacred Trace\u2122 n\u00e3o \u00e9 uma funcionalidade. \u00c9 uma promessa feita em c\u00f3digo.",
    intellectualBedrock: { title: "A Base Intelectual", text: "Este trabalho \u00e9 sustentado por uma d\u00e9cada de investiga\u00e7\u00e3o pessoal \u2014 filosofia, pensamento sist\u00eamico e o tipo de perguntas que voc\u00ea s\u00f3 faz quando est\u00e1 disposto a segui-las at\u00e9 o fim.", archiveLink: "https://martinriotorto.blogspot.com/" },
    closingVision: ["Tr\u00eas pessoas. Tr\u00eas continentes. Um protocolo.", "N\u00e3o estamos tentando parar a IA.", "Estamos tornando o Humano t\u00e3o vis\u00edvel que se torne o padr\u00e3o ouro definitivo da web.", "Em um mundo de c\u00f3pias infinitas, a inten\u00e7\u00e3o humana original \u00e9 a \u00fanica escassez verdadeira."]
  },
  manifesto: { sections: [
    { number: "I", title: "O Problema Que Nos Recusamos a Aceitar", content: ["Cada empresa que implementa IA opera sob uma suposi\u00e7\u00e3o compartilhada: que sistemas probabil\u00edsticos podem ser tornados seguros atrav\u00e9s de supervis\u00e3o probabil\u00edstica. Logs revisados ap\u00f3s o fato. Barreiras que aconselham mas n\u00e3o imp\u00f5em.", "Recusamos essa suposi\u00e7\u00e3o.", "Em ambientes regulados \u2014 decis\u00f5es de RH, risco financeiro, triagem de sa\u00fade, infer\u00eancia legal \u2014 o momento da falha n\u00e3o \u00e9 recuper\u00e1vel."], quote: "Seguran\u00e7a forense de IA n\u00e3o \u00e9 seguran\u00e7a. \u00c9 arqueologia." },
    { number: "II", title: "O Que Estamos Construindo", content: ["HumanisKind (HIK) \u00e9 middleware de governan\u00e7a de IA determin\u00edstica. N\u00e3o \u00e9 um wrapper. N\u00e3o \u00e9 um filtro de prompts. \u00c9 uma camada de protocolo imposta criptograficamente.", "Cada intera\u00e7\u00e3o produz um Sacred Trace\u2122 \u2014 um recibo criptogr\u00e1fico imut\u00e1vel que ancora a consulta, o manifesto de pol\u00edticas, o corpus fonte e a sa\u00edda em uma cadeia verific\u00e1vel \u00fanica.", "Isto n\u00e3o \u00e9 \u00e9tica de IA como filosofia. \u00c9 \u00e9tica de IA como infraestrutura."] },
    { number: "III", title: "Por Que Agora", content: ["O prazo do Artigo 5 do EU AI Act chega em 2 de agosto de 2026. A Lei Local 144 de NYC j\u00e1 est\u00e1 em vigor. O Artigo 22 do GDPR foi litigado.", "A lacuna n\u00e3o \u00e9 consci\u00eancia t\u00e9cnica. A lacuna s\u00e3o as ferramentas.", "Essa \u00e9 a lacuna que o HIK foi constru\u00eddo para fechar."] },
    { number: "IV", title: "Nossos Compromissos", content: ["Nunca obscureceremos o que o sistema faz. HIK \u00e9 source-available sob FCL-1.0.", "Nunca reivindicaremos seguran\u00e7a que n\u00e3o possamos demonstrar. Cada capacidade publicada est\u00e1 implementada e testada.", "Trataremos a governan\u00e7a como uma restri\u00e7\u00e3o de design, n\u00e3o como uma funcionalidade."], quote: "Enquanto outros constroem camadas para ajudar m\u00e1quinas a entender humanos, n\u00f3s constru\u00edmos camadas para ajudar humanos a confiar em m\u00e1quinas." },
    { number: "V", title: "A Vis\u00e3o Al\u00e9m da Conformidade", content: ["Conformidade \u00e9 o piso, n\u00e3o o teto.", "Um mundo onde 'gerado por IA' n\u00e3o \u00e9 um aviso legal, mas uma especifica\u00e7\u00e3o \u2014 que inclui quem autorizou, sob quais restri\u00e7\u00f5es, com qual proveni\u00eancia.", "N\u00e3o estamos construindo um produto. Estamos construindo a infraestrutura para a intelig\u00eancia respons\u00e1vel."] }
  ]},
  footer: { copyright: "\u00a9 2026 Human Is Kind\u2122", tagline: "Infraestrutura de governan\u00e7a, n\u00e3o autoridade interpretativa.", trademark: "HIK\u2122 e Sacred Trace\u2122 s\u00e3o marcas em processo de registro. Licenciado sob FCL-1.0-Apache-2.0.", contact: "contact@humaniskind.com" },
  ui: {
    contactUs: "Contate-nos",
    scroll: "Scroll",
    viewTechSpec: "Ver especifica\u00e7\u00e3o t\u00e9cnica completa",
    readManifesto: "Ler o Manifesto dos Fundadores",
    requestPitchDeck: "Solicitar Pitch Deck",
    requestAccess: "Solicitar Acesso",
    exploreTech: "Explorar Tecnologia",
    exploreSDK: "Explorar SDK v1.0",
    readyTitle: "Pronto para tornar a IA observ\u00e1vel em tempo de execu\u00e7\u00e3o?",
    readyDesc: "SDK v1.0 est\u00e1 ativo. Integridade de ativos est\u00e1ticos dispon\u00edvel hoje. Aplica\u00e7\u00e3o de transmiss\u00e3o ao vivo na v2.0.",
    teamTitle: "Tr\u00eas Pessoas. Tr\u00eas Continentes. Um Protocolo.",
    theTeam: "A Equipe",
    signedBy: "Assinado Por",
    regulatoryLandscape: "Panorama Regulat\u00f3rio",
    whyNowTitle: "Por Que Agora",
    whatProduces: "O Que o HIK Produz",
    verifiableAI: "IA Verific\u00e1vel em Tempo Real",
    quickIntegration: "Integra\u00e7\u00e3o R\u00e1pida",
    architectureFlowLabel: "Fluxo de Arquitetura",
    architectureFlowTitle: "Da Consulta ao Trace",
    cryptographicCore: "N\u00facleo Criptogr\u00e1fico",
    sacredTraceEthical: "Sacred Trace\u2122 e Pulso \u00c9tico",
    coreArchitecture: "Arquitetura Central",
    originsLabel: "Origens",
    developmentRoadmap: "Roteiro de Desenvolvimento",
    roadmapTitle: "Roteiro Arquitet\u00f4nico do HIK",
    roadmapDesc: "Do Manifesto \u00e0 Infraestrutura \u2014 Status ao Vivo",
    manifestoLabel: "Human Is Kind\u2122 \u2014 Est. 2026",
    manifestoTitle: "O Manifesto dos Fundadores",
    manifestoDesc: "Sobre por que a governan\u00e7a determin\u00edstica n\u00e3o \u00e9 uma funcionalidade \u2014 \u00e9 a funda\u00e7\u00e3o.",
    executiveSummary: "Resumo Executivo",
    techHero: "Tecnologia \u2014 Human Is Kind\u2122",
    techTitle: "Infraestrutura Determin\u00edstica\nde Governan\u00e7a de IA",
    techDesc: "Fornecemos a camada de protocolo que transforma sistemas de IA probabil\u00edsticos em infraestrutura verific\u00e1vel, audit\u00e1vel e controlada por humanos.",
    buildingInfra: "Construindo a infraestrutura para a intelig\u00eancia respons\u00e1vel",
    buildingDesc: "SDK v1.0 est\u00e1 ativo. Junte-se a n\u00f3s na constru\u00e7\u00e3o da camada de governan\u00e7a que o mundo precisa.",
    interestedMore: "Interessado em saber mais?",
    currentStatus: "Status Atual",
    currentStatusDesc: "SDK v1.0 ativo. GATE 1 / GATE 2 ativos. Executando em Gemini 2.5 Flash. IPFS pinning e n\u00f3 EVM privado em GCP ativos. Bin\u00e1rio Go core em desenvolvimento ativo.",
    exploreArchive: "Explorar o Arquivo Pessoal",
    navigation: "Navega\u00e7\u00e3o",
    contact: "Contato"
  }
};
