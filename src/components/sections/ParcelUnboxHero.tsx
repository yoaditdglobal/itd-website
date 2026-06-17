"use client";

import { useEffect, useRef, useState } from "react";
import type * as THREE from "three";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";

/**
 * Cinematic, scroll-driven "parcel unboxing" hero (skeuomorphic revival).
 *
 * The enhanced (desktop, motion-ok) experience renders a real WebGL parcel with
 * Three.js — a kraft cardboard box with a photoreal shipping label and four
 * hinged top flaps. A pinned scroll track scrubs an eased progress value
 * (cubic-bezier(0.4,0,0.2,1)); the box scales up + turntables and its flaps fold
 * open to reveal the payload on scroll down, and re-pack on scroll up. Three.js
 * is dynamically imported inside the effect so it is fully code-split and never
 * touches the shared bundle (framer-motion is banned; three is lazy + client-only).
 *
 * SSR-safe: renders the plain hero (copy + CTAs, fully visible) on the server and
 * for mobile / reduced-motion / pre-hydration — a pure progressive enhancement.
 */

const CARRIERS = [
  { name: "Evri", src: "/logos/carriers/evri_logo.png" },
  { name: "InPost", src: "/logos/carriers/inpost-icon.png" },
  { name: "Royal Mail", src: "/logos/carriers/royal-mail-icon.png" },
  { name: "DPD", src: "/logos/carriers/dpd.png" },
  { name: "FedEx", src: "/logos/carriers/fedex-icon.png" },
  { name: "DHL", src: "/logos/carriers/dhl_logo.webp" },
  { name: "UPS", src: "/logos/carriers/ups_logo.png" },
];

const HEADING = (
  <>
    Smarter Shipping
    <br className="hidden sm:block" /> for a Simpler Tomorrow.
  </>
);
const SUB =
  "ITD Global is the logistics partner and multi-carrier platform behind UK retailers, marketplace sellers, 3PLs, and exporters — every active carrier on every parcel, one dashboard.";
const PRIMARY = { label: "Get Quote", href: "/rate-checker/domestic" };
const SECONDARY = { label: "Contact Us", href: "/contact" };

