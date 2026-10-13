"use client";

import PeakCurve from "./PeakCurve";
import { usePeakGate } from "./PeakProvider";
import type { PeakCurveConfig } from "./peak-types";

/** Adapter: the server page can't pass functions, so the gate is read here. */
export default function PeakCurveIsland({ config }: { config: PeakCurveConfig }) {
  const { open, setCurveTab, unlocked, reportUrl, trackDownload } = usePeakGate();
  return (
    <PeakCurve
      config={config}
      onOpenDialog={(trigger, opener) => open(trigger, { opener })}
      onTabChange={setCurveTab}
      unlocked={unlocked}
      reportUrl={reportUrl}
      onDownload={() => trackDownload({ unlockedFromStorage: true })}
    />
  );
}
