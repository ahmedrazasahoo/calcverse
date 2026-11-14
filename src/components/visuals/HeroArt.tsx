/**
 * Home page hero artwork: a layered, pure inline SVG composition in the
 * site's violet and blue gradient language. A glass calculator card floats
 * over a rising chart card, with a percent medallion, a gold coin and small
 * sparkles around them. Zero network requests, zero layout shift (fixed
 * viewBox aspect), and the only motion is gentle transform floats, which
 * the global reduced motion rule disables.
 */
export default function HeroArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 470"
      className={className}
      role="img"
      aria-label="Illustration of a calculator, a rising chart, a percent badge and a coin"
      focusable="false"
    >
      <defs>
        <linearGradient id="cv-hero-violet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9d84f4" />
          <stop offset="100%" stopColor="#6129c3" />
        </linearGradient>
        <linearGradient id="cv-hero-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="cv-hero-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="cv-hero-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f2f0fe" />
          <stop offset="100%" stopColor="#e6f6fd" />
        </linearGradient>
        <linearGradient id="cv-hero-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#8159ec" />
        </linearGradient>
      </defs>

      {/* soft backdrop shapes */}
      <circle cx="290" cy="215" r="185" fill="#8159ec" opacity="0.08" />
      <circle cx="290" cy="215" r="140" fill="#38bdf8" opacity="0.07" />
      <circle cx="86" cy="86" r="34" fill="#f59e0b" opacity="0.14" />
      <circle cx="492" cy="392" r="26" fill="#38bdf8" opacity="0.16" />
      <g fill="#8159ec" opacity="0.22">
        <circle cx="58" cy="196" r="4" />
        <circle cx="74" cy="222" r="3" />
        <circle cx="474" cy="120" r="4" />
        <circle cx="498" cy="146" r="3" />
        <circle cx="438" cy="96" r="2.6" />
        <circle cx="108" cy="368" r="3.4" />
      </g>

      {/* chart card, behind and to the left */}
      <g className="cv-float-b">
        <rect x="36" y="238" width="252" height="168" rx="24" fill="#ffffff" opacity="0.82" />
        <rect x="36" y="238" width="252" height="168" rx="24" fill="none" stroke="#ffffff" strokeWidth="1.5" />
        <path d="M64 356 L118 316 L156 336 L224 262" fill="none" stroke="url(#cv-hero-line)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M206 258 L228 256 L226 278" fill="none" stroke="#8159ec" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="118" cy="316" r="7" fill="#ffffff" stroke="#38bdf8" strokeWidth="4" />
        <circle cx="224" cy="262" r="7" fill="#ffffff" stroke="#8159ec" strokeWidth="4" />
        <rect x="62" y="374" width="86" height="10" rx="5" fill="#6129c3" opacity="0.14" />
        <rect x="160" y="374" width="52" height="10" rx="5" fill="#6129c3" opacity="0.09" />
        <g fill="#0ea5e9" opacity="0.3">
          <rect x="64" y="330" width="9" height="44" rx="4.5" />
          <rect x="80" y="318" width="9" height="56" rx="4.5" />
        </g>
        <g opacity="0.3" fill="#8159ec">
          <rect x="238" y="300" width="9" height="74" rx="4.5" />
          <rect x="254" y="282" width="9" height="92" rx="4.5" />
        </g>
      </g>

      {/* calculator card, the hero piece */}
      <g className="cv-float-a">
        <rect x="196" y="52" width="238" height="318" rx="30" fill="#ffffff" opacity="0.94" />
        <rect x="196" y="52" width="238" height="318" rx="30" fill="none" stroke="#ffffff" strokeWidth="2" />
        <rect x="222" y="80" width="186" height="72" rx="16" fill="url(#cv-hero-screen)" />
        <g fill="#6129c3">
          <rect x="330" y="98" width="58" height="12" rx="6" opacity="0.75" />
          <rect x="288" y="122" width="100" height="12" rx="6" opacity="0.38" />
        </g>
        <g>
          <rect x="222" y="176" width="40" height="40" rx="13" fill="#8159ec" opacity="0.16" />
          <rect x="274" y="176" width="40" height="40" rx="13" fill="#8159ec" opacity="0.16" />
          <rect x="326" y="176" width="40" height="40" rx="13" fill="#38bdf8" opacity="0.28" />
          <rect x="378" y="176" width="40" height="40" rx="13" fill="#8159ec" opacity="0.16" />
          <rect x="222" y="228" width="40" height="40" rx="13" fill="#8159ec" opacity="0.16" />
          <rect x="274" y="228" width="40" height="40" rx="13" fill="#38bdf8" opacity="0.28" />
          <rect x="326" y="228" width="40" height="40" rx="13" fill="#8159ec" opacity="0.16" />
          <rect x="378" y="228" width="40" height="40" rx="13" fill="#8159ec" opacity="0.16" />
          <rect x="222" y="280" width="40" height="40" rx="13" fill="#38bdf8" opacity="0.28" />
          <rect x="274" y="280" width="40" height="40" rx="13" fill="#8159ec" opacity="0.16" />
          <rect x="326" y="280" width="92" height="40" rx="13" fill="url(#cv-hero-gold)" />
          <rect x="356" y="296" width="32" height="8" rx="4" fill="#ffffff" opacity="0.9" />
        </g>
      </g>

      {/* percent medallion */}
      <g className="cv-float-c">
        <circle cx="466" cy="196" r="47" fill="url(#cv-hero-violet)" />
        <circle cx="466" cy="196" r="47" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.65" />
        <g stroke="#ffffff" strokeWidth="7.5" strokeLinecap="round" fill="none">
          <path d="M446 216 L486 176" />
        </g>
        <circle cx="449" cy="179" r="8.5" fill="none" stroke="#ffffff" strokeWidth="6.5" />
        <circle cx="483" cy="213" r="8.5" fill="none" stroke="#ffffff" strokeWidth="6.5" />
      </g>

      {/* gold coin */}
      <g className="cv-float-b">
        <circle cx="140" cy="140" r="35" fill="url(#cv-hero-gold)" />
        <circle cx="140" cy="140" r="26.5" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.75" />
        <path d="M140 124v32M131.5 132.5c1.2-2.8 15.5-3.2 15.5 1.6 0 4.4-8.5 3.9-8.5 8.4 0 4.8 14.3 4.4 15.5 1.6" fill="none" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
      </g>

      {/* sparkles */}
      <g fill="#8159ec">
        <path className="cv-float-c" d="M64 268c.8 5.4 2.4 7.6 8.4 9-6 1.4-7.6 3.6-8.4 9-.8-5.4-2.4-7.6-8.4-9 6-1.4 7.6-3.6 8.4-9Z" opacity="0.55" />
        <path className="cv-float-a" d="M502 288c.6 4.2 1.9 5.9 6.5 7-4.6 1.1-5.9 2.8-6.5 7-.6-4.2-1.9-5.9-6.5-7 4.6-1.1 5.9-2.8 6.5-7Z" fill="#f59e0b" opacity="0.7" />
        <path className="cv-float-b" d="M438 52c.5 3.4 1.5 4.8 5.3 5.7-3.8.9-4.8 2.3-5.3 5.7-.5-3.4-1.5-4.8-5.3-5.7 3.8-.9 4.8-2.3 5.3-5.7Z" fill="#38bdf8" opacity="0.65" />
      </g>
    </svg>
  );
}
