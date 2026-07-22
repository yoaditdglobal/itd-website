"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Connexx "connect" feature animation, ported from the Claude Design motion
 * prototype (Connect.dc.html / scenes-connect.jsx). A 1200×750 time-driven
 * order-flow map: stores/marketplaces (left) send orders along curved
 * connectors through the connexx node (import profiles → routing rules) to the
 * carriers (right, live allocation counters); one order flags for review, then
 * delivery status flows back to the stores.
 *
 * Framer-motion-free — computed from a single `progress` (0→1) via a rAF loop;
 * the 1200×750 stage is CSS-scaled to fit, cropped to the card. Honours
 * prefers-reduced-motion and pauses off-screen. Store + carrier icons reuse the
 * site's existing brand logos.
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
const fmt = (n: number) => Math.round(n).toLocaleString("en-GB");
const cub = (a: number, b: number, c: number, d: number, t: number) => {
  const u = 1 - t;
  return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
};
const mix = (a: string, b: string, p: number) => {
  const h = (x: string) => [parseInt(x.slice(1, 3), 16), parseInt(x.slice(3, 5), 16), parseInt(x.slice(5, 7), 16)];
  const A = h(a),
    B = h(b);
  return "rgb(" + A.map((v, i) => Math.round(v + (B[i] - v) * p)).join(",") + ")";
};

// ---- palette / type ---------------------------------------------------------
const INK = "#262626",
  INK2 = "#55554f",
  INK3 = "#8b8b84",
  INK4 = "#b8b8b1";
const SUNKEN = "#eceae2",
  BORD = "rgba(38,38,38,0.1)";
const YEL = "#ffe500",
  WARN = "#dd9500",
  WARNT = "#fbf1d8",
  SUCC = "#1a9e5c";
const DISP = "var(--font-display, 'Helvetica Neue'),'Helvetica Neue',Arial,sans-serif";
const BODY = "'Inter','Helvetica Neue',Arial,sans-serif";
const MONO = "'SF Mono','Cascadia Code',Menlo,Consolas,monospace";
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
  "amazon-shipping": "/logos/carriers/amazonshipping_logo.png",
  "deutsche-post": "/logos/carriers/deutschepost_logo.avif",
};

const NODE = { x: 520, y: 274, r: 46 };
const sCy = (i: number) => 50 + i * 62 + 27;
const cCy = (j: number) => 50 + j * 52 + 22;

