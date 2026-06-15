'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { HumanoidRobot, RoverRobot, QuadrupedRobot } from './RobotModels';

interface Props {
  active: 'humanoid' | 'rover' | 'quadruped';
}

export default function ShowcaseCanvas({ active }: Props) {
  return (
    <Canvas
      camera={{ position: [4, 2.5, 5.5], fov: 45 }}
      shadows
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
    >
      {/* Warm studio lights */}
      <ambientLight intensity={0.9} color="#FFF6E9" />
      <directionalLight
        position={[6, 10, 5]}
        intensity={1.4}
        color="#FFF3E0"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-5, 4, -3]} intensity={1.0} color="#C0986B" distance={18} />
      <pointLight position={[3, 2, 6]}  intensity={0.8} color="#FFFFFF" distance={16} />

      <Suspense fallback={null}>
        {active === 'humanoid'  && <HumanoidRobot />}
        {active === 'rover'     && <RoverRobot />}
        {active === 'quadruped' && <QuadrupedRobot />}

        <ContactShadows
          position={[0, -1.6, 0]}
          opacity={0.28}
          scale={10}
          blur={2.6}
          far={4}
          color="#5E5345"
        />
      </Suspense>

      <OrbitControls
        enablePan={false}
        minDistance={3.5}
        maxDistance={9}
        autoRotate
        autoRotateSpeed={0.8}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.9}
        target={[0, 0.4, 0]}
      />
    </Canvas>
  );
}
