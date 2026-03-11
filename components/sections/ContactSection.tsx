"use client";

import { useRef, useEffect } from "react";
import { CAMERA_STOPS } from "@/lib/constants";
import { portfolioData } from "@/data/portfolio";
import { NeuButton } from "@/components/ui/NeuButton";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const Content = ({ formRef, handleFormSubmit, is3D }: { formRef: React.RefObject<HTMLDivElement | null>, handleFormSubmit: (e: React.FormEvent) => void, is3D: boolean }) => (
  <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-start justify-between">
     {/* Left: Form */}
     <div ref={formRef} className="w-full md:w-[60%] rounded-2xl p-8 surface-card border-border-default/20 bg-background-primary/80 backdrop-blur-xl" style={{ transform: is3D ? "translateZ(150px)" : "none", transformStyle: "preserve-3d" }}>
        <h2 className="text-[var(--text-section-title)] font-bold mb-2 text-text-primary tracking-tighter">
           Let&apos;s Build <span className="text-accent-secondary">Something.</span>
        </h2>
        <p className="text-text-secondary mb-8">
           Open to full-time roles, freelance, and collaborations.
        </p>
        
        <form className="space-y-6" onSubmit={handleFormSubmit}>
           <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Name" 
                className="contact-input w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all text-text-primary placeholder:text-text-muted" 
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="contact-input w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all text-text-primary placeholder:text-text-muted" 
              />
              <textarea 
                placeholder="Message" 
                rows={4}
                className="contact-input w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all text-text-primary placeholder:text-text-muted resize-none" 
              />
           </div>
           <NeuButton type="submit" className="w-full pointer-events-auto group hover-lift-3d">
             <span className="group-hover:tracking-widest transition-all">Send Message</span>
           </NeuButton>
        </form>
     </div>

     {/* Right: Info */}
     <div className="contact-info w-full md:w-[40%] flex flex-col justify-center h-full pt-8 md:pt-16" style={{ transform: is3D ? "translateZ(250px)" : "none", transformStyle: "preserve-3d" }}>
        <div className="space-y-8">
           <div className="open-to-work inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono font-medium sway-3d">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Open to Work
           </div>
           
           <div>
              <span className="text-xs font-mono uppercase tracking-widest text-text-muted mb-2 block">Connect</span>
              <a href={`mailto:${portfolioData.social.email}`} className="text-xl md:text-2xl text-text-primary hover:text-accent-primary transition-colors font-medium pointer-events-auto break-all">
                {portfolioData.social.email}
              </a>
           </div>
           
           <div>
              <span className="text-xs font-mono uppercase tracking-widest text-text-muted mb-4 block">Find Me Online</span>
              <div className="flex gap-4 flex-wrap social-links">
                <a href={portfolioData.social.github} className="social-link px-4 py-2 rounded-full border border-border-default text-text-secondary hover:text-text-primary hover:border-text-primary transition-colors uppercase font-bold tracking-wider text-xs pointer-events-auto hover-lift-3d">GitHub</a>
                <a href={portfolioData.social.linkedin} className="social-link px-4 py-2 rounded-full border border-border-default text-text-secondary hover:text-text-primary hover:border-text-primary transition-colors uppercase font-bold tracking-wider text-xs pointer-events-auto hover-lift-3d">LinkedIn</a>
                <a href={portfolioData.social.twitter} className="social-link px-4 py-2 rounded-full border border-border-default text-text-secondary hover:text-text-primary hover:border-text-primary transition-colors uppercase font-bold tracking-wider text-xs pointer-events-auto hover-lift-3d">Twitter</a>
              </div>
           </div>

           <div className="pt-4 border-t border-border-subtle">
              <p className="text-sm text-text-muted">Based in Delhi, India.<br />Building things that matter.</p>
           </div>
        </div>
     </div>
  </div>
);

export default function ContactSection({ is3D }: { is3D: boolean }) {
  const floorRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!is3D || !floorRef.current || !formRef.current) return;
    const startNum = CAMERA_STOPS.contact.scrollDistance;
    const endNum = CAMERA_STOPS.end.scrollDistance;

    gsap.set(floorRef.current, { opacity: 0, scale: 0.5, rotateX: -10 });
    gsap.set(formRef.current, { visibility: "hidden", opacity: 0, scale: 0.8, rotateY: -15 });
    
    ScrollTrigger.create({
      trigger: document.body,
      start: startNum - 400,
      end: endNum,
      onEnter: () => {
         gsap.to(floorRef.current, { opacity: 1, scale: 1, rotateX: 0, duration: 1.0, ease: "power2.out" });
         gsap.to(formRef.current, { visibility: "visible", opacity: 1, scale: 1, rotateY: 0, duration: 0.8, delay: 0.2, ease: "back.out(1.2)" });
      },
      onLeaveBack: () => {
         gsap.to(floorRef.current, { opacity: 0, scale: 0.2, rotateX: -10, duration: 0.8 });
         gsap.to(formRef.current, { visibility: "hidden", opacity: 0, scale: 0.5, rotateY: -15, duration: 0.4 });
      }
    });

  }, [is3D]);

  // Non-3D mode: 3D entrance animations
  useEffect(() => {
    if (is3D || !sectionRef.current) return;

    // Form slides in from left with rotation
    const formCard = sectionRef.current.querySelector(".surface-card");
    if (formCard) {
      gsap.fromTo(formCard,
        { opacity: 0, x: -80, rotateY: -15, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formCard,
            start: "top 85%",
          }
        }
      );
    }

    // Info panel slides in from right
    const infoPanel = sectionRef.current.querySelector(".contact-info");
    if (infoPanel) {
      gsap.fromTo(infoPanel,
        { opacity: 0, x: 80, rotateY: 15, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.9,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoPanel,
            start: "top 85%",
          }
        }
      );
    }

    // Stagger input fields
    const inputs = sectionRef.current.querySelectorAll(".contact-input");
    gsap.fromTo(inputs,
      { opacity: 0, y: 20, rotateX: -10 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );

    // Social links stagger
    const socialLinks = sectionRef.current.querySelectorAll(".social-link");
    gsap.fromTo(socialLinks,
      { opacity: 0, scale: 0.8, rotateY: -20 },
      {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        }
      }
    );
  }, [is3D]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className={`w-full ${is3D ? "fixed inset-0 pointer-events-none origin-center" : "py-24 relative"}`}
      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
    >
      {is3D ? (
        <div className="absolute top-0 left-0 w-full h-full preserve-3d" style={{ backfaceVisibility: "visible" }}>
           <div 
             ref={floorRef}
             className="absolute inset-0 flex items-center justify-center p-8 preserve-3d pointer-events-auto origin-center"
           >
              {/* Floor grid reveal with wave animation */}
              <div 
                className="absolute inset-0 pointer-events-none -z-10 wave-floor"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                  transform: "perspective(1000px) rotateX(60deg) scale(3) translateY(20%)",
                  transformOrigin: "bottom center",
                  maskImage: "linear-gradient(to top, rgba(0,0,0,1), transparent)",
                  WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1), transparent)"
                }}
              />
              <div className="w-full max-w-6xl preserve-3d">
                 <Content formRef={formRef} handleFormSubmit={handleFormSubmit} is3D={is3D} />
              </div>
           </div>
        </div>
      ) : (
        <div className="px-6">
           <Content formRef={formRef} handleFormSubmit={handleFormSubmit} is3D={is3D} />
        </div>
      )}
    </section>
  );
}
