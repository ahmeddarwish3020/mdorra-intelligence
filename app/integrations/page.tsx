import { Metadata } from 'next';
import { IntegrationsClient } from './IntegrationsClient';

export const metadata: Metadata = {
  title: 'Integrations | MDORRA // INTELLIGENCE',
  description: 'Integration control center for marketing data sources',
};

export default function IntegrationsPage() {
  return <IntegrationsClient />;
}