'use client';

import { Reveal } from '@/components/motion/Reveal';
import { CtaLink } from '@/components/global/CtaLink';
import { Container } from '@/components/layout/Container';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <video
          src="/media/mdorra/hero-villa.mp4"
          poster="/media/mdorra/hero-villa.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
      </div>

      <Container className="relative z-10 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-4 gap-x-5 gap-y-12 md:grid-cols-8 lg:grid-cols-12">
          <div className="col-span-4 lg:col-span-7 lg:col-start-1 xl:col-span-6">
            <Reveal>
              <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] font-medium tracking-[-0.02em] text-foreground">
                SPACES DESIGNED
                <span className="block mt-2 text-accent">WITH INTENTION.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="text-foreground mt-8 max-w-xl text-[clamp(1rem,1.5vw,1.25rem)] leading-[1.7] md:text-lg">
                MDORRA creates refined architectural, interior and exterior spaces through a clear, detail-driven design approach.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
                <CtaLink href="/work" variant="solid" tone="light">
                  EXPLORE OUR WORK
                </CtaLink>
                <CtaLink href="/contact" variant="outline" tone="light">
                  START A PROJECT
                </CtaLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>

      <div className="border-border absolute bottom-8 left-8 md:bottom-12 md:left-12 z-20">
        <div className="flex items-center gap-3">
          <span className="bg-accent h-8 w-px" aria-hidden="true" />
          <span className="font-mono text-[0.625rem] tracking-[0.2em] uppercase text-text-secondary">
            SCROLL
          </span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
