"use client";
import React, { useRef, useState, useEffect } from 'react';
import { ParallaxSection } from './ParallaxSection';
import { DepthLayer } from './DepthLayer';
import { gsap } from 'gsap';

export const AboutTimeline: React.FC = () => {
  return (
    <ParallaxSection mode="both" height="150vh" className="bg-bg">
      {/* Background Layer: Slow drift */}
      <DepthLayer depth={1} speedMultiplier={0.3} className="opacity-20 flex justify-end items-center pointer-events-none">
         <div className="text-[20rem] font-bold text-muted rotate-90 leading-none whitespace-nowrap hidden md:block">
            JOURNEY
         </div>
      </DepthLayer>

      {/* Foreground Layer: Timeline Content */}
      <DepthLayer depth={4} className="flex justify-center pt-32 px-4">
        <div className="max-w-3xl w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-text-primary text-center">My Journey</h2>
          
          <div className="space-y-24 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-accent before:to-transparent">
            {[
              { year: '2023', title: 'Senior Developer', desc: 'Led frontend architecture.' },
              { year: '2021', title: 'Creative Technologist', desc: 'Bridged design and engineering.' },
              { year: '2019', title: 'Web Developer', desc: 'Started building the web.' }
            ].map((item, idx) => (
              <TimelineCard key={idx} item={item} />
            ))}
          </div>
        </div>
      </DepthLayer>
    </ParallaxSection>
  );
};

const TimelineCard: React.FC<{ item: any }> = ({ item }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    gsap.to(cardRef.current, {
      x: (x - rect.width / 2) * 0.05,
      y: (y - rect.height / 2) * 0.05,
      rotateX: -(y - rect.height / 2) * 0.05,
      rotateY: (x - rect.width / 2) * 0.05,
      z: 20,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion || !cardRef.current) return;
    gsap.to(cardRef.current, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      z: 0,
      duration: 0.5,
      ease: 'power3.out',
    });
  };

  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group select-none">
      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-bg bg-accent shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md relative z-10" />
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="preserve-3d w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-surface-1 rounded-xl shadow-lg border border-white/5 cursor-default hover:shadow-2xl transition-shadow duration-300 relative z-20"
      >
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
        <span className="text-accent font-bold mb-1 block translate-z-10">{item.year}</span>
        <h3 className="text-xl font-bold text-text-primary mb-2 translate-z-10">{item.title}</h3>
        <p className="text-muted translate-z-10">{item.desc}</p>
      </div>
    </div>
  );
};
