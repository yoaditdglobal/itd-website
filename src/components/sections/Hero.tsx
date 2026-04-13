import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Package, Globe, BarChart3, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden min-h-[calc(100vh-72px)] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-0 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Mobile: dashboard mockup shown ABOVE headline */}
          <ScrollReveal className="lg:hidden">
            <DashboardMockup />
          </ScrollReveal>

          {/* Left — copy */}
          <ScrollReveal>
            <div>
              <h1 className="font-bold tracking-tight text-text-primary">
                Ship smarter,<br className="hidden sm:block" /> not harder.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed">
                ITD Global connects your logistics stack — from carriers to customs to
                customers — so you can focus on growth, not shipment chaos.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button href="#" variant="primary">Get Started</Button>
                <Button href="/contact" variant="secondary">Contact Sales</Button>
              </div>
            </div>
          </ScrollReveal>

          {/* Desktop: dashboard mockup on the right */}
          <ScrollReveal delay={0.15} className="hidden lg:block">
            <DashboardMockup />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function DashboardMockup() {
  return (
    <div className="relative">
      <div className="bg-bg-secondary rounded-2xl border border-border p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <span className="ml-2 text-xs text-text-tertiary">Connexx Dashboard</span>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-lg p-3 border border-border">
              <Package className="w-5 h-5 text-accent mb-1" />
              <div className="text-xs text-text-tertiary">Shipments</div>
              <div className="text-lg font-bold text-text-primary">12,847</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-border">
              <Globe className="w-5 h-5 text-accent mb-1" />
              <div className="text-xs text-text-tertiary">Countries</div>
              <div className="text-lg font-bold text-text-primary">42</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-border">
              <BarChart3 className="w-5 h-5 text-accent mb-1" />
              <div className="text-xs text-text-tertiary">Cost Saved</div>
              <div className="text-lg font-bold text-text-primary">38%</div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-text-primary">Recent Shipments</span>
              <ArrowRight className="w-3.5 h-3.5 text-text-tertiary" />
            </div>
            {[
              { id: "SHP-4821", carrier: "DHL Express", status: "In Transit", dest: "Berlin" },
              { id: "SHP-4820", carrier: "FedEx", status: "Delivered", dest: "New York" },
              { id: "SHP-4819", carrier: "Royal Mail", status: "Processing", dest: "London" },
            ].map((s) => (
              <div key={s.id} className="flex items-center justify-between py-1.5 border-t border-border first:border-t-0">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-text-tertiary">{s.id}</span>
                  <span className="text-xs text-text-secondary">{s.carrier}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-secondary">{s.dest}</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    s.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : s.status === "In Transit"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
