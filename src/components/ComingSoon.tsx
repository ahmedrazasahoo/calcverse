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
          className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-xl sm:h-14 sm:w-14 ${theme.tile}`}
        >
          <ToolIcon name={tool.icon} className="h-8 w-8 sm:h-9 sm:w-9" />
        </span>
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
            Coming soon
          </span>
          <h1 className="mt-2.5 text-3xl font-bold tracking-tight text-balance text-gray-900 sm:text-4xl">
            {tool.name}
          </h1>
          <p className="mt-2 max-w-3xl leading-relaxed text-pretty text-gray-600">{tool.description}</p>
        </div>
      </div>

      <section className="relative mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center sm:px-10">
        <span
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500"
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
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-lg bg-slate-900 px-6 py-2.5 text-[15px] font-medium text-white shadow-sm transition duration-150 hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
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
