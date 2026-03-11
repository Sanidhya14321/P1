"use client";
import React, { useLayoutEffect, useRef } from 'react';
import { useCamera } from './CameraWrapper';
import { gsap } from 'gsap';

export interface SceneProps {
  id: string;
  children: React.ReactNode;
  timelineRange: [number, number];
  cameraScript?: {
    z?: number;
    y?: number;
    rotateY?: number;
    rotateX?: number;
  };
  ariaLabel: string;
}

export const Scene: React.FC<SceneProps> = ({ 
  id, 
  children, 
  timelineRange,
  cameraScript,
  ariaLabel
}) => {
  const { masterTl, cameraRef, prefersReducedMotion } = useCamera();
  const sceneRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion || !masterTl || !cameraRef?.current || !sceneRef.current) return;

    const startProgress = timelineRange[0];
    
    if (cameraScript) {
      masterTl.to(cameraRef.current, {
        z: cameraScript.z !== undefined ? `+=${cameraScript.z}` : "+=0",
        y: cameraScript.y !== undefined ? `+=${cameraScript.y}` : "+=0",
        rotateY: cameraScript.rotateY !== undefined ? `+=${cameraScript.rotateY}` : "+=0",
        rotateX: cameraScript.rotateX !== undefined ? `+=${cameraScript.rotateX}` : "+=0",
        ease: 'none',
      }, startProgress);
    }
  }, [masterTl, cameraRef, cameraScript, timelineRange, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <section 
        id={id} 
        aria-label={ariaLabel}
        className="w-full min-h-screen py-24 relative"
      >
        {children}
      </section>
    );
  }

  return (
    <section 
      ref={sceneRef}
      id={id} 
      aria-label={ariaLabel}
      className="absolute inset-0 w-full h-full preserve-3d flex items-center justify-center scene-wrapper"
    >
      <div className="w-full max-w-7xl px-8 h-full preserve-3d relative">
         {children}
      </div>
    </section>
  );
};
