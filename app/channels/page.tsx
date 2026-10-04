import { Metadata } from 'next';
import { ChannelsClient } from './ChannelsClient';

export const metadata: Metadata = {
  title: 'Channels | MDORRA // INTELLIGENCE',
  description: 'Channel intelligence and performance monitoring',
};

export const dynamic = 'force-dynamic';

export default function ChannelsPage() {
  return <ChannelsClient />;
}