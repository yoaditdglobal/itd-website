import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import { buildMetadata } from "@/lib/metadata";
import {
  JsonLd,
  articleSchema,
  breadcrumbSchema,
} from "@/components/seo/JsonLd";
import { ArrowLeft } from "lucide-react";

const PATH = "/help/carrier/yodel-inpost";
const UPDATED = "2026-07-28";
const UPDATED_LABEL = "28 July 2026";

export const metadata = buildMetadata({
  title: "Yodel is now InPost — what this means for your deliveries",
  description:
    "Yodel and InPost have combined into a single delivery network. What changed on 17 July 2026, what carries over automatically, and where to go for tracking and support.",
  path: PATH,
});

const jsonLd = [
  articleSchema({
    headline: "Yodel is now InPost: what this means for your deliveries",
    description:
      "Yodel and InPost have combined into a single delivery network. What changed on 17 July 2026, what carries over automatically, and where to go for tracking and support.",
    path: PATH,
    datePublished: UPDATED,
    dateModified: UPDATED,
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Help", path: "/help" },
    { name: "Carrier", path: "/help/carrier" },
    { name: "Yodel is now InPost", path: PATH },
  ]),
];

export default function YodelInpostArticlePage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section data-hero-tone="light" className="bleed-nav bg-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Link
              href="/help/carrier"
              className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Carrier topics
            </Link>
            <div className="flex items-center gap-4 mb-5">
              <span className="inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-border bg-white p-2">
                <IntegrationLogo
                  name="InPost"
                  logo="/logos/carriers/inpost-icon.png"
                  size="sm"
                  fit="contain"
                />
              </span>
              <span className="text-eyebrow text-accent">Carrier update</span>
            </div>
            <h1 className="text-display-lg text-text-primary">
              Yodel is now InPost: what this means for your deliveries
            </h1>
            <p className="mt-5 text-body-lg text-text-secondary">
              Yodel and InPost have combined into a single delivery network.
              Here&rsquo;s what&rsquo;s changed and where to go for support.
            </p>
            <p className="mt-4 text-caption text-text-tertiary">
              Last updated {UPDATED_LABEL}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Article */}
      <article className="bg-white pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <section aria-labelledby="whats-happened">
            <h2 id="whats-happened" className="text-heading-lg text-text-primary mb-4">
              What&rsquo;s happened
            </h2>
            <p className="text-body-md text-text-secondary leading-relaxed">
              InPost acquired Yodel&rsquo;s parent company in 2025. Since then,
              the two networks have been integrating behind the scenes, bringing
              together Yodel&rsquo;s doorstep delivery service with
              InPost&rsquo;s locker and out-of-home network. On 17 July 2026,
              this integration became public: Yodel by InPost transitioned fully
              to the InPost brand, and the Yodel website and app were retired.
            </p>
          </section>

          <section aria-labelledby="whats-changed">
            <h2 id="whats-changed" className="text-heading-lg text-text-primary mb-4">
              What&rsquo;s changed for you
            </h2>
            <div className="space-y-4 text-body-md text-text-secondary leading-relaxed">
              <p>
                Tracking, account management, and customer support are now
                handled through InPost rather than Yodel. Any delivery
                preferences previously set in the Yodel by InPost app have
                carried over automatically, with one exception: what3words
                locations will need to be re-entered in the InPost app.
              </p>
              <p>
                For support, please use the InPost app or visit{" "}
                <a
                  href="https://inpost.co.uk/help"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline underline-offset-2"
                >
                  inpost.co.uk/help
                </a>
                , rather than Yodel&rsquo;s previous channels.
              </p>
            </div>
          </section>

          {/* Good to know */}
          <div className="border-l-4 border-accent bg-accent-light/40 rounded-r-xl p-5">
            <p className="text-eyebrow text-accent mb-2">Good to know</p>
            <p className="text-text-primary text-body-sm leading-relaxed">
              You may still see the Yodel name on some retailers&rsquo; websites
              for a period — this is expected to continue through 2027 as those
              retailers update their systems. Regardless, your parcel is moving
              through the same network.
            </p>
          </div>

          <section aria-labelledby="your-shipments">
            <h2 id="your-shipments" className="text-heading-lg text-text-primary mb-4">
              Questions about how this affects your shipments
            </h2>
            <p className="text-body-md text-text-secondary leading-relaxed">
              Please contact your Account Manager — they can walk you through
              anything this change touches on your account, from service
              mapping to tracking. You can also read more about{" "}
              <Link
                href="/integrations/carriers/inpost"
                className="text-accent hover:underline underline-offset-2"
              >
                shipping with InPost through ITD
              </Link>
              .
            </p>
          </section>
        </div>
      </article>

      {/* CTA */}
      <section className="bg-bg-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-display-lg text-white mb-3">Still need help?</h2>
            <p className="text-white/80 mb-8 text-body-lg">
              Submit a support request and include your account ID. We respond
              within 1 business day.
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
                Help Centre
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
