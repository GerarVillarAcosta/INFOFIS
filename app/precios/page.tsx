"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, Check, ChevronDown, Info } from "lucide-react";
import CircuitBackground from "@/components/CircuitBackground";

const FALLBACK_RATE = 7500; // ya es múltiplo de 100

const PLAN_COLORS: Record<string, string> = {
  landing: "#f5c400",
  catalogos: "#0075cf",
  automatizacion: "#e03131",
};

const LANDING_INCLUDES = [
  "Diseño personalizado",
  "Hasta 5 secciones",
  "Formulario de contacto",
  "Integración de WhatsApp",
  "Diseño responsive",
  "SEO on-page básico",
  "Configuración de dominio y hosting",
  "Panel de administración básico",
];

const EXTRAS_LIST = [
  {
    key: "tienda" as const,
    label: "Tienda online",
    price: 80,
    desc: "Incluye carrito de compras, proceso de pago, integración con medios de pago y gestión de stock e inventario.",
  },
  {
    key: "blog" as const,
    label: "Módulo de blog",
    price: 60,
    desc: "Sección de artículos y noticias dentro de tu sitio, indexable por Google — ayuda al posicionamiento orgánico a largo plazo.",
  },
  {
    key: "chatbot" as const,
    label: "Chatbot",
    price: 50,
    desc: "Asistente automatizado integrado en tu sitio que responde consultas frecuentes las 24 horas — horarios, precios, preguntas comunes. Para consultas más específicas, el cliente puede continuar por WhatsApp.",
  },
];

const CATALOGOS_INCLUDES = [
  "Todo lo incluido en Landing Pages",
  "Catálogo de productos con fichas individuales",
  "Motor de búsqueda de productos",
  "Panel de administración completo",
];

const AUTO_INCLUDES = [
  "Diagnóstico del proceso (vía videollamada)",
  "Diseño del flujo de automatización",
  "Implementación y pruebas",
  "Integración con herramientas existentes",
  "Manual de uso básico",
  "Soporte post-entrega por 15 días",
];

const FAQS = [
  {
    q: "¿Por qué los precios están en dólares?",
    a: "Trabajamos con USD como moneda base porque nos permite mantener precios estables independientemente de las fluctuaciones del mercado cambiario. El equivalente en guaraníes es referencial y se actualiza automáticamente con la cotización del día.",
  },
  {
    q: "¿Cómo se calcula el monto en guaraníes?",
    a: "Tomamos la cotización actual del dólar, la redondeamos hacia arriba al múltiplo de Gs. 100 más cercano, y la multiplicamos por el precio en USD. El monto final puede variar al momento de la facturación según el tipo de cambio vigente.",
  },
  {
    q: "¿Qué pasa si necesito algo que no está en los planes?",
    a: "Los planes son una referencia. Si tu proyecto tiene necesidades específicas, podemos armar un presupuesto a medida. Contactanos y lo conversamos.",
  },
  {
    q: "¿Hay costos adicionales de hosting o dominio?",
    a: "El hosting y el dominio son servicios de terceros con costos independientes al desarrollo. Te asesoramos en la elección, pero su contratación y pago es a cargo del cliente.",
  },
  {
    q: "¿Los plugins de WordPress tienen costo adicional?",
    a: "Algunos plugins premium o funcionalidades avanzadas de WooCommerce requieren licencias pagas (anuales o mensuales). Si el proyecto lo requiere, te lo informamos antes de comenzar para que lo consideres en tu presupuesto.",
  },
];

function redondearTasa(tasa: number) {
  return Math.ceil(tasa / 100) * 100;
}

function redondearPYG(monto: number) {
  return Math.round(monto);
}

