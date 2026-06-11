import VerticalPage from "@/components/sections/VerticalPage";
import SolutionHero from "@/components/sections/SolutionHero";
import SolutionPains from "@/components/sections/SolutionPains";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { caseStudies, getCaseStudiesBySolution } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/components/seo/JsonLd";
import type { LucideIcon } from "lucide-react";
import { MapPin, TrendingDown, Plane, Package, Calendar, Warehouse, ShieldCheck, UserCheck } from "lucide-react";

export const metadata = buildMetadata({
  title: "Import Shipping Services UK | ITD Global",
  description:
    "ITD Global helps UK businesses manage international imports from China and worldwide. In-house customs clearance, competitive rates, and one point of contact for the entire journey.",
  path: "/solutions/import",
});

const PILLARS = [
  {
    num: "01",
    title: "High volume corporate discounts",
    desc: "ITD Global's buying power means you ship at rates that would otherwise only be available to large multinationals. Whether you are moving samples or express parcels, we provide competitive pricing without needing the volume to negotiate it yourself.",
  },
  {
    num: "02",
    title: "Single point of contact",
    desc: "One contact manages the entire import operation. They handle transit comparisons, documentation, collections, and customs so you are not chasing multiple suppliers or piecing together updates from different parts of the chain.",
  },
  {
    num: "03",
    title: "We take care of everything",
    desc: "Whether your shipment moves on DDP or DDU terms, door to door, airport to door, or airport to airport, ITD Global manages the full journey. You tell us what needs to move. We handle the rest.",
  },
];

const WHAT_YOU_GET: { icon: LucideIcon; text: string }[] = [
  { icon: MapPin,       text: "China offices managing factory collections in the same time zone as your suppliers" },
  { icon: TrendingDown, text: "High volume corporate rates on express & economy courier" },
  { icon: Plane,        text: "Air freight, sea freight, and parcel consolidation on one account" },
  { icon: Package,      text: "Parcel consolidation via our Shenzhen warehouse, cutting costs by 30% or more" },
  { icon: Calendar,     text: "Weekly sample consolidations from China at a fixed rate with guaranteed departure" },
  { icon: Warehouse,    text: "UK warehousing and fulfilment available through Delta Fulfilment" },
  { icon: ShieldCheck,  text: "In-house customs support across all import routes" },
  { icon: UserCheck,    text: "Named account contact throughout, not a helpdesk" },
];

