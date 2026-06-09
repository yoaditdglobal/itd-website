"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MapPin, Globe, ArrowRight } from "lucide-react";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import CarrierNetworkMap from "@/components/sections/CarrierNetworkMap";

export interface DirectoryCarrier {
  name: string;
  slug: string;
  logo?: string;
  description?: string;
}

export interface DirectoryGroup {
  region: string;
  carriers: DirectoryCarrier[];
}

const REGION_ICON: Record<string, typeof MapPin> = {
  Domestic: MapPin,
  International: Globe,
};

export default function CarrierDirectory({ groups }: { groups: DirectoryGroup[] }) {
  const [active, setActive] = useState(groups[0]?.region ?? "Domestic");
  const reduce = useReducedMotion();

  const current = groups.find((g) => g.region === active) ?? groups[0];

  return (
    <div>
      {/* 3D-style network visual — reflects the active region */}
      <CarrierNetworkMap region={active} />

      {/* Segmented control */}
      <div className="mt-6 flex justify-center">
        <div
          role="tablist"
          aria-label="Carrier region"
          className="inline-flex items-center gap-1 rounded-full border border-border bg-bg-secondary p-1"
        >
          {groups.map((g) => {
            const Icon = REGION_ICON[g.region] ?? MapPin;
            const selected = g.region === active;
            return (
              <button
                key={g.region}
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(g.region)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors min-h-[44px] cursor-pointer ${
                  selected
                    ? "bg-accent text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={1.75} />
                {g.region}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tiles */}
      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current?.region}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {current?.carriers.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut", delay: reduce ? 0 : i * 0.04 }}
              >
                <Link
                  href={`/integrations/carriers/${c.slug}`}
                  className="group relative flex flex-col items-center justify-center text-center h-44 rounded-2xl border border-border bg-white px-5 pt-8 pb-5 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <IntegrationLogo name={c.name} logo={c.logo} size="md" fit="contain" />
                  <p className="mt-4 text-sm font-semibold text-text-primary">{c.name}</p>

                  {/* Reveal strip — reserved height, no layout shift */}
                  <div className="mt-2 h-9 flex flex-col items-center justify-start">
                    {c.description && (
                      <span className="text-xs text-text-tertiary opacity-100 sm:opacity-0 sm:translate-y-1 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 sm:group-focus-within:opacity-100 sm:group-focus-within:translate-y-0 transition-all duration-200">
                        {c.description}
                      </span>
                    )}
                    <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-accent opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200">
                      View <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
