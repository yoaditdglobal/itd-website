import IntegrationCategoryPage from "@/components/sections/IntegrationCategoryPage";
import { getIntegrations } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "eCommerce Integrations — ITD Global",
  description: "Connect Connexx to your online store. Shopify, WooCommerce, Magento, BigCommerce, and more.",
};

export default function EcommercePage() {
  const integrations = getIntegrations("tech", "ecommerce");

  return (
    <IntegrationCategoryPage
      title="eCommerce Integrations"
      subtitle="Connexx plugs into your online store. Orders sync automatically, shipping labels generate in one click, and tracking updates push back to your customers."
      integrations={integrations}
    />
  );
}
