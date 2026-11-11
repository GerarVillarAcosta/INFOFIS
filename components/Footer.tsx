import Link from "next/link";
import { LEGAL } from "@/lib/legal";

interface FooterLink {
  href: string;
  label: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

const NAV_LINKS: FooterLink[] = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/precios", label: "Precios" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contacto", label: "Contacto" },
];

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5a8a00] dark:text-[#76b900]">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-neutral-600 transition hover:text-[#5a8a00] dark:text-neutral-400 dark:hover:text-[#76b900]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const { contact } = LEGAL;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-lg font-bold tracking-wider text-neutral-900 dark:text-white">
              {LEGAL.brand}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              Landing pages, catálogos online y automatización de procesos
              para MiPyMEs de Latinoamérica.
            </p>
            <div className="mt-4 space-y-1 text-sm">
              <a
                href={`mailto:${contact.email}`}
                className="block text-neutral-600 hover:text-[#5a8a00] dark:text-neutral-400 dark:hover:text-[#76b900]"
              >
                {contact.email}
              </a>
            </div>
          </div>

          <FooterColumn title="Navegación" links={NAV_LINKS} />
        </div>

        <div className="mt-10 border-t border-neutral-200 pt-6 text-xs text-neutral-500 dark:border-neutral-800">
          © {year} {LEGAL.brand}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