const STORES = [
  { name: "Shopify", icon: "/logos/ecommerce/shopify-tile.png", hs: 1.0 },
  { name: "eBay", icon: "/logos/marketplaces/ebay-icon.png", hs: 1.15 },
  { name: "Temu", icon: "/logos/marketplaces/temu-icon.png", hs: 1.3 },
  { name: "Amazon", icon: "/logos/marketplaces/amazon-icon.webp", hs: 1.45 },
  { name: "TikTok Shop", icon: "/logos/marketplaces/tiktok-tile.png", hs: 1.6 },
  { name: "Magento", icon: "/logos/erp-wms/magento-icon.webp", hs: 1.75 },
  { name: "Linnworks", icon: "/logos/erp-wms/linnworks-tile.png", hs: 1.9 },
];
const CARRIERS = [
  { car: "Evri", tile: "evri", base: 214 },
  { car: "DPD", tile: "dpd", base: 156 },
  { car: "Royal Mail", tile: "royal-mail", base: 132 },
  { car: "InPost", tile: "inpost", base: 58 },
  { car: "FedEx", tile: "fedex", base: 41 },
  { car: "UPS", tile: "ups", base: 87 },
  { car: "Amazon Shipping", tile: "amazon-shipping", base: 64 },
  { car: "DHL", tile: "dhl", base: 52 },
  { car: "Deutsche Post", tile: "deutsche-post", base: 23 },
];
type Order = { s: number; c: number; in: [number, number]; out?: [number, number]; flag?: boolean };
const ORDERS: Order[] = [
  { s: 0, c: 0, in: [1.7, 2.4], out: [2.55, 3.2] },
  { s: 1, c: 1, in: [2.1, 2.8], out: [2.95, 3.6] },
  { s: 2, c: 2, in: [2.5, 3.2], out: [3.35, 4.0] },
  { s: 3, c: 0, in: [2.9, 3.6], out: [3.75, 4.4] },
  { s: 4, c: 3, in: [3.3, 4.0], out: [4.15, 4.8] },
  { s: 5, c: 4, in: [3.7, 4.4], out: [4.55, 5.2] },
  { s: 6, c: 1, in: [4.1, 4.8], out: [4.95, 5.6] },
  { s: 4, c: 4, in: [2.0, 2.7], out: [2.85, 3.5] },
  { s: 4, c: 5, in: [4.4, 5.0], out: [5.15, 5.75] },
  { s: 3, c: 6, in: [4.7, 5.3], out: [5.45, 6.05] },
  { s: 1, c: 2, in: [5.0, 5.6], out: [5.75, 6.35] },
  { s: 0, c: 3, in: [5.4, 6.0], out: [6.15, 6.75] },
  { s: 5, c: 8, in: [5.8, 6.4], out: [6.55, 7.15] },
  { s: 3, c: 7, in: [6.2, 6.8], out: [6.95, 7.55] },
  { s: 6, c: 0, in: [6.6, 7.2], out: [7.35, 7.95] },
  { s: 5, c: 2, in: [7.6, 8.2], out: [8.35, 8.95] },
  { s: 0, c: 5, in: [8.2, 8.8], out: [8.95, 9.55] },
  { s: 2, c: 6, in: [8.8, 9.4], out: [9.55, 10.15] },
  { s: 4, c: 1, in: [9.4, 10.0], out: [10.15, 10.75] },
  { s: 1, c: 8, in: [10.0, 10.6], out: [10.75, 11.35] },
  { s: 6, c: 4, in: [10.5, 11.1], out: [11.25, 11.9] },
  { s: 2, c: -1, in: [5.9, 6.6], flag: true },
];
const BACK = [
  { c: 0, s: 0, a: [7.9, 8.5], b: [8.6, 9.2] },
  { c: 1, s: 1, a: [8.15, 8.75], b: [8.85, 9.45] },
  { c: 2, s: 2, a: [8.4, 9.0], b: [9.1, 9.7] },
  { c: 0, s: 3, a: [8.65, 9.25], b: [9.35, 9.95] },
  { c: 3, s: 4, a: [8.9, 9.5], b: [9.6, 10.2] },
  { c: 4, s: 5, a: [9.15, 9.75], b: [9.85, 10.45] },
  { c: 1, s: 6, a: [9.4, 10.0], b: [10.1, 10.6] },
];
const MAPS = ["buyer.postcode → shipTo.postcode", "items[0].sku → parcel.contents", "order.weight → parcel.kg"];
const TRACKS = ["EVT 3021 → out for delivery", "POD signed → delivered", "scan 12 → in transit"];
const IN_ARR = [2.4, 2.7, 2.8, 3.2, 3.6, 4.0, 4.4, 4.8, 5.0, 5.3, 5.6, 6.0, 6.4, 6.6, 6.8, 7.2, 8.2, 8.8, 9.4, 10.0, 10.6, 11.1];

const storePt = (i: number): [number, number] => [250, sCy(i)];
const carrierPt = (j: number): [number, number] => [842, cCy(j)];
const inPath = (i: number, t: number): [number, number] => [cub(250, 370, 380, NODE.x - NODE.r - 2, t), cub(sCy(i), sCy(i), NODE.y, NODE.y, t)];
const outPath = (j: number, t: number): [number, number] => [cub(NODE.x + NODE.r + 2, 660, 700, 842, t), cub(NODE.y, NODE.y, cCy(j), cCy(j), t)];
const pathD = (p0: number[], c1: number[], c2: number[], p1: number[]) =>
  "M " + p0[0] + " " + p0[1] + " C " + c1[0] + " " + c1[1] + ", " + c2[0] + " " + c2[1] + ", " + p1[0] + " " + p1[1];

