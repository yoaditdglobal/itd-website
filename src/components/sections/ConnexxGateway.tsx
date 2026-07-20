import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import AutoplayVideo from "@/components/ui/AutoplayVideo";
import { Zap, Eye, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface GatewayFeature {
  icon: LucideIcon;
  title: string;
  desc?: string;
}

export interface GatewayStatTile {
  icon: LucideIcon;
  label: string;
  val: string;
  tint: string;
  bg: string;
}

/** When provided, a looping feature animation replaces the static dashboard mock. */
export interface GatewayMedia {
  mp4: string;
  webm?: string;
  poster: string;
  caption?: string;
}

const DEFAULT_STAT_TILES: GatewayStatTile[] = [
  { icon: Zap, label: "Rate Compare", val: "Active", tint: "text-success", bg: "bg-success-light" },
  { icon: Eye, label: "Tracking", val: "Live", tint: "text-info", bg: "bg-info-light" },
  { icon: ShieldCheck, label: "Compliance", val: "100%", tint: "text-accent", bg: "bg-accent-light" },
];

/**
 * The "How Connexx solves it" platform gateway section: feature cards on the
 * left, app-style Connexx mockup on the right. Extracted from VerticalPage so
 * non-VerticalPage layouts (e.g. IntegrationCategoryPage) can render the same
 * section. `statTiles` customises the mockup's three status tiles; the default
 * trio matches the original hardcoded mockup.
 */
export default function ConnexxGateway({
  features,
  statTiles = DEFAULT_STAT_TILES,
  media,
}: {
  features: GatewayFeature[];
  statTiles?: GatewayStatTile[];
  media?: GatewayMedia;
}) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div>
              <p className="text-eyebrow text-accent mb-3">Connexx Platform</p>
              <h2 className="text-display-lg text-text-primary">How Connexx solves it</h2>
              <div className="mt-6 space-y-3">
                {features.map((f, i) => {
                  // Rotate icon background colour so the list doesn't look monotone.
                  const tints = [
                    { bg: "bg-accent-light", fg: "text-accent" },
                    { bg: "bg-success-light", fg: "text-success-dark" },
                    { bg: "bg-warning-light", fg: "text-warning-dark" },
                    { bg: "bg-accent-secondary-light", fg: "text-accent-secondary" },
                  ];
                  const tint = tints[i % tints.length];
                  return (
                    <ScrollReveal key={f.title} delay={i * 0.08}>
                      <div className="card-hover group flex gap-4 p-4 bg-white rounded-xl border border-border hover:border-accent/30">
                        <div className={`flex-shrink-0 w-11 h-11 rounded-lg ${tint.bg} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                          <f.icon className={`w-5 h-5 ${tint.fg}`} />
                        </div>
                        <div className="flex items-center">
                          <div>
                            <h3 className="text-heading-sm text-text-primary">{f.title}</h3>
                            {f.desc && (
                              <p className="mt-1 text-body-sm text-text-secondary">{f.desc}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
              <div className="mt-8">
                <Button href="/connexx">Explore</Button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            {media ? (
              <div className="rounded-2xl border border-border shadow-md overflow-hidden">
                <AutoplayVideo
                  mp4={media.mp4}
                  webm={media.webm}
                  poster={media.poster}
                  ariaLabel={
                    media.caption ??
                    "Connexx routing a domestic parcel to the cheapest carrier, dispatching it, and writing the shipment back to your systems."
                  }
                  className="block w-full h-auto"
                />
              </div>
            ) : (
            <div className="bg-gradient-to-br from-white to-bg-tertiary rounded-2xl border border-border p-6 shadow-md">
              {/* App-style header */}
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-white text-[10px] font-bold">C</div>
                  <span className="text-sm font-semibold text-text-primary">Connexx</span>
                  <span className="text-xs text-text-tertiary">/ Routing</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] text-text-tertiary uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" aria-hidden />
                  Live
                </span>
              </div>
              {/* Stat tiles */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {statTiles.map((m) => (
                  <div key={m.label} className="bg-white rounded-lg p-3 border border-border shadow-xs">
                    <div className={`w-7 h-7 rounded-md ${m.bg} flex items-center justify-center mb-2`}>
                      <m.icon className={`w-3.5 h-3.5 ${m.tint}`} />
                    </div>
                    <div className="text-[10px] text-text-tertiary uppercase tracking-wider">{m.label}</div>
                    <div className="text-sm font-bold text-text-primary mt-0.5">{m.val}</div>
                  </div>
                ))}
              </div>
              {/* Mini cost-per-parcel comparison */}
              <div className="bg-white rounded-lg border border-border p-3 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-text-tertiary uppercase tracking-wider">Cost per parcel (today)</span>
                  <span className="text-[10px] text-success font-semibold">Cheapest selected</span>
                </div>
                {[
                  { name: "Royal Mail", value: 3.42, bar: 0.78, best: true },
                  { name: "DPD", value: 4.18, bar: 0.95, best: false },
                  { name: "Evri", value: 3.85, bar: 0.88, best: false },
                ].map((c) => (
                  <div key={c.name} className="flex items-center gap-2 py-1">
                    <span className="text-xs text-text-secondary w-20 truncate">{c.name}</span>
                    <div className="flex-1 h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${c.best ? "bg-success" : "bg-text-quaternary/50"}`}
                        style={{ width: `${c.bar * 100}%` }}
                      />
                    </div>
                    <span className={`text-xs font-mono w-12 text-right ${c.best ? "text-success font-semibold" : "text-text-secondary"}`}>£{c.value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
