import { useTranslations } from 'next-intl';
import type { Material } from '@/content/projects/schema';

type ProjectMaterialsProps = {
  materials: Material[];
};

export function ProjectMaterials({ materials }: ProjectMaterialsProps) {
  const t = useTranslations('project.sections');

  return (
    <div>
      <h2 className="eyebrow text-inverse-muted">{t('materials')}</h2>
      <ul className="divide-border-inverse border-border-inverse mt-8 divide-y border-y">
        {materials.map((material) => (
          <li
            key={material.name}
            className="flex flex-col gap-1 py-4 md:flex-row md:items-baseline md:justify-between md:gap-8"
          >
            <span className="text-inverse-text font-mono text-sm">{material.name}</span>
            {material.description && (
              <span className="text-inverse-muted text-sm">{material.description}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
