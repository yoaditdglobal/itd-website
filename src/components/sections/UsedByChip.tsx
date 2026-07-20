"use client";

import Link from "next/link";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import CaseStudyHoverCard, {
  type CaseStudyPreview,
} from "./CaseStudyHoverCard";

/**
 * A "Used by" customer logo. The tile itself is a link to the case study (so
 * touch + keyboard reach the story directly). On hover-capable devices,
 * hovering or focusing also opens a floating case-study preview — a Radix
 * HoverCard, which measures the real card and collision-shifts/flips it so it
 * can never render out of frame (the old hand-rolled coords could push it past
 * the viewport top under the navbar). Radix also tracks the chip while the
 * pinned pager scrolls, skips opening on touch, and closes on Escape/blur.
 */
export default function UsedByChip({ cs }: { cs: CaseStudyPreview }) {
  return (
    <HoverCard openDelay={80} closeDelay={120}>
      <HoverCardTrigger asChild>
        <Link
          href={`/resources/case-studies/${cs.slug}`}
          aria-label={`${cs.brandName} — read case study`}
          className="group inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-md border border-border bg-white transition-[border-color,box-shadow] duration-150 hover:border-accent/40 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          {/* Scale the logo inside the fixed-size tile so the trigger's rect
              (the hover-card anchor) never moves — no card jitter. The logo
              fills the tile edge-to-edge (no padding ring); wide wordmarks
              stay object-contain so they letterbox instead of cropping. */}
          <span className="flex h-full w-full items-center justify-center transition-transform duration-150 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
            <IntegrationLogo name={cs.brandName} logo={cs.logo} size="fill" />
          </span>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent>
        <CaseStudyHoverCard cs={cs} />
      </HoverCardContent>
    </HoverCard>
  );
}
