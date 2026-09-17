import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/typography/Eyebrow';
import { Reveal } from '@/components/motion/Reveal';
import Image from 'next/image';

type ProcessStage = {
  index: string;
  title: string;
  description: string;
};

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/process'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'process' });

  return createMetadata({
    title: t('title'),
    description: t('lead'),
    path: '/process',
    locale,
    openGraph: {
      images: [{ url: '/media/mdorra/inner-pages/04-—-PROCESS.jpg', width: 1920, height: 1080 }],
    },
  });
}

export default async function ProcessPage(props: PageProps<'/[locale]/process'>) {
  const { locale } = await props.params;

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'process' });
  const rawSteps = t.raw('steps');
  const steps = Array.isArray(rawSteps) ? (rawSteps as ProcessStage[]) : [];

  return (
    <>
      <Section surface="dark" className="pt-28 pb-16 md:pt-44 md:pb-24 relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/mdorra/inner-pages/04-—-PROCESS.jpg"
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
          <ol className="divide-border border-border divide-y border-y">
            {steps.map((stage) => (
              <li key={stage.index}>
                <Reveal>
                  <div className="grid grid-cols-4 items-baseline gap-x-5 py-6 md:grid-cols-12">
                    <span className="text-accent col-span-1 font-mono text-xs">
                      {stage.index}
                    </span>
                    <h2 className="col-span-3 text-base font-medium tracking-tight md:col-span-4 md:text-lg">
                      {stage.title}
                    </h2>
                    <p className="text-text-secondary col-span-4 text-sm leading-relaxed md:col-span-7">
                      {stage.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  );
}