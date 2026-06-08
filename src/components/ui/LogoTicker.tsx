"use client";

import Image from "next/image";

interface CustomerLogo {
  name: string;
  src: string;
}

/* Real ITD Global customer brands, rendered as white monochrome marks on
   transparent backgrounds so they sit cleanly on the dark strip with no
   tiles. (home-bargains is a two-tone colour block, kept in its own colours.) */
const logos: CustomerLogo[] = [
  { name: "Sainsbury's", src: "/logos/customers-white/sainsburys.webp" },
  { name: "Argos", src: "/logos/customers-white/argos.webp" },
  { name: "Home Bargains", src: "/logos/customers-white/home-bargains.webp" },
  { name: "West Ham United", src: "/logos/customers/west-ham.webp" },
  { name: "PrinterPix", src: "/logos/customers-white/printerpix.webp" },
  { name: "BargainMax", src: "/logos/customers-white/bargainmax.webp" },
  { name: "KitchenCraft", src: "/logos/customers-white/kitchencraft.webp" },
  { name: "Tatti Lashes", src: "/logos/customers-white/tatti-lashes.webp" },
  { name: "Walker Logistics", src: "/logos/customers-white/walker-logistics.webp" },
  { name: "Pacwolf", src: "/logos/customers-white/pacwolf.webp" },
  { name: "Nick's", src: "/logos/customers-white/nicks.webp" },
  { name: "Lighting Online", src: "/logos/customers-white/lighting-online.webp" },
  { name: "Globalstar", src: "/logos/customers-white/globalstar.webp" },
  { name: "Rioz Global", src: "/logos/customers-white/rioz-global.webp" },
  { name: "Nivtar", src: "/logos/customers-white/nivtar.webp" },
  { name: "EFCL", src: "/logos/customers-white/efcl.webp" },
  { name: "PB Fulfilment", src: "/logos/customers-white/pb-fulfilment.webp" },
  { name: "CK Fulfilment", src: "/logos/customers-white/ck-fulfilment.webp" },
  { name: "Scale 3PL", src: "/logos/customers-white/scale3pl.webp" },
  { name: "TBM Solution", src: "/logos/customers-white/tbm-solution.webp" },
];

export default function LogoTicker() {
  return (
    <div className="overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-bg-dark to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-bg-dark to-transparent z-10" />
      <div className="flex animate-ticker whitespace-nowrap py-1">
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={i}
            className="mx-7 flex-shrink-0 flex items-center justify-center h-12"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={160}
              height={40}
              className="max-h-8 w-auto object-contain opacity-75 transition-opacity hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
