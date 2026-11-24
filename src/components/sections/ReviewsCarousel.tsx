"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { REVIEWS, type Review, type ReviewSource } from "@/lib/reviews";

/**
 * Homepage customer-reviews carousel: a continuous, auto-looping marquee of
 * hand-picked Google + Trustpilot reviews (src/lib/reviews.ts).
 *
 * Loop = the LogoTicker pattern: two identical groups, gap + trailing pr (no
 * per-item margins), `ticker` keyframe 0 → -50% → seamless, zero drift.
 *
 * Feel: mouse hover, keyboard focus (the strip is focusable) and touch
 * press-and-hold EASE the marquee to a stop (Web Animations playbackRate
 * tween) instead of freezing it mid-glide, and ease it back up on release —
 * this is also the pause mechanism for moving content (no visible button,
 * user-directed). It stops while off-screen or the tab is hidden. Reduced
 * motion: no animation — one group in a swipeable, snap-scrolling row.
 */

const DUR_S = 140;

export default function ReviewsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const holdRef = useRef(false);
  const hoverRef = useRef(false);
  const focusRef = useRef(false);
  const rateRef = useRef(1);
  const rafRef = useRef<number | null>(null);

  // Ease playbackRate toward the target (0 = stopped, 1 = cruising).
  const retarget = () => {
    const anim = trackRef.current?.getAnimations()[0];
    if (!anim) return;
    const target = holdRef.current || hoverRef.current || focusRef.current ? 0 : 1;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const step = () => {
      const r = rateRef.current;
      const next = Math.abs(target - r) < 0.01 ? target : r + (target - r) * 0.09;
      rateRef.current = next;
      anim.playbackRate = next;
      rafRef.current = next === target ? null : requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  // Run only while visible (viewport + tab).
  useEffect(() => {
    const track = trackRef.current;
    const marquee = marqueeRef.current;
    if (!track || !marquee) return;
    let inView = false;
    const sync = () => {
      const anim = track.getAnimations()[0];
      if (!anim) return;
      if (inView && document.visibilityState === "visible") anim.play();
      else anim.pause();
    };
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      sync();
    });
    io.observe(marquee);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="reviews-heading" data-analytics-location="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="reviews-heading" className="mb-10 md:mb-12 text-display-lg text-text-primary">
          What our customers say
        </h2>
      </div>

      <div
        ref={marqueeRef}
        className="reviews-marquee relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
        tabIndex={0}
        aria-label="Customer reviews (focus or hover to pause)"
        onPointerDown={(e) => {
          if (e.pointerType === "mouse") return;
          holdRef.current = true;
          retarget();
        }}
        onPointerUp={() => {
          holdRef.current = false;
          retarget();
        }}
        onPointerCancel={() => {
          holdRef.current = false;
          retarget();
        }}
        onPointerEnter={(e) => {
          if (e.pointerType !== "mouse") return;
          hoverRef.current = true;
          retarget();
        }}
        onPointerLeave={() => {
          hoverRef.current = false;
          retarget();
        }}
        onFocus={() => {
          focusRef.current = true;
          retarget();
        }}
        onBlur={(e) => {
          if (e.currentTarget.contains(e.relatedTarget as Node)) return;
          focusRef.current = false;
          retarget();
        }}
      >
        <div aria-hidden className="reviews-fade pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-24 lg:w-40" />
        <div aria-hidden className="reviews-fade pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-24 lg:w-40" />
        <div ref={trackRef} className="reviews-track flex w-max py-3" style={{ ["--reviews-dur" as string]: `${DUR_S}s` }}>
          {[0, 1].map((group) => (
            <ul
              key={group}
              aria-hidden={group === 1 || undefined}
              aria-label={group === 0 ? "Customer reviews" : undefined}
              className={`flex shrink-0 items-stretch gap-5 pr-5 sm:gap-6 sm:pr-6 ${group === 1 ? "reviews-dup" : ""}`}
            >
              {REVIEWS.map((r) => (
                <li key={r.id} className="reviews-item w-[300px] shrink-0 sm:w-[360px]">
                  <ReviewCard review={r} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review: r }: { review: Review }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-[0_1px_2px_rgb(15_23_42/0.04)] transition-[translate,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-accent/25 hover:shadow-[0_12px_28px_-14px_rgb(15_23_42/0.25)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="flex items-center justify-between gap-3">
        <Stars source={r.source} rating={r.rating} />
        <SourceBadge source={r.source} />
      </div>

      {r.title && <p className="mt-4 text-heading-sm text-text-primary line-clamp-2">{r.title}</p>}
      <p
        className={`text-body-sm text-text-secondary whitespace-pre-line ${r.title ? "mt-2 line-clamp-6" : "mt-4 line-clamp-7"}`}
      >
        {r.body}
      </p>

      <div className="mt-auto flex items-center gap-3 pt-5">
        {r.avatar && (
          <Image
            src={r.avatar}
            alt=""
            width={40}
            height={40}
            unoptimized
            // Tiny files (~20KB each); eager so cards gliding in never pop.
            loading="eager"
            className="h-10 w-10 shrink-0 rounded-full ring-1 ring-border"
          />
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-text-primary">{r.author}</p>
          {r.company && <p className="truncate text-caption text-text-tertiary">{r.company}</p>}
        </div>
      </div>
    </article>
  );
}

/** Each platform's own star style: Trustpilot green tiles, Google gold stars. */
function Stars({ source, rating }: { source: ReviewSource; rating: number }) {
  const label = `Rated ${rating} out of 5`;
  if (source === "trustpilot") {
    return (
      <span role="img" aria-label={label} className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className="flex h-[18px] w-[18px] items-center justify-center"
            style={{ backgroundColor: i <= rating ? "#00b67a" : "#dcdce6" }}
          >
            <StarGlyph className="h-3 w-3 text-white" />
          </span>
        ))}
      </span>
    );
  }
  return (
    <span role="img" aria-label={label} className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <StarGlyph key={i} className="h-[18px] w-[18px]" style={{ color: i <= rating ? "#fbbc04" : "#dadce0" }} />
      ))}
    </span>
  );
}

function StarGlyph({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} style={style} fill="currentColor">
      <path d="M12 2.5l2.94 6.17 6.56.79-4.84 4.6 1.24 6.74L12 17.6l-5.9 3.2 1.24-6.74-4.84-4.6 6.56-.79z" />
    </svg>
  );
}

function SourceBadge({ source }: { source: ReviewSource }) {
  return (
    <span className="flex items-center gap-1.5 text-caption text-text-tertiary">
      {source === "google" ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
          <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.09 3.57-5.16 3.57-8.81z" />
          <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.92l-3.87-3c-1.07.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.27v3.1A12 12 0 0 0 12 24z" />
          <path fill="#FBBC05" d="M5.27 14.28A7.2 7.2 0 0 1 4.9 12c0-.79.14-1.56.37-2.28v-3.1H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.38l4-3.1z" />
          <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.43-3.43A11.94 11.94 0 0 0 12 0 12 12 0 0 0 1.27 6.62l4 3.1C6.22 6.88 8.87 4.77 12 4.77z" />
        </svg>
      ) : (
        <StarGlyph className="h-4 w-4" style={{ color: "#00b67a" }} />
      )}
      {source === "google" ? "Google" : "Trustpilot"}
    </span>
  );
}
