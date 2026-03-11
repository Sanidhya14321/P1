"use client";

import { useEffect, useRef } from "react";
import { Z_POSITIONS, CAMERA_STOPS } from "@/lib/constants";
import { portfolioData } from "@/data/portfolio";
import { TimelineCard } from "@/components/ui/TimelineCard";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function ExperienceSection({ is3D }: { is3D: boolean }) {
  const spineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!is3D || !sectionRef.current) return;
    const peak = CAMERA_STOPS.experience.scrollDistance;
    const startNum = peak - 600;
    const scrollLength = Math.abs(Z_POSITIONS.contact - Z_POSITIONS.experience);
    const endNum = peak + scrollLength;

    gsap.set(sectionRef.current, { visibility: "hidden", opacity: 0 });

    ScrollTrigger.create({
      start: startNum,
      end: endNum,
      onEnter: () => gsap.to(sectionRef.current, { visibility: "visible", opacity: 1, duration: 0.5 }),
      onLeave: () => gsap.to(sectionRef.current, { visibility: "hidden", opacity: 0, duration: 0.5 }),
      onEnterBack: () => gsap.to(sectionRef.current, { visibility: "visible", opacity: 1, duration: 0.5 }),
      onLeaveBack: () => gsap.to(sectionRef.current, { visibility: "hidden", opacity: 0, duration: 0.5 })
    });
  }, [is3D]);

  useEffect(() => {
    if (!is3D || !spineRef.current) return;
    const peak = CAMERA_STOPS.experience.scrollDistance;
    const startNum = peak - 500;
    const endNum = peak + 200;

    gsap.fromTo(
      spineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: "top center",
        scrollTrigger: {
           trigger: document.body,
           start: startNum,
           end: endNum,
           scrub: 1,
        }
      }
    );
  }, [is3D]);

  // Non-3D mode: 3D stagger entrance for cards
  useEffect(() => {
    if (is3D || !sectionRef.current) return;

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40, rotateX: -15, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          }
        }
      );
    }

    const cards = sectionRef.current.querySelectorAll(".exp-flat-card");
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 50,
        rotateX: 20,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      }
    );
  }, [is3D]);

  const items = [...portfolioData.experience, portfolioData.education];
  const totalExpScroll = Math.abs(Z_POSITIONS.contact - Z_POSITIONS.experience);
  
  return (
    <section 
      ref={sectionRef}
      id="experience"
      className={`w-full ${is3D ? "fixed inset-0 pointer-events-none origin-center" : "py-24 relative"}`}
      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
    >
      {!is3D && (
         <div ref={titleRef} className="max-w-4xl mx-auto px-6 mb-16 text-center">
            <h2 className="text-[var(--text-section-title)] font-bold mb-4 text-text-primary">Journey</h2>
         </div>
      )}

      {is3D ? (
        // 3D Simulated Layout
        <div className="absolute inset-0 preserve-3d">
           <div 
             ref={spineRef} 
             className="absolute top-0 left-1/2 w-[2px] h-[200vh] bg-gradient-to-b from-transparent via-accent-primary to-transparent -translate-x-1/2 opacity-20" 
           />
           
           {items.map((item, i) => {
             const progress = i / Math.max(items.length - 1, 1);
             const isEven = i % 2 === 0;

             const peak = CAMERA_STOPS.experience.scrollDistance;
             const cardArrivalScroll = peak + (totalExpScroll * progress * 0.8);
             
             return (
               <Experience3DCard 
                  key={'id' in item ? item.id : `edu-${i}`}
                  item={item}
                  isEven={isEven}
                  targetScroll={cardArrivalScroll}
               />
             );
           })}
        </div>
      ) : (
        // Standard Flat Timeline with 3D entrance animations
        <div className="max-w-4xl mx-auto px-6">
           <div className="space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-border-default before:to-transparent">
              {portfolioData.experience.map((exp, idx) => (
                <div key={exp.id} className={`exp-flat-card relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`} style={{ perspective: "800px" }}>
                   {/* Node marker with pulse */}
                   <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background-primary bg-background-elevated group-hover:bg-accent-primary group-hover:border-accent-primary/50 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors pulse-glow-3d" />
                   
                   {/* Card */}
                   <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
                     <TimelineCard data={exp} alignment={idx % 2 === 0 ? "right" : "left"} is3D={false} />
                   </div>
                </div>
              ))}
              
              <div className="exp-flat-card relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active" style={{ perspective: "800px" }}>
                 <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background-primary bg-background-elevated group-hover:bg-accent-secondary group-hover:border-accent-secondary/50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors" />
                 <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
                   <TimelineCard data={portfolioData.education} alignment="left" is3D={false} />
                 </div>
              </div>
           </div>
        </div>
      )}
    </section>
  );
}

// Subcomponent for 3D experience cards with enhanced depth animations
function Experience3DCard({ item, isEven, targetScroll }: { item: { title?: string, company?: string, degree?: string, institution?: string, period: string, description?: string, achievements?: string[], impactStat?: string, techStack?: string[] }, isEven: boolean, targetScroll: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    
    const startNum = targetScroll - 800;
    const endNum = targetScroll + 800;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: startNum,
        end: endNum,
        scrub: 1,
      }
    });

    // Approach: card flips in from the side with 3D rotation
    tl.fromTo(cardRef.current,
      { 
        scale: 0.3, 
        opacity: 0, 
        y: 100, 
        rotateX: 30,
        rotateY: isEven ? -25 : 25,
        filter: "blur(8px)",
      },
      { 
        scale: 1, 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        rotateY: 0,
        filter: "blur(0px)",
        duration: 0.4, 
        ease: "power2.out" 
      }
    )
    .to(cardRef.current, { scale: 1, opacity: 1, y: 0, duration: 0.2 }) // Hold
    .to(cardRef.current, { 
      scale: 10, 
      opacity: 0, 
      y: -200, 
      rotateX: -15,
      filter: "blur(12px)",
      duration: 0.4, 
      ease: "power2.in" 
    });

  }, [targetScroll, isEven]);

  const xOffset = 350 + (isEven ? -150 : 150);
  const rotY = isEven ? 8 : -8;

  return (
    <div 
      ref={cardRef}
      className="absolute top-1/2 left-1/2 origin-center preserve-3d pointer-events-auto" 
      style={{ 
        transform: `translate(-50%, -50%) translateX(${xOffset}px) rotateY(${rotY}deg)` 
      }}
    >
      <TimelineCard data={item} alignment={isEven ? "right" : "left"} is3D={true} />
    </div>
  );
}
