import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CONNEXX_SUPPORT_URL } from "@/lib/site-config";

type Props = {
  h2: string;
  /** Contains `{courierCount}`. */
  body: string;
  courierCount: number;
  buttonLabel: string;
  customerLine: string;
};

/**
 * Navy band between the insights and the FAQ. Not the page's last section, so
 * it's its own small component rather than ClosingCTA. Primary on navy =
 * yellow fill + navy text. The customer line links "Get Support in Connexx" to
 * the Connexx portal (CONNEXX_SUPPORT_URL) — customers are routed to their
 * account manager, not counted as new leads.
 */
export default function PeakTalkBand({ h2, body, courierCount, buttonLabel, customerLine }: Props) {
  const text = body.replaceAll("{courierCount}", String(courierCount));
  const linkText = "Get Support in Connexx";
  const [before, after] = customerLine.includes(linkText)
    ? customerLine.split(linkText)
    : [customerLine, ""];

  return (
    <section className="peak-talk" data-analytics-location="peak_talk">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-display-lg text-white">{h2}</h2>
        <p className="text-body-lg text-white/75 mt-5">{text}</p>
        <div className="mt-8">
          <Link href="/contact?source=peak" className="peak-btn peak-btn--yellow peak-btn--lg">
            {buttonLabel} <ArrowRight aria-hidden />
          </Link>
        </div>
        <p className="text-body-sm text-white/60 mt-6">
          {before}
          {customerLine.includes(linkText) && (
            <a
              href={CONNEXX_SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="peak-talk__link"
            >
              {linkText}
            </a>
          )}
          {after}
        </p>
      </div>
    </section>
  );
}
