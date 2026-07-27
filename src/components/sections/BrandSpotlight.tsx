"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface SpotlightBrand {
  name: string;
  sector: string;
  logo: string;
  /** Headline result from the brand's case study. Omit when there is no published story. */
  stat?: { value: string; label: string };
  blurb: string;
  href?: string;
}

const AUTOPLAY_MS = 5000;

/**
 * Interactive brand showcase for the Brands page: a tab list of customer
 * brands driving a spotlight panel with each brand's case-study result.
 * Auto-advances while in view until the user picks a brand; CSS-only
 * animations; tablist semantics; respects prefers-reduced-motion.
 */
export default function BrandSpotlight({ brands }: { brands: SpotlightBrand[] }) {
  const [selected, setSelected] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const autoplaying = inView && !paused && !engaged && !reducedMotion;

  useEffect(() => {
    if (!autoplaying) return;
    const id = window.setInterval(
      () => setSelected((s) => (s + 1) % brands.length),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(id);
  }, [autoplaying, brands.length]);

  const active = brands[selected];

  return (
    <div
      ref={rootRef}
      className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Brand tabs */}
      <div
        role="tablist"
        aria-label="Brands shipping with ITD Global"
        className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {brands.map((b, i) => {
          const isActive = i === selected;
          return (
            <button
              key={b.name}
              type="button"
              role="tab"
              id={`brand-tab-${i}`}
              aria-selected={isActive}
              aria-controls="brand-spotlight-panel"
              onClick={() => {
                setSelected(i);
                setEngaged(true);
              }}
              className={`group relative flex min-h-[44px] flex-shrink-0 items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 text-left transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:w-full ${
                isActive
                  ? "border-accent bg-accent-light/40"
                  : "border-border bg-white hover:border-accent/40"
              }`}
            >
              <span className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-md">
                <Image
                  src={b.logo}
                  alt={`${b.name} logo`}
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </span>
              <span className="min-w-0">
                <span className="block whitespace-nowrap text-body-sm font-medium text-text-primary lg:whitespace-normal">
                  {b.name}
                </span>
                <span className="hidden text-caption text-text-tertiary sm:block">
                  {b.sector}
                </span>
              </span>
              {isActive && autoplaying && (
                <span
                  key={selected}
                  aria-hidden
                  className="brand-spotlight-progress absolute bottom-0 left-0 h-0.5 bg-accent"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Spotlight panel */}
      <div
        id="brand-spotlight-panel"
        role="tabpanel"
        aria-labelledby={`brand-tab-${selected}`}
        className="relative flex flex-col justify-center overflow-hidden rounded-3xl bg-bg-dark p-8 md:p-10 lg:min-h-[340px]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
        />
        <div key={active.name} className="brand-spotlight-in relative">
          <div className="flex items-center gap-3">
            <span className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
              <Image
                src={active.logo}
                alt={`${active.name} logo`}
                fill
                sizes="48px"
                className="object-contain p-1.5"
              />
            </span>
            <div>
              <p className="text-body-sm font-semibold text-white">{active.name}</p>
              <p className="text-caption text-white/60">{active.sector}</p>
            </div>
          </div>

          {active.stat ? (
            <div className="mt-6">
              <p className="text-stat-2xl text-white">{active.stat.value}</p>
              <p className="mt-2 text-body-md text-white/80">{active.stat.label}</p>
            </div>
          ) : (
            <p className="text-stat-xl mt-6 text-white">{active.name}</p>
          )}

          <p className="mt-4 max-w-lg text-body-sm text-white/60">{active.blurb}</p>

          {active.href && (
            <Link
              href={active.href}
              className="group/cta mt-6 inline-flex items-center gap-2 text-body-sm font-semibold text-white transition-colors hover:text-accent motion-reduce:transition-none"
            >
              Read their story
              <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1 motion-reduce:transition-none" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
