"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface HelpSearchBarProps {
  placeholder?: string;
}

/**
 * Visual-only search input for /help and /help/centre.
 *
 * v1 behaviour: the input does not hit a search backend. Submitting routes
 * to /help/centre with the query string in the URL so the centre page can
 * render the query alongside the article list. Real Algolia or Fuse.js
 * integration is Phase 5d (see docs/drafts/help-ia.md).
 */
export default function HelpSearchBar({
  placeholder = "Search articles, integrations, carriers...",
}: HelpSearchBarProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) {
      window.location.href = "/help/centre";
      return;
    }
    window.location.href = `/help/centre?q=${encodeURIComponent(q)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary pointer-events-none" />
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          aria-label="Search the Help Centre"
          className="w-full min-h-[52px] bg-white border border-border rounded-xl pl-12 pr-32 py-3 text-base text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent shadow-sm"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors min-h-[40px]"
        >
          Search
        </button>
      </div>
    </form>
  );
}
