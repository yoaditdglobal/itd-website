"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { track } from "@/lib/analytics";
import { getUnlocked, subscribeUnlocked, captureUtms } from "./peak-storage";
import type { CurveTabKey, PeakDialogCopy, PeakTrigger, PeakUtms } from "./peak-types";
import PeakReportDialog from "./PeakReportDialog";
import PeakStickyCta from "./PeakStickyCta";

/**
 * One gate for the whole page. Every "Download the Peak {year} report" button,
 * the hero cover, the curve's lock chip + blur label, the flip-card links and
 * the sticky bar all call `open(trigger)` on this single dialog instance.
 * Once the visitor has unlocked the report (success state, remembered in
 * localStorage) `unlocked` flips and `PeakDownloadButton` renders a direct
 * link to the PDF instead.
 */

export type PeakGate = {
  open: (trigger: PeakTrigger, extra?: { cardId?: string }) => void;
  /** false on the server and during hydration; true once storage says so. */
  unlocked: boolean;
  /** API-returned URL after a successful submit, else the config path. */
  reportUrl: string;
  curveTab: CurveTabKey;
  setCurveTab: (tab: CurveTabKey) => void;
  dialogOpen: boolean;
  edition: string;
  trackDownload: (opts: { unlockedFromStorage: boolean }) => void;
};

const Ctx = createContext<PeakGate | null>(null);

export function usePeakGate(): PeakGate {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePeakGate must be used inside <PeakProvider>");
  return ctx;
}

type Props = {
  edition: string;
  /** Site-relative PDF path from config, e.g. /reports/peak/itd-peak-report-2026.pdf */
  reportPath: string;
  copy: PeakDialogCopy;
  images: { cover: string; spread: string };
  stickyLabel: string;
  children: ReactNode;
};

const noopSubscribe = () => () => {};

export default function PeakProvider({
  edition,
  reportPath,
  copy,
  images,
  stickyLabel,
  children,
}: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [trigger, setTrigger] = useState<PeakTrigger>("hero");
  const [cardId, setCardId] = useState<string | undefined>(undefined);
  const [curveTab, setCurveTab] = useState<CurveTabKey>("all");
  const [apiReportUrl, setApiReportUrl] = useState<string | null>(null);

  // Campaign context captured once on page load (no useSearchParams — it would
  // force a Suspense boundary and bail this static page out to CSR).
  const utmsRef = useRef<PeakUtms>({});
  const pagePathRef = useRef("/peak");
  useEffect(() => {
    utmsRef.current = captureUtms();
    pagePathRef.current = window.location.pathname || "/peak";
  }, []);

  const unlocked = useSyncExternalStore(
    typeof window === "undefined" ? noopSubscribe : subscribeUnlocked,
    () => getUnlocked(edition),
    () => false,
  );

  const reportUrl = apiReportUrl ?? reportPath;

  const trackDownload = useCallback(
    ({ unlockedFromStorage }: { unlockedFromStorage: boolean }) => {
      track("peak_report_download", {
        report_edition: edition,
        unlocked_from_storage: unlockedFromStorage,
      });
    },
    [edition],
  );

  const open = useCallback(
    (t: PeakTrigger, extra?: { cardId?: string }) => {
      if (unlocked) {
        // Residual button that hasn't re-rendered as a link yet.
        trackDownload({ unlockedFromStorage: true });
        window.open(reportUrl, "_blank", "noopener");
        return;
      }
      setTrigger(t);
      setCardId(extra?.cardId);
      setDialogOpen(true);
      track("peak_form_open", { trigger: t, ...(extra?.cardId ? { card_id: extra.cardId } : {}) });
    },
    [unlocked, reportUrl, trackDownload],
  );

  const value = useMemo<PeakGate>(
    () => ({
      open,
      unlocked,
      reportUrl,
      curveTab,
      setCurveTab,
      dialogOpen,
      edition,
      trackDownload,
    }),
    [open, unlocked, reportUrl, curveTab, dialogOpen, edition, trackDownload],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <PeakReportDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        edition={edition}
        trigger={trigger}
        cardId={cardId}
        curveTab={curveTab}
        copy={copy}
        images={images}
        getContext={() => ({ utms: utmsRef.current, pagePath: pagePathRef.current })}
        onSuccess={setApiReportUrl}
        trackDownload={trackDownload}
      />
      <PeakStickyCta label={stickyLabel} />
    </Ctx.Provider>
  );
}
