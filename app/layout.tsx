import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://infofis.vercel.app"),
  title: {
    default: "INFOFIS — Desarrollo Web y Automatización para PYMEs",
    template: "%s | INFOFIS",
  },
  description:
    "Empresa paraguaya de desarrollo web y automatización para PYMEs de Latinoamérica. Presencia digital profesional, catálogos online y automatización de procesos.",
  keywords: [
    "desarrollo web Latinoamérica",
    "sitios web PYMEs",
    "automatización procesos",
    "INFOFIS",
    "empresa paraguaya",
  ],
  openGraph: {
    title: "INFOFIS",
    description:
      "Empresa paraguaya de desarrollo web y automatización para PYMEs de Latinoamérica. Presencia digital profesional, catálogos online y automatización de procesos.",
    url: "/",
    siteName: "INFOFIS",
    locale: "es_PY",
    type: "website",
    images: [{ url: "/imagenes/favicon-og.png", width: 256, height: 256, alt: "Icono de INFOFIS" }],
  },
  twitter: {
    card: "summary",
    title: "INFOFIS",
    description:
      "Empresa paraguaya de desarrollo web y automatización para PYMEs de Latinoamérica.",
    images: ["/imagenes/favicon-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
