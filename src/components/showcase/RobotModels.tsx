'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Shared warm material factory
function useWarmMaterials() {
  return useMemo(() => ({
    cream:  new THREE.MeshStandardMaterial({ color: new THREE.Color('#E8DFCE'), metalness: 0.3,  roughness: 0.45 }),
    bronze: new THREE.MeshStandardMaterial({ color: new THREE.Color('#A67C52'), metalness: 0.85, roughness: 0.25 }),
    taupe:  new THREE.MeshStandardMaterial({ color: new THREE.Color('#7C6F5F'), metalness: 0.6,  roughness: 0.35 }),
    dark:   new THREE.MeshStandardMaterial({ color: new THREE.Color('#4A3F33'), metalness: 0.7,  roughness: 0.35 }),
    glow:   new THREE.MeshStandardMaterial({ color: new THREE.Color('#C99A4B'), metalness: 0.4,  roughness: 0.3, emissive: new THREE.Color('#C99A4B'), emissiveIntensity: 0.5 }),
  }), []);
}

/* ─────────────────────────────  HUMANOID  ───────────────────────────── */
export function HumanoidRobot() {
  const root = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const m = useWarmMaterials();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (root.current) root.current.position.y = Math.sin(t * 1.2) * 0.08;
    if (armL.current) armL.current.rotation.x = Math.sin(t * 1.6) * 0.5 - 0.2;
    if (armR.current) armR.current.rotation.x = -Math.sin(t * 1.6) * 0.5 - 0.2;
    if (head.current) head.current.rotation.y = Math.sin(t * 0.8) * 0.4;
  });

  return (
    <group ref={root} position={[0, -1.2, 0]} scale={1.1}>
      {/* Head */}
      <group ref={head} position={[0, 2.5, 0]}>
        <mesh material={m.cream} castShadow>
          <boxGeometry args={[0.7, 0.62, 0.62]} />
        </mesh>
        {/* Visor */}
        <mesh material={m.glow} position={[0, 0.05, 0.32]}>
          <boxGeometry args={[0.5, 0.18, 0.04]} />
        </mesh>
        {/* Antenna */}
        <mesh material={m.bronze} position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.3, 8]} />
        </mesh>
        <mesh material={m.glow} position={[0, 0.62, 0]}>
          <sphereGeometry args={[0.06, 12, 12]} />
        </mesh>
      </group>

      {/* Neck */}
      <mesh material={m.bronze} position={[0, 2.05, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.2, 12]} />
      </mesh>

      {/* Torso */}
      <mesh material={m.cream} castShadow position={[0, 1.4, 0]}>
        <boxGeometry args={[1.0, 1.1, 0.55]} />
      </mesh>
      {/* Chest core */}
      <mesh material={m.glow} position={[0, 1.55, 0.29]}>
        <cylinderGeometry args={[0.13, 0.13, 0.04, 20]} />
      </mesh>
      {/* Waist */}
      <mesh material={m.taupe} position={[0, 0.78, 0]}>
        <boxGeometry args={[0.7, 0.3, 0.45]} />
      </mesh>

      {/* Shoulders */}
      <mesh material={m.bronze} castShadow position={[-0.62, 1.78, 0]}>
        <sphereGeometry args={[0.2, 20, 20]} />
      </mesh>
      <mesh material={m.bronze} castShadow position={[0.62, 1.78, 0]}>
        <sphereGeometry args={[0.2, 20, 20]} />
      </mesh>

      {/* Left arm */}
      <group ref={armL} position={[-0.62, 1.78, 0]}>
        <mesh material={m.cream} castShadow position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.12, 0.14, 1.0, 12]} />
        </mesh>
        <mesh material={m.bronze} position={[0, -1.0, 0]}>
          <sphereGeometry args={[0.13, 16, 16]} />
        </mesh>
        <mesh material={m.taupe} castShadow position={[0, -1.4, 0]}>
          <cylinderGeometry args={[0.1, 0.11, 0.7, 12]} />
        </mesh>
      </group>

      {/* Right arm */}
      <group ref={armR} position={[0.62, 1.78, 0]}>
        <mesh material={m.cream} castShadow position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.12, 0.14, 1.0, 12]} />
        </mesh>
        <mesh material={m.bronze} position={[0, -1.0, 0]}>
          <sphereGeometry args={[0.13, 16, 16]} />
        </mesh>
        <mesh material={m.taupe} castShadow position={[0, -1.4, 0]}>
          <cylinderGeometry args={[0.1, 0.11, 0.7, 12]} />
        </mesh>
      </group>

      {/* Legs */}
      <mesh material={m.cream} castShadow position={[-0.26, 0.1, 0]}>
        <cylinderGeometry args={[0.15, 0.16, 1.1, 12]} />
      </mesh>
      <mesh material={m.cream} castShadow position={[0.26, 0.1, 0]}>
        <cylinderGeometry args={[0.15, 0.16, 1.1, 12]} />
      </mesh>
      {/* Feet */}
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
export function RoverRobot() {
  const root = useRef<THREE.Group>(null);
  const mast = useRef<THREE.Group>(null);
  const wheels = useRef<THREE.Group>(null);
  const m = useWarmMaterials();

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
      <mesh material={m.cream} castShadow position={[0, 0.55, 0]}>
        <boxGeometry args={[1.5, 0.5, 1.9]} />
      </mesh>
      {/* Solar panel top */}
      <mesh material={m.dark} position={[0, 0.85, 0]}>
        <boxGeometry args={[1.3, 0.05, 1.7]} />
      </mesh>
      <mesh material={m.glow} position={[0, 0.88, 0]}>
        <boxGeometry args={[1.1, 0.02, 1.5]} />
      </mesh>

      {/* Sensor mast */}
      <group ref={mast} position={[0, 0.8, 0.6]}>
        <mesh material={m.bronze} position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 1.0, 10]} />
        </mesh>
        {/* Camera head */}
        <mesh material={m.taupe} castShadow position={[0, 1.05, 0]}>
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
      <mesh material={m.bronze} position={[-0.78, 0.35, 0]}>
        <boxGeometry args={[0.1, 0.1, 1.7]} />
      </mesh>
      <mesh material={m.bronze} position={[0.78, 0.35, 0]}>
        <boxGeometry args={[0.1, 0.1, 1.7]} />
      </mesh>

      {/* Wheels */}
      <group ref={wheels} position={[0, 0.1, 0]}>
        {wheelPositions.map((pos, i) => (
          <group key={i} position={pos}>
            <mesh material={m.dark} castShadow rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.34, 0.34, 0.26, 20]} />
            </mesh>
            <mesh material={m.bronze} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.14, 0.14, 0.28, 12]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

