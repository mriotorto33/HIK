export const dynamic = 'force-dynamic';

import DashboardClient from '@/views/DashboardClient';

export const metadata = {
  title: 'Core Governance Console | HIK',
  description: 'Real-time AI governance dashboard. Monitor policy enforcement events, KMIR violations, on-chain anchors, and agent risk scores.',
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <DashboardClient />;
}

