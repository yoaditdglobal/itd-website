"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Connexx overview animation, ported from the Claude Design motion prototype
 * (Overview.dc.html / scenes-overview.jsx). The product story in four morphing
 * acts on one browser-card: (A) one shipment, every carrier compared, cheapest
 * picked, label created; (B) the same at volume — allocation across carriers;
 * (C) tracking with one normalised status set; (D) intelligence — the day's
 * numbers. A brand beat spins the mark on each act change.
 *
 * Framer-motion-free — computed from a single `progress` (0→1) via a rAF loop;
 * the 1200×750 stage is CSS-scaled to fit, cropped to the card. Honours
 * prefers-reduced-motion and pauses off-screen. Carrier tiles reuse the site's
 * existing square brand logos.
 */

// ---- easing / helpers -------------------------------------------------------
function bez(x1: number, y1: number, x2: number, y2: number) {
  const A = (a: number, b: number) => 1 - 3 * b + 3 * a;
  const B = (a: number, b: number) => 3 * b - 6 * a;
  const K = (a: number) => 3 * a;
  const calc = (t: number, a: number, b: number) => ((A(a, b) * t + B(a, b)) * t + K(a)) * t;
  const slope = (t: number, a: number, b: number) => 3 * A(a, b) * t * t + 2 * B(a, b) * t + K(a);
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 6; i++) {
      const s = slope(t, x1, x2);
      if (!s) break;
      t -= (calc(t, x1, x2) - x) / s;
    }
    return calc(t, y1, y2);
  };
}
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const ENT = bez(0.16, 1, 0.3, 1);
const ST = bez(0.4, 0, 0.2, 1);
const sg = (T: number, a: number, b: number, e?: (x: number) => number) =>
  (e || ENT)(clamp((T - a) / (b - a), 0, 1));
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
const fmt = (n: number) => Math.round(n).toLocaleString("en-GB");
const mix = (a: string, b: string, p: number) => {
  const h = (x: string) => [parseInt(x.slice(1, 3), 16), parseInt(x.slice(3, 5), 16), parseInt(x.slice(5, 7), 16)];
  const A = h(a),
    B = h(b);
  return "rgb(" + A.map((v, i) => Math.round(v + (B[i] - v) * p)).join(",") + ")";
};

// ---- palette / type ---------------------------------------------------------
const INK = "#262626",
  INK3 = "#8b8b84";
const INK2 = "#55554f";
const IVORY = "#f3f2ec",
  SUNKEN = "#eceae2",
  BORD = "rgba(38,38,38,0.1)";
const YEL = "#ffe500",
  SUCC = "#1a9e5c",
  SUCCT = "#e4f4ea",
  INFO = "#4472c8",
  INFOT = "#e8eefb";
const DISP = "'Cabinet Grotesk','Helvetica Neue',Arial,sans-serif";
const BODY = "'Inter','Helvetica Neue',Arial,sans-serif";
const EYE: CSSProperties = {
  fontFamily: BODY,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: 1.8,
  textTransform: "uppercase",
  color: INK3,
};
const PETALS =
  "M 643.25 672.13 C 621.28 1051.28 343.85 1341.38 0.5 1350 C 6 988.09 283.42 695.11 643.25 672.13 Z M 643.25 672.13 C 1005.83 695.11 1283.26 988.09 1291.5 1350 C 945.4 1341.38 665.23 1051.28 643.25 672.13 Z M 0.5 0 C 343.85 5.75 621.28 295.85 643.25 672.13 C 283.42 649.15 6 359.04 0.5 0 Z M 1291.5 0 C 1283.26 359.04 1005.83 649.15 643.25 672.13 C 665.23 295.85 945.4 5.75 1291.5 0 Z";

const TILE: Record<string, string> = {
  evri: "/logos/carriers/evri_logo.png",
  dpd: "/logos/carriers/dpd-tile.png",
  "royal-mail": "/logos/carriers/royal-mail-icon.png",
  ups: "/logos/carriers/ups_logo.png",
  inpost: "/logos/carriers/inpost-icon.png",
  dhl: "/logos/carriers/dhl_logo.webp",
  fedex: "/logos/carriers/fedex-icon.png",
};

