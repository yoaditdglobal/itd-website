"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

interface DemoOption {
  id: string;
  label: string;
  eta: string;
  price: string;
  carrier: string;
  logo: string;
  lane: string;
}

/* Illustrative mockup content — prices/ETAs are demo UI, not published rates. */
const OPTIONS: DemoOption[] = [
  {
    id: "next-day",
    label: "Next day",
    eta: "Arrives tomorrow",
    price: "£4.99",
    carrier: "DPD",
    logo: "/logos/carriers/DPD-LOGO.png",
    lane: "best next-day performance on this lane",
  },
  {
    id: "standard",
    label: "Standard",
    eta: "Arrives in 2–3 days",
    price: "£2.99",
    carrier: "Evri",
    logo: "/logos/carriers/evri_logo.png",
    lane: "best value on this lane",
  },
  {
    id: "pickup",
    label: "Pickup point",
    eta: "Next day · held 7 days",
    price: "£1.99",
    carrier: "InPost",
    logo: "/logos/carriers/inpost-icon.png",
    lane: "locker 2 minutes from the door",
  },
];

/**
 * Interactive checkout mockup for the Brands hero: the shopper picks the
 * delivery promise, the routing strip shows the carrier ITD picks to keep it.
 * CSS transitions only; radiogroup semantics; 44px touch targets.
 */
export default function CheckoutChoiceDemo() {
  const [selected, setSelected] = useState(OPTIONS[0].id);
  const active = OPTIONS.find((o) => o.id === selected) ?? OPTIONS[0];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Mock storefront chrome */}
        <div className="flex items-center gap-1.5 px-5 py-3 border-b border-border bg-bg-secondary">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden />
          <span className="ml-3 text-caption text-text-tertiary">
            yourstore.co.uk — checkout
          </span>
        </div>

        <div className="p-5">
          <p className="text-label text-text-primary">Delivery</p>
          <div role="radiogroup" aria-label="Delivery option" className="mt-3 space-y-2">
            {OPTIONS.map((o) => {
              const isActive = o.id === selected;
              return (
                <button
                  key={o.id}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setSelected(o.id)}
                  className={`flex w-full min-h-[44px] items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive
                      ? "border-accent bg-accent-light/40"
                      : "border-border bg-white hover:border-accent/40"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border transition-colors motion-reduce:transition-none ${
                      isActive ? "border-accent bg-accent" : "border-border-strong bg-white"
                    }`}
                  >
                    {isActive && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-body-sm font-medium text-text-primary">
                      {o.label}
                    </span>
                    <span className="block text-caption text-text-tertiary">{o.eta}</span>
                  </span>
                  <span className="text-body-sm font-semibold text-text-primary">
                    {o.price}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Routing strip — swaps with the selection */}
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-bg-dark px-4 py-3">
            <span className="relative h-7 w-7 flex-shrink-0 overflow-hidden rounded-md bg-white">
              <Image
                key={active.carrier}
                src={active.logo}
                alt={`${active.carrier} logo`}
                fill
                sizes="28px"
                quality={90}
                className="object-contain p-0.5"
              />
            </span>
            <p className="text-caption text-white/80 leading-snug">
              Routed by ITD to{" "}
              <span className="font-semibold text-white">{active.carrier}</span> —{" "}
              {active.lane}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-caption text-white/60">
        Your customer picks the promise. We pick the carrier that keeps it.
      </p>
    </div>
  );
}
