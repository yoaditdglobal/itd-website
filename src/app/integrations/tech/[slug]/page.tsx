import { notFound } from "next/navigation";
import IntegrationDetail from "@/components/sections/IntegrationDetail";
import { buildMetadata } from "@/lib/metadata";
import {
  getIntegrationsByType,
  getIntegrationSlug,
  getIntegrationBySlug,
} from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return getIntegrationsByType("tech").map((t) => ({ slug: getIntegrationSlug(t) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getIntegrationBySlug(slug, "tech");
  if (!tool) return buildMetadata({ title: "Tech integration", description: "Connexx tech integration.", path: `/integrations/tech/${slug}` });
  return buildMetadata({
    title: `${tool.name} integration — Connexx shipping`,
    description: `Connect ${tool.name} to Connexx: orders flow in, labels print, and tracking writes back automatically. ${tool.description ?? ""}`.trim(),
    path: `/integrations/tech/${slug}`,
  });
}

export default async function TechDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getIntegrationBySlug(slug, "tech");
  if (!tool) notFound();
  return <IntegrationDetail integration={tool} />;
}
