import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Fancy Text Generator: Bold, Script, Circled and 15 Unicode Styles to Copy and Paste",
  metaDescription:
    "Turn plain text into bold, italic, script, fraktur, circled, small caps and superscript Unicode styles. Copy any style in one click for bios, display names and posts.",
  intro:
    "Type a word or a line and see it in fifteen fancy Unicode styles at once: bold, script, fraktur, circled, small caps and more. These are real characters rather than a font, so the style travels with the text when you paste it into a bio, a display name or a post.",
};

export const content: ToolContent = {
  seoTitle: "Fancy Text Generator: Bold, Script, Circled and 15 Unicode Styles to Copy and Paste",
  howTo: [
    "Type or paste the text you want to style into the box. A short name, a bio line or a heading works best.",
    "Scan the list: every style updates live as you type, so you can compare bold, script, circled and the rest side by side.",
    "Press the Copy button on the style you like.",
    "Paste it where you need it: a social media bio, a display name, a chat status or a post.",
    "Check how it looks on the other platform before you save, because a small number of older apps show boxes for the rarest characters.",
  ],
  explanationTitle: "How fancy text works, and where it actually sticks",
  explanation: [
    "Fancy text is not a font and it is not formatting. Unicode, the master list of characters every device shares, contains whole extra alphabets built for mathematics: a bold A (U+1D400), an italic a (U+1D44E), a monospace digit block, circled and squared letter blocks, and small capital lookalikes collected from phonetic alphabets. This generator swaps each plain letter for its counterpart in one of those blocks. Because the result is ordinary text, you can paste it anywhere text goes and it keeps its look with no styling support needed from the app.",
    "That freedom comes with honest limits. A few letters simply have no styled version: Unicode never assigned a small capital x or a superscript q, and the negative circled and squared blocks only contain capitals, so those characters pass through unchanged instead of disappearing. Coverage also varies by device. The mathematical blocks are widely supported on modern phones and computers, while the squared letters are the most likely to show as blank boxes on older hardware.",
    "Accessibility is the other trade worth knowing. Screen readers may spell styled words out letter by letter, read the mathematical names aloud, or skip the characters entirely, which makes a fully styled bio hard work for a blind reader. A popular pattern is to style a short name or one decorative line and keep the important information, links, prices and contact details, in plain text that every reader and every search box can handle.",
  ],
  faqs: [
    {
      q: "Why does my fancy text work in one app and show boxes in another?",
      a: "Each app and device relies on its own fonts to draw the characters. Modern phones and browsers cover the mathematical alphabets well, but older devices and some desktop apps lack glyphs for the newest blocks, especially the squared letters, and draw an empty box instead. If a style matters, paste it into the app and check before you publish.",
    },
    {
      q: "Is fancy text good for passwords or usernames?",
      a: "No. Many systems reject characters outside plain a to z and 0 to 9, and the ones that accept them can be painful to type on another device or to read out over the phone. Use fancy text for display: bios, headings, names and decorative lines. Keep logins and passwords in plain characters.",
    },
    {
      q: "Why do some letters stay plain in small caps and superscript?",
      a: "Because Unicode has no character for them. There is no small capital x and no superscript small q in the standard, so the generator leaves the original letter in place rather than dropping it or swapping in something misleading. Your word stays complete and readable.",
    },
    {
      q: "Can I use fancy text in my Instagram or TikTok bio?",
      a: "Yes, that is the most common use. Paste the styled version into the name or bio field and it keeps its look for visitors. Keep links, your real name in at least one plain line, and anything followers need to search for in plain text, because platform search does not match styled letters to plain queries.",
    },
    {
      q: "Does fancy text count as more characters?",
      a: "Each styled letter is still one character, but some platforms count storage bytes instead, and characters from these blocks take up to four bytes each. In a tight limit, such as a short display name field, a styled line can fill the allowance faster than a plain one.",
    },
  ],
};
