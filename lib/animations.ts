import { gsap } from "gsap";
import { EASING, DURATIONS } from "./constants";

export const animations = {
  fadeUp: (target: string | Element | null, delay = 0) => {
    return gsap.fromTo(
      target,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: DURATIONS.default,
        ease: EASING.default,
        delay,
      }
    );
  },
  
  scaleIn: (target: string | Element | null, delay = 0) => {
    return gsap.fromTo(
      target,
      { opacity: 0, scale: 0.92 },
      {
        opacity: 1,
        scale: 1,
        duration: DURATIONS.default,
        ease: EASING.default,
        delay,
      }
    );
  },

  blurFocus: (target: string | Element | null, isProximate: boolean) => {
    return gsap.to(target, {
      filter: isProximate ? "blur(0px)" : "blur(4px)",
      opacity: isProximate ? 1 : 0.4,
      scale: isProximate ? 1 : 0.6,
      duration: DURATIONS.micro,
      ease: EASING.depth,
      overwrite: "auto",
    });
  },

  // ===== NEW 3D ANIMATION PRESETS =====

  flipIn3D: (target: string | Element | null, delay = 0, direction: "left" | "right" | "top" | "bottom" = "top") => {
    const fromVars: gsap.TweenVars = { opacity: 0 };
    const toVars: gsap.TweenVars = {
      opacity: 1,
      duration: 0.8,
      ease: "back.out(1.2)",
      delay,
    };

    switch (direction) {
      case "top":
        fromVars.rotateX = -60;
        fromVars.y = 40;
        toVars.rotateX = 0;
        toVars.y = 0;
        break;
      case "bottom":
        fromVars.rotateX = 60;
        fromVars.y = -40;
        toVars.rotateX = 0;
        toVars.y = 0;
        break;
      case "left":
        fromVars.rotateY = 60;
        fromVars.x = -60;
        toVars.rotateY = 0;
        toVars.x = 0;
        break;
      case "right":
        fromVars.rotateY = -60;
        fromVars.x = 60;
        toVars.rotateY = 0;
        toVars.x = 0;
        break;
    }

    return gsap.fromTo(target, fromVars, toVars);
  },

  rotateInFromSide: (target: string | Element | null, fromLeft = true, delay = 0) => {
    return gsap.fromTo(
      target,
      {
        opacity: 0,
        rotateY: fromLeft ? -30 : 30,
        x: fromLeft ? -80 : 80,
        scale: 0.9,
      },
      {
        opacity: 1,
        rotateY: 0,
        x: 0,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        delay,
      }
    );
  },

  perspectiveReveal: (target: string | Element | null, delay = 0) => {
    return gsap.fromTo(
      target,
      {
        opacity: 0,
        rotateX: -15,
        translateY: 60,
        scale: 0.95,
        filter: "blur(8px)",
      },
      {
        opacity: 1,
        rotateX: 0,
        translateY: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.0,
        ease: "power3.out",
        delay,
      }
    );
  },

  floatLoop: (target: string | Element | null) => {
    return gsap.to(target, {
      y: -12,
      rotateZ: 1.5,
      rotateX: 2,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  },

  staggerFlipIn: (targets: string | Element | Element[] | null, stagger = 0.08) => {
    return gsap.fromTo(
      targets,
      {
        opacity: 0,
        rotateX: -40,
        y: 30,
        scale: 0.9,
      },
      {
        opacity: 1,
        rotateX: 0,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger,
        ease: "back.out(1.4)",
      }
    );
  },
};
