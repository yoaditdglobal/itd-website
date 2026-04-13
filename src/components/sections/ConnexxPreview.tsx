import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Zap, Eye, ShieldCheck, LayoutDashboard, BarChart3, Settings } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Automated rate comparison",
    desc: "because choosing the wrong carrier on every shipment compounds into thousands lost per quarter.",
  },
  {
    icon: Eye,
    title: "Real-time tracking dashboard",
    desc: "because your CS team shouldn't need 4 carrier portals open to answer one customer question.",
  },
  {
    icon: ShieldCheck,
    title: "Built-in compliance engine",
    desc: "because a single customs error can hold an entire container at the border for days.",
  },
];

export default function ConnexxPreview() {
  return (
    <section className="bg-bg-secondary py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — benefits */}
          <ScrollReveal>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">The Connexx Platform</p>
              <h2 className="font-bold tracking-tight text-text-primary">
                One platform.<br />Every shipment.
              </h2>
              <div className="mt-8 space-y-6">
                {benefits.map((b) => (
                  <div key={b.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center">
                      <b.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary">{b.title}</h3>
                      <p className="text-sm text-text-secondary mt-0.5">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
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
                    <div className="text-xs font-medium text-text-primary">{mod.name}</div>
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
