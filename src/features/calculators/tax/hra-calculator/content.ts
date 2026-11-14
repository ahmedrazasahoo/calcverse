import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "HRA Calculator: House Rent Allowance Exemption for Salaried Staff in India",
  metaDescription:
    "Work out how much of your House Rent Allowance is tax free under the standard three limit rule. Enter yearly basic, DA, HRA received and rent paid, pick metro or non metro, and see the exemption and taxable part.",
  intro:
    "House Rent Allowance can quietly cut a salaried persons tax bill, but only the portion the rules allow counts as exempt, and that portion is rarely the full allowance. This calculator applies the standard three limit test for you and shows exactly which limit decided your number.",
};

export const content: ToolContent = {
  seoTitle: "HRA Calculator: House Rent Allowance Exemption for Salaried Staff in India",
  howTo: [
    "Enter your yearly basic salary. Use yearly figures throughout, not monthly ones.",
    "Add your yearly dearness allowance if your salary includes one, otherwise leave it at zero. Basic plus DA is the salary figure the HRA rules use.",
    "Enter the HRA you actually received for the year and the total rent you paid for the year.",
    "Pick Metro if you live in Delhi, Mumbai, Kolkata or Chennai, otherwise pick Non metro, then read the exemption, the taxable part, and the three limits breakdown.",
  ],
  explanationTitle: "How the HRA exemption is worked out",
  explanation: [
    "This calculator follows the standard Income Tax Act rules for salaried employees. The exempt part of House Rent Allowance is the least of three limits. The first limit is the HRA you actually received. The second is your rent paid minus 10 percent of your salary, where salary means basic plus dearness allowance. The third is 50 percent of salary if you live in a metro city, meaning Delhi, Mumbai, Kolkata or Chennai, and 40 percent of salary anywhere else. The least of the three limits applies, and any HRA above that exemption stays taxable as part of your salary.",
    "A yearly example makes the pattern clear. With a basic salary of 600,000, no DA, HRA received of 240,000 and rent of 300,000 in a metro city, the three limits are 240,000, then 240,000 (rent of 300,000 minus 60,000, which is 10 percent of salary), then 300,000 (50 percent of salary). The least figure is 240,000, so the full HRA is exempt and the taxable part is zero. Drop the rent to 150,000 and the second limit falls to 90,000, so only 90,000 stays exempt and 150,000 of the HRA becomes taxable.",
    "Two practical points catch people out. First, if your rent is less than 10 percent of your salary, the second limit goes negative and the exemption becomes zero, no matter how much HRA you received. Second, you generally need rent receipts and your landlords PAN details for larger rents when you claim, and you cannot claim this exemption if you also take the standard home loan interest benefit for the same house in the way the rules restrict. This calculator gives you the arithmetic; keep your rent agreement and receipts ready for the claim itself.",
  ],
  faqs: [
    {
      q: "What are the three limits for HRA exemption?",
      a: "The exemption is the least of: the HRA actually received, rent paid minus 10 percent of basic plus DA, and 50 percent of basic plus DA for metro cities or 40 percent for non metro cities. The least of the three limits applies.",
    },
    {
      q: "Which cities count as metro for HRA?",
      a: "Delhi, Mumbai, Kolkata and Chennai are the metro cities for this rule, where the salary limit is 50 percent. Every other city uses the 40 percent limit.",
    },
    {
      q: "Does dearness allowance count in the HRA calculation?",
      a: "Yes, when your DA is part of your salary structure and linked to retirement benefits in the usual way, the rules use basic plus DA as the salary figure for all three limits. If you have no DA, just use your basic salary.",
    },
    {
      q: "What happens if my rent is lower than 10 percent of my salary?",
      a: "The second limit, rent minus 10 percent of salary, becomes zero or negative, so your exemption is zero and your full HRA received is taxable. Paying very low rent is the most common reason an HRA claim produces no benefit.",
    },
    {
      q: "Can I claim HRA if I live in my own house?",
      a: "No. The exemption exists for rent actually paid for a rented home. If you live in your own house and pay no rent, there is no rent figure to put into the second limit, so no exemption arises and the HRA you receive is fully taxable.",
    },
  ],
};
