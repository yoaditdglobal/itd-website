// Single source of truth for rate-checker carrier logos.
// Every path MUST resolve to a file under public/logos/rate-checker/carriers/.
// (Previously this map was duplicated across 7 components, which drifted and
//  left broken refs — apc.jpg and yodel.png never existed on disk.)
export const CARRIER_LOGOS: Record<string, string> = {
  evri: "/logos/rate-checker/carriers/evri.png",
  "evri-eu": "/logos/rate-checker/carriers/evri-eu.png",
  // InPost replaces Yodel site-wide. `yodel` kept as a defensive alias so any
  // legacy DB-driven alt-carrier rule still renders a logo (the InPost mark)
  // rather than a broken image; all UI carrier pickers use `inpost`.
  inpost: "/logos/rate-checker/carriers/inpost.png",
  yodel: "/logos/rate-checker/carriers/inpost.png",
  "amazon-shipping": "/logos/rate-checker/carriers/amazon-shipping.png",
  "royal-mail": "/logos/rate-checker/carriers/royal-mail.png",
  "royal-mail-international": "/logos/rate-checker/carriers/royal-mail.png",
  dhl: "/logos/rate-checker/carriers/dhl.png",
  "dhl-parcel": "/logos/rate-checker/carriers/dhl-parcel.png",
  dpd: "/logos/rate-checker/carriers/dpd.png",
  fedex: "/logos/rate-checker/carriers/fedex.png",
  "fedex-domestic": "/logos/rate-checker/carriers/fedex.png",
  ups: "/logos/rate-checker/carriers/ups.png",
  // apc.jpg never existed — both keys use the on-disk apc-domestic.png.
  apc: "/logos/rate-checker/carriers/apc-domestic.png",
  "apc-domestic": "/logos/rate-checker/carriers/apc-domestic.png",
  dx: "/logos/rate-checker/carriers/dx.png",
  "parcel-force": "/logos/rate-checker/carriers/parcel-force.png",
  "parcel-force-domestic": "/logos/rate-checker/carriers/parcel-force-domestic.png",
  landmark: "/logos/rate-checker/carriers/landmark.png",
  "spring-global": "/logos/rate-checker/carriers/spring-global.png",
  starlinks: "/logos/rate-checker/carriers/starlinks.png",
};
