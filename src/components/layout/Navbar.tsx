"use client";

import { useState, useEffect, useLayoutEffect, useRef, type KeyboardEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import MegaPanel from "./MegaPanel";
import MobileNavMenu from "./MobileNavMenu";
import { NAV_MENUS, isSectionActive, type NavMenuId } from "./nav-menus";

// useLayoutEffect on the client (no flash of wrong nav tone), useEffect on the server.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const LOGIN_URL = "https://connexx.co.uk/";
const PANEL_ID = "nav-mega-panel";

interface NavTriggerProps {
  id: NavMenuId;
  label: string;
  open: boolean;
  active: boolean;
  onToggle: () => void;
  onHoverOpen: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
  setTriggerRef: (el: HTMLButtonElement | null) => void;
}

/**
 * A mega-menu trigger. Opens on mouse hover (pointerType-gated so a touch tap
 * doesn't double-fire) and toggles on click/Enter/Space. All four triggers
 * control the ONE shared panel (`MegaPanel`) mounted at the end of the nav.
 */
function NavTrigger({ id, label, open, active, onToggle, onHoverOpen, onKeyDown, setTriggerRef }: NavTriggerProps) {
  return (
    <button
      ref={setTriggerRef}
      id={`nav-trigger-${id}`}
      type="button"
      aria-expanded={open}
      aria-controls={PANEL_ID}
      aria-current={active ? "page" : undefined}
      onClick={onToggle}
      onKeyDown={onKeyDown}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") onHoverOpen();
      }}
      className={`font-display relative flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${
        active ? "text-white" : "text-white/70 hover:text-white"
      }`}
    >
      {label}
      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      {active && (
        <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent" aria-hidden />
      )}
    </button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (base: string) => pathname === base || pathname.startsWith(`${base}/`);
  const [scrolled, setScrolled] = useState(false);
  const [heroTone, setHeroTone] = useState<"light" | "dark" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<NavMenuId | null>(null);
  // The menu whose content the panel shows. Kept across close so the panel
  // doesn't go blank during its 180ms fade-out.
  const [renderedMenuId, setRenderedMenuId] = useState<NavMenuId | null>(null);
  const [openCount, setOpenCount] = useState(0);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  // True while the open dropdown was opened by mouse hover. The first click
  // after a hover-open is absorbed (mouse users click the already-open menu
  // expecting it to stay open — closing it reads as "the button is broken").
  const hoverOpenedRef = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    // Initialize immediately: pages can MOUNT already scrolled (anchor links
    // like /shipping/domestic#estimator, reload scroll-restoration, bfcache,
    // hydration finishing mid-scroll). Waiting for the first scroll EVENT left
    // the nav transparent with page content colliding under the bare links.
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // At the very top of a page the nav goes transparent so the page's hero shows
  // through behind it — the hero "stretches to the top", no separate dark band.
  // ONLY light heroes go transparent: the nav over a light hero painted a dark
  // pill that read as a separate header band. Dark/image heroes
  // (data-hero-tone="dark") and unmarked pages KEEP the solid dark pill.
  // The hero is the first section, so querySelector returns IT, not a dark
  // section lower on the page. Scrolling → pill too.
  useIsoLayoutEffect(() => {
    const tone = document.querySelector("[data-hero-tone]")?.getAttribute("data-hero-tone");
    setHeroTone(tone === "light" || tone === "dark" ? tone : null);
    // Re-assert the scroll state per route: an anchored navigation can land
    // the new page mid-scroll without a scroll event reaching the listener.
    if (typeof window !== "undefined") setScrolled(window.scrollY > 20);
  }, [pathname]);

  const transparent = !scrolled && heroTone === "light"; // only light heroes
  const darkInk = transparent; // transparent ⟺ light hero ⇒ dark ink/logo

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close all menus on route change (covers back/forward too).
  useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
    setMobileAccordion(null);
  }, [pathname]);

  // Escape closes the open dropdown and returns focus to its trigger.
  useEffect(() => {
    if (!openDropdown) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        triggerRefs.current[openDropdown]?.focus();
        setOpenDropdown(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openDropdown]);

  // Tap/click outside the nav closes the open dropdown.
  useEffect(() => {
    if (!openDropdown) return;
    const onDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [openDropdown]);

  const toggleMobileAccordion = (section: string) => {
    setMobileAccordion(mobileAccordion === section ? null : section);
  };

  const openMenu = (id: NavMenuId, viaHover: boolean) => {
    // Side effects stay outside state updaters — React double-invokes
    // updaters in dev, which would flip the ref twice and break the absorb.
    hoverOpenedRef.current = viaHover;
    if (openDropdown !== id) setOpenCount((c) => c + 1);
    setRenderedMenuId(id);
    setOpenDropdown(id);
  };
  const closeMenu = () => setOpenDropdown(null);
  const closeOnMouse = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") closeMenu();
  };

  const triggerProps = (id: NavMenuId) => ({
    id,
    open: openDropdown === id,
    onToggle: () => {
      const wasHoverOpened = hoverOpenedRef.current;
      hoverOpenedRef.current = false;
      if (openDropdown === id) {
        // Hover already opened it — absorb this click and let the next one
        // (or pointer-leave / Escape / outside click) close it.
        if (!wasHoverOpened) closeMenu();
      } else {
        openMenu(id, false);
      }
    },
    onHoverOpen: () => openMenu(id, true),
    onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => {
      // Tab / ArrowDown from an open trigger jumps into the panel (it sits at
      // the end of the nav in DOM order, after the other triggers and CTAs).
      if (openDropdown !== id) return;
      if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
        const first = document.querySelector<HTMLElement>(
          `#${PANEL_ID} [role="tab"][tabindex="0"], #${PANEL_ID} a[href]`,
        );
        if (first) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    setTriggerRef: (el: HTMLButtonElement | null) => {
      triggerRefs.current[id] = el;
    },
  });

  const renderedMenu = NAV_MENUS.find((m) => m.id === renderedMenuId) ?? null;

  const platformLinkClass = (mobile: boolean) =>
    mobile
      ? `py-3 font-display text-base font-medium ${isActive("/connexx") ? "text-accent" : "text-white"}`
      : `font-display relative px-3 py-2 text-sm font-medium transition-colors ${
          isActive("/connexx") ? "text-white" : "text-white/70 hover:text-white"
        }`;

  return (
    <>
    {/* Invisible backdrop — closes open dropdown on click anywhere outside the nav */}
    {openDropdown && (
      <div
        className="fixed inset-0 z-40"
        aria-hidden
        onClick={closeMenu}
      />
    )}
    {/* Constant height — shrinking the bar on scroll exposed a strip of the
        beige body background between the nav and the page's pt-[72px] offset.
        The scrolled state changes surface treatment only. */}
    <header className="fixed inset-x-0 top-2 z-50 px-3 sm:px-4">
      {/* The whole pill is the hover region: pointer-leave anywhere outside it
          (or onto a "neutral" item — logo, Platform, CTAs) closes the panel. */}
      <nav
        ref={navRef}
        data-nav-theme={darkInk ? "light" : "dark"}
        onPointerLeave={closeOnMouse}
        className={`relative mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full px-4 py-2.5 transition-shadow duration-300 sm:px-5 ${
          transparent
            ? "border border-transparent"
            : scrolled
              ? "border border-white/10 bg-bg-dark/95"
              : "border border-white/10 bg-gradient-to-b from-bg-dark/85 via-bg-dark/45 to-bg-dark/10"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0" aria-label="ITD Global — home" onPointerEnter={closeOnMouse}>
          <Image
            src="/logos/itd/itd-global-logo.webp"
            alt="ITD Global"
            width={576}
            height={240}
            className="h-9 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1 ml-8 flex-1 min-w-0">
          {NAV_MENUS.map((menu) => (
            <div key={menu.id} className="contents">
              {menu.id === "integrations" && (
                <Link
                  href="/connexx"
                  aria-current={isActive("/connexx") ? "page" : undefined}
                  className={platformLinkClass(false)}
                  onPointerEnter={closeOnMouse}
                >
                  Platform
                  {isActive("/connexx") && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent" aria-hidden />
                  )}
                </Link>
              )}
              <NavTrigger
                {...triggerProps(menu.id)}
                label={menu.label}
                active={isSectionActive(menu, pathname)}
              />
            </div>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0" onPointerEnter={closeOnMouse}>
          <Button href={LOGIN_URL} target="_blank" variant="secondary" surface={darkInk ? "light" : "dark"} className="text-xs px-4 py-2">
            Log in
          </Button>
          <Button href="/contact" variant="primary" surface={darkInk ? "light" : "dark"} className="text-xs px-4 py-2">
            Contact Sales
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center ${darkInk ? "text-text-primary" : "text-white"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* The shared mega-menu panel — absolute, so it doesn't affect the
            pill's justify-between layout. */}
        <MegaPanel
          id={PANEL_ID}
          menu={renderedMenu}
          open={openDropdown !== null}
          openCount={openCount}
          labelledBy={renderedMenuId ? `nav-trigger-${renderedMenuId}` : undefined}
          onLinkClick={closeMenu}
          onEscapeToTrigger={() => {
            if (openDropdown) triggerRefs.current[openDropdown]?.focus();
          }}
          onBlurOutside={(next) => {
            if (next && navRef.current && !navRef.current.contains(next)) closeMenu();
          }}
        />
      </nav>
    </header>

    {/* Mobile overlay — outside <header> to avoid backdrop-filter containing block trap.
        Always mounted; .nav-mobile-overlay handles the slide + visibility. */}
    <div
      data-open={mobileOpen || undefined}
      aria-hidden={!mobileOpen}
      data-analytics-location="nav"
      className="nav-mobile-overlay lg:hidden fixed inset-0 bg-bg-dark z-[60] overflow-y-auto"
    >
          {/* Overlay-internal top bar — the floating pill header sits underneath
              the full-screen menu, so the close affordance lives in here. */}
          <div className="flex items-center justify-between px-4 pt-3 pb-1">
            <Link href="/" aria-label="ITD Global — home" onClick={() => setMobileOpen(false)}>
              <Image
                src="/logos/itd/itd-global-logo.webp"
                alt="ITD Global"
                width={576}
                height={240}
                className="h-9 w-auto"
              />
            </Link>
            <button
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-white"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="px-4 py-6 flex flex-col gap-1">
            <MobileNavMenu
              pathname={pathname}
              openSection={mobileAccordion}
              onToggleSection={toggleMobileAccordion}
              onNavigate={() => setMobileOpen(false)}
              platformLink={
                <Link
                  href="/connexx"
                  aria-current={isActive("/connexx") ? "page" : undefined}
                  className={`block ${platformLinkClass(true)}`}
                  onClick={() => setMobileOpen(false)}
                >
                  Platform
                </Link>
              }
            />

            {/* Mobile CTAs */}
            <div className="mt-6 flex flex-col gap-3">
              <Button href={LOGIN_URL} target="_blank" variant="secondary" surface="dark" className="w-full justify-center">
                Log in
              </Button>
              <Button href="/contact" variant="primary" surface="dark" className="w-full justify-center">
                Contact Sales
              </Button>
            </div>
          </div>
    </div>
    </>
  );
}
