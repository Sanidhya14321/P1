"use client";

import { useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import { SECTIONS, CAMERA_STOPS } from "@/lib/constants";
import { useZScroll } from "@/hooks/useZScroll";
import { useSectionObserver } from "@/hooks/useSectionObserver";
import type { ResponsiveMode } from "@/hooks/useResponsiveMode";
import { Home, User, Code, Briefcase, GitCommit, Mail } from "lucide-react";

const ICONS: Record<string, React.ElementType> = {
  hero: Home,
  about: User,
  skills: Code,
  projects: Briefcase,
  experience: GitCommit,
  contact: Mail,
};

export function Navigation({ mode }: { mode: ResponsiveMode }) {
  const is3D = mode === "desktop-3d";
  const { zProgress } = useZScroll();
  const activeSectionNative = useSectionObserver();
  const [activeItem, setActiveItem] = useState(SECTIONS[0].id);

  // Sync active section based on scroll mode
  useEffect(() => {
    if (is3D) {
      const scrollY = window.scrollY;
      let newActive = SECTIONS[0].id;
      
      // Reverse loop to find the deepest section we've passed
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const targetDistance = CAMERA_STOPS[SECTIONS[i].id as keyof typeof CAMERA_STOPS].scrollDistance;
        // Buffer of 300px to switch slightly before exact arrival
        if (scrollY >= targetDistance - 300) {
          newActive = SECTIONS[i].id;
          break;
        }
      }
      if (newActive) {
        if (newActive !== activeItem) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setActiveItem(newActive);
        }
      }
    } else {
        if (activeSectionNative !== undefined && activeSectionNative !== activeItem) { 
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setActiveItem(activeSectionNative);
        }
    }
  }, [is3D, zProgress, activeSectionNative, activeItem]);

  const handleNavClick = (id: string) => {
    if (is3D) {
      // Tween window scroll to the target scrollDistance
      const targetScroll = CAMERA_STOPS[id as keyof typeof CAMERA_STOPS].scrollDistance;
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth"
      });
    } else {
      // Standard local anchor scroll
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (mode === "mobile") {
    // Bottom Tab Bar
    return (
      <nav className="fixed bottom-0 left-0 w-full bg-background-elevated border-t border-border-subtle z-50 pb-safe">
        <ul className="flex justify-around items-center h-16 px-2">
          {SECTIONS.map((section) => {
            const Icon = ICONS[section.id];
            const isActive = activeItem === section.id;
            return (
              <li key={section.id} className="flex-1">
                <button
                  onClick={() => handleNavClick(section.id)}
                  className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                    isActive ? "text-accent-primary" : "text-text-muted hover:text-text-secondary"
                  }`}
                  aria-label={`Scroll to ${section.label}`}
                >
                  <Icon size={20} className={isActive ? "scale-110 transition-transform" : "scale-100"} />
                  <span className="text-[10px] font-medium">{section.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  // Desktop / Tablet Floating Pill
  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 surface-glass px-2 py-2 rounded-full border border-border-subtle shadow-xl">
        <ul className="flex items-center space-x-1">
          {SECTIONS.map((section) => {
            const isActive = activeItem === section.id;
            return (
              <li key={section.id}>
                <button
                  onClick={() => handleNavClick(section.id)}
                  className="relative px-4 py-2 text-sm font-medium transition-colors"
                >
                  <span className={`relative z-10 ${isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"}`}>
                    {section.label}
                  </span>
                  {isActive && (
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-primary shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Desktop Left Section Iterator */}
      {is3D && (
        <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4 mix-blend-difference text-white/50 font-mono text-sm">
          <div className="w-[1px] h-24 bg-gradient-to-b from-transparent to-white/20" />
          <span className="-rotate-90 tracking-widest uppercase my-8 w-24 text-center">
            {SECTIONS.find(s => s.id === activeItem)?.label || "Launch"}
          </span>
          <div className="w-[1px] h-24 bg-gradient-to-t from-transparent to-white/20" />
        </div>
      )}
    </>
  );
}
