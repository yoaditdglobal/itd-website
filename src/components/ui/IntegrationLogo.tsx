import Image from "next/image";

interface IntegrationLogoProps {
  name: string;
  logo?: string | null;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * How the image is fitted inside the box.
   * - "contain" (default) → preserves the logo's natural aspect ratio, never
   *   crops. For square sources in square containers this renders identically
   *   to cover, so square brand tiles (DPD, Evri, FedEx, DHL) are unaffected —
   *   while wide wordmarks (Royal Mail 1.6:1, eBay 2.5:1, Veeqo 2:1, most
   *   customer logos) render whole instead of as cropped slivers.
   * - "cover" → fills the box edge-to-edge, cropping overflow. Only for
   *   genuinely full-bleed tile artwork; no current call site needs it.
   */
  fit?: "cover" | "contain";
  className?: string;
}

const sizes = {
  xs: { container: "w-5 h-5", image: 20, text: "text-[10px]", radius: "rounded" },
  sm: { container: "w-10 h-10", image: 40, text: "text-sm", radius: "rounded-md" },
  md: { container: "w-16 h-12", image: 64, text: "text-lg", radius: "rounded-lg" },
  lg: { container: "w-14 h-14 md:w-16 md:h-16", image: 80, text: "text-xl", radius: "rounded-xl" },
  xl: { container: "w-16 h-16 md:w-20 md:h-20", image: 96, text: "text-2xl", radius: "rounded-xl" },
};

export default function IntegrationLogo({
  name,
  logo,
  size = "sm",
  fit = "contain",
  className = "",
}: IntegrationLogoProps) {
  const s = sizes[size];

  if (logo) {
    const objectFit = fit === "contain" ? "object-contain" : "object-cover";
    return (
      <div
        className={`${s.container} ${s.radius} overflow-hidden flex items-center justify-center flex-shrink-0 ${className}`}
      >
        <Image
          src={logo}
          alt={`${name} logo`}
          width={s.image}
          height={s.image}
          quality={90}
          className={`${objectFit} w-full h-full`}
        />
      </div>
    );
  }

  return (
    <div
      className={`${s.container} ${s.radius} bg-accent-light flex items-center justify-center flex-shrink-0 ${className}`}
    >
      <span className={`${s.text} font-bold text-accent`}>{name.charAt(0)}</span>
    </div>
  );
}
