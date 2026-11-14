import type { ReactNode } from "react";
import type { GuideCategory } from "@/lib/guides";
import type { ToolGroup } from "@/lib/tools";

/**
 * Category emblems: a white hairline tile carrying a small hand drawn SVG
 * motif in the category accent color. Pure inline SVG, so an emblem costs
 * zero network requests, renders at any pixel density and can never cause
 * layout shift.
 */

export type MotifName =
  | "calculator"
  | "finance"
  | "health"
  | "school"
  | "everyday"
  | "tax"
  | "pdf"
  | "image"
  | "converters"
  | "text"
  | "generators"
  | "tests"
  | "home"
  | "book";

const MOTIF_COLOR: Record<MotifName, string> = {
  calculator: "text-brand-600",
  finance: "text-emerald-600",
  health: "text-rose-600",
  school: "text-sky-600",
  everyday: "text-amber-600",
  tax: "text-slate-600",
  pdf: "text-red-600",
  image: "text-violet-600",
  converters: "text-cyan-600",
  text: "text-teal-600",
  generators: "text-fuchsia-600",
  tests: "text-indigo-600",
  home: "text-orange-600",
  book: "text-brand-600",
};

/** Line art for each motif, drawn on a 48 by 48 grid, stroke based. */
const MOTIF_ART: Record<MotifName, ReactNode> = {
  calculator: (
    <>
      <rect x="13" y="6" width="22" height="36" rx="4" />
      <path d="M18.5 13h11" />
      <path d="M18.5 22h.01M24 22h.01M29.5 22h.01M18.5 28.5h.01M24 28.5h.01M29.5 28.5h.01M18.5 35h.01M24 35h.01M29.5 35h.01" strokeWidth="3.4" />
    </>
  ),
  finance: (
    <>
      <path d="M8 39h32" />
      <path d="M9 33 18 24l6 4 11-12" />
      <path d="M29 16h6v6" />
      <circle cx="35" cy="33" r="6" />
      <path d="M35 30.5v5M33 32.2c.6-.8 3.4-.8 3.4.4 0 1.1-1.4 1-1.4 2" strokeWidth="1.9" />
    </>
  ),
  health: (
    <>
      <path d="M24 41C14.5 34 8.5 27.8 8.5 20.3 8.5 14.6 12.6 10.8 17.3 10.8c2.9 0 5.4 1.5 6.7 3.9 1.3-2.4 3.8-3.9 6.7-3.9 4.7 0 8.8 3.8 8.8 9.5C39.5 27.8 33.5 34 24 41Z" />
      <path d="M13.5 23h5l2.3-4.5 3.7 8 2.3-3.5h4.7" strokeWidth="2.2" />
    </>
  ),
  school: (
    <>
      <path d="M24 9 44 17.5 24 26 4 17.5 24 9Z" />
      <path d="M12.5 21.8v8.4c0 3 5.2 5.3 11.5 5.3s11.5-2.3 11.5-5.3v-8.4" />
      <path d="M44 17.5v9" />
      <circle cx="44" cy="29.5" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  everyday: (
    <>
      <circle cx="24" cy="25" r="15" />
      <path d="M24 17.5V25l5.2 3.4" />
      <path d="M24 6.5v2.5M10.5 11l1.7 1.8M37.5 11l-1.7 1.8" strokeWidth="2.2" />
    </>
  ),
  tax: (
    <>
      <path d="M7 16.5 24 6l17 10.5" />
      <path d="M5.5 20h37" />
      <path d="M11.5 24v9M19 24v9M29 24v9M36.5 24v9" />
      <path d="M5.5 37h37M8.5 41.5h31" />
    </>
  ),
  pdf: (
    <>
      <path d="M14 5h12.5L35 13.5V43H14V5Z" />
      <path d="M26.5 5v8.5H35" />
      <path d="M19 23h10M19 29h10M19 35h6" strokeWidth="2.2" />
    </>
  ),
  image: (
    <>
      <rect x="7" y="10" width="34" height="28" rx="3.5" />
      <circle cx="16.5" cy="19" r="3" />
      <path d="M8 33.5 18.5 24l7.5 6 4.5-3.8L40 34" />
    </>
  ),
  converters: (
    <>
      <path d="M13.5 16.5a12 12 0 0 1 19.8-2.6l2.7 2.6" />
      <path d="M36.5 9.5v7h-7" />
      <path d="M34.5 31.5a12 12 0 0 1-19.8 2.6l-2.7-2.6" />
      <path d="M11.5 38.5v-7h7" />
    </>
  ),
  text: (
    <>
      <path d="M17 14 8 24l9 10M31 14l9 10-9 10" />
      <path d="M27.5 8 20.5 40" />
    </>
  ),
  generators: (
    <>
      <path d="M23 5c.9 8.3 3.2 11.6 12 13.5C26.2 20.4 23.9 23.7 23 32c-.9-8.3-3.2-11.6-12-13.5C19.8 16.6 22.1 13.3 23 5Z" />
      <path d="M37.5 29c.5 4.2 1.7 5.9 6 6.9-4.3 1-5.5 2.7-6 6.9-.5-4.2-1.7-5.9-6-6.9 4.3-1 5.5-2.7 6-6.9Z" strokeWidth="2" />
      <circle cx="11" cy="35" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  tests: (
    <>
      <path d="M9.5 33a15.5 15.5 0 1 1 29 0" />
      <path d="M24 31 31.5 18.5" />
      <circle cx="24" cy="31" r="2.6" />
      <path d="M12 25.5h2.5M24 12v2.8M36 25.5h-2.5" strokeWidth="2.2" />
    </>
  ),
  home: (
    <>
      <path d="M7 23.5 24 8l17 15.5" />
      <path d="M12.5 20v20h23V20" />
      <path d="M20 40V29.5h8V40" />
      <path d="M31.5 12.5h5V19" strokeWidth="2.2" />
    </>
  ),
  book: (
    <>
      <path d="M24 13.5C20.2 10.2 13.5 9.3 7 11v25.5c6.5-1.7 13.2-.8 17 2.5 3.8-3.3 10.5-4.2 17-2.5V11c-6.5-1.7-13.2-.8-17 2.5Z" />
      <path d="M24 13.5v25" />
      <path d="M12 17.5c2.8-.5 5.4-.3 7.5.6M12 23.5c2.8-.5 5.4-.3 7.5.6M28.5 18.1c2.1-.9 4.7-1.1 7.5-.6M28.5 24.1c2.1-.9 4.7-1.1 7.5-.6" strokeWidth="2" />
    </>
  ),
};

/**
 * The motif paths as a bare SVG group (drawn in a 48 by 48 box), for
 * embedding inside another SVG under a transform, where a nested svg
 * element would not land where the transform puts it. Stroke follows
 * currentColor, so set color on the wrapping group.
 */
export function MotifGroup({
  name,
  strokeWidth = 2.6,
}: {
  name: MotifName;
  strokeWidth?: number;
}) {
  return (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {MOTIF_ART[name]}
    </g>
  );
}

export function MotifArt({
  name,
  className = "h-full w-full",
  strokeWidth = 2.6,
}: {
  name: MotifName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <MotifGroup name={name} strokeWidth={strokeWidth} />
    </svg>
  );
}

export default function CategoryEmblem({
  name,
  className = "h-12 w-12 rounded-2xl p-2.5",
}: {
  name: MotifName;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center bg-white ring-1 ring-slate-200 ${MOTIF_COLOR[name]} ${className}`}
      aria-hidden="true"
    >
      <MotifArt name={name} />
    </span>
  );
}

const TOOL_CATEGORY_MOTIF: Record<string, MotifName> = {
  Finance: "finance",
  Health: "health",
  School: "school",
  Everyday: "everyday",
  Tax: "tax",
  "PDF Tools": "pdf",
  "Image Tools": "image",
  "Image Converters": "converters",
  "Text Tools": "text",
  Generators: "generators",
  Tests: "tests",
};

const GROUP_MOTIF: Record<ToolGroup, MotifName> = {
  calculators: "calculator",
  tools: "pdf",
  converters: "converters",
  generators: "generators",
};

/** Motif for a tool category, falling back to the group's motif. */
export function toolCategoryMotif(category: string, group: ToolGroup): MotifName {
  return TOOL_CATEGORY_MOTIF[category] ?? GROUP_MOTIF[group];
}

/** Motif for a top level section (home category cards). */
export function groupMotif(group: ToolGroup): MotifName {
  return GROUP_MOTIF[group];
}

const GUIDE_CATEGORY_MOTIF: Record<GuideCategory, MotifName> = {
  "Finance and Tax": "finance",
  Health: "health",
  "School and Math": "school",
  "Home and DIY": "home",
  "Files and Converters": "converters",
  "Text and Dev Tools": "text",
  Everyday: "everyday",
};

/** Motif for a guide category. */
export function guideCategoryMotif(category: GuideCategory): MotifName {
  return GUIDE_CATEGORY_MOTIF[category];
}
