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

const fallbackImages = {
  hero: '/media/mdorra/hero-villa.jpg',
  living: '/media/mdorra/contemporary-living.jpg',
  majlis: '/media/mdorra/luxury-living.jpg',
  studio: '/media/mdorra/architect-studio.jpg',
  process: '/media/mdorra/design-process.jpg',
  supporting: '/media/mdorra/inner-pages/07-—-WORK-SUPPORTING-IMAGE.jpg',
};

function resolveProjectImage(image: MediaImage): string {
  if (!image.src.includes('/media/placeholder/')) return image.src;

  const alt = image.alt.toLowerCase();

  if (alt.includes('master bedroom') || alt.includes('bedroom')) return fallbackImages.studio;
  if (alt.includes('majlis')) return fallbackImages.majlis;
  if (alt.includes('living') || alt.includes('interior') || alt.includes('meeting')) return fallbackImages.living;
  if (alt.includes('office') || alt.includes('studio') || alt.includes('workspace')) return fallbackImages.studio;
  if (alt.includes('atrium') || alt.includes('section') || alt.includes('drawing') || alt.includes('plan')) return fallbackImages.process;
  if (alt.includes('garden') || alt.includes('courtyard') || alt.includes('facade') || alt.includes('villa')) return fallbackImages.hero;
  if (alt.includes('before') || alt.includes('vacant') || alt.includes('site')) return fallbackImages.supporting;

  return fallbackImages.supporting;
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
