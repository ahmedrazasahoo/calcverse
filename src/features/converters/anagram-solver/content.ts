import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Anagram Solver: Find Every Word Hidden in Your Letters",
  metaDescription:
    "Type two to twelve letters and find every exact anagram in a 315,000 word dictionary, instantly. Free, no signup, and the search runs in your browser.",
  intro:
    "Type the letters and the solver checks them against a full English dictionary of about 315,000 words, showing every word that uses all your letters exactly once. It loads the dictionary once, in about a second, and after that every search is instant.",
};

export const content: ToolContent = {
  seoTitle: "Anagram Solver: Find Every Word Hidden in Your Letters",
  howTo: [
    "Wait a moment for the dictionary to load. The input box unlocks when it is ready.",
    "Type two to twelve letters, for example listen, heart or triangle.",
    "Read the count first: that is how many exact anagrams exist in the dictionary for those letters.",
    "Click any word chip to copy it, handy for settling a game argument or finishing a puzzle.",
    "If there is no exact anagram, switch to the Word Unscrambler to find the shorter words hiding inside your letters.",
  ],
  explanationTitle: "What counts as an anagram, and how the solver finds them so fast",
  explanation: [
    "An anagram uses every letter exactly once: listen rearranges into silent, enlist and tinsel, while lines does not qualify because it leaves the t behind and short words like tin are plays, not anagrams. This solver only returns the exact full length matches, which is what puzzle setters, word game players and curious minds usually mean by the word anagram. The shorter words inside your letters are a different and bigger list, and the Word Unscrambler on this site exists for exactly that job.",
    "The speed comes from a simple trick called a signature. Sort a word's letters alphabetically and every anagram of it produces the same string: cat, act and tac all sign as act. The solver signs the whole dictionary once when it loads, groups words by signature, and then a search is a single lookup rather than a scan of 315,000 words. That is why results feel instant even on a phone, and why the same approach powers serious word game software.",
    "The dictionary matters as much as the method. This one holds about 315,000 English words between two and twelve letters, which covers the long tail of plurals, verb forms and unusual words that settle arguments, but very long words, proper names and the newest slang sit outside it. If a rearrangement you are sure about does not appear, it is usually one of those three: a name, a word longer than twelve letters, or a word too new for the list.",
  ],
  faqs: [
    {
      q: "What is the difference between an anagram and an unscrambled word?",
      a: "An anagram uses all the letters exactly once, so it is always the same length as the starting word. Unscrambling is looser: it finds every shorter word that can be built from some of the letters, which is what you want for word game racks. This page does the strict version; the Word Unscrambler here does the loose one.",
    },
    {
      q: "Why does the dictionary take a second to load?",
      a: "The word list is a file of about 315,000 words, roughly 3 MB, and your browser downloads and indexes it once when the page opens. After that, searches run entirely on your device with no further loading, and nothing you type is sent anywhere.",
    },
    {
      q: "A word I expected is missing. Why?",
      a: "Three usual reasons: it is a proper name (the dictionary holds common words, not names), it is longer than twelve letters, or it is very new or very rare slang that the list has not picked up. Everything else, including plurals and verb endings, should be there.",
    },
    {
      q: "Which words have the most anagrams?",
      a: "Short common letter sets are the richest. The letters in least rearrange into slate, stale, tales, teals, tesla and more near misses, and a set like aelrst is famous among word game players for the stack of words it forms. Try your own name letters too, most people are surprised at least once.",
    },
    {
      q: "Can I use this for Scrabble or Words With Friends?",
      a: "You can find anagrams of a full rack here when you use every tile, but for finding the best scoring play from part of a rack, the Word Unscrambler is the better fit because it returns shorter words too and understands blank tiles. Whether using a solver counts as fair play is between you and your opponent.",
    },
  ],
};
