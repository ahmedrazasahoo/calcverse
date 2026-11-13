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

const crumbLink =
  "inline-flex min-h-11 items-center rounded-lg px-1.5 -mx-1.5 font-medium transition hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500";

function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mx-1 h-4 w-4 shrink-0 text-gray-300"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export default function ToolPage({ tool, content, children }: ToolPageProps) {
  const related = getRelated(tool);
  const theme = categoryTheme(tool.category, tool.group);
  return (
    <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center pt-4 text-sm text-gray-500">
        <Link href="/" className={crumbLink}>
          Home
        </Link>
        <Chevron />
        <Link href={GROUP_PATHS[tool.group]} className={crumbLink}>
          {GROUP_LABELS[tool.group]}
        </Link>
        <Chevron />
        <span className="inline-flex min-h-11 items-center font-medium text-gray-800" aria-current="page">
          {tool.name}
        </span>
      </nav>

      <div className="flex items-start gap-4 pt-2 pb-6 sm:gap-5">
        <span
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.25rem] shadow-sm ring-1 ring-white/70 sm:h-16 sm:w-16 ${theme.tile}`}
        >
          <ToolIcon name={tool.icon} className="h-8 w-8 sm:h-9 sm:w-9" />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase ${theme.badge}`}>
              {tool.category}
            </span>
            <span className="glass-chip flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold text-gray-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              Free, no signup
            </span>
          </div>
          <h1 className="mt-2.5 text-3xl font-bold tracking-tight text-balance text-gray-900 sm:text-4xl">
            {tool.name}
          </h1>
          <p className="mt-2 max-w-3xl text-base leading-relaxed text-pretty text-gray-600">{tool.description}</p>
        </div>
      </div>

      <section
        aria-label={tool.name}
        className={`glass relative overflow-hidden rounded-[2.5rem] p-6 sm:p-9 ${theme.glow}`}
      >
        <span className={`absolute inset-x-10 top-0 h-1 rounded-full ${theme.bar} opacity-70`} aria-hidden="true" />
        {children}
      </section>

      <div className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-10">
        <div className="min-w-0 lg:col-span-2">
          <section aria-labelledby="how-to">
            <h2 id="how-to" className="text-2xl font-bold tracking-tight text-gray-900">
              How to use this {tool.group === "calculators" ? "calculator" : "tool"}
            </h2>
            <ol className="mt-5 space-y-3">
              {content.howTo.map((step, i) => (
                <li key={i} className="glass flex gap-3.5 rounded-[1.75rem] p-4.5">
                  <span
                    className="glass-chip flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-brand-800"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span className="pt-1 leading-relaxed text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="explained" className="mt-12">
            <h2 id="explained" className="text-2xl font-bold tracking-tight text-gray-900">
              {content.explanationTitle}
            </h2>
            {content.explanation.map((para, i) => (
              <p key={i} className="mt-4 leading-relaxed text-gray-700">
                {para}
              </p>
            ))}
          </section>

          <section aria-labelledby="faq" className="mt-12">
            <h2 id="faq" className="text-2xl font-bold tracking-tight text-gray-900">
              Frequently asked questions
            </h2>
            <div className="glass mt-5 divide-y divide-white/60 overflow-hidden rounded-[2rem]">
              {content.faqs.map((faq, i) => (
                <details key={i} className="group">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-6 py-4 font-semibold text-gray-900 transition duration-200 marker:hidden hover:bg-white/50 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset focus-visible:outline-none">
                    <span>{faq.q}</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180 group-open:text-brand-600"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <p className="px-6 pb-5 leading-relaxed text-gray-600">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <aside aria-label="Related tools" className="min-w-0 lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">Related tools</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-500">More tools people use alongside this one.</p>
            <div className="mt-4 grid gap-4">
              {related.map((t) => (
                <ToolCard key={t.slug} tool={t} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
