import PeakDownloadButton from "./PeakDownloadButton";
import PeakCoverTilt from "./PeakCoverTilt";

type Props = {
  eyebrow: string;
  h1: string;
  sub: string;
  buttonLabel: string;
  coverSrc: string;
  coverAlt: string;
};

/** Six thin wave lines echoing the report's section dividers (SVG, not a screenshot). */
function Waves() {
  const paths = Array.from({ length: 6 }, (_, i) => {
    const y = 40 + i * 26;
    return `M0 ${y} C 160 ${y - 22}, 320 ${y + 22}, 480 ${y} S 800 ${y - 22}, 960 ${y} S 1280 ${y + 22}, 1440 ${y}`;
  });
  return (
    <svg
      className="peak-hero__waves"
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      aria-hidden
      focusable="false"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth="1" />
      ))}
    </svg>
  );
}

/**
 * Server shell. Solid navy background fills the border-box, so `.bleed-nav`
 * carries it up behind the floating nav with no seam; the decorative layers
 * are pulled up by --nav-h as well.
 */
export default function PeakHero({ eyebrow, h1, sub, buttonLabel, coverSrc, coverAlt }: Props) {
  return (
    <section
      data-hero-tone="dark"
      data-peak-hero
      data-analytics-location="peak_hero"
      className="peak-hero bleed-nav relative overflow-hidden"
    >
      <div className="peak-hero__bg" aria-hidden>
        <div className="peak-hero__glow" />
        <Waves />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="max-w-xl">
          <p className="text-eyebrow peak-hero__eyebrow hero-entrance-h1">{eyebrow}</p>
          <h1 className="text-display-xl text-white mt-4 hero-entrance-h1">{h1}</h1>
          <p className="text-body-lg text-white/75 mt-6 hero-entrance-sub">{sub}</p>
          <div className="mt-8 hero-entrance-cta">
            <PeakDownloadButton trigger="hero" variant="yellow" className="peak-btn--lg">
              {buttonLabel}
            </PeakDownloadButton>
          </div>
        </div>
        <div className="hero-entrance-aside">
          <PeakCoverTilt src={coverSrc} alt={coverAlt} />
        </div>
      </div>
    </section>
  );
}
