import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Building2,
  Container,
  Globe,
  LifeBuoy,
  PackageCheck,
  Plug,
  Store,
  Truck,
  Users,
} from "lucide-react";
import { RATE_CHECKER_URL } from "@/lib/site-config";
import { caseStudies } from "@/lib/data";

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
export type NavCtaLabel = "Get Quote" | "Learn More" | "Explore" | "Contact Sales";

export interface NavItem {
  name: string;
  /** Optional supporting line; the Shipping menu omits it so its cards show icon + name only. */
  desc?: string;
  href: string;
  logo?: string;
  /** Railless menus: an accent icon chip in place of a logo (visual anchor). */
  icon?: LucideIcon;
  /** Railless menus: a photo that fills the square tile (icon + name overlay). */
  image?: { src: string; alt: string };
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
  /** Dense 3-column logo + name list, no descriptions (fits all carriers). */
  compact?: boolean;
}

export type NavPromoArt =
  | { kind: "image"; src: string; alt: string; width: number; height: number }
  // A looping, muted feature animation in place of a still. Reuses the rendered
  // connexx-*.{mp4,webm} clips (poster = the still frame). AutoplayVideo honours
  // reduced-motion; the panel body only mounts on open, so nothing loads until
  // the menu is opened.
  | { kind: "video"; mp4: string; webm?: string; poster: string; alt: string; width: number; height: number }
  | { kind: "icon"; icon: LucideIcon }
  | { kind: "logos"; logos: { name: string; logo: string }[] };

export interface NavPromo {
  title: string;
  body: string;
  cta: { label: NavCtaLabel; href: string };
  art: NavPromoArt;
  tone: "light" | "navy";
}

/** One slide of the rotating customer-story promo (NavStoriesCard). */
export interface NavStory {
  slug: string;
  brand: string;
  result: string;
  blurb: string;
  logo?: string;
  image: string;
  imageAlt: string;
}

export interface NavMenu {
  id: NavMenuId;
  label: string;
  /** Route prefixes that mark this section as the current one. */
  sectionBases: string[];
  /** `eyebrow` is the rail's accessible name only — it is not rendered. */
  rail?: { eyebrow: string; defaultGroupId: string; groups: NavGroup[] };
  /** Railless menus list their items directly. */
  items?: NavItem[];
  /** Grid columns for railless menus (default 2). */
  columns?: 2 | 3;
  /** Railless menus: a small carrier-logo proof strip under the item grid. */
  proofLogos?: { name: string; logo: string }[];
  footerLink?: NavFooterLink;
  /** The right-hand promo card. A menu carries this or `stories`, not both. */
  promo?: NavPromo;
  /** Rotating case-study click-throughs in place of the promo card. */
  stories?: NavStory[];
}

const CARRIERS: NavItem[] = [
  // Every carrier on /integrations/carriers, logos as in src/lib/data.ts.
  { name: "Evri", href: "/integrations/carriers/evri", logo: "/logos/carriers/evri_logo-fill.png" },
  { name: "Royal Mail", href: "/integrations/carriers/royal-mail", logo: "/logos/carriers/royal-mail-icon-fill.png" },
  { name: "DPD", href: "/integrations/carriers/dpd", logo: "/logos/carriers/DPD-LOGO.png" },
  { name: "InPost", href: "/integrations/carriers/inpost", logo: "/logos/carriers/inpost-icon.png" },
  { name: "Parcel Force", href: "/integrations/carriers/parcel-force", logo: "/logos/carriers/parcel-force.svg" },
  { name: "Amazon Shipping", href: "/integrations/carriers/amazon-shipping", logo: "/logos/carriers/amazonshipping_logo-fill.png" },
  { name: "DHL", href: "/integrations/carriers/dhl", logo: "/logos/carriers/dhl_logo-fill.png" },
  { name: "DHL Parcel", href: "/integrations/carriers/dhl-parcel", logo: "/logos/carriers/dhlparcel_logo.svg" },
  { name: "FedEx", href: "/integrations/carriers/fedex", logo: "/logos/carriers/fedex-icon-fill.png" },
  { name: "UPS", href: "/integrations/carriers/ups", logo: "/logos/carriers/ups_logo-fill.png" },
  { name: "APC", href: "/integrations/carriers/apc", logo: "/logos/carriers/apc_logo.png" },
  { name: "Evri EU", href: "/integrations/carriers/evri-eu", logo: "/logos/carriers/evrieu_logo-fill.png" },
  { name: "TNT", href: "/integrations/carriers/tnt", logo: "/logos/carriers/tnt-icon.png" },
  { name: "Deutsche Post", href: "/integrations/carriers/deutsche-post", logo: "/logos/carriers/deutschepost_logo.avif" },
  { name: "Landmark", href: "/integrations/carriers/landmark", logo: "/logos/carriers/landmark-icon.svg" },
  { name: "Starlinks", href: "/integrations/carriers/starlinks", logo: "/logos/carriers/starlinks_logo-fill.png" },
];

