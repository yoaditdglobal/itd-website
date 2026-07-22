"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Connexx "tracking" feature animation, ported from the Claude Design motion
 * prototype (Tracking.dc.html / scenes-tracking.jsx). A 1200×750 time-driven
 * scene that loops: a label-records table whose statuses flip live in the rows
 * (normalised across carriers), beside a tracking timeline for the selected
 * parcel that draws down as events land — raw carrier lines under each
 * normalised status.
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

// ---- palette / type ---------------------------------------------------------
const INK = "#262626",
  INK2 = "#55554f",
  INK3 = "#8b8b84",
  INK4 = "#b8b8b1";
const IVORY = "#f3f2ec",
  SUNKEN = "#eceae2",
  BORD = "rgba(38,38,38,0.1)";
const SUCC = "#1a9e5c",
  SUCCT = "#e4f4ea";
const DANG = "#DD4237",
  DANGT = "#fce9e7",
  INFO = "#4472c8",
  INFOT = "#e8eefb";
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
};

const PILLS: Record<string, { dot: string; bg: string }> = {
  "in transit": { dot: INFO, bg: INFOT },
  "out for delivery": { dot: INK, bg: SUNKEN },
  collected: { dot: INK3, bg: SUNKEN },
  delivered: { dot: SUCC, bg: SUCCT },
  exception: { dot: DANG, bg: DANGT },
};

function Pill({ label, o, tick }: { label: string; o: number; tick?: number }) {
  const s = PILLS[label];
  return (
    <span
      style={{
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        background: s.bg,
        borderRadius: 999,
        padding: "5px 12px 5px 10px",
        fontSize: 11.5,
        fontWeight: 600,
        color: INK,
        whiteSpace: "nowrap",
        opacity: o,
      }}
    >
      {tick !== undefined ? (
        <svg width="12" height="12" viewBox="0 0 14 14" style={{ flex: "none" }}>
          <path d="M2.5 7.5l3 3 6-6.5" fill="none" stroke={SUCC} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="14" strokeDashoffset={14 * (1 - tick)} />
        </svg>
      ) : (
        <span style={{ width: 7, height: 7, borderRadius: 4, background: s.dot, flex: "none" }} />
      )}
      {label}
    </span>
  );
}

const ROWS = [
  { tk: "15502370099817", dest: "Manchester M50", car: "DPD", tile: "dpd", sel: false },
  { tk: "JJD0002232154769747", dest: "London N1", car: "Evri", tile: "evri", sel: false },
  { tk: "TT204885730GB", dest: "Bristol BS1", car: "Royal Mail", tile: "royal-mail", sel: true },
  { tk: "794644790132", dest: "Birmingham B4", car: "FedEx", tile: "fedex", sel: false },
  { tk: "623105023481039275", dest: "Sheffield S1", car: "InPost", tile: "inpost", sel: false },
  { tk: "JD0002234501987", dest: "Cardiff CF10", car: "DHL Parcel", tile: "dhl", sel: false },
  { tk: "1Z999AA10123456791", dest: "Leeds LS1", car: "UPS", tile: "ups", sel: false },
  { tk: "JJD0002232154771003", dest: "Norwich NR1", car: "Evri", tile: "evri", sel: false },
  { tk: "15502370099859", dest: "Newcastle NE1", car: "DPD", tile: "dpd", sel: false },
];

const EVENTS = [
  { title: "collected", meta: "Swindon depot · 09:14", raw: '"Item received at delivery office"' },
  { title: "in transit", meta: "Bristol Mail Centre · 12:47", raw: '"Item leaving mail centre"' },
  { title: "out for delivery", meta: "Bristol BS1 · 14:05", raw: '"Onboard with driver"' },
  { title: "delivered", meta: "signed R. HUGHES · 16:02", raw: '"Delivered — POD signed"' },
];
const EV_Y = (i: number) => i * 82;

