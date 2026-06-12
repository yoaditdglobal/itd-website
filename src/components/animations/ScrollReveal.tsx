"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the animation starts. Used to stagger lists. */
  delay?: number;
  /** Intersection threshold (0-1). Default 0.1 — fires when 10% of element is in view. */
  threshold?: number;
  /** Disable animation entirely (e.g. above-the-fold hero where instant render is fine). */
  disabled?: boolean;
}

/**
 * Fade + translate-up animation on scroll, using IntersectionObserver.
 * Honours `prefers-reduced-motion` — animation disabled when user prefers reduced motion.
 * SSR-safe: starts in the "visible" state until JS hydrates, so search engines and
 * users with JS disabled see the content (no opacity-0 trap).
 */
export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.1,
  disabled = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  // Hydrate as "not yet shown" so we can animate in. SSR renders fully visible
  // (visible=true) to avoid empty content during hydration.
  const [hydrated, setHydrated] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setHydrated(true);

    if (disabled) {
      setVisible(true);
      return;
    }

    // Respect reduced motion preference.
    if (typeof window !== "undefined" && window.matchMedia) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (reduce.matches) {
        setVisible(true);
        return;
      }
    }

    const el = ref.current;
    if (!el) return;

    // Fallback: if IntersectionObserver isn't available, just show.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    // Check if element is already in the viewport on mount.
    // IntersectionObserver only fires when crossing the threshold, so above-the-fold
    // content (which is visible from the start) would never animate in without this.
    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (inViewport) {
      // After the initial page-load window this mount is a client-side
      // navigation: reveal instantly so pages don't re-fade on every route
      // change. Only the first load gets the entrance animation.
      if (performance.now() > 4000) {
        setVisible(true);
        return;
      }
      // Fire on next paint so the user sees the entrance animation.
      requestAnimationFrame(() => setVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [disabled, threshold]);

  // Before hydration: render fully visible (SSR / no-JS).
  // After hydration: animate from hidden to visible when in view.
  const animatedState = hydrated ? visible : true;

  const transitionStyle: React.CSSProperties = hydrated
    ? {
        opacity: animatedState ? 1 : 0,
        transform: animatedState ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 600ms ease-out, transform 600ms ease-out",
        transitionDelay: `${delay * 1000}ms`,
        willChange: animatedState ? "auto" : "opacity, transform",
      }
    : {};

  return (
    <div ref={ref} className={className} style={transitionStyle}>
      {children}
    </div>
  );
}
