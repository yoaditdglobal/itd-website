import Image from "next/image";
import { withAlpha } from "@/lib/page-themes";

/**
 * Tech-integration hero motif: the partner's tile ⟷ a live link ⟷ ITD/Connexx.
 * Orders travel out along the link and tracking travels back (the two-way
 * sync every tech integration page describes). Transform-only animation via
 * `.connect-carrier` (globals.css); static under reduced motion. Decorative —
 * the H1 names the integration — so the whole visual is aria-hidden.
 */
export default function ConnectionVisual({
  logo,
  logoFill,
  brand,
  size = "lg",
}: {
  logo?: string;
  logoFill?: boolean;
  /** Partner brand colour (glow + the outgoing half of the link). */
  brand: string;
  size?: "lg" | "sm";
}) {
  const lg = size === "lg";
  const tile = lg ? "h-32 w-32 rounded-[28px] xl:h-36 xl:w-36" : "h-14 w-14 rounded-2xl";
  const line = lg ? "w-28 xl:w-40" : "w-16";

  return (
    <div aria-hidden className="flex items-center">
      {/* Partner tile with its own brand halo */}
      <div className="relative">
        <div
          className="absolute -inset-6 rounded-full blur-2xl"
          style={{ background: `radial-gradient(closest-side, ${withAlpha(brand, 0.45)}, transparent)` }}
        />
        <div
          className={`relative overflow-hidden shadow-[0_20px_50px_-20px_rgb(0_0_0/0.7)] ring-1 ring-white/15 ${tile} ${logoFill ? "" : "bg-white"}`}
        >
          {logo && (
            <Image
              src={logo}
              alt=""
              fill
              priority={lg}
              sizes={lg ? "144px" : "56px"}
              className={logoFill ? "object-cover" : `object-contain ${lg ? "p-5" : "p-2"}`}
            />
          )}
        </div>
      </div>

      {/* The live link */}
      <div className={`relative mx-3 h-[2px] rounded-full ${line}`} style={{ background: `linear-gradient(90deg, ${brand}, #1cc3cb)` }}>
        <span className="connect-carrier connect-carrier--out">
          <span className="connect-dot bg-white" />
        </span>
        <span className="connect-carrier connect-carrier--back">
          <span className="connect-dot bg-[#1cc3cb]" />
        </span>
        {lg && (
          <>
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium uppercase tracking-wider text-white/50">
              Orders →
            </span>
            <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium uppercase tracking-wider text-white/50">
              ← Tracking
            </span>
          </>
        )}
      </div>

      {/* ITD / Connexx tile */}
      <div className="relative">
        <div className="absolute -inset-6 rounded-full bg-[radial-gradient(closest-side,rgb(28_195_203/0.35),transparent)] blur-2xl" />
        <div
          className={`relative flex items-center justify-center bg-[#10173a] shadow-[0_20px_50px_-20px_rgb(0_0_0/0.7)] ring-1 ring-white/15 ${tile}`}
        >
          <Image
            src="/logos/connexx/connexx-icon.svg"
            alt=""
            width={96}
            height={96}
            className={`connexx-anim ${lg ? "h-16 w-16 xl:h-20 xl:w-20" : "h-8 w-8"}`}
            style={{ animation: "connexx-spin 20s linear infinite" }}
          />
        </div>
      </div>
    </div>
  );
}
