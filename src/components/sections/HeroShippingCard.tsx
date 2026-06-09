"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export interface HeroShippingCardData {
  /** Pre-rendered Lucide icon element (server→client safe). */
  iconNode: ReactNode;
  title: string;
  body: string;
  audiences: string[];
  href: string;
  ctaLabel?: string;
  image: {
    src?: string;
    alt?: string;
    gradient?: string;
  };
}

interface HeroShippingCardProps {
  card: HeroShippingCardData;
  /** Stagger delay in ms applied to entrance. */
  delay?: number;
}

/**
 * Image-led homepage shipping card with motion-rich interactions.
 *
 * - Entrance: 0.92 scale + 24px slide-up + fade, 700ms, IntersectionObserver-triggered.
 * - One-shot diagonal shine sweep across the hero image on entry.
 * - Parallax: image translates ±8% vertical as the card moves through the viewport.
 * - Hover: card lift, image zoom, headline accent, button fill, arrow slide.
 * - Active: 0.99 press feedback.
 *
 * All motion respects `prefers-reduced-motion` — when set, the card renders fully
 * visible and skips parallax / shine / scale transforms.
 */
export default function HeroShippingCard({
  card,
  delay = 0,
}: HeroShippingCardProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  // Hydrate + detect reduced motion.
  useEffect(() => {
    setHydrated(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // IntersectionObserver — fire entrance once.
  useEffect(() => {
    if (!hydrated) return;
    if (reduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hydrated, reduced]);

  // Parallax — translate the inner image as the card moves through the viewport.
  useEffect(() => {
    if (!hydrated || reduced) return;
    const el = ref.current;
    const img = imageRef.current;
    if (!el || !img) return;
    let rafId = 0;
    const update = () => {
      rafId = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Progress 0 → 1 as the card crosses the viewport top to bottom.
      const progress = Math.min(
        1,
        Math.max(0, (vh - rect.top) / (vh + rect.height)),
      );
      // Map to ±8%.
      const offset = (progress - 0.5) * 16; // -8% → +8%
      img.style.transform = `translate3d(0, ${offset}%, 0)`;
    };
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [hydrated, reduced]);

  const gradient = card.image.gradient ?? "from-accent-light via-white to-accent/15";
  const ctaLabel = card.ctaLabel ?? "Explore";
  const altText = card.image.alt ?? `${card.title} illustration`;

  // Pre-hydration / reduced-motion → show fully visible.
  const startHidden = hydrated && !reduced && !visible;
  const entranceStyle: React.CSSProperties = {
    opacity: startHidden ? 0 : 1,
    transform: startHidden
      ? "translate3d(0,24px,0) scale(0.92)"
      : "translate3d(0,0,0) scale(1)",
    transition:
      "opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)",
    transitionDelay: `${delay}ms`,
  };

  return (
    <Link
      ref={ref}
      href={card.href}
      aria-label={`${ctaLabel} ${card.title}`}
      style={entranceStyle}
      className="group relative block h-full overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-[transform,box-shadow,border-color,background-color] duration-250 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-accent/40 active:scale-[0.99] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
    >
      {/* Hero image / gradient placeholder */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <div
          ref={imageRef}
          className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.05] motion-reduce:group-hover:scale-100 will-change-transform"
        >
          {card.image.src && !showFallback ? (
            <Image
              src={card.image.src}
              alt={altText}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              onError={() => setShowFallback(true)}
            />
          ) : (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center`}
              aria-hidden
            >
              {card.iconNode}
            </div>
          )}
        </div>

        {/* One-shot shine sweep — fires on entry. */}
        {visible && !reduced && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div
              className="absolute inset-y-0 w-1/2 -skew-x-12"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
                mixBlendMode: "soft-light",
                animation: "heroShine 1200ms ease-out forwards",
              }}
            />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6 md:p-8">
        <h3 className="text-display-md text-text-primary group-hover:text-accent transition-colors">
          {card.title}
        </h3>
        <p className="mt-3 text-body-lg text-text-secondary leading-relaxed">
          {card.body}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {card.audiences.map((aud) => (
            <span
              key={aud}
              className="inline-flex items-center text-[11px] font-medium uppercase tracking-wider text-accent bg-accent-light/60 px-2.5 py-1 rounded-full"
            >
              {aud}
            </span>
          ))}
        </div>

        {/* "Explore" — visually a primary button; the whole card is the link. */}
        <span
          aria-hidden
          className="mt-7 inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent text-white px-5 py-2.5 text-sm font-semibold group-hover:bg-accent-dark transition-colors"
        >
          {ctaLabel}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform motion-reduce:group-hover:translate-x-0" />
        </span>
      </div>

      {/* Scoped keyframes for the shine sweep. */}
      <style jsx>{`
        @keyframes heroShine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          100% {
            transform: translateX(220%) skewX(-12deg);
            opacity: 0;
          }
        }
      `}</style>
    </Link>
  );
}
