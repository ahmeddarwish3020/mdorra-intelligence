import Image from 'next/image';
import type { Drawing } from '@/content/projects/schema';
import { DrawingHotspots } from '@/components/media/DrawingHotspots';

type DrawingProps = {
  drawing: Drawing;
};

export function Drawing({ drawing }: DrawingProps) {
  if (!drawing.width || !drawing.height) {
    return null;
  }

  return (
    <figure className="border-border-inverse bg-dark-secondary border">
      <div className="border-border-inverse flex items-center justify-between gap-6 border-b px-4 py-3">
        <span className="text-accent-inverse font-mono text-xs tracking-wider uppercase">
          {drawing.index ?? 'DRG'}
        </span>
        {drawing.caption && <span className="text-inverse-muted text-xs">{drawing.caption}</span>}
      </div>
      <div className="p-6 md:p-12">
        <div className="relative">
          <Image
            src={drawing.src}
            alt={drawing.alt}
            width={drawing.width}
            height={drawing.height}
            className="mx-auto h-auto w-full object-contain"
          />
          {drawing.hotspots && drawing.hotspots.length > 0 && (
            <DrawingHotspots hotspots={drawing.hotspots} />
          )}
        </div>
      </div>
    </figure>
  );
}
