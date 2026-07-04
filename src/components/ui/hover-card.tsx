"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "@/lib/utils";

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

/**
 * Floating hover-card content, portaled to <body> with real collision
 * detection (measures the rendered card, flips top/bottom, shifts into frame)
 * — replaces hand-rolled getBoundingClientRect maths that could place cards
 * off-screen. collisionPadding.top keeps it clear of the fixed 72px navbar.
 * Enter/exit motion lives in globals.css under `.hover-card-content`
 * (data-state / data-side driven, reduced-motion aware).
 */
const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(
  (
    {
      className,
      align = "center",
      side = "bottom",
      sideOffset = 10,
      collisionPadding = { top: 84, left: 12, right: 12, bottom: 16 },
      children,
      ...props
    },
    ref,
  ) => (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        ref={ref}
        align={align}
        side={side}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn("hover-card-content z-[60] outline-none", className)}
        {...props}
      >
        {children}
        <HoverCardPrimitive.Arrow
          width={12}
          height={6}
          className="fill-white drop-shadow-[0_1px_1px_rgba(26,26,31,0.12)]"
        />
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  ),
);
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
