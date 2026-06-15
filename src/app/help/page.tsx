import Link from "next/link";
import { BookOpen, MessageSquare, Code, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FaqSection from "@/components/sections/FaqSection";
import HelpCard from "@/components/help/HelpCard";
import HelpSearchBar from "@/components/help/HelpSearchBar";
import { buildMetadata } from "@/lib/metadata";
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
} from "@/components/seo/JsonLd";

export const metadata = buildMetadata({
  title: "Help & Support",
  description:
    "Find answers in the Help Centre, submit a support request, or open the developer resources. We respond to every request within 1 business day.",
  path: "/help",
});

const helpCards = [
  {
    icon: BookOpen,
    title: "Help Centre",
    description:
      "Documentation, walkthroughs, and answers for Connexx, integrations, carriers, billing, and account admin. Browse by category or search.",
    ctaLabel: "Browse the Help Centre",
    href: "/help/centre",
  },
  {
    icon: MessageSquare,
    title: "Submit a request",
    description:
      "Need a direct answer from our team? Tell us what's happening and we respond within 1 business day, 1 hour for platform-down issues.",
    ctaLabel: "Submit a request",
    href: "/help/submit-request",
  },
  {
    icon: Code,
    title: "Developer resources",
    description:
      "API documentation, the live status page, the changelog, and webhook reference. Everything you need to integrate with Connexx.",
    ctaLabel: "Open developer resources",
    href: "/help/developers",
  },
];

// Placeholder until the support team confirms the live top 5.
// TODO: replace with the real list once /help/centre articles ship in Phase 5b.
const popularArticles = [
  {
    title: "Connecting Shopify to Connexx",
    summary:
      "The 10-minute setup. Carrier accounts, label printing, and order sync from the Shopify admin.",
    category: "Integrations",
    slug: "connecting-shopify-to-connexx",
  },
  {
    title: "Setting up your Royal Mail account in Connexx",
    summary:
      "How to add Tracked 24, Tracked 48, Signed, and First/Second Class services to your dispatch flow.",
    category: "Carriers",
    slug: "setting-up-royal-mail",
  },
  {
    title: "How rate comparison works",
    summary:
      "Live API call on every shipment, rule-based selection, and how to override the cheapest option when you need to.",
    category: "Connexx platform",
    slug: "how-rate-comparison-works",
  },
  {
    title: "Generating customs documentation for international shipments",
    summary:
      "HS codes, EORI, IOSS for EU orders under 150 EUR, and country-specific paperwork.",
    category: "Connexx platform",
    slug: "generating-customs-documentation",
  },
  {
    title: "API authentication and rate limits",
    summary:
      "Bearer token setup, per-endpoint rate limits, and how to request a higher tier.",
    category: "API & Developers",
    slug: "api-authentication-and-rate-limits",
  },
];

const faqItems = [
  {
    question: "How do I contact ITD support?",
    answer:
      "Submit a request at /help/submit-request and our team responds within 1 business day. Platform-down issues are responded to within 1 hour. Include your account ID and a clear description of what's happening, with screenshots if useful. Confirmation arrives by email within 5 minutes of submission.",
  },
  {
    question: "What is your support SLA?",
    answer:
      "We respond to low-priority requests within 1 business day, medium-priority operational issues within 4 business hours, and high-priority platform-down issues within 1 hour around the clock. Enterprise customers on a custom contract may have a different SLA in their agreement.",
  },
  {
    question: "Do you offer phone support?",
    answer:
      "Phone support is available for existing customers on a Connexx Pro or Enterprise plan. Submit a request first and a member of the team will call back within the SLA window. We do not operate a public support line.",
  },
  {
    question: "Where can I find the API documentation?",
    answer:
      "API documentation lives at /help/developers, with the full reference at docs.itdglobal.com. The reference includes every Connexx endpoint, authentication, webhooks, rate limits, and the OpenAPI spec.",
  },
  {
    question: "Can I get help setting up a carrier account?",
    answer:
      "Yes. Carrier account setup is part of Connexx onboarding for new customers, and the Help Centre includes a walkthrough for every supported carrier. For account-specific issues, submit a request and the team will work with you and the carrier directly.",
  },
];

export default function HelpHubPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Help", path: "/help" },
          ]),
          faqSchema(faqItems),
        ]}
      />

      {/* Hero */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="text-eyebrow text-accent mb-3">
              Help & Support
            </p>
            <h1 className="text-display-xl text-text-primary">
              How can we help?
            </h1>
            <p className="mt-4 text-body-lg text-text-secondary max-w-3xl mx-auto">
              Browse the Help Centre for documentation and walkthroughs, submit
              a request if you need a direct answer from the support team, or
              open the developer resources for API documentation and the
              platform changelog.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-8 md:mt-10">
              <HelpSearchBar />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Three help cards */}
      <section className="bg-bg-secondary py-16 md:py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid md:grid-cols-3 gap-5 md:gap-6">
              {helpCards.map((card) => (
                <HelpCard key={card.title} {...card} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Popular articles */}
      <section className="bg-white py-16 md:py-20 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-10">
              <h2 className="text-display-lg text-text-primary">
                Popular articles
              </h2>
              <p className="mt-2 text-text-secondary">
                The five articles most operators read first.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <div className="grid sm:grid-cols-2 gap-4">
              {popularArticles.map((article) => (
                <Link
                  key={article.slug}
                  // TODO: dynamic article routing arrives in Phase 5b. For now,
                  // popular articles link to the Help Centre index.
                  href="/help/centre"
                  className="group bg-white rounded-xl border border-border p-5 hover:shadow-md hover:border-accent/30 transition-all flex flex-col"
                >
                  <span className="text-eyebrow text-accent mb-2">
                    {article.category}
                  </span>
                  <p className="text-heading-sm text-text-primary group-hover:text-accent transition-colors">
                    {article.title}
                  </p>
                  <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
                    {article.summary}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent">
                    Read article
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection
        items={faqItems}
        heading="Frequently asked questions"
        subheading="The answers operators ask about the help system itself."
      />
    </>
  );
}
