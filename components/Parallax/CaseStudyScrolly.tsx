"use client";
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const CaseStudyScrolly: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const sections = gsap.utils.toArray('.case-scene', containerRef.current) as HTMLElement[];

    // Basic scrollytelling: pin the whole container, and crossfade/slide the scenes
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%', // 3 scenes * 100% height
        pin: true,
        scrub: 1,
      }
    });

    sections.forEach((section, idx) => {
      if (idx === 0) return; // First scene naturally visible
      
      const fg = section.querySelector('.scene-fg');
      const bg = section.querySelector('.scene-bg');

      // Slide the new scene in from the right / bottom
      tl.fromTo(section, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 })
        .fromTo(bg, { scale: 1.1, yPercent: 20 }, { scale: 1, yPercent: 0, duration: 1 }, "<")
        .fromTo(fg, { yPercent: 50 }, { yPercent: 0, duration: 1 }, "<0.2"); // foreground slightly delayed
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-bg text-text-primary">
      {/* Scene 1: Intro */}
      <div className="case-scene absolute inset-0 z-10 flex items-center justify-center">
        <div className="scene-bg absolute inset-0 bg-surface-1 opacity-50" />
        <div className="scene-fg relative z-20 max-w-2xl text-center px-4">
          <h2 className="text-5xl md:text-7xl font-bold mb-6">Nexus Protocol</h2>
          <p className="text-xl text-muted">A deep dive into high-performance web architecture.</p>
        </div>
      </div>

      {/* Scene 2: The Problem */}
      <div className="case-scene absolute inset-0 z-20 flex items-center justify-start invisible opacity-0 pl-12 md:pl-32">
        <div className="scene-bg absolute inset-0 bg-blue-900/10 blur-xl" />
        <div className="scene-fg relative z-20 max-w-xl">
          <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-2 block">01 / Challenge</span>
          <h3 className="text-4xl font-bold mb-6">Processing at scale</h3>
          <p className="text-lg text-muted">
            The previous infrastructure choked on 10,000 requests per second. We had to rethink the data pipeline from the ground up without disrupting existing clients.
          </p>
        </div>
      </div>

      {/* Scene 3: The Solution */}
      <div className="case-scene absolute inset-0 z-30 flex items-center justify-end invisible opacity-0 pr-12 md:pr-32">
        <div className="scene-bg absolute inset-0 bg-accent/5 blur-3xl rounded-full scale-150 translate-x-1/2" />
        <div className="scene-fg relative z-20 max-w-xl text-right">
          <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-2 block">02 / Solution</span>
          <h3 className="text-4xl font-bold mb-6">Event-Driven Microservices</h3>
          <p className="text-lg text-muted">
            By shifting to an event-driven model using Kafka and Node.js, we improved throughput by 400% while reducing latency to under 20ms globally.
          </p>
        </div>
      </div>
    </section>
  );
};
