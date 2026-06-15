'use client';

import { useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import RobotArm3D from './RobotArm3D';

// Soft warm dust motes
function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 110;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      // Warm bronze to taupe
      const t = Math.random();
      col[i * 3 + 0] = THREE.MathUtils.lerp(0.65, 0.49, t);
      col[i * 3 + 1] = THREE.MathUtils.lerp(0.49, 0.44, t);
      col[i * 3 + 2] = THREE.MathUtils.lerp(0.32, 0.37, t);
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
    size: 0.04,
    vertexColors: true,
    transparent: true,
    opacity: 0.4,
    sizeAttenuation: true,
  }), []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.015;
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
      {/* Warm studio lighting */}
      <ambientLight intensity={1.05} color="#FFF6E9" />
      <directionalLight
        position={[8, 14, 6]}
        intensity={1.5}
        color="#FFF3E0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* Bronze key accent */}
      <pointLight position={[4, 6, 5]}  intensity={1.8} color="#C0986B" distance={18} />
      {/* Taupe fill */}
      <pointLight position={[-5, 3, -4]} intensity={1.1} color="#9A8C7A" distance={14} />
      {/* Soft top fill */}
      <pointLight position={[0, 10, 2]}  intensity={0.7} color="#FFFFFF" distance={20} />

      <Suspense fallback={null}>
        <RobotArm3D scrollProgress={scrollProgress} />
        <FloatingParticles />
        <ContactShadows
          position={[0, -2.08, 0]}
          opacity={0.22}
          scale={12}
          blur={3}
          far={5}
          color="#5E5345"
        />
      </Suspense>

      {/* Warm beige floor grid */}
      <gridHelper args={[22, 22, '#D8CDB5', '#E8E0D0']} position={[0, -2.1, 0]} />
    </Canvas>
  );
}