// ---- data -------------------------------------------------------------------
const RATES = [
  { car: "Evri", tile: "evri", svc: "next day", price: 2.77, cheapest: true },
  { car: "InPost", tile: "inpost", svc: "locker", price: 2.95, cheapest: false },
  { car: "DPD", tile: "dpd", svc: "next day", price: 3.15, cheapest: false },
  { car: "Royal Mail", tile: "royal-mail", svc: "tracked 24", price: 3.42, cheapest: false },
  { car: "UPS", tile: "ups", svc: "standard", price: 4.6, cheapest: false },
];
const ALLOC = [
  { car: "Evri", tile: "evri", n: 214 },
  { car: "DPD", tile: "dpd", n: 156 },
  { car: "Royal Mail", tile: "royal-mail", n: 132 },
  { car: "UPS", tile: "ups", n: 87 },
];
const SVCBD = [
  { svc: "next day", tiles: ["evri", "dpd"], n: 258 },
  { svc: "tracked 24", tiles: ["royal-mail"], n: 143 },
  { svc: "locker", tiles: ["inpost"], n: 82 },
  { svc: "international", tiles: ["fedex", "dhl"], n: 54 },
];
const BARS = [38, 47, 55, 42, 36, 49, 58, 61, 44, 112, 68, 41, 46, 57];
const PEAK = 9;
const STEPS = [
  { t: "collected", m: "Swindon depot · 09:14" },
  { t: "out for delivery", m: "Bristol BS1 · 14:05" },
  { t: "delivered", m: "signed · 16:02" },
];

function Tick({ k, size = 15 }: { k: number; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={{ flex: "none", opacity: Math.min(1, k * 2.5) }}>
      <circle cx="8" cy="8" r="7" fill={SUCCT} />
      <path d="M4.5 8.5l2.5 2.5 4.8-5.5" fill="none" stroke={SUCC} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="12" strokeDashoffset={12 * (1 - k)} />
    </svg>
  );
}

