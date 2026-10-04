import { Metadata } from 'next';
import { WebsiteClient } from './WebsiteClient';

export const metadata: Metadata = {
  title: 'Website | MDORRA // INTELLIGENCE',
  description: 'Website analytics and conversion intelligence',
};

export const dynamic = 'force-dynamic';

export default function WebsitePage() {
  return <WebsiteClient />;
}