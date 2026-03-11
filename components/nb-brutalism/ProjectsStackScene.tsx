"use client";
import React, { useRef, useLayoutEffect } from 'react';
import { Scene } from './Camera/Scene';
import { DepthLayer } from './Camera/DepthLayer';
import { gsap } from 'gsap';
import { useCamera } from './Camera/CameraWrapper';

export const ProjectsStackScene: React.FC = () => {
  const { masterTl, prefersReducedMotion } = useCamera();
  const stackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion || !masterTl || !stackRef.current) return;

    if (!prefersReducedMotion) {
       gsap.to(stackRef.current, {
         xPercent: -50,
         ease: 'none',
         scrollTrigger: {
           trigger: stackRef.current,
           start: 'top top',
           end: '+=200%',
           scrub: true
         }
       });
    }
  }, [masterTl, prefersReducedMotion]);

  return (
    <Scene 
      id="projects-stack-scene"
      ariaLabel="All Projects Archive"
      timelineRange={[0.75, 0.9]} 
      cameraScript={{ rotateY: -90, z: 0 }} 
    >
      <DepthLayer baseZ={-3000} style={{ transform: 'translateY(1500px) translateX(2000px)' }}>
        
        <div className="flex flex-col items-start w-full ml-32">
          
          <h2 className="text-4xl nb-heading mb-12 bg-nb-accent-1 text-nb-text px-4 py-2 nb-border transform rotate-2">
            THE ARCHIVE
          </h2>

          <div className="w-full overflow-visible relative h-[60vh] perspective-camera">
            
             <div ref={stackRef} className="flex gap-16 absolute left-0 top-0 h-full items-center preserve-3d whitespace-nowrap px-32">
               
               {[1, 2, 3, 4, 5].map((i) => (
                 <button 
                  key={i}
                  className="w-80 h-96 bg-nb-surface nb-border-thick nb-shadow flex-shrink-0 flex flex-col items-start justify-between p-6 transform transition-transform hover:-translate-y-4 focus:outline-none focus:ring-4 focus:ring-nb-accent-1 text-left relative overflow-hidden group"
                 >
                   <div className="absolute inset-0 bg-nb-text opacity-0 group-hover:opacity-10 transition-opacity" />
                   <span className="font-bold text-nb-accent-1 tracking-widest text-sm uppercase">Prototype 0{i}</span>
                   <h3 className="text-3xl nb-heading whitespace-normal">System<br/>Architecture</h3>
                   <div className="w-full flex justify-end">
                      <span className="bg-nb-text text-nb-bg px-3 py-1 text-sm font-bold">202{6-i}</span>
                   </div>
                 </button>
               ))}

             </div>

          </div>

        </div>

      </DepthLayer>
    </Scene>
  );
};
