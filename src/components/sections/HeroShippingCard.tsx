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
 * Big WIDE landscape shipping card for the "Built for" horizontal carousel.
 * Image panel left (~45%) + content right on sm+; stacked on mobile. Whole card
 * is one link. Entrance reveal + hover lift/zoom + one-shot shine, all gated by
 * `prefers-reduced-motion`. Sized `shrink-0 snap-start` so ~1.5 cards show with
 * a peek inside BuiltForCarousel.
 */
export default function HeroShippingCard({
  card,
  delay = 0,
}: HeroShippingCardProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const skippedEntrance = useRef(false);

  // Hydrate + detect reduced motion.
  useEffect(() => {
    setHydrated(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const el = ref.current;
    if (el && performance.now() > 4000) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        skippedEntrance.current = true;
        setVisible(true);
      }
    }
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

  const gradient =
    card.image.gradient ?? "from-accent-light via-white to-accent/15";
  const ctaLabel = card.ctaLabel ?? "Explore";
  const altText = card.image.alt ?? `${card.title} illustration`;

  const startHidden = hydrated && !reduced && !visible;
  const entranceStyle: React.CSSProperties = {
    opacity: startHidden ? 0 : 1,
    transform: startHidden
      ? "translate3d(0,24px,0) scale(0.97)"
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
      className="group relative flex h-full w-[clamp(300px,85vw,820px)] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-accent/40 active:scale-[0.995] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:flex-row sm:items-stretch"
    >
      {/* Image panel — full-width on mobile, left ~45% on sm+. */}
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:aspect-auto sm:w-[45%] sm:self-stretch">
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.05] motion-reduce:group-hover:scale-100 will-change-transform">
          {card.image.src && !showFallback ? (
            <Image
              src={card.image.src}
              alt={altText}
              fill
              unoptimized
              sizes="(max-width: 640px) 100vw, 380px"
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

        {/* One-shot shine sweep on entry. */}
        {visible && !reduced && !skippedEntrance.current && (
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

      {/* Content — right half on sm+. */}
      <div className="flex flex-1 flex-col p-6 md:p-8 sm:justify-center">
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
          className="mt-7 inline-flex w-fit items-center justify-center gap-1.5 rounded-lg bg-accent text-white px-5 py-2.5 text-sm font-semibold group-hover:bg-accent-dark transition-colors"
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
