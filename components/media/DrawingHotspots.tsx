'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { DrawingHotspot } from '@/content/projects/schema';
import { usePointerFine } from '@/hooks/usePointerFine';

type DrawingHotspotsProps = {
  hotspots: DrawingHotspot[];
};

type NotePlacement = { left: string; top: string; transform: string };

// Position an annotation note without clipping at the drawing edges: it opens
// to the right of the marker, flips to the left near the right edge, and is
// pushed below/above the marker at the very top/bottom.
function placeNote(hotspot: DrawingHotspot): NotePlacement {
  const horizontal = hotspot.x > 62 ? 'calc(-100% - 14px)' : '14px';

  let vertical: string;
  if (hotspot.y <= 14) {
    vertical = '10px';
  } else if (hotspot.y >= 84) {
    vertical = 'calc(-100% - 10px)';
  } else {
    vertical = '-50%';
  }

  return {
    left: `${hotspot.x}%`,
    top: `${hotspot.y}%`,
    transform: `translate(${horizontal}, ${vertical})`,
  };
}

// Annotated-drawing markers: tiny cross marks that reveal a quiet note on
// hover/focus (fine pointer) or tap (touch). Tap elsewhere or press Escape to
// dismiss. A drawing carries no hotspots and renders as a plain figure.
export function DrawingHotspots({ hotspots }: DrawingHotspotsProps) {
  const [active, setActive] = useState<number | null>(null);
  const finePointer = usePointerFine();
  // A pointer-down on a marker focus-steals right before the click (touch),
  // which would otherwise open-and-immediately-close the note. Suppress the
  // focus-open only for that case; a true keyboard focus still opens it.
  const suppressFocus = useRef(false);

  useEffect(() => {
    if (active === null) {
      return;
    }

    const dismiss = (event: Event) => {
      if (finePointer) {
        return;
      }
      const target = event.target as HTMLElement | null;
      if (target?.closest?.('[data-hotspot]')) {
        return;
      }
      setActive(null);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Tab') {
        setActive(null);
      }
    };

    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [active, finePointer]);

  const isOpen = (index: number) => active === index;

  const notes = hotspots
    .map((hotspot, index) => ({ hotspot, index }))
    .filter(({ index }) => isOpen(index));

  return (
    <div className="absolute inset-0">
      {hotspots.map((hotspot, index) => {
        const open = isOpen(index);

        return (
          <button
            key={`${hotspot.label}-${index}`}
            type="button"
            data-hotspot
            aria-expanded={open}
            aria-label={`${hotspot.label}${hotspot.title ? ` — ${hotspot.title}` : ''}`}
            onPointerDown={(event) => {
              event.stopPropagation();
              suppressFocus.current = true;
            }}
            onPointerEnter={() => finePointer && setActive(index)}
            onPointerLeave={() => finePointer && setActive(null)}
            onFocus={() => {
              if (suppressFocus.current) {
                suppressFocus.current = false;
                return;
              }
              setActive(index);
            }}
            onBlur={() => finePointer && setActive(null)}
            onClick={() => setActive(open ? null : index)}
            className="absolute z-[1] flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` } as CSSProperties}
          >
            <span aria-hidden="true" className="relative block h-2.5 w-2.5">
              <span className="bg-accent-inverse absolute top-0 left-1/2 h-full w-px -translate-x-1/2" />
              <span className="bg-accent-inverse absolute top-1/2 left-0 h-px w-full -translate-y-1/2" />
            </span>
          </button>
        );
      })}

      {notes.map(({ hotspot, index }) => (
        <div
          key={`note-${index}`}
          className="border-border-inverse bg-dark text-inverse-text pointer-events-none absolute z-[2] w-56 border p-3"
          style={placeNote(hotspot) as CSSProperties}
        >
          <p className="text-accent-inverse text-[0.625rem] leading-relaxed tracking-[0.18em] uppercase">
            {hotspot.label}
          </p>
          {hotspot.title && (
            <p className="mt-1.5 text-sm leading-snug font-medium">{hotspot.title}</p>
          )}
          {hotspot.detail && (
            <p className="text-inverse-muted mt-1 text-xs leading-[1.6]">{hotspot.detail}</p>
          )}
          {(hotspot.material || hotspot.meta) && (
            <p className="border-border-inverse text-inverse-muted mt-2 border-t pt-2 text-[0.625rem] leading-relaxed tracking-wider uppercase">
              {[hotspot.material, hotspot.meta].filter(Boolean).join(' · ')}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
