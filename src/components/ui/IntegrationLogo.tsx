import Image from "next/image";

interface IntegrationLogoProps {
  name: string;
  logo?: string | null;
  size?: "xs" | "sm" | "md" | "lg";
  /**
   * How the image is fitted inside the box.
   * - "cover" (default) → fills the rounded box edge-to-edge. Best for brand-tile
   *   logos that have their own coloured background (Tatti pink, WHU shield,
   *   Sainsbury's orange, square carrier wordmarks like DPD/Evri/FedEx).
   * - "contain" → preserves aspect, may leave whitespace. Use for the carrier
   *   hero where the container is intentionally rectangular and the wordmark
   *   needs to render at its natural shape.
   */
  fit?: "cover" | "contain";
  className?: string;
}

const sizes = {
  xs: { container: "w-5 h-5", image: 20, text: "text-[10px]", radius: "rounded" },
  sm: { container: "w-10 h-10", image: 40, text: "text-sm", radius: "rounded-md" },
  md: { container: "w-16 h-12", image: 64, text: "text-lg", radius: "rounded-lg" },
  lg: { container: "w-14 h-14 md:w-16 md:h-16", image: 80, text: "text-xl", radius: "rounded-xl" },
};

export default function IntegrationLogo({
  name,
  logo,
  size = "sm",
  fit = "cover",
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
