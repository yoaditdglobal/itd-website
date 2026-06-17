"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";

/**
 * Cinematic, scroll-driven "parcel unboxing" hero (skeuomorphic revival).
 *
 * Pure CSS 3D (no three.js / framer-motion — framer-motion is banned from the
 * shared bundle). A pinned scroll track scrubs a single eased progress value
 * (cubic-bezier(0.4,0,0.2,1)) into CSS custom properties; the box scales up and
 * its four top flaps fold open to reveal the payload on scroll down, and
 * re-packs on scroll up (progress-driven → reversible for free).
 *
 * SSR-safe: renders the plain hero (copy + CTAs, fully visible) on the server
 * and for mobile / reduced-motion / pre-hydration. The 3D pin attaches only for
 * lg+ && hydrated && motion-ok — a pure progressive enhancement.
 */

const CARRIERS = [
  { name: "Evri", src: "/logos/carriers/evri_logo.png" },
  { name: "InPost", src: "/logos/carriers/inpost-icon.png" },
  { name: "Royal Mail", src: "/logos/carriers/royal-mail-icon.png" },
  { name: "DPD", src: "/logos/carriers/dpd.png" },
  { name: "FedEx", src: "/logos/carriers/fedex-icon.png" },
  { name: "DHL", src: "/logos/carriers/dhl_logo.webp" },
  { name: "UPS", src: "/logos/carriers/ups_logo.png" },
];

const HEADING = (
  <>
    Smarter Shipping
    <br className="hidden sm:block" /> for a Simpler Tomorrow.
  </>
);
const SUB =
  "ITD Global is the logistics partner and multi-carrier platform behind UK retailers, marketplace sellers, 3PLs, and exporters — every active carrier on every parcel, one dashboard.";
const PRIMARY = { label: "Get Quote", href: "/rate-checker/domestic" };
const SECONDARY = { label: "Contact Us", href: "/contact" };

/** cubic-bezier(0.4, 0, 0.2, 1) solver — Material "standard" easing. */
function makeBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const fx = (t: number) => ((ax * t + bx) * t + cx) * t;
  const fy = (t: number) => ((ay * t + by) * t + cy) * t;
  const dfx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 6; i++) {
      const d = dfx(t);
      if (Math.abs(d) < 1e-6) break;
      t -= (fx(t) - x) / d;
      t = Math.min(1, Math.max(0, t));
    }
    return fy(t);
  };
}
const easeStandard = makeBezier(0.4, 0, 0.2, 1);

/** clamp a sub-range of p to 0..1 */
const sub = (p: number, a: number, b: number) =>
  Math.min(1, Math.max(0, (p - a) / (b - a)));

