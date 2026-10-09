"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import NavPromoCard from "./NavPromoCard";
import type { NavGroup, NavItem, NavMenu } from "./nav-menus";

type Props = {
  id: string;
  menu: NavMenu | null;
  open: boolean;
  /** Increments on every open so the body remounts (rail resets to default). */
  openCount: number;
  labelledBy?: string;
  onLinkClick: () => void;
  /** Shift+Tab from the panel's first control returns to the open trigger. */
  onEscapeToTrigger: () => void;
  onBlurOutside: (next: Element | null) => void;
};

/**
 * The one shared mega-menu panel: a pill-width white surface under the nav
 * with a left rail of selectable groups, a middle item grid and a right promo
 * card. Content swaps per open trigger (keyed body = 150ms crossfade); the
 * panel's own enter/exit is the existing `.nav-dropdown` transition.
 *
 * The `before:` hover bridge lives on this NON-clipping root; the clipping /
 * scrolling wrapper sits one level inside, otherwise the 8px gap between the
 * pill and the panel becomes a dead zone that closes the menu.
 */
export default function MegaPanel({
  id,
  menu,
  open,
  openCount,
  labelledBy,
  onLinkClick,
  onEscapeToTrigger,
  onBlurOutside,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <div
      id={id}
      ref={rootRef}
      role="region"
      aria-labelledby={labelledBy}
      data-open={open || undefined}
      data-nav-menu={menu?.id}
      className="nav-dropdown hidden lg:block absolute left-0 right-0 top-full mt-2 rounded-2xl border border-border bg-white shadow-2xl before:absolute before:-top-2 before:left-0 before:right-0 before:h-2 before:content-['']"
      onClick={(e) => {
        // Close when any link inside is clicked — covers query-string-only
        // navigations where usePathname() doesn't change.
        if ((e.target as HTMLElement).closest("a")) onLinkClick();
      }}
      onKeyDown={(e) => {
        if (e.key !== "Tab" || !e.shiftKey) return;
        const first = rootRef.current?.querySelector<HTMLElement>(
          'button[tabindex="0"], a[href], button:not([tabindex="-1"])',
        );
        if (first && e.target === first) {
          e.preventDefault();
          onEscapeToTrigger();
        }
      }}
      onBlur={(e) => onBlurOutside(e.relatedTarget as Element | null)}
    >
      <div className="rounded-[inherit] overflow-hidden max-h-[calc(100vh-var(--nav-h)-1.5rem)] overflow-y-auto">
        {menu && <MegaPanelBody key={`${menu.id}-${openCount}`} menu={menu} />}
      </div>
    </div>
  );
}

