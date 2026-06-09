"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import IntegrationLogo from "@/components/ui/IntegrationLogo";

export interface IntegrationItem {
  name: string;
  logo?: string;
  description?: string;
  href?: string;
}

const AUTOPLAY_MS = 3500;

export default function IntegrationCarousel({ integrations }: { integrations: IntegrationItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % integrations.length);
    }, AUTOPLAY_MS);
  };

  useEffect(() => {
    if (selectedIndex === null) {
      startAutoPlay();
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, integrations.length]);

  const handleCardClick = (index: number) => {
    if (selectedIndex === index) {
      setSelectedIndex(null);
    } else {
      setSelectedIndex(index);
      setActiveIndex(index);
    }
  };

  const selected = selectedIndex !== null ? integrations[selectedIndex] : null;

  return (
    <div>
      {/* Card grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {integrations.map((item, i) => {
          const isActive = activeIndex === i && selectedIndex === null;
          const isSelected = selectedIndex === i;
          return (
            <button
              key={item.name}
              onClick={() => handleCardClick(i)}
              className={`card-hover bg-white rounded-xl border p-4 text-center cursor-pointer ${
                isSelected
                  ? "border-accent shadow-md ring-1 ring-accent/20"
                  : isActive
                  ? "border-accent/50 shadow-sm"
                  : "border-border hover:border-accent/30"
              }`}
            >
              <IntegrationLogo name={item.name} logo={item.logo} size="sm" className="mx-auto mb-2" />
              <p className="text-xs font-semibold text-text-primary leading-tight">{item.name}</p>
            </button>
          );
        })}
      </div>

      {/* Expanded panel */}
      {selected && (
        <div className="mt-4 bg-white rounded-xl border border-accent/30 p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <IntegrationLogo key={selected.name} name={selected.name} logo={selected.logo} size="md" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-semibold text-text-primary">{selected.name}</p>
              {selected.description && (
                <p className="text-sm text-text-secondary mt-1 leading-relaxed">{selected.description}</p>
              )}
              {selected.href && (
                <div className="mt-4">
                  <Link
                    href={selected.href}
                    className="inline-flex items-center gap-1 text-sm text-accent font-medium hover:underline"
                  >
                    Explore {selected.name} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
            <button
              onClick={() => setSelectedIndex(null)}
              className="flex-shrink-0 p-1 text-text-tertiary hover:text-text-primary transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Browse integrations — always visible below the panel */}
      <div className="mt-4">
        <Link href="/integrations/carriers" className="link-underline text-sm text-text-tertiary hover:text-accent transition-colors">
          Browse integrations →
        </Link>
      </div>
    </div>
  );
}
