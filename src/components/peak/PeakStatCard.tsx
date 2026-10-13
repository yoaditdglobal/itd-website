import CountUp from "@/components/ui/CountUp";

type Props = {
  eyebrow: string;
  value: number;
  suffix: string;
  line: string;
  footnote: string;
};

/**
 * Data point 2 — the report's "11%" spread as a wide yellow card. The number
 * is server-rendered at its final value (CountUp only animates on entry).
 * Right-hand bar glyphs are shape only: no extra figures on the page.
 */
export default function PeakStatCard({ eyebrow, value, suffix, line, footnote }: Props) {
  return (
    <div className="peak-stat">
      <div className="peak-stat__copy">
        <p className="text-eyebrow peak-stat__eyebrow">{eyebrow}</p>
        <p className="peak-stat__num" aria-label={`${value}${suffix} ${line}`}>
          <CountUp to={value} suffix={suffix} duration={1200} />
        </p>
        <p className="text-body-lg peak-stat__line" aria-hidden>
          {line}
        </p>
        <p className="text-caption peak-stat__foot">{footnote}</p>
      </div>
      <div className="peak-stat__glyphs" aria-hidden>
        <div className="peak-stat__glyph">
          <div className="peak-stat__bar peak-stat__bar--tall" />
          <span className="text-eyebrow">1 courier</span>
        </div>
        <div className="peak-stat__glyph">
          <div className="peak-stat__bar peak-stat__bar--short" />
          <span className="text-eyebrow">2+ couriers</span>
        </div>
      </div>
    </div>
  );
}
