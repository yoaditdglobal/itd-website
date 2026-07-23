"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Horizontal scroll-snap carousel for the Customer Stories cards.
 * - Children are the (server-rendered) sized slides; this shell only scrolls them.
 * - Desktop (lg): end-aware prev/next arrows and drag-to-scroll.
 * - Mobile/tablet: the snap track = native touch swipe (no arrows/drag).
 * Card links stay real links — a small drag threshold + a swallowed post-drag
 * click prevents a drag from triggering navigation. Smooth scroll + drag are
 * gated by prefers-reduced-motion.
 */
export default function CaseStudiesCarousel({
  children,
  label = "Customer stories",
}: {
  children: ReactNode;
  label?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const reduceMotion = useRef(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotion.current = mql.matches;
    const onChange = (e: MediaQueryListEvent) => {
      reduceMotion.current = e.matches;
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCards = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    // One "page" ≈ the width of the first slide + gap; fall back to ~80%.
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: reduceMotion.current ? "auto" : "smooth" });
  }, []);

  // ── Drag-to-scroll (mouse only). Threshold keeps card clicks working. ──
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });

  const onPointerDown = (e: ReactPointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false };
  };
  const onPointerMove = (e: ReactPointerEvent) => {
    const d = drag.current;
    const el = trackRef.current;
    if (!d.active || !el) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 6) d.moved = true;
    if (d.moved) {
      el.scrollLeft = d.startLeft - dx;
      el.style.scrollSnapType = "none"; // free drag; restored on release
    }
  };
  const endDrag = () => {
    const el = trackRef.current;
    if (drag.current.active && drag.current.moved && el) {
      // Swallow the click that would otherwise fire on a card link after a drag.
      const swallow = (ev: Event) => {
        ev.preventDefault();
        ev.stopPropagation();
      };
      el.addEventListener("click", swallow, { capture: true, once: true });
      el.style.scrollSnapType = "";
    }
    drag.current.active = false;
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className="relative">
      <div
        ref={trackRef}
        className={`flex gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-proximity lg:cursor-grab lg:active:cursor-grabbing ${
          reduceMotion.current ? "" : "scroll-smooth"
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        {children}
        {/* Trailing spacer so the last card can snap clear of the edge. */}
        <span aria-hidden className="w-px shrink-0" />
      </div>

      {/* Desktop controls: end-aware arrows. */}
      <div className="mt-6 hidden items-center justify-end gap-4 lg:flex">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous stories"
            onClick={() => scrollByCards(-1)}
            disabled={!canLeft}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-text-primary transition-colors hover:border-accent/40 hover:text-accent disabled:opacity-40 disabled:hover:border-border disabled:hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next stories"
            onClick={() => scrollByCards(1)}
            disabled={!canRight}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-text-primary transition-colors hover:border-accent/40 hover:text-accent disabled:opacity-40 disabled:hover:border-border disabled:hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
