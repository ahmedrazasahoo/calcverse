/**
 * The CalcVerse logo mark: a frosted violet to blue gradient tile carrying a
 * bold white C whose open mouth holds an amber division sign. The C is the
 * brand initial; the division dots and bar tucked into its opening are the
 * "this is a calculator" idea, readable even at favicon size. One shared
 * component so the header, footer and any future surface use the identical
 * mark. The matching favicon lives in src/app/icon.svg and src/app/favicon.ico
 * and draws the same shapes.
 */
export default function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="CalcVerse logo">
      <defs>
        <linearGradient id="cv-logo-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8159ec" />
          <stop offset="0.55" stopColor="#5b3df0" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
        <clipPath id="cv-logo-clip">
          <rect x="2" y="2" width="44" height="44" rx="13" />
        </clipPath>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="13" fill="url(#cv-logo-gradient)" />
      <g clipPath="url(#cv-logo-clip)">
        <ellipse cx="13" cy="2" rx="27" ry="13" fill="#ffffff" opacity="0.16" />
      </g>
      <path
        d="M28.7 16.6 A 10 10 0 1 0 28.7 31.4"
        fill="none"
        stroke="#ffffff"
        strokeWidth="5.6"
        strokeLinecap="round"
      />
      <circle cx="33.5" cy="17.9" r="2.3" fill="#fbbf24" />
      <rect x="29.2" y="22.7" width="8.6" height="2.6" rx="1.3" fill="#fbbf24" />
      <circle cx="33.5" cy="30.1" r="2.3" fill="#fbbf24" />
    </svg>
  );
}
