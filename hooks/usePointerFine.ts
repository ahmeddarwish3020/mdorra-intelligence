'use client';

import { useSyncExternalStore } from 'react';

function getSnapshot(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
}

const subscribe = () => () => {};

const getServerSnapshot = () => false;

// Stable, subscription-free read of the fine-pointer media query — constant
// Stable, subscription-free read of the fine-pointer media query.
export function usePointerFine(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
