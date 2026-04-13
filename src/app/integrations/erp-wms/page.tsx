import IntegrationCategoryPage from "@/components/sections/IntegrationCategoryPage";
import { getIntegrations } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ERP / WMS Integrations — ITD Global",
  description: "Connect Connexx to your ERP and warehouse management system. SAP, Oracle NetSuite, Microsoft Dynamics, Sage, and more.",
};

export default function ErpWmsPage() {
  const integrations = getIntegrations("tech", "erp_wms");

  return (
    <IntegrationCategoryPage
      title="ERP / WMS Integrations"
      subtitle="Connexx connects directly to your ERP and warehouse management system. Orders flow in, shipping data flows back — no manual entry, no sync gaps."
      integrations={integrations}
    />
  );
}
