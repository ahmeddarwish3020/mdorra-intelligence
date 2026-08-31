import { useTranslations } from 'next-intl';
import type { Project } from '@/content/projects/schema';
import { Meta } from '@/components/typography/Meta';

type ProjectMetaProps = {
  project: Project;
  className?: string;
};

export function ProjectMeta({ project, className = '' }: ProjectMetaProps) {
  const t = useTranslations('project.labels');

  return (
    <Meta
      className={className}
      rows={[
        { label: t('client'), value: project.client },
        { label: t('clientType'), value: project.clientType },
        { label: t('location'), value: project.location },
        { label: t('year'), value: project.year?.toString() },
        { label: t('size'), value: project.size },
        { label: t('type'), value: project.type },
        { label: t('disciplines'), value: project.disciplines.join(', ') },
        { label: t('services'), value: project.services?.join(', ') },
        { label: t('scope'), value: project.scope, full: true },
      ]}
    />
  );
}
