"use client";

import { useState, useEffect } from "react";
import { BREAKPOINTS } from "@/lib/constants";

export type ResponsiveMode = "desktop-3d" | "tablet" | "mobile";

export function useResponsiveMode(): ResponsiveMode {
  const [mode, setMode] = useState<ResponsiveMode>("tablet");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMode = () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const width = window.innerWidth;

      if (prefersReducedMotion) {
        if (width < BREAKPOINTS.mobile) return setMode("mobile");
        return setMode("tablet");
      }

      if (width < BREAKPOINTS.mobile) {
        setMode("mobile");
      } else if (width < BREAKPOINTS.tablet) {
        setMode("tablet");
      } else {
        setMode("desktop-3d");
      }
    };

    checkMode();
    window.addEventListener("resize", checkMode);
    return () => window.removeEventListener("resize", checkMode);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return mounted ? mode : "tablet";
}
