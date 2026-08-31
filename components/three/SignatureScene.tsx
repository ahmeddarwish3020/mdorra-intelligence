'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Group } from 'three';

type SignatureSceneProps = {
  scrollProgress?: React.RefObject<number>;
};

const villaData = [
  { x: -7.5, z: -3, width: 5.5, depth: 4.5, height: 3.0, rotationY: 0.1 },
  { x: 4.5, z: -5.5, width: 6, depth: 4.8, height: 3.2, rotationY: -0.15 },
  { x: -5, z: 6, width: 4.8, depth: 4, height: 2.8, rotationY: 0.2 },
  { x: 7, z: 3.5, width: 5.2, depth: 4.2, height: 3.0, rotationY: -0.05 },
] as const;

const poolData = [
  { x: -1, z: -0.5, width: 3.5, depth: 2.5 },
  { x: 3, z: 3, width: 3, depth: 2.2 },
] as const;

const vegetationData = [
  { x: -13, z: -9, scale: 1.2, type: 'tree' as const },
  { x: 15, z: -11, scale: 1.0, type: 'tree' as const },
  { x: -11, z: 13, scale: 1.1, type: 'tree' as const },
  { x: 14, z: 10, scale: 1.3, type: 'tree' as const },
  { x: -2, z: -15, scale: 0.9, type: 'shrub' as const },
  { x: 2, z: 15, scale: 0.9, type: 'shrub' as const },
  { x: -15, z: 1, scale: 1.0, type: 'tree' as const },
  { x: 16, z: 1, scale: 1.0, type: 'tree' as const },
  { x: -4, z: 8, scale: 0.8, type: 'shrub' as const },
  { x: 5, z: -9, scale: 0.8, type: 'shrub' as const },
] as const;

