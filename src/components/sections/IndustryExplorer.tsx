"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Gem,
  Gift,
  HeartPulse,
  PawPrint,
  Puzzle,
  Shirt,
  Sparkles,
  Trophy,
  type LucideIcon,
} from "lucide-react";

interface IndustryBrand {
  name: string;
  logo: string;
  href: string;
}

interface Industry {
  icon: LucideIcon;
  name: string;
  /** Short tab label so all eight fit a row on desktop. */
  tab: string;
  desc: string;
  /** Customer brands we actually ship in this category (case-study links). */
  brands?: IndustryBrand[];
}

/* Copy verbatim from the Brands page doc; brand chips only where a real
   customer case study exists — no invented claims. */
const INDUSTRIES: Industry[] = [
  {
    icon: Sparkles,
    name: "Beauty & cosmetics",
    tab: "Beauty",
    desc: "High-frequency DTC orders and repeat buyers who expect their parcel tracked and on time.",
    brands: [
      {
        name: "Tatti Lashes",
        logo: "/case-studies/tatti-lashes/logo.jpeg",
        href: "/resources/case-studies/tatti-lashes",
      },
      {
        name: "Red Label",
        logo: "/case-studies/red-label/logo.png",
        href: "/resources/case-studies/red-label",
      },
    ],
  },
  {
    icon: Gift,
    name: "Giftware & homeware",
    tab: "Giftware",
    desc: "Mixed parcel sizes and gifting peaks, handled without the seasonal wobble.",
    brands: [
      {
        name: "Sifcon International",
        logo: "/case-studies/sifcon-international/logo.png",
        href: "/resources/case-studies/sifcon-international",
      },
      {
        name: "KitchenCraft",
        logo: "/logos/customers/kitchencraft.webp",
        href: "/resources/case-studies/lifetime-brands",
      },
    ],
  },
  {
    icon: Shirt,
    name: "Fashion & footwear",
    tab: "Fashion",
    desc: "Returns come with the territory, so shoppers get the delivery and return options they expect.",
  },
  {
    icon: Gem,
    name: "Jewellery & accessories",
    tab: "Jewellery",
    desc: "Small, high-value parcels that need secure, tracked delivery to the door.",
  },
  {
    icon: Trophy,
    name: "Sports & fan merch",
    tab: "Sports",
    desc: "Kit drops and match-day spikes that need carriers to flex with demand.",
    brands: [
      {
        name: "West Ham United",
        logo: "/logos/customers/west-ham.webp",
        href: "/resources/case-studies/west-ham-united",
      },
    ],
  },
  {
    icon: HeartPulse,
    name: "Health & wellness",
    tab: "Health",
    desc: "Subscription and repeat orders that have to arrive like clockwork.",
  },
  {
    icon: PawPrint,
    name: "Pet supplies",
    tab: "Pets",
    desc: "Bulky, heavy repeat orders customers want delivered when they're in.",
  },
  {
    icon: Puzzle,
    name: "Toys, hobby & craft",
    tab: "Toys & hobby",
    desc: "Gifting peaks and marketplace orders, delivered on the date you promised.",
  },
];

const AUTOPLAY_MS = 5000;

/**
 * Horizontal industry navigation for the Brands page (Dripify-style):
 * an icon tab bar with an accent underline drives a single takeover panel
 * that swaps in place, so the page doesn't grow. Tabs scroll horizontally
 * on small screens; arrow keys move between tabs; auto-advances until the
 * user takes over; respects prefers-reduced-motion.
 */
export default function IndustryExplorer() {
  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const autoplaying = inView && !paused && !engaged && !reducedMotion;

  const activeRef = useRef(0);
  activeRef.current = active;

  useEffect(() => {
    if (!autoplaying) return;
    const id = window.setInterval(() => {
      const next = (activeRef.current + 1) % INDUSTRIES.length;
      setActive(next);
      tabRefs.current[next]?.scrollIntoView({
        inline: "nearest",
        block: "nearest",
        behavior: "smooth",
      });
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [autoplaying]);

  const select = (index: number, focus = false) => {
    setEngaged(true);
    setActive(index);
    const tab = tabRefs.current[index];
    if (focus) tab?.focus();
    tab?.scrollIntoView({ inline: "nearest", block: "nearest" });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      select((active + 1) % INDUSTRIES.length, true);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      select((active - 1 + INDUSTRIES.length) % INDUSTRIES.length, true);
    }
  };

  const item = INDUSTRIES[active];

  return (
    <div
      ref={rootRef}
      className="mt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Tab bar */}
      <div className="scrollbar-none -mx-4 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          role="tablist"
          aria-label="Industries"
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          className="flex w-max min-w-full gap-1 border-b border-border"
        >
          {INDUSTRIES.map((ind, i) => {
            const on = i === active;
            return (
              <button
                key={ind.name}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`industry-tab-${i}`}
                aria-selected={on}
                aria-controls="industry-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => select(i)}
                className={`relative flex flex-shrink-0 items-center gap-2 whitespace-nowrap px-4 py-3.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none ${
                  on
                    ? "text-text-primary"
                    : "text-text-tertiary hover:text-text-primary"
                }`}
              >
                <ind.icon
                  className={`h-4 w-4 ${on ? "text-accent" : ""}`}
                  aria-hidden
                />
                {ind.tab}
                <span
                  aria-hidden
                  className={`absolute -bottom-px left-0 right-0 h-0.5 ${
                    on ? "bg-accent" : "bg-transparent"
                  }`}
                >
                  {on && autoplaying && (
                    <span
                      key={active}
                      className="brand-spotlight-progress absolute inset-y-0 left-0 bg-accent-600"
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Takeover panel */}
      <div
        id="industry-panel"
        role="tabpanel"
        aria-labelledby={`industry-tab-${active}`}
        className="relative mt-6 overflow-hidden rounded-3xl border border-border bg-white"
      >
        {/* Decorative motif */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 88% 0%, rgba(29,63,184,0.08) 0%, transparent 55%)",
          }}
        />
        <item.icon
          key={`motif-${active}`}
          aria-hidden
          className="brand-spotlight-in pointer-events-none absolute -right-10 -bottom-10 h-56 w-56 text-accent/10 md:-right-6 md:bottom-auto md:top-1/2 md:h-72 md:w-72 md:-translate-y-1/2"
          strokeWidth={1.2}
        />

        <div
          key={active}
          className="brand-spotlight-in relative p-8 md:min-h-[320px] md:p-12 lg:p-14"
        >
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-light text-accent">
            <item.icon className="h-6 w-6" aria-hidden />
          </span>
          <p className="text-display-md mt-5 text-text-primary">{item.name}</p>
          <p className="mt-3 max-w-2xl text-body-lg text-text-secondary">
            {item.desc}
          </p>

          {item.brands && (
            <div className="mt-7">
              <p className="text-eyebrow text-text-tertiary">Brands we ship</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {item.brands.map((b) => (
                  <Link
                    key={b.name}
                    href={b.href}
                    className="group/b flex items-center gap-2.5 rounded-xl border border-border bg-white py-2.5 pl-3 pr-4 transition-colors hover:border-accent/40 motion-reduce:transition-none"
                  >
                    <span className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={b.logo}
                        alt={`${b.name} logo`}
                        fill
                        sizes="32px"
                        className="object-contain"
                      />
                    </span>
                    <span className="text-sm font-medium text-text-primary">
                      {b.name}
                    </span>
                    <ArrowRight
                      className="h-4 w-4 text-text-tertiary opacity-0 transition-all group-hover/b:text-accent group-hover/b:opacity-100 motion-reduce:transition-none"
                      aria-hidden
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
