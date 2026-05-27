"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** Final value to animate to. */
  to: number;
  /** Starting value. Default 0. */
  from?: number;
  /** Animation duration in ms. Default 1800. */
  duration?: number;
  /** Optional prefix character/string (e.g. "+", "£"). */
  prefix?: string;
  /** Optional suffix character/string (e.g. "%", "+"). */
  suffix?: string;
  /** Decimal places (default 0). */
  decimals?: number;
  /** Add thousands separator (default true). */
  separator?: boolean;
  /** Intersection threshold (0-1). Default 0.4. */
  threshold?: number;
  /** Optional className applied to the wrapping span. */
  className?: string;
}

/**
 * Animates a number from `from` to `to` once the element enters the viewport.
 * Returns inline text so parent components own all styling (font, size, colour).
 * Honours `prefers-reduced-motion` — jumps straight to the final value when set.
 */
export default function CountUp({
  to,
  from = 0,
  duration = 1800,
  prefix = "",
  suffix = "",
  decimals = 0,
  separator = true,
  threshold = 0.4,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState<number>(from);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion: snap to final value and skip animation.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setValue(to);
      hasAnimated.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const span = to - from;

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(from + span * eased);
            if (progress < 1) requestAnimationFrame(tick);
            else setValue(to);
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [from, to, duration, threshold]);

  const formatted = (() => {
    const n = Number(value.toFixed(decimals));
    if (!separator) return n.toString();
    // Locale-aware thousands separator. en-GB to match the British convention.
    return n.toLocaleString("en-GB", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  })();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
