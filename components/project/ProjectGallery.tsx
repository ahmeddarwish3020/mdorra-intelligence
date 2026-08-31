import { useTranslations } from 'next-intl';
import type { Project } from '@/content/projects/schema';
import { Gallery } from '@/components/media/Gallery';

type ProjectGalleryProps = {
  project: Project;
};

export function ProjectGallery({ project }: ProjectGalleryProps) {
  const t = useTranslations('project.sections');

  if (!project.gallery || project.gallery.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="eyebrow text-inverse-muted">{t('gallery')}</h2>
      <div className="mt-10">
        <Gallery images={project.gallery} />
      </div>
    </section>
  );
}
