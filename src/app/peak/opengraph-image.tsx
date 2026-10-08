import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_URL } from "@/lib/site-config";
import { PEAK } from "@/lib/peak-config";

// Per-route OG image for /peak (Next 16 file convention). Follows the root
// template (navy, wordmark, headline, accent, slug) with the report cover
// tilted on the right. Regenerated at build time whenever the config changes.

export const alt = `ITD Global Peak ${PEAK.edition} report — ${PEAK.hero.h1}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const slug = `${SITE_URL.replace(/^https?:\/\//, "")}/peak`;
const yellow = "#ffe500";
const teal = "#3a9ea5";

export default async function Image() {
  const coverBytes = await readFile(join(process.cwd(), "public", PEAK.coverImage));
  const cover = `data:image/png;base64,${coverBytes.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #15192b 0%, #10253a 70%, #0f3d4a 100%)",
          display: "flex",
          fontFamily: "Inter, system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 72,
            width: 680,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#fff",
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            <div style={{ width: 12, height: 12, background: teal, borderRadius: 2, transform: "rotate(45deg)" }} />
            ITD Global
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ color: yellow, fontSize: 20, fontWeight: 700, letterSpacing: "0.18em" }}>
              {PEAK.hero.eyebrow.toUpperCase()}
            </div>
            <div
              style={{
                color: "#fff",
                fontSize: 62,
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
              }}
            >
              {PEAK.hero.h1}
            </div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 24, lineHeight: 1.35 }}>
              Real parcel data across ITD&apos;s customers. Download the Peak {PEAK.edition} report.
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, color: "rgba(255,255,255,0.5)", fontSize: 20 }}>
            <div style={{ width: 80, height: 4, background: yellow, borderRadius: 2 }} />
            <span>{slug}</span>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: -40,
            top: 110,
            width: 560,
            height: 396,
            display: "flex",
            transform: "rotate(-6deg)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover} alt="" width={560} height={396} style={{ width: 560, height: 396 }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
