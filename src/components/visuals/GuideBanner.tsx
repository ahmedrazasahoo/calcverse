import type { GuideCategory } from "@/lib/guides";
import { guideCategoryMotif, MotifArt, type MotifName } from "@/components/visuals/CategoryEmblem";

/**
 * Wide banner artwork for a guide category: a soft two tone gradient field,
 * a dotted texture (one tiny SVG pattern, not hundreds of nodes), floating
 * shapes and the category motif drawn large in white line art. Pure inline
 * SVG generated from the category, so every one of the 70 guide posts gets
 * art with no image files, no network requests and a fixed aspect ratio,
 * which means no layout shift.
 */

interface BannerTheme {
  from: string;
  to: string;
  glow: string;
}

const BANNER_THEME: Record<MotifName, BannerTheme> = {
  calculator: { from: "#9d84f4", to: "#6129c3", glow: "#38bdf8" },
  finance: { from: "#34d399", to: "#0f766e", glow: "#fbbf24" },
  health: { from: "#fb7185", to: "#be185d", glow: "#fda4af" },
  school: { from: "#38bdf8", to: "#1d4ed8", glow: "#7dd3fc" },
  everyday: { from: "#fbbf24", to: "#d97706", glow: "#fde68a" },
  tax: { from: "#94a3b8", to: "#475569", glow: "#cbd5e1" },
  pdf: { from: "#a78bfa", to: "#6d28d9", glow: "#f0abfc" },
  image: { from: "#e879f9", to: "#7c3aed", glow: "#f5d0fe" },
  converters: { from: "#22d3ee", to: "#0369a1", glow: "#a5f3fc" },
  text: { from: "#2dd4bf", to: "#0e7490", glow: "#99f6e4" },
  generators: { from: "#e879f9", to: "#a21caf", glow: "#f5d0fe" },
  tests: { from: "#818cf8", to: "#6d28d9", glow: "#c7d2fe" },
  home: { from: "#fb923c", to: "#b45309", glow: "#fed7aa" },
  book: { from: "#9d84f4", to: "#6129c3", glow: "#fbbf24" },
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
  const theme = BANNER_THEME[motif];
  const gid = `cv-bn-${motif}-${variant}`;
  const dotsId = `cv-dots-${variant}`;
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
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={theme.from} />
          <stop offset="100%" stopColor={theme.to} />
        </linearGradient>
        <pattern id={dotsId} width="40" height="30" patternUnits="userSpaceOnUse">
          <circle cx="24" cy="20" r="1.7" fill="#ffffff" />
        </pattern>
      </defs>
      <rect width="800" height={height} fill={`url(#${gid})`} />
      <rect width="800" height={height} fill={`url(#${dotsId})`} opacity="0.16" />
      {/* soft glows and floating shapes */}
      <circle cx="660" cy={tall ? 30 : 8} r={tall ? 130 : 74} fill={theme.glow} opacity="0.28" />
      <circle cx="90" cy={tall ? 235 : 118} r={tall ? 96 : 52} fill="#ffffff" opacity="0.12" />
      <circle cx="330" cy={tall ? 40 : 16} r="7" fill="#ffffff" opacity="0.35" />
      <circle cx="392" cy={tall ? 198 : 96} r="5" fill="#ffffff" opacity="0.3" />
      <circle cx="238" cy={tall ? 120 : 58} r="3.6" fill="#ffffff" opacity="0.4" />
      <path
        d={
          tall
            ? "M452 205c.8 5.4 2.4 7.6 8.4 9-6 1.4-7.6 3.6-8.4 9-.8-5.4-2.4-7.6-8.4-9 6-1.4 7.6-3.6 8.4-9Z"
            : "M452 92c.8 5.4 2.4 7.6 8.4 9-6 1.4-7.6 3.6-8.4 9-.8-5.4-2.4-7.6-8.4-9 6-1.4 7.6-3.6 8.4-9Z"
        }
        fill="#ffffff"
        opacity="0.5"
      />
      {/* large motif, right side */}
      <g transform={tall ? "translate(596 45) scale(3.35)" : "translate(648 18) scale(1.75)"} color="#ffffff" opacity="0.92">
        <MotifArt name={motif} strokeWidth={2.1} />
      </g>
      {/* faint oversized motif echo, left */}
      <g transform={tall ? "translate(-14 96) scale(2.6)" : "translate(-10 44) scale(1.5)"} color="#ffffff" opacity="0.14">
        <MotifArt name={motif} strokeWidth={2.1} />
      </g>
    </svg>
  );
}
