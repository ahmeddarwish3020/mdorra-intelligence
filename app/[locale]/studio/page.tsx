import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/typography/Eyebrow';
import { Reveal } from '@/components/motion/Reveal';
import { IndexRow } from '@/components/layout/IndexRow';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/studio'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'studio' });

  return createMetadata({
    title: t('title'),
    description: t('body'),
    path: '/studio',
    locale,
  });
}

export default async function StudioPage(props: PageProps<'/[locale]/studio'>) {
  const { locale } = await props.params;

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'studio' });
  const principles = t.raw('principles') as Array<{ index: string; title: string; body: string }>;

  return (
    <>
      <Section surface="dark" className="pt-28 pb-16 md:pt-44 md:pb-24">
        <Container>
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h1 className="text-inverse-text mt-6 max-w-4xl text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.98] font-medium tracking-[-0.02em]">
            {t('title')}
          </h1>
          <p className="text-inverse-muted mt-8 max-w-xl text-base leading-[1.65] md:text-lg">
            {t('body')}
          </p>
        </Container>
      </Section>

      <Section surface="light" className="py-24 md:py-40">
        <Container>
          <ul className="divide-border border-border divide-y border-y">
            {principles.map((principle) => (
              <li key={principle.index}>
                <Reveal>
                  <IndexRow
                    index={principle.index}
                    title={principle.title}
                    description={principle.body}
                    headingLevel={2}
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}