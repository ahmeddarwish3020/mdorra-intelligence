import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/typography/Eyebrow';
import { Reveal } from '@/components/motion/Reveal';
import { SectionCut } from '@/components/motion/SectionCut';

type Principle = {
  index: string;
  title: string;
  body: string;
};

export function StudioOverview() {
  const t = useTranslations('home.statement');
  const studio = useTranslations('studio');
  const principles = studio.raw('principles') as Principle[];

  return (
    <Section surface="dark" className="py-24 md:py-44">
      <Container>
        <SectionCut className="mb-24 md:mb-40" />
        <div className="grid grid-cols-4 gap-x-5 gap-y-16 md:grid-cols-12">
          <div className="col-span-4 md:col-span-6">
            <Reveal>
              <Eyebrow index={t('index')} className="text-inverse-muted">
                {t('eyebrow')}
              </Eyebrow>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="text-inverse-text mt-8 max-w-3xl font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.15] tracking-[-0.01em] text-balance">
                “{t('quote')}”
              </h2>
            </Reveal>
          </div>

          <div className="col-span-4 md:col-span-5 md:col-start-8">
            <Reveal delay={0.1}>
              <p className="text-inverse-muted text-base leading-[1.65] md:text-lg">{t('body')}</p>
            </Reveal>

            <div className="mt-12 flex items-center gap-4">
              <span className="bg-accent h-px w-16" aria-hidden="true" />
              <Reveal delay={0.14}>
                <p className="text-inverse-muted font-mono text-xs tracking-[0.15em] uppercase">
                  {t('signal')}
                </p>
              </Reveal>
            </div>

            <div className="border-inverse-muted/20 mt-16 border-t pt-8">
              <Reveal delay={0.12}>
                <p className="text-inverse-muted font-mono text-xs tracking-[0.15em] uppercase">
                  {studio('eyebrow')}
                </p>
              </Reveal>
              <ul className="mt-6 space-y-6">
                {principles.map((principle) => (
                  <li key={principle.index}>
                    <Reveal delay={0.02}>
                      <div className="flex items-baseline gap-5">
                        <span className="text-accent-inverse shrink-0 font-mono text-xs">
                          {principle.index}
                        </span>
                        <div>
                          <h3 className="text-inverse-text text-lg font-medium tracking-tight">
                            {principle.title}
                          </h3>
                          <p className="text-inverse-muted mt-1.5 max-w-md text-sm leading-[1.65]">
                            {principle.body}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
