import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd, breadcrumbSchema, itemListSchema } from "@/components/seo/JsonLd";
import { ArrowRight } from "lucide-react";

const PATH = "/help/carrier";

/** Articles in the Carrier category. Add new carrier updates here — the card
 *  grid, ItemList JSON-LD, and (separately) src/lib/help-search.ts all need
 *  the new entry. */
const ARTICLES = [
  {
    slug: "yodel-inpost",
    name: "InPost",
    logo: "/logos/carriers/inpost-icon.png",
    title: "Yodel is now InPost — what this means for your deliveries",
    summary:
      "Yodel and InPost have combined into a single delivery network. What changed on 17 July 2026, what carries over automatically, and where to go for support.",
  },
];

export const metadata = buildMetadata({
  title: "Carrier updates",
  description:
    "Carrier news and network updates that affect your deliveries — acquisitions, rebrands, and service changes across the ITD carrier network.",
  path: PATH,
});

export default function HelpCarrierPage() {
  const jsonLd = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Help", path: "/help" },
      { name: "Carrier", path: PATH },
    ]),
    itemListSchema({
      path: PATH,
      name: "ITD Global carrier updates",
      items: ARTICLES.map((a) => ({
        name: a.title,
        url: `${PATH}/${a.slug}`,
        description: a.summary,
      })),
    }),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="bleed-nav bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-display-xl text-text-primary">
              Carrier updates
            </h1>
            <p className="mt-4 text-body-lg text-text-secondary max-w-2xl mx-auto">
              News from across the carrier network that affects how your
              parcels move — acquisitions, rebrands, and service changes,
              with what each one means for your deliveries.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Article cards */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5 items-stretch">
            {ARTICLES.map((a, i) => (
              <ScrollReveal key={a.slug} delay={i * 0.05} className="h-full">
                <Link
                  href={`${PATH}/${a.slug}`}
                  className="group relative flex h-full flex-col rounded-2xl border border-border bg-white p-5 md:p-6 transition-all duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 hover:shadow-md hover:border-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-border bg-white p-1.5">
                      <IntegrationLogo name={a.name} logo={a.logo} size="sm" fit="contain" />
                    </span>
                    <ArrowRight
                      className="w-4 h-4 text-text-tertiary group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-200 motion-reduce:group-hover:translate-x-0 mt-1.5"
                      aria-hidden
                    />
                  </div>
                  <p className="text-heading-sm text-text-primary group-hover:text-accent transition-colors">
                    {a.title}
                  </p>
                  <p className="mt-2 text-body-sm text-text-secondary leading-relaxed flex-1">
                    {a.summary}
                  </p>
                  <span className="mt-4 text-sm font-medium text-accent">
                    Read the update
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-display-lg text-white mb-3">
              Questions about a carrier change?
            </h2>
            <p className="text-white/80 mb-8 text-body-lg">
              Your Account Manager can walk you through what any network change
              means for your shipments — or raise a request and we&rsquo;ll
              respond within 1 business day.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/help/submit-request"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
              >
                Submit a request
              </Link>
              <Link
                href="/help"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-transparent px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Back to Help Centre
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
