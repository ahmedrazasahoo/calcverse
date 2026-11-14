import Link from "next/link";

import LogoMark from "@/components/LogoMark";
import { GROUP_PATHS, getTool, toolPath, type Tool } from "@/lib/tools";

const linkClass =
  "flex min-h-11 items-center rounded-lg px-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const headingClass = "px-2 font-mono text-[11px] font-medium tracking-[0.18em] text-slate-500 uppercase";

function toolLinks(slugs: string[]): { href: string; label: string }[] {
  return slugs
    .map((slug) => getTool(slug))
    .filter((t): t is Tool => Boolean(t))
    .map((t) => ({ href: toolPath(t), label: t.name }));
}

const CALCULATOR_LINKS = toolLinks([
  "emi-calculator",
  "sip-calculator",
  "percentage-calculator",
  "tdee-calculator",
  "bmi-calculator",
  "gpa-calculator",
  "age-calculator",
]);

const FILE_TOOL_LINKS = toolLinks([
  "compress-pdf",
  "compress-pdf-to-200kb",
  "merge-pdf",
  "split-pdf",
  "compress-image",
  "heic-to-jpg",
  "jpg-to-pdf",
]);

const CONVERTER_GENERATOR_LINKS: { href: string; label: string }[] = [
  { href: GROUP_PATHS.converters, label: "All converters" },
  { href: GROUP_PATHS.generators, label: "All generators" },
  ...toolLinks([
    "roman-numeral-converter",
    "binary-converter",
    "shoe-size-converter",
    "word-counter",
    "qr-code-generator",
    "password-generator",
    "typing-test",
  ]),
];

const COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/disclaimer", label: "Disclaimer" },
];

function LinkColumn({
  heading,
  hubHref,
  hubLabel,
  links,
}: {
  heading: string;
  hubHref?: string;
  hubLabel?: string;
  links: { href: string; label: string }[];
}) {
  return (
    <nav aria-label={heading}>
      <h3 className={headingClass}>{heading}</h3>
      <ul className="mt-3 space-y-0.5">
        {hubHref && hubLabel && (
          <li>
            <Link href={hubHref} className={`${linkClass} font-medium text-slate-200`}>
              {hubLabel}
            </Link>
          </li>
        )}
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link href={link.href} className={linkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Site footer: a solid near-black anchor under the light theme, with five
 * evenly distributed columns (brand, calculators, file tools, converters and
 * generators, company and legal) that stack cleanly on smaller screens.
 */
export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-slate-950 text-slate-300">
      <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr_1fr]">
          <div className="max-w-sm">
            <Link
              href="/"
              className="group inline-flex min-h-11 items-center gap-2.5 rounded-lg pr-3"
              aria-label="CalcVerse home"
            >
              <LogoMark className="h-9 w-9" />
              <span className="text-lg font-semibold tracking-tight whitespace-nowrap text-white">
                Calc<span className="text-brand-400">Verse</span>
              </span>
            </Link>
            <p className="mt-4 px-1 text-sm leading-relaxed text-slate-400">
              Free calculators and file tools that run entirely in your browser. No signup, no uploads, and
              every answer shows its working so you can check it yourself.
            </p>
            <p className="mt-4 px-1 font-mono text-[11px] tracking-wide text-slate-500 uppercase">Your files and numbers never leave your device.</p>
          </div>

          <LinkColumn
            heading="Calculators"
            hubHref={GROUP_PATHS.calculators}
            hubLabel="All calculators"
            links={CALCULATOR_LINKS}
          />
          <LinkColumn
            heading="File Tools"
            hubHref={GROUP_PATHS.tools}
            hubLabel="All file tools"
            links={FILE_TOOL_LINKS}
          />
          <LinkColumn heading="Converters and Generators" links={CONVERTER_GENERATOR_LINKS} />
          <LinkColumn heading="Company" links={COMPANY_LINKS} />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 CalcVerse. Every tool is free to use, with no signup.</p>
          <p>Results are calculated locally in your browser and are provided for guidance only.</p>
        </div>
      </div>
    </footer>
  );
}
