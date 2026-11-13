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
  const discovered = [...new Set(groupTools.map((tool) => tool.category))];
  const categories = categoryOrder
    ? [...categoryOrder.filter((c) => discovered.includes(c)), ...discovered.filter((c) => !categoryOrder.includes(c))]
    : discovered;
  return (
    <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-3xl leading-relaxed text-gray-600">{intro}</p>
      {categories.map((cat) => {
        const theme = categoryTheme(cat, group);
        return (
          <section key={cat} aria-label={cat} className="mt-12">
            <div className="flex items-center gap-3">
              <span className={`h-8 w-1.5 rounded-full ${theme.tile.split(" ")[0]}`} aria-hidden="true" />
              <h2 className="text-xl font-bold text-gray-900">{cat}</h2>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${theme.badge}`}>
                {groupTools.filter((tool) => tool.category === cat).length} tools
              </span>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {groupTools
                .filter((tool) => tool.category === cat)
                .map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
