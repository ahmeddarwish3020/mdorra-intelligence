import { Metadata } from 'next';
import { SettingsClient } from './SettingsClient';

export const metadata: Metadata = {
  title: 'Settings | MDORRA // INTELLIGENCE',
  description: 'Application settings and configuration',
};

export const dynamic = 'force-dynamic';

export default function SettingsPage() {
  return <SettingsClient />;
}