import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Salary Calculator: Hourly, Monthly and Yearly Pay With Take Home Estimate",
  metaDescription:
    "Convert pay between hourly, daily, weekly, monthly and yearly amounts, then estimate take home pay for the US, the UK or your own flat tax rate. Clear figures for job offers and pay rises.",
  intro:
    "A job advertised at an hourly rate and a job advertised at a yearly salary are hard to compare until both are in the same units, and neither figure is what actually reaches your bank account. This calculator converts your pay into every period at once, then adds a take home estimate so you can judge an offer, a pay rise or a move to part time hours on real numbers.",
};

export const content: ToolContent = {
  seoTitle: "Salary Calculator: Hourly, Monthly and Yearly Pay With Take Home Estimate",
  howTo: [
    "Enter your pay amount and pick the period it belongs to: hourly, daily, weekly, monthly or yearly.",
    "Set your hours per week. Forty is the usual full time figure, and it drives the hourly, daily and weekly conversions.",
    "Pick a currency for display. It changes the symbol only, not the maths.",
    "Read your pay in all five periods side by side.",
    "In the take home section, pick the United States, the United Kingdom or a custom flat rate, and read your estimated take home pay per year and per month.",
  ],
  explanationTitle: "How salary conversion and take home pay work",
  explanation: [
    "Every conversion here runs through the yearly figure. An hourly rate is multiplied by your hours per week and by 52 weeks to get the year. A daily rate counts as one fifth of a working week, a weekly rate is multiplied by 52, and a monthly salary is multiplied by 12. Once the yearly amount is known, the calculator splits it back down: monthly is a twelfth of the year, weekly is the year divided by your weeks, daily is a fifth of the week, and hourly is the year divided by your total working hours. That is why 25 an hour at 40 hours a week lands on 52,000 a year, and why a 120,000 salary works back to about 57.69 an hour.",
    "The take home section is an estimate, kept deliberately simple. For the United States it applies the 2025 federal brackets for a single filer after a $15,000 standard deduction, plus Social Security and Medicare payroll taxes, with an optional flat state rate you set yourself. For the United Kingdom it applies the 2025-26 personal allowance with its taper above GBP 100,000, income tax at 20, 40 and 45 percent, and National Insurance. The custom option skips country rules entirely and takes one flat percentage off the gross, which is handy for a rough budget or for countries this page does not model.",
    "Use the estimate for comparisons, not for payroll. Real take home pay also depends on pension contributions, student loans, benefits, tax credits, bonuses and how your employer runs payroll through the year. If the estimate matters for a decision, check the fuller country calculators on this site next: the UK salary calculator adds pensions and student loans, and the income tax calculator explains each country estimate in more depth.",
  ],
  faqs: [
    {
      q: "How do I convert an hourly rate to a yearly salary?",
      a: "Multiply the hourly rate by your hours per week, then by the weeks you work in a year. At 40 hours a week for 52 weeks, that is the rate times 2,080 hours. So 25 an hour becomes 52,000 a year before tax.",
    },
    {
      q: "Why is the daily rate one fifth of the weekly rate?",
      a: "The calculator assumes a five day working week, which is the standard full time pattern. If your week is structured differently, adjust the hours per week figure and treat the daily number as a guide based on that five day split.",
    },
    {
      q: "Is the take home figure my exact pay?",
      a: "No, it is an estimate. It uses standard deductions and headline rates only, with no pension, student loan, benefits or credits included. Your payslip can differ, sometimes by a noticeable amount. The detailed country calculators on this site cover more of those moving parts.",
    },
    {
      q: "When should I use the custom flat rate?",
      a: "When you want a fast what if, or when your country is not listed. If you know roughly what share of your pay goes in tax overall, enter that as the flat rate and the calculator will show the matching yearly and monthly take home figures.",
    },
    {
      q: "Does changing the currency change my results?",
      a: "No. The currency picker only changes the symbol shown next to the numbers. The conversion maths and the tax estimates stay the same, so pick the symbol that matches the pay you entered.",
    },
  ],
};
