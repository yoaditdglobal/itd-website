import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import UsedByChip from "./UsedByChip";
import { getCaseStudiesBySolution, type SolutionTag } from "@/lib/data";
import {
  Building2,
  Store,
  ShoppingCart,
  Globe,
  Package,
  Factory,
  Truck,
  Boxes,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Icp {
  name: string;
  hook: string;
  icon: LucideIcon;
  href: string;
  solutionTag: SolutionTag;
}

const icps: Icp[] = [
  {
    name: "eCommerce",
    hook: "Stop logging into four carrier portals to answer one WISMO ticket.",
    icon: ShoppingCart,
    href: "/solutions/ecommerce",
    solutionTag: "eCommerce",
  },
  {
    name: "Marketplace Seller",
    hook: "Penalty fees to zero. One queue across Amazon, eBay, and the rest.",
    icon: Package,
    href: "/solutions/marketplace-seller",
    solutionTag: "Marketplace",
  },
  {
    name: "3PL",
    hook: "Onboard a new client in two days, not two weeks.",
    icon: Truck,
    href: "/solutions/3pl",
    solutionTag: "3PL",
  },
  {
    name: "B2B",
    hook: "Order confirmed in the ERP, carrier booked automatically.",
    icon: Factory,
    href: "/solutions/b2b",
    solutionTag: "B2B",
  },
  {
    name: "Enterprise",
    hook: "40 carrier relationships, one set of numbers you can trust.",
    icon: Building2,
    href: "/solutions/enterprise",
    solutionTag: "Enterprise",
  },
  {
    name: "SMEs",
    hook: "Sixty labels printed in one batch before 10am.",
    icon: Store,
    href: "/solutions/small-business",
    solutionTag: "Small Business",
  },
  {
    name: "Export",
    hook: "Six documents per shipment, generated from the data you already have.",
    icon: Globe,
    href: "/solutions/export",
    solutionTag: "Export",
  },
  {
    name: "Import",
    hook: "Landed cost calculated before the goods leave the origin country.",
    icon: Boxes,
    href: "/solutions/import",
    solutionTag: "Import",
  },
];

export default function SolutionsRouting() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionLabel
            title="Find the page built for your operation."
            subtitle="Each route below curates the carriers, integrations, and real customer stories that match how you ship."
            align="center"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 items-stretch">
          {icps.map((icp, i) => (
            <ScrollReveal key={icp.name} delay={i * 0.05} className="h-full">
              <IcpCard icp={icp} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function IcpCard({ icp }: { icp: Icp }) {
  const studies = getCaseStudiesBySolution(icp.solutionTag);
  const visible = studies.slice(0, 3);
  const overflow = studies.length - visible.length;
  const Icon = icp.icon;

  return (
    <div className="group relative flex h-full flex-col rounded-2xl border border-border bg-white p-5 md:p-6 transition-all duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 hover:shadow-md hover:border-accent/30">
      {/* Whole-card link to the solution page (stretched overlay). The "Used by"
          logos sit above it (z-[2]) as their own links to the case study. */}
      <Link
        href={icp.href}
        aria-label={icp.name}
        className="absolute inset-0 z-[1] rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      />

      <div className="flex items-start justify-between mb-4">
        <span
          aria-hidden
          className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-accent-light text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-200"
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </span>
        <ArrowRight
          className="w-4 h-4 text-text-tertiary group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-200 motion-reduce:group-hover:translate-x-0 mt-1.5"
          aria-hidden
        />
      </div>
      <p className="text-heading-sm text-text-primary group-hover:text-accent transition-colors">
        {icp.name}
      </p>
      <p className="mt-2 text-body-sm text-text-secondary leading-relaxed">
        {icp.hook}
      </p>

      <div className="mt-auto pt-4 border-t border-border">
        <p className="text-eyebrow text-text-tertiary mb-2">Used by</p>
        <div className="flex items-center gap-2">
          {/* z-[2] lifts the logos above the stretched solution link so each is
              its own hover/click target; "+ N more" stays under it. */}
          <div className="relative z-[2] flex items-center gap-1.5">
            {visible.length > 0 ? (
              visible.map((cs) => {
                const q = cs.quotes?.[0];
                return (
                  <UsedByChip
                    key={cs.id}
                    cs={{
                      slug: cs.slug,
                      brandName: cs.brandName,
                      logo: cs.logo,
                      stats: cs.stats,
                      quoteAuthor: q
                        ? [q.name, q.title].filter(Boolean).join(", ")
                        : cs.quoteAuthor,
                      quoteAuthorPhoto: q?.photo ?? cs.quoteAuthorPhoto,
                      oneLiner: cs.oneLiner,
                      headline: cs.headline,
                    }}
                  />
                );
              })
            ) : (
              // Placeholder tiles — swap for real customer logos when case
              // studies exist for this solution tag.
              [0, 1, 2].map((n) => (
                <span
                  key={n}
                  aria-hidden
                  className="inline-block h-7 w-7 rounded-md border border-border bg-bg-secondary"
                />
              ))
            )}
          </div>
          {overflow > 0 && (
            <span className="text-caption text-text-tertiary">
              + {overflow} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
