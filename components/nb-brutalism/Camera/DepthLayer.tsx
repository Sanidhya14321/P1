"use client";
import React, { useRef, useLayoutEffect } from 'react';
import { useCamera } from './CameraWrapper';
import { gsap } from 'gsap';

export interface MotionProfile {
  zMultiplier?: number;
  yMultiplier?: number;
  initialBlur?: number;
}

export interface DepthLayerProps {
  children: React.ReactNode;
  baseZ?: number;
  motionProfile?: MotionProfile;
  className?: string;
  style?: React.CSSProperties;
}

export const DepthLayer: React.FC<DepthLayerProps> = ({ 
  children, 
  baseZ = 0,
  motionProfile,
  className = '',
  style
}) => {
  const { masterTl, cameraRef, prefersReducedMotion } = useCamera();
  const layerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion || !masterTl || !cameraRef?.current || !layerRef.current || !motionProfile) return;

    if (motionProfile.yMultiplier) {
       gsap.to(layerRef.current, {
         y: `+=${500 * motionProfile.yMultiplier}`,
         ease: 'none',
         scrollTrigger: {
           trigger: layerRef.current,
           scrub: true
         }
       });
    }
  }, [masterTl, cameraRef, motionProfile, prefersReducedMotion]);

  const baseTransform = prefersReducedMotion 
    ? 'none' 
    : `translateZ(${baseZ}px) scale(${baseZ < 0 ? 1 + (Math.abs(baseZ)/1500) : 1}) relative z-10`;

  const filterStyle = (!prefersReducedMotion && motionProfile?.initialBlur) 
    ? `blur(${motionProfile.initialBlur}px)` 
    : 'none';

  return (
    <div 
      ref={layerRef}
      className={`preserve-3d ${!prefersReducedMotion && 'absolute inset-0'} ${className}`}
      style={{ 
        transform: baseTransform,
        filter: filterStyle,
        ...style 
      }}
    >
      {children}
    </div>
  );
};
