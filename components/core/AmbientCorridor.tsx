import { useEffect, useState } from "react";
import { SECTIONS, CAMERA_STOPS } from "@/lib/constants";

export function AmbientCorridor() {
  const [particles, setParticles] = useState<{key: string, transform: string}[]>([]);

  useEffect(() => {
    // Generate static random positions once on client to satisfy React purity and avoid hydration errors
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(Array.from({ length: 30 }).map((_, i) => ({
      key: `dust-${i}`,
      transform: `translateX(${(Math.random() - 0.5) * 4000}px) translateY(${(Math.random() - 0.5) * 2000}px) translateZ(${-Math.random() * 8200}px)`
    })));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none preserve-3d">
      {/* Perspective Grid Floor spanning entire Z depth */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300vw] h-[10000px] origin-center"
        style={{
          transform: "translateZ(-4000px) rotateX(90deg) translateY(200px)",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
          maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)"
        }}
      />
      
      {/* Ghost Section Text at distance */}
      {SECTIONS.map((sec) => (
         <div 
           key={sec.id}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.025] uppercase tracking-tighter"
           style={{ transform: `translateZ(${- (CAMERA_STOPS[sec.id as keyof typeof CAMERA_STOPS]?.z || 0) - 1000}px)` }}
         >
           {sec.label}
         </div>
      ))}

      {/* Deep Space Dust */}
      {particles.map((particle) => (
         <div 
           key={particle.key}
           className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-white/30"
           style={{
             transform: particle.transform,
             boxShadow: "0 0 10px rgba(255,255,255,0.5)"
           }}
         />
       ))}
    </div>
  );
}
