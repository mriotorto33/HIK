const SDK_CODE = `// HIK Go Sidecar — Policy Enforcement Integration
// Drop-in middleware: point your LLM calls at the sidecar URL

const HIK_ENDPOINT = 'https://your-hik-sidecar/v1/chat/completions';

// All traffic routes through HIK's enforcement cascade.
// Gate 1 evaluates the input. Gate 2 evaluates the output.
// The response returns with a Sacred Trace™ receipt identifier.
const response = await fetch(HIK_ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ model: 'gpt-4o', messages })
});

// Each response carries a compliance receipt reference
// Contact us to access the full API specification and receipt schema.`;

export const en = {
  nav: {
    links: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Technology", path: "/technology" },
      { label: "Origins", path: "/origins" },
      { label: "Roadmap", path: "/roadmap" },
      { label: "Manifesto", path: "/manifesto" },
      { label: "Executive Summary", path: "/executive-summary" }
    ]
  },
  hero: {
    subtitle: "DETERMINISTIC POLICY ENFORCEMENT FOR ENTERPRISE AI",
    description: "AI systems make consequential decisions — but produce no proof they stayed within policy. HIK changes that: every AI interaction is enforced at the policy boundary and issues a court-admissible compliance receipt before it reaches your workflow.",
    badges: ["Fail Open to Humans", "Fail Closed to Machines", "EU AI Act Art. 50", "NYC LL144", "GDPR Art. 22", "Zero Trust", "Blockchain-Anchored", "Model-Agnostic"],
    cta: {
      primary: { text: "Request a Compliance Demo", link: "mailto:contact@humaniskind.com" },
      secondary: { text: "View the Architecture", link: "/technology" }
    }
  },
  problem: {
    title: "The Compliance Gap",
    description: "Every enterprise deploying AI in HR, finance, or healthcare faces the same structural exposure: AI systems generate consequential decisions — hiring summaries, loan flags, patient triage outputs — but produce no verifiable proof that those decisions stayed within policy at the moment they were made.",
    highlight: "Logs tell you what happened. They cannot prove what was authorized to happen. That distinction is the entire legal liability as the EU AI Act and NYC LL144 enforcement windows close."
  },
  solution: {
    title: "Policy Enforcement at the Gate",
    description: "HIK is a model-agnostic middleware layer that intercepts every AI interaction at the policy boundary — before the request reaches the model, and before the response reaches your user. At the moment of enforcement, it issues a Sacred Trace™: an immutable cryptographic compliance receipt anchored on the blockchain.",
    highlight: "If the output violates policy, the gate fires. The output never reaches the workflow. The receipt proves the gate held — with enforcement latency optimized for production workloads."
  },
  howItWorks: {
    title: "How It Works",
    subtitle: "Three steps. Optimized-latency enforcement. Court-admissible proof.",
    steps: [
      { number: "01", title: "Request Arrives", description: "An AI request enters your system — a query to your HR chatbot, a prompt to your loan assessment tool, or a message to any LLM-powered workflow.", outcome: "HIK intercepts before the model sees it" },
      { number: "02", title: "Policy Gate Fires", description: "HIK evaluates the request against your declared compliance policy. If it contains a prohibited category — emotion inference, automated hiring decisions, discriminatory framing — the request is blocked immediately.", outcome: "Zero false positives on the block action itself" },
      { number: "03", title: "Compliance Receipt Issued", description: "Whether the request passed or was blocked, HIK issues a Sacred Trace™ receipt: a cryptographically signed record of the query, the policy applied, and the decision made — anchored on IPFS and the blockchain.", outcome: "Court-admissible proof, available to any auditor" }
    ]
  },
  useCases: {
    title: "Built for Regulated AI",
    subtitle: "Use Cases",
    cases: [
      { industry: "Human Resources", icon: "user", problem: "Your AI hiring assistant is subject to NYC Local Law 144. Every automated employment decision must be auditable, bias-tested, and defensible.", hikSolves: "HIK blocks prohibited questions (emotional state, physical inference) before they reach the model. Every interaction produces an audit receipt tied to the specific LL144 article." },
      { industry: "Financial Services", icon: "shield", problem: "Loan assessment and risk-flagging AI generates decisions with legal consequences. GDPR Article 22 requires that automated decisions are explainable and challengeable.", hikSolves: "HIK enforces your declared credit policy at the inference boundary. Every decision is timestamped, hashed, and anchored — ready for a regulatory challenge without additional tooling." },
      { industry: "Healthcare & Legal", icon: "scale", problem: "Patient triage and legal inference AI operate in environments where a wrong output is not a UX failure — it is a liability event. Standard guardrails are advisory, not enforceable.", hikSolves: "HIK enforces hard policy boundaries at the infrastructure level. Prohibited outputs are blocked, not flagged. The receipt proves the enforcement happened at the right moment." }
    ]
  },
  trinityProtocol: {
    title: "The Enforcement Architecture", subtitle: "Core Architecture",
    layers: [
      { id: "01", name: "Content Provenance", description: "C2PA 2.3 standard for cryptographic signing of every content fragment. Each content unit includes a verifiable link to its predecessor, creating an unbreakable chain of custody from source to output.", tags: ["C2PA 2.3", "Content Integrity", "Merkle Anchoring"] },
      { id: "02", name: "Policy Enforcement Kernel (KMIR)", description: "The Kernel of Manifested Integrity Rules — a strict, zero-trust policy gatekeeper. Evaluates every AI input and output against declared compliance rules. Gate 1 fires before the LLM sees the request. Gate 2 fires before the user sees the response.", tags: ["Gate 1 Input", "Gate 2 Output", "Zero-Trust", "EU AI Act"] },
      { id: "03", name: "Live Telemetry Pulse", description: "CMCD v2 integrity telemetry broadcasts the compliance state of every live fragment in real-time. Cryptographically signed — a spoofed integrity signal at the CDN edge is computationally infeasible.", tags: ["CMCD v2", "Signed Telemetry", "Real-time", "CDN Edge"] },
      { id: "04", name: "Live Stream Policy Enforcement", description: "The enforcement layer extends to continuous video streams. Demonstrated live: an OBS broadcast to YouTube routed through the HIK enforcement proxy — when a policy violation was injected, the live stream was terminated at edge level. Not a simulation.", tags: ["Proven Live", "OBS Kill-Switch", "YouTube Edge", "Edge Enforcement"] }
    ]
  },
  sacredTrace: {
    title: "Sacred Trace™", subtitle: "Cryptographic Core",
    description: "Every interaction — whether passed or blocked — produces an immutable, replayable cryptographic compliance receipt: the Sacred Trace™",
    formula: "[ Cryptographically Anchored Verification Chain ]",
    ethicalKeys: [
      { key: "Enforcement State", values: ["SAFE \u00b7 Output verified and within declared policy", "DRIFT \u00b7 Intent deviation detected and flagged", "HALT \u00b7 Gate fired, output or stream terminated"] },
      { key: "Provenance Score", description: "Merkle chain depth \u2014 a numeric indicator of how many verified events are anchored back to the root, forming the unbroken compliance chain." }
    ],
    sdkApi: [
      { method: "Gate 1 (Input)", description: "Evaluates the AI request before the model sees it. Returns an enforcement verdict and a provisional compliance receipt." },
      { method: "Gate 2 (Output)", description: "Evaluates the LLM response before the user sees it. Blocks policy violations or passes with an attached receipt." },
      { method: "Receipt Confirmation", description: "Retrieves a confirmed compliance receipt including Merkle proof, IPFS anchor, and blockchain transaction reference." }
    ]
  },
  sdkCode: SDK_CODE,
  architectureFlow: [
    { label: "AI Request Enters", sublabel: "Any LLM \u2014 model-agnostic" },
    { label: "Gate 1: Input Policy Check", sublabel: "Blocked if prohibited — optimized latency" },
    { label: "LLM Processing", sublabel: "HIK-guarded \u2014 passes only if clean" },
    { label: "Gate 2: Output Policy Check", sublabel: "Final enforcement before user sees it" },
    { label: "Compliance Record Written", sublabel: "Crash-safe persistence — always" },
    { label: "Sacred Trace\u2122 Receipt", sublabel: "IPFS + EVM anchored \u2014 async" }
  ],
  whatHikProduces: [
    { title: "Cryptographic Compliance Receipts", description: "Court-admissible, regulator-ready, machine-verifiable audit trails anchored on IPFS and EVM. Every decision, every block, every pass — recorded immutably." },
    { title: "Dual-Gate Policy Enforcement", description: "Gate 1 evaluates every AI request before the model sees it. Gate 2 evaluates every response before the user sees it. Both operate at enforcement latency optimized for production workloads." },
    { title: "Live Stream Kill-Switch", description: "Proven in production: OBS streaming to YouTube, terminated at edge level via HIK's stream proxy when a policy violation was injected. Not a concept — a demonstrated capability." },
    { title: "Edge-Native Interception", description: "Stateless deployment integrating directly with CDN edge infrastructure. Hardware enclave support for camera-level provenance. Signing architecture portable to any serverless edge environment." }
  ],
  whyNow: [
    { regulation: "EU AI Act Article 50", detail: "The EU Digital Omnibus deferred Annex III high-risk obligations to December 2, 2027 — but Article 50 Transparency enforcement is locked for August 2, 2026. No deferral. No grace period. CISOs relying on probabilistic guardrails will fail audits. Fines up to €35M or 7% of global revenue per violation." },
    { regulation: "NYC Local Law 144", detail: "Active now. Per-candidate daily penalties for automated employment decision tools. Server logs are not a compliant audit trail." },
    { regulation: "GDPR Article 22", detail: "Litigated. Third-party auditors cannot rely on server logs that cannot prove output integrity at the moment of the decision." }
  ],
  team: [
    { name: "Mart\u00edn Riotorto", role: "Founder & Lead Architect", location: "Montevideo, Uruguay", bio: "20+ years across telecom infrastructure, real-time content systems, and AI integrity tooling. Designed the HIK enforcement architecture from the ground up." },
    { name: "Mat\u00edas Mospan", role: "Co-Founder \u0026 Platform Lead", location: "Argentina", bio: "Platform architect responsible for HIK\u2019s enterprise infrastructure layer \u2014 Kubernetes sidecar deployment, multi-tenant enforcement pipelines, and the next-generation serverless edge enforcement engine." },
    { name: "Federico Brubacher", role: "External Strategic Advisor", location: "California, USA", bio: "Senior technology leader with deep enterprise and cloud infrastructure expertise. Independently validated the HIK enforcement architecture against global scalability and Big Tech standards." },
    { name: "Agustín Ortiz", role: "Chief Marketing Officer", location: "Uruguay", bio: "Agustín Ortiz bridges the gap between cryptographic AI governance and enterprise adoption. Zero fluff. Pure deterministic execution.", hoverLine: "Architecting the narrative of deterministic trust for the autonomous M2M economy." }
  ],
  roadmap: {
    phases: [
      { phase: "Phase 1", version: "SDK v1.0", status: "LIVE", statusColor: "green", title: "Static Asset Integrity", items: ["Sacred Trace\u2122 cryptographic receipts", "Merkle-anchored source corpus", "Blockchain anchoring active", "Gate 1 (input) and Gate 2 (output) enforcement active"] },
      { phase: "Phase 2", version: "Live Infrastructure", status: "LIVE", statusColor: "green", title: "Live Infrastructure", items: ["IPFS pinning active", "Private EVM node on cloud infrastructure", "Signed integrity telemetry injection", "Leading LLM platform integration live"] },
      { phase: "Phase 3", version: "Core + KMIR", status: "LIVE", statusColor: "green", title: "Core Enforcement Binary", items: ["Atomic fail-close enforcement with optimized latency", "Lightweight static binary \u2014 minimal footprint, near-instant cold start", "Deterministic policy cascade", "Crash-safe persistence layer with chain-state atomicity"] },
      { phase: "Phase 4", version: "Edge Interdiction", status: "LIVE", statusColor: "green", title: "Hardware \u0026 Edge Kill-Switch", items: ["Live stream terminated at edge level (demonstrated live)", "Hardware enclave integration (smart cameras, broadcast devices)", "Cryptographically signed telemetry \u2014 spoof-resistant at CDN edge", "Stateless enforcement proxy: HPA-eligible, scales to zero"] },
      { phase: "Phase 5", version: "Serverless Edge", status: "IN PROGRESS", statusColor: "orange", title: "Autonomous Edge Enforcement", items: ["Device-embedded signing and telemetry modules", "Autonomous enforcement at edge network \u2014 no origin dependency", "Full serverless streaming governance", "Late Interdiction Receipt: forensic proof of catch-and-terminate mid-flight"] }
    ]
  },
  origins: {
    intro: "Systems are not neutral. They carry the intent of their architects.",
    title: "Human Is Kind was not born in a boardroom.",
    paragraphs: [
      "It was not born from a market gap analysis or a pitch deck.",
      "It was born from two decades of building systems that worked \u2014 and watching them quietly betray the people they were supposed to serve.",
      "Telecommunications infrastructure. Software architecture. Regulatory compliance at scale. Systems that performed. Systems that scaled.",
      "And somewhere in that process, a question emerged that never left:"
    ],
    keyQuestion: "How do we guarantee that what a system decides today remains true to its origin tomorrow?",
    quote: "The most vital metric of all was being discarded: Human Integrity.",
    personalNote: "I know what it feels like when a system loses its trace back to truth \u2014 when outputs drift from intent, when accountability dissolves into complexity.",
    mission: "I built Human Is Kind because I needed it to exist. Not as a policy layer. Not as a compliance checkbox. As a hard engineering constraint \u2014 cryptographic, immutable, and impossible to lobby away.",
    sacredTraceNote: "The Sacred Trace\u2122 is not a feature. It is a promise made in code.",
    intellectualBedrock: { title: "The Intellectual Bedrock", text: "This work is supported by a decade of raw personal inquiry \u2014 philosophy, systems thinking, and the kind of questions you only ask when you are willing to follow them all the way down.", archiveLink: "https://martinriotorto.blogspot.com/" },
    closingVision: ["Three people. Two continents. One protocol.", "We are not trying to stop AI.", "We are making the Human so visible it becomes the ultimate gold standard of the web.", "In a world of infinite copies, the original human intent is the only true scarcity."]
  },
  manifesto: {
    sections: [
      { number: "I", title: "The Problem We Refuse to Accept", content: ["Every enterprise deploying AI today is operating on a shared assumption: that probabilistic systems can be made safe through probabilistic oversight. Logs reviewed after the fact. Guardrails that advise but do not enforce.", "We refuse that assumption.", "In regulated environments \u2014 HR decisions, financial risk, healthcare triage, legal inference \u2014 the moment of failure is not recoverable."], quote: "Forensic AI safety is not safety. It is archaeology." },
      { number: "II", title: "What We Are Building", content: ["HumanisKind (HIK) is deterministic policy enforcement middleware for enterprise AI. Not a wrapper. Not a prompt filter. A cryptographically enforced protocol layer that intercepts at the policy boundary.", "Every interaction produces a Sacred Trace\u2122 \u2014 an immutable cryptographic receipt anchoring the query, the policy applied, and the decision made into a single verifiable chain.", "This is not AI ethics as philosophy. This is AI policy enforcement as infrastructure."] },
      { number: "III", title: "Why Now", content: ["The EU AI Act Article 5 deadline arrives August 2, 2026. NYC Local Law 144 is already in force. GDPR Article 22 has been litigated.", "The gap is not technical awareness. The gap is tooling.", "That is the gap HIK was built to close."] },
      { number: "IV", title: "Our Commitments", content: ["We will never obscure what the system does. HIK is source-available under FCL-1.0.", "We will never claim a capability we cannot demonstrate. Every capability we publish is implemented and tested \u2014 including the live stream kill-switch.", "We will treat governance as a design constraint, not a feature."], quote: "While others build layers to help machines understand humans, we build layers to help humans trust machines." },
      { number: "V", title: "The Vision Beyond Compliance", content: ["Compliance is the floor, not the ceiling.", "A world where 'AI-generated' is not a disclaimer but a specification \u2014 one that includes who authorized it, under what constraints, with what provenance.", "We are not building a product. We are building the infrastructure for accountable intelligence."] }
    ]
  },
  footer: { copyright: "\u00a9 2026 Human Is Kind\u2122", tagline: "Governance infrastructure, not interpretive authority.", trademark: "HIK\u2122 and Sacred Trace\u2122 are trademarks in registration. Licensed under FCL-1.0-Apache-2.0.", contact: "contact@humaniskind.com" },

  techTabs: { architecture: 'Architecture', cryptographic: 'Cryptographic Core', sdk: 'Integration', compliance: 'Compliance Mapping' },
  techBadges: ['Static Core Binary', 'C2PA 2.3', 'KMIR v1.1', 'Integrity Telemetry', 'Dual-Algorithm Signing', 'EVM + IPFS', 'Serverless Edge', 'K8s Sidecar'],
  complianceRows: [
    { regulation: 'EU AI Act Art. 5(1)(f)', scope: 'Emotion Inference Ban', hikEnforcement: 'Gate 1 blocks emotion-state queries before LLM. Gate 2 blocks emotion-inference outputs. Compliance receipt maps to this article explicitly.' },
    { regulation: 'EU AI Act Art. 50', scope: 'Transparency obligations for AI systems', hikEnforcement: 'Sacred Trace™ receipt provides machine-readable proof of policy applied, timestamp, and decision — satisfying Art. 50 disclosure requirements.' },
    { regulation: 'NYC Local Law 144', scope: 'Automated Employment Decision Tools', hikEnforcement: 'Gate 1 intercepts prohibited hiring queries (emotional state, physical inference). Every interaction produces an LL144-tagged audit receipt.' },
    { regulation: 'GDPR Art. 22', scope: 'Automated individual decision-making', hikEnforcement: 'Anchored receipts provide the explainability trail required for Art. 22 challenges. Merkle proof allows any auditor to verify the decision chain.' },
    { regulation: 'GDPR Art. 5(1)(e)', scope: 'Storage limitation', hikEnforcement: 'Receipts store only query hashes, policy IDs, and decisions — not raw PII. The enforcement record is cryptographically verifiable without retaining personal data.' },
  ],
  cryptographicDesign: {
    title: 'Dual-Algorithm Cryptographic Design',
    desc: 'HIK employs purpose-specific cryptographic algorithms across its enforcement pipeline. Different operations — content provenance, real-time telemetry signing, and compliance receipts — use independently selected algorithms optimized for each threat model and performance requirement. The full cryptographic specification is available to qualified enterprise evaluators under NDA.'
  },
  integrationTab: {
    title: 'HIK Native Enforcement Engine — Drop-in Integration',
    desc: 'The HIK engine acts as a transparent proxy in front of any LLM endpoint. No SDK installation required in your application — point your existing LLM calls at the HIK proxy URL.',
    deploymentTitle: 'Deployment Options',
    options: [
      { title: 'Kubernetes Sidecar', desc: 'Lightweight static binary runs alongside any LLM-serving pod. All LLM traffic passes through the enforcement cascade. HPA-eligible.', tags: ['K8s', 'GKE', 'EKS'] },
      { title: 'Cloud Run / Fargate', desc: 'Container-per-request with auto-scaling to zero. Optimized cold start. No persistent storage required.', tags: ['Cloud Run', 'Fargate', 'Serverless'] },
      { title: 'Chrome Extension', desc: 'Browser-level interception for LLM web interfaces (Gemini, ChatGPT). Evaluates prompts via the enforcement proxy before submission.', tags: ['Chrome Extension', 'Shadow DOM'] },
      { title: 'Edge-Native Serverless (Phase 5)', desc: 'Autonomous enforcement at CDN edge. Embedded telemetry and enforcement logic at edge layer. In active development.', tags: ['In Progress', 'Edge-Native', 'Serverless'] },
    ]
  },
  techUi: { integritySchema: 'Integrity Key Schema', apiEndpoints: 'API Endpoints', regulatoryCoverage: 'Regulatory Coverage', mappingTitle: 'How HIK Maps to Each Regulation', mappingDesc: 'Each HIK enforcement action maps to specific regulatory articles. The Sacred Trace™ receipt explicitly includes the policy ID and article reference — making audit responses mechanical, not interpretive.' },

  ui: {
    contactUs: "Contact Us",
    scroll: "Scroll",
    viewTechSpec: "View full technical specification",
    readManifesto: "Read the Founders' Manifesto",
    requestPitchDeck: "Request Pitch Deck",
    requestAccess: "Request Access",
    exploreTech: "Explore Architecture",
    exploreSDK: "View Technical Architecture",
    readyTitle: "Ready to enforce AI policy with cryptographic proof?",
    readyDesc: "HIK is live today: Native enforcement engine, deterministic policy cascade, live stream kill-switch, and blockchain-anchored audit receipts.",
    teamTitle: "Four Principals. Two Continents. One Protocol.",
    theTeam: "The Team",
    signedBy: "Signed By",
    regulatoryLandscape: "Regulatory Landscape",
    whyNowTitle: "Why Now",
    whatProduces: "What HIK Delivers",
    verifiableAI: "AI That Proves Its Own Compliance",
    quickIntegration: "Integration",
    architectureFlowLabel: "Enforcement Flow",
    architectureFlowTitle: "From Request to Compliance Receipt",
    cryptographicCore: "Cryptographic Core",
    sacredTraceEthical: "Sacred Trace\u2122 \u2014 The Compliance Receipt",
    coreArchitecture: "Core Architecture",
    originsLabel: "Origins",
    developmentRoadmap: "Development Roadmap",
    roadmapTitle: "HIK Architectural Roadmap",
    roadmapDesc: "From Manifesto to Infrastructure \u2014 Live Status",
    manifestoLabel: "Human Is Kind\u2122 \u2014 Est. 2026",
    manifestoTitle: "The Founders' Manifesto",
    manifestoDesc: "On why deterministic policy enforcement is not a feature \u2014 it is the foundation.",
    executiveSummary: "Executive Summary",
    techHero: "Technology \u2014 Human Is Kind\u2122",
    techTitle: "Deterministic Policy Enforcement\nfor Enterprise AI",
    techDesc: "The enforcement layer that intercepts every AI decision at the policy boundary. Gate 1 fires before the model. Gate 2 fires before the user. Every path produces a cryptographic compliance receipt.",
    buildingInfra: "Building the infrastructure for accountable AI",
    buildingDesc: "Live enforcement, live stream kill-switch, and blockchain-anchored audit receipts \u2014 available today.",
    interestedMore: "Interested in learning more?",
    currentStatus: "Current Status",
    currentStatusDesc: "Native enforcement engine, deterministic policy cascade, live stream kill-switch, and edge enforcement architecture are all live. Phase 5 serverless edge integration is in active development.",
    exploreArchive: "Explore the Personal Archive",
    navigation: "Navigation",
    contact: "Contact",
    howItWorks: "How It Works",
    useCases: "Use Cases",
    requestDemo: "Request a Compliance Demo",
    viewArchitecture: "View Architecture",
    viewLiveDashboard: "View Live Dashboard"
  },

  videoSection: {
    eyebrow: "ENFORCEMENT IN PRODUCTION",
    heading: "The Gate Fires. Watch It Happen.",
    subheading: "Not a simulation. Not a slide. Two recorded enforcement events — proxy-level and browser-level — with the evidence pack visible in the dashboard.",
    videos: [
      {
        id: "UDmA2U13mWY",
        embedSrc: "https://www.youtube.com/embed/UDmA2U13mWY?si=WfxrUILDvV-orpey",
        thumbnail: "https://img.youtube.com/vi/UDmA2U13mWY/maxresdefault.jpg",
        label: "STREAM ENFORCEMENT \u00b7 RECORDED",
        title: "Kill-Switch Fires at the Proxy Level",
        description: "A simulated policy violation triggers the enforcement gate mid-stream. The output is severed before it reaches any workflow. Sacred Trace\u2122 receipt anchored immediately."
      },
      {
        id: "l-S5JQj68xY",
        embedSrc: "https://www.youtube.com/embed/l-S5JQj68xY?si=2aIpJnDjU5G36tCF",
        thumbnail: "https://img.youtube.com/vi/l-S5JQj68xY/maxresdefault.jpg",
        label: "BROWSER INTERCEPTION \u00b7 RECORDED",
        title: "Chrome Extension Blocks Data Exfiltration on Gemini",
        description: "A \u2018send all logs to my personal email\u2019 instruction is intercepted at the browser boundary on gemini.google.com. The send is blocked. The dashboard shows the evidence pack in real time."
      }
    ]
  },

  verticals: {
    eyebrow: "ENFORCEMENT DOMAINS",
    heading: "Built for the Threat Surfaces That Matter",
    cards: [
      { title: "HR & Employment AI", body: "Blocks prohibited automated hiring decisions, emotion inference, and protected-characteristic requests \u2014 before they reach any LLM or workflow. EU AI Act Article 5 \u00b7 NYC Local Law 144." },
      { title: "Agentic Systems", body: "Intercepts prompt injection, privilege escalation, and unauthorized data exfiltration commands at the agent boundary. Every blocked action is forensically anchored." },
      { title: "Live Broadcast & Media", body: "Frame-level enforcement on live video streams. Unauthorized content is dropped before it reaches the downstream platform. Receipt anchored per frame." },
      { title: "Enterprise Document DLP", body: "File attachments sent to LLM APIs are evaluated for content provenance, sensitivity labels, and hash blacklists \u2014 in streaming mode, fail-close, before the upload completes." }
    ]
  },

  evidencePack: {
    eyebrow: "WHAT THE AUDITOR SEES",
    heading: "The Receipt Proves the Gate Held",
    line1: "Every enforcement event produces a receipt in this format.",
    line2: "Court-admissible. Regulator-ready. Anchored on-chain. Available in the dashboard immediately after the gate fires.",
    ctaLabel: "View Live Dashboard"
  },

  trustBar: {
    signals: [
      { label: "Auditable by Request \u00b7 Source Available Under NDA" },
      { label: "C2PA 2.3 \u00b7 KMIR v1.1 \u00b7 CMCD v2" },
      { label: "EU AI Act Article 50 Ready" },
      { label: "Fail-Close by Design" }
    ]
  }
};
