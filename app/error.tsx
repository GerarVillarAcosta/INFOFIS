"use client";

import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <section className="section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="section-badge mb-6">Algo salió mal</p>
        <h1
          className="font-display font-bold text-4xl sm:text-5xl tracking-tight mb-4"
          style={{ color: "var(--fg)" }}
        >
          Ocurrió un error inesperado
        </h1>
        <p className="text-base leading-relaxed mb-8" style={{ color: "var(--fg-muted)" }}>
          Intentá recargar la página. Si el problema continúa, escribinos y lo resolvemos.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="btn btn-neon px-6 py-3 text-sm rounded-md cursor-pointer"
          >
            Reintentar
          </button>
          <Link href="/" className="btn btn-outline px-6 py-3 text-sm rounded-md">
            Volver al Inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
