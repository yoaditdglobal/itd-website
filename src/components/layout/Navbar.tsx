"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import IntegrationLogo from "@/components/ui/IntegrationLogo";

const solutionsMenu = {
  byStage: [
    { name: "Enterprise", desc: "Scale logistics across global operations", href: "/solutions/enterprise" },
    { name: "Small Business", desc: "Ship smarter from day one", href: "/solutions/small-business" },
  ],
  byModel: [
    { name: "eCommerce", desc: "Multi-carrier shipping for online stores", href: "/solutions/ecommerce" },
    { name: "Marketplace Seller", desc: "Unified fulfilment across platforms", href: "/solutions/marketplace-seller" },
    { name: "3PL", desc: "Multi-client logistics automation", href: "/solutions/3pl" },
    { name: "Export", desc: "Compliance and documentation", href: "/solutions/export" },
    { name: "Import", desc: "Customs and clearance automation", href: "/solutions/import" },
    { name: "B2B Manufacture / Wholesale", desc: "ERP-connected dispatch", href: "/solutions/b2b" },
  ],
};

const integrationsMenu = {
  tech: [
    { label: "ERP / WMS", href: "/integrations/erp-wms", names: "SAP, NetSuite, Dynamics" },
    { label: "Logistics", href: "/integrations/logistics", names: "ShipStation, Shippo, Project44" },
    { label: "eCommerce", href: "/integrations/ecommerce", names: "Shopify, WooCommerce, Magento" },
    { label: "Marketplaces", href: "/integrations/marketplaces", names: "Amazon, eBay, Etsy" },
  ],
  carriers: [
    { name: "Evri", desc: "UK parcel delivery", href: "/integrations/carriers/evri", logo: "/logos/carriers/evri_logo.png" },
    { name: "Royal Mail", desc: "UK postal service", href: "/integrations/carriers/royal-mail", logo: "/logos/carriers/royalmail_logo.png" },
    { name: "DPD", desc: "European parcel delivery", href: "/integrations/carriers/dpd", logo: "/logos/carriers/dpd_logo.png" },
    { name: "Amazon Shipping", desc: "Amazon logistics network", href: "/integrations/carriers/amazon-shipping", logo: "/logos/carriers/amazonshipping_logo.png" },
    { name: "DHL", desc: "Global express & freight", href: "/integrations/carriers/dhl", logo: "/logos/carriers/dhl_logo.webp" },
  ],
};

