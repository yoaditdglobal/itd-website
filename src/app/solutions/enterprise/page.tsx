import VerticalPage from "@/components/sections/VerticalPage";
import { RATE_CHECKER_URL } from "@/lib/site-config";
import SolutionHero from "@/components/sections/SolutionHero";
import SolutionPains from "@/components/sections/SolutionPains";
import { caseStudies, getCaseStudiesBySolution, getRelevantCaseStudies } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/components/seo/JsonLd";
import { AlertTriangle, Building2, Network, Plug, Receipt } from "lucide-react";

export const metadata = buildMetadata({
  title: "Enterprise shipping",
  description:
    "Pool your volume across our carrier network for rates and capacity your own contracts can't reach, with a dedicated team running it alongside yours. UK and international.",
  path: "/solutions/enterprise",
});

const PAINS = [
  {
    num: "01",
    title: "Your scale still isn't getting the best from your carriers",
    desc: "Your volume gets you good rates. A network pooling many shippers' volume gets better ones, and the difference is margin you're leaving behind.",
  },
  {
    num: "02",
    title: "No single carrier flexes for your peak",
    desc: "When volume spikes, one carrier can't conjure extra capacity overnight. You divert overflow and pay over the odds to keep the promise.",
  },
  {
    num: "03",
    title: "A dozen carrier relationships, no one accountable",
    desc: "A lost shipment or a billing dispute bounces between portals and call centres. Senior people lose hours chasing answers nobody owns.",
  },
  {
    num: "04",
    title: "Two carriers, all your risk in one basket",
    desc: "Concentrating your volume in one or two carriers means a single strike or service dip hits everything at once. And their last mile is rarely the best option for each customer's door.",
  },
];

const HERO_TITLE = "Even at your scale, your carriers have more to give";
const HERO_SUBTITLE =
  "Your volume is strong. Our carrier network makes it stronger, with rates and capacity your own contracts can't reach. A dedicated team runs it alongside yours.";
const PRIMARY = { label: "Get Quote", href: RATE_CHECKER_URL };
const SECONDARY = { label: "Contact Sales", href: "/contact?enquiry=enterprise" };

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Solutions", path: "/solutions" },
  { name: "Enterprise", path: "/solutions/enterprise" },
];

/** TL;DR — every bullet is verifiable against this page's own copy. */
const TLDR = [
  "We help large UK and international shippers reach rates and capacity their own contracts can't, by pooling their volume across our carrier network.",
  "We give you child accounts per site, brand and region, consolidated billing, native ERP and WMS write-back, and exceptions triaged before customers chase.",
  "A dedicated account team runs the carrier relationships and escalations, so a lost shipment or billing dispute isn't your senior people's to chase.",
];

export default function EnterprisePage() {
  return (
    <>
      <SolutionHero
        breadcrumbs={CRUMBS}
        label="Enterprise"
        title={HERO_TITLE}
        subtitle={HERO_SUBTITLE}
        primary={PRIMARY}
        secondary={SECONDARY}
        image={{
          src: "/solutions/enterprise-hero.webp",
          alt: "Operations analyst at a multi-screen workstation in an enterprise logistics office",
          objectPosition: "60% 45%",
          icon: Network,
        }}
      />
      <SolutionPains
        pains={PAINS}
        image={{
          src: "/solutions/enterprise-pains.webp",
          alt: "Account manager on the phone resolving a carrier issue on a laptop",
          objectPosition: "50% 35%",
          icon: Network,
        }}
        eyebrow="Where the margin leaves"
        heading="What gets in the way today"
        lead="Four places your scale still leaves rate, capacity, and accountability on the table."
      />
      <VerticalPage
        integrationsContext="Enterprise"
        gatewayMedia={{
          mp4: "/media/connexx-enterprise.mp4",
          webm: "/media/connexx-enterprise.webm",
          poster: "/media/connexx-enterprise-poster.jpg",
          caption:
            "Connexx fanning shipments out across child accounts, consolidating billing to one invoice, writing back to your ERP, and triaging delivery exceptions.",
        }}
        hideDefaultHero
        hidePainPoints
        label="Enterprise"
        title={HERO_TITLE}
        subtitle={HERO_SUBTITLE}
        primaryCta={PRIMARY}
        secondaryCta={SECONDARY}
        features={[
          {
            icon: Building2,
            title: "Child accounts for each site, brand and region",
          },
          {
            icon: Receipt,
            title: "Consolidated billing across all your accounts",
          },
          {
            icon: Plug,
            title: "Native ERP and WMS integrations, with shipment write-back",
          },
          {
            icon: AlertTriangle,
            title: "Delivery exceptions caught and triaged before customers chase",
          },
        ]}
        keyTakeaways={TLDR}
        breadcrumbs={CRUMBS}
        jsonLd={[
          serviceSchema({
            name: "Enterprise carrier network",
            description:
              "A pooled multi-carrier network for UK and international enterprises. Combined volume across many shippers reaches rates and surge capacity a single shipper's own contracts can't, run day to day by a dedicated account team.",
            path: "/solutions/enterprise",
            serviceType: "Enterprise Carrier Network",
            areaServed: ["United Kingdom", "European Union", "Worldwide"],
          }),
        ]}
        pains={PAINS}
        caseStudy={getCaseStudiesBySolution("Enterprise")[0] ?? caseStudies[2]}
        caseStudies={getRelevantCaseStudies({ solutions: ["Enterprise"] })}
        faq={[
          {
            question:
              "We already have carrier contracts and decent rates. What does ITD add?",
            answer:
              "A network that pools volume across many shippers, reaching rates and capacity your own contracts can't, even at your size. It sits on top of what you already have.",
          },
          {
            question: "How can pooled volume beat our own scale?",
            answer:
              "Carriers price on total volume. Yours is large. The network's combined volume is larger, so it commands rates and terms a single shipper can't.",
          },
          {
            question: "Can you handle our peak?",
            answer:
              "Yes. Spreading volume across several carriers gives you surge capacity a single carrier can't, so a spike doesn't leave you scrambling for trucks.",
          },
          {
            question: "Do we keep our own carriers?",
            answer:
              "Yes. Keep the relationships that work and route the rest through our network at better rates. Nothing gets ripped out.",
          },
          {
            question: "Who runs it day to day?",
            answer:
              "A dedicated account team. They manage the carrier relationships and escalations with you, so a lost shipment or a billing dispute isn't your senior people's to chase.",
          },
          {
            question: "Does this cover international as well as UK?",
            answer:
              "Yes. The network spans UK and international carriers, so one set of rates and one team cover both.",
          },
        ]}
        closingCta={{
          headline: "Benchmark your carrier rates against our network",
          subhead:
            "A bespoke review shows the gap in rate and service between what you pay now and what our carrier network can reach for you. Let us help you plan a carrier strategy that fits your entire supply chain.",
          primary: PRIMARY,
          secondary: SECONDARY,
        }}
      />
    </>
  );
}
