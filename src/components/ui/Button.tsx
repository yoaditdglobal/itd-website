import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";
type OnSurface = "light" | "dark";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  surface?: OnSurface;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

const base =
  "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 min-h-[44px] min-w-[44px] px-6 py-3 text-sm";

const variants: Record<OnSurface, Record<Variant, string>> = {
  light: {
    primary: "bg-bg-dark text-white hover:bg-bg-dark-card",
    secondary:
      "border border-border-strong text-text-primary hover:bg-bg-secondary",
    ghost: "text-accent hover:text-accent-dark underline-offset-4 hover:underline",
  },
  dark: {
    primary: "bg-white text-bg-dark hover:bg-gray-100",
    secondary:
      "border border-white/30 text-white hover:bg-white/10",
    ghost: "text-white/80 hover:text-white underline-offset-4 hover:underline",
  },
};

export default function Button({
  children,
  href,
  variant = "primary",
  surface = "light",
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = `${base} ${variants[surface][variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
