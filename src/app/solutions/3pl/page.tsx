import VerticalPage from "@/components/sections/VerticalPage";
import SolutionHero from "@/components/sections/SolutionHero";
import SolutionPains from "@/components/sections/SolutionPains";
import SolutionRealities from "@/components/sections/SolutionRealities";
import IntegrationsGateway from "@/components/sections/IntegrationsGateway";
import { caseStudies, getCaseStudiesBySolution } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/components/seo/JsonLd";
import { Users, Plug, ShieldCheck, BarChart3 } from "lucide-react";

export const metadata = buildMetadata({
  title: "3PL shipping software with child accounts and customs automation",
  description:
    "Onboard new clients in 2 days, not 2 weeks. Connexx adds multi-client child accounts, per-brand carrier rules, and customs automation on top of Mintsoft, Linnworks, and ShipHero.",
  path: "/solutions/3pl",
});

const PAINS = [
  {
    num: "01",
    title: "Lose one client and the rest get pricier",
    desc: "Your rate hangs on hitting a volume tier. Lose a client and it climbs for the ones who stayed.",
  },
  {
    num: "02",
    title: "The best rates are locked behind volume you don't have",
    desc: "Carriers save their sharpest rates for committed volume you haven't won yet.",
  },
  {
    num: "03",
    title: "Your volume only stretches to a couple of carriers",
    desc: "On your own, two or three carriers is the most you can offer at a margin. We let you offer as many as the client needs, here or abroad.",
  },
  {
    num: "04",
    title: "Carrier billing you can actually reconcile",
    desc: "Separate invoices from each carrier make it a slog to work out what a client's shipping really cost. You get one bill, broken down line by line across your carriers, so rebilling each client is clean.",
  },
];

