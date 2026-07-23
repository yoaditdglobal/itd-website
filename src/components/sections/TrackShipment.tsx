"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import IntegrationLogo from "@/components/ui/IntegrationLogo";

interface TrackCarrier {
  name: string;
  logo: string;
  /** Public tracking URL — `{n}` is replaced with the tracking number. */
  url: string;
  /** Confident tracking-number pattern for auto-selecting the carrier. */
  pattern?: RegExp;
}

/* Public tracking endpoints, verified live. Auto-detect patterns are
   deliberately conservative — only formats unique to one carrier. */
const CARRIERS: TrackCarrier[] = [
  {
    name: "Royal Mail",
    logo: "/logos/carriers/royal-mail-icon.png",
    url: "https://www.royalmail.com/track-your-item#/tracking-results/{n}",
    pattern: /^[A-Z]{2}\d{9}GB$/i,
  },
  {
    name: "DPD",
    logo: "/logos/carriers/DPD-LOGO.png",
    url: "https://track.dpd.co.uk/search?reference={n}",
  },
  {
    name: "Evri",
    logo: "/logos/carriers/evri_logo.png",
    url: "https://www.evri.com/track/parcel/{n}/details",
  },
  {
    name: "InPost",
    logo: "/logos/carriers/inpost-icon.png",
    url: "https://inpost.co.uk/users/track-my-parcel/?number={n}",
  },
  {
    name: "DHL",
    logo: "/logos/carriers/dhl_logo.webp",
    url: "https://www.dhl.com/gb-en/home/tracking.html?tracking-id={n}",
    pattern: /^JJD\d+$/i,
  },
  {
    name: "Amazon Shipping",
    logo: "/logos/carriers/amazonshipping_logo.png",
    url: "https://track.amazon.co.uk/tracking/{n}",
    pattern: /^(TBA|A2Z)[A-Z0-9]+$/i,
  },
  {
    name: "FedEx",
    logo: "/logos/carriers/fedex-icon.png",
    url: "https://www.fedex.com/fedextrack/?trknbr={n}",
  },
  {
    name: "UPS",
    logo: "/logos/carriers/ups_logo.png",
    url: "https://www.ups.com/track?tracknum={n}",
    pattern: /^1Z[A-Z0-9]{16}$/i,
  },
  {
    name: "Parcelforce",
    logo: "/logos/carriers/parcel-force.svg",
    url: "https://www.parcelforce.com/track-trace?trackNumber={n}",
  },
];

/**
 * Carrier hand-off tracker: tracking number + carrier → opens the carrier's
 * own tracking page with the number prefilled (new tab). Confident number
 * formats (1Z… → UPS, …GB → Royal Mail, TBA… → Amazon) pre-select the
 * carrier; a manual pick always wins.
 */
export default function TrackShipment() {
  const [number, setNumber] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [manual, setManual] = useState(false);

  const onNumberChange = (value: string) => {
    setNumber(value);
    if (manual) return;
    const match = CARRIERS.find((c) => c.pattern?.test(value.trim()));
    setSelected(match ? match.name : null);
  };

  const carrier = CARRIERS.find((c) => c.name === selected);
  const ready = number.trim().length >= 6 && !!carrier;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready || !carrier) return;
    const url = carrier.url.replace("{n}", encodeURIComponent(number.trim()));
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm"
    >
      <label htmlFor="tracking-number" className="block text-label text-text-primary">
        Tracking number
      </label>
      <input
        id="tracking-number"
        type="text"
        inputMode="text"
        autoComplete="off"
        spellCheck={false}
        value={number}
        onChange={(e) => onNumberChange(e.target.value)}
        placeholder="e.g. AB123456789GB"
        className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-body-md text-text-primary placeholder:text-text-quaternary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
      />
      <p className="mt-2 text-caption text-text-tertiary">
        Copy it from your dispatch email or order page.
      </p>

      <fieldset className="mt-6">
        <legend className="text-label text-text-primary">Carrier</legend>
        <div
          role="radiogroup"
          aria-label="Carrier"
          className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5"
        >
          {CARRIERS.map((c) => {
            const active = selected === c.name;
            return (
              <button
                key={c.name}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => {
                  setSelected(c.name);
                  setManual(true);
                }}
                className={`flex min-h-[44px] flex-col items-center justify-center gap-1.5 rounded-xl border p-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  active
                    ? "border-accent bg-accent-light/50"
                    : "border-border bg-white hover:border-accent/40"
                }`}
              >
                <IntegrationLogo name={c.name} logo={c.logo} size="sm" />
                <span className="text-micro font-medium text-text-primary text-center leading-tight">
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={!ready}>
          Track shipment
          <ArrowUpRight className="w-4 h-4" aria-hidden />
        </Button>
        <p className="text-caption text-text-tertiary">
          Opens the carrier&apos;s tracking page in a new tab.
        </p>
      </div>
    </form>
  );
}
