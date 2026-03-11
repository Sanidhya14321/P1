"use client";

import React, { ButtonHTMLAttributes } from "react";

interface NeuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function NeuButton({ children, className = "", ...props }: NeuButtonProps) {
  return (
    <button
      className={`
        relative px-8 py-4 font-semibold text-text-primary rounded-xl transition-all duration-300
        bg-[#18181B] border border-white/5
        /* Dual Mid-tone Shadows for Neumorphic look resting */
        shadow-[4px_4px_10px_rgba(0,0,0,0.5),-4px_-4px_10px_rgba(255,255,255,0.02)]
        hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:text-accent-primary
        active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.4),inset_-4px_-4px_8px_rgba(255,255,255,0.04)]
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
