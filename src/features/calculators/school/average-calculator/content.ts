import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Average Calculator: Mean, Median and Mode in One Place",
  metaDescription:
    "Paste any list of numbers and get the mean, median, mode, sum, count and range at once. Built for marks, prices, ages and everyday data.",
  intro:
    "Average is a word that hides three different ideas. The mean shares a total out evenly, the median finds the middle person in the queue, and the mode spots the most common value. Paste your numbers here and this calculator shows all three side by side, plus the sum, count and range, so you can pick the one that honestly describes your data.",
};

export const content: ToolContent = {
  seoTitle: "Average Calculator: Mean, Median and Mode in One Place",
  howTo: [
    "Type or paste your numbers into the box. Commas, spaces, semicolons and separate lines all work as separators.",
    "Read the mean card for the familiar average: the total shared out evenly across every value.",
    "Read the median card for the middle value of the sorted list, and the mode card for the value that appears most often.",
    "Use the second row for the supporting facts: the sum of everything, how many numbers you entered, and the range from smallest to largest.",
    "Fix any entry in the box and the results update straight away, including a note naming any word that is not a number.",
  ],
  explanationTitle: "Mean, median and mode: which average do you need",
  explanation: [
    "The mean is the average most people picture. Add everything up and divide by the count, so marks of 72, 85 and 92 average to 83. Its strength is that every value counts. Its weakness is the same: one extreme value drags it hard. Add a single 300 to a list of weekly spends around 40 and the mean leaps, even though a typical week did not change at all. Exam scores, heights and temperatures usually suit the mean well because their values cluster fairly.",
    "The median answers a different question: what sits in the middle? Sort the list and take the centre value, or the mean of the two centre values when the count is even. Half the values lie below it and half above, no matter how wild the extremes get. That is why house prices and salaries are usually reported as medians. A street with nine modest homes and one mansion has a misleading mean price, but its median still describes the typical home honestly.",
    "The mode is the value that turns up most often, the most popular shoe size in a class or the most common score on a test. A list can have one mode, several modes, or none at all when nothing repeats, and this calculator says so plainly instead of guessing. The range, the gap between smallest and largest, completes the picture by showing spread. Two classes can share the same mean of 70 while one ranges from 65 to 75 and the other from 20 to 100, and those are very different classes. Quoting an average with its range is always the more honest habit.",
  ],
  faqs: [
    {
      q: "How do I calculate the average of a set of numbers?",
      a: "Add all the numbers together and divide by how many numbers there are. For 4, 8 and 9 the sum is 21, and 21 divided by 3 gives an average of 7. That is the mean, the average this calculator shows first.",
    },
    {
      q: "What is the difference between mean, median and mode?",
      a: "The mean shares the total evenly, the median is the middle value once the list is sorted, and the mode is the value that appears most often. They agree on tidy data and drift apart when the data is skewed or has outliers.",
    },
    {
      q: "How do I find the median when there is an even number of values?",
      a: "Sort the list, take the two values in the middle, and average them. For 1, 2, 3 and 4 the middle pair is 2 and 3, so the median is 2.5.",
    },
    {
      q: "What if my numbers have no mode?",
      a: "That happens whenever every value appears exactly once, which is normal for measurements like heights. The calculator reports No mode rather than picking a value at random, because a mode that appears once describes nothing.",
    },
    {
      q: "Can I paste numbers copied from a spreadsheet or marks list?",
      a: "Yes. Values separated by commas, spaces, semicolons, tabs or line breaks are all read correctly, so a copied column or row works as it is. If a stray word sneaks in, the calculator names it so you can remove it.",
    },
  ],
};
