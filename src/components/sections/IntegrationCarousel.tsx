"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import { entityHref } from "@/lib/data";

export interface IntegrationItem {
  name: string;
  logo?: string;
  description?: string;
  href?: string;
}

const AUTOPLAY_MS = 3500;

/** Carriers link under /integrations/carriers; everything else is tech. */
function isCarrier(item: IntegrationItem): boolean {
  return item.href?.startsWith("/integrations/carriers") ?? false;
}

export default function IntegrationCarousel({ integrations }: { integrations: IntegrationItem[] }) {
  const { carriers, tech } = useMemo(
    () => ({
      carriers: integrations.filter(isCarrier),
      tech: integrations.filter((i) => !isCarrier(i)),
    }),
    [integrations],
  );
  const hasToggle = carriers.length > 0 && tech.length > 0;
  // Default to the group the page leads with (shipping pages list carriers
  // first, solution pages their platforms) — respects each page's emphasis.
  const [tab, setTab] = useState<"carriers" | "tech">(() =>
    integrations[0] && isCarrier(integrations[0]) ? "carriers" : "tech",
  );
  // Effective group when there's nothing to toggle (single-kind pages show
  // their full list and route Browse to the matching directory).
  const effectiveTab = hasToggle ? tab : carriers.length > 0 ? "carriers" : "tech";
  const visibleItems = hasToggle
    ? tab === "carriers"
      ? carriers
      : tech
    : integrations;
  const browseHref =
    effectiveTab === "carriers" ? "/integrations/carriers" : "/integrations/tech";

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Gate autoplay: only tick while on screen, in a visible tab, and the user
  // hasn't asked for reduced motion — no background CPU/battery burn.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMq = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onMq);

    setPageVisible(!document.hidden);
    const onVis = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);

    const el = containerRef.current;
    let io: IntersectionObserver | undefined;
    if (el && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => setInView(entries[0]?.isIntersecting ?? false),
        { threshold: 0.2 },
      );
      io.observe(el);
    } else {
      setInView(true);
    }

    return () => {
      mq.removeEventListener("change", onMq);
      document.removeEventListener("visibilitychange", onVis);
      io?.disconnect();
    };
  }, []);

  useEffect(() => {
    const shouldPlay =
      selectedIndex === null && inView && pageVisible && !reducedMotion;
    if (shouldPlay) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((i) => (i + 1) % visibleItems.length);
      }, AUTOPLAY_MS);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [selectedIndex, inView, pageVisible, reducedMotion, visibleItems.length]);

  // Move focus into the detail panel when it opens (keyboard a11y).
  useEffect(() => {
    if (selectedIndex !== null) panelRef.current?.focus();
  }, [selectedIndex]);

  const handleCardClick = (index: number) => {
    if (selectedIndex === index) {
      setSelectedIndex(null);
    } else {
      setSelectedIndex(index);
      setActiveIndex(index);
    }
  };

  const handleTabSwitch = (next: "carriers" | "tech") => {
    setTab(next);
    setSelectedIndex(null);
    setActiveIndex(0);
  };

  const selected = selectedIndex !== null ? visibleItems[selectedIndex] : null;

  return (
    <div ref={containerRef}>
      {/* Carrier ⇄ Tech toggle — only when the page mixes both kinds */}
      {hasToggle && (
        <div
          role="tablist"
          aria-label="Integration type"
          className="mb-6 inline-flex rounded-lg border border-border bg-bg-secondary p-1"
        >
          {(
            [
              { key: "carriers", label: "Carriers" },
              { key: "tech", label: "Tech Integrations" },
            ] as const
          ).map((t) => {
            const count = t.key === "carriers" ? carriers.length : tech.length;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => handleTabSwitch(t.key)}
                className={`inline-flex items-center gap-1.5 min-h-[44px] rounded-md px-5 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
                  tab === t.key
                    ? "bg-white shadow-sm text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {t.label}
                <span
                  className={`text-xs tabular-nums ${
                    tab === t.key ? "text-text-tertiary" : "text-text-tertiary/70"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Card grid — left-aligned responsive grid: 2 cols on mobile, 3 on
          small, 4 on desktop, so a full tab (8 items) sits as a clean 4×2. */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {visibleItems.map((item, i) => {
          const isActive = activeIndex === i && selectedIndex === null;
          const isSelected = selectedIndex === i;
          return (
            <button
              key={item.name}
              onClick={() => handleCardClick(i)}
              aria-expanded={isSelected}
              className={`group card-hover flex flex-col items-center justify-center w-full min-h-[116px] bg-white rounded-xl border p-4 text-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
                isSelected
                  ? "border-accent shadow-md ring-1 ring-accent/20"
                  : isActive
                  ? "border-accent/50 shadow-sm"
                  : "border-border hover:border-accent/30"
              }`}
            >
              <span className="flex h-10 items-center justify-center mb-3 transition-transform duration-300 motion-safe:group-hover:scale-110">
                <IntegrationLogo name={item.name} logo={item.logo} size="sm" />
              </span>
              <p className="text-xs font-semibold text-text-primary leading-tight line-clamp-2">
                {item.name}
              </p>
            </button>
          );
        })}
      </div>

      {/* Expanded panel */}
      {selected && (
        <div
          ref={panelRef}
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === "Escape") setSelectedIndex(null);
          }}
          className="mt-4 bg-white rounded-xl border border-accent/30 p-5 sm:p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <IntegrationLogo key={selected.name} name={selected.name} logo={selected.logo} size="md" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-heading-md text-text-primary">{selected.name}</p>
              {selected.description && (
                <p className="text-body-sm text-text-secondary mt-1">{selected.description}</p>
              )}
              {(entityHref(selected.name) ?? selected.href) && (
                <div className="mt-4">
                  <Link
                    href={entityHref(selected.name) ?? selected.href!}
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

      {/* Browse integrations — routes to the directory matching the active
          toggle state (carriers ⇄ tech) */}
      <div className="mt-4">
        <Link href={browseHref} className="link-underline text-sm text-accent font-medium">
          Browse integrations →
        </Link>
      </div>
    </div>
  );
}
