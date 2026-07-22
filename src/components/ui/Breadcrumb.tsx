import Link from "next/link";

export interface Crumb {
  name: string;
  /** Omit on the current (last) page. */
  href?: string;
}

/**
 * Shared breadcrumb trail, mirroring the inline pattern used across detail
 * pages (e.g. IntegrationDetail). Renders a labelled <nav>; the last crumb
 * is the current page (aria-current). Emit BreadcrumbList JSON-LD separately
 * via `breadcrumbSchema` for structured data.
 *
 * `tone="dark"` restyles for photographic/dark heroes (SolutionHero, VideoHero).
 */
export default function Breadcrumb({
  items,
  tone = "light",
  className = "",
}: {
  items: Crumb[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <nav
      className={`flex flex-wrap items-center gap-2 text-sm ${
        dark ? "text-white/60" : "text-text-tertiary"
      } ${className}`}
      aria-label="Breadcrumb"
    >
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={item.name} className="inline-flex items-center gap-2">
            {item.href && !last ? (
              <Link
                href={item.href}
                className={
                  dark
                    ? "hover:text-white transition-colors"
                    : "hover:text-text-primary transition-colors"
                }
              >
                {item.name}
              </Link>
            ) : (
              <span
                className={dark ? "text-white/90" : "text-text-primary"}
                aria-current="page"
              >
                {item.name}
              </span>
            )}
            {!last && <span aria-hidden>/</span>}
          </span>
        );
      })}
    </nav>
  );
}
