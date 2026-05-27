import VerticalPage from "@/components/sections/VerticalPage";
import { caseStudies, getCaseStudiesBySolution } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/components/seo/JsonLd";
import { LayoutGrid, Zap, Search, Plug } from "lucide-react";

export const metadata = buildMetadata({
  title: "Amazon and eBay shipping software for UK marketplace sellers",
  description:
    "Cut Amazon late shipment penalties to zero. One dispatch queue for Amazon, eBay, Etsy, and TikTok Shop, with SLA-aware carrier routing for Royal Mail, Evri, DPD, and Amazon Shipping.",
  path: "/solutions/marketplace-seller",
});

export default function MarketplaceSellerPage() {
  return (
    <VerticalPage
      label="Marketplace Seller"
      title="Stop paying Amazon and eBay late shipment penalty fees."
      subtitle="You ship 200 to 2,000 orders a day across Amazon, eBay, Etsy, and TikTok Shop. Every platform has a different SLA, a different label format, and its own penalty structure. Connexx pulls every order into one dispatch queue, routes each one to a Valid Tracking Rate-compliant carrier, and writes the tracking number back to Seller Central before the cut-off."
      primaryCta={{ label: "Request the marketplace demo", href: "/contact?enquiry=marketplace" }}
      secondaryCta={{ label: "Read the West Ham United story (3 min)", href: "/resources/case-studies/west-ham-united" }}
      pains={[
        {
          num: "01",
          title: "Amazon and eBay rules change and your labels stop printing",
          desc: "Amazon's Buy Shipping requirements changed twice in the last 12 months. eBay's late shipment rate threshold tightened. Miss a label format update and a batch of shipments gets rejected, triggering a late delivery flag that takes three months of clean performance to recover from.",
        },
        {
          num: "02",
          title: "On a high-volume day, orders fall through the cracks",
          desc: "When 400 orders come in across five platforms during a promotion, the tab-switching workflow breaks. An order buried in Etsy gets missed. It ships a day late, costs a 5-star rating, and lands on the Amazon On-Time Delivery Rate report.",
        },
        {
          num: "03",
          title: "Penalty invoices arrive and you cannot trace the cause",
          desc: "Amazon and eBay itemise penalty fees by ASIN or listing, not by carrier or SLA breach type. Tracing a £400 penalty back to a single dispatch decision takes two hours. By then the same root cause has already triggered another one.",
        },
      ]}
      features={[
        {
          icon: LayoutGrid,
          title: "One dispatch queue for Amazon, eBay, Etsy, and TikTok Shop",
          desc: "Every order from every marketplace lands in a single queue with the SLA deadline, the marketplace-specific carrier whitelist, and the recommended carrier already populated. You start printing labels at 8am without opening Seller Central, eBay Seller Hub, or any other platform tab.",
        },
        {
          icon: Zap,
          title: "SLA-aware routing for Valid Tracking Rate and Late Shipment Rate",
          desc: "Connexx knows Amazon's dispatch cut-off is 4pm and routes accordingly. Every Amazon order goes to a Valid Tracking Rate-compliant carrier (Royal Mail Tracked 24, Amazon Shipping, DPD Next Day). Tracking writes back to Seller Central in real time. Your VTR stays above 95% without manual checking.",
        },
        {
          icon: Search,
          title: "Penalty fee tracing in under two minutes",
          desc: "Every penalty invoice ties back to a specific shipment, a specific carrier, and a specific SLA breach. The dashboard shows which marketplace, which listing, and which dispatch decision caused each fee. Velocity Sellers cut £12,000 a month in penalty fees to zero using this workflow.",
        },
        {
          icon: Plug,
          title: "Linnworks, Selro, and StoreFeeder integration",
          desc: "Connexx sits on top of your listing tool as the shipping layer. Linnworks, Selro, StoreFeeder, and Veeqo all push orders into Connexx for rate shopping and label generation. Tracking and dispatch confirmations write back to the marketplace through the listing tool. No double data entry.",
        },
      ]}
      integrations={[
        {
          name: "Amazon",
          logo: "/logos/marketplaces/amazon_logo.png",
          description: "Amazon Seller Central UK, DE, FR, IT, ES, and NL with Buy Shipping support.",
          href: "/integrations/marketplaces",
        },
        {
          name: "eBay",
          logo: "/logos/marketplaces/ebay_logo.png",
          description: "eBay UK and DE with Late Shipment Rate-compliant carrier routing.",
          href: "/integrations/marketplaces",
        },
        {
          name: "Etsy",
          logo: "/logos/marketplaces/etsy_logo.png",
          description: "Etsy shop integration with branded tracking for the marketplace's reach.",
          href: "/integrations/marketplaces",
        },
        {
          name: "TikTok Shop",
          logo: "/logos/marketplaces/tiktok_logo.png",
          description: "TikTok Shop UK fulfilment with same multi-carrier routing as the rest of the stack.",
          href: "/integrations/marketplaces",
        },
        {
          name: "Royal Mail",
          logo: "/logos/carriers/Royal-Mail-Logo.png",
          description: "Tracked 24 and Tracked 48 are Amazon Valid Tracking Rate compliant.",
          href: "/integrations/carriers/royal-mail",
        },
        {
          name: "Evri",
          logo: "/logos/carriers/evri_logo.png",
          description: "Standard and Next Day with ParcelShop drop-off for high-volume periods.",
          href: "/integrations/carriers/evri",
        },
        {
          name: "DPD",
          logo: "/logos/carriers/DPD-LOGO.png",
          description: "Next Day and Saturday for Amazon Prime and eBay Guaranteed Delivery.",
          href: "/integrations/carriers/dpd",
        },
        {
          name: "Amazon Shipping",
          logo: "/logos/carriers/amazonshipping_logo.png",
          description: "Seller Fulfilled Prime-approved carrier with same-day rate access.",
          href: "/integrations/carriers/amazon-shipping",
        },
      ]}
      caseStudy={getCaseStudiesBySolution("Marketplace")[0] ?? caseStudies[1]}
      faq={[
        {
          question: "How do I keep my Amazon Valid Tracking Rate above 95%?",
          answer:
            "Use a carrier that pushes scan events back to Amazon within the Valid Tracking Rate window. Royal Mail Tracked 24, Royal Mail Tracked 48, Amazon Shipping, and DPD Next Day all meet the VTR standard. Connexx routes every Amazon order through a VTR-compliant carrier by default, writes the tracking number back to Seller Central automatically, and flags any order at risk of dropping below 95% before it ships.",
        },
        {
          question: "What's the difference between Amazon Buy Shipping and Connexx?",
          answer:
            "Amazon Buy Shipping gives you discounted rates on a limited carrier list, but only for Amazon orders. Connexx covers Amazon, eBay, Etsy, TikTok Shop, and your own Shopify store from one dispatch queue, with rate shopping across Royal Mail, Evri, DPD, Parcelforce, and Amazon Shipping. Velocity Sellers eliminated £12,000 a month in penalty fees by moving to Connexx multi-channel dispatch.",
        },
        {
          question: "Does Connexx work with Linnworks for Amazon and eBay?",
          answer:
            "Yes. Connexx integrates with Linnworks as the shipping layer. Linnworks handles listings and order import from Amazon, eBay, Etsy, and TikTok Shop. Connexx handles rate shopping, label generation, and tracking write-back. Orders move from listed to dispatched in one workflow, with no double data entry. Selro, StoreFeeder, and Veeqo integrations follow the same pattern.",
        },
        {
          question: "How do I stop getting Amazon late shipment penalties?",
          answer:
            "Three things. Ship by the carrier cut-off, use a tracked service that scans within the SLA, and write the tracking number back to Seller Central before the dispatch deadline. Connexx automates all three. Routing rules pick a VTR-compliant carrier, batch labels print before cut-off, and tracking writes back through the Amazon API in real time.",
        },
        {
          question: "Can I use Connexx for Seller Fulfilled Prime?",
          answer:
            "Yes. Connexx routes Seller Fulfilled Prime orders through Amazon-approved carriers: Royal Mail Tracked 24, DPD Next Day, and Amazon Shipping. The platform respects the SFP On-Time Delivery Rate (OTDR) and Valid Tracking Rate requirements. Orders display the Prime badge as long as your account meets the eligibility thresholds, and Connexx flags any order at risk.",
        },
        {
          question: "How do I trace a penalty fee back to a single dispatch decision?",
          answer:
            "Open the penalty in the Connexx dashboard. Each penalty invoice ties to a specific shipment, listing, ASIN or eBay item number, carrier, and SLA breach type. You see the dispatch timestamp, the carrier scan history, and the marketplace ack receipt in one view. Velocity Sellers identified the root cause of every penalty within two minutes using this dashboard.",
        },
      ]}
      closingCta={{
        headline: "Cut penalty fees to zero before the next peak.",
        subhead:
          "The demo shows the unified order queue and SLA-aware routing in the first five minutes. Scoped to your marketplace mix.",
        primary: { label: "Request the marketplace demo", href: "/contact?enquiry=marketplace" },
        secondary: { label: "Read the West Ham United story", href: "/resources/case-studies/west-ham-united" },
      }}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Solutions", path: "/solutions" },
        { name: "Marketplace Seller", path: "/solutions/marketplace-seller" },
      ]}
      jsonLd={[
        serviceSchema({
          name: "Marketplace seller shipping software",
          description:
            "Multi-carrier shipping platform for UK Amazon, eBay, Etsy, and TikTok Shop sellers. SLA-aware carrier routing for Valid Tracking Rate and Late Shipment Rate compliance, with one dispatch queue across every marketplace.",
          path: "/solutions/marketplace-seller",
          serviceType: "Multi-Channel Marketplace Shipping Software",
          areaServed: ["United Kingdom", "European Union"],
        }),
      ]}
    />
  );
}
