'use client';

import { Reveal } from '@/components/motion/Reveal';
import { Link } from '@/i18n/navigation';
import { CtaLink } from '@/components/global/CtaLink';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/typography/Eyebrow';
import Image from 'next/image';

type ConceptProject = { slug: string; title: string; category: string; image: string; ratio: string };

const conceptProjects: ConceptProject[] = [
  { slug: 'al-mansour-villa', title: 'Mansour Courtyard Residence', category: 'Architecture', image: '/media/projects/al-mansour-villa/cover.jpg', ratio: '3/2' },
  { slug: 'al-nour-villa', title: 'Al Nour Private Villa', category: 'Architecture', image: '/media/projects/al-nour-villa/cover.jpg', ratio: '3/2' },
  { slug: 'horizon-office', title: 'Horizon Executive Office', category: 'Interior Design', image: '/media/projects/horizon-office/cover.jpg', ratio: '3/2' },
];

export function SelectedWorks() {
  return (
    <Section surface="dark" className="py-24 md:py-40">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal><Eyebrow index="02">SELECTED WORK</Eyebrow></Reveal>
            <Reveal delay={0.05}><h2 className="mt-6 text-[clamp(2rem,4vw,3.25rem)] leading-tight font-medium tracking-[-0.02em] text-inverse-text">Selected Work</h2></Reveal>
          </div>
          <Link href="/work" className="group text-inverse-text hover:text-accent-inverse inline-flex items-center gap-3 py-3 font-mono text-xs tracking-wider uppercase transition-colors">
            View All Work <span aria-hidden="true" className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <Reveal>
          <div className="mt-16 grid grid-cols-4 gap-x-5 gap-y-16 md:grid-cols-8 lg:grid-cols-12">
            {conceptProjects.map((project, i) => (
              <div key={project.slug} className="col-span-4 md:col-span-8 lg:col-span-4">
                <Link href={`/work/${project.slug}`} className="group block">
                  <div className="bg-secondary shadow-board group-hover:shadow-board-lift relative overflow-hidden transition-shadow duration-500 ease-out">
                    <div className="relative overflow-hidden" style={{ aspectRatio: project.ratio }}>
                      <Image src={project.image} alt={project.title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" priority={i === 0} />
                    </div>
                  </div>
                  <div className="border-border mt-5 border-t pt-4">
                    <p className="text-accent font-mono text-[0.6875rem] tracking-[0.2em] uppercase">{project.category}</p>
                    <h3 className="group-hover:text-accent-deep mt-2 text-lg font-medium tracking-tight transition-colors duration-300">{project.title}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="mt-12"><CtaLink href="/work" variant="outline" tone="dark">View All Work</CtaLink></div>
      </Container>
    </Section>
  );
}

export default SelectedWorks;