/* ─────────────────────────────  QUADRUPED  ───────────────────────────── */
export function QuadrupedRobot() {
  const root = useRef<THREE.Group>(null);
  const legs = useRef<(THREE.Group | null)[]>([]);
  const head = useRef<THREE.Group>(null);
  const m = useWarmMaterials();

  // Leg anchor positions
  const legAnchors: [number, number, number][] = [
    [-0.6, 0.5, 0.5],  // front-left
    [0.6, 0.5, 0.5],   // front-right
    [-0.6, 0.5, -0.5], // back-left
    [0.6, 0.5, -0.5],  // back-right
  ];

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    // Trotting gait — diagonal pairs
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
      <mesh material={m.cream} castShadow position={[0, 0.6, 0]}>
        <boxGeometry args={[1.0, 0.5, 1.6]} />
      </mesh>
      {/* Spine accent */}
      <mesh material={m.bronze} position={[0, 0.88, 0]}>
        <boxGeometry args={[0.4, 0.08, 1.4]} />
      </mesh>

      {/* Head */}
      <group ref={head} position={[0, 0.7, 1.0]}>
        <mesh material={m.taupe} castShadow>
          <boxGeometry args={[0.5, 0.42, 0.5]} />
        </mesh>
        <mesh material={m.glow} position={[0, 0.05, 0.27]}>
          <boxGeometry args={[0.34, 0.12, 0.04]} />
        </mesh>
        {/* Ears/sensors */}
        <mesh material={m.bronze} position={[-0.18, 0.28, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.22, 8]} />
        </mesh>
        <mesh material={m.bronze} position={[0.18, 0.28, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.22, 8]} />
        </mesh>
      </group>

      {/* Legs */}
      {legAnchors.map((anchor, i) => (
        <group
          key={i}
          ref={el => { legs.current[i] = el; }}
          position={anchor}
        >
          {/* Upper leg */}
          <mesh material={m.taupe} castShadow position={[0, -0.28, 0]}>
            <cylinderGeometry args={[0.09, 0.08, 0.56, 10]} />
          </mesh>
          {/* Knee */}
          <mesh material={m.bronze} position={[0, -0.56, 0]}>
            <sphereGeometry args={[0.1, 14, 14]} />
          </mesh>
          {/* Lower leg */}
          <mesh material={m.cream} castShadow position={[0, -0.84, 0]}>
            <cylinderGeometry args={[0.06, 0.05, 0.56, 10]} />
          </mesh>
          {/* Foot */}
          <mesh material={m.dark} position={[0, -1.14, 0]}>
            <sphereGeometry args={[0.08, 12, 12]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
