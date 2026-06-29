import VerticalPage from "@/components/sections/VerticalPage";
import { RATE_CHECKER_URL } from "@/lib/site-config";
import SolutionHero from "@/components/sections/SolutionHero";
import SolutionPains from "@/components/sections/SolutionPains";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import { caseStudies, getCaseStudiesBySolution } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/components/seo/JsonLd";
import type { LucideIcon } from "lucide-react";
import {
  Globe,
  Package,
  ShieldCheck,
  UserCheck,
  Zap,
  LayoutDashboard,
  Eye,
  BarChart3,
  TrendingDown,
  MapPin,
  Truck,
  Plug,
} from "lucide-react";

export const metadata = buildMetadata({
  title: "International Export Shipping Services | ITD Global",
  description:
    "ITD Global helps UK businesses ship internationally with confidence. Multi-courier parcel delivery to 190+ countries, export customs clearance, DDP shipping, and one point of contact for the whole operation.",
  path: "/solutions/export",
});

const PILLARS = [
  {
    num: "01",
    title: "High volume corporate discounts",
    desc: "ITD Global's buying power means you access the same rates as the biggest multinationals, without needing their volume to get there. More competitive pricing on every international shipment, from day one.",
  },
  {
    num: "02",
    title: "Single point of contact",
    desc: "One contact manages your entire export operation. They compare transit times and costs across couriers, handle documentation, and keep things moving so you are not coordinating across multiple suppliers or chasing updates from different parts of the chain.",
  },
  {
    num: "03",
    title: "We take care of everything",
    desc: "Whether your shipments move on DDP or DDU terms, door to door, ITD Global manages the full export journey. You focus on your business. We take care of getting your goods there.",
  },
];

const WHAT_YOU_GET: { icon: LucideIcon; text: string }[] = [
  { icon: Globe,        text: "International parcel delivery to 195+ countries from one account" },
  { icon: TrendingDown, text: "Access to FedEx, UPS, DHL, DPD, Evri, and more at high-volume corporate rates" },
  { icon: ShieldCheck,  text: "In-house export customs support including commercial invoices, packing lists, HS codes, and certificates of origin" },
  { icon: Package,      text: "DDP and DDU shipping managed end to end" },
  { icon: Zap,          text: "Multi-courier rate comparison and automated carrier selection via Connexx" },
  { icon: Plug,         text: "Platform integrations with Shopify, WooCommerce, marketplaces, WMS, and ERP systems" },
  { icon: UserCheck,    text: "One named account manager across freight and parcels" },
  { icon: MapPin,       text: "Cross-border shipping expertise across ecommerce, retail, and manufacturing" },
];

