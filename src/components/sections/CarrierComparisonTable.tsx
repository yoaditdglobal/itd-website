"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, AlertCircle, Minus, Camera, Signature } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import { entityHref } from "@/lib/data";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SpeedTier = "express" | "standard" | "economy" | "special";

export interface SpeedPill {
  label: string;
  tier: SpeedTier;
}

export type CoverageTier = "full" | "mainland-plus" | "mainland" | "limited";

export interface CoverageInfo {
  /** Directional tier — drives the bar fill + label. */
  tier: CoverageTier;
  /** Display label (e.g. "Full UK"). Derived from tier if omitted. */
  label?: string;
  /** Postcode/region detail, shown under the bar. */
  zones: string[];
}

export type TrackingLiveQuality = "live" | "limited" | "none";
export type TrackingPodQuality = "photo-signature" | "signature" | "none";

export interface TrackingInfo {
  live: TrackingLiveQuality;
  pod: TrackingPodQuality;
}

/**
 * Rich row shape — preferred. Used by /shipping/domestic.
 * Cells are explicitly typed: speed pills, weight ceiling, coverage object,
 * tracking object, best-for audience tags.
 */
export interface CarrierComparisonRichRow {
  carrier: string;
  logo?: string;
  /** Optional one-line tagline, e.g. "UK national postal — universal coverage". */
  descriptor?: string;
  speeds: SpeedPill[];
  weightCeilingKg: number;
  /** Optional small print under the weight (e.g. "2kg letter packet"). */
  weightCeilingNote?: string;
  coverage: CoverageInfo;
  tracking: TrackingInfo;
  bestFor: string[];
}

/**
 * Legacy row shape — kept for backward compat with /shipping/international
 * and /shipping/freight which haven't migrated to the rich shape yet.
 */
export interface CarrierComparisonLegacyRow {
  carrier: string;
  logo?: string;
  cells: string[];
  cellTypes?: Array<"default" | "best-for" | "speed" | "coverage">;
}

export type CarrierComparisonRow =
  | CarrierComparisonRichRow
  | CarrierComparisonLegacyRow;

function isRichRow(row: CarrierComparisonRow): row is CarrierComparisonRichRow {
  return "speeds" in row;
}

export interface MethodologyCallout {
  eyebrow?: string;
  lines: string[];
}

export interface CarrierComparisonTableProps {
  title?: string;
  intro?: string;
  /** Header labels. For rich rows the order is fixed: Speed | Weight | Coverage | Tracking | Best for. */
  columns: string[];
  rows: CarrierComparisonRow[];
  /** Plain-text footnote under the table. Use `methodology` for the structured panel. */
  footnote?: string;
  /** Structured "DATA NOTES" panel under the table. Replaces footnote if provided. */
  methodology?: MethodologyCallout;
  /** Legacy-only: column index for the "Best for" column. Default: last column. */
  bestForColumnIndex?: number;
  /** Legacy-only: column index for the "Speed" column. */
  speedColumnIndex?: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const COVERAGE_PERCENT: Record<CoverageTier, number> = {
  full: 100,
  "mainland-plus": 92,
  mainland: 82,
  limited: 60,
};

const COVERAGE_LABEL: Record<CoverageTier, string> = {
  full: "Full UK",
  "mainland-plus": "Mainland + most",
  mainland: "Mainland UK",
  limited: "Limited",
};

const SPEED_PILL_CLASSES: Record<SpeedTier, string> = {
  express: "bg-success-light text-success-dark",
  standard: "bg-warning-light text-warning-dark",
  economy: "bg-bg-tertiary text-text-secondary",
  special: "bg-accent-light text-accent-dark",
};

// Audience pill colour map (shared with legacy renderer).
const BEST_FOR_COLOURS: Record<string, string> = {
  ecommerce: "bg-accent-light text-accent-dark",
  marketplace: "bg-warning-light text-warning-dark",
  "3pl": "bg-success-light text-success-dark",
  b2b: "bg-purple-100 text-purple-800",
  enterprise: "bg-slate-200 text-slate-800",
  smb: "bg-pink-100 text-pink-800",
  "small business": "bg-pink-100 text-pink-800",
  export: "bg-cyan-100 text-cyan-800",
  import: "bg-indigo-100 text-indigo-800",
  default: "bg-bg-secondary text-text-secondary",
};

function pillClassFor(label: string): string {
  const normalised = label.toLowerCase().trim();
  for (const [key, cls] of Object.entries(BEST_FOR_COLOURS)) {
    if (key !== "default" && normalised.includes(key)) return cls;
  }
  return BEST_FOR_COLOURS.default;
}

// ─── Coverage bar (client, IntersectionObserver-driven) ───────────────────────

function CoverageBar({ tier, label, zones }: CoverageInfo) {
  const ref = useRef<HTMLDivElement>(null);
  const targetPct = COVERAGE_PERCENT[tier];
  const displayLabel = label ?? COVERAGE_LABEL[tier];
  // Default to filled on SSR so the bar reads correctly without JS / before hydration.
  // After mount, reset to 0 and animate in once visible.
  const [progress, setProgress] = useState(targetPct);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setProgress(targetPct);
      return;
    }
    // Brief drop to 0 with no transition, then animate to target on viewport entry.
    setProgress(0);
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // rAF so the 0 → target transition is captured (otherwise the browser
          // batches the state changes and the bar jumps straight to target).
          requestAnimationFrame(() => setProgress(targetPct));
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [targetPct]);

  return (
    <div ref={ref} className="space-y-1.5 min-w-[140px]">
      <p className="text-body-sm font-medium text-text-primary">{displayLabel}</p>
      <div
        role="progressbar"
        aria-valuenow={targetPct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`UK coverage: ${displayLabel}, ${targetPct}%`}
        className="relative h-1 w-full max-w-[160px] bg-bg-tertiary rounded-full overflow-hidden"
      >
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-full bg-accent rounded-full origin-left transition-transform duration-[900ms] ease-out motion-reduce:transition-none"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>
      <p className="text-caption text-text-tertiary leading-snug">
        {zones.join(", ")}
      </p>
    </div>
  );
}

