import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/typography/Eyebrow';
import { Reveal } from '@/components/motion/Reveal';
import { BeforeAfter } from '@/components/media/BeforeAfter';
import { EmptyPlate } from '@/components/global/EmptyPlate';
import { getPublishedProjects } from '@/lib/content';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/before-after'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'beforeAfter' });

  return createMetadata({
    title: t('title'),
    description: t('lead'),
    path: '/before-after',
    locale,
  });
}

export default async function BeforeAfterPage(props: PageProps<'/[locale]/before-after'>) {
  const { locale } = await props.params;

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'beforeAfter' });
  const projects = getPublishedProjects();
  const beforeAfter = projects.find((project) => project.beforeAfter)?.beforeAfter;

  return (
    <>
      <Section surface="dark" className="pt-28 pb-16 md:pt-44 md:pb-24">
        <Container>
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h1 className="text-inverse-text mt-6 max-w-4xl text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.98] font-medium tracking-[-0.02em]">
            {t('title')}
          </h1>
          <p className="text-inverse-muted mt-8 max-w-xl text-base leading-[1.65] md:text-lg">
            {t('lead')}
          </p>
        </Container>
      </Section>

      <Section surface="light" className="py-24 md:py-40">
        <Container>
          <Reveal>
            {beforeAfter ? (
              <BeforeAfter pair={beforeAfter} />
            ) : (
              <EmptyPlate
                variant="dark"
                label={t('emptyLabel')}
                body={t('empty')}
                mark="—"
              />
            )}
          </Reveal>
        </Container>
      </Section>
    </>
  );
}