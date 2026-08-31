import { useTranslations } from 'next-intl';
import type { Project } from '@/content/projects/schema';

type ProjectSummaryProps = {
  project: Project;
};

export function ProjectSummary({ project }: ProjectSummaryProps) {
  const t = useTranslations('project.sections');

  const blocks = [
    { label: t('summary'), text: project.summary },
    { label: t('overview'), text: project.overview },
    { label: t('approach'), text: project.designApproach },
  ].filter((block) => Boolean(block.text));

  if (blocks.length === 0) {
    return null;
  }

  return (
    <div className="max-w-2xl space-y-14">
      {blocks.map((block) => (
        <div key={block.label}>
          <h2 className="eyebrow text-inverse-muted">{block.label}</h2>
          <p className="text-inverse-text mt-8 text-lg leading-relaxed md:text-xl">{block.text}</p>
        </div>
      ))}
    </div>
  );
}
