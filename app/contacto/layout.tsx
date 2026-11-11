import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escribinos para pedir un presupuesto de desarrollo web o automatización de procesos. Respondemos en menos de 24 horas hábiles.",
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
