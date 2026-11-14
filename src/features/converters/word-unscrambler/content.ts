import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Word Unscrambler: Unscramble Letters Into Every Possible Word",
  metaDescription:
    "Unscramble jumbled letters into every word they can form, grouped by length, with support for up to two blank tiles. Built for word games, puzzles and crosswords.",
  intro:
    "Type a jumbled word or a full rack of game tiles and the unscrambler finds every word hiding in them, grouped by length with the longest plays first. Add a question mark for each blank tile and it will stand in for any letter you need.",
};

export const content: ToolContent = {
  seoTitle: "Word Unscrambler: Unscramble Letters Into Every Possible Word",
  howTo: [
    "Wait a moment for the dictionary to load. The inputs unlock when it is ready.",
    "Type your scrambled letters, two to twelve of them. For a blank tile, type ? instead of a letter (two blanks maximum).",
    "Pick a minimum word length: 2 lets everything through, while 4 or 5 keeps only the plays worth making.",
    "Read the results grouped by length, longest first, with a count for each group.",
    "Click any word to copy it, then place it in your game, puzzle or crossword.",
  ],
  explanationTitle: "How unscrambling works, and how to use the results well",
  explanation: [
    "Unscrambling is a counting problem. Every word is a claim on letters: cat needs one c, one a and one t. The unscrambler holds your tiles as a multiset of letter counts, checks each of the roughly 315,000 dictionary words against them, and keeps the words whose letters can all be paid out of your rack. A blank tile changes the arithmetic in your favour: it can cover one missing letter, so a rack with a blank suddenly forms hundreds of extra words, which is why blanks are the most valuable tiles in word games and why this tool treats question marks as wildcards.",
    "Longest is not always best, and the grouping by length exists so you can judge for yourself. In tile games, a shorter word that lands on a bonus square or blocks an opponent beats a long word on plain squares, and in a crossword a four letter answer is useless if the gap is five. Scan the length groups for the size you actually need, and remember the minimum length filter: raising it to 4 or 5 hides the two and three letter filler and makes a big result list readable at a glance.",
    "One honest note about word lists: this dictionary is a broad English list of about 315,000 words, wider than most official game dictionaries. A small number of words it finds, obscure plurals and rare verb forms among them, may not be legal in a specific game's official word list. For casual games and puzzles it will serve you well; for tournament play, check a disputed word against that game's own dictionary.",
  ],
  faqs: [
    {
      q: "How do blank tiles work in this unscrambler?",
      a: "Type ? wherever a blank tile sits on your rack, up to two of them. A blank can stand for any single letter, so ca? finds cat, can, cap, car and every other word that needs one more letter alongside c and a. Words that would need two missing letters from a single blank are correctly left out.",
    },
    {
      q: "What is the difference between this and the Anagram Solver?",
      a: "The Anagram Solver is strict: it only returns words that use every letter exactly once, so the answer is always the same length as your input. The unscrambler is loose: it returns every word that can be built from some or all of your letters, which is the list you want for game racks and partial jumbles.",
    },
    {
      q: "Why are there so many results for my letters?",
      a: "Common letters combine into a lot of words. A seven letter rack with a blank can form several hundred. Use the minimum word length filter to cut the list down, and look at the length groups rather than reading every word: the longest group is where the highest scoring plays usually live.",
    },
    {
      q: "Can I unscramble letters for a crossword clue?",
      a: "Yes, if you know most of the answer's letters. Type the letters you have, add ? for each unknown square (two at most), and set the minimum length to the size of the gap so only words that fit the space come back.",
    },
    {
      q: "Is every word here legal in Scrabble or Words With Friends?",
      a: "Not quite every one. This dictionary is deliberately broad, so it includes a few rare words that official game lists exclude, and it may treat some two letter words differently. For friendly games it is a strong guide; for a challenged word in a serious match, the game's official dictionary is the referee.",
    },
  ],
};
