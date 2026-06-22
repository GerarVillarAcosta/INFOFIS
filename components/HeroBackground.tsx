"use client";
// Etapa 1 + 2 + 3 — grilla · pulso viajero · nodos titilantes
// Todo en un único canvas animado con rAF

import { useEffect, useRef } from "react";

const NEON   = "#76b900";
const PERIOD = 5000; // ms — período del pulso
const N_GRID = 24;
const HALF   = 42;   // ° desde vertical → diamantes elongados

// ── Trazos PCB ──────────────────────────────────────────────────────────────
const TRACES: [number, number][][] = [
  [[0.08, 0.22], [0.30, 0.22], [0.30, 0.42]],
  [[0.14, 0.52], [0.14, 0.36], [0.32, 0.36]],
  [[0.62, 0.16], [0.62, 0.38], [0.80, 0.38]],
  [[0.78, 0.24], [0.92, 0.24]],
  [[0.05, 0.58], [0.24, 0.58]],
  [[0.38, 0.30], [0.38, 0.52], [0.54, 0.52]],
  [[0.92, 0.48], [0.70, 0.48], [0.70, 0.62]],
  [[0.12, 0.72], [0.36, 0.72], [0.36, 0.84]],
  [[0.52, 0.78], [0.74, 0.78], [0.74, 0.65]],
  [[0.44, 0.26], [0.56, 0.26]],
];

// ── Nodos titilantes ─────────────────────────────────────────────────────────
// x, y  — posición en fracción del canvas
// d     — offset de fase inicial (s), distribuye el parpadeo entre nodos
// dur   — período de un ciclo completo (s)
// r     — radio base en px
type Node = { x: number; y: number; d: number; dur: number; r: number };

const NODES: Node[] = [
  // Coinciden con waypoints de trazos PCB (titilan sobre los puntos estáticos)
  { x: 0.30, y: 0.22, d: 0.0,  dur: 2.8, r: 3.0 },
  { x: 0.30, y: 0.42, d: 1.5,  dur: 3.5, r: 3.0 },
  { x: 0.62, y: 0.38, d: 0.8,  dur: 2.6, r: 3.0 },
  { x: 0.80, y: 0.38, d: 2.2,  dur: 3.1, r: 2.5 },
  { x: 0.38, y: 0.30, d: 1.1,  dur: 2.9, r: 3.0 },
  { x: 0.38, y: 0.52, d: 0.4,  dur: 3.3, r: 2.5 },
  { x: 0.70, y: 0.62, d: 1.8,  dur: 2.7, r: 2.5 },
  { x: 0.36, y: 0.72, d: 0.6,  dur: 3.0, r: 2.5 },
  { x: 0.74, y: 0.78, d: 2.4,  dur: 2.5, r: 2.5 },
  { x: 0.44, y: 0.26, d: 0.9,  dur: 3.2, r: 2.5 },
  { x: 0.56, y: 0.26, d: 1.7,  dur: 2.8, r: 2.5 },
  // Zona de convergencia del VP (líneas verticales hacia arriba y abajo)
  { x: 0.50, y: 0.53, d: 0.3,  dur: 4.0, r: 4.0 },
  { x: 0.50, y: 0.23, d: 2.0,  dur: 4.2, r: 3.5 },
  // Extremos de trazos en zona alta
  { x: 0.62, y: 0.16, d: 1.3,  dur: 2.9, r: 2.5 },
  { x: 0.14, y: 0.36, d: 0.5,  dur: 3.4, r: 2.5 },
];

