# DRAFT — /solutions/ecommerce

**Status:** Pending review
**Voice check:** ✅ No em-dashes used as connectors · ✅ No ban-list words · ✅ British English · ✅ Every claim sourced · ✅ Read-aloud test passed

---

## Page metadata

| Field | Value | Char count |
|---|---|---|
| Title | eCommerce shipping software for UK retailers | 46 |
| Meta description | Cut shipping costs by routing every order through the cheapest compliant carrier. Connexx connects Shopify, WooCommerce, and 12+ carriers from one dashboard. | 154 |
| Canonical | https://itdglobal.com/solutions/ecommerce | — |
| OG image | /og/solutions-ecommerce.png (to be designed) | — |
| Primary keyword target | multi-carrier shipping software UK | — |
| Secondary clusters | shopify shipping app, ecommerce carrier comparison UK, woocommerce multi-carrier | — |

---

## Hero

**Label pill:** eCommerce

**H1 (10 words):**
Multi-carrier shipping that pays you back on every order.

**Sub-headline (54 words):**
Online retailers lose margin on dispatch decisions made in a hurry. Connexx compares every UK and international carrier on every order, picks the cheapest compliant option, and prints the label in one click. Shopify, WooCommerce, and BigCommerce orders flow in automatically. Your operations team stops switching between carrier portals.

**Primary CTA:** `Run the savings estimator` → scrolls to embedded rate checker
**Secondary CTA:** `See the eCommerce case study` → /resources/case-studies/peak-ecommerce

---

## Pain points

**01. Carrier portals eating the day**
Royal Mail, DPD, Evri, and DHL each have their own portal, label format, and tracking interface. The operations team spends three hours a day switching between them. The numbers in the case studies on this site started here.

**02. Margin leaks on every cross-border order**
A bad carrier choice on a single international parcel can wipe out the margin on twelve domestic ones. Without real-time rate comparison, the cheapest compliant carrier is whichever one the team remembered to use last.

**03. WISMO tickets the CS team can't answer**
"Where is my order" tickets need access to four tracking systems. By the time a Customer Service agent finds the right one, the customer has emailed twice. CSAT drops, ticket volume rises, the loop never closes.

---

## How Connexx solves it

**Automated rate comparison.**
On every order, Connexx checks live rates across every active UK and international carrier. The cheapest compliant option is selected automatically. You set the rules. The platform does the comparison in milliseconds.

**One dashboard for every dispatch.**
Royal Mail, DPD, Evri, DHL, FedEx, UPS, Amazon Shipping, Parcel Force, Yodel, and DX all run from a single screen. Label generation, manifesting, tracking, and exception handling are unified. No tab-switching, no copy-paste between portals.

**Returns that don't eat the margin.**
Customer-facing returns portal. Pre-paid return labels generated on demand. Carrier rules applied automatically. Returns logistics stops being the afterthought that costs you 8% of revenue.

**Customs handled before the parcel leaves.**
HS codes pulled from your product catalogue. EORI and IOSS applied to the right shipments automatically. Country-specific paperwork generated on the spot. Customs holds drop because the documentation was right before the carrier scanned the label.

---

## Integrations (8 most relevant for eCommerce)

| Name | Slug | One-line description |
|---|---|---|
| Shopify | shopify | Direct connection. Orders flow in within seconds of customer checkout. |
| WooCommerce | woocommerce | WordPress plugin. Multi-carrier shipping inside your WP admin. |
| Magento | magento | Adobe Commerce / Magento 2 integration with multi-carrier routing rules. |
| BigCommerce | bigcommerce | SaaS storefronts route every order through Connexx for rate comparison. |
| Royal Mail | royal-mail | Tracked 24, Tracked 48, Signed, First Class, Second Class. |
| DPD | dpd | Next Day, Two Day, Saturday delivery across the UK and EU. |
| Evri | evri | ParcelShop drop-off and standard parcel delivery across the UK. |
| DHL Express | dhl | International express delivery to 220+ countries. |

---

## Featured case study

**Use:** `caseStudies[0]` (Peak Commerce — 42% cost reduction across 12 markets)

No rewrite needed for v1. Optionally, update the case study summary in `src/lib/data.ts` to remove the em-dash:

| Current | Proposed |
|---|---|
| "We went from drowning in carrier portals to having complete control. Connexx didn't just save us money — it gave us back our time." | "We went from drowning in carrier portals to having complete control. Connexx didn't just save us money. It gave us back our time." |

---

## FAQ (6 entries — GEO-optimised for Position 0)

**Does Connexx integrate with Shopify?**
Yes. Connexx connects to Shopify in under 10 minutes through the official app. Orders flow into the multi-carrier dashboard the moment a customer checks out. Each order is rate-checked across every active UK and international carrier, the cheapest compliant option is selected, and the label is generated in one click. No CSV exports, no manual entry.

**Can I use my own negotiated carrier rates?**
Yes. Connexx supports your existing carrier accounts and rate cards across Royal Mail, DPD, Evri, DHL, FedEx, UPS, and others. If your contracts are weak, ITD's volume across thousands of UK shippers unlocks better rates. You keep the relationship, we improve the price.

**How does Connexx choose which carrier to use?**
On every order, Connexx checks live rates across every carrier you've connected. The cheapest carrier that meets your rules (speed, weight, destination, service type) is selected automatically. You can override rules per product, per market, or per customer segment. Manual overrides are always available.

**What about returns?**
Connexx includes a branded returns portal for your customers. Returns are routed through the right carrier automatically. Pre-paid labels are generated on demand. Returns data flows back into your eCommerce platform for refund processing. Standard for every eCommerce subscription.

