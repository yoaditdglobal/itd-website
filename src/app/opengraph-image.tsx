import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site-config";

// Default OG image for the entire site.
// Next 16 auto-discovers this and injects og:image / twitter:image meta tags.
// Per-page overrides: drop a route-segment opengraph-image.tsx (e.g.
// src/app/solutions/ecommerce/opengraph-image.tsx) to customise that page.

export const alt = `${SITE_NAME} — Multi-Carrier Shipping & Customs Automation`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const slug = SITE_URL.replace(/^https?:\/\//, "");
const accent = "hsl(182, 96%, 33%)";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0f1729",
          display: "flex",
          flexDirection: "column",
          padding: 80,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Top-left wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#fff",
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              background: accent,
              borderRadius: 2,
              transform: "rotate(45deg)",
            }}
          />
          {SITE_NAME}
        </div>

        {/* Mid-content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              color: "#fff",
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 960,
            }}
          >
            {SITE_TAGLINE}
          </div>
          <div
            style={{
              color: "rgba(255, 255, 255, 0.65)",
              fontSize: 26,
              lineHeight: 1.3,
              maxWidth: 880,
            }}
          >
            One platform across Royal Mail, DPD, Evri, DHL, FedEx, UPS, Amazon Shipping, and more.
          </div>
        </div>

        {/* Bottom row — accent line + URL slug */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 80,
                height: 4,
                background: accent,
                borderRadius: 2,
              }}
            />
            <span>{slug}</span>
          </div>
          <span style={{ fontSize: 18 }}>Multi-carrier shipping platform</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
