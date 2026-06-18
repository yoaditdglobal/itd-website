"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import UsedByChip from "./UsedByChip";
import { getCaseStudiesBySolution, type SolutionTag } from "@/lib/data";

interface Icp {
  name: string;
  hook: string;
  href: string;
  /** Right-panel image — reuses the destination solution page's hero. */
  image: string;
  /** Short caption-chip descriptor (top-left of the image). */
  tag: string;
  /** Drives the "Used by" customer-logo click-throughs for this audience. */
  solutionTag: SolutionTag;
}

const ICPS: Icp[] = [
  {
    name: "eCommerce",
    hook: "Stop logging into four carrier portals to answer one WISMO ticket.",
    href: "/solutions/ecommerce",
    image: "/solutions/ecommerce-hero.webp",
    tag: "Online retail · DTC",
    solutionTag: "eCommerce",
  },
  {
    name: "Marketplace Seller",
    hook: "Penalty fees to zero. One queue across Amazon, eBay, and the rest.",
    href: "/solutions/marketplace-seller",
    image: "/solutions/marketplace-seller-hero.webp",
    tag: "Amazon · eBay · Etsy · TikTok",
    solutionTag: "Marketplace",
  },
  {
    name: "3PL",
    hook: "Onboard a new client in two days, not two weeks.",
    href: "/solutions/3pl",
    image: "/solutions/3pl-hero-v2.webp",
    tag: "Multi-client fulfilment",
    solutionTag: "3PL",
  },
  {
    name: "B2B",
    hook: "Order confirmed in the ERP, carrier booked automatically.",
    href: "/solutions/b2b",
    image: "/solutions/b2b-hero.webp",
    tag: "ERP-connected dispatch",
    solutionTag: "B2B",
  },
  {
    name: "Enterprise",
    hook: "40 carrier relationships, one set of numbers you can trust.",
    href: "/solutions/enterprise",
    image: "/solutions/enterprise-hero.webp",
    tag: "Consolidated carrier contracts",
    solutionTag: "Enterprise",
  },
  {
    name: "SMEs",
    hook: "Sixty labels printed in one batch before 10am.",
    href: "/solutions/small-business",
    image: "/solutions/sme-hero.webp",
    tag: "Growing UK businesses",
    solutionTag: "Small Business",
  },
  {
    name: "Export",
    hook: "Six documents per shipment, generated from the data you already have.",
    href: "/solutions/export",
    image: "/solutions/loading plane.png",
    tag: "Outbound · customs-ready",
    solutionTag: "Export",
  },
  {
    name: "Import",
    hook: "Landed cost calculated before the goods leave the origin country.",
    href: "/solutions/import",
    image: "/solutions/port container yard.jpg",
    tag: "Inbound · landed cost",
    solutionTag: "Import",
  },
];

const TITLE = "Find the page built for your operation.";
const SUBTITLE =
  "Pick how you ship — the carriers, integrations, and rates curated for your operation.";

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * "Used by" customer-logo cluster for an audience — each logo links straight to
 * its case study (UsedByChip), with a hover/focus preview card. Shows up to
 * three, then "+ N more".
 */
function UsedByCluster({ tag }: { tag: SolutionTag }) {
  const studies = getCaseStudiesBySolution(tag);
  if (studies.length === 0) return null;
  const visible = studies.slice(0, 3);
  const overflow = studies.length - visible.length;

  return (
    <div>
      <p className="text-eyebrow text-text-tertiary mb-2">Used by</p>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          {visible.map((cs) => {
            const q = cs.quotes?.[0];
            return (
              <UsedByChip
                key={cs.id}
                cs={{
                  slug: cs.slug,
                  brandName: cs.brandName,
                  logo: cs.logo,
                  stats: cs.stats,
                  quoteAuthor: q
                    ? [q.name, q.title].filter(Boolean).join(", ")
                    : cs.quoteAuthor,
                  quoteAuthorPhoto: q?.photo ?? cs.quoteAuthorPhoto,
                  oneLiner: cs.oneLiner,
                  headline: cs.headline,
                }}
              />
            );
          })}
        </div>
        {overflow > 0 && (
          <span className="text-caption text-text-tertiary">+ {overflow} more</span>
        )}
      </div>
    </div>
  );
}

/**
 * "Find the page built for your operation." — a Radian-style pinned audience
 * pager. Desktop + motion-allowed: a sticky stage pins while a tall track
 * scrolls; the active audience's photo zooms continuously and intensely with
 * scroll position (not a flat crossfade), the left list highlights + scales the
 * active name, and the active audience's real customer case studies appear as
 * hoverable, click-through logos. The headline links to the solution page.
 * Mobile / reduced-motion: a static stacked layout (SSR-safe).
 *
 * `forceEnhanced` bypasses the media-query gate — used only by the isolated dev
 * preview route so the pinned animation can be observed off the scroll-jacked
 * homepage. Production callers pass nothing.
 */
