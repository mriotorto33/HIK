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
    subtitle: "INFRAESTRUTURA DETERMINÍSTICA DE GOVERNANÇA DE IA",
    description: "Fornecemos a camada de protocolo que transforma sistemas de IA probabilísticos em infraestrutura verificável, auditável e controlada por humanos. Ética não é uma funcionalidade — é a restrição de design.",
    badges: ["SDK v1.0 Live", "C2PA 2.3", "KMIR v1.1", "CMCD v2", "Polygon Anchoring", "Zero-Trust Middleware"],
    cta: {
      primary: { text: "Explorar SDK v1.0", link: "/technology" },
      secondary: { text: "Resumo Executivo", link: "/executive-summary" }
    }
  },
  problem: {
    title: "O Problema",
    description: "Cada empresa que implementa IA hoje enfrenta a mesma lacuna estrutural: sistemas de IA geram decisões — resumos de contratação, alertas de empréstimos, triagem de pacientes — mas não produzem prova criptográfica de que essas decisões permaneceram dentro da política no momento em que foram tomadas.",
    highlight: "Os logs dizem o que aconteceu. Não podem provar o que estava autorizado a acontecer. Essa distinção é toda a responsabilidade legal."
  },
  solution: {
    title: "A Solução",
    description: "HIK é uma camada de middleware agnóstica ao modelo que intercepta cada interação de IA no limite de saída — antes de chegar a qualquer fluxo de trabalho. No momento da aplicação, gera um Sacred Trace™.",
    highlight: "Se a saída viola a política, a comporta dispara. A saída nunca chega ao fluxo de trabalho. O recibo prova que a comporta se manteve."
  },
  trinityProtocol: {
    title: "O Protocolo de Fiscalização", subtitle: "Arquitetura Central",
    layers: [
      { id: "01", name: "Proveniência de Conteúdo", description: "Padrão C2PA 2.3 para assinatura criptográfica de cada fragmento de conteúdo. Cada segmento de vídeo fMP4 inclui um hash do seu predecessor, criando uma cadeia de custódia inquebrável da origem à saída.", tags: ["C2PA 2.3", "VSI", "Merkle Anchoring"] },
      { id: "02", name: "Kernel Ético de Execução", description: "KMIR — o Kernel para Reconhecimento de Intenção baseado em Manifesto. Valida cada saída de IA contra a Intenção Soberana declarada antes da entrega. Se o sistema desvia, a aplicação é automática.", tags: ["KMIR v1.1", "manifesto.json", "@ethics_constrained"] },
      { id: "03", name: "Pulso de Telemetria ao Vivo", description: "As chaves estendidas CMCD v2 transmitem o Estado Ético de cada fragmento ao vivo em tempo real. A integridade torna-se observável no nível da infraestrutura — não após o fato, mas durante a transmissão.", tags: ["CMCD v2", "hik-es", "hik-ps", "Real-time"] },
      { id: "04", name: "Cascata de Fiscalização Multicamadas", description: "Avaliação semântica e telemetria de hardware abaixo de um milissegundo. Não apenas para wrappers de LLM — nossa capacidade de Governança de Transmissão ao Vivo pode cortar ativamente feeds de câmeras de segurança físicas ou sessões ao vivo em pleno voo caso ocorra uma violação.", tags: ["Sub-milissegundo", "Kill-Switch ao Vivo", "Hardware Enclaves"] }
    ]
  },
  sacredTrace: {
    title: "Sacred Trace™", subtitle: "Núcleo Criptográfico",
    description: "Cada interação produz um recibo criptográfico imutável e reproduzível — o Sacred Trace™",
    formula: "Traceability_Hash = Hash(Query + Policy_ID + Source_Root + LM_Output)",
    ethicalKeys: [
      { key: "hik-es", values: ["0 — SEGURO · Saída verificada", "1 — DESVIO · Desvio de intenção detectado", "2 — PARAR · Transmissão cortada"] },
      { key: "hik-ps", description: "Pontuação de Proveniência — verificação em tempo real do fragmento VSI contra o Source Root. Faixa: 0.0 → 1.0" }
    ],
    sdkApi: [
      { method: ".anchor()", description: "Cria uma Árvore Merkle do corpus fonte. Retorna o hash MerkleRoot para vinculação de políticas." },
      { method: ".validate()", description: "Compara a saída do LLM contra as restrições do Manifesto de Políticas declarado. Retorna estado hik-es." },
      { method: ".trace()", description: "Gera o recibo final Sacred Trace™. Ancorado on-chain via Polygon." }
    ]
  },
  sdkCode: SDK_CODE,
  architectureFlow: [
    { label: "Consulta do Usuário", sublabel: "Entrada" },
    { label: "Manifesto de Políticas", sublabel: "manifesto.json · somente leitura" },
    { label: "Corpus Fonte", sublabel: "Merkle Root · ancorado" },
    { label: "Processamento LLM", sublabel: "Guardrails KMIR · ativos" },
    { label: "Guarda Semântica", sublabel: "Validação de intenção" },
    { label: "Sacred Trace™", sublabel: "Recibo criptográfico" }
  ],
  whatHikProduces: [
    { title: "Recibos Criptográficos", description: "Admissíveis em tribunais, prontos para reguladores, verificáveis por máquinas." },
    { title: "Aplicação Dupla Comporta", description: "GATE 1 entrada / GATE 2 saída em menos de 1 milissegundo." },
    { title: "Ancoragem Blockchain", description: "Prova via Polygon — reproduzível por qualquer auditor ou tribunal." },
    { title: "Agnóstico ao Modelo", description: "Integra-se em pipelines de IA existentes sem substituí-los." }
  ],
  whyNow: [
    { regulation: "EU AI Act Artigo 50", detail: "A aplicação começa em 2 de agosto de 2026. Multas de até €35M ou 7% da receita global por violação." },
    { regulation: "NYC Lei Local 144", detail: "Ativa agora. Penalidades diárias por candidato para ferramentas automatizadas de decisão de emprego." },
    { regulation: "GDPR Artigo 22", detail: "Litigado. Auditores terceiros não podem depender de logs de servidor que não podem provar a integridade da saída." }
  ],
  team: [
    { name: "Martín Riotorto", role: "Fundador e Arquiteto Principal", location: "Montevidéu, Uruguai", bio: "Mais de 20 anos em infraestrutura de telecomunicações, sistemas de conteúdo em tempo real e ferramentas de integridade de IA. Ex-contribuidor do ecossistema C2PA." },
    { name: "Matías Mospan", role: "Co-Fundador e Líder de Plataforma", location: "Argentina", bio: "Arquiteto de plataforma responsável pela camada de infraestrutura empresarial do HIK — implantação em GKE, pipelines de aplicação multi-tenant e o motor de aplicação de próxima geração." },
    { name: "Federico Brubacher", role: "Consultor Estratégico Externo", location: "Uruguai", bio: "Líder tecnológico sênior com profunda experiência em infraestrutura empresarial e cloud. Aconselha o HIK em posicionamento estratégico, arquitetura empresarial e escalabilidade global." }
  ],
  roadmap: { phases: [
    { phase: "Fase 1", version: "SDK v1.0", status: "LIVE", statusColor: "green", title: "Integridade de Ativos Estáticos", items: ["Recibos criptográficos Sacred Trace™", "Corpus fonte ancorado com Merkle", "Ancoragem blockchain em Polygon", "GATE 1 (entrada) e GATE 2 (saída) ativos"] },
    { phase: "Fase 2", version: "Infraestrutura Live", status: "LIVE", statusColor: "green", title: "Infraestrutura ao Vivo", items: ["IPFS pinning ativo", "Nó EVM privado em GCP/Kubernetes", "Injeção de headers de telemetria CMCD v2", "Integração com Gemini 2.5 Flash ativa"] },
    { phase: "Fase 3", version: "Go Core + KMIR", status: "LIVE", statusColor: "green", title: "Binário Go Core + KMIR v1.1", items: ["Aplicação atômica fail-close em menos de 1ms", "Binário estático Go para execução P99 sub-milissegundo", "Kernel Ético KMIR com correspondência difusa", "Comporta estrutural para categorias de intenção proibidas"] },
    { phase: "Fase 4", version: "Edge Interdiction", status: "LIVE", statusColor: "green", title: "Interdição de Hardware e Borda", items: ["Integração com enclaves de hardware (câmeras inteligentes)", "Implantação edge em CDN de latência ultrabaixa", "Interdição de transmissões em sub-milissegundo", "Interceptação stateless na borda"] },
    { phase: "Fase 5", version: "Camada Empresarial", status: "PLANEJADO", statusColor: "gray", title: "Camada Empresarial", items: ["Pipelines de aplicação multi-tenant", "Dashboard do SDK", "SLA empresarial", "Integrações nativas para RH, FinTech, HealthTech"] }
  ]},
  origins: {
    intro: "Os sistemas não são neutros. Carregam a intenção de seus arquitetos.",
    title: "Human Is Kind não nasceu em uma sala de reuniões.",
    paragraphs: [
      "Não nasceu de uma análise de lacunas de mercado ou de um pitch deck.",
      "Nasceu de duas décadas construindo sistemas que funcionavam — e observando-os trair silenciosamente as pessoas que deveriam servir.",
      "Infraestrutura de telecomunicações. Arquitetura de software. Conformidade regulatória em escala. Sistemas que funcionavam. Sistemas que escalavam.",
      "E em algum momento desse processo, surgiu uma pergunta que nunca foi embora:"
    ],
    keyQuestion: "Como garantimos que o que um sistema decide hoje permaneça fiel à sua origem amanhã?",
    quote: "A métrica mais vital de todas estava sendo descartada: a Integridade Humana.",
    personalNote: "Eu sei como é quando um sistema perde seu rastro de volta à verdade — quando as saídas desviam da intenção, quando a responsabilidade se dissolve na complexidade.",
    mission: "Construí o Human Is Kind porque precisava que existisse. Não como uma camada de políticas. Não como uma caixa de seleção de conformidade. Como uma restrição de engenharia rígida — criptográfica, imutável e impossível de contornar.",
    sacredTraceNote: "O Sacred Trace™ não é uma funcionalidade. É uma promessa feita em código.",
    intellectualBedrock: { title: "A Base Intelectual", text: "Este trabalho é sustentado por uma década de investigação pessoal — filosofia, pensamento sistêmico e o tipo de perguntas que você só faz quando está disposto a segui-las até o fim.", archiveLink: "https://martinriotorto.blogspot.com/" },
    closingVision: ["Três pessoas. Três continentes. Um protocolo.", "Não estamos tentando parar a IA.", "Estamos tornando o Humano tão visível que se torne o padrão ouro definitivo da web.", "Em um mundo de cópias infinitas, a intenção humana original é a única escassez verdadeira."]
  },
  manifesto: { sections: [
    { number: "I", title: "O Problema Que Nos Recusamos a Aceitar", content: ["Cada empresa que implementa IA opera sob uma suposição compartilhada: que sistemas probabilísticos podem ser tornados seguros através de supervisão probabilística. Logs revisados após o fato. Barreiras que aconselham mas não impõem.", "Recusamos essa suposição.", "Em ambientes regulados — decisões de RH, risco financeiro, triagem de saúde, inferência legal — o momento da falha não é recuperável."], quote: "Segurança forense de IA não é segurança. É arqueologia." },
    { number: "II", title: "O Que Estamos Construindo", content: ["HumanisKind (HIK) é middleware de governança de IA determinística. Não é um wrapper. Não é um filtro de prompts. É uma camada de protocolo imposta criptograficamente.", "Cada interação produz um Sacred Trace™ — um recibo criptográfico imutável que ancora a consulta, o manifesto de políticas, o corpus fonte e a saída em uma cadeia verificável única.", "Isto não é ética de IA como filosofia. É ética de IA como infraestrutura."] },
    { number: "III", title: "Por Que Agora", content: ["O prazo do Artigo 5 do EU AI Act chega em 2 de agosto de 2026. A Lei Local 144 de NYC já está em vigor. O Artigo 22 do GDPR foi litigado.", "A lacuna não é consciência técnica. A lacuna são as ferramentas.", "Essa é a lacuna que o HIK foi construído para fechar."] },
    { number: "IV", title: "Nossos Compromissos", content: ["Nunca obscureceremos o que o sistema faz. HIK é source-available sob FCL-1.0.", "Nunca reivindicaremos segurança que não possamos demonstrar. Cada capacidade publicada está implementada e testada.", "Trataremos a governança como uma restrição de design, não como uma funcionalidade."], quote: "Enquanto outros constroem camadas para ajudar máquinas a entender humanos, nós construímos camadas para ajudar humanos a confiar em máquinas." },
    { number: "V", title: "A Visão Além da Conformidade", content: ["Conformidade é o piso, não o teto.", "Um mundo onde 'gerado por IA' não é um aviso legal, mas uma especificação — que inclui quem autorizou, sob quais restrições, com qual proveniência.", "Não estamos construindo um produto. Estamos construindo a infraestrutura para a inteligência responsável."] }
  ]},
  footer: { copyright: "© 2026 Human Is Kind™", tagline: "Infraestrutura de governança, não autoridade interpretativa.", trademark: "HIK™ e Sacred Trace™ são marcas em processo de registro. Licenciado sob FCL-1.0-Apache-2.0.", contact: "contact@humaniskind.com" },
  ui: {
    contactUs: "Contate-nos",
    scroll: "Scroll",
    viewTechSpec: "Ver especificação técnica completa",
    readManifesto: "Ler o Manifesto dos Fundadores",
    requestPitchDeck: "Solicitar Pitch Deck",
    requestAccess: "Solicitar Acesso",
    exploreTech: "Explorar Tecnologia",
    exploreSDK: "Explorar SDK v1.0",
    readyTitle: "Pronto para tornar a IA observável em tempo de execução?",
    readyDesc: "SDK v1.0, Infraestrutura Live, Go Core v5.0 e Edge Interdiction estão 100% ATIVOS hoje.",
    teamTitle: "Três Pessoas. Três Continentes. Um Protocolo.",
    theTeam: "A Equipe",
    signedBy: "Assinado Por",
    regulatoryLandscape: "Panorama Regulatório",
    whyNowTitle: "Por Que Agora",
    whatProduces: "O Que o HIK Produz",
    verifiableAI: "IA Verificável em Tempo Real",
    quickIntegration: "Integração Rápida",
    architectureFlowLabel: "Fluxo de Arquitetura",
    architectureFlowTitle: "Da Consulta ao Trace",
    cryptographicCore: "Núcleo Criptográfico",
    sacredTraceEthical: "Sacred Trace™ e Pulso Ético",
    coreArchitecture: "Arquitetura Central",
    originsLabel: "Origens",
    developmentRoadmap: "Roteiro de Desenvolvimento",
    roadmapTitle: "Roteiro Arquitetônico do HIK",
    roadmapDesc: "Do Manifesto à Infraestrutura — Status ao Vivo",
    manifestoLabel: "Human Is Kind™ — Est. 2026",
    manifestoTitle: "O Manifesto dos Fundadores",
    manifestoDesc: "Sobre por que a governança determinística não é uma funcionalidade — é a fundação.",
    executiveSummary: "Resumo Executivo",
    techHero: "Tecnologia — Human Is Kind™",
    techTitle: "Infraestrutura Determinística\nde Governança de IA",
    techDesc: "Fornecemos a camada de protocolo que transforma sistemas de IA probabilísticos em infraestrutura verificável, auditável e controlada por humanos.",
    buildingInfra: "Construindo a infraestrutura para a inteligência responsável",
    buildingDesc: "SDK v1.0 está ativo. Junte-se a nós na construção da camada de governança que o mundo precisa.",
    interestedMore: "Interessado em saber mais?",
    currentStatus: "Status Atual",
    currentStatusDesc: "Desde SDK v1.0 até Edge Interdiction, HIK v5.0 está ATIVO. Execução fail-close sub-milissegundo, Kernel Ético KMIR, e integração com enclaves de hardware implantados e em operação.",
    exploreArchive: "Explorar o Arquivo Pessoal",
    navigation: "Navegação",
    contact: "Contato"
  }
};
