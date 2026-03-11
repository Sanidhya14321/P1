"use client";
import React from 'react';
import { Scene } from './Camera/Scene';
import { DepthLayer } from './Camera/DepthLayer';

export const ProjectsFeaturedScene: React.FC = () => {
  return (
    <Scene 
      id="projects-featured-scene"
      ariaLabel="Featured Projects"
      timelineRange={[0.6, 0.75]} 
      cameraScript={{ z: 200, rotateY: 15 }}
    >
      <DepthLayer baseZ={-3000} style={{ transform: 'translateY(1500px)' }}>
        
        <div className="w-full flex flex-col items-center">
          
          <div className="bg-nb-text text-nb-bg px-8 py-4 nb-border inline-block mb-16 transform -rotate-2">
            <h2 className="text-3xl md:text-5xl nb-heading tracking-widest">FEATURED W0RK</h2>
          </div>

          <div className="relative w-full max-w-5xl h-[60vh] flex items-center justify-center">
            
            {/* Background Project */}
            <div className="absolute inset-0 max-w-2xl mx-auto top-10 bg-nb-surface nb-border-thick blur-[8px] opacity-70 transform scale-90 pointer-events-none cursor-default grayscale flex items-center justify-center">
                <span className="text-6xl nb-heading opacity-10">ARCHIVE 02</span>
            </div>

            {/* Foreground Project */}
            <div className="relative z-10 w-full max-w-4xl bg-nb-accent-2 nb-border-thick p-2 md:p-4 nb-shadow-lg transform hover:scale-105 transition-all duration-500 cursor-pointer group">
              <div className="bg-nb-surface w-full h-[40vh] border-2 border-nb-text overflow-hidden relative">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 mix-blend-multiply" />
              </div>
              <div className="p-6 md:p-8 bg-nb-surface mt-2 border-2 border-nb-text flex justify-between items-end">
                <div>
                  <span className="text-nb-accent-1 font-bold text-lg mb-2 block uppercase tracking-wide">E-Commerce</span>
                  <h3 className="text-4xl nb-heading">STARK SUPPLY CO.</h3>
                </div>
                <button className="bg-nb-bg text-nb-text px-6 py-3 font-bold nb-border hover:bg-nb-accent-1 hover:text-white transition-colors">
                  VIEW CASE →
                </button>
              </div>
            </div>

          </div>

        </div>

      </DepthLayer>
    </Scene>
  );
};
