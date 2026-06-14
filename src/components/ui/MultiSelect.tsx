"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Search } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  label?: string;
}

export default function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select...",
  label,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const removeTag = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selected.filter((v) => v !== value));
  };

  const selectedLabels = selected
    .map((v) => options.find((o) => o.value === v)?.label)
    .filter(Boolean);

  return (
    <div ref={ref} className="relative">
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-1.5">
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full min-h-[44px] flex items-center justify-between gap-2 bg-white border border-border rounded-lg px-3 py-2 text-left hover:border-border-strong transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <div className="flex-1 flex flex-wrap gap-1 min-w-0">
          {selected.length === 0 ? (
            <span className="text-body-sm text-text-tertiary">{placeholder}</span>
          ) : selected.length <= 3 ? (
            selectedLabels.map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1 bg-accent-light text-accent text-xs font-medium px-2 py-0.5 rounded-full"
              >
                {label}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-accent-dark"
                  onClick={(e) =>
                    removeTag(
                      options.find((o) => o.label === label)!.value,
                      e
                    )
                  }
                />
              </span>
            ))
          ) : (
            <span className="text-sm text-text-primary">
              {selected.length} countries selected
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-text-tertiary flex-shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-border rounded-lg shadow-xl max-h-[300px] flex flex-col">
          {/* Search */}
          <div className="p-2 border-b border-border flex items-center gap-2">
            <Search className="w-4 h-4 text-text-tertiary flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search countries..."
              className="w-full text-sm outline-none placeholder-text-tertiary"
              autoFocus
            />
          </div>

          {/* Options */}
          <div className="overflow-y-auto flex-1">
            {filtered.length === 0 ? (
              <div className="px-3 py-4 text-sm text-text-tertiary text-center">
                No countries found
              </div>
            ) : (
              filtered.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-bg-secondary cursor-pointer min-h-[44px]"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(option.value)}
                    onChange={() => toggle(option.value)}
                    className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                  />
                  <span className="text-sm text-text-primary">
                    {option.label}
                  </span>
                </label>
              ))
            )}
          </div>

          {/* Footer */}
          {selected.length > 0 && (
            <div className="p-2 border-t border-border flex justify-between items-center">
              <span className="text-xs text-text-tertiary">
                {selected.length} selected
              </span>
              <button
                type="button"
                onClick={() => onChange([])}
                className="text-xs text-accent hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
