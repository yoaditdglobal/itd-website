import { notFound } from "next/navigation";
import IntegrationDetail from "@/components/sections/IntegrationDetail";
import TechPage from "@/components/sections/TechPage";
import { buildMetadata } from "@/lib/metadata";
import {
  getIntegrationsByType,
  getIntegrationSlug,
  getIntegrationBySlug,
} from "@/lib/data";
import { getTechPageContent } from "@/lib/tech-pages";

export const dynamicParams = false;

// Tech integrations with a bespoke, hand-written page in their own folder.
const EXISTING_STATIC = new Set(["linnworks"]);

export function generateStaticParams() {
  return getIntegrationsByType("tech")
    .map((t) => ({ slug: getIntegrationSlug(t) }))
    .filter(({ slug }) => !EXISTING_STATIC.has(slug));
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
  const content = getTechPageContent(tool);
  return <IntegrationDetail integration={tool} body={<TechPage {...content} />} />;
}
