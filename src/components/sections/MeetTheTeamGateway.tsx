import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TeamCard from "@/components/sections/TeamCard";
import { getLeadership } from "@/lib/data";
import { ArrowRight } from "lucide-react";

/**
 * "Meet the Team" gateway band for the About page. Shows the leadership
 * (c-suite + directors) and routes to the full /about/team page.
 */
export default function MeetTheTeamGateway() {
  const leaders = getLeadership().filter((m) => !m.hideFromGateway);
  if (leaders.length === 0) return null;

  return (
    <section className="bg-white py-16 md:py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <p className="text-eyebrow text-accent mb-3">Our team</p>
              <h2 className="text-display-lg text-text-primary">
                The people behind ITD Global.
              </h2>
              <p className="mt-4 text-body-md text-text-secondary">
                Operators, not account numbers. The leadership team that owns
                your logistics outcomes and the people you&rsquo;ll actually
                talk to.
              </p>
            </div>
            <Link
              href="/about/team"
              className="link-underline gap-1 text-sm text-accent font-medium flex-shrink-0"
            >
              Explore <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {leaders.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 0.08}>
              <TeamCard member={member} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
