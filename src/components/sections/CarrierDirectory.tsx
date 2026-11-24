"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MapPin, Globe, ArrowRight } from "lucide-react";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import CarrierNetworkOrbit from "@/components/sections/CarrierNetworkOrbit";
import { getIntegrationSlug, type Integration } from "@/lib/data";
import { BRAND_COLORS } from "@/lib/brand-colors";
import { REGION_THEMES, withAlpha } from "@/lib/page-themes";

type Region = "Domestic" | "International";

interface Group {
  region: Region;
  items: Integration[];
}

const REGION_ICON: Record<Region, typeof MapPin> = {
  Domestic: MapPin,
  International: Globe,
};

/**
 * Region toggle + carrier tile grid. framer-motion-free: the segmented switch
 * uses a plain active-state fill (same idiom as the IntegrationCarousel
 * toggle), and the tiles fade/rise in with a CSS stagger driven by the
 * ConnexxFeatures shown-state pattern. Reduced motion skips the toggle so
 * tiles swap instantly.
 */
export default function CarrierDirectory({ groups }: { groups: Group[] }) {
  const [active, setActive] = useState<Region>(groups[0]?.region ?? "Domestic");
  const [shown, setShown] = useState(true);
  const reducedRef = useRef(false);
  const activeGroup = groups.find((g) => g.region === active) ?? groups[0];

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = mql.matches;
    const onChange = (e: MediaQueryListEvent) => {
      reducedRef.current = e.matches;
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Fade + stagger the tiles on region switch.
  useEffect(() => {
    if (reducedRef.current) return;
    setShown(false);
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, [active]);

  return (
    <div>
      {/* segmented switch */}
      <div className="mb-8 flex justify-center">
        <div
          role="tablist"
          aria-label="Carrier region"
          className="inline-flex rounded-full border border-border bg-white p-1 shadow-sm"
        >
          {groups.map((g) => {
            const Icon = REGION_ICON[g.region];
            const selected = g.region === active;
            return (
              <button
                key={g.region}
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(g.region)}
                className={`relative inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  selected
                    ? "text-white"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {selected && (
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: REGION_THEMES[g.region].accent }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <Icon className="h-4 w-4" aria-hidden />
                  {g.region}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* carriers-only orbit (pillar design) */}
      <CarrierNetworkOrbit groups={groups} active={active} />

      {/* reveal tiles — CSS fade/rise with a per-tile stagger */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {activeGroup?.items.map((c, i) => (
          <div
            key={c.id}
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.3s ease-out ${i * 40}ms, transform 0.3s ease-out ${i * 40}ms`,
            }}
          >
            <Link
              href={`/integrations/carriers/${getIntegrationSlug(c)}`}
              className="group card-hover relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white p-5 hover:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              style={{ ["--brand" as string]: (c.logo && BRAND_COLORS[c.logo]) || "#0098a0" }}
            >
              {/* Each carrier lights up in its own brand colour on hover. */}
              <span
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
                style={{ background: `radial-gradient(120% 80% at 0% 0%, ${withAlpha((c.logo && BRAND_COLORS[c.logo]) || "#0098a0", 0.12)}, transparent 70%)` }}
              />
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[var(--brand)] transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
              />
              <div className="relative flex items-center gap-3">
                <IntegrationLogo name={c.name} logo={c.logo} size="sm" className="shadow-[0_1px_2px_rgb(15_23_42/0.08)] ring-1 ring-black/5" />
                <p className="text-heading-sm text-text-primary">{c.name}</p>
              </div>
              {c.description && (
                <p className="relative mt-3 flex-1 text-body-sm text-text-secondary line-clamp-2">{c.description}</p>
              )}
              <span className="relative mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                View carrier <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden />
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
