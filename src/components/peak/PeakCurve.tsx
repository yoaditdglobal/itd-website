"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { Lock } from "lucide-react";
import { track } from "@/lib/analytics";
import type { CurveSeriesClient, CurveTabKey, PeakCurveConfig } from "./peak-types";
import {
  FADE_W,
  PAD,
  areaPath,
  indexFromX,
  makeScales,
  monotonePath,
  tableRows,
  tooltipText,
  xOf,
} from "./PeakCurve.helpers";

type Props = {
  config: PeakCurveConfig;
  onOpenDialog: (trigger: "curve_lock" | "curve_blur") => void;
  onTabChange?: (tab: CurveTabKey) => void;
  /** When the report is unlocked the lock chip / blur label link straight to the PDF. */
  unlocked?: boolean;
  reportUrl?: string;
  onDownload?: () => void;
};

type Layer = { series: CurveSeriesClient; leaving: boolean; id: number };
type Anim = "static" | "armed" | "drawn";

const SSR_SIZE = { w: 800, h: 340 };
const clampH = (w: number) => Math.max(220, Math.min(340, Math.round(w * 0.42)));

/**
 * Hand-built SVG line chart: weekly volume index vs a normal September week.
 * All parcels = real values + pinned peak; the other segments are value-free
 * shapes (see peak-curve.server.ts) with an "In the report" chip. Draw-in on
 * first view, tab crossfade, pointer/touch/keyboard scrubber, blurred tail.
 */
