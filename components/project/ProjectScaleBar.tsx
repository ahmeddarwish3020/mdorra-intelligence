'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { prefersReducedMotion } from '@/lib/reducedMotion';

// A quiet, architectural "scale bar" reading the document scroll on project
// pages — a ruler on the page margin rather than a website loading bar.
// Hidden for reduced-motion users: the indicator duplicates the scroll
// position, which is always visible to the user anyway.
export function ProjectScaleBar() {
  const railRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    const box = boxRef.current;

    if (!rail || !box) {
      return;
    }

    if (prefersReducedMotion()) {
      box.style.display = 'none';
      return;
    }

    const onRefresh = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      rail.style.setProperty('--scale', progress.toFixed(4));
    };

    onRefresh();
    window.addEventListener('scroll', onRefresh, { passive: true });
    window.addEventListener('resize', onRefresh, { passive: true });

    return () => {
      window.removeEventListener('scroll', onRefresh);
      window.removeEventListener('resize', onRefresh);
    };
  }, []);

  return (
    <div
      ref={boxRef}
      aria-hidden="true"
      role="presentation"
      className="pointer-events-none fixed end-3 top-1/2 z-40 flex h-[46vh] w-6 -translate-y-1/2 items-center justify-center sm:end-5 sm:h-[60vh]"
    >
      <div ref={railRef} className="relative h-full w-full">
        <span className="bg-border-inverse absolute top-0 left-1/2 h-1.5 w-3 -translate-x-1/2" />
        <span className="bg-border-inverse absolute bottom-0 left-1/2 h-1.5 w-3 -translate-x-1/2" />
        <span className="bg-border-inverse absolute inset-y-0 left-1/2 w-px -translate-x-1/2" />
        <span
          className="bg-accent-inverse absolute inset-y-0 left-1/2 w-px origin-top"
          style={{ transform: 'scaleY(var(--scale, 0)) translateX(-50%)' } as CSSProperties}
        />
        <span
          className="bg-accent-inverse absolute left-1/2 h-1.5 w-5"
          style={
            {
              top: 'calc(var(--scale, 0) * 100%)',
              transform: 'translate(-50%, -50%)',
            } as CSSProperties
          }
        />
      </div>
    </div>
  );
}
