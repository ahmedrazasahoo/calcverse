import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Pakistan Salary Tax Calculator 2026-27 and 2025-26: FBR Slabs, Monthly Tax",
  metaDescription:
    "Calculate salary income tax in Pakistan under the Finance Act 2026 slabs for tax year 2026-27, or the Finance Act 2025 slabs for 2025-26. Monthly deduction, take home pay and effective rate included.",
  intro:
    "Pakistan changed its salary tax slabs twice in two budgets, and the difference is worth thousands of rupees a month. This calculator applies the official FBR slab tables for both tax years, so you can check your payslip against 2025-26 and see exactly what changes for you in 2026-27.",
};

export const content: ToolContent = {
  seoTitle: "Pakistan Salary Tax Calculator 2026-27 and 2025-26: FBR Slabs, Monthly Tax",
  howTo: [
    "Enter your monthly salary, or switch to yearly if you know your annual taxable salary.",
    "Choose the tax year. Use 2026-27 for salary from July 2026 onward, and 2025-26 for the year before it.",
    "Read your yearly tax, the monthly amount your employer should deduct under section 149, and your take home pay.",
    "Flip between the two years with the same salary to see what the budget changed for you personally.",
  ],
  explanationTitle: "How salary tax works in Pakistan",
  explanation: [
    "Salaried individuals are taxed under Division I of the First Schedule to the Income Tax Ordinance, 2001. You qualify for this gentler table when salary makes up more than 75 percent of your taxable income. The system is progressive: each rate applies only to the slice of income inside its slab, never to your whole salary, which is why crossing into a higher slab never makes you poorer overall.",
    "For tax year 2025-26, the Finance Act, 2025 set six slabs: nothing up to Rs 600,000, then 1 percent, 11 percent, 23 percent, 30 percent, and 35 percent above Rs 4.1 million. A surcharge of 9 percent under section 4AB was added on the tax of anyone earning above Rs 10 million. The Finance Act, 2026 reshaped the table for 2026-27: the rates between Rs 2.2 million and Rs 7 million were cut to 20, 25, 29 and 32 percent, the 35 percent band now starts only above Rs 7 million, and the surcharge on salaried individuals was withdrawn completely.",
    "Your employer deducts this tax from your salary every month under section 149, spreading the yearly estimate across twelve payslips. That deduction is adjustable, not necessarily final: bonuses, other income, allowable deductions such as zakat paid under the Zakat and Ushr Ordinance, and tax credits are settled when you file your return. Use this calculator to sanity check your payslip, and file through FBR Iris to claim anything you are owed.",
  ],
  faqs: [
    {
      q: "What are the salary tax slabs for 2026-27 in Pakistan?",
      a: "Under the Finance Act, 2026: no tax up to Rs 600,000 a year, then 1 percent to Rs 1.2 million, 11 percent to Rs 2.2 million, 20 percent to Rs 3.2 million, 25 percent to Rs 4.1 million, 29 percent to Rs 5.6 million, 32 percent to Rs 7 million, and 35 percent above Rs 7 million. Each rate applies only to income inside its slab.",
    },
    {
      q: "Is there still a surcharge on high salaries in 2026-27?",
      a: "No. The 9 percent surcharge under section 4AB applied on tax where income exceeded Rs 10 million in 2025-26, but the Finance Act, 2026 withdrew it for salaried individuals from 1 July 2026.",
    },
    {
      q: "How is my monthly salary tax calculated?",
      a: "Your employer estimates your yearly taxable salary, applies the slab table to get the yearly tax, and deducts one twelfth of it from each monthly payslip under section 149. This calculator shows both the yearly figure and the monthly deduction.",
    },
    {
      q: "I earn Rs 100,000 a month. How much tax do I pay in 2026-27?",
      a: "Rs 100,000 a month is Rs 1,200,000 a year. Tax is 1 percent of the Rs 600,000 above the exempt threshold, which is Rs 6,000 a year, or Rs 500 a month. The calculator confirms this and shows your effective rate of just 0.5 percent.",
    },
    {
      q: "Who counts as a salaried individual for these slabs?",
      a: "You do, if income under the head salary is more than 75 percent of your total taxable income. If most of your income comes from business or other sources, the non salaried slab table applies instead, and it is less generous.",
    },
    {
      q: "Does this calculator include allowances, bonuses and tax credits?",
      a: "It taxes the taxable salary figure you enter. Add bonuses and the taxable value of benefits to your salary first. Allowable deductions and credits, such as zakat paid under the Ordinance or credits for charitable donations and pension contributions, reduce the final bill when you file, so your return may come out lower than this estimate.",
    },
  ],
};
