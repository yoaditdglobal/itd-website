"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
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

export default function CarrierDirectory({ groups }: { groups: Group[] }) {
  const [active, setActive] = useState<Region>(groups[0]?.region ?? "Domestic");
  const activeGroup = groups.find((g) => g.region === active) ?? groups[0];

  return (
    // Local MotionConfig — the app-level MotionProvider was removed to keep
    // framer-motion out of the shared bundle; reduced-motion compliance for
    // the layoutId spring + tile stagger now lives here.
    <MotionConfig reducedMotion="user">
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
                  <motion.span
                    layoutId="carrier-seg"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
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

      {/* reveal tiles */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {activeGroup?.items.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04, ease: "easeOut" }}
            >
              <Link
                href={`/integrations/carriers/${getIntegrationSlug(c)}`}
                className="group relative flex h-full min-h-[164px] flex-col items-center justify-start rounded-xl border border-border bg-white p-5 text-center transition-all hover:border-accent/30 hover:shadow-md focus-visible:border-accent/40 focus-visible:shadow-md focus-visible:outline-none"
              >
                <IntegrationLogo name={c.name} logo={c.logo} size="sm" className="mb-3" />
                <p className="text-sm font-medium text-text-primary">{c.name}</p>
                <div className="mt-2 flex flex-col items-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {c.description && (
                    <p className="text-xs text-text-tertiary">{c.description}</p>
                  )}
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent">
                    View <ArrowRight className="h-3 w-3" aria-hidden />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
    </MotionConfig>
  );
}