export default function ThreePLPage() {
  return (
    <>
      <SolutionHero
        label="3PL"
        title="Undercut your rivals without undercutting yourself."
        subtitle="We back you with a carrier package that wins the pitch, then turns the client's outbound into real profit for you."
        primary={{ label: "Get Quote", href: "#estimator" }}
        secondary={{ label: "Explore", href: "/resources/case-studies/delta-fulfilment" }}
        image={{
          src: "/solutions/3pl-hero-v2.webp",
          alt: "Warehouse operative with a picking trolley reaching stock from racking in a 3PL fulfilment centre",
          objectPosition: "72% 60%",
        }}
        chips={[
          { name: "Mintsoft", logo: "/logos/erp-wms/mintsoft_logo.png" },
          { name: "Linnworks", logo: "/logos/erp-wms/linnworks_logo.png" },
          { name: "Royal Mail", logo: "/logos/carriers/royal-mail-icon.png" },
          { name: "DPD", logo: "/logos/carriers/DPD-LOGO.png" },
          { name: "Evri", logo: "/logos/carriers/evri_logo.png" },
        ]}
      />
      <SolutionPains
        pains={PAINS}
        image={{
          src: "/solutions/3pl-pains.webp",
          alt: "Tall pallet racking aisle in a large distribution warehouse",
          objectPosition: "50% 50%",
        }}
        eyebrow="Where the margin leaves"
        heading="What gets in the way today."
        lead="Four places a 3PL's margin and pitch leak away — from winning the client to reconciling the monthly bill."
      />
      <SolutionRealities
        heading="The realities of operating a 3PL"
        lead="We understand the realities of operating a 3PL. We own one. 3PLs are expected to do more, with less."
        items={[
          {
            title: "Retail Brands",
            description:
              "Delivery expectations, cost pressure and service consistency across a book of different accounts.",
          },
          {
            title: "Subscription Brands",
            description:
              "Predictable recurring shipments, squeezed by margin pressure, cut-off sensitivity and churn risk.",
          },
          {
            title: "Marketplace Customers",
            description:
              "Fast-moving sellers, complex accounts and the responsiveness to keep up across channels.",
          },
          {
            title: "Retention & Growth",
            description:
              "Keeping the clients you have happy while building a carrier proposition that wins the next ones.",
          },
          {
            title: "Billing, Setup & IT",
            description:
              "Onboarding, account structures, client-specific setup and the reporting visibility to back it up.",
          },
          {
            title: "Multi-Carrier Management",
            description:
              "Good rates usually demand hard volume commitments, which makes real carrier choice on your own volume tough.",
          },
        ]}
      />
      <VerticalPage
        hideDefaultHero
        hidePainPoints
      label="3PL"
      title="Undercut your rivals without undercutting yourself."
      subtitle="We back you with a carrier package that wins the pitch, then turns the client's outbound into real profit for you."
      primaryCta={{
        label: "Get Quote",
        href: "#estimator",
      }}
      secondaryCta={{
        label: "Explore",
        href: "/resources/case-studies/delta-fulfilment",
      }}
      integrationsGateway={
        <IntegrationsGateway
          heading="Sits over the WMS you already run."
          subtext="We're the shipping layer over Mintsoft, Linnworks, ShipHero and Veeqo. Orders pull in with each brand's rules, we apply the carrier and rate, and the tracking and cost write back. Nothing gets re-keyed."
          logos={[
            { name: "Mintsoft", logo: "/logos/erp-wms/mintsoft_logo.png" },
            { name: "Linnworks", logo: "/logos/erp-wms/linnworks_logo.png" },
            { name: "ShipHero", logo: "/logos/erp-wms/shiphero_logo.png" },
            { name: "Veeqo", logo: "/logos/erp-wms/veeqo_logo.png" },
          ]}
          browseHref="/integrations/erp-wms"
        />
      }
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Solutions", path: "/solutions" },
        { name: "3PL", path: "/solutions/3pl" },
      ]}
      jsonLd={[
        serviceSchema({
          name: "3PL shipping software",
          description:
            "Multi-carrier shipping platform for UK 3PLs and fulfilment houses. Child account architecture, per-brand carrier rules, customs automation, and integration with Mintsoft, Linnworks, ShipHero and Veeqo.",
          path: "/solutions/3pl",
          serviceType: "Third-Party Logistics Shipping Software",
          areaServed: ["United Kingdom", "European Union", "Worldwide"],
        }),
      ]}
      pains={PAINS}
      features={[
        {
          icon: Users,
          title: "Child account architecture for every client brand.",
          desc: "Each brand becomes a tenant under your parent contract with Royal Mail, DPD, Evri, DHL Express, and the rest. Per-client rate cards, dispatch rules, branded tracking page, and reporting all sit under one parent account. Billing exports per child account at month-end.",
        },
        {
          icon: Plug,
          title: "Mintsoft, Linnworks, ShipHero, and Veeqo integration.",
          desc: "Connexx sits on top of your WMS as the shipping and rate-shopping layer. Mintsoft, Linnworks, ShipHero, and Veeqo all push orders into Connexx for carrier selection. Tracking and POD data write back automatically. No parallel systems, no double data entry.",
        },
        {
          icon: ShieldCheck,
          title: "Customs automation per child account.",
          desc: "Each client EORI, each client IOSS registration, and each client's HS code library lives in the platform. Commercial invoice, CN22, and CN23 documentation generates per shipment, per country. SwiftLog Fulfilment lifted customs accuracy from 93% to 98.7% and cut customs-related delays 85%.",
        },
        {
          icon: BarChart3,
          title: "Branded reporting your clients log in to see.",
          desc: "Each brand gets a live dashboard showing volume, cost per carrier, SLA performance, and exception rate. Account management stops requiring an ops analyst in a spreadsheet. Client retention conversations start from a position of data, not defence.",
        },
      ]}
      integrations={[
        {
          name: "Mintsoft",
          logo: "/logos/erp-wms/mintsoft_logo.png",
          description: "WMS most common in UK mid-market 3PLs. Connexx adds the carrier layer.",
          href: "/integrations/erp-wms",
        },
        {
          name: "Linnworks",
          logo: "/logos/erp-wms/linnworks_logo.png",
          description: "Multi-channel order management with marketplace import for client brands.",
          href: "/integrations/erp-wms",
        },
        {
          name: "Veeqo",
          logo: "/logos/erp-wms/veeqo_logo.png",
          description: "Inventory and shipping platform with multi-client support.",
          href: "/integrations/erp-wms",
        },
        {
          name: "ShipHero",
          logo: "/logos/erp-wms/shiphero_logo.png",
          description: "Warehouse and shipping management for high-volume fulfilment houses.",
          href: "/integrations/erp-wms",
        },
        {
          name: "Royal Mail",
          logo: "/logos/carriers/royal-mail-icon.png",
          description: "Tracked 24, Tracked 48, Signed, First/Second Class per child account.",
          href: "/integrations/carriers/royal-mail",
        },
        {
          name: "DPD",
          logo: "/logos/carriers/DPD-LOGO.png",
          description: "Next Day, Saturday, B2B with per-client routing rules.",
          href: "/integrations/carriers/dpd",
        },
        {
          name: "Evri",
          logo: "/logos/carriers/evri_logo.png",
          description: "Standard, Next Day, ParcelShop drop-off, and Evri EU coverage.",
          href: "/integrations/carriers/evri",
        },
        {
          name: "DHL Express",
          logo: "/logos/carriers/dhl_logo.webp",
          description: "International express to 220+ countries for cross-border client volume.",
          href: "/integrations/carriers/dhl",
        },
      ]}
      caseStudy={getCaseStudiesBySolution("3PL")[0] ?? caseStudies[2]}
      caseStudies={getCaseStudiesBySolution("3PL")}
      rateChecker="3pl"
      faq={[
        {
          question: "Do I need to commit volume to unlock your rates?",
          answer:
            "No. You ship on our pooled volume, so the rates hold whatever your own numbers do that month.",
        },
        {
          question: "How many carriers can I offer my clients?",
          answer:
            "As many as the brand needs, at home or abroad. Your own volume stops being the limit, so you match the carrier to each client's service and budget.",
        },
        {
          question: "Can I run a separate account for each client brand?",
          answer:
            "Yes. Each brand runs as its own account under yours, with its own rates, rules and branded tracking. Billing splits out per brand at month-end.",
        },
        {
          question: "Does ITD integrate with my WMS?",
          answer:
            "Yes. We connect to Mintsoft, Linnworks, ShipHero and Veeqo. The integrations section above shows how the flow works.",
        },
        {
          question: "What happens when a parcel's lost or a bill's wrong?",
          answer:
            "A dedicated account manager handles the claim or the query, so the exception doesn't eat your ops team's day or reach your client.",
        },
        {
          question: "How fast can I onboard a new client?",
          answer:
            "Days, not weeks. A new brand's carriers, rules and rates are set once and go live, with no IT project at your end.",
        },
      ]}
      closingCta={{
        headline: "Find out what our rates do for your margin.",
        subhead:
          "A bespoke review of your carrier setup shows the rates you could put in front of clients and the margin left for you.",
        primary: {
          label: "Get Quote",
          href: "#estimator",
        },
        secondary: {
          label: "Explore",
          href: "/resources/case-studies/delta-fulfilment",
        },
      }}
      />
    </>
  );
}
