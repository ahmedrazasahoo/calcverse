import Link from "next/link";
import { GROUP_LABELS, GROUP_PATHS, liveTools, toolPath, toolsInGroup, type ToolGroup } from "@/lib/tools";

const footerLink =
  "inline-flex min-h-11 items-center rounded-full px-2.5 -mx-2.5 text-gray-300 transition duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400";

export default function Footer() {
  const groups = Object.keys(GROUP_LABELS) as ToolGroup[];
  const popular = liveTools();
  return (
    <footer className="relative mt-24 overflow-hidden bg-gradient-to-b from-brand-900 via-brand-950 to-brand-950 text-gray-300">
      <span
        className="pointer-events-none absolute -top-32 left-1/4 h-64 w-64 rounded-full bg-brand-500/25 blur-3xl"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute -right-16 -bottom-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-lg font-bold text-white ring-1 ring-white/25">
              C
            </span>
            <span className="text-lg font-bold text-white">
              Calc<span className="text-brand-300">Verse</span>
            </span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
            Free calculators and file tools that run entirely in your browser. No signup, no uploads, no
            watermarks. Your numbers and files stay on your device.
          </p>
        </div>
        <nav aria-label="Tool categories">
          <p className="text-sm font-semibold tracking-widest text-white uppercase">Categories</p>
          <ul className="mt-3 text-sm">
            {groups.map((g) => (
              <li key={g}>
                <Link href={GROUP_PATHS[g]} className={footerLink}>
                  {GROUP_LABELS[g]} ({toolsInGroup(g).length})
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Popular tools">
          <p className="text-sm font-semibold tracking-widest text-white uppercase">Live now</p>
          <ul className="mt-3 text-sm">
            {popular.map((t) => (
              <li key={t.slug}>
                <Link href={toolPath(t)} className={footerLink}>
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Company">
          <p className="text-sm font-semibold tracking-widest text-white uppercase">CalcVerse</p>
          <ul className="mt-3 text-sm">
            <li>
              <Link href="/about" className={footerLink}>
                About
              </Link>
            </li>
            <li>
              <Link href="/privacy" className={footerLink}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/contact" className={footerLink}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="relative border-t border-white/10 px-4 py-6 text-center text-xs leading-relaxed text-gray-400">
        CalcVerse. Free tools for everyday math, money, health and files.
      </div>
    </footer>
  );
}
