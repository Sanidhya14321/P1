"use client";
import React from 'react';
import { Scene } from './Camera/Scene';
import { DepthLayer } from './Camera/DepthLayer';

export const SkillsScene: React.FC = () => {
  return (
    <Scene 
      id="skills-scene"
      ariaLabel="Technical Skills"
      timelineRange={[0.4, 0.6]} 
      cameraScript={{ y: 800, rotateY: -15, z: 800 }} 
    >
      <DepthLayer baseZ={-2500} style={{ transform: 'translateY(1500px)' }}>
        
        <div className="flex flex-col items-center max-w-7xl mx-auto w-full">
          <h2 className="text-6xl md:text-8xl nb-heading mb-32 text-center text-nb-bg" style={{ WebkitTextStroke: '2px var(--nb-text)' }}>
            THE TOOLKIT
          </h2>

           <div className="relative w-full h-[600px] preserve-3d">
              {/* Skill 1: Closest */}
              <div 
                className="absolute left-10 top-0 bg-nb-accent-1 nb-border p-8 nb-shadow-lg w-72"
                style={{ transform: 'translateZ(-500px) rotateY(15deg)' }}
              >
                <h3 className="text-3xl font-bold mb-4 nb-heading">DOM & CSS</h3>
                <ul className="text-lg font-medium space-y-2 border-l-4 border-nb-text pl-4">
                   <li>CSS 3D Transforms</li>
                   <li>Tailwind + Modules</li>
                   <li>Performance Audits</li>
                </ul>
              </div>

              {/* Skill 2: Mid */}
              <div 
                className="absolute right-[10%] top-32 bg-nb-surface nb-border p-8 nb-shadow-lg w-72"
                style={{ transform: 'translateZ(-1000px) rotateY(-10deg)' }}
              >
                <h3 className="text-3xl font-bold mb-4 nb-heading">TypeScript & React</h3>
                <ul className="text-lg font-medium space-y-2 border-l-4 border-nb-accent-1 pl-4">
                   <li>Component Architecture</li>
                   <li>App Router / SSR</li>
                   <li>Framer & GSAP</li>
                </ul>
              </div>

              {/* Skill 3: Farthest */}
              <div 
                className="absolute left-[30%] top-72 bg-nb-accent-3 text-nb-text nb-border p-8 nb-shadow-lg w-72"
                style={{ transform: 'translateZ(-1500px) rotateY(5deg)' }}
              >
                <h3 className="text-3xl font-bold mb-4 nb-heading">Systems</h3>
                <ul className="text-lg font-medium space-y-2 border-l-4 border-nb-text pl-4">
                   <li>Design Tokenization</li>
                   <li>Monorepos</li>
                   <li>CI/CD Pipelines</li>
                </ul>
              </div>
           </div>
        </div>

      </DepthLayer>
    </Scene>
  );
};