// ---- the scene (T ∈ [0,12]) --------------------------------------------------
function TrackingScene({ T }: { T: number }) {
  const out = 1 - sg(T, 11.5, 11.95, ST);
  const tableIn = sg(T, 0.3, 0.72),
    panelIn = sg(T, 0.45, 0.88);

  const m1 = sg(T, 1.8, 2.1, ST);
  const m4 = sg(T, 2.6, 2.9, ST);
  const m2a = sg(T, 3.55, 3.85, ST);
  const m0 = sg(T, 4.8, 5.1, ST);
  const stored3 = sg(T, 5.8, 6.15, ST);
  const m2b = sg(T, 7.45, 7.75, ST);
  const m5 = sg(T, 6.25, 6.55, ST);
  const tick5 = sg(T, 6.35, 6.7, ST);
  const m3 = sg(T, 8.35, 8.65, ST);
  const tick3 = sg(T, 8.45, 8.8, ST);
  const m8 = sg(T, 8.95, 9.25, ST);
  const tick8 = sg(T, 9.05, 9.4, ST);
  const tick2 = sg(T, 7.55, 7.9, ST);
  const livePulse = 0.55 + 0.45 * Math.pow(Math.sin(T * 3.6), 2);

  const e1 = sg(T, 0.9, 1.25),
    e2 = sg(T, 1.15, 1.5);
  const seg1 = sg(T, 1.05, 1.45, ST);
  const seg2 = sg(T, 3.15, 3.75, ST);
  const e3 = sg(T, 3.5, 3.85);
  const seg3 = sg(T, 6.9, 7.55, ST);
  const e4 = sg(T, 7.4, 7.75);
  const ring4 = sg(T, 7.5, 7.63) * (1 - sg(T, 7.63, 8.3, ST));

  const flash = (m: number, tint: string) =>
    m > 0 && m < 1 ? <div style={{ position: "absolute", inset: 0, borderRadius: 12, background: tint, opacity: 0.55 * Math.sin(m * Math.PI) }} /> : null;
  const card: CSSProperties = { background: "#fff", border: "1px solid " + BORD, borderRadius: 14 };

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: BODY, background: "transparent", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 24, top: 24, width: 1152, height: 702, background: "#fff", border: "1px solid " + BORD, borderRadius: 20, boxShadow: "0 4px 8px rgba(38,38,38,0.04), 0 24px 56px rgba(38,38,38,0.1)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: "30px 30px 30px 30px", display: "flex", flexDirection: "column" }}>
          {/* header */}
          <div style={{ height: 56, display: "flex", alignItems: "center", gap: 14 }}>
            <svg width="26" height="27" viewBox="0 0 1292 1350" style={{ flex: "none" }}>
              <path d={PETALS} fill={INK} />
            </svg>
            <div style={{ fontFamily: DISP, fontSize: 30, fontWeight: 500, color: INK, letterSpacing: -0.3 }}>tracking</div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, background: SUNKEN, borderRadius: 999, padding: "5px 13px" }}>
              <span style={{ width: 7, height: 7, borderRadius: 4, background: SUCC, opacity: 0.45 + 0.55 * livePulse }} />
              <span style={{ fontSize: 12.5, fontWeight: 500, color: INK2 }}>live</span>
            </div>
            <div style={{ flex: 1 }} />
          </div>

          <div style={{ display: "flex", gap: 14, marginTop: 12, flex: 1, opacity: out }}>
            {/* left — label records */}
            <div style={{ ...card, flex: 1, padding: "18px 20px", opacity: tableIn, transform: "translateY(" + (1 - tableIn) * 10 + "px)", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "grid", gridTemplateColumns: "178px 1fr 110px 150px", gap: 10, padding: "2px 0 7px", borderBottom: "1px solid " + BORD }}>
                {["tracking", "destination", "carrier", "status"].map((h) => (
                  <div key={h} style={{ ...EYE, fontSize: 10.5, textAlign: h === "status" ? "right" : "left" }}>{h}</div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                {ROWS.map((r, i) => {
                  const rowIn = sg(T, 0.5 + i * 0.08, 0.86 + i * 0.08);
                  return (
                    <div key={r.tk} style={{ position: "relative", display: "grid", gridTemplateColumns: "178px 1fr 110px 150px", gap: 10, alignItems: "center", height: 54, borderBottom: i < 8 ? "1px solid rgba(38,38,38,0.06)" : "none", background: r.sel ? IVORY : "transparent", borderRadius: r.sel ? 10 : 0, padding: r.sel ? "0 10px" : 0, margin: r.sel ? "0 -10px" : 0, opacity: rowIn, transform: "translateY(" + (1 - rowIn) * 7 + "px)" }}>
                      {i === 2 && flash(m2b, SUCCT)}
                      {i === 1 && flash(m0, DANGT)}
                      {i === 5 && flash(m5, SUCCT)}
                      {i === 3 && flash(m3, SUCCT)}
                      {i === 8 && flash(m8, SUCCT)}
                      <div style={{ fontSize: 12, color: INK, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.tk}</div>
                      <div style={{ position: "relative", height: 16 }}>
                        <div style={{ position: "absolute", left: 0, right: 0, fontSize: 12.5, color: INK2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", opacity: i === 3 ? 1 - stored3 * (1 - m3) : 1 }}>{r.dest}</div>
                        {i === 3 && <div style={{ position: "absolute", left: 0, right: 0, fontSize: 12, color: INK3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", opacity: stored3 * (1 - m3) }}>stored · 14:32</div>}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={TILE[r.tile]} alt="" style={{ width: 18, height: 18, borderRadius: 5, objectFit: "cover", flex: "none" }} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: INK, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.car}</span>
                      </div>
                      <div style={{ position: "relative", height: 30 }}>
                        {i === 0 && <><Pill label="in transit" o={1 - m1} /><Pill label="out for delivery" o={m1} /></>}
                        {i === 1 && <><Pill label="in transit" o={1 - m0} /><Pill label="exception" o={m0} /></>}
                        {i === 2 && <><Pill label="in transit" o={1 - Math.max(m2a, m2b)} /><Pill label="out for delivery" o={m2a * (1 - m2b)} /><Pill label="delivered" o={m2b} tick={tick2} /></>}
                        {i === 3 && <><Pill label="in transit" o={1 - m3} /><Pill label="delivered" o={m3} tick={tick3} /></>}
                        {i === 4 && <><Pill label="collected" o={1 - m4} /><Pill label="in transit" o={m4} /></>}
                        {i === 5 && <><Pill label="in transit" o={1 - m5} /><Pill label="delivered" o={m5} tick={tick5} /></>}
                        {i === 6 && <Pill label="delivered" o={1} tick={1} />}
                        {i === 7 && <Pill label="out for delivery" o={1} />}
                        {i === 8 && <><Pill label="in transit" o={1 - m8} /><Pill label="delivered" o={m8} tick={tick8} /></>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* right — tracking timeline for the selected parcel */}
            <div style={{ ...card, width: 442, flex: "none", padding: "18px 20px", opacity: panelIn, transform: "translateY(" + (1 - panelIn) * 10 + "px)", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={TILE["royal-mail"]} alt="" style={{ width: 26, height: 26, borderRadius: 7, objectFit: "cover", flex: "none" }} />
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: INK, fontVariantNumeric: "tabular-nums" }}>TT204885730GB</div>
                  <div style={{ fontSize: 11, color: INK3 }}>Bristol BS1 · Tracked 24</div>
                </div>
                <div style={{ flex: 1 }} />
                <div style={{ position: "relative", width: 130, height: 30 }}>
                  <Pill label="in transit" o={1 - Math.max(m2a, m2b)} />
                  <Pill label="out for delivery" o={m2a * (1 - m2b)} />
                  <Pill label="delivered" o={m2b} tick={tick2} />
                </div>
              </div>
              <div style={{ borderTop: "1px solid " + BORD, margin: "14px 0 18px" }} />

              <div style={{ position: "relative", flex: 1, marginLeft: 6 }}>
                <div style={{ position: "absolute", left: 7, top: 8, width: 2, height: EV_Y(3) + 4, background: SUNKEN }} />
                <div style={{ position: "absolute", left: 7, top: 8, width: 2, height: 82 * seg1 + 82 * seg2 + 82 * seg3, background: INK }} />

                {EVENTS.map((e, i) => {
                  const o = [e1, e2, e3, e4][i];
                  const last = i === 3;
                  return (
                    <div key={e.title} style={{ position: "absolute", left: 0, top: EV_Y(i), right: 0, opacity: o, transform: "translateY(" + (1 - o) * 6 + "px)" }}>
                      {last && ring4 > 0 && <div style={{ position: "absolute", left: 8 - 14 * (0.5 + ring4), top: 8 - 14 * (0.5 + ring4) + 7, width: 28 * (0.5 + ring4), height: 28 * (0.5 + ring4), borderRadius: "50%", border: "1.5px solid " + SUCC, opacity: 0.7 * (1 - ring4) }} />}
                      <div style={{ position: "absolute", left: 0, top: 7, width: 16, height: 16, borderRadius: 8, background: last ? SUCC : "#fff", border: "2px solid " + (last ? SUCC : INK), display: "flex", alignItems: "center", justifyContent: "center", transform: "scale(" + (0.6 + 0.4 * o) + ")" }}>
                        {last && (
                          <svg width="9" height="9" viewBox="0 0 14 14">
                            <path d="M2.5 7.5l3 3 6-6.5" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="14" strokeDashoffset={14 * (1 - tick2)} />
                          </svg>
                        )}
                      </div>
                      <div style={{ marginLeft: 32 }}>
                        <div style={{ fontSize: 13.5, fontWeight: last ? 700 : 600, color: INK }}>{e.title}</div>
                        <div style={{ fontSize: 11, color: INK2, marginTop: 2 }}>{e.meta}</div>
                        <div style={{ fontFamily: MONO, fontSize: 10, color: INK4, marginTop: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.raw}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DUR_MS = 14000;
const STATIC_T = 9.3; // journey-complete frame for reduced motion
const CARD_X = 24,
  CARD_Y = 24,
  CARD_W = 1152,
  CARD_H = 702;

export default function TrackingAnimation() {
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
      aria-label="Connexx integrated tracking — animated preview"
      role="img"
      style={{ position: "relative", width: "100%", aspectRatio: CARD_W + " / " + CARD_H, overflow: "hidden", borderRadius: 20 }}
    >
      {scale > 0 && (
        <div style={{ position: "absolute", top: -CARD_Y * scale, left: -CARD_X * scale, width: 1200, height: 750, transformOrigin: "top left", transform: "scale(" + scale + ")" }}>
          <TrackingScene T={T} />
        </div>
      )}
    </div>
  );
}
