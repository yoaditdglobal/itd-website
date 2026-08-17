import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd, breadcrumbSchema, howToSchema } from "@/components/seo/JsonLd";

const PATH = "/help/account/how-to-raise-a-claim";

export const metadata = buildMetadata({
  title: "How to raise a claim on Connexx",
  description:
    "Step-by-step guide to raising a lost or damaged parcel claim on Connexx — the automatic eligibility checks, the four-step flow (Issue, Eligibility, Evidence, Review), the evidence to attach, and how to track the outcome.",
  path: PATH,
});

// HowTo steps mirror the on-page sections (each anchors to its heading).
const HOWTO_STEPS = [
  {
    anchor: "opening",
    name: "Open a claim from Shipments",
    text: "In Shipments, open the parcel and select Get support (or tick it and use the support icon) to open the Create support case window.",
  },
  {
    anchor: "step-issue",
    name: "Step 1 — Choose the issue",
    text: "Select Lost, Damaged, or Technical support, then select Next. You can save a draft at any point and finish later.",
  },
  {
    anchor: "step-eligibility",
    name: "Step 2 — Confirm eligibility",
    text: "Connexx checks the tracking history against the carrier's claim requirements and confirms whether the shipment is eligible, with the maximum claim value and the date the window closes.",
  },
  {
    anchor: "step-evidence",
    name: "Step 3 — Add evidence",
    text: "Enter the goods and packaging description and the claim value, and attach proof of value — plus a signed Denial of Receipt if a delivered parcel wasn't received.",
  },
  {
    anchor: "step-review",
    name: "Step 4 — Review and submit",
    text: "Check the carrier, claim type, value and documents, add any comments, tick both confirmation boxes, and select Submit request.",
  },
];

/** Accent-dot list item, for the checks / bullets. */
function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-body-md text-text-secondary">
      <span
        aria-hidden
        className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent"
      />
      <span>{children}</span>
    </li>
  );
}

/** Numbered step block with an anchor id. */
function Step({
  n,
  id,
  title,
  children,
}: {
  n: number;
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      id={id}
      className="scroll-mt-nav rounded-2xl border border-border bg-white p-6 md:p-7"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent-light text-sm font-semibold text-accent">
          {n}
        </span>
        <h3 className="text-heading-md text-text-primary">{title}</h3>
      </div>
      <div className="mt-4 space-y-4 text-body-md text-text-secondary">
        {children}
      </div>
    </div>
  );
}

