"use client";

import { useEffect, useRef } from "react";
import { Z_POSITIONS, CAMERA_STOPS } from "@/lib/constants";
import { portfolioData } from "@/data/portfolio";
import { SkillNode } from "@/components/ui/SkillNode";
import { gsap } from "@/lib/gsap";

export default function SkillsSection({ is3D }: { is3D: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const categories = Object.keys(portfolioData.skills) as Array<keyof typeof portfolioData.skills>;
  
  // 3D Layout calculations (without Z depth)
  let globalNodeIndex = 0;
  
  const helixMath = categories.flatMap((cat, catIndex) => {
    const skills = portfolioData.skills[cat];
    const rX = 600; 
    const rY = 300;
    
    return skills.map((skill) => {
       const angleRad = globalNodeIndex * (137.5 * (Math.PI / 180));
       const sx = Math.cos(angleRad) * rX;
       const sy = Math.sin(angleRad) * rY;
       
       // Instead of translateZ, this determines the sequence delay where they scale past the screen
       const sz = -(globalNodeIndex * 150);
       
       const baseAngle = catIndex * 60;
       globalNodeIndex++;
       return { cat, skill, sx, sy, sz, angleRad, baseAngle, catIndex };
    });
  });

  useEffect(() => {
    if (!is3D || !sectionRef.current) return;
    
    // We scale the entire structure towards the screen
    const peak = CAMERA_STOPS.skills.scrollDistance;
    const scrollLength = Math.abs(Z_POSITIONS.projects - Z_POSITIONS.skills);
    
    gsap.fromTo(sectionRef.current, 
      { scale: 0.1, opacity: 0, rotateY: -15, rotateX: 5 }, 
      {
        scale: 4,
        opacity: 0,
        rotateY: 8,
        rotateX: -3,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: peak - 600,
          end: peak + scrollLength,
          scrub: 1
        }
      }
    );

    // Keep it fully visible in the middle part of the scroll
    gsap.to(sectionRef.current, {
      opacity: 1,
      duration: 0.2,
      scrollTrigger: {
        trigger: document.body,
        start: peak - 200,
        end: peak,
        scrub: 1
      }
    });

    // Background text slow 3D orbit
    if (bgTextRef.current) {
      gsap.to(bgTextRef.current, {
        rotateY: 20,
        duration: 10,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }

  }, [is3D]);

  // For non-3D mode: stagger category cards with 3D flip
  useEffect(() => {
    if (is3D || !sectionRef.current) return;
    
    const cards = sectionRef.current.querySelectorAll(".skill-category-card");
    gsap.fromTo(
      cards,
      { opacity: 0, rotateY: -20, x: -40, scale: 0.9 },
      {
        opacity: 1,
        rotateY: 0,
        x: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );
  }, [is3D]);

  return (
    <section 
      ref={sectionRef}
      id="skills"
      className={`w-full ${is3D ? "fixed inset-0 pointer-events-none flex items-center justify-center origin-center" : "py-24 relative"}`}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      {!is3D && (
        <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
            <h2 className="text-[var(--text-section-title)] font-bold mb-4 text-text-primary">Technical Context</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">The languages, frameworks, and tools I use to build digital products.</p>
        </div>
      )}

      {is3D ? (
        // 3D Helix Layout (Using scale container and XY instead of Z)
        <div className="absolute inset-0 pointer-events-auto origin-center" style={{ transformStyle: "preserve-3d" }}>
           <div 
             ref={bgTextRef}
             className="absolute top-[20%] left-1/2 -translate-x-1/2 opacity-10 text-[10vw] font-bold whitespace-nowrap pointer-events-none scale-50"
             style={{ transformStyle: "preserve-3d" }}
           >
             SKILLS
           </div>
           
           {categories.map(cat => {
              const firstNode = helixMath.find(h => h.cat === cat);
              if (!firstNode) return null;
              const angleRad = (firstNode.baseAngle * Math.PI) / 180;
              const catX = Math.cos(angleRad) * 650;
              const catY = Math.sin(angleRad) * 350;
              
              return (
                  <div 
                    key={cat}
                    className="absolute top-1/2 left-1/2 font-mono text-accent-primary text-[11px] uppercase tracking-widest whitespace-nowrap origin-center"
                    style={{ transform: `translate(-50%, -50%) translate(${catX}px, ${catY}px) scale(${1 - Math.abs(firstNode.sz)/3000})` }}
                  >
                     {cat}
                  </div>
              );
           })}

           {helixMath.map(({ skill, sx, sy, sz }) => {
              const globalCenter = CAMERA_STOPS.skills.scrollDistance + Math.abs(sz);
              return (
                 <SkillNode 
                   key={skill.name}
                   skill={skill}
                   x={sx}
                   y={sy}
                   zBase={0}
                   zOffset={0}
                   globalScrollDistanceCenter={globalCenter}
                   is3D={is3D}
                 />
              );
           })}
        </div>
      ) : (
        // 2D Grid / Accordion Fallback Layout with 3D card entrance
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {categories.map((cat) => (
              <div key={cat} className="skill-category-card surface-card p-6 hover-lift-3d" style={{ perspective: "800px" }}>
                 <h3 className="text-sm font-mono text-accent-primary uppercase tracking-widest mb-6 h-10">{cat}</h3>
                 <div className="space-y-6">
                    {portfolioData.skills[cat].map(skill => (
                      <SkillNode 
                         key={skill.name}
                         skill={skill}
                         x={0} y={0} zBase={0} zOffset={0} globalScrollDistanceCenter={0}
                         is3D={false}
                      />
                    ))}
                 </div>
              </div>
            ))}
        </div>
      )}
    </section>
  );
}
