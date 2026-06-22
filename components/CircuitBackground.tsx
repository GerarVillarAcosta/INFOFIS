"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const NODES: Node[] = [
  { x: 8,  y: 15, size: 3, duration: 3.2, delay: 0.0, opacity: 0.9 },
  { x: 22, y: 72, size: 4, duration: 4.5, delay: 1.1, opacity: 0.8 },
  { x: 38, y: 28, size: 3, duration: 2.8, delay: 0.7, opacity: 1.0 },
  { x: 55, y: 85, size: 5, duration: 5.1, delay: 2.3, opacity: 0.7 },
  { x: 68, y: 18, size: 3, duration: 3.7, delay: 0.4, opacity: 0.9 },
  { x: 82, y: 55, size: 4, duration: 4.2, delay: 1.8, opacity: 0.8 },
  { x: 91, y: 30, size: 3, duration: 2.6, delay: 3.1, opacity: 1.0 },
  { x: 15, y: 88, size: 4, duration: 4.8, delay: 0.9, opacity: 0.7 },
  { x: 47, y: 50, size: 6, duration: 3.9, delay: 2.0, opacity: 1.0 },
  { x: 73, y: 78, size: 3, duration: 5.3, delay: 1.5, opacity: 0.8 },
  { x: 30, y: 45, size: 4, duration: 3.4, delay: 3.8, opacity: 0.9 },
  { x: 88, y: 88, size: 3, duration: 4.1, delay: 0.3, opacity: 0.7 },
];

interface Props {
  color?: string;
}

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

export default function CircuitBackground({ color = "#76b900" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rgb = hexToRgb(color);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const nodes = containerRef.current?.querySelectorAll<HTMLElement>(".cb-node");
        const pulse = containerRef.current?.querySelector<HTMLElement>(".cb-pulse");
        const state = entry.isIntersecting ? "running" : "paused";
        nodes?.forEach((n) => (n.style.animationPlayState = state));
        if (pulse) pulse.style.animationPlayState = state;
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .cb-node, .cb-pulse { animation: none !important; }
        }
        @keyframes cb-flicker {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 1; }
        }
        @keyframes cb-pulse {
          0% { opacity: 0.06; transform: scale(0.85); }
          100% { opacity: 0.32; transform: scale(1.2); }
        }
        .cb-node {
          position: absolute;
          border-radius: 50%;
          animation: cb-flicker var(--dur) ease-in-out var(--delay) infinite;
          transition: background 400ms ease, box-shadow 400ms ease;
        }
        .cb-pulse {
          position: absolute;
          inset: -20% -20%;
          border-radius: 50%;
          animation: cb-pulse 5s ease-in-out infinite alternate;
          transform-origin: center center;
          pointer-events: none;
        }
      `}</style>

      <div
        ref={containerRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        {/* BASE GRID */}
        <svg
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            inset: 0,
            transform: "perspective(900px) rotateX(22deg) scale(1.15)",
            transformOrigin: "50% 40%",
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="circuit-tile"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="0" x2="80" y2="80"
                style={{ stroke: color, strokeWidth: 0.5, strokeOpacity: 0.18, transition: "stroke 400ms ease" }} />
              <line x1="80" y1="0" x2="0" y2="80"
                style={{ stroke: color, strokeWidth: 0.5, strokeOpacity: 0.18, transition: "stroke 400ms ease" }} />
              <line x1="0" y1="40" x2="80" y2="40"
                style={{ stroke: color, strokeWidth: 0.4, strokeOpacity: 0.10, transition: "stroke 400ms ease" }} />
              <line x1="40" y1="0" x2="40" y2="80"
                style={{ stroke: color, strokeWidth: 0.4, strokeOpacity: 0.10, transition: "stroke 400ms ease" }} />
              <path d="M10 70 L10 50 L30 50"
                style={{ stroke: color, strokeWidth: 0.6, strokeOpacity: 0.22, fill: "none", strokeLinecap: "round", transition: "stroke 400ms ease" }} />
              <path d="M70 10 L70 30 L50 30"
                style={{ stroke: color, strokeWidth: 0.6, strokeOpacity: 0.22, fill: "none", strokeLinecap: "round", transition: "stroke 400ms ease" }} />
              <circle cx="40" cy="40" r="1.2"
                style={{ fill: color, fillOpacity: 0.35, transition: "fill 400ms ease" }} />
              <circle cx="0"  cy="0"  r="1.0"
                style={{ fill: color, fillOpacity: 0.25, transition: "fill 400ms ease" }} />
              <circle cx="80" cy="80" r="1.0"
                style={{ fill: color, fillOpacity: 0.25, transition: "fill 400ms ease" }} />
              <circle cx="80" cy="0"  r="1.0"
                style={{ fill: color, fillOpacity: 0.25, transition: "fill 400ms ease" }} />
              <circle cx="0"  cy="80" r="1.0"
                style={{ fill: color, fillOpacity: 0.25, transition: "fill 400ms ease" }} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-tile)" />
        </svg>

        {/* VIGNETTE */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.72) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* PULSE */}
        <div
          className="cb-pulse"
          style={{
            background: `radial-gradient(ellipse at 50% 45%, rgba(${rgb}, 0.55) 0%, transparent 55%)`,
          }}
        />

        {/* NODES */}
        {NODES.map((n, i) => (
          <div
            key={i}
            className="cb-node"
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              width: `${n.size}px`,
              height: `${n.size}px`,
              ["--dur" as string]: `${n.duration}s`,
              ["--delay" as string]: `${n.delay}s`,
              opacity: n.opacity,
              background: color,
              boxShadow: `0 0 8px 3px rgba(${rgb}, 0.7)`,
            }}
          />
        ))}

        {/* FADE INFERIOR */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "120px",
            background: "linear-gradient(to bottom, transparent, var(--bg))",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      </div>
    </>
  );
}
