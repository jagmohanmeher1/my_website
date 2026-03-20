'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

export default function RobotVisual() {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const robotRef = useRef<HTMLDivElement | null>(null);

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducedMotion(mq.matches);
    setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const motionCaps = useMemo(() => {
    // Keep motion subtle and bounded for comfort.
    return { rotateX: 7.5, rotateY: 10 };
  }, []);

  const resetTransform = () => {
    const robot = robotRef.current;
    if (!robot) return;
    robot.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  useEffect(() => {
    resetTransform();
    // Ensure no lingering transform when reduced motion toggles.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <div
      ref={frameRef}
      className="robotStage"
      aria-hidden="true"
      onPointerMove={(e) => {
        if (reducedMotion) return;
        if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
        const container = frameRef.current;
        const robot = robotRef.current;
        if (!container || !robot) return;

        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width; // 0..1
        const y = (e.clientY - rect.top) / rect.height; // 0..1

        const rotateX = (0.5 - y) * motionCaps.rotateX; // invert Y
        const rotateY = (x - 0.5) * motionCaps.rotateY;

        robot.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(
          2
        )}deg) translateY(-8px)`;
      }}
      onPointerLeave={() => {
        resetTransform();
      }}
      style={{ width: '100%' }}
    >
      <div className="robotFrame">
        <div
          ref={robotRef}
          className={reducedMotion ? 'robot robot--reduced' : 'robot'}
          style={{ willChange: 'transform' }}
        >
          <div className="robotHead">
            <div className="robotEye left" />
            <div className="robotEye right" />
          </div>
          <div className="robotBody">
            <div className="robotCore" />
          </div>
          <div className="robotArm left" />
          <div className="robotArm right" />
        </div>
      </div>
    </div>
  );
}

