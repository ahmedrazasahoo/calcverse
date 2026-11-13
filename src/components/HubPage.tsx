import ToolCard from "@/components/ToolCard";
import { categoryTheme } from "@/lib/theme";
import { toolsInGroup, type ToolGroup } from "@/lib/tools";

interface HubPageProps {
  group: ToolGroup;
  title: string;
  intro: string;
  /** Category order to display. Defaults to registry order. */
  categoryOrder?: string[];
}

export default function HubPage({ group, title, intro, categoryOrder }: HubPageProps) {
  const groupTools = toolsInGroup(group);
  const liveCount = groupTools.filter((tool) => tool.status === "live").length;
  const discovered = [...new Set(groupTools.map((tool) => tool.category))];
  const categories = categoryOrder
    ? [...categoryOrder.filter((c) => discovered.includes(c)), ...discovered.filter((c) => !categoryOrder.includes(c))]
    : discovered;
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-12 lg:px-8">
      <p className="text-sm font-semibold tracking-widest text-brand-700 uppercase">CalcVerse</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-balance text-gray-900 sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-3xl leading-relaxed text-pretty text-gray-600">{intro}</p>
      <p className="mt-5 flex flex-wrap items-center gap-2 text-sm">
        <span className="glass-chip rounded-full px-4 py-2 font-semibold text-gray-800">
          {groupTools.length} tools in total
        </span>
        <span className="glass-chip flex items-center gap-1.5 rounded-full px-4 py-2 font-semibold text-gray-800">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          {liveCount} live now
        </span>
      </p>
      {categories.map((cat) => {
        const theme = categoryTheme(cat, group);
        const catTools = groupTools.filter((tool) => tool.category === cat);
        return (
          <section key={cat} aria-label={cat} className="mt-14 scroll-mt-24 first:mt-12">
            <div className="flex items-center gap-3">
              <span className={`h-9 w-1.5 shrink-0 rounded-full ${theme.bar}`} aria-hidden="true" />
              <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">{cat}</h2>
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${theme.badge}`}>
                {catTools.length} tool{catTools.length === 1 ? "" : "s"}
              </span>
              <span className="hidden h-px flex-1 bg-white/70 sm:block" aria-hidden="true" />
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {catTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
