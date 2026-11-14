import Link from "next/link";
import ToolIcon from "@/components/icons";
import { categoryTheme } from "@/lib/theme";
import { toolPath, type Tool } from "@/lib/tools";

export default function ToolCard({ tool }: { tool: Tool }) {
  const theme = categoryTheme(tool.category, tool.group);
  return (
    <Link
      href={toolPath(tool)}
      className="group relative flex h-full min-h-11 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition duration-150 hover:border-slate-300 hover:shadow-[0_10px_30px_-14px_rgb(15_23_42/0.18)] focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <span
        className={`absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100 ${theme.bar}`}
        aria-hidden="true"
      />
      <div className="flex items-start justify-between gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${theme.tile}`}
        >
          <ToolIcon name={tool.icon} className="h-5.5 w-5.5" />
        </span>
        {tool.status === "soon" ? (
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
            Coming soon
          </span>
        ) : (
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            Live
          </span>
        )}
      </div>
      <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-brand-700">
        {tool.name}
      </h3>
      <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-slate-500">{tool.description}</p>
      <span className="mt-auto flex items-center justify-between gap-2 pt-4">
        <span className={`font-mono text-[11px] font-medium tracking-[0.14em] uppercase ${theme.text}`}>{tool.category}</span>
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-200 text-slate-400 transition duration-150 group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
      </span>
    </Link>
  );
}
