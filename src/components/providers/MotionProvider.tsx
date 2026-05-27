"use client";

import { MotionConfig } from "framer-motion";

/**
 * Wraps the app in a Framer Motion MotionConfig with reducedMotion="user"
 * so prefers-reduced-motion users get motion-free transitions (height/opacity
 * fades stay, transforms are skipped) without each motion component needing
 * to opt in individually. Pair with the global .link-underline css transition
 * which already lives behind the @media (prefers-reduced-motion: reduce) block.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  );
}
