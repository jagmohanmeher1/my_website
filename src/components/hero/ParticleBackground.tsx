'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Particle = {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
};

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducedMotion(mq.matches);
    setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const particleCount = useMemo(() => {
    // Keep it lightweight for a portfolio landing page.
    return 90;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 1;
    let height = 1;

    const particles: Particle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Draw in CSS pixel units.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seedParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 0.8,
          vx: (Math.random() * 2 - 1) * 0.9,
          vy: (Math.random() * 2 - 1) * 0.9,
          opacity: Math.random() * 0.45 + 0.15
        });
      }
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      // Particles + connection lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // Update
        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x > width) p.x = 0;
          if (p.x < 0) p.x = width;
          if (p.y > height) p.y = 0;
          if (p.y < 0) p.y = height;
        }

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
        ctx.fill();
      }

      // Connections (skip in reduced motion to reduce CPU)
      if (!reducedMotion) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 150) {
              const alpha = 0.22 * (1 - dist / 150);
              ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }
    };

    const animate = () => {
      drawFrame();
      rafRef.current = window.requestAnimationFrame(animate);
    };

    resize();
    seedParticles();

    // Reduced motion: draw once and stop animating.
    if (reducedMotion) {
      drawFrame();
      return;
    }

    rafRef.current = window.requestAnimationFrame(animate);

    window.addEventListener('resize', resize);

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [particleCount, reducedMotion]);

  return <canvas ref={canvasRef} className="heroCanvas" aria-hidden="true" />;
}

