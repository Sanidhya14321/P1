"use client";

import { useRef, useEffect } from "react";
import { Z_POSITIONS, CAMERA_STOPS } from "@/lib/constants";
import { featuredProjects } from "@/data/portfolio";
import { gsap } from "@/lib/gsap";
import { useGyroscopeTilt } from "@/hooks/useGyroscopeTilt";

function ProjectCard3D({ project, index, is3D }: { project: typeof featuredProjects[0]; index: number; is3D: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref: tiltRef, tilt, handleMouseMove, handleMouseLeave } = useGyroscopeTilt(10);

  useEffect(() => {
    if (!cardRef.current || is3D) return;
    // Stagger entrance: 3D perspective flip from left/right alternating
    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        rotateY: index % 2 === 0 ? -45 : 45,
        x: index % 2 === 0 ? -60 : 60,
        scale: 0.85,
        filter: "blur(6px)",
      },
      {
        opacity: 1,
        rotateY: 0,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.9,
        delay: index * 0.15,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        }
      }
    );
  }, [is3D, index]);

  return (
    <div
      ref={(el) => {
        (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        (tiltRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="surface-card p-6 text-left shimmer-border preserve-3d"
      style={{
        transform: `${is3D ? `translateZ(${index % 2 === 0 ? 50 : -50}px)` : ""} rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs font-mono text-text-muted uppercase tracking-widest">{project.field}</span>
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${project.status === "Live" ? "bg-success" : "bg-warning"}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${project.status === "Live" ? "bg-success" : "bg-warning"}`}></span>
          </span>
          <span className="text-[10px] uppercase font-mono text-text-muted">{project.status}</span>
        </div>
      </div>
      <h3 className="font-bold text-lg text-text-primary mb-2">{project.title}</h3>
      <p className="text-text-secondary text-sm mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.techStack.map((t: string) => (
          <span key={t} className="text-xs font-mono text-accent-primary bg-accent-primary/10 px-2 py-1 rounded">{t}</span>
        ))}
      </div>
    </div>
  );
}

export default function ProjectsSection({ is3D }: { is3D: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!is3D || !sectionRef.current) return;
    const peak = CAMERA_STOPS.projects.scrollDistance;
    const scrollLength = Math.abs(Z_POSITIONS.experience - Z_POSITIONS.projects);
    const startNum = peak - 600;
    const endNum = peak + scrollLength;

    gsap.fromTo(sectionRef.current, 
      { scale: 0.5, opacity: 0, rotateY: -10 }, 
      {
        scale: 2,
        opacity: 0,
        rotateY: 5,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: startNum,
          end: endNum,
          scrub: 1
        }
      }
    );

    gsap.to(sectionRef.current, {
      opacity: 1,
      duration: 0.2,
      scrollTrigger: {
        trigger: document.body,
        start: peak - 200,
        end: peak + 200,
        scrub: 1
      }
    });
  }, [is3D]);

  // Title 3D entrance for non-3D mode
  useEffect(() => {
    if (is3D || !titleRef.current) return;
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 40, rotateX: -20, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
        }
      }
    );
  }, [is3D]);

  return (
    <section 
      ref={sectionRef}
      id="projects"
      className={`w-full ${is3D ? "fixed inset-0 pointer-events-none flex items-center justify-center origin-center" : "py-24 relative"}`}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      <div className={`max-w-6xl mx-auto px-6 ${is3D ? 'pointer-events-auto w-full preserve-3d' : ''}`}>
         <div 
           ref={titleRef}
           style={{ transform: is3D ? "translateZ(150px)" : "none", textAlign: "center", marginBottom: "3rem", perspective: "800px" }}
         >
            <h2 className="text-[var(--text-section-title)] font-bold mb-4 text-text-primary">Selected Projects</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">Some of my recent work...</p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 preserve-3d">
            {featuredProjects.map((p, i) => (
              <ProjectCard3D key={p.title} project={p} index={i} is3D={is3D} />
            ))}
         </div>
      </div>
    </section>
  );
}
