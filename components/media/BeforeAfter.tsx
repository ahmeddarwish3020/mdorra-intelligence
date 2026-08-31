import { useTranslations } from 'next-intl';
import type { BeforeAfterPair } from '@/content/projects/schema';
import { ProjectImage } from '@/components/media/ProjectImage';

type BeforeAfterProps = {
  pair: BeforeAfterPair;
};

function Panel({ image, label }: { image: BeforeAfterPair['before']; label: string }) {
  return (
    <figure className="bg-dark-secondary relative">
      <ProjectImage image={image} ratio="4/3" sizes="(min-width: 1024px) 44vw, 100vw" />
      <figcaption className="text-inverse-muted absolute inset-x-0 bottom-0 flex items-center justify-between gap-6 p-4 font-mono text-xs tracking-wider uppercase">
        <span className="text-inverse-text">{label}</span>
        {image.caption && <span className="max-w-[60%] text-end">{image.caption}</span>}
      </figcaption>
    </figure>
  );
}

export function BeforeAfter({ pair }: BeforeAfterProps) {
  const t = useTranslations('project.labels');

  return (
    <div className="border-border-inverse grid grid-cols-1 overflow-hidden border md:grid-cols-[1fr_auto_1fr]">
      <Panel image={pair.before} label={pair.beforeLabel ?? t('before')} />

      <div
        aria-hidden="true"
        className="bg-dark-secondary hidden items-center justify-center px-4 md:flex"
      >
        <span className="text-accent-inverse font-mono text-base">→</span>
      </div>

      <Panel image={pair.after} label={pair.afterLabel ?? t('after')} />
    </div>
  );
}
