"use client";
import React from 'react';
import { Scene } from './Camera/Scene';
import { DepthLayer } from './Camera/DepthLayer';
import { SceneTransition } from './Camera/SceneTransition';

export const HeroScene: React.FC = () => {
  return (
    <Scene 
      id="hero-scene"
      ariaLabel="Introduction and Hero"
      timelineRange={[0.0, 0.2]} 
      cameraScript={{ z: 1000 }}
    >
      {/* Background Layer: Slow drift */}
      <DepthLayer baseZ={-800} motionProfile={{ yMultiplier: 0.1 }}>
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center opacity-30">
          <div className="w-[80vw] h-[80vh] border-[24px] border-nb-accent-1 rotate-12 nb-shadow-lg" />
        </div>
      </DepthLayer>

      {/* Mid Layer: Large Typography */}
      <DepthLayer baseZ={-300}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="text-[12vw] nb-heading text-nb-bg" style={{ WebkitTextStroke: '4px var(--nb-text)' }}>
            DIGITAL
          </h1>
        </div>
      </DepthLayer>

      {/* Foreground Layer: Main UI */}
      <DepthLayer baseZ={0}>
        <div className="flex flex-col items-center justify-center h-full pt-32 px-4">
          <div className="bg-nb-surface nb-border-thick p-8 md:p-16 nb-shadow-lg max-w-4xl text-center transform -rotate-2 hover:rotate-0 transition-transform duration-300">
            <span className="inline-block bg-nb-accent-2 text-nb-text font-bold px-4 py-2 text-xl mb-6 uppercase tracking-widest nb-border">
              Portfolio
            </span>
            <h2 className="text-5xl md:text-7xl nb-heading mb-8">
              Neo-Brutalist<br />Camera Journey
            </h2>
            <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto border-l-8 border-nb-accent-1 pl-6 text-left">
              An immersive, guided scroll experience built without WebGL. Bold aesthetics, strict camera choreography.
            </p>
          </div>
          
          <div className="mt-16 animate-bounce">
            <span className="text-sm font-bold tracking-widest uppercase">Scroll to begin journey</span>
            <div className="w-1 h-16 bg-nb-text mx-auto mt-4" />
          </div>
        </div>
      </DepthLayer>
      
      {/* Outro Transition */}
      <SceneTransition type="blur-forward" timelineRange={[0.15, 0.2]}>
        <div className="w-full h-full bg-nb-bg/50 backdrop-blur-md" />
      </SceneTransition>
    </Scene>
  );
};
