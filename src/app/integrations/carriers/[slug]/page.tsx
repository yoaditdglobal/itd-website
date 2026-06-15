import { notFound } from "next/navigation";
import CarrierPage from "@/components/sections/CarrierPage";
import { getCarrierPageContent } from "@/lib/carrier-pages";
import { buildMetadata } from "@/lib/metadata";
import {
  getIntegrationsByType,
  getIntegrationSlug,
  getIntegrationBySlug,
} from "@/lib/data";

// Carriers that already have a bespoke, hand-written page in their own folder.
// Excluded here so the dynamic route doesn't shadow or duplicate them.
const EXISTING_STATIC = new Set(["dhl", "evri", "dpd", "royal-mail", "amazon-shipping", "inpost", "parcel-force"]);

export const dynamicParams = false;

export function generateStaticParams() {
  return getIntegrationsByType("carrier")
    .map((c) => getIntegrationSlug(c))
    .filter((slug) => !EXISTING_STATIC.has(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const carrier = getIntegrationBySlug(slug, "carrier");
  if (!carrier) return buildMetadata({ title: "Carrier integration", description: "ITD carrier integration.", path: `/integrations/carriers/${slug}` });
  return buildMetadata({
    title: `${carrier.name} integration — ITD multi-carrier shipping`,
    description: `Connect ${carrier.name} to ITD for rate comparison, one-click labels, and tracking on every order. ${carrier.description ?? ""}`.trim(),
    path: `/integrations/carriers/${slug}`,
  });
}

export default async function CarrierDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const carrier = getIntegrationBySlug(slug, "carrier");
  if (!carrier) notFound();
  return <CarrierPage {...getCarrierPageContent(carrier)} />;
}
