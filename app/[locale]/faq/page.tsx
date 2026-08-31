import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/typography/Eyebrow';
import { Reveal } from '@/components/motion/Reveal';

type FAQItem = {
  q: string;
  a: string;
};

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/faq'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });

  return createMetadata({
    title: t('title'),
    description: t('lead'),
    path: '/faq',
    locale,
  });
}

export default async function FAQPage(props: PageProps<'/[locale]/faq'>) {
  const { locale } = await props.params;

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'faq' });
  const items = t.raw('items') as FAQItem[];

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
          <dl className="divide-border border-border divide-y border-y">
            {items.map((item, index) => (
              <Reveal key={index} delay={index * 0.05}>
                <div className="py-8 md:py-12">
                  <dt className="font-serif text-[clamp(1.25rem,2.5vw,1.5rem)] leading-[1.3] font-medium">
                    {item.q}
                  </dt>
                  <dd className="text-text-secondary mt-4 max-w-2xl text-base leading-[1.7] md:text-lg">
                    {item.a}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>
    </>
  );
}