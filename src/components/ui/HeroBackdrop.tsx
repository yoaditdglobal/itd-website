import { withAlpha } from "@/lib/page-themes";

/**
 * Decorative backdrop for the dark heroes on integration / carrier / library
 * pages: two soft glows tinted with the page's own colours (partner brand +
 * category) over a masked dot grid. Place as the first child of a
 * `relative overflow-hidden` hero; content above it needs `relative`.
 */
export default function HeroBackdrop({
  primary,
  secondary,
}: {
  /** Main glow (e.g. the partner's brand colour), top-right. */
  primary: string;
  /** Second glow (e.g. the category colour), lower-left. */
  secondary: string;
}) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="absolute -top-40 right-[-6%] h-[520px] w-[720px] rounded-full blur-3xl"
        style={{ background: `radial-gradient(closest-side, ${withAlpha(primary, 0.34)}, transparent)` }}
      />
      <div
        className="absolute -bottom-48 left-[-10%] h-[460px] w-[680px] rounded-full blur-3xl"
        style={{ background: `radial-gradient(closest-side, ${withAlpha(secondary, 0.26)}, transparent)` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.07)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_70%_60%_at_65%_45%,#000_15%,transparent_75%)]" />
    </div>
  );
}
