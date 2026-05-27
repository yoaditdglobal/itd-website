import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import CountUp from "@/components/ui/CountUp";
import ImageCarousel from "@/components/ui/ImageCarousel";
import ClosingCTA from "@/components/sections/ClosingCTA";
import MeetTheTeamGateway from "@/components/sections/MeetTheTeamGateway";
import {
  JsonLd,
  organizationSchema,
  breadcrumbSchema,
} from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { companyPhotos } from "@/lib/data";
import { Handshake, Network, Cpu, ShieldCheck } from "lucide-react";

export const metadata = buildMetadata({
  title: "About ITD Global — the logistics partner behind Connexx",
  description:
    "ITD Global is an operator-led logistics partner running carrier management, customs, and fulfilment support for hundreds of UK businesses — and the team behind the Connexx multi-carrier platform.",
  path: "/about",
});

const PHOTOS = companyPhotos;

const STATS = [
  { to: 16, suffix: "", label: "Carrier integrations" },
  { to: 20, suffix: "+", label: "Tech integrations" },
  { to: 42, suffix: "+", label: "Countries covered" },
  { to: 99, suffix: "%", label: "Platform uptime" },
];

const VALUES = [
  {
    icon: Handshake,
    title: "Operators, not resellers",
    body: "We run real logistics every day — carrier management, customs, peak planning. You get people who know the work, not a reseller passing you along.",
  },
  {
    icon: Network,
    title: "One partner, every carrier",
    body: "Royal Mail, DPD, Evri, FedEx, DHL and more — managed under one roof. One relationship, one invoice, one team accountable for the outcome.",
  },
  {
    icon: Cpu,
    title: "Built on our own software",
    body: "Connexx wasn't bought in. We built it to run our own operation, then opened it up — so the platform is shaped by people who ship, not just engineers.",
  },
  {
    icon: ShieldCheck,
    title: "UK team, real accountability",
    body: "A dedicated account manager who knows your operation, picks up the phone, and owns the problem until it's solved.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="relative hero-bg overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-noise pointer-events-none opacity-[0.4] mix-blend-multiply" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-accent-light text-accent-dark text-eyebrow mb-4">
              About ITD Global
            </span>
            <h1 className="text-display-xl text-text-primary">
              We&rsquo;re the logistics partner behind the platform.
            </h1>
            <p className="mt-5 text-body-lg text-text-secondary">
              ITD Global runs carrier management, customs, and fulfilment
              support for hundreds of UK businesses — and builds the Connexx
              platform that powers it. Operators first, software second.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button href="/contact">Talk to the team</Button>
              <Button href="/connexx" variant="secondary">
                See the platform
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Photo carousel */}
      <section className="bg-white py-12 md:py-16 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <ImageCarousel
              images={PHOTOS}
              aspect="16 / 9"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-eyebrow text-accent mb-3">Our story</p>
            <h2 className="text-display-lg text-text-primary mb-6">
              Built from running real logistics.
            </h2>
            <div className="space-y-5 text-body-md text-text-secondary leading-relaxed">
              <p>
                ITD Global started on the operations floor, not in a software
                studio. Years of moving parcels and pallets for UK retailers,
                marketplace sellers, and 3PLs taught us where shipping actually
                breaks — surcharge surprises, portal sprawl, customs holds, peak
                chaos.
              </p>
              <p>
                We built Connexx to fix those problems in our own operation
                first: one rate engine across every carrier, one dashboard, one
                set of numbers finance can trust. It worked, so we opened it up
                to the businesses we already shipped for.
              </p>
              <p>
                Today the platform is backed by a UK team that manages carrier
                relationships, handles customs and Dangerous Goods compliance,
                and plans for peak alongside our customers. Software when you
                want self-serve; operators on the phone when you need them.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Meet the Team gateway */}
      <MeetTheTeamGateway />

      {/* What makes us different */}
      <section className="bg-bg-secondary py-16 md:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-display-lg text-text-primary mb-2 text-center">
              What makes us different.
            </h2>
            <p className="text-body-md text-text-secondary text-center max-w-2xl mx-auto mb-12">
              Most shipping tools are software companies that found logistics.
              We&rsquo;re a logistics company that built the software.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {VALUES.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.08} className="h-full">
                <div className="h-full flex flex-col bg-white rounded-2xl border border-border p-6">
                  <div className="w-10 h-10 rounded-md bg-accent-light flex items-center justify-center mb-4">
                    <v.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-heading-sm text-text-primary mb-2">
                    {v.title}
                  </h3>
                  <p className="text-body-sm text-text-secondary leading-relaxed">
                    {v.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-bg-dark py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-stat-xl text-white">
                  <CountUp to={s.to} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-sm text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA
        headline="Ready to ship smarter?"
        subtitle="Two minutes with the savings estimator, or talk to an operator who knows your lanes."
        primaryCta={{ label: "Run the savings estimator", href: "/shipping/domestic#estimator" }}
        secondaryCta={{ label: "Talk to the team", href: "/contact" }}
      />
    </>
  );
}
