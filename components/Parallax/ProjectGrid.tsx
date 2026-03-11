"use client";
import React, { useRef, useState, useEffect } from 'react';
import { ParallaxSection } from './ParallaxSection';
import { gsap } from 'gsap';

const projects = [
  { id: 1, title: 'Project Alpha', category: 'Web App', depthMultiplier: 0.85, depthIndex: 2 },
  { id: 2, title: 'Project Beta', category: 'E-Commerce', depthMultiplier: 0.95, depthIndex: 3 },
  { id: 3, title: 'Project Gamma', category: 'Marketing', depthMultiplier: 0.8, depthIndex: 1 },
  { id: 4, title: 'Project Delta', category: 'Portfolio', depthMultiplier: 0.9, depthIndex: 4 },
];

export const ProjectGrid: React.FC = () => {
  return (
    <ParallaxSection mode="both" height="auto" className="py-32 px-4 md:px-12 bg-surface-1 min-h-[120vh]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-32 text-text-primary depth-layer" data-speed="0.8" data-depth="1">
          Featured Work
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
          {projects.map((project, idx) => (
            <div 
              key={project.id} 
              className="depth-layer w-full h-full" 
              data-speed={project.depthMultiplier} 
              data-depth={project.depthIndex}
            >
              <ProjectCard project={project} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
};

const ProjectCard: React.FC<{ project: any, index: number }> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPct = (x / rect.width - 0.5) * 2; // -1 to 1
    const yPct = (y / rect.height - 0.5) * 2; // -1 to 1

    gsap.to(cardRef.current, {
      rotateY: xPct * 8, // ±8 degrees
      rotateX: -yPct * 8, // ±8 degrees
      z: 40,
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion || !cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      z: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power3.out',
    });
  };

  return (
    <div 
      ref={cardRef}
      className="relative group cursor-pointer transition-shadow duration-500 ease-out preserve-3d"
      style={{ marginTop: index % 2 !== 0 ? '6rem' : '0' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card Background / Shadow layer */}
      <div className="absolute inset-0 bg-bg rounded-2xl shadow-xl transition-shadow duration-500 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]" />
      
      {/* Inner Shadow overlay */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all z-20 pointer-events-none" />

      {/* Card Content layer */}
      <div className="relative z-10 p-8 h-96 flex flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-t from-black/80 to-transparent translate-z-10">
        <div className="absolute inset-0 bg-muted/20 w-full h-full object-cover -z-10 group-hover:scale-110 transition-transform duration-700 ease-out" />
        <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-2 block translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          {project.category}
        </span>
        <h3 className="text-3xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
          {project.title}
        </h3>
      </div>
    </div>
  );
};