const resourcesMenu = {
  caseStudies: ["eCommerce", "Marketplace", "3PL", "Export", "Import"],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Submit a Request", href: "#" },
    { name: "Getting Started", href: "#" },
  ],
  developers: [
    { name: "Documentation", href: "#" },
    { name: "API Support", href: "#" },
    { name: "Status", href: "#" },
  ],
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const toggleMobileAccordion = (section: string) => {
    setMobileAccordion(mobileAccordion === section ? null : section);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg-dark/95 backdrop-blur-md py-2 shadow-lg"
          : "bg-bg-dark py-4"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-white font-bold text-lg tracking-tight flex-shrink-0">
          ITD Global
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1 ml-8 flex-1 min-w-0">
          {/* Solutions */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("solutions")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="flex items-center gap-1 px-3 py-2 text-sm text-white/70 hover:text-white transition-colors">
              Solutions <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {openDropdown === "solutions" && (
              <div className="absolute top-full left-0 mt-1 w-[520px] bg-white rounded-xl shadow-2xl border border-border p-6 grid grid-cols-2 gap-6">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary mb-3">By Stage</div>
                  {solutionsMenu.byStage.map((item) => (
                    <Link key={item.name} href={item.href} className="block py-2 group">
                      <div className="text-sm font-medium text-text-primary group-hover:text-accent">{item.name}</div>
                      <div className="text-xs text-text-secondary">{item.desc}</div>
                    </Link>
                  ))}
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary mb-3">By Business Model</div>
                  {solutionsMenu.byModel.map((item) => (
                    <Link key={item.name} href={item.href} className="block py-1.5 group">
                      <div className="text-sm font-medium text-text-primary group-hover:text-accent">{item.name}</div>
                      <div className="text-xs text-text-secondary">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Connexx — direct link */}
          <Link href="/connexx" className="px-3 py-2 text-sm text-white/70 hover:text-white transition-colors">
            Connexx
          </Link>

          {/* Integrations */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("integrations")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="flex items-center gap-1 px-3 py-2 text-sm text-white/70 hover:text-white transition-colors">
              Integrations <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {openDropdown === "integrations" && (
              <div className="absolute top-full left-0 mt-1 w-[460px] bg-white rounded-xl shadow-2xl border border-border p-6 grid grid-cols-2 gap-6">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary mb-3">Tech Integrations</div>
                  {integrationsMenu.tech.map((cat) => (
                    <Link key={cat.label} href={cat.href} className="block py-2 group">
                      <div className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">{cat.label}</div>
                      <div className="text-xs text-text-secondary">{cat.names}</div>
                    </Link>
                  ))}
                  <Link href="/integrations" className="text-xs text-accent hover:underline mt-1 inline-block">See all integrations →</Link>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary mb-3">Carrier Integrations</div>
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
                  <Link href="/integrations" className="text-xs text-accent hover:underline mt-3 inline-block">See all carriers →</Link>
                </div>
              </div>
            )}
          </div>

          {/* Resources */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("resources")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="flex items-center gap-1 px-3 py-2 text-sm text-white/70 hover:text-white transition-colors">
              Resources <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {openDropdown === "resources" && (
              <div className="absolute top-full right-0 mt-1 w-[520px] bg-white rounded-xl shadow-2xl border border-border p-6 grid grid-cols-3 gap-6">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary mb-3">Case Studies</div>
                  {resourcesMenu.caseStudies.map((ind) => (
                    <Link key={ind} href="/resources/case-studies" className="block py-1 text-sm text-text-secondary hover:text-accent">{ind}</Link>
                  ))}
                  <Link href="/resources/case-studies" className="text-xs text-accent hover:underline mt-2 inline-block">See all →</Link>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary mb-3">Support</div>
                  {resourcesMenu.support.map((item) => (
                    <Link key={item.name} href={item.href} className="block py-1 text-sm text-text-secondary hover:text-accent">{item.name}</Link>
                  ))}
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary mb-3">Developers</div>
                  {resourcesMenu.developers.map((item) => (
                    <Link key={item.name} href={item.href} className="block py-1 text-sm text-text-secondary hover:text-accent">{item.name}</Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <Button href="#" variant="secondary" surface="dark" className="text-xs px-4 py-2">
            Log in
          </Button>
          <Button href="/contact" variant="primary" surface="dark" className="text-xs px-4 py-2">
            Contact Sales
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[56px] bg-bg-dark z-40 overflow-y-auto">
          <div className="px-4 py-6 flex flex-col gap-1">
            {/* Solutions accordion */}
            <button
              className="flex items-center justify-between w-full py-3 text-white text-base font-medium border-b border-white/10"
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

            {/* Connexx direct */}
            <Link
              href="/connexx"
              className="py-3 text-white text-base font-medium border-b border-white/10"
              onClick={() => setMobileOpen(false)}
            >
              Connexx
            </Link>

            {/* Integrations accordion */}
            <button
              className="flex items-center justify-between w-full py-3 text-white text-base font-medium border-b border-white/10"
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
                <Link href="/integrations" className="text-sm text-accent" onClick={() => setMobileOpen(false)}>See all →</Link>
              </div>
            )}

            {/* Resources accordion */}
            <button
              className="flex items-center justify-between w-full py-3 text-white text-base font-medium border-b border-white/10"
              onClick={() => toggleMobileAccordion("resources")}
            >
              Resources
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === "resources" ? "rotate-180" : ""}`} />
            </button>
            {mobileAccordion === "resources" && (
              <div className="pl-4 pb-3 space-y-2">
                <Link href="/resources/case-studies" className="block py-1.5 text-sm text-white/70" onClick={() => setMobileOpen(false)}>Case Studies</Link>
                {resourcesMenu.support.map((item) => (
                  <Link key={item.name} href={item.href} className="block py-1.5 text-sm text-white/70" onClick={() => setMobileOpen(false)}>{item.name}</Link>
                ))}
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
      )}
    </header>
  );
}
