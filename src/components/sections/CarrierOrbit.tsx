"use client";
import Image from "next/image";

/** `brand` (optional): the carrier's colour — tints the route ring, a trail
 *  arc and the halo, so each carrier page carries its own identity. */
export default function CarrierOrbit({ name, logo, logoBg, brand }: { name: string; logo?: string; logoBg?: string; brand?: string }) {
  const rad = ((0 - 90) * Math.PI) / 180;
  const orbitPct = 38;
  return (
    <div className="relative w-72 h-72 md:w-80 md:h-80">
      {brand && (
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
          style={{ background: `radial-gradient(closest-side, ${brand}40, transparent)` }}
        />
      )}
      {brand && (
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{ width: `${orbitPct * 2 + 22}%`, height: `${orbitPct * 2 + 22}%`, borderColor: `${brand}26` }}
        />
      )}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/25"
        style={{ width: `${orbitPct * 2}%`, height: `${orbitPct * 2}%`, ...(brand ? { borderColor: `${brand}80` } : {}) }}
      />
      <div
        className="connexx-anim absolute inset-0"
        style={{ animation: "connexx-orbit-cw 8s linear infinite" }}
      >
        {/* Fading trail behind the carrier tile — reads as a delivery route. */}
        {brand && (
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: `${orbitPct * 2}%`,
              height: `${orbitPct * 2}%`,
              // Tile sits at 12 o'clock moving clockwise → the trail brightens up to it.
              background: `conic-gradient(from 0deg, transparent 0deg, ${brand}00 240deg, ${brand}aa 356deg, transparent 360deg)`,
              WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            left: `${50 + Math.cos(rad) * orbitPct}%`,
            top: `${50 + Math.sin(rad) * orbitPct}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="connexx-anim"
            style={{ animation: "connexx-counter-cw 8s linear infinite" }}
          >
            <div
              className="flex items-center justify-center w-14 h-14 rounded-2xl shadow-lg overflow-hidden ring-1 ring-white/20"
              style={logo ? undefined : { backgroundColor: logoBg ?? "#ffffff" }}
            >
              {logo ? (
                <Image src={logo} alt={name} width={56} height={56} quality={90} className="object-cover w-full h-full" />
              ) : (
                <span className="text-xs font-bold text-accent">{name[0]}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image
          src="/logos/connexx/connexx-icon.svg"
          alt="Connexx"
          width={96}
          height={96}
          className="connexx-anim w-20 h-20 md:w-24 md:h-24"
          style={{ animation: "connexx-spin 20s linear infinite" }}
        />
      </div>
    </div>
  );
}