export default function ParcelUnboxHero() {
  const [enhanced, setEnhanced] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Decide whether to enhance: desktop + motion allowed (re-evaluates on change).
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setEnhanced(wide.matches && !reduce.matches);
    decide();
    wide.addEventListener("change", decide);
    reduce.addEventListener("change", decide);
    return () => {
      wide.removeEventListener("change", decide);
      reduce.removeEventListener("change", decide);
    };
  }, []);

  // Scrub: map track scroll → eased progress → CSS vars on the stage.
  useEffect(() => {
    if (!enhanced) return;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const p = easeStandard(total > 0 ? scrolled / total : 0);
      stage.style.setProperty("--scale", String(0.82 + 0.7 * p));
      stage.style.setProperty("--flap", String(sub(p, 0.06, 0.62)));
      stage.style.setProperty("--reveal", String(sub(p, 0.46, 0.9)));
      stage.style.setProperty("--copy", String(1 - sub(p, 0.04, 0.34)));
      stage.style.setProperty("--lift", String(sub(p, 0.2, 0.95)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enhanced]);

  if (!enhanced) return <StaticHero />;

  return (
    <div ref={trackRef} className="relative" style={{ height: "280vh" }}>
      <div
        ref={stageRef}
        className="hero-bg sticky top-[72px] h-[calc(100vh-72px)] overflow-hidden"
        style={{ perspective: "1500px", "--scale": 0.82 } as React.CSSProperties}
      >
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-multiply" aria-hidden />

        {/* Headline + CTAs — fade out as the unbox begins (var --copy) */}
        <div
          className="absolute inset-x-0 top-[8%] z-20 mx-auto max-w-3xl px-6 text-center"
          style={{ opacity: "var(--copy,1)" } as React.CSSProperties}
        >
          <h1 className="text-display-xl text-text-primary">{HEADING}</h1>
          <p className="mx-auto mt-5 max-w-xl text-body-lg text-text-secondary">
            {SUB}
          </p>
          <div className="mt-7 flex justify-center gap-3">
            <MagneticButton>
              <Button href={PRIMARY.href} variant="primary">
                {PRIMARY.label}
              </Button>
            </MagneticButton>
            <Button href={SECONDARY.href} variant="secondary">
              {SECONDARY.label}
            </Button>
          </div>
          <p className="mt-8 text-eyebrow text-text-tertiary animate-pulse-dot">
            Scroll to unbox ↓
          </p>
        </div>

        {/* 3D stage — the parcel sits centred, lower third */}
        <div className="absolute inset-0 flex items-center justify-center pt-[18vh]">
          <Parcel />
        </div>

        {/* Payload revealed from inside the box */}
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 z-30 mx-auto max-w-2xl -translate-y-1/2 px-6 text-center"
          style={
            {
              opacity: "var(--reveal,0)",
              transform:
                "translateY(calc(-50% + (1 - var(--reveal,0)) * 40px)) scale(calc(0.92 + 0.08 * var(--reveal,0)))",
            } as React.CSSProperties
          }
        >
          <p className="text-eyebrow text-accent">One platform. Every carrier.</p>
          <h2 className="mt-2 text-display-lg text-text-primary">
            Connexx picks the cheapest compliant carrier and prints the label in one click.
          </h2>
          <div className="pointer-events-auto mt-6 inline-flex">
            <Button href="/connexx" variant="primary">
              See how Connexx works
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────  3D parcel  ───────────────────────── */

function Parcel() {
  // Box dimensions (px, pre-scale). W across, H tall, D deep.
  const W = 340;
  const H = 230;
  const D = 300;
  // Centered-face technique: every face is centred on the box origin
  // (translate(-50%,-50%)) then rotated + pushed out by the right half-extent —
  // correct for a rectangular box (W≠D).
  const centered = "absolute left-1/2 top-1/2";

  return (
    <div
      className="relative will-change-transform"
      style={{
        width: W,
        height: H,
        transformStyle: "preserve-3d",
        transform: "rotateX(16deg) rotateY(-24deg) scale(var(--scale, 0.82))",
      }}
    >
      {/* Contact shadow on the floor */}
      <div
        aria-hidden
        className="absolute left-1/2 top-full h-12 w-[130%] rounded-[50%] bg-black/30 blur-2xl"
        style={{ transform: "translate3d(-50%,30px,0) rotateX(80deg) scale(var(--scale,0.82))" }}
      />

      {/* ── Box body ── */}
      {/* front (carries the label) */}
      <div
        className={`${centered} parcel-kraft`}
        style={{ width: W, height: H, transform: `translate(-50%,-50%) translateZ(${D / 2}px)` }}
      >
        <ParcelLabel />
      </div>
      {/* back */}
      <div
        className={`${centered} parcel-kraft parcel-side`}
        style={{ width: W, height: H, transform: `translate(-50%,-50%) rotateY(180deg) translateZ(${D / 2}px)` }}
      />
      {/* left */}
      <div
        className={`${centered} parcel-kraft parcel-side`}
        style={{ width: D, height: H, transform: `translate(-50%,-50%) rotateY(-90deg) translateZ(${W / 2}px)` }}
      />
      {/* right */}
      <div
        className={`${centered} parcel-kraft parcel-side`}
        style={{ width: D, height: H, transform: `translate(-50%,-50%) rotateY(90deg) translateZ(${W / 2}px)` }}
      />
      {/* bottom */}
      <div
        className={`${centered} parcel-kraft`}
        style={{ width: W, height: D, transform: `translate(-50%,-50%) rotateX(-90deg) translateZ(${H / 2}px)` }}
      />
      {/* inner bottom (darker) so the open box reads as hollow */}
      <div
        className={`${centered} parcel-inner`}
        style={{ width: W - 14, height: D - 14, transform: `translate(-50%,-50%) rotateX(-90deg) translateZ(${H / 2 - 10}px)` }}
      />

      {/* ── Top flaps — lie flat on the top plane (rotateX 90°) when closed,
            then hinge open around their outer edge as --flap → 1 ── */}
      {/* back flap (back half of the opening) */}
      <div
        className="parcel-flap parcel-kraft"
        style={{
          width: W,
          height: D / 2,
          transformOrigin: "50% 0%",
          transform: `translate(-50%,-50%) translateY(${-H / 2}px) translateZ(${-D / 4}px) rotateX(90deg) rotateX(calc(var(--flap,0) * -112deg))`,
        }}
      />
      {/* front flap (front half) */}
      <div
        className="parcel-flap parcel-kraft"
        style={{
          width: W,
          height: D / 2,
          transformOrigin: "50% 100%",
          transform: `translate(-50%,-50%) translateY(${-H / 2}px) translateZ(${D / 4}px) rotateX(90deg) rotateX(calc(var(--flap,0) * 112deg))`,
        }}
      />

      <style jsx>{`
        .parcel-kraft {
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(0, 0, 0, 0.12)),
            linear-gradient(135deg, #d9b380 0%, #c79a63 45%, #b9884e 100%);
          border: 1px solid rgba(120, 85, 45, 0.45);
          box-shadow: inset 0 0 40px rgba(120, 80, 40, 0.25);
        }
        .parcel-side {
          filter: brightness(0.9);
        }
        .parcel-inner {
          background: linear-gradient(180deg, #a87a44, #6f4f2c 100%);
          box-shadow: inset 0 12px 30px rgba(0, 0, 0, 0.45);
        }
        .parcel-flap {
          position: absolute;
          left: 50%;
          top: 50%;
          will-change: transform;
          backface-visibility: visible;
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────  Realistic shipping label  ───────────────────── */

function ParcelLabel() {
  return (
    <div className="absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2 rotate-[-1.2deg] rounded-md bg-[#fcfbf7] p-3 shadow-[0_6px_14px_rgba(0,0,0,0.35)] ring-1 ring-black/10">
      {/* peeled corner */}
      <div
        aria-hidden
        className="absolute -right-1 -top-1 h-5 w-5 rotate-45 bg-[#efeae0] shadow-[ -2px_2px_3px_rgba(0,0,0,0.2)]"
      />
      <div className="flex items-center justify-between border-b border-dashed border-black/25 pb-1.5">
        <span className="text-[9px] font-extrabold tracking-[0.18em] text-[#15192b]">
          ITD GLOBAL
        </span>
        <span className="text-[7px] font-semibold uppercase tracking-widest text-black/50">
          Multi-carrier · Tracked
        </span>
      </div>

      <div className="mt-1.5 flex items-start justify-between gap-2">
        <div className="text-left">
          <p className="text-[6px] uppercase tracking-wider text-black/40">Ship to</p>
          <p className="text-[8px] font-semibold leading-tight text-[#15192b]">
            Your Customer
            <br />
            Anywhere, UK & Worldwide
          </p>
        </div>
        {/* CSS barcode */}
        <div
          aria-hidden
          className="h-7 w-[44%] self-end"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #15192b 0 1px, transparent 1px 2px, #15192b 2px 4px, transparent 4px 7px, #15192b 7px 8px, transparent 8px 11px)",
          }}
        />
      </div>

      {/* carrier logo strip */}
      <div className="mt-2 grid grid-cols-7 items-center gap-1 rounded-sm bg-white/70 px-1 py-1 ring-1 ring-black/5">
        {CARRIERS.map((c) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={c.name}
            src={c.src}
            alt={c.name}
            className="h-3.5 w-full object-contain opacity-90"
            loading="eager"
          />
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────  Static fallback hero  ─────────────────────── */

function StaticHero() {
  return (
    <section className="relative hero-bg flex min-h-[calc(100vh-72px)] items-center overflow-hidden">
      <div className="hero-bg-blob" aria-hidden />
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.45] mix-blend-multiply" aria-hidden />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h1 className="hero-entrance-h1 text-display-xl text-text-primary">
              {HEADING}
            </h1>
            <p className="hero-entrance-sub mt-6 max-w-xl text-body-lg text-text-secondary">
              {SUB}
            </p>
            <div className="hero-entrance-cta mt-8 flex flex-col gap-3 sm:flex-row">
              <MagneticButton>
                <Button href={PRIMARY.href} variant="primary">
                  {PRIMARY.label}
                </Button>
              </MagneticButton>
              <Button href={SECONDARY.href} variant="secondary">
                {SECONDARY.label}
              </Button>
            </div>
          </div>
          {/* Static parcel + carrier label as the supporting visual */}
          <div className="hero-entrance-aside hidden justify-center lg:flex">
            <div className="relative w-[300px] rounded-2xl border border-[rgba(120,85,45,0.45)] bg-[linear-gradient(135deg,#d9b380,#b9884e)] p-6 shadow-xl">
              <div className="absolute inset-x-0 top-0 mx-auto h-3 w-[70%] rounded-b bg-[#c9a878] shadow" aria-hidden />
              <ParcelLabel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
