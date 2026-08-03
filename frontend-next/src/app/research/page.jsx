import Layout from '@/components/Layout';
import ResearchPageClient from '@/views/ResearchPageClient';

const OG_IMAGE = 'https://humaniskind.com/opengraph-image.png';

export const metadata = {
  title: 'Research & Publications | HIK — Deterministic AI Governance',
  description:
    'Peer-reviewed research by the HIK team on deterministic AI governance, cryptographic compliance infrastructure, and runtime enforcement as a precondition for SEC approval of tokenized financial instruments. Published on Zenodo under CC BY 4.0.',
  keywords: [
    'AI governance research', 'deterministic AI middleware paper', 'cryptographic compliance receipt',
    'EU AI Act compliance research', 'SEC tokenized ETF runtime enforcement', 'blockchain AI compliance',
    'NYC Local Law 144 research', 'GDPR Article 22 AI', 'Zero Trust AI governance',
    'Sacred Trace cryptographic audit', 'HIK research publications', 'Zenodo AI governance',
    'LLM policy enforcement paper', 'dual-gate AI architecture', 'Human Is Kind research',
  ],
  openGraph: {
    title: 'HIK Research & Publications — Deterministic AI Governance',
    description:
      'Three peer-reviewed papers on deterministic AI governance infrastructure, regulatory compliance, and runtime enforcement for tokenized ETFs. Published on Zenodo under CC BY 4.0.',
    url: 'https://humaniskind.com/research',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'HIK Research & Publications' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HIK Research — Deterministic AI Governance Papers',
    description: 'Peer-reviewed research on cryptographic AI compliance, EU AI Act enforcement, and SEC-ready tokenized ETF infrastructure.',
    images: [OG_IMAGE],
  },
  alternates: { canonical: 'https://humaniskind.com/research' },
};

const researchJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'HIK Research & Publications',
  url: 'https://humaniskind.com/research',
  description: metadata.description,
  image: OG_IMAGE,
  publisher: { '@type': 'Organization', name: 'Human Is Kind™', url: 'https://humaniskind.com' },
  hasPart: [
    {
      '@type': 'ScholarlyArticle',
      name: 'Paper 1: HIK Architecture — Deterministic AI Governance Infrastructure',
      url: 'https://doi.org/10.5281/zenodo.21710655',
      identifier: 'https://doi.org/10.5281/zenodo.21710655',
      author: { '@type': 'Person', name: 'Martín Riotorto' },
      publisher: { '@type': 'Organization', name: 'Zenodo' },
      datePublished: '2026-07-30',
      license: 'https://creativecommons.org/licenses/by/4.0/',
      about: 'HIK SDK architecture, Zero Trust AI middleware, Fail-Close policy enforcement, C2PA 2.3 integration',
    },
    {
      '@type': 'ScholarlyArticle',
      name: 'A Deterministic Infrastructure Approach to AI Governance and Regulatory Compliance',
      url: 'https://doi.org/10.5281/zenodo.21710775',
      identifier: 'https://doi.org/10.5281/zenodo.21710775',
      author: { '@type': 'Person', name: 'Martín Riotorto' },
      publisher: { '@type': 'Organization', name: 'Zenodo' },
      datePublished: '2026-07-31',
      license: 'https://creativecommons.org/licenses/by/4.0/',
      about: 'EU AI Act, NYC Local Law 144, GDPR Article 22, dual-gate enforcement, cryptographic compliance receipts',
    },
    {
      '@type': 'ScholarlyArticle',
      name: 'Runtime Enforcement as a Precondition for SEC Approval of a Tokenized ETF',
      url: 'https://doi.org/10.5281/zenodo.21710856',
      identifier: 'https://doi.org/10.5281/zenodo.21710856',
      author: { '@type': 'Person', name: 'Martín Riotorto' },
      publisher: { '@type': 'Organization', name: 'Zenodo' },
      datePublished: '2026-07-31',
      license: 'https://creativecommons.org/licenses/by/4.0/',
      about: 'Tokenized ETF, SEC approval, runtime enforcement, blockchain finance, digital asset regulation',
    },
  ],
};

export default function ResearchPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(researchJsonLd) }} />
      <Layout>
        <ResearchPageClient />
      </Layout>
    </>
  );
}
