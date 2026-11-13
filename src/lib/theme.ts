import type { ToolGroup } from "@/lib/tools";

/**
 * Per category color theme. All class strings are written out in full so
 * Tailwind can detect them at build time. Never build class names dynamically.
 */
export interface CategoryTheme {
  /** Icon tile background and text color on cards. */
  tile: string;
  /** Small badge text and background. */
  badge: string;
  /** Ring color used on hover. */
  hoverBorder: string;
  /** Accent text color. */
  text: string;
}

const THEMES: Record<string, CategoryTheme> = {
  Finance: {
    tile: "bg-emerald-100 text-emerald-700",
    badge: "bg-emerald-50 text-emerald-700",
    hoverBorder: "hover:border-emerald-300",
    text: "text-emerald-700",
  },
  Health: {
    tile: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
    hoverBorder: "hover:border-rose-300",
    text: "text-rose-700",
  },
  School: {
    tile: "bg-sky-100 text-sky-700",
    badge: "bg-sky-50 text-sky-700",
    hoverBorder: "hover:border-sky-300",
    text: "text-sky-700",
  },
  Everyday: {
    tile: "bg-amber-100 text-amber-700",
    badge: "bg-amber-50 text-amber-700",
    hoverBorder: "hover:border-amber-300",
    text: "text-amber-700",
  },
  Tax: {
    tile: "bg-slate-200 text-slate-700",
    badge: "bg-slate-100 text-slate-700",
    hoverBorder: "hover:border-slate-400",
    text: "text-slate-700",
  },
  "PDF Tools": {
    tile: "bg-violet-100 text-violet-700",
    badge: "bg-violet-50 text-violet-700",
    hoverBorder: "hover:border-violet-300",
    text: "text-violet-700",
  },
  "Image Tools": {
    tile: "bg-violet-100 text-violet-700",
    badge: "bg-violet-50 text-violet-700",
    hoverBorder: "hover:border-violet-300",
    text: "text-violet-700",
  },
  "Image Converters": {
    tile: "bg-cyan-100 text-cyan-700",
    badge: "bg-cyan-50 text-cyan-700",
    hoverBorder: "hover:border-cyan-300",
    text: "text-cyan-700",
  },
  "Text Tools": {
    tile: "bg-cyan-100 text-cyan-700",
    badge: "bg-cyan-50 text-cyan-700",
    hoverBorder: "hover:border-cyan-300",
    text: "text-cyan-700",
  },
  Generators: {
    tile: "bg-fuchsia-100 text-fuchsia-700",
    badge: "bg-fuchsia-50 text-fuchsia-700",
    hoverBorder: "hover:border-fuchsia-300",
    text: "text-fuchsia-700",
  },
  Tests: {
    tile: "bg-fuchsia-100 text-fuchsia-700",
    badge: "bg-fuchsia-50 text-fuchsia-700",
    hoverBorder: "hover:border-fuchsia-300",
    text: "text-fuchsia-700",
  },
};

const GROUP_FALLBACK: Record<ToolGroup, CategoryTheme> = {
  calculators: THEMES.Everyday,
  tools: THEMES["PDF Tools"],
  converters: THEMES["Image Converters"],
  generators: THEMES.Generators,
};

export function categoryTheme(category: string, group: ToolGroup): CategoryTheme {
  return THEMES[category] ?? GROUP_FALLBACK[group];
}
