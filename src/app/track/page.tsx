import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TrackShipment from "@/components/sections/TrackShipment";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata = buildMetadata({
  title: "Track your shipment",
  description:
    "Track an ITD Global shipment. Enter your tracking number and we'll take you straight to the carrier's live tracking — Royal Mail, DPD, Evri, InPost, DHL, Amazon Shipping, FedEx, UPS and Parcelforce.",
  path: "/track",
});

export default function TrackPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Track your shipment", path: "/track" },
        ])}
      />

      {/* Hero */}
      <section className="bleed-nav bg-white py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h1 className="text-display-xl text-text-primary">
              Track your shipment
            </h1>
            <p className="mt-4 text-body-lg text-text-secondary">
              Every ITD Global shipment travels on one of the carriers below.
              Enter your tracking number and we&apos;ll take you straight to
              the carrier&apos;s live tracking.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Tracker */}
      <section className="bg-bg-secondary py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <TrackShipment />
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-8 space-y-2 text-body-sm text-text-secondary">
              <p>
                The tracking link in your dispatch email goes straight to the
                same place — either works.
              </p>
              <p>
                Shipping with us through Connexx?{" "}
                <a
                  href="https://connexx.co.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Log in
                </a>{" "}
                to see every shipment in one view. Can&apos;t find your
                parcel?{" "}
                <Link href="/help/submit-request" className="text-accent hover:underline">
                  Submit a support request
                </Link>
                .
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
