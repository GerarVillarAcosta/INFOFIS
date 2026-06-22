import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

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
  title: {
    default: "INFOFIS — Desarrollo Web y Automatización para PYMEs",
    template: "%s | INFOFIS",
  },
  description:
    "Sitios web profesionales y automatización de procesos para PYMEs y MIPYMEs del interior de Paraguay. Desarrollo con Next.js, WordPress y herramientas modernas.",
  keywords: [
    "desarrollo web Paraguay",
    "sitios web PYMEs",
    "automatización procesos",
    "INFOFIS",
    "diseño web interior Paraguay",
  ],
  icons: {
    icon: "/imagenes/LOGO.png",
    apple: "/imagenes/LOGO.png",
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
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
