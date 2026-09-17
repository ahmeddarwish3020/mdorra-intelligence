'use client';

import { Reveal } from '@/components/motion/Reveal';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/typography/Eyebrow';
import Image from 'next/image';

type ServiceItem = {
  index: string;
  title: string;
  description: string;
};

const services: ServiceItem[] = [
  { index: '01', title: 'INTERIOR DESIGN', description: 'Concept development, spatial planning, material selection, and bespoke joinery — designed to feel intentional from every angle.' },
  { index: '02', title: 'EXTERIOR DESIGN', description: 'Façade articulation, material expression, and landscape integration — creating buildings that command their context.' },
  { index: '03', title: 'ARCHITECTURAL DESIGN', description: 'Full-scope architecture — from massing and plan to detail and specification, resolved with precision and craft.' },
  { index: '04', title: '3D VISUALIZATION', description: 'Photorealistic renders and immersive walkthroughs that translate design decisions into tangible experiences before construction.' },
];

export function Services() {
  return (
    <Section surface="light" className="py-24 md:py-40">
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <Reveal><Eyebrow index="03">WHAT WE DO</Eyebrow></Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 text-[clamp(2rem,4vw,3.25rem)] leading-tight font-medium tracking-[-0.02em]">WHAT WE DO</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-text-secondary mt-8 max-w-xl text-base leading-[1.65] md:text-lg">
                From architecture to interiors and exterior environments, MDORRA brings every layer of a space into one cohesive design vision.
              </p>
            </Reveal>
            <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-2">
              {services.map((service, index) => (
                <Reveal key={service.index} delay={index * 0.1}>
                  <div className="border-border border-l-2 pl-6">
                    <span className="text-accent font-mono text-xs tracking-[0.15em] uppercase">{service.index}</span>
                    <h3 className="mt-2 text-lg font-medium tracking-tight">{service.title}</h3>
                    <p className="text-text-secondary mt-2 text-sm leading-[1.65]">{service.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.12} className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-secondary">
              <Image
                src="/media/mdorra/inner-pages/03-—-SERVICES.jpg"
                alt="MDORRA services — architecture and interiors"
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export default Services;
