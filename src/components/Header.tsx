import Link from "next/link";
import LogoMark from "@/components/LogoMark";
import { GROUP_LABELS, GROUP_PATHS, type ToolGroup } from "@/lib/tools";

const navGroups: ToolGroup[] = ["calculators", "tools", "converters", "generators"];

const linkFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/55 shadow-[0_10px_30px_-18px_rgb(68_33_127/0.35)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-2 px-4 py-2 sm:px-6 lg:px-8">
        <Link
          href="/"
          className={`group flex min-h-11 shrink-0 items-center gap-2.5 rounded-full pr-3 ${linkFocus}`}
          aria-label="CalcVerse home"
        >
          <LogoMark className="h-10 w-10 shadow-md shadow-brand-600/30 ring-1 ring-white/50 transition duration-200 group-hover:shadow-lg" />
          <span className="text-xl font-bold tracking-tight whitespace-nowrap text-gray-900">
            Calc<span className="text-brand-700">Verse</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navGroups.map((g) => (
            <Link
              key={g}
              href={GROUP_PATHS[g]}
              className={`flex min-h-11 items-center rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition duration-200 hover:bg-white/80 hover:text-brand-800 hover:shadow-sm ${linkFocus}`}
            >
              {GROUP_LABELS[g]}
            </Link>
          ))}
        </nav>
        <nav className="flex items-center gap-0.5 md:hidden" aria-label="Mobile navigation">
          <Link
            href="/calculators"
            className={`flex min-h-11 items-center rounded-full px-2 py-2 text-[13px] font-medium whitespace-nowrap text-gray-700 transition hover:bg-white/80 hover:text-brand-800 ${linkFocus}`}
          >
            Calculators
          </Link>
          <Link
            href="/tools"
            className={`flex min-h-11 items-center rounded-full px-2 py-2 text-[13px] font-medium whitespace-nowrap text-gray-700 transition hover:bg-white/80 hover:text-brand-800 ${linkFocus}`}
          >
            File Tools
          </Link>
          <Link
            href="/converters"
            className={`flex min-h-11 items-center rounded-full px-2 py-2 text-[13px] font-medium whitespace-nowrap text-gray-700 transition hover:bg-white/80 hover:text-brand-800 ${linkFocus}`}
          >
            More
          </Link>
        </nav>
      </div>
    </header>
  );
}
