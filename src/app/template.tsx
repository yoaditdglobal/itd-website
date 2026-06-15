// Per-navigation entrance. A `template.tsx` remounts on every route change
// (unlike `layout.tsx`, which persists), so wrapping children here re-runs the
// `page-enter` CSS animation on each navigation — a subtle fade + rise. This
// gives page transitions without the View Transitions API (reverted; see
// next.config.ts) or framer-motion (kept carriers-only). The animation is
// transform/opacity only and disabled under prefers-reduced-motion (globals.css).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
