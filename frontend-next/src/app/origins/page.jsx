import Layout from '@/components/Layout';
import OriginsPageClient from '@/views/OriginsPageClient';

const OG_IMAGE = 'https://humaniskind.com/opengraph-image.png';

export const metadata = {
  title: 'Origins | HIK — The Story Behind Human Is Kind™',
  description:
    'How 20 years of building telecom infrastructure, AI systems, and real-time content pipelines led to the founding question: how do we guarantee that what a system decides today remains true to its origin tomorrow? The story behind HIK and the Sacred Trace™.',
  keywords: [
    'Human Is Kind origins', 'HIK founding story', 'AI governance startup story',
    'AI accountability origin', 'Martín Riotorto', 'AI infrastructure founder',
    'AI governance mission', 'AI integrity infrastructure',
    'responsible AI startup', 'AI policy enforcement founding',
  ],
  openGraph: {
    title: 'HIK Origins — How Human Is Kind™ Was Built',
    description:
      'From two decades of systems that worked — and quietly betrayed the people they served — to the infrastructure for accountable AI. The founding story of HIK.',
    url: 'https://humaniskind.com/origins',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'HIK Origins' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HIK Origins — The Story Behind Human Is Kind™',
    description: 'Human Is Kind was not born in a boardroom. It was born from two decades of building systems — and watching them quietly betray the people they were supposed to serve.',
    images: [OG_IMAGE],
  },
  alternates: { canonical: 'https://humaniskind.com/origins' },
};

const originsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'HIK Origins — The Story Behind Human Is Kind™',
  url: 'https://humaniskind.com/origins',
  image: OG_IMAGE,
  description: metadata.description,
  author: [
    { '@type': 'Person', name: 'Martín Riotorto', jobTitle: 'Founder & Lead Architect', worksFor: { '@type': 'Organization', name: 'Human Is Kind™' } },
    { '@type': 'Person', name: 'Matías Mospan', jobTitle: 'Co-Founder & Platform Lead', worksFor: { '@type': 'Organization', name: 'Human Is Kind™' } },
  ],
  publisher: { '@type': 'Organization', name: 'Human Is Kind™', url: 'https://humaniskind.com' },
  about: { '@type': 'Thing', name: 'AI Governance Infrastructure Founding Story' },
};

export default function OriginsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(originsJsonLd) }} />
      <Layout>
        <OriginsPageClient />
      </Layout>
    </>
  );
}