/** The Integrations menu's rotating customer-story slides, sourced from the
 *  case-study library so copy stays in sync with /resources/case-studies. */
const NAV_STORY_SLUGS = ["west-ham-united", "home-bargains", "tatti-lashes", "sifcon-international"];
const NAV_STORIES: NavStory[] = NAV_STORY_SLUGS.flatMap((slug) => {
  const cs = caseStudies.find((c) => c.slug === slug);
  // Every slide shows the story's hero image, so a story without one is skipped.
  return cs?.heroImage
    ? [{
        slug,
        brand: cs.brandName,
        result: cs.headlineResult ?? cs.metric,
        blurb: cs.oneLiner ?? cs.summary,
        logo: cs.logo,
        image: cs.heroImage,
        imageAlt: cs.heroImageAlt ?? `${cs.brandName} case study`,
      }]
    : [];
});

export const NAV_MENUS: readonly NavMenu[] = [
  {
    id: "shipping",
    label: "Shipping",
    sectionBases: ["/shipping"],
    columns: 3,
    items: [
      { name: "Domestic", href: "/shipping/domestic", icon: PackageCheck, image: { src: "/shipping/domestic.webp", alt: "Royal Mail truck reversing into a UK warehouse loading bay" } },
      { name: "International", href: "/shipping/international", icon: Globe, image: { src: "/shipping/international.jpg", alt: "Air freight pallets being loaded onto a wide-body aircraft" } },
      { name: "Freight", href: "/shipping/freight", icon: Container, image: { src: "/shipping/freight-hero.webp", alt: "Container ship laden with freight containers at sea" } },
    ],
    proofLogos: CARRIERS.slice(0, 8).map((c) => ({ name: c.name, logo: c.logo! })),
    footerLink: { label: "Explore", href: "/shipping" },
    promo: {
      title: "Time to put your rates to the test 🚚",
      body: "Live prices across the UK's biggest carrier network.",
      cta: { label: "Get Quote", href: RATE_CHECKER_URL },
      // The Rate Checker walkthrough (claude.ai design project, scenes-rate-checker),
      // rendered with the connexx-* pipeline and cropped to the white panel.
      art: {
        kind: "video",
        mp4: "/media/connexx-rate-checker.mp4",
        webm: "/media/connexx-rate-checker.webm",
        poster: "/media/connexx-rate-checker-poster.jpg",
        alt: "Rate checker walkthrough: three quick questions, then your estimated saving",
        width: 768,
        height: 468,
      },
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
      title: "The engine behind 17.5m labels a year",
      body: "Every order routed to the best-value carrier, labelled in seconds, tracked and cleared in one place.",
      cta: { label: "Explore", href: "/connexx" },
      art: {
        kind: "video",
        mp4: "/media/connexx-ecommerce.mp4",
        webm: "/media/connexx-ecommerce.webm",
        poster: "/media/connexx-ecommerce-poster.jpg",
        alt: "Connexx routing orders from Shopify, Amazon, eBay and Veeqo to the best-value carrier.",
        width: 1200,
        height: 730,
      },
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
          compact: true,
          footerLink: { label: "Browse carriers", href: "/integrations/carriers" },
        },
      ],
    },
    stories: NAV_STORIES,
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
