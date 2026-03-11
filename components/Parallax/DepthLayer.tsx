"use client";
import React, { useEffect, useState } from 'react';

type DepthLane = 0 | 1 | 2 | 3 | 4 | 5;

export interface DepthLayerProps {
  depth: DepthLane;
  speedMultiplier?: number;
  sticky?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const getDepthMultiplier = (depth: DepthLane) => {
  const multipliers = {
    0: 0.5,  // --parallax-z0 (Far background)
    1: 0.6,  // --parallax-z1
    2: 0.75, // --parallax-z2 (Mid background)
    3: 0.9,  // --parallax-z3 (Content layer)
    4: 1.0,  // --parallax-z4 (Foreground UI)
    5: 1.05  // --parallax-z5 (Pop-out, slightly faster)
  };
  return multipliers[depth];
};

export const DepthLayer: React.FC<DepthLayerProps> = ({ 
  depth, 
  speedMultiplier, 
  sticky, 
  children,
  className = '',
  style = {}
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const multiplier = speedMultiplier !== undefined ? speedMultiplier : getDepthMultiplier(depth);

  const customStyles: React.CSSProperties = {
    position: sticky ? 'sticky' : 'absolute',
    top: sticky ? 0 : undefined,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: depth, // Standard stacking order matches depth lane
    pointerEvents: depth >= 4 ? 'auto' : 'none', 
    ...style,
  } as React.CSSProperties;

  return (
    <div 
      className={`depth-layer layer-z${depth} ${className}`}
      data-speed={prefersReducedMotion ? 1 : multiplier}
      data-depth={depth}
      style={customStyles}
      aria-hidden={depth < 3 ? 'true' : 'false'}
    >
      {children}
    </div>
  );
};