// ── Etapa 1: grilla fina + trazos PCB (estático) ────────────────────────────
function drawStatic(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  dark: boolean,
) {
  const vx  = W * 0.50;
  const vy  = H * 0.38;
  const EXT = Math.max(W, H) * 2.5;

  ctx.strokeStyle = NEON;
  ctx.lineWidth   = 0.65;
  ctx.shadowColor = NEON;
  ctx.shadowBlur  = 1.5;
  ctx.globalAlpha = dark ? 0.17 : 0.07;

  for (let i = 0; i <= N_GRID; i++) {
    const deg = (90 - HALF) + 2 * HALF * (i / N_GRID);
    const rad = deg * Math.PI / 180;
    const dx  = Math.cos(rad);
    const dy  = Math.sin(rad);
    ctx.beginPath();
    ctx.moveTo(vx - dx * EXT, vy - dy * EXT);
    ctx.lineTo(vx + dx * EXT, vy + dy * EXT);
    ctx.stroke();
  }

  ctx.lineWidth   = 1.8;
  ctx.lineJoin    = "round";
  ctx.lineCap     = "round";
  ctx.shadowBlur  = 5;
  ctx.globalAlpha = dark ? 0.34 : 0.11;

  for (const pts of TRACES) {
    ctx.beginPath();
    ctx.moveTo(pts[0][0] * W, pts[0][1] * H);
    for (let j = 1; j < pts.length; j++) ctx.lineTo(pts[j][0] * W, pts[j][1] * H);
    ctx.stroke();

    ctx.fillStyle = NEON;
    for (const [fx, fy] of pts) {
      ctx.beginPath();
      ctx.arc(fx * W, fy * H, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.globalAlpha = 1;
  ctx.shadowBlur  = 0;
  ctx.lineCap     = "butt";
  ctx.lineJoin    = "miter";
}

// ── Etapa 2: pulso viajero a lo largo de las líneas ────────────────────────
function drawPulse(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  dark: boolean,
  ts: number,
) {
  const vx   = W * 0.50;
  const vy   = H * 0.38;
  const maxR = Math.min(W * 0.40, H * 0.78);

  const OFFSETS   = [0, 1.7 / 5, 3.4 / 5];
  const peakAlpha = dark ? 0.72 : 0.26;
  const GLOW_HW   = 0.055;

  ctx.lineWidth   = 1.8;
  ctx.shadowColor = NEON;

  for (const offset of OFFSETS) {
    const t     = ((ts / PERIOD + offset) % 1);
    const alpha = peakAlpha * Math.pow(1 - t, 1.1);
    if (alpha < 0.02) continue;

    ctx.shadowBlur = 7 * alpha;

    for (let i = 0; i <= N_GRID; i++) {
      const deg = (90 - HALF) + 2 * HALF * (i / N_GRID);
      const rad = deg * Math.PI / 180;
      const dx  = Math.cos(rad);
      const dy  = Math.sin(rad);

      for (const dir of [1, -1] as const) {
        const ex = vx + dir * dx * maxR;
        const ey = vy + dir * dy * maxR;

        const g  = ctx.createLinearGradient(vx, vy, ex, ey);
        const lo = t - GLOW_HW;
        const hi = t + GLOW_HW;

        g.addColorStop(0, "transparent");
        if (lo > 0.01) g.addColorStop(lo, "transparent");
        g.addColorStop(Math.max(0.001, Math.min(0.999, t)), `rgba(118,185,0,${alpha})`);
        if (hi < 0.99) g.addColorStop(hi, "transparent");
        g.addColorStop(1, "transparent");

        ctx.strokeStyle = g;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.moveTo(vx, vy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      }
    }
  }

  ctx.shadowBlur = 0;
}

// ── Etapa 3: nodos titilantes ────────────────────────────────────────────────
// Cada nodo oscila de forma independiente según su período y fase.
// La oscilación es una sinusoide suave (sin escalón): t = (sin(φ - π/2) + 1) / 2
//
// En el momento de máximo brillo el radio crece (×1.5) y el shadowBlur aumenta,
// replicando el nodePulse del ANIMATION_SPEC con escala y halo.
//
function drawNodes(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  dark: boolean,
  ts: number,
) {
  ctx.shadowColor = NEON;

  for (const n of NODES) {
    const nx = n.x * W;
    const ny = n.y * H;

    // t ∈ [0, 1]: 0 = apagado, 1 = máximo brillo
    const phase = ((ts / (n.dur * 1000) + n.d / n.dur) % 1) * Math.PI * 2;
    const t     = (Math.sin(phase - Math.PI / 2) + 1) / 2;

    const alpha = (dark ? 0.10 : 0.06) + (dark ? 0.78 : 0.30) * t;
    const r     = n.r * (0.85 + 0.65 * t);     // escala 0.85× → 1.5×

    ctx.shadowBlur  = 2 + 13 * t;               // halo crece con el brillo
    ctx.fillStyle   = NEON;
    ctx.globalAlpha = alpha;

    ctx.beginPath();
    ctx.arc(nx, ny, r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.shadowBlur  = 0;
  ctx.globalAlpha = 1;
}

// ── Componente ───────────────────────────────────────────────────────────────
export default function HeroBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      // Bug fix: en modo estático el ResizeObserver también tiene que redibujar,
      // porque cambiar canvas.width/height borra el contenido.
      const renderStatic = () => {
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        if (canvas.width > 0 && canvas.height > 0) {
          const dark = document.documentElement.classList.contains("dark");
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          drawStatic(ctx, canvas.width, canvas.height, dark);
        }
      };
      renderStatic();

      const ro = new ResizeObserver(renderStatic);
      ro.observe(canvas);

      // Re-render si el usuario cambia el tema (dark ↔ light)
      const mo = new MutationObserver(renderStatic);
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

      return () => { ro.disconnect(); mo.disconnect(); };
    }

    // ── Animación completa (sin prefers-reduced-motion) ──────────────────────
    const setSize = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      if (W === canvas.width && H === canvas.height) return;
      canvas.width  = W;
      canvas.height = H;
    };

    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(canvas);

    let animId: number;

    const animate = (ts: number) => {
      const { width: W, height: H } = canvas;
      if (W > 0 && H > 0) {
        const dark = document.documentElement.classList.contains("dark");
        ctx.clearRect(0, 0, W, H);
        drawStatic(ctx, W, H, dark);    // Etapa 1
        drawPulse(ctx, W, H, dark, ts); // Etapa 2
        drawNodes(ctx, W, H, dark, ts); // Etapa 3
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return (
    <>
      {/* Canvas: grilla + pulso + nodos (máscara desvanece los bordes) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(ellipse 88% 78% at 50% 40%, black 30%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 88% 78% at 50% 40%, black 30%, transparent 90%)",
        }}
      >
        <canvas ref={ref} className="absolute inset-0 w-full h-full" />
      </div>

      {/* Glow central CSS — wrapper controla opacidad en light mode */}
      <div className="hero-pulse-wrapper absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hero-pulse-core" />
      </div>
    </>
  );
}
