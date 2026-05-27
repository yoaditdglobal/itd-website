"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
 * FaqSection. Replaces the native <details> implementation so we can animate
 * the panel height and the chevron rotation. Preserves keyboard accessibility
 * via aria-expanded / aria-controls on the trigger button.
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
                <motion.span
                  className="flex-shrink-0 inline-flex"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  aria-hidden
                >
                  <ChevronDown className="w-5 h-5 text-text-secondary" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="mt-3 text-body-sm text-text-secondary whitespace-pre-line">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
