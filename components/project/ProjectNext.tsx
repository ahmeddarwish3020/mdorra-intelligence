import { useTranslations } from 'next-intl';
import type { Project } from '@/content/projects/schema';
import { Link } from '@/i18n/navigation';
import { ProjectImage } from '@/components/media/ProjectImage';

type ProjectNextProps = {
  project: Project;
};

export function ProjectNext({ project }: ProjectNextProps) {
  const t = useTranslations('project');
  const common = useTranslations('common');
  const media = project.cover ?? project.hero?.media;

  return (
    <div className="border-border-inverse border-t pt-10">
      <p className="text-accent-inverse font-mono text-xs tracking-wider uppercase">{t('next')}</p>

      <Link href={`/work/${project.slug}`} className="group mt-8 block">
        {media ? (
          <div className="overflow-hidden">
            <ProjectImage
              image={media}
              ratio="16/9"
              sizes="(min-width: 1024px) 90vw, 100vw"
              className="grayscale transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:grayscale-0"
            />
          </div>
        ) : (
          <div className="border-border-inverse bg-dark-secondary flex aspect-[16/9] items-center justify-center border">
            <span className="text-inverse-muted px-8 text-center font-mono text-xs tracking-[0.2em] uppercase">
              {project.title}
            </span>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="text-inverse-text group-hover:text-accent-inverse text-[clamp(1.75rem,4vw,3rem)] leading-none font-medium tracking-[-0.02em] transition-colors duration-300">
              {project.title}
            </h2>
            <p className="text-inverse-muted mt-3 font-mono text-xs tracking-[0.15em] uppercase">
              {[project.year, project.location].filter(Boolean).join(' — ')}
            </p>
          </div>
          <span className="text-inverse-text group-hover:text-accent-inverse inline-flex items-center gap-3 font-mono text-xs tracking-wider uppercase transition-colors duration-300">
            {common('viewProject')}
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </div>
  );
}
