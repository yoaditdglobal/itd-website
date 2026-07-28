"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
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

interface Industry {
  icon: LucideIcon;
  name: string;
  /** Short tab label so all eight fit a row on desktop. */
  tab: string;
  desc: string;
  /** 1000x1000 export from the "Built for your industry" set. */
  image: string;
}

/* Copy verbatim from the Brands page doc. */
const INDUSTRIES: Industry[] = [
  {
    icon: Sparkles,
    name: "Beauty & cosmetics",
    tab: "Beauty",
    image: "/industries/beauty.png",
    desc: "High-frequency DTC orders and repeat buyers who expect their parcel tracked and on time.",
  },
  {
    icon: Gift,
    name: "Giftware & homeware",
    tab: "Giftware",
    image: "/industries/giftware.png",
    desc: "Mixed parcel sizes and gifting peaks, handled without the seasonal wobble.",
  },
  {
    icon: Shirt,
    name: "Fashion & footwear",
    tab: "Fashion",
    image: "/industries/fashion.png",
    desc: "Returns come with the territory, so shoppers get the delivery and return options they expect.",
  },
  {
    icon: Gem,
    name: "Jewellery & accessories",
    tab: "Jewellery",
    image: "/industries/jewellery.png",
    desc: "Small, high-value parcels that need secure, tracked delivery to the door.",
  },
  {
    icon: Trophy,
    name: "Sports & fan merch",
    tab: "Sports",
    image: "/industries/sports.png",
    desc: "Kit drops and match-day spikes that need carriers to flex with demand.",
  },
  {
    icon: HeartPulse,
    name: "Health & wellness",
    tab: "Health",
    image: "/industries/health.png",
    desc: "Subscription and repeat orders that have to arrive like clockwork.",
  },
  {
    icon: PawPrint,
    name: "Pet supplies",
    tab: "Pets",
    image: "/industries/pets.png",
    desc: "Bulky, heavy repeat orders customers want delivered when they're in.",
  },
  {
    icon: Puzzle,
    name: "Toys, hobby & craft",
    tab: "Toys & hobby",
    image: "/industries/toys.png",
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
          className="flex w-max min-w-full gap-1"
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

      {/* Takeover panel — copy left, industry image right (stacked on mobile) */}
      <div
        id="industry-panel"
        role="tabpanel"
        aria-labelledby={`industry-tab-${active}`}
        className="relative mt-6 overflow-hidden rounded-3xl"
        style={{
          background:
            "radial-gradient(circle at 12% 8%, rgba(59,91,219,0.85) 0%, rgba(29,63,184,0.35) 45%, rgba(10,15,40,0.9) 100%), #15192b",
        }}
      >
        <div key={active} className="grid md:grid-cols-2">
          <div className="industry-media-in relative order-first aspect-square md:order-last">
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 hidden md:block"
              style={{
                background:
                  "linear-gradient(to right, rgba(21,25,43,0.55) 0%, transparent 22%)",
              }}
            />
          </div>
          <div className="brand-spotlight-in relative flex flex-col justify-center p-8 md:p-12 lg:p-14">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
              <item.icon className="h-6 w-6" aria-hidden />
            </span>
            <p className="text-display-md mt-5 text-white">{item.name}</p>
            <p className="mt-3 max-w-2xl text-body-lg text-white/70">
              {item.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
