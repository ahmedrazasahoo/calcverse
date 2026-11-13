/**
 * The CalcVerse logo mark: a rounded tile with a violet gradient, a bold
 * white C and a small amber calculator dot. One shared component so the
 * header, footer and any future surface use the identical mark. The matching
 * favicon lives in src/app/icon.svg and draws the same shapes.
 */
export default function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="CalcVerse logo">
      <defs>
        <linearGradient id="cv-logo-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7c5cf6" />
          <stop offset="1" stopColor="#4c1d95" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="13" fill="url(#cv-logo-gradient)" />
      <path
        d="M32.5 17.2c-1.9-2.3-4.6-3.5-7.7-3.5-5.9 0-10.3 4.6-10.3 10.3s4.4 10.3 10.3 10.3c3.1 0 5.8-1.2 7.7-3.5"
        fill="none"
        stroke="#ffffff"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="35.5" cy="24" r="3.4" fill="#f59e0b" />
    </svg>
  );
}
