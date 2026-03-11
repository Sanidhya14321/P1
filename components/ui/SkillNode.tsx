"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface SkillNodeProps {
  skill: { name: string; level: number };
  x: number;
  y: number;
  zBase: number; // The base Z translation of the entire skills section
  zOffset: number; // Specific z offset within the helix
  globalScrollDistanceCenter: number; // The scroll value where the camera is exactly at this node's Z
  is3D?: boolean;
}

export function SkillNode({
  skill,
  x,
  y,
  zBase,
  zOffset,
  globalScrollDistanceCenter,
  is3D = false,
}: SkillNodeProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!nodeRef.current || !barRef.current || !is3D) return;

    // In 3D mode, use the global scroll position to blur/focus and animate bar
    // Focus distance starts from e.g. 500px away, and peaks when camera is at it.
    const startNum = globalScrollDistanceCenter - 600;
    const centerNum = globalScrollDistanceCenter;
    const endNum = globalScrollDistanceCenter + 100;

    gsap.fromTo(
      nodeRef.current,
      { opacity: 0.3, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        scrollTrigger: {
          trigger: document.body,
          start: startNum,
          end: centerNum,
          scrub: 1,
        },
      }
    );
    
    // fade out as camera passes it
    gsap.to(nodeRef.current, {
        opacity: 0.3,
        scrollTrigger: {
            trigger: document.body,
            start: centerNum,
            end: endNum,
            scrub: true,
        }
    });

    gsap.fromTo(
      barRef.current,
      { width: "0%" },
      {
        width: `${skill.level}%`,
        ease: "power2.out",
        scrollTrigger: {
          trigger: document.body,
          start: centerNum - 200, // wait until it's relatively close to animate bar
          end: centerNum,
          scrub: 1,
        },
      }
    );
  }, [globalScrollDistanceCenter, skill.level, is3D]);

  // Standard flat logic for non-3D variants
  useEffect(() => {
    if (is3D || !barRef.current || !nodeRef.current) return;
    
    // Simple viewport entry animation
    gsap.fromTo(
      barRef.current,
      { width: "0%" },
      {
        width: `${skill.level}%`,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: nodeRef.current,
          start: "top 80%",
        },
      }
    );
  }, [is3D, skill.level]);

  if (is3D) {
    // 3D placement based strictly on radial XY coordinates
    // We drop Z because the parent section container's timeline scale handles depth passing
    return (
      <div
        ref={nodeRef}
        className="absolute w-64 p-3 surface-card bg-background-elevated border-white/10 origin-center"
        style={{
          transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
        }}
      >
        <span className="font-mono text-sm tracking-wider text-text-primary block mb-2 px-1">
          {skill.name}
        </span>
        <div className="w-full h-[2px] bg-white/10 rounded-full mt-2 overflow-hidden">
          <div ref={barRef} className="h-full bg-accent-primary" style={{ width: "0%" }} />
        </div>
      </div>
    );
  }

  // Flat fallback layout
  return (
    <div ref={nodeRef} className="w-full mb-4">
      <div className="flex justify-between items-center mb-1 px-1">
        <span className="font-mono text-sm text-text-primary">{skill.name}</span>
        <span className="font-mono text-xs text-text-muted">{skill.level}%</span>
      </div>
      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
        <div ref={barRef} className="h-full bg-accent-secondary" />
      </div>
    </div>
  );
}
