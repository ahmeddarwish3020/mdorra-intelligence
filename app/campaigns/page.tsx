import { Metadata } from 'next';
import { CampaignsClient } from './CampaignsClient';

export const metadata: Metadata = {
  title: 'Campaigns | MDORRA // INTELLIGENCE',
  description: 'Campaign performance and attribution tracking',
};

export const dynamic = 'force-dynamic';

export default function CampaignsPage() {
  return <CampaignsClient />;
}