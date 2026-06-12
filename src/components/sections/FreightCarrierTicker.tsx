"use client";

import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";

/* Trimmed logos (transparent padding cropped to the content bbox) so every mark
   renders at a consistent optical size — the source PNGs sat on 1200×1200
   canvases with wildly different internal padding, which made object-contain
   shrink the thin wordmarks to slivers. `w`/`h` are the trimmed pixel dims so
   next/image keeps each logo's true aspect. */
const LOGOS = [
  { name: "Air China", file: "Air China.png", w: 936, h: 243 },
  { name: "Cathay Pacific", file: "Cathay Pacific.png", w: 968, h: 138 },
  { name: "CMA CGM", file: "CMA CGM.png", w: 962, h: 587 },
  { name: "Evergreen", file: "EVRGREEN.png", w: 1022, h: 181 },
  { name: "Hapag-Lloyd", file: "Hapag Lloyd.png", w: 1080, h: 166 },
  { name: "Japan Airlines", file: "Japan Airlines.png", w: 972, h: 512 },
  { name: "Korean Air", file: "Korean Air.png", w: 1117, h: 132 },
  { name: "Maersk", file: "Maersk.png", w: 1013, h: 228 },
  { name: "MSC", file: "MSC.png", w: 923, h: 810 },
  { name: "ONE Ocean Network", file: "one ocean network express.png", w: 1016, h: 475 },
  { name: "OOCL", file: "OOCL.png", w: 1106, h: 319 },
  { name: "Singapore Airlines", file: "Singapore Airlines.png", w: 972, h: 358 },
];

const BASE = "/logos/carriers/freight-trimmed/";

export default function FreightCarrierTicker() {
  return (
    <ScrollReveal>
      <div className="bg-white border-y border-border py-5 overflow-hidden relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Sizing + cadence matched to the home-page brand strip (LogoTicker):
            two identical groups, gap-x-12 / pr-12 spacing, h-16 w-40 slots, and
            30s duration so the 12 logos scroll at the same px/sec as home's
            20-in-50s. Logos are capped by BOTH height (48px) and width (130px)
            with object-contain — compact marks (MSC, ONE) fill the height, wide
            wordmarks (Cathay, Korean) fill the width, so all carry similar
            optical weight. */}
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
                    width={logo.w}
                    height={logo.h}
                    style={{ maxHeight: "48px" }}
                    className="max-w-[130px] w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
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
