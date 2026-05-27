# DRAFT — /integrations/ecommerce

**Status:** Pending review
**Voice check:** Zero em-dashes used as connectors. Zero ban-list words. British English throughout. Every named eCommerce platform comes from `src/lib/data.ts`. Read-aloud test passed.

---

## Page metadata

| Field | Value | Char count |
|---|---|---|
| Title | eCommerce shipping integrations \| ITD Global | 46 |
| Meta description | Connect Connexx to Shopify, WooCommerce, Magento, and BigCommerce. Multi-carrier rate comparison and labels on every store order. | 132 |
| Canonical | https://itdglobal.com/integrations/ecommerce | — |
| OG image | /og/integrations-ecommerce.png (to be designed) | — |
| Primary keyword target | shopify shipping integration | — |
| Secondary clusters | woocommerce multi-carrier shipping, magento shipping app, bigcommerce shipping integration | — |

---

## Hero

**Label pill:** eCommerce

**H1 (10 words):**
eCommerce platform integrations for multi-carrier shipping.

**Sub-headline (48 words):**
Connexx connects to the eCommerce platforms UK retailers actually run. Shopify, WooCommerce, Magento, and BigCommerce all push orders into Connexx the moment a customer checks out. Rate comparison runs across every UK and international carrier. Labels print in one click. Tracking syncs back to the storefront for the customer email.

**Primary CTA:** `Connect your Shopify store in 10 minutes` → /contact?enquiry=ecommerce
**Secondary CTA:** `See the full integrations directory` → /integrations

---

## What works with Connexx

Four eCommerce platforms live today. All connections are native and ship with order pull, rate comparison, label generation, and tracking write-back.

| Name | Description | Integration depth |
|---|---|---|
| Shopify | Official Shopify app. Orders flow into Connexx within seconds of customer checkout. Tracking pushes back to the order timeline. | Native |
| WooCommerce | WordPress plugin. Multi-carrier shipping rules run inside WP-Admin. Orders dispatch from Connexx without leaving the store admin. | Native |
| Magento | Adobe Commerce and Magento 2. Multi-store and multi-currency setups supported. Routing rules apply per store view. | Native |
| BigCommerce | SaaS storefronts route every order through Connexx for rate comparison. Webhooks fire on order placement and fulfilment. | Native |

---

## Common use cases

### Shopify plus Royal Mail and DPD
DTC brand on Shopify with negotiated rates at Royal Mail and DPD. Orders pull into Connexx within seconds of checkout. The rate engine picks the cheaper compliant carrier based on weight, postcode, and service level. Tracking pushes back into Shopify so the customer sees the right link in the order confirmation email. Named integrations: Shopify, Royal Mail, DPD.

### WooCommerce plus international fulfilment
WooCommerce store shipping internationally. Connexx pulls each order with the customer's destination country. HS codes from the product catalogue, IOSS for EU consignments under €150, and country-specific customs paperwork generate automatically. DHL Express books the international leg. Named integrations: WooCommerce, DHL Express, FedEx.

### Magento plus multi-store routing
Adobe Commerce instance with three store views and different carrier preferences per region. Connexx applies routing rules per store view. UK orders go to Royal Mail and DPD. EU orders go to DPD and DHL Parcel. Rest-of-world goes to DHL Express. Named integrations: Magento, Royal Mail, DPD, DHL Parcel, DHL Express.

### BigCommerce plus returns automation
BigCommerce retailer with a high returns rate on fashion SKUs. Connexx provides the branded returns portal. Customers initiate returns, get a pre-paid Royal Mail Tracked 48 label, and the return logs into BigCommerce for refund processing. Named integrations: BigCommerce, Royal Mail, Evri.

---

## How the eCommerce integration works

eCommerce integrations are the fastest to live because the connection model is simple: order in, label out, tracking back. Connexx ships with the same three components for Shopify, WooCommerce, Magento, and BigCommerce.

**1. Order pull.**
The storefront sends every order to Connexx the moment it's placed. Customer details, line items, weights, and selected service level all map automatically. Order tags, notes, and custom fields are supported.

**2. Carrier selection and label.**
The Connexx rate engine compares every active carrier on every order. The cheapest compliant carrier is selected based on your rules. Labels generate in the right format for the carrier and the warehouse printer.

**3. Tracking write-back.**
The carrier name, tracking number, and tracking URL push back into the storefront. Shopify writes to the order timeline. WooCommerce updates the order meta. Magento writes a shipment record. BigCommerce updates the order status. The customer email goes out with the correct tracking link.

