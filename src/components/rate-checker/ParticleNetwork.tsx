"use client";
import { useRef, useEffect, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  seed: number;
  baseAngle: number;
  baseSpeed: number;
}

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const runningRef = useRef(false);
  const lastTimeRef = useRef(0);

  const initParticles = useCallback((w: number, h: number) => {
    const count = Math.min(Math.floor((w * h) / 10000), 90);
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.3 + Math.random() * 0.5;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: Math.random() * 1.5 + 0.8,
        seed: Math.random() * 1000,
        baseAngle: angle,
        baseSpeed: speed,
      });
    }
    particlesRef.current = particles;
  }, []);

  const startLoop = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CONNECTION_DIST = 130;
    const MOUSE_RADIUS = 160;
    const MIN_SPEED = 0.25;
    const MAX_SPEED = 2.0;

    lastTimeRef.current = performance.now();

    const draw = (now: number) => {
      if (!runningRef.current) return;
      const rawDt = (now - lastTimeRef.current) / 16.667; // normalise to ~60fps
      const dt = Math.min(rawDt, 3); // cap to avoid huge jumps after tab switch
      lastTimeRef.current = now;

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      const ps = particlesRef.current;
      const mouse = mouseRef.current;
      const time = now * 0.001;

      for (const p of ps) {
        // Time-based flow: each particle follows a gentle sine-curved path
        const flowAngle = p.baseAngle + Math.sin(time * 0.5 + p.seed) * 0.8;
        const flowX = Math.cos(flowAngle) * p.baseSpeed * 0.4;
        const flowY = Math.sin(flowAngle) * p.baseSpeed * 0.4;

        p.vx += flowX * 0.05 * dt;
        p.vy += flowY * 0.05 * dt;

        // Mouse attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 1) {
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * 0.01 * dt;
          p.vx += dx * force;
          p.vy += dy * force;
        }

        // Gentle damping
        const damping = Math.pow(0.985, dt);
        p.vx *= damping;
        p.vy *= damping;

        // Random jitter
        p.vx += (Math.random() - 0.5) * 0.04 * dt;
        p.vy += (Math.random() - 0.5) * 0.04 * dt;

        // Minimum speed floor — re-kick if too slow
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed < MIN_SPEED) {
          const kickAngle = Math.random() * Math.PI * 2;
          p.vx = Math.cos(kickAngle) * MIN_SPEED * 1.5;
          p.vy = Math.sin(kickAngle) * MIN_SPEED * 1.5;
        }

        // Max speed clamp
        if (speed > MAX_SPEED) {
          const scale = MAX_SPEED / speed;
          p.vx *= scale;
          p.vy *= scale;
        }

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Wrap
        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;
        if (p.y < -5) p.y = h + 5;
        if (p.y > h + 5) p.y = -5;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "hsla(182, 96%, 33%, 0.7)";
        ctx.fill();
      }

      // Connections
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.35;
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = `hsla(182, 96%, 33%, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  const stopLoop = useCallback(() => {
    runningRef.current = false;
    cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      const w = parent.offsetWidth;
      const h = parent.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(w, h);
    };

    resize();

    // ResizeObserver for parent size changes (wizard step transitions)
    let ro: ResizeObserver | null = null;
    const parent = canvas.parentElement;
    if (parent && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => resize());
      ro.observe(parent);
    }
    window.addEventListener("resize", resize);

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleLeave = () => {
      mouseRef.current = { x: -999, y: -999 };
    };
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);

    // Visibility handlers to restart after tab switch / throttling
    const handleVisibility = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        lastTimeRef.current = performance.now();
        startLoop();
      }
    };
    const handleFocus = () => {
      if (!runningRef.current) {
        lastTimeRef.current = performance.now();
        startLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", handleFocus);

    startLoop();

    return () => {
      stopLoop();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", handleFocus);
      if (ro) ro.disconnect();
    };
  }, [initParticles, startLoop, stopLoop]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto"
      style={{ zIndex: 0 }}
    />
  );
}
