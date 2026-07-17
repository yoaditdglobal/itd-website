import Link from "next/link";
import LegalPage, { LegalSection } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/metadata";

const PATH = "/privacy-policy";
const UPDATED = "17 July 2026";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How INTERDELTA LTD, trading as ITD Global, collects, uses, shares, and protects personal data — and the rights you have under UK data protection law.",
  path: PATH,
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" path={PATH} updated={UPDATED}>
      <LegalSection number="1" heading="Who we are">
        <p>
          This website is operated by INTERDELTA LTD, trading as ITD Global
          (&ldquo;ITD&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). We are a
          company registered in England and Wales under company number 05103858.
          Our registered office is 2nd Floor, Parkgates, Bury New Road,
          Prestwich, Manchester, M25 0TL, and our trading address is Unit A,
          Birch Business Park, Whittle Lane, Heywood, Greater Manchester, OL10
          2SX.
        </p>
        <p>
          We are the data controller for the personal data described in this
          policy, and we are registered with the ICO under reference ZA531479.
          For anything to do with your data or this policy, contact our Data
          Protection Officer at{" "}
          <a href="mailto:szl@itdglobal.com" className="text-accent hover:underline">
            szl@itdglobal.com
          </a>
          . For general enquiries, use{" "}
          <a href="mailto:sales@itdglobal.com" className="text-accent hover:underline">
            sales@itdglobal.com
          </a>{" "}
          or 0333 320 9993.
        </p>
      </LegalSection>

      <LegalSection number="2" heading="What this policy covers">
        <p>
          This policy explains what personal data we collect when you use our
          website, request a quote, or get in touch, how we use it, who we share
          it with, and the rights you have. It applies to the ITD Global website
          and our sales and marketing activity. It does not cover third-party
          websites we link to.
        </p>
      </LegalSection>

      <LegalSection number="3" heading="The personal data we collect">
        <p>When you enquire, request pricing, or work with us, we collect:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>your name;</li>
          <li>your work email address;</li>
          <li>your phone number;</li>
          <li>
            business information about your logistics, such as parcel volumes,
            depot or collection locations, and current carriers, which we use to
            price and quote for you.
          </li>
        </ul>
        <p>
          When you use the website, we also collect technical and usage data
          through cookies and similar technologies, such as your IP address,
          device and browser type, and how you interact with our pages. See our{" "}
          <Link href="/cookie-policy" className="text-accent hover:underline">
            Cookie Policy
          </Link>{" "}
          for detail.
        </p>
      </LegalSection>

      <LegalSection number="4" heading="How we collect it">
        <p>
          We collect personal data directly from you when you complete a form,
          use the rate checker, email or call us. We collect technical data
          automatically through cookies and analytics tools when you visit the
          site. We may also receive data from third parties, such as business
          contact-data providers and the advertising platforms below, where you
          have engaged with our ads.
        </p>
      </LegalSection>

      <LegalSection number="5" heading="Why we use it, and our lawful basis">
        <p>We use your data to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            respond to your enquiry and prepare quotes and pricing (lawful
            basis: to take steps at your request before entering a contract, and
            our legitimate interests in responding to enquiries);
          </li>
          <li>
            provide and manage our services if you become a customer
            (performance of a contract);
          </li>
          <li>
            send you relevant marketing about our services (consent, where
            required, or our legitimate interests in promoting our business to
            other businesses, and you can opt out at any time);
          </li>
          <li>
            measure and improve the website and our advertising (consent for
            non-essential cookies, and our legitimate interests in running our
            business);
          </li>
          <li>meet legal and regulatory obligations (legal obligation).</li>
        </ul>
        <p>
          Where we rely on legitimate interests, we have balanced those against
          your rights.
        </p>
      </LegalSection>

      <LegalSection number="6" heading="Who we share it with">
        <p>
          We share personal data with service providers who process it on our
          behalf, under contract and only on our instructions. These include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Zoho CRM, which stores our customer and enquiry records;</li>
          <li>
            Google (Analytics and Advertising), Meta, TikTok and LinkedIn, for
            website analytics and advertising;
          </li>
          <li>Netlify, our website hosting provider;</li>
          <li>
            carriers and logistics partners, where sharing is needed to provide
            a service you have asked for;
          </li>
          <li>
            professional advisers, and authorities where we are legally required
            to.
          </li>
        </ul>
        <p>We do not sell your personal data.</p>
      </LegalSection>

      <LegalSection number="7" heading="International transfers">
        <p>
          Some of our providers, including the advertising platforms above, may
          process data outside the UK. Where that happens, we rely on the
          safeguards required by UK data protection law, such as the UK
          International Data Transfer Agreement, the Addendum to the EU Standard
          Contractual Clauses, or an adequacy decision.
        </p>
      </LegalSection>

      <LegalSection number="8" heading="How long we keep it">
        <p>
          We keep personal data only as long as we need it for the purposes
          above, in line with our internal retention schedule. Enquiry and quote
          data is kept while it remains relevant to a potential or ongoing
          relationship; customer records are kept for as long as required after
          the relationship ends to meet our legal and contractual obligations;
          and marketing data is kept until you opt out.
        </p>
      </LegalSection>

      <LegalSection number="9" heading="Your rights">
        <p>
          Under UK data protection law you have the right to access your data,
          to have it corrected or erased, to restrict or object to how we use
          it, to data portability, and to withdraw consent at any time. To
          exercise any of these, contact our DPO at{" "}
          <a href="mailto:szl@itdglobal.com" className="text-accent hover:underline">
            szl@itdglobal.com
          </a>
          . You also have the right to complain to the Information
          Commissioner&apos;s Office (ICO) at{" "}
          <a
            href="https://ico.org.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            ico.org.uk
          </a>
          , though we would ask you to raise it with us first.
        </p>
      </LegalSection>

      <LegalSection number="10" heading="Cookies">
        <p>
          We use cookies and similar technologies. Our{" "}
          <Link href="/cookie-policy" className="text-accent hover:underline">
            Cookie Policy
          </Link>{" "}
          explains which ones and how to control them.
        </p>
      </LegalSection>

      <LegalSection number="11" heading="Security">
        <p>
          We use appropriate technical and organisational measures to protect
          your data, and we review them regularly. No transmission over the
          internet is completely secure, so we cannot guarantee absolute
          security.
        </p>
      </LegalSection>

      <LegalSection number="12" heading="Changes to this policy">
        <p>
          We may update this policy from time to time. The date at the top shows
          when it last changed.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
