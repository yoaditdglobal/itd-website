import Link from "next/link";
import { Clock, AlertTriangle, FileSearch } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FaqSection from "@/components/sections/FaqSection";
import SupportForm from "@/components/help/SupportForm";
import { buildMetadata } from "@/lib/metadata";
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
} from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Submit a support request",
  description:
    "Tell us what's happening and we respond within 1 business day. Platform-down issues are responded to within 1 hour, around the clock.",
  path: "/help/submit-request",
});

const slaTiers = [
  {
    priority: "High",
    description: "Platform-down",
    response: "1 hour",
    hours: "24/7",
  },
  {
    priority: "Medium",
    description: "Operational issue",
    response: "4 business hours",
    hours: "Mon-Fri, 8am-6pm UK",
  },
  {
    priority: "Low",
    description: "General question",
    response: "1 business day",
    hours: "Mon-Fri, 8am-6pm UK",
  },
];

const faqItems = [
  {
    question: "How long does ITD support take to respond?",
    answer:
      "We respond to high-priority platform-down issues within 1 hour around the clock, medium-priority operational issues within 4 business hours, and low-priority general questions within 1 business day. Confirmation emails are sent within 5 minutes of submission.",
  },
  {
    question: "Do you offer phone support?",
    answer:
      "Phone support is available for existing customers on a Connexx Pro or Enterprise plan. Submit a request first and a member of the team will call back within the priority SLA. We do not operate a public support line.",
  },
  {
    question: "What information should I include in a support request?",
    answer:
      "Include your Connexx account ID, the action you were taking when the issue occurred, the expected result, the actual result, and the time it started. Add screenshots, error messages, and any order IDs or tracking numbers involved.",
  },
  {
    question: "Can I escalate a critical issue?",
    answer:
      "Yes. Set the priority to High when submitting and the request routes directly to the on-call team, who respond within 1 hour 24/7. If the request is genuinely platform-down for your operation, mark it High even outside business hours.",
  },
];

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Submit a support request",
  url: `${SITE_URL}/help/submit-request`,
  description:
    "Submit a support request to ITD Global. We respond within 1 business day for general questions and within 1 hour for platform-down issues.",
};

export default function SubmitRequestPage() {
  return (
    <>
      <JsonLd
        data={[
          contactPageSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Help", path: "/help" },
            { name: "Submit a request", path: "/help/submit-request" },
          ]),
          faqSchema(faqItems),
        ]}
      />

      {/* Hero */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-text-tertiary">
              <Link href="/help" className="hover:text-accent">
                Help
              </Link>
              <span className="mx-2">/</span>
              <span className="text-text-secondary">Submit a request</span>
            </nav>
            <h1 className="text-display-xl text-text-primary">
              Submit a request
            </h1>
            <p className="mt-4 text-body-lg text-text-secondary max-w-3xl">
              Tell us what&apos;s happening and we respond within 1 business
              day. Platform-down issues are responded to within 1 hour, around
              the clock. Confirmation arrives by email within 5 minutes of
              submission with a ticket reference for follow-up.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Form + SLA panel */}
      <section className="bg-bg-secondary py-12 md:py-16 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Form */}
            <div className="lg:col-span-8">
              <ScrollReveal>
                <div className="bg-white rounded-xl border border-border p-6 md:p-8">
                  <SupportForm />
                </div>
              </ScrollReveal>
            </div>

            {/* SLA panel */}
            <aside className="lg:col-span-4">
              <ScrollReveal delay={0.05}>
                <div className="bg-white rounded-xl border border-border p-6 sticky top-24">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-accent" />
                    <p className="font-semibold text-text-primary">
                      Response times
                    </p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {slaTiers.map((tier) => (
                      <li
                        key={tier.priority}
                        className="border-l-2 border-accent/40 pl-3"
                      >
                        <p className="text-heading-sm text-text-primary">
                          {tier.priority}{" "}
                          <span className="font-normal text-text-secondary">
                            ({tier.description})
                          </span>
                        </p>
                        <p className="text-xs text-text-secondary mt-0.5">
                          Within {tier.response}
                        </p>
                        <p className="text-xs text-text-tertiary">
                          {tier.hours}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-border pt-5">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-text-secondary" />
                      <p className="text-heading-sm text-text-primary">
                        What &quot;platform-down&quot; means
                      </p>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      A platform-down issue is one where Connexx is not
                      accepting orders, not generating labels, or not routing
                      dispatches. A delay or a single carrier issue is medium
                      priority unless your full operation is blocked.
                    </p>
                  </div>

                  <div className="border-t border-border pt-5 mt-5">
                    <div className="flex items-center gap-2 mb-2">
                      <FileSearch className="w-4 h-4 text-text-secondary" />
                      <p className="text-heading-sm text-text-primary">
                        Before you submit
                      </p>
                    </div>
                    <ul className="space-y-2 text-xs text-text-secondary leading-relaxed list-disc pl-4">
                      <li>
                        Check the status page for any open incidents.
                      </li>
                      <li>
                        Search the{" "}
                        <Link
                          href="/help/centre"
                          className="text-accent hover:underline"
                        >
                          Help Centre
                        </Link>{" "}
                        for existing articles.
                      </li>
                      <li>
                        Include your account ID, the action you were taking,
                        the expected result, and the actual result.
                      </li>
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection
        items={faqItems}
        heading="Frequently asked questions"
        subheading="What operators ask before opening a ticket."
      />
    </>
  );
}
