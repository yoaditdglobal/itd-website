import IntegrationCategoryPage from "@/components/sections/IntegrationCategoryPage";
import { getIntegrations } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketplace Integrations — ITD Global",
  description: "Connect Connexx to Amazon, eBay, Etsy, Walmart, Zalando, and more. Unified fulfilment across every marketplace.",
};

export default function MarketplacesPage() {
  const integrations = getIntegrations("tech", "marketplace");

  return (
    <IntegrationCategoryPage
      title="Marketplace Integrations"
      subtitle="Sell on Amazon, eBay, Etsy, Walmart, and more — all fulfilled from one dashboard. Orders from every marketplace flow into a single queue with automated carrier selection."
      integrations={integrations}
    />
  );
}
