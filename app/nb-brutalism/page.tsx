"use client";
import React, { useState, useEffect } from 'react';
import { CameraWrapper } from '../../components/nb-brutalism/Camera/CameraWrapper';
import { HeroScene } from '../../components/nb-brutalism/HeroScene';
import { AboutScene } from '../../components/nb-brutalism/AboutScene';
import { SkillsScene } from '../../components/nb-brutalism/SkillsScene';
import { ProjectsFeaturedScene } from '../../components/nb-brutalism/ProjectsFeaturedScene';
import { ProjectsStackScene } from '../../components/nb-brutalism/ProjectsStackScene';
import { ContactScene } from '../../components/nb-brutalism/ContactScene';

export default function NeoBrutalismPage() {
  const [isCinematicEnabled, setIsCinematicEnabled] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsCinematicEnabled(false);
    }
  }, []);

  return (
    <main className="theme-dark bg-nb-bg m-0 p-0 overflow-x-hidden text-nb-text min-h-screen">
      
      {/* Accessibility Toggle */}
      <div className="fixed top-4 right-4 z-[9999]">
        <button 
          onClick={() => setIsCinematicEnabled(!isCinematicEnabled)}
          className="bg-nb-surface text-nb-text nb-border px-4 py-2 text-sm font-bold uppercase tracking-widest nb-shadow-sm hover:-translate-y-1 hover:nb-shadow-hover transition-all focus:ring-4 focus:ring-nb-accent-1 outline-none"
        >
          {isCinematicEnabled ? 'Disable 3D Camera' : 'Enable 3D Camera'}
        </button>
      </div>

      <div className={isCinematicEnabled ? '' : 'reduced-motion-fallback'}>
        {isCinematicEnabled ? (
          <CameraWrapper>
            <HeroScene />
            <AboutScene />
            <SkillsScene />
            <ProjectsFeaturedScene />
            <ProjectsStackScene />
            <ContactScene />
          </CameraWrapper>
        ) : (
          <div className="max-w-5xl mx-auto flex flex-col gap-32 py-32 px-4">
             <HeroScene />
             <AboutScene />
             <SkillsScene />
             <ProjectsFeaturedScene />
             <ProjectsStackScene />
             <ContactScene />
          </div>
        )}
      </div>

    </main>
  );
}
