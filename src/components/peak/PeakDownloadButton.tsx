"use client";

import type { ReactNode } from "react";
import { usePeakGate } from "./PeakProvider";
import type { PeakTrigger } from "./peak-types";

type Variant = "yellow" | "cobalt" | "inline" | "unstyled";

type Props = {
  trigger: PeakTrigger;
  cardId?: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  /** Extra attributes (e.g. data-peak-faq-cta for the sticky bar's observer). */
  [data: `data-${string}`]: string | boolean | undefined;
};

const VARIANT_CLASS: Record<Variant, string> = {
  yellow: "peak-btn peak-btn--yellow",
  cobalt: "peak-btn peak-btn--cobalt",
  inline: "peak-link",
  unstyled: "",
};

/**
 * The one trigger for the report. Gated: a <button> that opens the dialog.
 * Unlocked (this browser already submitted the form): a direct link to the
 * PDF that still fires `peak_report_download`. Same classes in both branches so
 * the post-hydration flip is invisible.
 */
export default function PeakDownloadButton({
  trigger,
  cardId,
  variant = "yellow",
  className = "",
  children,
  ...rest
}: Props) {
  const { open, unlocked, reportUrl, trackDownload } = usePeakGate();
  const classes = [VARIANT_CLASS[variant], className].filter(Boolean).join(" ");

  if (unlocked) {
    return (
      <a
        href={reportUrl}
        target="_blank"
        rel="noopener"
        className={classes}
        onClick={() => trackDownload({ unlockedFromStorage: true })}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={(e) => open(trigger, { cardId, opener: e.currentTarget })}
      {...rest}
    >
      {children}
    </button>
  );
}
