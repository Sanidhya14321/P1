"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { CAMERA_STOPS } from "@/lib/constants";
import { useMouseParallax } from "@/hooks/useMouseParallax";

export function CameraRig({ children }: { children: React.ReactNode }) {
  const rigRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const { rotateX, rotateY } = useMouseParallax(0.4);
  const [spacerH, setSpacerH] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSpacerH(CAMERA_STOPS.end.scrollDistance + window.innerHeight);
    }
  }, []);

  // Apply mouse parallax tilt to the entire viewport for immersive 3D feel
  useEffect(() => {
    if (!viewportRef.current) return;
    gsap.to(viewportRef.current, {
      rotateX: rotateX * 0.5,
      rotateY: rotateY * 0.5,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, [rotateX, rotateY]);

  return (
    <>
      <div 
        ref={viewportRef}
        className="fixed inset-0 w-full h-full overflow-hidden" 
        style={{ 
          perspective: "1200px",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          id="camera-rig"
          ref={rigRef}
          className="w-full h-full absolute top-0 left-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
      {/* Spacer to allow standard window scrolling that triggers GSAP */}
      <div style={{ height: `${spacerH}px` }} />
    </>
  );
}
