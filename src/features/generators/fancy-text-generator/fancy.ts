/**
 * Fancy text styles built from Unicode mathematical alphanumeric blocks
 * and enclosed letter blocks.
 *
 * Each style is a character map: for the characters it covers (some or
 * all of a to z, A to Z and 0 to 9) the map points at the styled
 * replacement, and every other character passes through unchanged. A
 * few letters have no styled form in Unicode at all, or live outside
 * their block as letterlike symbols (the italic h, the script capitals
 * borrowed from the letterlike block); those are filled in explicitly
 * below so a word never comes out with a hole in the middle.
 */

export type FancyStyleId =
  | "bold"
  | "italic"
  | "boldItalic"
  | "script"
  | "boldScript"
  | "fraktur"
  | "doubleStruck"
  | "monospace"
  | "sansSerif"
  | "sansBold"
  | "circled"
  | "negativeCircled"
  | "squared"
  | "smallCaps"
  | "superscript";

/** Build a string of `count` consecutive code points starting at `start`. */
function rangeString(start: number, count: number): string {
  let out = "";
  for (let i = 0; i < count; i++) out += String.fromCodePoint(start + i);
  return out;
}

/** Split a styled alphabet string into individual characters (surrogate safe). */
function chars(alphabet: string): string[] {
  return [...alphabet];
}

/**
 * Build a char map from styled alphabets. Each alphabet string must hold
 * its characters in plain order: 26 capitals, 26 small letters, 10 digits.
 * Omit an alphabet the style does not have.
 */
function alphabetMap(upper?: string, lower?: string, digits?: string): Record<string, string> {
  const map: Record<string, string> = {};
  const PLAIN_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const PLAIN_LOWER = "abcdefghijklmnopqrstuvwxyz";
  const PLAIN_DIGITS = "0123456789";
  if (upper) chars(upper).forEach((styled, i) => (map[PLAIN_UPPER[i]] = styled));
  if (lower) chars(lower).forEach((styled, i) => (map[PLAIN_LOWER[i]] = styled));
  if (digits) chars(digits).forEach((styled, i) => (map[PLAIN_DIGITS[i]] = styled));
  return map;
}

/** Build a char map from an explicit per letter record (for patchy styles). */
function explicitMap(entries: Record<string, string>): Record<string, string> {
  return { ...entries };
}

const SMALL_CAPS_MAP = explicitMap({
  a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ꜰ", g: "ɢ", h: "ʜ", i: "ɪ", j: "ᴊ",
  k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "ꞯ", r: "ʀ", s: "ꜱ", t: "ᴛ",
  u: "ᴜ", v: "ᴠ", w: "ᴡ", y: "ʏ", z: "ᴢ",
  A: "ᴀ", B: "ʙ", C: "ᴄ", D: "ᴅ", E: "ᴇ", F: "ꜰ", G: "ɢ", H: "ʜ", I: "ɪ", J: "ᴊ",
  K: "ᴋ", L: "ʟ", M: "ᴍ", N: "ɴ", O: "ᴏ", P: "ᴘ", Q: "ꞯ", R: "ʀ", S: "ꜱ", T: "ᴛ",
  U: "ᴜ", V: "ᴠ", W: "ᴡ", Y: "ʏ", Z: "ᴢ",
});

const SUPERSCRIPT_MAP = explicitMap({
  a: "ᵃ", b: "ᵇ", c: "ᶜ", d: "ᵈ", e: "ᵉ", f: "ᶠ", g: "ᵍ", h: "ʰ", i: "ⁱ", j: "ʲ",
  k: "ᵏ", l: "ˡ", m: "ᵐ", n: "ⁿ", o: "ᵒ", p: "ᵖ", r: "ʳ", s: "ˢ", t: "ᵗ", u: "ᵘ",
  v: "ᵛ", w: "ʷ", x: "ˣ", y: "ʸ", z: "ᶻ",
  A: "ᴬ", B: "ᴮ", D: "ᴰ", E: "ᴱ", G: "ᴳ", H: "ᴴ", I: "ᴵ", J: "ᴶ", K: "ᴷ", L: "ᴸ",
  M: "ᴹ", N: "ᴺ", O: "ᴼ", P: "ᴾ", R: "ᴿ", T: "ᵀ", U: "ᵁ", V: "ⱽ", W: "ᵂ",
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
});

