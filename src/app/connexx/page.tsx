import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { Zap, Eye, ShieldCheck, LayoutDashboard, BarChart3, Settings, RefreshCw, Globe, Code, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexx Platform — ITD Global",
  description: "One platform. Every shipment. Rate comparison, label generation, tracking, returns, analytics, and compliance — all in one dashboard.",
};

const modules = [
  { icon: Zap, name: "Rate Comparison", desc: "Compare rates across all carriers in real-time" },
  { icon: LayoutDashboard, name: "Label Generation", desc: "One-click and batch label creation" },
  { icon: Eye, name: "Tracking", desc: "Unified tracking across every carrier" },
  { icon: RefreshCw, name: "Returns Management", desc: "Automated returns workflows" },
  { icon: BarChart3, name: "Analytics", desc: "Cost, performance, and volume insights" },
  { icon: ShieldCheck, name: "Customs & Compliance", desc: "Automated documentation and checks" },
];

const deepDives = [
  {
    icon: Zap,
    title: "Rate Comparison Engine",
    benefits: [
      "Compares live rates across all connected carriers in under 2 seconds",
      "Factors in delivery speed, reliability scores, and destination to recommend the optimal carrier",
      "Saves an average of 32% on shipping costs in the first quarter",
    ],
    reverse: false,
  },
  {
    icon: Eye,
    title: "Real-Time Tracking Dashboard",
    benefits: [
      "Single pane of glass for every shipment across every carrier",
      "Proactive exception alerts catch delays before your customers notice",
      "Reduces WISMO tickets by up to 68% with automated customer notifications",
    ],
    reverse: true,
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Customs Engine",
    benefits: [
      "Auto-generates country-specific customs documentation from shipment data",
      "HS code classification and duty calculation before goods leave the warehouse",
      "Regulatory updates applied automatically — no manual rework when rules change",
    ],
    reverse: false,
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    benefits: [
      "Per-carrier, per-route, per-client cost breakdowns with drill-down capabilities",
      "Spot trends in delivery performance before they become customer complaints",
      "Export-ready reports for finance, operations, and executive stakeholders",
    ],
    reverse: true,
  },
];

export default function ConnexxPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">The Connexx Platform</p>
                <h1 className="font-bold tracking-tight text-text-primary">
                  One platform.<br />Every shipment.
                </h1>
                <p className="mt-4 text-lg text-text-secondary max-w-xl">
                  Connexx is the operating system for your logistics. Rate comparison, label generation, tracking, returns, analytics, and compliance — unified in one dashboard your entire team can use.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button href="#">Get Started</Button>
                  <Button href="#" variant="secondary">Book a Demo</Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="bg-bg-secondary rounded-2xl border border-border p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs text-text-tertiary">Connexx Dashboard</span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Active Shipments", val: "1,247" },
                    { label: "Carriers Connected", val: "23" },
                    { label: "Cost Saved MTD", val: "$18.4K" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white rounded-lg p-3 border border-border text-center">
                      <div className="text-xs text-text-tertiary">{s.label}</div>
                      <div className="text-lg font-bold text-text-primary">{s.val}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-lg p-3 border border-border">
                  <div className="h-24 flex items-end gap-1.5 px-2">
                    {[40, 55, 35, 70, 60, 80, 50, 90, 75, 85, 65, 95].map((h, i) => (
                      <div key={i} className="flex-1 bg-accent/20 rounded-t" style={{ height: `${h}%` }}>
                        <div className="w-full bg-accent rounded-t" style={{ height: `${Math.min(h + 10, 100) - 20}%` }} />
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-text-tertiary text-center mt-2">Shipment volume — Last 12 months</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Platform Overview — Module Grid */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-bold tracking-tight text-text-primary">Everything you need. Nothing you don&apos;t.</h2>
              <p className="mt-3 text-text-secondary max-w-2xl mx-auto">Six modules that cover the full shipment lifecycle. Each one works alone — together they&apos;re transformative.</p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((mod, i) => (
              <ScrollReveal key={mod.name} delay={i * 0.07}>
                <div className="bg-white rounded-xl border border-border p-6 hover:shadow-md hover:border-accent/20 transition-all">
                  <mod.icon className="w-8 h-8 text-accent mb-3" />
                  <h3 className="text-base font-semibold text-text-primary">{mod.name}</h3>
                  <p className="mt-1 text-sm text-text-secondary">{mod.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Deep Dives — Alternating */}
      {deepDives.map((section, i) => (
        <section key={section.title} className={`py-16 md:py-24 ${i % 2 === 0 ? "bg-white" : "bg-bg-secondary"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid lg:grid-cols-2 gap-12 items-center ${section.reverse ? "lg:direction-rtl" : ""}`}>
              <ScrollReveal className={section.reverse ? "lg:order-2" : ""}>
                <div>
                  <section.icon className="w-10 h-10 text-accent mb-4" />
                  <h2 className="text-2xl font-bold tracking-tight text-text-primary">{section.title}</h2>
                  <ul className="mt-6 space-y-4">
                    {section.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <span className="text-accent mt-1 flex-shrink-0">&#10003;</span>
                        <span className="text-text-secondary text-sm leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button href="#" variant="ghost">Learn more →</Button>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15} className={section.reverse ? "lg:order-1" : ""}>
                <div className="bg-bg-secondary rounded-2xl border border-border p-8 flex items-center justify-center min-h-[250px]">
                  <div className="text-center">
                    <section.icon className="w-16 h-16 text-accent/20 mx-auto mb-3" />
                    <p className="text-sm text-text-tertiary">{section.title} — UI Preview</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      ))}

      {/* Developer Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <Code className="w-10 h-10 text-accent mb-4" />
                <h2 className="text-2xl font-bold tracking-tight text-text-primary">Built for developers</h2>
                <p className="mt-3 text-text-secondary">
                  RESTful API with comprehensive documentation. Ship labels, track parcels, and manage carriers programmatically. Average response time under 200ms.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="#" variant="secondary" className="text-xs">Documentation</Button>
                  <Button href="#" variant="secondary" className="text-xs">API Reference</Button>
                  <Button href="#" variant="secondary" className="text-xs">Status Page</Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="bg-bg-dark rounded-xl p-6 font-mono text-sm overflow-x-auto">
                <div className="text-white/40 mb-2"># Create a shipment</div>
                <div className="text-green-400">curl</div>
                <div className="text-white ml-2">-X POST https://api.connexx.io/v1/shipments \</div>
                <div className="text-white ml-2">-H &quot;Authorization: Bearer sk_live_...&quot; \</div>
                <div className="text-white ml-2">-d &#39;&#123;</div>
                <div className="text-yellow-300 ml-6">&quot;origin&quot;: &quot;GB&quot;,</div>
                <div className="text-yellow-300 ml-6">&quot;destination&quot;: &quot;DE&quot;,</div>
                <div className="text-yellow-300 ml-6">&quot;weight_kg&quot;: 2.5,</div>
                <div className="text-yellow-300 ml-6">&quot;service&quot;: &quot;express&quot;</div>
                <div className="text-white ml-2">&#125;&#39;</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="bg-bg-dark py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCounter end={2400000} suffix="+" label="Shipments processed" />
            <AnimatedCounter end={85} suffix="+" label="Carriers connected" />
            <AnimatedCounter end={99} suffix="%" label="Platform uptime" prefix="" />
            <AnimatedCounter end={180} suffix="ms" label="Avg API response" prefix="<" />
          </div>
        </div>
      </section>

      <ClosingCTA
        headline="See Connexx in action"
        subtitle="Book a demo or start a free trial. No commitment, no credit card."
      />
    </>
  );
}
