import Link from "next/link";
import {
  LayoutDashboard,
  Plug,
  Truck,
  Receipt,
  Users,
  Code,
  ArrowRight,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FaqSection from "@/components/sections/FaqSection";
import HelpSearchBar from "@/components/help/HelpSearchBar";
import { buildMetadata } from "@/lib/metadata";
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
} from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Help Centre",
  description:
    "Documentation and walkthroughs for Connexx, integrations, carriers, billing, and account admin. Browse by category or search for an article.",
  path: "/help/centre",
});

// TODO: category and article routes (/help/centre/[category],
// /help/centre/[category]/[article]) arrive in Phase 5b. For this scaffold
// pass, every category card and featured article links back to /help/centre.
const categories = [
  {
    icon: LayoutDashboard,
    name: "Connexx platform",
    description:
      "Getting started, dashboard tour, rate engine, dispatch rules, account settings, and reporting.",
    href: "/help/centre",
    slug: "connexx",
  },
  {
    icon: Plug,
    name: "Integrations",
    description:
      "eCommerce platforms, ERPs, WMS, marketplaces, and accounting tools that connect to Connexx.",
    href: "/help/centre",
    slug: "integrations",
  },
  {
    icon: Truck,
    name: "Carriers",
    description:
      "Setting up carrier accounts, label printing, manifesting, and managing carrier-specific services.",
    href: "/help/centre",
    slug: "carriers",
  },
  {
    icon: Receipt,
    name: "Billing",
    description:
      "Invoicing, payment methods, rate cards, billing cycles, and credit notes.",
    href: "/help/centre",
    slug: "billing",
  },
  {
    icon: Users,
    name: "Account & admin",
    description:
      "Users, permissions, child accounts, single sign-on, audit logs, and account security.",
    href: "/help/centre",
    slug: "account",
  },
  {
    icon: Code,
    name: "API & developers",
    description:
      "API authentication, endpoints, webhooks, rate limits, SDKs, and the changelog.",
    href: "/help/developers",
    slug: "developers",
  },
];

const featuredArticles = [
  {
    title: "Connecting Shopify to Connexx",
    summary:
      "Set up the official Shopify app and route every order through multi-carrier comparison in under 10 minutes.",
    category: "Integrations",
  },
  {
    title: "Setting up your Royal Mail account",
    summary:
      "Add Tracked 24, Tracked 48, Signed, First Class, and Second Class services to your dispatch flow.",
    category: "Carriers",
  },
  {
    title: "How rate comparison works",
    summary:
      "Live API call on every shipment, rule-based carrier selection, and overrides for specific products or lanes.",
    category: "Connexx platform",
  },
  {
    title: "Generating customs documentation",
    summary:
      "HS codes from your product catalogue, EORI numbers, IOSS for EU under 150 EUR, and country-specific paperwork.",
    category: "Connexx platform",
  },
  {
    title: "Linking your ERP to Connexx",
    summary:
      "Order pull, label write-back, and tracking sync for the most common ERPs and WMSs.",
    category: "Integrations",
  },
  {
    title: "Inviting users and setting permissions",
    summary:
      "Adding teammates, role-based access control, and managing child accounts under a parent contract.",
    category: "Account & admin",
  },
  {
    title: "Reading your monthly invoice",
    summary:
      "Line items by carrier, surcharges, fuel costs, and how to reconcile a Connexx invoice against your carrier invoices.",
    category: "Billing",
  },
  {
    title: "Printing a label",
    summary:
      "Format options, printer setup, and what to do when label generation fails.",
    category: "Connexx platform",
  },
  {
    title: "Handling a customs hold",
    summary:
      "What to do when a carrier flags a customs issue, how to upload missing documents, and how to prevent the same issue next time.",
    category: "Carriers",
  },
  {
    title: "API authentication",
    summary:
      "Bearer token setup, key rotation, environment separation between staging and production.",
    category: "API & developers",
  },
];

