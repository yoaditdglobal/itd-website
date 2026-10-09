import Image from "next/image";
import Button from "@/components/ui/Button";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import AutoplayVideo from "@/components/ui/AutoplayVideo";
import type { NavPromo } from "./nav-menus";

type Props = {
  promo: NavPromo;
  /** `panel` = the desktop mega menu's right column; `mobile` = inside the dark overlay. */
  surface?: "panel" | "mobile";
};

/**
 * The right-hand promo card of a mega menu: art, eyebrow, title, body, one
 * full-width CTA. Two tones on the panel (tinted light, or navy) and a single
 * dark-card treatment on mobile. No `.font-display` class here — the nav's
 * light-hero theme rule would recolour it; the type tokens set the face.
 */
export default function NavPromoCard({ promo, surface = "panel" }: Props) {
  const navy = surface === "mobile" || promo.tone === "navy";
  const shell =
    surface === "mobile"
      ? "mt-4 rounded-xl bg-bg-dark-card p-5"
      : promo.tone === "navy"
        ? "flex h-full flex-col bg-bg-dark p-6"
        : "flex h-full flex-col bg-accent-light/60 p-6";

  return (
    <div className={`${shell} ${navy ? "text-white" : "text-text-primary"}`}>
      <div className="mb-5">
        {promo.art.kind === "image" && (
          <Image
            src={promo.art.src}
            alt={promo.art.alt}
            width={promo.art.width}
            height={promo.art.height}
            sizes="(min-width: 1280px) 312px, (min-width: 1024px) 272px, 100vw"
            className={`w-full h-auto rounded-lg ${navy ? "ring-1 ring-white/10" : ""}`}
          />
        )}
        {promo.art.kind === "video" && (
          // Reserve the clip's aspect ratio so opening the menu never shifts the
          // card; the poster still frame shows for reduced-motion / no-JS.
          <div
            className={`overflow-hidden rounded-lg ${navy ? "ring-1 ring-white/10" : ""}`}
            style={{ aspectRatio: `${promo.art.width} / ${promo.art.height}` }}
          >
            <AutoplayVideo
              mp4={promo.art.mp4}
              webm={promo.art.webm}
              poster={promo.art.poster}
              ariaLabel={promo.art.alt || undefined}
              className="block h-full w-full object-cover"
            />
          </div>
        )}
        {promo.art.kind === "icon" && (
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
            <promo.art.icon className="h-7 w-7 text-accent" strokeWidth={1.75} aria-hidden />
          </div>
        )}
        {promo.art.kind === "logos" && (
          <div className="flex flex-wrap gap-2">
            {promo.art.logos.map((l) => (
              <div key={l.name} className="rounded-md bg-white p-1 ring-1 ring-border">
                <IntegrationLogo name={l.name} logo={l.logo} size="sm" />
              </div>
            ))}
          </div>
        )}
      </div>
      <p className={`text-eyebrow ${navy ? "text-white/60" : "text-accent"}`}>{promo.eyebrow}</p>
      <p className="text-heading-md mt-2">{promo.title}</p>
      <p className={`text-body-sm mt-2 ${navy ? "text-white/75" : "text-text-secondary"}`}>{promo.body}</p>
      <div className="mt-auto pt-5">
        <Button
          href={promo.cta.href}
          variant="primary"
          surface={navy ? "dark" : "light"}
          size={surface === "mobile" ? "lg" : "default"}
          className={`w-full ${promo.tone === "navy" && surface === "panel" ? "nav-promo-cta--yellow" : ""}`}
        >
          {promo.cta.label}
        </Button>
      </div>
    </div>
  );
}
