/**
 * Peak report page (/peak) — the ONE file to edit each year.
 *
 * Everything year-specific on /peak reads from here: button labels, the PDF
 * path, the cover + takeaways images, the curve series, the pin label, the
 * stat card, captions, flip-card answers, FAQ and the dialog/email copy.
 * Components and the API route contain no year-specific values.
 *
 * ── Annual update steps ──────────────────────────────────────────────────
 * 1. Drop the new PDF, cover and takeaways images into public/reports/peak/
 *    (new filenames — next/image and browsers cache by URL).
 * 2. Update `edition`, `reportPath`, `coverImage`, `previewImage`, the curve
 *    `weeks` + `series` (weekly index, normal September week = 100, late
 *    September → late January), `blurFromIndex`, the `pin` label, `stat`,
 *    `captions` and the flip-card `back` answers.
 * 3. Check the FAQ still holds (gate wording, volume-cap wording).
 * 4. Old PDFs can stay (old links keep working) or be removed.
 *
 * SERVER-ONLY BY CONVENTION: the locked series carry the real figures. Only
 * server code (src/app/peak/page.tsx, the API route, the OG image) may import
 * this file. Client components receive a normalised, value-free shape built by
 * src/lib/peak-curve.server.ts — never import PEAK from a "use client" file.
 */

export type PeakCurveTab = "all" | "ecommerce" | "marketplace" | "international";

export type RawSeries = {
  label: string;
  /** Weekly index, normal September week = 100. One value per entry in `weeks`. */
  values: readonly number[];
  /** Locked series render as a value-free shape with an "In the report" chip. */
  locked: boolean;
  /** Only the unlocked series shows a pinned figure. */
  pin?: { label: string };
};

