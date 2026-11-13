import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "UK Salary Calculator 2025-26: Take Home Pay After Tax and National Insurance",
  metaDescription:
    "Work out your UK take home pay for 2025-26 after income tax, National Insurance, pension contributions and student loan repayments. Yearly, monthly and weekly figures included.",
  intro:
    "The salary on the job advert is never the salary in your bank account. Income tax, National Insurance, pension contributions and student loan repayments all take their slice first. This calculator applies the official 2025-26 rates and shows exactly what lands in your account each month.",
};

export const content: ToolContent = {
  seoTitle: "UK Salary Calculator 2025-26: Take Home Pay After Tax and National Insurance",
  howTo: [
    "Enter your gross annual salary.",
    "Add your pension contribution percentage if you pay one through salary sacrifice, and it will come off before tax and National Insurance.",
    "Select your student loan plan if you have one. Plan 2 covers most graduates who studied in England or Wales from 2012 onward.",
    "Read your take home pay per year, month and week, with every deduction shown separately.",
  ],
  explanationTitle: "How UK take home pay is worked out for 2025-26",
  explanation: [
    "Start with the personal allowance: the first GBP 12,570 you earn is tax free. Earn over GBP 100,000 and the allowance tapers away by GBP 1 for every GBP 2 above that line, vanishing completely at GBP 125,140, which creates a punishing effective tax rate in that band. Above the allowance, income tax for England, Wales and Northern Ireland charges 20 percent on the first GBP 37,700 of taxable income, 40 percent up to GBP 112,570, and 45 percent beyond that.",
    "National Insurance is the second deduction many people forget to model. Employees pay 8 percent on earnings between GBP 12,570 and GBP 50,270 a year, and 2 percent on everything above. Unlike income tax it has no personal allowance build up through the year in the same way, and it stops being charged at the main rate once you pass the upper earnings limit, which is why a pay rise past GBP 50,270 feels slightly kinder than expected.",
    "Two optional deductions complete the picture. Pension contributions made by salary sacrifice reduce your pay before both tax and National Insurance, making them the most tax efficient saving most employees have. Student loan repayments take 9 percent of earnings above your plan threshold (6 percent for postgraduate loans) and are collected through payroll like a tax, even though they only reduce your loan balance. Scottish taxpayers should note that Scotland sets its own income tax bands, so these figures follow the rates for the rest of the UK.",
  ],
  faqs: [
    {
      q: "How much tax do I pay on a GBP 50,000 salary in 2025-26?",
      a: "Income tax is GBP 7,486 and National Insurance is about GBP 2,994, leaving take home pay of roughly GBP 39,520 a year, or GBP 3,293 a month, before pension contributions or student loan repayments.",
    },
    {
      q: "Why does earning over GBP 100,000 feel so heavily taxed?",
      a: "Because of the personal allowance taper. Between GBP 100,000 and GBP 125,140 you lose GBP 1 of tax free allowance for every GBP 2 earned, on top of 40 percent tax. The effective marginal rate in that band is about 60 percent, which is why pension contributions are especially powerful there.",
    },
    {
      q: "What is the National Insurance rate for 2025-26?",
      a: "Employees pay 8 percent on annual earnings between GBP 12,570 and GBP 50,270, and 2 percent above that. Nothing is charged on the first GBP 12,570.",
    },
    {
      q: "Does this calculator work for Scotland?",
      a: "No. Scotland sets its own income tax rates and bands through the Scottish Parliament, with more bands and different rates. These results use the bands for England, Wales and Northern Ireland. National Insurance is the same across the UK.",
    },
    {
      q: "How do pension contributions increase my take home efficiency?",
      a: "Through salary sacrifice, contributions come out of your gross pay before tax and National Insurance are calculated. You give up some take home pay, but the full contribution reaches your pension, and at higher tax bands every GBP 100 contributed can cost you only GBP 58 or less in take home terms.",
    },
    {
      q: "Which student loan plan am I on?",
      a: "Plan 1 covers courses started before September 2012 in England and Wales, and all Scottish and Northern Irish loans. Plan 2 covers England and Wales courses from 2012 to 2023. Plan 4 is for Scotland from 2007. Plan 5 applies to England courses starting from August 2023. Check your payslip or your Student Loans Company account if you are unsure.",
    },
  ],
};
