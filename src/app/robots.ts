import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

/**
 * GEO note: by explicitly allowing GPTBot, ClaudeBot, PerplexityBot, and
 * Google-Extended, we opt in to having ITD content indexed for AI answer
 * engines. This is required for GEO (Generative Engine Optimization).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/_next/"] },

      // Major AI crawlers — explicit allow.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "GoogleOther", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "Amazonbot", allow: "/" },
      { userAgent: "Diffbot", allow: "/" },
      { userAgent: "FacebookBot", allow: "/" },
      { userAgent: "Meta-ExternalAgent", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
      { userAgent: "YouBot", allow: "/" },
      { userAgent: "DuckAssistBot", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
