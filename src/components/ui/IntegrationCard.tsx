import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import type { Theme } from "@/lib/page-themes";

/**
 * Horizontal integration card (logo · name · 2-line description · arrow),
 * shared by the Tech integrations hub and the category pages. The hover
 * colour comes from the category Theme, so each family reads distinctly.
 */
export default function IntegrationCard({
  href,
  name,
  logo,
  description,
  theme,
  id,
}: {
  href: string;
  name: string;
  logo?: string;
  description?: string;
  theme: Theme;
  id?: string;
}) {
  return (
    <Link
      id={id}
      href={href}
      className="group card-hover relative flex h-full items-start gap-4 overflow-hidden rounded-2xl border border-border bg-white p-5 scroll-mt-24 hover:border-transparent active:scale-[0.99] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
        style={{ background: `linear-gradient(90deg, ${theme.accent}, ${theme.glow})` }}
      />
      <IntegrationLogo
        name={name}
        logo={logo}
        size="sm"
        className="shadow-[0_1px_2px_rgb(15_23_42/0.08)] ring-1 ring-black/5"
      />
      <div className="min-w-0 flex-1">
        <p className="text-heading-sm text-text-primary">{name}</p>
        {description && <p className="mt-1 text-body-sm text-text-secondary line-clamp-2">{description}</p>}
      </div>
      <ArrowUpRight
        className="mt-0.5 h-4 w-4 shrink-0 text-text-tertiary transition-[translate] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
        aria-hidden
      />
    </Link>
  );
}
