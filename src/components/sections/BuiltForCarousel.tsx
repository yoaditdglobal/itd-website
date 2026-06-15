"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Big horizontal carousel for the "Built for" solution cards.
 * - Children are server-rendered cards (each `snap-start shrink-0`).
 * - Desktop (pointer:fine): prev/next arrows, drag-to-scroll, a progress bar,
 *   and end-aware disabled arrows.
 * - Mobile/tablet: the same snap track = native touch swipe (no arrows/drag).
 * Card links stay real links; a small drag threshold prevents drag from
 * swallowing clicks. Smooth-scroll + drag are gated by prefers-reduced-motion.
 */
export default function BuiltForCarousel({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [progress, setProgress] = useState(0);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current =
      typeof window !== "undefined" &&
      !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < max - 4);
    setProgress(max > 0 ? el.scrollLeft / max : 0);
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
    // One "page" ≈ the width of the first card + gap, falling back to ~80%.
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({
      left: dir * step,
      behavior: reduceMotion.current ? "auto" : "smooth",
    });
  }, []);

  // ── Drag-to-scroll (pointer:fine only). Threshold keeps card clicks working. ──
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startLeft: el.scrollLeft,
      moved: false,
    };
  };
  const onPointerMove = (e: React.PointerEvent) => {
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
  const endDrag = (e: React.PointerEvent) => {
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
    void e;
  };

  return (
    <div
      role="region"
      aria-label="Solutions"
      aria-roledescription="carousel"
      className="relative"
    >
      <div
        ref={trackRef}
        className={`flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-proximity lg:cursor-grab lg:active:cursor-grabbing ${
          reduceMotion.current ? "" : "scroll-smooth"
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        {children}
        {/* Trailing spacer so the last card can snap clear of the edge. */}
        <span aria-hidden className="shrink-0 w-px" />
      </div>

      {/* Desktop controls: progress bar + arrows (Appinio-style, bottom). */}
      <div className="mt-6 hidden items-center justify-between gap-4 lg:flex">
          <div className="h-1 flex-1 max-w-[160px] rounded-full bg-border overflow-hidden">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-150"
              style={{ width: `${Math.max(12, progress * 100)}%` }}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => scrollByCards(-1)}
              disabled={!canLeft}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-text-primary transition-colors hover:border-accent/40 hover:text-accent disabled:opacity-40 disabled:hover:border-border disabled:hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
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
