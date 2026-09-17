'use client';

import { Reveal } from '@/components/motion/Reveal';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/typography/Eyebrow';
import Image from 'next/image';

type ProcessStep = {
  index: string;
  title: string;
  description: string;
};

const processSteps: ProcessStep[] = [
  {
    index: '01',
    title: 'BRIEF',
    description: 'Understanding the project and its needs.',
  },
  {
    index: '02',
    title: 'CONCEPT',
    description: 'Defining the design direction.',
  },
  {
    index: '03',
    title: 'DESIGN',
    description: 'Developing the architecture, interiors and visual details.',
  },
  {
    index: '04',
    title: 'DELIVERY',
    description: 'Refining the final design and preparing the project for execution.',
  },
];

export function Process() {
  return (
    <Section surface="secondary" className="py-24 md:py-40">
      <Container>
        <div className="grid grid-cols-4 gap-x-5 gap-y-16 md:grid-cols-12">
          <div className="col-span-4 md:col-span-6">
            <Reveal>
              <Eyebrow index="05">FROM IDEA TO SPACE</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.02em] text-inverse-text">
                FROM IDEA TO SPACE
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-text-secondary mt-8 max-w-lg text-base leading-[1.65] md:text-lg">
                A defined process — we take a brief, develop a concept, refine through design, and deliver with precision.
              </p>
            </Reveal>

            <div className="mt-12 space-y-8">
              {processSteps.map((step, index) => (
                <Reveal key={step.index} delay={index * 0.1}>
                  <div className="flex items-start gap-4">
                    <span className="text-accent font-mono text-xs tracking-[0.15em] uppercase shrink-0 mt-1">
                      {step.index}
                    </span>
                    <div>
                      <h3 className="font-medium text-lg tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-text-secondary mt-2 max-w-md text-sm leading-[1.65]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="col-span-4 md:col-span-5 md:col-start-8">
            <Reveal delay={0.08}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary">
                <Image
                  src="/media/mdorra/design-process.jpg"
                  alt="Design process"
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

export default Process;