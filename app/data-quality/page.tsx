import { Metadata } from 'next';
import { DataQualityClient } from './DataQualityClient';

export const metadata: Metadata = {
  title: 'Data Quality | MDORRA // INTELLIGENCE',
  description: 'Data quality monitoring and health checks',
};

export const dynamic = 'force-dynamic';

export default function DataQualityPage() {
  return <DataQualityClient />;
}