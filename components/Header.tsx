"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/precios", label: "Precios" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md border-b"
      style={{ backgroundColor: "var(--header-bg)", borderColor: "var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/imagenes/LOGO.png"
            alt="INFOFIS"
            width={120}
            height={36}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors duration-150 hover:text-[#76b900] ${
                pathname === l.href ? "text-[#76b900] font-medium" : "muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md transition-colors duration-150 hover:bg-[var(--card)] muted hover:text-[var(--fg)]"
              aria-label="Cambiar tema"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          )}

          {/* CTA */}
          <Link
            href="/contacto"
            className="btn btn-neon hidden md:inline-flex px-4 py-2 text-sm rounded-md"
          >
            Solicitar presupuesto
          </Link>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-md"
            style={{ color: "var(--fg)" }}
            onClick={() => setOpen(!open)}
            aria-label="Abrir menú"
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t px-4 py-5 flex flex-col gap-1"
          style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
        >
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`py-2.5 text-sm transition-colors duration-150 hover:text-[#76b900] ${
                pathname === l.href ? "neon font-semibold" : ""
              }`}
              style={{ color: pathname === l.href ? undefined : "var(--fg)" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contacto"
            onClick={() => setOpen(false)}
            className="btn btn-neon mt-3 py-2.5 text-sm rounded-md w-full text-center"
          >
            Solicitar presupuesto
          </Link>
        </div>
      )}
    </header>
  );
}
