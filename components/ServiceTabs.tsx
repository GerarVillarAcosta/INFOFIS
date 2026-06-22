"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

interface Paragraph {
  text: string;
  italic?: boolean;
}

interface Tab {
  id: string;
  label: string;
  paragraphs: Paragraph[];
}

const TABS: Tab[] = [
  {
    id: "landing",
    label: "Landing Pages / Páginas de Información",
    paragraphs: [
      {
        text: "Tener presencia en internet ya no es opcional para un negocio. Una página web bien diseñada es la primera impresión que reciben tus clientes potenciales — y muchas veces, la que define si te contactan o siguen buscando.",
      },
      {
        text: "En INFOFIS desarrollamos sitios informativos de una o varias páginas, adaptados a la identidad y necesidades de cada negocio. Desde una página de presentación simple hasta un sitio con secciones de servicios, galería, equipo y contacto — todo con diseño responsive, formulario de contacto funcional, integración de WhatsApp y optimización básica para que Google pueda encontrarte.",
      },
      {
        text: "El resultado es un sitio profesional, rápido y fácil de administrar, que representa bien a tu negocio las 24 horas del día.",
      },
    ],
  },
  {
    id: "catalogos",
    label: "Catálogos y Tiendas Online",
    paragraphs: [
      {
        text: "Si tu negocio tiene productos para mostrar o vender, necesitás algo más que una página de presentación. Un catálogo o tienda online bien organizada le da a tus clientes la posibilidad de explorar lo que ofrecés, ver fotos, precios y detalles — y comprar directamente desde su celular o computadora.",
      },
      {
        text: "Desarrollamos tiendas y catálogos digitales con WordPress y WooCommerce: plataformas robustas, fáciles de administrar y preparadas para crecer con tu negocio. Podés gestionar tus productos, pedidos y clientes desde un panel propio, sin depender de marketplaces ni pagar comisiones a terceros.",
      },
      {
        text: "Nota: el desarrollo incluye la plataforma digital completa. Los servicios de logística, envío y entrega de productos son responsabilidad del negocio y no forman parte de nuestro alcance.",
        italic: true,
      },
    ],
  },
  {
    id: "automatizacion",
    label: "Automatización de Procesos",
    paragraphs: [
      {
        text: "Muchos negocios pierden horas valiosas en tareas que se repiten todos los días: responder las mismas preguntas, registrar pedidos manualmente, enviar recordatorios, copiar datos de un sistema a otro. Ese tiempo tiene un costo real.",
      },
      {
        text: "En INFOFIS analizamos cómo trabaja tu negocio e identificamos qué procesos se pueden automatizar. Luego los conectamos usando herramientas digitales para que sucedan solos, sin intervención manual — liberando tiempo de tu equipo para lo que realmente importa. Todo el proceso se hace de forma remota, con acompañamiento desde el diagnóstico hasta la entrega.",
      },
    ],
  },
];

export default function ServiceTabs() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <>
      <style>{`
        @keyframes tabFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tab-content { animation: none !important; }
        }
      `}</style>

      {/* Tab bar */}
      <div
        className="flex overflow-x-auto border-b"
        style={{ borderColor: "var(--border)" }}
      >
        {TABS.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActive(i)}
            className={`shrink-0 px-5 py-3.5 text-sm font-display font-semibold whitespace-nowrap transition-colors duration-150 cursor-pointer ${
              i === active
                ? "bg-[#76b900] text-black"
                : "bg-transparent text-[#a0a0a0] hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div
        key={active}
        className="tab-content pt-10 max-w-[720px]"
        style={{ animation: "tabFadeIn 0.2s ease both" }}
      >
        <h2
          className="font-display font-bold text-3xl sm:text-4xl tracking-tight mb-6"
          style={{ color: "var(--fg)" }}
        >
          {tab.label}
        </h2>

        <div className="space-y-4">
          {tab.paragraphs.map((p, i) => (
            <p
              key={i}
              className={p.italic ? "text-sm italic leading-relaxed" : "text-base leading-relaxed"}
              style={{ color: "var(--fg-muted)" }}
            >
              {p.text}
            </p>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/contacto" className="btn btn-neon px-6 py-3 text-sm rounded-md gap-2">
            Solicitar presupuesto
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Delivery note */}
      <div className="mt-10 flex items-center gap-3 surface rounded-xl px-5 py-4 max-w-xl">
        <Clock size={16} className="neon shrink-0" />
        <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
          <span className="font-semibold" style={{ color: "var(--fg)" }}>
            Tiempos de entrega estimados:
          </span>{" "}
          4–6 semanas, según la complejidad y alcance del proyecto.
        </p>
      </div>

      {/* Hosting block — only for Landing Pages and Catálogos tabs */}
      {active < 2 && (
        <div
          className="max-w-[720px] mt-12"
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
            ¿Qué es el hosting y por qué lo necesitás?
          </h3>
          <div className="space-y-3">
            <p className="text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Para que tu sitio web esté disponible en internet, necesita estar alojado en un
              servidor — eso es el hosting. Sin él, la página simplemente no existe en línea.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              En INFOFIS te asesoramos en la contratación del servicio de hosting más adecuado
              para tu proyecto. Si ya contás con uno propio, trabajamos sobre él sin problema.
              Si todavía no tenés, te orientamos en la elección y la configuración inicial queda
              incluida en el desarrollo.
            </p>
            <p className="text-sm italic leading-relaxed" style={{ color: "#a0a0a0" }}>
              El hosting tiene un costo mensual o anual independiente al del desarrollo. Su
              contratación es opcional y a cargo del cliente.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
