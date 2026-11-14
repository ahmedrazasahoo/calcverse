import type { GuideCategory } from "@/lib/guides";
import { guideCategoryMotif, MotifGroup, type MotifName } from "@/components/visuals/CategoryEmblem";

/**
 * Wide banner for a guide category, in the system's engineered language: a
 * flat slate-50 field with a fine dot grid, faint grid lines, the category
 * motif drawn large in its accent color, and a hairline along the bottom.
 * Pure inline SVG generated from the category, so every one of the 70 guide
 * posts gets a banner with no image files, no network requests and a fixed
 * aspect ratio, which means no layout shift.
 */

/** Accent hex per motif, matching the CategoryEmblem text colors. */
const MOTIF_HEX: Record<MotifName, string> = {
  calculator: "#7038e0",
  finance: "#059669",
  health: "#e11d48",
  school: "#0284c7",
  everyday: "#d97706",
  tax: "#475569",
  pdf: "#dc2626",
  image: "#7c3aed",
  converters: "#0891b2",
  text: "#0d9488",
  generators: "#c026d3",
  tests: "#4f46e5",
  home: "#ea580c",
  book: "#7038e0",
};

export default function GuideBanner({
  category,
  variant = "article",
  className = "",
}: {
  category: GuideCategory;
  /** article: tall banner at the top of a guide; card: slim strip on hub cards. */
  variant?: "article" | "card";
  className?: string;
}) {
  const motif = guideCategoryMotif(category);
  const accent = MOTIF_HEX[motif];
  const gid = `cv-bn-${motif}-${variant}`;
  const tall = variant === "article";
  const height = tall ? 250 : 120;
  return (
    <svg
      viewBox={`0 0 800 ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id={`${gid}-dots`} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.3" fill="#64748b" />
        </pattern>
        <pattern id={`${gid}-grid`} width="54" height="54" patternUnits="userSpaceOnUse">
          <path d="M54 0H0v54" fill="none" stroke="#64748b" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="800" height={height} fill="#f8fafc" />
      <rect width="800" height={height} fill={`url(#${gid}-grid)`} opacity="0.05" />
      <rect width="800" height={height} fill={`url(#${gid}-dots)`} opacity="0.14" />
      {/* faint oversized motif echo, left */}
      <g transform={tall ? "translate(-16 92) scale(2.7)" : "translate(-10 42) scale(1.55)"} color="#0f172a" opacity="0.05">
        <MotifGroup name={motif} strokeWidth={2.1} />
      </g>
      {/* sparse accent dots, echoing the hero particle field */}
      <circle cx="330" cy={tall ? 52 : 22} r="3" fill={accent} opacity="0.4" />
      <circle cx="392" cy={tall ? 198 : 96} r="2.4" fill={accent} opacity="0.3" />
      <circle cx="238" cy={tall ? 128 : 60} r="2" fill={accent} opacity="0.35" />
      <circle cx="508" cy={tall ? 66 : 30} r="2.2" fill="#2563eb" opacity="0.3" />
      {/* large motif, right side, in the category accent */}
      <g transform={tall ? "translate(600 49) scale(3.3)" : "translate(652 20) scale(1.7)"} color={accent} opacity="0.92">
        <MotifGroup name={motif} strokeWidth={2.1} />
      </g>
      {/* bottom hairline with an accent segment */}
      <rect y={height - 2} width="800" height="2" fill="#e2e8f0" />
      <rect y={height - 2} width="180" height="2" fill={accent} />
    </svg>
  );
}
