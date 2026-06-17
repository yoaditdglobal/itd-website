"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll-driven "jump forward" reveal for the section that follows the pinned
 * hero. As this wrapper enters the viewport (which happens exactly as the hero's
 * Three.js track finishes), its content surges toward the viewer out of depth —
 * perspective + translateZ/translateY + fade — then settles flat. Once arrived
 * it is fully reset (transform: none), so the rest of the page scrolls on one
 * level; scrolling back up replays/reverses it.
 *
 * Mirrors the hero's own idiom (passive scroll + a single RAF + direct style
 * writes, no React state per frame, prefers-reduced-motion → static). The white
 * wrapper background + overflow clip present a clean slab so neighbouring
 * sections never bleed in behind the receding content.
 */
const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
// expo-out: rushes forward, settles softly (matches the site's premium ease).
const easeOut = (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));

export default function ScrollForward({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let running = false;

    const apply = (t: number) => {
      if (t >= 1) {
        // Arrived → fully flat, no lingering 3D context.
        inner.style.transform = "none";
        inner.style.opacity = "";
        inner.style.willChange = "auto";
        return;
      }
      const e = easeOut(t);
      const ty = ((1 - e) * 60).toFixed(1);
      const tz = ((1 - e) * -300).toFixed(1);
      inner.style.transform = `perspective(1100px) translateY(${ty}px) translateZ(${tz}px)`;
      inner.style.opacity = (0.35 + e * 0.65).toFixed(3);
      inner.style.willChange = "transform, opacity";
    };

    const tick = () => {
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when the wrapper top is at the viewport bottom (= hero track end),
      // 1 once it has risen to ~45% of the viewport.
      apply(clamp01((vh - rect.top) / (vh * 0.55)));
      const nearFold = rect.top < vh * 1.25 && rect.bottom > -vh * 0.25;
      if (nearFold) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const ensureRunning = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    ensureRunning();
    const onScroll = () => ensureRunning();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", ensureRunning);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", ensureRunning);
      cancelAnimationFrame(raf);
      inner.style.transform = "";
      inner.style.opacity = "";
      inner.style.willChange = "";
    };
  }, []);

  return (
    <div ref={wrapperRef} className={`relative overflow-hidden bg-white ${className}`}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
}