export default function HowToRaiseAClaimPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Help", path: "/help" },
            { name: "Account & admin", path: "/help/account" },
            { name: "How to raise a claim", path: PATH },
          ]),
          howToSchema({
            path: PATH,
            name: "How to raise a claim on Connexx",
            description:
              "Raise a lost or damaged parcel claim on Connexx in four steps and track it through to an outcome.",
            steps: HOWTO_STEPS,
          }),
        ]}
      />

      {/* Hero */}
      <section className="bleed-nav bg-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <nav
              className="mb-4 text-caption text-text-tertiary"
              aria-label="Breadcrumb"
            >
              <Link href="/help" className="hover:text-accent">
                Help Centre
              </Link>{" "}
              /{" "}
              <Link href="/help/account" className="hover:text-accent">
                Account &amp; admin
              </Link>{" "}
              / <span className="text-text-secondary">How to raise a claim</span>
            </nav>
            <h1 className="text-display-xl text-text-primary">
              How to raise a claim on Connexx
            </h1>
            <p className="mt-4 text-body-lg text-text-secondary max-w-2xl mx-auto">
              If a parcel has gone missing or arrived damaged, you can raise a
              claim directly on Connexx instead of emailing or calling support.
              Connexx checks the shipment&apos;s eligibility for you, pre-fills as
              much of the paperwork as it can from your tracking data, and sends
              the claim straight to the carrier.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Body */}
      <section className="bg-bg-secondary py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-14">
          {/* Before you start */}
          <ScrollReveal>
            <div id="before-you-start" className="scroll-mt-nav">
              <h2 className="text-display-md text-text-primary">
                Before you start
              </h2>
              <p className="mt-4 text-body-md text-text-secondary">
                Connexx checks eligibility for you automatically, so you
                don&apos;t need to work it out in advance. Based on the checks it
                runs, expect it to look at things like:
              </p>
              <ul className="mt-4 space-y-2.5">
                <Bullet>
                  Whether the parcel has an initial carrier scan on record.
                </Bullet>
                <Bullet>
                  Whether it&apos;s had no tracking scans for 5 or more days, or
                  has a delivery event worth querying (for example, marked
                  delivered when the recipient says otherwise).
                </Bullet>
                <Bullet>
                  Whether it&apos;s still within the carrier&apos;s claim window
                  from when the label was generated.
                </Bullet>
              </ul>
              <p className="mt-4 text-body-md text-text-secondary">
                If a shipment doesn&apos;t pass these checks, Connexx will tell
                you it isn&apos;t eligible.
              </p>
              <div className="mt-5 rounded-xl border border-accent/15 bg-accent-light/30 p-4 text-body-sm text-text-secondary">
                <strong className="text-text-primary">
                  This flow covers Lost and Damaged claims.
                </strong>{" "}
                If you&apos;re reporting a problem with Connexx itself rather than
                a parcel, choose <em>Technical support</em> at Step 1 — that opens
                a separate support form, not the claims flow below.
              </div>
            </div>
          </ScrollReveal>

          {/* Opening a claim */}
          <ScrollReveal>
            <div id="opening" className="scroll-mt-nav">
              <h2 className="text-display-md text-text-primary">
                Opening a claim
              </h2>
              <p className="mt-4 text-body-md text-text-secondary">
                Go to <strong>Shipments</strong> and find the parcel you want to
                raise a case for. Either open the shipment and select{" "}
                <strong>Get support</strong>, or tick its checkbox in the list and
                choose the support icon from the toolbar that appears. This opens
                the <strong>Create support case</strong> window.
              </p>
            </div>
          </ScrollReveal>

          {/* The four steps */}
          <ScrollReveal>
            <div>
              <h2 className="text-display-md text-text-primary">
                Making the claim: four steps
              </h2>
              <p className="mt-4 text-body-md text-text-secondary">
                You can select <strong>Save draft</strong> at any point and finish
                the claim later — the case will be exactly where you left it.
              </p>
              <div className="mt-6 space-y-5">
                <Step n={1} id="step-issue" title="Issue">
                  <p>Select the option that matches what happened:</p>
                  <ul className="space-y-2.5">
                    <Bullet>
                      <strong>Lost</strong> — the parcel has gone missing in
                      transit.
                    </Bullet>
                    <Bullet>
                      <strong>Damaged</strong> — the parcel arrived damaged.
                    </Bullet>
                    <Bullet>
                      <strong>Technical support</strong> — something in Connexx
                      isn&apos;t working as expected.
                    </Bullet>
                  </ul>
                  <p>
                    Select <strong>Next</strong>.
                  </p>
                </Step>

                <Step n={2} id="step-eligibility" title="Eligibility">
                  <p>
                    Connexx shows the full tracking history for the parcel and
                    checks it against the carrier&apos;s claim requirements
                    automatically. You&apos;ll see each condition marked as{" "}
                    <em>met</em> or <em>not applicable</em>.
                  </p>
                  <p>
                    If the shipment qualifies, you&apos;ll get a green{" "}
                    <strong>eligible to claim</strong> confirmation, plus the
                    maximum claim value for that carrier and the date the claim
                    window closes. Select <strong>Next</strong>.
                  </p>
                </Step>

                <Step n={3} id="step-evidence" title="Evidence">
                  <p>Fill in the details of the claim:</p>
                  <ul className="space-y-2.5">
                    <Bullet>
                      <strong>Description of goods</strong> — pre-filled from the
                      items on the shipment. Edit it if it doesn&apos;t match what
                      was in the parcel.
                    </Bullet>
                    <Bullet>
                      <strong>Description of packaging</strong> — the colour and
                      type of packaging, plus any barcodes or references on the
                      outer and inner cartons.
                    </Bullet>
                    <Bullet>
                      <strong>Claims value</strong> — the amount you&apos;re
                      claiming. It must match your proof of value document and
                      can&apos;t exceed the carrier&apos;s maximum for that
                      shipment.
                    </Bullet>
                    <Bullet>
                      <strong>Proof of value</strong> — attach a receipt or
                      invoice showing the value of the goods.
                    </Bullet>
                  </ul>
                  <p>
                    If your parcel is marked as delivered but the recipient says
                    they never received it, you&apos;ll also need a{" "}
                    <strong>Denial of Receipt (DOR)</strong>, signed by the
                    recipient. Select <strong>Template</strong> to download a
                    version pre-filled with the receiver&apos;s address, the parcel
                    barcode and the relevant dates, get it signed, then select{" "}
                    <strong>Attach file</strong> to upload the signed copy. If you
                    don&apos;t have it yet, select <strong>Save draft</strong> and
                    come back once it&apos;s signed.
                  </p>
                  <p>
                    Once everything&apos;s attached, select <strong>Next</strong>.
                  </p>
                </Step>

                <Step n={4} id="step-review" title="Review">
                  <p>
                    Check everything before it goes to the carrier: carrier, claim
                    type, parcel reference, claim value, and the documents
                    attached. The carrier&apos;s maximum claim value is shown again
                    here for reference.
                  </p>
                  <p>
                    Add anything else the reviewing team should know in{" "}
                    <strong>Additional comments</strong>, then tick both boxes:
                  </p>
                  <ul className="space-y-2.5">
                    <Bullet>
                      I confirm the information above is complete and accurate.
                    </Bullet>
                    <Bullet>
                      I have opened and checked the pre-filled and template
                      documents attached to this claim (such as the DOR), and the
                      details on them are correct.
                    </Bullet>
                  </ul>
                  <p>
                    Select <strong>Submit request</strong>.
                  </p>
                </Step>
              </div>
            </div>
          </ScrollReveal>

          {/* After you submit */}
          <ScrollReveal>
            <div id="after" className="scroll-mt-nav">
              <h2 className="text-display-md text-text-primary">
                After you submit
              </h2>
              <p className="mt-4 text-body-md text-text-secondary">
                You&apos;ll land on a confirmation screen with your case reference
                (for example, <code className="text-caption bg-bg-secondary px-1.5 py-0.5 rounded border border-border">CASE-23</code>) and a status
                tracker: Submitted → In review → Resolution → Closed.
              </p>
              <ul className="mt-4 space-y-2.5">
                <Bullet>Our team reviews the request and raises it with the carrier.</Bullet>
                <Bullet>
                  You&apos;ll get email updates and can reply to them directly to
                  add more information.
                </Bullet>
                <Bullet>
                  An outcome usually takes 30–40 days, longer during peak season.
                </Bullet>
                <Bullet>The carrier makes the final decision.</Bullet>
              </ul>
            </div>
          </ScrollReveal>

          {/* Checking on a claim */}
          <ScrollReveal>
            <div id="checking" className="scroll-mt-nav">
              <h2 className="text-display-md text-text-primary">
                Checking on a claim
              </h2>
              <p className="mt-4 text-body-md text-text-secondary">
                Go to <strong>Support Cases</strong> in the left-hand menu to see
                every case you&apos;ve raised, with its reference, category,
                tracking code, carrier, date created and status. Select a case to
                see its full detail, the documents you submitted, and a timeline.
                If a carrier or our team replies, it&apos;ll come by email — reply
                to that email to keep the conversation going.
              </p>
              <p className="mt-4 text-body-md text-text-secondary">
                Raising a claim this way keeps the whole case in one place: the
                evidence, the eligibility checks and the carrier&apos;s decision
                all sit against the shipment record instead of scattered across
                emails and phone calls. If anything about your claim doesn&apos;t
                fit this guide, get in touch with our support team and they&apos;ll
                take it from there.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-display-lg text-white mb-3">
              Need the claim window or value limit for a carrier?
            </h2>
            <p className="text-white/80 mb-8 text-body-lg">
              Every carrier sets its own claim window, maximum value, and evidence
              rules. Check the policy for yours, or submit a request and the ITD
              team will take it from there.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/help/account/claims"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
              >
                Claims policies by carrier
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/help/submit-request"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-transparent px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Submit a request
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