// ---- the scene (T ∈ [0,12]) --------------------------------------------------
function OverviewScene({ T }: { T: number }) {
  const out = 1 - sg(T, 11.55, 11.97, ST);
  const st = (a: number, b: number) => sg(T, a, a + 0.4) * (1 - sg(T, b, b + 0.4, ST));
  const stY = (a: number, b: number) => (1 - sg(T, a, a + 0.4)) * 12 - sg(T, b, b + 0.4, ST) * 10;
  const A = st(0.5, 4.2),
    B = st(4.35, 6.8),
    C = st(6.95, 9.0),
    D = st(9.15, 12.5);

  const ring = sg(T, 3.0, 3.25, ST);
  const labelTick = sg(T, 3.5, 3.85, ST);
  const press = sg(T, 3.28, 3.4, ST) * (1 - sg(T, 3.42, 3.62, ST));
  const total = fmt(537 * sg(T, 4.6, 5.6, ST));
  const seg1 = sg(T, 7.25, 7.75, ST),
    seg2 = sg(T, 7.9, 8.4, ST);
  const stepIn = [sg(T, 7.1, 7.4), sg(T, 7.6, 7.95), sg(T, 8.25, 8.6)];
  const delTick = sg(T, 8.4, 8.75, ST);
  const pillState = sg(T, 8.35, 8.65, ST);
  const ship = fmt(1419 * sg(T, 9.4, 10.3, ST));
  const pct = lerp(0, 96.4, sg(T, 9.5, 10.4, ST)).toFixed(1) + "%";
  const tagIn = sg(T, 10.3, 10.6);
  let brandSpin = 0,
    brandGlow = 0;
  [4.35, 6.95, 9.15, 10.8].forEach((t) => {
    const sp = sg(T, t, t + 0.7, ST);
    brandSpin += sp;
    brandGlow = Math.max(brandGlow, Math.sin(Math.PI * sp));
  });
  const markRot = brandSpin * 90;
  const markFill = mix(INK, YEL, brandGlow);

  const state: CSSProperties = { position: "absolute", inset: "52px 28px 22px" };
  const pill = (bg: string, fg?: string): CSSProperties => ({ display: "inline-flex", alignItems: "center", gap: 7, background: bg, color: fg || INK, borderRadius: 999, padding: "5px 12px 5px 10px", fontSize: 11.5, fontWeight: 600, whiteSpace: "nowrap" });

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: BODY, background: "transparent", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 24, top: 24, width: 1152, height: 702, background: "#fff", border: "1px solid " + BORD, borderRadius: 20, boxShadow: "0 4px 8px rgba(38,38,38,0.04), 0 24px 56px rgba(38,38,38,0.1)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: "30px 30px 30px 30px" }}>
          <div style={{ height: 56, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <svg width="24" height="25" viewBox="0 0 1292 1350" style={{ flex: "none", transform: "rotate(" + markRot + "deg)", transformOrigin: "50% 50%" }}>
                <path d={PETALS} fill={markFill} />
              </svg>
              <div style={{ fontFamily: DISP, fontSize: 38, fontWeight: 400, color: INK, letterSpacing: -0.4 }}>connexx</div>
            </div>
            <div style={{ flex: 1 }} />
          </div>

          <div style={{ position: "absolute", left: 146, top: 92, width: 800, height: 470, background: "#fff", border: "1px solid " + BORD, borderRadius: 16, opacity: out, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 34, borderBottom: "1px solid " + BORD, display: "flex", alignItems: "center", gap: 7, padding: "0 16px" }}>
              <span style={{ width: 11, height: 11, borderRadius: 6, background: "#ff5f57" }} />
              <span style={{ width: 11, height: 11, borderRadius: 6, background: "#febc2e" }} />
              <span style={{ width: 11, height: 11, borderRadius: 6, background: "#28c840" }} />
            </div>

            {/* A — one shipment, every carrier compared */}
            {A > 0.01 && (
              <div style={{ ...state, opacity: A, transform: "translateY(" + stY(0.5, 4.2) + "px)" }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {["Manchester M50 → London N1", "2.4kg", "35×25×12cm"].map((c, i) => {
                    const p = sg(T, 0.6 + i * 0.12, 0.95 + i * 0.12);
                    return <div key={c} style={{ ...pill(SUNKEN, INK2), opacity: p, transform: "translateY(" + (1 - p) * 6 + "px)" }}>{c}</div>;
                  })}
                  <div style={{ flex: 1 }} />
                  <div style={{ background: mix("#ffe500", "#e9cf00", press), color: INK, borderRadius: 999, padding: "9px 20px", fontSize: 12.5, fontWeight: 600, opacity: sg(T, 0.9, 1.2), transform: "translateY(" + (1 - sg(T, 0.9, 1.2)) * 6 + "px) scale(" + (1 - 0.05 * press) + ")", boxShadow: press > 0.03 ? "inset 0 1px 3px rgba(38,38,38," + 0.18 * press + ")" : "none", whiteSpace: "nowrap" }}>create shipment</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
                  {RATES.map((r, i) => {
                    const p = sg(T, 1.0 + i * 0.12, 1.42 + i * 0.12);
                    const price = lerp(0, r.price, sg(T, 1.4 + i * 0.1, 2.2 + i * 0.1, ST));
                    const isC = r.cheapest;
                    return (
                      <div key={r.car} style={{ position: "relative", display: "flex", alignItems: "center", gap: 12, height: 56, background: IVORY, border: "1px solid " + BORD, borderRadius: 12, padding: "0 18px", opacity: p, transform: "translateY(" + (1 - p) * 8 + "px)" }}>
                        {isC && ring > 0 && <div style={{ position: "absolute", inset: -2, borderRadius: 13, border: "2.5px solid " + YEL, opacity: ring, pointerEvents: "none" }} />}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={TILE[r.tile]} alt="" style={{ width: 24, height: 24, borderRadius: 6, objectFit: "cover", flex: "none" }} />
                        <span style={{ fontSize: 14.5, fontWeight: 600, color: INK }}>{r.car}</span>
                        <span style={{ fontSize: 12.5, color: INK3 }}>{r.svc}</span>
                        <span style={{ flex: 1 }} />
                        <span style={{ fontFamily: DISP, fontSize: 21, fontWeight: 500, color: INK, fontVariantNumeric: "tabular-nums", width: 74, textAlign: "right" }}>£{price.toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 14, opacity: Math.min(1, labelTick * 2) }}>
                  <Tick k={labelTick} size={16} />
                  <span style={{ fontSize: 13.5, fontWeight: 600, color: INK }}>label created · Evri next day</span>
                </div>
              </div>
            )}

            {/* B — the same at volume */}
            {B > 0.01 && (
              <div style={{ ...state, opacity: B, transform: "translateY(" + stY(4.35, 6.8) + "px)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontFamily: DISP, fontSize: 34, fontWeight: 500, color: INK, fontVariantNumeric: "tabular-nums" }}>{total}</span>
                  <span style={{ background: SUNKEN, borderRadius: 999, padding: "4px 12px", fontSize: 11, fontWeight: 600, letterSpacing: 1.4, textTransform: "uppercase", color: INK2 }}>today</span>
                </div>
                <div style={{ display: "flex", gap: 32, marginTop: 22 }}>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ ...EYE, fontSize: 10.5 }}>by carrier</div>
                    {ALLOC.map((a, i) => {
                      const p = sg(T, 4.5 + i * 0.12, 4.9 + i * 0.12);
                      const fill = sg(T, 4.65 + i * 0.12, 5.55 + i * 0.12, ST);
                      const n = fmt(a.n * sg(T, 4.65 + i * 0.12, 5.4 + i * 0.12, ST));
                      return (
                        <div key={a.car} style={{ opacity: p, transform: "translateY(" + (1 - p) * 8 + "px)" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={TILE[a.tile]} alt="" style={{ width: 22, height: 22, borderRadius: 6, objectFit: "cover", flex: "none" }} />
                            <span style={{ fontSize: 14, fontWeight: 600, color: INK }}>{a.car}</span>
                            <span style={{ flex: 1 }} />
                            <span style={{ fontFamily: DISP, fontSize: 19, fontWeight: 500, color: INK, fontVariantNumeric: "tabular-nums" }}>{n}</span>
                          </div>
                          <div style={{ height: 7, borderRadius: 4, background: SUNKEN }}>
                            <div style={{ height: 7, borderRadius: 4, background: INK, width: (a.n / 214) * 100 * fill + "%" }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ ...EYE, fontSize: 10.5 }}>by service</div>
                    {SVCBD.map((sv, i) => {
                      const p = sg(T, 4.9 + i * 0.14, 5.3 + i * 0.14);
                      const fill = sg(T, 5.05 + i * 0.14, 5.95 + i * 0.14, ST);
                      const n = fmt(sv.n * sg(T, 5.05 + i * 0.14, 5.8 + i * 0.14, ST));
                      return (
                        <div key={sv.svc} style={{ opacity: p, transform: "translateY(" + (1 - p) * 8 + "px)" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
                            <div style={{ display: "flex", gap: 3 }}>
                              {sv.tiles.map((t) => (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img key={t} src={TILE[t]} alt="" style={{ width: 20, height: 20, borderRadius: 5, objectFit: "cover" }} />
                              ))}
                            </div>
                            <span style={{ fontSize: 14, fontWeight: 600, color: INK }}>{sv.svc}</span>
                            <span style={{ flex: 1 }} />
                            <span style={{ fontFamily: DISP, fontSize: 19, fontWeight: 500, color: INK, fontVariantNumeric: "tabular-nums" }}>{n}</span>
                          </div>
                          <div style={{ height: 7, borderRadius: 4, background: SUNKEN }}>
                            <div style={{ height: 7, borderRadius: 4, background: INK, width: (sv.n / 258) * 100 * fill + "%" }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* C — tracking, one status set */}
            {C > 0.01 && (
              <div style={{ ...state, opacity: C, transform: "translateY(" + stY(6.95, 9.0) + "px)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={TILE["royal-mail"]} alt="" style={{ width: 26, height: 26, borderRadius: 7, objectFit: "cover", flex: "none" }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: INK, fontVariantNumeric: "tabular-nums" }}>TT204885730GB</div>
                    <div style={{ fontSize: 11.5, color: INK3 }}>Bristol BS1 · tracked 24</div>
                  </div>
                  <div style={{ flex: 1 }} />
                  <div style={{ position: "relative", height: 28, width: 150 }}>
                    <div style={{ ...pill(SUNKEN, INK), position: "absolute", right: 0, opacity: 1 - pillState }}>
                      <span style={{ width: 7, height: 7, borderRadius: 4, background: INK, flex: "none" }} />out for delivery
                    </div>
                    <div style={{ ...pill(SUCCT, INK), position: "absolute", right: 0, opacity: pillState }}>
                      <svg width="12" height="12" viewBox="0 0 14 14" style={{ flex: "none" }}>
                        <path d="M2.5 7.5l3 3 6-6.5" fill="none" stroke={SUCC} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="14" strokeDashoffset={14 * (1 - delTick)} />
                      </svg>
                      delivered
                    </div>
                  </div>
                </div>
                <div style={{ position: "relative", marginTop: 52, padding: "0 30px" }}>
                  <div style={{ position: "absolute", left: 38, right: 38, top: 7, height: 2, background: SUNKEN }} />
                  <div style={{ position: "absolute", left: 38, top: 7, height: 2, width: "calc((100% - 76px) * " + (0.5 * seg1 + 0.5 * seg2) + ")", background: INK }} />
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    {STEPS.map((s, i) => {
                      const o = stepIn[i];
                      const last = i === 2;
                      return (
                        <div key={s.t} style={{ width: 150, textAlign: "center", opacity: o, transform: "translateY(" + (1 - o) * 6 + "px)" }}>
                          <div style={{ width: 16, height: 16, borderRadius: 8, margin: "0 auto", background: last ? SUCC : "#fff", border: "2px solid " + (last ? SUCC : INK), display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box" }}>
                            {last && (
                              <svg width="9" height="9" viewBox="0 0 14 14">
                                <path d="M2.5 7.5l3 3 6-6.5" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="14" strokeDashoffset={14 * (1 - delTick)} />
                              </svg>
                            )}
                          </div>
                          <div style={{ fontSize: 13, fontWeight: last ? 700 : 600, color: INK, marginTop: 10 }}>{s.t}</div>
                          <div style={{ fontSize: 11, color: INK3, marginTop: 2 }}>{s.m}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 44 }}>
                  {[
                    { tk: "JJD0002232154769747", tile: "evri", s: "in transit", dot: INFO, bg: INFOT },
                    { tk: "15502370099817", tile: "dpd", s: "out for delivery", dot: INK, bg: SUNKEN },
                    { tk: "JD0002234501987", tile: "dhl", s: "delivered", dot: SUCC, bg: SUCCT },
                  ].map((r, i) => {
                    const p = sg(T, 7.9 + i * 0.15, 8.25 + i * 0.15);
                    return (
                      <div key={r.tk} style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: IVORY, border: "1px solid " + BORD, borderRadius: 10, padding: "9px 11px", opacity: p, transform: "translateY(" + (1 - p) * 7 + "px)", minWidth: 0 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={TILE[r.tile]} alt="" style={{ width: 18, height: 18, borderRadius: 5, objectFit: "cover", flex: "none" }} />
                        <span style={{ fontSize: 11, color: INK, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.tk}</span>
                        <span style={{ flex: 1 }} />
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: r.bg, borderRadius: 999, padding: "3px 9px", fontSize: 10, fontWeight: 600, color: INK, whiteSpace: "nowrap", flex: "none" }}>
                          <span style={{ width: 5, height: 5, borderRadius: 3, background: r.dot, flex: "none" }} />
                          {r.s}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* D — intelligence */}
            {D > 0.01 && (
              <div style={{ ...state, opacity: D * out, transform: "translateY(" + stY(9.15, 12.5) + "px)" }}>
                <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>
                  <div>
                    <div style={EYE}>total shipments</div>
                    <div style={{ fontFamily: DISP, fontSize: 46, fontWeight: 500, color: INK, lineHeight: 1.05, marginTop: 6, fontVariantNumeric: "tabular-nums" }}>{ship}</div>
                  </div>
                  <div>
                    <div style={EYE}>delivered</div>
                    <div style={{ fontFamily: DISP, fontSize: 46, fontWeight: 500, color: INK, lineHeight: 1.05, marginTop: 6, fontVariantNumeric: "tabular-nums" }}>{pct}</div>
                  </div>
                  <div style={{ flex: 1 }} />
                  <div style={{ ...EYE, marginTop: 4 }}>last 30 days</div>
                </div>
                <div style={{ position: "relative", height: 250, marginTop: 40 }}>
                  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, borderTop: "1px solid rgba(38,38,38,0.14)" }} />
                  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 220, display: "flex", alignItems: "flex-end", gap: 14 }}>
                    {BARS.map((v, i) => {
                      const p = sg(T, 9.35 + i * 0.05, 9.8 + i * 0.05);
                      const peak = i === PEAK;
                      return (
                        <div key={i} style={{ flex: 1, position: "relative", display: "flex", alignItems: "flex-end", height: "100%" }}>
                          <div style={{ width: "100%", height: Math.max(3, (v / 112) * 200 * p), background: peak ? YEL : INK, borderRadius: "4px 4px 2px 2px" }} />
                          {peak && (
                            <div style={{ position: "absolute", bottom: (v / 112) * 200 + 10, left: "50%", transform: "translateX(-50%) translateY(" + (1 - tagIn) * 5 + "px)", opacity: tagIn, background: INK, color: "#fff", borderRadius: 7, padding: "3px 10px", fontSize: 11.5, fontWeight: 600, whiteSpace: "nowrap" }}>112</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const DUR_MS = 14000;
const STATIC_T = 3.9; // rate comparison resolved (cheapest ringed) for reduced motion
const CARD_X = 24,
  CARD_Y = 24,
  CARD_W = 1152,
  CARD_H = 702;

export default function OverviewAnimation() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [T, setT] = useState(STATIC_T);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / CARD_W));
    ro.observe(el);
    setScale(el.clientWidth / CARD_W);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setT(STATIC_T);
      return;
    }
    let raf = 0;
    let startTs = 0;
    let visible = true;
    const tick = (now: number) => {
      if (!startTs) startTs = now;
      const progress = ((now - startTs) % DUR_MS) / DUR_MS;
      setT(progress * 12);
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        const nowVisible = e.isIntersecting;
        if (nowVisible && !visible) startTs = 0;
        visible = nowVisible;
        if (nowVisible && !raf) raf = requestAnimationFrame(tick);
        if (!nowVisible && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-label="Connexx platform overview — animated preview"
      role="img"
      style={{ position: "relative", width: "100%", aspectRatio: CARD_W + " / " + CARD_H, overflow: "hidden", borderRadius: 20 }}
    >
      {scale > 0 && (
        <div style={{ position: "absolute", top: -CARD_Y * scale, left: -CARD_X * scale, width: 1200, height: 750, transformOrigin: "top left", transform: "scale(" + scale + ")" }}>
          <OverviewScene T={T} />
        </div>
      )}
    </div>
  );
}
