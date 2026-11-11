import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="section-badge mb-6">Error 404</p>
        <h1
          className="font-display font-bold text-4xl sm:text-5xl tracking-tight mb-4"
          style={{ color: "var(--fg)" }}
        >
          Esta página no existe
        </h1>
        <p className="text-base leading-relaxed mb-8" style={{ color: "var(--fg-muted)" }}>
          Es posible que el enlace esté roto o que la página se haya movido.
        </p>
        <Link href="/" className="btn btn-neon px-6 py-3 text-sm rounded-md gap-2">
          <ArrowLeft size={16} aria-hidden="true" />
          Volver al Inicio
        </Link>
      </div>
    </section>
  );
}