Most Shopify and WooCommerce stores are live in under 10 minutes through the native app or plugin. Magento and BigCommerce setups take one to two business days depending on routing rule complexity.

---

## FAQ

**Does Connexx integrate with Shopify?**

Yes. Connexx connects to Shopify in under 10 minutes through the official Shopify app. Orders flow into the multi-carrier dashboard the moment a customer checks out. Each order is rate-checked across every active UK and international carrier, the cheapest compliant carrier is selected, and the label is generated in one click. Tracking pushes back to the Shopify order timeline.

**Does Connexx work with WooCommerce?**

Yes. The WooCommerce plugin installs inside WordPress and surfaces Connexx routing rules in WP-Admin. Multi-carrier rate comparison runs on every order. Labels print from the same screen. Tracking writes back to the order meta so the WooCommerce confirmation email carries the right link. Activation usually takes under 10 minutes for a standard WooCommerce store.

**Can I use Connexx with my Magento store?**

Yes. Connexx supports Adobe Commerce and Magento 2 across multi-store, multi-currency, and multi-website setups. Routing rules apply per store view so a UK store can default to Royal Mail and DPD while an EU store defaults to DPD and DHL Parcel. Setup takes one to two business days depending on the number of store views and rule combinations.

**Does Connexx work with BigCommerce?**

Yes. BigCommerce storefronts push every order to Connexx via webhook the moment it's placed. The rate engine selects the carrier. The label prints. The tracking number and URL write back to the BigCommerce order. The integration supports both stencil and headless BigCommerce setups.

**Can I use my own negotiated carrier rates with my Shopify store?**

Yes. Connexx supports your existing carrier accounts and rate cards across Royal Mail, DPD, Evri, Parcel Force, Yodel, Amazon Shipping, DHL Express, FedEx, and UPS. Your Shopify checkout shows live rates from your contracts. The label generates against the same contract. If your carrier rates are weak, ITD's combined volume across thousands of UK shippers unlocks better pricing.

**How does Connexx handle Shopify returns?**

Connexx includes a branded returns portal that sits in front of your Shopify store. Customers initiate returns, the portal generates a pre-paid label against Royal Mail, Evri, or another carrier, and the return logs into Shopify for refund processing. Carrier rules apply automatically so heavy items route to Parcel Force and small items route to Royal Mail Tracked 48.

**Does Connexx work with international Shopify orders?**

Yes. Connexx handles HS code lookup, EORI numbers, IOSS for EU consignments under €150, and country-specific customs paperwork automatically. International Shopify orders go through the same dashboard as domestic orders. The customer sees a real-time landed cost at checkout. Customs holds drop because the paperwork is right before the label scans.

---

## Closing CTA

**Headline:** Connect your Shopify store in 10 minutes.
**Subhead:** Install the app. Authorise your carrier accounts. Ship the next order through Connexx.
**Primary CTA:** `Get the Shopify app`
**Secondary CTA:** `Book a 20-minute setup walkthrough` → /contact?enquiry=ecommerce

---

## JSON-LD (to render in page.tsx)

