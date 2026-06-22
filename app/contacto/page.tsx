"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MessageCircle, MapPin, ChevronDown, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import CircuitBackground from "@/components/CircuitBackground";

const WEB3FORMS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY"; // TODO: reemplazar con tu clave de Web3Forms

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
    q: "¿Atienden a negocios fuera de Asunción?",
    a: "Sí, trabajamos de forma remota con negocios de todo el país, sin importar la ubicación.",
  },
  {
    q: "¿Qué incluye la automatización de procesos?",
    a: "Analizamos las tareas repetitivas de tu negocio y las automatizamos usando herramientas digitales, para ahorrarte tiempo y reducir costos operativos. Cada automatización se cotiza según el caso.",
  },
];

type FormState = "idle" | "loading" | "success" | "error";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="surface rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-[rgba(118,185,0,0.04)]"
        style={{ color: "var(--fg)" }}
      >
        <span className="font-display font-semibold text-sm">{q}</span>
        <ChevronDown
          size={16}
          className="neon shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 divider pt-3">
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
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Nuevo contacto INFOFIS — ${formData.nombre}`,
          from_name: "INFOFIS Website",
          nombre: formData.nombre,
          empresa: formData.empresa,
          email: formData.email,
          whatsapp: formData.whatsapp,
          tipo_proyecto: formData.tipoProyecto,
          mensaje: formData.mensaje,
        }),
      });
      const data = await res.json();
      if (data.success) {
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
            <p className="text-xs font-semibold uppercase tracking-widest neon mb-4">Contacto</p>
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
                <div className="surface rounded-2xl p-10 text-center space-y-4">
                  <CheckCircle size={36} className="neon mx-auto" />
                  <h3 className="font-display font-bold text-xl" style={{ color: "var(--fg)" }}>
                    ¡Mensaje enviado!
                  </h3>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "var(--fg-muted)" }}
                      >
                        Nombre *
                      </label>
                      <input
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
                      <label
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "var(--fg-muted)" }}
                      >
                        Empresa (opcional)
                      </label>
                      <input
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
                      <label
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "var(--fg-muted)" }}
                      >
                        Email *
                      </label>
                      <input
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
                      <label
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "var(--fg-muted)" }}
                      >
                        WhatsApp / Teléfono *
                      </label>
                      <input
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
                    <label
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      Tipo de proyecto *
                    </label>
                    <select
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
                    <label
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      Mensaje *
                    </label>
                    <textarea
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
                    <p className="text-sm text-red-500">
                      Hubo un error al enviar. Intentá de nuevo o escribinos por WhatsApp.
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
                      href="mailto:infofis@gmail.com.py"
                      className="hover:text-[#76b900] transition-colors"
                    >
                      infofis@gmail.com.py
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-sm" style={{ color: "var(--fg-muted)" }}>
                    <MessageCircle size={16} className="neon shrink-0" />
                    <span>+595 972 767 816</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm" style={{ color: "var(--fg-muted)" }}>
                    <MapPin size={16} className="neon shrink-0 mt-0.5" />
                    <span>Atendemos a todo Paraguay, de forma 100% remota</span>
                  </li>
                </ul>

                <Link
                  href="https://wa.me/595972767816?text=Hola%2C%20me%20interesa%20solicitar%20informaci%C3%B3n%20sobre%20sus%20servicios."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline px-5 py-2.5 text-sm rounded-md gap-2 mt-5 w-full justify-center"
                >
                  Hablar por WhatsApp
                  <ArrowRight size={14} />
                </Link>
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

              <div className="surface rounded-xl p-5">
                <p className="text-xs font-semibold uppercase tracking-wider neon mb-2">Empresa</p>
                <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
                  INFOFIS — Empresa unipersonal registrada en el SET.
                  Emitimos factura legal por todos nuestros servicios.
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
            <p className="text-xs font-semibold uppercase tracking-widest neon mb-3">FAQ</p>
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
