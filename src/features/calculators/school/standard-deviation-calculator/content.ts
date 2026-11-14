import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Standard Deviation Calculator: Population and Sample SD With Deviation Table",
  metaDescription:
    "Free standard deviation calculator. Paste a dataset and get mean, median, population and sample variance and standard deviation, with a full deviation table showing every step of the working.",
  intro:
    "Paste your numbers and see both standard deviations side by side, population and sample, with the mean, median and a deviation table that shows exactly where each figure comes from. No hidden steps, so you can check homework or audit a spreadsheet result.",
};

export const content: ToolContent = {
  seoTitle: "Standard Deviation Calculator: Population and Sample SD With Deviation Table",
  howTo: [
    "Type or paste your numbers, separated by commas, spaces or new lines.",
    "Check the warning line if any entry is not a number, since those entries are left out of the maths.",
    "Read the mean, median, range and count in the top cards.",
    "Compare the population and sample panels: use population when your data is the whole group, and sample when it stands in for a bigger group.",
    "Use the deviation table to follow the working: each value minus the mean, squared, added up, then divided and square rooted.",
  ],
  explanationTitle: "What standard deviation actually measures",
  explanation: [
    "Standard deviation measures spread: how far, on average, values sit from their mean. The recipe is always the same. Find the mean, subtract it from every value to get the deviations, square those deviations so negatives stop cancelling positives, average the squares to get the variance, then take the square root to return to the original units. The classic dataset 2, 4, 4, 4, 5, 5, 7, 9 has mean 5 and squared deviations adding to 32, so its population variance is 32 divided by 8, which is 4, and its standard deviation is exactly 2.",
    "The one fork in the road is the dividing step. Population variance divides by the count, n, because the data is everything there is. Sample variance divides by n minus 1 instead, a fix called Bessel's correction. A sample almost always hugs its own mean a little tighter than it hugs the true population mean, so dividing by the smaller number inflates the estimate slightly and corrects the bias. That is why the same dataset gives a sample variance of 32/7, about 4.571, and a sample standard deviation of about 2.138, noticeably bigger than the population figures.",
    "Choosing wrong is the most common standard deviation mistake in coursework and in office spreadsheets alike, where STDEV.P and STDEV.S sit one row apart. The rule of thumb: if you measured everyone or everything in the group you are describing, it is a population. If you measured some of them to say something about the rest, it is a sample. Test scores for one named class are a population; a poll of 1,000 voters standing in for a country is a sample.",
  ],
  faqs: [
    {
      q: "What is the standard deviation of 2, 4, 4, 4, 5, 5, 7, 9?",
      a: "The population standard deviation is exactly 2, from a variance of 4. The sample standard deviation is about 2.138, from a sample variance of 32/7, about 4.571. The mean of the dataset is 5.",
    },
    {
      q: "Should I use population or sample standard deviation?",
      a: "Use population when your numbers cover the entire group you are describing, like every exam score in one class. Use sample when the numbers are a subset meant to represent a larger group, like a survey or a quality check on some items from a production run.",
    },
    {
      q: "Why does the sample version divide by n minus 1?",
      a: "Because a sample tends to sit closer to its own mean than to the true population mean, raw averaging would understate the real spread. Dividing by n minus 1 instead of n makes the estimate a little larger and removes that bias on average.",
    },
    {
      q: "Can standard deviation be negative or zero?",
      a: "Never negative, since it is a square root of an average of squares. It is zero only when every value is identical, because then every deviation is zero and there is no spread at all.",
    },
    {
      q: "What is the difference between variance and standard deviation?",
      a: "Variance is the average of the squared deviations, so it is measured in squared units: squared marks, squared dollars. Standard deviation is its square root, which brings the answer back into the original units and makes it far easier to interpret.",
    },
  ],
};
