import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TimelineVan from "@/components/sections/TimelineVan";
import CountUp from "@/components/ui/CountUp";
import ImageCarousel from "@/components/ui/ImageCarousel";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { companyPhotos } from "@/lib/data";
import MeetTheTeamGateway from "@/components/sections/MeetTheTeamGateway";
import SolutionHero from "@/components/sections/SolutionHero";
import {
  JsonLd,
  organizationSchema,
  breadcrumbSchema,
} from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About ITD Global",
  description:
    "ITD Global is a logistics partner and multi-courier platform helping ecommerce brands, retailers and manufacturers simplify domestic and international shipping. Find out who we are and how we got here.",
  path: "/about",
});

const PHOTOS = companyPhotos;

const STATS = [
  { to: 2004, suffix: "", label: "Founded", separator: false },
  { to: 190, suffix: "+", label: "Countries covered", separator: true },
  { to: 100, suffix: "+", label: "Team members", separator: true },
  { to: 16, suffix: "", label: "Carrier integrations", separator: true },
];

const TIMELINE = [
  { year: "2004", title: "Founded",                           card: "/about/cloud cards/Founded.png" },
  { year: "2005", title: "China: Xiamen office opens",        card: "/about/cloud cards/China_ Xiamen office opens.png" },
  { year: "2007", title: "China: Quanzhou office opens",      card: "/about/cloud cards/China_ Quanzhou office opens.png" },
  { year: "2010", title: "eCommerce parcel division launches", card: "/about/cloud cards/eCommerce parcel division launches.png" },
  { year: "2013", title: "Shenzhen warehouse opens",          card: "/about/cloud cards/Shenzhen warehouse opens.png" },
  { year: "2015", title: "USA: ITD Global USA Inc opens",     card: "/about/cloud cards/USA_ ITD Global USA Inc opens.png" },
  { year: "2016–17", title: "London and Birmingham depots open", card: "/about/cloud cards/London and Birmingham depots open.png" },
  { year: "2018–19", title: "Sunday Times Fast-Track 100, twice", card: "/about/cloud cards/Sunday Times Fast-Track 100, twice.png" },
  { year: "2020", title: "Freight division launches",         card: "/about/cloud cards/Freight division launches.png" },
  { year: "2021", title: "Move to Heywood HQ",               card: "/about/cloud cards/Move to Heywood HQ.png" },
  { year: "2022", title: "£15m investment from BGF",          card: "/about/cloud cards/£15m investment from BGF.png" },
];

