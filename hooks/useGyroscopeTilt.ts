"use client";

import { useState, useCallback, useRef } from "react";

export function useGyroscopeTilt(maxTilt = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top;  // y position within the element
      
      // Calculate normalized intersection (-1 to 1)
      const xNorm = (x / rect.width) * 2 - 1;
      const yNorm = (y / rect.height) * 2 - 1;
      
      // Map logic: moving mouse right (positive xNorm) should rotate around Y axis positively.
      // Moving mouse down (positive yNorm) should rotate around X axis negatively (top tilts away).
      setTilt({
        x: -yNorm * maxTilt,
        y: xNorm * maxTilt,
      });
    },
    [maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return { ref, tilt, handleMouseMove, handleMouseLeave };
}
