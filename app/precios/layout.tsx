import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Precios",
  description:
    "Planes y precios transparentes para desarrollo web y automatización de procesos. Landing Pages desde USD 349, Catálogos desde USD 599.",
};

export default function PreciosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
