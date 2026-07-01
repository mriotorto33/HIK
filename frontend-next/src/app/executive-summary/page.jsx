import Layout from '@/components/Layout';
import ExecutiveSummaryPageClient from '@/views/ExecutiveSummaryPageClient';

const OG_IMAGE = 'https://humaniskind.com/opengraph-image.png';

export const metadata = {
  title: 'Executive Summary | HIK — AI Governance for Investors & Enterprise',
  description:
    'HIK Executive Summary: the AI accountability gap, our deterministic enforcement solution, regulatory timing (EU AI Act 2026), market opportunity, and why HIK is the only platform that issues cryptographic proof of policy compliance at the moment of every AI decision.',
  keywords: [
    'AI governance investment', 'AI compliance startup', 'EU AI Act 2026 enforcement',
    'enterprise AI accountability', 'AI governance market', 'AI policy platform',
    'HIK investor summary', 'AI regulation compliance tool', 'LLM governance infrastructure',
    'AI audit infrastructure', 'Sacred Trace', 'AI compliance receipt',
  ],
  openGraph: {
    title: 'HIK Executive Summary — AI Governance for Boards & Investors',
    description:
      'The business case for HIK: regulatory pressure with hard deadlines, market timing, demonstrated live enforcement, and a team that built it from first principles. Request the pitch deck.',
    url: 'https://humaniskind.com/executive-summary',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'HIK Executive Summary' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HIK Executive Summary — AI Governance for Boards & Investors',
    description: 'The business case for deterministic AI governance. Regulatory deadlines, live enforcement, cryptographic proof. Contact HIK.',
    images: [OG_IMAGE],
  },
  alternates: { canonical: 'https://humaniskind.com/executive-summary' },
};

const execJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'HIK Executive Summary — AI Governance Infrastructure',
  url: 'https://humaniskind.com/executive-summary',
  image: OG_IMAGE,
  description: metadata.description,
  author: { '@type': 'Organization', name: 'Human Is Kind™', url: 'https://humaniskind.com' },
  audience: {
    '@type': 'Audience',
    audienceType: 'Investors, Board Members, Enterprise Executives, Chief Compliance Officers, General Counsel',
  },
  about: {
    '@type': 'Thing',
    name: 'AI Governance Infrastructure Investment Opportunity',
    description: 'HIK is a pre-seed AI governance startup building deterministic policy enforcement middleware for enterprise AI deployments in regulated industries.',
  },
};

export default function ExecutiveSummaryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(execJsonLd) }} />
      <Layout>
        <ExecutiveSummaryPageClient />
      </Layout>
    </>
  );
}
