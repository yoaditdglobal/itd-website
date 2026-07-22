import type { MetadataRoute } from "next";
import { SITE_URL, ROUTES } from "@/lib/site-config";
import { getIntegrationsByType, getIntegrationSlug } from "@/lib/data";

type ChangeFreq = MetadataRoute.Sitemap[number]["changeFrequency"];

/**
 * Indexable pages that render but were missing from the curated ROUTES list.
 * The carrier/tech detail families are generated below from the same data the
 * routes render from (getIntegrationsByType), so the sitemap can no longer
 * drift out of sync with the actual pages the way the old hand-list did.
 */
const EXTRA_STATIC = [
  "/solutions",
  "/about",
  "/about/team",
  "/integrations/tech/marketplaces",
  "/help/centre/account",
  "/help/centre/account/claims",
  "/help/centre/billing",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const byPath = new Map<string, MetadataRoute.Sitemap[number]>();

  const add = (path: string, priority = 0.7, changeFrequency: ChangeFreq = "monthly") => {
    byPath.set(path, { url: `${SITE_URL}${path}`, lastModified, changeFrequency, priority });
  };

  // Generated: every carrier + tech integration detail page (static folders AND
  // dynamic [slug] routes) straight from the integration data — no hand list.
  for (const c of getIntegrationsByType("carrier")) {
    add(`/integrations/carriers/${getIntegrationSlug(c)}`, 0.75);
  }
  for (const t of getIntegrationsByType("tech")) {
    add(`/integrations/tech/${getIntegrationSlug(t)}`, 0.7);
  }

  // Extra indexable pages that weren't in ROUTES.
  for (const path of EXTRA_STATIC) add(path, 0.6);

  // Curated core list wins on conflict (keeps its hand-tuned priority / freq).
  for (const r of ROUTES) add(r.path, r.priority, r.changeFrequency);

  return [...byPath.values()];
}
