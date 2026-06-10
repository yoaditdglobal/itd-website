"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function TimelinePlane() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const spine = document.querySelector<HTMLElement>("[data-timeline-spine]");
      if (spine) {
        const rect = spine.getBoundingClientRect();
        const windowH = window.innerHeight;
        const entered = windowH - rect.top;
        const total = rect.height + windowH;
        setProgress(Math.min(Math.max(entered / total, 0), 1));
      }
      rafRef.current = requestAnimationFrame(update);
    };
    rafRef.current = requestAnimationFrame(update);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="absolute left-4 z-20"
      style={{ top: `${progress * 100}%`, transform: "translate(-50%, -50%)" }}
      aria-hidden
    >
      <Image
        src="/about/plane.png"
        alt=""
        width={140}
        height={140}
        className="drop-shadow-lg"
      />
    </div>
  );
}
