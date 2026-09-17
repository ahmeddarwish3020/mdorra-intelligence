import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site';
import { Hero } from '@/components/sections/Hero';
import { SelectedWorks } from '@/components/sections/SelectedWorks';
import { Services } from '@/components/sections/Services';
import { OurApproach } from '@/components/sections/OurApproach';
import { Process } from '@/components/sections/Process';
import { About } from '@/components/sections/About';
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

  return (
    <>
      <Hero />
      <SelectedWorks />
      <Services />
      <OurApproach />
      <Process />
      <About />
      <FinalCta />
    </>
  );
}