export interface FancyStyle {
  id: FancyStyleId;
  label: string;
  map: Record<string, string>;
}

/** The style table, in display order. Maps are built once at module load. */
export const FANCY_STYLES: FancyStyle[] = [
  { id: "bold", label: "Bold", map: alphabetMap(rangeString(0x1d400, 26), rangeString(0x1d41a, 26), rangeString(0x1d7ce, 10)) },
  {
    id: "italic",
    label: "Italic",
    // The italic small h has no code point in the block, so the Planck
    // constant letterlike (U+210E) fills its slot, as Unicode intends.
    map: alphabetMap(rangeString(0x1d434, 26), rangeString(0x1d44e, 7) + "ℎ" + rangeString(0x1d456, 18)),
  },
  { id: "boldItalic", label: "Bold Italic", map: alphabetMap(rangeString(0x1d468, 26), rangeString(0x1d482, 26)) },
  {
    id: "script",
    label: "Script",
    map: alphabetMap("𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵", "𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏"),
  },
  { id: "boldScript", label: "Bold Script", map: alphabetMap(rangeString(0x1d4d0, 26), rangeString(0x1d4ea, 26)) },
  {
    id: "fraktur",
    label: "Fraktur",
    map: alphabetMap("𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ", rangeString(0x1d51e, 26)),
  },
  {
    id: "doubleStruck",
    label: "Double Struck",
    map: alphabetMap("𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ", rangeString(0x1d552, 26), rangeString(0x1d7d8, 10)),
  },
  { id: "monospace", label: "Monospace", map: alphabetMap(rangeString(0x1d670, 26), rangeString(0x1d68a, 26), rangeString(0x1d7f6, 10)) },
  { id: "sansSerif", label: "Sans Serif", map: alphabetMap(rangeString(0x1d5a0, 26), rangeString(0x1d5ba, 26), rangeString(0x1d7e2, 10)) },
  { id: "sansBold", label: "Sans Bold", map: alphabetMap(rangeString(0x1d5d4, 26), rangeString(0x1d5ee, 26), rangeString(0x1d7ec, 10)) },
  {
    id: "circled",
    label: "Circled",
    map: alphabetMap(rangeString(0x24b6, 26), rangeString(0x24d0, 26), "⓪①②③④⑤⑥⑦⑧⑨"),
  },
  // Negative circled and squared exist for capitals only in Unicode.
  { id: "negativeCircled", label: "Negative Circled", map: alphabetMap(rangeString(0x1f150, 26)) },
  { id: "squared", label: "Squared", map: alphabetMap(rangeString(0x1f130, 26)) },
  { id: "smallCaps", label: "Small Caps", map: SMALL_CAPS_MAP },
  { id: "superscript", label: "Superscript", map: SUPERSCRIPT_MAP },
];

/** Look up one style by id. Throws for an unknown id, which cannot happen from the UI. */
export function getFancyStyle(id: FancyStyleId): FancyStyle {
  const style = FANCY_STYLES.find((s) => s.id === id);
  if (!style) throw new Error(`Unknown fancy text style: ${id}`);
  return style;
}

/**
 * Transform text into a style. Characters with no mapping (punctuation,
 * spaces, and letters the style does not cover) pass through unchanged.
 */
export function transformText(text: string, style: FancyStyleId): string {
  const { map } = getFancyStyle(style);
  let out = "";
  for (const ch of text) out += map[ch] ?? ch;
  return out;
}
