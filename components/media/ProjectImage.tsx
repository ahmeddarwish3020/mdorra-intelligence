import Image from 'next/image';
import type { GalleryImage } from '@/content/projects/schema';

type MediaImage = Pick<GalleryImage, 'src' | 'alt' | 'width' | 'height'>;

type ProjectImageProps = {
  image: MediaImage;
  ratio?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

const fallbackImages = [
  '/media/mdorra/hero-villa.jpg',
  '/media/mdorra/contemporary-living.jpg',
  '/media/mdorra/architect-studio.jpg',
  '/media/mdorra/design-process.jpg',
  '/media/mdorra/inner-pages/07-—-WORK-SUPPORTING-IMAGE.jpg',
];

function resolveProjectImage(image: MediaImage): string {
  if (!image.src.includes('/media/placeholder/')) return image.src;

  const alt = image.alt.toLowerCase();
  if (alt.includes('living') || alt.includes('interior') || alt.includes('majlis') || alt.includes('bedroom')) return fallbackImages[1];
  if (alt.includes('office') || alt.includes('studio')) return fallbackImages[2];
  if (alt.includes('plan') || alt.includes('section') || alt.includes('drawing')) return fallbackImages[3];
  if (alt.includes('garden') || alt.includes('courtyard') || alt.includes('villa') || alt.includes('facade')) return fallbackImages[0];
  return fallbackImages[4];
}

export function ProjectImage({ image, ratio, priority, sizes = '(min-width: 1024px) 50vw, 100vw', className = '' }: ProjectImageProps) {
  const src = resolveProjectImage(image);

  if (ratio) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: ratio }}>
        <Image src={src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  if (!image.width || !image.height) return null;

  return <Image src={src} alt={image.alt} width={image.width} height={image.height} sizes={sizes} priority={priority} className={`h-auto w-full object-cover ${className}`} />;
}
