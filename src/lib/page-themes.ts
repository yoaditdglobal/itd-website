import { BRAND_COLORS } from "./brand-colors";

/**
 * Visual identity per page TYPE and CATEGORY.
 *
 * - `accent`: text/icon colour on LIGHT surfaces (≥4.5:1 on white).
 * - `glow`:   brighter tone for glows/dots on the DARK hero.
 * - `soft`:   tinted chip / icon-tile background on light surfaces.
 *
 * Category = the integration family (ERP/WMS cobalt, eCommerce & Logistics
 * teal, Marketplace amber), carrier region, or customer-story segment. Detail
 * pages additionally tint their hero with the partner's own BRAND colour
 * (`brandGlow`), so every page is recognisably itself.
 */
export interface Theme {
  label: string;
  accent: string;
  glow: string;
  soft: string;
}

const COBALT: Omit<Theme, "label"> = { accent: "#1d3fb8", glow: "#5b7bff", soft: "#eef1fd" };
const TEAL: Omit<Theme, "label"> = { accent: "#007a80", glow: "#1cc3cb", soft: "#e6f6f6" };
const AMBER: Omit<Theme, "label"> = { accent: "#b45309", glow: "#f5a524", soft: "#fdf4e4" };
const VIOLET: Omit<Theme, "label"> = { accent: "#6d28d9", glow: "#9b7bff", soft: "#f3effd" };

export const CATEGORY_THEMES: Record<string, Theme> = {
  erp_wms: { label: "ERP / WMS", ...COBALT },
  ecommerce_logistics: { label: "eCommerce & Logistics", ...TEAL },
  marketplace: { label: "Marketplace", ...AMBER },
};

/** Category page routes, for "more in this category" links. */
export const CATEGORY_HREFS: Record<string, string> = {
  erp_wms: "/integrations/erp-wms",
  ecommerce_logistics: "/integrations/ecommerce-logistics",
  marketplace: "/integrations/marketplaces",
};

export const REGION_THEMES: Record<string, Theme> = {
  Domestic: { label: "Domestic", ...TEAL },
  International: { label: "International", ...COBALT },
};

export const SEGMENT_THEMES: Record<string, Theme> = {
  eCommerce: { label: "eCommerce", ...TEAL },
  "3PL": { label: "3PL", ...COBALT },
  Import: { label: "Import", ...AMBER },
  Export: { label: "Export", ...VIOLET },
  Freight: { label: "Freight", ...VIOLET },
  B2B: { label: "B2B", ...COBALT },
  Marketplace: { label: "Marketplace", ...AMBER },
};

export const DEFAULT_THEME: Theme = { label: "", ...TEAL };

/** Theme for a tech category key OR a human label ("ERP / WMS Integration"). */
export function categoryTheme(keyOrLabel?: string): Theme {
  if (!keyOrLabel) return DEFAULT_THEME;
  if (CATEGORY_THEMES[keyOrLabel]) return CATEGORY_THEMES[keyOrLabel];
  const l = keyOrLabel.toLowerCase();
  if (l.includes("erp") || l.includes("wms")) return CATEGORY_THEMES.erp_wms;
  if (l.includes("marketplace")) return CATEGORY_THEMES.marketplace;
  if (l.includes("commerce") || l.includes("logistics")) return CATEGORY_THEMES.ecommerce_logistics;
  return DEFAULT_THEME;
}

function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

/**
 * The partner's brand colour for a DARK hero glow, or `fallback` when the logo
 * has no usable colour or the colour is too dark to read on navy.
 */
export function brandGlow(logo: string | undefined, fallback: string): string {
  const c = logo ? BRAND_COLORS[logo] : undefined;
  if (!c || luminance(c) < 0.06) return fallback;
  return c;
}

/** `#rrggbb` + alpha (0–1) → `#rrggbbaa`, for inline gradients. */
export function withAlpha(hex: string, a: number): string {
  return hex + Math.round(Math.max(0, Math.min(1, a)) * 255).toString(16).padStart(2, "0");
}
