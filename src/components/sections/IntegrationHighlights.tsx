"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import IntegrationLogo from "@/components/ui/IntegrationLogo";

const techLogos = [
  { name: "Shopify", cat: "eComm", logo: "/logos/ecommerce/shopify_logo.png" },
  { name: "WooCommerce", cat: "eComm", logo: "/logos/erp-wms/woocommerce_logo.svg" },
  { name: "Amazon", cat: "Mktpl", logo: "/logos/marketplaces/amazon-icon.webp" },
  { name: "eBay", cat: "Mktpl", logo: "/logos/marketplaces/ebay-icon.png" },
  { name: "ShipStation", cat: "Logistics", logo: "/logos/erp-wms/shipstation_logo.png" },
  { name: "Linnworks", cat: "ERP", logo: "/logos/erp-wms/linnworks_logo.png" },
  { name: "Etsy", cat: "Mktpl", logo: "/logos/marketplaces/etsy-icon.png" },
  { name: "Veeqo", cat: "ERP", logo: "/logos/erp-wms/veeqo_logo.png" },
  { name: "TikTok Shop", cat: "Mktpl", logo: "/logos/marketplaces/tiktok-tile.png" },
  { name: "Mintsoft", cat: "ERP", logo: "/logos/erp-wms/mintsoft_logo.png" },
];

const carrierLogos = [
  { name: "DHL", region: "International", logo: "/logos/carriers/dhl_logo.webp" },
  { name: "FedEx", region: "International", logo: "/logos/carriers/fedex-icon.png" },
  { name: "UPS", region: "International", logo: "/logos/carriers/ups_logo.png" },
  { name: "Royal Mail", region: "Domestic", logo: "/logos/carriers/royal-mail-icon.png" },
  { name: "DPD", region: "Domestic", logo: "/logos/carriers/DPD-LOGO.png" },
  { name: "Evri", region: "Domestic", logo: "/logos/carriers/evri_logo.png" },
  { name: "Amazon Shipping", region: "Domestic", logo: "/logos/carriers/amazonshipping_logo.png" },
  { name: "InPost", region: "Domestic", logo: "/logos/carriers/inpost-icon.png" },
  { name: "DHL Parcel", region: "Domestic", logo: "/logos/carriers/dhlparcel_logo.svg" },
  { name: "Parcel Force", region: "International", logo: "/logos/carriers/parcel-force.svg" },
];

export default function IntegrationHighlights() {
  const [tab, setTab] = useState<"tech" | "carriers">("tech");

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionLabel
            title="Works with what you already run."
            subtitle="Connexx connects directly to your storefront, your ERP, your WMS, and every active carrier on your account. No CSV exports. No re-keying tracking numbers."
            align="center"
          />
        </ScrollReveal>

        {/* Toggle */}
        <ScrollReveal>
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-bg-secondary rounded-lg p-1 border border-border">
              <button
                onClick={() => setTab("tech")}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-all min-h-[44px] ${
                  tab === "tech" ? "bg-white shadow-sm text-text-primary" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Tech Integrations
              </button>
              <button
                onClick={() => setTab("carriers")}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-all min-h-[44px] ${
                  tab === "carriers" ? "bg-white shadow-sm text-text-primary" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Carriers
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Content */}
        <ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {(tab === "tech" ? techLogos : carrierLogos).map((logo) => (
              <div
                key={logo.name}
                className="card-hover flex flex-col items-center justify-center p-5 rounded-xl border border-border bg-bg-secondary"
              >
                <IntegrationLogo name={logo.name} logo={logo.logo} size="sm" className="mb-3" />
                <span className="text-sm font-medium text-text-primary text-center">{logo.name}</span>
                <span className="text-[10px] text-text-tertiary">
                  {"region" in logo ? logo.region : logo.cat}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-8 text-center">
          <Link href="/integrations/carriers" className="link-underline text-sm text-accent font-medium">
            Browse integrations →
          </Link>
        </div>
      </div>
    </section>
  );
}
