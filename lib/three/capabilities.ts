import { prefersReducedMotion } from '@/lib/reducedMotion';

export function isClient(): boolean {
  return typeof window !== 'undefined';
}

export function isWebGL2Available(): boolean {
  if (!isClient()) {
    return false;
  }

  try {
    const canvas = document.createElement('canvas');
    return Boolean(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
  } catch {
    return false;
  }
}

// Capability (WebGL2) is constant for a session; reduced-motion is read once
// to avoid re-creating a test canvas on every snapshot.
let cachedSupport: boolean | null = null;

export function canRender3D(): boolean {
  if (cachedSupport === null) {
    cachedSupport = isWebGL2Available() && !prefersReducedMotion();
  }

  return cachedSupport;
}
