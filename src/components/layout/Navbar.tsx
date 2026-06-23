"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import IntegrationLogo from "@/components/ui/IntegrationLogo";

const shippingMenu = [
  { name: "Domestic", desc: "UK & local parcel delivery", href: "/shipping/domestic" },
  { name: "International", desc: "Cross-border shipping & compliance", href: "/shipping/international" },
  { name: "Freight", desc: "Bulk & pallet logistics", href: "/shipping/freight" },
];

const solutionsMenu = {
  byStage: [
    { name: "Enterprise", desc: "Scale logistics across global operations", href: "/solutions/enterprise" },
    { name: "SMEs", desc: "Ship smarter from day one", href: "/solutions/small-business" },
  ],
  byModel: [
    { name: "eCommerce", desc: "Multi-carrier shipping for online stores", href: "/solutions/ecommerce" },
    { name: "Marketplace Seller", desc: "Unified fulfilment across platforms", href: "/solutions/marketplace-seller" },
    { name: "3PL", desc: "Multi-client logistics automation", href: "/solutions/3pl" },
    { name: "Export", desc: "Compliance and documentation", href: "/solutions/export" },
    { name: "Import", desc: "Customs and clearance automation", href: "/solutions/import" },
    { name: "B2B", desc: "ERP-connected dispatch", href: "/solutions/b2b" },
  ],
};

const integrationsMenu = {
  tech: [
    { label: "ERP / WMS", href: "/integrations/erp-wms", names: "Linnworks, NetSuite, Magento" },
    { label: "eCommerce & Logistics", href: "/integrations/ecommerce-logistics", names: "Shopify, WooCommerce, Veeqo" },
    { label: "Marketplaces", href: "/integrations/marketplaces", names: "Amazon, eBay, Etsy" },
  ],
  carriers: [
    { name: "Evri", desc: "UK parcel delivery", href: "/integrations/carriers/evri", logo: "/logos/carriers/evri_logo.png" },
    { name: "Royal Mail", desc: "UK postal service", href: "/integrations/carriers/royal-mail", logo: "/logos/carriers/royal-mail-icon.png" },
    { name: "DPD", desc: "European parcel delivery", href: "/integrations/carriers/dpd", logo: "/logos/carriers/DPD-LOGO.png" },
    { name: "InPost", desc: "Parcel locker delivery", href: "/integrations/carriers/inpost", logo: "/logos/carriers/inpost-icon.png" },
    { name: "Parcel Force", desc: "UK tracked parcel delivery", href: "/integrations/carriers/parcel-force", logo: "/logos/carriers/parcel-force.svg" },
    { name: "Amazon Shipping", desc: "Amazon logistics network", href: "/integrations/carriers/amazon-shipping", logo: "/logos/carriers/amazonshipping_logo.png" },
    { name: "DHL", desc: "Global express & freight", href: "/integrations/carriers/dhl", logo: "/logos/carriers/dhl_logo.webp" },
  ],
};

const resourcesMenu = {
  // Only populated solution facets — empty solutions (Marketplace, B2B) must
  // not appear until a story exists for them. Links deep-link the library's
  // ?solution= filter (server-rendered, shareable).
  customerStories: [
    { name: "eCommerce", href: "/resources/case-studies?solution=ecommerce" },
    { name: "3PL", href: "/resources/case-studies?solution=3pl" },
    { name: "Import", href: "/resources/case-studies?solution=import" },
    { name: "Export", href: "/resources/case-studies?solution=export" },
    { name: "Freight", href: "/resources/case-studies?solution=freight" },
  ],
  knowledge: [
    { name: "Guides", href: "/resources/guides" },
    { name: "Glossary", href: "/resources/glossary" },
  ],
  support: [
    { name: "Help & Support", href: "/help" },
    { name: "Help Centre", href: "/help/centre" },
    { name: "Submit a request", href: "/help/submit-request" },
  ],
  developers: [
    { name: "Developer resources", href: "/help/developers" },
    { name: "API documentation", href: "/help/developers" },
    { name: "Status", href: "/help/developers" },
  ],
};

interface NavDropdownProps {
  id: string;
  label: string;
  open: boolean;
  onToggle: () => void;
  onHoverOpen: () => void;
  onHoverClose: () => void;
  onLinkClick: () => void;
  setTriggerRef: (el: HTMLButtonElement | null) => void;
  /** Width/layout classes for the panel — visual classes only. */
  panelClassName: string;
  /** Whether this section matches the current route (active-nav indicator). */
  active?: boolean;
  children: ReactNode;
}