export default function ImportPage() {
  return (
    <>
      <SolutionHero
        label="Import"
        title={<>Importing from the<br />Far East or worldwide?</>}
        subtitle="ITD Global takes the complexity out of importing. With our teams on the ground in China, we offer a single point of contact from collection to delivery, staying focused on your business while we move your goods."
        image={{
          src: "/solutions/port container yard.jpg",
          alt: "Port container yard with stacked shipping containers",
          objectPosition: "50% 50%",
        }}
        glassWidth="max-w-4xl"
      />

      <SolutionPains
        pains={PILLARS}
        image={{
          src: "/solutions/import-pains-v2.webp",
          alt: "Boeing 737 aircraft being loaded with palletised air freight on the apron",
          objectPosition: "55% 50%",
        }}
        eyebrow="Why ITD Global"
        heading="Three reasons importers choose us."
        lead="Corporate rates, total accountability, and a team on the ground wherever your goods start."
      />

      {/* Body copy */}
      <section className="bg-white py-16 md:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-eyebrow text-accent mb-3">The full picture</p>
            <h2 className="text-display-lg text-text-primary mb-6 max-w-2xl">
              One account.<br />Every stage of the journey.
            </h2>
            <div className="max-w-3xl space-y-4 text-body-md text-text-secondary leading-relaxed">
              <p>
                Importing regularly from China or other origins comes with a lot of moving parts. Factories in different time zones. Customs documentation that holds up clearance if it is wrong. Couriers that need booking, tracking, and chasing. Costs that are hard to control when you are managing it all separately.
              </p>
              <p>
                ITD Global removes that friction. We give back control by offering flexibility and visibility to ensure the right carrier is selected to better manage costs. Our China-based team works directly with your factories, managing collections and consolidations on the ground.
              </p>
              <p>
                Because everything runs through one account, you always know where your shipment is and who to call. We work with importers, manufacturers, retailers and ecommerce brands, and we size the solution to what you actually need, not what is easiest to quote.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What you get — card grid */}
      <section className="bg-bg-secondary py-16 md:py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-eyebrow text-accent mb-3">What we handle</p>
            <h2 className="text-display-lg text-text-primary mb-10">
              What you get with ITD Global.
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHAT_YOU_GET.map(({ icon: Icon, text }, i) => (
              <ScrollReveal key={text} delay={i * 0.06}>
                <div className="bg-white rounded-xl border border-border p-5 h-full hover:border-accent/30 hover:shadow-sm transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-sm font-medium text-text-primary leading-snug">{text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <VerticalPage
        hideDefaultHero
        hidePainPoints
        label="Import"
        title="Importing from the Far East or worldwide? We've got it covered."
        subtitle="ITD Global takes the complexity out of importing. With our teams on the ground in China, we offer a single point of contact from collection to delivery."
        primaryCta={{ label: "Get in Touch", href: "/contact?enquiry=import" }}
        secondaryCta={{ label: "Request a Quote", href: "#estimator" }}
        pains={PILLARS}
        caseStudy={getCaseStudiesBySolution("Import")[0] ?? caseStudies[4]}
        caseStudies={getCaseStudiesBySolution("Import")}
        rateChecker="import"
        faq={[
          {
            question: "Does ITD Global handle customs clearance for imports?",
            answer:
              "Yes, in-house across all import routes. Our customs team prepares and submits all HMRC import entries. You provide invoices and packing lists and we handle everything else. No third-party broker fees.",
          },
          {
            question: "Do you have a team in China?",
            answer:
              "Yes. Our China-based team handles factory collections directly, working in the same time zone as your suppliers. No UK-based intermediary managing it remotely.",
          },
          {
            question: "Can you consolidate shipments from multiple Chinese factories?",
            answer:
              "Yes. We collect from multiple factories and consolidate into a single movement before it leaves China, whether that is an air freight consolidation for samples or a buyers consolidation by sea. One invoice, one customs entry, lower cost.",
          },
          {
            question: "How does parcel consolidation work?",
            answer:
              "We group your smaller consignments through our Shenzhen warehouse before they ship. Consolidating into a single movement typically reduces delivery costs by 20% or more compared to shipping each order individually.",
          },
          {
            question: "Do you offer warehousing once goods arrive in the UK?",
            answer:
              "Yes, through Delta Fulfilment. Goods-in, storage, pick and pack, marketplace integrations, and returns are all available as a direct extension of your import service.",
          },
          {
            question: "What size businesses do you work with?",
            answer:
              "We work with businesses across a range of sectors and volumes, from growing ecommerce brands to established retailers and manufacturers. If you are importing regularly, we can build a solution around your routes and requirements.",
          },
        ]}
        closingCta={{
          headline: "Ready to simplify your import operation?",
          subhead:
            "One conversation. We'll show you the rates, the route, and what a single point of contact actually looks like in practice.",
          primary: { label: "Get in Touch", href: "/contact?enquiry=import" },
          secondary: { label: "Request a Quote", href: "#estimator" },
        }}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "Import", path: "/solutions/import" },
        ]}
        jsonLd={[
          serviceSchema({
            name: "Import Shipping Services",
            description:
              "ITD Global helps UK businesses manage international imports from China and worldwide. In-house customs clearance, competitive rates, parcel consolidation via Shenzhen warehouse, and one point of contact for the entire journey.",
            path: "/solutions/import",
            serviceType: "Import Shipping and Logistics Services",
            areaServed: ["United Kingdom", "China", "Worldwide"],
          }),
        ]}
      />
    </>
  );
}
