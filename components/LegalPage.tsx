import Link from "next/link";
import type { ReactNode } from "react";
import { LEGAL } from "@/lib/legal";

interface LegalPageProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
}

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

interface InfoCardProps {
  children: ReactNode;
}

export default function LegalPage({ eyebrow, title, intro, children }: LegalPageProps) {
  return (
    <div className="bg-white text-neutral-800 dark:bg-neutral-950 dark:text-neutral-200">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 transition hover:border-[#5a8a00] dark:hover:border-[#76b900] hover:text-[#5a8a00] dark:hover:text-[#76b900] dark:border-neutral-700 dark:text-neutral-300"
        >
          <span aria-hidden="true" className="transition group-hover:-translate-x-0.5">←</span>
          Volver al Inicio
        </Link>

        <header className="mt-10 border-b border-neutral-200 pb-8 dark:border-neutral-800">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5a8a00] dark:text-[#76b900]">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            {title}
          </h1>
          {intro && (
            <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              {intro}
            </p>
          )}
          <p className="mt-4 text-sm text-neutral-500">
            Última actualización: {LEGAL.lastUpdated}
          </p>
        </header>

        <div className="mt-10 space-y-10">{children}</div>
      </div>
    </div>
  );
}

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="flex items-center gap-3 text-xl font-semibold text-neutral-900 dark:text-white">
        <span className="h-5 w-1 rounded-full bg-[#76b900]" aria-hidden="true" />
        {title}
      </h2>
      <div className="mt-4 space-y-4 leading-relaxed text-neutral-700 dark:text-neutral-300 [&_a]:text-[#5a8a00] dark:[&_a]:text-[#76b900] [&_a]:underline-offset-2 hover:[&_a]:underline [&_strong]:text-neutral-900 dark:[&_strong]:text-white [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-neutral-900 dark:[&_h3]:text-white">
        {children}
      </div>
    </section>
  );
}

export function InfoCard({ children }: InfoCardProps) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900">
      {children}
    </div>
  );
}
