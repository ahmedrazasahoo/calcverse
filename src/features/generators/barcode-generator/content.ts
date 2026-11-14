import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Barcode Generator: Code 128, Code 39, EAN-13 and UPC-A",
  metaDescription:
    "Free barcode generator with hand built encoders. Create Code 128, Code 39 with optional mod 43 checksum, EAN-13 and UPC-A barcodes with correct check digits, and download them as PNG or SVG.",
  intro:
    "Build real, scannable barcodes in four formats. EAN-13 and UPC-A check digits are worked out for you, Code 39 can add its mod 43 checksum, and Code 128 picks the compact digit set automatically. Download the result as a crisp SVG or a ready to print PNG.",
};

export const content: ToolContent = {
  seoTitle: "Barcode Generator: Code 128, Code 39, EAN-13 and UPC-A",
  howTo: [
    "Pick a format: Code 128 for general text, Code 39 for simple uppercase codes, EAN-13 or UPC-A for retail products.",
    "Type the value. For EAN-13 enter 12 digits and the check digit is added for you; for UPC-A enter 11 digits. Full codes are verified instead.",
    "For Code 39, tick the checksum box if your scanner expects the mod 43 check character.",
    "Adjust the bar height and module scale until the size suits your label, then download the barcode as SVG for design work or PNG for printing.",
  ],
  explanationTitle: "How these four barcode formats encode data",
  explanation: [
    "Every linear barcode is a row of bars and spaces whose widths carry the data, measured in modules, the width of the thinnest element. Code 39 is the oldest design here: each character is nine elements, exactly three of them wide, drawn from a small alphabet of uppercase letters, digits and a few symbols, framed by asterisk start and stop characters. It is forgiving and readable by almost any scanner, but long. Its optional mod 43 checksum adds the values of all characters, divides by 43 and appends the character matching the remainder, so a misread can be caught.",
    "EAN-13 and UPC-A are the retail standards and share one engine. Each digit is seven modules in one of three patterns called L, G and R. The first EAN digit is never drawn directly; it is hidden in the choice of L and G patterns across the left half, which is how a scanner tells an EAN from a UPC. UPC-A is the special case with a leading zero, all L on the left. Both end with a check digit computed from the others with alternating weights: for 590123412345 the weighted sum gives a check digit of 7, and if the last digit of a code you type does not match the computed one, this tool tells you instead of drawing a barcode no till will accept.",
    "Code 128 is the compact professional choice. Each symbol is 11 modules of three bars and three spaces, chosen from a published table of 107 patterns. Set B covers the full printable ASCII range, while set C packs two digits into one symbol. This generator starts in set C when your whole value is an even run of four or more digits, and set B otherwise. A checksum is mandatory in Code 128: the start value plus each symbol value times its position, all modulo 103. For ABC in set B that is (104 + 33 + 68 + 105) mod 103, which is 1, and that invisible symbol rides in every barcode before the stop pattern so scanners can verify the read.",
  ],
  faqs: [
    {
      q: "Which barcode format should I choose?",
      a: "Use EAN-13 for products sold outside North America and UPC-A for products sold in the US and Canada, since tills expect those exact formats. Use Code 128 for warehouse, shipping and internal labels where you control the scanner, and Code 39 for simple asset tags and badges where compatibility matters more than size.",
    },
    {
      q: "Can I enter an EAN-13 or UPC-A without the check digit?",
      a: "Yes. Enter 12 digits for EAN-13 or 11 for UPC-A and the correct check digit is calculated and appended. If you enter the full code, the check digit is verified, and a mismatch is reported with the digit it should have been.",
    },
    {
      q: "Why does my Code 39 text get changed to uppercase?",
      a: "Standard Code 39 only defines uppercase letters, digits and the symbols - . $ / + % and space. Lowercase letters are converted to uppercase before encoding. If you need lowercase or mixed text, use Code 128 instead, which covers the full ASCII set.",
    },
    {
      q: "SVG or PNG, which download should I use?",
      a: "SVG is a vector, so it stays perfectly sharp at any size and is best for labels and design software. PNG is a fixed resolution image rendered at three times the display size here, which suits documents, web pages and quick printing.",
    },
    {
      q: "Will these barcodes actually scan?",
      a: "Yes. The encoders on this page are built directly from the published specifications, including the Code 128 width table and the EAN parity patterns, and the check digits are computed with the standard formulas. Print at a reasonable size, keep the white space on both sides, and any standard scanner or phone app will read them.",
    },
  ],
};
