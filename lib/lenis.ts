import Lenis from 'lenis';

export type LenisOptions = ConstructorParameters<typeof Lenis>[0];

export function createLenis(options: LenisOptions = {}): Lenis {
  return new Lenis({
    duration: 1.2,
    smoothWheel: true,
    ...options,
  });
}
