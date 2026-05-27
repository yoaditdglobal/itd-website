import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import CountUp from "@/components/ui/CountUp";
import MagneticButton from "@/components/ui/MagneticButton";
import {
  Package,
  Globe,
  BarChart3,
  ArrowRight,
  Box,
  Truck,
  Settings,
  TrendingUp,
} from "lucide-react";

interface CtaButton {
  label: string;
  href: string;
}

interface HeroProps {
  title?: React.ReactNode;
  subtitle?: string;
  primaryCta?: CtaButton;
  secondaryCta?: CtaButton;
}

export default function Hero({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroProps = {}) {
  const heading = title ?? (
    <>
      Smarter Shipping<br className="hidden sm:block" /> for a Simpler Tomorrow.
    </>
  );
  const sub =
    subtitle ??
    "ITD Global is the logistics partner and multi-carrier platform behind UK retailers, marketplace sellers, 3PLs, and exporters. Connexx compares every active carrier on every parcel, picks the cheapest compliant option, and prints the label in one click. Domestic, international, returns, and customs all run from a single dashboard.";
  const primary = primaryCta ?? {
    label: "Run the savings estimator",
    href: "/shipping/domestic#estimator",
  };
  const secondary = secondaryCta ?? { label: "Request a demo", href: "/contact" };

  return (
    <section className="relative hero-bg overflow-hidden min-h-[calc(100vh-72px)] flex items-center">
      {/* Soft radial accent blobs */}
      <div className="hero-bg-blob" aria-hidden />
      {/* Subtle grain overlay — organic texture, kept very low opacity */}
      <div className="absolute inset-0 bg-noise pointer-events-none opacity-[0.45] mix-blend-multiply" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-0 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Mobile: dashboard mockup shown ABOVE headline */}
          <div className="lg:hidden hero-entrance-aside">
            <DashboardMockup />
          </div>

          {/* Left — copy */}
          <div>
            <h1 className="hero-entrance-h1 text-display-xl text-text-primary">
              {heading}
            </h1>
            <p className="hero-entrance-sub mt-6 text-body-lg text-text-secondary max-w-xl">
              {sub}
            </p>
            <div className="hero-entrance-cta mt-8 flex flex-col sm:flex-row gap-3">
              <MagneticButton>
                <Button href={primary.href} variant="primary">{primary.label}</Button>
              </MagneticButton>
              <Button href={secondary.href} variant="secondary">{secondary.label}</Button>
            </div>
          </div>

          {/* Desktop: dashboard mockup on the right */}
          <div className="hidden lg:block hero-entrance-aside">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardMockup() {
  const shipments = [
    {
      id: "SHP-4821",
      carrier: "DHL Express",
      logo: "/logos/carriers/dhl_logo.webp",
      status: "In Transit",
      dest: "Berlin",
    },
    {
      id: "SHP-4820",
      carrier: "FedEx",
      logo: "/logos/carriers/fedex_logo.png",
      status: "Delivered",
      dest: "New York",
    },
    {
      id: "SHP-4819",
      carrier: "Royal Mail",
      logo: "/logos/carriers/Royal-Mail-Logo.png",
      status: "Processing",
      dest: "London",
    },
  ];

  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-white to-bg-tertiary rounded-2xl border border-border shadow-md overflow-hidden">
        {/* Top accent gradient bar */}
        <div className="h-0.5 w-full bg-gradient-to-r from-accent via-accent-secondary to-accent" />

        {/* App header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-white/60 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-gradient-to-br from-accent to-accent-dark text-white text-[10px] font-bold">
              ITD
            </div>
            <span className="text-sm font-semibold text-text-primary">Connexx</span>
            <span className="hidden sm:inline-flex text-[10px] text-text-tertiary border-l border-border pl-2 ml-1">
              Operations
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" aria-hidden />
            <span className="text-[10px] font-medium text-text-secondary">Live data</span>
          </div>
        </div>

        {/* Body: sidebar + main */}
        <div className="flex">
          {/* Sidebar (collapsed) */}
          <div className="flex flex-col items-center gap-3 px-2 py-4 border-r border-border bg-white/40">
            {[
              { Icon: Box, label: "Shipments", active: true },
              { Icon: Truck, label: "Carriers" },
              { Icon: Globe, label: "Lanes" },
              { Icon: BarChart3, label: "Reports" },
              { Icon: Settings, label: "Settings" },
            ].map(({ Icon, label, active }) => (
              <span
                key={label}
                title={label}
                className={`flex items-center justify-center w-7 h-7 rounded-md ${
                  active
                    ? "bg-accent-light text-accent"
                    : "text-text-tertiary"
                }`}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={2} />
              </span>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0 p-4 space-y-3">
            <div className="grid grid-cols-3 gap-2.5">
              <StatCard
                icon={Package}
                label="Shipments"
                value={<CountUp to={12847} duration={1800} />}
                trend="+12%"
                trendColor="text-success-dark"
                pathD="M0 14 Q6 10 12 11 T24 6 T36 4 T48 2"
              />
              <StatCard
                icon={Globe}
                label="Countries"
                value={<CountUp to={42} duration={1400} />}
                trend="+3"
                trendColor="text-success-dark"
                pathD="M0 12 L8 11 L16 9 L24 9 L32 7 L40 6 L48 4"
              />
              <StatCard
                icon={BarChart3}
                label="Cost Saved"
                value={<CountUp to={38} duration={1600} suffix="%" />}
                trend="+8%"
                trendColor="text-success-dark"
                pathD="M0 13 Q8 12 14 10 T28 7 T40 5 L48 3"
              />
            </div>

            <div className="bg-white rounded-lg p-3 border border-border shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-text-primary">Recent shipments</span>
                <ArrowRight className="w-3.5 h-3.5 text-text-tertiary" />
              </div>
              <div className="divide-y divide-border">
                {shipments.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between py-2 first:pt-1 last:pb-1"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <IntegrationLogo
                        name={s.carrier}
                        logo={s.logo}
                        size="xs"
                        className="flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono text-text-tertiary">{s.id}</span>
                          <span className="text-[10px] text-text-quaternary">·</span>
                          <span className="text-[11px] font-medium text-text-primary truncate">
                            {s.carrier}
                          </span>
                        </div>
                        <span className="text-[10px] text-text-tertiary">{s.dest}</span>
                      </div>
                    </div>
                    <StatusPill status={s.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: typeof Package;
  label: string;
  value: React.ReactNode;
  trend: string;
  trendColor: string;
  pathD: string;
}

function StatCard({ icon: Icon, label, value, trend, trendColor, pathD }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-2.5 border border-border shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <Icon className="w-3.5 h-3.5 text-accent" />
        <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold ${trendColor}`}>
          <TrendingUp className="w-2.5 h-2.5" />
          {trend}
        </span>
      </div>
      <div className="text-[10px] text-text-tertiary leading-none">{label}</div>
      <div className="text-base font-bold text-text-primary leading-tight mt-0.5">{value}</div>
      <svg
        viewBox="0 0 48 16"
        className="mt-1 w-full h-4 overflow-visible"
        aria-hidden
        preserveAspectRatio="none"
      >
        <path
          d={pathD}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={1.5}
          strokeLinecap="round"
          opacity={0.9}
        />
      </svg>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles =
    status === "Delivered"
      ? "bg-success-light text-success-dark"
      : status === "In Transit"
      ? "bg-info-light text-accent-dark"
      : "bg-warning-light text-warning-dark";
  return (
    <span
      className={`flex-shrink-0 inline-flex items-center text-[9px] font-semibold px-2 py-0.5 rounded-full ${styles}`}
    >
      {status}
    </span>
  );
}
