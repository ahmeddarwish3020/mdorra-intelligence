'use client';

import { Reveal } from '@/components/motion/Reveal';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/typography/Eyebrow';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export function About() {
  return (
    <Section surface="light" className="py-24 md:py-40">
      <Container>
        <div className="grid grid-cols-4 gap-x-5 gap-y-16 md:grid-cols-12">
          <div className="col-span-4 md:col-span-6">
            <Reveal>
              <Eyebrow index="04">ABOUT MDORRA</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.02em] text-foreground">
                DESIGNING SPACES
                <span className="block mt-2">WITH PURPOSE.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-text-secondary mt-8 max-w-lg text-base leading-[1.7] md:text-lg">
                MDORRA brings architecture, interiors and exterior design together through one clear visual language — balancing character, function and detail from the first idea to the final space.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <Link
                href="/studio"
                className="group text-foreground hover:text-accent-deep inline-flex items-center gap-3 py-3 font-mono text-xs tracking-wider uppercase transition-colors duration-300"
              >
                ABOUT THE STUDIO
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Reveal>
          </div>

          <div className="col-span-4 md:col-span-5 md:col-start-8">
            <Reveal delay={0.08}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary">
                <Image
                  src="/media/mdorra/architect-studio.jpg"
                  alt="MDORRA Studio"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default About;