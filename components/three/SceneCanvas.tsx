'use client';

import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei';
import { CanvasErrorBoundary } from './CanvasErrorBoundary';
import { SceneFallback } from './SceneFallback';

type SceneCanvasProps = {
  children: React.ReactNode;
};

function CanvasInner({ children }: SceneCanvasProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ fov: 42, near: 0.1, far: 1000, position: [0, 1.4, 6.8] }}
      resize={{ scroll: false }}
    >
      <PerformanceMonitor>
        <AdaptiveDpr pixelated />
        {children}
      </PerformanceMonitor>
    </Canvas>
  );
}

export default function SceneCanvas({ children }: SceneCanvasProps) {
  return (
    <div role="img" aria-label="Architectural maquette study" className="h-full w-full">
      <CanvasErrorBoundary fallback={<SceneFallback />}>
        <CanvasInner>{children}</CanvasInner>
      </CanvasErrorBoundary>
    </div>
  );
}
