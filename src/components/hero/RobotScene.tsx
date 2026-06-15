'use client';

import { useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import RobotArm3D from './RobotArm3D';

// Floating ambient particles
function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 180;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      // cyan to purple gradient based on height
      const t = (pos[i * 3 + 1] + 6) / 12;
      col[i * 3 + 0] = THREE.MathUtils.lerp(0.0,  0.51, t);
      col[i * 3 + 1] = THREE.MathUtils.lerp(0.83, 0.22, t);
      col[i * 3 + 2] = THREE.MathUtils.lerp(1.0,  0.93, t);
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
    size: 0.045,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
  }), []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.018;
      pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.008) * 0.06;
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
      {/* Lighting setup for metallic arm */}
      <ambientLight intensity={0.22} />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* Cyan rim light */}
      <pointLight position={[4, 6, 5]}  intensity={3.0} color="#00d4ff" distance={20} />
      {/* Purple fill light */}
      <pointLight position={[-5, 3, -4]} intensity={2.5} color="#8338ec" distance={18} />
      {/* Warm uplight for depth */}
      <pointLight position={[0, -2, 4]}  intensity={0.8} color="#1a4060" distance={12} />

      <Suspense fallback={null}>
        <RobotArm3D scrollProgress={scrollProgress} />
        <FloatingParticles />
        <ContactShadows
          position={[0, -2.08, 0]}
          opacity={0.55}
          scale={12}
          blur={2.5}
          far={5}
          color="#00d4ff"
        />
      </Suspense>

      {/* Subtle floor grid */}
      <gridHelper args={[22, 22, '#0a2a3a', '#071a25']} position={[0, -2.1, 0]} />
    </Canvas>
  );
}
