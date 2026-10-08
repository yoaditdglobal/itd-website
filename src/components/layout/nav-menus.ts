import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Building2,
  Calculator,
  LifeBuoy,
  Plug,
  Store,
  Truck,
  Users,
} from "lucide-react";
import { RATE_CHECKER_URL } from "@/lib/site-config";

/**
 * The site's four mega menus, as data. `Navbar` renders the desktop panel
 * (`MegaPanel`) and the mobile accordion (`MobileNavMenu`) from this one
 * config, so adding a link or changing a description happens here only.
 *
 * Shape: an optional left RAIL of selectable groups (each with its own item
 * grid), or a flat `items` list for railless menus, plus the right-hand PROMO
 * card. CTA labels are restricted to the site vocabulary by type.
 */

export type NavMenuId = "shipping" | "solutions" | "integrations" | "resources";
export type NavCtaLabel = "Get Quote" | "Learn More" | "Explore" | "Contact Us";

export interface NavItem {
  name: string;
  desc: string;
  href: string;
  logo?: string;
}

export interface NavFooterLink {
  label: string;
  href: string;
}

export interface NavGroup {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  items: NavItem[];
  footerLink?: NavFooterLink;
}

export type NavPromoArt =
  | { kind: "image"; src: string; alt: string; width: number; height: number }
  | { kind: "icon"; icon: LucideIcon }
  | { kind: "logos"; logos: { name: string; logo: string }[] };

export interface NavPromo {
  eyebrow: string;
  title: string;
  body: string;
  cta: { label: NavCtaLabel; href: string };
  art: NavPromoArt;
  tone: "light" | "navy";
}

export interface NavMenu {
  id: NavMenuId;
  label: string;
  /** Route prefixes that mark this section as the current one. */
  sectionBases: string[];
  rail?: { eyebrow: string; defaultGroupId: string; groups: NavGroup[] };
  /** Railless menus list their items directly. */
  items?: NavItem[];
  /** Grid columns for railless menus (default 2). */
  columns?: 2 | 3;
  footerLink?: NavFooterLink;
  promo: NavPromo;
}

const CARRIERS: NavItem[] = [
  { name: "Evri", desc: "High-volume residential parcel delivery across the full UK network", href: "/integrations/carriers/evri", logo: "/logos/carriers/evri_logo.png" },
  { name: "Royal Mail", desc: "The UK's national postal network, reaching every address in the country", href: "/integrations/carriers/royal-mail", logo: "/logos/carriers/royal-mail-icon.png" },
  { name: "DPD", desc: "Precise tracked delivery across the UK and into Europe, with one-hour windows", href: "/integrations/carriers/dpd", logo: "/logos/carriers/DPD-LOGO.png" },
  { name: "InPost", desc: "The UK's largest parcel locker network, open 24 hours a day", href: "/integrations/carriers/inpost", logo: "/logos/carriers/inpost-icon.png" },
  { name: "Parcel Force", desc: "Guaranteed timed delivery across the UK, with international services", href: "/integrations/carriers/parcel-force", logo: "/logos/carriers/parcel-force.svg" },
  { name: "Amazon Shipping", desc: "Amazon's own delivery network, for shipments beyond the Amazon platform", href: "/integrations/carriers/amazon-shipping", logo: "/logos/carriers/amazonshipping_logo.png" },
  { name: "DHL", desc: "The leading international express courier, to over 220 countries", href: "/integrations/carriers/dhl", logo: "/logos/carriers/dhl_logo.webp" },
];

