/** SEO content for the Case Converter page. */
export const content = {
  title: "Case Converter Online, Uppercase, Title Case, camelCase, snake_case and More",
  metaDescription:
    "Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case and CONSTANT_CASE in one click. Free, instant, nothing uploaded.",
  intro:
    "Caps lock accidents, headlines that need proper title case, variables that need to be camelCase before the code review: case problems show up everywhere, and retyping is the slow way to fix them. Paste your text once, tap a style, and copy the converted result, or download it as a plain text file. Twelve styles cover prose, headings, file names and code identifiers, and the conversion happens in your browser.",
  howTo: [
    "Type or paste your text into the top box.",
    "Click a style button: prose styles on the left, identifier styles for code on the right.",
    "Read the result in the lower box. It updates live if you keep typing or switch styles.",
    "Copy the result with one click, or download it as a .txt file for longer pieces.",
  ],
  explanationTitle: "Which case style belongs where",
  explanation: [
    "Prose styles follow publishing habits. Title Case capitalises the important words of a heading and keeps small connecting words (a, an, the, and, or, of, in, on, at, to, for, with) lowercase in the middle, which is why The Lord of the Rings looks right and The Lord Of The Rings looks slightly off; the Capitalize Each Word style exists for the places, some headline guidelines and many title generators among them, that lift every word regardless. Sentence case does the opposite: one capital to open each sentence and lowercase everywhere else, the style most modern brands, apps and help centers now use for headings because it reads calm and friendly. UPPERCASE is best kept for short labels and warnings, since a whole paragraph in capitals reads as shouting in email and measurably slows reading down. Sentence case here follows a simple documented rule: lowercase everything, then lift the first letter of each sentence. Proper nouns and acronyms get lowered along with the rest, so give names a quick once over after converting.",
    "Identifier styles follow code conventions. camelCase packs words together with each new word capitalised and stays the default for variables and functions in JavaScript, Java and Swift. PascalCase capitalises the first word too and names classes and components. snake_case separates words with underscores, standard in Python and Ruby and common in database columns, while CONSTANT_CASE is snake case shouted: reserved for constants that never change. kebab-case uses hyphens, which is why it owns URLs, CSS class names and file names, where underscores and capitals cause trouble. File names deserve a special mention: lowercasing and hyphenating a name like My Holiday Photo.JPG into my-holiday-photo.jpg prevents the broken links that happen when a capital letter sneaks onto a case sensitive server.",
  ],
  faqs: [
    {
      q: "What is the difference between Title Case and Capitalize Each Word?",
      a: "Title case keeps small connecting words lowercase when they sit in the middle: a, an, the, and, or, of, in, on, at, to, for and with. Capitalize Each Word lifts every single word, small ones included. Book and article titles usually follow title case; some headline styles and form labels prefer every word lifted.",
    },
    {
      q: "I typed a whole email in caps by accident. Which style fixes it?",
      a: "Use Sentence case. It lowercases the shouting and puts one capital at the start of each sentence, which is how the email should have read. Just check names, places and acronyms afterwards, because the simple rule lowercases them too and you will want to lift those back by hand.",
    },
    {
      q: "Which case should I use for a file name or a URL?",
      a: "kebab-case: all lowercase with hyphens between words. It avoids the two classic failures, spaces that turn into messy percent codes and capital letters that break links on case sensitive servers. It is also the easiest form to read aloud or type from a printed page.",
    },
    {
      q: "Does alternating case change my text permanently?",
      a: "Only the copy you take away. The original box keeps whatever you typed, and switching styles always converts from that original, so you can try aLtErNaTiNg for a meme or a playful post and come straight back to a sensible style with one click.",
    },
    {
      q: "Is my text uploaded or saved?",
      a: "No. The conversion runs in your browser the moment you click a style. Nothing is sent to a server or stored, so pasted emails, drafts and code snippets stay on your device.",
    },
  ],
};
