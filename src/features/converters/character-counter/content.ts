/** SEO content for the Character Counter page. */
export const content = {
  title: "Character Counter Online, Count Characters With and Without Spaces",
  metaDescription:
    "Count characters with and without spaces as you type, plus words, sentences, paragraphs and lines, with room left against post, SMS and description limits. Free and private.",
  intro:
    "Some limits count words, but most of the tight ones count characters: a social post, a text message, a form field, a search result description. Paste your text here and the count updates with every keystroke, with and without spaces, alongside words, sentences, paragraphs and lines, and a running note of how much room you have left against the limits people hit most often. Everything is counted in your browser, so drafts and private messages stay private.",
  howTo: [
    "Type or paste your text into the box. There is no count button; the figures follow your typing live.",
    "Use the Characters card for platform and form limits, since those almost always include spaces.",
    "Check the helper lines under the cards to see how much room is left for a short post, a text message or a search description.",
    "Trim in place and watch the number fall until the text fits, then copy it back where it belongs.",
  ],
  explanationTitle: "Which character count a limit actually uses",
  explanation: [
    "Nearly every hard limit in daily writing counts all characters, spaces included. A social post capped at 280 characters spends them on spaces and line breaks just as surely as on letters, and a classic SMS segment holds 160 characters of the GSM alphabet before your message silently becomes two segments and costs twice as much. Search engines are softer about it: a meta description is cut off by pixel width rather than an exact count, but around 150 to 160 characters is the working budget before the text trails off in the results. Form fields are the strictest of all: a database column or an application box counts exactly what it says, and pasting one character too many can truncate the end of your sentence without warning.",
    "Characters without spaces earns its place in different corners. Some essay and grant forms quote a limit that excludes spaces, older messaging and telegraph style pricing did the same, and translators and proofreaders often price or estimate from the no spaces figure because it tracks the actual letters typed. This counter shows both numbers at once so you never have to guess which one a rule means. One counting choice is worth knowing: characters here are Unicode code points, so an emoji counts as one character even though it is stored as two code units under the hood. Emoji with skin tones or joined family emoji count as several code points, one per building block, which is close to how the platforms themselves tally them.",
  ],
  faqs: [
    {
      q: "Do spaces count towards a character limit?",
      a: "On almost every platform and form, yes. Spaces, punctuation and line breaks are characters like any other, and the main Characters figure here includes them all. The without spaces figure is there for the minority of limits, and some pricing, that excludes them.",
    },
    {
      q: "How many characters are in one SMS segment?",
      a: "A single segment holds 160 characters in the basic GSM alphabet, which covers plain English letters, digits and common punctuation. Add an emoji or a character outside that alphabet and the whole message switches encoding, dropping each segment to 70 characters, so a short message can split into several segments surprisingly fast.",
    },
    {
      q: "How long should a meta description be?",
      a: "Aim for roughly 150 to 160 characters. Search engines actually truncate by the width of the rendered text, not a fixed count, so treat 160 as a budget rather than a law, and put the words that matter near the front in case the end is cut off.",
    },
    {
      q: "Why does my emoji count as more than one character on some tools?",
      a: "Simple emoji are single Unicode code points and count as one here. Decorated ones are built from several code points stuck together: a skin tone adds one, and a family emoji can be four faces joined by invisible connectors. Tools that count raw code units give yet another number, which is why counts for emoji heavy text differ between counters.",
    },
    {
      q: "Is my text stored or sent anywhere?",
      a: "No. The counting runs entirely in your browser as you type. Refresh or close the tab and the text is gone, which makes the tool safe for drafts, applications and private messages.",
    },
  ],
};
