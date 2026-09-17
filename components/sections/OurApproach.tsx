'use client';

import { Reveal } from '@/components/motion/Reveal';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/typography/Eyebrow';

export function OurApproach() {
  return (
    <Section surface="light" className="py-24 md:py-40">
      <Container>
        <div className="grid grid-cols-4 gap-x-5 gap-y-16 md:grid-cols-12">
          <div className="col-span-4 md:col-span-6">
            <Reveal>
              <Eyebrow index="04">OUR APPROACH</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.02em] text-foreground">
                WE DESIGN FOR THE WAY
                <span className="block mt-2">A SPACE IS EXPERIENCED.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-text-secondary mt-8 max-w-lg text-base leading-[1.7] md:text-lg">
                Our approach is rooted in the belief that architecture, interiors and exterior elements should speak the same visual language — creating spaces that feel deliberate, refined, and unmistakably ours.
              </p>
            </Reveal>

            <div className="mt-12 space-y-8">
              <Reveal delay={0.2}>
                <div className="flex items-start gap-4">
                  <span className="text-accent font-mono text-xs tracking-[0.15em] uppercase shrink-0 mt-1">01</span>
                  <div>
                    <h3 className="font-medium text-lg tracking-tight">PURPOSEFUL DESIGN</h3>
                    <p className="text-text-secondary mt-2 max-w-md text-sm leading-[1.65]">
                      Every decision begins with how the space should feel, function and flow.
                    </p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="flex items-start gap-4">
                  <span className="text-accent font-mono text-xs tracking-[0.15em] uppercase shrink-0 mt-1">02</span>
                  <div>
                    <h3 className="font-medium text-lg tracking-tight">ATTENTION TO DETAIL</h3>
                    <p className="text-text-secondary mt-2 max-w-md text-sm leading-[1.65]">
                      Materials, proportions, lighting and movement are considered as one system.
                    </p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="flex items-start gap-4">
                  <span className="text-accent font-mono text-xs tracking-[0.15em] uppercase shrink-0 mt-1">03</span>
                  <div>
                    <h3 className="font-medium text-lg tracking-tight">ONE COHESIVE VISION</h3>
                    <p className="text-text-secondary mt-2 max-w-md text-sm leading-[1.65]">
                      Architecture, interiors and exterior elements should speak the same visual language.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="col-span-4 md:col-span-5 md:col-start-8">
            <Reveal delay={0.08}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary">
                <video
                  src="/media/mdorra/interior-orbit-360.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                  aria-hidden="true"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default OurApproach;