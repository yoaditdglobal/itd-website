"use client";

import Image from "next/image";

const LOGOS = [
  { name: "Amazon",      src: "/logos/carriers/amazonshipping_logo.png", bg: undefined    },
  { name: "eBay",        src: "/logos/marketplaces/ebay_logo.png",        bg: "#FFFFFF"   },
  { name: "Etsy",        src: "/logos/marketplaces/etsy_logo.png",        bg: undefined   },
  { name: "TikTok Shop", src: "/logos/marketplaces/tiktok_logo.png",      bg: undefined   },
  { name: "Temu",        src: "/logos/marketplaces/temu_logo.webp",       bg: undefined   },
];

const orbitPct = 52;

export default function MarketplaceOrbit() {
  return (
    <div className="relative w-72 h-72 md:w-80 md:h-80" aria-hidden>
      {/* Dashed orbit ring */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/30"
        style={{ width: `${orbitPct * 2}%`, height: `${orbitPct * 2}%` }}
      />

      {/* Logos rotating together around the ring */}
      <div
        className="connexx-anim absolute inset-0"
        style={{ animation: "connexx-orbit-cw 8s linear infinite" }}
      >
        {LOGOS.map((logo, i) => {
          const angleDeg = (360 / LOGOS.length) * i;
          const angleRad = ((angleDeg - 90) * Math.PI) / 180;
          return (
            <div
              key={logo.name}
              style={{
                position: "absolute",
                left: `${50 + Math.cos(angleRad) * orbitPct}%`,
                top:  `${50 + Math.sin(angleRad) * orbitPct}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="connexx-anim"
                style={{ animation: "connexx-counter-cw 8s linear infinite" }}
              >
                <span className="inline-flex items-center justify-center rounded-2xl shadow-lg w-10 h-10 md:w-11 md:h-11 overflow-hidden" style={logo.bg ? { backgroundColor: logo.bg } : undefined}>
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={44}
                    height={44}
                    className={logo.bg ? "object-contain w-8 h-8" : "object-cover w-full h-full"}
                  />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Centre — Connexx icon */}
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
