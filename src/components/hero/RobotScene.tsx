'use client';

import { useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import RobotArm3D from './RobotArm3D';

// Subtle floating particles — very light on white background
function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      // Blue to purple gradient
      const t = Math.random();
      col[i * 3 + 0] = THREE.MathUtils.lerp(0.15, 0.49, t);
      col[i * 3 + 1] = THREE.MathUtils.lerp(0.39, 0.23, t);
      col[i * 3 + 2] = THREE.MathUtils.lerp(0.92, 0.93, t);
    }
    return { positions: pos, colors: col };
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    g.setAttribute('color',    new THREE.Float32BufferAttribute(colors, 3));
    return g;
  }, [positions, colors]);

  const mat = useMemo(() => new THREE.PointsMaterial({
    size: 0.042,
    vertexColors: true,
    transparent: true,
    opacity: 0.35,
    sizeAttenuation: true,
  }), []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.016;
    }
  });

  return <points ref={pointsRef} geometry={geo} material={mat} />;
}

interface Props {
  style?: React.CSSProperties;
}

export default function RobotScene({ style }: Props) {
  const scrollProgress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('hero-section');
      if (!heroEl) return;
      const scrollRange = heroEl.offsetHeight - window.innerHeight;
      if (scrollRange <= 0) return;
      scrollProgress.current = Math.max(0, Math.min(1, window.scrollY / scrollRange));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Canvas
      camera={{ position: [4, 1.5, 6.5], fov: 48 }}
      shadows
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', ...style }}
    >
      {/* Bright professional lighting for white background */}
      <ambientLight intensity={1.0} color="#f0f4ff" />
      <directionalLight
        position={[8, 14, 6]}
        intensity={1.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* Blue key accent */}
      <pointLight position={[4, 6, 5]}  intensity={2.0} color="#2563eb" distance={18} />
      {/* Purple fill */}
      <pointLight position={[-5, 3, -4]} intensity={1.2} color="#7c3aed" distance={14} />
      {/* Soft top fill */}
      <pointLight position={[0, 10, 2]}  intensity={0.8} color="#ffffff"  distance={20} />

      <Suspense fallback={null}>
        <RobotArm3D scrollProgress={scrollProgress} />
        <FloatingParticles />
        <ContactShadows
          position={[0, -2.08, 0]}
          opacity={0.18}
          scale={12}
          blur={3}
          far={5}
          color="#2563eb"
        />
      </Suspense>

      {/* Very subtle floor grid */}
      <gridHelper args={[22, 22, '#d1d5db', '#e5e7eb']} position={[0, -2.1, 0]} />
    </Canvas>
  );
}
