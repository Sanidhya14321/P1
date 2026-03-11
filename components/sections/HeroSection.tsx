"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { Z_POSITIONS, CAMERA_STOPS } from "@/lib/constants";
import { portfolioData } from "@/data/portfolio";
import { useMouseParallax } from "@/hooks/useMouseParallax";

export default function HeroSection({ is3D }: { is3D: boolean }) {
  const containerRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const { rotateX, rotateY, mouseX, mouseY } = useMouseParallax(0.6);

  useEffect(() => {
    // Initial Load Sequence with 3D character reveals
    const tl = gsap.timeline({ delay: 0.3 });

    // Animate each character of the name with 3D rotation
    if (nameRef.current) {
      const chars = nameRef.current.querySelectorAll(".hero-char");
      if (chars.length > 0) {
        tl.fromTo(
          chars,
          {
            opacity: 0,
            rotateX: -90,
            rotateY: () => gsap.utils.random(-45, 45),
            y: 50,
            scale: 0.5,
          },
          {
            opacity: 1,
            rotateX: 0,
            rotateY: 0,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.04,
            ease: "back.out(1.7)",
          }
        );
      }
    }

    tl.fromTo(
      titleRef.current,
      { y: 30, opacity: 0, rotateX: -20, filter: "blur(8px)" },
      { y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
      "-=0.4"
    )
    .fromTo(
      ctaRef.current,
      { y: 30, opacity: 0, scale: 0.9, rotateX: -15 },
      { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 0.8, ease: "back.out(1.2)" },
      "-=0.5"
    )
    .fromTo(
      scrollIndicatorRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    );

    // Orb float animation with 3D feel
    if (orbRef.current) {
      gsap.to(orbRef.current, {
        y: -50,
        x: 30,
        rotateZ: 5,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    }

    // Background text slow 3D rotation
    if (bgTextRef.current) {
      gsap.to(bgTextRef.current, {
        rotateY: 10,
        rotateX: -3,
        duration: 8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    }

    // Simulated 3D Pass-through exit animation
    if (is3D && containerRef.current) {
      const endScroll = Math.abs(CAMERA_STOPS.about.scrollDistance) * 0.8;
      
      gsap.to(containerRef.current, {
        scale: 3, // Zoom in past the camera
        opacity: 0,
        rotateX: 5, // Subtle rotation as it zooms past
        scrollTrigger: {
          trigger: document.body,
          start: 0,
          end: endScroll,
          scrub: 1,
        }
      });
      
      // Animate background elements at different speeds to simulate parallax
      if (orbRef.current) {
        gsap.to(orbRef.current, { 
          scale: 4, 
          rotateZ: 45,
          scrollTrigger: { trigger: document.body, start: 0, end: endScroll, scrub: 1 } 
        });
      }

      if (bgTextRef.current) {
        gsap.to(bgTextRef.current, { 
          scale: 5, 
          rotateY: 30,
          opacity: 0,
          scrollTrigger: { trigger: document.body, start: 0, end: endScroll * 0.6, scrub: 1 } 
        });
      }
    }
  }, [is3D]);

  // Mouse parallax on hero elements
  useEffect(() => {
    if (!is3D) return;
    if (orbRef.current) {
      gsap.to(orbRef.current, {
        x: mouseX * 40,
        y: mouseY * 20,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  }, [mouseX, mouseY, is3D]);

  const handleScrollTo = (zTarget: number) => {
    const targetStr = Object.keys(CAMERA_STOPS).find(key => CAMERA_STOPS[key as keyof typeof CAMERA_STOPS].z === zTarget);
    if (is3D && targetStr) {
      window.scrollTo({
        top: CAMERA_STOPS[targetStr as keyof typeof CAMERA_STOPS].scrollDistance,
        behavior: "smooth"
      });
    } else {
      const targetEl = document.getElementById(targetStr || "");
      if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Split name into individual characters for 3D animation
  const nameChars = portfolioData.name.split("").map((char, i) => (
    <span key={i} className="hero-char" style={{ perspective: "600px" }}>
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <section 
      id="hero"
      ref={containerRef}
      className={`w-full min-h-screen flex flex-col items-center justify-center origin-center ${is3D ? "fixed inset-0 pointer-events-none" : "py-24 relative"}`}
      style={{ perspective: "1000px" }}
    >
      {/* Decorative Orb with 3D pulse */}
      <div 
        ref={orbRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-glow blur-3xl mix-blend-screen pointer-events-none pulse-glow-3d"
        style={{ transform: "translate(-50%, -50%) scale(1.5)", zIndex: -10 }}
      />

      {/* Ghost Background Typography with 3D rotation */}
      <div 
        ref={bgTextRef}
        className="absolute top-1/2 left-1/2 flex items-center justify-center pointer-events-none select-none"
        style={{ transform: "translate(-50%, -50%) scale(0.8)", zIndex: -5, transformStyle: "preserve-3d" }}
      >
        <span className="text-[clamp(12rem,25vw,22rem)] font-black text-white/[0.04] whitespace-nowrap leading-none tracking-tighter">
          {portfolioData.name.split(" ")[0].toUpperCase()}
        </span>
      </div>

      <div className={`relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center ${is3D ? "pointer-events-auto" : ""}`}>
        <span className="text-accent-primary font-mono tracking-widest text-sm md:text-base uppercase mb-4 block">
          Hi, I&apos;m
        </span>
        
        <h1 
          ref={nameRef}
          className="text-[clamp(3.5rem,8vw,7rem)] font-black tracking-tighter leading-[0.9] text-text-primary mb-6"
          style={{ perspective: "600px", transformStyle: "preserve-3d" }}
        >
          {nameChars}
        </h1>
        
        <p 
          ref={titleRef}
          className="text-xl md:text-2xl text-text-secondary font-medium mb-12 max-w-2xl mx-auto"
          style={{ transformStyle: "preserve-3d" }}
        >
          {portfolioData.title}
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-6" style={{ perspective: "800px" }}>
          <button 
            onClick={() => handleScrollTo(Z_POSITIONS.projects)}
            className="px-8 py-4 bg-accent-primary text-white font-bold rounded-full hover:bg-accent-primary/90 hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all flex items-center gap-2 group shimmer-border"
            style={{ transformStyle: "preserve-3d" }}
          >
            View My Work
            <span className="group-hover:translate-x-1 group-hover:rotateY-12 transition-transform">→</span>
          </button>
          
          <button 
            onClick={() => handleScrollTo(Z_POSITIONS.contact)}
            className="px-8 py-4 bg-transparent border border-border-default text-text-primary font-bold rounded-full hover:border-accent-primary hover:text-accent-primary hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all hover-lift-3d"
          >
            Get In Touch
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollIndicatorRef}
        className="absolute text-text-muted flex flex-col items-center"
        style={{ bottom: "48px", left: "50%", transform: "translateX(-50%)" }}
      >
        <span className="text-xs font-mono uppercase tracking-widest mb-2">Scroll To Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-text-muted to-transparent animate-bounce" />
      </div>
    </section>
  );
}
