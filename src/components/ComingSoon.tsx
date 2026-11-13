import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import ToolIcon from "@/components/icons";
import { categoryTheme } from "@/lib/theme";
import { GROUP_LABELS, GROUP_PATHS, getRelated, type Tool } from "@/lib/tools";

export default function ComingSoon({ tool }: { tool: Tool }) {
  const related = getRelated(tool);
  const theme = categoryTheme(tool.category, tool.group);
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6">
      <nav aria-label="Breadcrumb" className="pt-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-brand-700">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href={GROUP_PATHS[tool.group]} className="hover:text-brand-700">
          {GROUP_LABELS[tool.group]}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{tool.name}</span>
      </nav>

      <div className="flex items-start gap-4 pt-4">
        <span className={`hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl sm:flex ${theme.tile}`}>
          <ToolIcon name={tool.icon} className="h-8 w-8" />
        </span>
        <div>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
            Coming soon
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{tool.name}</h1>
          <p className="mt-2 max-w-3xl leading-relaxed text-gray-600">{tool.description}</p>
        </div>
      </div>

      <section className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-white p-7 text-center">
        <p className="text-lg font-semibold text-gray-900">This tool is being built right now</p>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-gray-600">
          We are working on the {tool.name} and it will be free, like everything on CalcVerse, with no signup
          and no uploads. In the meantime, the tools below are ready to use.
        </p>
      </section>

      <section aria-label="Tools you can use now" className="mt-12">
        <h2 className="text-xl font-bold text-gray-900">Tools you can use now</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </section>
    </main>
  );
}
