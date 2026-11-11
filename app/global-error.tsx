"use client";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// Se usa solo si falla el layout raíz; reemplaza todo el documento, por eso incluye <html> y <body>.
export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#0a0a0a",
          color: "#ffffff",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        <main>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>Ocurrió un error inesperado</h1>
          <p style={{ color: "#a0a0a0", marginBottom: "1.5rem" }}>
            Intentá recargar la página. Si el problema continúa, escribinos a infooofis@gmail.com.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              background: "#76b900",
              color: "#000",
              border: 0,
              borderRadius: 6,
              padding: "0.75rem 1.5rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reintentar
          </button>
        </main>
      </body>
    </html>
  );
}
