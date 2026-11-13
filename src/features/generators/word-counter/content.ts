/** SEO content for the Word Counter page. */
export const content = {
  title: "Word Counter Online, Words, Characters, Sentences and Reading Time",
  metaDescription:
    "Count words, characters, sentences and paragraphs as you type, with reading time and your most used words. Free, instant, and nothing is uploaded.",
  intro:
    "Paste your essay, article, application or post and watch the counts update with every keystroke: words, characters with and without spaces, sentences, paragraphs, reading time, speaking time and the words you lean on most. Your text is analysed in the browser and never leaves your device.",
  howTo: [
    "Paste or type your text into the box. Counting starts immediately.",
    "Read the cards for the numbers your limit cares about, usually words or characters.",
    "Check the most used words list to catch accidental repetition before you submit.",
    "Edit in place; every figure updates live as you work.",
  ],
  explanationTitle: "How word limits and reading times are really counted",
  explanation: [
    "Word counters split on whitespace, which is the same rule universities, journals and application portals use. That makes this count the number a checker will see, not an approximation. Characters without spaces matters for a different crowd: forms and databases that measure storage, and social platforms with hard character caps, count every character including spaces, so both numbers are shown side by side.",
    "Reading time assumes an average adult reads about 200 words a minute in silence, and speaking time assumes about 130 words a minute aloud, the pace of a calm presentation. Speeches, sermons and video scripts should always be planned on the speaking figure, then tested with a stopwatch, because nerves speed everyone up.",
  ],
  faqs: [
    {
      q: "Is my text uploaded or saved?",
      a: "No. The counting happens in your browser as you type. Close the tab and the text is gone.",
    },
    {
      q: "Why is my word count different from my word processor?",
      a: "Small differences come from edge cases: hyphenated words, numbers and stray punctuation. Both counters split on spaces; processors sometimes join or split hyphenated terms differently. The gap is normally under one percent.",
    },
    {
      q: "Does the counter work for essays with references?",
      a: "Yes, it counts everything in the box. If your limit excludes references, paste the essay without them, note the count, then check the references separately.",
    },
    {
      q: "What reading speed does the reading time use?",
      a: "Two hundred words per minute, the standard average for adults reading silently. Skim readers are faster, dense technical text is slower.",
    },
    {
      q: "Can I count characters for a social media post?",
      a: "Yes. Use the Characters figure, which counts everything including spaces and line breaks, the same way the platforms do.",
    },
  ],
};
