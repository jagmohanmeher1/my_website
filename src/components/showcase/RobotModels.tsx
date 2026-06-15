'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Bold material set built from a single accent color
function useBoldMaterials(accent: string) {
  return useMemo(() => ({
    body:  new THREE.MeshStandardMaterial({ color: new THREE.Color(accent),     metalness: 0.45, roughness: 0.34 }),
    dark:  new THREE.MeshStandardMaterial({ color: new THREE.Color('#27272A'),  metalness: 0.7,  roughness: 0.3 }),
    light: new THREE.MeshStandardMaterial({ color: new THREE.Color('#FAFAFA'),  metalness: 0.3,  roughness: 0.5 }),
    glow:  new THREE.MeshStandardMaterial({ color: new THREE.Color('#FBBF24'),  metalness: 0.4,  roughness: 0.3, emissive: new THREE.Color('#F59E0B'), emissiveIntensity: 0.6 }),
  }), [accent]);
}

/* ─────────────────────────────  HUMANOID  ───────────────────────────── */
export function HumanoidRobot({ accent = '#F97316' }: { accent?: string }) {
  const root = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const m = useBoldMaterials(accent);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (root.current) root.current.position.y = -1.2 + Math.sin(t * 1.2) * 0.08;
    if (armL.current) armL.current.rotation.x = Math.sin(t * 1.6) * 0.5 - 0.2;
    if (armR.current) armR.current.rotation.x = -Math.sin(t * 1.6) * 0.5 - 0.2;
    if (head.current) head.current.rotation.y = Math.sin(t * 0.8) * 0.4;
  });

  return (
    <group ref={root} position={[0, -1.2, 0]} scale={1.1}>
      {/* Head */}
      <group ref={head} position={[0, 2.5, 0]}>
        <mesh material={m.light} castShadow>
          <boxGeometry args={[0.7, 0.62, 0.62]} />
        </mesh>
        <mesh material={m.glow} position={[0, 0.05, 0.32]}>
          <boxGeometry args={[0.5, 0.18, 0.04]} />
        </mesh>
        <mesh material={m.dark} position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.3, 8]} />
        </mesh>
        <mesh material={m.glow} position={[0, 0.62, 0]}>
          <sphereGeometry args={[0.06, 12, 12]} />
        </mesh>
      </group>

      {/* Neck */}
      <mesh material={m.dark} position={[0, 2.05, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.2, 12]} />
      </mesh>

      {/* Torso */}
      <mesh material={m.body} castShadow position={[0, 1.4, 0]}>
        <boxGeometry args={[1.0, 1.1, 0.55]} />
      </mesh>
      <mesh material={m.glow} position={[0, 1.55, 0.29]}>
        <cylinderGeometry args={[0.13, 0.13, 0.04, 20]} />
      </mesh>
      <mesh material={m.dark} position={[0, 0.78, 0]}>
        <boxGeometry args={[0.7, 0.3, 0.45]} />
      </mesh>

      {/* Shoulders */}
      <mesh material={m.dark} castShadow position={[-0.62, 1.78, 0]}>
        <sphereGeometry args={[0.2, 20, 20]} />
      </mesh>
      <mesh material={m.dark} castShadow position={[0.62, 1.78, 0]}>
        <sphereGeometry args={[0.2, 20, 20]} />
      </mesh>

      {/* Left arm */}
      <group ref={armL} position={[-0.62, 1.78, 0]}>
        <mesh material={m.body} castShadow position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.12, 0.14, 1.0, 12]} />
        </mesh>
        <mesh material={m.dark} position={[0, -1.0, 0]}>
          <sphereGeometry args={[0.13, 16, 16]} />
        </mesh>
        <mesh material={m.light} castShadow position={[0, -1.4, 0]}>
          <cylinderGeometry args={[0.1, 0.11, 0.7, 12]} />
        </mesh>
      </group>

      {/* Right arm */}
      <group ref={armR} position={[0.62, 1.78, 0]}>
        <mesh material={m.body} castShadow position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.12, 0.14, 1.0, 12]} />
        </mesh>
        <mesh material={m.dark} position={[0, -1.0, 0]}>
          <sphereGeometry args={[0.13, 16, 16]} />
        </mesh>
        <mesh material={m.light} castShadow position={[0, -1.4, 0]}>
          <cylinderGeometry args={[0.1, 0.11, 0.7, 12]} />
        </mesh>
      </group>

      {/* Legs */}
      <mesh material={m.body} castShadow position={[-0.26, 0.1, 0]}>
        <cylinderGeometry args={[0.15, 0.16, 1.1, 12]} />
      </mesh>
      <mesh material={m.body} castShadow position={[0.26, 0.1, 0]}>
        <cylinderGeometry args={[0.15, 0.16, 1.1, 12]} />
      </mesh>
      <mesh material={m.dark} castShadow position={[-0.26, -0.5, 0.1]}>
        <boxGeometry args={[0.3, 0.16, 0.6]} />
      </mesh>
      <mesh material={m.dark} castShadow position={[0.26, -0.5, 0.1]}>
        <boxGeometry args={[0.3, 0.16, 0.6]} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────  ROVER  ───────────────────────────── */
