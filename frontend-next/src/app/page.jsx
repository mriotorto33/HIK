import Layout from '@/components/Layout';
import HomePageClient from '@/views/HomePageClient';

const OG_IMAGE = 'https://humaniskind.com/opengraph-image.png';

export const metadata = {
  title: 'HIK — Deterministic AI Governance Infrastructure | Human Is Kind™',
  description:
    'HIK intercepts every AI agent action at the policy boundary — enforcing inputs before they reach the model and outputs before they reach your workflow. Cryptographic compliance receipts, KMIR enforcement kernel, EU AI Act ready. Live in production.',
  keywords: [
    'AI governance platform', 'AI policy enforcement', 'LLM compliance middleware',
    'EU AI Act compliance tool', 'Sacred Trace', 'KMIR', 'AI audit trail',
    'deterministic AI middleware', 'AI input validation', 'AI output filtering',
    'blockchain AI compliance', 'NYC Local Law 144', 'GDPR Article 22',
    'enterprise AI governance', 'AI accountability infrastructure',
  ],
  openGraph: {
    title: 'HIK — Deterministic AI Governance Infrastructure',
    description:
      'Policy enforcement middleware that intercepts every AI decision at the boundary. Gate 1 before the model. Gate 2 before the user. Cryptographic compliance receipt at every interaction. Live in production.',
    url: 'https://humaniskind.com/',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'HIK — AI Governance Infrastructure' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HIK — Deterministic AI Governance',
    description: 'Policy enforcement at the AI boundary. Cryptographic receipts. Court-admissible. Live in production.',
    images: [OG_IMAGE],
  },
  alternates: { canonical: 'https://humaniskind.com/' },
};

const homepageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'HIK — Deterministic AI Governance Infrastructure',
  url: 'https://humaniskind.com/',
  description: metadata.description,
  image: OG_IMAGE,
  isPartOf: { '@id': 'https://humaniskind.com/#organization' },
  about: {
    '@type': 'SoftwareApplication',
    name: 'HIK Platform',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Cloud, Kubernetes, Docker, Chrome Extension',
    description:
      'Deterministic AI policy enforcement middleware. Intercepts inputs before the model (Gate 1) and outputs before the workflow (Gate 2). Issues Sacred Trace™ cryptographic compliance receipts — IPFS + EVM anchored, court-admissible.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Contact for enterprise pricing' },
    featureList: [
      'Dual-Gate Policy Enforcement (Input + Output)',
      'Sacred Trace™ Cryptographic Compliance Receipts',
      'KMIR Deterministic Policy Kernel',
      'Live Stream Kill-Switch (demonstrated in production)',
      'IPFS + EVM Blockchain Anchoring',
      'C2PA 2.3 Content Provenance',
      'EU AI Act Article 50 Ready',
      'NYC Local Law 144 Compliance',
      'Model-Agnostic (GPT-4, Claude, Gemini)',
      'Kubernetes Sidecar + Cloud Run + Chrome Extension',
    ],
  },
  potentialAction: {
    '@type': 'ContactAction',
    target: 'mailto:contact@humaniskind.com',
    name: 'Request a Compliance Demo',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is HIK?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HIK (Human Is Kind™) is deterministic policy enforcement middleware for enterprise AI. It intercepts every AI interaction at the policy boundary — before the request reaches the model (Gate 1) and before the response reaches the user or workflow (Gate 2) — issuing a Sacred Trace™ cryptographic compliance receipt at every step.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a Sacred Trace™?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sacred Trace™ is HIK\'s immutable cryptographic compliance receipt. It records the query hash, policy applied, enforcement decision, Merkle root, IPFS URI, and EVM transaction reference. It is court-admissible and regulator-ready, anchored on IPFS and the Ethereum Virtual Machine.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is HIK EU AI Act compliant?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. HIK enforces EU AI Act Article 5 prohibitions (blocking banned AI practices at the gate), satisfies Article 50 transparency obligations via Sacred Trace™ receipts, and maps enforcement actions to specific regulatory articles in every compliance record.',
      },
    },
    {
      '@type': 'Question',
      name: 'What models does HIK work with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HIK is model-agnostic. It works as a transparent proxy in front of any LLM endpoint — GPT-4, Claude, Gemini, Mistral, or any API-compatible model. No SDK changes required in existing applications.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I contact HIK?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Contact the HIK team at contact@humaniskind.com to request a compliance demo or discuss enterprise deployment.',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Layout>
        <HomePageClient />
      </Layout>
    </>
  );
}
