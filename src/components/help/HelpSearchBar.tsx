"use client";

import { useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { searchHelp } from "@/lib/help-search";

interface HelpSearchBarProps {
  placeholder?: string;
}

/**
 * Live typeahead search for /help and /help/centre. As the user types we rank
 * the static help index (existing articles + one entry per carrier Claims
 * policy) client-side and show the top matches in a dropdown. A carrier query
 * ("dhl claim", "evri damage") floats that carrier's Claims policy to the top
 * and navigates straight to its section on the Claims hub via the URL hash.
 */
export default function HelpSearchBar({
  placeholder = "Search articles, carriers, claims...",
}: HelpSearchBarProps) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const listboxId = useId();

  const results = useMemo(() => searchHelp(value, 6), [value]);
  const showPanel = open && value.trim().length > 0;

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      const target = results[active] ?? results[0];
      if (target) {
        e.preventDefault();
        go(target.href);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary pointer-events-none" />
        <input
          type="search"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            showPanel && results[active] ? `${listboxId}-opt-${active}` : undefined
          }
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            // Delay so a click on an option registers before the panel closes.
            blurTimer.current = setTimeout(() => setOpen(false), 120);
          }}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label="Search the Help Centre"
          className="w-full min-h-[52px] bg-white border border-border rounded-xl pl-12 pr-4 py-3 text-base text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent shadow-sm"
        />
      </div>

      {showPanel && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-40 mt-2 w-full overflow-hidden rounded-xl border border-border bg-white shadow-lg text-left"
        >
          {results.length === 0 ? (
            <li className="px-4 py-4 text-body-sm text-text-secondary">
              No matches for{" "}
              <span className="font-medium text-text-primary">
                “{value.trim()}”
              </span>
              . Try a carrier name, or{" "}
              <a href="/help/submit-request" className="text-accent underline">
                submit a request
              </a>
              .
            </li>
          ) : (
            results.map((r, i) => (
              <li key={r.href + r.title} role="option" aria-selected={i === active}>
                <button
                  type="button"
                  id={`${listboxId}-opt-${i}`}
                  // onMouseDown (before input blur) so the click isn't lost.
                  onMouseDown={(e) => {
                    e.preventDefault();
                    if (blurTimer.current) clearTimeout(blurTimer.current);
                    go(r.href);
                  }}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors ${
                    i === active ? "bg-accent-light" : "bg-white hover:bg-bg-secondary"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-body-sm font-medium text-text-primary truncate">
                      {r.title}
                    </p>
                    <p className="text-caption text-text-tertiary truncate">
                      {r.summary}
                    </p>
                  </div>
                  <span className="flex-shrink-0 mt-0.5 text-eyebrow text-accent">
                    {r.categoryLabel}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
