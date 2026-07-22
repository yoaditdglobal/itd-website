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
 * - Desktop (lg): end-aware prev/next arrows, a progress bar, and drag-to-scroll.
 * - Mobile/tablet: the snap track = native touch swipe (no arrows/drag/progress).
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
  const [progress, setProgress] = useState(0);
  const reduceMotion = useRef(false);

  // ── Mobile autoplay (<1024px only; desktop behavior untouched) ──
  // Cards advance left→right on an interval, pause while the user is
  // touching, and loop back to the start at the end. Gated like
  // IntegrationCarousel: in view + visible tab + no reduced motion.
  const AUTOPLAY_MS = 3800;
  const RESUME_AFTER_MS = 4000;
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false); // false on SSR → autoplay starts post-mount
  const [paused, setPaused] = useState(false); // true while touching / shortly after
  const [reducedMotion, setReducedMotion] = useState(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotion.current = mqReduce.matches;
    setReducedMotion(mqReduce.matches);
    const onReduce = (e: MediaQueryListEvent) => {
      reduceMotion.current = e.matches;
      setReducedMotion(e.matches);
    };
    mqReduce.addEventListener("change", onReduce);

    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const onBp = () => setIsMobile(!mqDesktop.matches);
    onBp();
    mqDesktop.addEventListener("change", onBp);

    setPageVisible(!document.hidden);
    const onVis = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);

    const el = trackRef.current;
    let io: IntersectionObserver | undefined;
    if (el && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => setInView(entries[0]?.isIntersecting ?? false),
        { threshold: 0.2 },
      );
      io.observe(el);
    } else {
      setInView(true);
    }

    return () => {
      mqReduce.removeEventListener("change", onReduce);
      mqDesktop.removeEventListener("change", onBp);
      document.removeEventListener("visibilitychange", onVis);
      io?.disconnect();
    };
  }, []);

  // Touch pause/resume — touch events are unambiguous on a native-scroll
  // track (pointer events get cancelled once the browser takes over).
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const pause = () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      setPaused(true);
    };
    const scheduleResume = () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(() => setPaused(false), RESUME_AFTER_MS);
    };
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", scheduleResume, { passive: true });
    el.addEventListener("touchcancel", scheduleResume, { passive: true });
    return () => {
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", scheduleResume);
      el.removeEventListener("touchcancel", scheduleResume);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
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
    // One "page" ≈ the width of the first slide + gap; fall back to ~80%.
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: reduceMotion.current ? "auto" : "smooth" });
  }, []);

  // The autoplay tick. End detection reads the DOM each tick (matches
  // update()'s 4px tolerance — snap-proximity rarely lands exactly on max).
  useEffect(() => {
    const shouldPlay = isMobile && inView && pageVisible && !paused && !reducedMotion;
    if (!shouldPlay) return;
    const id = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return; // nothing to scroll
      if (el.scrollLeft >= max - 4) {
        el.scrollTo({ left: 0, behavior: "smooth" }); // loop back to the start
      } else {
        scrollByCards(1);
      }
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isMobile, inView, pageVisible, paused, reducedMotion, scrollByCards]);

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

      {/* Desktop controls: progress bar + end-aware arrows. */}
      <div className="mt-6 hidden items-center justify-between gap-4 lg:flex">
        <div className="h-1 max-w-[160px] flex-1 overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-150"
            style={{ width: `${Math.max(12, progress * 100)}%` }}
          />
        </div>
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
