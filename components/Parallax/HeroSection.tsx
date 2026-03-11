import React from 'react';
import { ParallaxSection } from './ParallaxSection';
import { DepthLayer } from './DepthLayer';

export const HeroSection: React.FC = () => {
  return (
    <ParallaxSection mode="both" pinned={true} height="100vh" className="bg-bg text-text-primary">
      {/* z0: Deepest Background */}
      <DepthLayer depth={0} className="bg-cover bg-center opacity-40 blur-md pointer-events-none" style={{ backgroundImage: 'url(/design/layers/hero-z0-bg.webp)' }}>
      </DepthLayer>

      {/* z1: Atmosphere */}
      <DepthLayer depth={1} className="bg-cover bg-center opacity-60 pointer-events-none" style={{ backgroundImage: 'url(/design/layers/hero-z1-atmosphere.webp)' }}>
      </DepthLayer>

      {/* z2: Decorative Geometry */}
      <DepthLayer depth={2} className="pointer-events-none flex items-center justify-center">
        <img src="/design/layers/hero-z2-shapes.svg" alt="" aria-hidden="true" className="w-[80%] max-w-lg opacity-80" />
      </DepthLayer>

      {/* z4: Foreground Standard Text */}
      <DepthLayer depth={4} speedMultiplier={0.95} className="flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4 drop-shadow-xl text-text-primary translate-y-8">
          CREATIVE DEVELOPER
        </h1>
        <p className="text-xl md:text-2xl text-muted max-w-2xl px-4 translate-y-12">
          Building immersive, high-polish digital experiences without compromising performance.
        </p>
      </DepthLayer>

      {/* z5: Pop-out Call to Action */}
      <DepthLayer depth={5} speedMultiplier={1.05} className="flex flex-col items-center justify-end pb-32">
        <a 
          href="#projects" 
          className="px-8 py-4 bg-accent text-white font-semibold rounded-full hover:-translate-y-1 hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          Explore Work
        </a>
      </DepthLayer>
    </ParallaxSection>
  );
};
