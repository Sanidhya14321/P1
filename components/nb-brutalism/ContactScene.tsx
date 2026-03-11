"use client";
import React from 'react';
import { Scene } from './Camera/Scene';
import { DepthLayer } from './Camera/DepthLayer';

export const ContactScene: React.FC = () => {
  return (
    <Scene 
      id="contact-scene"
      ariaLabel="Contact and Finish"
      timelineRange={[0.9, 1.0]} 
      cameraScript={{ rotateY: 90, y: -800, z: 500 }} 
    >
      <DepthLayer baseZ={-3000} style={{ transform: 'translateY(2500px) translateX(2000px)' }}>
        
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center">
          
          <h2 className="text-6xl nb-heading mb-8">INITIATE<br/>CONNECTION</h2>
          
          <div className="w-full bg-nb-surface nb-border-thick p-8 nb-shadow-lg text-left relative z-10 preserve-3d hover:-translate-y-2 transition-transform duration-300">
            <form className="space-y-6 flex flex-col">
              
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider block">Identification</label>
                <input 
                  type="text" 
                  placeholder="NAME / ALIAS"
                  className="w-full bg-nb-bg nb-border p-4 text-nb-text focus:outline-none focus:ring-4 focus:ring-nb-accent-2 transition-all focus:-translate-y-1 nb-shadow-sm font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider block">Transmission</label>
                <textarea 
                  rows={4}
                  className="w-full bg-nb-bg nb-border p-4 text-nb-text focus:outline-none focus:ring-4 focus:ring-nb-accent-2 transition-all focus:-translate-y-1 nb-shadow-sm font-mono resize-none"
                  placeholder="ENTER DATA..."
                />
              </div>
              
              <button 
                type="button" 
                className="w-full py-4 bg-nb-accent-1 text-nb-text font-bold text-xl uppercase tracking-widest nb-border nb-shadow-hover hover:-translate-y-1 transition-all active:translate-y-1 active:shadow-none"
              >
                Transmit
              </button>
            </form>
          </div>

          <div className="mt-24 pb-32">
            <div className="text-xl font-bold tracking-widest text-nb-accent-3 nb-border bg-nb-text px-8 py-3 uppercase">
              // End of Sequence
            </div>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-8 underline font-bold text-lg hover:text-nb-accent-1 transition-colors"
            >
              [ RESTART SEQUENCE ]
            </button>
          </div>

        </div>

      </DepthLayer>
    </Scene>
  );
};
