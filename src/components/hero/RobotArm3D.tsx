'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';
import * as THREE from 'three';

interface Pose {
  baseY: number;
  shoulder: number;
  elbow: number;
  wrist: number;
  gripperSpread: number;
}

const POSES: Pose[] = [
  { baseY: 0,   shoulder: -20, elbow:  65, wrist: -35, gripperSpread: 0.1  }, // rest
  { baseY: 25,  shoulder:  62, elbow: -28, wrist:  42, gripperSpread: 0.9  }, // wave
  { baseY: -15, shoulder:  12, elbow:  22, wrist: -8,  gripperSpread: 1.0  }, // reach
  { baseY:  5,  shoulder:  78, elbow: -98, wrist:  58, gripperSpread: 0.15 }, // pick
  { baseY:  0,  shoulder:  38, elbow: -12, wrist:  10, gripperSpread: 0.65 }, // present
];

function lerpPose(a: Pose, b: Pose, t: number): Pose {
  return {
    baseY:         MathUtils.lerp(a.baseY,         b.baseY,         t),
    shoulder:      MathUtils.lerp(a.shoulder,      b.shoulder,      t),
    elbow:         MathUtils.lerp(a.elbow,         b.elbow,         t),
    wrist:         MathUtils.lerp(a.wrist,         b.wrist,         t),
    gripperSpread: MathUtils.lerp(a.gripperSpread, b.gripperSpread, t),
  };
}

interface Props {
  scrollProgress: React.MutableRefObject<number>;
}

