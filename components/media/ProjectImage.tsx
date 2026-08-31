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

export function ProjectImage({
  image,
  ratio,
  priority,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  className = '',
}: ProjectImageProps) {
  if (ratio) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: ratio }}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  if (!image.width || !image.height) {
    return null;
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      priority={priority}
      className={`h-auto w-full object-cover ${className}`}
    />
  );
}
