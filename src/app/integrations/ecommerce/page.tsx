import IntegrationCategoryPage from "@/components/sections/IntegrationCategoryPage";
import { getIntegrations } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { itemListSchema } from "@/components/seo/JsonLd";

export const metadata = buildMetadata({
  title: "eCommerce shipping integrations",
  description:
    "Connect Connexx to Shopify, WooCommerce, Magento, and BigCommerce. Multi-carrier rate comparison and labels on every store order.",
  path: "/integrations/ecommerce",
});

export default function EcommercePage() {
  const integrations = getIntegrations("tech", "ecommerce");

  return (
    <IntegrationCategoryPage
      title="eCommerce platform integrations"
      subtitle="Connexx connects to the eCommerce platforms UK retailers actually run. Shopify, WooCommerce, Magento, and BigCommerce all push orders into Connexx the moment a customer checks out. Rate comparison runs across every UK and international carrier. Labels print in one click. Tracking syncs back to the storefront for the customer email."
      integrations={integrations}
      heroLabel="eCommerce"
      heroH1="eCommerce platform integrations for multi-carrier shipping."
      heroSubhead="Connexx connects to the eCommerce platforms UK retailers actually run. Shopify, WooCommerce, Magento, and BigCommerce all push orders into Connexx the moment a customer checks out. Rate comparison runs across every UK and international carrier. Labels print in one click. Tracking syncs back to the storefront for the customer email."
      heroPrimaryCta={{ label: "Connect your Shopify store in 10 minutes", href: "/contact?enquiry=ecommerce" }}
      heroSecondaryCta={{ label: "Browse the full integrations directory", href: "/integrations" }}
      useCasesIntro="Four eCommerce platforms live today. All connections are native and ship with order pull, rate comparison, label generation, and tracking write-back."
      useCases={[
        {
          headline: "Shopify plus Royal Mail and DPD",
          description:
            "DTC brand on Shopify with negotiated rates at Royal Mail and DPD. Orders pull into Connexx within seconds of checkout. The rate engine picks the cheaper compliant carrier based on weight, postcode, and service level. Tracking pushes back into Shopify so the customer sees the right link in the order confirmation email.",
          namedIntegrations: ["Shopify", "Royal Mail", "DPD"],
        },
        {
          headline: "WooCommerce plus international fulfilment",
          description:
            "WooCommerce store shipping internationally. Connexx pulls each order with the customer's destination country. HS codes from the product catalogue, IOSS for EU consignments under €150, and country-specific customs paperwork generate automatically. DHL Express books the international leg.",
          namedIntegrations: ["WooCommerce", "DHL Express", "FedEx"],
        },
        {
          headline: "Magento plus multi-store routing",
          description:
            "Adobe Commerce instance with three store views and different carrier preferences per region. Connexx applies routing rules per store view. UK orders go to Royal Mail and DPD. EU orders go to DPD and DHL Parcel. Rest-of-world goes to DHL Express.",
          namedIntegrations: ["Magento", "Royal Mail", "DPD", "DHL Parcel", "DHL Express"],
        },
        {
          headline: "BigCommerce plus returns automation",
          description:
            "BigCommerce retailer with a high returns rate on fashion SKUs. Connexx provides the branded returns portal. Customers initiate returns, get a pre-paid Royal Mail Tracked 48 label, and the return logs into BigCommerce for refund processing.",
          namedIntegrations: ["BigCommerce", "Royal Mail", "Evri"],
        },
      ]}
      howItWorksHeading="How the eCommerce integration works"
      howItWorksIntro="eCommerce integrations are the fastest to live because the connection model is simple: order in, label out, tracking back. Connexx ships with the same three components for Shopify, WooCommerce, Magento, and BigCommerce."
      howItWorks={[
        {
          step: 1,
          title: "Order pull.",
          description:
            "The storefront sends every order to Connexx the moment it's placed. Customer details, line items, weights, and selected service level all map automatically. Order tags, notes, and custom fields are supported.",
        },
        {
          step: 2,
          title: "Carrier selection and label.",
          description:
            "The Connexx rate engine compares every active carrier on every order. The cheapest compliant carrier is selected based on your rules. Labels generate in the right format for the carrier and the warehouse printer.",
        },
        {
          step: 3,
          title: "Tracking write-back.",
          description:
            "The carrier name, tracking number, and tracking URL push back into the storefront. Shopify writes to the order timeline. WooCommerce updates the order meta. Magento writes a shipment record. BigCommerce updates the order status. The customer email goes out with the correct tracking link.",
        },
      ]}
      faq={[
        {
          question: "Does Connexx integrate with Shopify?",
          answer:
            "Yes. Connexx connects to Shopify in under 10 minutes through the official Shopify app. Orders flow into the multi-carrier dashboard the moment a customer checks out. Each order is rate-checked across every active UK and international carrier, the cheapest compliant carrier is selected, and the label is generated in one click. Tracking pushes back to the Shopify order timeline.",
        },
        {
          question: "Does Connexx work with WooCommerce?",
          answer:
            "Yes. The WooCommerce plugin installs inside WordPress and surfaces Connexx routing rules in WP-Admin. Multi-carrier rate comparison runs on every order. Labels print from the same screen. Tracking writes back to the order meta so the WooCommerce confirmation email carries the right link. Activation usually takes under 10 minutes for a standard WooCommerce store.",
        },
        {
          question: "Can I use Connexx with my Magento store?",
          answer:
            "Yes. Connexx supports Adobe Commerce and Magento 2 across multi-store, multi-currency, and multi-website setups. Routing rules apply per store view so a UK store can default to Royal Mail and DPD while an EU store defaults to DPD and DHL Parcel. Setup takes one to two business days depending on the number of store views and rule combinations.",
        },
        {
          question: "Does Connexx work with BigCommerce?",
          answer:
            "Yes. BigCommerce storefronts push every order to Connexx via webhook the moment it's placed. The rate engine selects the carrier. The label prints. The tracking number and URL write back to the BigCommerce order. The integration supports both stencil and headless BigCommerce setups.",
        },
        {
          question: "Can I use my own negotiated carrier rates with my Shopify store?",
          answer:
            "Yes. Connexx supports your existing carrier accounts and rate cards across Royal Mail, DPD, Evri, Parcel Force, Yodel, Amazon Shipping, DHL Express, FedEx, and UPS. Your Shopify checkout shows live rates from your contracts. The label generates against the same contract. If your carrier rates are weak, ITD's combined volume across thousands of UK shippers unlocks better pricing.",
        },
        {
          question: "How does Connexx handle Shopify returns?",
          answer:
            "Connexx includes a branded returns portal that sits in front of your Shopify store. Customers initiate returns, the portal generates a pre-paid label against Royal Mail, Evri, or another carrier, and the return logs into Shopify for refund processing. Carrier rules apply automatically so heavy items route to Parcel Force and small items route to Royal Mail Tracked 48.",
        },
        {
          question: "Does Connexx work with international Shopify orders?",
          answer:
            "Yes. Connexx handles HS code lookup, EORI numbers, IOSS for EU consignments under €150, and country-specific customs paperwork automatically. International Shopify orders go through the same dashboard as domestic orders. The customer sees a real-time landed cost at checkout. Customs holds drop because the paperwork is right before the label scans.",
        },
      ]}
      closingCta={{
        headline: "Connect your Shopify store in 10 minutes.",
        subhead: "Install the app. Authorise your carrier accounts. Ship the next order through Connexx.",
        primary: { label: "Get the Shopify app", href: "/contact?enquiry=ecommerce" },
        secondary: { label: "Request a tailored setup walkthrough", href: "/contact?enquiry=ecommerce" },
      }}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Integrations", path: "/integrations" },
        { name: "eCommerce", path: "/integrations/ecommerce" },
      ]}
      jsonLd={[
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
      ]}
    />
  );
}
