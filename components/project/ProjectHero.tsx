import { useTranslations } from 'next-intl';
import type { Project } from '@/content/projects/schema';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/typography/Eyebrow';
import { ProjectMeta } from '@/components/project/ProjectMeta';
import { ProjectImage } from '@/components/media/ProjectImage';
import { MaterialLight } from '@/components/media/MaterialLight';

type ProjectHeroProps = {
  project: Project;
};

export function ProjectHero({ project }: ProjectHeroProps) {
  const t = useTranslations('work');
  const label = project.type ?? t('title');
  const media = project.hero?.media ?? project.cover;
  const byline = [label, project.location, project.year].filter(Boolean).join(', ');

  return (
    <header>
      <Container className="pt-28 md:pt-40">
        <Eyebrow>
          {label} — <span className="text-accent-inverse">{byline}</span>
        </Eyebrow>
        <h1 className="text-inverse-text mt-6 max-w-4xl font-sans text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.98] font-medium tracking-[-0.02em]">
          {project.title}
        </h1>
        <ProjectMeta project={project} className="mt-12 max-w-xl" />
      </Container>

      {media ? (
        <div className="relative mt-14 w-full md:mt-16">
          <ProjectImage image={media} ratio="16/9" priority sizes="100vw" className="w-full" />
          <MaterialLight radius={480} />
        </div>
      ) : (
        <div className="border-border-inverse bg-dark-secondary mt-14 flex aspect-[16/9] w-full items-center justify-center border md:mt-16">
          <span className="text-inverse-muted px-8 text-center font-mono text-xs tracking-[0.2em] uppercase">
            {project.title}
          </span>
        </div>
      )}
    </header>
  );
}