function Villa({
  x,
  z,
  width,
  depth,
  height,
  rotationY = 0,
}: {
  x: number;
  z: number;
  width: number;
  depth: number;
  height: number;
  rotationY?: number;
}) {
  const halfW = width / 2;
  const halfD = depth / 2;
  const floorHeight = height * 0.55;
  const roofThickness = 0.18;

  return (
    <group position={[x, 0, z]} rotation={[0, rotationY, 0]}>
      <mesh position={[0, floorHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, floorHeight, depth]} />
        <meshStandardMaterial color="#f2ede6" roughness={0.9} metalness={0.0} />
      </mesh>

      <mesh position={[0, floorHeight + roofThickness / 2, 0]} castShadow>
        <boxGeometry args={[width + 0.6, roofThickness, depth + 0.6]} />
        <meshStandardMaterial color="#1e1a16" roughness={0.6} metalness={0.05} />
      </mesh>

      <mesh position={[0, floorHeight + 0.02, 0]} castShadow>
        <boxGeometry args={[width + 0.3, 0.04, depth + 0.3]} />
        <meshStandardMaterial color="#8a6a4b" roughness={0.3} metalness={0.5} />
      </mesh>

      {[-halfW * 0.6, halfW * 0.6].map((wx, i) => (
        <mesh key={`glazing-front-${i}`} position={[wx, floorHeight * 0.5, halfD + 0.02]}>
          <planeGeometry args={[width * 0.55, floorHeight * 0.7]} />
          <meshStandardMaterial
            color="#0f1419"
            roughness={0.02}
            metalness={0.95}
            transparent
            opacity={0.2}
            side={2}
            envMapIntensity={0.8}
          />
        </mesh>
      ))}

      {[-halfW * 0.6, halfW * 0.6].map((wx, i) => (
        <mesh
          key={`glazing-back-${i}`}
          position={[wx, floorHeight * 0.5, -halfD - 0.02]}
          rotation={[0, Math.PI, 0]}
        >
          <planeGeometry args={[width * 0.55, floorHeight * 0.7]} />
          <meshStandardMaterial
            color="#0f1419"
            roughness={0.02}
            metalness={0.95}
            transparent
            opacity={0.2}
            side={2}
            envMapIntensity={0.8}
          />
        </mesh>
      ))}

      {[-halfD * 0.5, halfD * 0.5].map((dz, i) => (
        <mesh
          key={`glazing-side-${i}`}
          position={[halfW + 0.02, floorHeight * 0.5, dz]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <planeGeometry args={[width * 0.45, floorHeight * 0.7]} />
          <meshStandardMaterial
            color="#0f1419"
            roughness={0.02}
            metalness={0.95}
            transparent
            opacity={0.2}
            side={2}
            envMapIntensity={0.8}
          />
        </mesh>
      ))}

      {[-halfD * 0.5, halfD * 0.5].map((dz, i) => (
        <mesh
          key={`glazing-side-left-${i}`}
          position={[-halfW - 0.02, floorHeight * 0.5, dz]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          <planeGeometry args={[width * 0.45, floorHeight * 0.7]} />
          <meshStandardMaterial
            color="#0f1419"
            roughness={0.02}
            metalness={0.95}
            transparent
            opacity={0.2}
            side={2}
            envMapIntensity={0.8}
          />
        </mesh>
      ))}

      <mesh position={[-halfW - 0.2, floorHeight * 0.5 + 0.05, halfD + 0.2]} castShadow>
        <boxGeometry args={[0.08, floorHeight * 0.9, 0.08]} />
        <meshStandardMaterial color="#8a6a4b" roughness={0.25} metalness={0.55} />
      </mesh>

      <mesh position={[0, floorHeight + roofThickness + 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.35, 8]} />
        <meshStandardMaterial color="#8a6a4b" roughness={0.25} metalness={0.55} />
      </mesh>

      <mesh position={[halfW, floorHeight * 0.25, halfD + 0.3]} castShadow>
        <boxGeometry args={[0.6, floorHeight * 0.5, 0.08]} />
        <meshStandardMaterial color="#2a2520" roughness={0.4} metalness={0.15} />
      </mesh>
    </group>
  );
}

function Pool({ x, z, width, depth }: { x: number; z: number; width: number; depth: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    const time = state.clock.elapsedTime;
    if (mesh.material && 'opacity' in mesh.material) {
      mesh.material.opacity = 0.55 + Math.sin(time * 0.8) * 0.08;
    }
  });

  return (
    <group position={[x, 0, z]}>
      <mesh ref={ref} position={[0, 0.08, 0]} receiveShadow>
        <boxGeometry args={[width, 0.16, depth]} />
        <meshStandardMaterial
          color="#1a2a32"
          roughness={0.0}
          metalness={1.0}
          transparent
          opacity={0.55}
        />
      </mesh>
      <mesh position={[0, 0.16, 0]} castShadow receiveShadow>
        <boxGeometry args={[width + 0.3, 0.08, depth + 0.3]} />
        <meshStandardMaterial color="#e8e0d4" roughness={0.6} metalness={0.0} />
      </mesh>
      <mesh position={[0, 0.2, 0]} receiveShadow>
        <boxGeometry args={[width - 0.1, 0.04, depth - 0.1]} />
        <meshStandardMaterial
          color="#1a2a32"
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

function Pathway() {
  return (
    <group>
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <boxGeometry args={[1.1, 0.04, 28]} />
        <meshStandardMaterial color="#c8b8a0" roughness={0.85} metalness={0.0} />
      </mesh>
      <mesh position={[-0.75, 0.04, 0]} receiveShadow>
        <boxGeometry args={[0.12, 0.06, 28]} />
        <meshStandardMaterial color="#a89880" roughness={0.8} metalness={0.0} />
      </mesh>
      <mesh position={[0.75, 0.04, 0]} receiveShadow>
        <boxGeometry args={[0.12, 0.06, 28]} />
        <meshStandardMaterial color="#a89880" roughness={0.8} metalness={0.0} />
      </mesh>
    </group>
  );
}

function Terrain() {
  return (
    <mesh position={[0, -0.12, 0]} receiveShadow>
      <boxGeometry args={[42, 0.24, 42]} />
      <meshStandardMaterial color="#c4b8a8" roughness={0.95} metalness={0.0} />
    </mesh>
  );
}

function GrassPatch() {
  return (
    <mesh position={[0, 0.01, 0]} receiveShadow>
      <circleGeometry args={[18, 48]} />
      <meshStandardMaterial color="#4a5a3a" roughness={0.98} metalness={0.0} />
    </mesh>
  );
}

function Tree({
  x,
  z,
  height,
  scale = 1,
}: {
  x: number;
  z: number;
  height: number;
  scale?: number;
}) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, height * 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.1 * scale, 0.18 * scale, height * 0.35, 10]} />
        <meshStandardMaterial color="#3d2f22" roughness={0.9} metalness={0.0} />
      </mesh>
      <mesh position={[0, height * 0.35 + height * 0.15, 0]} castShadow>
        <coneGeometry args={[0.85 * scale, height * 0.65, 10]} />
        <meshStandardMaterial color="#3a5a35" roughness={0.9} metalness={0.0} />
      </mesh>
      <mesh position={[0, height * 0.35 + height * 0.15 + height * 0.2, 0]} castShadow>
        <coneGeometry args={[0.6 * scale, height * 0.5, 10]} />
        <meshStandardMaterial color="#3a5a35" roughness={0.9} metalness={0.0} />
      </mesh>
    </group>
  );
}

