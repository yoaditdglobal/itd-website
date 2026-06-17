import Link from "next/link";
import {
  Book,
  Activity,
  Clock,
  Zap,
  Package,
  KeyRound,
  ArrowRight,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FaqSection from "@/components/sections/FaqSection";
import Button from "@/components/ui/Button";
import CodeBlock from "@/components/help/CodeBlock";
import { buildMetadata } from "@/lib/metadata";
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
} from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Developer resources",
  description:
    "The Connexx REST API, the live status page, the changelog, webhook reference, and SDK examples. Everything you need to integrate with Connexx.",
  path: "/help/developers",
});

// TODO: confirm canonical URLs with the user (docs subdomain, status page,
// changelog location, GitHub org). See docs/drafts/help-developers.md
// reviewer questions 1-9. The href values below are placeholders.
const resources = [
  {
    icon: Book,
    title: "API documentation",
    description:
      "The full reference for every Connexx endpoint. Create shipments, compare rates across every connected carrier, generate labels, track parcels, and manage carrier accounts. OpenAPI 3.1 spec, request/response examples, and a try-it-now console.",
    ctaLabel: "Open the API reference",
    href: "https://docs.itdglobal.com",
    external: true,
  },
  {
    icon: Activity,
    title: "Status page",
    description:
      "Live status across the API, the dashboard, carrier integrations, and webhooks. Incident history, scheduled maintenance, and component-level uptime over the last 90 days.",
    ctaLabel: "View status page",
    href: "https://status.itdglobal.com",
    external: true,
  },
  {
    icon: Clock,
    title: "Changelog",
    description:
      "Every API change, dated, with the version it applies to and the migration path where breaking. Backwards-compatible additions, deprecations with notice periods, and bug fixes that affect API behaviour.",
    ctaLabel: "Read the changelog",
    href: "https://docs.itdglobal.com/changelog",
    external: true,
  },
  {
    icon: Zap,
    title: "Webhooks",
    description:
      "Subscribe to shipment lifecycle events: created, label_generated, manifested, in_transit, delivered, exception, returned. Payloads are JSON, signed with HMAC-SHA256. Retries follow exponential backoff up to 24 hours.",
    ctaLabel: "Webhook reference",
    href: "https://docs.itdglobal.com/webhooks",
    external: true,
  },
  {
    icon: Package,
    title: "SDKs and API clients",
    description:
      "Working code examples in Node.js, Python, PHP, and Ruby for the most common workflows: create a shipment, fetch rates, generate a label, subscribe to a webhook. Copy, adapt, and ship.",
    ctaLabel: "View API client examples",
    href: "https://docs.itdglobal.com/examples",
    external: true,
  },
  {
    icon: KeyRound,
    title: "Rate limits and authentication",
    description:
      "Bearer-token authentication with separate keys for staging and production. Default rate limit is 100 requests per second per account, burst up to 200. Higher tiers available on Enterprise. Key rotation supported without downtime.",
    ctaLabel: "Authentication guide",
    href: "https://docs.itdglobal.com/auth",
    external: true,
  },
];

const canonicalSnippet = `curl -X POST https://api.itdglobal.com/v1/shipments \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "from": { "postcode": "M1 1AA", "country": "GB" },
    "to": { "postcode": "EH1 1YZ", "country": "GB" },
    "parcel": { "weight_kg": 2.5, "length_cm": 30, "width_cm": 20, "height_cm": 10 },
    "service_preference": "cheapest"
  }'`;

