import ScrollReveal from "@/components/animations/ScrollReveal";
import { RefreshCw } from "lucide-react";
import type { TechPageProps } from "@/lib/tech-pages";

/**
 * Body sections for a tech integration detail page.
 * Passed as the `body` slot to IntegrationDetail — mirrors the CarrierPage
 * layout (dark stats strip → data-flows grid → features grid).
 */
export default function TechPage({ name, stats, whatConnects, features }: TechPageProps) {
  return (
    <>
      {/* Stats strip */}
      <section className="bg-bg-dark py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Connexx syncs */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-display-lg text-text-primary mb-8">
              What Connexx syncs with {name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {whatConnects.map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-xl border border-border p-5 flex items-start gap-3"
                >
                  <RefreshCw className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-text-primary">{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* {Name} + Connexx features */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-display-lg text-text-primary mb-3">
              {name} + Connexx
            </h2>
            <p className="text-text-secondary mb-10 max-w-2xl">
              Everything you get from {name}, enhanced with Connexx&apos;s automation,
              rate intelligence, and multi-carrier network.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.07}>
                <div className="bg-bg-secondary rounded-xl border border-border p-6 h-full">
                  <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-text-primary">{f.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