const OFFICES = [
  { city: "Manchester", flag: "🇬🇧", note: "UK HQ — Heywood" },
  { city: "London", flag: "🇬🇧", note: "UK depot" },
  { city: "Birmingham", flag: "🇬🇧", note: "UK depot" },
  { city: "Glasgow", flag: "🇬🇧", note: "UK depot" },
  { city: "New Jersey", flag: "🇺🇸", note: "ITD Global USA Inc" },
  { city: "Xiamen / Quanzhou / Shenzhen", flag: "🇨🇳", note: "China offices" },
  { city: "Netherlands", flag: "🇳🇱", note: "EMEA office" },
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
      <SolutionHero
        label="About ITD Global"
        title="20 years of logistics expertise, at your service."
        subtitle="From a small team solving a real problem, to a global logistics partner with teams across four continents. Here's who we are."
        image={{
          src: "/about/IDT-DRONE_0001.jpg",
          alt: "Aerial view of ITD Global headquarters",
          objectPosition: "50% 50%",
        }}
      />

      {/* What we do */}
      <section className="bg-white py-16 md:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
            <ScrollReveal>
              <p className="text-eyebrow text-accent mb-3">What we do</p>
              <h2 className="text-display-lg text-text-primary mb-6">
                Built for businesses that need more from their shipping.
              </h2>
              <div className="space-y-5 text-body-md text-text-secondary leading-relaxed">
                <p>
                  ITD Global is a logistics partner built for businesses that
                  need more from their shipping operations.
                </p>
                <p>
                  We combine two decades of logistics expertise with technology
                  that makes complex shipping manageable. Through our platform,
                  ecommerce brands, retailers and manufacturers can manage label
                  production, set advanced shipping rules, and automate the
                  parts of the process that slow teams down.
                </p>
                <p>
                  We integrate with marketplaces, WMS and ERP systems through
                  plug-and-play setups and custom APIs, giving businesses
                  consistent visibility and cost control across their entire
                  shipping operation, domestically and internationally.
                </p>
                <p>
                  With teams across the UK, EMEA, the US and China, we bring
                  the people, the knowledge and the technology together in one
                  place.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15} className="h-full">
              <ImageCarousel
                images={PHOTOS}
                className="h-full min-h-[300px]"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-bg-dark py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-eyebrow text-white/50 text-center mb-10 tracking-widest uppercase">
              At a glance
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-stat-xl text-white">
                  <CountUp to={s.to} suffix={s.suffix} separator={s.separator} />
                </div>
                <p className="mt-2 text-sm text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-eyebrow text-accent mb-3">Our story</p>
            <h2 className="text-display-lg text-text-primary mb-6">
              Two decades of getting it right.
            </h2>
            <div className="space-y-5 text-body-md text-text-secondary leading-relaxed">
              <p>
                We started in 2004 with a straightforward goal: give importers
                and manufacturers better courier options and a team that was
                actually easy to work with. Everything we&rsquo;ve built since
                has come from listening to customers and expanding our
                capabilities to match what they need.
              </p>
              <p>
                From our first China office in 2005 to a £15m investment in
                2022, every step has been about giving businesses more ways to
                ship, with less friction.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-10 md:py-16 border-t border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-eyebrow text-accent mb-3 text-center">Our story</p>
            <h2 className="text-display-lg text-text-primary mb-8 text-center">
              Our milestones
            </h2>
          </ScrollReveal>

          <div className="relative">
            {/* Spine — desktop only */}
            <div
              data-timeline-spine
              className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-border hidden md:block"
              aria-hidden
            />
            <TimelineVan />

            <ol>
              {TIMELINE.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <ScrollReveal
                    key={item.year}
                    delay={i * 0.06}
                    className="relative flex md:mb-2"
                  >
                    {/* Year pill on spine */}
                    <div className="absolute left-1/2 top-6 -translate-x-1/2 z-10 hidden md:flex items-center justify-center">
                      <span className="px-3 py-1 rounded-full bg-accent text-white text-caption font-semibold whitespace-nowrap shadow-sm">
                        {item.year}
                      </span>
                    </div>

                    {/* Left half */}
                    <div className="hidden md:flex md:w-1/2 md:pr-6 md:justify-end">
                      {isLeft && (
                        <div className="w-full transition-transform duration-300 hover:-translate-y-2" style={{ margin: "-26% 0" }}>
                          <Image src={item.card} alt={item.title} width={400} height={400} className="w-full h-auto drop-shadow-md" />
                        </div>
                      )}
                    </div>

                    {/* Right half */}
                    <div className="w-full md:w-1/2 md:pl-6">
                      {/* Mobile: always show */}
                      <div className="md:hidden transition-transform duration-300 hover:-translate-y-2" style={{ margin: "-26% 0" }}>
                        <Image src={item.card} alt={item.title} width={400} height={400} className="w-full h-auto drop-shadow-md" />
                      </div>
                      {/* Desktop: only right-side items */}
                      {!isLeft && (
                        <div className="hidden md:block transition-transform duration-300 hover:-translate-y-2" style={{ margin: "-26% 0" }}>
                          <Image src={item.card} alt={item.title} width={400} height={400} className="w-full h-auto drop-shadow-md" />
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* Our people */}
      <MeetTheTeamGateway />

      {/* Global presence */}
      <section className="bg-bg-secondary py-16 md:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-eyebrow text-accent mb-3 text-center">Our people</p>
            <h2 className="text-display-lg text-text-primary mb-4 text-center">
              The same goal, wherever we&rsquo;re based.
            </h2>
            <p className="text-body-md text-text-secondary text-center max-w-2xl mx-auto mb-12">
              We&rsquo;re 100+ logistics and technology specialists spread
              across the UK, EMEA, the US and China. Our teams cover everything
              from account management and operations to platform development and
              customs expertise. Whatever they&rsquo;re working on, everyone is
              focused on the same thing: making shipping work properly for the
              businesses that depend on it.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {OFFICES.map((office, i) => (
              <ScrollReveal key={office.city} delay={i * 0.06}>
                <div className="bg-white rounded-2xl border border-border p-5 flex flex-col gap-1">
                  <span className="text-2xl" aria-hidden>
                    {office.flag}
                  </span>
                  <p className="text-heading-sm text-text-primary mt-1">
                    {office.city}
                  </p>
                  <p className="text-body-sm text-text-secondary">
                    {office.note}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA
        headline="Want to see what ITD Global can do for your business?"
        subtitle="Talk to a logistics specialist about your operation, your carriers, and where we can help."
        primaryCta={{ label: "Get in touch", href: "/contact" }}
        secondaryCta={{ label: "See our services", href: "/solutions" }}
      />
    </>
  );
}
