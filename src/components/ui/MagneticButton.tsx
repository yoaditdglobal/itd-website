"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  /** Maximum cursor-following pull in pixels. Default 8. */
  strength?: number;
  /** Damping factor — lower = more elastic, higher = snappier. Default 0.18. */
  damping?: number;
  /** Optional className applied to the outer wrapper. */
  className?: string;
}

/**
 * Cursor-following magnetic effect for primary CTAs.
 * Wraps children (usually a Button) and pulls them toward the cursor
 * within a max radius. Snaps back to centre on mouse leave.
 * Disabled when prefers-reduced-motion is set, on touch devices, and on
 * viewports < 768px (no hover capability assumed).
 */
export default function MagneticButton({
  children,
  strength = 8,
  damping = 0.18,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Detect if the device supports hover + has fine pointer + no reduced motion.
    if (typeof window === "undefined") return;
    const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(supportsHover && !reducedMotion);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      // Clamp to ±strength, scaled by distance.
      const dist = Math.sqrt(dx * dx + dy * dy);
      const max = Math.max(rect.width, rect.height) * 0.75;
      const factor = Math.min(dist / max, 1);
      targetRef.current.x = (dx / dist) * strength * factor || 0;
      targetRef.current.y = (dy / dist) * strength * factor || 0;
    };

    const onLeave = () => {
      targetRef.current.x = 0;
      targetRef.current.y = 0;
    };

    const tick = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * damping;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * damping;
      if (el) {
        el.style.transform = `translate3d(${currentRef.current.x.toFixed(2)}px, ${currentRef.current.y.toFixed(2)}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (el) el.style.transform = "";
    };
  }, [enabled, strength, damping]);

  return (
    <div
      ref={ref}
      className={`inline-block will-change-transform ${className}`}
      style={{ transition: enabled ? undefined : "none" }}
    >
      {children}
    </div>
  );
}
