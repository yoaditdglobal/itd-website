"use client";

import { useEffect, useRef, useState } from "react";
import type * as THREE from "three";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";

/**
 * Cinematic, scroll-driven hero — a 4-act logistics journey (skeuomorphic revival).
 *
 * A single pinned scroll track scrubs an eased progress value (cubic-bezier(
 * 0.4,0,0.2,1)) through four acts, all rendered in one WebGL scene:
 *   Act 1 — the kraft parcel unboxes (flaps fold open, cobalt core rises).
 *   Act 2 — it re-seals and loads into a delivery VAN (domestic).
 *   Act 3 — it flies into a cargo PLANE (international, sky backdrop).
 *   Act 4 — it drops into a container on a SHIP (freight, sea backdrop).
 * Each act surfaces the matching shipping-type card (Domestic / International /
 * Freight) as an overlay. Every vehicle is procedural Three.js — no external
 * models or assets.
 *
 * Three.js is dynamically imported inside the effect so it is fully code-split
 * and never touches the shared bundle (framer-motion is banned; three is lazy +
 * client-only). Runs on every viewport (mobile included) where motion is allowed;
 * the camera widens its FOV on narrow/portrait screens so the set-pieces stay
 * framed. SSR-safe: renders the plain hero (copy + CTAs) on the server and for
 * reduced-motion / pre-hydration — a pure progressive enhancement.
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

/**
 * The three shipping-type cards become the per-act overlays (content mirrors
 * DomesticInternationalCards). Act 2 → van, Act 3 → plane, Act 4 → ship.
 */
const ACTS = [
  {
    title: "UK domestic parcel delivery",
    body: "One screen for every UK carrier. Royal Mail, DPD, Evri, InPost, Amazon Shipping, and Parcel Force — every postcode, including Highlands, Islands, and NI.",
    href: "/shipping/domestic",
  },
  {
    title: "International parcel delivery",
    body: "Export and import in one workflow. HS codes, EORI, IOSS, and customs paperwork generated before the carrier scans the label.",
    href: "/shipping/international",
  },
  {
    title: "Freight and pallet shipping",
    body: "UK pallet networks, EU lanes, and worldwide LCL/FCL containers on one platform. Mixed-mode freight planned in minutes, not days.",
    href: "/shipping/freight",
  },
];

