"use client";
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ParallaxSectionProps {
  mode?: 'scroll' | 'cursor' | 'both';
  children: React.ReactNode;
  height?: string;
  className?: string;
  pinned?: boolean;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  mode = 'scroll', 
  children, 
  height = '100vh',
  className = '',
  pinned = false
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // For mouse move camera dolly effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (mode === 'scroll') return;
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 2; // -1 to 1
    const y = (clientY / window.innerHeight - 0.5) * 2; // -1 to 1

    gsap.to(containerRef.current, {
      rotateY: x * 3,
      rotateX: -y * 3,
      duration: 1.5,
      ease: 'power3.out'
    });
  };

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (!sectionRef.current) return;

    if (mode === 'scroll' || mode === 'both') {
      const layers = gsap.utils.toArray('.depth-layer', sectionRef.current) as HTMLElement[];

      layers.forEach((layer) => {
        const speed = parseFloat(layer.getAttribute('data-speed') || '1');
        const depth = parseInt(layer.getAttribute('data-depth') || '0', 10);
        
        // Micro parallax offset calculation (5-30px equivalents)
        const offsetRange = 150; // max shift total

        gsap.fromTo(layer, 
          { y: () => -1 * (1 - speed) * offsetRange },
          {
            y: () => (1 - speed) * offsetRange,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );

        // Add subtle DOM 3D Z translation
        gsap.set(layer, { z: depth * 10 });
      });

      if (pinned) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=70%',
          pin: true,
          scrub: true,
        });
      }
    }
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className={`parallax-section relative overflow-hidden preserve-3d perspective-container ${className}`}
      style={{ height }}
    >
      <div ref={containerRef} className="w-full h-full preserve-3d">
        {children}
      </div>
    </section>
  );
};
