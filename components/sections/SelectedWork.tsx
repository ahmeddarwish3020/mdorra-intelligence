import { useTranslations } from 'next-intl';
import type { Project } from '@/content/projects/schema';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/typography/Eyebrow';
import { Link } from '@/i18n/navigation';
import { ProjectCard } from '@/components/project/ProjectCard';
import { EmptyPlate } from '@/components/global/EmptyPlate';
import { SectionCut } from '@/components/motion/SectionCut';

type SelectedWorkProps = {
  projects: Project[];
};

export function SelectedWork({ projects }: SelectedWorkProps) {
  const t = useTranslations('home.work');
  const common = useTranslations('common');
  const visible = projects.slice(0, 3);
  const [lead, ...rest] = visible;

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <Section surface="light" className="py-24 md:py-40">
      <Container>
        <SectionCut className="mb-24 md:mb-40" />
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Eyebrow index={t('index')}>{t('eyebrow')}</Eyebrow>
            <h2 className="mt-6 text-[clamp(2rem,4vw,3.25rem)] leading-tight font-medium tracking-[-0.02em]">
              {t('title')}
            </h2>
          </div>
          <Link
            href="/work"
            className="group text-foreground hover:text-accent-deep inline-flex items-center gap-3 py-3 font-mono text-xs tracking-wider uppercase transition-colors"
          >
            {common('viewAllWork')}
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        {visible.length === 0 ? (
          <div className="mt-16">
            <EmptyPlate label={t('emptyLabel')} body={t('empty')} mark="—" />
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-4 gap-x-5 gap-y-16 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 lg:col-span-7">
              <ProjectCard project={lead} ratio="3/2" priority index={pad(1)} />
            </div>
            <div className="col-span-4 flex flex-col justify-between gap-16 md:col-span-8 md:flex-row md:gap-10 lg:col-span-5 lg:flex-col lg:pt-24">
              {rest.map((project, i) => (
                <div key={project.slug} className="w-full md:w-1/2 lg:w-full">
                  <ProjectCard project={project} ratio="4/5" index={pad(i + 2)} />
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