export function RoverRobot({ accent = '#F59E0B' }: { accent?: string }) {
  const root = useRef<THREE.Group>(null);
  const mast = useRef<THREE.Group>(null);
  const wheels = useRef<THREE.Group>(null);
  const m = useBoldMaterials(accent);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (mast.current) mast.current.rotation.y = Math.sin(t * 0.6) * 0.6;
    if (wheels.current) {
      wheels.current.children.forEach(w => { w.rotation.x = t * 1.5; });
    }
    if (root.current) root.current.rotation.y = Math.sin(t * 0.3) * 0.05;
  });

  const wheelPositions: [number, number, number][] = [
    [-0.85, 0, 0.7], [0.85, 0, 0.7],
    [-0.85, 0, 0],   [0.85, 0, 0],
    [-0.85, 0, -0.7],[0.85, 0, -0.7],
  ];

  return (
    <group ref={root} position={[0, -0.6, 0]} scale={1.15}>
      {/* Chassis */}
      <mesh material={m.body} castShadow position={[0, 0.55, 0]}>
        <boxGeometry args={[1.5, 0.5, 1.9]} />
      </mesh>
      {/* Solar deck */}
      <mesh material={m.dark} position={[0, 0.85, 0]}>
        <boxGeometry args={[1.3, 0.05, 1.7]} />
      </mesh>
      <mesh material={m.glow} position={[0, 0.88, 0]}>
        <boxGeometry args={[1.1, 0.02, 1.5]} />
      </mesh>

      {/* Sensor mast */}
      <group ref={mast} position={[0, 0.8, 0.6]}>
        <mesh material={m.dark} position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 1.0, 10]} />
        </mesh>
        <mesh material={m.body} castShadow position={[0, 1.05, 0]}>
          <boxGeometry args={[0.4, 0.24, 0.2]} />
        </mesh>
        <mesh material={m.glow} position={[-0.1, 1.05, 0.11]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
        </mesh>
        <mesh material={m.glow} position={[0.1, 1.05, 0.11]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
        </mesh>
      </group>

      {/* Suspension bars */}
      <mesh material={m.dark} position={[-0.78, 0.35, 0]}>
        <boxGeometry args={[0.1, 0.1, 1.7]} />
      </mesh>
      <mesh material={m.dark} position={[0.78, 0.35, 0]}>
        <boxGeometry args={[0.1, 0.1, 1.7]} />
      </mesh>

      {/* Wheels */}
      <group ref={wheels} position={[0, 0.1, 0]}>
        {wheelPositions.map((pos, i) => (
          <group key={i} position={pos}>
            <mesh material={m.dark} castShadow rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.34, 0.34, 0.26, 20]} />
            </mesh>
            <mesh material={m.body} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.14, 0.14, 0.28, 12]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

/* ─────────────────────────────  QUADRUPED  ───────────────────────────── */
export function QuadrupedRobot({ accent = '#EC4899' }: { accent?: string }) {
  const root = useRef<THREE.Group>(null);
  const legs = useRef<(THREE.Group | null)[]>([]);
  const head = useRef<THREE.Group>(null);
  const m = useBoldMaterials(accent);

  const legAnchors: [number, number, number][] = [
    [-0.6, 0.5, 0.5],
    [0.6, 0.5, 0.5],
    [-0.6, 0.5, -0.5],
    [0.6, 0.5, -0.5],
  ];

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    legs.current.forEach((leg, i) => {
      if (!leg) return;
      const phase = (i === 0 || i === 3) ? 0 : Math.PI;
      leg.rotation.x = Math.sin(t * 3 + phase) * 0.5;
    });
    if (root.current) root.current.position.y = -0.2 + Math.abs(Math.sin(t * 3)) * 0.06;
    if (head.current) head.current.rotation.y = Math.sin(t * 0.7) * 0.3;
  });

  return (
    <group ref={root} position={[0, -0.2, 0]} scale={1.15}>
      {/* Body */}
      <mesh material={m.body} castShadow position={[0, 0.6, 0]}>
        <boxGeometry args={[1.0, 0.5, 1.6]} />
      </mesh>
      <mesh material={m.glow} position={[0, 0.88, 0]}>
        <boxGeometry args={[0.4, 0.08, 1.4]} />
      </mesh>

      {/* Head */}
      <group ref={head} position={[0, 0.7, 1.0]}>
        <mesh material={m.dark} castShadow>
          <boxGeometry args={[0.5, 0.42, 0.5]} />
        </mesh>
        <mesh material={m.glow} position={[0, 0.05, 0.27]}>
          <boxGeometry args={[0.34, 0.12, 0.04]} />
        </mesh>
        <mesh material={m.body} position={[-0.18, 0.28, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.22, 8]} />
        </mesh>
        <mesh material={m.body} position={[0.18, 0.28, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.22, 8]} />
        </mesh>
      </group>

      {/* Legs */}
      {legAnchors.map((anchor, i) => (
        <group key={i} ref={el => { legs.current[i] = el; }} position={anchor}>
          <mesh material={m.dark} castShadow position={[0, -0.28, 0]}>
            <cylinderGeometry args={[0.09, 0.08, 0.56, 10]} />
          </mesh>
          <mesh material={m.body} position={[0, -0.56, 0]}>
            <sphereGeometry args={[0.1, 14, 14]} />
          </mesh>
          <mesh material={m.light} castShadow position={[0, -0.84, 0]}>
            <cylinderGeometry args={[0.06, 0.05, 0.56, 10]} />
          </mesh>
          <mesh material={m.dark} position={[0, -1.14, 0]}>
            <sphereGeometry args={[0.08, 12, 12]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
