"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Connexx "intelligence" feature animation, ported from the Claude Design
 * motion prototype (Intelligence-v2.dc.html / scenes-v2.jsx). A 1200×750
 * time-driven scene that loops seamlessly: the dashboard composes, data
 * populates, an exceptions banner expands into a triage flow, parcels are
 * resolved, and the KPIs settle before it loops.
 *
 * Kept framer-motion-free per repo rules — every value is computed from a
 * single `progress` (0→1) via a rAF loop, and the whole 1200×750 stage is
 * CSS-scaled to fit its container. Honours prefers-reduced-motion (freezes on
 * a composed frame) and pauses when scrolled out of view.
 *
 * Carrier tiles reuse the site's existing square brand logos.
 */

// ---- easing / helpers -------------------------------------------------------
function bez(x1: number, y1: number, x2: number, y2: number) {
  const A = (a: number, b: number) => 1 - 3 * b + 3 * a;
  const B = (a: number, b: number) => 3 * b - 6 * a;
  const K = (a: number) => 3 * a;
  const calc = (t: number, a: number, b: number) =>
    ((A(a, b) * t + B(a, b)) * t + K(a)) * t;
  const slope = (t: number, a: number, b: number) =>
    3 * A(a, b) * t * t + 2 * B(a, b) * t + K(a);
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
const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const ENT = bez(0.16, 1, 0.3, 1);
const ST = bez(0.4, 0, 0.2, 1);
const sg = (T: number, a: number, b: number, e?: (x: number) => number) =>
  (e || ENT)(clamp((T - a) / (b - a), 0, 1));
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
const fmt = (n: number) => Math.round(n).toLocaleString("en-GB");

// ---- palette / type ---------------------------------------------------------
const INK = "#262626",
  INK2 = "#55554f",
  INK3 = "#8b8b84",
  INK4 = "#b8b8b1";
const IVORY = "#f3f2ec",
  SUNKEN = "#eceae2",
  BORD = "rgba(38,38,38,0.1)";
const YEL = "#ffe500",
  WARN = "#dd9500",
  WARNT = "#fbf1d8",
  SUCC = "#1a9e5c",
  SUCCT = "#e4f4ea";
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

// Carrier tiles — reuse the site's existing square brand logos.
const TILE: Record<string, string> = {
  evri: "/logos/carriers/evri_logo.png",
  dpd: "/logos/carriers/dpd-tile.png",
  "royal-mail": "/logos/carriers/royal-mail-icon.png",
  ups: "/logos/carriers/ups_logo.png",
};

// ---- data -------------------------------------------------------------------
const DAYS = [
  34, 41, 28, 36, 52, 44, 31, 26, 38, 47, 55, 42, 36, 49, 58, 61, 44, 52, 112,
  68, 41, 35, 46, 57, 49, 38, 44, 61, 53, 41,
];
const PEAK_I = 18,
  MAXV = 112,
  BARH = 200;
const XLAB: [number, string][] = [
  [0, "21 Jun"],
  [10, "1 Jul"],
  [19, "10 Jul"],
  [29, "20 Jul"],
];
const SVCS = [
  { svc: "mainland 48", car: "Evri", n: 568, tile: "evri" },
  { svc: "next day", car: "DPD", n: 384, tile: "dpd" },
  { svc: "tracked 24", car: "Royal Mail", n: 312, tile: "royal-mail" },
  { svc: "standard", car: "UPS", n: 155, tile: "ups" },
];
const QUEUE = [
  { n: 4, t: "you can fix", d: "missing info you can supply: address, customs docs, ID" },
  { n: 3, t: "contact customer", d: "refused, moved, on holiday, not collected" },
  { n: 2, t: "carrier to chase", d: "misrouted, damaged, delayed — raise with the carrier" },
  { n: 2, t: "needs classification", d: "reported, reason not yet provided by the carrier" },
];
const REASONS: Record<string, { t: string; done: string; bg: string; dot: string }> = {
  fix: { t: "you can fix", done: "fixed", bg: "#fce9e7", dot: "#DD4237" },
  buyer: { t: "contact customer", done: "customer contacted", bg: "#e8eefb", dot: "#4472c8" },
  chase: { t: "carrier to chase", done: "raised with DPD", bg: WARNT, dot: WARN },
  class: { t: "needs classification", done: "classified", bg: SUNKEN, dot: INK3 },
};
const PARCELS = [
  { bc: "JJD0002232154769747", reason: "chase", car: "DPD", lab: "16 Jul", stuck: "4d", dest: "Stanford-le-Hope, GB" },
  { bc: "JJD0002232154770890", reason: "chase", car: "DPD", lab: "17 Jul", stuck: "3d", dest: "London, GB" },
  { bc: "H0092837465012", reason: "fix", car: "Evri", lab: "17 Jul", stuck: "3d", dest: "Manchester, GB" },
  { bc: "RM998273645GB", reason: "class", car: "Royal Mail", lab: "17 Jul", stuck: "3d", dest: "Leeds, GB" },
  { bc: "H0092837465554", reason: "buyer", car: "Evri", lab: "18 Jul", stuck: "2d", dest: "Bristol, GB" },
  { bc: "1Z999AA10123456784", reason: "fix", car: "UPS", lab: "18 Jul", stuck: "2d", dest: "Glasgow, GB" },
  { bc: "RM998273701GB", reason: "fix", car: "Royal Mail", lab: "18 Jul", stuck: "2d", dest: "Cardiff, GB" },
  { bc: "H0092837466102", reason: "buyer", car: "Evri", lab: "19 Jul", stuck: "1d", dest: "Birmingham, GB" },
  { bc: "JD0002232155001", reason: "class", car: "DPD", lab: "19 Jul", stuck: "1d", dest: "Norwich, GB" },
  { bc: "1Z999AA10123460021", reason: "buyer", car: "UPS", lab: "19 Jul", stuck: "1d", dest: "Sheffield, GB" },
  { bc: "H0092837466482", reason: "fix", car: "Evri", lab: "20 Jul", stuck: "0d", dest: "Brighton, GB" },
];

// ---- sub-components ----------------------------------------------------------
function Kpi({ i, T, label, value, ring = 0 }: { i: number; T: number; label: string; value: string; ring?: number }) {
  const starts = [0.9, 1.04, 1.19, 1.31];
  const p = sg(T, starts[i], starts[i] + 0.5);
  return (
    <div style={{ position: "relative", flex: 1, background: IVORY, border: "1px solid " + BORD, borderRadius: 12, padding: "14px 18px", opacity: p, transform: "translateY(" + (1 - p) * 10 + "px)" }}>
      {ring > 0 && (
        <div style={{ position: "absolute", inset: -2, borderRadius: 13, border: "2.5px solid " + YEL, opacity: ring * 0.95, transform: "scale(" + (1 + 0.04 * (1 - ring)) + ")", pointerEvents: "none" }} />
      )}
      <div style={EYE}>{label}</div>
      <div style={{ fontFamily: DISP, fontSize: 42, fontWeight: 500, color: INK, lineHeight: 1.08, marginTop: 4, letterSpacing: -0.6, fontVariantNumeric: "tabular-nums" }}>{value}</div>
    </div>
  );
}

function ReasonChip({ reason, morph = 0, tick = 0 }: { reason: string; morph?: number; tick?: number }) {
  const r = REASONS[reason];
  const chip: CSSProperties = { fontFamily: BODY, borderRadius: 999, padding: "3px 9px", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 6, color: INK };
  return (
    <div style={{ position: "relative", height: 22 }}>
      <div style={{ ...chip, position: "absolute", left: 0, top: 0, background: r.bg, opacity: 1 - morph }}>
        <span style={{ width: 6, height: 6, borderRadius: 3, background: r.dot, flex: "none" }} />
        {r.t}
      </div>
      {morph > 0 && (
        <div style={{ ...chip, position: "absolute", left: 0, top: 0, background: SUCCT, opacity: morph }}>
          <svg width="11" height="11" viewBox="0 0 14 14" style={{ flex: "none" }}>
            <path d="M2.5 7.5l3 3 6-6.5" fill="none" stroke={SUCC} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="14" strokeDashoffset={14 * (1 - tick)} />
          </svg>
          {r.done}
        </div>
      )}
    </div>
  );
}

// ---- the scene (T ∈ [0,12]) --------------------------------------------------
function IntelligenceScene({ T }: { T: number }) {
  const out = 1 - sg(T, 11.5, 11.95, ST);

  // Act 1 — compose + populate
  const chipIn = sg(T, 0.35, 0.72);
  const chartIn = sg(T, 0.35, 0.78),
    svcIn = sg(T, 0.45, 0.88),
    stripIn = sg(T, 0.55, 0.98);
  const ship = fmt(1419 * sg(T, 1.0, 1.6, ST));
  const dv = lerp(0, 96.4, sg(T, 1.15, 1.75, ST)) + 3.6 * sg(T, 10.55, 10.9, ST);
  const delivered = dv >= 99.95 ? "100%" : dv.toFixed(1) + "%";
  const transit = fmt(Math.max(0, 87 * sg(T, 1.3, 1.85, ST) - 87 * sg(T, 10.6, 10.95, ST)));
  const exc = Math.round(11 * sg(T, 1.45, 1.9, ST)) - Math.round(11 * sg(T, 10.5, 10.85, ST));
  const ring = sg(T, 10.55, 10.68) * (1 - sg(T, 10.68, 11.15, ST));
  const tagIn = sg(T, 3.4, 3.72);

  // Act 2 — exceptions banner
  const aIn = sg(T, 5.35, 5.7);
  const expand = sg(T, 5.9, 6.6, ST) - sg(T, 9.85, 10.45, ST);
  const ovH = 76 + (642 - 76) * expand;
  const flowIn = sg(T, 6.45, 6.75) * (1 - sg(T, 9.5, 9.8, ST));
  const resolved = sg(T, 8.3, 9.45, ST);
  const resolvedText = sg(T, 9.5, 9.8, ST);
  const dotPulse = 0.55 + 0.45 * Math.pow(Math.sin(T * 4.2), 2);
  const pillR = sg(T, 10.45, 10.75);
  const tickR = sg(T, 10.5, 10.8, ST);

  const card: CSSProperties = { background: "#fff", border: "1px solid " + BORD, borderRadius: 14, padding: "20px 22px" };

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: BODY, background: "transparent", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 24, top: 24, width: 1152, height: 702, background: "#fff", border: "1px solid " + BORD, borderRadius: 20, boxShadow: "0 4px 8px rgba(38,38,38,0.04), 0 24px 56px rgba(38,38,38,0.1)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: "30px 30px 30px 30px", display: "flex", flexDirection: "column" }}>
          {/* header */}
          <div style={{ height: 56, display: "flex", alignItems: "center", gap: 14 }}>
            <svg width="26" height="27" viewBox="0 0 1292 1350" style={{ flex: "none" }}>
              <path d={PETALS} fill={INK} />
            </svg>
            <div style={{ fontFamily: DISP, fontSize: 30, fontWeight: 500, color: INK, letterSpacing: -0.3 }}>intelligence</div>
            <div style={{ background: SUNKEN, borderRadius: 999, padding: "5px 13px", fontSize: 12.5, fontWeight: 500, color: INK2, opacity: chipIn }}>last 30 days</div>
            <div style={{ flex: 1 }} />
          </div>

          {/* KPIs */}
          <div style={{ display: "flex", gap: 14, marginTop: 12, height: 96, opacity: out }}>
            <Kpi i={0} T={T} label="total shipments" value={ship} />
            <Kpi i={1} T={T} label="delivered" value={delivered} ring={ring} />
            <Kpi i={2} T={T} label="in transit" value={transit} />
            <Kpi i={3} T={T} label="open exceptions" value={String(exc)} />
          </div>

          {/* chart + services */}
          <div style={{ display: "flex", gap: 14, marginTop: 14, height: 374, opacity: out }}>
            <div style={{ ...card, width: 642, opacity: chartIn, transform: "translateY(" + (1 - chartIn) * 10 + "px)", display: "flex", flexDirection: "column" }}>
              <div style={{ ...EYE, height: 18 }}>labels per day</div>
              <div style={{ flex: 1, position: "relative", marginTop: 10 }}>
                {[40, 80].map((v) => (
                  <div key={v} style={{ position: "absolute", left: 0, right: 0, bottom: (v / MAXV) * BARH, borderTop: "1px dashed " + BORD }} />
                ))}
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, borderTop: "1px solid rgba(38,38,38,0.16)" }} />
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: BARH, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                  {DAYS.map((v, i) => {
                    const p = sg(T, 2.2 + i * 0.028, 2.62 + i * 0.028);
                    const peak = i === PEAK_I;
                    return <div key={i} style={{ width: 12, height: Math.max(0, (v / MAXV) * BARH * p), background: peak ? YEL : INK, borderRadius: "4px 4px 2px 2px" }} />;
                  })}
                </div>
                <div style={{ position: "absolute", left: PEAK_I * 20.2 + 6, bottom: BARH + 14, transform: "translateX(-50%) translateY(" + (1 - tagIn) * 6 + "px)", opacity: tagIn, background: INK, color: "#fff", borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>9 Jul · 112</div>
                <div style={{ position: "absolute", left: PEAK_I * 20.2 + 6, bottom: BARH + 3, width: 1.5, height: 9, background: INK4, opacity: tagIn }} />
              </div>
              <div style={{ position: "relative", height: 16, marginTop: 6 }}>
                {XLAB.map(([i, s]) => (
                  <div key={s} style={{ position: "absolute", left: i * 20.2 + 6, transform: "translateX(-50%)", fontSize: 11.5, color: INK3, whiteSpace: "nowrap" }}>{s}</div>
                ))}
              </div>
            </div>

            <div style={{ ...card, flex: 1, opacity: svcIn, transform: "translateY(" + (1 - svcIn) * 10 + "px)" }}>
              <div style={{ ...EYE, height: 18 }}>labels by service</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 14 }}>
                {SVCS.map((s, i) => {
                  const t0 = 3.8 + i * 0.13;
                  const p = sg(T, t0, t0 + 0.45);
                  const fill = sg(T, t0 + 0.1, t0 + 0.75);
                  const n = fmt(s.n * sg(T, t0 + 0.12, t0 + 0.5, ST));
                  return (
                    <div key={s.svc} style={{ opacity: p, transform: "translateY(" + (1 - p) * 8 + "px)" }}>
                      <div style={{ display: "flex", alignItems: "center", marginBottom: 7 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={TILE[s.tile]} alt="" style={{ width: 22, height: 22, borderRadius: 6, objectFit: "cover", marginRight: 9, flex: "none" }} />
                        <span style={{ fontSize: 14, fontWeight: 600, color: INK }}>{s.svc}</span>
                        <span style={{ fontSize: 12, color: INK3, marginLeft: 8 }}>{s.car}</span>
                        <span style={{ flex: 1 }} />
                        <span style={{ fontFamily: DISP, fontSize: 19, fontWeight: 500, color: INK, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{n}</span>
                      </div>
                      <div style={{ height: 6, borderRadius: 3, background: SUNKEN }}>
                        <div style={{ height: 6, borderRadius: 3, background: INK, width: (s.n / 568) * 100 * fill + "%" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={{ height: 76, marginTop: 14 }} />

          {/* exceptions banner (expands into triage flow) */}
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: ovH, background: IVORY, border: "1px solid " + BORD, borderRadius: 14, overflow: "hidden", opacity: stripIn * out, transform: "translateY(" + (1 - stripIn) * 10 + "px)" }}>
            <div style={{ height: 76, display: "flex", alignItems: "center", gap: 14, padding: "0 22px" }}>
              <div style={{ ...EYE, width: 100, flex: "none" }}>exceptions</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, opacity: aIn, transform: "translateY(" + (1 - aIn) * 6 + "px)" }}>
                <div style={{ position: "relative", width: 9, height: 9, flex: "none" }}>
                  <div style={{ position: "absolute", inset: 0, borderRadius: 5, background: WARN, opacity: (0.4 + 0.6 * dotPulse) * (1 - resolved) }} />
                  <div style={{ position: "absolute", inset: 0, borderRadius: 5, background: SUCC, opacity: resolved }} />
                </div>
                <div style={{ position: "relative", height: 20, minWidth: 150 }}>
                  <div style={{ position: "absolute", left: 0, top: 0, fontSize: 15, fontWeight: 600, color: INK, whiteSpace: "nowrap", opacity: 1 - resolvedText }}>11 open exceptions</div>
                  <div style={{ position: "absolute", left: 0, top: 0, fontSize: 15, fontWeight: 600, color: INK, whiteSpace: "nowrap", opacity: resolvedText }}>0 open exceptions</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, opacity: 1 - resolvedText }}>
                  {["evri", "dpd", "royal-mail", "ups"].map((c) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={c} src={TILE[c]} alt="" style={{ width: 16, height: 16, borderRadius: 4, objectFit: "cover" }} />
                  ))}
                </div>
              </div>
              <div style={{ flex: 1 }} />
              <div style={{ fontFamily: BODY, borderRadius: 999, padding: "7px 15px", fontSize: 12.5, fontWeight: 600, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 8, color: INK, background: SUCCT, opacity: pillR, transform: "scale(" + (0.95 + 0.05 * pillR) + ")", transformOrigin: "right center" }}>
                <svg width="13" height="13" viewBox="0 0 14 14" style={{ flex: "none" }}>
                  <path d="M2.5 7.5l3 3 6-6.5" fill="none" stroke={SUCC} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="14" strokeDashoffset={14 * (1 - tickR)} />
                </svg>
                11 resolved
              </div>
            </div>

            {expand > 0.03 && (
              <div style={{ padding: "0 22px 20px", opacity: flowIn }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                  {QUEUE.map((q, i) => {
                    const p = sg(T, 6.55 + i * 0.12, 6.97 + i * 0.12);
                    const flip = resolved;
                    return (
                      <div key={q.t} style={{ background: "#fff", border: "1px solid " + BORD, borderRadius: 12, padding: "10px 14px", opacity: p, transform: "translateY(" + (1 - p) * 8 + "px)" }}>
                        <div style={{ position: "relative", height: 26 }}>
                          <div style={{ position: "absolute", fontFamily: DISP, fontSize: 22, fontWeight: 500, color: q.n ? INK : INK4, opacity: 1 - flip }}>{q.n}</div>
                          <div style={{ position: "absolute", fontFamily: DISP, fontSize: 22, fontWeight: 500, color: INK4, opacity: flip }}>0</div>
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: INK, marginBottom: 2 }}>{q.t}</div>
                        <div style={{ fontSize: 10.5, lineHeight: 1.35, color: INK3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: 28 }}>{q.d}</div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ background: "#fff", border: "1px solid " + BORD, borderRadius: 12, padding: "14px 18px 10px", marginTop: 12, opacity: sg(T, 7.15, 7.5), transform: "translateY(" + (1 - sg(T, 7.15, 7.5)) * 8 + "px)" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: INK }}>parcels needing attention</div>
                    <div style={{ fontSize: 11.5, color: INK3 }}>longest-stuck first</div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "215px 185px 92px 70px 50px 1fr", gap: 12, padding: "4px 0", borderBottom: "1px solid " + BORD }}>
                    {["barcode", "reason", "carrier", "labelled", "stuck", "destination"].map((h) => (
                      <div key={h} style={{ ...EYE, fontSize: 10 }}>{h}</div>
                    ))}
                  </div>
                  {PARCELS.map((r, i) => {
                    const p = sg(T, 7.5 + i * 0.07, 7.9 + i * 0.07);
                    const morph = sg(T, 8.3 + i * 0.08, 8.6 + i * 0.08, ST);
                    const tick = sg(T, 8.4 + i * 0.08, 8.7 + i * 0.08, ST);
                    return (
                      <div key={r.bc} style={{ display: "grid", gridTemplateColumns: "215px 185px 92px 70px 50px 1fr", gap: 12, alignItems: "center", height: 30, borderBottom: i < PARCELS.length - 1 ? "1px solid rgba(38,38,38,0.06)" : "none", opacity: p, transform: "translateY(" + (1 - p) * 5 + "px)" }}>
                        <div style={{ fontSize: 12, color: INK, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.bc}</div>
                        <ReasonChip reason={r.reason} morph={morph} tick={tick} />
                        <div style={{ fontSize: 12, fontWeight: 600, color: INK, whiteSpace: "nowrap" }}>{r.car}</div>
                        <div style={{ fontSize: 12, color: INK2 }}>{r.lab}</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: INK }}>{r.stuck}</div>
                        <div style={{ fontSize: 12, color: INK2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.dest}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const DUR_MS = 14000; // real-time loop duration (OM_SCENES dur: 14)
const STATIC_T = 5.2; // composed-dashboard frame for reduced motion

export default function IntelligenceAnimation() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [T, setT] = useState(STATIC_T);

  // Scale the fixed 1200×750 stage to the container width.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / 1200));
    ro.observe(el);
    setScale(el.clientWidth / 1200);
    return () => ro.disconnect();
  }, []);

  // rAF progress loop — paused off-screen and under prefers-reduced-motion.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setT(STATIC_T);
      return;
    }
    let raf = 0;
    let start = 0;
    let visible = true;
    const tick = (now: number) => {
      if (!start) start = now;
      const progress = ((now - start) % DUR_MS) / DUR_MS;
      setT(progress * 12);
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        const nowVisible = e.isIntersecting;
        if (nowVisible && !visible) start = 0;
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
      aria-label="Connexx intelligence dashboard — animated preview"
      role="img"
      style={{ position: "relative", width: "100%", aspectRatio: "1200 / 750", overflow: "hidden", borderRadius: 16 }}
    >
      {scale > 0 && (
        <div style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 750, transformOrigin: "top left", transform: "scale(" + scale + ")" }}>
          <IntelligenceScene T={T} />
        </div>
      )}
    </div>
  );
}
