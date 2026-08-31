import type { GalleryImage } from '@/content/projects/schema';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { ProjectImage } from '@/components/media/ProjectImage';
import { MaterialLight } from '@/components/media/MaterialLight';

type GalleryProps = {
  images: GalleryImage[];
  ratio?: string;
};

// Rhythm cycle across the 12-col grid: full-bleed lead, then offset pairs.
// Class names must be literal strings so Tailwind can detect them.
const spanClass: Record<number, string> = {
  4: 'md:col-span-4',
  5: 'md:col-span-5',
  6: 'md:col-span-6',
  7: 'md:col-span-7',
  12: 'md:col-span-12',
};

const spanCycle = [12, 5, 6, 7, 4];

// Used only when the source image has no width/height (no natural ratio).
const fallbackRatios = ['3/2', '4/5', '16/9', '3/4'] as const;

export function Gallery({ images, ratio }: GalleryProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-4 gap-x-5 gap-y-16 md:grid-cols-12 md:gap-y-24">
      {images.map((image, index) => {
        const span = ratio
          ? undefined
          : images.length > 1
            ? spanCycle[index % spanCycle.length]
            : 12;
        const hasDimensions = Boolean(image.width && image.height);
        const effectiveSpan = span ?? 12;
        const fallbackRatio =
          fallbackRatios[effectiveSpan >= 7 ? 0 : effectiveSpan <= 4 ? 1 : index % 2 === 0 ? 2 : 3];

        return (
          <figure key={image.src} className={`col-span-4 w-full ${spanClass[effectiveSpan]}`}>
            <ImageReveal>
              <div className="relative">
                <ProjectImage
                  image={image}
                  ratio={ratio ?? (hasDimensions ? undefined : fallbackRatio)}
                  sizes={
                    effectiveSpan >= 7
                      ? '(min-width: 1024px) 90vw, 100vw'
                      : '(min-width: 1024px) 50vw, 100vw'
                  }
                />
                <MaterialLight radius={420} />
              </div>
            </ImageReveal>
            {image.caption && (
              <figcaption className="mt-4 flex items-baseline justify-between gap-6">
                <span className="text-accent-inverse font-mono text-xs">
                  FIG. {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-inverse-muted text-sm">{image.caption}</span>
              </figcaption>
            )}
          </figure>
        );
      })}
    </div>
  );
}
