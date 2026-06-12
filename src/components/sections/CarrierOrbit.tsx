"use client";
import Image from "next/image";

export default function CarrierOrbit({ name, logo, logoBg }: { name: string; logo?: string; logoBg?: string }) {
  const rad = ((0 - 90) * Math.PI) / 180;
  const orbitPct = 38;
  return (
    <div className="relative w-72 h-72 md:w-80 md:h-80">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/25"
        style={{ width: `${orbitPct * 2}%`, height: `${orbitPct * 2}%` }}
      />
      <div
        className="connexx-anim absolute inset-0"
        style={{ animation: "connexx-orbit-cw 8s linear infinite" }}
      >
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
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl shadow-lg border border-white/10 p-0.5" style={{ backgroundColor: logoBg ?? "#ffffff" }}>
              {logo ? (
                <Image src={logo} alt={name} width={44} height={44} className="object-contain w-full h-full" />
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