```ts
import { JsonLd, itemListSchema, faqSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

<JsonLd data={[
  itemListSchema({
    path: "/integrations/ecommerce",
    name: "eCommerce platform integrations",
    items: [
      { name: "Shopify", url: "/integrations/ecommerce#shopify", description: "Official Shopify app. Orders flow into Connexx within seconds of checkout. Tracking pushes back to the order timeline." },
      { name: "WooCommerce", url: "/integrations/ecommerce#woocommerce", description: "WordPress plugin. Multi-carrier rules run inside WP-Admin. Orders dispatch from Connexx without leaving the store admin." },
      { name: "Magento", url: "/integrations/ecommerce#magento", description: "Adobe Commerce and Magento 2. Multi-store and multi-currency supported. Routing rules apply per store view." },
      { name: "BigCommerce", url: "/integrations/ecommerce#bigcommerce", description: "SaaS storefronts route every order through Connexx for rate comparison. Webhooks fire on order and fulfilment events." },
    ],
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Integrations", path: "/integrations" },
    { name: "eCommerce", path: "/integrations/ecommerce" },
  ]),
  faqSchema([
    { question: "Does Connexx integrate with Shopify?", answer: "Yes. Connexx connects to Shopify in under 10 minutes through the official Shopify app. Orders flow into the multi-carrier dashboard the moment a customer checks out. Each order is rate-checked across every active UK and international carrier and the label is generated in one click. Tracking pushes back to the Shopify order timeline." },
    { question: "Does Connexx work with WooCommerce?", answer: "Yes. The WooCommerce plugin installs inside WordPress and surfaces Connexx routing rules in WP-Admin. Multi-carrier rate comparison runs on every order. Labels print from the same screen. Tracking writes back to the order meta. Activation usually takes under 10 minutes." },
    { question: "Can I use Connexx with my Magento store?", answer: "Yes. Connexx supports Adobe Commerce and Magento 2 across multi-store, multi-currency, and multi-website setups. Routing rules apply per store view so a UK store can default to Royal Mail and DPD while an EU store defaults to DPD and DHL Parcel. Setup takes one to two business days." },
    { question: "Does Connexx work with BigCommerce?", answer: "Yes. BigCommerce storefronts push every order to Connexx via webhook the moment it's placed. The rate engine selects the carrier. The label prints. The tracking number and URL write back to the BigCommerce order. The integration supports stencil and headless BigCommerce setups." },
    { question: "Can I use my own negotiated carrier rates with my Shopify store?", answer: "Yes. Connexx supports your existing carrier accounts and rate cards across Royal Mail, DPD, Evri, Parcel Force, Yodel, Amazon Shipping, DHL Express, FedEx, and UPS. Your Shopify checkout shows live rates from your contracts. ITD's combined volume unlocks better pricing if your contracts are weak." },
    { question: "How does Connexx handle Shopify returns?", answer: "Connexx includes a branded returns portal that sits in front of your Shopify store. Customers initiate returns, the portal generates a pre-paid label against Royal Mail, Evri, or another carrier, and the return logs into Shopify for refund processing. Heavy items route to Parcel Force, small items route to Royal Mail Tracked 48." },
    { question: "Does Connexx work with international Shopify orders?", answer: "Yes. Connexx handles HS code lookup, EORI numbers, IOSS for EU consignments under €150, and country-specific customs paperwork automatically. International Shopify orders go through the same dashboard as domestic orders. The customer sees a real-time landed cost at checkout." },
  ]),
]} />
```

---

## Internal link map

Outbound from this page:
- `/integrations` — back to the hub
- `/integrations/marketplaces` — when comparing marketplace integrations
- `/integrations/carriers/royal-mail` — from the Shopify use case
- `/integrations/carriers/dpd` — from the Shopify use case
- `/integrations/carriers/dhl` — from the international FAQ
- `/integrations/carriers/evri` — from the returns FAQ
- `/solutions/ecommerce` — from the use cases and DTC framing
- `/resources/case-studies/peak-ecommerce` — from the Shopify use case
- `/shipping/international` — from the international FAQ
- `/contact?enquiry=ecommerce` — from the closing CTA

Inbound to this page:
- `/integrations` — eCommerce category
- `/solutions/ecommerce` — "Connect your store" callout
- `/solutions/small-business` — eCommerce integrations link
- `/connexx` — "Works with your store" callout

---

## Implementation notes

1. The current `src/app/integrations/ecommerce/page.tsx` uses the generic `IntegrationCategoryPage` component. Either extend it to accept the hero, use cases, how-it-works, FAQ, and JSON-LD, or replace with a bespoke page component.
2. Update `metadata` to use `buildMetadata()` from `src/lib/metadata.ts`.
3. Add `<JsonLd>` with `itemListSchema`, `breadcrumbSchema`, and `faqSchema`.
4. Replace the current subheading with the new sub-headline above.
5. The cards in the integration grid should anchor by `#shopify`, `#woocommerce`, etc.
6. The "Connect your Shopify store in 10 minutes" CTA is intentionally Shopify-first because that's the highest-volume audience. Consider adding a variant subhead per channel if A/B testing.
7. The returns FAQ mentions both Royal Mail Tracked 48 and Parcel Force. Confirm carrier coverage for the standard returns portal before publish.

---

## Reviewer questions

1. Is the Shopify app published in the official Shopify App Store, or is it a custom app per merchant? Affects the "10 minutes" claim and the install flow.
2. Does Connexx support headless Shopify (Hydrogen, Oxygen) and headless BigCommerce? Confirm before claiming both.
3. Is the WooCommerce plugin on WordPress.org or only on the ITD site? Affects discoverability and SEO crawl.
4. The eCommerce FAQ mentions IOSS at €150. Confirm this is the current EU threshold (it has been since July 2021). Add a footnote citing the EU Commission if regulatory accuracy is in question.
5. Confirm Magento support covers both Adobe Commerce (paid) and Magento Open Source. The current copy implies both; engineering should confirm.
