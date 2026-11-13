import Link from "next/link";
import { GROUP_LABELS, GROUP_PATHS, liveTools, toolPath, toolsInGroup, type ToolGroup } from "@/lib/tools";

export default function Footer() {
  const groups = Object.keys(GROUP_LABELS) as ToolGroup[];
  const popular = liveTools();
  return (
    <footer className="mt-24 bg-gray-950 text-gray-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <p className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-lg font-bold text-white">
              C
            </span>
            <span className="text-lg font-bold text-white">
              Calc<span className="text-brand-300">Verse</span>
            </span>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            Free calculators and file tools that run entirely in your browser. No signup, no uploads, no
            watermarks. Your numbers and files stay on your device.
          </p>
        </div>
        <nav aria-label="Tool categories">
          <p className="text-sm font-semibold tracking-wide text-white uppercase">Categories</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {groups.map((g) => (
              <li key={g}>
                <Link href={GROUP_PATHS[g]} className="text-gray-400 transition hover:text-white">
                  {GROUP_LABELS[g]} ({toolsInGroup(g).length})
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Popular tools">
          <p className="text-sm font-semibold tracking-wide text-white uppercase">Live now</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {popular.map((t) => (
              <li key={t.slug}>
                <Link href={toolPath(t)} className="text-gray-400 transition hover:text-white">
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Company">
          <p className="text-sm font-semibold tracking-wide text-white uppercase">CalcVerse</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/about" className="text-gray-400 transition hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-gray-400 transition hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-400 transition hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-gray-800 py-5 text-center text-xs text-gray-500">
        CalcVerse. Free tools for everyday math, money, health and files.
      </div>
    </footer>
  );
}
