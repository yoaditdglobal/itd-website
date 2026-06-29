import IntegrationCategoryPage from "@/components/sections/IntegrationCategoryPage";
import { RATE_CHECKER_URL } from "@/lib/site-config";
import { getIntegrations } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "eCommerce and logistics integrations",
  description:
    "We connect to the eCommerce platforms and logistics tools you already run — Shopify, WooCommerce, Veeqo, ShipStation, Mintsoft and more. Orders flow in and ship on our carrier rates, with tracking back in your store.",
  path: "/integrations/ecommerce-logistics",
});

export default function EcommerceLogisticsPage() {
  const integrations = getIntegrations("tech", "ecommerce_logistics");

  return (
    <IntegrationCategoryPage
      title="eCommerce and logistics integrations"
      subtitle="We connect to the eCommerce platforms and logistics tools you already run. Orders flow in and ship on our carrier rates, with tracking back in your store."
      integrations={integrations}
      heroLabel="eCommerce & Logistics"
      heroH1="eCommerce and logistics integrations for multi-carrier shipping."
      heroSubhead="We connect to the eCommerce platforms and logistics tools you already run. Orders flow in and ship on our carrier rates, with tracking back in your store."
      heroPrimaryCta={{ label: "Get Quote", href: RATE_CHECKER_URL }}
      heroSecondaryCta={{ label: "Browse all tech integrations", href: "/integrations/tech" }}
      closingCta={{
        headline: "Connect your store or system.",
        subhead: "One connection puts your orders on the carriers in your account, and the tracking lands back where you work.",
        primary: { label: "Get Quote", href: RATE_CHECKER_URL },
        secondary: { label: "Browse integrations", href: "/integrations/tech" },
      }}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Tech integrations", path: "/integrations/tech" },
        { name: "eCommerce & Logistics", path: "/integrations/ecommerce-logistics" },
      ]}
    />
  );
}
