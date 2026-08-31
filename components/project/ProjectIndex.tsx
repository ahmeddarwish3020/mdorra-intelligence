import type { Project } from '@/content/projects/schema';
import { Container } from '@/components/layout/Container';
import { ProjectCard } from '@/components/project/ProjectCard';

type ProjectIndexProps = {
  projects: Project[];
};

// Editorial index rhythm: asymmetric column spans with a staggered top
// offset per row, alternating crop treatment. No uniform grid-of-squares.
const layouts = [
  { span: 'lg:col-span-7', ratio: '3/2', offset: 'lg:mt-0' },
  { span: 'lg:col-span-5', ratio: '4/5', offset: 'lg:mt-32' },
  { span: 'lg:col-span-5', ratio: '4/5', offset: 'lg:mt-16' },
  { span: 'lg:col-span-7', ratio: '3/2', offset: 'lg:mt-0' },
] as const;

export function ProjectIndex({ projects }: ProjectIndexProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <Container className="py-16 md:py-24">
      <ul className="grid grid-cols-4 gap-x-5 gap-y-16 md:grid-cols-8 md:gap-y-20 lg:grid-cols-12 lg:gap-y-28">
        {projects.map((project, index) => {
          const layout = layouts[index % layouts.length];

          return (
            <li
              key={project.slug}
              className={`col-span-4 md:col-span-8 lg:col-span-12 ${layout.offset}`}
            >
              <div className={`${layout.span} w-full`}>
                <ProjectCard
                  project={project}
                  priority={index === 0}
                  ratio={layout.ratio}
                  index={String(index + 1).padStart(2, '0')}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
