"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export function StatCounter({ value, label }: { value: string; label: string }) {
  const numRef = useRef<HTMLSpanElement>(null);
  
  // Parse numeric part and suffix for the count effect
  const numericPart = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!numRef.current) return;

    // We animate a proxy object instead of the DOM directly for numbers
    const proxy = { val: 0 };
    
    gsap.to(proxy, {
      val: numericPart,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: numRef.current,
        start: "top 80%",   // Triggers when element is in 80% viewport
        once: true,         // Only count up once
      },
      onUpdate: () => {
        if (numRef.current) {
          numRef.current.innerText = Math.floor(proxy.val).toLocaleString() + suffix;
        }
      }
    });
  }, [numericPart, suffix]);

  return (
    <div className="flex flex-col items-center sm:items-start text-text-primary">
      <span ref={numRef} className="text-[var(--text-section-title)] font-extrabold text-accent-primary leading-tight">
        0{suffix}
      </span>
      <span className="text-text-secondary text-sm font-mono mt-1 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}
