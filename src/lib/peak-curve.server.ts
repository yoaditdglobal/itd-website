import { PEAK, type PeakCurveTab, type RawSeries } from "@/lib/peak-config";
import type {
  CurveAnnotation,
  CurveSeriesClient,
  CurveTabKey,
  PeakCurveConfig,
  PeakWeek,
} from "@/components/peak/peak-types";

/**
 * Server-side builder for the curve's client props. The whole point of this
 * file is that the real figures for the LOCKED segments never leave the server:
 * they are reduced to a 0..1 shape (plus where the "normal week" sits in that
 * space), which draws the right silhouette but cannot be turned back into an
 * index. Only the "All parcels" series ships real values, and even its blurred
 * tail is coarsened. Import this from server components only.
 *
 * Each locked segment also carries the All-parcels line as a shape (its own
 * 0..1 normalisation — no shared scale, so no readable ratio) and one
 * figure-free annotation that tells that segment's story: eCommerce runs hot
 * for longer (band), Marketplace drops off sooner (marker), International
 * peaks later than domestic (lag bracket).
 */

const TAB_ORDER: PeakCurveTab[] = ["all", "ecommerce", "marketplace", "international"];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function toWeek(iso: string): PeakWeek {
  const [, m, d] = iso.split("-").map(Number);
  const short = `${d} ${MONTHS[(m ?? 1) - 1]}`;
  return { iso, label: `Week of ${short}`, short };
}

const r3 = (v: number) => Math.round(v * 1000) / 1000;

function argmax(values: readonly number[]): number {
  let best = 0;
  for (let i = 1; i < values.length; i++) if (values[i]! > values[best]!) best = i;
  return best;
}

/** Normalise a series to 0..1 with its own min/max. */
function toShape(values: readonly number[]): number[] {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values.map((v) => r3((v - min) / span));
}

function annotationFor(
  key: CurveTabKey,
  shape: number[],
  ghost: number[],
  peakIndex: number,
  blurFromIndex: number,
): CurveAnnotation {
  const lastVisible = blurFromIndex - 1;
  switch (key) {
    case "ecommerce": {
      // Weeks around the peak where the segment holds above the midpoint of
      // its own range — the "stays hot" stretch.
      let start = peakIndex;
      let end = peakIndex;
      while (start > 0 && shape[start - 1]! >= 0.5) start--;
      while (end < lastVisible && shape[end + 1]! >= 0.5) end++;
      return { kind: "band", range: [start, end], label: "Runs hot for longer" };
    }
    case "marketplace": {
      // First week after the peak where the segment sits below the All line.
      let idx = Math.min(lastVisible, peakIndex + 2);
      for (let i = peakIndex + 1; i <= lastVisible; i++) {
        if (shape[i]! < ghost[i]!) {
          idx = i;
          break;
        }
      }
      return { kind: "drop", index: idx, label: "Drops off sooner" };
    }
    default:
      return {
        kind: "lag",
        from: argmax(ghost),
        to: peakIndex,
        label: "Peaks later than domestic",
      };
  }
}

function toClientSeries(key: CurveTabKey, blurFromIndex: number): CurveSeriesClient {
  const raw: RawSeries = PEAK.curve.series[key];
  const peakIndex = argmax(raw.values);

  if (!raw.locked) {
    // Past the blur boundary the line is unreadable anyway — round those
    // values so the path `d` doesn't carry the exact post-mid-December index.
    const values = raw.values.map((v, i) => (i >= blurFromIndex ? Math.round(v / 10) * 10 : v));
    return { key, label: raw.label, locked: false, values, peakIndex, pin: raw.pin! };
  }

  const min = Math.min(...raw.values);
  const span = Math.max(...raw.values) - min || 1;
  const shape = toShape(raw.values);
  const ghostShape = toShape(PEAK.curve.series.all.values);
  return {
    key,
    label: raw.label,
    locked: true,
    shape,
    baseline: r3((100 - min) / span),
    peakIndex,
    ghostShape,
    annotation: annotationFor(key, shape, ghostShape, peakIndex, blurFromIndex),
  };
}

/** Client-safe curve config for `PeakCurve`. */
export function buildCurveConfig(): PeakCurveConfig {
  const { weeks, blurFromIndex } = PEAK.curve;
  const series = TAB_ORDER.map((key) => toClientSeries(key, blurFromIndex));

  for (const s of series) {
    if (s.peakIndex >= blurFromIndex) {
      throw new Error(
        `[peak-config] "${s.key}" peaks at week ${s.peakIndex}, inside the blurred zone (blurFromIndex ${blurFromIndex}). The pin/lock chip must sit on a visible week.`,
      );
    }
    const len = s.locked ? s.shape.length : s.values.length;
    if (len !== weeks.length) {
      throw new Error(`[peak-config] "${s.key}" has ${len} values for ${weeks.length} weeks.`);
    }
  }

  return {
    weeks: weeks.map(toWeek),
    series,
    captions: { ...PEAK.curve.captions },
    blurFromIndex,
    eyebrow: PEAK.curve.eyebrow,
    baselineLabel: PEAK.curve.baselineLabel,
    lockLabel: PEAK.curve.lockLabel,
    blurLabel: PEAK.curve.blurLabel,
  };
}
