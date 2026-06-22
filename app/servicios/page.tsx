import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CircuitBackground from "@/components/CircuitBackground";
import ServiceTabs from "@/components/ServiceTabs";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Conocé en detalle todos los servicios de INFOFIS: sitios rápidos, sitios completos y automatización de procesos para PYMEs del interior de Paraguay.",
};

const STEPS = [
  {
    n: "01",
    title: "Briefing",
    desc: "Nos reunimos para entender tu negocio, tus objetivos y los detalles del proyecto. Esta etapa define el alcance, los plazos y el presupuesto final.",
  },
  {
    n: "02",
    title: "Desarrollo",
    desc: "Con el proyecto confirmado y el anticipo recibido, comenzamos el trabajo. Mantenemos comunicación fluida durante todo el proceso para que estés al tanto del avance.",
  },
  {
    n: "03",
    title: "Revisión",
    desc: "Te presentamos el resultado para que lo revises. En esta etapa podés solicitar ajustes y correcciones hasta que el resultado se ajuste a lo acordado.",
  },
  {
    n: "04",
    title: "Entrega",
    desc: "Publicamos el sitio o activamos la automatización. Hacemos una entrega formal con todo lo que necesitás para operar de forma independiente.",
  },
];

export default function ServiciosPage() {
  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden section bg-alt">
        <CircuitBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero-enter max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest neon mb-4">Servicios</p>
            <h1
              className="font-display font-bold text-4xl sm:text-5xl tracking-tight leading-tight mb-5"
              style={{ color: "var(--fg)" }}
            >
              Nuestros Servicios
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Cada proyecto es diferente. Por eso ofrecemos un enfoque modular: elegís el nivel de
              presencia digital que necesitás hoy y escalás cuando estés listo.
            </p>
          </div>
        </div>
      </section>

      {/* Service tabs + hosting */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest neon mb-3"></p>
            <h2
              className="font-display font-bold text-3xl sm:text-4xl tracking-tight mb-3"
              style={{ color: "var(--fg)" }}
            >
              ¿Qué podemos hacer por tu negocio?
            </h2>
            <p className="text-base" style={{ color: "var(--fg-muted)" }}>
              Elegí el servicio que mejor se adapta a lo que necesitás.
            </p>
          </div>

          <ServiceTabs />
        </div>
      </section>

      <div className="divider" />

      {/* Cómo trabajamos — timeline vertical */}
      <section id="proceso" className="section bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest neon mb-3">Metodología</p>
            <h2
              className="font-display font-bold text-3xl sm:text-4xl tracking-tight"
              style={{ color: "var(--fg)" }}
            >
              Cómo trabajamos
            </h2>
          </div>

          <div className="max-w-2xl">
            {STEPS.map((s, i) => (
              <div key={s.n} className="flex gap-8">
                {/* Node + connector */}
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="w-3.5 h-3.5 rounded-full shrink-0 mt-1"
                    style={{ border: "2px solid #76b900", backgroundColor: "var(--card)" }}
                  />
                  {i < STEPS.length - 1 && (
                    <div
                      className="w-px flex-1 mt-1"
                      style={{ backgroundColor: "rgba(118,185,0,0.3)", minHeight: "3rem" }}
                    />
                  )}
                </div>
                {/* Content */}
                <div className={i < STEPS.length - 1 ? "pb-12" : ""}>
                  <p className="font-display font-bold leading-none neon mb-2" style={{ fontSize: "2rem" }}>
                    {s.n}
                  </p>
                  <p className="font-display font-semibold text-lg mb-2" style={{ color: "var(--fg)" }}>
                    {s.title}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#a0a0a0" }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: "var(--card)" }}>
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
            ¿Listo para digitalizar tu negocio?
          </h2>
          <Link href="/contacto" className="btn btn-neon px-8 py-3.5 text-sm rounded-md gap-2">
            Solicitar presupuesto
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