export default function ParcelUnboxHero() {
  const [enhanced, setEnhanced] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroCopyRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const seaRef = useRef<HTMLDivElement>(null);
  const act2Ref = useRef<HTMLDivElement>(null);
  const act3Ref = useRef<HTMLDivElement>(null);
  const act4Ref = useRef<HTMLDivElement>(null);

  // Decide whether to enhance: any viewport, motion allowed (re-evaluates on change).
  // The cinematic hero runs on mobile too; only reduced-motion falls back to StaticHero.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setEnhanced(!reduce.matches);
    decide();
    reduce.addEventListener("change", decide);
    return () => {
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
        const Bz = (a: number, b: number) => 3 * b - 6 * a;
        const C = (a: number) => 3 * a;
        const calc = (t: number, a: number, b: number) =>
          ((A(a, b) * t + Bz(a, b)) * t + C(a)) * t;
        const slope = (t: number, a: number, b: number) =>
          3 * A(a, b) * t * t + 2 * Bz(a, b) * t + C(a);
        const tForX = (xx: number) => {
          let t = xx;
          for (let i = 0; i < 6; i++) {
            const e = calc(t, p1x, p2x) - xx;
            const d = slope(t, p1x, p2x);
            if (Math.abs(d) < 1e-6) break;
            t -= e / d;
          }
          return t;
        };
        return (xx: number) =>
          xx <= 0 ? 0 : xx >= 1 ? 1 : calc(tForX(xx), p1y, p2y);
      };
      const easeStd = cubicBezier(0.4, 0, 0.2, 1); // the requested premium curve
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
      const smooth = (e0: number, e1: number, x: number) => {
        const t = clamp((x - e0) / (e1 - e0));
        return t * t * (3 - 2 * t);
      };
      const mix3 = (a: number[], b: number[], t: number): number[] => [
        lerp(a[0], b[0], t),
        lerp(a[1], b[1], t),
        lerp(a[2], b[2], t),
      ];
      const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

      /* ── Renderer / scene / camera ── */
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasEl,
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
      });
      const isSmall = window.innerWidth < 768; // phones: lighten GPU load
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 2));
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
      key.shadow.mapSize.set(isSmall ? 1024 : 2048, isSmall ? 1024 : 2048);
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
        for (let i = 0; i < 14000; i++) {
          const r = (120 + Math.random() * 70) | 0;
          const gg = (92 + Math.random() * 48) | 0;
          const b = (52 + Math.random() * 36) | 0;
          x.fillStyle = `rgba(${r},${gg},${b},${Math.random() * 0.09})`;
          x.fillRect(Math.random() * 512, Math.random() * 512, 1.6, 1.6);
        }
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
        x.fillStyle = "#15192b";
        x.font = "800 40px Inter, sans-serif";
        x.textBaseline = "alphabetic";
        x.fillText("ITD GLOBAL", 108, 150);
        x.fillStyle = "#6b6b75";
        x.font = "600 18px Inter, sans-serif";
        x.fillText("MULTI-CARRIER LOGISTICS", 110, 174);
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
        x.strokeStyle = "rgba(26,26,31,0.10)";
        x.lineWidth = 2;
        x.beginPath();
        x.moveTo(108, 196);
        x.lineTo(916, 196);
        x.stroke();
        x.fillStyle = "#6b6b75";
        x.font = "600 22px Inter, sans-serif";
        x.fillText("SHIP TO", 108, 246);
        x.fillStyle = "#1a1a1f";
        x.font = "700 33px Inter, sans-serif";
        x.fillText("Connexx Operations Ltd", 108, 288);
        x.fillStyle = "#4a4a55";
        x.font = "400 24px Inter, sans-serif";
        x.fillText("Unit 4, Trafford Park · Manchester · M17 1AB", 108, 324);
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
        x.fillStyle = "#6b6b75";
        x.font = "600 20px Inter, sans-serif";
        x.fillText("SHIPS VIA ANY CARRIER", 108, 374);
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
      const bottom = panel(W, T, D, kraftMat());
      bottom.position.y = T / 2;
      box.add(bottom);
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
          const sign = kind === "left" ? -1 : 1;
          g.position.set(sign * (W / 2 - T / 2), H, 0);
          mesh.position.set(-sign * (W / 4 - 0.02), 0, 0);
          (g.userData as FlapData) = { axis: "z", sign, max: 1.62 * sign, delay: 0.0 };
        }
        g.add(mesh);
        box.add(g);
        flaps.push(g);
      }
      makeFlap("left");
      makeFlap("right");
      makeFlap("front");
      makeFlap("back");

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

      /* shared box-geometry helper for the set pieces */
      const bg = (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d);

      /* ───────────── ACT 2 — Delivery-van loading bay ───────────── */
      const PIVOT_Z = -1.5; // van centroid → spins in place
      const van = new THREE.Group();
      van.visible = false;
      van.position.z = PIVOT_Z;
      scene.add(van);
      const vanInner = new THREE.Group();
      vanInner.position.z = -PIVOT_Z;
      van.add(vanInner);
      const vanMats: THREE.Material[] = [];
      function vm<M extends THREE.Material>(mat: M, base = 1): M {
        mat.transparent = true;
        mat.opacity = 0;
        mat.userData.base = base;
        vanMats.push(mat);
        return mat;
      }
      const vanPanel = () =>
        vm(new THREE.MeshStandardMaterial({ color: 0xeaeef3, metalness: 0.55, roughness: 0.4 }));
      const vanInnerM = () =>
        vm(new THREE.MeshStandardMaterial({ color: 0xb7bec8, metalness: 0.3, roughness: 0.62 }));
      const vanFloor = vm(
        new THREE.MeshStandardMaterial({ color: 0x6b6f78, metalness: 0.4, roughness: 0.55 }),
      );
      const metalDark = () =>
        vm(new THREE.MeshStandardMaterial({ color: 0x32363d, metalness: 0.85, roughness: 0.42 }));
      const glassMat = () =>
        vm(new THREE.MeshStandardMaterial({ color: 0x10141c, metalness: 0.6, roughness: 0.12 }));
      const rubberMat = () =>
        vm(new THREE.MeshStandardMaterial({ color: 0x14161a, metalness: 0.2, roughness: 0.8 }));
      const hubMat = () =>
        vm(new THREE.MeshStandardMaterial({ color: 0x8b9099, metalness: 0.9, roughness: 0.3 }));
      const chromeMat = () =>
        vm(new THREE.MeshStandardMaterial({ color: 0xc8ccd2, metalness: 0.95, roughness: 0.22 }));
      const tailMat = () =>
        vm(
          new THREE.MeshStandardMaterial({
            color: 0xcc2222,
            emissive: 0x6e1414,
            emissiveIntensity: 0.45,
            roughness: 0.4,
          }),
        );
      function hazardTexture() {
        const c = document.createElement("canvas");
        c.width = 128;
        c.height = 32;
        const x = c.getContext("2d")!;
        x.fillStyle = "#e8a13a";
        x.fillRect(0, 0, 128, 32);
        x.fillStyle = "#1a1a1f";
        for (let i = -32; i < 128; i += 24) {
          x.beginPath();
          x.moveTo(i, 0);
          x.lineTo(i + 12, 0);
          x.lineTo(i + 12 - 32, 32);
          x.lineTo(i - 32, 32);
          x.closePath();
          x.fill();
        }
        const t = new THREE.CanvasTexture(c);
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        t.repeat.set(8, 1);
        return t;
      }
      const hazardTex = hazardTexture();
      const hazardMat = () =>
        vm(new THREE.MeshStandardMaterial({ map: hazardTex.clone(), roughness: 0.55 }));
      function wireTexture() {
        const c = document.createElement("canvas");
        c.width = c.height = 256;
        const x = c.getContext("2d")!;
        x.clearRect(0, 0, 256, 256);
        x.strokeStyle = "#262a30";
        x.lineWidth = 10;
        for (let i = 0; i <= 256; i += 42) {
          x.beginPath();
          x.moveTo(i, 0);
          x.lineTo(i, 256);
          x.stroke();
          x.beginPath();
          x.moveTo(0, i);
          x.lineTo(256, i);
          x.stroke();
        }
        const t = new THREE.CanvasTexture(c);
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        t.repeat.set(2, 2);
        return t;
      }
      const wireTex = wireTexture();
      const wireMat = () =>
        vm(
          new THREE.MeshStandardMaterial({
            color: 0x2a2e34,
            map: wireTex,
            alphaMap: wireTex,
            metalness: 0.7,
            roughness: 0.5,
            side: THREE.DoubleSide,
          }),
        );
      function vMesh(geo: THREE.BufferGeometry, mat: THREE.Material) {
        const m = new THREE.Mesh(geo, mat);
        m.castShadow = true;
        m.receiveShadow = true;
        vanInner.add(m);
        return m;
      }
      // interior shell
      vMesh(bg(3.0, 0.1, 4.9), vanFloor).position.set(0, 0.0, -0.9);
      vMesh(bg(3.0, 0.08, 4.9), vanInnerM()).position.set(0, 2.72, -0.9);
      vMesh(bg(0.08, 2.72, 4.9), vanInnerM()).position.set(-1.5, 1.36, -0.9);
      vMesh(bg(0.08, 2.72, 4.9), vanInnerM()).position.set(1.5, 1.36, -0.9);
      vMesh(bg(3.0, 2.72, 0.08), vanInnerM()).position.set(0, 1.36, -3.32);
      // exterior shell
      vMesh(bg(3.34, 0.12, 5.1), vanPanel()).position.set(0, 2.86, -0.95);
      vMesh(bg(0.14, 2.95, 5.1), vanPanel()).position.set(-1.64, 1.45, -0.95);
      vMesh(bg(0.14, 2.95, 5.1), vanPanel()).position.set(1.64, 1.45, -0.95);
      vMesh(bg(3.34, 2.9, 0.12), vanPanel()).position.set(0, 1.45, -3.55);
      // lower rounded cab
      const cabH = 1.95;
      const cabMidZ = -4.04;
      const cabFrontZ = cabMidZ - 0.98;
      vMesh(bg(3.06, cabH, 1.96), vanPanel()).position.set(0, cabH / 2, cabMidZ);
      vMesh(bg(3.0, 0.16, 1.7), vanPanel()).position.set(0, cabH, cabMidZ);
      const wind = vMesh(bg(2.62, 0.86, 0.05), glassMat());
      wind.position.set(0, cabH - 0.5, cabFrontZ + 0.16);
      wind.rotation.x = -0.34;
      for (const wx of [-0.55, 0.35]) {
        const wp = vMesh(bg(0.04, 0.5, 0.04), metalDark());
        wp.position.set(wx, cabH - 0.66, cabFrontZ + 0.3);
        wp.rotation.z = 0.5;
      }
      vMesh(bg(3.0, 0.95, 0.18), vanPanel()).position.set(0, 0.95, cabFrontZ - 0.02);
      vMesh(bg(2.3, 0.5, 0.06), metalDark()).position.set(0, 1.06, cabFrontZ - 0.12);
      for (const gy of [1.2, 1.06, 0.92])
        vMesh(bg(2.18, 0.05, 0.04), chromeMat()).position.set(0, gy, cabFrontZ - 0.14);
      for (const sx of [-1, 1]) {
        const hl = vMesh(
          bg(0.6, 0.34, 0.14),
          vm(
            new THREE.MeshStandardMaterial({
              color: 0xf2f6ff,
              emissive: 0xfff4d6,
              emissiveIntensity: 0.55,
              metalness: 0.5,
              roughness: 0.2,
            }),
          ),
        );
        hl.position.set(sx * 1.18, 0.72, cabFrontZ - 0.06);
        const ind = vMesh(
          bg(0.22, 0.14, 0.12),
          vm(
            new THREE.MeshStandardMaterial({
              color: 0xe8902a,
              emissive: 0xc8701a,
              emissiveIntensity: 0.4,
              roughness: 0.4,
            }),
          ),
        );
        ind.position.set(sx * 1.42, 0.62, cabFrontZ - 0.04);
      }
      vMesh(bg(3.06, 0.34, 0.3), metalDark()).position.set(0, 0.34, cabFrontZ - 0.06);
      vMesh(
        bg(0.66, 0.22, 0.04),
        vm(new THREE.MeshStandardMaterial({ color: 0xf2f2ee, roughness: 0.6 })),
      ).position.set(0, 0.34, cabFrontZ - 0.22);
      for (const sx of [-1, 1]) {
        vMesh(
          bg(0.03, 1.5, 1.4),
          vm(new THREE.MeshStandardMaterial({ color: 0xdfe4ea, roughness: 0.55 })),
        ).position.set(sx * 1.535, 0.92, cabMidZ - 0.1);
        vMesh(bg(0.04, 0.62, 0.92), glassMat()).position.set(sx * 1.545, cabH - 0.52, cabMidZ - 0.18);
        vMesh(bg(0.04, 0.5, 0.26), glassMat()).position.set(sx * 1.545, cabH - 0.56, cabFrontZ + 0.52);
        vMesh(bg(0.06, 0.08, 0.26), metalDark()).position.set(sx * 1.57, cabH - 0.98, cabMidZ - 0.34);
        const arm = vMesh(bg(0.05, 0.05, 0.34), metalDark());
        arm.position.set(sx * 1.62, cabH - 0.5, cabFrontZ + 0.5);
        const mir = vMesh(
          bg(0.06, 0.42, 0.24),
          vm(new THREE.MeshStandardMaterial({ color: 0x20242c, metalness: 0.5, roughness: 0.3 })),
        );
        mir.position.set(sx * 1.82, cabH - 0.5, cabFrontZ + 0.54);
      }
      for (const sx of [-1, 1]) {
        const s = vMesh(bg(0.03, 0.22, 3.0), hazardMat());
        s.position.set(sx * 1.66, 0.34, -1.4);
      }
      // wheels
      function wheel(wxx: number, wzz: number) {
        const tyre = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.4, 28), rubberMat());
        tyre.rotation.z = Math.PI / 2;
        tyre.position.set(wxx, 0.5, wzz);
        tyre.castShadow = true;
        vanInner.add(tyre);
        const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.42, 20), hubMat());
        rim.rotation.z = Math.PI / 2;
        rim.position.set(wxx, 0.5, wzz);
        vanInner.add(rim);
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.46, 12), metalDark());
        cap.rotation.z = Math.PI / 2;
        cap.position.set(wxx, 0.5, wzz);
        vanInner.add(cap);
        const arch = new THREE.Mesh(new THREE.TorusGeometry(0.66, 0.1, 6, 20, Math.PI), vanPanel());
        arch.position.set(wxx * 0.985, 0.52, wzz);
        arch.rotation.set(0, Math.PI / 2, 0);
        arch.castShadow = true;
        vanInner.add(arch);
      }
      for (const sx of [-1, 1]) {
        wheel(sx * 1.62, -4.0);
        wheel(sx * 1.62, 0.5);
      }
      // rear opening frame
      vMesh(bg(3.5, 0.5, 0.35), vanPanel()).position.set(0, 2.62, 1.6);
      vMesh(bg(3.5, 0.3, 0.4), vanPanel()).position.set(0, -0.02, 1.62);
      // rear barn doors (hinged at the outer edges)
      function buildDoor(sign: number) {
        const g = new THREE.Group();
        g.position.set(sign * 1.5, 1.36, 1.58);
        const doorPanel = new THREE.Mesh(bg(1.46, 2.5, 0.07), vanPanel());
        doorPanel.castShadow = true;
        doorPanel.receiveShadow = true;
        doorPanel.position.set(-sign * 0.73, 0, 0);
        g.add(doorPanel);
        for (const bx2 of [0.46, 0.96]) {
          const bar = new THREE.Mesh(bg(0.05, 2.34, 0.05), metalDark());
          bar.position.set(-sign * bx2, 0, 0.05);
          g.add(bar);
        }
        const hnd = new THREE.Mesh(bg(0.08, 0.36, 0.09), metalDark());
        hnd.position.set(-sign * 0.21, -0.2, 0.07);
        g.add(hnd);
        for (const hy of [0.95, -0.95]) {
          const hg = new THREE.Mesh(bg(0.09, 0.22, 0.12), metalDark());
          hg.position.set(-sign * 1.4, hy, 0.02);
          g.add(hg);
        }
        vanInner.add(g);
        return g;
      }
      const leftDoor = buildDoor(-1);
      const rightDoor = buildDoor(1);
      vMesh(bg(3.24, 0.16, 0.14), metalDark()).position.set(0, 0.1, 1.8);
      const rh = vMesh(bg(3.0, 0.16, 0.04), hazardMat());
      rh.position.set(0, 0.1, 1.88);
      for (const sx of [-1, 1]) {
        const tl = vMesh(bg(0.28, 0.2, 0.06), tailMat());
        tl.position.set(sx * 1.3, 0.16, 1.9);
      }
      vMesh(
        bg(0.62, 0.2, 0.04),
        vm(new THREE.MeshStandardMaterial({ color: 0xf2f2ee, roughness: 0.6 })),
      ).position.set(0, 0.16, 1.92);
      const vanLight = new THREE.PointLight(0xfff1da, 0, 9, 2);
      vanLight.position.set(0, 2.25, -0.4);
      vanInner.add(vanLight);
      // cages packed with parcels
      const smallGeo = bg(0.6, 0.42, 0.48);
      const parcelTints = [0xcda472, 0xd8b483, 0xbe9259].map((col) =>
        vm(new THREE.MeshStandardMaterial({ map: kraft.clone(), color: col, roughness: 0.92 })),
      );
      function addParcel(px: number, py: number, pz: number, ry: number) {
        const m = new THREE.Mesh(smallGeo, parcelTints[(Math.random() * 3) | 0]);
        m.castShadow = true;
        m.receiveShadow = true;
        m.position.set(px, py, pz);
        m.rotation.y = ry;
        vanInner.add(m);
      }
      function makeCage(cx: number, cz: number) {
        const wx = 0.88;
        const dz = 1.06;
        const hy = 1.6;
        vMesh(bg(wx, 0.06, dz), metalDark()).position.set(cx, 0.06, cz);
        for (const sx of [-1, 1])
          for (const sz of [-1, 1])
            vMesh(bg(0.06, hy, 0.06), metalDark()).position.set(cx + (sx * wx) / 2, hy / 2, cz + (sz * dz) / 2);
        vMesh(bg(wx, 0.05, 0.05), metalDark()).position.set(cx, hy, cz - dz / 2);
        vMesh(bg(wx, 0.05, 0.05), metalDark()).position.set(cx, hy, cz + dz / 2);
        vMesh(bg(0.05, 0.05, dz), metalDark()).position.set(cx - wx / 2, hy, cz);
        vMesh(bg(0.05, 0.05, dz), metalDark()).position.set(cx + wx / 2, hy, cz);
        const outerX = cx < 0 ? cx - wx / 2 : cx + wx / 2;
        const side = new THREE.Mesh(new THREE.PlaneGeometry(dz, hy), wireMat());
        side.position.set(outerX, hy / 2, cz);
        side.rotation.y = Math.PI / 2;
        vanInner.add(side);
        for (const sz of [-1, 1]) {
          const end = new THREE.Mesh(new THREE.PlaneGeometry(wx, hy), wireMat());
          end.position.set(cx, hy / 2, cz + (sz * dz) / 2);
          vanInner.add(end);
        }
        addParcel(cx, 0.32, cz - 0.18, 0.1);
        addParcel(cx + 0.04, 0.32, cz + 0.22, -0.14);
        addParcel(cx - 0.02, 0.74, cz + 0.0, 0.06);
        if (Math.random() > 0.4) addParcel(cx + 0.02, 1.16, cz - 0.05, 0.2);
      }
      for (const cz of [-2.5, -1.25, 0.0]) {
        makeCage(-1.0, cz);
        makeCage(1.0, cz);
      }

      /* ───────────── ACT 3 — Cargo aircraft ───────────── */
      const plane = new THREE.Group();
      plane.visible = false;
      scene.add(plane);
      const planeMats: THREE.Material[] = [];
      function pm<M extends THREE.Material>(mat: M, base = 1): M {
        mat.transparent = true;
        mat.opacity = 0;
        mat.userData.base = base;
        planeMats.push(mat);
        return mat;
      }
      const planeWhite = () =>
        pm(new THREE.MeshStandardMaterial({ color: 0xf3f5f8, metalness: 0.45, roughness: 0.42 }));
      const planeMetal = () =>
        pm(new THREE.MeshStandardMaterial({ color: 0xb6c0cb, metalness: 0.85, roughness: 0.32 }));
      const planeAccent = () =>
        pm(new THREE.MeshStandardMaterial({ color: 0x21304f, metalness: 0.35, roughness: 0.48 }));
      const planeGlass = () =>
        pm(new THREE.MeshStandardMaterial({ color: 0x2a3550, metalness: 0.5, roughness: 0.2 }));
      function pMesh(geo: THREE.BufferGeometry, mat: THREE.Material) {
        const m = new THREE.Mesh(geo, mat);
        m.castShadow = true;
        m.receiveShadow = true;
        plane.add(m);
        return m;
      }
      const fuse = pMesh(new THREE.CylinderGeometry(1.05, 1.05, 8.2, 32), planeWhite());
      fuse.rotation.z = Math.PI / 2;
      fuse.position.set(-0.2, 2.1, 0);
      const noseM = pMesh(new THREE.SphereGeometry(1.05, 30, 22), planeWhite());
      noseM.scale.set(1.7, 1, 1);
      noseM.position.set(3.95, 2.1, 0);
      const tailCone = pMesh(new THREE.ConeGeometry(1.05, 3.0, 32), planeWhite());
      tailCone.rotation.z = Math.PI / 2;
      tailCone.position.set(-5.3, 2.5, 0);
      for (let i = 0; i < 13; i++) {
        const win = pMesh(new THREE.BoxGeometry(0.16, 0.22, 0.05), planeGlass());
        win.position.set(3.0 - i * 0.6, 2.32, 1.03);
      }
      const ckpt = [
        { x: 4.02, y: 2.74, z: 0.82 },
        { x: 4.3, y: 2.7, z: 0.8 },
        { x: 4.56, y: 2.64, z: 0.74 },
      ];
      for (const cc of ckpt) {
        const w = pMesh(new THREE.BoxGeometry(0.2, 0.26, 0.06), planeGlass());
        w.position.set(cc.x, cc.y, cc.z + 0.03);
        w.rotation.y = 0.28;
        w.rotation.z = -0.16;
      }
      const windscreen = pMesh(new THREE.BoxGeometry(0.5, 0.2, 1.25), planeGlass());
      windscreen.position.set(4.4, 3.0, 0);
      windscreen.rotation.z = -0.5;
      const oval = pMesh(new THREE.CylinderGeometry(0.19, 0.19, 0.05, 18), planeGlass());
      oval.rotation.x = Math.PI / 2;
      oval.position.set(2.7, 2.33, 1.04);
      oval.scale.set(0.66, 1, 1.25);
      const finShape = new THREE.Shape();
      finShape.moveTo(0, 0);
      finShape.lineTo(1.55, 2.15);
      finShape.lineTo(2.25, 2.15);
      finShape.lineTo(1.0, 0);
      finShape.closePath();
      const fin = pMesh(new THREE.ExtrudeGeometry(finShape, { depth: 0.16, bevelEnabled: false }), planeAccent());
      fin.rotation.y = Math.PI;
      fin.position.set(-4.0, 2.9, 0.08);
      pMesh(new THREE.BoxGeometry(1.3, 0.13, 3.0), planeAccent()).position.set(-5.1, 2.9, 0);
      const wing = pMesh(new THREE.BoxGeometry(2.3, 0.16, 9.0), planeAccent());
      wing.position.set(-0.4, 1.86, 0);
      wing.rotation.y = 0.16;
      const rootShape = new THREE.Shape();
      rootShape.moveTo(0, 0);
      rootShape.lineTo(1.15, 1.5);
      rootShape.lineTo(1.7, 1.5);
      rootShape.lineTo(0.85, 0);
      rootShape.closePath();
      const wroot = pMesh(new THREE.ExtrudeGeometry(rootShape, { depth: 0.14, bevelEnabled: false }), planeAccent());
      wroot.rotation.y = Math.PI;
      wroot.position.set(-0.2, 2.0, 0.07);
      for (const ex of [0.4, -1.25]) {
        const eng = pMesh(new THREE.CylinderGeometry(0.44, 0.5, 1.5, 24), planeMetal());
        eng.rotation.z = Math.PI / 2;
        eng.position.set(ex, 1.2, 1.4);
        const intake = pMesh(new THREE.TorusGeometry(0.45, 0.09, 12, 26), planeAccent());
        intake.rotation.y = Math.PI / 2;
        intake.position.set(ex + 0.78, 1.2, 1.4);
        pMesh(new THREE.BoxGeometry(0.42, 0.6, 0.12), planeMetal()).position.set(ex - 0.1, 1.62, 1.4);
      }
      const cargoDoor = new THREE.Group();
      cargoDoor.position.set(1.5, 3.05, 1.02);
      const cdoorPanel = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.4, 0.08), planeWhite());
      cdoorPanel.castShadow = true;
      cdoorPanel.position.set(0, -0.7, 0);
      cargoDoor.add(cdoorPanel);
      plane.add(cargoDoor);
      const planeLight = new THREE.PointLight(0xfff1da, 0, 7, 2);
      planeLight.position.set(1.5, 2.1, 0.6);
      plane.add(planeLight);

      /* ───────────── ACT 4 — Container ship ───────────── */
      const ship = new THREE.Group();
      ship.visible = false;
      scene.add(ship);
      const shipMats: THREE.Material[] = [];
      function sm<M extends THREE.Material>(mat: M, base = 1): M {
        mat.transparent = true;
        mat.opacity = 0;
        mat.userData.base = base;
        shipMats.push(mat);
        return mat;
      }
      function corrTexture() {
        const c = document.createElement("canvas");
        c.width = 128;
        c.height = 16;
        const x = c.getContext("2d")!;
        for (let i = 0; i < 128; i += 8) {
          x.fillStyle = (i / 8) % 2 ? "#ffffff" : "#d2d2d2";
          x.fillRect(i, 0, 8, 16);
        }
        const t = new THREE.CanvasTexture(c);
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        t.repeat.set(6, 1);
        return t;
      }
      const corrTex = corrTexture();
      const hullMat = () =>
        sm(new THREE.MeshStandardMaterial({ color: 0x8a2832, metalness: 0.4, roughness: 0.55 }));
      const deckMat = () =>
        sm(new THREE.MeshStandardMaterial({ color: 0x394049, metalness: 0.5, roughness: 0.6 }));
      const superMat = () =>
        sm(new THREE.MeshStandardMaterial({ color: 0xeaedf2, metalness: 0.3, roughness: 0.5 }));
      const shipGlass = () =>
        sm(new THREE.MeshStandardMaterial({ color: 0x12161f, metalness: 0.6, roughness: 0.16 }));
      const contMat = (col: number) =>
        sm(new THREE.MeshStandardMaterial({ color: col, map: corrTex.clone(), metalness: 0.45, roughness: 0.55 }));
      const waterMat = sm(
        new THREE.MeshStandardMaterial({ color: 0x176093, metalness: 0.15, roughness: 0.22 }),
        0.92,
      );
      function shMesh(geo: THREE.BufferGeometry, mat: THREE.Material) {
        const m = new THREE.Mesh(geo, mat);
        m.castShadow = true;
        m.receiveShadow = true;
        ship.add(m);
        return m;
      }
      shMesh(new THREE.BoxGeometry(13, 1.7, 3.4), hullMat()).position.set(0, 0.35, 0);
      shMesh(new THREE.BoxGeometry(2.4, 1.7, 3.4), hullMat()).position.set(7.0, 0.35, 0);
      shMesh(new THREE.BoxGeometry(12.6, 0.22, 3.2), deckMat()).position.set(0, 1.25, 0);
      shMesh(new THREE.BoxGeometry(2.2, 2.8, 2.8), superMat()).position.set(-4.8, 2.75, 0);
      shMesh(new THREE.BoxGeometry(2.26, 0.5, 2.3), shipGlass()).position.set(-4.8, 3.7, 0);
      shMesh(new THREE.BoxGeometry(0.9, 1.2, 0.9), hullMat()).position.set(-5.4, 4.6, 0);
      const contColors = [0x2a6fdb, 0xd98a2b, 0x1f8a5b, 0xb23a48, 0x4a4f57, 0xc9a23a];
      let ci = 0;
      for (const ry of [1.95, 3.15])
        for (const cx of [-3.2, -0.9, 1.4])
          for (const cz of [-0.72, 0.72]) {
            const m = shMesh(
              new THREE.BoxGeometry(2.1, 1.18, 1.3),
              contMat(contColors[ci++ % contColors.length]),
            );
            m.position.set(cx, ry, cz);
          }
      const CONT_X = 3.6;
      const CONT_Y = 1.95;
      const CONT_Z = 0.0;
      const openCont = new THREE.Group();
      openCont.position.set(CONT_X, CONT_Y, CONT_Z);
      ship.add(openCont);
      const ocMat = sm(
        new THREE.MeshStandardMaterial({ color: 0x2a6fdb, map: corrTex.clone(), metalness: 0.45, roughness: 0.55 }),
      );
      function ocPanel(w: number, h: number, d: number, px: number, py: number, pz: number) {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), ocMat);
        m.castShadow = true;
        m.receiveShadow = true;
        m.position.set(px, py, pz);
        openCont.add(m);
      }
      ocPanel(0.08, 1.18, 1.3, -1.05, 0, 0);
      ocPanel(2.1, 0.08, 1.3, 0, 0.59, 0);
      ocPanel(2.1, 0.08, 1.3, 0, -0.59, 0);
      ocPanel(2.1, 1.18, 0.08, 0, 0, -0.65);
      ocPanel(2.1, 1.18, 0.08, 0, 0, 0.65);
      function ocDoor(sign: number) {
        const g = new THREE.Group();
        g.position.set(1.05, 0, sign * 0.65);
        const pnl = new THREE.Mesh(new THREE.BoxGeometry(0.07, 1.18, 0.62), ocMat);
        pnl.castShadow = true;
        pnl.position.set(0, 0, -sign * 0.31);
        g.add(pnl);
        openCont.add(g);
        return g;
      }
      const containerDoorL = ocDoor(1);
      const containerDoorR = ocDoor(-1);
      const water = shMesh(new THREE.PlaneGeometry(120, 120), waterMat);
      water.rotation.x = -Math.PI / 2;
      water.position.y = 0.4;
      water.receiveShadow = true;
      const shipLight = new THREE.PointLight(0x9fd0ff, 0, 30, 2);
      shipLight.position.set(2, 8, 6);
      ship.add(shipLight);

      /* ── Set-piece visibility + overlay helpers ── */
      function showGroup(grp: THREE.Group, mats: THREE.Material[], f: number) {
        const v = clamp(f);
        grp.visible = v > 0.002;
        for (const m of mats) m.opacity = ((m.userData.base as number) ?? 1) * v;
      }
      const showVan = (f: number) => showGroup(van, vanMats, f);
      const showPlane = (f: number) => showGroup(plane, planeMats, f);
      const showShip = (f: number) => showGroup(ship, shipMats, f);
      const hideVan = () => {
        van.visible = false;
        vanLight.intensity = 0;
      };
      const hidePlane = () => {
        plane.visible = false;
        planeLight.intensity = 0;
      };
      const hideShip = () => {
        ship.visible = false;
      };
      const setCopy = (el: HTMLElement | null, v: number) => {
        if (!el) return;
        const c = clamp(v);
        el.style.opacity = String(c);
        el.style.transform = `translate(-50%, ${(1 - c) * 40}px)`;
        el.style.pointerEvents = c > 0.5 ? "auto" : "none";
      };
      const setBackdrop = (sky: number, sea: number) => {
        if (skyEl) skyEl.style.opacity = String(clamp(sky));
        if (seaEl) seaEl.style.opacity = String(clamp(sea));
      };

      /* ── Scroll → progress (robust to layout offset) ── */
      const heroCopy = heroCopyRef.current;
      const skyEl = skyRef.current;
      const seaEl = seaRef.current;
      const act2 = act2Ref.current;
      const act3 = act3Ref.current;
      const act4 = act4Ref.current;

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
        const aspect = w / h;
        camera.aspect = aspect;
        // The set-pieces are wide; on portrait/narrow viewports the horizontal FOV
        // collapses and crops them. Hold the horizontal FOV roughly constant by
        // widening the vertical fov below the desktop reference aspect (clamped).
        const BASE_FOV = 38;
        const BASE_ASPECT = 16 / 10;
        if (aspect < BASE_ASPECT) {
          const hFov = 2 * Math.atan(Math.tan((BASE_FOV * Math.PI) / 360) * BASE_ASPECT);
          camera.fov = Math.min(92, (2 * Math.atan(Math.tan(hFov / 2) / aspect) * 180) / Math.PI);
        } else {
          camera.fov = BASE_FOV;
        }
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

      const B1 = 0.16;
      const B2 = 0.42;
      const B3 = 0.7; // act boundaries (fractions of full scroll)
      const setCam = (px: number, py: number, pz: number, tx: number, ty: number, tz: number) => {
        camera.position.set(px, py, pz);
        camera.lookAt(tx, ty, tz);
      };

      function applyState(p: number) {
        // reset act overlays each frame
        setCopy(act2, 0);
        setCopy(act3, 0);
        setCopy(act4, 0);

        if (p <= B1) {
          // ===== ACT 1 — unbox =====
          const a = clamp(p / B1);
          const e = easeStd(a);
          box.scale.setScalar(lerp(0.62, 1.32, e));
          box.rotation.set(lerp(0.04, -0.02, e), lerp(-0.62, 0.22, e), 0);
          box.position.set(0, lerp(-0.15, 0.02, e), 0);
          const openRaw = smooth(0.46, 1.0, a);
          flaps.forEach((g) => {
            const d = g.userData as FlapData;
            const local = clamp((openRaw - d.delay) / (1 - d.delay));
            const ang = easeStd(local) * d.max;
            if (d.axis === "x") g.rotation.x = ang;
            else g.rotation.z = ang;
          });
          const op = smooth(0.62, 1.0, a);
          const cm = core.material as THREE.MeshStandardMaterial;
          cm.opacity = op;
          cm.emissiveIntensity = op * 0.9;
          (coreEdge.material as THREE.LineBasicMaterial).opacity = op;
          core.position.y = lerp(H * 0.42, H * 0.9, op);
          core.rotation.y = lerp(-0.3, 0.4, op);
          coreLight.intensity = op * 3.2;
          hideVan();
          hidePlane();
          hideShip();
          setBackdrop(0, 0);
          setCam(0, 3.0, 6.2, 0, 1.34, 0);
        } else if (p <= B2) {
          // ===== ACT 2 — re-seal, turn the van, load it =====
          const q = clamp((p - B1) / (B2 - B1));
          const reseal = smooth(0, 0.14, q);
          flaps.forEach((g) => {
            const d = g.userData as FlapData;
            const ang = d.max * (1 - reseal);
            if (d.axis === "x") g.rotation.x = ang;
            else g.rotation.z = ang;
          });
          const cop = 1 - smooth(0, 0.1, q);
          const cm = core.material as THREE.MeshStandardMaterial;
          cm.opacity = cop;
          cm.emissiveIntensity = cop * 0.9;
          (coreEdge.material as THREE.LineBasicMaterial).opacity = cop;
          coreLight.intensity = cop * 3.2;
          core.position.y = H * 0.9;
          const shrink = easeStd(clamp(q / 0.22));
          box.scale.setScalar(lerp(1.32, 0.46, shrink));
          box.rotation.x = 0;
          box.rotation.y = lerp(0.22, 0.0, clamp(q / 0.4));
          const rise = easeStd(clamp(q / 0.2));
          const descend = easeStd(clamp((q - 0.52) / 0.4));
          const bob = q > 0.88 ? Math.sin(((q - 0.88) / 0.12) * Math.PI) * 0.05 : 0;
          const y = q < 0.52 ? lerp(0.02, 4.8, rise) : lerp(4.8, 0.34, descend);
          const z = q < 0.52 ? 2.3 * rise : lerp(2.3, 0.7, descend);
          box.position.set(0, y - bob, z);
          showVan(smooth(0.04, 0.14, q));
          hidePlane();
          hideShip();
          setBackdrop(0, 0);
          const turn = easeStd(smooth(0.18, 0.46, q));
          van.rotation.y = lerp(Math.PI, 0, turn);
          const doorOpen = easeStd(smooth(0.48, 0.72, q)) * 2.0;
          leftDoor.rotation.y = doorOpen;
          rightDoor.rotation.y = -doorOpen;
          vanLight.intensity = smooth(0.45, 0.95, q) * 2.6;
          const backF = smooth(0, 0.3, q);
          const peer = smooth(0.8, 1.0, q);
          setCam(
            0,
            lerp(3.0, 2.7, backF) - peer * 0.5,
            lerp(6.2, 11.0, backF) - peer * 1.8,
            0,
            lerp(1.34, 1.3, backF) - peer * 0.2,
            -1.0 * backF + peer * 1.2,
          );
          setCopy(act2, smooth(0.7, 0.84, q));
        } else if (p <= B3) {
          // ===== ACT 3 — inside the lorry, then load the plane =====
          const q = clamp((p - B2) / (B3 - B2));
          flaps.forEach((g) => {
            const d = g.userData as FlapData;
            if (d.axis === "x") g.rotation.x = 0;
            else g.rotation.z = 0;
          });
          van.rotation.y = 0;
          leftDoor.rotation.y = 2.0;
          rightDoor.rotation.y = -2.0;
          const vanFade = 1 - smooth(0.32, 0.46, q);
          showVan(vanFade);
          vanLight.intensity = vanFade * 2.6;
          showPlane(smooth(0.4, 0.5, q));
          hideShip();
          planeLight.intensity = smooth(0.56, 0.74, q) * 2.4;
          cargoDoor.rotation.x = -easeStd(smooth(0.5, 0.7, q)) * 1.5 * (1 - smooth(0.9, 1.0, q));
          box.scale.setScalar(0.46);
          box.rotation.set(0, 0, 0);
          const travel = easeStd(clamp((q - 0.4) / 0.5));
          const inT = clamp((travel - 0.82) / 0.18);
          let bx = lerp(0, 1.5, travel);
          let by = lerp(0.34, 2.4, travel);
          let bz = lerp(0.4, 1.02, Math.min(travel / 0.85, 1));
          bx = lerp(bx, 1.5, inT);
          by = lerp(by, 2.1, inT);
          bz = lerp(bz, 0.0, inT);
          box.position.set(bx, by, bz);
          box.scale.setScalar(0.46 * (1 - inT * 0.6));
          const inP = smooth(0.02, 0.16, q);
          const outP = smooth(0.32, 0.52, q);
          let cp = [0, 2.2, 9.2];
          let ct = [0, 1.1, 0.2];
          cp = mix3(cp, [0, 1.4, 1.0], inP);
          ct = mix3(ct, [0, 1.1, -2.2], inP);
          cp = mix3(cp, [1.0, 3.0, 14.0], outP);
          ct = mix3(ct, [0.4, 2.1, 0], outP);
          setCam(cp[0], cp[1], cp[2], ct[0], ct[1], ct[2]);
          setBackdrop(smooth(0.4, 0.58, q), 0);
          setCopy(act3, smooth(0.64, 0.8, q) * (1 - smooth(0.95, 1.0, q)));
        } else {
          // ===== ACT 4 — to the ship, inside a container =====
          const q = clamp((p - B3) / (1 - B3));
          hideVan();
          const planeFade = 1 - smooth(0.0, 0.16, q);
          showPlane(planeFade);
          cargoDoor.rotation.x = 0;
          planeLight.intensity = 0;
          showShip(smooth(0.1, 0.22, q));
          shipLight.intensity = smooth(0.2, 0.4, q) * 1.4;
          const cont = easeStd(smooth(0.16, 0.4, q)) * (1 - smooth(0.74, 0.92, q));
          containerDoorL.rotation.y = cont * 1.7;
          containerDoorR.rotation.y = -cont * 1.7;
          box.scale.setScalar(0.46);
          box.rotation.set(0, 0, 0);
          const travel = easeStd(clamp((q - 0.2) / 0.56));
          const inT = clamp((travel - 0.8) / 0.2);
          let bx = lerp(0.0, CONT_X + 1.4, travel);
          const by = lerp(4.4, CONT_Y, travel);
          const bz = 0;
          bx = lerp(bx, CONT_X, inT);
          box.position.set(bx, by, bz);
          box.scale.setScalar(0.46 * (1 - inT * 0.65));
          ship.position.x = -smooth(0.9, 1.0, q) * 2.0;
          const toShip = smooth(0.0, 0.22, q);
          const cp = mix3([1.0, 3.0, 14.0], [1.0, 4.2, 17.0], toShip);
          const ct = mix3([0.4, 2.1, 0], [0, 1.7, 0], toShip);
          setCam(cp[0], cp[1], cp[2], ct[0], ct[1], ct[2]);
          setBackdrop(1 - smooth(0.1, 0.34, q), smooth(0.12, 0.34, q));
          setCopy(act4, smooth(0.46, 0.62, q));
        }

        // hero copy + scroll cue (over full p)
        if (heroCopy) {
          const heroOut = smooth(0.0, 0.12, p);
          heroCopy.style.opacity = String(1 - heroOut);
          heroCopy.style.transform = `translateY(${-heroOut * 60}px) scale(${1 - heroOut * 0.04})`;
          heroCopy.style.filter = `blur(${heroOut * 4}px)`;
          heroCopy.style.pointerEvents = heroOut > 0.5 ? "none" : "auto";
        }
      }

      /* ── Render loop ── */
      let raf = 0;
      function renderAt(p: number) {
        applyState(p);
        renderer.render(scene, camera);
      }
      function tick() {
        current = reduceMotion ? target : lerp(current, target, 0.1);
        if (Math.abs(current - target) < 0.0002) current = target;
        renderAt(current);
        raf = requestAnimationFrame(tick);
      }
      if (reduceMotion) {
        current = target = 0;
        renderAt(0);
      }
      tick();

      // Debug-only: pin an exact progress state (bypasses scroll + damping).
      (window as unknown as { __setProgress?: (p: number) => void }).__setProgress = (
        pv: number,
      ) => {
        current = target = clamp(pv);
        renderAt(current);
      };

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        scene.traverse((o) => {
          const m = o as THREE.Mesh;
          if (m.geometry) m.geometry.dispose();
          const mat = m.material;
          const mats = Array.isArray(mat) ? mat : mat ? [mat] : [];
          for (const mm of mats) {
            const standard = mm as THREE.MeshStandardMaterial;
            standard.map?.dispose();
            standard.alphaMap?.dispose();
            mm.dispose();
          }
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
    <div ref={trackRef} className="relative" style={{ height: "1000vh" }}>
      <div className="hero-bg sticky top-0 h-screen overflow-hidden">
        {/* Sky / sea backdrops (fade in for air / sea acts) */}
        <div
          ref={skyRef}
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{
            background:
              "linear-gradient(180deg, #bcdcf2 0%, #e4f1fb 55%, #f2f8fd 100%)",
          }}
          aria-hidden
        />
        <div
          ref={seaRef}
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{
            background:
              "linear-gradient(180deg, #cbe6f4 0%, #9cc4de 50%, #6fa6c6 100%)",
          }}
          aria-hidden
        />
        <div
          className="bg-noise pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply"
          aria-hidden
        />

        {/* WebGL scene canvas */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden
        />

        {/* Act 1 — headline + CTAs (fade out as the unbox begins) */}
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

        {/* Acts 2-4 — shipping-type card overlays (van / plane / ship) */}
        <ActOverlay act={ACTS[0]} forwardRef={act2Ref} />
        <ActOverlay act={ACTS[1]} forwardRef={act3Ref} />
        <ActOverlay act={ACTS[2]} forwardRef={act4Ref} />
      </div>
    </div>
  );
}

/* ─────────────────────  Act overlay (card content per scroll state)  ───────────────────── */

function ActOverlay({
  act,
  forwardRef,
}: {
  act: (typeof ACTS)[number];
  forwardRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={forwardRef}
      className="absolute z-20 text-center will-change-[transform,opacity]"
      style={{
        left: "50%",
        top: "14vh",
        width: "min(820px, 90vw)",
        transform: "translate(-50%, 40px)",
        opacity: 0,
        pointerEvents: "none",
      }}
    >
      <h2 className="text-display-md text-text-primary">{act.title}</h2>
      <p className="mx-auto mt-4 max-w-xl text-body-lg text-text-secondary">
        {act.body}
      </p>
      <div className="mt-6 inline-flex">
        <Button href={act.href} variant="primary">
          Explore
        </Button>
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
