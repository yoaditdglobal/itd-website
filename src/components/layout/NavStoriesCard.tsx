"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import type { NavStory } from "./nav-menus";

type Props = {
  stories: NavStory[];
  /** `panel` = the desktop mega menu's right column; `mobile` = inside the dark overlay. */
  surface?: "panel" | "mobile";
};

const ROTATE_MS = 5000;

/**
 * The mega menu's rotating customer-story promo: one story at a time (logo,
 * brand, headline result, one-liner), the whole slide a click-through to the
 * case-study page. Auto-advances while the menu is open; pauses on hover or
 * focus, stops once the visitor picks a slide with the dots, and never
 * auto-advances under prefers-reduced-motion. No framer-motion — the slide
 * entrance is the `.nav-story-slide` CSS animation keyed on the slug.
 */
export default function NavStoriesCard({ stories, surface = "panel" }: Props) {
  const mobile = surface === "mobile";
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (paused || manual || stories.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % stories.length), ROTATE_MS);
    return () => window.clearInterval(t);
  }, [paused, manual, stories.length]);

  const story = stories[index];
  if (!story) return null;
  const href = `/resources/case-studies/${story.slug}`;

  return (
    <div
      className={
        mobile
          ? "mt-4 flex flex-col rounded-xl bg-bg-dark-card p-5 text-white"
          : "flex h-full flex-col bg-accent-light/60 p-6 text-text-primary"
      }
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Link key={story.slug} href={href} className="nav-story-slide group block flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg">
        <span className={`relative block aspect-[16/9] overflow-hidden rounded-lg ${mobile ? "ring-1 ring-white/10" : ""}`}>
          <Image
            src={story.image}
            alt={story.imageAlt}
            fill
            sizes="(min-width: 1280px) 312px, (min-width: 1024px) 272px, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </span>
        <span className="mt-4 flex items-center gap-2.5">
          {story.logo && (
            <Image
              src={story.logo}
              alt={`${story.brand} logo`}
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 rounded-lg bg-white object-cover ring-1 ring-border"
            />
          )}
          <span className="text-heading-sm">{story.brand}</span>
        </span>
        <span className={`mt-2 block text-heading-md transition-colors ${mobile ? "" : "group-hover:text-accent"}`}>
          {story.result}
        </span>
        <span className={`mt-2 block text-body-sm line-clamp-3 ${mobile ? "text-white/75" : "text-text-secondary"}`}>
          {story.blurb}
        </span>
      </Link>

      {stories.length > 1 && (
        <div className="mt-4 flex items-center gap-1.5" role="tablist" aria-label="Customer stories">
          {stories.map((s, i) => (
            <button
              key={s.slug}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show story: ${s.brand}`}
              onClick={() => {
                setManual(true);
                setIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? `w-5 ${mobile ? "bg-white" : "bg-accent"}`
                  : `w-1.5 ${mobile ? "bg-white/30 hover:bg-white/50" : "bg-accent/25 hover:bg-accent/50"}`
              }`}
            />
          ))}
        </div>
      )}

      <div className="mt-auto pt-5">
        <Button
          href={href}
          variant="primary"
          surface={mobile ? "dark" : "light"}
          size={mobile ? "lg" : "default"}
          className="w-full"
        >
          Learn More
        </Button>
      </div>
    </div>
  );
}
