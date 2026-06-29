"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { ClaimDetail, ClaimsPolicy } from "@/lib/help-claims";
import { CLAIMS_FOOTNOTES } from "@/lib/help-claims";

function ClaimColumn({
  label,
  detail,
  carrier,
}: {
  label: "Loss" | "Damage";
  detail: ClaimDetail;
  carrier: string;
}) {
  const isLoss = label === "Loss";
  return (
    <div className="flex-1">
      <p
        className={`text-eyebrow mb-3 ${isLoss ? "text-accent" : "text-text-secondary"}`}
      >
        {label}
      </p>
      {!detail.allowed ? (
        <p className="text-body-sm text-text-tertiary">
          Not available — no {label.toLowerCase()} claims on {carrier} services.
        </p>
      ) : (
        <dl className="space-y-3">
          <div>
            <dt className="text-caption text-text-tertiary">Claim window</dt>
            <dd className="text-body-sm text-text-primary font-medium">
              {detail.countdownDays} days
              {detail.countdownFrom ? (
                <span className="font-normal text-text-secondary">
                  {" "}
                  from {detail.countdownFrom}
                </span>
              ) : null}
            </dd>
          </div>
          <div>
            <dt className="text-caption text-text-tertiary">Max claim value</dt>
            <dd className="text-body-sm text-text-primary font-medium">
              {detail.maxValue}
            </dd>
          </div>
          {detail.requirements && detail.requirements.length > 0 && (
            <div>
              <dt className="text-caption text-text-tertiary mb-1">What to send</dt>
              <dd>
                <ul className="space-y-1.5">
                  {detail.requirements.map((req) => (
                    <li
                      key={req}
                      className="text-body-sm text-text-secondary flex gap-2"
                    >
                      <span aria-hidden className="text-accent mt-0.5">
                        •
                      </span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>
      )}
    </div>
  );
}

export default function ClaimsIndex({ policies }: { policies: ClaimsPolicy[] }) {
  const [query, setQuery] = useState("");
  // Slug to scroll to once the (re-rendered, unfiltered) list has committed.
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);

  // Deep-link + cross-link robustness: when the URL points at a carrier
  // (#dhl), clear any active filter so the target is rendered, then queue a
  // scroll to it. Runs on mount and on every hash change (e.g. a typeahead
  // result selected while already on this page).
  useEffect(() => {
    const revealHash = () => {
      const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (!id || !policies.some((p) => p.slug === id)) return;
      setQuery("");
      setPendingScroll(id);
    };
    revealHash();
    window.addEventListener("hashchange", revealHash);
    return () => window.removeEventListener("hashchange", revealHash);
  }, [policies]);

  // Scroll after the filter reset has committed to the DOM. Instant, and
  // re-asserted across the page-enter animation (240ms) + Next's own
  // post-navigation scroll handling, which otherwise race this and reset to
  // top. pendingScroll is cleared only on the last pass.
  useEffect(() => {
    if (!pendingScroll) return;
    const id = pendingScroll;
    const jump = () => {
      const el = document.getElementById(id);
      if (!el) return;
      const toolbar = document.getElementById("claims-toolbar");
      const offset = 72 + (toolbar?.offsetHeight ?? 0) + 16;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "instant" as ScrollBehavior });
    };
    const raf = requestAnimationFrame(jump);
    const t1 = setTimeout(jump, 140);
    const t2 = setTimeout(() => {
      jump();
      setPendingScroll(null);
    }, 360);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pendingScroll]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return policies;
    const terms = q.split(/\s+/).filter(Boolean);
    return policies.filter((p) => {
      const hay = [p.carrier.toLowerCase(), ...p.aliases].join(" ");
      return hay.includes(q) || terms.every((t) => hay.includes(t));
    });
  }, [policies, query]);

  const total = filtered.length;

  return (
    <>
      {/* Search toolbar */}
      <section
        id="claims-toolbar"
        className="bg-white py-6 sticky top-[72px] z-30 border-b border-border"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by carrier — DHL, Evri, Royal Mail…"
              aria-label="Filter claims policies by carrier"
              className="w-full rounded-full border border-border bg-bg-secondary py-3 pl-11 pr-4 text-body-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/30"
            />
          </div>
          <p
            className="mt-3 text-center text-caption text-text-tertiary"
            aria-live="polite"
          >
            {total} {total === 1 ? "carrier" : "carriers"}
            {query.trim() ? ` matching “${query.trim()}”` : ""}
          </p>
        </div>
      </section>

      {/* Per-carrier claims policies */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {total === 0 ? (
            <div className="text-center py-16">
              <p className="text-heading-md text-text-primary mb-2">No matches</p>
              <p className="text-body-md text-text-secondary">
                No carrier matches{" "}
                <span className="font-medium text-text-primary">
                  “{query.trim()}”
                </span>
                . Try a different name or clear the filter.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filtered.map((p) => (
                <article
                  key={p.slug}
                  id={p.slug}
                  className="card-hover scroll-mt-[240px] bg-bg-secondary rounded-xl border border-border p-6 md:p-8"
                >
                  <h2 className="text-heading-lg text-text-primary mb-5">
                    <a href={`#${p.slug}`} className="hover:text-accent">
                      {p.carrier}
                    </a>
                  </h2>
                  <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                    <ClaimColumn label="Loss" detail={p.loss} carrier={p.carrier} />
                    <div
                      aria-hidden
                      className="hidden md:block w-px bg-border self-stretch"
                    />
                    <ClaimColumn
                      label="Damage"
                      detail={p.damage}
                      carrier={p.carrier}
                    />
                  </div>
                  <div className="mt-5 pt-4 border-t border-border flex flex-wrap items-center gap-x-6 gap-y-2">
                    <p className="text-caption text-text-tertiary">
                      Submission → result:{" "}
                      <span className="text-text-primary font-medium">
                        {p.submissionToResultDays} days
                      </span>
                    </p>
                    {p.notes.map((note) => (
                      <p key={note} className="text-caption text-text-tertiary">
                        {note}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Footnotes */}
          <div className="mt-10 max-w-2xl space-y-1">
            {CLAIMS_FOOTNOTES.map((fn) => (
              <p key={fn} className="text-caption text-text-tertiary">
                {fn}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