export const PEAK = {
  edition: "2026", // drives button labels, the storage key and analytics
  reportPath: "/reports/peak/itd-peak-report-2026.pdf",
  coverImage: "/reports/peak/peak-report-2026-cover.png", // 1754×1240
  previewImage: "/reports/peak/peak-report-2026-takeaways.png", // 1287×909, shown BLURRED only

  curve: {
    /**
     * Illustrative weekly shapes, built from the report's published anchor
     * figures (All parcels: +17% week of 3 Nov, +81% Black Friday week, +57%
     * week of 15 Dec; eCommerce +91% in Black Friday week; Marketplace peak
     * +29%; International peaks two weeks after domestic at 3.7× its normal
     * week). Swap in the data owner's full weekly series when available —
     * only the "all" series is ever shown with figures.
     */
    /** ISO week-start dates (Mondays), late September → late January. */
    weeks: [
      "2025-09-22",
      "2025-09-29",
      "2025-10-06",
      "2025-10-13",
      "2025-10-20",
      "2025-10-27",
      "2025-11-03",
      "2025-11-10",
      "2025-11-17",
      "2025-11-24", // Black Friday week
      "2025-12-01",
      "2025-12-08",
      "2025-12-15",
      "2025-12-22",
      "2025-12-29",
      "2026-01-05",
      "2026-01-12",
      "2026-01-19",
      "2026-01-26",
    ],
    /** First week rendered blurred ("the rest of the curve is in the report"). */
    blurFromIndex: 12, // 2025-12-15
    series: {
      all: {
        label: "All parcels",
        values: [100, 101, 103, 106, 110, 113, 117, 124, 140, 181, 160, 158, 157, 149, 112, 96, 104, 108, 103],
        locked: false,
        pin: { label: "+81% in Black Friday week" },
      },
      ecommerce: {
        label: "eCommerce",
        values: [100, 101, 104, 107, 112, 116, 121, 129, 147, 191, 170, 168, 166, 156, 114, 97, 106, 110, 104],
        locked: true,
      },
      marketplace: {
        label: "Marketplace",
        values: [100, 100, 102, 104, 106, 108, 110, 114, 121, 129, 118, 112, 108, 101, 92, 88, 94, 97, 95],
        locked: true,
      },
      international: {
        label: "International",
        values: [100, 102, 105, 109, 114, 120, 128, 140, 162, 205, 290, 370, 300, 210, 130, 98, 108, 112, 106],
        locked: true,
      },
    },
    captions: {
      all: "Volume climbs well before Black Friday and stays high for weeks.",
      ecommerce: "eCommerce runs hottest, and for longest.",
      marketplace: "Marketplace rises less and drops off sooner.",
      international: "International peaks later than domestic, and harder.",
    },
    eyebrow: "Weekly volume against a normal week",
    baselineLabel: "Normal week",
    lockLabel: "In the report",
  },

  stat: {
    value: 11,
    suffix: "%",
    eyebrow: "Single courier vs multi-courier",
    line: "more undelivered parcels for shippers relying on a single courier",
    footnote: "Undelivered means no delivery scan was recorded.",
  },

  flipCards: {
    heading: "Three questions to answer before peak",
    backEyebrow: "The short answer",
    backLink: "Get the report",
    cards: [
      {
        id: "monday",
        front: "Which day of the week takes the hardest hit?",
        back: "Monday, as the weekend's orders land. How hard it hits is in the report.",
      },
      {
        id: "first-scan",
        front: "What was our most common call over peak?",
        back: "Parcels with no first scan. How to avoid it is in the report.",
      },
      {
        id: "returns",
        front: "When do returns really peak?",
        back: "Later than you'd think. The week to staff for is in the report.",
      },
    ],
    closingLine:
      "The report breaks it down week by week, with what each spike means for your courier plan.",
  },

  hero: {
    eyebrow: "Peak planning",
    h1: "Know what peak will throw at you",
    sub: "Our peak report is built from real parcel data across ITD's customers. Use it to plan your capacity and courier mix before volume starts to climb.",
  },

  insights: {
    h2: "How last peak played out",
    intro: "Last peak started earlier and ran longer than most shippers planned for.",
  },

  talk: {
    h2: "One courier is a risk at peak",
    /** `{courierCount}` is replaced with the live carrier count from data.ts. */
    body: "We work with {courierCount} couriers across the UK and abroad. Our team can help you set up a second one and plan your collections before volume climbs.",
    button: "Talk to our team",
    customerLink: "Already a customer? Get Support in Connexx.",
  },

  faq: [
    {
      question: "Do I need to be an ITD customer to download the report?",
      answer: "No. Anyone shipping in the UK can download it.",
    },
    {
      question: "Where does the data come from?",
      answer:
        "Parcels shipped through ITD over last peak, combined across customers and compared with a normal September. No individual customer's data is shown.",
    },
    {
      question: "When should I share my peak forecast?",
      answer:
        "Before volume starts to climb, which is earlier than most shippers expect. The report shows when it started last peak.",
    },
    {
      question: "What if a courier caps my volume?",
      answer:
        "Tell us straight away. If you have more than one courier set up with us, we'll move parcels to one with space.",
    },
    {
      question: "Can I add a second courier before peak?",
      answer:
        "Yes. Customers can ask their account manager to add one. If you're new to ITD, our team will set you up across our courier network.",
    },
    {
      question: "How often is the report updated?",
      answer: "Once a year, ahead of peak, with the latest peak's data.",
    },
  ],

  dialog: {
    /** `{year}` is replaced with `edition`. */
    title: "Get the Peak {year} report",
    sub: "Tell us where to send it. The download opens straight away.",
    insideHeading: "Inside the report",
    inside: [
      "Week-by-week volumes from last peak",
      "How eCommerce, marketplace and international peaks differ",
      "A checklist to work through before volume climbs",
    ],
    freeMailHint: "A work email helps us send the right follow-up.",
    optIn: "Send me ITD's shipping insights by email. You can unsubscribe at any time.",
    submit: "Send me the report",
    successTitle: "It's ready",
    successLine: "Your report is ready to download, and we've emailed you a copy.",
    successButton: "Download Now",
    successSecondary: "Talk to our team",
  },

  /** Shared button labels (`{year}` = edition). */
  labels: {
    download: "Download Now",
    sticky: "Download Now",
  },
} as const;

export type PeakConfig = typeof PEAK;

// Shape checks (kept outside the `as const` literal so inference stays narrow).
const _seriesCheck: Record<PeakCurveTab, RawSeries> = PEAK.curve.series;
const _captionsCheck: Record<PeakCurveTab, string> = PEAK.curve.captions;
void _seriesCheck;
void _captionsCheck;

/** Replace `{year}` with the current edition. */
export function peakLabel(template: string): string {
  return template.replaceAll("{year}", PEAK.edition);
}

/** Weekly parcel volume bands offered in the dialog (also validated server-side). */
export const PEAK_VOLUME_BANDS = [
  "Under 100",
  "100–500",
  "500–2,000",
  "2,000–10,000",
  "10,000+",
] as const;
