"use client";

import Image from "next/image";

const LOGOS = [
  { name: "Amazon",      src: "/logos/marketplaces/amazon_logo.png"  },
  { name: "eBay",        src: "/logos/marketplaces/ebay_logo.png"     },
  { name: "Etsy",        src: "/logos/marketplaces/etsy_logo.png"     },
  { name: "TikTok Shop", src: "/logos/marketplaces/tiktok_logo.png"   },
  { name: "Temu",        src: "/logos/marketplaces/temu_logo.webp"    },
];

// Match CarrierOrbit exactly: 38% radius, 8s rotation, same logo tile style
const orbitPct = 38;

export default function MarketplaceOrbit() {
  return (
    <div className="relative w-72 h-72 md:w-80 md:h-80" aria-hidden>
      {/* Dashed orbit ring */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/25"
        style={{ width: `${orbitPct * 2}%`, height: `${orbitPct * 2}%` }}
      />

      {/* Logos spaced evenly around the ring, rotating together */}
      <div
        className="connexx-anim absolute inset-0"
        style={{ animation: "connexx-orbit-cw 8s linear infinite" }}
      >
        {LOGOS.map((logo, i) => {
          const angleDeg = (360 / LOGOS.length) * i - 90;
          const angleRad = (angleDeg * Math.PI) / 180;
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
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-lg border border-white/10 p-0.5">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={44}
                    height={44}
                    className="object-contain w-full h-full"
                  />
                </div>
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
