import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface HelpCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
}

/**
 * Large card used on /help and /help/centre. Full-tile clickable
 * (entire card is wrapped in a Link). Icon + H3 + description + CTA row.
 *
 * Voice note: H3 is the actual heading here (not a card label) because each
 * card stands on its own as a navigational destination, so the global CSS
 * clamp on h3 is the correct visual treatment.
 */
export default function HelpCard({
  icon: Icon,
  title,
  description,
  ctaLabel,
  href,
}: HelpCardProps) {
  return (
    <Link
      href={href}
      className="card-hover group bg-white rounded-xl border border-border p-6 md:p-7 hover:border-accent/30 flex flex-col h-full"
    >
      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
        <Icon className="w-6 h-6 text-accent" />
      </div>
      <h3 className="text-text-primary font-semibold mb-2">{title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed flex-1">
        {description}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent group-hover:gap-2.5 transition-all">
        {ctaLabel}
        <ArrowRight className="w-4 h-4" />
      </span>
    </Link>
  );
}
