import IntegrationCategoryPage from "@/components/sections/IntegrationCategoryPage";
import { getIntegrations } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logistics Integrations — ITD Global",
  description: "Connect Connexx to your logistics tools. ShipStation, Shippo, Freightview, Project44, and more.",
};

export default function LogisticsPage() {
  const integrations = getIntegrations("tech", "logistics");

  return (
    <IntegrationCategoryPage
      title="Logistics Integrations"
      subtitle="Connect your existing logistics tools to Connexx. Shipping automation, freight comparison, and supply chain visibility — unified in one platform."
      integrations={integrations}
    />
  );
}
