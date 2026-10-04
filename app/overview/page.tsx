import { Metadata } from 'next';
import { OverviewClient } from './OverviewClient';

export const metadata: Metadata = {
  title: 'Overview | MDORRA // INTELLIGENCE',
  description: 'Executive command center for marketing intelligence',
};

export const dynamic = 'force-dynamic';

export default function OverviewPage() {
  return <OverviewClient />;
}