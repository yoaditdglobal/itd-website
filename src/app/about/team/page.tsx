import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import TeamCard from "@/components/sections/TeamCard";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { getLeadership, getWiderTeam } from "@/lib/data";

export const metadata = buildMetadata({
  title: "Meet the team — ITD Global",
  description:
    "The people behind ITD Global and the Connexx platform — the leadership and operators managing carriers, customs, and fulfilment for hundreds of UK businesses.",
  path: "/about/team",
});

export default function TeamPage() {
  const leadership = getLeadership();
  const widerTeam = getWiderTeam();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Team", path: "/about/team" },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="relative hero-bg overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-noise pointer-events-none opacity-[0.4] mix-blend-multiply" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-accent-light text-accent-dark text-eyebrow mb-4">
              Our team
            </span>
            <h1 className="text-display-xl text-text-primary">
              The team behind ITD Global.
            </h1>
            <p className="mt-5 text-body-lg text-text-secondary">
              Logistics is a people business. Behind the Connexx platform is a
              UK team that manages carrier relationships, handles customs, and
              picks up the phone when you need them.
            </p>
            <div className="mt-8">
              <Button href="/contact">Talk to the team</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-white py-16 md:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-display-md text-text-primary mb-8">Your Next Logistics Partners</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            {leadership.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.08}>
                <TeamCard member={member} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Wider team — renders only when populated */}
      {widerTeam.length > 0 && (
        <section className="bg-bg-secondary py-16 md:py-24 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-display-md text-text-primary mb-8">
                ITD Global Team
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
              {widerTeam.map((member, i) => (
                <ScrollReveal key={member.name} delay={i * 0.05}>
                  <TeamCard member={member} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <ClosingCTA
        headline="Work with a team that knows your lanes."
        subtitle="Talk to an operator who manages shipping like yours every day."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
        secondaryCta={{ label: "Get Quote", href: "/shipping/domestic#estimator" }}
      />
    </>
  );
}
