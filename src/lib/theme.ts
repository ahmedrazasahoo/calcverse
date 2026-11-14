import type { ToolGroup } from "@/lib/tools";

/**
 * Per category color theme. All class strings are written out in full so
 * Tailwind can detect them at build time. Never build class names dynamically.
 *
 * In the current design system, surfaces are white with a hairline neutral
 * border everywhere; a category shows up only as a restrained accent: the
 * line icon color on a white tile, the small category label, and a thin
 * accent rule. No tints, no glows.
 */
export interface CategoryTheme {
  /** Icon tile: white, hairline ring, accent line icon. */
  tile: string;
  /** Neutral badge pill with hairline ring. */
  badge: string;
  /** Ring/border color used on hover. */
  hoverBorder: string;
  /** Accent text color. */
  text: string;
  /** Solid accent bar color, used for section markers and card top rules. */
  bar: string;
  /** Extra elevation shadow. Unused in the flat system; kept for API shape. */
  glow: string;
}

const BADGE_BASE = "bg-white text-slate-600 ring-1 ring-inset ring-slate-200";

function theme(accent: { tile: string; text: string; bar: string }): CategoryTheme {
  return {
    tile: `bg-white ring-1 ring-slate-200 ${accent.tile}`,
    badge: BADGE_BASE,
    hoverBorder: "hover:border-slate-300",
    text: accent.text,
    bar: accent.bar,
    glow: "",
  };
}

const THEMES: Record<string, CategoryTheme> = {
  Finance: theme({ tile: "text-emerald-600", text: "text-emerald-700", bar: "bg-emerald-500" }),
  Health: theme({ tile: "text-rose-600", text: "text-rose-700", bar: "bg-rose-500" }),
  School: theme({ tile: "text-sky-600", text: "text-sky-700", bar: "bg-sky-500" }),
  Everyday: theme({ tile: "text-amber-600", text: "text-amber-700", bar: "bg-amber-500" }),
  Tax: theme({ tile: "text-slate-600", text: "text-slate-700", bar: "bg-slate-500" }),
  "PDF Tools": theme({ tile: "text-red-600", text: "text-red-700", bar: "bg-red-500" }),
  "Image Tools": theme({ tile: "text-violet-600", text: "text-violet-700", bar: "bg-violet-500" }),
  "Image Converters": theme({ tile: "text-cyan-600", text: "text-cyan-700", bar: "bg-cyan-500" }),
  "Text Tools": theme({ tile: "text-teal-600", text: "text-teal-700", bar: "bg-teal-500" }),
  Generators: theme({ tile: "text-fuchsia-600", text: "text-fuchsia-700", bar: "bg-fuchsia-500" }),
  Tests: theme({ tile: "text-indigo-600", text: "text-indigo-700", bar: "bg-indigo-500" }),
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
