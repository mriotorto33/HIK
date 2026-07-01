import Layout from '@/components/Layout';
import TechnologyPageClient from '@/views/TechnologyPageClient';

const OG_IMAGE = 'https://humaniskind.com/opengraph-image.png';

export const metadata = {
  title: 'Technology | HIK — KMIR Enforcement Kernel & Sacred Trace™ Architecture',
  description:
    'The HIK enforcement architecture: KMIR deterministic policy kernel, Sacred Trace™ cryptographic receipts, C2PA 2.3 content provenance, and dual-gate AI enforcement. Gate 1 fires before the model. Gate 2 fires before the user. Every path produces an immutable compliance receipt.',
  keywords: [
    'KMIR AI enforcement', 'Sacred Trace architecture', 'AI policy middleware',
    'C2PA 2.3 provenance', 'deterministic AI kernel', 'AI output filtering',
    'LLM proxy enforcement', 'EU AI Act technology', 'blockchain AI audit',
    'cryptographic AI receipt', 'AI governance architecture', 'zero-trust AI middleware',
  ],
  openGraph: {
    title: 'HIK Technology — KMIR Kernel, Sacred Trace™ & C2PA 2.3',
    description:
      'Explore the enforcement architecture: deterministic input interception (Gate 1), output policy enforcement (Gate 2), and Sacred Trace™ cryptographic receipts anchored on IPFS and EVM. EU AI Act compliant from day one.',
    url: 'https://humaniskind.com/technology',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'HIK Technology Architecture' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HIK Technology — Deterministic AI Enforcement',
    description: 'KMIR kernel, Sacred Trace™ receipts, C2PA 2.3, dual-gate enforcement. The architecture behind provable AI compliance.',
    images: [OG_IMAGE],
  },
  alternates: { canonical: 'https://humaniskind.com/technology' },
};

const techJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'HIK Technology — Deterministic AI Governance Infrastructure',
  url: 'https://humaniskind.com/technology',
  image: OG_IMAGE,
  description: metadata.description,
  author: { '@type': 'Organization', name: 'Human Is Kind™', url: 'https://humaniskind.com' },
  publisher: { '@type': 'Organization', name: 'Human Is Kind™', url: 'https://humaniskind.com' },
  about: [
    { '@type': 'Thing', name: 'KMIR Enforcement Kernel — Kernel of Manifested Integrity Rules' },
    { '@type': 'Thing', name: 'Sacred Trace™ Cryptographic Compliance Receipt' },
    { '@type': 'Thing', name: 'C2PA 2.3 Content Provenance Standard' },
    { '@type': 'Thing', name: 'EU AI Act Article 5 and Article 50 Compliance' },
    { '@type': 'Thing', name: 'AI Input Interception — Gate 1 Policy Enforcement' },
    { '@type': 'Thing', name: 'AI Output Filtering — Gate 2 Policy Enforcement' },
    { '@type': 'Thing', name: 'IPFS and EVM Blockchain Anchoring' },
    { '@type': 'Thing', name: 'Live Stream Kill-Switch via Enforcement Proxy' },
  ],
};

export default function TechnologyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techJsonLd) }} />
      <Layout>
        <TechnologyPageClient />
      </Layout>
    </>
  );
}
