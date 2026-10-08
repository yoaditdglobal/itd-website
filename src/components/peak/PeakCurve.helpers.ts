import type { CurveSeriesClient, PeakWeek } from "./peak-types";

/** Pure geometry/text helpers for PeakCurve. No DOM, no React. */

export const PAD = { top: 28, right: 16, bottom: 36, left: 44 } as const;
/** Width of the clear→blurred handover, in px. */
export const FADE_W = 48;

export type Pt = { x: number; y: number };

const r1 = (v: number) => Math.round(v * 10) / 10;

export function stepX(w: number, n: number): number {
  return (w - PAD.left - PAD.right) / Math.max(1, n - 1);
}

export function xOf(i: number, w: number, n: number): number {
  return PAD.left + i * stepX(w, n);
}

export type Scales = {
  yOf: (v: number) => number;
  baselineY: number;
  floorY: number;
  pts: Pt[];
  ticks: number[];
};

/**
 * Unlocked series use a real index domain (min(100, data) → max, padded).
 * Locked series live in their own 0..1 shape space, so nothing on screen can
 * be read back as an index.
 */
export function makeScales(s: CurveSeriesClient, w: number, h: number): Scales {
  const plotH = h - PAD.top - PAD.bottom;
  const n = s.locked ? s.shape.length : s.values.length;
  let lo: number;
  let hi: number;
  if (s.locked) {
    lo = -0.08;
    hi = 1.08;
  } else {
    const mn = Math.min(100, ...s.values);
    const mx = Math.max(...s.values);
    const range = Math.max(1, mx - mn);
    lo = mn - range * 0.12;
    hi = mx + range * 0.1;
  }
  const yOf = (v: number) => PAD.top + (1 - (v - lo) / (hi - lo)) * plotH;
  const data = s.locked ? s.shape : s.values;
  const pts = data.map((v, i) => ({ x: r1(xOf(i, w, n)), y: r1(yOf(v)) }));
  const ticks = s.locked ? [] : niceTicks(lo, hi);
  return {
    yOf,
    baselineY: r1(yOf(s.locked ? s.baseline : 100)),
    floorY: PAD.top + plotH,
    pts,
    ticks,
  };
}

/** Round-number y ticks (multiples of 25) inside the domain. */
export function niceTicks(lo: number, hi: number): number[] {
  const step = hi - lo > 160 ? 50 : 25;
  const out: number[] = [];
  for (let t = Math.ceil(lo / step) * step; t <= hi; t += step) out.push(t);
  return out;
}

/**
 * Monotone cubic interpolation (Fritsch–Carlson). Unlike Catmull-Rom it never
 * overshoots, so the Black Friday apex sits exactly on its data point and the
 * yellow pin lands on the line.
 */
export function monotonePath(p: Pt[]): string {
  const n = p.length;
  if (n === 0) return "";
  if (n === 1) return `M${p[0]!.x},${p[0]!.y}`;
  const dx: number[] = [];
  const m: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    dx.push(p[i + 1]!.x - p[i]!.x);
    m.push((p[i + 1]!.y - p[i]!.y) / (dx[i] || 1));
  }
  const t: number[] = new Array(n).fill(0);
  t[0] = m[0]!;
  t[n - 1] = m[n - 2]!;
  for (let i = 1; i < n - 1; i++) {
    if (m[i - 1]! * m[i]! <= 0) {
      t[i] = 0; // extremum: flat tangent, no overshoot
      continue;
    }
    const w1 = 2 * dx[i]! + dx[i - 1]!;
    const w2 = dx[i]! + 2 * dx[i - 1]!;
    t[i] = (w1 + w2) / (w1 / m[i - 1]! + w2 / m[i]!);
  }
  let d = `M${p[0]!.x},${p[0]!.y}`;
  for (let i = 0; i < n - 1; i++) {
    const k = dx[i]! / 3;
    d += ` C${r1(p[i]!.x + k)},${r1(p[i]!.y + t[i]! * k)} ${r1(p[i + 1]!.x - k)},${r1(
      p[i + 1]!.y - t[i + 1]! * k,
    )} ${p[i + 1]!.x},${p[i + 1]!.y}`;
  }
  return d;
}

export function areaPath(p: Pt[], lineD: string, floorY: number): string {
  if (p.length === 0) return "";
  return `${lineD} L${p[p.length - 1]!.x},${floorY} L${p[0]!.x},${floorY} Z`;
}

/** Pointer x (px, relative to the svg's left edge) → nearest visible week. */
export function indexFromX(x: number, w: number, n: number, blurFromIndex: number): number {
  const raw = Math.round((x - PAD.left) / stepX(w, n));
  const maxVisible = Math.max(0, Math.min(n - 1, blurFromIndex - 1));
  return Math.max(0, Math.min(raw, maxVisible));
}

export function tooltipText(s: CurveSeriesClient, i: number, weeks: PeakWeek[]): string {
  const wk = weeks[i]?.label ?? "";
  if (s.locked) {
    return i === s.peakIndex ? `${wk}. Peak week. The figure is in the report.` : wk;
  }
  const pct = Math.round((s.values[i] ?? 100) - 100);
  if (pct === 0) return `${wk}: level with a normal week`;
  return `${wk}: ${Math.abs(pct)}% ${pct > 0 ? "above" : "below"} a normal week`;
}

/** Rows for the visually hidden data table. */
export function tableRows(
  s: CurveSeriesClient,
  weeks: PeakWeek[],
  blurFromIndex: number,
): { week: string; value: string }[] {
  return weeks.map((wk, i) => {
    if (s.locked || i >= blurFromIndex) return { week: wk.label, value: "In the report" };
    const pct = Math.round((s.values[i] ?? 100) - 100);
    return {
      week: wk.label,
      value: `${s.values[i]} (${pct >= 0 ? "+" : ""}${pct}% vs a normal week)`,
    };
  });
}
