'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/reducedMotion';

type MaterialLightProps = {
  className?: string;
  radius?: number;
};

export function MaterialLight({ className = '', radius = 280 }: MaterialLightProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (!window.matchMedia('(min-width: 1024px)').matches) return;

    let frame = 0;
    const update = (x: number, y: number) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const px = ((x - rect.left) / rect.width) * 100;
        const py = ((y - rect.top) / rect.height) * 100;
        el.style.setProperty('--light-x', `${px}%`);
        el.style.setProperty('--light-y', `${py}%`);
        el.style.opacity = '1';
      });
    };

    const onMove = (e: PointerEvent) => update(e.clientX, e.clientY);
    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.opacity = '0';
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`absolute inset-0 opacity-0 transition-opacity duration-700 ${className}`}
      style={{
        background: `radial-gradient(${radius}px circle at var(--light-x, 50%) var(--light-y, 50%), rgba(255,255,255,0.05), transparent 65%)`,
      }}
    />
  );
}
