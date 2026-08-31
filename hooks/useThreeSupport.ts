'use client';

import { useSyncExternalStore } from 'react';
import { canRender3D } from '@/lib/three/capabilities';

const subscribe = () => () => {};

const getServerSnapshot = () => false;

const getSnapshot = () => canRender3D();

export function useThreeSupport(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
