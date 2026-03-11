"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface ParallaxValues {
  rotateX: number;
  rotateY: number;
  mouseX: number;
  mouseY: number;
}

export function useMouseParallax(strength: number = 1) {
  const [values, setValues] = useState<ParallaxValues>({
    rotateX: 0,
    rotateY: 0,
    mouseX: 0,
    mouseY: 0,
  });

  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to -1 to 1
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;

      targetRef.current = { x: normalizedX, y: normalizedY };
    };

    // Smooth interpolation loop
    const animate = () => {
      const lerp = 0.08;
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lerp;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lerp;

      const maxRotation = 8 * strength;
      setValues({
        rotateX: -currentRef.current.y * maxRotation,
        rotateY: currentRef.current.x * maxRotation,
        mouseX: currentRef.current.x,
        mouseY: currentRef.current.y,
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [strength]);

  return values;
}
