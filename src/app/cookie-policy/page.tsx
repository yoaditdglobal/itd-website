import Link from "next/link";
import LegalPage, { LegalSection } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/metadata";

const PATH = "/cookie-policy";
const UPDATED = "17 July 2026";

export const metadata = buildMetadata({
  title: "Cookie Policy",
  description:
    "How INTERDELTA LTD, trading as ITD Global, uses cookies and similar technologies on this website — the categories we use, consent, and how to manage them.",
  path: PATH,
});

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" path={PATH} updated={UPDATED}>
      <LegalSection number="1" heading="About this policy">
        <p>
          This policy explains how INTERDELTA LTD, trading as ITD Global, uses
          cookies and similar technologies on our website. It sits alongside our{" "}
          <Link href="/privacy-policy" className="text-accent hover:underline">
            Privacy Policy
          </Link>
          . For data matters, contact our DPO at{" "}
          <a href="mailto:szl@itdglobal.com" className="text-accent hover:underline">
            szl@itdglobal.com
          </a>
          ; for general enquiries, use{" "}
          <a href="mailto:sales@itdglobal.com" className="text-accent hover:underline">
            sales@itdglobal.com
          </a>{" "}
          or 0333 320 9993.
        </p>
      </LegalSection>

      <LegalSection number="2" heading="What cookies are">
        <p>
          Cookies are small text files placed on your device when you visit a
          website. They let the site work, remember your choices, and help us
          understand how the site is used. Similar technologies such as pixels
          and tags do much the same job.
        </p>
      </LegalSection>

      <LegalSection number="3" heading="The cookies we use">
        <p>We group them into three types.</p>
        <p>
          <strong className="text-text-primary">Strictly necessary.</strong>{" "}
          These make the site work, such as page navigation and security. The
          site cannot run properly without them, so they do not need your
          consent.
        </p>
        <p>
          <strong className="text-text-primary">Analytics.</strong> We use
          Google Analytics to understand how visitors use the site, so we can
          improve it. These cookies are set only with your consent.
        </p>
        <p>
          <strong className="text-text-primary">Advertising.</strong> We use
          Google Advertising, Meta, TikTok and LinkedIn to measure our ads and
          show relevant ones to businesses like yours. These cookies, pixels and
          tags are set only with your consent, and they may share data with
          those platforms outside the UK under the safeguards described in our{" "}
          <Link href="/privacy-policy" className="text-accent hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection number="4" heading="Your consent">
        <p>
          When you first visit, our cookie banner lets you accept or reject
          non-essential cookies, or choose by category. Strictly necessary
          cookies are always on. You can change or withdraw your choice at any
          time through your browser settings.
        </p>
      </LegalSection>

      <LegalSection number="5" heading="Managing cookies in your browser">
        <p>
          You can also block or delete cookies through your browser settings,
          though some parts of the site may not work as well if you do. You can
          opt out of Google Analytics at{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            tools.google.com/dlpage/gaoptout
          </a>
          , and manage ad preferences through each platform&apos;s own settings.
        </p>
      </LegalSection>

      <LegalSection number="6" heading="Changes">
        <p>
          We may update this policy from time to time. The date at the top shows
          when it last changed.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
