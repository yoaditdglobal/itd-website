"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import IntegrationLogo from "@/components/ui/IntegrationLogo";

// `href` points each card at its dedicated detail page. Explicit (not runtime
// slugify) so it can't drift from the real slug/overrides in data.ts.
// `cat` is a short, accurate role label — matches each tool's data.ts
// description (no abbreviations: "eComm"/"Mktpl" read as unfinished).
const techLogos = [
  { name: "Shopify", cat: "eCommerce", logo: "/logos/ecommerce/shopify_logo-fill.png", href: "/integrations/tech/shopify" },
  { name: "WooCommerce", cat: "eCommerce", logo: "/logos/erp-wms/woocommerce_logo-fill.png", href: "/integrations/tech/woocommerce" },
  { name: "Amazon", cat: "Marketplace", logo: "/logos/marketplaces/amazon-icon-fill.png", href: "/integrations/tech/amazon" },
  { name: "eBay", cat: "Marketplace", logo: "/logos/marketplaces/ebay-icon-fill.png", href: "/integrations/tech/ebay" },
  { name: "ShipStation", cat: "Shipping", logo: "/logos/erp-wms/shipstation_logo-fill.png", href: "/integrations/tech/shipstation" },
  { name: "Linnworks", cat: "Order management", logo: "/logos/erp-wms/linnworks_logo.png", href: "/integrations/tech/linnworks" },
  { name: "Etsy", cat: "Marketplace", logo: "/logos/marketplaces/etsy-icon-fill.png", href: "/integrations/tech/etsy" },
  { name: "Veeqo", cat: "Shipping", logo: "/logos/ecommerce/veeqo-icon-fill.png", href: "/integrations/tech/veeqo" },
  { name: "TikTok Shop", cat: "Marketplace", logo: "/logos/marketplaces/tiktok-tile.png", href: "/integrations/tech/tiktok-shop" },
  { name: "Mintsoft", cat: "WMS", logo: "/logos/ecommerce/mintsoft-icon-fill.png", href: "/integrations/tech/mintsoft" },
];

const carrierLogos = [
  { name: "DHL", region: "International", logo: "/logos/carriers/dhl_logo-fill.png", href: "/integrations/carriers/dhl" },
  { name: "FedEx", region: "International", logo: "/logos/carriers/fedex-icon-fill.png", href: "/integrations/carriers/fedex" },
  { name: "UPS", region: "International", logo: "/logos/carriers/ups_logo-fill.png", href: "/integrations/carriers/ups" },
  { name: "Royal Mail", region: "Domestic", logo: "/logos/carriers/royal-mail-icon-fill.png", href: "/integrations/carriers/royal-mail" },
  { name: "DPD", region: "Domestic", logo: "/logos/carriers/DPD-LOGO.png", href: "/integrations/carriers/dpd" },
  { name: "Evri", region: "Domestic", logo: "/logos/carriers/evri_logo-fill.png", href: "/integrations/carriers/evri" },
  { name: "Amazon Shipping", region: "Domestic", logo: "/logos/carriers/amazonshipping_logo-fill.png", href: "/integrations/carriers/amazon-shipping" },
  { name: "InPost", region: "Domestic", logo: "/logos/carriers/inpost-icon.png", href: "/integrations/carriers/inpost" },
  { name: "DHL Parcel", region: "Domestic", logo: "/logos/carriers/dhlparcel_logo.svg", href: "/integrations/carriers/dhl-parcel" },
  { name: "Parcel Force", region: "International", logo: "/logos/carriers/parcel-force.svg", href: "/integrations/carriers/parcel-force" },
];

export default function IntegrationHighlights() {
  const [tab, setTab] = useState<"tech" | "carriers">("tech");

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionLabel
            title="Works with your active workflows"
            subtitle="We integrate directly with your store, your ERP, your WMS, and the active carriers on your account."
            align="center"
          />
        </ScrollReveal>

        {/* Toggle */}
        <ScrollReveal>
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-full border border-border bg-bg-secondary p-1">
              {([
                ["tech", "Tech Integrations"],
                ["carriers", "Carriers"],
              ] as const).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  aria-pressed={tab === id}
                  className={`min-h-[44px] rounded-full px-6 text-sm font-medium transition-[background-color,color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                    tab === id
                      ? "bg-white text-text-primary shadow-[0_1px_3px_rgb(15_23_42/0.1)]"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Content — BOTH grids stay mounted and toggle via CSS so the
            inactive tab's logos are already fetched/decoded when the user
            switches (a conditional render made every carrier icon start
            loading only at click time — visible pop-in on mobile). */}
        <ScrollReveal>
          {(["tech", "carriers"] as const).map((t) => (
            <div
              key={t}
              className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 ${
                tab === t ? "" : "hidden"
              }`}
            >
              {(t === "tech" ? techLogos : carrierLogos).map((logo) => (
                <Link
                  key={logo.name}
                  href={logo.href}
                  className="group card-hover flex flex-col items-center justify-center rounded-2xl border border-border bg-white px-4 py-6 hover:border-accent/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                >
                  <IntegrationLogo
                    name={logo.name}
                    logo={logo.logo}
                    size="sm"
                    className="mb-3 shadow-[0_1px_2px_rgb(15_23_42/0.08)] ring-1 ring-black/5 transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
                  />
                  <span className="text-sm font-medium text-text-primary text-center transition-colors group-hover:text-accent">{logo.name}</span>
                  <span className="mt-0.5 text-caption text-text-tertiary">
                    {"region" in logo ? logo.region : logo.cat}
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </ScrollReveal>

        <div className="mt-8 text-center">
          {/* Destination follows the active toggle: tech hub vs carriers directory. */}
          <Link
            href={tab === "tech" ? "/integrations/tech" : "/integrations/carriers"}
            className="link-underline gap-1 text-sm text-accent font-medium"
          >
            Browse integrations <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
