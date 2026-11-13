import type { ToolContent } from "@/lib/content";

export const metaDescription =
  "Free typing test with one minute and five minute modes. Measure your words per minute and accuracy on real sentences, with honest net WPM scoring.";

export const intro =
  "Pick a test length, start typing, and the clock starts with your first keystroke. You get a net words per minute score that counts only the characters you typed correctly, plus your accuracy, because speed with mistakes is not speed anyone can use.";

/**
 * Original practice passages written for this test. Each mixes short
 * and long sentences, common punctuation and a spread of everyday
 * vocabulary, so the score reflects real typing rather than one
 * memorised pattern.
 */
export const PRACTICE_TEXTS: readonly string[] = [
  "The morning train rolled into the station just as the rain began to ease. Passengers hurried across the wet platform, coats buttoned, coffee in hand, each of them carrying a private list of things the day would demand. Mara found a seat by the window and watched the city slide past, rooftops and gardens blurring into one long green ribbon. She had an interview at ten, a library book to return, and a promise to call her brother before lunch. None of it felt heavy. Some days arrive like a test, she thought, and some simply arrive like weather.",
  "To make a good loaf of bread you need little more than flour, water, salt, yeast and patience. Mix the dough until it turns smooth and elastic, then leave it somewhere warm to rise. The waiting is not wasted time; it is when the flavour develops and the texture forms. Shape the loaf gently, let it prove once more, and bake it in a hot oven until the crust sings as it cools. The smell alone repays the effort, and the first slice, eaten warm with butter, explains why people have baked this way for thousands of years.",
  "When the committee met on Tuesday, the budget was the only item anyone really wanted to discuss. Figures were projected on the wall in blue and grey: rent up nine percent, printing down a fifth, and a stubborn gap where the grant money used to be. Priya suggested moving the workshop to the smaller hall. Tom wanted to charge for the evening classes. In the end they agreed to do both, and to review the numbers again in three months, when the new term would show whether the plan had worked or merely sounded tidy.",
  "The lighthouse keeper climbed the spiral stairs at dusk, the way he had done every evening for twenty three years. One hundred and twelve steps, a brass key worn smooth in his pocket, and a logbook that recorded wind, tide and shipping in a hand that never hurried. From the lamp room he could see the harbour lights of three villages and the dark line where the sea met the sky. Ships changed, radios replaced flags, and one winter the lamp itself went electric, but the ritual stayed the same: light the light, write the page, watch the water.",
];

export const content: ToolContent = {
  seoTitle: "Typing Test: Check Your WPM and Accuracy in One or Five Minutes",
  howTo: [
    "Choose a test length: one minute for a quick measure, five minutes for a score that settles down and means more.",
    "Click into the typing box and start copying the text above it. The clock starts on your first keystroke, so there is no countdown to panic about.",
    "Type the text exactly, including capitals and punctuation. Wrong characters are marked as you go, and backspace works if you want to fix them.",
    "When time runs out, or you finish the passage, read your net WPM and accuracy. Net WPM counts only correct characters and is the figure employers mean.",
  ],
  explanationTitle: "How typing speed is scored",
  explanation: [
    "Words per minute sounds simple until you ask what a word is. Typing tests settled the question decades ago: one word equals five characters, spaces included. Type 250 characters in a minute and you have typed at 50 gross WPM, whatever the actual words were. The standard keeps scores comparable across different texts and languages.",
    "Gross speed flatters sloppy typing, so serious tests quote net WPM. Net speed counts only the characters that match the target text in the right place. Every wrong character costs twice in effect: it adds nothing to your correct count, and fixing it eats time. That is why coaches repeat the same advice until it bores everyone: slow down until you are accurate, then let speed climb on its own. A careful 45 WPM beats a chaotic 60 in every office on earth.",
    "Expect your score to vary with the text, the keyboard and the hour of the day. A single test is a snapshot. Take three across a week, on the same setup, and the middle figure is a fair picture of your everyday speed. Most adults type between 30 and 45 WPM; trained typists and data entry professionals hold 60 to 80 with accuracy above 95 percent.",
  ],
  faqs: [
    {
      q: "What is a good typing speed?",
      a: "Average for the general public is roughly 35 to 45 WPM with decent accuracy. Many office jobs ask for 40 to 50. Professional typists, transcriptionists and data entry specialists usually sit between 60 and 80 WPM, and the fastest competition typists pass 100. Accuracy at or above 95 percent matters as much as the headline number.",
    },
    {
      q: "What typing speed do employers and job tests expect?",
      a: "Most general office roles are comfortable with 40 WPM and high accuracy. Data entry and transcription adverts commonly set 50 to 65 WPM, sometimes with a stated accuracy floor. If a job test is coming, practice on passages like these rather than single words, because real tests use sentences with punctuation and numbers.",
    },
    {
      q: "How can I type faster without more mistakes?",
      a: "Use all ten fingers with your index fingers parked on F and J, and stop looking at the keys. Then train in short daily sessions, and deliberately type slightly below your error threshold. Speed built on accuracy compounds; speed built on chaos plateaus quickly and is miserable to fix later.",
    },
    {
      q: "Why is my score lower than on other typing sites?",
      a: "Probably the scoring. Sites differ in whether they count every character or only correct ones, whether spaces count, and what text they use. This test quotes net WPM, the stricter and more honest figure. A lower net score here usually matches the score a careful employer test would give.",
    },
    {
      q: "Does the five minute test give a different score from the one minute test?",
      a: "Usually a slightly lower and more truthful one. Short tests reward a fast start, while five minutes exposes your sustainable pace, including the moments your fingers tire or a hard word slows you down. For certificates and job preparation, the five minute result is the one to quote.",
    },
  ],
};
