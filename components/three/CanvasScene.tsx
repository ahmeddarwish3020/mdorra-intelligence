'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useThreeSupport } from '@/hooks/useThreeSupport';

const SceneCanvas = dynamic(() => import('./SceneCanvas'), {
  ssr: false,
  loading: () => null,
});

type CanvasSceneProps = {
  children: React.ReactNode;
  fallback: React.ReactNode;
  enabled?: boolean;
};

export function CanvasScene({ children, fallback, enabled }: CanvasSceneProps) {
  const supported = useThreeSupport();
  const ready = enabled ?? supported;

  if (!ready) {
    return <>{fallback}</>;
  }

  return (
    <Suspense fallback={fallback}>
      <SceneCanvas>{children}</SceneCanvas>
    </Suspense>
  );
}