/**
 * Desktop mega-menu disclosure. Opens on mouse hover (pointerType-gated so a
 * touch tap doesn't double-fire) and toggles on click/Enter/Space — fixes
 * "first click does nothing". The panel is always mounted and animated with
 * the .nav-dropdown CSS class (visibility + opacity + translate + scale), so
 * it works without framer-motion and closed panels are out of the tab order.
 */
function NavDropdown({
  id,
  label,
  open,
  onToggle,
  onHoverOpen,
  onHoverClose,
  onLinkClick,
  setTriggerRef,
  panelClassName,
  active,
  children,
}: NavDropdownProps) {
  return (
    <div
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") onHoverOpen();
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") onHoverClose();
      }}
    >
      <button
        ref={setTriggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={`nav-dropdown-${id}`}
        aria-current={active ? "page" : undefined}
        onClick={onToggle}
        className={`font-display relative flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors ${
          active ? "text-white" : "text-white/70 hover:text-white"
        }`}
      >
        {label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
        {active && (
          <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent" aria-hidden />
        )}
      </button>
      <div
        id={`nav-dropdown-${id}`}
        data-open={open || undefined}
        onClick={(e) => {
          // Close when any link inside is clicked — covers query-string-only
          // navigations where usePathname() doesn't change.
          if ((e.target as HTMLElement).closest("a")) onLinkClick();
        }}
        className={`nav-dropdown before:absolute before:-top-1.5 before:left-0 before:right-0 before:h-1.5 before:content-[''] ${panelClassName}`}
      >
        {children}
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  // Active top-level section, for nav highlighting.
  const SECTION_BASE: Record<string, string> = {
    shipping: "/shipping",
    solutions: "/solutions",
    integrations: "/integrations",
    resources: "/resources",
  };
  const isActive = (base: string) => pathname === base || pathname.startsWith(`${base}/`);
  const [scrolled, setScrolled] = useState(false);
  const [navDark, setNavDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  // True while the open dropdown was opened by mouse hover. The first click
  // after a hover-open is absorbed (mouse users click the already-open menu
  // expecting it to stay open — closing it reads as "the button is broken").
  const hoverOpenedRef = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Universal rule: at the top of every page the floating nav is transparent, so
  // the page's own hero shows through behind it (background-behind-nav === the
  // content below) — exactly like the homepage video. Dark heroes opt in via
  // [data-nav-dark] and keep the solid dark pill (white text) so it reads on
  // their dark bg; every other page is light, so the nav is transparent with
  // dark text. Once scrolled, the solid dark pill returns everywhere for
  // legibility over arbitrary content.
  useEffect(() => {
    setNavDark(!!document.querySelector("[data-nav-dark]"));
  }, [pathname]);
  const solid = scrolled || navDark;
  const darkText = !solid;

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
    const onKey = (e: KeyboardEvent) => {
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

  const dropdownProps = (id: string) => ({
    id,
    active: SECTION_BASE[id] ? isActive(SECTION_BASE[id]) : false,
    open: openDropdown === id,
    onToggle: () => {
      // Side effects stay outside the state updater — React double-invokes
      // updaters in dev, which would flip the ref twice and break the absorb.
      const wasHoverOpened = hoverOpenedRef.current;
      hoverOpenedRef.current = false;
      if (openDropdown === id) {
        // Hover already opened it — absorb this click and let the next one
        // (or pointer-leave / Escape / outside click) close it.
        if (!wasHoverOpened) setOpenDropdown(null);
      } else {
        setOpenDropdown(id);
      }
    },
    onHoverOpen: () => {
      hoverOpenedRef.current = true;
      setOpenDropdown(id);
    },
    onHoverClose: () =>
      setOpenDropdown((cur) => (cur === id ? null : cur)),
    onLinkClick: () => setOpenDropdown(null),
    setTriggerRef: (el: HTMLButtonElement | null) => {
      triggerRefs.current[id] = el;
    },
  });

  return (
    <>
    {/* Invisible backdrop — closes open dropdown on click anywhere outside the nav */}
    {openDropdown && (
      <div
        className="fixed inset-0 z-40"
        aria-hidden
        onClick={() => setOpenDropdown(null)}
      />
    )}
    {/* Constant height — shrinking the bar on scroll exposed a strip of the
        beige body background between the nav and the page's pt-[72px] offset.
        The scrolled state changes surface treatment only. */}
    <header className="fixed inset-x-0 top-2 z-50 px-3 sm:px-4">
      <nav
        ref={navRef}
        data-nav-theme={darkText ? "light" : "dark"}
        className={`mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full px-4 py-2.5 transition-shadow duration-300 sm:px-5 ${
          !solid
            ? "border border-transparent"
            : scrolled
              ? "border border-white/10 backdrop-blur-md bg-bg-dark/95"
              : "border border-white/10 backdrop-blur-md bg-gradient-to-b from-bg-dark/85 via-bg-dark/45 to-bg-dark/10"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0" aria-label="ITD Global — home">
          <Image
            src="/logos/itd/itd-global-logo.webp"
            alt="ITD Global"
            width={576}
            height={240}
            priority
            loading="eager"
            className="h-9 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1 ml-8 flex-1 min-w-0">
          {/* Shipping */}
          <NavDropdown
            {...dropdownProps("shipping")}
            label="Shipping"
            panelClassName="absolute top-full left-0 mt-1 w-[280px] bg-white rounded-xl shadow-2xl border border-border p-6"
          >
            <div className="text-eyebrow text-text-tertiary mb-3">Shipping Type</div>
            {shippingMenu.map((item) => (
              <Link key={item.name} href={item.href} className="block py-2 group">
                <div className="text-sm font-medium text-text-primary group-hover:text-accent">{item.name}</div>
                <div className="text-xs text-text-secondary">{item.desc}</div>
              </Link>
            ))}
          </NavDropdown>

          {/* Solutions */}
          <NavDropdown
            {...dropdownProps("solutions")}
            label="Solutions"
            panelClassName="absolute top-full left-0 mt-1 w-[520px] bg-white rounded-xl shadow-2xl border border-border p-6 grid grid-cols-2 gap-6"
          >
            <div>
              <div className="text-eyebrow text-text-tertiary mb-3">By Stage</div>
              {solutionsMenu.byStage.map((item) => (
                <Link key={item.name} href={item.href} className="block py-2 group">
                  <div className="text-sm font-medium text-text-primary group-hover:text-accent">{item.name}</div>
                  <div className="text-xs text-text-secondary">{item.desc}</div>
                </Link>
              ))}
            </div>
            <div>
              <div className="text-eyebrow text-text-tertiary mb-3">By Business Model</div>
              {solutionsMenu.byModel.map((item) => (
                <Link key={item.name} href={item.href} className="block py-1.5 group">
                  <div className="text-sm font-medium text-text-primary group-hover:text-accent">{item.name}</div>
                  <div className="text-xs text-text-secondary">{item.desc}</div>
                </Link>
              ))}
            </div>
          </NavDropdown>

          {/* Platform (Connexx) — direct link */}
          <Link
            href="/connexx"
            aria-current={isActive("/connexx") ? "page" : undefined}
            className={`font-display relative px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/connexx") ? "text-white" : "text-white/70 hover:text-white"
            }`}
          >
            Platform
            {isActive("/connexx") && (
              <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent" aria-hidden />
            )}
          </Link>

          {/* Integrations */}
          <NavDropdown
            {...dropdownProps("integrations")}
            label="Integrations"
            panelClassName="absolute top-full left-0 mt-1 w-[460px] bg-white rounded-xl shadow-2xl border border-border p-6 grid grid-cols-2 gap-6"
          >
            <div>
              <div className="text-eyebrow text-text-tertiary mb-3">Tech Integrations</div>
              {integrationsMenu.tech.map((cat) => (
                <Link key={cat.label} href={cat.href} className="block py-2 group">
                  <div className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">{cat.label}</div>
                  <div className="text-xs text-text-secondary">{cat.names}</div>
                </Link>
              ))}
              <Link href="/integrations/tech" className="link-underline text-xs text-accent mt-1">Browse integrations →</Link>
            </div>
            <div>
              <div className="text-eyebrow text-text-tertiary mb-3">Carrier Integrations</div>
              <ul className="space-y-1">
                {integrationsMenu.carriers.map((c) => (
                  <li key={c.name}>
                    <Link href={c.href} className="flex items-center gap-2 py-1.5 group">
                      <IntegrationLogo name={c.name} logo={c.logo} size="xs" />
                      <div>
                        <div className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">{c.name}</div>
                        <div className="text-xs text-text-secondary">{c.desc}</div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/integrations/carriers" className="link-underline text-xs text-accent mt-3">Browse carriers →</Link>
            </div>
          </NavDropdown>

          {/* Resources */}
          <NavDropdown
            {...dropdownProps("resources")}
            label="Resources"
            panelClassName="absolute top-full right-0 mt-1 w-[680px] bg-white rounded-xl shadow-2xl border border-border p-6 grid grid-cols-4 gap-5"
          >
            <div>
              <div className="text-eyebrow text-text-tertiary mb-3">Customer Stories</div>
              {resourcesMenu.customerStories.map((item) => (
                <Link key={item.name} href={item.href} className="block py-1 text-sm text-text-secondary hover:text-accent">{item.name}</Link>
              ))}
              <Link href="/resources/case-studies" className="link-underline text-xs text-accent mt-2">See all →</Link>
            </div>
            <div>
              <div className="text-eyebrow text-text-tertiary mb-3">Knowledge</div>
              {resourcesMenu.knowledge.map((item) => (
                <Link key={item.name} href={item.href} className="block py-1 text-sm text-text-secondary hover:text-accent">{item.name}</Link>
              ))}
            </div>
            <div>
              <div className="text-eyebrow text-text-tertiary mb-3">Support</div>
              {resourcesMenu.support.map((item) => (
                <Link key={item.name} href={item.href} className="block py-1 text-sm text-text-secondary hover:text-accent">{item.name}</Link>
              ))}
            </div>
            <div>
              <div className="text-eyebrow text-text-tertiary mb-3">Developers</div>
              {resourcesMenu.developers.map((item) => (
                <Link key={item.name} href={item.href} className="block py-1 text-sm text-text-secondary hover:text-accent">{item.name}</Link>
              ))}
            </div>
          </NavDropdown>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <Button href="#" variant="secondary" surface={darkText ? "light" : "dark"} className="text-xs px-4 py-2">
            Log in
          </Button>
          <Button href="/contact" variant="primary" surface={darkText ? "light" : "dark"} className="text-xs px-4 py-2">
            Contact Sales
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center ${darkText ? "text-text-primary" : "text-white"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>
    </header>

    {/* Mobile overlay — outside <header> to avoid backdrop-filter containing block trap.
        Always mounted; .nav-mobile-overlay handles the slide + visibility. */}
    <div
      data-open={mobileOpen || undefined}
      aria-hidden={!mobileOpen}
      className="nav-mobile-overlay lg:hidden fixed inset-0 top-[56px] bg-bg-dark z-40 overflow-y-auto"
    >
          <div className="px-4 py-6 flex flex-col gap-1">
            {/* Shipping accordion */}
            <button
              className={`flex items-center justify-between w-full py-3 text-base font-medium border-b border-white/10 ${isActive("/shipping") ? "text-accent" : "text-white"}`}
              onClick={() => toggleMobileAccordion("shipping")}
            >
              Shipping
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === "shipping" ? "rotate-180" : ""}`} />
            </button>
            {mobileAccordion === "shipping" && (
              <div className="pl-4 pb-3 space-y-2">
                {shippingMenu.map((item) => (
                  <Link key={item.name} href={item.href} className="block py-1.5 text-sm text-white/70" onClick={() => setMobileOpen(false)}>{item.name}</Link>
                ))}
              </div>
            )}

            {/* Solutions accordion */}
            <button
              className={`flex items-center justify-between w-full py-3 text-base font-medium border-b border-white/10 ${isActive("/solutions") ? "text-accent" : "text-white"}`}
              onClick={() => toggleMobileAccordion("solutions")}
            >
              Solutions
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === "solutions" ? "rotate-180" : ""}`} />
            </button>
            {mobileAccordion === "solutions" && (
              <div className="pl-4 pb-3 space-y-2">
                <div className="text-xs font-semibold uppercase text-white/40 mt-2">By Stage</div>
                {solutionsMenu.byStage.map((item) => (
                  <Link key={item.name} href={item.href} className="block py-1.5 text-sm text-white/70" onClick={() => setMobileOpen(false)}>{item.name}</Link>
                ))}
                <div className="text-xs font-semibold uppercase text-white/40 mt-3">By Business Model</div>
                {solutionsMenu.byModel.map((item) => (
                  <Link key={item.name} href={item.href} className="block py-1.5 text-sm text-white/70" onClick={() => setMobileOpen(false)}>{item.name}</Link>
                ))}
              </div>
            )}

            {/* Platform (Connexx) direct */}
            <Link
              href="/connexx"
              aria-current={isActive("/connexx") ? "page" : undefined}
              className={`py-3 text-base font-medium border-b border-white/10 ${isActive("/connexx") ? "text-accent" : "text-white"}`}
              onClick={() => setMobileOpen(false)}
            >
              Platform
            </Link>

            {/* Integrations accordion */}
            <button
              className={`flex items-center justify-between w-full py-3 text-base font-medium border-b border-white/10 ${isActive("/integrations") ? "text-accent" : "text-white"}`}
              onClick={() => toggleMobileAccordion("integrations")}
            >
              Integrations
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === "integrations" ? "rotate-180" : ""}`} />
            </button>
            {mobileAccordion === "integrations" && (
              <div className="pl-4 pb-3 space-y-2">
                <div className="text-xs font-semibold uppercase text-white/40 mt-2">Tech Integrations</div>
                {integrationsMenu.tech.map((cat) => (
                  <Link key={cat.label} href={cat.href} className="block py-1.5 text-sm text-white/70" onClick={() => setMobileOpen(false)}>{cat.label}</Link>
                ))}
                <div className="text-xs font-semibold uppercase text-white/40 mt-3">Carriers</div>
                {integrationsMenu.carriers.map((c) => (
                  <Link key={c.name} href={c.href} className="flex items-center gap-2 py-1.5 text-sm text-white/70" onClick={() => setMobileOpen(false)}>
                    <IntegrationLogo name={c.name} logo={c.logo} size="xs" />
                    {c.name}
                  </Link>
                ))}
                <Link href="/integrations/carriers" className="text-sm text-accent" onClick={() => setMobileOpen(false)}>See all →</Link>
              </div>
            )}

            {/* Resources accordion */}
            <button
              className={`flex items-center justify-between w-full py-3 text-base font-medium border-b border-white/10 ${isActive("/resources") ? "text-accent" : "text-white"}`}
              onClick={() => toggleMobileAccordion("resources")}
            >
              Resources
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === "resources" ? "rotate-180" : ""}`} />
            </button>
            {mobileAccordion === "resources" && (
              <div className="pl-4 pb-3 space-y-2">
                <div className="text-xs font-semibold uppercase text-white/40 mt-2">Customer Stories</div>
                {resourcesMenu.customerStories.map((item) => (
                  <Link key={item.name} href={item.href} className="block py-1.5 text-sm text-white/70" onClick={() => setMobileOpen(false)}>{item.name}</Link>
                ))}
                <Link href="/resources/case-studies" className="text-sm text-accent" onClick={() => setMobileOpen(false)}>See all →</Link>
                <div className="text-xs font-semibold uppercase text-white/40 mt-3">Knowledge</div>
                {resourcesMenu.knowledge.map((item) => (
                  <Link key={item.name} href={item.href} className="block py-1.5 text-sm text-white/70" onClick={() => setMobileOpen(false)}>{item.name}</Link>
                ))}
                <div className="text-xs font-semibold uppercase text-white/40 mt-3">Support</div>
                {resourcesMenu.support.map((item) => (
                  <Link key={item.name} href={item.href} className="block py-1.5 text-sm text-white/70" onClick={() => setMobileOpen(false)}>{item.name}</Link>
                ))}
                <div className="text-xs font-semibold uppercase text-white/40 mt-3">Developers</div>
                {resourcesMenu.developers.map((item) => (
                  <Link key={item.name} href={item.href} className="block py-1.5 text-sm text-white/70" onClick={() => setMobileOpen(false)}>{item.name}</Link>
                ))}
              </div>
            )}

            {/* Mobile CTAs */}
            <div className="mt-6 flex flex-col gap-3">
              <Button href="#" variant="secondary" surface="dark" className="w-full justify-center">
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