export default function ExportPage() {
  return (
    <>
      <SolutionHero
        label="Export"
        title="Ship internationally with the rates, reach, and support to do it properly."
        subtitle="ITD Global gives UK businesses access to a powerful network of international couriers, support with customs, and a platform that keeps your entire export operation visible and under control. All through one account."
        image={{
          src: "/solutions/loading plane.png",
          alt: "Cargo aircraft on the apron being prepared for an international export flight",
          objectPosition: "50% 50%",
        }}
      />

      <SolutionPains
        pains={PILLARS}
        image={{
          src: "/solutions/reasons why exporters choose us new.png",
          alt: "Three reasons exporters choose ITD Global",
          objectPosition: "50% 50%",
        }}
        eyebrow="Why ITD Global"
        heading="Three reasons exporters choose us."
        lead="Corporate rates, total accountability, and a team that handles the full export journey from collection to delivery."
      />

      {/* Body copy */}
      <section className="bg-white py-16 md:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-eyebrow text-accent mb-3">The full picture</p>
            <h2 className="text-display-lg text-text-primary mb-6 max-w-2xl">
              One account.<br />Every stage of the export journey.
            </h2>
            <div className="max-w-3xl space-y-4 text-body-md text-text-secondary leading-relaxed">
              <p>
                Shipping internationally means navigating different couriers, customs requirements, and landed cost calculations for every market you sell into. Get any of it wrong and you are either losing margin on service, or losing customers to a poor delivery experience at the other end.
              </p>
              <p>
                ITD Global takes that off your plate. Our network of international couriers, including DPD, FedEx, Evri, DHL, and UPS, is accessed through a single account, with high-volume corporate rates that most businesses could not negotiate independently. Our in-house team supports on export documentation, HS code classification, and DDP shipping so your goods clear borders without delays.
              </p>
              <p>
                Whether you are an ecommerce brand shipping to consumers worldwide, a retailer sending products to distributors, or a manufacturer exporting to markets in Asia and the Middle East, we build the operation around your volumes, your destinations, and your requirements.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Connexx platform section */}
      <section className="bg-bg-secondary py-16 md:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — copy */}
            <ScrollReveal>
              <div>
                <p className="text-eyebrow text-accent mb-3">The Connexx Platform</p>
                <h2 className="text-display-lg text-text-primary">
                  Compare rates. Book carriers. Track every shipment.
                </h2>
                <p className="mt-6 text-body-lg text-text-secondary">
                  Connexx is ITD Global's multi-courier shipping platform built for international export. Compare live rates across DHL Express, FedEx, UPS, DPD, and Evri, automate carrier selection per shipment, generate labels and customs documents, and track every consignment from collection to delivery. All from one login.
                </p>
                <div className="mt-8">
                  <Button href="/connexx">Explore Connexx</Button>
                </div>
              </div>
            </ScrollReveal>

            {/* Right — platform mockup */}
            <ScrollReveal delay={0.15}>
              <div className="bg-white rounded-2xl border border-border p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs text-text-tertiary">Connexx: Export Modules</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { icon: Zap,           name: "Rate Compare" },
                    { icon: Truck,         name: "Carrier Select" },
                    { icon: LayoutDashboard, name: "Label Gen" },
                    { icon: ShieldCheck,   name: "Customs Docs" },
                    { icon: Eye,           name: "Tracking" },
                    { icon: BarChart3,     name: "Analytics" },
                  ].map((mod) => (
                    <div key={mod.name} className="bg-bg-secondary rounded-lg p-3 border border-border text-center">
                      <mod.icon className="w-6 h-6 text-accent mx-auto mb-1.5" />
                      <p className="text-xs font-medium text-text-primary">{mod.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What you get — card grid */}
      <section className="bg-white py-16 md:py-20 border-t border-border">
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
                <div className="bg-bg-secondary rounded-xl border border-border p-5 h-full hover:border-accent/30 hover:shadow-sm transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-label text-text-primary leading-snug">{text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <VerticalPage
        hideDefaultHero
        hidePainPoints
        label="Export"
        title="Ship internationally with the rates, reach, and support to do it properly."
        subtitle="ITD Global gives UK businesses access to a powerful network of international couriers, support with customs, and a platform that keeps your entire export operation visible and under control. All through one account."
        primaryCta={{ label: "Get in Touch", href: "/contact?enquiry=export" }}
        secondaryCta={{ label: "Request a Quote", href: RATE_CHECKER_URL }}
        pains={PILLARS}
        caseStudy={getCaseStudiesBySolution("Export")[0] ?? caseStudies[3]}
        caseStudies={getCaseStudiesBySolution("Export")}
        faq={[
          {
            question: "Which couriers does ITD work with for international shipping?",
            answer:
              "We work with a network of leading international couriers including DPD, FedEx, DHL, UPS, and Evri. Through Connexx, our multi-courier platform, you can compare rates across all of them and choose the right service for each shipment, with the benefit of ITD's corporate pricing.",
          },
          {
            question: "What is DDP shipping and does ITD offer it?",
            answer:
              "DDP (Delivered Duty Paid) means ITD manages duties, taxes, and customs clearance in the destination country on your behalf. Your buyer receives the goods without any surprise charges at the door. ITD offers DDP shipping across key international export markets.",
          },
          {
            question: "How does ITD handle export customs clearance?",
            answer:
              "In-house. Our customs team manages all export documentation including commercial invoices, packing lists, HS code classification, and certificates of origin. No third-party broker fees. We flag compliance issues before the shipment moves, not after.",
          },
          {
            question: "Can I manage all my export couriers in one place?",
            answer:
              "Yes. Through Connexx, our multi-courier shipping platform, you can compare rates, automate carrier selection, generate labels, and track every shipment across all couriers from one login.",
          },
          {
            question: "Does ITD integrate with ecommerce platforms and marketplaces?",
            answer:
              "Yes. Connexx integrates with Shopify, WooCommerce, Amazon, eBay, and other major marketplaces, as well as WMS and ERP systems, through plug-and-play setups and custom APIs.",
          },
          {
            question: "What countries does ITD ship to?",
            answer:
              "190+ countries. Our network covers major export markets including the US, Europe, China, Australia, and the Middle East, with both parcel and freight options available.",
          },
          {
            question: "Who manages my account?",
            answer:
              "A named contact across both freight and parcels. One person who knows your destinations, volumes, and requirements. Not a rotating helpdesk.",
          },
        ]}
        closingCta={{
          headline: "Ready to take the complexity out of international shipping?",
          subhead:
            "One conversation. We'll show you the rates, the courier network, and what a single point of contact actually looks like in practice.",
          primary: { label: "Get in Touch", href: "/contact?enquiry=export" },
          secondary: { label: "Request a Quote", href: RATE_CHECKER_URL },
        }}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "Export", path: "/solutions/export" },
        ]}
        jsonLd={[
          serviceSchema({
            name: "International Export Shipping Services",
            description:
              "ITD Global helps UK businesses ship internationally with confidence. Multi-courier parcel delivery to 190+ countries, export customs clearance, DDP shipping, and one point of contact for the whole operation.",
            path: "/solutions/export",
            serviceType: "International Export Shipping and Logistics Services",
            areaServed: ["United Kingdom", "European Union", "United States", "Worldwide"],
          }),
        ]}
      />
    </>
  );
}