// ---- the scene (T ∈ [0,12]) --------------------------------------------------
function ConnectScene({ T }: { T: number }) {
  const out = 1 - sg(T, 11.5, 11.95, ST);
  const leftIn = sg(T, 0.3, 0.72),
    nodeIn = sg(T, 0.42, 0.84),
    rightIn = sg(T, 0.5, 0.92);
  const wiresIn = sg(T, 0.7, 1.15);

  const flagOn = sg(T, 6.55, 6.85, ST);
  let spinSum = 0,
    glow = 0;
  IN_ARR.forEach((t) => {
    const sp = sg(T, t - 0.05, t + 0.65, ST);
    spinSum += sp;
    glow = Math.max(glow, Math.sin(Math.PI * sp));
  });
  let backGlow = 0,
    backSpin = 0;
  BACK.forEach((b) => {
    const sp = sg(T, b.a[1] - 0.15, b.b[0] + 0.35, ST);
    backGlow = Math.max(backGlow, Math.sin(Math.PI * sp));
    backSpin += sp;
  });
  const markRot = spinSum * 90 - backSpin * 90;
  const markFill = mix(INK, YEL, glow);
  const nodeBg = mix("#ffffff", YEL, backGlow);
  const importFlash = IN_ARR.reduce((a, t) => Math.max(a, sg(T, t - 0.05, t + 0.1) * (1 - sg(T, t + 0.15, t + 0.55, ST))), 0);
  const fl = (ts: number[]) => ts.reduce((a, t) => Math.max(a, sg(T, t - 0.05, t + 0.1) * (1 - sg(T, t + 0.15, t + 0.55, ST))), 0);
  const skuFlash = fl(IN_ARR.filter((_, k) => k % 2 === 0));
  const ordFlash = fl(IN_ARR.filter((_, k) => k % 2 === 1));
  const oaFlash = fl([6.7, 7.3]);
  const routeFlash = ORDERS.filter((o) => o.out).reduce((a, o) => Math.max(a, sg(T, o.out![0] - 0.05, o.out![0] + 0.1) * (1 - sg(T, o.out![0] + 0.15, o.out![0] + 0.55, ST))), 0);

  let mapIdx = -1,
    mapO = 0;
  IN_ARR.forEach((t, k) => {
    const o = sg(T, t - 0.15, t + 0.05) * (1 - sg(T, t + 0.7, t + 1.0, ST));
    if (o > mapO) {
      mapO = o;
      mapIdx = k % 3;
    }
  });
  let trkIdx = -1,
    trkO = 0;
  BACK.forEach((b, k) => {
    const o = sg(T, b.a[1] - 0.2, b.a[1]) * (1 - sg(T, b.b[0] + 0.5, b.b[0] + 0.8, ST));
    if (o > trkO) {
      trkO = o;
      trkIdx = k % 3;
    }
  });

  const livePulse = 0.55 + 0.45 * Math.pow(Math.sin(T * 3.6), 2);

  const card: CSSProperties = { background: "#fff", border: "1px solid " + BORD, borderRadius: 12 };
  const chip = (flash: number, warn?: boolean): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: 7,
    justifyContent: "center",
    background: warn ? WARNT : "#fff",
    border: "1px solid " + (flash > 0.05 ? (warn ? WARN : INK) : BORD),
    borderRadius: 999,
    padding: "5px 13px",
    fontSize: 11.5,
    fontWeight: 600,
    color: warn ? WARN : INK,
    boxShadow: flash > 0.05 ? "0 0 0 " + 3 * flash + "px rgba(38,38,38,0.06)" : "none",
  });

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: BODY, background: "transparent", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 24, top: 24, width: 1152, height: 702, background: "#fff", border: "1px solid " + BORD, borderRadius: 20, boxShadow: "0 4px 8px rgba(38,38,38,0.04), 0 24px 56px rgba(38,38,38,0.1)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: "30px 30px 30px 30px" }}>
          <div style={{ height: 56, display: "flex", alignItems: "center", gap: 14 }}>
            <svg width="26" height="27" viewBox="0 0 1292 1350" style={{ flex: "none" }}>
              <path d={PETALS} fill={INK} />
            </svg>
            <div style={{ fontFamily: DISP, fontSize: 30, fontWeight: 500, color: INK, letterSpacing: -0.3 }}>store &amp; workflow</div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, background: SUNKEN, borderRadius: 999, padding: "5px 13px" }}>
              <span style={{ width: 7, height: 7, borderRadius: 4, background: SUCC, opacity: 0.45 + 0.55 * livePulse }} />
              <span style={{ fontSize: 12.5, fontWeight: 500, color: INK2 }}>live</span>
            </div>
          </div>

          <div style={{ position: "absolute", left: 0, right: 0, top: 68, height: 574, opacity: out }}>
            {/* connectors + travelling dots */}
            <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} width="1092" height="574">
              {STORES.map((s, i) => (
                <path key={"w1" + i} d={pathD(storePt(i), [370, sCy(i)], [380, NODE.y], [NODE.x - NODE.r - 2, NODE.y])} fill="none" stroke={INK} strokeOpacity={0.08 * wiresIn} strokeWidth="1.5" />
              ))}
              {CARRIERS.map((c, j) => (
                <path key={"w2" + j} d={pathD([NODE.x + NODE.r + 2, NODE.y], [660, NODE.y], [700, cCy(j)], carrierPt(j))} fill="none" stroke={INK} strokeOpacity={0.08 * wiresIn} strokeWidth="1.5" />
              ))}
              {ORDERS.map((o, k) => {
                const pin = sg(T, o.in[0], o.in[1], ST);
                if (pin > 0 && pin < 1) {
                  const [x, y] = inPath(o.s, pin);
                  return <circle key={"i" + k} cx={x} cy={y} r="5" fill={o.flag ? WARN : INK} opacity={Math.min(1, 6 * Math.min(pin, 1 - pin))} />;
                }
                if (o.out) {
                  const pout = sg(T, o.out[0], o.out[1], ST);
                  if (pout > 0 && pout < 1) {
                    const [x, y] = outPath(o.c, pout);
                    return <circle key={"o" + k} cx={x} cy={y} r="5" fill={INK} opacity={Math.min(1, 6 * Math.min(pout, 1 - pout))} />;
                  }
                }
                return null;
              })}
              {BACK.map((b, k) => {
                const pa = sg(T, b.a[0], b.a[1], ST);
                if (pa > 0 && pa < 1) {
                  const [x, y] = outPath(b.c, 1 - pa);
                  return <circle key={"ba" + k} cx={x} cy={y} r="4" fill={SUCC} opacity={Math.min(1, 6 * Math.min(pa, 1 - pa))} />;
                }
                const pb = sg(T, b.b[0], b.b[1], ST);
                if (pb > 0 && pb < 1) {
                  const [x, y] = inPath(b.s, 1 - pb);
                  return <circle key={"bb" + k} cx={x} cy={y} r="4" fill={SUCC} opacity={Math.min(1, 6 * Math.min(pb, 1 - pb))} />;
                }
                return null;
              })}
            </svg>

            {/* left — order sources */}
            <div style={{ position: "absolute", left: 0, top: 0, width: 250, opacity: leftIn, transform: "translateY(" + (1 - leftIn) * 10 + "px)" }}>
              {STORES.map((s, i) => {
                const p = sg(T, 0.4 + i * 0.08, 0.76 + i * 0.08);
                const hs = s.hs ? sg(T, s.hs, s.hs + 0.3, ST) : 0;
                const pushed = BACK.find((b) => b.s === i);
                const flip = pushed ? sg(T, pushed.b[1], pushed.b[1] + 0.3, ST) : 0;
                return (
                  <div key={s.name} style={{ ...card, position: "absolute", left: 0, right: 0, top: 50 + i * 62, height: 54, display: "flex", alignItems: "center", gap: 11, padding: "0 14px", opacity: p, transform: "translateY(" + (1 - p) * 8 + "px)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.icon} alt="" style={{ width: 24, height: 24, borderRadius: 6, objectFit: "cover", flex: "none" }} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: INK, whiteSpace: "nowrap" }}>{s.name}</div>
                      <div style={{ position: "relative", height: 14, marginTop: 1 }}>
                        <div style={{ position: "absolute", display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap", opacity: 1 - flip }}>
                          <span style={{ width: 6, height: 6, borderRadius: 3, background: SUCC, opacity: 0.3 + 0.7 * hs }} />
                          <span style={{ fontSize: 10.5, color: INK3, whiteSpace: "nowrap" }}>OAuth · connected</span>
                        </div>
                        <div style={{ position: "absolute", display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap", opacity: flip }}>
                          <span style={{ width: 6, height: 6, borderRadius: 3, background: SUCC }} />
                          <span style={{ fontSize: 10.5, color: SUCC, fontWeight: 600, whiteSpace: "nowrap" }}>status pushed back</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* centre — connexx node + import/routing chips */}
            <div style={{ position: "absolute", left: NODE.x - 110, top: NODE.y - 110, width: 220, opacity: nodeIn }}>
              <div style={{ position: "absolute", left: 110 - 46, top: 110 - 46, width: 92, height: 92, borderRadius: "50%", background: nodeBg, border: "1px solid " + BORD, boxShadow: "0 2px 4px rgba(38,38,38,0.04), 0 10px 28px rgba(38,38,38,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="36" height="37" viewBox="0 0 1292 1350" style={{ transform: "rotate(" + markRot + "deg)", transformOrigin: "50% 50%" }}>
                  <path d={PETALS} fill={markFill} />
                </svg>
              </div>
              {IN_ARR.map((t, k) => {
                const r = sg(T, t - 0.05, t + 0.55, ST);
                return r > 0 && r < 1 ? (
                  <div key={k} style={{ position: "absolute", left: 110 - 46 - r * 18, top: 110 - 46 - r * 18, width: 92 + r * 36, height: 92 + r * 36, borderRadius: "50%", border: "1.5px solid " + INK4, opacity: 0.55 * (1 - r) }} />
                ) : null;
              })}
              <div style={{ position: "absolute", top: 4, left: 0, width: 220, textAlign: "center", fontFamily: MONO, fontSize: 10, color: INK3, whiteSpace: "nowrap", opacity: Math.max(mapO, trkO) }}>
                {trkO > mapO ? (trkIdx >= 0 ? TRACKS[trkIdx] : "") : mapIdx >= 0 ? MAPS[mapIdx] : ""}
              </div>
              <div style={{ position: "absolute", top: 162, left: 25, width: 170, display: "flex", flexDirection: "column", gap: 5 }}>
                <div style={chip(importFlash)}>import profiles</div>
                <div style={chip(skuFlash)}>SKUs data</div>
                <div style={chip(ordFlash)}>orders</div>
                <div style={chip(routeFlash + flagOn * 0.4, flagOn > 0.5 && flagOn < 1.01 && T < 7.7)}>routing rules</div>
                <div style={chip(oaFlash, oaFlash > 0.4)}>out of area</div>
                <div style={{ ...chip(0, true), opacity: flagOn, transform: "translateY(" + (1 - flagOn) * 6 + "px)" }}>
                  <span style={{ width: 6, height: 6, borderRadius: 3, background: WARN, flex: "none" }} />
                  weight surcharge
                </div>
              </div>
            </div>

            {/* right — carrier allocation */}
            <div style={{ position: "absolute", left: 842, top: 0, width: 250, opacity: rightIn, transform: "translateY(" + (1 - rightIn) * 10 + "px)" }}>
              {CARRIERS.map((c, j) => {
                const p = sg(T, 0.5 + j * 0.09, 0.88 + j * 0.09);
                const extra = ORDERS.filter((o) => o.c === j && o.out).reduce((a, o) => a + (T >= o.out![1] ? 1 : 0), 0);
                const bump = ORDERS.filter((o) => o.c === j && o.out).reduce((a, o) => Math.max(a, sg(T, o.out![1], o.out![1] + 0.08) * (1 - sg(T, o.out![1] + 0.08, o.out![1] + 0.5, ST))), 0);
                return (
                  <div key={c.car} style={{ ...card, position: "absolute", left: 0, right: 0, top: 50 + j * 52, height: 44, display: "flex", alignItems: "center", gap: 9, padding: "0 12px", opacity: p, transform: "translateY(" + (1 - p) * 8 + "px)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={TILE[c.tile]} alt="" style={{ width: 18, height: 18, borderRadius: 5, objectFit: "cover", flex: "none" }} />
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: INK, whiteSpace: "nowrap" }}>{c.car}</span>
                    <span style={{ flex: 1 }} />
                    <span style={{ fontFamily: DISP, fontSize: 16, fontWeight: 500, color: INK, fontVariantNumeric: "tabular-nums", transform: "scale(" + (1 + 0.12 * bump) + ")", transformOrigin: "right center" }}>{fmt(c.base + extra)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DUR_MS = 14000;
const STATIC_T = 9.6; // routing complete + status flowing back, for reduced motion
const CARD_X = 24,
  CARD_Y = 24,
  CARD_W = 1152,
  CARD_H = 702;

export default function ConnectAnimation() {
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
      aria-label="Connexx store & workflow connectivity — animated preview"
      role="img"
      style={{ position: "relative", width: "100%", aspectRatio: CARD_W + " / " + CARD_H, overflow: "hidden", borderRadius: 20 }}
    >
      {scale > 0 && (
        <div style={{ position: "absolute", top: -CARD_Y * scale, left: -CARD_X * scale, width: 1200, height: 750, transformOrigin: "top left", transform: "scale(" + scale + ")" }}>
          <ConnectScene T={T} />
        </div>
      )}
    </div>
  );
}