export const NAV_MENUS: readonly NavMenu[] = [
  {
    id: "shipping",
    label: "Shipping",
    sectionBases: ["/shipping"],
    columns: 3,
    items: [
      { name: "Domestic", desc: "Royal Mail, DPD, Evri, InPost and more on every UK order, from one dashboard", href: "/shipping/domestic" },
      { name: "International", desc: "EU and worldwide, with HS codes, IOSS and customs paperwork generated automatically", href: "/shipping/international" },
      { name: "Freight", desc: "UK pallet networks, EU lanes and worldwide LCL/FCL with live rates", href: "/shipping/freight" },
    ],
    footerLink: { label: "Explore all shipping", href: "/shipping" },
    promo: {
      eyebrow: "Rate checker",
      title: "Compare carrier rates before you ship",
      body: "Live prices across the UK's biggest carrier network, no account needed.",
      cta: { label: "Get Quote", href: RATE_CHECKER_URL },
      art: { kind: "icon", icon: Calculator },
      tone: "light",
    },
  },
  {
    id: "solutions",
    label: "Solutions",
    sectionBases: ["/solutions"],
    rail: {
      eyebrow: "Who we help",
      defaultGroupId: "by-model",
      groups: [
        {
          id: "by-model",
          title: "By business model",
          description: "Shipping built around how you sell: online stores, marketplaces, 3PL, import, export and B2B.",
          icon: Store,
          items: [
            { name: "eCommerce", desc: "Route every order through the cheapest compliant carrier and give shoppers more delivery choice", href: "/solutions/ecommerce" },
            { name: "Marketplace Seller", desc: "One dispatch queue for Amazon, eBay, Etsy and TikTok Shop with SLA-aware routing", href: "/solutions/marketplace-seller" },
            { name: "3PL", desc: "Multi-client accounts, per-brand carrier rules and customs automation", href: "/solutions/3pl" },
            { name: "Export", desc: "Parcel delivery to 152 countries with export customs and DDP handled", href: "/solutions/export" },
            { name: "Import", desc: "Imports from the Far East and worldwide with in-house customs clearance", href: "/solutions/import" },
            { name: "B2B", desc: "The right carrier and service for every heavy, timed or high-value consignment", href: "/solutions/b2b" },
          ],
        },
        {
          id: "by-stage",
          title: "By stage",
          description: "From the first Shopify order to enterprise volume across global operations.",
          icon: Building2,
          items: [
            { name: "Enterprise", desc: "Pooled volume for rates and capacity your own contracts can't reach", href: "/solutions/enterprise" },
            { name: "SMEs", desc: "Royal Mail, Evri and DPD from one screen, no minimums, live in minutes", href: "/solutions/small-business" },
            { name: "Brands", desc: "Delivery choice at checkout with pricing that protects your margin", href: "/solutions/brands" },
          ],
        },
      ],
    },
    promo: {
      eyebrow: "Connexx platform",
      title: "The engine behind 17.5m labels a year",
      body: "Every order routed to the best-value carrier, labelled in seconds, tracked and cleared in one place.",
      cta: { label: "Explore", href: "/connexx" },
      art: { kind: "image", src: "/media/connexx-ecommerce-poster.jpg", alt: "", width: 1200, height: 730 },
      tone: "light",
    },
  },
  {
    id: "integrations",
    label: "Integrations",
    sectionBases: ["/integrations"],
    rail: {
      eyebrow: "What connects",
      defaultGroupId: "tech",
      groups: [
        {
          id: "tech",
          title: "Tech integrations",
          description: "The ERP, WMS, store and marketplace tools you already run.",
          icon: Plug,
          items: [
            { name: "ERP / WMS", desc: "NetSuite, Linnworks, Mintsoft and Magento: orders in, tracking written back", href: "/integrations/erp-wms" },
            { name: "eCommerce & Logistics", desc: "Shopify, WooCommerce, Veeqo and ShipStation shipping on our carrier rates", href: "/integrations/ecommerce-logistics" },
            { name: "Marketplaces", desc: "Amazon, eBay, Etsy, Temu and TikTok Shop orders in one queue", href: "/integrations/marketplaces" },
          ],
          footerLink: { label: "Browse all integrations", href: "/integrations/tech" },
        },
        {
          id: "carriers",
          title: "Carriers",
          description: "Domestic and international carriers through one connection.",
          icon: Truck,
          items: CARRIERS,
          footerLink: { label: "Browse carriers", href: "/integrations/carriers" },
        },
      ],
    },
    promo: {
      eyebrow: "Carrier network",
      title: "One connection to an entire carrier network",
      body: "Royal Mail, Evri, DPD, InPost, DHL and more, live from day one with no carrier accounts to set up.",
      cta: { label: "Explore", href: "/integrations/carriers" },
      art: { kind: "logos", logos: CARRIERS.slice(0, 5).map((c) => ({ name: c.name, logo: c.logo! })) },
      tone: "light",
    },
  },
  {
    id: "resources",
    label: "Resources",
    sectionBases: ["/resources", "/peak", "/help", "/track"],
    rail: {
      eyebrow: "Resources",
      defaultGroupId: "stories",
      groups: [
        {
          id: "stories",
          title: "Customer stories",
          description: "How UK businesses cut cost, went international and won new business with ITD.",
          icon: Users,
          items: [
            { name: "eCommerce", desc: "Retailers cutting cost per parcel and delivery times", href: "/resources/case-studies?solution=ecommerce" },
            { name: "3PL", desc: "Warehouses onboarding clients in days, not weeks", href: "/resources/case-studies?solution=3pl" },
            { name: "B2B", desc: "Wholesale deliveries landing on time, every time", href: "/resources/case-studies?solution=b2b" },
            { name: "Import", desc: "Inbound customs handled in-house", href: "/resources/case-studies?solution=import" },
            { name: "Export", desc: "Brands going international with confidence", href: "/resources/case-studies?solution=export" },
            { name: "Freight", desc: "Pallets and bulk moved on better rates", href: "/resources/case-studies?solution=freight" },
          ],
          footerLink: { label: "See all stories", href: "/resources/case-studies" },
        },
        {
          id: "knowledge",
          title: "Knowledge",
          description: "Guides, data and definitions written for operators.",
          icon: BookOpen,
          items: [
            { name: "Guides", desc: "Operator guides for UK shippers, importers and marketplace sellers", href: "/resources/guides" },
            { name: "Peak report", desc: "Real parcel data across ITD's customers: when volume lands and how to plan", href: "/peak" },
            { name: "Glossary", desc: "Plain-English definitions of logistics, customs and marketplace terms", href: "/resources/glossary" },
          ],
        },
        {
          id: "support",
          title: "Support",
          description: "Help Centre, tickets and shipment tracking.",
          icon: LifeBuoy,
          items: [
            { name: "Help Centre", desc: "Walkthroughs for Connexx, integrations, carriers, billing and account admin", href: "/help" },
            { name: "Submit a request", desc: "Raise a ticket with the support team", href: "https://support.itdglobal.com/hc/en-gb/requests/new" },
            { name: "Track Shipment", desc: "Enter a tracking number and go straight to the carrier's live tracking", href: "/track" },
          ],
        },
      ],
    },
    promo: {
      eyebrow: "Peak planning",
      title: "Know what peak will throw at you",
      body: "Real parcel data across ITD's customers. See when volume lands and plan your courier mix.",
      cta: { label: "Explore", href: "/peak" },
      art: { kind: "image", src: "/reports/peak/peak-report-2026-cover.png", alt: "", width: 1754, height: 1240 },
      tone: "navy",
    },
  },
];

export function isSectionActive(menu: NavMenu, pathname: string): boolean {
  return menu.sectionBases.some((b) => pathname === b || pathname.startsWith(`${b}/`));
}
