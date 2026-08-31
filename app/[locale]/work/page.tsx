import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import { getPublishedProjects } from '@/lib/content';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/typography/Eyebrow';
import { EmptyPlate } from '@/components/global/EmptyPlate';
import { ProjectIndex } from '@/components/project/ProjectIndex';

export async function generateMetadata({ params }: PageProps<'/[locale]/work'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'work' });

  return createMetadata({
    title: t('title'),
    description: t('lead'),
    path: '/work',
    locale,
  });
}

export default async function WorkPage(props: PageProps<'/[locale]/work'>) {
  const { locale } = await props.params;

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'work' });
  const projects = getPublishedProjects();

  return (
    <>
      <Section surface="light" className="pt-28 pb-10 md:pt-44 md:pb-16">
        <Container>
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h1 className="mt-6 text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.98] font-medium tracking-[-0.02em]">
            {t('title')}
          </h1>
          <p className="text-text-secondary mt-8 max-w-xl text-base leading-[1.65] md:text-lg">
            {t('lead')}
          </p>
        </Container>
      </Section>

      {projects.length === 0 ? (
        <Section surface="light" className="border-border border-t pt-16 pb-32 md:pt-24">
          <Container>
            <EmptyPlate label={t('emptyLabel')} body={t('empty')} mark="—" />
          </Container>
        </Section>
      ) : (
        <ProjectIndex projects={projects} />
      )}
    </>
  );
}
