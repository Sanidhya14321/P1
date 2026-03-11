"use client";

export function TechChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-white/5 border border-white/10 text-text-secondary hover:text-text-primary hover:border-white/20 transition-colors">
      {children}
    </span>
  );
}
