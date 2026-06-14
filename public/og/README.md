# OG image briefing

Open Graph (OG) images are what appears when a page is shared on LinkedIn, X, Slack, WhatsApp, iMessage, etc. They also affect click-through from search results and from AI-generated answers that include rich previews.

This directory is the canonical home for all OG images on the site. Every page registered in `src/lib/site-config.ts` should have a matching image file here.

---

## Spec — every OG image

| Attribute | Value |
|---|---|
| Dimensions | 1200 × 630 px (Facebook/LinkedIn standard, works for X, Slack, iMessage) |
| Format | PNG preferred (or JPG if file size matters). Avoid WebP — some social platforms still won't render it. |
| File size | Under 1 MB. Aim for 200-500 KB. |
| Aspect ratio | 1.91:1 (don't crop, don't pad) |
| Safe zone | Keep critical text inside the centre 1000 × 500 px — some platforms crop edges |
| Text legibility | Minimum 36px at 1200 × 630. Test at thumbnail size (300 × 157) |
| Colour mode | sRGB |

---

## Brand template — apply to every image

| Element | Spec |
|---|---|
| Background | Dark slate (#0f1729 — the site's bg-dark) or off-white with subtle texture |
| Logo | ITD Global wordmark, top-left, 32-40px tall, 40px from corners |
| Headline text | Inter Bold, white (on dark bg) or near-black (on light bg). 56-72px depending on length |
| Sub-headline | Inter Regular, opacity 0.75 of headline colour. 28-32px |
| Accent | Single accent block, line, or shape using the brand cyan (hsl(182,96%,33%)). Geometric, no decorative noise |
| Bottom-right | Page URL slug (e.g. `itdglobal.com/solutions/ecommerce`) in 18px Inter Regular, opacity 0.5 |

---

## Image inventory — one per page

The site has 28 pages registered in `src/lib/site-config.ts`. Each needs an OG image. File naming follows the URL slug.

### Priority 1 — must ship at launch (10 files)

| URL | File | Headline (suggested) | Notes |
|---|---|---|---|
| `/` (home) | `og/default.png` | "Multi-carrier shipping. Customs automation. One platform." | Default fallback — used by any page without an explicit OG image |
| `/connexx` | `og/connexx.png` | "Connexx — One platform. Every shipment." | Hero product page. Use dashboard visual or stat bar |
| `/solutions/ecommerce` | `og/solutions-ecommerce.png` | "Multi-carrier shipping for eCommerce" | Subhead: "Stop losing margin on dispatch." |
| `/solutions/marketplace-seller` | `og/solutions-marketplace-seller.png` | "Penalty-fee-free Amazon and eBay dispatch" | |
| `/solutions/3pl` | `og/solutions-3pl.png` | "Multi-client shipping for 3PLs" | Subhead: "Onboard clients in 2 days, not 2 weeks." |
| `/solutions/enterprise` | `og/solutions-enterprise.png` | "Carrier consolidation for enterprise shippers" | |
| `/solutions/small-business` | `og/solutions-small-business.png` | "Every UK carrier in one platform" | Subhead: "No contracts. No minimums." |
| `/shipping/domestic` | `og/shipping-domestic.png` | "UK domestic shipping across every postcode" | |
| `/shipping/international` | `og/shipping-international.png` | "International shipping with automated customs" | |
| `/integrations` | `og/integrations.png` | "Works with what you already run" | Logo grid background (Shopify, NetSuite, Amazon, etc.) |

### Priority 2 — ship soon (10 files)

| URL | File | Headline (suggested) |
|---|---|---|
| `/solutions/b2b` | `og/solutions-b2b.png` | "ERP-connected B2B dispatch" |
| `/solutions/export` | `og/solutions-export.png` | "Export customs automation" |
| `/solutions/import` | `og/solutions-import.png` | "Pre-clearance and landed cost for UK imports" |
| `/shipping/freight` | `og/shipping-freight.png` | "UK and EU freight from one platform" |
| `/integrations/erp-wms` | `og/integrations-erp-wms.png` | "ERP and WMS shipping integrations" |
| `/integrations/ecommerce` | `og/integrations-ecommerce.png` | "eCommerce platform integrations" |
| `/integrations/logistics` | `og/integrations-logistics.png` | "Logistics stack integrations" |
| `/integrations/marketplaces` | `og/integrations-marketplaces.png` | "Marketplace integrations" |
| `/resources/case-studies` | `og/resources-case-studies.png` | "Customer stories" |
| `/contact` | `og/contact.png` | "Talk to ITD Global sales" |

### Priority 3 — case study + carrier detail pages (11 files)

| URL | File | Headline source |
|---|---|---|
| `/integrations/carriers/royal-mail` | `og/carriers-royal-mail.png` | "Royal Mail integration" |
| `/integrations/carriers/dpd` | `og/carriers-dpd.png` | "DPD integration" |
| `/integrations/carriers/evri` | `og/carriers-evri.png` | "Evri integration" |
| `/integrations/carriers/dhl` | `og/carriers-dhl.png` | "DHL Express integration" |
| `/integrations/carriers/amazon-shipping` | `og/carriers-amazon-shipping.png` | "Amazon Shipping integration" |
| `/resources/case-studies/peak-ecommerce` | `og/case-peak-ecommerce.png` | "Peak Commerce — 42% cost reduction" |
| `/resources/case-studies/velocity-marketplace` | `og/case-velocity-marketplace.png` | "Velocity Sellers — 3x faster fulfilment" |
| `/resources/case-studies/swiftlog-3pl` | `og/case-swiftlog-3pl.png` | "SwiftLog — 98.7% shipment accuracy" |
| `/resources/case-studies/meridian-exports` | `og/case-meridian-exports.png` | "Meridian Trade Co — 75% documentation time saved" |
| `/resources/case-studies/northgate-import` | `og/case-northgate-import.png` | "Northgate Imports — 60% fewer customs delays" |
| `/resources/case-studies/atlas-b2b` | `og/case-atlas-b2b.png` | "Atlas Industrial — 90% automated routing" |

---

## Production checklist (for design)

- [ ] All images at 1200 × 630 px
- [ ] All in PNG format
- [ ] Each under 1 MB
- [ ] Logo, headline, accent, and URL slug positioned per template
- [ ] Tested at thumbnail size (preview in LinkedIn Post Inspector, X Card Validator)
- [ ] OG image path matches the file expected by `src/lib/metadata.ts` (defaults to `/og/default.png` — override per page in `buildMetadata({ image: '/og/...' })`)
- [ ] `/og/default.png` exists as the fallback before any other image is created

---

## How metadata picks up the image

Pages call `buildMetadata` from `@/lib/metadata`:

```tsx
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "eCommerce shipping",
  description: "Multi-carrier shipping for UK eCommerce retailers.",
  path: "/solutions/ecommerce",
  image: "/og/solutions-ecommerce.png",
});
```

If `image` is omitted, the default `/og/default.png` is used. So shipping `og/default.png` first unlocks every page at once with a credible placeholder, then per-page images can be added incrementally.

---

## Open questions for the design team

1. Logo file — do we have an ITD Global SVG or PNG ready to drop into the template? If not, generate from the wordmark in the site header.
2. Photography or illustration treatment — preference? (We've avoided stock photography on the site; illustration or abstract geometric is preferred.)
3. Single-template approach or per-page custom? Recommended: single template with variable headline + URL slug field, generated programmatically (Figma + plugin, or `@vercel/og` for dynamic generation).
4. Should we dynamically generate OG images via Next.js's `opengraph-image` file convention (puts a `opengraph-image.tsx` next to each route that programmatically generates the PNG)?

If we go with dynamic generation (option 4), most of this briefing becomes obsolete and we get free per-page OG images at build time. That's the recommended path for v2; ship static images for v1.
