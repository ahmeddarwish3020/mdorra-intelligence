import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/typography/Eyebrow';
import { CtaLink } from '@/components/global/CtaLink';
import { Reveal } from '@/components/motion/Reveal';
import { SectionCut } from '@/components/motion/SectionCut';

export function FinalCta() {
  const t = useTranslations('home.cta');
  const common = useTranslations('common');

  return (
    <Section surface="dark" className="py-24 md:py-44">
      <Container>
        <SectionCut className="mb-24 md:mb-44" />
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow index={t('index')}>{t('eyebrow')}</Eyebrow>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="text-inverse-text mt-8 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98] font-medium tracking-[-0.02em]">
              {t('title')}
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-inverse-muted mt-8 max-w-xl text-base leading-[1.65] md:text-lg">
              {t('body')}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
              <CtaLink href="/contact" variant="solid" tone="dark">
                {t('primary')}
              </CtaLink>
              <CtaLink href="/work" variant="text" tone="dark">
                {t('secondary')}
              </CtaLink>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="text-inverse-muted mt-16 font-mono text-xs tracking-[0.2em] uppercase">
              {common('footer.tagline')}
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
