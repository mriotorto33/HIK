import Layout from '@/components/Layout';
import RoadmapPageClient from '@/views/RoadmapPageClient';

const OG_IMAGE = 'https://humaniskind.com/opengraph-image.png';

export const metadata = {
  title: 'Roadmap | HIK — AI Governance Infrastructure Development Status',
  description:
    'HIK development roadmap: Phases 1–4 are live in production (Sacred Trace™, IPFS anchoring, EVM anchoring, live stream kill-switch, KMIR enforcement kernel). Phase 5 serverless edge enforcement is in active development. Every capability listed is implemented and demonstrable.',
  keywords: [
    'HIK roadmap', 'AI governance development roadmap', 'Sacred Trace roadmap',
    'KMIR enforcement status', 'AI compliance live deployment', 'AI governance phases',
    'EU AI Act compliance roadmap', 'AI infrastructure milestone', 'HIK Phase 5',
    'serverless edge AI enforcement', 'AI policy enforcement status',
  ],
  openGraph: {
    title: 'HIK Roadmap — From Manifesto to Production Infrastructure',
    description:
      'Phases 1–4 live. Every listed capability is implemented, tested, and demonstrable. Phase 5 serverless edge enforcement in active development.',
    url: 'https://humaniskind.com/roadmap',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'HIK Development Roadmap' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HIK Roadmap — Live AI Governance Infrastructure',
    description: 'Phases 1–4 live. Sacred Trace™, IPFS anchoring, KMIR kernel, live stream kill-switch — all in production. Phase 5 in development.',
    images: [OG_IMAGE],
  },
  alternates: { canonical: 'https://humaniskind.com/roadmap' },
};

const roadmapJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'HIK Architectural Roadmap — From Manifesto to Infrastructure',
  url: 'https://humaniskind.com/roadmap',
  image: OG_IMAGE,
  description: metadata.description,
  author: { '@type': 'Organization', name: 'Human Is Kind™', url: 'https://humaniskind.com' },
  about: [
    { '@type': 'Thing', name: 'Phase 1 — Sacred Trace™ Cryptographic Receipts (Live)' },
    { '@type': 'Thing', name: 'Phase 2 — IPFS Anchoring and EVM Integration (Live)' },
    { '@type': 'Thing', name: 'Phase 3 — KMIR Enforcement Kernel (Live)' },
    { '@type': 'Thing', name: 'Phase 4 — Edge Kill-Switch and Hardware Enclaves (Live)' },
    { '@type': 'Thing', name: 'Phase 5 — Serverless Edge Enforcement (In Development)' },
  ],
};

export default function RoadmapPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(roadmapJsonLd) }} />
      <Layout>
        <RoadmapPageClient />
      </Layout>
    </>
  );
}
