import Link from "next/link";
import LegalPage, { LegalSection } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/metadata";

const PATH = "/terms-of-service";
const UPDATED = "17 July 2026";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "The terms that govern use of the ITD Global website, operated by INTERDELTA LTD — website use, quotes and the rate checker, intellectual property, liability, and governing law.",
  path: PATH,
});

export default function TermsOfServicePage() {
  return (
    <LegalPage title="Terms of Service" path={PATH} updated={UPDATED}>
      <LegalSection number="1" heading="About these terms">
        <p>
          This website is operated by INTERDELTA LTD, trading as ITD Global
          (&ldquo;ITD&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), a company
          registered in England and Wales under number 05103858, with its
          registered office at 2nd Floor, Parkgates, Bury New Road, Prestwich,
          Manchester, M25 0TL. By using this website you accept these terms. If
          you do not accept them, please do not use the site. You can contact us
          at{" "}
          <a href="mailto:sales@itdglobal.com" className="text-accent hover:underline">
            sales@itdglobal.com
          </a>{" "}
          or on 0333 320 9993.
        </p>
      </LegalSection>

      <LegalSection number="2" heading="Using the website">
        <p>
          You may use the site for lawful purposes and to find out about our
          services. You agree not to misuse it, interfere with its operation,
          attempt to gain unauthorised access, or use it in any way that breaks
          the law or infringes someone else&apos;s rights.
        </p>
      </LegalSection>

      <LegalSection number="3" heading="Quotes, pricing and the rate checker">
        <p>
          Any pricing, savings figures or quotes shown on the site, including
          through the rate checker, are indicative and for guidance only. They
          are based on the information provided and do not form a binding offer.
          Final rates and terms are confirmed when your account is set up.
        </p>
      </LegalSection>

      <LegalSection number="4" heading="Becoming an ITD client">
        <p>
          Our shipping and logistics services aren&apos;t signed up for through
          this website. We set clients up directly, and the account form and the
          terms that come with it are provided as part of that. Those account
          terms govern the services.
        </p>
      </LegalSection>

      <LegalSection number="5" heading="Intellectual property">
        <p>
          The content on this site, including text, logos, graphics and the
          Connexx and ITD Global brands, belongs to us or our licensors and is
          protected by law. You may view and print pages for your own reference,
          but you may not copy, republish or use our content commercially
          without our permission.
        </p>
      </LegalSection>

      <LegalSection number="6" heading="Accuracy and availability">
        <p>
          We take care to keep the site accurate and up to date, but we do not
          guarantee it is complete or error-free, and content may change without
          notice. We aim to keep the site available but cannot guarantee
          uninterrupted access, and we may suspend or withdraw parts of it for
          maintenance or other reasons.
        </p>
      </LegalSection>

      <LegalSection number="7" heading="Third-party links">
        <p>
          The site may link to other websites we do not control. We are not
          responsible for their content or their practices, and a link does not
          mean we endorse them.
        </p>
      </LegalSection>

      <LegalSection number="8" heading="Our liability">
        <p>
          We do not exclude or limit our liability where it would be unlawful to
          do so, including for death or personal injury caused by our negligence
          or for fraud. Subject to that, we are not liable for any loss arising
          from your use of, or inability to use, the website, or from reliance
          on its content. Nothing in these website terms affects the terms that
          apply to your ITD account and services.
        </p>
      </LegalSection>

      <LegalSection number="9" heading="Privacy and cookies">
        <p>
          Your use of the site is also covered by our{" "}
          <Link href="/privacy-policy" className="text-accent hover:underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/cookie-policy" className="text-accent hover:underline">
            Cookie Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection number="10" heading="Changes to these terms">
        <p>
          We may update these terms from time to time. The date at the top shows
          when they last changed, and your continued use of the site means you
          accept the current version.
        </p>
      </LegalSection>

      <LegalSection number="11" heading="Governing law">
        <p>
          These terms are governed by the law of England and Wales, and the
          courts of England and Wales have exclusive jurisdiction.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
