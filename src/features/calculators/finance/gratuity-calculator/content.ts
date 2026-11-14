import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Gratuity Calculator: India, UAE and Qatar End of Service Amounts",
  metaDescription:
    "Estimate your gratuity in India, the UAE or Qatar. Enter your last basic salary and years of service to see the amount, whether you are eligible, and whether a legal cap applies.",
  intro:
    "Gratuity is the lump sum that thanks you for years with one employer, and each country counts it in its own way: days of salary in the Gulf, a fraction of monthly pay in India. Pick your country, add your basic salary and service, and this calculator applies the right local formula for you.",
};

export const content: ToolContent = {
  seoTitle: "Gratuity Calculator: India, UAE and Qatar End of Service Amounts",
  howTo: [
    "Choose the country where you work, because each country uses a different gratuity formula.",
    "Enter the monthly salary the hint line describes for that country, basic pay based in all three cases.",
    "Add your years of service. Decimals are allowed, so six and a half years can be entered as 6.5.",
    "Read the estimated gratuity, the eligibility note and whether a legal cap has limited the amount.",
  ],
  explanationTitle: "How gratuity is calculated in India, the UAE and Qatar",
  explanation: [
    "India uses a simple fraction: 15 divided by 26, multiplied by the last drawn monthly basic pay plus dearness allowance, multiplied by the years counted. A part of a year above six months counts as a full year, so 10 years and 7 months counts as 11 years. Gratuity in India is payable after five years of continuous service, and the amount is capped at 20 lakh rupees. This calculator still shows the formula result below five years, but flags it as not yet eligible, because in most cases leaving before five years means no gratuity is paid.",
    "In the UAE, service builds up days of basic salary. Each of the first five years earns 21 days, and each year after that earns 30 days. Your daily wage is the monthly basic salary divided by 30, and the total cannot exceed two years of salary. One important note this calculator does not model: resignation can reduce the payout. Under the standard UAE rules, resigning with between one and three years of service may mean no gratuity, and resigning in the middle bands can pay only a fraction, while termination by the employer generally pays the full accrued amount. Always check your contract type and the current labour rules for your exact case.",
    "Qatar keeps it simpler still: three weeks of basic salary for every year of service, with eligibility after one year. This calculator works out a week of pay as the monthly salary multiplied by 12 and divided by 52, then multiplies by three and by your years. A note of caution for Qatar: the labour law sets this as the minimum basis, and some employer agreements or contracts provide a more generous end of service scheme, or calculate on a different salary basis. Your actual entitlement can therefore be higher than this estimate, and your contract is the document that settles it.",
  ],
  faqs: [
    {
      q: "Why is gratuity in India not paid before five years?",
      a: "The Payment of Gratuity Act in India sets five years of continuous service as the qualifying condition in most cases, with exceptions such as death or disability in service. Below five years this calculator shows the formula amount as an estimate only and flags it as not eligible.",
    },
    {
      q: "Which salary should I enter for the UAE and Qatar?",
      a: "Enter your last basic monthly salary only, not the full package. Housing, transport and other allowances are normally excluded from gratuity in both countries, and including them would inflate the estimate well beyond what the formulas intend.",
    },
    {
      q: "Does resigning change my UAE gratuity?",
      a: "It can. Termination by the employer generally pays the full accrued amount, while resignation can reduce it depending on your contract type and length of service, and short service after resigning may pay nothing. This calculator shows the full accrued figure, so treat it as the amount before any resignation reduction.",
    },
    {
      q: "What is the maximum gratuity I can receive?",
      a: "In India the cap is 20 lakh rupees. In the UAE the total cannot exceed two years of basic salary. Qatar sets no equivalent overall cap in the standard formula used here, although individual employer schemes can differ from the legal minimum basis.",
    },
    {
      q: "How are part years counted?",
      a: "In India, a part year above six months rounds up to a full year and a shorter part year is dropped. In the UAE and Qatar this calculator counts part years proportionally, based on the days or weeks they earn. Your employer's payroll practice and local rules can differ slightly on part years, so use this as a close estimate.",
    },
  ],
};
