"use client";
import React from 'react';
import { Scene } from './Camera/Scene';
import { DepthLayer } from './Camera/DepthLayer';

export const AboutScene: React.FC = () => {
  return (
    <Scene 
      id="about-scene"
      ariaLabel="About Me"
      timelineRange={[0.2, 0.4]} 
      cameraScript={{ z: 500, y: -400 }}
    >
      <DepthLayer baseZ={-1500}>
         <div className="flex flex-col md:flex-row h-full items-center justify-center gap-12 px-8">
            
            <div className="flex-1 max-w-xl">
              <div className="bg-nb-surface nb-border-thick p-12 nb-shadow-lg relative">
                <div className="absolute -top-6 -left-6 bg-nb-accent-3 text-nb-text font-bold px-6 py-2 text-2xl nb-border transform -rotate-6">
                  01
                </div>
                <h2 className="text-4xl md:text-6xl nb-heading mb-6">About the Architect</h2>
                <p className="text-xl font-medium leading-relaxed mb-6">
                  Specializing in brutally stark, highly performant web interfaces. I build tools and experiences that prioritize direct interaction over soft gradients.
                </p>
                <button className="bg-nb-text text-nb-bg font-bold text-lg px-8 py-4 nb-shadow-hover hover:-translate-y-1 hover:-translate-x-1 transition-transform nb-border">
                  Read Manifesto
                </button>
              </div>
            </div>

            <div className="flex-1 w-full max-w-md aspect-square bg-nb-accent-2 nb-border-thick nb-shadow-lg relative overflow-hidden group">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply grayscale transition-transform duration-700 group-hover:scale-110" />
               <div className="absolute inset-0 bg-nb-accent-2 opacity-50 mix-blend-screen" />
            </div>

         </div>
      </DepthLayer>
    </Scene>
  );
};
