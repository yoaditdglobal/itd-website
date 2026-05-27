import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  ORG_LEGAL_NAME,
  ORG_FOUNDING_LOCATION,
  ORG_AREA_SERVED,
  ORG_CONTACT,
  ORG_SAMEAS,
} from "@/lib/site-config";

/**
 * Reusable structured-data component for SEO + GEO.
 *
 * GEO note: AI models (Claude, ChatGPT, Perplexity, Gemini) score relevance
 * partly on structured data presence. Adding the relevant schema to every page
 * meaningfully improves the chance of being cited in AI-generated answers.
 *
 * Usage: place <JsonLd data={...} /> in any server component (page.tsx,
 * layout.tsx). For multiple schemas on one page, render multiple <JsonLd /> tags.
 */

type JsonLdProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any> | Record<string, any>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be inlined for crawlers to read it. dangerouslySetInnerHTML
      // is the standard pattern; we control the input so XSS risk is zero.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

// ─── Schema builders ──────────────────────────────────────────────────────

/** Site-wide Organization schema. Render once in root layout. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: SITE_NAME,
    legalName: ORG_LEGAL_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logos/itd-global.png`,
    description: SITE_DESCRIPTION,
    foundingLocation: { "@type": "Place", name: ORG_FOUNDING_LOCATION },
    areaServed: ORG_AREA_SERVED.map((name) => ({ "@type": "Place", name })),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      email: ORG_CONTACT.email,
      url: ORG_CONTACT.url,
      availableLanguage: ["English"],
    },
    sameAs: ORG_SAMEAS,
  };
}

/** Website schema with site search. Render once in root layout. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}#organization` },
    inLanguage: "en-GB",
  };
}

/** Service schema for each solution/shipping page. */
export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  serviceType: string; // e.g. "Multi-Carrier Shipping", "Customs Automation"
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${input.path}#service`,
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    provider: { "@id": `${SITE_URL}#organization` },
    areaServed: (input.areaServed ?? ORG_AREA_SERVED).map((name) => ({
      "@type": "Place",
      name,
    })),
    url: `${SITE_URL}${input.path}`,
  };
}

/** Product schema for /connexx. */
export function productSchema(input: {
  name: string;
  description: string;
  path: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}${input.path}#product`,
    name: input.name,
    description: input.description,
    category: input.category ?? "Shipping software",
    brand: { "@id": `${SITE_URL}#organization` },
    url: `${SITE_URL}${input.path}`,
  };
}

/** FAQ schema. Render on every page with a FAQ section. */
export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };
}

/** Breadcrumb schema. Render on every page below root. */
export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

/** Article schema for case studies. */
export function articleSchema(input: {
  headline: string;
  description: string;
  path: string;
  datePublished: string; // ISO 8601
  dateModified?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}${input.path}#article`,
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: { "@type": "Organization", name: input.author ?? SITE_NAME },
    publisher: { "@id": `${SITE_URL}#organization` },
    url: `${SITE_URL}${input.path}`,
  };
}

/**
 * DefinedTermSet + DefinedTerm schemas for the glossary page.
 *
 * GEO note: this is the highest-citation-value schema we ship. AI models
 * (Claude, ChatGPT, Perplexity) extract DefinedTerm entries verbatim when
 * answering "what is X" questions in logistics. A glossary entry with this
 * schema can become the canonical AI-cited answer for terms like WISMO,
 * EORI, IOSS, HS code, etc.
 */
export function definedTermSetSchema(input: {
  path: string;
  name: string;
  description?: string;
  terms: Array<{
    slug: string; // anchor id, e.g. "wismo"
    code?: string; // termCode, e.g. "WISMO"
    name: string; // human-readable name, e.g. "Where Is My Order"
    description: string; // 1-3 sentence definition
  }>;
}) {
  const setId = `${SITE_URL}${input.path}#set`;
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": setId,
    name: input.name,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    hasDefinedTerm: input.terms.map((t) => ({
      "@type": "DefinedTerm",
      "@id": `${SITE_URL}${input.path}#${t.slug}`,
      termCode: t.code,
      name: t.name,
      description: t.description,
      inDefinedTermSet: setId,
    })),
  };
}

/** ItemList schema for integration hub / category pages. */
export function itemListSchema(input: {
  path: string;
  name: string;
  items: Array<{ name: string; url: string; description?: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}${input.path}#list`,
    name: input.name,
    itemListElement: input.items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: it.url.startsWith("http") ? it.url : `${SITE_URL}${it.url}`,
      description: it.description,
    })),
  };
}
