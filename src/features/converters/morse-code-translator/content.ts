import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Morse Code Translator: Text to Morse With Sound and Light",
  metaDescription:
    "Free Morse code translator. Convert text to Morse and Morse back to text for A to Z, 0 to 9 and punctuation, then play it as beeps with a flashing signal light at your chosen speed in words per minute.",
  intro:
    "Translate text to Morse code and back again, covering letters, numbers and common punctuation. Then press play to hear it as real telegraph beeps and watch the signal light flash in time, at any speed from beginner slow to brisk operator pace.",
};

export const content: ToolContent = {
  seoTitle: "Morse Code Translator: Text to Morse With Sound and Light",
  howTo: [
    "Type text in the left box and the Morse appears on the right as you type, letters separated by spaces and words by a slash.",
    "Or paste Morse into the right box and read the decoded text on the left. Unknown codes show as a question mark.",
    "Set the playback speed with the slider, measured in words per minute. Beginners usually start around 10 to 15.",
    "Press Play Morse to hear the beeps and watch the signal light flash the same rhythm. Press Stop at any time to cut it short.",
  ],
  explanationTitle: "How Morse code timing really works",
  explanation: [
    "Morse code assigns every letter, digit and common punctuation mark a pattern of short and long signals. The short signal is a dit, written as a dot, and the long signal is a dah, written as a dash and lasting exactly three dits. Frequent letters got the shortest codes, which is why E is a single dit and T a single dah, while rare letters like Q carry longer patterns. Gaps matter as much as the sounds: one dit of silence inside a letter, three dits between letters, and seven dits between words, so a listener can tell where one character ends and the next begins.",
    "Speed in Morse is quoted in words per minute, based on the standard word PARIS, which occupies exactly 50 dit units including its trailing word gap. That makes the maths simple and universal: one dit lasts 1200 divided by the speed in milliseconds, so at 20 words per minute a dit is 60 milliseconds, a dah is 180, a letter gap is 180 and a word gap is 420. The playback on this page is built from exactly that arithmetic, and the signal light follows the same schedule as the sound, which is how real operators trained to read flashing lamp signals from ships.",
    "Decoding works best when the spacing is honest. Text typed here is encoded with one space between letters and a slash between words, matching the convention used by translators everywhere, so output pasted into other tools still decodes correctly. Punctuation is included for the marks people actually signal, such as the full stop, comma, question mark and the all purpose @ sign added later for email addresses. SOS remains the most famous string of all: three dits, three dahs, three dits, chosen in 1906 because the pattern is unmistakable even through static and fading.",
  ],
  faqs: [
    {
      q: "How do I write Morse code correctly in text form?",
      a: "Use a dot for each dit and a dash for each dah. Put one space between the letters of a word and a slash with spaces around it between words, like this: .... . .-.. .-.. --- / .-- --- .-. .-.. -.. for HELLO WORLD. Consistent spacing is what lets translators and people split the code back into letters.",
    },
    {
      q: "What speed should a beginner learn at?",
      a: "Most teachers suggest learning the character shapes at 15 to 20 words per minute but with extra space between letters at first, so your ear learns the rhythm without rushing. On this page, 10 to 15 words per minute is a comfortable place to start; raise the slider as the patterns start to feel like single sounds.",
    },
    {
      q: "Why does my Morse decode with question marks in it?",
      a: "A question mark means one of the codes in the Morse box does not match any known letter, digit or punctuation mark, usually because two letters were typed without a space between them and fused into one long code. Add the missing space and decode again.",
    },
    {
      q: "Is Morse code still used today?",
      a: "Yes, quietly. Amateur radio operators use it daily because it gets through weak signals that voice cannot, pilots still hear station identifiers in Morse on navigation beacons, and it survives as an accessibility input method. The SOS distress pattern is recognised worldwide even though it is rarely sent now.",
    },
    {
      q: "What does SOS actually stand for?",
      a: "Nothing. It was not short for Save Our Souls; it was chosen purely because the pattern, three dits, three dahs, three dits, is the easiest distress signal to recognise and to send. The phrases were attached to it afterwards as memory aids.",
    },
  ],
};
