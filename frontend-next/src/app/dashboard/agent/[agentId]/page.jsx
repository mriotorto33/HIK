export const dynamic = 'force-dynamic';

import AgentDetailClient from '@/views/AgentDetailClient';

export const metadata = {
  title: 'Agent Profile | HIK',
  description: 'Forensic agent profile — violation timeline, risk score, and top violated KMIR rules.',
  robots: { index: false, follow: false },
};

export default function AgentDetailPage() {
  return <AgentDetailClient />;
}
