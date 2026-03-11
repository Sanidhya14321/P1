"use client";
import { HeroSection } from '../../components/Parallax/HeroSection';
import { ProjectGrid } from '../../components/Parallax/ProjectGrid';
import { CaseStudyScrolly } from '../../components/Parallax/CaseStudyScrolly';
import { AboutTimeline } from '../../components/Parallax/AboutTimeline';
import { ContactMicro3D, ExtrasCards } from '../../components/Parallax/ContactMicro3D';

export default function ParallaxPage() {
  return (
    <main className="theme-dark bg-bg m-0 p-0 overflow-x-hidden">
      <HeroSection />
      <ProjectGrid />
      <CaseStudyScrolly />
      <AboutTimeline />
      <ExtrasCards />
      <ContactMicro3D />
    </main>
  );
}
