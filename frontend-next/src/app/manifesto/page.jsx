import Layout from '@/components/Layout';
import ManifestoPageClient from '@/views/ManifestoPageClient';

const OG_IMAGE = 'https://humaniskind.com/opengraph-image.png';

export const metadata = {
  title: 'Manifesto | HIK — Principles for Deterministic AI Governance',
  description:
    'The Human Is Kind™ Manifesto: why AI governance must be deterministic, not aspirational. We enforce policy at the infrastructure level — cryptographic, immutable, and impossible to lobby away. Read the founding principles behind HIK.',
  keywords: [
    'AI governance manifesto', 'AI ethics principles', 'deterministic AI governance',
    'AI accountability manifesto', 'AI policy enforcement principles',
    'Human Is Kind manifesto', 'AI infrastructure ethics', 'responsible AI governance',
    'AI compliance infrastructure', 'AI governance startup principles',
  ],
  openGraph: {
    title: 'HIK Manifesto — Principles for Deterministic AI Governance',
    description:
      'We will never claim a capability we cannot demonstrate. Every published capability is implemented, tested, and live. Read the founding principles of Human Is Kind™.',
    url: 'https://humaniskind.com/manifesto',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'HIK Manifesto' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HIK Manifesto — Principles for Deterministic AI Governance',
    description: 'While others build layers to help machines understand humans, we build layers to help humans trust machines.',
    images: [OG_IMAGE],
  },
  alternates: { canonical: 'https://humaniskind.com/manifesto' },
};

const manifestoJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Human Is Kind™ Manifesto — Principles for Deterministic AI Governance',
  url: 'https://humaniskind.com/manifesto',
  image: OG_IMAGE,
  description: metadata.description,
  author: { '@type': 'Organization', name: 'Human Is Kind™', url: 'https://humaniskind.com' },
  publisher: { '@type': 'Organization', name: 'Human Is Kind™', url: 'https://humaniskind.com' },
  about: { '@type': 'Thing', name: 'AI Governance Principles and Policy Enforcement Ethics' },
  keywords: metadata.keywords.join(', '),
};

export default function ManifestoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(manifestoJsonLd) }} />
      <Layout>
        <ManifestoPageClient />
      </Layout>
    </>
  );
}
