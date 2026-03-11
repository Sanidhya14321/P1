"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface ProjectGateProps {
  project: {
    title: string;
    field: string;
    description: string;
    techStack: string[];
    status: string;
    githubUrl: string;
    demoUrl: string;
  };
  zPosition: number;
  scrollDistance: number;
  splitAxis: "horizontal" | "vertical" | "diagonal";
  colorAccent: "accent_primary" | "accent_secondary";
}

// Common inner content to render in identical halves but clipped
const InnerContent = ({ project, borderColor, glowColor }: { project: ProjectGateProps["project"], borderColor: string, glowColor: string }) => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className={`surface-glass border ${borderColor} ${glowColor} p-12 w-[800px] h-[500px] rounded-2xl flex flex-col justify-between`}>
       <div className="flex justify-between items-start w-full">
          <span className="text-sm font-mono tracking-widest uppercase text-text-muted">{project.field}</span>
          <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-xs text-text-secondary">
            {project.status}
          </div>
       </div>
       <div className="text-center w-full">
          <h1 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-text-primary tracking-tighter mb-4">{project.title}</h1>
          <p className="text-lg text-text-secondary max-w-lg mx-auto leading-relaxed line-clamp-3 mb-6">
            {project.description}
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
             {project.techStack.map(tech => (
               <div key={tech} className="px-2 py-0.5 bg-border-subtle border border-border-default rounded font-mono text-[0.7rem] text-text-secondary whitespace-nowrap">
                 {tech}
               </div>
             ))}
          </div>
       </div>
       <div className="flex justify-center items-center gap-4 border-t border-border-default pt-6">
          <a href={project.githubUrl} className="text-text-primary uppercase tracking-widest text-sm font-bold hovering-glow pointer-events-auto">Repository</a>
          <span className="text-border-subtle">|</span>
          <a href={project.demoUrl} className="text-text-primary uppercase tracking-widest text-sm font-bold hovering-glow pointer-events-auto">Live App</a>
       </div>
    </div>
  </div>
);

export function ProjectGate({ project, zPosition, scrollDistance, splitAxis, colorAccent }: ProjectGateProps) {
  const gateRef = useRef<HTMLDivElement>(null);
  const part1Ref = useRef<HTMLDivElement>(null);
  const part2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!part1Ref.current || !part2Ref.current) return;

    // The gate starts opening 800px before the camera reaches its Z position
    // And fully opens by the time camera passes it (200px buffer).
    const startNum = Math.max(0, scrollDistance - 800); 
    const endNum = scrollDistance - 200; 

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: startNum,
        end: endNum,
        scrub: 1.5,
      }
    });

    // Define transform based on splitAxis
    let p1Vars: gsap.TweenVars = {};
    let p2Vars: gsap.TweenVars = {};

    switch (splitAxis) {
      case "horizontal":
        p1Vars = { x: "-100vw", opacity: 0 };
        p2Vars = { x: "100vw", opacity: 0 };
        break;
      case "vertical":
        p1Vars = { y: "-100vh", opacity: 0 };
        p2Vars = { y: "100vh", opacity: 0 };
        break;
      case "diagonal":
        p1Vars = { x: "-100vw", y: "-100vh", opacity: 0 };
        p2Vars = { x: "100vw", y: "100vh", opacity: 0 };
        break;
    }

    tl.to(part1Ref.current, p1Vars, 0)
      .to(part2Ref.current, p2Vars, 0);

    // Fade entire gate and disable pointer events once camera passes
    // This absolutely prevents bleeding into the Experience section
    gsap.set(gateRef.current, { opacity: 1, visibility: "visible" });
    gsap.to(gateRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: document.body,
        start: scrollDistance - 50,
        end: scrollDistance + 50,
        scrub: true,
        onLeave: () => gsap.set(gateRef.current, { visibility: "hidden" }),
        onEnterBack: () => gsap.set(gateRef.current, { visibility: "visible" })
      }
    });

  }, [scrollDistance, splitAxis]);

  const borderColor = colorAccent === "accent_primary" 
                      ? "border-accent-primary/20" 
                      : "border-accent-secondary/20";
                      
  const glowColor = colorAccent === "accent_primary"
                      ? "shadow-[0_0_50px_rgba(99,102,241,0.1)]"
                      : "shadow-[0_0_50px_rgba(34,211,238,0.1)]";

  return (
    <div 
      ref={gateRef}
      className="absolute top-0 left-0 w-full h-full flex transform-style-3d pointer-events-none"
      style={{ transform: `translateZ(${zPosition}px)`, isolation: "isolate" }}
    >
      {/* Background ambient plane slightly behind gate */}
      <div className="absolute inset-0 bg-background-primary opacity-20 transform translate-z-[-50px]" />

      {/* Part 1 */}
      <div 
        ref={part1Ref} 
        className="absolute inset-0 z-10 overflow-hidden pointer-events-auto"
        style={{
          clipPath: splitAxis === "horizontal" 
            ? "polygon(0 0, 50% 0, 50% 100%, 0 100%)" // Left half
            : splitAxis === "vertical"
            ? "polygon(0 0, 100% 0, 100% 50%, 0 50%)" // Top half
            : "polygon(0 0, 100% 0, 0 100%)" // Top-left triangle
        }}
      >
        <InnerContent project={project} borderColor={borderColor} glowColor={glowColor} />
      </div>

      {/* Part 2 */}
      <div 
        ref={part2Ref} 
        className="absolute inset-0 z-10 overflow-hidden pointer-events-auto"
        style={{
          clipPath: splitAxis === "horizontal"
            ? "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" // Right half
            : splitAxis === "vertical"
            ? "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" // Bottom half
            : "polygon(100% 0, 100% 100%, 0 100%)" // Bottom-right triangle
        }}
      >
        <InnerContent project={project} borderColor={borderColor} glowColor={glowColor} />
      </div>
    </div>
  );
}