function MegaPanelBody({ menu }: { menu: NavMenu }) {
  const rail = menu.rail;
  const [activeGroupId, setActiveGroupId] = useState(rail?.defaultGroupId ?? "");
  const activeGroup = rail?.groups.find((g) => g.id === activeGroupId) ?? rail?.groups[0];

  const items: NavItem[] = rail ? (activeGroup?.items ?? []) : (menu.items ?? []);
  const footerLink = rail ? activeGroup?.footerLink : menu.footerLink;
  const eyebrow = rail ? (activeGroup?.title ?? "") : menu.label;
  const columns = rail ? 2 : (menu.columns ?? 2);
  const gridId = `nav-group-${menu.id}-${activeGroup?.id ?? "all"}`;
  const tabId = (g: NavGroup) => `nav-tab-${menu.id}-${g.id}`;

  return (
    <div className="nav-panel-swap flex items-stretch">
      {rail && activeGroup && (
        <NavRail
          eyebrow={rail.eyebrow}
          groups={rail.groups}
          activeId={activeGroup.id}
          onChange={setActiveGroupId}
          tabId={tabId}
          panelId={gridId}
        />
      )}

      <div
        className="flex-1 min-w-0 p-6"
        {...(rail && activeGroup
          ? { role: "tabpanel", id: gridId, "aria-labelledby": tabId(activeGroup) }
          : {})}
        data-nav-group={activeGroup?.id}
      >
        <p className="text-eyebrow text-text-tertiary mb-4">{eyebrow}</p>
        <ul className={`grid gap-x-6 gap-y-4 ${columns === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={
                    rail
                      ? "group block rounded-lg -m-2 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      : "nav-lane-card card-hover group flex h-full flex-col rounded-xl border border-border p-4 hover:border-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  }
                >
                  <span className="flex items-center gap-2.5">
                    {Icon ? (
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-light text-accent transition-transform group-hover:scale-105">
                        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                      </span>
                    ) : (
                      item.logo && <IntegrationLogo name={item.name} logo={item.logo} size="xs" />
                    )}
                    <span className="text-heading-sm text-text-primary group-hover:text-accent transition-colors">
                      {item.name}
                    </span>
                  </span>
                  <span className={`${rail ? "mt-1" : "mt-2"} block text-body-sm text-text-secondary line-clamp-3`}>
                    {item.desc}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        {menu.proofLogos ? (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
            <div className="flex items-center gap-3">
              <span className="text-eyebrow text-text-tertiary">Carriers included</span>
              <div className="flex flex-wrap items-center gap-2">
                {menu.proofLogos.map((l) => (
                  <div key={l.name} title={l.name} className="rounded-md bg-white p-1 ring-1 ring-border">
                    <IntegrationLogo name={l.name} logo={l.logo} size="sm" />
                  </div>
                ))}
              </div>
            </div>
            {footerLink && (
              <Link
                href={footerLink.href}
                className="link-underline shrink-0 text-sm font-medium text-accent gap-1"
              >
                {footerLink.label} <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            )}
          </div>
        ) : (
          footerLink && (
            <Link
              href={footerLink.href}
              className="link-underline mt-6 text-sm font-medium text-accent gap-1"
            >
              {footerLink.label} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          )
        )}
      </div>

      <div className="w-[320px] xl:w-[360px] shrink-0">
        <NavPromoCard promo={menu.promo} />
      </div>
    </div>
  );
}

type RailProps = {
  eyebrow: string;
  groups: NavGroup[];
  activeId: string;
  onChange: (id: string) => void;
  tabId: (g: NavGroup) => string;
  panelId: string;
};

function NavRail({ eyebrow, groups, activeId, onChange, tabId, panelId }: RailProps) {
  const hoverTimer = useRef<number | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    const g = groups[i];
    if (!g) return;
    onChange(g.id);
    tabRefs.current[i]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const cur = groups.findIndex((g) => g.id === activeId);
    if (e.key === "ArrowDown") select((cur + 1) % groups.length);
    else if (e.key === "ArrowUp") select((cur - 1 + groups.length) % groups.length);
    else if (e.key === "Home") select(0);
    else if (e.key === "End") select(groups.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div className="w-[240px] xl:w-[280px] shrink-0 border-r border-border p-4 xl:p-5">
      <p className="text-eyebrow text-text-tertiary mb-3 px-1">{eyebrow}</p>
      <div role="tablist" aria-orientation="vertical" aria-label={eyebrow} onKeyDown={onKeyDown} className="space-y-1">
        {groups.map((g, i) => {
          const selected = g.id === activeId;
          const Icon = g.icon;
          return (
            <button
              key={g.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={tabId(g)}
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              className={`nav-rail-tab flex w-full gap-3 rounded-xl border p-3 xl:p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                selected
                  ? "border-border bg-white shadow-sm text-text-primary"
                  : "border-transparent text-text-tertiary opacity-70 hover:opacity-100"
              }`}
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return;
                hoverTimer.current = window.setTimeout(() => onChange(g.id), 80);
              }}
              onPointerLeave={() => {
                if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
              }}
              onClick={() => {
                if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
                onChange(g.id);
              }}
            >
              <Icon className="h-9 w-9 shrink-0 text-accent" strokeWidth={1.5} aria-hidden />
              <span className="min-w-0">
                <span className={`block text-heading-sm ${selected ? "text-text-primary" : ""}`}>{g.title}</span>
                <span className="mt-1 block text-body-sm text-text-secondary line-clamp-3">{g.description}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
