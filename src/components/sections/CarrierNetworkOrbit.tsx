import Image from "next/image";
import { OrbitLayer, type Brand } from "@/components/sections/ConnexxOrbit";
import type { Integration } from "@/lib/data";

interface Group {
  region: string;
  items: Integration[];
}

interface CarrierNetworkOrbitProps {
  groups: Group[];
  /** Region currently selected in the directory toggle. */
  active: string;
}

/** Chips dropped at mobile widths (orbit shrinks to 280px). */
const MOBILE_HIDE: Record<string, Set<string>> = {
  Domestic: new Set(["InPost", "DHL Parcel"]),
  International: new Set(["Landmark", "TNT"]),
};

const CAPTION: Record<string, string> = {
  Domestic: "UK carrier network",
  International: "International carrier network",
};

/**
 * Carriers-only orbit for the /integrations/carriers directory — the
 * "pillar" design from /connexx (ConnexxOrbit primitives) on a dark stage
 * panel. Both region sets stay mounted and crossfade via visibility/opacity
 * when the Domestic/International toggle switches; the dashed guide circles
 * and the spinning Connexx mark are shared between them. Reduced motion is
 * handled by the global `.connexx-anim` freeze rule.
 */
export default function CarrierNetworkOrbit({
  groups,
  active,
}: CarrierNetworkOrbitProps) {
  const activeGroup = groups.find((g) => g.region === active);
  const carrierCount = activeGroup?.items.length ?? 0;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-bg-dark via-bg-dark-card to-bg-dark py-10 md:py-14">
      {/* Accent glow + grain — same stage recipe as the /connexx orbit */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(29,63,184,0.30) 0%, transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-noise opacity-[0.35] mix-blend-soft-light"
      />

      <div
        role="img"
        aria-label={`Connexx connects to ${carrierCount} carriers ${
          active === "Domestic" ? "across the UK" : "worldwide"
        }.`}
        className="relative aspect-square mx-auto w-full max-w-[280px] md:max-w-[420px] lg:max-w-[480px]"
      >
        {/* Dashed guide circles — shared across both region sets */}
        {[28, 40, 52].map((r) => (
          <div
            key={r}
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/30"
            style={{ width: `${r * 2}%`, height: `${r * 2}%` }}
          />
        ))}

        {/* Per-region carrier rings, stacked and crossfaded on toggle.
            `visibility` keeps the hidden set unpainted (same pattern as
            .nav-dropdown). */}
        {groups.map((g) => {
          const brands: Brand[] = g.items.map((c) => ({
            name: c.name,
            logo: c.logo,
          }));
          const innerCount = Math.max(2, Math.floor(brands.length * 0.38));
          const inner = brands.slice(0, innerCount);
          const outer = brands.slice(innerCount);
          const hide = MOBILE_HIDE[g.region] ?? new Set<string>();
          const isActive = g.region === active;
          return (
            <div
              key={g.region}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-[opacity,visibility] duration-300 ${
                isActive
                  ? "visible opacity-100"
                  : "invisible opacity-0 pointer-events-none"
              }`}
            >
              <OrbitLayer
                brands={outer}
                radiusPct={46}
                durationS={55}
                direction="ccw"
                mobileHide={hide}
                tile
              />
              <OrbitLayer
                brands={inner}
                radiusPct={28}
                durationS={35}
                direction="cw"
                mobileHide={hide}
                tile
              />
            </div>
          );
        })}

        {/* Centre — Connexx mark, shared between sets */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/logos/connexx/connexx-icon.svg"
            alt=""
            width={160}
            height={160}
            className="connexx-anim w-20 h-20 md:w-28 md:h-28"
            style={{ animation: "connexx-spin 30s linear infinite" }}
          />
        </div>
      </div>

      {/* Region caption — continuity with the old map's corner chip */}
      <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm">
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full bg-accent-secondary animate-pulse-dot"
        />
        {CAPTION[active] ?? active}
      </span>
    </div>
  );
}
