import Link from "next/link";
import Image from "next/image";

/**
 * Association memberships shown in the footer. Official marks are never
 * recoloured: full-colour logos ("light" variant) sit on white tiles to stay
 * legible on the dark footer; official white-variant logos ("dark") sit on
 * frosted dark tiles of the same geometry. The GA "Proud" seal and the
 * Home & Gift Association wordmark are the same organisation (the GA rebranded
 * as the HGA), so both link to giftwareassociation.org.
 */
const memberships: {
  name: string;
  href: string;
  src: string;
  width: number;
  height: number;
  tile: "light" | "dark";
  imgClass: string;
}[] = [
  {
    name: "BIFA — British International Freight Association",
    href: "https://www.bifa.org",
    src: "/logos/memberships/bifa.png",
    width: 442,
    height: 348,
    tile: "light",
    imgClass: "h-8 w-auto object-contain",
  },
  {
    name: "WCA — World Cargo Alliance",
    href: "https://www.wcaworld.com",
    src: "/logos/memberships/wca.png",
    width: 800,
    height: 287,
    tile: "light",
    imgClass: "h-7 w-auto object-contain",
  },
  {
    name: "BATF — British Allied Trades Federation",
    href: "https://www.batf.uk.com",
    src: "/logos/memberships/batf.webp",
    width: 556,
    height: 182,
    tile: "light",
    imgClass: "h-7 w-auto object-contain",
  },
  {
    name: "The Giftware Association — proud member",
    href: "https://www.giftwareassociation.org",
    src: "/logos/memberships/ga-seal.png",
    width: 400,
    height: 395,
    tile: "dark",
    imgClass: "h-8 w-auto object-contain",
  },
  {
    name: "Home & Gift Association",
    href: "https://www.giftwareassociation.org",
    src: "/logos/memberships/home-and-gift.svg",
    width: 507,
    height: 120,
    tile: "dark",
    imgClass: "h-6 w-auto object-contain",
  },
];

const footerLinks = {
  solutions: [
    { name: "eCommerce", href: "/solutions/ecommerce" },
    { name: "Marketplace Seller", href: "/solutions/marketplace-seller" },
    { name: "3PL", href: "/solutions/3pl" },
    { name: "Export", href: "/solutions/export" },
    { name: "Import", href: "/solutions/import" },
    { name: "B2B", href: "/solutions/b2b" },
  ],
  platform: [
    { name: "Connexx", href: "/connexx" },
    { name: "Carrier integrations", href: "/integrations/carriers" },
    { name: "Tech integrations", href: "/integrations/tech" },
  ],
  resources: [
    { name: "Case Studies", href: "/resources/case-studies" },
    { name: "Help Center", href: "/help" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Locations", href: "/about#locations" },
    { name: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <h3 className="text-eyebrow text-white/55 mb-4">Solutions</h3>
            <ul className="space-y-2.5">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-eyebrow text-white/55 mb-4">Platform</h3>
            <ul className="space-y-2.5">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-eyebrow text-white/55 mb-4">Resources</h3>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-eyebrow text-white/55 mb-4">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Brand + memberships row — logos sit right beside the "Member of"
            label; the copyright line takes the far end of the row. */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col items-center gap-5 lg:flex-row lg:justify-between">
          <div className="flex flex-col items-center gap-5 lg:flex-row lg:gap-4">
            <div className="flex items-center gap-4">
              <Link href="/" aria-label="ITD Global — home">
                <Image
                  src="/logos/itd/itd-global-logo.webp"
                  alt="ITD Global"
                  width={576}
                  height={240}
                  className="h-8 w-auto"
                />
              </Link>
              <span className="hidden h-8 w-px bg-white/10 sm:block" aria-hidden />
              <span className="text-eyebrow text-white/40">Member of</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {memberships.map((m) => (
              <a
                key={m.name}
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${m.name} (opens in a new tab)`}
                className={`inline-flex h-11 items-center rounded-lg px-2.5 py-1.5 transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
                  m.tile === "light"
                    ? "bg-white"
                    : "bg-white/10 border border-white/10"
                }`}
              >
                <Image
                  src={m.src}
                  alt={m.name}
                  width={m.width}
                  height={m.height}
                  className={m.imgClass}
                />
              </a>
            ))}
            </div>
          </div>
          <div className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} ITD Global. All rights reserved.
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-6 text-xs text-white/40">
            <Link href="/privacy-policy" className="hover:text-white/70">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white/70">Terms of Service</Link>
            <Link href="/cookie-policy" className="hover:text-white/70">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
