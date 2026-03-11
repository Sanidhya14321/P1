"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { CAMERA_STOPS } from "@/lib/constants";
import { portfolioData } from "@/data/portfolio";
import { StatCounter } from "@/components/ui/StatCounter";
import { useGyroscopeTilt } from "@/hooks/useGyroscopeTilt";

export default function AboutSection({ is3D }: { is3D: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLUListElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { ref: tiltRef, tilt, handleMouseMove, handleMouseLeave } = useGyroscopeTilt(6);

  useEffect(() => {
    if (!sectionRef.current || !cardRef.current || !is3D) return;

    const peak = CAMERA_STOPS.about.scrollDistance;
    const startNum = Math.max(0, peak - 800);
    const endNum = peak + 800;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: startNum,
        end: endNum,
        scrub: 1,
      }
    });

    // 1. Approach: Card flips forward from below with perspective rotation
    tl.fromTo(
      sectionRef.current,
      { scale: 0.3, opacity: 0, filter: "blur(10px)", rotateX: -25, rotateY: 8 },
      { scale: 1, opacity: 1, filter: "blur(0px)", rotateX: 0, rotateY: 0, duration: 0.4, ease: "power2.out" }
    )
    // 2. Hold center
    .to(sectionRef.current, { scale: 1, opacity: 1, duration: 0.2 })
    // 3. Exit: Fly past with 3D rotation
    .to(sectionRef.current, {
      scale: 2.5,
      opacity: 0,
      filter: "blur(15px)",
      rotateX: 15,
      rotateY: -5,
      duration: 0.4,
      ease: "power2.in"
    });

  }, [is3D]);

  // Standard fade in for fallback layout with 3D perspective reveal
  useEffect(() => {
    if (is3D || !cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { y: 60, opacity: 0, rotateX: -12, scale: 0.95, filter: "blur(6px)" },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
        }
      }
    );

    // Stagger animate highlight items
    if (highlightsRef.current) {
      const items = highlightsRef.current.querySelectorAll("li");
      gsap.fromTo(
        items,
        { opacity: 0, x: -30, rotateY: -15 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: highlightsRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // Stats cards entrance with 3D flip
    if (statsRef.current) {
      const statCards = statsRef.current.querySelectorAll(".stat-item");
      gsap.fromTo(
        statCards,
        { opacity: 0, scale: 0.8, rotateZ: 5, rotateX: -20 },
        {
          opacity: 1,
          scale: 1,
          rotateZ: 0,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, [is3D]);

  return (
    <section 
      id="about"
      ref={sectionRef}
      className={`w-full flex items-center justify-center origin-center ${is3D ? "fixed inset-0 pointer-events-none" : "py-16 relative"}`}
      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
    >
      <div 
        ref={(el) => {
          (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
          (tiltRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        onMouseMove={!is3D ? handleMouseMove : undefined}
        onMouseLeave={!is3D ? handleMouseLeave : undefined}
        className={`w-full max-w-5xl mx-auto relative z-10 ${is3D ? "pointer-events-auto" : ""}`}
        style={{
          transform: !is3D && (tilt.x !== 0 || tilt.y !== 0) ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` : undefined,
          transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.5s ease-out" : "none",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute inset-0 surface-card" />
        
        <div className="p-[var(--spacing-card)] relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
           
           {/* Narrative Column */}
           <div className="lg:col-span-7 space-y-8">
              <h2 ref={titleRef} className="text-[var(--text-section-title)] font-bold text-text-primary tracking-tight">
                Architecting <br /> <span className="text-accent-primary">Digital Space.</span>
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                {portfolioData.about.narrative}
              </p>
              
              <ul ref={highlightsRef} className="space-y-4 pt-4 border-t border-border-default">
                {portfolioData.about.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start" style={{ perspective: "600px" }}>
                    <div className="mt-1.5 mr-3 w-1.5 h-1.5 rounded-full bg-accent-secondary flex-shrink-0" />
                    <span className="text-text-primary font-medium">{item}</span>
                  </li>
                ))}
              </ul>
           </div>

           {/* Stats Column */}
           <div ref={statsRef} className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-8 lg:gap-12 bg-background-surface/50 p-8 rounded-2xl border border-border-subtle">
              <div className="col-span-1 stat-item">
                 <StatCounter value="15,000+" label="Community Members" />
              </div>
              <div className="col-span-1 stat-item">
                 <StatCounter value="7+" label="Prod Projects" />
              </div>
              <div className="col-span-1 md:col-span-3 lg:col-span-2 stat-item">
                 <StatCounter value="2023" label="Started Building" />
              </div>
           </div>

        </div>
      </div>
    </section>
  );
}