export default function PeakCurve({
  config,
  onOpenDialog,
  onTabChange,
  unlocked = false,
  reportUrl,
  onDownload,
}: Props) {
  const { weeks, series, blurFromIndex } = config;
  const n = weeks.length;
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const ids = {
    blur: `${uid}-blur`,
    fadeOut: `${uid}-fade-out`,
    fadeIn: `${uid}-fade-in`,
    clearMask: `${uid}-clear`,
    blurMask: `${uid}-blurred`,
    area: `${uid}-area`,
    live: `${uid}-live`,
    panel: `${uid}-panel`,
    tab: (k: string) => `${uid}-tab-${k}`,
  };

  const [activeTab, setActiveTab] = useState<CurveTabKey>(series[0]!.key);
  const [layers, setLayers] = useState<Layer[]>([{ series: series[0]!, leaving: false, id: 0 }]);
  const layerSeq = useRef(0);
  const [size, setSize] = useState(SSR_SIZE);
  const [anim, setAnim] = useState<Anim>("static");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [liveText, setLiveText] = useState("");

  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrubbedTabs = useRef(new Set<CurveTabKey>());
  const liveTimer = useRef<number | null>(null);
  const reducedMotion = useRef(false);

  const active = series.find((s) => s.key === activeTab) ?? series[0]!;
  const { w, h } = size;

  // ── Measure: 1 svg unit = 1 css px after the first layout pass ──────────
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const apply = () => {
      const width = Math.round(el.getBoundingClientRect().width);
      if (width > 0) setSize({ w: width, h: clampH(width) });
    };
    apply();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── Draw-in on first view (client enhancement; SSR is fully drawn) ──────
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    reducedMotion.current =
      typeof window !== "undefined" &&
      !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current || typeof IntersectionObserver === "undefined") return;
    // Client-side navigation with the chart already on screen: reveal instantly.
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView && performance.now() > 4000) return;

    setAnim("armed");
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setAnim("drawn");
      io.disconnect();
      window.clearTimeout(timer);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) finish();
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    const timer = window.setTimeout(finish, 4000); // never leave the chart hidden
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  // ── Tabs ────────────────────────────────────────────────────────────────
  const selectTab = useCallback(
    (key: CurveTabKey) => {
      if (key === activeTab) return;
      const next = series.find((s) => s.key === key);
      if (!next) return;
      setActiveTab(key);
      setHoverIndex(null);
      setLiveText("");
      layerSeq.current += 1;
      setLayers((ls) => [
        ...ls.filter((l) => !l.leaving).map((l) => ({ ...l, leaving: true })),
        { series: next, leaving: false, id: layerSeq.current },
      ]);
      onTabChange?.(key);
      track("peak_tab_select", { tab: key });
    },
    [activeTab, series, onTabChange],
  );

  const removeLayer = useCallback((id: number) => {
    setLayers((ls) => ls.filter((l) => l.id !== id));
  }, []);

  // Reduced motion disables the exit animation, so `animationend` never fires.
  useEffect(() => {
    const leaving = layers.filter((l) => l.leaving);
    if (leaving.length === 0) return;
    const t = window.setTimeout(() => {
      setLayers((ls) => ls.filter((l) => !l.leaving));
    }, 400);
    return () => window.clearTimeout(t);
  }, [layers]);

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    let next = idx;
    if (e.key === "ArrowRight") next = (idx + 1) % series.length;
    else if (e.key === "ArrowLeft") next = (idx - 1 + series.length) % series.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = series.length - 1;
    else return;
    e.preventDefault();
    tabRefs.current[next]?.focus();
    selectTab(series[next]!.key);
  };

  // ── Scrubber ────────────────────────────────────────────────────────────
  const announce = useCallback(
    (i: number, immediate: boolean) => {
      const text = tooltipText(active, i, weeks);
      if (liveTimer.current) window.clearTimeout(liveTimer.current);
      if (immediate) setLiveText(text);
      else liveTimer.current = window.setTimeout(() => setLiveText(text), 150);
    },
    [active, weeks],
  );

  const scrubTo = useCallback(
    (i: number, immediate: boolean) => {
      setHoverIndex(i);
      announce(i, immediate);
      if (!scrubbedTabs.current.has(active.key)) {
        scrubbedTabs.current.add(active.key);
        track("peak_curve_scrub", { tab: active.key });
      }
    },
    [active.key, announce],
  );

  const pointerToIndex = (e: PointerEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return indexFromX(e.clientX - rect.left, w, n, blurFromIndex);
  };
  const onPointerMove = (e: PointerEvent<SVGSVGElement>) => {
    if (e.pointerType === "touch" && e.buttons === 0) return; // tap-scroll, not a drag
    const i = pointerToIndex(e);
    if (i !== null && i !== hoverIndex) scrubTo(i, false);
  };
  const onPointerDown = (e: PointerEvent<SVGSVGElement>) => {
    svgRef.current?.setPointerCapture?.(e.pointerId);
    const i = pointerToIndex(e);
    if (i !== null) scrubTo(i, false);
  };
  const clearHover = () => setHoverIndex(null);

  const onStageKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const maxVisible = Math.min(n - 1, blurFromIndex - 1);
    const cur = hoverIndex ?? active.peakIndex;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = Math.min(maxVisible, cur + 1);
    else if (e.key === "ArrowLeft") next = Math.max(0, cur - 1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = maxVisible;
    else if (e.key === "Escape") {
      clearHover();
      return;
    } else return;
    e.preventDefault();
    scrubTo(next, true);
  };

  // ── Geometry ────────────────────────────────────────────────────────────
  const activeScales = useMemo(() => makeScales(active, w, h), [active, w, h]);
  const xBlur = xOf(blurFromIndex, w, n);
  const plotRight = w - PAD.right;
  const pct = (v: number, total: number) => `${(v / total) * 100}%`;
  const peakPt = activeScales.pts[active.peakIndex]!;
  const hoverPt = hoverIndex !== null ? activeScales.pts[hoverIndex] : null;
  const tooltipRight = hoverIndex !== null && hoverIndex > n * 0.72;
  const xAxisIdx = Array.from({ length: n }, (_, i) => i).filter((i) => i % 4 === 0 && i < n);
  const rows = tableRows(active, weeks, blurFromIndex);

  const gateProps = (trigger: "curve_lock" | "curve_blur", className: string) =>
    unlocked && reportUrl
      ? ({
          as: "a" as const,
          props: {
            href: reportUrl,
            target: "_blank",
            rel: "noopener",
            className,
            onClick: onDownload,
          },
        })
      : ({
          as: "button" as const,
          props: { type: "button" as const, className, onClick: () => onOpenDialog(trigger) },
        });

  const lock = gateProps("curve_lock", "peak-curve__lock");
  const blur = gateProps("curve_blur", "peak-curve__blur-label");

  return (
    <div ref={wrapRef} className="peak-curve" data-anim={anim}>
      <div className="peak-curve__head">
        <p className="text-eyebrow peak-curve__eyebrow">{config.eyebrow}</p>
        {config.placeholder && (
          <span className="peak-curve__badge" title="Series built from anchor points only">
            Placeholder data
          </span>
        )}
      </div>

      <div role="tablist" aria-label="Parcel segment" className="peak-curve__tabs">
        {series.map((s, i) => {
          const selected = s.key === activeTab;
          return (
            <button
              key={s.key}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={ids.tab(s.key)}
              aria-selected={selected}
              aria-controls={ids.panel}
              tabIndex={selected ? 0 : -1}
              className="peak-curve__tab"
              onClick={() => selectTab(s.key)}
              onKeyDown={(e) => onTabKey(e, i)}
            >
              {s.label}
              {s.locked && <Lock className="peak-curve__tab-lock" aria-hidden />}
            </button>
          );
        })}
      </div>

      <div
        id={ids.panel}
        role="tabpanel"
        aria-labelledby={ids.tab(activeTab)}
        className="peak-curve__panel"
      >
        <div
          ref={stageRef}
          className="peak-curve__stage"
          tabIndex={0}
          role="group"
          aria-label={`Weekly volume chart, ${active.label}. Use the left and right arrow keys to step through weeks.`}
          aria-describedby={ids.live}
          onKeyDown={onStageKey}
          onBlur={clearHover}
        >
          <svg
            ref={svgRef}
            className="peak-curve__svg"
            viewBox={`0 0 ${w} ${h}`}
            width="100%"
            height="100%"
            aria-hidden
            focusable="false"
            onPointerMove={onPointerMove}
            onPointerDown={onPointerDown}
            onPointerLeave={clearHover}
            onPointerCancel={clearHover}
          >
            <defs>
              <filter id={ids.blur} x="-5%" y="-25%" width="110%" height="150%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
              <linearGradient
                id={ids.fadeOut}
                gradientUnits="userSpaceOnUse"
                x1={xBlur - FADE_W / 2}
                x2={xBlur + FADE_W / 2}
                y1="0"
                y2="0"
              >
                <stop offset="0" stopColor="#fff" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id={ids.fadeIn}
                gradientUnits="userSpaceOnUse"
                x1={xBlur - FADE_W / 2}
                x2={xBlur + FADE_W / 2}
                y1="0"
                y2="0"
              >
                <stop offset="0" stopColor="#fff" stopOpacity="0" />
                <stop offset="1" stopColor="#fff" stopOpacity="0.55" />
              </linearGradient>
              <mask id={ids.clearMask} maskUnits="userSpaceOnUse" x="0" y="0" width={w} height={h}>
                <rect x="0" y="0" width={w} height={h} fill={`url(#${ids.fadeOut})`} />
              </mask>
              <mask id={ids.blurMask} maskUnits="userSpaceOnUse" x="0" y="0" width={w} height={h}>
                <rect x="0" y="0" width={w} height={h} fill={`url(#${ids.fadeIn})`} />
              </mask>
              <linearGradient id={ids.area} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="var(--peak-teal)" stopOpacity="0.45" />
                <stop offset="1" stopColor="var(--peak-teal)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* y ticks (unlocked only) */}
            {activeScales.ticks.map((t) => (
              <g key={t} className="peak-curve__tick">
                <line
                  x1={PAD.left}
                  x2={plotRight}
                  y1={activeScales.yOf(t)}
                  y2={activeScales.yOf(t)}
                  className={t === 100 ? "peak-curve__baseline" : "peak-curve__grid"}
                />
                <text x={PAD.left - 8} y={activeScales.yOf(t)} className="peak-curve__ylabel">
                  {t}
                </text>
              </g>
            ))}
            {/* x labels */}
            {xAxisIdx.map((i) => (
              <text
                key={i}
                x={xOf(i, w, n)}
                y={h - PAD.bottom + 20}
                className="peak-curve__xlabel"
                textAnchor={i === 0 ? "start" : "middle"}
              >
                {weeks[i]!.short}
              </text>
            ))}

            {layers.map((layer) => {
              const sc = makeScales(layer.series, w, h);
              const lineD = monotonePath(sc.pts);
              const areaD = areaPath(sc.pts, lineD, sc.floorY);
              const pk = sc.pts[layer.series.peakIndex]!;
              return (
                <g
                  key={layer.id}
                  className={`peak-curve__layer${layer.leaving ? " is-leaving" : " is-entering"}`}
                  onAnimationEnd={layer.leaving ? () => removeLayer(layer.id) : undefined}
                >
                  {layer.series.locked && (
                    <line
                      x1={PAD.left}
                      x2={plotRight}
                      y1={sc.baselineY}
                      y2={sc.baselineY}
                      className="peak-curve__baseline"
                    />
                  )}
                  <g mask={`url(#${ids.clearMask})`}>
                    <path d={areaD} className="peak-curve__area" fill={`url(#${ids.area})`} />
                    <path d={lineD} className="peak-curve__line" pathLength={1} />
                  </g>
                  <g mask={`url(#${ids.blurMask})`} filter={`url(#${ids.blur})`}>
                    <path d={areaD} className="peak-curve__area" fill={`url(#${ids.area})`} />
                    <path d={lineD} className="peak-curve__line" pathLength={1} />
                  </g>
                  {!layer.series.locked && (
                    <>
                      <circle cx={pk.x} cy={pk.y} r={6} className="peak-curve__pin-ring" />
                      <circle cx={pk.x} cy={pk.y} r={5} className="peak-curve__pin" />
                    </>
                  )}
                </g>
              );
            })}

            {hoverPt && (
              <g className="peak-curve__hover">
                <line
                  x1={hoverPt.x}
                  x2={hoverPt.x}
                  y1={PAD.top}
                  y2={activeScales.floorY}
                  className="peak-curve__guide"
                />
                <circle cx={hoverPt.x} cy={hoverPt.y} r={4.5} className="peak-curve__dot" />
              </g>
            )}
          </svg>

          {/* HTML overlays — positioned in % so they track the svg in both the
              measured (1:1) and the unmeasured (SSR) case. */}
          <div className="peak-curve__overlay" aria-hidden>
            <span
              className="peak-curve__baseline-label"
              style={{ top: pct(activeScales.baselineY, h), right: pct(PAD.right, w) }}
            >
              {config.baselineLabel}
            </span>

            {!active.locked ? (
              <span
                className="peak-curve__pin-label"
                style={{ left: pct(peakPt.x, w), top: pct(peakPt.y, h) }}
              >
                {active.pin.label}
              </span>
            ) : lock.as === "a" ? (
              <a {...lock.props} style={{ left: pct(peakPt.x, w), top: pct(peakPt.y, h) }}>
                <Lock aria-hidden /> {config.lockLabel}
              </a>
            ) : (
              <button {...lock.props} style={{ left: pct(peakPt.x, w), top: pct(peakPt.y, h) }}>
                <Lock aria-hidden /> {config.lockLabel}
              </button>
            )}

            {blur.as === "a" ? (
              <a
                {...blur.props}
                style={{ left: pct(xBlur + (plotRight - xBlur) / 2, w), top: pct(PAD.top + (h - PAD.top - PAD.bottom) / 2, h) }}
              >
                {config.blurLabel}
              </a>
            ) : (
              <button
                {...blur.props}
                style={{ left: pct(xBlur + (plotRight - xBlur) / 2, w), top: pct(PAD.top + (h - PAD.top - PAD.bottom) / 2, h) }}
              >
                {config.blurLabel}
              </button>
            )}

            {hoverPt && hoverIndex !== null && (
              <span
                className={`peak-curve__tooltip${tooltipRight ? " is-right" : ""}`}
                style={{ left: pct(hoverPt.x, w), top: pct(hoverPt.y, h) }}
              >
                {tooltipText(active, hoverIndex, weeks)}
              </span>
            )}
          </div>
        </div>

        <p className="peak-curve__caption" aria-live="polite">
          {config.captions[activeTab]}
        </p>
        <div id={ids.live} className="sr-only" aria-live="polite" aria-atomic="true">
          {liveText}
        </div>

        {/* Text alternative for assistive tech (locked tabs expose no values). */}
        <table className="sr-only">
          <caption>Weekly volume index, {active.label}. A normal September week equals 100.</caption>
          <thead>
            <tr>
              <th scope="col">Week</th>
              <th scope="col">Index</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.week}>
                <td>{r.week}</td>
                <td>{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
