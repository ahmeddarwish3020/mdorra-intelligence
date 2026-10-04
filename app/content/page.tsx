import { Metadata } from 'next';
import { ContentClient } from './ContentClient';

export const metadata: Metadata = {
  title: 'Content | MDORRA // INTELLIGENCE',
  description: 'Content intelligence and performance analysis',
};

export const dynamic = 'force-dynamic';

export default function ContentPage() {
  return <ContentClient />;
}