const faqItems = [
  {
    question: "Where do I start if I am new to Connexx?",
    answer:
      "Start with the Connexx platform category for the dashboard tour and the rate engine overview, then move to Integrations to connect your eCommerce platform or ERP, then to Carriers to add your carrier accounts. Most new customers are dispatching live within two business days of signing.",
  },
  {
    question: "How do I search for a specific article?",
    answer:
      "Use the search bar at the top of this page or on /help. Search matches article titles, summaries, and body text across every category. If the search returns no results, the article may not exist yet. Submit a request at /help/submit-request and the team will answer directly.",
  },
  {
    question: "Can I get help if I am not yet a customer?",
    answer:
      "Yes. The Help Centre is open to anyone evaluating Connexx. Browse the categories, read the integration guides, and check the developer documentation at /help/developers.",
  },
  {
    question: "Are these articles kept up to date?",
    answer:
      "Yes. Articles are reviewed by the product and support teams whenever the underlying feature changes. Every article shows its last-updated date at the top.",
  },
  {
    question: "What if I cannot find the answer here?",
    answer:
      "Submit a request at /help/submit-request. Tell us what you were trying to do and what happened. We respond within 1 business day, 1 hour for platform-down issues.",
  },
];

// ItemList schema for the 6 categories — helps AI models cite the structure.
const categoryItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: categories.map((cat, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: cat.name,
    url: `${SITE_URL}${cat.href}`,
  })),
};

export default function HelpCentrePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Help", path: "/help" },
            { name: "Help Centre", path: "/help/centre" },
          ]),
          categoryItemList,
          faqSchema(faqItems),
        ]}
      />

      {/* Hero */}
      <section className="bleed-nav bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-text-tertiary">
              <Link href="/help" className="hover:text-accent">
                Help
              </Link>
              <span className="mx-2">/</span>
              <span className="text-text-secondary">Help Centre</span>
            </nav>
            <h1 className="text-display-xl text-text-primary">
              Help Centre
            </h1>
            <p className="mt-4 text-body-lg text-text-secondary max-w-3xl mx-auto">
              Documentation, walkthroughs, and answers for Connexx and every
              supported integration. Browse the categories below or search for
              the article you need.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-8 md:mt-10">
              <HelpSearchBar placeholder="Search articles..." />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Browse by category */}
      <section className="bg-bg-secondary py-16 md:py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-10">
              <h2 className="text-display-lg text-text-primary">
                Browse by category
              </h2>
              <p className="mt-2 text-text-secondary">
                Six product areas. Pick the one closest to your question.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.slug}
                    href={cat.href}
                    className="group bg-white rounded-xl border border-border p-6 hover:shadow-md hover:border-accent/30 transition-all flex flex-col h-full"
                  >
                    <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <p className="text-heading-md text-text-primary group-hover:text-accent transition-colors">
                      {cat.name}
                    </p>
                    <p className="text-body-sm text-text-secondary mt-1.5 flex-1">
                      {cat.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent">
                      Browse category
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured articles */}
      <section className="bg-white py-16 md:py-20 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-10">
              <h2 className="text-display-lg text-text-primary">
                Featured articles
              </h2>
              <p className="mt-2 text-text-secondary">
                The ten most-read articles across the Help Centre.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <ol className="grid sm:grid-cols-2 gap-4">
              {featuredArticles.map((article, i) => (
                <li key={article.title}>
                  <Link
                    // TODO: dynamic article routing arrives in Phase 5b.
                    href="/help/centre"
                    className="group bg-white rounded-xl border border-border p-5 hover:shadow-md hover:border-accent/30 transition-all flex gap-4 h-full"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-md bg-accent/10 text-accent text-sm font-semibold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="text-eyebrow text-accent">
                        {article.category}
                      </span>
                      <p className="text-heading-sm text-text-primary group-hover:text-accent transition-colors mt-1">
                        {article.title}
                      </p>
                      <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection
        items={faqItems}
        heading="Frequently asked questions"
        subheading="Cross-category questions that come up most often."
      />
    </>
  );
}
