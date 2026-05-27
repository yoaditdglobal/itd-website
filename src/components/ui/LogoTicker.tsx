"use client";

const logos = [
  "Peak Commerce",
  "Velocity Sellers",
  "SwiftLog",
  "Meridian Trade",
  "Northgate",
  "Atlas Industrial",
  "TechFlow",
  "NovaPack",
  "Orbit Goods",
  "Summit Retail",
];

export default function LogoTicker() {
  return (
    <div className="overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-bg-dark to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-bg-dark to-transparent z-10" />
      <div className="flex animate-ticker whitespace-nowrap">
        {[...logos, ...logos].map((name, i) => (
          <div
            key={i}
            className="mx-8 flex-shrink-0 text-white/55 text-sm font-semibold tracking-wider uppercase"
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}
