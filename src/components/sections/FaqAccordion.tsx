"use client";

import { useState, useId } from "react";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

/**
 * Animated, one-at-a-time FAQ accordion. Used by both VerticalPage and
 * FaqSection. CSS-only animation (no framer-motion): the panel collapses via
 * the grid-template-rows 0fr→1fr trick — `min-h-0` on the inner grid item is
 * required or it won't collapse. Collapsed answers are `invisible`, keeping
 * them out of the accessibility tree. Keyboard accessibility preserved via
 * aria-expanded / aria-controls on the trigger button.
 *
 * Visual styling matches the existing cards (rounded-xl, white background,
 * border, padding) so it drops into either section unchanged.
 */
export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `${baseId}-faq-panel-${i}`;
        const triggerId = `${baseId}-faq-trigger-${i}`;
        return (
          <div
            key={item.question}
            className="bg-white rounded-xl border border-border p-5"
          >
            <h3 className="text-heading-sm text-text-primary">
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex items-center justify-between gap-4 w-full text-left cursor-pointer"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden
                  className={`flex-shrink-0 inline-flex transition-transform duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "rotate-180" : ""}`}
                >
                  <ChevronDown className="w-5 h-5 text-text-secondary" />
                </span>
              </button>
            </h3>
            <div
              className={`grid transition-[grid-template-rows] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className={`overflow-hidden min-h-0 transition-[opacity] duration-[250ms] ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
              >
                <p className="mt-3 text-body-sm text-text-secondary whitespace-pre-line">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
