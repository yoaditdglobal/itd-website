"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  PackageCheck,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";

interface InsightSlide {
  id: string;
  stat?: string;
  icon?: LucideIcon;
  title?: string;
  body: string;
  source?: string;
  /** Panel background — vivid, on-brand gradient over the dark base. */
  gradient: string;
  /** "outline": transparent card, the gradient renders as a stroke only. */
  variant?: "outline";
  /** Transparent-cutout visual, pinned to the card's bottom edge. */
  image?: string;
  imageSide?: "left" | "right";
}

/* Stats verbatim from the Brands page copy doc (Ofcom / Citizens Advice). */
const SLIDES: InsightSlide[] = [
  {
    id: "problem",
    stat: "68%",
    body: "of shoppers have had a recent delivery problem.",
    source: "Ofcom parcel-delivery research",
    gradient:
      "radial-gradient(circle at 12% 8%, rgba(59,91,219,0.85) 0%, rgba(29,63,184,0.35) 45%, rgba(10,15,40,0.9) 100%)",
  },
  {
    id: "no-say",
    stat: "75%",
    body: "want to choose their carrier and delivery.",
    source: "Citizens Advice, via the Financial Times",
    gradient:
      "radial-gradient(circle at 88% 10%, rgba(59,91,219,0.85) 0%, rgba(20,46,140,0.4) 45%, rgba(10,15,40,0.9) 100%)",
  },
  {
    id: "choice",
    icon: SlidersHorizontal,
    title: "Freedom of choice",
    body: "Give shoppers a say in how their parcel arrives and who carries it. Most never get the option.",
    gradient:
      "linear-gradient(135deg, rgba(29,63,184,0.75) 0%, rgba(13,20,50,0.95) 65%)",
    variant: "outline",
    image: "/brands/freedom-of-choice.png",
    imageSide: "left",
  },
  {
    id: "arrives",
    icon: PackageCheck,
    title: "A parcel that actually arrives",
    body: "Reliability is where delivery breaks down. More carriers, more ways to route around a weak lane.",
    gradient:
      "linear-gradient(225deg, rgba(29,63,184,0.75) 0%, rgba(13,20,50,0.95) 65%)",
    variant: "outline",
    image: "/brands/parcel-arrives.png",
    imageSide: "right",
  },
];

const AUTOPLAY_MS = 6000;

/**
 * Full-section insight carousel for the Brands page: each customer insight
 * takes over the whole band as a gradient panel, with a peek of the next
 * slide, arrow + dot navigation, swipe via native scroll-snap, and
 * auto-advance until the user takes over. CSS scroll behaviour only.
 */
export default function InsightTakeover() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Track the active slide from native scroll position (covers swipe too).
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const slide = el.firstElementChild as HTMLElement | null;
        if (!slide) return;
        const step = slide.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
        setActive(Math.min(SLIDES.length - 1, Math.max(0, Math.round(el.scrollLeft / step))));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = useCallback(
    (index: number, smooth = true) => {
      const el = trackRef.current;
      const slide = el?.firstElementChild as HTMLElement | null;
      if (!el || !slide) return;
      const step = slide.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
      el.scrollTo({
        left: step * index,
        behavior: smooth && !reducedMotion ? "smooth" : "auto",
      });
    },
    [reducedMotion],
  );

  const autoplaying = inView && !paused && !engaged && !reducedMotion;

  // Interval reads the live index without re-arming on every scroll tick.
  const activeRef = useRef(0);
  activeRef.current = active;

  useEffect(() => {
    if (!autoplaying) return;
    const id = window.setInterval(() => {
      const next = (activeRef.current + 1) % SLIDES.length;
      goTo(next);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [autoplaying, goTo]);

  const takeOver = () => setEngaged(true);

  return (
    <div
      className="mt-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-mx-8 lg:scroll-px-8 lg:px-8"
        onPointerDown={takeOver}
        aria-label="What your customers actually want"
      >
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            className="relative flex min-h-[380px] w-[88%] flex-shrink-0 snap-start flex-col justify-center overflow-hidden rounded-3xl p-8 sm:w-[92%] md:min-h-[440px] md:p-14 lg:p-16"
            style={s.variant === "outline" ? undefined : { background: s.gradient }}
            aria-hidden={i !== active}
          >
            {s.variant === "outline" ? (
              /* Transparent card: the slide gradient drawn as a stroke only. */
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{
                  padding: "2.5px",
                  background: s.gradient,
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                }}
              />
            ) : (
              <div
                aria-hidden
                className="bg-noise pointer-events-none absolute inset-0 opacity-40"
              />
            )}
            {s.image && (
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-y-0 w-1/2 sm:w-[45%] ${
                  s.imageSide === "right" ? "right-0" : "left-0"
                }`}
              >
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 40vw, 50vw"
                  className={`object-contain ${
                    s.imageSide === "right"
                      ? "object-[right_bottom]"
                      : "object-[left_bottom]"
                  }`}
                />
              </div>
            )}
            <div
              className={
                s.image
                  ? `relative z-10 max-w-[52%] md:max-w-[50%] ${
                      s.imageSide === "right" ? "" : "ml-auto"
                    }`
                  : "relative max-w-3xl"
              }
            >
              {s.stat ? (
                <>
                  <p className="text-stat-hero text-white">{s.stat}</p>
                  <p className="mt-5 text-body-lg text-white/85 md:text-2xl md:leading-snug">
                    {s.body}
                  </p>
                  {s.source && (
                    <p className="mt-6 text-caption text-white/50">{s.source}</p>
                  )}
                </>
              ) : (
                <>
                  {s.icon && (
                    <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
                      <s.icon className="h-6 w-6" aria-hidden />
                    </span>
                  )}
                  <p className="text-display-md text-white">{s.title}</p>
                  <p className="mt-4 text-body-lg text-white/85 md:text-2xl md:leading-snug">
                    {s.body}
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Dots + arrows */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2" aria-label="Insight slides">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-current={i === active}
              aria-label={`Insight ${i + 1} of ${SLIDES.length}`}
              onClick={() => {
                takeOver();
                goTo(i);
              }}
              className={`h-1.5 rounded-full transition-all motion-reduce:transition-none ${
                i === active ? "w-8 bg-white" : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous insight"
            disabled={active === 0}
            onClick={() => {
              takeOver();
              goTo(active - 1);
            }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white/50 disabled:opacity-30 disabled:hover:border-white/20 motion-reduce:transition-none"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Next insight"
            disabled={active === SLIDES.length - 1}
            onClick={() => {
              takeOver();
              goTo(active + 1);
            }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white/50 disabled:opacity-30 disabled:hover:border-white/20 motion-reduce:transition-none"
          >
            <ArrowRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
