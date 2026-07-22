"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MapPin, Globe, ArrowRight } from "lucide-react";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import CarrierNetworkOrbit from "@/components/sections/CarrierNetworkOrbit";
import { getIntegrationSlug, type Integration } from "@/lib/data";

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
                    className="absolute inset-0 rounded-full bg-accent"
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
              className="group relative flex h-full min-h-[164px] flex-col items-center justify-start rounded-xl border border-border bg-white p-5 text-center transition-all hover:border-accent/30 hover:shadow-md focus-visible:border-accent/40 focus-visible:shadow-md focus-visible:outline-none"
            >
              <IntegrationLogo name={c.name} logo={c.logo} size="sm" className="mb-3" />
              <p className="text-label text-text-primary">{c.name}</p>
              <div className="mt-2 flex flex-col items-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                {c.description && (
                  <p className="text-xs text-text-tertiary">{c.description}</p>
                )}
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent">
                  View <ArrowRight className="h-3 w-3" aria-hidden />
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
