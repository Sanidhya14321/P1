"use client";

export function StandardScrollLayout({ children }: { children: React.ReactNode }) {
  // A standard wrapper for native vertical scrolling contexts.
  // It provides standard padding, gap rhythm, and vertical flow without absolute 3D positioning.
  return (
    <div className="flex flex-col w-full min-h-screen bg-background-primary overflow-x-hidden pt-24 pb-32 gap-32 px-6">
      {children}
    </div>
  );
}
