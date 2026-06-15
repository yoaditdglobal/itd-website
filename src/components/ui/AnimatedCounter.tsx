"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
  /** "dark" (default) → white text on dark bg. "light" → dark text on light bg. */
  surface?: "dark" | "light";
}

export default function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  label,
  duration = 2000,
  surface = "dark",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  const numberClass =
    surface === "light" ? "text-text-primary" : "text-white";
  const labelClass =
    surface === "light" ? "text-text-tertiary" : "text-white/60";
  return (
    <div ref={ref} className="text-center">
      <div className={`text-stat-xl ${numberClass}`}>
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className={`mt-1 text-body-sm ${labelClass}`}>{label}</div>
    </div>
  );
}
