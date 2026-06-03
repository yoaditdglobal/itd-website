import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";

interface Brand {
  name: string;
  logo: string;
}

/* Innermost orbit — WMS / ERP / eCommerce platforms (closest to Connexx). */
const WMS: Brand[] = [
  { name: "Mintsoft", logo: "/logos/erp-wms/mintsoft_logo.png" },
  { name: "Linnworks", logo: "/logos/erp-wms/linnworks_logo.png" },
  { name: "Veeqo", logo: "/logos/erp-wms/veeqo_logo.png" },
  { name: "ShipStation", logo: "/logos/erp-wms/shipstation_logo.png" },
  { name: "Shopify", logo: "/logos/ecommerce/shopify_logo.png" },
];

/* Middle orbit — UK + global carriers. */
const CARRIERS: Brand[] = [
  { name: "Royal Mail", logo: "/logos/carriers/Royal-Mail-Logo.png" },
  { name: "DPD", logo: "/logos/carriers/DPD-LOGO.png" },
  { name: "Evri", logo: "/logos/carriers/evri_logo.png" },
  { name: "Parcelforce", logo: "/logos/carriers/parcel-force.svg" },
  { name: "DHL", logo: "/logos/carriers/dhl_logo.webp" },
  { name: "FedEx", logo: "/logos/carriers/fedex_logo.png" },
  { name: "UPS", logo: "/logos/carriers/ups_logo.png" },
  { name: "Amazon Shipping", logo: "/logos/carriers/amazonshipping_logo.png" },
];

/* Outer orbit — marketplaces. */
const MARKETPLACES: Brand[] = [
  { name: "Amazon", logo: "/logos/marketplaces/amazon_logo.png" },
  { name: "eBay", logo: "/logos/marketplaces/ebay_logo.png" },
  { name: "Etsy", logo: "/logos/marketplaces/etsy_logo.png" },
  { name: "TikTok Shop", logo: "/logos/marketplaces/tiktok_logo.png" },
  { name: "Temu", logo: "/logos/marketplaces/temu_logo.webp" },
];

const WMS_MOBILE_HIDE = new Set(["ShipStation", "Veeqo"]);
const CARRIERS_MOBILE_HIDE = new Set(["Parcelforce", "Amazon Shipping"]);
const MARKETPLACES_MOBILE_HIDE = new Set(["Etsy", "Temu"]);

/** Position a child on a circle of `radiusPct` from the centre. 0° = top. */
function orbitStyle(angleDeg: number, radiusPct: number): React.CSSProperties {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    position: "absolute",
    left: `${50 + Math.cos(rad) * radiusPct}%`,
    top: `${50 + Math.sin(rad) * radiusPct}%`,
    transform: "translate(-50%, -50%)",
  };
}

function IconChip({ brand }: { brand: Brand }) {
  return (
    <span
      title={brand.name}
      className="inline-flex items-center justify-center rounded-full bg-white shadow-lg border border-white/10 w-9 h-9 md:w-10 md:h-10"
    >
      <Image
        src={brand.logo}
        width={28}
        height={28}
        alt=""
        className="object-contain w-6 h-6 md:w-7 md:h-7"
      />
    </span>
  );
}

interface OrbitLayerProps {
  brands: Brand[];
  radiusPct: number;
  /** Wrapper rotation duration in seconds. */
  durationS: number;
  /** "cw" → wrapper rotates clockwise; child counter-rotates ccw. */
  direction: "cw" | "ccw";
  mobileHide: Set<string>;
}

function OrbitLayer({
  brands,
  radiusPct,
  durationS,
  direction,
  mobileHide,
}: OrbitLayerProps) {
  const wrapperAnim =
    direction === "cw"
      ? `connexx-orbit-cw ${durationS}s linear infinite`
      : `connexx-orbit-ccw ${durationS}s linear infinite`;
  const counterAnim =
    direction === "cw"
      ? `connexx-counter-cw ${durationS}s linear infinite`
      : `connexx-counter-ccw ${durationS}s linear infinite`;

  return (
    <div className="connexx-anim absolute inset-0" style={{ animation: wrapperAnim }}>
      {brands.map((brand, i) => {
        const angle = (360 / brands.length) * i;
        const hide = mobileHide.has(brand.name) ? "hidden md:flex" : "flex";
        return (
          <div key={brand.name} className={hide} style={orbitStyle(angle, radiusPct)}>
            <div className="connexx-anim" style={{ animation: counterAnim }}>
              <IconChip brand={brand} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ConnexxOrbit() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-bg-dark via-bg-dark-card to-bg-dark border-t border-border py-12 md:py-16">
      {/* Subtle accent glow behind the centre to make the yellow icon pop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 50% 60%, rgba(29,63,184,0.30) 0%, transparent 55%)",
        }}
      />
      <div className="absolute inset-0 bg-noise opacity-[0.35] mix-blend-soft-light pointer-events-none" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
            <p className="text-eyebrow text-accent-secondary mb-3">
              One platform, every connection
            </p>
            <Image
              src="/logos/connexx/connexx-logo-white-tight.svg"
              alt="Connexx"
              width={225}
              height={76}
              priority
              className="block mx-auto h-20 md:h-28 w-auto mb-6"
            />
            <h2 className="text-display-lg text-white">
              Connects your stack to every carrier.
            </h2>
            <p className="mt-5 text-body-md text-white/75">
              One platform, every integration — eCommerce platforms,
              marketplaces, ERPs and 16 carriers, all from a single workflow.
            </p>
          </div>
        </ScrollReveal>

        {/* Orbit graphic */}
        <div
          role="img"
          aria-label="Connexx connects to 16 carriers, 5 marketplaces, and major ERP and WMS systems."
          className="relative aspect-square mx-auto w-full max-w-[300px] md:max-w-[460px] lg:max-w-[540px]"
        >
          {/* Dashed concentric circles — rendered with CSS `border-dashed`
              on percentage-sized circles. CSS handles the dash pattern
              natively so there's no closing seam like an SVG stroke. */}
          {[28, 40, 52].map((r) => (
            <div
              key={r}
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/30"
              style={{
                width: `${r * 2}%`,
                height: `${r * 2}%`,
              }}
            />
          ))}

          {/* Outer orbit — marketplaces, 65s clockwise */}
          <OrbitLayer
            brands={MARKETPLACES}
            radiusPct={52}
            durationS={65}
            direction="cw"
            mobileHide={MARKETPLACES_MOBILE_HIDE}
          />

          {/* Middle orbit — carriers, 50s counter-clockwise */}
          <OrbitLayer
            brands={CARRIERS}
            radiusPct={40}
            durationS={50}
            direction="ccw"
            mobileHide={CARRIERS_MOBILE_HIDE}
          />

          {/* Inner orbit — WMS / ERP / eCommerce, 35s clockwise */}
          <OrbitLayer
            brands={WMS}
            radiusPct={28}
            durationS={35}
            direction="cw"
            mobileHide={WMS_MOBILE_HIDE}
          />

          {/* Centre — Connexx mark (transparent, no badge) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/logos/connexx/connexx-icon.svg"
              alt=""
              width={200}
              height={200}
              className="connexx-anim w-24 h-24 md:w-32 md:h-32"
              style={{
                animation: "connexx-spin 30s linear infinite",
              }}
            />
          </div>
        </div>

        {/* Screen-reader parity — full integration list (names live here only) */}
        <ul className="sr-only" aria-label="Integrations">
          {[...WMS, ...CARRIERS, ...MARKETPLACES].map((b) => (
            <li key={b.name}>{b.name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
