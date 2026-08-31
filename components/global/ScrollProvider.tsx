'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { prefersReducedMotion } from '@/lib/reducedMotion';

type ScrollProviderProps = {
  children: ReactNode;
};

export function ScrollProvider({ children }: ScrollProviderProps) {
  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    // GSAP, ScrollTrigger and Lenis are only needed when the scroll
    // choreography is actually allowed to run. Loading them lazily keeps the
    // initial JavaScript of every page free of the animation engine.
    let disposed = false;
    let cleanup: (() => void) | null = null;

    void Promise.all([import('@/lib/lenis'), import('@/lib/gsap')]).then(
      ([{ createLenis }, { gsap, ScrollTrigger }]) => {
        if (disposed) {
          return;
        }

        const lenis = createLenis();
        lenis.on('scroll', ScrollTrigger.update);

        const raf = (time: number) => lenis.raf(time * 1000);

        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        cleanup = () => {
          gsap.ticker.remove(raf);
          lenis.destroy();
        };
      },
    );

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
