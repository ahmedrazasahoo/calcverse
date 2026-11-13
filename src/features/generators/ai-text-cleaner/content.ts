/** SEO content for the AI Text Cleaner page. */
export const content = {
  title: "AI Text Cleaner, Remove Em Dashes, Hidden Characters and Markdown",
  metaDescription:
    "Clean text copied from chatbots: replace em dashes with natural punctuation, strip invisible zero width characters and remove Markdown symbols. Free, in your browser.",
  intro:
    "Text copied straight out of a chatbot carries three kinds of machine litter: an em dash in every other sentence, invisible characters hiding between the words, and Markdown symbols that turn into hash marks and asterisks the moment you paste into an email or document. Paste your text here and all three are cleaned in one pass, on your own device.",
  howTo: [
    "Paste the AI generated text into the left box.",
    "Leave the cleaning steps ticked, or switch off any step you do not want.",
    "Read the cleaned text on the right and check the change counts underneath.",
    "Copy the cleaned text into your document, email or CMS.",
  ],
  explanationTitle: "Why AI text looks machine made, and what this tool changes",
  explanation: [
    "Chatbots lean on the em dash the way a nervous speaker leans on a favourite word. Human writers use it sparingly, so a page full of dashes reads as generated even before anyone checks anything else. This tool replaces each dash with the punctuation a person would probably have chosen: a comma when the sentence rolls on in lowercase, a full stop when a fresh sentence clearly begins.",
    "The invisible characters are quieter but stranger. Zero width spaces and soft hyphens ride along when text is copied from some AI interfaces, and they can break search, sorting and word counts in documents later. They do nothing for a reader, so they are deleted on sight.",
    "Markdown stripping is the practical step. Headings, bold markers, link syntax and code fences are instructions for a renderer; pasted into Word, Gmail or a form, they are just noise characters. The cleaner removes the symbols and keeps every word.",
    "One honest note: cleaning formatting is not the same as rewriting. This tool will not disguise text you did not write, and it should be used to tidy your own drafts, not to pass off machine text as human work where that distinction matters.",
  ],
  faqs: [
    {
      q: "Is my text uploaded or stored?",
      a: "No. The cleaning runs in your browser, and the text never leaves your device.",
    },
    {
      q: "Will this make AI text undetectable?",
      a: "That is not what it does, and no formatting change can promise that. It removes punctuation habits and hidden characters so your own edited drafts read naturally and paste cleanly.",
    },
    {
      q: "Why did a dash become a full stop instead of a comma?",
      a: "When the word after the dash starts with a capital letter, the dash was almost certainly joining two sentences, so a full stop reads better. Lowercase continuations get a comma.",
    },
    {
      q: "What are invisible characters, really?",
      a: "Characters with no visible shape, like zero width spaces, that slip into copied text. They can break find and replace, word counts and database imports, and they serve no purpose in finished writing.",
    },
    {
      q: "Does it change my words?",
      a: "No words are added, removed or reordered. Only dashes, invisible characters, Markdown symbols and excessive blank lines are touched.",
    },
  ],
};
