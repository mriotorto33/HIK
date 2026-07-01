const SDK_CODE = `// HIK Enforcement Proxy — Integração de Conformidade de Políticas
// Middleware drop-in: aponte suas chamadas LLM para a URL do proxy

const HIK_ENDPOINT = 'https://api.seu-dominio/v1/chat/completions';

// Todo o tráfego passa pela cascata de aplicação do HIK.
// Gate 1 avalia a entrada. Gate 2 avalia a saída.
// A resposta retorna com um identificador de recibo Sacred Trace™.
const response = await fetch(HIK_ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ model: 'gpt-4o', messages })
});

// Cada resposta inclui uma referência ao recibo de conformidade
// Entre em contato para acessar a especificação completa da API e o esquema de recibos.`;

export const pt = {
  nav: {
    links: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Tecnologia", path: "/technology" },
      { label: "Origens", path: "/origins" },
      { label: "Roteiro", path: "/roadmap" },
      { label: "Manifesto", path: "/manifesto" },
      { label: "Resumo Executivo", path: "/executive-summary" }
    ]
  },
  hero: {
    subtitle: "CONFORMIDADE DE POLÍTICAS DETERMINÍSTICA PARA IA EMPRESARIAL",
    description: "Sistemas de IA tomam decisões com consequências legais — mas não produzem prova de que permaneceram dentro da política. O HIK muda isso: cada interação de IA é avaliada no limite da política e emite um recibo de conformidade admissível em tribunal antes de chegar ao seu fluxo de trabalho.",
    badges: ["Aberto a Humanos", "Fechado a Máquinas", "EU AI Act Art. 50", "NYC LL144", "GDPR Art. 22", "Zero Trust", "Ancoragem Blockchain", "Agnóstico ao Modelo"],
    cta: {
      primary: { text: "Solicitar Demo de Conformidade", link: "mailto:contact@humaniskind.com" },
      secondary: { text: "Ver a Arquitetura", link: "/technology" }
    }
  },
  problem: {
    title: "A Lacuna de Conformidade",
    description: "Cada empresa que implanta IA em RH, finanças ou saúde enfrenta a mesma exposição estrutural: sistemas de IA geram decisões com consequências legais — resumos de contratação, alertas de empréstimos, triagem de pacientes — mas não produzem prova verificável de que essas decisões permaneceram dentro da política no momento em que foram tomadas.",
    highlight: "Os logs dizem o que aconteceu. Não podem provar o que estava autorizado a acontecer. Essa distinção é toda a responsabilidade legal enquanto os prazos do EU AI Act e NYC LL144 se fecham."
  },
  solution: {
    title: "Aplicação de Políticas no Gate",
    description: "HIK é uma camada de middleware agnóstica ao modelo que intercepta cada interação de IA no limite da política — antes que a requisição chegue ao modelo, e antes que a resposta chegue ao seu usuário. No momento da aplicação, emite um Sacred Trace™: um recibo de conformidade criptográfico imutável ancorado na blockchain.",
    highlight: "Se a saída viola a política, o gate dispara. A saída nunca chega ao fluxo de trabalho. O recibo prova que o gate se manteve — com latência de aplicação otimizada para ambientes de produção."
  },
  howItWorks: {
    title: "Como Funciona",
    subtitle: "Três etapas. Aplicação com latência otimizada. Prova admissível em tribunal.",
    steps: [
      { number: "01", title: "A Requisição Chega", description: "Uma requisição de IA entra no seu sistema — uma consulta ao seu chatbot de RH, um prompt para sua ferramenta de avaliação de empréstimos, ou uma mensagem para qualquer fluxo de trabalho com LLM.", outcome: "HIK intercepta antes que o modelo veja" },
      { number: "02", title: "O Gate de Política Dispara", description: "HIK avalia a requisição contra sua política de conformidade declarada. Se contiver uma categoria proibida — inferência emocional, decisões automatizadas de contratação, enquadramento discriminatório — a requisição é bloqueada imediatamente.", outcome: "Zero falsos positivos na ação de bloqueio" },
      { number: "03", title: "Recibo de Conformidade Emitido", description: "Seja a requisição aprovada ou bloqueada, o HIK emite um recibo Sacred Trace™: um registro assinado criptograficamente da consulta, a política aplicada e a decisão tomada — ancorado no IPFS e na blockchain.", outcome: "Prova admissível em tribunal, disponível para qualquer auditor" }
    ]
  },
  useCases: {
    title: "Construído para IA Regulada",
    subtitle: "Casos de Uso",
    cases: [
      { industry: "Recursos Humanos", icon: "user", problem: "Seu assistente de contratação com IA está sujeito à NYC Local Law 144. Cada decisão de emprego automatizada deve ser auditável, livre de preconceitos e defensável.", hikSolves: "HIK bloqueia perguntas proibidas (estado emocional, inferência física) antes que cheguem ao modelo. Cada interação produz um recibo de auditoria vinculado ao artigo específico da LL144." },
      { industry: "Serviços Financeiros", icon: "shield", problem: "A IA de avaliação de empréstimos gera decisões com consequências legais. O Artigo 22 do GDPR exige que as decisões automatizadas sejam explicáveis e contestáveis.", hikSolves: "HIK aplica sua política de crédito declarada no limite de inferência. Cada decisão é marcada com timestamp, hasheada e ancorada — pronta para um desafio regulatório sem ferramentas adicionais." },
      { industry: "Saúde e Jurídico", icon: "scale", problem: "A triagem de pacientes e a inferência jurídica operam em ambientes onde uma saída errada não é uma falha de UX — é um evento de responsabilidade. Os guardrails padrão são consultivos, não aplicáveis.", hikSolves: "HIK aplica limites de política rígidos no nível de infraestrutura. Saídas proibidas são bloqueadas, não sinalizadas. O recibo prova que a aplicação ocorreu no momento certo." }
    ]
  },
  trinityProtocol: {
    title: "A Arquitetura de Aplicação", subtitle: "Arquitetura Central",
    layers: [
      { id: "01", name: "Proveniência de Conteúdo", description: "Padrão C2PA 2.3 para assinatura criptográfica de cada fragmento de conteúdo. Cada segmento de vídeo inclui um hash do seu predecessor, criando uma cadeia de custódia inquebrável da origem à saída.", tags: ["C2PA 2.3", "VSI", "Merkle Anchoring"] },
      { id: "02", name: "Kernel de Conformidade de Políticas (KMIR)", description: "O Kernel de Regras de Integridade Manifestada — um guardião de políticas estrito e de confiança zero. Avalia cada entrada e saída de IA contra as regras de conformidade declaradas. Gate 1 dispara antes que o LLM veja a requisição. Gate 2 dispara antes que o usuário veja a resposta.", tags: ["Gate 1 Entrada", "Gate 2 Saída", "Zero-Trust", "EU AI Act"] },
      { id: "03", name: "Pulso de Telemetria ao Vivo", description: "A telemetria de integridade CMCD v2 transmite o estado de conformidade de cada fragmento ao vivo em tempo real. Assinada criptograficamente — um sinal de integridade falsificado na borda CDN é computacionalmente inviável.", tags: ["CMCD v2", "Telemetria Assinada", "Tempo Real", "Borda CDN"] },
      { id: "04", name: "Aplicação de Políticas em Transmissões ao Vivo", description: "A camada de aplicação se estende a transmissões de vídeo contínuas. Demonstrado ao vivo: uma transmissão OBS para o YouTube roteada pelo proxy de aplicação do HIK — quando uma violação de política foi injetada, a transmissão foi encerrada no nível da borda. Não é uma simulação.", tags: ["Provado ao Vivo", "OBS Kill-Switch", "Borda YouTube", "Aplicação na Borda"] }
    ]
  },
  sacredTrace: {
    title: "Sacred Trace™", subtitle: "Núcleo Criptográfico",
    description: "Cada interação — seja aprovada ou bloqueada — produz um recibo de conformidade criptográfico imutável e reproduzível: o Sacred Trace™",
    formula: "[ Cadeia de Verificação Ancorada Criptograficamente ]",
    ethicalKeys: [
      { key: "Estado de Aplicação", values: ["SEGURO · Saída verificada e dentro da política declarada", "DESVIO · Desvio de intenção detectado e sinalizado", "PARAR · Gate disparado, saída ou transmissão encerrada"] },
      { key: "Pontuação de Provenência", description: "Profundidade da cadeia Merkle — um indicador numérico de quantos eventos verificados estão ancorados até a raiz, formando a cadeia de conformidade ininterrupta." }
    ],
    sdkApi: [
      { method: "Gate 1 (Entrada)", description: "Avalia a requisição de IA antes que o modelo a veja. Retorna um veredicto de aplicação e um recibo de conformidade provisional." },
      { method: "Gate 2 (Saída)", description: "Avalia a resposta do LLM antes que o usuário a veja. Bloqueia violações de política ou aprova com recibo anexado." },
      { method: "Confirmação de Recibo", description: "Recupera um recibo de conformidade confirmado incluindo prova Merkle, âncora IPFS e referência de transação blockchain." }
    ]
  },
  sdkCode: SDK_CODE,
  architectureFlow: [
    { label: "Requisição de IA Entrante", sublabel: "Qualquer LLM \u2014 agnóstico ao modelo" },
    { label: "Gate 1: Verificação de Política de Entrada", sublabel: "Bloqueada se proibida — latência otimizada" },
    { label: "Processamento LLM", sublabel: "Protegido pelo HIK — passa apenas se limpo" },
    { label: "Gate 2: Verificação de Política de Saída", sublabel: "Aplicação final antes que o usuário veja" },
    { label: "Registro de Conformidade", sublabel: "Persistência crash-safe — sempre" },
    { label: "Recibo Sacred Trace\u2122", sublabel: "Ancorado em IPFS + EVM \u2014 assíncrono" }
  ],
  whatHikProduces: [
    { title: "Recibos de Conformidade Criptográficos", description: "Admissíveis em tribunal, prontos para reguladores, verificáveis por máquinas. Ancorados em IPFS e EVM. Cada decisão, cada bloqueio, cada aprovação — registrado imutavelmente." },
    { title: "Aplicação de Gate Duplo", description: "Gate 1 avalia cada requisição de IA antes que o modelo a veja. Gate 2 avalia cada resposta antes que o usuário a veja. Ambos operam com latência de aplicação otimizada para ambientes de produção." },
    { title: "Kill-Switch de Transmissão ao Vivo", description: "Provado em produção: transmissão OBS para o YouTube, encerrada no nível da borda quando uma violação de política foi injetada. Não é um conceito — é uma capacidade demonstrada." },
    { title: "Interceptação Nativa na Borda", description: "Implantação sem estado integrando-se diretamente com infraestrutura CDN edge. Suporte a enclaves de hardware. Arquitetura de assinatura portável para qualquer ambiente serverless edge." }
  ],
  whyNow: [
    { regulation: "EU AI Act Artigo 50", detail: "O Omnibus Digital europeu diferiu as obrigações de alto risco do Anexo III até 2 de dezembro de 2027 — mas a aplicação de Transparência do Artigo 50 está bloqueada para 2 de agosto de 2026. Sem prorrogativa. Sem período de graça. CISOs que dependem de barreiras probabilísticas irão reprovar auditorias. Multas de até €35M ou 7% da receita global por violação." },
    { regulation: "NYC Lei Local 144", detail: "Ativa agora. Penalidades diárias por candidato para ferramentas automatizadas de decisão de emprego. Logs de servidor não são um registro de auditoria conforme." },
    { regulation: "GDPR Artigo 22", detail: "Litigado. Auditores terceiros não podem depender de logs de servidor que não podem provar a integridade da saída no momento da decisão." }
  ],
  team: [
    { name: "Martín Riotorto", role: "Fundador e Arquiteto Principal", location: "Montevidéu, Uruguai", bio: "Mais de 20 anos em infraestrutura de telecomunicações, sistemas de conteúdo em tempo real e ferramentas de integridade de IA. Projetou a arquitetura de aplicação do HIK do zero." },
    { name: "Matías Mospan", role: "Co-Fundador e Líder de Plataforma", location: "Argentina", bio: "Arquiteto de plataforma responsável pela camada de infraestrutura empresarial do HIK \u2014 implantação em Kubernetes, pipelines de aplicação multi-tenant e o motor de aplicação serverless de próxima geração." },
    { name: "Federico Brubacher", role: "Consultor Estratégico Externo", location: "Califórnia, EUA", bio: "Líder tecnológico sênior com profunda experiência em infraestrutura empresarial e cloud. Validou de forma independente a arquitetura de aplicação do HIK frente a padrões de escalabilidade global e Big Tech." },
    { name: "Agustín Ortiz", role: "Diretor de Estratégia Comercial", location: "Uruguai", bio: "Agustín Ortiz converte arquitetura técnica em credibilidade institucional. Constrói o pipeline comercial e abre as portas que não têm maçaneta. A força estratégica que transforma governança em posição de mercado.", hoverLine: "A força estratégica por trás da presença institucional da HIK." }
  ],
  roadmap: { phases: [
    { phase: "Fase 1", version: "SDK v1.0", status: "LIVE", statusColor: "green", title: "Integridade de Ativos Estáticos", items: ["Recibos criptográficos Sacred Trace™", "Corpus fonte ancorado com Merkle", "Ancoragem blockchain ativa", "GATE 1 (entrada) e GATE 2 (saída) de conformidade ativos"] },
    { phase: "Fase 2", version: "Infraestrutura Live", status: "LIVE", statusColor: "green", title: "Infraestrutura ao Vivo", items: ["IPFS pinning ativo", "Nó EVM privado em infraestrutura cloud", "Injeção de telemetria de integridade assinada", "Integração com plataforma LLM líder ativa"] },
    { phase: "Fase 3", version: "Core + KMIR", status: "LIVE", statusColor: "green", title: "Binário Core de Aplicação", items: ["Aplicação atômica fail-close com latência otimizada", "Binário estático leve — pegada mínima, cold start quase instantâneo", "Cascata de políticas determinística", "Camada de persistência crash-safe com atomicidade de estado de cadeia"] },
    { phase: "Fase 4", version: "Edge Interdiction", status: "LIVE", statusColor: "green", title: "Hardware e Kill-Switch na Borda", items: ["Transmissão ao vivo encerrada no nível da borda (demonstrado ao vivo)", "Integração com enclaves de hardware (câmeras inteligentes, dispositivos de transmissão)", "Telemetria assinada criptograficamente — resistente a falsificação na borda CDN", "Proxy de aplicação sem estado: elegível para HPA, escala a zero"] },
    { phase: "Fase 5", version: "Edge Serverless", status: "EM ANDAMENTO", statusColor: "orange", title: "Aplicação Autônoma na Borda", items: ["Módulos de assinatura e telemetria embarcados no dispositivo", "Aplicação autônoma na rede da borda — sem dependência de origem", "Governança de streaming totalmente serverless", "Late Interdiction Receipt: prova forense de detecção e encerramento em pleno voo"] }
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
    closingVision: ["Três pessoas. Dois continentes. Um protocolo.", "Não estamos tentando parar a IA.", "Estamos tornando o Humano tão visível que se torne o padrão ouro definitivo da web.", "Em um mundo de cópias infinitas, a intenção humana original é a única escassez verdadeira."]
  },
  manifesto: { sections: [
    { number: "I", title: "O Problema Que Nos Recusamos a Aceitar", content: ["Cada empresa que implanta IA opera sob uma suposição compartilhada: que sistemas probabilísticos podem ser tornados seguros através de supervisão probabilística. Logs revisados após o fato. Barreiras que aconselham mas não impõem.", "Recusamos essa suposição.", "Em ambientes regulados — decisões de RH, risco financeiro, triagem de saúde, inferência jurídica — o momento da falha não é recuperável."], quote: "Segurança forense de IA não é segurança. É arqueologia." },
    { number: "II", title: "O Que Estamos Construindo", content: ["HumanisKind (HIK) é middleware de conformidade de políticas determinístico para IA empresarial. Não é um wrapper. Não é um filtro de prompts. É uma camada de protocolo imposta criptograficamente que intercepta no limite da política.", "Cada interação produz um Sacred Trace™ — um recibo criptográfico imutável que ancora a consulta, a política aplicada e a decisão tomada em uma cadeia verificável única.", "Isto não é ética de IA como filosofia. É aplicação de políticas de IA como infraestrutura."] },
    { number: "III", title: "Por Que Agora", content: ["O prazo do Artigo 5 do EU AI Act chega em 2 de agosto de 2026. A Lei Local 144 de NYC já está em vigor. O Artigo 22 do GDPR foi litigado.", "A lacuna não é consciência técnica. A lacuna são as ferramentas.", "Essa é a lacuna que o HIK foi construído para fechar."] },
    { number: "IV", title: "Nossos Compromissos", content: ["Nunca obscureceremos o que o sistema faz. HIK é source-available sob FCL-1.0.", "Nunca reivindicaremos uma capacidade que não possamos demonstrar. Cada capacidade publicada está implementada e testada — incluindo o kill-switch de transmissão ao vivo.", "Trataremos a governança como uma restrição de design, não como uma funcionalidade."], quote: "Enquanto outros constroem camadas para ajudar máquinas a entender humanos, nós construímos camadas para ajudar humanos a confiar em máquinas." },
    { number: "V", title: "A Visão Além da Conformidade", content: ["Conformidade é o piso, não o teto.", "Um mundo onde 'gerado por IA' não é um aviso legal, mas uma especificação — que inclui quem autorizou, sob quais restrições, com qual proveniência.", "Não estamos construindo um produto. Estamos construindo a infraestrutura para a inteligência responsável."] }
  ]},
  footer: { copyright: "© 2026 Human Is Kind™", tagline: "Aplicação de políticas, não autoridade interpretativa.", trademark: "HIK™ e Sacred Trace™ são marcas em processo de registro. Licenciado sob FCL-1.0-Apache-2.0.", contact: "contact@humaniskind.com" },

  techTabs: { architecture: 'Arquitetura', cryptographic: 'Núcleo Criptográfico', sdk: 'Integração', compliance: 'Mapeamento de Conformidade' },
  techBadges: ['Motor Determinístico', 'C2PA 2.3', 'KMIR v1.1', 'Telemetria de Integridade', 'Assinatura de Algoritmo Duplo', 'Ancoragem Distribuída', 'Edge-Ready', 'Drop-in Proxy'],
  complianceRows: [
    { regulation: 'EU AI Act Art. 5(1)(f)', scope: 'Proibição de Inferência de Emoções', hikEnforcement: 'Gate 1 bloqueia consultas de estado emocional antes do LLM. Gate 2 bloqueia saídas de inferência de emoções. O recibo de conformidade mapeia explicitamente para este artigo.' },
    { regulation: 'EU AI Act Art. 50', scope: 'Obrigações de transparência', hikEnforcement: 'O recibo Sacred Trace™ fornece prova legível por máquina da política aplicada, timestamp e decisão, satisfazendo os requisitos de divulgação do Art. 50.' },
    { regulation: 'NYC Local Law 144', scope: 'Ferramentas de Decisão de Emprego Automatizadas', hikEnforcement: 'Gate 1 intercepta consultas de contratação proibidas. Cada interação produz um recibo de auditoria marcado com LL144.' },
    { regulation: 'GDPR Art. 22', scope: 'Tomada de decisão individual automatizada', hikEnforcement: 'Recibos ancorados fornecem a trilha de explicabilidade exigida para desafios do Art. 22. A prova criptográfica permite que qualquer auditor verifique a cadeia de decisão.' },
    { regulation: 'GDPR Art. 5(1)(e)', scope: 'Limitação de armazenamento', hikEnforcement: 'Os recibos armazenam apenas hashes de consulta, IDs de políticas e decisões, não PII bruto. O registro de aplicação é criptograficamente verificável sem reter dados pessoais.' },
  ],
  cryptographicDesign: {
    title: 'Design Criptográfico de Algoritmo Duplo',
    desc: 'HIK emprega algoritmos criptográficos específicos em seu pipeline de aplicação. Diferentes operações usam algoritmos selecionados independentemente, otimizados para cada modelo de ameaça. A especificação criptográfica completa está disponível sob NDA.'
  },
  integrationTab: {
    title: 'Motor de Aplicação Nativo HIK — Integração Direta',
    desc: 'O motor HIK atua como um proxy transparente na frente de qualquer endpoint LLM. Nenhuma instalação de SDK necessária na sua aplicação — aponte suas chamadas LLM existentes para o URL do proxy HIK.',
    deploymentTitle: 'Opções de Implantação',
    options: [
      { title: 'Proxy Contenerizado', desc: 'Motor de aplicação leve executa ao lado de qualquer infraestrutura servindo LLM. Todo tráfego passa pela cascata determinística. Elegível para auto-scaling.', tags: ['Container', 'Auto-scaling', 'Nativo'] },
      { title: 'Implantação Serverless', desc: 'Invocação sob demanda com cold start quase zero. Ideal para fluxos de trabalho orientados a eventos e aplicação de políticas stateless.', tags: ['Serverless', 'Stateless', 'Orientado a Eventos'] },
      { title: 'Interceptação no Navegador', desc: 'Gate de política client-side para interfaces web LLM. Avalia prompts através do proxy de aplicação antes do envio.', tags: ['Client-Side', 'Browser Gate'] },
      { title: 'Aplicação na Rede Edge (Fase 5)', desc: 'Aplicação autônoma na borda da rede. Telemetria embarcada e lógica de política de baixa latência para conformidade global. Em desenvolvimento.', tags: ['Edge', 'Global', 'Baixa Latência'] },
    ]
  },
  techUi: { integritySchema: 'Esquema de Chaves de Integridade', apiEndpoints: 'Endpoints de API', regulatoryCoverage: 'Cobertura Regulatória', mappingTitle: 'Como HIK Mapeia Cada Regulação', mappingDesc: 'Cada ação de aplicação HIK mapeia para artigos regulatórios específicos. O recibo Sacred Trace™ inclui explicitamente o ID da política e referência do artigo.' },

  ui: {
    contactUs: "Contate-nos",
    scroll: "Scroll",
    viewTechSpec: "Ver especificação técnica completa",
    readManifesto: "Ler o Manifesto dos Fundadores",
    requestPitchDeck: "Solicitar Pitch Deck",
    requestAccess: "Solicitar Acesso",
    exploreTech: "Explorar Arquitetura",
    exploreSDK: "Ver Arquitetura Técnica",
    readyTitle: "Pronto para aplicar políticas de IA com prova criptográfica?",
    readyDesc: "HIK está ao vivo hoje: motor de aplicação nativo, cascada de políticas determinística, kill-switch de transmissão ao vivo e recibos de auditoria ancorados em blockchain.",
    teamTitle: "Quatro Diretores. Dois Continentes. Um Protocolo.",
    theTeam: "A Equipe",
    signedBy: "Assinado Por",
    regulatoryLandscape: "Panorama Regulatório",
    whyNowTitle: "Por Que Agora",
    whatProduces: "O Que o HIK Entrega",
    verifiableAI: "IA Que Prova Sua Própria Conformidade",
    quickIntegration: "Integração",
    architectureFlowLabel: "Fluxo de Aplicação",
    architectureFlowTitle: "Da Requisição ao Recibo de Conformidade",
    cryptographicCore: "Núcleo Criptográfico",
    sacredTraceEthical: "Sacred Trace™ \u2014 O Recibo de Conformidade",
    coreArchitecture: "Arquitetura Central",
    originsLabel: "Origens",
    developmentRoadmap: "Roteiro de Desenvolvimento",
    roadmapTitle: "Roteiro Arquitetônico do HIK",
    roadmapDesc: "Do Manifesto à Infraestrutura — Status ao Vivo",
    manifestoLabel: "Human Is Kind™ — Est. 2026",
    manifestoTitle: "O Manifesto dos Fundadores",
    manifestoDesc: "Sobre por que a conformidade de políticas determinística não é uma funcionalidade — é a fundação.",
    executiveSummary: "Resumo Executivo",
    techHero: "Tecnologia — Human Is Kind™",
    techTitle: "Conformidade de Políticas Determinística\npara IA Empresarial",
    techDesc: "A camada de aplicação que intercepta cada decisão de IA no limite da política. Gate 1 dispara antes do modelo. Gate 2 dispara antes do usuário. Cada caminho produz um recibo criptográfico de conformidade.",
    buildingInfra: "Construindo a infraestrutura para IA responsável",
    buildingDesc: "Aplicação ao vivo, kill-switch de transmissão ao vivo e recibos de auditoria ancorados em blockchain — disponíveis hoje.",
    interestedMore: "Interessado em saber mais?",
    currentStatus: "Status Atual",
    currentStatusDesc: "Motor de aplicação nativo, cascada de políticas determinística, kill-switch de transmissão ao vivo e arquitetura de aplicação na borda — todos ao vivo. A integração serverless edge está em desenvolvimento ativo.",
    exploreArchive: "Explorar o Arquivo Pessoal",
    navigation: "Navegação",
    contact: "Contato",
    howItWorks: "Como Funciona",
    useCases: "Casos de Uso",
    requestDemo: "Solicitar Demo de Conformidade",
    viewArchitecture: "Ver Arquitetura",
    viewLiveDashboard: "Ver Dashboard ao Vivo"
  },

  videoSection: {
    eyebrow: "APLICAÇÃO EM PRODUÇÃO",
    heading: "O Gate Dispara. Veja Acontecer.",
    subheading: "Não é uma simulação. Não é um slide. Dois eventos de aplicação gravados — nível de proxy e navegador — com o pacote de evidências visível no dashboard.",
    videos: [
      { id: "UDmA2U13mWY", embedSrc: "https://www.youtube.com/embed/UDmA2U13mWY?si=WfxrUILDvV-orpey", thumbnail: "https://img.youtube.com/vi/UDmA2U13mWY/maxresdefault.jpg", label: "APLICAÇÃO DE STREAM · GRAVADO", title: "Kill-Switch Dispara no Nível do Proxy", description: "Uma violação de política simulada aciona o gate no meio do stream. Sacred Trace\u2122 ancorado imediatamente." },
      { id: "l-S5JQj68xY", embedSrc: "https://www.youtube.com/embed/l-S5JQj68xY?si=2aIpJnDjU5G36tCF", thumbnail: "https://img.youtube.com/vi/l-S5JQj68xY/maxresdefault.jpg", label: "INTERCEPÇÃO NO NAVEGADOR · GRAVADO", title: "Extensão Chrome Bloqueia Exfiltração no Gemini", description: "Uma instrução \u2018enviar logs ao email pessoal\u2019 é interceptada em gemini.google.com. O envio é bloqueado. Dashboard mostra evidências em tempo real." }
    ]
  },

  verticals: {
    eyebrow: "DOMÍNIOS DE APLICAÇÃO",
    heading: "Construído para as Superfícies de Ameaça que Importam",
    cards: [
      { title: "IA de RH e Emprego", body: "Bloqueia decisões automatizadas de contratação proibidas, inferência de emoções e solicitações protegidas \u2014 antes de chegarem a qualquer LLM. EU AI Act Artigo 5 \u00b7 NYC Local Law 144." },
      { title: "Sistemas Agênticos", body: "Intercepta injeção de prompts, escalação de privilégios e exfiltração não autorizada. Cada ação bloqueada é ancorada forensicamente." },
      { title: "Transmissão ao Vivo & Mídia", body: "Aplicação em nível de quadro em transmissões de vídeo. Conteúdo não autorizado descartado antes de atingir a plataforma downstream." },
      { title: "DLP Documental Empresarial", body: "Arquivos avaliados por proveniência, rótulos de sensibilidade e listas negras de hash \u2014 modo streaming, fail-close, antes do upload ser concluído." }
    ]
  },

  evidencePack: {
    eyebrow: "O QUE O AUDITOR VÊ",
    heading: "O Recibo Prova que o Gate Se Manteve",
    line1: "Cada evento de aplicação produz um recibo neste formato.",
    line2: "Admissível em tribunal. Pronto para reguladores. Ancorado on-chain. Disponível no dashboard imediatamente.",
    ctaLabel: "Ver Dashboard ao Vivo"
  },

  trustBar: {
    signals: [
      { label: "Auditável sob Solicitação \u00b7 Código Disponível sob NDA" },
      { label: "C2PA 2.3 \u00b7 KMIR v1.1 \u00b7 CMCD v2" },
      { label: "EU AI Act Artigo 50 Pronto" },
      { label: "Fail-Close por Design" }
    ]
  }
};