function Shrub({ x, z, scale = 1 }: { x: number; z: number; scale?: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.3 * scale, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.6 * scale, 8, 8]} />
        <meshStandardMaterial color="#4a6a3a" roughness={0.95} metalness={0.0} />
      </mesh>
      <mesh position={[0.5 * scale, 0.25 * scale, 0.3 * scale]} castShadow receiveShadow>
        <sphereGeometry args={[0.45 * scale, 7, 7]} />
        <meshStandardMaterial color="#4a6a3a" roughness={0.95} metalness={0.0} />
      </mesh>
      <mesh position={[-0.4 * scale, 0.2 * scale, -0.4 * scale]} castShadow receiveShadow>
        <sphereGeometry args={[0.5 * scale, 7, 7]} />
        <meshStandardMaterial color="#4a6a3a" roughness={0.95} metalness={0.0} />
      </mesh>
    </group>
  );
}

function Vegetation({
  x,
  z,
  scale = 1,
  type = 'tree',
}: {
  x: number;
  z: number;
  scale?: number;
  type?: 'tree' | 'shrub';
}) {
  const seed = Math.abs(Math.sin(x * 12.9898 + z * 78.233) * 43758.5453);
  const rand = (offset: number) => {
    const s = Math.sin(seed + offset) * 10000;
    return s - Math.floor(s);
  };

  if (type === 'tree') {
    const h = (4.5 + rand(100) * 2) * scale;
    return <Tree x={x} z={z} height={h} scale={scale} />;
  }
  return <Shrub x={x} z={z} scale={scale} />;
}

export function SignatureScene({ scrollProgress }: SignatureSceneProps) {
  const group = useRef<Group>(null);

  useFrame((state) => {
    const g = group.current;

    if (!g) {
      return;
    }

    const time = state.clock.elapsedTime;
    const drift = Math.sin(time * 0.12) * 0.02;
    const pointerTilt = state.pointer.x * 0.025;
    const scroll = scrollProgress?.current ?? 0;

    g.rotation.y = drift + pointerTilt + scroll * Math.PI * 0.35;
    g.rotation.x = state.pointer.y * 0.015;
    g.position.y = Math.sin(time * 0.25) * 0.01;
  });

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      <ambientLight intensity={0.4} />
      <hemisphereLight intensity={0.5} color="#f5efe8" groundColor="#2a2520" />
      <directionalLight
        position={[10, 15, 8]}
        intensity={1.3}
        castShadow
        shadow-normalBias={0.02}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />
      <directionalLight position={[-8, 6, -6]} intensity={0.25} color="#8a6a4b" />
      <directionalLight position={[0, 10, 0]} intensity={0.15} color="#f5efe8" />

      <Terrain />
      <GrassPatch />
      <Pathway />

      {villaData.map((v, i) => (
        <Villa key={i} {...v} />
      ))}

      {poolData.map((p, i) => (
        <Pool key={i} {...p} />
      ))}

      {vegetationData.map((v, i) => (
        <Vegetation key={i} {...v} />
      ))}

      <mesh position={[0, -0.12, 0]} receiveShadow>
        <circleGeometry args={[20, 56]} />
        <meshStandardMaterial
          color="#8a7a6a"
          roughness={0.98}
          metalness={0.0}
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}
