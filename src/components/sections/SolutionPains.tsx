import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";
import type { LucideIcon } from "lucide-react";

interface PainPoint {
  num: string;
  title: string;
  desc: string;
}

interface SolutionPainsImage {
  src?: string;
  alt?: string;
  gradient?: string;
  icon?: LucideIcon;
  /** CSS object-position, e.g. "55% 50%". */
  objectPosition?: string;
  /** "cover" (default) crops to fill the frame. "contain" shows the whole image with letterboxing. */
  objectFit?: "cover" | "contain";
}

interface SolutionPainsProps {
  pains: PainPoint[];
  image: SolutionPainsImage;
  /** Optional override for the eyebrow line. Defaults to "Where the margin leaves". */
  eyebrow?: string;
  /** Optional override for the section heading. Defaults to "What gets in the way today." */
  heading?: string;
  /** Optional override for the short lead under the heading. */
  lead?: string;
}

const DEFAULT_LEAD =
  "Three places duty, VAT, and clearance costs slip out of the P&L before anyone in finance sees them.";

/**
 * Editorial-split pain-points section used on Solutions pages (Import, 3PL,
 * B2B, …). Left column: full-height image (photo or gradient + icon
 * placeholder). Right column: eyebrow + heading + three pain rows connected
 * by a faint vertical hairline (01 → 02 → 03).
 *
 * Suppress the default `VerticalPage` pain-points block via `hidePainPoints`
 * and render this above it.
 */
export default function SolutionPains({
  pains,
  image,
  eyebrow = "Where the margin leaves",
  heading = "What gets in the way today.",
  lead = DEFAULT_LEAD,
}: SolutionPainsProps) {
  const Icon = image.icon;
  const gradient = image.gradient ?? "from-accent-light via-white to-accent/15";
  const altText = image.alt ?? heading;
  const objectPosition = image.objectPosition ?? "60% 50%";

  return (
    <section className="bg-bg-secondary py-16 md:py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Photo / placeholder */}
          <ScrollReveal className="lg:col-span-5 lg:h-full">
            <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full rounded-2xl overflow-hidden shadow-xl border border-border">
              {image.src ? (
                <Image
                  src={image.src}
                  alt={altText}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className={image.objectFit === "contain" ? "object-contain" : "object-cover"}
                  style={{ objectPosition }}
                />
              ) : (
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center`}
                  aria-hidden
                >
                  {Icon ? (
                    <Icon
                      className="w-1/3 h-1/3 text-accent/30"
                      strokeWidth={1.25}
                    />
                  ) : null}
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Header + pain rows */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              {eyebrow && <p className="text-eyebrow text-accent mb-3">{eyebrow}</p>}
              <h2 className="text-display-md text-text-primary">{heading}</h2>
              <p className="mt-4 text-body-md text-text-secondary max-w-prose">
                {lead}
              </p>
            </ScrollReveal>

            <ol className="mt-10 space-y-10 md:space-y-12">
              {pains.map((pain, i) => {
                const isLast = i === pains.length - 1;
                return (
                  <ScrollReveal key={pain.num} delay={(i + 1) * 0.1}>
                    <li className="relative flex gap-5 md:gap-7">
                      <div className="flex-shrink-0 w-12 md:w-14 relative">
                        <span
                          className="text-stat-xl text-accent leading-none block"
                          aria-hidden="true"
                        >
                          {pain.num}
                        </span>
                        {!isLast && (
                          <span
                            aria-hidden="true"
                            className="absolute left-1/2 -translate-x-1/2 top-12 md:top-14 -bottom-12 md:-bottom-14 w-px bg-border"
                          />
                        )}
                      </div>

                      <div className="flex-1 pt-1">
                        <h3 className="text-heading-md text-text-primary">
                          {pain.title}
                        </h3>
                        <p className="mt-2 text-body-md text-text-secondary leading-relaxed">
                          {pain.desc}
                        </p>
                      </div>
                    </li>
                  </ScrollReveal>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
