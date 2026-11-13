import type { ToolGroup } from "@/lib/tools";

/**
 * Per category color theme. All class strings are written out in full so
 * Tailwind can detect them at build time. Never build class names dynamically.
 *
 * In the glass theme, category color appears only as soft tints: the icon
 * tile, a small accent bar, a soft glow, and the text color on an otherwise
 * white glass badge pill. Surfaces themselves stay translucent white.
 */
export interface CategoryTheme {
  /** Icon tile background and text color on cards. */
  tile: string;
  /** White glass badge pill with the category text color. */
  badge: string;
  /** Ring color used on hover. */
  hoverBorder: string;
  /** Accent text color. */
  text: string;
  /** Solid accent bar color, used for section markers and card top rules. */
  bar: string;
  /** Soft colored glow shadow, used under hero panels and on card hover. */
  glow: string;
}

const BADGE_BASE = "bg-white/60 shadow-sm ring-1 ring-inset ring-white/70 backdrop-blur";

const THEMES: Record<string, CategoryTheme> = {
  Finance: {
    tile: "bg-emerald-100/80 text-emerald-700",
    badge: `${BADGE_BASE} text-emerald-700`,
    hoverBorder: "hover:border-emerald-200",
    text: "text-emerald-700",
    bar: "bg-emerald-500",
    glow: "shadow-[0_22px_44px_-18px_rgb(16_185_129/0.35)]",
  },
  Health: {
    tile: "bg-rose-100/80 text-rose-700",
    badge: `${BADGE_BASE} text-rose-700`,
    hoverBorder: "hover:border-rose-200",
    text: "text-rose-700",
    bar: "bg-rose-500",
    glow: "shadow-[0_22px_44px_-18px_rgb(244_63_94/0.32)]",
  },
  School: {
    tile: "bg-sky-100/80 text-sky-700",
    badge: `${BADGE_BASE} text-sky-700`,
    hoverBorder: "hover:border-sky-200",
    text: "text-sky-700",
    bar: "bg-sky-500",
    glow: "shadow-[0_22px_44px_-18px_rgb(14_165_233/0.32)]",
  },
  Everyday: {
    tile: "bg-amber-100/80 text-amber-700",
    badge: `${BADGE_BASE} text-amber-700`,
    hoverBorder: "hover:border-amber-200",
    text: "text-amber-700",
    bar: "bg-amber-500",
    glow: "shadow-[0_22px_44px_-18px_rgb(245_158_11/0.35)]",
  },
  Tax: {
    tile: "bg-slate-200/80 text-slate-700",
    badge: `${BADGE_BASE} text-slate-700`,
    hoverBorder: "hover:border-slate-300",
    text: "text-slate-700",
    bar: "bg-slate-500",
    glow: "shadow-[0_22px_44px_-18px_rgb(100_116_139/0.32)]",
  },
  "PDF Tools": {
    tile: "bg-violet-100/80 text-violet-700",
    badge: `${BADGE_BASE} text-violet-700`,
    hoverBorder: "hover:border-violet-200",
    text: "text-violet-700",
    bar: "bg-violet-500",
    glow: "shadow-[0_22px_44px_-18px_rgb(139_92_246/0.35)]",
  },
  "Image Tools": {
    tile: "bg-violet-100/80 text-violet-700",
    badge: `${BADGE_BASE} text-violet-700`,
    hoverBorder: "hover:border-violet-200",
    text: "text-violet-700",
    bar: "bg-violet-500",
    glow: "shadow-[0_22px_44px_-18px_rgb(139_92_246/0.35)]",
  },
  "Image Converters": {
    tile: "bg-cyan-100/80 text-cyan-700",
    badge: `${BADGE_BASE} text-cyan-700`,
    hoverBorder: "hover:border-cyan-200",
    text: "text-cyan-700",
    bar: "bg-cyan-500",
    glow: "shadow-[0_22px_44px_-18px_rgb(6_182_212/0.32)]",
  },
  "Text Tools": {
    tile: "bg-cyan-100/80 text-cyan-700",
    badge: `${BADGE_BASE} text-cyan-700`,
    hoverBorder: "hover:border-cyan-200",
    text: "text-cyan-700",
    bar: "bg-cyan-500",
    glow: "shadow-[0_22px_44px_-18px_rgb(6_182_212/0.32)]",
  },
  Generators: {
    tile: "bg-fuchsia-100/80 text-fuchsia-700",
    badge: `${BADGE_BASE} text-fuchsia-700`,
    hoverBorder: "hover:border-fuchsia-200",
    text: "text-fuchsia-700",
    bar: "bg-fuchsia-500",
    glow: "shadow-[0_22px_44px_-18px_rgb(217_70_239/0.3)]",
  },
  Tests: {
    tile: "bg-fuchsia-100/80 text-fuchsia-700",
    badge: `${BADGE_BASE} text-fuchsia-700`,
    hoverBorder: "hover:border-fuchsia-200",
    text: "text-fuchsia-700",
    bar: "bg-fuchsia-500",
    glow: "shadow-[0_22px_44px_-18px_rgb(217_70_239/0.3)]",
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
