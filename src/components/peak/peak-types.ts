/**
 * Shared, client-safe types for the /peak page. No values live here — the
 * year-specific config (src/lib/peak-config.ts) is server-only; the server page
 * passes serialisable props built from it.
 */

export type CurveTabKey = "all" | "ecommerce" | "marketplace" | "international";

export type PeakWeek = {
  /** ISO week-start date, e.g. "2025-11-24". */
  iso: string;
  /** Tooltip / table label, e.g. "Week of 24 Nov". */
  label: string;
  /** Axis label, e.g. "24 Nov". */
  short: string;
};

/**
 * What the chart receives per segment. Locked segments never carry values:
 * `shape` is the series normalised to 0..1 and `baseline` is where the
 * "normal week" (100) sits in that space — one unknown (the span) remains, so
 * the real uplift cannot be recovered from the DOM, the RSC payload or the
 * bundle.
 */
export type CurveSeriesClient =
  | {
      key: CurveTabKey;
      label: string;
      locked: false;
      values: number[];
      peakIndex: number;
      pin: { label: string };
    }
  | {
      key: CurveTabKey;
      label: string;
      locked: true;
      shape: number[];
      baseline: number;
      peakIndex: number;
    };

export type PeakCurveConfig = {
  weeks: PeakWeek[];
  series: CurveSeriesClient[];
  captions: Record<CurveTabKey, string>;
  /** Weeks at or after this index render blurred; the scrubber stops before it. */
  blurFromIndex: number;
  eyebrow: string;
  baselineLabel: string;
  lockLabel: string;
  blurLabel: string;
  placeholder: boolean;
};

/** What opened the dialog — sent with the lead and on `peak_form_open`. */
export type PeakTrigger =
  | "hero"
  | "hero_cover"
  | "curve_lock"
  | "curve_blur"
  | "flip_card"
  | "insights_button"
  | "faq_button"
  | "sticky";

export type PeakUtms = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
};

export type PeakDialogCopy = {
  title: string; // already has {year} resolved
  sub: string;
  insideHeading: string;
  inside: string[];
  freeMailHint: string;
  optIn: string;
  submit: string;
  successTitle: string;
  successLine: string;
  successButton: string;
  successSecondary: string;
};

export type PeakReportRequest = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  weeklyVolume: string;
  shipsWithItd: "yes" | "no";
  marketingOptIn: boolean;
  /** Honeypot — must stay empty. */
  website?: string;
  context: {
    reportEdition: string;
    curveTab: CurveTabKey;
    trigger: PeakTrigger;
    cardId?: string;
    pagePath: string;
  } & { utmSource?: string; utmMedium?: string; utmCampaign?: string; utmContent?: string };
};

export type PeakReportResponse = {
  success: true;
  reportUrl: string;
  persisted?: boolean;
  deduped?: boolean;
};
