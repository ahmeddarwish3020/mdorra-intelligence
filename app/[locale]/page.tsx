import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site';
import { getPublishedProjects } from '@/lib/content';
import { Hero } from '@/components/sections/Hero';
import { StudioOverview } from '@/components/sections/StudioOverview';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { Services } from '@/components/sections/Services';
import { Transformation } from '@/components/sections/Transformation';
import { FinalCta } from '@/components/sections/FinalCta';

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.hero' });

  return createMetadata({
    title: `${siteConfig.name} — Architecture & Interiors`,
    description: t('statement'),
    path: '/',
    locale,
  });
}

export default async function HomePage(props: PageProps<'/[locale]'>) {
  const { locale } = await props.params;

  setRequestLocale(locale);

  const projects = getPublishedProjects();

  return (
    <>
      <Hero />
      <StudioOverview />
      <SelectedWork projects={projects} />
      <Services />
      <Transformation />
      <FinalCta />
    </>
  );
}
