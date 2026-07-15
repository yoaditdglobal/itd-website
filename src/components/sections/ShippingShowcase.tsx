"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export interface ShowcaseCard {
  icon: ReactNode;
  title: string;
  body: string;
  audiences: string[];
  href: string;
  image: { src: string; alt: string };
}

/**
 * Immersive expanding-panels stage for the homepage shipping modes.
 *
 * Desktop (lg+): the three modes render as full-bleed photo panels inside one
 * large rounded stage. The active panel (hover / keyboard focus; first by
 * default) grows while the others compress — flex-grow is the one deliberate
 * layout animation here (three panels, below the fold) and is disabled under
 * reduced motion. Copy sits overlaid on a dark scrim; the body/chips/CTA
 * reveal uses the FaqAccordion grid-rows trick plus an opacity fade.
 *
 * Below lg: stacked full-width overlay cards, everything visible, tap
 * navigates — no horizontal scrolling and no hover dependence on touch.
 */
export default function ShippingShowcase({ cards }: { cards: ShowcaseCard[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Desktop — expanding panels */}
      <div className="hidden lg:flex h-[68vh] min-h-[540px] max-h-[760px] gap-2.5">
        {cards.map((card, i) => {
          const isActive = i === active;
          return (
            <Link
              key={card.href}
              href={card.href}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={`group relative overflow-hidden rounded-3xl transition-[flex-grow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                isActive ? "flex-[2.6]" : "flex-[1]"
              }`}
            >
              {/* Photo */}
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:group-hover:scale-100 will-change-transform">
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>

              {/* Scrim: always-on bottom gradient for copy legibility */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-dark/85 via-bg-dark/35 to-bg-dark/10"
              />
              {/* Dim collapsed panels so the active one reads vivid */}
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-0 bg-bg-dark transition-opacity duration-500 motion-reduce:transition-none ${
                  isActive ? "opacity-0" : "opacity-30"
                }`}
              />

              {/* Overlaid copy */}
              <div className="absolute inset-x-0 bottom-0 p-6 xl:p-8">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white backdrop-blur-sm">
                  {card.icon}
                </span>
                <p className="mt-4 text-heading-lg text-white">{card.title}</p>

                {/* Reveal block: body + audience chips + CTA */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="mt-3 max-w-xl text-body-lg text-white/85">{card.body}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {card.audiences.map((a) => (
                        <span
                          key={a}
                          className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white backdrop-blur-sm"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                    <span
                      aria-hidden
                      className="mt-6 mb-1 inline-flex w-fit items-center gap-1.5 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-accent-dark"
                    >
                      Explore
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mobile / tablet — stacked overlay cards */}
      <div className="space-y-4 lg:hidden">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group relative block h-[380px] overflow-hidden rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:h-[440px]"
          >
            <div className="absolute inset-0">
              <Image
                src={card.image.src}
                alt={card.image.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/40 to-bg-dark/10"
            />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white backdrop-blur-sm">
                {card.icon}
              </span>
              <p className="mt-3 text-heading-lg text-white">{card.title}</p>
              <p className="mt-2 text-body-md text-white/85">{card.body}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {card.audiences.map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white backdrop-blur-sm"
                  >
                    {a}
                  </span>
                ))}
              </div>
              <span
                aria-hidden
                className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white"
              >
                Explore
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
