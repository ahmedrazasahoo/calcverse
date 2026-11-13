import Link from "next/link";
import ToolIcon from "@/components/icons";
import { categoryTheme } from "@/lib/theme";
import { toolPath, type Tool } from "@/lib/tools";

export default function ToolCard({ tool }: { tool: Tool }) {
  const theme = categoryTheme(tool.category, tool.group);
  return (
    <Link
      href={toolPath(tool)}
      className={`group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg ${theme.hoverBorder}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${theme.tile}`}>
          <ToolIcon name={tool.icon} className="h-6 w-6" />
        </span>
        {tool.status === "soon" ? (
          <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-800">
            Coming soon
          </span>
        ) : (
          <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
            Live
          </span>
        )}
      </div>
      <h3 className="mt-3 font-semibold text-gray-900 group-hover:text-brand-800">{tool.name}</h3>
      <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-gray-600">{tool.description}</p>
      <span className={`mt-auto pt-3 text-xs font-semibold tracking-wide uppercase ${theme.text}`}>
        {tool.category}
      </span>
    </Link>
  );
}