function formatPYG(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function PreciosPage() {
  const [rate, setRate] = useState<number>(FALLBACK_RATE);
  const [rateFallback, setRateFallback] = useState(false);
  const [rateLoaded, setRateLoaded] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [extras, setExtras] = useState({
    tienda: false, blog: false, chatbot: false,
    hostingLanding: false, hostingCatalogos: false,
  });
  const [openExtra, setOpenExtra] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((r) => r.json())
      .then((data) => {
        const pyg = data?.rates?.PYG;
        if (typeof pyg === "number") {
          setRate(redondearTasa(pyg));
        } else {
          setRateFallback(true);
        }
        setRateLoaded(true);
      })
      .catch(() => {
        setRateFallback(true);
        setRateLoaded(true);
      });
  }, []);

  function pygStr(usd: number) {
    return `≈ Gs. ${formatPYG(redondearPYG(usd * rate))}`;
  }

  const heroColor = hoveredPlan ? PLAN_COLORS[hoveredPlan] : "#76b900";

  const extrasMarked = EXTRAS_LIST.reduce((n, e) => n + (extras[e.key] ? 1 : 0), 0);
  const extrasTotal = EXTRAS_LIST.reduce((sum, e) => sum + (extras[e.key] ? e.price : 0), 0);

  const landingBase = 349;
  const landingTotal = landingBase + (extras.hostingLanding ? 20 : 0);

  const catalogBase = 599;
  const hostingCatalogosPrice = 35 + extrasMarked * 5;
  const catalogTotal = catalogBase + extrasTotal + (extras.hostingCatalogos ? hostingCatalogosPrice : 0);
  const catalogLabel = extrasTotal === 0 && !extras.hostingCatalogos
    ? `Desde USD ${catalogBase}`
    : `USD ${catalogTotal}`;

  const accent = (plan: string) =>
    hoveredPlan === plan ? PLAN_COLORS[plan] : "#76b900";

  return (
    <>
      {/* Hero + Cards — único contenedor con CircuitBackground compartido */}
      <div className="relative overflow-hidden bg-alt">
        <CircuitBackground color={heroColor} />

        {/* Page header */}
        <section className="relative z-10 section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="hero-enter max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest neon mb-4">Precios</p>
              <h1
                className="font-display font-bold text-4xl sm:text-5xl tracking-tight leading-tight mb-5"
                style={{ color: "var(--fg)" }}
              >
                Planes y precios
              </h1>
              <p className="text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                Sin sorpresas ni letra chica. Precios en USD con equivalente en guaraníes
                actualizado automáticamente.
              </p>
            </div>
          </div>
        </section>

        {/* Plan cards */}
        <section className="relative z-10 section" style={{ paddingTop: 0 }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Currency note */}
          {rateLoaded && (
            <p className="text-xs text-center mb-10" style={{ color: "var(--fg-muted)" }}>
              Cotización referencial · 1 USD = Gs. {formatPYG(rate)}
              {rateFallback ? " (cotización aproximada)" : " · Actualizada automáticamente"}
            </p>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* ─── Plan 1: Landing ─────────────────────────── */}
            <div
              className="surface rounded-2xl p-8 flex flex-col gap-6 cursor-default transition-all duration-300"
              style={{
                background: "color-mix(in srgb, var(--card) 82%, transparent)",
                backdropFilter: "blur(2px)",
                borderColor: hoveredPlan === "landing" ? PLAN_COLORS.landing : "var(--border)",
              }}
              onMouseEnter={() => setHoveredPlan("landing")}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-2 transition-colors duration-300"
                  style={{ color: accent("landing") }}
                >
                  Landing Pages
                </p>
                <h3
                  className="font-display font-bold text-xl mb-2"
                  style={{ color: "var(--fg)" }}
                >
                  Páginas de Información
                </h3>
                <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
                  Sitio informativo para presentar tu negocio de forma profesional.
                </p>
              </div>

              <div>
                <p className="font-display font-bold text-3xl" style={{ color: "var(--fg)" }}>
                  USD {landingTotal}
                </p>
                <p className="text-sm mt-1" style={{ color: "var(--fg-muted)" }}>
                  {pygStr(landingTotal)}
                </p>
              </div>

              <ul className="space-y-2.5 flex-1">
                {LANDING_INCLUDES.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm"
                    style={{ color: "var(--fg)" }}
                  >
                    <CheckCircle
                      size={14}
                      className="shrink-0 mt-0.5 transition-colors duration-300"
                      style={{ color: accent("landing") }}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Hosting adicional */}
              <div className="space-y-3">
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-1"
                  style={{ color: "var(--fg-muted)" }}
                >
                  Adicionales opcionales
                </p>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={extras.hostingLanding}
                    onChange={() => setExtras((prev) => ({ ...prev, hostingLanding: !prev.hostingLanding }))}
                  />
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all duration-150"
                    style={{
                      backgroundColor: extras.hostingLanding ? PLAN_COLORS.landing : "transparent",
                      border: `1.5px solid ${extras.hostingLanding ? PLAN_COLORS.landing : "var(--border)"}`,
                    }}
                  >
                    {extras.hostingLanding && <Check size={11} color="#000" />}
                  </div>
                  <span className="text-sm flex-1" style={{ color: "var(--fg)" }}>
                    Hosting mensual
                  </span>
                  <span
                    className="text-sm font-semibold transition-colors duration-300"
                    style={{ color: accent("landing") }}
                  >
                    +USD 20/mes
                  </span>
                </label>
              </div>

              <Link href="/contacto" className="btn btn-neon px-6 py-3 text-sm rounded-md gap-2">
                Solicitar presupuesto
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* ─── Plan 2: Catálogos ───────────────────────── */}
            <div
              className="surface rounded-2xl p-8 flex flex-col gap-6 cursor-default transition-all duration-300"
              style={{
                background: "color-mix(in srgb, var(--card) 82%, transparent)",
                backdropFilter: "blur(2px)",
                borderColor: hoveredPlan === "catalogos" ? PLAN_COLORS.catalogos : "var(--border)",
              }}
              onMouseEnter={() => setHoveredPlan("catalogos")}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-2 transition-colors duration-300"
                  style={{ color: accent("catalogos") }}
                >
                  Catálogos y Tiendas
                </p>
                <h3
                  className="font-display font-bold text-xl mb-2"
                  style={{ color: "var(--fg)" }}
                >
                  Catálogos y Tiendas Online
                </h3>
                <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
                  WordPress + WooCommerce para mostrar y vender tus productos online.
                </p>
              </div>

              <div>
                <p className="font-display font-bold text-3xl" style={{ color: "var(--fg)" }}>
                  {catalogLabel}
                </p>
                <p className="text-sm mt-1" style={{ color: "var(--fg-muted)" }}>
                  {pygStr(catalogTotal)}
                </p>
              </div>

              {/* Qué incluye */}
              <ul className="space-y-2.5">
                {CATALOGOS_INCLUDES.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm"
                    style={{ color: "var(--fg)" }}
                  >
                    <CheckCircle
                      size={14}
                      className="shrink-0 mt-0.5 transition-colors duration-300"
                      style={{ color: accent("catalogos") }}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Configurador */}
              <div className="space-y-2">
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: "var(--fg-muted)" }}
                >
                  Adicionales opcionales
                </p>
                {EXTRAS_LIST.map((extra) => (
                  <div key={extra.key}>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={extras[extra.key]}
                          onChange={() =>
                            setExtras((prev) => ({ ...prev, [extra.key]: !prev[extra.key] }))
                          }
                        />
                        <div
                          className="w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all duration-150"
                          style={{
                            backgroundColor: extras[extra.key] ? PLAN_COLORS.catalogos : "transparent",
                            border: `1.5px solid ${extras[extra.key] ? PLAN_COLORS.catalogos : "var(--border)"}`,
                          }}
                        >
                          {extras[extra.key] && <Check size={11} color="white" />}
                        </div>
                        <span className="text-sm" style={{ color: "var(--fg)" }}>{extra.label}</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setOpenExtra(openExtra === extra.key ? null : extra.key)}
                        className="shrink-0 p-0.5"
                        aria-label={`Más info sobre ${extra.label}`}
                      >
                        <Info
                          size={14}
                          style={{
                            color: openExtra === extra.key ? "#76b900" : "rgba(118,185,0,0.5)",
                            transition: "color 200ms",
                          }}
                        />
                      </button>
                      <span
                        className="text-sm font-semibold shrink-0 transition-colors duration-300"
                        style={{ color: accent("catalogos") }}
                      >
                        +USD {extra.price}
                      </span>
                    </div>
                    <div
                      style={{
                        maxHeight: openExtra === extra.key ? "120px" : "0",
                        overflow: "hidden",
                        transition: "max-height 250ms ease",
                      }}
                    >
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "#a0a0a0", padding: "0.5rem 0 0.5rem 1.75rem" }}
                      >
                        {extra.desc}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Separador + hosting */}
                <div style={{ borderTop: "1px solid var(--border)", marginTop: "0.25rem", paddingTop: "0.75rem" }}>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={extras.hostingCatalogos}
                      onChange={() => setExtras((prev) => ({ ...prev, hostingCatalogos: !prev.hostingCatalogos }))}
                    />
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all duration-150"
                      style={{
                        backgroundColor: extras.hostingCatalogos ? PLAN_COLORS.catalogos : "transparent",
                        border: `1.5px solid ${extras.hostingCatalogos ? PLAN_COLORS.catalogos : "var(--border)"}`,
                      }}
                    >
                      {extras.hostingCatalogos && <Check size={11} color="white" />}
                    </div>
                    <span className="text-sm flex-1" style={{ color: "var(--fg)" }}>Hosting mensual</span>
                    <span
                      className="text-sm font-semibold transition-colors duration-300"
                      style={{ color: accent("catalogos") }}
                    >
                      +USD {hostingCatalogosPrice}/mes
                    </span>
                  </label>
                </div>
              </div>

              {/* Nota costos sostenidos */}
              <div className="flex items-start gap-2.5">
                <Info size={13} className="shrink-0 mt-0.5" style={{ color: "var(--fg-muted)" }} />
                <p className="text-xs italic leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                  Algunos componentes de WordPress pueden requerir licencias o suscripciones de
                  pago. Estos costos son independientes al desarrollo y corren a cargo del cliente.
                </p>
              </div>

              <Link href="/contacto" className="btn btn-neon px-6 py-3 text-sm rounded-md gap-2 mt-auto">
                Solicitar presupuesto
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* ─── Plan 3: Automatización ──────────────────── */}
            <div
              className="surface rounded-2xl p-8 flex flex-col gap-6 cursor-default transition-all duration-300"
              style={{
                background: "color-mix(in srgb, var(--card) 82%, transparent)",
                backdropFilter: "blur(2px)",
                borderColor:
                  hoveredPlan === "automatizacion"
                    ? PLAN_COLORS.automatizacion
                    : "var(--border)",
              }}
              onMouseEnter={() => setHoveredPlan("automatizacion")}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-2 transition-colors duration-300"
                  style={{ color: accent("automatizacion") }}
                >
                  Automatización
                </p>
                <h3
                  className="font-display font-bold text-xl mb-2"
                  style={{ color: "var(--fg)" }}
                >
                  Automatización de Procesos
                </h3>
                <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
                  Cada automatización es una solución a medida. Analizamos tu negocio,
                  identificamos qué procesos se pueden automatizar y te presentamos una
                  cotización personalizada sin costo.
                </p>
              </div>

              <ul className="space-y-2.5 flex-1">
                {AUTO_INCLUDES.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm"
                    style={{ color: "var(--fg)" }}
                  >
                    <CheckCircle
                      size={14}
                      className="shrink-0 mt-0.5 transition-colors duration-300"
                      style={{ color: accent("automatizacion") }}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div>
                <p className="font-display font-bold text-3xl" style={{ color: "var(--fg)" }}>
                  Desde USD 399
                </p>
                <p className="text-sm mt-1" style={{ color: "var(--fg-muted)" }}>
                  {pygStr(399)}
                </p>
                <p className="text-xs italic mt-2" style={{ color: "var(--fg-muted)" }}>
                  El precio final depende del alcance y complejidad del proyecto.
                </p>
              </div>

              <Link
                href="/contacto"
                className="btn btn-neon px-6 py-3 text-sm rounded-md gap-2 mt-auto"
              >
                Solicitar cotización
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <p className="mt-8 text-xs text-center" style={{ color: "var(--fg-muted)" }}>
            Precios expresados en USD. El monto en guaraníes es referencial y puede variar según el
            tipo de cambio vigente al momento de la facturación.
          </p>
        </div>
        </section>
      </div>

      <div className="divider" />

      {/* Hosting block */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="max-w-[720px]"
            style={{
              background: "rgba(118,185,0,0.05)",
              borderLeft: "3px solid #76b900",
              borderRadius: "8px",
              padding: "1.5rem 2rem",
            }}
          >
            <h3
              className="font-display font-bold text-xl mb-4"
              style={{ color: "var(--fg)" }}
            >
              Hosting
            </h3>
            <div className="space-y-3">
              <p className="text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                Para que tu sitio esté disponible en internet necesita un hosting. En INFOFIS te
                asesoramos en la elección y la configuración inicial queda incluida en el
                desarrollo. Si ya contás con uno propio, trabajamos sobre él sin problema.
              </p>
              <p className="text-sm italic leading-relaxed" style={{ color: "#a0a0a0" }}>
                El hosting tiene un costo mensual o anual independiente al del desarrollo. Su
                contratación es opcional y a cargo del cliente.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Forma de pago */}
      <section className="section bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest neon mb-3">Pago</p>
            <h2
              className="font-display font-bold text-3xl sm:text-4xl tracking-tight"
              style={{ color: "var(--fg)" }}
            >
              ¿Cómo se paga?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                pct: "50%",
                label: "Anticipo",
                desc: "Al confirmar el proyecto y antes de comenzar el desarrollo.",
              },
              {
                pct: "30%",
                label: "Revisión",
                desc: "Al presentar el avance para tu revisión y aprobación.",
              },
              {
                pct: "20%",
                label: "Entrega",
                desc: "Al publicar el sitio o activar la automatización.",
              },
            ].map((step, i) => (
              <div
                key={step.label}
                className={`surface rounded-2xl p-7 text-center card-hover reveal reveal-${i + 1}`}
              >
                <p className="font-display font-bold text-4xl neon mb-1">{step.pct}</p>
                <p className="font-display font-semibold text-base mb-2" style={{ color: "var(--fg)" }}>
                  {step.label}
                </p>
                <p className="text-sm" style={{ color: "var(--fg-muted)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* FAQ */}
      <section className="section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest neon mb-3">FAQ</p>
            <h2
              className="font-display font-bold text-3xl sm:text-4xl tracking-tight"
              style={{ color: "var(--fg)" }}
            >
              Preguntas frecuentes
            </h2>
          </div>

          <div className="divide-y" style={{ borderColor: "var(--border)" }}>
            {FAQS.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-4 text-left cursor-pointer"
                >
                  <span
                    className="font-display font-semibold text-sm"
                    style={{ color: "var(--fg)" }}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={16}
                    className="shrink-0 transition-transform duration-200"
                    style={{
                      color: openFaq === i ? "#76b900" : "var(--fg-muted)",
                      transform: openFaq === i ? "rotate(180deg)" : "none",
                    }}
                  />
                </button>
                <div
                  style={{
                    maxHeight: openFaq === i ? "400px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.25s ease",
                  }}
                >
                  <p
                    className="text-sm leading-relaxed pb-4"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ backgroundColor: "var(--card)" }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, #76b900 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2
            className="font-display font-bold text-3xl sm:text-4xl tracking-tight mb-8"
            style={{ color: "var(--fg)" }}
          >
            ¿Tenés dudas sobre qué plan elegir?
          </h2>
          <Link href="/contacto" className="btn btn-neon px-8 py-3.5 text-sm rounded-md gap-2">
            Hablemos
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
