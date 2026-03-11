"use client";

import { useGyroscopeTilt } from "@/hooks/useGyroscopeTilt";
import { TechChip } from "./TechChip";

interface ProjectCardProps {
  project: {
    title: string;
    field: string;
    description: string;
    techStack: string[];
    status: string;
    githubUrl: string;
    demoUrl: string;
  };
  is3D?: boolean;
}

export function ProjectCard({ project, is3D = false }: ProjectCardProps) {
  const { ref, tilt, handleMouseMove, handleMouseLeave } = useGyroscopeTilt(8);

  const statusColor = project.status === "Live" ? "bg-success" : "bg-warning";

  return (
    <div 
      className="relative group perspective-[1000px] w-full max-w-sm"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Outer Glow wrapper */}
      <div 
        className="absolute inset-0 rounded-2xl bg-accent-primary/0 blur-xl transition-colors duration-500 group-hover:bg-accent-primary/20 pointer-events-none" 
      />
      
      {/* Card Content */}
      <div
        ref={is3D ? ref : null} // only attach tilt if in desktop/tablet mode where mouse is available
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="surface-card surface-card-interactive p-6 relative z-10 h-full flex flex-col justify-between overflow-hidden"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.5s ease-out" : "none"
        }}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-hero opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <header className="mb-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-mono text-text-muted uppercase tracking-widest">{project.field}</span>
            <div className="flex items-center space-x-2">
               <span className="relative flex h-2 w-2">
                 <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusColor}`}></span>
                 <span className={`relative inline-flex rounded-full h-2 w-2 ${statusColor}`}></span>
               </span>
               <span className="text-[10px] uppercase font-mono text-text-muted">{project.status}</span>
            </div>
          </div>
          <h3 className="text-[var(--text-card-heading)] font-semibold text-text-primary group-hover:text-accent-secondary transition-colors truncate">
            {project.title}
          </h3>
        </header>

        <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">
          {project.description}
        </p>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.techStack.map(tech => (
              <TechChip key={tech}>{tech}</TechChip>
            ))}
          </div>

          <div className="flex space-x-4 pt-4 border-t border-border-default">
            <a href={project.githubUrl} className="text-sm font-medium text-text-primary hover:text-accent-primary transition-colors">
              GitHub →
            </a>
            <a href={project.demoUrl} className="text-sm font-medium text-text-primary hover:text-accent-secondary transition-colors">
              Live Demo →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