export default function ParcelUnboxHero() {
  const [enhanced, setEnhanced] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroCopyRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  // Decide whether to enhance: desktop + motion allowed (re-evaluates on change).
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setEnhanced(wide.matches && !reduce.matches);
    decide();
    wide.addEventListener("change", decide);
    reduce.addEventListener("change", decide);
    return () => {
      wide.removeEventListener("change", decide);
      reduce.removeEventListener("change", decide);
    };
  }, []);

  // Build the Three.js scene once enhanced; drive it from scroll progress.
  useEffect(() => {
    if (!enhanced) return;
    const canvas = canvasRef.current;
    const track = trackRef.current;
    if (!canvas || !track) return;

    let disposed = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      const THREE = await import("three");
      if (disposed || !canvas || !track) return;
      const canvasEl: HTMLCanvasElement = canvas;
      const trackEl: HTMLElement = track;

      /* ── Easing & helpers ── */
      const cubicBezier = (p1x: number, p1y: number, p2x: number, p2y: number) => {
        const A = (a: number, b: number) => 1 - 3 * b + 3 * a;
        const B = (a: number, b: number) => 3 * b - 6 * a;
        const C = (a: number) => 3 * a;
        const calc = (t: number, a: number, b: number) =>
          ((A(a, b) * t + B(a, b)) * t + C(a)) * t;
        const slope = (t: number, a: number, b: number) =>
          3 * A(a, b) * t * t + 2 * B(a, b) * t + C(a);
        const tForX = (x: number) => {
          let t = x;
          for (let i = 0; i < 6; i++) {
            const e = calc(t, p1x, p2x) - x;
            const d = slope(t, p1x, p2x);
            if (Math.abs(d) < 1e-6) break;
            t -= e / d;
          }
          return t;
        };
        return (x: number) =>
          x <= 0 ? 0 : x >= 1 ? 1 : calc(tForX(x), p1y, p2y);
      };
      const easeStd = cubicBezier(0.4, 0, 0.2, 1); // the requested premium curve
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
      const smooth = (e0: number, e1: number, x: number) => {
        const t = clamp((x - e0) / (e1 - e0));
        return t * t * (3 - 2 * t);
      };
      const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

      /* ── Renderer / scene / camera ── */
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasEl,
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.08;
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 2.75, 6.2);
      camera.lookAt(0, 1.04, 0);

      /* ── Lighting — soft, premium ── */
      scene.add(new THREE.HemisphereLight(0xffffff, 0xcdbfa6, 0.55));
      scene.add(new THREE.AmbientLight(0xffffff, 0.35));

      const key = new THREE.DirectionalLight(0xfff4e2, 2.4);
      key.position.set(4.5, 8, 5.5);
      key.castShadow = true;
      key.shadow.mapSize.set(2048, 2048);
      key.shadow.camera.near = 1;
      key.shadow.camera.far = 30;
      key.shadow.camera.left = -5;
      key.shadow.camera.right = 5;
      key.shadow.camera.top = 5;
      key.shadow.camera.bottom = -5;
      key.shadow.bias = -0.0004;
      key.shadow.radius = 6;
      scene.add(key);

      const fill = new THREE.DirectionalLight(0xdfe7ff, 0.6);
      fill.position.set(-5, 2.5, 3);
      scene.add(fill);
      const rim = new THREE.DirectionalLight(0xffffff, 0.7);
      rim.position.set(-2, 4, -6);
      scene.add(rim);

      // cobalt glow that lives inside the box
      const coreLight = new THREE.PointLight(0x3a63e8, 0, 6, 2);
      coreLight.position.set(0, 0.7, 0);
      scene.add(coreLight);

      /* ── Contact shadow (keeps CSS backdrop visible) ── */
      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(40, 40),
        new THREE.ShadowMaterial({ opacity: 0.22 }),
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = 0;
      floor.receiveShadow = true;
      scene.add(floor);

      /* ── Procedural kraft cardboard texture ── */
      function kraftTexture(repeat = 1) {
        const c = document.createElement("canvas");
        c.width = c.height = 512;
        const x = c.getContext("2d")!;
        const g = x.createLinearGradient(0, 0, 512, 512);
        g.addColorStop(0, "#dcbd8c");
        g.addColorStop(0.5, "#cda472");
        g.addColorStop(1, "#c0945f");
        x.fillStyle = g;
        x.fillRect(0, 0, 512, 512);
        // paper fibre speckle (seeded-ish; randomness only affects texture grain)
        for (let i = 0; i < 14000; i++) {
          const r = (120 + Math.random() * 70) | 0;
          const gg = (92 + Math.random() * 48) | 0;
          const b = (52 + Math.random() * 36) | 0;
          x.fillStyle = `rgba(${r},${gg},${b},${Math.random() * 0.09})`;
          x.fillRect(Math.random() * 512, Math.random() * 512, 1.6, 1.6);
        }
        // faint corrugation banding
        x.globalAlpha = 0.05;
        for (let y = 0; y < 512; y += 4) {
          x.fillStyle = (y / 4) % 2 ? "#7c5a30" : "#f0d8ac";
          x.fillRect(0, y, 512, 2);
        }
        x.globalAlpha = 1;
        const t = new THREE.CanvasTexture(c);
        t.colorSpace = THREE.SRGBColorSpace;
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        t.repeat.set(repeat, repeat);
        t.anisotropy = renderer.capabilities.getMaxAnisotropy();
        return t;
      }
      const kraft = kraftTexture(1);

      function kraftMat() {
        return new THREE.MeshStandardMaterial({
          map: kraft.clone(),
          roughness: 0.93,
          metalness: 0.0,
        });
      }
      const interiorMat = new THREE.MeshStandardMaterial({
        color: 0xa9824f,
        roughness: 0.97,
      });

      /* ── Shipping-label decal texture ── */
      const loadImg = (src: string): Promise<HTMLImageElement | null> =>
        new Promise((res) => {
          const im = new Image();
          im.onload = () => res(im);
          im.onerror = () => res(null);
          im.src = src;
        });
      // fit an image inside a box, preserving aspect ratio
      function fitInto(
        ctx: CanvasRenderingContext2D,
        img: HTMLImageElement | null,
        bx: number,
        by: number,
        bw: number,
        bh: number,
        halign: "center" | "left" | "right" = "center",
      ) {
        if (!img || !img.naturalWidth) return;
        const ar = img.naturalWidth / img.naturalHeight;
        let w = bw;
        let h = w / ar;
        if (h > bh) {
          h = bh;
          w = h * ar;
        }
        const dx =
          bx + (halign === "left" ? 0 : halign === "right" ? bw - w : (bw - w) / 2);
        const dy = by + (bh - h) / 2;
        ctx.drawImage(img, dx, dy, w, h);
      }

      function labelTexture() {
        const c = document.createElement("canvas");
        c.width = 1024;
        c.height = 660;
        const x = c.getContext("2d")!;
        x.clearRect(0, 0, 1024, 660);
        const rr = (px: number, py: number, w: number, h: number, r: number) => {
          x.beginPath();
          x.moveTo(px + r, py);
          x.arcTo(px + w, py, px + w, py + h, r);
          x.arcTo(px + w, py + h, px, py + h, r);
          x.arcTo(px, py + h, px, py, r);
          x.arcTo(px, py, px + w, py, r);
          x.closePath();
        };
        // paper
        x.shadowColor = "rgba(0,0,0,0.18)";
        x.shadowBlur = 22;
        x.shadowOffsetY = 8;
        x.fillStyle = "#fbfaf7";
        rr(70, 70, 884, 520, 22);
        x.fill();
        x.shadowColor = "transparent";
        x.strokeStyle = "rgba(26,26,31,0.12)";
        x.lineWidth = 2;
        rr(70, 70, 884, 520, 22);
        x.stroke();
        // ITD GLOBAL wordmark (top-left) — drawn dark for legibility on white paper
        x.fillStyle = "#15192b";
        x.font = "800 40px Inter, sans-serif";
        x.textBaseline = "alphabetic";
        x.fillText("ITD GLOBAL", 108, 150);
        x.fillStyle = "#6b6b75";
        x.font = "600 18px Inter, sans-serif";
        x.fillText("MULTI-CARRIER LOGISTICS", 110, 174);
        // CONNEXX · PRIORITY pill (top-right)
        x.fillStyle = "#1d3fb8";
        rr(686, 94, 228, 52, 26);
        x.fill();
        x.fillStyle = "#fff";
        x.font = "700 21px Inter, sans-serif";
        x.textBaseline = "middle";
        x.textAlign = "center";
        x.fillText("CONNEXX · PRIORITY", 800, 121);
        x.textAlign = "left";
        x.textBaseline = "alphabetic";
        // divider
        x.strokeStyle = "rgba(26,26,31,0.10)";
        x.lineWidth = 2;
        x.beginPath();
        x.moveTo(108, 196);
        x.lineTo(916, 196);
        x.stroke();
        // address block
        x.fillStyle = "#6b6b75";
        x.font = "600 22px Inter, sans-serif";
        x.fillText("SHIP TO", 108, 246);
        x.fillStyle = "#1a1a1f";
        x.font = "700 33px Inter, sans-serif";
        x.fillText("Connexx Operations Ltd", 108, 288);
        x.fillStyle = "#4a4a55";
        x.font = "400 24px Inter, sans-serif";
        x.fillText("Unit 4, Trafford Park · Manchester · M17 1AB", 108, 324);
        // service stamp
        x.save();
        x.translate(826, 262);
        x.rotate(-0.12);
        x.strokeStyle = "#c8743d";
        x.lineWidth = 5;
        rr(-92, -36, 184, 72, 12);
        x.stroke();
        x.fillStyle = "#c8743d";
        x.font = "800 32px Inter, sans-serif";
        x.textAlign = "center";
        x.textBaseline = "middle";
        x.fillText("TRACKED 24", 0, 0);
        x.restore();
        x.textAlign = "left";
        x.textBaseline = "alphabetic";
        // ships-via label (carrier logos composited async below)
        x.fillStyle = "#6b6b75";
        x.font = "600 20px Inter, sans-serif";
        x.fillText("SHIPS VIA ANY CARRIER", 108, 374);
        // barcode
        let bx = 108;
        x.fillStyle = "#1a1a1f";
        while (bx < 916) {
          const w = 2 + Math.random() * 7;
          x.fillRect(bx, 468, w, 78);
          bx += w + (2 + Math.random() * 7);
        }
        x.fillStyle = "#6b6b75";
        x.font = "500 22px monospace";
        x.fillText("ITD 4821 0917 4420 · GB", 108, 578);

        const t = new THREE.CanvasTexture(c);
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = renderer.capabilities.getMaxAnisotropy();

        // composite the real carrier logos once they load, then refresh
        (async () => {
          const imgs = await Promise.all(CARRIERS.map((cr) => loadImg(cr.src)));
          const startX = 108;
          const endX = 916;
          const cell = (endX - startX) / imgs.length;
          imgs.forEach((im, i) =>
            fitInto(x, im, startX + i * cell + 6, 388, cell - 12, 46, "center"),
          );
          t.needsUpdate = true;
        })();
        return t;
      }

      /* ── Build the parcel ── */
      const W = 2.4;
      const D = 1.9;
      const H = 1.35;
      const T = 0.07; // outer dims
      const box = new THREE.Group();
      scene.add(box);

      function panel(w: number, h: number, d: number, mat: THREE.Material) {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
        m.castShadow = true;
        m.receiveShadow = true;
        return m;
      }
      // bottom
      const bottom = panel(W, T, D, kraftMat());
      bottom.position.y = T / 2;
      box.add(bottom);
      // four walls
      const front = panel(W, H, T, kraftMat());
      front.position.set(0, H / 2, D / 2 - T / 2);
      box.add(front);
      const back = panel(W, H, T, kraftMat());
      back.position.set(0, H / 2, -(D / 2 - T / 2));
      box.add(back);
      const leftW = panel(T, H, D, kraftMat());
      leftW.position.set(-(W / 2 - T / 2), H / 2, 0);
      box.add(leftW);
      const rightW = panel(T, H, D, kraftMat());
      rightW.position.set(W / 2 - T / 2, H / 2, 0);
      box.add(rightW);
      // interior liners (darker, so inside reads as cardboard)
      function liner(w: number, h: number, d: number, px: number, py: number, pz: number) {
        const m = panel(w, h, d, interiorMat);
        m.position.set(px, py, pz);
        box.add(m);
      }
      liner(W - 2 * T, H - T, 0.012, 0, H / 2, D / 2 - T - 0.01);
      liner(W - 2 * T, H - T, 0.012, 0, H / 2, -(D / 2 - T - 0.01));
      liner(0.012, H - T, D - 2 * T, -(W / 2 - T - 0.01), H / 2, 0);
      liner(0.012, H - T, D - 2 * T, W / 2 - T - 0.01, H / 2, 0);
      liner(W - 2 * T, 0.012, D - 2 * T, 0, T + 0.01, 0); // inner floor

      // shipping label decal on front
      const label = new THREE.Mesh(
        new THREE.PlaneGeometry(W * 0.62, W * 0.62 * 0.66),
        new THREE.MeshStandardMaterial({
          map: labelTexture(),
          transparent: true,
          roughness: 0.85,
        }),
      );
      label.position.set(0, H * 0.52, D / 2 + 0.012);
      box.add(label);

      /* ── Hinged top flaps — pivot groups at the wall tops ── */
      type FlapData = { axis: "x" | "z"; sign: number; max: number; delay: number };
      const flaps: THREE.Group[] = [];
      function makeFlap(kind: "front" | "back" | "left" | "right") {
        const g = new THREE.Group();
        let mesh: THREE.Mesh;
        if (kind === "front" || kind === "back") {
          mesh = panel(W - 2 * T - 0.03, T, D / 2 - 0.04, kraftMat());
          const sign = kind === "front" ? 1 : -1;
          g.position.set(0, H, sign * (D / 2 - T / 2));
          mesh.position.set(0, 0, -sign * (D / 4 - 0.02));
          (g.userData as FlapData) = { axis: "x", sign, max: 2.05 * sign, delay: 0.06 };
        } else {
          mesh = panel(W / 2 - 0.04, T, D - 2 * T - 0.03, kraftMat());
          const sign = kind === "left" ? -1 : 1; // left wall on -x
          g.position.set(sign * (W / 2 - T / 2), H, 0);
          mesh.position.set(-sign * (W / 4 - 0.02), 0, 0);
          (g.userData as FlapData) = { axis: "z", sign, max: 1.62 * sign, delay: 0.0 };
        }
        g.add(mesh);
        box.add(g);
        flaps.push(g);
      }
      makeFlap("left");
      makeFlap("right"); // inner flaps fold first
      makeFlap("front");
      makeFlap("back"); // outer flaps open last / widest

      /* ── Cobalt "platform core" that rises out when open ── */
      const core = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.5, H * 0.46, D * 0.5),
        new THREE.MeshStandardMaterial({
          color: 0x1d3fb8,
          emissive: 0x2a52d8,
          emissiveIntensity: 0.0,
          roughness: 0.32,
          metalness: 0.2,
          transparent: true,
          opacity: 0,
        }),
      );
      core.castShadow = true;
      core.position.y = H * 0.5;
      box.add(core);
      const coreEdge = new THREE.LineSegments(
        new THREE.EdgesGeometry(core.geometry),
        new THREE.LineBasicMaterial({ color: 0x9fb6ff, transparent: true, opacity: 0 }),
      );
      core.add(coreEdge);

      /* ── Scroll → progress (robust to layout offset) ── */
      let target = 0;
      let current = 0;
      function readScroll() {
        const rect = trackEl.getBoundingClientRect();
        const range = rect.height - window.innerHeight;
        target = range > 0 ? clamp(-rect.top / range) : 0;
      }
      const onScroll = () => readScroll();

      function resize() {
        const w = canvasEl.clientWidth || window.innerWidth;
        const h = canvasEl.clientHeight || window.innerHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      const onResize = () => {
        readScroll();
        resize();
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      readScroll();
      resize();

      const heroCopy = heroCopyRef.current;
      const revealCopy = revealRef.current;
      const scrollCue = cueRef.current;

      function applyState(p: number) {
        const e = easeStd(p);

        // scale + turntable
        const s = lerp(0.6, 1.12, e);
        box.scale.setScalar(s);
        box.rotation.y = lerp(-0.62, 0.22, e);
        box.rotation.x = lerp(0.04, -0.02, e);
        box.position.y = lerp(-0.32, -0.12, e);

        // flaps open in the back half of the scroll
        const openRaw = smooth(0.42, 1.0, p);
        flaps.forEach((g) => {
          const d = g.userData as FlapData;
          const local = clamp((openRaw - d.delay) / (1 - d.delay));
          const a = easeStd(local) * d.max;
          if (d.axis === "x") g.rotation.x = a;
          else g.rotation.z = a;
        });

        // core glow rises & lights up with the opening
        const op = smooth(0.55, 0.98, p);
        const coreMat = core.material as THREE.MeshStandardMaterial;
        coreMat.opacity = op;
        coreMat.emissiveIntensity = op * 0.9;
        (coreEdge.material as THREE.LineBasicMaterial).opacity = op;
        core.position.y = lerp(H * 0.42, H * 0.9, op);
        core.rotation.y = lerp(-0.3, 0.4, op);
        coreLight.intensity = op * 3.2;

        // ── DOM overlays ──
        if (heroCopy) {
          const heroOut = smooth(0.0, 0.32, p);
          heroCopy.style.opacity = String(1 - heroOut);
          heroCopy.style.transform = `translateY(${-heroOut * 60}px) scale(${1 - heroOut * 0.04})`;
          heroCopy.style.filter = `blur(${heroOut * 4}px)`;
          heroCopy.style.pointerEvents = heroOut > 0.6 ? "none" : "auto";
        }
        if (revealCopy) {
          const revIn = smooth(0.6, 0.96, p);
          revealCopy.style.opacity = String(revIn);
          revealCopy.style.transform = `translateY(${(1 - revIn) * 48}px)`;
          revealCopy.style.pointerEvents = revIn > 0.5 ? "auto" : "none";
        }
        if (scrollCue) {
          scrollCue.style.opacity = String(1 - smooth(0.0, 0.08, p));
        }
      }

      /* ── Render loop ── */
      let raf = 0;
      function renderAt(p: number) {
        applyState(p);
        renderer.render(scene, camera);
      }
      function tick() {
        // critically-damped follow for a buttery 60fps feel
        current = reduceMotion ? target : lerp(current, target, 0.1);
        if (Math.abs(current - target) < 0.0002) current = target;
        renderAt(current);
        raf = requestAnimationFrame(tick);
      }
      if (reduceMotion) {
        current = target = 1;
        renderAt(1);
      }
      tick();

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        scene.traverse((o) => {
          const m = o as THREE.Mesh;
          if (m.geometry) m.geometry.dispose();
          const mat = (m as THREE.Mesh).material;
          if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
          else if (mat) (mat as THREE.Material).dispose();
        });
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      if (cleanup) cleanup();
    };
  }, [enhanced]);

  if (!enhanced) return <StaticHero />;

  return (
    <div ref={trackRef} className="relative" style={{ height: "320vh" }}>
      <div className="hero-bg sticky top-0 h-screen overflow-hidden">
        <div
          className="bg-noise pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply"
          aria-hidden
        />

        {/* WebGL parcel canvas */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden
        />

        {/* Headline + CTAs — fade out as the unbox begins */}
        <div
          ref={heroCopyRef}
          className="absolute inset-x-0 top-[10%] z-20 mx-auto max-w-3xl px-6 text-center will-change-[transform,opacity]"
        >
          <h1 className="text-display-xl text-text-primary">{HEADING}</h1>
          <p className="mx-auto mt-5 max-w-xl text-body-lg text-text-secondary">
            {SUB}
          </p>
          <div className="mt-7 flex justify-center gap-3">
            <MagneticButton>
              <Button href={PRIMARY.href} variant="primary">
                {PRIMARY.label}
              </Button>
            </MagneticButton>
            <Button href={SECONDARY.href} variant="secondary">
              {SECONDARY.label}
            </Button>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          ref={cueRef}
          className="absolute inset-x-0 bottom-8 z-20 text-center text-eyebrow text-text-tertiary"
        >
          <span className="animate-pulse-dot">Scroll to unbox ↓</span>
        </div>

        {/* Payload revealed from inside the box — crossfades in where the headline vacates */}
        <div
          ref={revealRef}
          className="pointer-events-none absolute inset-x-0 top-[12%] z-30 mx-auto max-w-2xl px-6 text-center opacity-0 will-change-[transform,opacity]"
        >
          <p className="text-eyebrow text-accent">One platform. Every carrier.</p>
          <h2 className="mt-2 text-display-lg text-text-primary">
            Connexx picks the cheapest compliant carrier and prints the label in one
            click.
          </h2>
          <div className="mt-6 inline-flex">
            <Button href="/connexx" variant="primary">
              See how Connexx works
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────  Realistic shipping label (static fallback)  ───────────────────── */

function ParcelLabel() {
  return (
    <div className="absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2 rotate-[-1.2deg] rounded-md bg-[#fcfbf7] p-3 shadow-[0_6px_14px_rgba(0,0,0,0.35)] ring-1 ring-black/10">
      <div
        aria-hidden
        className="absolute -right-1 -top-1 h-5 w-5 rotate-45 bg-[#efeae0] shadow-[-2px_2px_3px_rgba(0,0,0,0.2)]"
      />
      <div className="flex items-center justify-between border-b border-dashed border-black/25 pb-1.5">
        <span className="text-[9px] font-extrabold tracking-[0.18em] text-[#15192b]">
          ITD GLOBAL
        </span>
        <span className="text-[7px] font-semibold uppercase tracking-widest text-black/50">
          Multi-carrier · Tracked
        </span>
      </div>

      <div className="mt-1.5 flex items-start justify-between gap-2">
        <div className="text-left">
          <p className="text-[6px] uppercase tracking-wider text-black/40">Ship to</p>
          <p className="text-[8px] font-semibold leading-tight text-[#15192b]">
            Your Customer
            <br />
            Anywhere, UK & Worldwide
          </p>
        </div>
        <div
          aria-hidden
          className="h-7 w-[44%] self-end"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #15192b 0 1px, transparent 1px 2px, #15192b 2px 4px, transparent 4px 7px, #15192b 7px 8px, transparent 8px 11px)",
          }}
        />
      </div>

      <div className="mt-2 grid grid-cols-7 items-center gap-1 rounded-sm bg-white/70 px-1 py-1 ring-1 ring-black/5">
        {CARRIERS.map((c) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={c.name}
            src={c.src}
            alt={c.name}
            className="h-3.5 w-full object-contain opacity-90"
            loading="eager"
          />
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────  Static fallback hero  ─────────────────────── */

function StaticHero() {
  return (
    <section className="relative hero-bg flex min-h-[calc(100vh-72px)] items-center overflow-hidden">
      <div className="hero-bg-blob" aria-hidden />
      <div
        className="bg-noise pointer-events-none absolute inset-0 opacity-[0.45] mix-blend-multiply"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h1 className="hero-entrance-h1 text-display-xl text-text-primary">
              {HEADING}
            </h1>
            <p className="hero-entrance-sub mt-6 max-w-xl text-body-lg text-text-secondary">
              {SUB}
            </p>
            <div className="hero-entrance-cta mt-8 flex flex-col gap-3 sm:flex-row">
              <MagneticButton>
                <Button href={PRIMARY.href} variant="primary">
                  {PRIMARY.label}
                </Button>
              </MagneticButton>
              <Button href={SECONDARY.href} variant="secondary">
                {SECONDARY.label}
              </Button>
            </div>
          </div>
          <div className="hero-entrance-aside hidden justify-center lg:flex">
            <div className="relative w-[300px] rounded-2xl border border-[rgba(120,85,45,0.45)] bg-[linear-gradient(135deg,#d9b380,#b9884e)] p-6 shadow-xl">
              <div
                className="absolute inset-x-0 top-0 mx-auto h-3 w-[70%] rounded-b bg-[#c9a878] shadow"
                aria-hidden
              />
              <ParcelLabel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
