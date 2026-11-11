"use client";

import { useId, useState } from "react";
import { Mail, MapPin, ChevronDown, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import CircuitBackground from "@/components/CircuitBackground";

const FAQS = [
  {
    q: "¿Necesito reunirme en persona?",
    a: "No, todo nuestro proceso de trabajo se realiza de forma remota, mediante videollamadas y formularios. No es necesario coordinar visitas presenciales.",
  },
  {
    q: "¿Cómo es el proceso de pago?",
    a: "Trabajamos con un esquema de 50% de anticipo al confirmar el proyecto, 30% en la etapa de revisión y 20% al momento de la entrega final.",
  },
  {
    q: "¿Cuánto tarda en estar listo mi proyecto?",
    a: "El tiempo estimado varía entre 4 y 6 semanas, según la complejidad y alcance del proyecto.",
  },
  {
    q: "¿Qué diferencia hay entre un Landing Page y un Catálogo o Tienda Online?",
    a: "Un Landing Page es un sitio informativo para presentar tu negocio. Un Catálogo o Tienda Online te permite mostrar y, opcionalmente, vender tus productos directamente desde el sitio.",
  },
  {
    q: "¿Atienden a negocios de otros países?",
    a: "Sí, trabajamos de forma remota con negocios de toda Latinoamérica, sin importar la ubicación.",
  },
  {
    q: "¿Qué incluye la automatización de procesos?",
    a: "Analizamos las tareas repetitivas de tu negocio y las automatizamos usando herramientas digitales, para ahorrarte tiempo y reducir costos operativos. Cada automatización se cotiza según el caso.",
  },
];

type FormState = "idle" | "loading" | "success" | "error";

interface FaqItemProps {
  q: string;
  a: string;
}

function FaqItem({ q, a }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return (
    <div className="surface rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-[rgba(118,185,0,0.04)]"
        style={{ color: "var(--fg)" }}
      >
        <span className="font-display font-semibold text-sm">{q}</span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className="neon shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
        />
      </button>
      {open && (
        <div id={panelId} className="px-6 pb-5 divider pt-3">
          <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            {a}
          </p>
        </div>
      )}
    </div>
  );
}

export default function ContactoPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [honeypot, setHoneypot] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    whatsapp: "",
    tipoProyecto: "",
    mensaje: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("loading");

    try {
      // La validación y el envío a Web3Forms ocurren en el servidor (app/api/contact).
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, website: honeypot }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (res.ok && data.success) {
        setFormState("success");
        setFormData({ nombre: "", empresa: "", email: "", whatsapp: "", tipoProyecto: "", mensaje: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden section bg-alt">
        <CircuitBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero-enter max-w-2xl">
            <p className="section-badge mb-4">Contacto</p>
            <h1
              className="font-display font-bold text-4xl sm:text-5xl tracking-tight leading-tight mb-5"
              style={{ color: "var(--fg)" }}
            >
              Hablemos de tu proyecto
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Contanos qué necesitás y te respondemos con una propuesta a medida.
            </p>
          </div>
        </div>
      </section>

      {/* Form + Contact info */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">

            {/* Form — wider column */}
            <div className="lg:col-span-3 reveal">
              {formState === "success" ? (
                <div role="status" className="surface rounded-2xl p-10 text-center space-y-4">
                  <CheckCircle size={36} className="neon mx-auto" aria-hidden="true" />
                  <h2 className="font-display font-bold text-xl" style={{ color: "var(--fg)" }}>
                    ¡Mensaje enviado!
                  </h2>
                  <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
                    Recibimos tu consulta. Te respondemos en menos de 24 horas.
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="btn btn-outline px-5 py-2 text-sm rounded-md mt-2"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot anti-spam: invisible para personas, los bots lo rellenan */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="c-website">Sitio web (no completar)</label>
                    <input
                      type="text"
                      id="c-website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="c-nombre"
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "var(--fg-muted)" }}
                      >
                        Nombre *
                      </label>
                      <input
                        id="c-nombre"
                        type="text"
                        name="nombre"
                        required
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Tu nombre completo"
                        className="input-base"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="c-empresa"
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "var(--fg-muted)" }}
                      >
                        Empresa (opcional)
                      </label>
                      <input
                        id="c-empresa"
                        type="text"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        placeholder="Nombre de tu negocio"
                        className="input-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="c-email"
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "var(--fg-muted)" }}
                      >
                        Email *
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        className="input-base"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="c-whatsapp"
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "var(--fg-muted)" }}
                      >
                        WhatsApp / Teléfono *
                      </label>
                      <input
                        id="c-whatsapp"
                        type="tel"
                        name="whatsapp"
                        required
                        value={formData.whatsapp}
                        onChange={handleChange}
                        placeholder="+595 9XX XXX XXX"
                        className="input-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="c-tipoProyecto"
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      Tipo de proyecto *
                    </label>
                    <select
                      id="c-tipoProyecto"
                      name="tipoProyecto"
                      required
                      value={formData.tipoProyecto}
                      onChange={handleChange}
                      className="input-base"
                    >
                      <option value="">Seleccioná una opción</option>
                      <option value="landing">Landing Page / Página de Información</option>
                      <option value="catalogo">Catálogo o Tienda Online</option>
                      <option value="automatizacion">Automatización de Procesos</option>
                      <option value="noseguro">No estoy seguro</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="c-mensaje"
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      Mensaje *
                    </label>
                    <textarea
                      id="c-mensaje"
                      name="mensaje"
                      required
                      rows={5}
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="Contanos sobre tu negocio y qué necesitás..."
                      className="input-base resize-none"
                    />
                  </div>

                  {formState === "error" && (
                    <p role="alert" className="text-sm text-red-500">
                      Hubo un error al enviar. Intentá de nuevo o escribinos por correo.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="btn btn-neon w-full py-3 text-sm rounded-md gap-2 disabled:opacity-60"
                  >
                    {formState === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Enviando…
                      </>
                    ) : (
                      <>
                        Enviar mensaje
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact info — narrower column */}
            <div className="lg:col-span-2 reveal reveal-1 space-y-6">
              <div>
                <p
                  className="font-display font-semibold text-sm uppercase tracking-wide mb-4"
                  style={{ color: "var(--fg)" }}
                >
                  Contacto directo
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm" style={{ color: "var(--fg-muted)" }}>
                    <Mail size={16} className="neon shrink-0" />
                    <a
                      href="mailto:infooofis@gmail.com"
                      className="hover:text-[#76b900] transition-colors"
                    >
                      infooofis@gmail.com
                    </a>
                  </li>
                  <li className="flex items-start gap-3 text-sm" style={{ color: "var(--fg-muted)" }}>
                    <MapPin size={16} className="neon shrink-0 mt-0.5" />
                    <span>Atendemos a toda Latinoamérica, de forma 100% remota</span>
                  </li>
                </ul>
              </div>

              <div className="surface rounded-xl p-5">
                <p className="text-xs font-semibold uppercase tracking-wider neon mb-2">
                  Tiempo de respuesta
                </p>
                <p className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                  Menos de 24 horas hábiles
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--fg-muted)" }}>
                  Lunes a viernes, 8:00 – 17:00
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      <div className="divider" />

      {/* FAQ */}
      <section className="section bg-alt">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal mb-10">
            <p className="section-badge mb-3">FAQ</p>
            <h2
              className="font-display font-bold text-3xl sm:text-4xl tracking-tight"
              style={{ color: "var(--fg)" }}
            >
              Preguntas frecuentes
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>

          <p className="reveal mt-12 text-sm text-center" style={{ color: "var(--fg-muted)" }}>
            ¿No encontraste la respuesta que buscabas? Escribinos directamente y te ayudamos.
          </p>
        </div>
      </section>
    </>
  );
}
