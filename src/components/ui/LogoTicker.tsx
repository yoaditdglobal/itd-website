"use client";

import Image from "next/image";

interface CustomerLogo {
  name: string;
  src: string;
  /** Per-logo max-height (px), hand-tuned so all logos carry similar optical
      weight. Compact/bold marks get less height; wide thin wordmarks get more. */
  h: number;
}

/* Real ITD Global customer brands, shown in full colour on the light strip. */
const logos: CustomerLogo[] = [
  { name: "Sainsbury's", src: "/logos/customers/sainsburys.webp", h: 38 },
  { name: "Argos", src: "/logos/customers/argos.webp", h: 30 },
  { name: "Home Bargains", src: "/logos/customers/home-bargains.webp", h: 32 },
  { name: "West Ham United", src: "/logos/customers/west-ham.webp", h: 38 },
  { name: "PrinterPix", src: "/logos/customers/printerpix.webp", h: 36 },
  { name: "BargainMax", src: "/logos/customers/bargainmax.webp", h: 30 },
  { name: "KitchenCraft", src: "/logos/customers/kitchencraft.webp", h: 40 },
  { name: "Tatti Lashes", src: "/logos/customers/tatti-lashes.webp", h: 40 },
  { name: "Walker Logistics", src: "/logos/customers/walker-logistics.webp", h: 40 },
  { name: "Pacwolf", src: "/logos/customers/pacwolf.webp", h: 30 },
  { name: "Nick's", src: "/logos/customers/nicks.webp", h: 28 },
  { name: "Lighting Online", src: "/logos/customers/lighting-online.webp", h: 36 },
  { name: "Globalstar", src: "/logos/customers/globalstar.webp", h: 40 },
  { name: "Rioz Global", src: "/logos/customers/rioz-global.webp", h: 34 },
  { name: "Nivtar", src: "/logos/customers/nivtar.webp", h: 32 },
  { name: "EFCL", src: "/logos/customers/efcl.webp", h: 34 },
  { name: "PB Fulfilment", src: "/logos/customers/pb-fulfilment.webp", h: 36 },
  { name: "CK Fulfilment", src: "/logos/customers/ck-fulfilment.webp", h: 32 },
  { name: "Scale 3PL", src: "/logos/customers/scale3pl.webp", h: 34 },
  { name: "TBM Solution", src: "/logos/customers/tbm-solution.webp", h: 36 },
];

export default function LogoTicker() {
  return (
    <div className="overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
      {/* Two identical groups so translateX(-50%) equals exactly one group width
          → perfectly seamless loop with no drift. Spacing via gap (+ trailing pr),
          never per-item margins (those break the 2× width and cause a jump). */}
      <div className="flex w-max animate-ticker">
        {[0, 1].map((group) => (
          <ul
            key={group}
            aria-hidden={group === 1}
            className="flex shrink-0 items-center gap-x-12 pr-12"
          >
            {logos.map((logo) => (
              <li
                key={logo.name}
                className="flex items-center justify-center h-16 w-40"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={200}
                  height={64}
                  style={{ maxHeight: `${logo.h}px` }}
                  className="max-w-[150px] w-auto object-contain"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
