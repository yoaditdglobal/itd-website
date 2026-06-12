"use client";

import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";

const LOGOS = [
  { name: "Air China", file: "Air China.png" },
  { name: "Cathay Pacific", file: "Cathay Pacific.png" },
  { name: "CMA CGM", file: "CMA CGM.png" },
  { name: "Evergreen", file: "EVRGREEN.png" },
  { name: "Hapag-Lloyd", file: "Hapag Lloyd.png" },
  { name: "Japan Airlines", file: "Japan Airlines.png" },
  { name: "Korean Air", file: "Korean Air.png" },
  { name: "Maersk", file: "Maersk.png" },
  { name: "MSC", file: "MSC.png" },
  { name: "ONE Ocean Network", file: "one ocean network express.png" },
  { name: "OOCL", file: "OOCL.png" },
  { name: "Singapore Airlines", file: "Singapore Airlines.png" },
];

const BASE = "/logos/carriers/freight carriersa/";

export default function FreightCarrierTicker() {
  return (
    <ScrollReveal>
      <div className="bg-white border-y border-border py-5 overflow-hidden relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Sizing + cadence matched to the home-page brand strip (LogoTicker):
            two identical groups, gap-x-12 / pr-12 spacing (no per-item margins),
            h-16 w-40 slots, optical height capped ~40px. 12 logos at the same
            per-logo cadence as home's 20-in-50s → 30s, so the scroll speed
            (px/sec) matches the home strip exactly. */}
        <div className="flex w-max animate-ticker" style={{ animationDuration: "30s" }}>
          {[0, 1].map((group) => (
            <ul
              key={group}
              aria-hidden={group === 1}
              className="flex shrink-0 items-center gap-x-12 pr-12"
            >
              {LOGOS.map((logo) => (
                <li
                  key={logo.name}
                  className="flex items-center justify-center h-16 w-40"
                >
                  <Image
                    src={`${BASE}${logo.file}`}
                    alt={logo.name}
                    width={100}
                    height={100}
                    style={{ maxHeight: "48px" }}
                    className="max-w-[120px] w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
