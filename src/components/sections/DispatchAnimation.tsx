"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Connexx "dispatch" feature animation, ported from the Claude Design motion
 * prototype (Dispatch.dc.html / scenes-dispatch.jsx). A 1200×750 time-driven
 * scene that loops: a one-click batch processes row-by-row (labels generated
 * against a progress ring), one parcel hits a carrier error and is fixed +
 * rebooked inline, and per-carrier manifests are sent.
 *
 * Framer-motion-free — every value is computed from a single `progress` (0→1)
 * via a rAF loop; the 1200×750 stage is CSS-scaled to fit, cropped to the
 * dashboard card. Honours prefers-reduced-motion and pauses off-screen.
 * Carrier tiles reuse the site's existing square brand logos.
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
  inpost: "/logos/carriers/inpost-icon.png",
  dhl: "/logos/carriers/dhl_logo.webp",
  fedex: "/logos/carriers/fedex-icon.png",
};

// ---- data -------------------------------------------------------------------
const PARCELS = [
  { bc: "JJD0002232154769747", dest: "London N1", car: "Evri", tile: "evri", done: 1.7, fail: false },
  { bc: "15502370099817", dest: "Manchester M50", car: "DPD", tile: "dpd", done: 2.0, fail: false },
  { bc: "TT204885730GB", dest: "Bristol BS1", car: "Royal Mail", tile: "royal-mail", done: 2.3, fail: false },
  { bc: "15502370099831", dest: "Stanford-le-Hope SS17", car: "DPD", tile: "dpd", done: 2.6, fail: true },
  { bc: "623105023481039275", dest: "Sheffield S1", car: "InPost", tile: "inpost", done: 2.9, fail: false },
  { bc: "JD0002234501987", dest: "Cardiff CF10", car: "DHL Parcel", tile: "dhl", done: 3.2, fail: false },
  { bc: "794644790132", dest: "Birmingham B4", car: "FedEx", tile: "fedex", done: 3.5, fail: false },
  { bc: "1Z999AA10123456791", dest: "Leeds LS1", car: "UPS", tile: "ups", done: 3.65, fail: false },
  { bc: "JJD0002232154770890", dest: "Glasgow G2", car: "Evri", tile: "evri", done: 3.8, fail: false },
];
const MANIFESTS = [
  { car: "Evri", tile: "evri", n: 148 },
  { car: "DPD", tile: "dpd", n: 112 },
  { car: "Royal Mail", tile: "royal-mail", n: 96 },
  { car: "InPost", tile: "inpost", n: 58 },
  { car: "DHL Parcel", tile: "dhl", n: 49 },
  { car: "UPS", tile: "ups", n: 43 },
  { car: "FedEx", tile: "fedex", n: 31 },
];

// ---- sub-components ----------------------------------------------------------
function Tick({ k, size = 15 }: { k: number; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={{ flex: "none", opacity: Math.min(1, k * 2.5) }}>
      <circle cx="8" cy="8" r="7" fill={SUCCT} />
      <path d="M4.5 8.5l2.5 2.5 4.8-5.5" fill="none" stroke={SUCC} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="12" strokeDashoffset={12 * (1 - k)} />
    </svg>
  );
}

function StatusChip({ T, p }: { T: number; p: (typeof PARCELS)[number] }) {
  const gen = sg(T, p.done, p.done + 0.35, ST);
  const fail = p.fail ? sg(T, 4.4, 4.6, ST) * (1 - sg(T, 6.3, 6.55, ST)) : 0;
  const reb = p.fail ? sg(T, 6.3, 6.55, ST) : 0;
  const tick = p.fail ? sg(T, 6.5, 6.85, ST) : sg(T, p.done + 0.15, p.done + 0.5, ST);
  const chip: CSSProperties = { position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", display: "inline-flex", alignItems: "center", gap: 6, borderRadius: 999, padding: "4px 11px", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" };
  const showGen = p.fail ? 0 : gen;
  return (
    <div style={{ position: "relative", width: 128, height: 24, flex: "none" }}>
      <div style={{ ...chip, background: SUNKEN, color: INK3, opacity: 1 - Math.max(showGen, fail, reb) }}>ready to print</div>
      {!p.fail && (
        <div style={{ ...chip, background: "#fff", border: "1px solid " + BORD, color: INK, opacity: showGen }}>
          <Tick k={tick} size={13} /> completed
        </div>
      )}
      {p.fail && (
        <>
          <div style={{ ...chip, background: WARNT, color: WARN, opacity: fail }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: WARN, flex: "none" }} />to fix
          </div>
          <div style={{ ...chip, background: SUCCT, color: INK, opacity: reb }}>
            <Tick k={tick} size={13} /> completed
          </div>
        </>
      )}
    </div>
  );
}