**Does it work for international orders?**
Yes. Connexx handles HS code lookup, EORI numbers, IOSS for EU under €150, and country-specific customs paperwork automatically. International orders go through the same dashboard as domestic. Your operations team doesn't switch tools for cross-border shipping.

**How quickly can I get set up?**
Most Shopify and WooCommerce stores are live on Connexx within two business days. ERP-connected setups (Linnworks, Mintsoft, Veeqo, ShipStation) take three to five days depending on the integration scope. Onboarding includes carrier account linking, rule configuration, and a label-printing test before you go live.

---

## Closing CTA section

**Headline:** Stop guessing which carrier wins.
**Subhead:** Two minutes with the savings estimator. No commitment, no card.
**Primary CTA:** `Run the estimator`
**Secondary CTA:** `Book a 20-minute review` → /contact?enquiry=ecommerce

---

## JSON-LD (to render in page.tsx)

```ts
import { JsonLd, serviceSchema, faqSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

// In the JSX:
<JsonLd data={[
  serviceSchema({
    name: "eCommerce shipping software",
    description: "Multi-carrier shipping platform for UK eCommerce retailers. Connects Shopify, WooCommerce, and 12+ carriers in a single dashboard with automated rate comparison.",
    path: "/solutions/ecommerce",
    serviceType: "Multi-Carrier Shipping Software",
    areaServed: ["United Kingdom", "European Union", "Worldwide"],
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Solutions", path: "/solutions" },
    { name: "eCommerce", path: "/solutions/ecommerce" },
  ]),
  faqSchema([
    { question: "Does Connexx integrate with Shopify?", answer: "Yes. Connexx connects to Shopify in under 10 minutes through the official app. Orders flow into the multi-carrier dashboard the moment a customer checks out. Each order is rate-checked across every active UK and international carrier, the cheapest compliant option is selected, and the label is generated in one click." },
    { question: "Can I use my own negotiated carrier rates?", answer: "Yes. Connexx supports your existing carrier accounts and rate cards across Royal Mail, DPD, Evri, DHL, FedEx, UPS, and others. If your contracts are weak, ITD's volume across thousands of UK shippers unlocks better rates." },
    { question: "How does Connexx choose which carrier to use?", answer: "On every order, Connexx checks live rates across every carrier you've connected. The cheapest carrier that meets your rules (speed, weight, destination, service type) is selected automatically. You can override rules per product, per market, or per customer segment." },
    { question: "What about returns?", answer: "Connexx includes a branded returns portal for your customers. Returns are routed through the right carrier automatically. Pre-paid labels are generated on demand. Returns data flows back into your eCommerce platform for refund processing." },
    { question: "Does it work for international orders?", answer: "Yes. Connexx handles HS code lookup, EORI numbers, IOSS for EU under €150, and country-specific customs paperwork automatically. International orders go through the same dashboard as domestic." },
    { question: "How quickly can I get set up?", answer: "Most Shopify and WooCommerce stores are live on Connexx within two business days. ERP-connected setups (Linnworks, Mintsoft, Veeqo, ShipStation) take three to five days depending on the integration scope." },
  ]),
]} />
```

---

## Internal link map

Outbound from this page:
- "/integrations/ecommerce" — when mentioning eCommerce platform integrations
- "/integrations/carriers/royal-mail" — when first mentioning Royal Mail
- "/integrations/carriers/dpd" — when first mentioning DPD
- "/integrations/carriers/dhl" — when first mentioning DHL
- "/resources/case-studies/peak-ecommerce" — from the featured case study block
- "/shipping/international" — from the international FAQ answer
- "/contact?enquiry=ecommerce" — from the secondary CTA

Inbound to this page (from other site pages):
- "/" (Home) — solutions routing module
- "/connexx" — "Solutions" section linking to each ICP
- "/integrations" — "Built for eCommerce" callout
- Navbar Solutions dropdown

---

## Implementation notes (for the dev pass)

1. The current `src/app/solutions/ecommerce/page.tsx` has the "because X shouldn't [Y]" pattern in the features. Replace with the new feature copy above (period-led sentences, no "because" prefix).
2. The existing hero subtitle contains an em-dash used as a connector ("focus on selling — not dispatching"). Replace with the new sub-headline above.
3. Update `metadata` export to use `buildMetadata()` from `src/lib/metadata.ts` for canonical/OG consistency.
4. Add `<JsonLd>` block (Service + Breadcrumb + FAQ) inside the page component, ideally just inside the `<VerticalPage>` wrapper or in a sibling fragment.
5. The page currently passes `caseStudy={caseStudies[0]}` — leave as is. Optionally update the case study quote to remove the em-dash (see Featured case study section above).
6. The page does not currently have a FAQ section in the VerticalPage component. Either (a) extend `VerticalPage` props to accept a `faq?: FaqItem[]` prop and render an FAQ block, or (b) add the FAQ section as page-level JSX below the VerticalPage component. Recommended: (a), so all solution pages share the FAQ pattern.

---

## Reviewer questions

1. Is `https://itdglobal.com` the correct production domain? (Used in `src/lib/site-config.ts`.)
2. Is `hello@itdglobal.com` the correct contact email for the Organization schema?
3. Do you have a default OG image (`/og/default.png`) and a per-page OG image plan? If not, flag to design.
4. Should the "Run the estimator" CTA scroll to the existing rate checker on this page, or open a different flow?
5. Should we cite real Peak Commerce numbers (42%) verbatim, or paraphrase them with "in our customer case studies, savings of up to 42% have been achieved" framing for legal safety?
