'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { CtaLink } from '@/components/global/CtaLink';
import { Reveal } from '@/components/motion/Reveal';
import { SceneFallback } from '@/components/three/SceneFallback';
import { siteConfig } from '@/lib/site';

export function Hero() {
  const t = useTranslations('home.hero');
  const common = useTranslations('common');
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-28 pb-10 md:pt-36"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src="/media/hero/pentahouse.png"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 100vw, 1280px"
        />
        <div className="from-background/70 via-background/30 to-background/10 absolute inset-0 bg-gradient-to-t" />
        <div className="from-background/60 absolute inset-0 bg-gradient-to-r via-transparent to-transparent" />
      </div>

      <Container className="relative z-10 flex-1">
        <div className="grid grid-cols-4 gap-x-5 gap-y-12 md:grid-cols-8 lg:grid-cols-12">
          <div className="col-span-4 lg:col-span-7 lg:col-start-1 xl:col-span-6">
            <Reveal>
              <p className="text-text-secondary font-mono text-xs tracking-[0.2em] uppercase md:text-sm">
                {t('index')}
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="text-foreground mt-6 font-mono text-sm font-medium tracking-[0.25em] uppercase">
                {siteConfig.name}
                <span className="text-accent">.</span>
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mt-7 max-w-2xl font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.98] font-medium tracking-[-0.02em] text-balance">
                {t('title')}
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="text-text-secondary mt-8 max-w-lg text-base leading-[1.7] md:text-lg text-balance">
                {t('statement')}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
                <CtaLink href="/work" variant="solid" tone="light">
                  {t('cta')}
                </CtaLink>
                <CtaLink href="/contact" variant="outline" tone="light">
                  {common('getInTouch')}
                </CtaLink>
              </div>
            </Reveal>
          </div>

          <div className="col-span-4 hidden lg:col-span-5 lg:col-start-9 lg:block xl:col-span-6">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-lg lg:h-[480px] lg:max-w-md">
              <SceneFallback />
            </div>
          </div>
        </div>
      </Container>

      <div className="border-border mt-12 border-t">
        <Container>
          <div className="text-text-secondary flex items-center justify-between py-4 font-mono text-[0.6875rem] tracking-[0.2em] uppercase">
            <span>{t('meta')}</span>
            <span className="hidden items-center gap-3 sm:flex">
              {t('scroll')}
              <span className="bg-accent h-8 w-px" aria-hidden="true" />
            </span>
          </div>
        </Container>
      </div>
    </section>
  );
}
