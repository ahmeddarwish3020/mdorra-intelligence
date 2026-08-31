import { useTranslations } from 'next-intl';
import type { ProcessStage } from '@/content/projects/schema';

type ProjectProcessProps = {
  stages: ProcessStage[];
};

export function ProjectProcess({ stages }: ProjectProcessProps) {
  const t = useTranslations('project.sections');

  return (
    <div>
      <h2 className="eyebrow text-inverse-muted">{t('process')}</h2>
      <ol className="mt-8">
        {stages.map((stage, index) => (
          <li
            key={stage.title}
            className="border-border-inverse grid grid-cols-4 gap-x-5 gap-y-2 border-t py-6 md:grid-cols-12"
          >
            <span className="text-accent-inverse col-span-1 font-mono text-xs">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-inverse-text col-span-3 text-base font-medium md:col-span-4 md:text-lg">
              {stage.title}
            </h3>
            {stage.description && (
              <p className="text-inverse-muted col-span-4 text-sm leading-relaxed md:col-span-7">
                {stage.description}
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
