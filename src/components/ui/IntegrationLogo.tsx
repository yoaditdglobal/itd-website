import Image from "next/image";

interface IntegrationLogoProps {
  name: string;
  logo?: string | null;
  size?: "xs" | "sm" | "md";
  className?: string;
}

const sizes = {
  xs: { container: "w-5 h-5", image: 20, text: "text-[10px]", radius: "rounded" },
  sm: { container: "w-10 h-10", image: 40, text: "text-sm", radius: "rounded-md" },
  md: { container: "w-16 h-12", image: 64, text: "text-lg", radius: "rounded-lg" },
};

export default function IntegrationLogo({
  name,
  logo,
  size = "sm",
  className = "",
}: IntegrationLogoProps) {
  const s = sizes[size];

  if (logo) {
    return (
      <div className={`${s.container} flex items-center justify-center ${className}`}>
        <Image
          src={logo}
          alt={`${name} logo`}
          width={s.image}
          height={s.image}
          className="object-contain max-w-full max-h-full"
        />
      </div>
    );
  }

  return (
    <div className={`${s.container} ${s.radius} bg-accent-light flex items-center justify-center ${className}`}>
      <span className={`${s.text} font-bold text-accent`}>{name.charAt(0)}</span>
    </div>
  );
}