const faqItems = [
  {
    question: "What is the Connexx API?",
    answer:
      "Connexx is a REST API for multi-carrier shipping. The API covers shipment creation, live rate comparison across every connected carrier, label generation, tracking, webhook subscriptions, carrier account management, and customs documentation. The API uses bearer-token authentication, returns JSON, and is documented in OpenAPI 3.1. Median response time is under 200ms.",
  },
  {
    question: "How do I get an API key?",
    answer:
      "API keys are issued from the Connexx dashboard under Settings, then API Keys. Each account has separate keys for staging and production. Keys can be rotated without downtime by issuing a new key, updating your client, and revoking the old key. Existing customers get keys immediately. New customers get keys at the end of onboarding.",
  },
  {
    question: "What is the rate limit on the Connexx API?",
    answer:
      "The default rate limit is 100 requests per second per account, with a burst of up to 200 for short-lived spikes. Webhook delivery is not subject to the rate limit. Enterprise customers can request higher limits via /help/submit-request. The current limit and remaining quota are returned in every response under X-RateLimit-Limit and X-RateLimit-Remaining.",
  },
  {
    question: "Are webhooks available?",
    answer:
      "Yes. Webhooks fire on shipment lifecycle events: created, label_generated, manifested, in_transit, delivered, exception, and returned. Payloads are JSON, signed with HMAC-SHA256 using a per-endpoint secret. Failed deliveries retry with exponential backoff for up to 24 hours.",
  },
  {
    question: "Is there an SDK for the Connexx API?",
    answer:
      "Working code examples are available in Node.js, Python, PHP, and Ruby covering the most common workflows. Any language with an HTTP client can integrate using the OpenAPI 3.1 spec, which is published at docs.itdglobal.com/openapi. Official SDKs are on the roadmap.",
  },
  {
    question: "Where can I find the OpenAPI spec?",
    answer:
      "The OpenAPI 3.1 specification is published at docs.itdglobal.com/openapi.yaml. The spec covers every endpoint, request schema, response schema, error type, and authentication method. Generate a client in any language with a code generator like openapi-generator or Stainless. The spec is versioned with the API.",
  },
  {
    question: "Does Connexx have a sandbox or staging environment?",
    answer:
      "Yes. Every account has a separate staging environment with its own API base URL and its own API key. Staging uses simulated carrier responses, generates non-production labels, and never charges for shipments. The data model is identical to production. Use staging for integration development before promoting to production.",
  },
];

const techArticleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Connexx API and developer resources",
  description:
    "REST API documentation, status page, changelog, webhook reference, and SDK examples for integrating with Connexx multi-carrier shipping.",
  url: `${SITE_URL}/help/developers`,
  proficiencyLevel: "Intermediate",
  dependencies:
    "REST client, JSON parser, optional HMAC verification for webhooks",
};

export default function DevelopersPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Help", path: "/help" },
            { name: "Developer resources", path: "/help/developers" },
          ]),
          techArticleSchema,
          faqSchema(faqItems),
        ]}
      />

      {/* Hero */}
      <section className="bleed-nav bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-text-tertiary">
              <Link href="/help" className="hover:text-accent">
                Help
              </Link>
              <span className="mx-2">/</span>
              <span className="text-text-secondary">Developer resources</span>
            </nav>
            <p className="text-eyebrow text-accent mb-3">
              For developers
            </p>
            <h1 className="text-display-xl text-text-primary">
              Developer resources
            </h1>
            <p className="mt-4 text-body-lg text-text-secondary max-w-3xl">
              The Connexx REST API covers shipment creation, rate comparison,
              label generation, tracking, carrier management, and customs.
              Authentication is bearer-token, the API is documented in OpenAPI
              3.1, and median response time is under 200ms. Below: the full
              reference, the live status page, the changelog, webhooks, rate
              limits, and SDK examples.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Button href="https://docs.itdglobal.com">
                Open the API reference
              </Button>
              <Button href="https://status.itdglobal.com" variant="secondary">
                View status page
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Canonical code snippet */}
      <section className="bg-bg-secondary py-14 md:py-16 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-5">
              <p className="text-eyebrow text-accent mb-2">
                Quick start
              </p>
              <h2 className="text-display-lg text-text-primary">
                A single call creates a shipment
              </h2>
              <p className="mt-2 text-text-secondary">
                A POST to <code className="font-mono text-sm">/v1/shipments</code> runs
                live rate comparison across every connected carrier, returns the
                selected carrier, the label URL, and the tracking number.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <CodeBlock code={canonicalSnippet} language="bash" label="cURL" />
          </ScrollReveal>
        </div>
      </section>

      {/* Six resource cards */}
      <section className="bg-white py-16 md:py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-10">
              <h2 className="text-display-lg text-text-primary">
                Resources
              </h2>
              <p className="mt-2 text-text-secondary">
                Everything you need to integrate, in one place.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
              {resources.map((res) => {
                const Icon = res.icon;
                return (
                  <a
                    key={res.title}
                    href={res.href}
                    target={res.external ? "_blank" : undefined}
                    rel={res.external ? "noopener noreferrer" : undefined}
                    className="group bg-white rounded-xl border border-border p-6 hover:shadow-md hover:border-accent/30 transition-all flex flex-col h-full"
                  >
                    <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <p className="text-heading-md text-text-primary group-hover:text-accent transition-colors">
                      {res.title}
                    </p>
                    <p className="text-body-sm text-text-secondary mt-1.5 flex-1">
                      {res.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                      {res.ctaLabel}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </a>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection
        items={faqItems}
        heading="Frequently asked questions"
        subheading="The questions developers ask before integrating."
      />
    </>
  );
}
