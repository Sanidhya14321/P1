"use client";

import { useEffect, useState } from "react";
import { SECTIONS } from "@/lib/constants";

export function useSectionObserver() {
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Using Intersection Observer for non-3D layouts (mobile/tablet)
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the currently intersecting section
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -60% 0px", // Trigger when element hits top 20% of viewport
        threshold: [0, 0.2, 0.5, 0.8, 1],
      }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return activeSection;
}
