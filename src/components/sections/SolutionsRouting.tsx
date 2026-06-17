"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";

interface Icp {
  name: string;
  hook: string;
  href: string;
  /** Right-panel image — reuses the destination solution page's hero. */
  image: string;
  /** Short caption-chip descriptor (bottom-left of the image). */
  tag: string;
}

const ICPS: Icp[] = [
  {
    name: "eCommerce",
    hook: "Stop logging into four carrier portals to answer one WISMO ticket.",
    href: "/solutions/ecommerce",
    image: "/solutions/ecommerce-hero.webp",
    tag: "Online retail · DTC",
  },
  {
    name: "Marketplace Seller",
    hook: "Penalty fees to zero. One queue across Amazon, eBay, and the rest.",
    href: "/solutions/marketplace-seller",
    image: "/solutions/marketplace-seller-hero.webp",
    tag: "Amazon · eBay · Etsy · TikTok",
  },
  {
    name: "3PL",
    hook: "Onboard a new client in two days, not two weeks.",
    href: "/solutions/3pl",
    image: "/solutions/3pl-hero-v2.webp",
    tag: "Multi-client fulfilment",
  },
  {
    name: "B2B",
    hook: "Order confirmed in the ERP, carrier booked automatically.",
    href: "/solutions/b2b",
    image: "/solutions/b2b-hero.webp",
    tag: "ERP-connected dispatch",
  },
  {
    name: "Enterprise",
    hook: "40 carrier relationships, one set of numbers you can trust.",
    href: "/solutions/enterprise",
    image: "/solutions/enterprise-hero.webp",
    tag: "Consolidated carrier contracts",
  },
  {
    name: "SMEs",
    hook: "Sixty labels printed in one batch before 10am.",
    href: "/solutions/small-business",
    image: "/solutions/sme-hero.webp",
    tag: "Growing UK businesses",
  },
  {
    name: "Export",
    hook: "Six documents per shipment, generated from the data you already have.",
    href: "/solutions/export",
    image: "/solutions/export-hero.jpg",
    tag: "Outbound · customs-ready",
  },
  {
    name: "Import",
    hook: "Landed cost calculated before the goods leave the origin country.",
    href: "/solutions/import",
    image: "/solutions/import-hero.webp",
    tag: "Inbound · landed cost",
  },
];

const TITLE = "Find the page built for your operation.";
const SUBTITLE =
  "Pick how you ship — the carriers, integrations, and rates curated for your operation.";

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * "Find the page built for your operation." — a pinned scrollytelling block.
 * Desktop + motion-allowed: a sticky panel pins while a tall track scrolls;
 * scroll progress drives the active ICP (left list highlights, right image
 * crossfades). Mobile / reduced-motion: a static stacked layout (SSR-safe,
 * mirrors the hero's StaticHero fallback). Each ICP links to its solution page.
 */
export default function SolutionsRouting() {
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setEnhanced(!mql.matches && window.innerWidth >= 1024);
    decide();
    mql.addEventListener("change", decide);
    window.addEventListener("resize", decide);
    return () => {
      mql.removeEventListener("change", decide);
      window.removeEventListener("resize", decide);
    };
  }, []);

  // Scroll progress over the pinned track → active ICP index (rAF-throttled).
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
      const idx = Math.min(ICPS.length - 1, Math.floor(t * ICPS.length));
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
                <Link
                  href={icp.href}
                  className="group grid items-center gap-6 md:grid-cols-2 md:gap-10"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-bg-secondary">
                    <Image
                      src={icp.image}
                      alt={`${icp.name} — ITD`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                    />
                  </div>
                  <div>
                    <h3 className="text-heading-md text-text-primary transition-colors group-hover:text-accent">
                      {icp.name}
                    </h3>
                    <p className="mt-2 text-body-md text-text-secondary">
                      {icp.hook}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                      Explore {icp.name}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ─── Pinned scrollytelling (desktop) ───
  return (
    <section className="bg-white">
      <div
        ref={trackRef}
        className="relative"
        style={{ height: `${ICPS.length * 48}vh` }}
      >
        <div className="sticky top-[72px] flex h-[calc(100vh-72px)] items-center">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-2 items-center gap-12 px-4 sm:px-6 lg:px-8">
            {/* Left — ICP list */}
            <div>
              <p className="text-eyebrow text-text-tertiary">For how you ship</p>
              <h2 className="mt-2 max-w-md text-display-sm text-text-primary">
                {TITLE}
              </h2>

              <ul className="mt-8">
                {ICPS.map((icp, i) => (
                  <li key={icp.name}>
                    <Link
                      href={icp.href}
                      onMouseEnter={() => setActive(i)}
                      className={`block py-1.5 text-3xl font-semibold tracking-tight transition-colors duration-300 focus-visible:text-accent focus-visible:outline-none ${
                        i === active
                          ? "text-text-primary"
                          : "text-text-tertiary/35 hover:text-text-tertiary"
                      }`}
                    >
                      {icp.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Active detail (reserved height to avoid list jank) */}
              <div className="relative mt-8 min-h-[92px] max-w-md">
                {ICPS.map((icp, i) => (
                  <div
                    key={icp.name}
                    aria-hidden={i !== active}
                    className={`transition-opacity duration-300 ${
                      i === active
                        ? "opacity-100"
                        : "pointer-events-none absolute inset-0 opacity-0"
                    }`}
                  >
                    <p className="text-body-md text-text-secondary">{icp.hook}</p>
                    <Link
                      href={icp.href}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-all hover:gap-2.5"
                    >
                      Explore {icp.name}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — crossfading image */}
            <div className="relative h-[68vh] overflow-hidden rounded-3xl border border-border bg-bg-secondary shadow-sm">
              {ICPS.map((icp, i) => (
                <Image
                  key={icp.name}
                  src={icp.image}
                  alt={`${icp.name} — ITD`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={`object-cover transition-opacity duration-500 ease-out ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <div className="absolute bottom-4 left-4 rounded-full bg-bg-dark/80 px-3.5 py-1.5 text-caption text-white backdrop-blur-sm">
                {ICPS[active].tag}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
