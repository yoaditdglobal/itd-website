"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Route-level error boundary. Catches uncaught errors thrown while rendering a
 * page segment and shows a recoverable fallback *inside* the root layout, so a
 * single page crash (e.g. a WebGL/3rd-party failure) never blanks the shared
 * navigation or makes the whole site unusable.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface to the console for diagnosis in dev only; in production, forward
    // to a monitoring service here instead of logging raw error objects.
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <section className="bg-bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-eyebrow text-accent mb-3">Something went wrong</p>
        <h1 className="text-display-md text-text-primary">
          This page hit an unexpected error.
        </h1>
        <p className="mt-4 text-body-md text-text-secondary">
          The rest of the site is still working. Try again, or head back to the
          homepage.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-5 text-sm font-medium text-text-primary transition-colors hover:border-accent/30"
          >
            Go home
          </Link>
        </div>
      </div>
    </section>
  );
}