export default function SolutionsRouting({
  forceEnhanced = false,
}: { forceEnhanced?: boolean } = {}) {
  const [enhanced, setEnhanced] = useState(forceEnhanced);
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () =>
      setEnhanced(forceEnhanced || (!mql.matches && window.innerWidth >= 1024));
    decide();
    mql.addEventListener("change", decide);
    window.addEventListener("resize", decide);
    return () => {
      mql.removeEventListener("change", decide);
      window.removeEventListener("resize", decide);
    };
  }, [forceEnhanced]);

  // Scroll → active index + INTENSE continuous zoom. The active panel's scale is
  // driven per-frame from sub-progress within its band (transforms applied
  // straight to the DOM, so the zoom tracks scroll without re-rendering).
  useEffect(() => {
    if (!enhanced) return;
    const track = trackRef.current;
    if (!track) return;
    let ticking = false;
    const compute = () => {
      ticking = false;
      const rect = track.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const t = range > 0 ? clamp01(-rect.top / range) : 0;

      // Entry "zoom in" — the whole stage scales up and fades in as it settles.
      const stage = stageRef.current;
      if (stage) {
        const e = clamp01(t / 0.12);
        stage.style.transform = `scale(${0.9 + 0.1 * e})`;
        stage.style.opacity = String(0.4 + 0.6 * e);
      }

      const f = t * ICPS.length;
      const idx = Math.min(ICPS.length - 1, Math.floor(f));
      const sub = clamp01(f - idx);

      // Active photo zooms 1.06 → 1.34 across its band; others reset to 1.06.
      const panels = panelRefs.current;
      for (let i = 0; i < panels.length; i++) {
        const el = panels[i];
        if (!el) continue;
        el.style.transform = i === idx ? `scale(${1.06 + 0.28 * sub})` : "scale(1.06)";
      }

      setActive((prev) => (prev === idx ? prev : idx));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enhanced]);

  // ─── Static fallback (mobile / reduced-motion) ───
  if (!enhanced) {
    return (
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionLabel title={TITLE} subtitle={SUBTITLE} align="center" />
          </ScrollReveal>
          <div className="mt-12 space-y-12 md:space-y-16">
            {ICPS.map((icp, i) => (
              <ScrollReveal key={icp.name} delay={i * 0.04}>
                <div className="grid items-center gap-6 md:grid-cols-2 md:gap-10">
                  <Link
                    href={icp.href}
                    aria-label={icp.name}
                    className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-bg-secondary"
                  >
                    <Image
                      src={icp.image}
                      alt={`${icp.name} — ITD`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                    />
                  </Link>
                  <div>
                    <Link href={icp.href} className="group inline-block">
                      <h3 className="text-heading-md text-text-primary transition-colors group-hover:text-accent">
                        {icp.name}
                      </h3>
                    </Link>
                    <p className="mt-2 text-body-md text-text-secondary">{icp.hook}</p>
                    <Link
                      href={icp.href}
                      className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent"
                    >
                      Explore {icp.name}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
                    </Link>
                    <div className="mt-5">
                      <UsedByCluster tag={icp.solutionTag} />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ─── Pinned audience pager (desktop) ───
  return (
    <section className="bg-white">
      <div
        ref={trackRef}
        className="relative"
        style={{ height: `${ICPS.length * 62}vh` }}
      >
        <div className="sticky top-[72px] flex h-[calc(100vh-72px)] items-start overflow-hidden">
          <div
            ref={stageRef}
            className="mx-auto grid w-full max-w-7xl origin-top grid-cols-1 items-start gap-10 px-4 pt-12 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14 lg:px-8"
          >
            {/* Left — audience list. The active audience expands inline with its
                "Used by" case-study logos + explore link directly beneath its
                headline. Active state is driven by SCROLL ONLY (no hover). */}
            <div>
              <p className="text-eyebrow text-text-tertiary">For how you ship</p>
              <h2 className="mt-2 max-w-md text-display-sm text-text-primary">
                {TITLE}
              </h2>

              <ul className="mt-7">
                {ICPS.map((icp, i) => (
                  <li key={icp.name}>
                    <Link
                      href={icp.href}
                      className={`block origin-left py-1 text-3xl font-semibold tracking-tight transition-[color,transform] duration-300 ease-out focus-visible:text-accent focus-visible:outline-none ${
                        i === active
                          ? "scale-[1.06] text-text-primary"
                          : "scale-100 text-text-tertiary/35"
                      }`}
                    >
                      {icp.name}
                    </Link>
                    {i === active && (
                      <div className="mb-2 mt-3 max-w-md">
                        <UsedByCluster tag={icp.solutionTag} />
                        <Link
                          href={icp.href}
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-all hover:gap-2.5"
                        >
                          Explore {icp.name}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — zooming media; top aligned with the nav, bottom caption */}
            <div className="relative h-[calc(100vh-72px-5rem)] overflow-hidden rounded-3xl border border-border bg-bg-secondary shadow-lg">
              {ICPS.map((icp, i) => (
                <div
                  key={icp.name}
                  ref={(el) => {
                    panelRefs.current[i] = el;
                  }}
                  className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ willChange: "transform" }}
                >
                  <Image
                    src={icp.image}
                    alt={`${icp.name} — ITD`}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                </div>
              ))}

              {/* Tag chip (top-left) */}
              <div className="absolute left-4 top-4 rounded-full bg-bg-dark/80 px-3.5 py-1.5 text-caption text-white backdrop-blur-sm">
                {ICPS[active].tag}
              </div>

              {/* Caption (bottom) — the audience hook, Radian-style */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg-dark/85 via-bg-dark/45 to-transparent px-6 pb-6 pt-16">
                <p className="max-w-xl text-body-lg font-medium text-white">
                  {ICPS[active].hook}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
