import type { GuidePost } from "@/lib/guides";

export const guide: GuidePost = {
  slug: "uk-salary-take-home-pay",
  keyword: "salary calculator uk + take home pay calculator",
  title: "UK Salary Calculator: How Much Take Home Pay Will You Actually Get?",
  metaTitle: "UK Salary Calculator: Take Home Pay Guide for 2026",
  metaDescription: "Work out your UK take home pay with income tax, National Insurance and pension examples, plus a clear salary calculator guide for employees and job offers.",
  excerpt: "A job advert says £40,000, but your bank account will see a very different number. Here is how income tax, National Insurance, pensions and student loans turn a headline salary into monthly take home pay.",
  category: "Finance and Tax",
  toolSlug: "uk-salary-calculator",
  updatedAt: "2026-11-14",
  intro: [
    "You have been offered £38,000 and you are trying to work out the rent you can afford, or you have had a pay rise and the first payslip looks smaller than you expected. That gap between the headline salary and the money that lands in your bank is exactly why people search for a salary calculator UK and a take home pay calculator in the same breath. Run your own figure through the free [UK salary calculator](/calculators/uk-salary-calculator) first, then read on to understand every line that sits between gross pay and net pay, so the result stops feeling like a mystery.",
    "Take home pay in the United Kingdom is not one deduction, it is a stack of them, and each one starts and stops at a different point. Income tax depends on your personal allowance and the band your earnings fall into. National Insurance uses its own thresholds. A workplace pension, a student loan and benefits such as a company car can each take another slice. Two people on the same salary can take home hundreds of pounds a month apart because their tax codes, pension choices and loan plans differ.",
    "This guide walks through the full calculation with real salaries, shows you how to read a payslip against the estimate, and explains the traps that catch people at £50,270 and £100,000. If you are self employed, run a limited company or sell goods and services, your tax story is different again, and our companion guide on [VAT and pricing for small businesses](/guides/vat-calculator) will help with that side of the numbers.",
  ],
  keyPoints: [
    "Most employees in England, Wales and Northern Ireland keep a personal allowance of £12,570 before income tax starts, and Scotland uses different income tax bands.",
    "Income tax is 20 percent in the basic rate band, 40 percent in the higher rate band and 45 percent above £125,140, applied in slices rather than to your whole salary.",
    "Employee National Insurance is 8 percent on earnings between £12,570 and £50,270 a year, then 2 percent above that level.",
    "Pension contributions, student loan repayments and salary sacrifice can change take home pay by more than a small pay rise does.",
    "Always compare job offers on monthly net pay, pension and benefits together, not on the gross headline alone.",
  ],
  sections: [
    {
      heading: "What take home pay actually means",
      paragraphs: [
        "Gross pay is the full amount your employer agrees to pay you before anything is taken off. Net pay, which most people call take home pay, is what is left after income tax, National Insurance, pension contributions, student loan repayments and any other deductions shown on your payslip. When a recruiter says a role pays £45,000, that is almost always the gross figure for a full year, not the amount you will receive. Divide it by 12 and you get £3,750 a month gross, but a typical employee on that salary in England might take home roughly £2,970 to £3,050 a month before pension choices are counted, depending on tax code and loan plan.",
        "The order of the calculation matters. Your employer works out your taxable pay for the pay period, applies your tax code to find the tax free amount, then charges income tax on the slices above it. National Insurance is worked out per pay period too, not across the whole year in the same way as income tax, which is why a big bonus month or irregular overtime can produce a payslip that looks out of line with the month before. Over a full year the figures settle down, but week to week they can jump about, especially if you are paid weekly or you work variable shifts.",
        "It also helps to separate deductions you choose from deductions the law requires. Income tax and National Insurance are not optional. A pension contribution above the automatic enrolment minimum is a choice, even if it is a wise one, and extra payments into a pension or a cycle to work scheme through salary sacrifice change your taxable pay itself. If your net pay looks low, list each deduction separately and ask which bucket it belongs in. That simple habit turns a confusing payslip into a short, checkable list.",
        "If your hours vary, pay is only half the question. Pair this guide with our [hours calculator guide](/guides/hours-calculator) to check contracted hours, overtime and unpaid breaks, because a correct hourly total and a correct tax calculation need each other. A salary figure built on the wrong hours will be wrong no matter how carefully the tax is worked out.",
      ],
      bullets: [
        "Gross pay: the full salary before deductions, the figure in most job adverts.",
        "Taxable pay: gross pay minus your tax free personal allowance and any salary sacrifice amounts.",
        "Net pay: what arrives in your bank after tax, National Insurance, pension, loans and other deductions.",
        "Tax code: the code on your payslip, most often 1257L for a standard employee, that tells payroll how much tax free pay you get.",
      ],
    },
    {
      heading: "Income tax bands and the personal allowance explained",
      paragraphs: [
        "Almost every employee gets a personal allowance, the amount you can earn each year before income tax begins. For most people it is £12,570, and it has stayed at that level while wages have risen, which quietly pulls more of each pay rise into tax. Your tax code reflects it: 1257L is the standard code because £12,570 divided by 10 gives the 1257 in the code. If your code is different, there is usually a reason, such as a company benefit, unpaid tax from an earlier year, or a second job being taxed at a basic rate code because your allowance is already used elsewhere.",
        "Above the allowance, tax is charged in bands, and this is the point people most often get wrong. Earning one pound over a threshold does not tax your whole salary at the higher rate. Only the slice inside each band is taxed at that band rate. In England, Wales and Northern Ireland for 2025/26 and 2026/27 planning, the basic rate is 20 percent on taxable income up to £37,700 above the allowance, which means a total income of £50,270. The higher rate is 40 percent from £50,271 to £125,140, and the additional rate is 45 percent on income above £125,140. Scotland sets its own bands and rates, with more steps and different starting points, so a salary in Edinburgh is taxed differently from the same salary in Leeds.",
        "The personal allowance itself shrinks once income passes £100,000. It falls by £1 for every £2 earned above £100,000, so by £125,140 it has gone completely. That taper creates an odd stretch where extra earnings face a very high effective rate, because you pay 40 percent tax on the extra income and you also lose allowance that would have sheltered other income at 40 percent. Someone moving from £99,000 to £102,000 does not simply pay 40 percent on £3,000. They pay tax on the £3,000 and on £1,500 of allowance they have lost, which is why pension contributions are so popular in that income range: a contribution can restore some allowance as well as building the pension.",
      ],
      table: {
        caption: "Income tax bands for England, Wales and Northern Ireland, standard personal allowance assumed",
        headers: ["Band", "Total income range", "Rate on that slice"],
        rows: [
          ["Personal allowance", "£0 to £12,570", "0 percent"],
          ["Basic rate", "£12,571 to £50,270", "20 percent"],
          ["Higher rate", "£50,271 to £125,140", "40 percent"],
          ["Additional rate", "Above £125,140", "45 percent"],
        ],
      },
    },
    {
      heading: "National Insurance: the second deduction on your payslip",
      paragraphs: [
        "National Insurance looks like a second income tax, and on a payslip it behaves in a similar way, but the thresholds and rates are its own. Employees pay Class 1 contributions. The main rate is 8 percent on earnings between the primary threshold and the upper earnings limit, which line up at £12,570 and £50,270 a year for monthly paid staff at £1,048 and £4,189 a month. Above the upper limit the rate falls to 2 percent. Below £12,570 a year you pay no employee National Insurance, although earnings above a lower level still count towards your record for state pension purposes.",
        "Because National Insurance is calculated for each pay period on its own, timing matters. Imagine Amira earns a steady £3,200 a month and then picks up a £2,000 bonus in March. Her income tax spreads the effect through her cumulative tax code, but National Insurance treats March as a big month: she pays 8 percent up to the monthly upper limit and 2 percent above it, with no later refund just because other months were smaller. Annual directors are a special case with an annual earnings period, but ordinary employees need to know that a lumpy pay pattern and a smooth one can give slightly different National Insurance totals on the same annual salary.",
        "Your employer also pays National Insurance on your earnings, at a higher rate and from a lower threshold, but that employer cost does not appear as a deduction from your pay. It does matter in two practical ways. First, it is part of the real cost of employing you, which employers think about in pay reviews. Second, salary sacrifice works partly because swapping salary for pension or other approved benefits can reduce both income tax and National Insurance for you, and National Insurance for your employer too. Not every employer passes their saving on, so check the scheme wording rather than assuming.",
        "National Insurance also builds your entitlement record. Years in which you paid enough, or were credited as if you did, count towards the state pension. Gaps can happen after time abroad, time out of work without credits, or low earnings in self employment. Checking your record every few years is dull but valuable, because filling an old gap is usually far more expensive later, and some gaps can no longer be bought back at all after deadlines pass.",
      ],
    },
    {
      heading: "Worked examples: £30,000, £35,000, £50,000 and £60,000",
      paragraphs: [
        "Let us put the bands together on plain examples. Each example assumes an employee in England with the standard £12,570 personal allowance, no pension contribution, no student loan and no other benefits, paid across a full tax year. They are teaching examples that show the method clearly. Your own payslip will differ once pension and other items are added, which is the whole point of checking it line by line.",
        "On £30,000, taxable income is £30,000 minus £12,570, which is £17,430. All of it sits in the basic rate band, so income tax is 20 percent of £17,430, which is £3,486. National Insurance is 8 percent of the same £17,430 slice above the threshold, which is £1,394.40. Total deductions are £4,880.40, leaving take home pay of £25,119.60 a year, or about £2,093 a month. The overall deduction rate is about 16 percent, far below the 20 percent headline that people expect when they first hear the basic rate.",
        "On £35,000, taxable income is £22,430. Income tax is £4,486 and National Insurance is £1,794.40, leaving £28,719.60 a year, or about £2,393 a month. On £50,000, taxable income is £37,430, still within the basic rate band because total income is just below £50,270. Income tax is £7,486, National Insurance is £2,994.40, and take home pay is £39,519.60 a year, or about £3,293 a month. Notice how close £50,000 sits to the higher rate threshold: a £500 pay rise crosses it, but only the £230 above £50,270 is taxed at 40 percent, not the whole salary.",
        "On £60,000 the higher rate slice grows. Income tax is £7,540 on the first £37,700 of taxable income at 20 percent, plus £3,892 on the £9,730 above £50,270 at 40 percent, giving £11,432 in total. National Insurance is £3,016 at 8 percent up to £50,270, plus £194.60 at 2 percent on the rest, giving £3,210.60. Take home pay is £45,357.40 a year, or about £3,780 a month. Compare £50,000 and £60,000 side by side: a £10,000 rise adds about £5,838 of net pay before pension, because the extra slice faces 40 percent tax plus 2 percent National Insurance.",
      ],
      steps: [
        "Start with gross annual salary, for example £35,000.",
        "Subtract the personal allowance of £12,570 to get taxable income of £22,430.",
        "Charge 20 percent on the basic rate slice, 40 percent on any higher rate slice and 45 percent above £125,140.",
        "Charge National Insurance at 8 percent between £12,570 and £50,270, then 2 percent above that.",
        "Subtract pension, student loan and any other payslip deductions, then divide by 12 for monthly take home pay.",
      ],
    },
    {
      heading: "Pensions, student loans and salary sacrifice",
      paragraphs: [
        "A workplace pension is usually the biggest voluntary looking deduction, but it is not lost money. Under automatic enrolment, most eligible employees pay at least 5 percent of qualifying earnings including tax relief, and the employer pays at least 3 percent, making 8 percent in total on the band of earnings the rules use. Many employers do better than the minimum, and some match extra contributions. If Daniel on £42,000 turns down a matched pension to raise his monthly pay by £120, he may also give up an employer contribution of a similar size plus tax relief. That is an expensive way to feel richer for one month.",
        "How the pension is taken changes the tax result. With a relief at source scheme, contributions are taken from net pay and the provider claims basic rate tax relief to top the pot up, with higher rate taxpayers claiming the extra through their tax return or tax code. With a net pay arrangement, contributions come off before income tax, so relief arrives through payroll, but National Insurance is still charged. With salary sacrifice, you formally reduce your salary and the employer pays the pension instead, which can save income tax and National Insurance for both sides. The trade off is that your official salary is lower, which can affect mortgage multiples, some benefits and pay linked to salary, so read the agreement before signing.",
        "Student loan repayments work like an extra percentage on earnings above a plan threshold, taken through payroll once your income passes that level for the pay period. The rate is 9 percent for Plan 1, Plan 2 and Plan 4 loans and 6 percent for a postgraduate loan, and you can hold more than one type at once. The threshold depends on your plan, so two graduates on £32,000 can pay different amounts. A loan repayment does not reduce your income tax, and making an overpayment directly to the Student Loans Company is a separate decision from the payroll deduction. If you are close to clearing a loan, check the balance before volunteering extra payments, because payroll deductions can overshoot near the end.",
        "Child benefit adds another twist for households where one person earns above £60,000. The High Income Child Benefit Charge claws benefit back through the tax system between £60,000 and £80,000. A pay rise, bonus or company car change that pushes income over £60,000 can therefore cost more than the tax bands alone suggest. Pension contributions and gift aid can reduce the adjusted net income used for that test, which is another reason higher earners plan contributions before the tax year ends in April rather than after.",
      ],
    },
    {
      heading: "Comparing a job offer or a pay rise properly",
      paragraphs: [
        "A £3,000 pay rise sounds simple until you ask what it is worth after tax, travel and lost benefits. Start with the net monthly change, not the gross annual one. For a basic rate taxpayer with no pension change, £3,000 gross might add roughly £1,850 to £2,000 a year after 20 percent tax and 8 percent National Insurance, about £160 a month. For a higher rate taxpayer it might add about £1,740 before pension effects, because the extra faces 40 percent tax but only 2 percent National Insurance. Neither answer is good or bad on its own: the question is whether the new role, commute and hours justify that real increase.",
        "Look at the whole package. A lower salary with a generous employer pension, a shorter commute, paid overtime and private healthcare can beat a higher salary with the legal minimum pension and an expensive season ticket. Ask for the pension contribution in pounds, not just a percentage of a narrow qualifying earnings band, because 5 percent of full salary and 5 percent of a band between two limits are very different amounts. Ask whether bonuses are pensionable, whether overtime is paid or given back as time off, and when the first pay review happens.",
        "Property costs change the comparison too. If a move is part of the new job, work out the buying costs early with our [stamp duty calculator guide](/guides/stamp-duty-calculator), because a house purchase tax bill can swallow the first year of a pay rise. It is easy to celebrate a higher salary in April and then discover in September that moving costs, childcare changes and a longer commute have eaten all of it and more. A one page budget that lists new net pay against new monthly costs is worth more than a week of guessing.",
        "Finally, check the tax code in your first payslip with the new employer. Emergency codes and codes that assume your old benefits still apply are common in the first month or two, especially if your P45 arrives late. A wrong code does not mean the money is gone forever, it usually corrects through payroll or after the tax year, but spotting it early saves months of being underpaid. Keep your personal tax account details handy, compare the code with your last payslip, and contact payroll with both documents in front of you if the code looks wrong.",
      ],
    },
    {
      heading: "Common mistakes that make the estimate look wrong",
      paragraphs: [
        "The most common mistake is applying one tax rate to the whole salary. Someone on £55,000 who multiplies the full amount by 40 percent invents a tax bill far larger than the real one, because only £4,730 of that income sits in the higher rate band while £37,700 of taxable income is still taxed at 20 percent and £12,570 is tax free. The second mistake is forgetting that National Insurance rates fall at the upper limit while income tax rates rise, so the combined marginal rate is 28 percent in the basic rate band and 42 percent in the higher rate band for a typical employee, not a smooth climb.",
        "Tax codes cause the next batch of confusion. A code ending in BR means all income from that job is taxed at the basic rate with no allowance, which is normal for a second job but wrong for a main job. A K code means deductions such as a company car or unpaid tax exceed your allowance, so tax is added rather than reduced. A code with W1, M1 or X means payroll is treating each period on its own instead of cumulatively, which is common at the start of a job and usually settles down. Comparing one non cumulative payslip with an annual calculator will rarely match exactly, and that mismatch alone is not proof of an error.",
        "Bonuses, commission and overtime confuse people for a different reason. They are taxed as ordinary pay in the period they are paid, but a large one off payment can push that month into a higher band and a higher student loan deduction, even if your annual income stays in the basic rate band. Income tax usually sorts itself out over the year through the cumulative system. National Insurance and student loans, which are worked out per period, generally do not refund just because the year as a whole was lower. That is why two colleagues who earn the same across a year, one smoothly and one in spikes, can end with slightly different totals.",
        "If your own check still does not add up, work in a fixed order. Confirm the gross pay for the period, including any overtime and back pay. Confirm the tax code and whether the payslip is cumulative. Then check pension percentage and the earnings it is based on, then student loan plan, then any salary sacrifice items. Change one input at a time in the [UK salary calculator](/calculators/uk-salary-calculator) until your estimate matches a real payslip. Once it matches on a normal month, you have a reliable model for testing a pay rise, a pension increase or reduced hours, and you can browse the rest of our [guides](/guides) for the money topics that sit around your salary.",
      ],
      bullets: [
        "Do not apply the higher rate to your whole salary, only to the slice inside that band.",
        "Do not compare a weekly or irregular payslip directly with an annual estimate without checking the basis.",
        "Do not ignore the pension: a matched employer contribution is pay, just pay you receive later.",
        "Do not assume Scotland and the rest of the UK share the same income tax bands, they do not.",
      ],
    },
  ],
  faqs: [
    {
      q: "How much tax do I pay on a £40,000 salary in the UK?",
      a: "With a standard £12,570 personal allowance in England, Wales or Northern Ireland, income tax is 20 percent of £27,430, which is £5,486 for the year. National Insurance adds £2,194.40 at 8 percent, so take home pay before pension or student loan is about £32,319.60 a year, or roughly £2,693 a month.",
    },
    {
      q: "Why is my first payslip in a new job lower than expected?",
      a: "A late P45, an emergency or non cumulative tax code, or a code that still includes a benefit from your old job can all take too much tax at first. Check the tax code on the payslip against your personal tax account. Most errors correct through payroll in later months, but telling payroll early speeds it up.",
    },
    {
      q: "Does a pay rise ever leave me worse off overall?",
      a: "A rise in taxed salary alone does not reduce your net pay, because higher rates apply only to the slice above each threshold. You can still feel worse off if the rise affects child benefit above £60,000, removes personal allowance above £100,000, raises student loan repayments, or comes with higher travel and childcare costs.",
    },
    {
      q: "How does salary sacrifice change my take home pay?",
      a: "You agree a lower gross salary and your employer pays that amount into a pension or another approved benefit instead. Because the sacrificed amount is not paid as salary, it can reduce income tax and National Insurance, so a £100 sacrifice often costs less than £100 of net pay. Your contractual salary is lower, which can affect borrowing and some benefits.",
    },
    {
      q: "Is National Insurance the same as income tax?",
      a: "No. They are separate charges with separate thresholds and purposes, even though both appear on your payslip. Employee National Insurance is 8 percent between £12,570 and £50,270 and 2 percent above that, and it is worked out per pay period rather than cumulatively across the year like income tax.",
    },
    {
      q: "What salary do I need to take home £3,000 a month?",
      a: "Before pension and student loan, an employee in England with a standard tax code needs roughly £44,500 to £45,500 a year to clear about £3,000 a month after tax and National Insurance. Add a 5 percent pension contribution and the required salary rises, so run your exact pension and loan settings rather than relying on a rule of thumb.",
    },
  ],
  relatedSlugs: ["vat-calculator", "stamp-duty-calculator", "hours-calculator"],
};
