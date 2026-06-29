import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ClaimsIndex from "@/components/sections/ClaimsIndex";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/site-config";
import { CLAIMS_POLICIES } from "@/lib/help-claims";

const PATH = "/help/centre/account/claims";

export const metadata = buildMetadata({
  title: "Claims policies by carrier",
  description:
    "Loss and damage claim policies for every carrier ITD works with — claim windows, maximum claim values, processing times, and the evidence to send. DHL, Evri, Royal Mail, FedEx, UPS, DPD, and more.",
  path: PATH,
});

// ItemList of every carrier policy (deep-linked) — helps search engines and AI
// models cite an individual carrier's claims policy.
const carrierItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "ITD claims policies by carrier",
  itemListElement: CLAIMS_POLICIES.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${p.carrier} claims policy`,
    url: `${SITE_URL}${PATH}#${p.slug}`,
  })),
};

export default function ClaimsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Help", path: "/help" },
            { name: "Help Centre", path: "/help/centre" },
            { name: "Account & admin", path: "/help/centre/account" },
            { name: "Claims policies", path: PATH },
          ]),
          carrierItemList,
        ]}
      />

      {/* Hero */}
      <section className="bleed-nav bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="inline-block px-3 py-1 rounded-full bg-accent-light text-accent text-eyebrow mb-4">
              Account &amp; admin
            </span>
            <h1 className="text-display-xl text-text-primary">
              Claims policies by carrier
            </h1>
            <p className="mt-4 text-body-lg text-text-secondary max-w-2xl mx-auto">
              When a parcel is lost or damaged, every carrier has its own claim
              window, value limit, and evidence requirements. Here is the policy
              for each carrier ITD works with — what to send, how long you have,
              and how long a decision takes.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* How to use this page */}
      <section className="bg-bg-secondary py-12 md:py-16 border-y border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-eyebrow text-accent mb-3">How to use this page</p>
            <p className="text-body-md text-text-secondary mb-4">
              Each carrier lists its <strong>Loss</strong> and{" "}
              <strong>Damage</strong> policy side by side: the claim window (in
              calendar days, and the event it counts from), the maximum claim
              value, and exactly what to send. Some carriers do not accept damage
              claims — that is marked clearly.
            </p>
            <p className="text-body-md text-text-secondary">
              Use the filter to jump to a carrier, or search the Help Centre
              (e.g. <em>“DHL claim”</em>) to land straight on its policy. Every
              carrier has its own anchor URL (e.g.{" "}
              <code className="text-caption bg-white px-1.5 py-0.5 rounded border border-border">
                {PATH}#dhl
              </code>
              ) so you can link to one policy from a ticket or a customer reply.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Searchable, deep-linkable per-carrier policies (client) */}
      <ClaimsIndex policies={CLAIMS_POLICIES} />

      {/* CTA */}
      <section className="bg-bg-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-display-lg text-white mb-3">
              Need to raise a claim?
            </h2>
            <p className="text-white/80 mb-8 text-body-lg">
              Submit a request with your tracking number and the evidence listed
              above, and the ITD team will start the claim with the carrier on
              your behalf.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/help/submit-request"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
              >
                Submit a request
              </Link>
              <Link
                href="/help/centre"
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
