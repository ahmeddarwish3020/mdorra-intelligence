import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/typography/Eyebrow';
import { Reveal } from '@/components/motion/Reveal';
import Image from 'next/image';

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
    openGraph: {
      images: [{ url: '/media/mdorra/inner-pages/02-—-STUDIO.jpg', width: 1920, height: 1080 }],
    },
  });
}

export default async function StudioPage(props: PageProps<'/[locale]/studio'>) {
  const { locale } = await props.params;

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'studio' });
  const rawPrinciples = t.raw('principles');
  const principles = Array.isArray(rawPrinciples) ? (rawPrinciples as Array<{ index: string; title: string; body: string }>) : [];

  return (
    <>
      <Section surface="dark" className="pt-28 pb-16 md:pt-44 md:pb-24 relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/mdorra/inner-pages/02-—-STUDIO.jpg"
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
            {t('body')}
          </p>
        </Container>
      </Section>

      <Section surface="light" className="py-24 md:py-40">
        <Container>
          <Reveal>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.02em] text-foreground">
              MDORRA APPROACH
            </h2>
            <p className="text-text-secondary mt-8 max-w-3xl text-base leading-[1.7] md:text-lg">
              {t('body')}
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {principles.map((principle) => (
              <Reveal key={principle.index} delay={0.1}>
                <div className="border-border border-l-2 pl-6">
                  <span className="text-accent font-mono text-xs tracking-[0.15em] uppercase">
                    {principle.index}
                  </span>
                  <h3 className="mt-2 text-xl font-medium tracking-tight">
                    {principle.title}
                  </h3>
                  <p className="text-text-secondary mt-3 max-w-md text-base leading-[1.65]">
                    {principle.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="dark" className="py-24 md:py-40">
        <Container>
          <Reveal>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.02em] text-inverse-text">
              DESIGN LANGUAGE
            </h2>
            <p className="text-inverse-muted mt-8 max-w-2xl text-base leading-[1.65] md:text-lg">
              Our design language is built on the interplay of architecture, interiors, and exterior environments — each project a cohesive expression of materiality, proportion, and light.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Architecture', desc: 'Massing, proportion, and spatial logic that respond to site and program.' },
              { title: 'Interiors', desc: 'Material palettes, joinery, and lighting that shape lived experience.' },
              { title: 'Exteriors', desc: 'Facade articulation, landscape integration, and environmental response.' },
              { title: 'Materiality', desc: 'Honest materials, honest details — stone, timber, metal, glass.' },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.1}>
                <div className="border-border-inverse border-l-2 pl-6">
                  <h3 className="text-inverse-text text-lg font-medium tracking-tight">{item.title}</h3>
                  <p className="text-inverse-muted mt-2 text-sm leading-[1.65]">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}