import Image from "next/image";

export interface OrbitBrand {
  name: string;
  logo?: string;
}

/**
 * Hero visual for the integration category pages (ERP/WMS, eCommerce &
 * Logistics): the category's own logos on two counter-paced rings around the
 * Connexx mark — the same language as MarketplaceOrbit, generated from data.
 *
 * Tiles stay upright: every chip sits in a counter-rotating wrapper with the
 * SAME duration as its ring (see the orbit rules in the website-builder skill).
 * `.connexx-anim` puts every animated element under the global reduced-motion
 * freeze. Logos render contained on a white tile, so any asset (fill tile or
 * transparent mark) reads cleanly. Decorative: the page lists every
 * integration in text, so the orbit is aria-hidden.
 */
const RINGS = [
  { radiusPct: 30, durationS: 30 },
  { radiusPct: 50, durationS: 46 },
] as const;

export default function CategoryOrbit({ brands }: { brands: OrbitBrand[] }) {
  const withLogos = brands.filter((b) => b.logo).slice(0, 11);
  const innerCount = Math.max(3, Math.floor(withLogos.length * 0.4));
  const rings = [withLogos.slice(0, innerCount), withLogos.slice(innerCount)];

  return (
    <div className="relative h-[380px] w-[380px] xl:h-[420px] xl:w-[420px]" aria-hidden>
      {RINGS.map((r) => (
        <div
          key={r.radiusPct}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/15"
          style={{ width: `${r.radiusPct * 2}%`, height: `${r.radiusPct * 2}%` }}
        />
      ))}

      {rings.map((ringBrands, ri) => {
        const { radiusPct, durationS } = RINGS[ri];
        // Alternate direction per ring for a livelier, layered feel.
        const [spin, counter] =
          ri === 0 ? ["connexx-orbit-cw", "connexx-counter-cw"] : ["connexx-orbit-ccw", "connexx-counter-ccw"];
        return (
          <div
            key={ri}
            className="connexx-anim absolute inset-0"
            style={{ animation: `${spin} ${durationS}s linear infinite` }}
          >
            {ringBrands.map((b, i) => {
              const angle = ((360 / ringBrands.length) * i + ri * 18 - 90) * (Math.PI / 180);
              return (
                <div
                  key={b.name}
                  className="absolute"
                  style={{
                    left: `${50 + Math.cos(angle) * radiusPct}%`,
                    top: `${50 + Math.sin(angle) * radiusPct}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="connexx-anim" style={{ animation: `${counter} ${durationS}s linear infinite` }}>
                    <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_-8px_rgb(0_0_0/0.5)] ring-1 ring-white/20">
                      <Image
                        src={b.logo!}
                        alt=""
                        width={48}
                        height={48}
                        unoptimized
                        className="h-full w-full object-contain"
                      />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Centre — Connexx mark with a soft halo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-[-40%] rounded-full bg-button/25 blur-2xl" />
        <Image
          src="/logos/connexx/connexx-icon.svg"
          alt=""
          width={96}
          height={96}
          className="connexx-anim relative h-20 w-20 xl:h-24 xl:w-24"
          style={{ animation: "connexx-spin 20s linear infinite" }}
        />
      </div>
    </div>
  );
}
