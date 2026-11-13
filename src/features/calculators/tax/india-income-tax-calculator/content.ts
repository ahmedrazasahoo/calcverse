import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "India Income Tax Calculator FY 2025-26: Old vs New Regime Compared",
  metaDescription:
    "Compare your income tax under the old and new regimes for FY 2025-26. Budget 2025 slabs, the Rs 60,000 rebate that makes Rs 12.75 lakh tax free for salaried staff, marginal relief and cess included.",
  intro:
    "Budget 2025 rewrote the new regime so thoroughly that the old regime now wins only in specific cases, mainly where you carry large deductions. Guessing wrong costs real money. This calculator runs both regimes side by side on your numbers and tells you plainly which one leaves you with more.",
};

export const content: ToolContent = {
  seoTitle: "India Income Tax Calculator FY 2025-26: Old vs New Regime Compared",
  howTo: [
    "Enter your gross annual salary income.",
    "If you claim deductions like 80C investments, 80D premiums or HRA exemption, add their total in the deductions field. They count only under the old regime.",
    "Select your age group, since the old regime gives senior and super senior citizens a higher basic exemption.",
    "Compare the two totals and the saving. The better regime is highlighted, with the rebate, surcharge and cess shown for each side.",
  ],
  explanationTitle: "Old regime vs new regime for FY 2025-26",
  explanation: [
    "The new regime under section 115BAC, as revised by the Finance Act, 2025, starts with a nil slab up to Rs 4 lakh, then charges 5, 10, 15, 20 and 25 percent in Rs 4 lakh steps, with 30 percent above Rs 24 lakh. Salaried taxpayers get a standard deduction of Rs 75,000. The decisive feature is the section 87A rebate: up to Rs 60,000 of tax is wiped out when taxable income is Rs 12 lakh or less. Put the two together and a gross salary of Rs 12.75 lakh pays zero tax. Just above Rs 12 lakh of taxable income, marginal relief caps your tax at the amount earned over the line, so you never lose money by earning a little more.",
    "The old regime keeps the familiar structure: basic exemption of Rs 2.5 lakh (Rs 3 lakh for senior citizens, Rs 5 lakh for super seniors), 5 percent to Rs 5 lakh, 20 percent to Rs 10 lakh and 30 percent above, with a standard deduction of Rs 50,000 and a rebate of up to Rs 12,500 at Rs 5 lakh of taxable income. Its one remaining strength is deductions. Large 80C and 80D claims, a big HRA exemption, or home loan interest can pull taxable income down far enough to beat the new regime, which is exactly the comparison this calculator runs.",
    "Both regimes add a 4 percent health and education cess on the tax. Higher incomes also pay a surcharge: the new regime caps it at 25 percent, while the old regime can reach 37 percent above Rs 5 crore, with marginal relief at each threshold. Salaried taxpayers can switch regimes when filing, as long as the return is on time, so run this comparison every year before you file rather than assuming last year's answer still holds.",
  ],
  faqs: [
    {
      q: "Is a salary of Rs 12.75 lakh really tax free in FY 2025-26?",
      a: "Yes, under the new regime. The Rs 75,000 standard deduction brings taxable income to Rs 12 lakh, the slab tax on that is Rs 60,000, and the section 87A rebate removes the full Rs 60,000. Your final tax is zero.",
    },
    {
      q: "What is marginal relief in the new regime?",
      a: "It stops your tax from jumping faster than your income just above the Rs 12 lakh rebate line. If your taxable income is Rs 12.25 lakh, the slab tax would be Rs 63,750, but marginal relief caps it at Rs 25,000, the amount you earned over the line, before cess.",
    },
    {
      q: "When does the old regime still win?",
      a: "When your deductions are large. HRA exemption on high rent, Rs 1.5 lakh of 80C, health premiums, and home loan interest can together cut taxable income by several lakhs under the old regime. As a rough guide, at higher salaries the old regime usually needs deductions well above Rs 5 to 6 lakh to compete. The calculator gives you the exact answer for your figures.",
    },
    {
      q: "Can I switch regimes every year?",
      a: "Salaried taxpayers without business income can choose either regime each year when filing their return, provided it is filed by the due date. Taxpayers with business income face stricter switching rules.",
    },
    {
      q: "Does the calculator include cess and surcharge?",
      a: "Yes. The 4 percent health and education cess is added in both regimes, and surcharge is applied at higher incomes with marginal relief at each threshold, capped at 25 percent in the new regime.",
    },
    {
      q: "Which deductions can I enter for the old regime?",
      a: "Add up what you actually claim: 80C investments up to Rs 1.5 lakh, 80D health premiums, HRA exemption, home loan interest on a let out property, NPS contributions and similar. Do not include the standard deduction, the calculator already applies Rs 50,000 for the old regime and Rs 75,000 for the new one.",
    },
  ],
};
