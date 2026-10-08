"use client";

import { useRef, useState } from "react";
import { RotateCw, RotateCcw } from "lucide-react";
import { track } from "@/lib/analytics";
import PeakDownloadButton from "./PeakDownloadButton";

export type FlipCard = { id: string; front: string; back: string };

type Props = {
  cards: readonly FlipCard[];
  backEyebrow: string;
  backLink: string;
};

/**
 * Three question cards. The front face IS the flip button (so there is no
 * interactive element nested inside another); the back carries the half
 * answer, the "Get the report" gate and a flip-back control. The hidden face
 * is `inert` so it leaves the tab order. 3D flip in peak.css; reduced motion
 * crossfades instead. Fixed height so flipping never shifts layout. Mobile:
 * horizontal snap row; lg+: 3-up grid.
 */
export default function PeakFlipCards({ cards, backEyebrow, backLink }: Props) {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const backRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const frontRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const flip = (id: string, to: boolean) => {
    setFlipped((f) => ({ ...f, [id]: to }));
    if (to) track("peak_card_flip", { card_id: id });
    // Keep keyboard focus on the visible face.
    window.setTimeout(() => {
      (to ? backRefs.current[id] : frontRefs.current[id])?.focus();
    }, 60);
  };

  return (
    <ul className="peak-flip-track" aria-label="Three questions to answer before peak">
      {cards.map((card) => {
        const isBack = Boolean(flipped[card.id]);
        return (
          <li key={card.id} className="peak-flip" data-flipped={isBack ? "true" : "false"}>
            <div className="peak-flip__inner">
              <button
                ref={(el) => {
                  frontRefs.current[card.id] = el;
                }}
                type="button"
                className="peak-flip__face peak-flip__front"
                aria-pressed={isBack}
                onClick={() => flip(card.id, true)}
                inert={isBack || undefined}
              >
                <span className="text-heading-lg peak-flip__q">{card.front}</span>
                <span className="peak-flip__hint text-eyebrow">
                  <RotateCw aria-hidden /> Reveal
                </span>
              </button>
              <div
                ref={(el) => {
                  backRefs.current[card.id] = el;
                }}
                className="peak-flip__face peak-flip__back"
                tabIndex={-1}
                inert={!isBack || undefined}
              >
                <p className="text-eyebrow peak-flip__eyebrow">{backEyebrow}</p>
                <p className="text-body-md peak-flip__a">{card.back}</p>
                <div className="peak-flip__actions">
                  <PeakDownloadButton trigger="flip_card" cardId={card.id} variant="inline">
                    {backLink}
                  </PeakDownloadButton>
                  <button
                    type="button"
                    className="peak-flip__undo"
                    onClick={() => flip(card.id, false)}
                    aria-label="Back to the question"
                  >
                    <RotateCcw aria-hidden />
                  </button>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
