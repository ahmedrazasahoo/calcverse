import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import ToolIcon from "@/components/icons";
import { categoryTheme } from "@/lib/theme";
import { GROUP_LABELS, GROUP_PATHS, getRelated, type Tool } from "@/lib/tools";

const crumbLink =
  "inline-flex min-h-11 items-center rounded-lg px-1.5 -mx-1.5 font-medium transition hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500";

export default function ComingSoon({ tool }: { tool: Tool }) {
  const related = getRelated(tool);
  const theme = categoryTheme(tool.category, tool.group);
  return (
    <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center pt-4 text-sm text-gray-500">
        <Link href="/" className={crumbLink}>
          Home
        </Link>
        <span className="mx-1 text-gray-300" aria-hidden="true">
          /
        </span>
        <Link href={GROUP_PATHS[tool.group]} className={crumbLink}>
          {GROUP_LABELS[tool.group]}
        </Link>
        <span className="mx-1 text-gray-300" aria-hidden="true">
          /
        </span>
        <span className="inline-flex min-h-11 items-center font-medium text-gray-800" aria-current="page">
          {tool.name}
        </span>
      </nav>

      <div className="flex items-start gap-4 pt-2 sm:gap-5">
        <span
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.25rem] shadow-sm ring-1 ring-white/70 sm:h-16 sm:w-16 ${theme.tile}`}
        >
          <ToolIcon name={tool.icon} className="h-8 w-8 sm:h-9 sm:w-9" />
        </span>
        <div className="min-w-0">
          <span className="glass-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
            Coming soon
          </span>
          <h1 className="mt-2.5 text-3xl font-bold tracking-tight text-balance text-gray-900 sm:text-4xl">
            {tool.name}
          </h1>
          <p className="mt-2 max-w-3xl leading-relaxed text-pretty text-gray-600">{tool.description}</p>
        </div>
      </div>

      <section className="glass relative mt-8 overflow-hidden rounded-[2.5rem] px-6 py-12 text-center sm:px-10">
        <span
          className="glass-chip mx-auto flex h-14 w-14 items-center justify-center rounded-full text-brand-700"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </span>
        <p className="mt-5 text-xl font-bold tracking-tight text-gray-900">This tool is being built right now</p>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-gray-600">
          We are working on the {tool.name} and it will be free, like everything on CalcVerse, with no signup
          and no uploads. In the meantime, the tools below are ready to use.
        </p>
        <Link
          href={GROUP_PATHS[tool.group]}
          className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-b from-white to-brand-50 px-7 py-3 font-semibold text-brand-950 shadow-[0_14px_30px_-12px_rgb(68_33_127/0.35),inset_0_1px_0_rgb(255_255_255/0.9)] ring-1 ring-white/80 transition duration-200 hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-brand-500/25 focus-visible:outline-none"
        >
          Browse {GROUP_LABELS[tool.group]}
        </Link>
      </section>

      <section aria-label="Tools you can use now" className="mt-14">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Tools you can use now</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {related.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </section>
    </main>
  );
}
