"use client";

import { useEffect, useState } from "react";

/**
 * Slim 2px progress bar fixed below the navbar that fills as the user
 * scrolls down the page. Used on long-form pages (guides, glossary).
 * Honours prefers-reduced-motion — still works but without the transition.
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const pct = scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0;
      setProgress(pct);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="fixed left-0 right-0 z-40 h-[2px] bg-transparent pointer-events-none"
      style={{ top: "72px" }}
      aria-hidden
    >
      <div
        className="h-full bg-accent origin-left"
        style={{
          transform: `scaleX(${progress})`,
          transition: "transform 120ms linear",
        }}
      />
    </div>
  );
}
