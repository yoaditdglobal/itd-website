<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Working in this repo

## Supabase-backed reads must degrade gracefully
`src/lib/supabase.ts` falls back to a placeholder host when `NEXT_PUBLIC_SUPABASE_URL` is unset (local dev, deploy previews), so **every** query then fails. Any hook or route that reads Supabase must:
- short-circuit to a static fallback when `process.env.NEXT_PUBLIC_SUPABASE_URL` is absent;
- wrap the query in `try/catch` and fall back on error/empty;
- **not** `console.error` on that expected-failure path — it floods the console.

Reference: `src/components/rate-checker/useCourierServices.ts` — `useCouriers` / `useCourierServices` are the pattern; `useCourierServicesWithLimits` / `useServiceLimits` / `useSavingsRule` were aligned to it in #89.

## `globals.css` heading clamps override Tailwind text utilities
`globals.css` sets fluid `font-size: clamp(...)` on `h1`/`h2`/`h3`, which **wins over** Tailwind text classes — `<h3 className="text-sm">` still renders ~28px. Reserve `h1`/`h2`/`h3` for real section headings; use `<p>` or `<span>` for card labels, grid-item names, and other non-heading text.
