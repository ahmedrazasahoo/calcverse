import Link from "next/link";
import { GROUP_LABELS, GROUP_PATHS, type ToolGroup } from "@/lib/tools";

const navGroups: ToolGroup[] = ["calculators", "tools", "converters", "generators"];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="CalcVerse home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-lg font-bold text-white shadow-sm">
            C
          </span>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Calc<span className="text-brand-700">Verse</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navGroups.map((g) => (
            <Link
              key={g}
              href={GROUP_PATHS[g]}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-brand-50 hover:text-brand-800"
            >
              {GROUP_LABELS[g]}
            </Link>
          ))}
        </nav>
        <nav className="flex items-center gap-1 md:hidden" aria-label="Mobile navigation">
          <Link href="/calculators" className="rounded-lg px-2 py-2 text-sm font-medium text-gray-700">
            Calculators
          </Link>
          <Link href="/tools" className="rounded-lg px-2 py-2 text-sm font-medium text-gray-700">
            File Tools
          </Link>
          <Link href="/converters" className="rounded-lg px-2 py-2 text-sm font-medium text-gray-700">
            More
          </Link>
        </nav>
      </div>
    </header>
  );
}
