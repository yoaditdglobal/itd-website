import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Zap, Eye, ShieldCheck, LayoutDashboard, BarChart3, Settings } from "lucide-react";

export default function ConnexxPreview() {
  return (
    <section className="bg-bg-secondary py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <ScrollReveal>
            <div>
              <p className="text-eyebrow text-accent mb-3">
                The Connexx Platform
              </p>
              <h2 className="text-display-lg text-text-primary">
                One platform. Every shipment.
              </h2>
              <p className="mt-6 text-base md:text-lg text-text-secondary leading-relaxed">
                Connexx is the multi-carrier shipping platform behind ITD Global.
                It compares live rates across every connected carrier, generates
                the right label, tracks the parcel from collection to delivery,
                and handles customs paperwork on cross-border shipments. Rate
                engine, label generation, tracking, and compliance run in a
                single dashboard.
              </p>
              <div className="mt-8">
                <Button href="/connexx">Explore</Button>
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
                <span className="ml-2 text-xs text-text-tertiary">Connexx — Platform Modules</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { icon: Zap, name: "Rate Compare" },
                  { icon: LayoutDashboard, name: "Label Gen" },
                  { icon: Eye, name: "Tracking" },
                  { icon: ShieldCheck, name: "Compliance" },
                  { icon: BarChart3, name: "Analytics" },
                  { icon: Settings, name: "Returns" },
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
  );
}