// ─── Tracking cell ────────────────────────────────────────────────────────────

function TrackingCell({ live, pod }: TrackingInfo) {
  const liveSpec = {
    live: { Icon: Check, color: "text-success-dark", bg: "bg-success-light", label: "Live" },
    limited: { Icon: AlertCircle, color: "text-warning-dark", bg: "bg-warning-light", label: "Limited" },
    none: { Icon: Minus, color: "text-text-quaternary", bg: "bg-bg-tertiary", label: "None" },
  }[live];
  const podSpec = {
    "photo-signature": { Icon: Camera, color: "text-success-dark", label: "Photo + signature" },
    signature: { Icon: Signature, color: "text-text-secondary", label: "Signature" },
    none: { Icon: Minus, color: "text-text-quaternary", label: "—" },
  }[pod];

  return (
    <div className="space-y-1.5 min-w-[150px]">
      <div className="flex items-center gap-1.5">
        <span
          className={`inline-flex h-5 w-5 items-center justify-center rounded-full ${liveSpec.bg}`}
          aria-hidden
        >
          <liveSpec.Icon className={`h-3 w-3 ${liveSpec.color}`} strokeWidth={2.5} />
        </span>
        <span className="text-body-sm text-text-secondary">{liveSpec.label}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="inline-flex h-5 w-5 items-center justify-center" aria-hidden>
          <podSpec.Icon className={`h-3.5 w-3.5 ${podSpec.color}`} strokeWidth={2.25} />
        </span>
        <span className="text-body-sm text-text-secondary">{podSpec.label}</span>
      </div>
    </div>
  );
}

// ─── Speed pills ──────────────────────────────────────────────────────────────

function SpeedPills({ speeds }: { speeds: SpeedPill[] }) {
  const visible = speeds.slice(0, 3);
  const overflow = speeds.length - visible.length;
  return (
    <div className="flex flex-wrap gap-1.5 max-w-[210px]">
      {visible.map((s, i) => (
        <span
          key={i}
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-micro ${SPEED_PILL_CLASSES[s.tier]}`}
        >
          {s.label}
        </span>
      ))}
      {overflow > 0 && (
        <span className="inline-flex items-center text-micro text-text-tertiary px-1">
          + {overflow} more
        </span>
      )}
    </div>
  );
}

// ─── Best-for pills ───────────────────────────────────────────────────────────

function BestForPills({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5 max-w-[180px]">
      {items.map((p, i) => (
        <span
          key={i}
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-micro ${pillClassFor(p)}`}
        >
          {p}
        </span>
      ))}
    </div>
  );
}

