"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";

/**
 * The homepage transition between the shipping cards and the audience pager:
 * one oversized typographic object — "Shipping solutions built for your
 * needs" — laid out as a single horizontal strip, wider than the viewport,
 * that travels across the screen as the page scrolls (a ticker driven by
 * scroll position, not time). A hairline reading line sits at 38% of the
 * viewport; each word lights up in reading order as its left edge crosses
 * that line (ghost outline → accent → ink). A thin accent rule at the foot of
 * the stage grows with progress.
 *
 * This `<h2>` is the REAL heading of the Solutions section that follows:
 * `SolutionsRouting` takes `headingId` and labels its `<section>` with it
 * instead of rendering its own small title, so the line is never said twice.
 *
 * Desktop + motion allowed: the stage pins (sticky) inside a tall track for
 * ~90vh of scroll while the strip travels, then releases straight into the
 * pager (whose own entry fade takes over). Same idiom as `SolutionsRouting` /
 * `ScrollForward`: passive scroll + a single rAF loop + direct style writes,
 * no React state per frame. The strip position follows scroll through a
 * short lag (lerp) so wheel notches don't slam it across the screen.
 *
 * Mobile / reduced motion / SSR: the same `<h2>` as a normally wrapped,
 * fully visible block — nothing pins, nothing moves.
 *
 * `forceEnhanced` bypasses the media-query gate for isolated previews. In
 * development `window.__itdStripProgress(p)` drives the strip to a progress
 * value directly (the preview harness can't scroll a pinned section).
 */
const WORDS = ["Shipping", "solutions", "built", "for", "your", "needs"] as const;
const SENTENCE = WORDS.join(" ");
const EYEBROW = "02 — Solutions";
/** Fraction of the viewport width where the reading line sits. */
const READING_LINE = 0.38;
/** Extra scroll (in vh) the stage stays pinned for while the strip travels. */
const PIN_SCROLL_VH = 90;

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
// smoothstep: the strip leaves and arrives gently but stays under the
// reader's control for the whole pin (an ease-out would spend half the travel
// in the first few notches of scroll).
const easeOut = (x: number) => x * x * (3 - 2 * x);
const pad2 = (n: number) => String(n).padStart(2, "0");

type WordState = "future" | "active" | "past";

