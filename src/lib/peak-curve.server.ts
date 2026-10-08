import { PEAK, type PeakCurveTab, type RawSeries } from "@/lib/peak-config";
import type {
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
  const max = Math.max(...raw.values);
  const span = max - min || 1;
  return {
    key,
    label: raw.label,
    locked: true,
    shape: raw.values.map((v) => r3((v - min) / span)),
    baseline: r3((100 - min) / span),
    peakIndex,
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
    placeholder: PEAK.curve.placeholder,
  };
}

/**
 * Fail a Netlify PRODUCTION build while the curve still runs on placeholder
 * data. Deploy previews (CONTEXT=deploy-preview) and local builds pass so the
 * page can be reviewed; the "PLACEHOLDER DATA" badge stays visible on those.
 */
export function assertPeakProductionReady(): void {
  if (PEAK.curve.placeholder && process.env.CONTEXT === "production") {
    throw new Error(
      "[/peak] PEAK.curve.placeholder is still true — replace the placeholder curve series in src/lib/peak-config.ts and set placeholder: false before a production build.",
    );
  }
}
