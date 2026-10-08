"use client";

import { useEffect, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import Image from "next/image";
import { X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { track } from "@/lib/analytics";
import PeakReportForm, { emptyValues, type FormState } from "./PeakReportForm";
import type { CurveTabKey, PeakDialogCopy, PeakTrigger, PeakUtms } from "./peak-types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  edition: string;
  trigger: PeakTrigger;
  cardId?: string;
  curveTab: CurveTabKey;
  copy: PeakDialogCopy;
  images: { cover: string; spread: string };
  getContext: () => { utms: PeakUtms; pagePath: string };
  onSuccess: (reportUrl: string) => void;
  trackDownload: (opts: { unlockedFromStorage: boolean }) => void;
  /** The element that opened the dialog — focus returns there on close
   *  (Safari doesn't focus buttons on click, so Radix's default can miss). */
  getOpener: () => HTMLElement | null;
};

/**
 * The gate. Composed from the shadcn/Radix bridge (Root/Portal/Overlay/Title/
 * Description/Close) but renders DialogPrimitive.Content directly: the bridge's
 * DialogContent hard-wires a max-w-lg single column and its own close button,
 * and its enter/exit utility classes are dead (no tw-animate-css), so the
 * sheet/modal animation lives in peak.css keyed on [data-state].
 *
 * Form state is held HERE (not in the form) because Radix unmounts the content
 * on close — values survive a close/reopen.
 */
export default function PeakReportDialog({
  open,
  onOpenChange,
  edition,
  trigger,
  cardId,
  curveTab,
  copy,
  images,
  getContext,
  onSuccess,
  trackDownload,
  getOpener,
}: Props) {
  const [form, setForm] = useState<FormState>(() => emptyValues());
  const headingRef = useRef<HTMLHeadingElement>(null);
  const startedRef = useRef(false);

  // `peak_form_start` fires once per open.
  useEffect(() => {
    if (open) startedRef.current = false;
  }, [open]);
  const onFirstInteraction = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track("peak_form_start", { trigger });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="peak-dialog__overlay" />
        <DialogPrimitive.Content
          className="peak-tokens peak-dialog"
          data-analytics-location="peak_form"
          onOpenAutoFocus={(e) => {
            // Land on the title, not the first input (no keyboard pop on mobile).
            e.preventDefault();
            headingRef.current?.focus();
          }}
          onCloseAutoFocus={(e) => {
            const opener = getOpener();
            if (opener && opener.isConnected) {
              e.preventDefault();
              opener.focus();
            }
          }}
        >
          <aside className="peak-dialog__visual" aria-hidden>
            {/* Takeaways spread — ALWAYS blurred; signals depth, never content. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images.spread} alt="" className="peak-dialog__spread" loading="lazy" />
            <div className="peak-dialog__veil" />
            <div className="peak-dialog__cover">
              <Image
                src={images.cover}
                alt=""
                width={360}
                height={255}
                quality={90}
                sizes="360px"
                className="peak-dialog__cover-img"
              />
            </div>
            <div className="peak-dialog__inside">
              <p className="text-eyebrow peak-dialog__inside-eyebrow">{copy.insideHeading}</p>
              <ul className="peak-dialog__inside-list">
                {copy.inside.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="peak-dialog__body">
            <DialogTitle
              ref={headingRef}
              tabIndex={-1}
              className="peak-dialog__title text-display-md"
            >
              {form.status === "success" ? copy.successTitle : copy.title}
            </DialogTitle>
            <DialogDescription className="peak-dialog__sub text-body-md">
              {form.status === "success" ? copy.successLine : copy.sub}
            </DialogDescription>

            <PeakReportForm
              state={form}
              setState={setForm}
              edition={edition}
              trigger={trigger}
              cardId={cardId}
              curveTab={curveTab}
              copy={copy}
              getContext={getContext}
              onFirstInteraction={onFirstInteraction}
              onSuccess={onSuccess}
              trackDownload={trackDownload}
            />
          </div>

          <DialogClose className="peak-dialog__close" aria-label="Close">
            <X aria-hidden />
          </DialogClose>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
