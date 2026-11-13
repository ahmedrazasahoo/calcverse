import Link from "next/link";
import type { ReactNode } from "react";
import ToolCard from "@/components/ToolCard";
import ToolIcon from "@/components/icons";
import type { ToolContent } from "@/lib/content";
import { categoryTheme } from "@/lib/theme";
import { GROUP_LABELS, GROUP_PATHS, getRelated, type Tool } from "@/lib/tools";

interface ToolPageProps {
  tool: Tool;
  content: ToolContent;
  children: ReactNode;
}

export default function ToolPage({ tool, content, children }: ToolPageProps) {
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

      <div className="flex items-start gap-4 pt-4 pb-2">
        <span className={`hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl sm:flex ${theme.tile}`}>
          <ToolIcon name={tool.icon} className="h-8 w-8" />
        </span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{tool.name}</h1>
          <p className="mt-2 max-w-3xl text-base leading-relaxed text-gray-600">{tool.description}</p>
        </div>
      </div>

      <section
        aria-label={tool.name}
        className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7"
      >
        {children}
      </section>

      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <section aria-labelledby="how-to">
            <h2 id="how-to" className="text-2xl font-bold text-gray-900">
              How to use this {tool.group === "calculators" ? "calculator" : "tool"}
            </h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 leading-relaxed text-gray-700">
              {content.howTo.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="explained" className="mt-10">
            <h2 id="explained" className="text-2xl font-bold text-gray-900">
              {content.explanationTitle}
            </h2>
            {content.explanation.map((para, i) => (
              <p key={i} className="mt-4 leading-relaxed text-gray-700">
                {para}
              </p>
            ))}
          </section>

          <section aria-labelledby="faq" className="mt-10">
            <h2 id="faq" className="text-2xl font-bold text-gray-900">
              Frequently asked questions
            </h2>
            <div className="mt-4 divide-y divide-gray-200 rounded-2xl border border-gray-200">
              {content.faqs.map((faq, i) => (
                <details key={i} className="p-5">
                  <summary className="cursor-pointer list-none font-semibold text-gray-900 marker:hidden">
                    {faq.q}
                  </summary>
                  <p className="mt-2 leading-relaxed text-gray-600">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <aside aria-label="Related tools" className="lg:col-span-1">
          <h2 className="text-xl font-bold text-gray-900">Related tools</h2>
          <div className="mt-4 grid gap-4">
            {related.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
