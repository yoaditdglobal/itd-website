import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ClosingCTA from "@/components/sections/ClosingCTA";
import CarrierOrbit from "@/components/sections/CarrierOrbit"; // client component
import HeroBackdrop from "@/components/ui/HeroBackdrop";
import { AboutSplit, FeatureGrid, ServicesList } from "@/components/sections/DetailSections";
import { JsonLd, serviceSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import { REGION_THEMES, brandGlow } from "@/lib/page-themes";
import type { LucideIcon } from "lucide-react";

export interface CarrierFeature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface CarrierVideo {
  /** Path under /public, e.g. "/media/evri-brand-film.mp4". */
  src: string;
  /** Section heading. Defaults to "About {name}". */
  heading?: string;
  /** One-line lead under the heading. */
  caption?: string;
}

export interface CarrierPageProps {
  name: string;
  /** URL slug, e.g. "dhl" → /integrations/carriers/dhl. Enables Service + BreadcrumbList JSON-LD. */
  slug?: string;
  logo?: string;
  logoBg?: string;
  heroBg?: string;
  tagline: string;
  description: string;
  region: string;
  services: string[];
  features: CarrierFeature[];
  /** Optional "About {name}" narrative prose, rendered between the hero and the
   *  Features grid. Each string is a paragraph. */
  about?: string[];
  /** Optional brand-film section rendered after Features. No autoplay — the
   *  film carries audio; controls + preload="metadata" keep page weight ~0
   *  until play. Display width is capped (max-w-xl) so low-res sources stay
   *  acceptable. */
  video?: CarrierVideo;
}

export default function CarrierPage({
  name,
  slug,
  logo,
  logoBg,
  heroBg,
  tagline,
  description,
  region,
  services,
  features,
  about,
  video,
}: CarrierPageProps) {
  const realServices = services.filter(Boolean);
  // Identity: region colour (Domestic teal · International cobalt) + the
  // carrier's own brand colour on the hero, orbit and route trail.
  const theme = region.includes("International") ? REGION_THEMES.International : REGION_THEMES.Domestic;
  const brand = brandGlow(logo, theme.glow);
  return (
    <>
      {slug && (
        <JsonLd
          data={[
            serviceSchema({
              name: `${name} integration`,
              description,
              path: `/integrations/carriers/${slug}`,
              serviceType: "Carrier integration",
              areaServed: region ? [region] : undefined,
            }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Carriers", path: "/integrations/carriers" },
              { name, path: `/integrations/carriers/${slug}` },
            ]),
          ]}
        />
      )}

      {/* Hero */}
      <section
        data-hero-tone="dark"
        className={`bleed-nav relative overflow-hidden py-16 md:py-24 lg:py-28 ${heroBg ? "" : "bg-bg-dark"}`}
        style={heroBg ? { backgroundColor: heroBg } : undefined}
      >
        <HeroBackdrop primary={brand} secondary={theme.glow} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
            <ScrollReveal className="max-w-2xl">
              <div>
                <Link
                  href="/integrations/carriers"
                  className="group inline-flex items-center gap-1.5 text-sm text-white/55 transition-colors hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
                  All carriers
                </Link>
              </div>
              {region && (
                <p className="mt-8 flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-eyebrow text-white/80 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: brand }} aria-hidden />
                  {region} carrier
                </p>
              )}
              <h1 className="mt-5 text-display-xl text-white">{`${name} + ITD`}</h1>
              {/* Mobile orbit — below the title; at lg it sits in the right column. */}
              <div className="lg:hidden flex justify-center my-8">
                <CarrierOrbit name={name} logo={logo} logoBg={logoBg} brand={brand} />
              </div>
              <p className="mt-5 text-body-lg font-medium text-white/80">{tagline}</p>
              <p className="mt-4 text-body-md text-white/55">{description}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="#features" surface="dark" size="lg">Explore</Button>
              </div>
            </ScrollReveal>

            <div className="hidden lg:flex flex-shrink-0 items-center justify-center">
              <CarrierOrbit name={name} logo={logo} logoBg={logoBg} brand={brand} />
            </div>
          </div>
        </div>
      </section>

      {/* About {name} — narrative prose (optional) */}
      {about && about.length > 0 && (
        <AboutSplit name={name} logo={logo} logoFill theme={theme} eyebrow={`${theme.label} carrier`} paragraphs={about} />
      )}

      {/* Features — the hero "Explore" CTA anchors here */}
      <FeatureGrid
        id="features"
        eyebrow="Features"
        heading="Features built for your workflow"
        intro={`Everything you get from ${name}, enhanced with ITD's automation, analytics, and multi-carrier intelligence.`}
        features={features}
        theme={theme}
      />

      {/* Brand film — optional. Player-with-controls, never autoplay (audio);
          preload="metadata" so the page pays nothing until play; max-w-xl caps
          upscaling of low-res sources. */}
      {video && (
        <section className="section-glow section-glow--light bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <ScrollReveal>
                <p className="text-eyebrow" style={{ color: theme.accent }}>Film</p>
                <h2 className="mt-3 text-display-lg text-text-primary">{video.heading ?? `About ${name}`}</h2>
                {video.caption && <p className="mt-4 max-w-xl text-body-lg text-text-secondary">{video.caption}</p>}
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className="max-w-xl">
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                  <video
                    src={video.src}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full aspect-video rounded-2xl bg-bg-dark shadow-[0_28px_56px_-28px_rgb(15_23_42/0.5)] ring-1 ring-black/5"
                  >
                    Your browser can&apos;t play this video.{" "}
                    <a href={video.src} className="underline">Download it instead.</a>
                  </video>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}

      {/* Services available through ITD */}
      {realServices.length > 0 && (
        <ServicesList
          heading={`${name} services on Connexx`}
          intro={`Every ${name} service you can book and track from the ITD dashboard.`}
          services={realServices}
          theme={theme}
        />
      )}

      <ClosingCTA
        headline={`Start shipping with ${name}`}
        subtitle="Connect your account in minutes. No migration, no downtime."
      />
    </>
  );
}
