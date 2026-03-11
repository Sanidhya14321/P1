"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export function CustomCursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    // MatchMedia check to ensure pointer device
    if (!window.matchMedia("(pointer: fine)").matches) return;

    // Movement tracking
    const onMouseMove = (e: MouseEvent) => {
      // Dot follows immediately without easing for precise targeting
      gsap.to(cursorDot.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      });

      // Ring follows conditionally with lag
      gsap.to(cursorRing.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out"
      });
    };

    // Hover state detection
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Triggers for anchors, buttons, and elements denoting an interactive role
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Scroll shrinking detection
    let scrollTimeout: NodeJS.Timeout;
    const onScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 150);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Compute classes based on state
  const ringScale = isHovering ? "scale-[2.5]" : isScrolling ? "scale-50 opacity-0" : "scale-100";
  const ringBorder = isHovering ? "border-accent-primary/40 backdrop-blur-[2px]" : "border-text-secondary/20";
  const dotScale = isScrolling ? "scale-50" : isHovering ? "scale-0 opacity-0" : "scale-100";

  return (
    <>
      {/* Floating Ring */}
      <div 
        ref={cursorRing}
        className={`fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-solid pointer-events-none z-[100] transition-all duration-300 ease-out ${ringScale} ${ringBorder}`}
      />
      
      {/* Center Dot */}
      <div 
        ref={cursorDot}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-accent-primary pointer-events-none z-[101] transition-transform duration-200 shadow-[0_0_8px_rgba(99,102,241,0.8)] ${dotScale}`}
      />
    </>
  );
}
