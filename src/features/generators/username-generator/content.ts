import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Username Generator: Ideas for Gaming, Social and Professional Names",
  metaDescription:
    "Generate 12 username ideas at a time in gamer, aesthetic, professional, funny, nature and tech styles, with your own theme word, separators and number options.",
  intro:
    "Pick a style, add a theme word if you have one, and get twelve fresh username ideas per click, each ready to copy. Gamer, aesthetic, professional, funny, nature and tech word lists keep the suggestions on theme instead of random letter soup.",
};

export const content: ToolContent = {
  seoTitle: "Username Generator: Ideas for Gaming, Social and Professional Names",
  howTo: [
    "Choose a style: gamer, aesthetic, professional, funny, nature or tech. The word lists behind each style set the mood of every suggestion.",
    "Add an optional theme word, something personal like a hobby, a pet or a favourite place. It takes the second slot in about half the suggestions.",
    "Set the separator (none, underscore, dot or dash) and the capitalisation (lowercase, Capitalised or camelCase).",
    "Optionally add a number at the end, either a short year style suffix or two random digits, which helps when the plain name is taken.",
    "Press Generate for twelve fresh ideas, copy the ones you like, then check the name inside the actual app, because this tool does not check availability on any platform.",
  ],
  explanationTitle: "What makes a username hold up over time",
  explanation: [
    "A good username does three jobs at once: it is easy to read at a glance, easy to say out loud, and hard to confuse with someone else. The word pair structure here (a descriptive word plus a concrete noun, like silent falcon or velvet meadow) works because it paints a small picture, which people remember far better than initials and birth years. Every suggestion is capped at 24 characters and limited to letters, digits, dots, underscores and dashes, the character set that nearly every platform accepts, so a name you like here will at least be typable wherever you take it.",
    "Separators and capitalisation are not decoration, they change how a name reads. An underscore or a dot splits the words for a scanning eye (shadow_wolf, shadow.wolf), camelCase does the same job with a capital letter (shadowWolf), and a flat lowercase join suits short punchy pairs. Numbers deserve restraint: a short year style suffix or two digits can rescue a taken name, but a long string of digits reads as a throwaway account and is miserable to dictate to a friend.",
    "One honest warning, repeated from the tool itself: nothing here checks availability. Platforms hold millions of names, many of them dormant, and only the platform itself can tell you whether a name is free. Treat this page as an idea machine. Shortlist three or four favourites, then test them in the app you care about, and consider grabbing the same name on the other platforms you use so your handle stays consistent everywhere.",
  ],
  faqs: [
    {
      q: "Does this generator check if a username is available?",
      a: "No, and it says so on the tool itself. No outside tool can reliably check availability across platforms, because most services only reveal it inside their own signup flow. Generate ideas here, then test your shortlist in the app where you want the name.",
    },
    {
      q: "How long can a username be here?",
      a: "Suggestions are capped at 24 characters, which fits comfortably inside the limits of the major platforms: Instagram allows 30, TikTok 24, and most gaming networks 16 to 24. If a platform has a shorter limit, pick one of the shorter suggestions or drop the number suffix.",
    },
    {
      q: "Which separator is best for a username?",
      a: "Underscore is the safest bet because every platform accepts it and it reads clearly. Dots are tidy but a few services ban them or treat them as the same name with and without the dot. Dashes are fine for gaming and tech names, and the professional style here skips them because they read casual in a business context.",
    },
    {
      q: "Should I add numbers to my username?",
      a: "Only when the plain name is taken or you genuinely like the look. A two digit suffix keeps the name readable and easy to share out loud. Avoid your full birth year or other personal dates: a username is public, and it should not hand strangers personal information.",
    },
    {
      q: "Can I use the same username everywhere?",
      a: "That is the ideal. A consistent handle makes you findable and protects you from impersonators. Once a name works on your main platform, check it on the others you use soon after, before someone else registers it.",
    },
  ],
};
