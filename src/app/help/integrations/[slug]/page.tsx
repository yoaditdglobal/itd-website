import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/animations/ScrollReveal";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import { buildMetadata } from "@/lib/metadata";
import {
  JsonLd,
  articleSchema,
  breadcrumbSchema,
} from "@/components/seo/JsonLd";
import {
  INTEGRATION_GUIDES,
  getIntegrationGuide,
} from "@/lib/help-integrations";
import { ArrowLeft, ArrowRight, CircleCheck } from "lucide-react";

const BASE = "/help/integrations";

export function generateStaticParams() {
  return INTEGRATION_GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getIntegrationGuide(slug);
  if (!guide) return {};
  return buildMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: `${BASE}/${guide.slug}`,
  });
}

export default async function IntegrationGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getIntegrationGuide(slug);
  if (!guide) notFound();

  const path = `${BASE}/${guide.slug}`;
  const jsonLd = [
    articleSchema({
      headline: guide.metaTitle,
      description: guide.metaDescription,
      path,
      datePublished: "2026-07-09",
      dateModified: "2026-07-09",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Help", path: "/help" },
      { name: "Integrations", path: BASE },
      { name: guide.name, path },
    ]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="bleed-nav bg-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Link
              href={BASE}
              className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> All integration guides
            </Link>
            <div className="flex items-center gap-4 mb-5">
              <span className="inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-border bg-white p-2">
                <IntegrationLogo
                  name={guide.name}
                  logo={guide.logo}
                  size="sm"
                  fit="contain"
                />
              </span>
            </div>
            <h1 className="text-display-lg text-text-primary">
              {guide.metaTitle}
            </h1>
            <p className="mt-5 text-body-lg text-text-secondary">
              {guide.overview}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Article */}
      <article className="bg-white pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Before you start */}
          <section aria-labelledby="before-you-start">
            <h2
              id="before-you-start"
              className="text-heading-lg text-text-primary mb-4"
            >
              Before you start
            </h2>
            <ul className="space-y-3 rounded-xl border border-border bg-bg-secondary p-5">
              {guide.beforeYouStart.map((item) => (
                <li key={item} className="flex gap-3 text-body-sm text-text-secondary">
                  <CircleCheck
                    className="h-5 w-5 flex-shrink-0 text-accent mt-0.5"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Steps */}
          <section aria-labelledby="step-by-step">
            <h2
              id="step-by-step"
              className="text-heading-lg text-text-primary mb-6"
            >
              Step-by-step guide
            </h2>
            <ol className="space-y-6">
              {guide.steps.map((step, i) => (
                <li
                  key={step.title}
                  className="rounded-2xl border border-border bg-white p-5 md:p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-white text-sm font-bold">
                      {i + 1}
                    </span>
                    <p className="text-heading-sm text-text-primary">
                      {step.title}
                    </p>
                  </div>
                  <ul className="space-y-2 pl-11">
                    {step.actions.map((action) => (
                      <li
                        key={action}
                        className="list-disc text-body-sm text-text-secondary leading-relaxed"
                      >
                        {action}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>

          {/* Important */}
          <div className="border-l-4 border-accent bg-accent-light/40 rounded-r-xl p-5">
            <p className="text-eyebrow text-accent mb-2">Important</p>
            <p className="text-text-primary text-body-sm leading-relaxed">
              {guide.important}
            </p>
          </div>

          {/* Troubleshooting */}
          <section aria-labelledby="troubleshooting">
            <h2
              id="troubleshooting"
              className="text-heading-lg text-text-primary mb-4"
            >
              Troubleshooting
            </h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-bg-secondary text-text-primary">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold w-2/5">
                      Issue
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      What to do
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-text-secondary">
                  {guide.troubleshooting.map((row) => (
                    <tr key={row.issue}>
                      <td className="px-4 py-3 font-medium text-text-primary align-top">
                        {row.issue}
                      </td>
                      <td className="px-4 py-3">{row.fix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* About the integration + related */}
          <section aria-labelledby="related-articles">
            <h2
              id="related-articles"
              className="text-heading-lg text-text-primary mb-4"
            >
              Related articles
            </h2>
            <ul className="space-y-3">
              {guide.related.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="group flex items-center justify-between gap-4 p-4 bg-bg-secondary rounded-xl border border-border hover:border-accent/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                  >
                    <span className="text-sm font-medium text-text-primary group-hover:text-accent">
                      {r.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-accent group-hover:translate-x-1 transition-transform motion-reduce:group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={guide.marketingHref}
                  className="group flex items-center justify-between gap-4 p-4 bg-bg-secondary rounded-xl border border-border hover:border-accent/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                >
                  <span className="text-sm font-medium text-text-primary group-hover:text-accent">
                    About the {guide.name} integration
                  </span>
                  <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-accent group-hover:translate-x-1 transition-transform motion-reduce:group-hover:translate-x-0" />
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </article>

      {/* CTA */}
      <section className="bg-bg-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-display-lg text-white mb-3">
              Still need help?
            </h2>
            <p className="text-white/80 mb-8 text-body-lg">
              Submit a support request and include your account ID and the name
              of the integration. We respond within 1 business day.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/help/submit-request"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
              >
                Submit a request
              </Link>
              <Link
                href={BASE}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-transparent px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                All integration guides
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
