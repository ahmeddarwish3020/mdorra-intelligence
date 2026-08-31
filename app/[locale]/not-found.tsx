import { getTranslations, setRequestLocale } from 'next-intl/server';

import { routing } from '@/i18n/routing';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/typography/Eyebrow';
import { CtaLink } from '@/components/global/CtaLink';

export default async function NotFound() {
  const locale = routing.defaultLocale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'NotFoundPage' });

  return (
    <Section surface="light" className="flex min-h-svh items-center pt-32 pb-32 md:pb-40">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>404</Eyebrow>

          <h1 className="mt-8 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98] font-medium tracking-[-0.02em]">
            {t('title')}
          </h1>

          <p className="text-text-secondary mt-8 max-w-xl text-base leading-[1.65] md:text-lg">
            {t('body')}
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
            <CtaLink href="/work" variant="solid" tone="light">
              {t('viewWork')}
            </CtaLink>
            <CtaLink href="/" variant="text" tone="light">
              {t('returnHome')}
            </CtaLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
