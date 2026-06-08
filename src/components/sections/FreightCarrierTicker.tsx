"use client";

import Image from "next/image";

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
  const doubled = [...LOGOS, ...LOGOS];

  return (
    <div className="bg-white border-y border-border py-5 overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="flex animate-ticker whitespace-nowrap">
        {doubled.map((logo, i) => (
          <div
            key={i}
            className="mx-10 flex-shrink-0 flex items-center justify-center h-10"
          >
            <Image
              src={`${BASE}${logo.file}`}
              alt={logo.name}
              width={100}
              height={100}
              className="h-24 w-24 object-contain opacity-90 hover:opacity-100 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
