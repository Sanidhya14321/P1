"use client";

import { useGyroscopeTilt } from "@/hooks/useGyroscopeTilt";
import { TechChip } from "./TechChip";

interface TimelineCardProps {
  data: {
    title?: string;
    company?: string;
    degree?: string;
    institution?: string;
    period: string;
    description?: string;
    achievements?: string[];
    impactStat?: string;
    techStack?: string[];
  };
  alignment: "left" | "right";
  is3D?: boolean;
}

export function TimelineCard({ data, alignment, is3D = false }: TimelineCardProps) {
  const { ref, tilt, handleMouseMove, handleMouseLeave } = useGyroscopeTilt(6);
  const isExperience = !!data.company;

  return (
    <div 
      className="group relative perspective-[1200px]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="surface-card bg-background-elevated border border-white/10 hover:border-white/20 p-6 md:p-8 transition-all duration-500 ease-out z-10 relative w-[clamp(380px,32vw,520px)] border-l-4 border-l-accent-primary shimmer-border"
        style={{
          transformOrigin: alignment === "left" ? "right center" : "left center",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease" : "box-shadow 0.3s ease",
          boxShadow: tilt.x !== 0 || tilt.y !== 0 
            ? "0 20px 60px rgba(0,0,0,0.3), 0 0 20px rgba(99,102,241,0.08)" 
            : "none",
        }}
      >
        <div className="flex flex-col mb-4">
          <span className="text-xs font-mono text-accent-secondary mb-1">{data.period}</span>
          <h3 className="text-[1.2rem] font-bold text-text-primary">
            {isExperience ? data.title : data.degree}
          </h3>
          <h4 className="text-sm font-medium text-text-muted">
            {isExperience ? data.company : data.institution}
          </h4>
        </div>

        {data.description && (
          <p className="text-text-secondary text-[0.9rem] leading-relaxed mb-4">
            {data.description}
          </p>
        )}

        {data.impactStat && (
          <div className="mb-4 inline-block px-3 py-1.5 bg-accent-primary/10 border border-accent-primary/20 rounded font-mono text-sm text-accent-primary font-bold shadow-[inset_0_0_10px_rgba(99,102,241,0.1)] pulse-glow-3d">
            Impact: {data.impactStat}
          </div>
        )}

        {data.achievements && (
          <ul className="space-y-2 mb-4">
            {data.achievements.map((ach, idx) => (
              <li key={idx} className="flex text-sm text-text-secondary items-start">
                <span className="text-accent-secondary mr-2 mt-1">•</span>
                <span>{ach}</span>
              </li>
            ))}
          </ul>
        )}

        {data.techStack && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border-default">
            {data.techStack.map((tech) => (
              <TechChip key={tech}>{tech}</TechChip>
            ))}
          </div>
        )}
      </div>

      {/* Floating dot to connect to timeline spine */}
      {is3D && (
        <div 
          className="absolute top-1/2 -mt-2 w-4 h-4 rounded-full bg-background-elevated border-2 border-accent-primary shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-transform group-hover:scale-150 pulse-glow-3d"
          style={{
            [alignment === "left" ? "right" : "left"]: "-40px",
            transform: "translateZ(10px)",
          }}
        />
      )}
    </div>
  );
}
