/** SEO content for the Password Generator page. */
export const content = {
  title: "Password Generator, Strong Random Passwords On Your Device",
  metaDescription:
    "Generate strong random passwords with the length and characters you choose. Created on your device only, never stored, never sent anywhere.",
  intro:
    "Press the button and get a genuinely random password, built by your device's cryptographic random generator rather than a pattern a human would pick. Choose the length, tick the character families a site demands, and copy it straight into your password manager.",
  howTo: [
    "Set the length. Sixteen characters or more is a solid default, and longer is stronger.",
    "Tick the character families the site allows: lowercase, uppercase, digits and symbols.",
    "Press Generate for a fresh password, and generate again until you like one.",
    "Copy it into your password manager or the signup form straight away.",
  ],
  explanationTitle: "What actually makes a password strong",
  explanation: [
    "Length beats cleverness. Every extra character multiplies the number of guesses an attacker needs, which is why a long random password shrugs off attacks that crack short, witty ones in minutes. This generator also draws each character fairly: no letter is more likely than another, because predictable patterns are exactly what cracking software tries first.",
    "The strength bar estimates entropy, the honest measure of guesswork. It counts the size of the character pool and the length, and nothing else. A password you invent, full of names, birthdays and swapped letters, has far less real entropy than it looks, which is why generating beats inventing.",
    "One password per account is the other half of the rule. A generated password you store in a password manager can be unique everywhere, so one site's data breach cannot unlock your email, your bank and your work in one stroke.",
  ],
  faqs: [
    {
      q: "Are the passwords stored or sent anywhere?",
      a: "No. Generation runs entirely on your device, and nothing is logged, stored or transmitted. Close the tab and the password exists only where you pasted it.",
    },
    {
      q: "How long should my password be?",
      a: "At least 16 characters for important accounts. Length matters more than any mix of symbols, and password managers remove the memory problem entirely.",
    },
    {
      q: "Why does the strength say Fair for my usual password style?",
      a: "Human patterns, words with numbers at the end, dates, swapped characters, are the first things cracking tools try. Random generation removes those patterns completely.",
    },
    {
      q: "Should I include symbols?",
      a: "If the site allows them, yes: symbols widen the pool and add entropy. If a site forbids them, untick the box and add a few characters of length instead.",
    },
    {
      q: "Can I use this for a passphrase instead?",
      a: "This tool makes character passwords. For something you must type from memory, four or five random words joined by dashes, at least 20 characters in total, is the friendly alternative, and the length slider here shows why length wins.",
    },
  ],
};
