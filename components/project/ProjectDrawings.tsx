import { useTranslations } from 'next-intl';
import type { Drawing } from '@/content/projects/schema';
import { Drawing as DrawingFigure } from '@/components/media/Drawing';

type ProjectDrawingsProps = {
  drawings: Drawing[];
};

export function ProjectDrawings({ drawings }: ProjectDrawingsProps) {
  const t = useTranslations('project.sections');

  return (
    <div>
      <h2 className="eyebrow text-inverse-muted">{t('drawings')}</h2>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {drawings.map((drawing) => (
          <DrawingFigure key={drawing.src} drawing={drawing} />
        ))}
      </div>
    </div>
  );
}
