import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

const PAGES = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/precios", label: "Precios" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer
      className="border-t"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/imagenes/LOGO.png"
                alt="INFOFIS"
                width={120}
                height={36}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--fg-muted)" }}>
              Desarrollo web y automatización de procesos para PYMEs y MIPYMEs del interior de Paraguay.
            </p>
          </div>

          {/* Pages */}
          <div>
            <p className="font-display font-semibold text-sm mb-5 tracking-wide uppercase" style={{ color: "var(--fg)" }}>
              Páginas
            </p>
            <ul className="space-y-2.5">
              {PAGES.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="text-sm transition-colors duration-150 hover:text-[#76b900]"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-display font-semibold text-sm mb-5 tracking-wide uppercase" style={{ color: "var(--fg)" }}>
              Contacto
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm" style={{ color: "var(--fg-muted)" }}>
                <Phone size={15} className="neon shrink-0" />
                <span>+595 972 767 816</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm" style={{ color: "var(--fg-muted)" }}>
                <Mail size={15} className="neon shrink-0" />
                <a href="mailto:infofis@gmail.com.py" className="hover:text-[#76b900] transition-colors">
                  infofis@gmail.com.py
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm" style={{ color: "var(--fg-muted)" }}>
                <MapPin size={15} className="neon shrink-0 mt-0.5" />
                <span>Interior de Paraguay</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t text-xs"
          style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
        >
          <span>© {new Date().getFullYear()} INFOFIS. Todos los derechos reservados.</span>
          <span>Empresa unipersonal — Servicio remoto a todo Paraguay</span>
        </div>
      </div>
    </footer>
  );
}
