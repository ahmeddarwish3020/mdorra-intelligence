import type { Project } from '@/content/projects/schema';
import { Link } from '@/i18n/navigation';
import { ProjectImage } from '@/components/media/ProjectImage';
import { MaterialLight } from '@/components/media/MaterialLight';

type ProjectCardProps = {
  project: Project;
  ratio?: string;
  priority?: boolean;
  index?: string;
};

export function ProjectCard({ project, ratio = '4/5', priority, index }: ProjectCardProps) {
  const media = project.cover ?? project.hero?.media;
  const typeLabel = project.type ?? project.disciplines[0];
  const byline = [typeLabel, project.location, project.year].filter(Boolean).join(', ');

  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="bg-secondary shadow-board group-hover:shadow-board-lift relative overflow-hidden transition-shadow duration-500 ease-out">
        {media ? (
          <ProjectImage
            image={media}
            ratio={ratio}
            priority={priority}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="grayscale transition-transform duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
          />
        ) : (
          <div className="text-text-muted flex aspect-[4/5] items-center justify-center font-mono text-xs tracking-[0.2em] uppercase">
            {project.title}
          </div>
        )}
        <MaterialLight />
      </div>

      <div className="border-border mt-5 border-t pt-4">
        <p className="text-accent font-mono text-[0.6875rem] tracking-[0.2em] uppercase">
          {index ? `Project ${index}` : 'Project'} — {byline}
        </p>
        <h3 className="group-hover:text-accent-deep mt-2 text-lg font-medium tracking-tight transition-colors duration-300">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}
