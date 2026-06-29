"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import type { Category, Entry } from "@/lib/glossary";

type CategoryMeta = { key: Category; label: string; description: string };

type Filter = "All" | Category;

export default function GlossaryIndex({
  entries,
  categories,
}: {
  entries: Entry[];
  categories: CategoryMeta[];
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Filter>("All");
  // Slug to scroll to once the (re-rendered, unfiltered) list has committed.
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);

  // Deep-link + cross-link robustness: when the URL points at a specific term
  // (#slug), clear any active filter so the target is rendered, then queue a
  // scroll to it. Runs on mount and on every hash change (e.g. a Related chip).
  useEffect(() => {
    const revealHash = () => {
      const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (!id || !entries.some((e) => e.slug === id)) return;
      setQuery("");
      setActiveCategory("All");
      setPendingScroll(id);
    };
    revealHash();
    window.addEventListener("hashchange", revealHash);
    return () => window.removeEventListener("hashchange", revealHash);
  }, [entries]);

  // Scroll after the filter reset has committed to the DOM, so the target is
  // present and laid out (a bare rAF in the handler fires before React commits
  // the re-rendered list and lands on a stale position). Instant, to avoid a
  // smooth animation racing the layout.
  useEffect(() => {
    if (!pendingScroll) return;
    const el = document.getElementById(pendingScroll);
    if (el) {
      // "instant" (not "auto", which inherits scroll-behavior: smooth) — a
      // smooth animation here gets cancelled by hydration/layout settling and
      // never reaches the target.
      requestAnimationFrame(() =>
        el.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" }),
      );
    }
    setPendingScroll(null);
  }, [pendingScroll]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => {
      if (activeCategory !== "All" && e.category !== activeCategory) return false;
      if (!q) return true;
      return (
        e.name.toLowerCase().includes(q) ||
        (e.code?.toLowerCase().includes(q) ?? false) ||
        e.definition.toLowerCase().includes(q) ||
        e.context.toLowerCase().includes(q)
      );
    });
  }, [entries, query, activeCategory]);

  const total = filtered.length;

  return (
    <>
      {/* Search + category filter toolbar */}
      <section className="bg-white py-6 sticky top-[72px] z-30 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search terms, acronyms, definitions…"
              aria-label="Search the glossary"
              className="w-full rounded-full border border-border bg-bg-secondary py-3 pl-11 pr-4 text-body-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/30"
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {(["All", ...categories.map((c) => c.key)] as Filter[]).map((key) => {
              const isActive = activeCategory === key;
              const count =
                key === "All"
                  ? entries.length
                  : entries.filter((e) => e.category === key).length;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveCategory(key)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent text-white border-accent"
                      : "bg-bg-secondary border-border text-text-primary hover:bg-accent-light hover:text-accent hover:border-accent/20"
                  }`}
                >
                  {key}
                  <span
                    className={`text-xs ${isActive ? "text-white/70" : "text-text-tertiary"}`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-center text-caption text-text-tertiary" aria-live="polite">
            {total} {total === 1 ? "term" : "terms"}
            {query.trim() ? ` matching “${query.trim()}”` : ""}
          </p>
        </div>
      </section>

      {/* Filtered entries by category */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {total === 0 ? (
            <div className="text-center py-16">
              <p className="text-heading-md text-text-primary mb-2">No matches</p>
              <p className="text-body-md text-text-secondary">
                No terms match{" "}
                <span className="font-medium text-text-primary">“{query.trim()}”</span>
                {activeCategory !== "All" ? ` in ${activeCategory}` : ""}. Try a
                different word or clear the filter.
              </p>
            </div>
          ) : (
            categories.map((c) => {
              const items = filtered.filter((e) => e.category === c.key);
              if (items.length === 0) return null;
              return (
                <div key={c.key} className="scroll-mt-32 mb-16 last:mb-0">
                  <div className="mb-8 pb-4 border-b border-border">
                    <p className="text-eyebrow text-accent mb-2">
                      {items.length} {items.length === 1 ? "entry" : "entries"}
                    </p>
                    <h2 className="text-display-lg text-text-primary">{c.label} terms</h2>
                    <p className="mt-2 text-text-secondary">{c.description}</p>
                  </div>
                  <div className="space-y-8">
                    {items.map((entry) => (
                      <article
                        key={entry.slug}
                        id={entry.slug}
                        className="card-hover scroll-mt-[240px] bg-bg-secondary rounded-xl border border-border p-6"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-block px-2 py-0.5 rounded-full bg-white border border-border text-eyebrow text-text-secondary">
                            {entry.category}
                          </span>
                          {entry.code && (
                            <span className="inline-block px-2 py-0.5 rounded-full bg-accent-light text-accent text-eyebrow">
                              {entry.code}
                            </span>
                          )}
                        </div>
                        <h3 className="text-heading-md text-text-primary mb-3">
                          <a href={`#${entry.slug}`} className="hover:text-accent">
                            {entry.name}
                          </a>
                        </h3>
                        <p className="text-body-sm text-text-primary mb-3">
                          <span className="font-medium">Definition. </span>
                          {entry.definition}
                        </p>
                        <p className="text-body-sm text-text-secondary mb-4">
                          {entry.context}
                        </p>
                        {entry.related.length > 0 && (
                          <div className="pt-3 border-t border-border">
                            <p className="text-eyebrow text-text-tertiary mb-2">Related</p>
                            <div className="flex flex-wrap gap-2">
                              {entry.related.map((r) => {
                                const isInternal = r.href.startsWith("/");
                                if (isInternal) {
                                  return (
                                    <Link
                                      key={r.label}
                                      href={r.href}
                                      className="link-underline gap-1 text-xs text-accent"
                                    >
                                      {r.label}
                                      <ArrowRight className="w-3 h-3" />
                                    </Link>
                                  );
                                }
                                return (
                                  <a
                                    key={r.label}
                                    href={r.href}
                                    className="link-underline text-xs text-accent"
                                  >
                                    {r.label}
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </>
  );
}
