"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import Button from "@/components/ui/Button";

/* ShipsGo Live Map iframe. ShipsGo only serves it to registered website
   origins (itdglobal.com is registered) — on localhost or a Netlify deploy
   preview it renders ShipsGo's own "iFrame Not Allowed" page instead. */
const SHIPSGO_ORIGIN = "https://shipsgo.com";
const SHIPSGO_MAP_URL = `${SHIPSGO_ORIGIN}/iframe/where-is-my-container/`;

/* Container numbers (ABCD1234567), bills of lading and booking references:
   letters, digits and hyphens only. Anything else is rejected before it can
   reach the iframe URL. */
const REFERENCE_PATTERN = /^[A-Z0-9-]{4,35}$/;

function normalise(value: string | null | undefined): string {
  // Containers are often written with spaces ("TGBU 123456 7") — drop them.
  return (value ?? "").replace(/\s+/g, "").toUpperCase();
}

function isValidReference(value: string): boolean {
  return REFERENCE_PATTERN.test(value);
}

/**
 * Freight (container / sea / air) tracking via the ShipsGo Live Map.
 * Reads the reference from `?query=` — the parameter the ShipsGo status
 * emails' "Go Live Position" link uses — and keeps the URL in sync when the
 * customer searches again, either in our form or inside the ShipsGo map.
 */
export default function FreightTracker() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queried = normalise(searchParams.get("query"));
  const hasQuery = queried.length > 0;
  const valid = hasQuery && isValidReference(queried);

  const [input, setInput] = useState(queried);
  const [error, setError] = useState<string | null>(null);
  // ShipsGo only returns ITD's shipments when the map is framed from
  // itdglobal.com; localhost and deploy previews always show "no results".
  const [offSite, setOffSite] = useState(false);

  useEffect(() => {
    setOffSite(!/(^|\.)itdglobal\.com$/.test(window.location.hostname));
  }, []);

  // Keep the field in step with back/forward navigation.
  useEffect(() => {
    setInput(queried);
  }, [queried]);

  const show = (reference: string) => {
    router.replace(`${pathname}?query=${encodeURIComponent(reference)}`, { scroll: false });
  };

  // ShipsGo's map has its own search box. It posts
  // { Action: "LoadNewContainerCode", Parameters: { ContainerCode } } to this
  // page and expects us to reload the iframe with the new code.
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== SHIPSGO_ORIGIN) return;
      const data: unknown = event.data;
      if (typeof data !== "object" || data === null) return;
      const { Action, Parameters } = data as { Action?: unknown; Parameters?: unknown };
      if (Action !== "LoadNewContainerCode") return;
      if (typeof Parameters !== "object" || Parameters === null) return;
      const code = normalise(String((Parameters as { ContainerCode?: unknown }).ContainerCode ?? ""));
      if (isValidReference(code)) show(code);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
    // `show` only depends on router + pathname, which are stable here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reference = normalise(input);
    if (!isValidReference(reference)) {
      setError("Enter a container number, bill of lading or booking reference (letters, numbers and hyphens only).");
      return;
    }
    setError(null);
    show(reference);
  };

  const fieldError = error ?? (hasQuery && !valid ? "That tracking reference doesn't look right. Check it against your status email and try again." : null);

  return (
    <div className="space-y-8">
      <form
        onSubmit={onSubmit}
        noValidate
        className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm"
      >
        <label htmlFor="freight-reference" className="block text-label text-text-primary">
          Container number or bill of lading
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <input
            id="freight-reference"
            type="text"
            inputMode="text"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. MSCU1234567"
            aria-invalid={!!fieldError}
            aria-describedby={fieldError ? "freight-reference-error" : undefined}
            className="w-full rounded-lg border border-border bg-white px-4 py-3 text-body-md text-text-primary placeholder:text-text-quaternary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
          />
          <Button type="submit" size="lg" className="shrink-0">
            <Search className="w-4 h-4" aria-hidden />
            Track
          </Button>
        </div>
        {fieldError && (
          <p id="freight-reference-error" role="alert" className="mt-3 text-body-sm text-danger">
            {fieldError}
          </p>
        )}
      </form>

      {valid && offSite && (
        <p className="rounded-lg border border-border bg-white px-4 py-3 text-body-sm text-text-secondary">
          Test copy of the site: ShipsGo only shows live results on itdglobal.com,
          so this map will say it can&apos;t find the shipment.
        </p>
      )}

      {valid && (
        <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
          <iframe
            key={queried}
            id="IframeShipsgoLiveMap"
            title={`Live position for ${queried}`}
            src={`${SHIPSGO_MAP_URL}${encodeURIComponent(queried)}`}
            loading="lazy"
            className="block h-[620px] w-full md:h-[680px]"
          />
        </div>
      )}
    </div>
  );
}
