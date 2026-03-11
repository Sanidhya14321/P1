import { useState, useEffect } from "react";

export function useZScroll() {
  const [zProgress, setZProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
      setZProgress(Math.min(1, Math.max(0, window.scrollY / maxScroll)));
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    
    // We also need a resize observer to handle content changes
    const ro = new ResizeObserver(updateScroll);
    ro.observe(document.body);

    return () => {
      window.removeEventListener("scroll", updateScroll);
      if (document.body) ro.unobserve(document.body);
      ro.disconnect();
    };
  }, []);

  return { zProgress };
}
