"use client";
import React, { useRef, useLayoutEffect } from 'react';
import { useCamera } from './CameraWrapper';
import { gsap } from 'gsap';

export interface SceneTransitionProps {
  type: 'blur-forward' | 'fade-slide' | 'yaw-turn';
  timelineRange: [number, number]; 
  children?: React.ReactNode;
}

export const SceneTransition: React.FC<SceneTransitionProps> = ({ 
  type, 
  timelineRange,
  children
}) => {
  const { masterTl, prefersReducedMotion } = useCamera();
  const transRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion || !masterTl || !transRef.current) return;

    const startProgress = timelineRange[0];

    if (type === 'blur-forward') {
      masterTl.to(transRef.current, {
        scale: 3,
        autoAlpha: 0,
        filter: 'blur(20px)',
        ease: 'power2.in'
      }, startProgress);
    }
  }, [masterTl, timelineRange, type, prefersReducedMotion]);

  if (prefersReducedMotion) return <>{children}</>;

  return (
    <div ref={transRef} className="absolute inset-0 preserve-3d pointer-events-none z-50">
      {children}
    </div>
  );
};
