"use client";
import React, { useRef, useLayoutEffect, createContext, useContext } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Provide the master timeline and container ref to child scenes
interface CameraContextType {
  masterTl: gsap.core.Timeline | null;
  cameraRef: React.MutableRefObject<HTMLDivElement | null> | null;
  prefersReducedMotion: boolean;
}

export const CameraContext = createContext<CameraContextType>({ 
  masterTl: null, 
  cameraRef: null,
  prefersReducedMotion: false
});

export const useCamera = () => useContext(CameraContext);

export interface CameraWrapperProps {
  children: React.ReactNode;
}

export const CameraWrapper: React.FC<CameraWrapperProps> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    tlRef.current = masterTl;

    return () => {
      masterTl.kill();
    };
  }, []);

  const prefersReducedMotion = typeof window !== 'undefined' ? 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  return (
    <div 
      ref={scrollContainerRef} 
      className="relative w-full min-h-[500vh] bg-nb-bg text-nb-text"
      id="scrollable-document-height"
    >
      {!prefersReducedMotion && <div className="curtain-frame" aria-hidden="true" />}
      
      <div 
        ref={wrapperRef} 
        className={prefersReducedMotion ? "" : "fixed inset-0 w-full h-full overflow-hidden perspective-camera pointer-events-none"}
      >
        <div 
          ref={cameraRef} 
          className={prefersReducedMotion ? "w-full h-full" : "w-full h-full preserve-3d pointer-events-auto"}
          style={{ transformOrigin: 'center center' }}
        >
          <CameraContext.Provider value={{
            masterTl: tlRef.current,
            cameraRef,
            prefersReducedMotion
          }}>
            {children}
          </CameraContext.Provider>
        </div>
      </div>
    </div>
  );
};
