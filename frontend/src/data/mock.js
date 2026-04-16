export const siteData = {
  brand: {
    name: "Human Is Kind™",
    tagline: "Deterministic AI Governance Infrastructure",
    description: "The protocol layer that transforms probabilistic AI systems into verifiable, auditable, and human-constrained infrastructure.",
    established: "Est. 2026",
    location: "Montevideo — Buenos Aires"
  },

  hero: {
    title: "Human Is Kind",
    trademark: "™",
    subtitle: "DETERMINISTIC AI GOVERNANCE INFRASTRUCTURE",
    description: "We provide the protocol layer that transforms probabilistic AI systems into verifiable, auditable, and human-constrained infrastructure. Ethics is not a feature — it is the design constraint.",
    badges: ["SDK v1.0 Live", "C2PA 2.3", "KMIR v1.1", "CMCD v2", "Polygon Anchoring", "Zero-Trust Middleware"],
    cta: {
      primary: { text: "Explore SDK v1.0", link: "/technology" },
      secondary: { text: "Executive Summary", link: "/executive-summary" }
    }
  },

  problem: {
    title: "The Problem",
    description: "Every enterprise deploying AI today faces the same structural gap: AI systems generate decisions — hiring summaries, loan flags, patient triage, compliance outputs — but produce no cryptographic proof that those decisions stayed within policy at the moment they were made.",
    highlight: "Logs tell you what happened. They cannot prove what was authorized to happen. That distinction is the entire legal liability."
  },

  solution: {
    title: "The Solution",
    description: "HIK is a model-agnostic middleware layer that intercepts every AI interaction at the output boundary — before it reaches any workflow. At the moment of enforcement, it generates a Sacred Trace™.",
    highlight: "If the output violates policy, the gate fires. The output never reaches the workflow. The receipt proves the gate held."
  },

  trinityProtocol: {
    title: "The Trinity Protocol",
    subtitle: "Core Architecture",
    layers: [
      {
        id: "01",
        name: "Content Provenance",
        description: "C2PA 2.3 standard for cryptographic signing of every content fragment. Each fMP4 video segment includes a hash of its predecessor, creating an unbreakable chain of custody from source to output.",
        tags: ["C2PA 2.3", "VSI", "Merkle Anchoring"]
      },
      {
        id: "02",
        name: "Ethical Runtime Kernel",
        description: "KMIR — the Kernel for Manifesto-based Intent Recognition. Validates every AI output against the declared Sovereign Intent before delivery. If the system drifts, enforcement is automatic.",
        tags: ["KMIR v1.1", "manifesto.json", "@ethics_constrained"]
      },
      {
        id: "03",
        name: "Live Telemetry Pulse",
        description: "CMCD v2 extended keys broadcast the Ethical State of every live fragment in real-time. Integrity becomes observable at the infrastructure level — not after the fact, but during transmission.",
        tags: ["CMCD v2", "hik-es", "hik-ps", "Real-time"]
      }
    ]
  },

  sacredTrace: {
    title: "Sacred Trace™",
    subtitle: "Cryptographic Core",
    description: "Every interaction produces an immutable, replayable cryptographic receipt — the Sacred Trace™",
    formula: "Traceability_Hash = Hash(Query + Policy_ID + Source_Root + LM_Output)",
    ethicalKeys: [
      { key: "hik-es", values: ["0 — SAFE · Output verified", "1 — DRIFT · Intent deviation detected", "2 — HALT · Stream severed"] },
      { key: "hik-ps", description: "Provenance Score — real-time VSI fragment verification against the Source Root. Range: 0.0 → 1.0" }
    ],
    sdkApi: [
      { method: ".anchor()", description: "Creates Merkle Tree from source corpus. Returns MerkleRoot hash for policy binding." },
      { method: ".validate()", description: "Compares LLM output against declared Policy Manifest constraints. Returns hik-es state." },
      { method: ".trace()", description: "Generates the final Sacred Trace™ receipt. Anchored on-chain via Polygon at session end." }
    ]
  },

  sdkCode: `import { IntegrityEngine } from '@humaniskind/sdk-v1';

// Initialize with your Policy Manifest
const engine = new IntegrityEngine({
  policyId:   'p_0x882a…',
  merkleRoot: '0x77f2…'  // Your source anchor
});

// Validate any LLM output in your pipeline
const result = await engine.validate(llmOutput);

if (result.ethicalState === 2) {
  // hik-es: HALT — enforce at kernel level
  stream.kill();
}

// Generate Sacred Trace™ receipt
const trace = await engine.trace();
// → HK_TRACE_v1_0x551277a…`,

  architectureFlow: [
    { label: "User Query", sublabel: "Input", type: "start" },
    { label: "Policy Manifest", sublabel: "manifesto.json · read-only", type: "process" },
    { label: "Source Corpus", sublabel: "Merkle Root · anchored", type: "process" },
    { label: "LLM Processing", sublabel: "KMIR guardrails · active", type: "process" },
    { label: "Semantic Guard", sublabel: "Intent validation", type: "process" },
    { label: "Sacred Trace™", sublabel: "Cryptographic receipt", type: "end" }
  ],

  roadmap: {
    phases: [
      {
        phase: "Phase 1",
        version: "SDK v1.0",
        status: "LIVE",
        statusColor: "green",
        title: "Static Asset Integrity",
        items: [
          "Sacred Trace™ cryptographic receipts",
          "Merkle-anchored source corpus",
          "Polygon blockchain anchoring",
          "GATE 1 (input) and GATE 2 (output) enforcement active"
        ]
      },
      {
        phase: "Phase 2",
        version: "Live Infrastructure",
        status: "LIVE",
        statusColor: "green",
        title: "Live Infrastructure",
        items: [
          "IPFS pinning active",
          "Private EVM node on GCP/Kubernetes",
          "CMCD v2 telemetry headers injection",
          "Gemini 2.5 Flash integration live"
        ]
      },
      {
        phase: "Phase 3",
        version: "Go Core + KMIR",
        status: "ACTIVE DEV",
        statusColor: "amber",
        title: "Go Core Binary + KMIR v1.1",
        items: [
          "Atomic fail-close enforcement in under 1ms",
          "Go static binary for P99 sub-millisecond execution",
          "KMIR Ethical Kernel with fuzzy matching",
          "Structural gate fires on prohibited intent categories"
        ]
      },
      {
        phase: "Phase 4",
        version: "Enterprise Layer",
        status: "ROADMAP",
        statusColor: "gray",
        title: "Enterprise Layer",
        items: [
          "Multi-tenant enforcement pipelines",
          "SDK dashboard",
          "Enterprise SLA",
          "Native integrations for HR, FinTech, HealthTech"
        ]
      }
    ]
  },

  team: [
    {
      name: "Martín Riotorto",
      role: "Founder & Lead Architect",
      flag: "UY",
      location: "Montevideo, Uruguay",
      bio: "20+ years across telecom infrastructure, real-time content systems, and AI integrity tooling. Former contributor to the C2PA ecosystem. Built the initial architecture from a phone."
    },
    {
      name: "Matías Mospan",
      role: "Co-Founder & Platform Lead",
      flag: "AR",
      location: "Argentina",
      bio: "Platform architect responsible for HIK's enterprise infrastructure layer — GKE deployment, multi-tenant enforcement pipelines, and the next-generation enforcement engine powering Sacred Trace™."
    },
    {
      name: "Federico Brubacher",
      role: "External Strategic Advisor",
      flag: "UY",
      location: "Uruguay",
      bio: "Senior technology leader with deep enterprise and cloud infrastructure expertise. Advises HIK on strategic positioning, enterprise architecture, and global scaling."
    }
  ],

  whyNow: [
    { regulation: "EU AI Act Article 50", detail: "Enforcement begins August 2, 2026. Fines up to €35M or 7% of global revenue per violation." },
    { regulation: "NYC Local Law 144", detail: "Active now. Per-candidate daily penalties for automated employment decision tools." },
    { regulation: "GDPR Article 22", detail: "Litigated. Third-party auditors cannot rely on server logs that cannot prove output integrity." }
  ],

  whatHikProduces: [
    { title: "Cryptographic Receipts", description: "Court-admissible, regulator-ready, machine-verifiable audit trails." },
    { title: "Dual-Gate Enforcement", description: "GATE 1 input / GATE 2 output enforcement in under 1 millisecond." },
    { title: "Blockchain Anchoring", description: "Proof via Polygon — replayable by any auditor or court." },
    { title: "Model-Agnostic", description: "Integrates into existing AI pipelines without replacing them." }
  ],

  sovereignIntent: {
    question: "Should 'truth' and 'ethics' be a corporate black box, or a human right?",
    quote: "With the Human Is Kind (HIK) SDK, I am proposing a different path — one where the creator, not the model, holds the moral compass.",
    features: [
      { title: "Temporal Firewall™", description: "A timestamped hash on Polygon ensures that no machine can forge the origin or timing of human effort." },
      { title: "Verified Accountability", description: "Moving ethics from generic algorithms to specific private-key signatures. Trust the creator, not the filter." },
      { title: "Human Luxury", description: "In a world of synthetic perfection, the 'Human-Verified' badge becomes the ultimate luxury of truth." }
    ],
    techStack: ["TypeScript", "Solidity", "C2PA", "Polygon", "IPFS"]
  },

  origins: {
    intro: "Systems are not neutral. They carry the intent of their architects.",
    title: "Human Is Kind was not born in a boardroom.",
    paragraphs: [
      "It was not born from a market gap analysis or a pitch deck.",
      "It was born from two decades of building systems that worked — and watching them quietly betray the people they were supposed to serve.",
      "Telecommunications infrastructure. Software architecture. Regulatory compliance at scale. Systems that performed. Systems that scaled. Systems that hit every metric they were designed to hit.",
      "And somewhere in that process, a question emerged that never left:"
    ],
    keyQuestion: "How do we guarantee that what a system decides today remains true to its origin tomorrow?",
    quote: "The most vital metric of all was being discarded: Human Integrity.",
    personalNote: "I know what it feels like when a system loses its trace back to truth — when outputs drift from intent, when accountability dissolves into complexity, when the original human signal gets buried under layers of optimization.",
    mission: "I built Human Is Kind because I needed it to exist. Not as a policy layer. Not as a compliance checkbox. As a hard engineering constraint — cryptographic, immutable, and impossible to lobby away.",
    sacredTraceNote: "The Sacred Trace™ is not a feature. It is a promise made in code.",
    intellectualBedrock: {
      title: "The Intellectual Bedrock",
      text: "This work is supported by a decade of raw personal inquiry — philosophy, systems thinking, and the kind of questions you only ask when you are willing to follow them all the way down.",
      archiveLink: "https://martinriotorto.blogspot.com/"
    },
    closingVision: [
      "Three people. Three continents. One protocol.",
      "We are not trying to stop AI.",
      "We are making the Human so visible it becomes the ultimate gold standard of the web.",
      "In a world of infinite copies, the original human intent is the only true scarcity."
    ]
  },

  manifesto: {
    sections: [
      {
        number: "I",
        title: "The Problem We Refuse to Accept",
        content: [
          "Every enterprise deploying AI today is operating on a shared assumption: that probabilistic systems can be made safe through probabilistic oversight. Logs reviewed after the fact. Guardrails that advise but do not enforce. Audits that reconstruct what happened, never what was intended.",
          "We refuse that assumption.",
          "In regulated environments — HR decisions, financial risk, healthcare triage, legal inference — the moment of failure is not recoverable. A biased hiring decision logged at 11:47 PM does not undo itself when discovered at 9:00 AM."
        ],
        quote: "Forensic AI safety is not safety. It is archaeology."
      },
      {
        number: "II",
        title: "What We Are Building",
        content: [
          "HumanisKind (HIK) is deterministic AI governance middleware. Not a wrapper. Not a prompt filter. A cryptographically enforced protocol layer that intercepts every AI interaction at the input and output boundary.",
          "Every interaction produces a Sacred Trace™ — an immutable cryptographic receipt anchoring the query, the policy manifest, the source corpus, and the output into a single verifiable chain.",
          "This is not AI ethics as philosophy. This is AI ethics as infrastructure."
        ]
      },
      {
        number: "III",
        title: "Why Now",
        content: [
          "The EU AI Act Article 5 deadline arrives August 2, 2026. NYC Local Law 144 is already in force. GDPR Article 22 has been litigated.",
          "The gap is not technical awareness. The gap is tooling. Enterprises know they need governance. They do not have a protocol layer that enforces it deterministically.",
          "That is the gap HIK was built to close."
        ]
      },
      {
        number: "IV",
        title: "Our Commitments",
        content: [
          "We will never obscure what the system does. HIK is source-available under FCL-1.0. Enterprise customers can audit the enforcement logic.",
          "We will never claim safety we cannot demonstrate. Every capability we publish is implemented, tested, and honest about its scope.",
          "We will treat governance as a design constraint, not a feature."
        ],
        quote: "While others build layers to help machines understand humans, we build layers to help humans trust machines."
      },
      {
        number: "V",
        title: "The Vision Beyond Compliance",
        content: [
          "Compliance is the floor, not the ceiling. The longer arc of HIK is a world where every AI system that touches a human decision carries a verifiable chain of custody.",
          "A world where 'AI-generated' is not a disclaimer but a specification — one that includes who authorized it, under what constraints, with what provenance.",
          "We are not building a product. We are building the infrastructure for accountable intelligence."
        ]
      }
    ]
  },

  nav: {
    links: [
      { label: "Technology", path: "/technology" },
      { label: "Origins", path: "/origins" },
      { label: "Roadmap", path: "/roadmap" },
      { label: "Manifesto", path: "/manifesto" },
      { label: "Executive Summary", path: "/executive-summary" }
    ]
  },

  footer: {
    copyright: "© 2026 Human Is Kind™",
    tagline: "Governance infrastructure, not interpretive authority.",
    trademark: "HIK™ and Sacred Trace™ are trademarks in registration. Licensed under FCL-1.0-Apache-2.0.",
    contact: "contact@humaniskind.com"
  }
};