export default function SolutionsStrip({
  headingId = "solutions-heading",
  forceEnhanced = false,
}: {
  headingId?: string;
  forceEnhanced?: boolean;
} = {}) {
  const [enhanced, setEnhanced] = useState(forceEnhanced);
  const trackRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLHeadingElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => {
      setEnhanced(forceEnhanced || (!mql.matches && window.innerWidth >= 1024));
    };
    decide();
    mql.addEventListener("change", decide);
    window.addEventListener("resize", decide);
    return () => {
      mql.removeEventListener("change", decide);
      window.removeEventListener("resize", decide);
    };
  }, [forceEnhanced]);

  useEffect(() => {
    if (!enhanced) return;
    const track = trackRef.current;
    const strip = stripRef.current;
    if (!track || !strip) return;

    // Geometry — measured on mount + resize, never per frame.
    let lefts: number[] = [];
    let line = 0;
    let startX = 0;
    let endX = 0;
    const states: WordState[] = WORDS.map(() => "future");

    // Motion state.
    let current = 0; // strip translateX actually painted
    let target = 0; // strip translateX the scroll position asks for
    let forced: number | null = null; // dev hook override for progress
    let raf = 0;
    let running = false;

    const measure = () => {
      const vw = window.innerWidth || 1;
      line = vw * READING_LINE;
      lefts = wordRefs.current.map((el) => (el ? el.offsetLeft : 0));
      const first = lefts[0] ?? 0;
      const last = lefts[lefts.length - 1] ?? 0;
      // Start: "Shipping" sits just right of the reading line, already on
      // screen, so the first notch of scroll lights it. End: "needs" parks a
      // little past the line so it is unambiguously lit before the pin ends.
      startX = line + vw * 0.08 - first;
      endX = line - vw * 0.05 - last;
    };

    const scrollProgress = () => {
      const rect = track.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      return range > 0 ? clamp01(-rect.top / range) : 0;
    };

    const paint = (x: number, t: number) => {
      strip.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;

      // Exactly one active word once the first has crossed the line: the last
      // word whose left edge is at or left of the reading line.
      let activeIdx = -1;
      for (let i = 0; i < lefts.length; i++) {
        if (lefts[i] + x <= line) activeIdx = i;
      }
      for (let i = 0; i < states.length; i++) {
        const next: WordState = i < activeIdx ? "past" : i === activeIdx ? "active" : "future";
        if (states[i] !== next) {
          states[i] = next;
          wordRefs.current[i]?.setAttribute("data-state", next);
        }
      }
      if (counterRef.current) {
        counterRef.current.textContent = `${pad2(activeIdx + 1)} / ${pad2(WORDS.length)}`;
      }
      if (ruleRef.current) {
        ruleRef.current.style.transform = `scaleX(${t.toFixed(4)})`;
      }
    };

    const tick = () => {
      const t = easeOut(forced ?? scrollProgress());
      target = startX + (endX - startX) * t;
      // Lagging follow — keeps wheel notches from slamming the strip.
      const delta = target - current;
      current = Math.abs(delta) < 0.5 ? target : current + delta * 0.14;
      paint(current, t);

      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const near = rect.bottom > -vh * 0.25 && rect.top < vh * 1.25;
      if (near && (forced === null || current !== target)) {
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

    const onResize = () => {
      measure();
      ensureRunning();
    };

    measure();
    // First paint lands exactly on target (no lag-in from 0 on a reload
    // mid-page).
    current = target = startX + (endX - startX) * easeOut(scrollProgress());
    strip.style.willChange = "transform";
    ensureRunning();

    window.addEventListener("scroll", ensureRunning, { passive: true });
    window.addEventListener("resize", onResize);

    type DevWindow = Window & { __itdStripProgress?: (p: number | null) => void };
    const devWindow = window as DevWindow;
    if (process.env.NODE_ENV !== "production") {
      devWindow.__itdStripProgress = (p) => {
        forced = p === null ? null : clamp01(p);
        if (forced !== null) {
          const t = easeOut(forced);
          current = target = startX + (endX - startX) * t;
          paint(current, t);
        }
        ensureRunning();
      };
    }

    return () => {
      window.removeEventListener("scroll", ensureRunning);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      strip.style.transform = "";
      strip.style.willChange = "";
      if (devWindow.__itdStripProgress) delete devWindow.__itdStripProgress;
    };
  }, [enhanced]);

  // ─── Mobile / reduced-motion / SSR: a plain, fully readable heading ───
  if (!enhanced) {
    return (
      <div className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-eyebrow text-text-tertiary">{EYEBROW}</p>
            <h2 id={headingId} className="mt-4 max-w-4xl text-display-xl text-text-primary">
              {SENTENCE}
            </h2>
          </ScrollReveal>
        </div>
      </div>
    );
  }

  // ─── Pinned travelling strip (desktop) ───
  return (
    <div className="bg-white">
      <div
        ref={trackRef}
        className="relative"
        style={{ height: `calc(100vh + ${PIN_SCROLL_VH}vh)` }}
      >
        <div className="sticky top-[72px] flex h-[calc(100vh-72px)] flex-col overflow-hidden">
          {/* Reading line — the words light as they cross it. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 top-0 w-px bg-text-primary/10"
            style={{ left: `${READING_LINE * 100}%` }}
          />

          <div className="mx-auto flex w-full max-w-7xl items-baseline justify-between px-4 pt-12 sm:px-6 lg:px-8">
            <p className="text-eyebrow text-text-tertiary">{EYEBROW}</p>
            <p className="text-caption tabular-nums text-text-tertiary" aria-hidden="true">
              <span ref={counterRef}>00 / {pad2(WORDS.length)}</span>
            </p>
          </div>

          <div className="flex flex-1 items-center">
            <h2
              id={headingId}
              ref={stripRef}
              className="w-max whitespace-nowrap text-display-2xl"
            >
              {WORDS.map((word, i) => (
                <span key={word}>
                  {i > 0 ? " " : null}
                  <span
                    ref={(el) => {
                      wordRefs.current[i] = el;
                    }}
                    className="strip-word"
                    data-state="future"
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h2>
          </div>

          {/* Progress rule — grows left to right with scroll. */}
          <div
            ref={ruleRef}
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-accent"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}
