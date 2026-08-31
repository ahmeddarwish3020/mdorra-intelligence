import { useTranslations } from 'next-intl';
import type { ProjectCredit } from '@/content/projects/schema';

type ProjectCreditsProps = {
  credits: ProjectCredit[];
};

export function ProjectCredits({ credits }: ProjectCreditsProps) {
  const t = useTranslations('project.sections');

  return (
    <div>
      <h2 className="eyebrow text-inverse-muted">{t('credits')}</h2>
      <ul className="mt-8">
        {credits.map((credit) => (
          <li
            key={`${credit.role}-${credit.name}`}
            className="border-border-inverse flex flex-col gap-1 border-t py-3 md:flex-row md:items-baseline md:justify-between md:gap-8"
          >
            <span className="text-inverse-muted font-mono text-xs tracking-wider uppercase">
              {credit.role}
            </span>
            <span className="text-inverse-text text-sm">{credit.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
