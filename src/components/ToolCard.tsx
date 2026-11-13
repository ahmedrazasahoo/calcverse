import Link from "next/link";
import ToolIcon from "@/components/icons";
import { categoryTheme } from "@/lib/theme";
import { toolPath, type Tool } from "@/lib/tools";

export default function ToolCard({ tool }: { tool: Tool }) {
  const theme = categoryTheme(tool.category, tool.group);
  return (
    <Link
      href={toolPath(tool)}
      className={`glass group relative flex h-full min-h-11 flex-col overflow-hidden rounded-[2rem] p-6 transition duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none active:translate-y-0 sm:p-7 ${theme.glow}`}
    >
      <span
        className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${theme.bar}`}
        aria-hidden="true"
      />
      <div className="flex items-start justify-between gap-3">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-sm ring-1 ring-white/70 transition duration-200 group-hover:scale-105 ${theme.tile}`}
        >
          <ToolIcon name={tool.icon} className="h-6 w-6" />
        </span>
        {tool.status === "soon" ? (
          <span className="glass-chip flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold text-gray-700">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
            Coming soon
          </span>
        ) : (
          <span className="glass-chip flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold text-gray-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            Live
          </span>
        )}
      </div>
      <h3 className="mt-4 text-base font-semibold text-gray-900 transition-colors group-hover:text-brand-800">
        {tool.name}
      </h3>
      <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-gray-600">{tool.description}</p>
      <span className="mt-auto flex items-center justify-between gap-2 pt-4">
        <span className={`text-xs font-semibold tracking-widest uppercase ${theme.text}`}>{tool.category}</span>
        <span
          className="glass-chip flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-500 transition duration-200 group-hover:bg-brand-700 group-hover:text-white"
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
