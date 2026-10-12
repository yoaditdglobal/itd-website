import { Suspense } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FreightTracker from "@/components/sections/FreightTracker";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata = buildMetadata({
  title: "Track your freight",
  description:
    "Live container and freight tracking for ITD Global shipments. Enter your container number or bill of lading to see your shipment's live position on the map.",
  path: "/track/freight",
});

export default function FreightTrackPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Track your shipment", path: "/track" },
          { name: "Track your freight", path: "/track/freight" },
        ])}
      />

      {/* Hero */}
      <section className="bleed-nav bg-white py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h1 className="text-display-xl text-text-primary">
              Track your freight
            </h1>
            <p className="mt-4 text-body-lg text-text-secondary">
              See the live position of your container or freight shipment.
              Your reference is in the status email we sent you.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Tracker */}
      <section className="bg-bg-secondary py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* useSearchParams reads ?query= on the client; the boundary keeps
              the rest of the page prerendered. */}
          <Suspense fallback={null}>
            <FreightTracker />
          </Suspense>

          <div className="mt-8 space-y-2 text-body-sm text-text-secondary">
            <p>
              Tracking a parcel instead?{" "}
              <Link href="/track" className="text-accent hover:underline">
                Track a parcel
              </Link>
              . Questions about your freight? Email{" "}
              <a href="mailto:freight@itdglobal.com" className="text-accent hover:underline">
                freight@itdglobal.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