// ---- the scene (T ∈ [0,12]) --------------------------------------------------
function DispatchScene({ T }: { T: number }) {
  const out = 1 - sg(T, 11.5, 11.95, ST);
  const tableIn = sg(T, 0.3, 0.72),
    railIn = sg(T, 0.42, 0.84),
    manIn = sg(T, 0.54, 0.96);

  const labels = Math.round(536 * sg(T, 1.6, 4.3, ST)) + Math.round(sg(T, 6.5, 6.8, ST));
  const ringP = labels / 537;
  const doneFlip = sg(T, 7.0, 7.4, ST);
  const ringPulse = sg(T, 7.05, 7.2) * (1 - sg(T, 7.2, 7.8, ST));
  const tickDone = sg(T, 7.15, 7.55, ST);
  const dotPulse = 0.55 + 0.45 * Math.pow(Math.sin(T * 4.2), 2);

  const errH = 26 * (sg(T, 4.55, 4.85, ST) - sg(T, 6.6, 6.9, ST));
  const errFixSwap = sg(T, 5.9, 6.2, ST);

  const R = 62,
    C = 2 * Math.PI * R;
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
            <div style={{ fontFamily: DISP, fontSize: 30, fontWeight: 500, color: INK, letterSpacing: -0.3 }}>shipments</div>
            <div style={{ background: SUNKEN, borderRadius: 999, padding: "5px 13px", fontSize: 12.5, fontWeight: 500, color: INK2 }}>today</div>
            <div style={{ flex: 1 }} />
          </div>

          <div style={{ display: "flex", gap: 14, marginTop: 12, flex: 1, opacity: out }}>
            {/* parcels table */}
            <div style={{ ...card, flex: 1, padding: "18px 20px", opacity: tableIn, transform: "translateY(" + (1 - tableIn) * 10 + "px)", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <div style={{ flex: 1 }} />
                <div style={{ fontSize: 11.5, color: INK3 }}>one click · started 16:00</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "190px 1fr 118px 128px", gap: 10, padding: "10px 0 7px", borderBottom: "1px solid " + BORD }}>
                {["tracking", "destination", "carrier", "label"].map((h) => (
                  <div key={h} style={{ ...EYE, fontSize: 10.5, textAlign: h === "label" ? "right" : "left" }}>{h}</div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                {PARCELS.map((p, i) => {
                  const rowIn = sg(T, 0.55 + i * 0.09, 0.92 + i * 0.09);
                  return (
                    <div key={p.bc} style={{ borderBottom: i < 8 ? "1px solid rgba(38,38,38,0.06)" : "none", opacity: rowIn, transform: "translateY(" + (1 - rowIn) * 7 + "px)" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "190px 1fr 118px 128px", gap: 10, alignItems: "center", height: 46 }}>
                        <div style={{ fontSize: 12, color: INK, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.bc}</div>
                        <div style={{ fontSize: 12.5, color: INK2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.dest}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={TILE[p.tile]} alt="" style={{ width: 18, height: 18, borderRadius: 5, objectFit: "cover", flex: "none" }} />
                          <span style={{ fontSize: 12.5, fontWeight: 600, color: INK, whiteSpace: "nowrap" }}>{p.car}</span>
                        </div>
                        <StatusChip T={T} p={p} />
                      </div>
                      {p.fail && (
                        <div style={{ height: errH, overflow: "hidden", marginTop: errH > 1 ? -4 : 0 }}>
                          <div style={{ position: "relative", height: 22, marginBottom: 8 }}>
                            <div style={{ position: "absolute", display: "flex", alignItems: "center", gap: 7, opacity: 1 - errFixSwap }}>
                              <span style={{ width: 7, height: 7, borderRadius: 4, background: WARN, opacity: 0.4 + 0.6 * dotPulse, flex: "none" }} />
                              <span style={{ fontSize: 11.5, color: WARN, fontWeight: 500 }}>DPD error 1101 · address line 2 exceeds 35 characters</span>
                            </div>
                            <div style={{ position: "absolute", display: "flex", alignItems: "center", gap: 7, opacity: errFixSwap }}>
                              <Tick k={errFixSwap} size={13} />
                              <span style={{ fontSize: 11.5, color: INK2, fontWeight: 500 }}>address shortened · rebooked before the batch closed</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                <div style={{ flex: 1 }} />
                <div style={{ fontSize: 11.5, color: INK4, paddingTop: 8 }}>+ 528 more in this batch</div>
              </div>
            </div>

            {/* ring + manifests */}
            <div style={{ width: 322, flex: "none", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ ...card, position: "relative", padding: "18px 20px", opacity: railIn, transform: "translateY(" + (1 - railIn) * 10 + "px)" }}>
                {ringPulse > 0 && <div style={{ position: "absolute", inset: -2, borderRadius: 15, border: "2.5px solid " + YEL, opacity: ringPulse * 0.95, pointerEvents: "none" }} />}
                <div style={EYE}>labels generated</div>
                <div style={{ display: "flex", justifyContent: "center", padding: "14px 0 6px" }}>
                  <div style={{ position: "relative", width: 150, height: 150 }}>
                    <svg width="150" height="150" viewBox="0 0 150 150">
                      <circle cx="75" cy="75" r={R} fill="none" stroke={SUNKEN} strokeWidth="9" />
                      <circle cx="75" cy="75" r={R} fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - ringP)} transform="rotate(-90 75 75)" />
                    </svg>
                    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ position: "relative", height: 44, width: "100%" }}>
                        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", opacity: 1 - doneFlip }}>
                          <div style={{ fontFamily: DISP, fontSize: 36, fontWeight: 500, color: INK, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{fmt(labels)}</div>
                          <div style={{ fontSize: 11.5, color: INK3, marginTop: 3 }}>of 537</div>
                        </div>
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: doneFlip }}>
                          <svg width="44" height="44" viewBox="0 0 44 44">
                            <circle cx="22" cy="22" r="20" fill={SUCCT} />
                            <path d="M12 23l6.5 6.5L32 15" fill="none" stroke={SUCC} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="32" strokeDashoffset={32 * (1 - tickDone)} />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ position: "relative", height: 18, textAlign: "center" }}>
                  <div style={{ position: "absolute", inset: 0, fontSize: 13, fontWeight: 600, color: INK, opacity: doneFlip }}>537 of 537 dispatched</div>
                </div>
              </div>

              <div style={{ ...card, flex: 1, padding: "18px 20px", opacity: manIn, transform: "translateY(" + (1 - manIn) * 10 + "px)" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={EYE}>manifests</div>
                  <div style={{ flex: 1 }} />
                  <div style={{ display: "flex", gap: 4 }}>
                    <div style={{ padding: "3px 10px", borderRadius: 999, background: INK, color: "#fff", fontSize: 10.5, fontWeight: 600 }}>date range</div>
                    <div style={{ padding: "3px 10px", borderRadius: 999, background: SUNKEN, color: INK3, fontSize: 10.5, fontWeight: 600 }}>shipment IDs</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginTop: 12 }}>
                  {MANIFESTS.map((m, i) => {
                    const t0 = 8.0 + i * 0.22;
                    const p = sg(T, t0, t0 + 0.34);
                    const tick = sg(T, t0 + 0.18, t0 + 0.48, ST);
                    return (
                      <div key={m.car} style={{ display: "flex", alignItems: "center", gap: 7, background: IVORY, border: "1px solid " + BORD, borderRadius: 9, padding: "7px 9px", opacity: p, transform: "translateY(" + (1 - p) * 7 + "px)" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={TILE[m.tile]} alt="" style={{ width: 17, height: 17, borderRadius: 5, objectFit: "cover", flex: "none" }} />
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 11, fontWeight: 600, color: INK, lineHeight: 1.15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.car}</div>
                          <div style={{ fontSize: 9.5, color: INK3 }}>{m.n} parcels</div>
                        </div>
                        <span style={{ flex: 1 }} />
                        <Tick k={tick} size={13} />
                      </div>
                    );
                  })}
                </div>
                <div style={{ fontSize: 11.5, color: INK3, marginTop: 10, textAlign: "right", opacity: sg(T, 9.9, 10.25) }}>manifests sent · 16:02</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DUR_MS = 14000;
const STATIC_T = 8.6; // batch-complete frame for reduced motion
const CARD_X = 24,
  CARD_Y = 24,
  CARD_W = 1152,
  CARD_H = 702;

export default function DispatchAnimation() {
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
      aria-label="Connexx multi-carrier dispatch — animated preview"
      role="img"
      style={{ position: "relative", width: "100%", aspectRatio: CARD_W + " / " + CARD_H, overflow: "hidden", borderRadius: 20 }}
    >
      {scale > 0 && (
        <div style={{ position: "absolute", top: -CARD_Y * scale, left: -CARD_X * scale, width: 1200, height: 750, transformOrigin: "top left", transform: "scale(" + scale + ")" }}>
          <DispatchScene T={T} />
        </div>
      )}
    </div>
  );
}
