"use client";

import { useEffect, useState } from "react";
import { RATE_CHECKER_URL } from "@/lib/site-config";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";

/**
 * Homepage hero: a full-bleed autoplay background video with the headline + CTAs
 * overlaid. Normal page scroll (no hijack) — content and CTAs are reachable
 * immediately. Bleeds up behind the floating nav (cancels <main>'s pt) like the
 * other heroes. Reduced-motion renders the poster only.
 *
 * Assets (drop into /public/hero/): hero.webm + hero.mp4 (~2560×1440, 16:9,
 * muted/no audio, ~6–15s loop, <~4MB) and hero-poster.jpg (1920×1080). Until
 * those exist, the video sources 404 gracefully and the poster below shows.
 */

// Homepage defaults — <VideoHero /> with no props renders the homepage hero
// exactly as before; other pages (e.g. /shipping/freight) pass their own copy
// and assets to reuse the same machinery.
const POSTER = "/hero/hero-poster.jpg";

const HEADING = (
  <>
    Smarter Shipping
    <br className="hidden sm:block" /> for a Simpler Tomorrow.
  </>
);
const SUB =
  "We are the logistics partner and multi-carrier platform behind UK retailers, marketplace sellers, 3PLs, importers and exporters.";
const PRIMARY = { label: "Get Quote Now", href: RATE_CHECKER_URL };
const SECONDARY = { label: "Contact Sales", href: "/contact" };

interface VideoHeroCta {
  label: string;
  href: string;
}

export interface VideoHeroProps {
  /** Optional eyebrow above the heading (e.g. "Freight"). */
  label?: string;
  heading?: React.ReactNode;
  sub?: string;
  primary?: VideoHeroCta;
  secondary?: VideoHeroCta;
  videoSrc?: string;
  /** First frame of the video — instant paint + reduced-motion fallback. */
  poster?: string;
}

export default function VideoHero({
  label,
  heading = HEADING,
  sub = SUB,
  primary = PRIMARY,
  secondary = SECONDARY,
  videoSrc = "/hero/hero.mp4",
  poster = POSTER,
}: VideoHeroProps = {}) {
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setMotionOk(!m.matches);
    set();
    m.addEventListener("change", set);
    return () => m.removeEventListener("change", set);
  }, []);

  return (
    <section data-hero-tone="dark" className="hero-bg relative h-[calc(100vh+var(--nav-h))] overflow-hidden mt-[calc(-1*var(--nav-h))]">
      {/* Background: video when motion is allowed, poster otherwise */}
      {motionOk ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-hidden
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />
      )}

      {/* Scrim for text legibility over any frame of the video */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/60"
        aria-hidden
      />

      {/* Copy + CTAs */}
      <div className="relative z-10 flex h-full items-center pt-[var(--nav-h)]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            {label && (
              <p className="mb-4 text-eyebrow text-white/70 [text-shadow:0_1px_12px_rgba(0,0,0,0.4)]">
                {label}
              </p>
            )}
            <h1 className="text-display-xl text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">
              {heading}
            </h1>
            <p className="mt-6 max-w-xl text-body-lg text-white/85">{sub}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <MagneticButton>
                <Button href={primary.href} variant="primary" surface="dark">
                  {primary.label}
                </Button>
              </MagneticButton>
              <Button
                href={secondary.href}
                variant="secondary"
                surface="dark"
                className="border-white/60 bg-white/10 backdrop-blur-sm hover:bg-white/20"
              >
                {secondary.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