// Legacy renderer — splits text on /,| and renders pills (kept for non-rich tables).
function renderLegacyBestForPills(text: string) {
  const parts = text
    .split(/[\/,|]/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length === 0)
    return <span className="text-body-sm text-text-secondary">{text}</span>;
  return <BestForPills items={parts} />;
}

function legacySpeedIndicator(text: string) {
  const lower = text.toLowerCase();
  let dot: string;
  if (/(next-day|next day|same-day|same day|express|24h|1-day)/.test(lower)) {
    dot = "bg-success";
  } else if (/(two-day|2-day|two day|2 day|48h|economy|standard)/.test(lower)) {
    dot = "bg-warning";
  } else if (/(slow|5-day|5 day|economy select)/.test(lower)) {
    dot = "bg-text-quaternary";
  } else {
    dot = "bg-accent";
  }
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} aria-hidden />
      <span className="text-body-sm text-text-secondary">{text}</span>
    </span>
  );
}

// ─── Carrier cell (shared between desktop sticky-td and mobile banner) ────────

function CarrierIdentity({
  carrier,
  logo,
  descriptor,
}: {
  carrier: string;
  logo?: string;
  descriptor?: string;
}) {
  const href = entityHref(carrier);
  const name = href ? (
    <Link
      href={href}
      className="group/carrier inline-flex items-center gap-1 text-heading-sm text-text-primary leading-tight hover:text-accent transition-colors"
    >
      {carrier}
      <span
        aria-hidden
        className="text-text-tertiary opacity-0 -translate-x-1 group-hover/carrier:opacity-100 group-hover/carrier:translate-x-0 group-hover/carrier:text-accent transition-all motion-reduce:transition-none motion-reduce:translate-x-0"
      >
        →
      </span>
    </Link>
  ) : (
    <p className="text-heading-sm text-text-primary leading-tight">{carrier}</p>
  );
  return (
    <div className="flex items-center gap-3.5">
      <IntegrationLogo
        name={carrier}
        logo={logo}
        size="sm"
        className="flex-shrink-0"
      />
      <div className="min-w-0">
        {name}
        {descriptor && (
          <p className="text-caption text-text-tertiary mt-0.5 leading-snug">
            {descriptor}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

/**
 * Carrier comparison table for /shipping/* pages.
 *
 * Renders a rich variant when rows include `speeds` / `coverage` / `tracking`
 * objects (preferred), and falls back to the legacy text-cell variant otherwise.
 *
 * Desktop: real table with sticky header, sticky carrier column on overflow,
 * coloured speed pills, animated coverage bar, paired tracking icons.
 * Mobile: 2-column grid cards (88px label gutter + fluid value column).
 */
export default function CarrierComparisonTable({
  title = "Carrier comparison",
  intro,
  columns,
  rows,
  footnote,
  methodology,
  bestForColumnIndex,
  speedColumnIndex,
}: CarrierComparisonTableProps) {
  const richMode = rows.length > 0 && isRichRow(rows[0]);

  return (
    <section className="bg-white py-12 md:py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-2">
            <h2 className="text-display-lg text-text-primary">{title}</h2>
            <div className="text-eyebrow text-text-tertiary">
              {rows.length} carriers compared
            </div>
          </div>
          {intro && (
            <p className="text-body-md text-text-secondary max-w-3xl mb-8">
              {intro}
            </p>
          )}
        </ScrollReveal>

        {richMode ? (
          <RichDesktopTable rows={rows as CarrierComparisonRichRow[]} columns={columns} />
        ) : (
          <LegacyDesktopTable
            rows={rows as CarrierComparisonLegacyRow[]}
            columns={columns}
            bestForColumnIndex={bestForColumnIndex}
            speedColumnIndex={speedColumnIndex}
          />
        )}

        {/* Mobile cards */}
        <div className="md:hidden space-y-4 mt-4">
          {rows.map((row, i) =>
            isRichRow(row) ? (
              <RichMobileCard key={row.carrier} row={row} columns={columns} index={i} />
            ) : (
              <LegacyMobileCard
                key={row.carrier}
                row={row}
                columns={columns}
                index={i}
                bestForColumnIndex={bestForColumnIndex}
                speedColumnIndex={speedColumnIndex}
              />
            ),
          )}
        </div>

        {methodology ? (
          <ScrollReveal>
            <div className="mt-8 rounded-xl bg-bg-secondary border border-border p-5 max-w-3xl">
              <p className="text-eyebrow text-text-tertiary mb-2">
                {methodology.eyebrow ?? "Data notes"}
              </p>
              <div className="space-y-1.5">
                {methodology.lines.map((line, i) => (
                  <p
                    key={i}
                    className="text-body-sm text-text-secondary leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ) : footnote ? (
          <ScrollReveal>
            <p className="mt-6 text-body-sm text-text-tertiary leading-relaxed max-w-3xl">
              {footnote}
            </p>
          </ScrollReveal>
        ) : null}
      </div>
    </section>
  );
}

// ─── Desktop rich table ───────────────────────────────────────────────────────

function RichDesktopTable({
  rows,
  columns,
}: {
  rows: CarrierComparisonRichRow[];
  columns: string[];
}) {
  return (
    <ScrollReveal>
      <div className="hidden md:block rounded-2xl border border-border bg-white shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="carrier-sticky-cell sticky left-0 z-[2] bg-bg-tertiary border-b border-border px-5 py-3.5 text-eyebrow text-text-tertiary text-left min-w-[260px]">
                  Carrier
                </th>
                {columns.map((col) => (
                  <th
                    key={col}
                    className="bg-bg-tertiary border-b border-border px-5 py-3.5 text-eyebrow text-text-tertiary"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIdx) => {
                const rowBg = rowIdx % 2 === 1 ? "bg-bg-secondary/30" : "bg-white";
                return (
                  <tr
                    key={row.carrier}
                    className={`group carrier-row ${rowBg} transition-colors hover:bg-accent-light/30`}
                  >
                    {/* Carrier — sticky on horizontal overflow */}
                    <td
                      className={`carrier-sticky-cell sticky left-0 z-[1] ${rowBg} group-hover:bg-accent-light/30 transition-colors border-b border-border px-5 py-5 align-middle min-w-[260px]`}
                    >
                      {/* Hover accent bar */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-accent opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 motion-reduce:transition-none motion-reduce:translate-x-0"
                      />
                      <CarrierIdentity
                        carrier={row.carrier}
                        logo={row.logo}
                        descriptor={row.descriptor}
                      />
                    </td>
                    {/* Speed */}
                    <td className="border-b border-border px-5 py-5 align-middle">
                      <SpeedPills speeds={row.speeds} />
                    </td>
                    {/* Weight */}
                    <td className="border-b border-border px-5 py-5 align-middle">
                      <p className="text-body-sm font-medium text-text-primary">
                        {row.weightCeilingKg}kg
                      </p>
                      {row.weightCeilingNote && (
                        <p className="text-caption text-text-tertiary mt-0.5">
                          {row.weightCeilingNote}
                        </p>
                      )}
                    </td>
                    {/* Coverage */}
                    <td className="border-b border-border px-5 py-5 align-middle">
                      <CoverageBar
                        tier={row.coverage.tier}
                        label={row.coverage.label}
                        zones={row.coverage.zones}
                      />
                    </td>
                    {/* Tracking */}
                    <td className="border-b border-border px-5 py-5 align-middle">
                      <TrackingCell live={row.tracking.live} pod={row.tracking.pod} />
                    </td>
                    {/* Best for */}
                    <td className="border-b border-border px-5 py-5 align-middle">
                      <BestForPills items={row.bestFor} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </ScrollReveal>
  );
}

// ─── Desktop legacy table (backward compat) ───────────────────────────────────

function LegacyDesktopTable({
  rows,
  columns,
  bestForColumnIndex,
  speedColumnIndex,
}: {
  rows: CarrierComparisonLegacyRow[];
  columns: string[];
  bestForColumnIndex?: number;
  speedColumnIndex?: number;
}) {
  const bestForIdx = bestForColumnIndex ?? columns.length - 1;
  return (
    <ScrollReveal>
      <div className="hidden md:block overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-bg-tertiary border-b-2 border-border sticky top-0">
              <tr>
                <th className="px-5 py-3.5 text-eyebrow text-text-tertiary">Carrier</th>
                {columns.map((col) => (
                  <th
                    key={col}
                    className="px-5 py-3.5 text-eyebrow text-text-tertiary"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIdx) => (
                <tr
                  key={row.carrier}
                  className={`border-b border-border last:border-0 transition-colors hover:bg-accent-light/40 ${
                    rowIdx % 2 === 1 ? "bg-bg-secondary/40" : ""
                  }`}
                >
                  <td className="px-5 py-4 align-middle">
                    <CarrierIdentity carrier={row.carrier} logo={row.logo} />
                  </td>
                  {row.cells.map((cell, i) => {
                    const cellType = row.cellTypes?.[i];
                    const isBestFor =
                      cellType === "best-for" || (!cellType && i === bestForIdx);
                    const isSpeed =
                      cellType === "speed" || (!cellType && i === speedColumnIndex);
                    return (
                      <td
                        key={i}
                        className="px-5 py-4 align-middle text-body-sm text-text-secondary"
                      >
                        {isBestFor
                          ? renderLegacyBestForPills(cell)
                          : isSpeed
                            ? legacySpeedIndicator(cell)
                            : cell}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ScrollReveal>
  );
}

// ─── Mobile cards ─────────────────────────────────────────────────────────────

function RichMobileCard({
  row,
  columns,
  index,
}: {
  row: CarrierComparisonRichRow;
  columns: string[];
  index: number;
}) {
  // columns expected order for rich: [Speed, Weight, Coverage, Tracking, Best for]
  const [speedLabel, weightLabel, coverageLabel, trackingLabel, bestForLabel] = [
    columns[0] ?? "Speed",
    columns[1] ?? "Weight",
    columns[2] ?? "Coverage",
    columns[3] ?? "Tracking",
    columns[4] ?? "Best for",
  ];
  return (
    <ScrollReveal delay={index * 0.04}>
      <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
        {/* Banner */}
        <div className="bg-bg-secondary px-5 py-4 border-b border-border">
          <CarrierIdentity
            carrier={row.carrier}
            logo={row.logo}
            descriptor={row.descriptor}
          />
        </div>
        {/* 2-col grid */}
        <dl className="px-5 py-5 grid grid-cols-[88px_1fr] gap-x-4 gap-y-5 items-start">
          <dt className="text-eyebrow text-text-tertiary text-right pt-0.5">
            {speedLabel}
          </dt>
          <dd>
            <SpeedPills speeds={row.speeds} />
          </dd>
          <dt className="text-eyebrow text-text-tertiary text-right pt-0.5">
            {weightLabel}
          </dt>
          <dd>
            <p className="text-body-sm font-medium text-text-primary">
              {row.weightCeilingKg}kg
            </p>
            {row.weightCeilingNote && (
              <p className="text-caption text-text-tertiary mt-0.5">
                {row.weightCeilingNote}
              </p>
            )}
          </dd>
          <dt className="text-eyebrow text-text-tertiary text-right pt-0.5">
            {coverageLabel}
          </dt>
          <dd>
            <CoverageBar
              tier={row.coverage.tier}
              label={row.coverage.label}
              zones={row.coverage.zones}
            />
          </dd>
          <dt className="text-eyebrow text-text-tertiary text-right pt-0.5">
            {trackingLabel}
          </dt>
          <dd>
            <TrackingCell live={row.tracking.live} pod={row.tracking.pod} />
          </dd>
          <dt className="text-eyebrow text-text-tertiary text-right pt-0.5">
            {bestForLabel}
          </dt>
          <dd>
            <BestForPills items={row.bestFor} />
          </dd>
        </dl>
      </div>
    </ScrollReveal>
  );
}

function LegacyMobileCard({
  row,
  columns,
  index,
  bestForColumnIndex,
  speedColumnIndex,
}: {
  row: CarrierComparisonLegacyRow;
  columns: string[];
  index: number;
  bestForColumnIndex?: number;
  speedColumnIndex?: number;
}) {
  const bestForIdx = bestForColumnIndex ?? columns.length - 1;
  return (
    <ScrollReveal delay={index * 0.04}>
      <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
        <div className="mb-4 pb-3 border-b border-border">
          <CarrierIdentity carrier={row.carrier} logo={row.logo} />
        </div>
        <dl className="space-y-3">
          {row.cells.map((cell, j) => {
            const cellType = row.cellTypes?.[j];
            const isBestFor =
              cellType === "best-for" || (!cellType && j === bestForIdx);
            const isSpeed =
              cellType === "speed" || (!cellType && j === speedColumnIndex);
            return (
              <div key={j}>
                <dt className="text-eyebrow text-text-tertiary mb-1.5">
                  {columns[j]}
                </dt>
                <dd className="text-body-sm text-text-secondary">
                  {isBestFor
                    ? renderLegacyBestForPills(cell)
                    : isSpeed
                      ? legacySpeedIndicator(cell)
                      : cell}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </ScrollReveal>
  );
}
