import Link from "next/link";
import Image from "next/image";
import CircuitBackground from "@/components/CircuitBackground";
import {
  Zap,
  Globe,
  Settings,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const SERVICES = [
  {
    icon: Zap,
    title: "Landing Pages / Páginas de Información",
    desc: "Sitios informativos de una o varias páginas para presentar tu negocio: quiénes son, qué ofrecen, su equipo, ubicación y datos de contacto.",
    href: "/servicios#rapidos",
  },
  {
    icon: Globe,
    title: "Catálogos y Tiendas Online",
    desc: "Sitios con varias secciones para mostrar tu catálogo completo de productos, con opción de venta online.",
    href: "/servicios#completos",
  },
  {
    icon: Settings,
    title: "Automatización de Procesos",
    desc: "Identificamos tareas repetitivas en tu negocio y las automatizamos para ahorrarte tiempo y reducir costos operativos.",
    href: "/servicios#automatizacion",
  },
];

const STEPS = [
  { n: "01", title: "Briefing",   desc: "Levantamiento de información sobre tu negocio.", img: "/imagenes/step-1.jpeg" },
  { n: "02", title: "Desarrollo", desc: "Construcción del sitio según lo conversado.",     img: "/imagenes/step-2.jpeg" },
  { n: "03", title: "Revisión",   desc: "Ajustes según tu feedback.",                      img: "/imagenes/step-3.jpeg" },
  { n: "04", title: "Entrega",    desc: "Publicación final del sitio.",                    img: "/imagenes/step-4.jpeg" },
];

// TODO: reactivar cuando haya al menos 1 testimonio real
const TESTIMONIALS: { quote: string; author: string }[] = [];

export default function Home() {
  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative flex items-center overflow-hidden">
        <CircuitBackground />

        {/* Decorative neon radial */}
        <div
          className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle at center, #76b900 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-24">
          {/* 50/50 split: text left, mockup right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: headline + buttons */}
            <div className="space-y-8">
              <div className="hero-enter">
                <span
                  className="inline-block text-xs font-semibold tracking-widest uppercase mb-6"
                  style={{
                    color: "#76b900",
                    background: "color-mix(in srgb, var(--bg) 75%, transparent)",
                    border: "1px solid rgba(118,185,0,0.5)",
                    padding: "4px 12px",
                    borderRadius: "999px",
                  }}
                >
                  Desarrollo Web · Paraguay
                </span>
                <h1
                  className="font-display font-bold text-4xl sm:text-5xl xl:text-6xl tracking-tight leading-[1.08]"
                  style={{ color: "var(--fg)" }}
                >
                  Tu negocio,{" "}
                  <span className="neon">online</span>{" "}
                  y automatizado
                  <br />
                  <span style={{ color: "var(--fg-muted)" }}>sin complicaciones.</span>
                </h1>
              </div>

              <p
                className="hero-enter-1 text-base sm:text-lg leading-relaxed max-w-xl"
                style={{ color: "var(--fg-muted)" }}
              >
                Ayudamos a PYMEs y MIPYMEs de Paraguay a tener presencia digital
                profesional y procesos más eficientes, sin importar dónde estén —
                trabajamos 100% de forma remota.
              </p>

              <div className="hero-enter-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contacto"
                  className="btn btn-neon px-6 py-3 text-sm rounded-md gap-2"
                >
                  Solicitar presupuesto
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="https://wa.me/595972767816?text=Hola%2C%20me%20interesa%20solicitar%20informaci%C3%B3n%20sobre%20sus%20servicios."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline px-6 py-3 text-sm rounded-md"
                >
                  Hablar por WhatsApp
                </a>
              </div>
            </div>

            {/* Right: mockup + stats */}
            <div className="hero-enter-3 flex flex-col gap-4">
              {/* Mockup image */}
              <div
                className="w-full aspect-video rounded-2xl border-2 relative overflow-hidden"
                style={{
                  borderColor: "rgba(118,185,0,0.35)",
                  boxShadow: "0 0 40px rgba(118,185,0,0.12), 0 8px 32px rgba(0,0,0,0.2)",
                }}
              >
                <Image
                  src="/imagenes/hero-mockup.jpeg"
                  alt="Mockup de sitio web desarrollado por INFOFIS"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Stats — desktop only */}
              <div className="hidden lg:grid grid-cols-3 gap-3">
                {[
                  { label: "Entrega", value: "1–4 sem." },
                  { label: "Desde",   value: "USD 349"  },
                  { label: "Alcance", value: "Paraguay" },
                ].map((stat) => (
                  <div key={stat.label} className="surface rounded-xl p-4 card-hover text-center">
                    <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--fg-muted)" }}>
                      {stat.label}
                    </p>
                    <p className="font-display font-bold text-lg neon">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES SUMMARY ────────────────────────────────────── */}
      <section className="bg-alt pt-20 pb-10 md:pt-28 md:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest neon mb-3">Servicios</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight" style={{ color: "var(--fg)" }}>
              Lo que hacemos
            </h2>
          </div>

          {/* Bento asymmetric: top row 2/3 + 1/3, bottom full */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1 — Landing Pages */}
            <div className="surface rounded-2xl overflow-hidden card-hover reveal reveal-1 flex flex-col">
              <div className="relative w-full aspect-video">
                <Image
                  src="/imagenes/card-landing.jpeg"
                  alt="Landing pages y páginas informativas"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-between flex-1">
                <div>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                    style={{ backgroundColor: "rgba(118,185,0,0.12)" }}
                  >
                    <Zap size={20} className="neon" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-2" style={{ color: "var(--fg)" }}>
                    Landing Pages / Páginas de Información
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                    Sitios informativos de una o varias páginas para presentar tu negocio: quiénes son,
                    qué ofrecen, su equipo, ubicación y datos de contacto. Ideal si necesitás estar
                    online cuanto antes con toda la información que tu negocio necesita mostrar.
                  </p>
                </div>
                <Link
                  href="/servicios#rapidos"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold neon hover:gap-2.5 transition-all duration-200"
                >
                  Conocer más <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Card 2 — Catálogos */}
            <div className="surface rounded-2xl overflow-hidden card-hover reveal reveal-2 flex flex-col">
              <div className="relative w-full aspect-video">
                <Image
                  src="/imagenes/card-catalogos.jpeg"
                  alt="Catálogos y tiendas online"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-between flex-1">
                <div>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                    style={{ backgroundColor: "rgba(118,185,0,0.12)" }}
                  >
                    <Globe size={20} className="neon" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-2" style={{ color: "var(--fg)" }}>
                    Catálogos y Tiendas Online
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                    Sitios con varias secciones para mostrar tu catálogo completo de productos, con opción de venta online. Ideal si tenés muchos productos o servicios para exhibir.
                  </p>
                </div>
                <Link
                  href="/servicios#completos"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold neon hover:gap-2.5 transition-all duration-200"
                >
                  Conocer más <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Card 3 — Automatización */}
            <div className="surface rounded-2xl overflow-hidden card-hover reveal reveal-3 flex flex-col">
              <div className="relative w-full aspect-video">
                <Image
                  src="/imagenes/card-automatizacion.jpeg"
                  alt="Automatización de procesos"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-between flex-1">
                <div>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                    style={{ backgroundColor: "rgba(118,185,0,0.12)" }}
                  >
                    <Settings size={20} className="neon" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-2" style={{ color: "var(--fg)" }}>
                    Automatización de Procesos
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                    Identificamos tareas repetitivas en tu negocio y las automatizamos para ahorrarte tiempo y reducir costos operativos.
                  </p>
                </div>
                <Link
                  href="/servicios#automatizacion"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold neon hover:gap-2.5 transition-all duration-200"
                >
                  Conocer más <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS SUMMARY ─────────────────────────────────────── */}
      <section className="bg-alt pt-10 pb-20 md:pt-14 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest neon mb-3">Proceso</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight" style={{ color: "var(--fg)" }}>
              Cómo trabajamos
            </h2>
          </div>

          {/* Waterfall diagram */}
          <div className="flex flex-col lg:flex-row items-center gap-0 mb-10">
            {STEPS.flatMap((s, i) => [
              <div
                key={s.n}
                className={`surface rounded-2xl overflow-hidden card-hover reveal reveal-${Math.min(i + 1, 3)} lg:flex-1 self-stretch flex flex-col`}
              >
                {/* Step illustration */}
                <div className="relative w-full aspect-video">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="font-display font-bold text-3xl neon mb-3">{s.n}</p>
                  <p className="font-display font-semibold text-base mb-1" style={{ color: "var(--fg)" }}>
                    {s.title}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                    {s.desc}
                  </p>
                </div>
              </div>,
              i < STEPS.length - 1 ? (
                <div
                  key={`arrow-${i}`}
                  className="flex items-center justify-center py-3 lg:py-0 lg:px-3 shrink-0"
                >
                  <ArrowRight size={20} className="neon rotate-90 lg:rotate-0" />
                </div>
              ) : null,
            ])}
          </div>

          <div className="reveal">
            <Link
              href="/servicios#proceso"
              className="inline-flex items-center gap-2 text-sm font-semibold neon hover:gap-3 transition-all duration-200"
            >
              Ver proceso completo <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS — oculto hasta tener testimonios reales ─────── */}
      {TESTIMONIALS.length > 0 && (
        <section className="section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="reveal mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest neon mb-3">Testimonios</p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight" style={{ color: "var(--fg)" }}>
                Lo que dicen nuestros clientes
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  className={`surface rounded-2xl p-7 card-hover reveal reveal-${i + 1} flex flex-col gap-4`}
                >
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--fg)" }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                    {t.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA FINAL ───────────────────────────────────────────── */}
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
          <div className="reveal">
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight mb-4" style={{ color: "var(--fg)" }}>
              ¿Listo para digitalizar tu negocio?
            </h2>
            <p className="text-base mb-8" style={{ color: "var(--fg-muted)" }}>
              Contanos sobre tu proyecto. Sin compromiso, respondemos en menos de 24 horas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contacto"
                className="btn btn-neon px-8 py-3.5 text-sm rounded-md gap-2"
              >
                Solicitar presupuesto
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/precios"
                className="btn btn-outline px-8 py-3.5 text-sm rounded-md"
              >
                Ver precios
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
