"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export interface ZoomParallaxItem {
  id: string;
  content: React.ReactNode;
  className?: string;
}

interface ZoomParallaxProps {
  items: ZoomParallaxItem[];
  containerHeightClass?: string;
}

export function ParallaxZoomRig({
  items,
  containerHeightClass = "h-[400vh]",
}: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Base zooming scales to push elements towards the camera
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <div ref={container} className={`relative w-full ${containerHeightClass}`}>
      <div className="sticky top-0 h-screen overflow-hidden bg-background-primary">
        {items.map((item, index) => {
          const scale = scales[index % scales.length];

          // Distribute the floating sections randomly around the view
          // We map these classes to string template literals to emulate depth and spread
          let layoutClasses = "";
          if (index === 0) {
             // Hero
             layoutClasses = "w-full h-full flex items-center justify-center";
          } else if (index === 1) {
             // About
             layoutClasses = "top-[10vh] left-[5vw] h-[30vh] w-[45vw] opacity-80";
          } else if (index === 2) {
             // Skills
             layoutClasses = "top-[40vh] left-[55vw] h-[45vh] w-[35vw] opacity-80";
          } else if (index === 3) {
             // Projects
             layoutClasses = "top-[5vh] left-[65vw] h-[25vh] w-[25vw] opacity-70";
          } else if (index === 4) {
             // Experience
             layoutClasses = "top-[50vh] left-[10vw] h-[25vh] w-[30vw] opacity-70";
          } else if (index === 5) {
             // Contact
             layoutClasses = "top-[25vh] left-[35vw] h-[50vh] w-[40vw] opacity-60";
          }

          return (
            <motion.div
              key={item.id}
              style={{ scale }}
              className={`absolute top-0 w-full h-full flex items-center justify-center`}
            >
              <div className={`absolute ${layoutClasses} ${item.className || ""}`}>
                {item.content}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
