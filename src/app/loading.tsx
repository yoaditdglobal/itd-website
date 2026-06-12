/**
 * Root route loading UI. All routes are static and prefetched, so this rarely
 * appears — it is the slow-network safety net so navigation always gives
 * instant feedback instead of a blank wait. Renders inside the root layout,
 * so the navbar and footer stay visible and interactive while the page
 * segment streams.
 */
export default function Loading() {
  return (
    <section
      aria-label="Loading page"
      className="flex min-h-[60vh] items-center justify-center"
    >
      <div className="flex flex-col items-center gap-4">
        <span
          aria-hidden
          className="h-9 w-9 animate-spin rounded-full border-2 border-accent/25 border-t-accent"
        />
        <span className="text-caption text-text-tertiary">Loading…</span>
      </div>
    </section>
  );
}
