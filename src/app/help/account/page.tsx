import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/site-config";

const PATH = "/help/account";

export const metadata = buildMetadata({
  title: "Account & admin — Help Centre",
  description:
    "Account and admin documentation for Connexx: claims policies by carrier, users and permissions, child accounts, single sign-on, audit logs, and account security.",
  path: PATH,
});

// Subcategories of Account & admin. Claims is live; the rest are scaffolded
// (link back to the centre, like the other Help Centre topics) until their
// articles land.
const subcategories = [
  {
    icon: ShieldCheck,
    name: "Claims policies by carrier",
    description:
      "Loss and damage claim windows, value limits, and the evidence to send — for all 14 carriers ITD works with.",
    href: "/help/account/claims",
    meta: "14 carriers",
    live: true,
  },
];

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Account & admin help topics",
  itemListElement: subcategories.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.name,
    url: `${SITE_URL}${s.href}`,
  })),
};

export default function AccountHelpPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Help", path: "/help" },
            { name: "Account & admin", path: PATH },
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
              / <span className="text-text-secondary">Account &amp; admin</span>
            </nav>
            <h1 className="text-display-xl text-text-primary">Account &amp; admin</h1>
            <p className="mt-4 text-body-lg text-text-secondary max-w-2xl mx-auto">
              Users, permissions, child accounts, single sign-on, audit logs,
              account security — and claims. Pick a topic below.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Subcategories */}
      <section className="bg-bg-secondary py-16 md:py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-10">
              <h2 className="text-display-lg text-text-primary">Topics</h2>
              <p className="mt-2 text-text-secondary">
                Everything under account and admin. Claims is live now; more
                topics are on the way.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {subcategories.map((sub) => {
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
                      {sub.meta ? (
                        <span className="text-eyebrow text-accent bg-accent/10 rounded-full px-2.5 py-1">
                          {sub.meta}
                        </span>
                      ) : (
                        <span className="text-eyebrow text-text-tertiary">
                          Coming soon
                        </span>
                      )}
                    </div>
                    <p className="text-heading-md text-text-primary group-hover:text-accent transition-colors">
                      {sub.name}
                    </p>
                    <p className="text-body-sm text-text-secondary mt-1.5 flex-1">
                      {sub.description}
                    </p>
                    {sub.live && (
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent">
                        Open
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    )}
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
