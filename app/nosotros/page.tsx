import type { Metadata } from "next";
import Link from "next/link";
import { Eye, Target, Code2, Handshake, MessageCircle, ArrowRight, CheckCircle } from "lucide-react";
import CircuitBackground from "@/components/CircuitBackground";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conocé a INFOFIS: empresa paraguaya especializada en desarrollo web y automatización de procesos para PYMEs y MIPYMEs.",
};

const VALUES = [
  {
    icon: Eye,
    title: "Transparencia",
    desc: "Precios claros, procesos explicados y comunicación honesta en cada etapa del proyecto.",
  },
  {
    icon: Handshake,
    title: "Cercanía",
    desc: "Trato directo, sin intermediarios. Tu proyecto lo manejamos nosotros de principio a fin.",
  },
  {
    icon: Code2,
    title: "Calidad técnica",
    desc: "Usamos herramientas modernas y probadas para garantizar resultados duraderos.",
  },
  {
    icon: Target,
    title: "Enfoque en resultados",
    desc: "No entregamos solo un sitio web. Entregamos una herramienta que trabaja para tu negocio.",
  },
  {
    icon: MessageCircle,
    title: "Honestidad",
    desc: "Si lo que necesitás puede resolverse sin software, o con una solución más simple que la que pediste, te lo decimos. Preferimos orientarte bien antes que venderte algo innecesario.",
  },
];

const DIFFERENTIALS = [
  "Precios modulares y transparentes, sin costos ocultos",
  "Comunicación directa durante todo el proyecto",
  "Atención remota a todo el país, sin necesidad de reuniones presenciales",
  "Soluciones adaptadas a la realidad de las PYMEs paraguayas",
  "Tecnologías modernas con soporte post-entrega",
  "Asesoramiento honesto",
];

export default function NosotrosPage() {
  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden section bg-alt">
        <CircuitBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero-enter max-w-2xl">
            <p className="section-badge mb-4">Empresa</p>
            <h1
              className="font-display font-bold text-4xl sm:text-5xl tracking-tight leading-tight mb-5"
              style={{ color: "var(--fg)" }}
            >
              Sobre INFOFIS
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Empresa paraguaya de desarrollo web y automatización de procesos para PYMEs y
              MIPYMEs de todo el país.
            </p>
          </div>
        </div>
      </section>

      {/* Presentación */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal max-w-3xl space-y-5">
            <p className="text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              INFOFIS es una empresa paraguaya especializada en desarrollo web y automatización de
              procesos para PYMEs y MIPYMEs. Trabajamos de forma 100% remota, lo que nos permite
              atender negocios en cualquier punto del país sin restricciones geográficas.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Creemos que toda empresa, sin importar su tamaño o ubicación, merece tener una
              presencia digital profesional y procesos eficientes. Por eso ofrecemos soluciones
              claras, a medida y con precios transparentes — sin letra chica ni sorpresas.
            </p>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Misión y Visión */}
      <section className="section bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl p-8 reveal card-hover" style={{ backgroundColor: "var(--card)", border: "1px solid rgba(118,185,0,0.15)" }}>
              <p className="section-badge mb-3">Misión</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                Ayudar a las PYMEs y MIPYMEs de Paraguay a digitalizarse de forma accesible, con
                soluciones web y de automatización adaptadas a la realidad de cada negocio.
              </p>
            </div>

            <div className="rounded-2xl p-8 reveal reveal-1 card-hover" style={{ backgroundColor: "var(--card)", border: "1px solid rgba(118,185,0,0.15)" }}>
              <p className="section-badge mb-3">Visión</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                Ser un referente de confianza en desarrollo web y automatización para pequeñas y
                medianas empresas paraguayas, reconocidos por nuestra transparencia, cercanía y
                resultados concretos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Valores */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal mb-12">
            <p className="section-badge mb-3">Valores</p>
            <h2
              className="font-display font-bold text-3xl sm:text-4xl tracking-tight"
              style={{ color: "var(--fg)" }}
            >
              Lo que nos guía
            </h2>
          </div>

          <div className="max-w-2xl">
            {VALUES.map((v, i) => (
              <div key={v.title} className="flex gap-6">
                {/* Node + connector */}
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="w-3.5 h-3.5 rounded-full shrink-0 mt-3"
                    style={{ border: "2px solid #76b900", backgroundColor: "var(--card)" }}
                  />
                  {i < VALUES.length - 1 && (
                    <div
                      className="w-px flex-1 mt-1"
                      style={{ backgroundColor: "rgba(118,185,0,0.3)", minHeight: "2.5rem" }}
                    />
                  )}
                </div>
                {/* Content */}
                <div className={i < VALUES.length - 1 ? "pb-10" : ""}>
                  <div className="flex items-center gap-4 mb-2">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: "rgba(118,185,0,0.1)",
                        border: "1px solid rgba(118,185,0,0.2)",
                      }}
                    >
                      <v.icon size={18} className="neon" />
                    </div>
                    <h3
                      className="font-display font-semibold text-lg"
                      style={{ color: "var(--fg)" }}
                    >
                      {v.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed pl-14" style={{ color: "#a0a0a0" }}>
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ¿Por qué elegir INFOFIS? */}
      <section className="section bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal mb-10">
            <p className="section-badge mb-3">Diferenciales</p>
            <h2
              className="font-display font-bold text-3xl sm:text-4xl tracking-tight"
              style={{ color: "var(--fg)" }}
            >
              ¿Por qué elegir INFOFIS?
            </h2>
          </div>
          <ul className="reveal reveal-1 space-y-3 max-w-2xl">
            {DIFFERENTIALS.map((d) => (
              <li key={d} className="flex items-start gap-3 text-sm" style={{ color: "var(--fg)" }}>
                <CheckCircle size={16} className="neon shrink-0 mt-0.5" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
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
            ¿Querés trabajar con nosotros?
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
