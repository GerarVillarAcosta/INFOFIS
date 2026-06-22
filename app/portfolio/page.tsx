import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
// import { Quote } from "lucide-react"; // TODO: reactivar cuando haya al menos 1 reseña real
import CircuitBackground from "@/components/CircuitBackground";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio de INFOFIS — Proyectos en camino.",
};

export default function PortfolioPage() {
  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden section bg-alt">
        <CircuitBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero-enter max-w-2xl">
            <p className="section-badge mb-4">Portfolio</p>
            <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tight leading-tight mb-5" style={{ color: "var(--fg)" }}>
              Nuestros Proyectos
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Estamos trabajando en nuestros primeros proyectos. Pronto habrá casos de éxito
              documentados con resultados reales.
            </p>
          </div>
        </div>
      </section>

      {/* Coming soon placeholder */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal mb-12 flex items-center gap-3">
            <Clock size={18} className="neon" />
            <p className="font-display font-semibold text-lg" style={{ color: "var(--fg-muted)" }}>
              Primeros proyectos en camino
            </p>
          </div>

          {/* Placeholder grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="surface rounded-2xl overflow-hidden reveal"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {/* Placeholder image area */}
                <div
                  className="w-full h-44 flex items-center justify-center"
                  style={{ backgroundColor: "var(--border)" }}
                >
                  <div className="text-center space-y-2 px-4">
                    <div
                      className="w-8 h-8 rounded-lg mx-auto"
                      style={{ backgroundColor: "rgba(118,185,0,0.2)" }}
                    />
                    <p className="text-xs font-medium neon">Próximamente</p>
                  </div>
                </div>
                {/* Placeholder content */}
                <div className="p-5 space-y-2">
                  <div
                    className="h-4 w-3/4 rounded"
                    style={{ backgroundColor: "var(--border)" }}
                  />
                  <div
                    className="h-3 w-1/2 rounded"
                    style={{ backgroundColor: "var(--border)" }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p
            className="reveal mt-8 text-sm text-center italic"
            style={{ color: "var(--fg-muted)" }}
          >
            Los casos de éxito se publicarán con permiso de los clientes.
          </p>
        </div>
      </section>

      {/* TODO: reactivar cuando haya al menos 1 reseña real */}
      {/*
      const RESENAS = [
        { texto: "...", nombre: "Nombre Apellido", rubro: "Rubro del negocio" },
      ];

      <div className="divider" />

      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal mb-12">
            <p className="section-badge mb-3">Reseñas</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight" style={{ color: "var(--fg)" }}>
              Lo que dicen nuestros clientes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESENAS.map((r, i) => (
              <div key={i} className="surface rounded-2xl p-7 card-hover reveal flex flex-col gap-4">
                <Quote size={20} className="neon opacity-60 shrink-0" />
                <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--fg)" }}>
                  &ldquo;{r.texto}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--fg)" }}>{r.nombre}</p>
                  <p className="text-xs" style={{ color: "var(--fg-muted)" }}>{r.rubro}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* CTA */}
      <section className="section bg-alt">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="reveal">
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight mb-4" style={{ color: "var(--fg)" }}>
              ¿Querés ser de los primeros?
            </h2>
            <p className="text-base mb-8" style={{ color: "var(--fg-muted)" }}>
              Estamos aceptando nuevos proyectos. Tu negocio podría aparecer acá muy pronto.
            </p>
            <Link
              href="/contacto"
              className="btn btn-neon px-8 py-3.5 text-sm rounded-md gap-2"
            >
              Hablar con nosotros
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
