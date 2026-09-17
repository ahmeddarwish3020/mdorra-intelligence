import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/typography/Eyebrow';
import { Reveal } from '@/components/motion/Reveal';
import { SectionCut } from '@/components/motion/SectionCut';
import { IndexRow } from '@/components/layout/IndexRow';
import Image from 'next/image';

type ServiceItem = {
  index: string;
  title: string;
  description: string;
};

function isServiceItemArray(value: unknown): value is ServiceItem[] {
  return Array.isArray(value) && value.every(
    (item): item is ServiceItem =>
      typeof item === 'object' &&
      item !== null &&
      'index' in item && typeof (item as Record<string, unknown>).index === 'string' &&
      'title' in item && typeof (item as Record<string, unknown>).title === 'string' &&
      'description' in item && typeof (item as Record<string, unknown>).description === 'string'
  );
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/services'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });

  return createMetadata({
    title: t('title'),
    description: t('lead'),
    path: '/services',
    locale,
    openGraph: {
      images: [{ url: '/media/mdorra/inner-pages/03---SERVICES.jpg', width: 1920, height: 1080 }],
    },
  });
}

export default async function ServicesPage(props: PageProps<'/[locale]/services'>) {
  const { locale } = await props.params;

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'services' });
  const rawItems = t.raw('rows');
  const items = isServiceItemArray(rawItems) ? rawItems : [];

  return (
    <>
      <Section surface="dark" className="pt-28 pb-16 md:pt-44 md:pb-24 relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/mdorra/inner-pages/03---SERVICES.jpg"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        </div>

        <Container className="relative z-10">
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
          <SectionCut className="mb-24 md:mb-40" />
          <ul className="divide-border border-border divide-y border-y">
            {items.map((item) => (
              <li key={item.index}>
                <Reveal>
                  <IndexRow
                    index={item.index}
                    title={item.title}
                    description={item.description}
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