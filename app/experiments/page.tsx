import { Metadata } from 'next';
import { ExperimentsClient } from './ExperimentsClient';

export const metadata: Metadata = {
  title: 'Experiments | MDORRA // INTELLIGENCE',
  description: 'Experiment center for marketing testing and learning',
};

export const dynamic = 'force-dynamic';

export default function ExperimentsPage() {
  return <ExperimentsClient />;
}