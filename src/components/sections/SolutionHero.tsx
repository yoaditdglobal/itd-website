import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import { entityHref } from "@/lib/data";
import type { LucideIcon } from "lucide-react";

export interface SolutionHeroChip {
  name: string;
  logo?: string;
}

export interface SolutionHeroImage {
  /** Photo path under /public. When set, renders next/image fill object-cover. */
  src?: string;
  alt?: string;
  /** Tailwind gradient classes (without bg-gradient-to-br). */
  gradient?: string;
  /** Lucide icon shown low-opacity at the centre of the placeholder. */
  icon?: LucideIcon;
  /** CSS object-position override, e.g. "80% 50%". */
  objectPosition?: string;
  /** CSS object-fit override. Defaults to "cover". */
  objectFit?: "cover" | "contain";
}

export interface SolutionHeroProps {
  label: string;
  title: ReactNode;
  subtitle: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  image: SolutionHeroImage;
  chips?: SolutionHeroChip[];
  /** Tailwind max-width class for the glass card. Defaults to "max-w-xl". */
  glassWidth?: string;
}

/**
 * Full-bleed photographic hero used on Solutions pages (Import, 3PL, B2B, …).
 *
 * - Background: full-bleed `next/image priority fill object-cover`. Falls back
 *   to a brand gradient + centred Lucide icon when `image.src` is not set.
 * - Scrim: bg-dark gradient from left, keeps the glass card readable.
 * - Glass card: frosted backdrop-blur on the left third — chip, H1, lead,
 *   two CTAs, and an optional row of carrier / system chips.
 *
 * Motion: reuses the existing global `hero-entrance-*` keyframes. Server-rendered.
 */
export default function SolutionHero({
  label,
  title,
  subtitle,
  primary,
  secondary,
  image,
  chips,
  glassWidth = "max-w-xl",
}: SolutionHeroProps) {
  const Icon = image.icon;
  const gradient = image.gradient ?? "from-bg-dark via-bg-dark-card to-bg-dark";
  const altText = image.alt ?? `${label} hero image`;
  const objectPosition = image.objectPosition ?? "60% 50%";
  const objectFit = image.objectFit ?? "cover";

  return (
    <section data-nav-dark className="bleed-nav relative min-h-[640px] md:min-h-[700px] lg:min-h-[760px] bg-bg-dark">
      {/* Background layers — extended up over the floating-nav strip so the
          photo (not the fallback colour) shows through the nav's gutter. The
          clip lives HERE (not on the section) so the image isn't cut at the nav. */}
      <div className="absolute inset-x-0 bottom-0 top-[calc(-1*var(--nav-h))] overflow-hidden">
        {/* Background photo (or gradient + icon placeholder) */}
        {image.src ? (
          <Image
            src={image.src}
            alt={altText}
            fill
            priority
            quality={90}
            sizes="100vw"
            className={objectFit === "contain" ? "object-contain" : "object-cover"}
            style={{ objectPosition }}
          />
        ) : (
          <div
            aria-hidden
            className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center`}
          >
            {Icon ? (
              <Icon
                className="w-1/3 h-1/3 text-white/10"
                strokeWidth={1.5}
              />
            ) : null}
          </div>
        )}

        {/* Left-to-right scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/90 via-bg-dark/55 to-transparent md:from-bg-dark/85 md:via-bg-dark/45" />

        {/* Film grain */}
        <div className="absolute inset-0 bg-noise opacity-[0.4] mix-blend-soft-light pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32 min-h-[inherit] flex items-center">
        <div className={`${glassWidth} rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-2xl p-7 md:p-10`}>
          <span className="hero-entrance-h1 inline-block px-3 py-1 rounded-full bg-white/15 text-white text-eyebrow tracking-wider mb-5">
            {label}
          </span>
          <h1 className="hero-entrance-h1 text-display-xl text-white">
            {title}
          </h1>
          <p className="hero-entrance-sub mt-5 text-body-lg text-white/80">
            {subtitle}
          </p>
          {(primary || secondary) && (
            <div className="hero-entrance-cta mt-8 flex flex-col sm:flex-row gap-3">
              {primary && <Button href={primary.href}>{primary.label}</Button>}
              {secondary && (
                <Button href={secondary.href} variant="secondary" surface="dark">
                  {secondary.label}
                </Button>
              )}
            </div>
          )}

          {chips && chips.length > 0 && (
            <div
              className="hero-entrance-aside mt-7 flex flex-wrap items-center gap-2"
              aria-label="Connected carriers and systems"
            >
              {chips.map((item) => {
                const href = entityHref(item.name);
                const inner = (
                  <>
                    <IntegrationLogo name={item.name} logo={item.logo} size="xs" />
                    {item.name}
                  </>
                );
                const base =
                  "inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-2.5 py-1 text-caption text-white/85";
                return href ? (
                  <Link
                    key={item.name}
                    href={href}
                    className={`${base} transition-colors hover:bg-white/20 hover:border-white/30 hover:text-white`}
                  >
                    {inner}
                  </Link>
                ) : (
                  <span key={item.name} className={base}>
                    {inner}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
