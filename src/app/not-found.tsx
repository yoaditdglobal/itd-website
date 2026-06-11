import Link from "next/link";

/**
 * Branded 404 for any unmatched URL (including dynamic [slug] routes with
 * dynamicParams=false). Renders inside the root layout so navigation and
 * footer keep working — mirrors the structure of error.tsx.
 */
export default function NotFound() {
  return (
    <section className="bg-bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-eyebrow text-accent mb-3">404</p>
        <h1 className="text-display-md text-text-primary">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-4 text-body-md text-text-secondary">
          The link may be out of date or the page may have moved. The rest of
          the site is working.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            Go home
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-5 text-sm font-medium text-text-primary transition-colors hover:border-accent/30"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
}
