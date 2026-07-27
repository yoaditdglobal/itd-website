import type { ReactNode } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

/**
 * Shared shell for the legal pages (Privacy / Terms / Cookies): breadcrumb
 * JSON-LD, a plain hero with the "Last updated" date, and a readable prose
 * column. Section content is passed as children using <LegalSection>.
 */
export default function LegalPage({
  title,
  path,
  updated,
  intro,
  children,
}: {
  title: string;
  path: string;
  updated: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: title, path },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="bleed-nav bg-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h1 className="text-display-lg text-text-primary">{title}</h1>
            <p className="mt-3 text-sm text-text-tertiary">
              Last updated: {updated}
            </p>
            {intro && (
              <p className="mt-5 text-body-md text-text-secondary">{intro}</p>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* Body */}
      <article className="bg-white py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {children}
        </div>
      </article>

      {/* Related policies */}
      <section className="bg-bg-secondary py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <span className="text-text-tertiary">Related:</span>
          {[
            { name: "Privacy Policy", href: "/privacy-policy" },
            { name: "Terms of Service", href: "/terms-of-service" },
            { name: "Cookie Policy", href: "/cookie-policy" },
          ]
            .filter((l) => l.href !== path)
            .map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-accent font-medium hover:underline"
              >
                {l.name}
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}

export function LegalSection({
  number,
  heading,
  children,
}: {
  number: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-heading-lg text-text-primary mb-4">
        {number}. {heading}
      </h2>
      <div className="space-y-4 text-body-md text-text-secondary leading-relaxed">
        {children}
      </div>
    </section>
  );
}
