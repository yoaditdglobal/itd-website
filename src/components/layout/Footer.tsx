import Link from "next/link";

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
    { name: "Integrations", href: "/integrations" },
  ],
  resources: [
    { name: "Case Studies", href: "/resources/case-studies" },
    { name: "Help Center", href: "#" },
    { name: "Developers", href: "#" },
    { name: "Status", href: "#" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Careers", href: "#" },
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

        {/* Bottom row */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white font-bold text-lg tracking-tight">ITD Global</div>
          <div className="flex flex-wrap gap-6 text-xs text-white/40">
            <Link href="#" className="hover:text-white/70">Privacy Policy</Link>
            <Link href="#" className="hover:text-white/70">Terms of Service</Link>
            <Link href="#" className="hover:text-white/70">Cookie Policy</Link>
          </div>
          <div className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} ITD Global. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