export default function RobotArm3D({ scrollProgress }: Props) {
  const baseRotRef  = useRef<THREE.Group>(null);
  const shoulderRef = useRef<THREE.Group>(null);
  const elbowRef    = useRef<THREE.Group>(null);
  const wristRef    = useRef<THREE.Group>(null);
  const fingerLRef  = useRef<THREE.Group>(null);
  const fingerRRef  = useRef<THREE.Group>(null);

  const current = useRef<Pose>({ ...POSES[0] });

  // Vibrant orange links
  const matArm = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#F97316'),
    metalness: 0.45,
    roughness: 0.32,
  }), []);

  // Dark charcoal joints (bold contrast)
  const matJointBronze = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#27272A'),
    metalness: 0.8,
    roughness: 0.28,
  }), []);

  // Pink accent (wrist)
  const matJointTaupe = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#EC4899'),
    metalness: 0.7,
    roughness: 0.3,
  }), []);

  // Near-black base
  const matBase = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#18181B'),
    metalness: 0.7,
    roughness: 0.32,
  }), []);

  // Amber glowing gripper
  const matGripper = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FBBF24'),
    metalness: 0.55,
    roughness: 0.25,
    emissive: new THREE.Color('#F59E0B'),
    emissiveIntensity: 0.35,
  }), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const scroll = scrollProgress.current;

    const seg = scroll * (POSES.length - 1);
    const idx = Math.min(Math.floor(seg), POSES.length - 2);
    const localT = seg - idx;
    const target = lerpPose(POSES[idx], POSES[idx + 1], localT);

    const idleA = Math.sin(t * 0.55) * 1.6;
    const idleB = Math.cos(t * 0.72) * 1.2;

    const spd = 0.038;
    current.current.baseY         = MathUtils.lerp(current.current.baseY,         target.baseY + idleA * 0.22, spd);
    current.current.shoulder      = MathUtils.lerp(current.current.shoulder,      target.shoulder + idleA,      spd);
    current.current.elbow         = MathUtils.lerp(current.current.elbow,         target.elbow + idleB,         spd);
    current.current.wrist         = MathUtils.lerp(current.current.wrist,         target.wrist + idleA * 0.7,   spd);
    current.current.gripperSpread = MathUtils.lerp(current.current.gripperSpread, target.gripperSpread,          spd * 1.6);

    if (baseRotRef.current)
      baseRotRef.current.rotation.y = MathUtils.degToRad(current.current.baseY);
    if (shoulderRef.current)
      shoulderRef.current.rotation.z = MathUtils.degToRad(current.current.shoulder);
    if (elbowRef.current)
      elbowRef.current.rotation.z = MathUtils.degToRad(current.current.elbow);
    if (wristRef.current)
      wristRef.current.rotation.z = MathUtils.degToRad(current.current.wrist);

    const spread = current.current.gripperSpread * 0.3;
    if (fingerLRef.current) fingerLRef.current.position.x = -0.18 - spread;
    if (fingerRRef.current) fingerRRef.current.position.x =  0.18 + spread;
  });

  return (
    <group position={[0, -2.1, 0]}>
      {/* Base plate */}
      <mesh material={matBase} receiveShadow castShadow>
        <cylinderGeometry args={[1.6, 1.9, 0.35, 32]} />
      </mesh>

      {/* Bronze accent ring */}
      <mesh material={matJointBronze} position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.25, 0.055, 16, 64]} />
      </mesh>

      {/* Base rotation (Y) */}
      <group ref={baseRotRef} position={[0, 0.18, 0]}>
        {/* Turret */}
        <mesh material={matArm} castShadow position={[0, 0.52, 0]}>
          <cylinderGeometry args={[0.58, 0.74, 1.0, 16]} />
        </mesh>

        {/* Turret top ring */}
        <mesh material={matJointBronze} position={[0, 1.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.44, 0.038, 8, 32]} />
        </mesh>

        {/* Shoulder joint */}
        <mesh material={matJointBronze} castShadow position={[0, 1.15, 0]}>
          <sphereGeometry args={[0.52, 32, 32]} />
        </mesh>

        {/* Shoulder rotation (Z) */}
        <group ref={shoulderRef} position={[0, 1.15, 0]}>
          {/* Upper arm */}
          <mesh material={matArm} castShadow position={[0, 1.45, 0]}>
            <cylinderGeometry args={[0.27, 0.38, 2.9, 16]} />
          </mesh>

          {/* Cable guide */}
          <mesh material={matBase} castShadow position={[0.28, 1.45, 0]}>
            <cylinderGeometry args={[0.055, 0.055, 2.4, 8]} />
          </mesh>

          {/* Elbow flange */}
          <mesh material={matArm} castShadow position={[0, 2.95, 0]}>
            <cylinderGeometry args={[0.48, 0.38, 0.2, 16]} />
          </mesh>

          {/* Elbow joint */}
          <mesh material={matJointBronze} castShadow position={[0, 3.08, 0]}>
            <sphereGeometry args={[0.42, 32, 32]} />
          </mesh>

          {/* Elbow rotation (Z) */}
          <group ref={elbowRef} position={[0, 3.08, 0]}>
            {/* Forearm */}
            <mesh material={matArm} castShadow position={[0, 1.12, 0]}>
              <cylinderGeometry args={[0.21, 0.30, 2.24, 16]} />
            </mesh>

            {/* Forearm cable guide */}
            <mesh material={matBase} castShadow position={[0.22, 1.12, 0]}>
              <cylinderGeometry args={[0.046, 0.046, 1.9, 8]} />
            </mesh>

            {/* Wrist flange */}
            <mesh material={matArm} castShadow position={[0, 2.28, 0]} rotation={[0, 0, Math.PI]}>
              <cylinderGeometry args={[0.36, 0.27, 0.18, 16]} />
            </mesh>

            {/* Wrist joint (taupe accent) */}
            <mesh material={matJointTaupe} castShadow position={[0, 2.42, 0]}>
              <sphereGeometry args={[0.3, 32, 32]} />
            </mesh>

            {/* Wrist rotation (Z) */}
            <group ref={wristRef} position={[0, 2.42, 0]}>
              {/* Wrist link */}
              <mesh material={matArm} castShadow position={[0, 0.3, 0]}>
                <boxGeometry args={[0.52, 0.52, 0.4]} />
              </mesh>

              {/* Gripper palm */}
              <mesh material={matArm} castShadow position={[0, 0.7, 0]}>
                <boxGeometry args={[0.7, 0.26, 0.42]} />
              </mesh>

              {/* Left finger */}
              <group ref={fingerLRef} position={[-0.18, 0.7, 0]}>
                <mesh material={matGripper} castShadow position={[0, 0.38, 0]}>
                  <boxGeometry args={[0.16, 0.55, 0.18]} />
                </mesh>
                <mesh material={matJointBronze} position={[0, 0.68, 0]}>
                  <sphereGeometry args={[0.065, 12, 12]} />
                </mesh>
              </group>

              {/* Right finger */}
              <group ref={fingerRRef} position={[0.18, 0.7, 0]}>
                <mesh material={matGripper} castShadow position={[0, 0.38, 0]}>
                  <boxGeometry args={[0.16, 0.55, 0.18]} />
                </mesh>
                <mesh material={matJointBronze} position={[0, 0.68, 0]}>
                  <sphereGeometry args={[0.065, 12, 12]} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
