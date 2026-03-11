"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
}

export function AmbientParticles({ is3D }: { is3D: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Generate sparse particles
    const particleCount = 40;
    const particles: Particle[] = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 2000, // Z depth pseudo-simulation
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.3 + 0.1,
    }));

    // Animation loop
    let animationFrameId: number;
    
    // We tie the particle Z movement to the window scroll if in 3D mode
    // Moving at 0.08x camera speed
    const render = () => {
       ctx.clearRect(0, 0, width, height);
       
       const scrollY = is3D ? window.scrollY * 0.08 : window.scrollY * 0.02;

       particles.forEach(p => {
         // Fake Z projection
         // the higher the scroll, the more particles move
         const projectedY = (p.y - scrollY * (1 + p.z / 1000)) % height;
         const finalY = projectedY < 0 ? height + projectedY : projectedY;
         
         ctx.beginPath();
         ctx.arc(p.x, finalY, p.size, 0, Math.PI * 2);
         ctx.fillStyle = `rgba(82, 82, 91, ${p.opacity})`; // text-muted equivalent
         ctx.fill();
       });

       animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [is3D]);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
