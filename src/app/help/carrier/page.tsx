import Link from "next/link";
import { Megaphone, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/site-config";

const PATH = "/help/carrier";

export const metadata = buildMetadata({
  title: "Carrier — Help Centre",
  description:
    "Carrier documentation for ITD: network updates, day-to-day carrier operations, and collections — everything about the carriers behind your deliveries.",
  path: PATH,
});

// Articles in the Carrier category. Every card links straight to an
// article (Help Centre standard — no subcategory hops, no coming-soon
// placeholders). New carrier articles get a card here + a search doc in
// src/lib/help-search.ts.
const articles = [
  {
    icon: Megaphone,
    name: "Yodel is now InPost — what this means for your deliveries",
    description:
      "Yodel and InPost have combined into a single delivery network. What changed on 17 July 2026, what carries over automatically, and where to go for support.",
    href: "/help/carrier/yodel-inpost",
    meta: "InPost",
  },
];

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Carrier help articles",
  itemListElement: articles.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.name,
    url: `${SITE_URL}${s.href}`,
  })),
};

export default function CarrierHelpPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Help", path: "/help" },
            { name: "Carrier", path: PATH },
          ]),
          itemList,
        ]}
      />

      {/* Hero */}
      <section className="bleed-nav bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <nav className="mb-4 text-caption text-text-tertiary" aria-label="Breadcrumb">
              <Link href="/help" className="hover:text-accent">
                Help Centre
              </Link>{" "}
              / <span className="text-text-secondary">Carrier</span>
            </nav>
            <h1 className="text-display-xl text-text-primary">Carrier</h1>
            <p className="mt-4 text-body-lg text-text-secondary max-w-2xl mx-auto">
              Network updates, day-to-day carrier operations, and collections —
              everything about the carriers behind your deliveries. Pick a
              topic below.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Subcategories */}
      <section className="bg-bg-secondary py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-10">
              <h2 className="text-display-lg text-text-primary">Topics</h2>
              <p className="mt-2 text-text-secondary">
                Every article under Carrier — pick the one you need.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {articles.map((sub) => {
                const Icon = sub.icon;
                return (
                  <Link
                    key={sub.name}
                    href={sub.href}
                    className="group bg-white rounded-xl border border-border p-6 hover:shadow-md hover:border-accent/30 transition-all flex flex-col h-full"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <span className="text-eyebrow text-accent bg-accent/10 rounded-full px-2.5 py-1">
                        {sub.meta}
                      </span>
                    </div>
                    <p className="text-heading-md text-text-primary group-hover:text-accent transition-colors">
                      {sub.name}
                    </p>
                    <p className="text-body-sm text-text-secondary mt-1.5 flex-1">
                      {sub.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent">
                      Open
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
