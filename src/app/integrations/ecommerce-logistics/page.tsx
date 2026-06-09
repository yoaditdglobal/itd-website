import IntegrationCategoryPage from "@/components/sections/IntegrationCategoryPage";
import { getIntegrations } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "eCommerce & logistics integrations",
  description:
    "Connect Connexx to your eCommerce platforms and logistics tools — Shopify, WooCommerce, Veeqo, ShipStation, Mintsoft and more. Multi-carrier rate comparison and labels on every order.",
  path: "/integrations/ecommerce-logistics",
});

export default function EcommerceLogisticsPage() {
  const integrations = getIntegrations("tech", "ecommerce_logistics");

  return (
    <IntegrationCategoryPage
      title="eCommerce & logistics integrations"
      subtitle="Connexx connects to the eCommerce platforms and logistics tools you already run. Orders push into Connexx, the cheapest compliant carrier is selected on every order, labels print in one click, and tracking writes back to your store or system — no double entry."
      integrations={integrations}
      heroLabel="eCommerce & Logistics"
      heroH1="eCommerce & logistics integrations for multi-carrier shipping."
      heroSubhead="Connexx connects to the eCommerce platforms and logistics tools you already run. Orders push into Connexx, the cheapest compliant carrier is selected on every order, labels print in one click, and tracking writes back to your store or system."
      heroPrimaryCta={{ label: "Get Quote", href: "/shipping/domestic#estimator" }}
      heroSecondaryCta={{ label: "Browse all tech integrations", href: "/integrations/tech" }}
      closingCta={{
        headline: "Connect your store or system to Connexx.",
        subhead: "Orders in, labels out, tracking back — across every carrier in your account.",
        primary: { label: "Get Quote", href: "/shipping/domestic#estimator" },
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
