import Layout from '@/components/Layout';
import ResearchPageClient from '@/views/ResearchPageClient';

const OG_IMAGE = 'https://humaniskind.com/opengraph-image.png';

export const metadata = {
  title: 'Redacciones & Research | HIK — Deterministic AI Governance',
  description:
    'Research publications, articles, and book publications on deterministic AI governance, cryptographic compliance infrastructure, and runtime enforcement.',
  keywords: [
    'AI governance research', 'Redacciones HIK', 'deterministic AI middleware paper', 'cryptographic compliance receipt',
    'EU AI Act compliance research', 'Kindle book AI governance', 'Zenodo AI governance',
  ],
  openGraph: {
    title: 'HIK Redacciones & Research — Publications & Books',
    description:
      'Peer-reviewed papers and book publications on deterministic AI governance infrastructure and cryptographic compliance.',
    url: 'https://humaniskind.com/redacciones',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'HIK Redacciones & Research' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HIK Redacciones & Research',
    description: 'Peer-reviewed research and books on cryptographic AI compliance and runtime enforcement.',
    images: [OG_IMAGE],
  },
  alternates: { canonical: 'https://humaniskind.com/redacciones' },
};

export default function RedaccionesPage() {
  return (
    <Layout>
      <ResearchPageClient />
    </Layout>
  );
}
