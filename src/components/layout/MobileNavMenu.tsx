"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import NavPromoCard from "./NavPromoCard";
import { NAV_MENUS, isSectionActive, type NavGroup, type NavItem, type NavMenu } from "./nav-menus";

type Props = {
  pathname: string;
  openSection: string | null;
  onToggleSection: (id: string) => void;
  onNavigate: () => void;
  /** Rendered between Solutions and Integrations, like the desktop order. */
  platformLink: React.ReactNode;
};

/**
 * The mobile overlay's accordion, rendered from the same NAV_MENUS config as
 * the desktop panel: every item keeps its description, each group its footer
 * link, and each section ends with its promo card.
 */
export default function MobileNavMenu({ pathname, openSection, onToggleSection, onNavigate, platformLink }: Props) {
  return (
    <>
      {NAV_MENUS.map((menu) => (
        <div key={menu.id}>
          {menu.id === "integrations" && platformLink}
          <button
            type="button"
            className={`flex items-center justify-between w-full py-3 font-display text-base font-medium ${
              isSectionActive(menu, pathname) ? "text-accent" : "text-white"
            }`}
            aria-expanded={openSection === menu.id}
            onClick={() => onToggleSection(menu.id)}
          >
            {menu.label}
            <ChevronDown className={`w-4 h-4 transition-transform ${openSection === menu.id ? "rotate-180" : ""}`} />
          </button>
          {openSection === menu.id && <SectionBody menu={menu} onNavigate={onNavigate} />}
        </div>
      ))}
    </>
  );
}

function SectionBody({ menu, onNavigate }: { menu: NavMenu; onNavigate: () => void }) {
  const groups: NavGroup[] = menu.rail
    ? menu.rail.groups
    : [{ id: "all", title: menu.label, description: "", icon: ChevronDown, items: menu.items ?? [], footerLink: menu.footerLink }];

  return (
    <div className="pl-4 pb-4">
      {groups.map((g) => (
        <div key={g.id} className="mt-2" data-nav-group={g.id}>
          {menu.rail && <p className="text-eyebrow text-white/40 mt-3 mb-1">{g.title}</p>}
          {g.items.map((item: NavItem) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-[44px] flex-col justify-center py-1.5"
              onClick={onNavigate}
            >
              <span className="flex items-center gap-2 text-sm text-white">
                {item.logo && <IntegrationLogo name={item.name} logo={item.logo} size="xs" />}
                {item.name}
              </span>
              <span className="text-caption text-white/50">{item.desc}</span>
            </Link>
          ))}
          {g.footerLink && (
            <Link href={g.footerLink.href} className="inline-flex min-h-[44px] items-center text-sm text-accent" onClick={onNavigate}>
              {g.footerLink.label} →
            </Link>
          )}
        </div>
      ))}
      <NavPromoCard promo={menu.promo} surface="mobile" />
    </div>
  );
}
