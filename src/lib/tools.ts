/**
 * Central registry of every tool on CalcVerse.
 *
 * Coverage: all 59 tool families from the autocomplete coverage map
 * (13,617 real Google suggestions). Each family has at least one entry.
 * High intent families (exact size compression, age) have variant entries.
 *
 * To add a tool: add an entry here, then build its feature module under
 * src/features/<group>/<slug>/ and its route under src/app/<group>/<slug>/.
 * Hubs, search, sitemap and related tools all read from this file.
 */

export type ToolGroup = "calculators" | "tools" | "converters" | "generators";

export type IconName =
  | "calculator" | "percent" | "trending-up" | "trending-down" | "coins" | "banknote"
  | "piggy-bank" | "wallet" | "landmark" | "repeat" | "sun" | "home" | "gift"
  | "flame" | "activity" | "scale" | "heart-pulse" | "ruler" | "droplet" | "baby"
  | "calendar" | "calendar-range" | "sparkles" | "moon" | "timer" | "graduation-cap"
  | "divide" | "sigma" | "clock" | "receipt" | "tag" | "heart" | "fuel" | "zap"
  | "briefcase" | "file-text" | "image" | "footprints" | "type" | "binary"
  | "qr-code" | "key-round" | "keyboard";

export interface Tool {
  slug: string;
  name: string;
  group: ToolGroup;
  /** Calculator categories: Finance, Health, School, Everyday, Tax.
   *  Tools categories: PDF Tools, Image Tools.
   *  Converters: Converters, Image Converters, Text Tools. Generators: Generators, Tests. */
  category: string;
  description: string;
  keywords: string[];
  icon: IconName;
  status: "live" | "soon";
}

export const GROUP_LABELS: Record<ToolGroup, string> = {
  calculators: "Calculators",
  tools: "File Tools",
  converters: "Converters",
  generators: "Generators",
};

export const GROUP_PATHS: Record<ToolGroup, string> = {
  calculators: "/calculators",
  tools: "/tools",
  converters: "/converters",
  generators: "/generators",
};

export const CALCULATOR_CATEGORIES = ["Finance", "Health", "School", "Everyday", "Tax"] as const;

export function toolPath(tool: Pick<Tool, "group" | "slug">): string {
  return `/${tool.group}/${tool.slug}`;
}

const t = (
  slug: string,
  name: string,
  group: ToolGroup,
  category: string,
  icon: IconName,
  status: "live" | "soon",
  description: string,
  keywords: string[]
): Tool => ({ slug, name, group, category, icon, status, description, keywords });

export const tools: Tool[] = [
  // Calculators: Finance
  t("emi-calculator", "EMI Calculator", "calculators", "Finance", "coins", "live",
    "Calculate the monthly payment on a home, car or personal loan, with total interest and a full repayment picture.",
    ["emi", "loan emi", "home loan emi", "car loan emi", "monthly installment"]),
  t("loan-calculator", "Loan Calculator", "calculators", "Finance", "banknote", "live",
    "Work out monthly payments, total interest and payoff time for any loan, including the effect of extra payments.",
    ["loan payment", "personal loan", "auto loan", "loan with extra payments"]),
  t("mortgage-calculator", "Mortgage Calculator", "calculators", "Finance", "home", "live",
    "See what a home loan really costs each month, how much you can borrow, and how overpayments shorten the term.",
    ["mortgage payment", "how much can i borrow", "mortgage uk", "home loan cost"]),
  t("compound-interest-calculator", "Compound Interest Calculator", "calculators", "Finance", "trending-up", "live",
    "Watch savings grow when interest earns interest, with monthly contributions and daily, monthly or yearly compounding.",
    ["compound interest", "savings growth", "monthly contributions", "interest on interest"]),
  t("simple-interest-calculator", "Simple Interest Calculator", "calculators", "Finance", "percent", "soon",
    "Calculate simple interest on a loan or deposit in seconds, by amount, rate and time, even down to exact days.",
    ["simple interest", "interest formula", "interest between dates"]),
  t("sip-calculator", "SIP Calculator", "calculators", "Finance", "piggy-bank", "live",
    "See how a monthly investment can grow over time with compounding, including step up plans that rise each year.",
    ["sip", "monthly investment", "step up sip", "mutual fund growth"]),
  t("fd-calculator", "FD Calculator", "calculators", "Finance", "wallet", "live",
    "Work out the maturity value and interest earned on a fixed deposit for any amount, rate and tenure.",
    ["fd", "fixed deposit", "maturity value", "monthly payout fd"]),
  t("rd-calculator", "RD Calculator", "calculators", "Finance", "repeat", "soon",
    "Calculate what a recurring deposit grows into, month by month, including post office style quarterly compounding.",
    ["rd", "recurring deposit", "post office rd", "monthly deposit"]),
  t("ppf-calculator", "PPF Calculator", "calculators", "Finance", "landmark", "soon",
    "Project a Public Provident Fund balance year by year, with interest, deposits and the maturity amount.",
    ["ppf", "public provident fund", "ppf interest", "ppf maturity"]),
  t("nps-calculator", "NPS Calculator", "calculators", "Finance", "piggy-bank", "soon",
    "Estimate the pension and lump sum a National Pension System account can build by retirement age.",
    ["nps", "pension calculator", "national pension system", "retirement corpus"]),
  t("retirement-calculator", "Retirement Calculator", "calculators", "Finance", "sun", "soon",
    "Find out how much you could have at retirement, and whether your savings plan gets you to your goal.",
    ["retirement savings", "retirement by age", "pension and social security", "how much will i have"]),
  t("gratuity-calculator", "Gratuity Calculator", "calculators", "Finance", "gift", "soon",
    "Calculate end of service gratuity for India, the UAE, Qatar and more, based on years of service and last salary.",
    ["gratuity", "end of service", "uae gratuity", "gratuity india"]),

  // Calculators: Health
  t("tdee-calculator", "TDEE Calculator", "calculators", "Health", "flame", "live",
    "Work out how many calories you burn in a full day, then see the right intake for losing, maintaining or gaining weight, with a macro split included.",
    ["tdee", "calories burned", "maintenance calories", "bmr", "daily energy expenditure"]),
  t("calorie-calculator", "Calorie Calculator", "calculators", "Health", "activity", "live",
    "Find your daily calorie target to lose, maintain or gain weight, adjusted for your activity level.",
    ["calorie needs", "calories to lose weight", "calories to gain weight", "daily calories"]),
  t("bmi-calculator", "BMI Calculator", "calculators", "Health", "scale", "live",
    "Check your body mass index for adults and kids, in metric or imperial units, with a plain language result.",
    ["bmi", "body mass index", "bmi for women", "bmi for kids", "healthy weight"]),
  t("bmr-calculator", "BMR Calculator", "calculators", "Health", "heart-pulse", "live",
    "Calculate your basal metabolic rate with the Mifflin St Jeor and Harris Benedict equations.",
    ["bmr", "basal metabolic rate", "resting calories", "mifflin st jeor"]),
  t("body-fat-calculator", "Body Fat Calculator", "calculators", "Health", "ruler", "live",
    "Estimate your body fat percentage with the US Navy measurement method, for men and women.",
    ["body fat percentage", "navy method", "body fat measurements"]),
  t("ideal-weight-calculator", "Ideal Weight Calculator", "calculators", "Health", "scale", "live",
    "See the healthy weight range for your height and frame, using several established medical formulas.",
    ["ideal weight", "healthy weight range", "weight for height"]),
  t("water-intake-calculator", "Water Intake Calculator", "calculators", "Health", "droplet", "live",
    "Work out how much water you should drink each day based on your weight, activity and climate.",
    ["daily water intake", "how much water", "water by weight"]),
  t("pregnancy-calculator", "Pregnancy Calculator", "calculators", "Health", "baby", "soon",
    "Follow a pregnancy week by week from the last period, with key milestones and your estimated due date.",
    ["pregnancy week by week", "pregnancy due date", "lmp calculator"]),
  t("ovulation-calculator", "Ovulation Calculator", "calculators", "Health", "calendar", "live",
    "Predict ovulation day and the fertile window from your cycle, for planning or avoiding pregnancy.",
    ["ovulation day", "fertile window", "cycle tracking"]),
  t("due-date-calculator", "Due Date Calculator", "calculators", "Health", "calendar", "live",
    "Estimate a baby due date from the last period, conception date or IVF transfer date.",
    ["due date", "delivery date estimate", "due date by conception"]),
  t("conception-calculator", "Conception Calculator", "calculators", "Health", "sparkles", "soon",
    "Work backwards from a due date or birth date to estimate when conception most likely happened.",
    ["conception date", "when did i conceive", "conception from due date"]),
  t("sleep-calculator", "Sleep Calculator", "calculators", "Health", "moon", "live",
    "Find the best time to go to bed or wake up, based on full 90 minute sleep cycles, so you wake up refreshed.",
    ["sleep cycles", "when to go to bed", "wake up refreshed", "sleep by age"]),
  t("pace-calculator", "Pace Calculator", "calculators", "Health", "timer", "live",
    "Calculate running pace, finish time or distance for any race, from a 5K to a marathon, in miles or kilometres.",
    ["running pace", "marathon pace", "pace per km", "race finish time"]),

  // Calculators: School
  t("gpa-calculator", "GPA Calculator", "calculators", "School", "graduation-cap", "live",
    "Add your courses, pick your letter grades and credit hours, and get your weighted GPA on the standard US 4.0 scale instantly.",
    ["gpa", "grade point average", "4.0 scale", "semester gpa", "college grades"]),
  t("cgpa-to-percentage-calculator", "CGPA to Percentage Calculator", "calculators", "School", "graduation-cap", "live",
    "Convert between CGPA and percentage, and combine semester SGPAs into one CGPA, for Indian and other 10 point scales.",
    ["cgpa to percentage", "cgpa converter", "sgpa to cgpa"]),
  t("fraction-calculator", "Fraction Calculator", "calculators", "School", "divide", "soon",
    "Add, subtract, multiply and divide fractions and mixed numbers, with every answer simplified for you.",
    ["fractions", "mixed numbers", "simplify fraction", "fraction with steps"]),
  t("square-root-calculator", "Square Root Calculator", "calculators", "School", "sigma", "soon",
    "Find square roots with steps, including the long division method taught in class.",
    ["square root", "square root with steps", "long division method"]),
  t("ratio-calculator", "Ratio Calculator", "calculators", "School", "divide", "soon",
    "Simplify ratios, scale them up or down, and solve for a missing value in two and three part ratios.",
    ["ratio", "simplify ratio", "ratio of two numbers", "screen ratio"]),
  t("average-calculator", "Average Calculator", "calculators", "School", "sigma", "soon",
    "Find the mean, median and mode of any set of numbers, including grade averages and per day averages.",
    ["average", "mean median mode", "grade average", "average per day"]),

  // Calculators: Everyday
  t("percentage-calculator", "Percentage Calculator", "calculators", "Everyday", "percent", "live",
    "Three percentage tools on one page: find a percentage of a number, work out what percent one number is of another, and calculate percentage increase or decrease.",
    ["percentage", "percent of", "percent change", "percentage difference"]),
  t("percentage-increase-calculator", "Percentage Increase Calculator", "calculators", "Everyday", "trending-up", "soon",
    "Measure how much a value has grown in percent, from prices and salaries to year over year results.",
    ["percentage increase", "percent growth", "increase between two numbers"]),
  t("percentage-decrease-calculator", "Percentage Decrease Calculator", "calculators", "Everyday", "trending-down", "soon",
    "Measure how much a value has fallen in percent, handy for price drops, discounts and shrinking numbers.",
    ["percentage decrease", "percent drop", "decrease between two numbers"]),
  t("age-calculator", "Age Calculator", "calculators", "Everyday", "calendar", "live",
    "Find your exact age in years, months and days from your date of birth, plus your total days lived and how long until your next birthday.",
    ["age", "how old am I", "date of birth", "chronological age", "age in months"]),
  t("age-difference-calculator", "Age Difference Calculator", "calculators", "Everyday", "calendar-range", "live",
    "Compare two dates of birth and see the exact gap between them in years, months and days. Handy for siblings, couples and family records.",
    ["age difference", "age gap", "compare ages"]),
  t("date-calculator", "Date Calculator", "calculators", "Everyday", "calendar", "live",
    "Count the days between two dates, or add and subtract days, weeks and months from any date.",
    ["days between dates", "add days to date", "date duration"]),
  t("time-calculator", "Time Calculator", "calculators", "Everyday", "clock", "soon",
    "Add and subtract hours, minutes and seconds, and find the time between two clock times.",
    ["time duration", "add hours and minutes", "time between times"]),
  t("hours-calculator", "Hours Calculator", "calculators", "Everyday", "clock", "live",
    "Total up work hours between start and end times, with lunch breaks taken out and weekly totals.",
    ["work hours", "hours with lunch break", "weekly hours", "time card"]),
  t("tip-calculator", "Tip Calculator", "calculators", "Everyday", "receipt", "live",
    "Split a restaurant bill in seconds. Pick a tip percentage, add the number of people, and see exactly what each person owes.",
    ["tip", "bill split", "gratuity", "split the bill", "tip with tax"]),
  t("discount-calculator", "Discount Calculator", "calculators", "Everyday", "tag", "live",
    "See the final price after a percentage discount, and how much you save, with or without sales tax.",
    ["discount price", "sale price", "percent off", "discount with tax"]),
  t("love-calculator", "Love Calculator", "calculators", "Everyday", "heart", "soon",
    "A light hearted compatibility score for two names and birthdays. Just for fun, never for real decisions.",
    ["love test", "compatibility by name", "love percentage"]),
  t("fuel-cost-calculator", "Fuel Cost Calculator", "calculators", "Everyday", "fuel", "soon",
    "Estimate the fuel cost of a trip or your yearly driving, from distance, mileage and local fuel price.",
    ["fuel cost", "trip fuel cost", "road trip cost", "cost per km"]),
  t("electricity-bill-calculator", "Electricity Bill Calculator", "calculators", "Everyday", "zap", "soon",
    "Estimate an electricity bill from units used, or work out what a single appliance costs to run.",
    ["electricity bill", "kwh cost", "bill by appliances", "units used"]),

  // Calculators: Tax
  t("income-tax-calculator", "Income Tax Calculator", "calculators", "Tax", "landmark", "soon",
    "Estimate income tax by country and region, including India by assessment year and US state level estimates.",
    ["income tax", "tax by state", "income tax india", "assessment year"]),
  t("salary-calculator", "Salary Calculator", "calculators", "Tax", "briefcase", "soon",
    "Convert salary between hourly, monthly and yearly, and estimate take home pay for the UK, US and more.",
    ["take home pay", "salary uk", "hourly to salary", "yearly to monthly"]),
  t("pakistan-salary-tax-calculator", "Pakistan Salary Tax Calculator", "calculators", "Tax", "landmark", "live",
    "Find the income tax on a Pakistani salary using the current FBR slabs, with monthly and yearly take home figures.",
    ["pakistan tax", "fbr slabs", "salary tax pakistan"]),
  t("gst-calculator", "GST Calculator", "calculators", "Tax", "receipt", "live",
    "Add or remove GST for India, Australia, Canada and New Zealand rates, from a net or gross amount.",
    ["gst", "gst india", "gst australia", "gst from total"]),
  t("vat-calculator", "VAT Calculator", "calculators", "Tax", "receipt", "soon",
    "Add VAT to a price or strip it back out, for the UK, Europe, the UAE, South Africa and more.",
    ["vat", "remove vat", "vat uk", "add vat"]),
  t("zakat-calculator", "Zakat Calculator", "calculators", "Tax", "coins", "live",
    "Calculate zakat on cash, gold, silver and other assets at 2.5 percent, with nisab thresholds handled for you.",
    ["zakat", "nisab", "zakat on gold", "zakat pakistan"]),
  t("hra-calculator", "HRA Calculator", "calculators", "Tax", "home", "soon",
    "Calculate the House Rent Allowance exemption under Indian tax rules, for metro and non metro cities.",
    ["hra exemption", "house rent allowance", "hra india"]),

  t("india-income-tax-calculator", "India Income Tax Calculator", "calculators", "Tax", "landmark", "live",
    "Compare your income tax under the old and new regimes for FY 2025-26 side by side, and see which one leaves you with more money.",
    ["india income tax", "old vs new regime", "income tax fy 2025-26", "tax calculator india"]),
  t("uk-salary-calculator", "UK Salary Calculator", "calculators", "Tax", "briefcase", "live",
    "Work out your UK take home pay after income tax and National Insurance for 2025-26, with pension and student loan options.",
    ["uk salary", "take home pay uk", "salary after tax uk", "net salary uk"]),

  // File tools: PDF
  t("compress-pdf", "Compress PDF", "tools", "PDF Tools", "file-text", "live",
    "Shrink a PDF file right in your browser. Your file never leaves your device, and there is no signup and no watermark.",
    ["compress pdf", "reduce pdf size", "pdf compressor"]),
  t("compress-pdf-to-200kb", "Compress PDF to 200KB", "tools", "PDF Tools", "file-text", "live",
    "Bring a PDF down to 200KB or under, the size limit used by many job, university and government upload forms.",
    ["compress pdf to 200kb", "pdf under 200kb"]),
  t("compress-pdf-to-100kb", "Compress PDF to 100KB", "tools", "PDF Tools", "file-text", "live",
    "Reduce a PDF to 100KB or less for strict online forms, processed locally in your browser with no upload to any server.",
    ["compress pdf to 100kb", "pdf under 100kb"]),
  t("merge-pdf", "Merge PDF", "tools", "PDF Tools", "file-text", "live",
    "Combine several PDFs into one file in the order you choose. Runs in your browser with no upload, no signup and no watermark.",
    ["merge pdf", "combine pdf", "join pdf files"]),
  t("split-pdf", "Split PDF", "tools", "PDF Tools", "file-text", "live",
    "Split a PDF into separate files by page ranges, or pull out only the pages you need, right in your browser.",
    ["split pdf", "separate pdf pages", "extract pdf pages"]),
  t("rotate-pdf", "Rotate PDF", "tools", "PDF Tools", "file-text", "live",
    "Rotate pages in a PDF and save them the right way up, permanently, in your browser with no upload.",
    ["rotate pdf", "rotate pdf pages", "turn pdf page"]),
  t("jpg-to-pdf", "JPG to PDF", "tools", "PDF Tools", "file-text", "live",
    "Turn JPG and PNG images into a clean PDF document, one image per page, ready to upload or share.",
    ["jpg to pdf", "image to pdf", "png to pdf", "photo to pdf"]),
  t("pdf-to-jpg", "PDF to JPG", "tools", "PDF Tools", "file-text", "live",
    "Convert each page of a PDF into a JPG image you can share, post or insert anywhere.",
    ["pdf to jpg", "pdf to image", "convert pdf pages to images"]),
  t("compress-pdf-to-50kb", "Compress PDF to 50KB", "tools", "PDF Tools", "file-text", "live",
    "Squeeze a PDF down to 50KB or under for the strictest government, exam and job application forms.",
    ["compress pdf to 50kb", "pdf under 50kb"]),
  // File tools: Image
  t("compress-image", "Compress Image", "tools", "Image Tools", "image", "live",
    "Make JPG and PNG images smaller without a visible loss of quality, directly in your browser and completely free.",
    ["compress image", "image compressor", "reduce image size"]),
  t("compress-image-to-50kb", "Compress Image to 50KB", "tools", "Image Tools", "image", "live",
    "Compress a photo or scan to 50KB or under, a common limit for application forms, exam portals and ID uploads.",
    ["compress image to 50kb", "image under 50kb"]),
  t("compress-image-to-20kb", "Compress Image to 20KB", "tools", "Image Tools", "image", "live",
    "Get an image down to 20KB or less for the strictest upload limits, including signature and passport photo fields.",
    ["compress image to 20kb", "image under 20kb"]),

  t("compress-image-to-100kb", "Compress Image to 100KB", "tools", "Image Tools", "image", "live",
    "Compress a photo or scan to 100KB or under, a common limit for online application and document uploads.",
    ["compress image to 100kb", "image under 100kb"]),
  t("compress-image-to-200kb", "Compress Image to 200KB", "tools", "Image Tools", "image", "live",
    "Bring an image down to 200KB or less while keeping it clear, for portals and forms with a 200KB limit.",
    ["compress image to 200kb", "image under 200kb"]),

  // Converters
  t("shoe-size-converter", "Shoe Size Converter", "converters", "Converters", "footprints", "live",
    "Convert shoe sizes between US, UK, EU and more, for men, women and kids, with brand aware charts.",
    ["shoe size chart", "us to uk shoes", "us to eu shoes", "kids shoe sizes"]),
  t("roman-numeral-converter", "Roman Numeral Converter", "converters", "Converters", "type", "live",
    "Convert numbers to Roman numerals and back, including full dates for tattoos, chapters and anniversaries.",
    ["roman numerals", "roman numeral date", "number to roman"]),
  t("binary-converter", "Binary Converter", "converters", "Converters", "binary", "live",
    "Convert between binary, decimal, hexadecimal and text, with the working shown step by step.",
    ["binary to decimal", "binary to text", "decimal to binary"]),
  t("heic-to-jpg", "HEIC to JPG Converter", "tools", "Image Tools", "image", "live",
    "Turn iPhone HEIC photos into standard JPG files that open everywhere, converted on your own device.",
    ["heic to jpg", "iphone photo converter", "heic converter"]),
  t("webp-to-png", "WebP to PNG Converter", "tools", "Image Tools", "image", "live",
    "Convert WebP images saved from the web into PNG format with transparency preserved, free and in your browser.",
    ["webp to png", "convert webp", "webp converter"]),
  t("word-counter", "Word Counter", "converters", "Text Tools", "type", "live",
    "Count words, characters, sentences and reading time as you type or paste. Built for essays, articles and applications.",
    ["word counter", "character count", "word count online", "reading time"]),

  // Generators
  t("qr-code-generator", "QR Code Generator", "generators", "Generators", "qr-code", "live",
    "Create QR codes for links, WiFi networks and contact cards. Free, with no expiry date and no signup wall.",
    ["qr code", "qr generator free", "wifi qr", "qr no sign up"]),
  t("password-generator", "Password Generator", "generators", "Generators", "key-round", "live",
    "Generate strong random passwords with the length and characters you choose. Passwords are created on your device only.",
    ["password generator", "strong password", "random password", "memorable password"]),
  t("typing-test", "Typing Test", "generators", "Tests", "keyboard", "live",
    "Measure your typing speed in words per minute with a free one minute test, for practice or job applications.",
    ["typing speed", "wpm test", "typing test online", "typing practice"]),
  t("ai-text-cleaner", "AI Text Cleaner", "generators", "Generators", "sparkles", "live",
    "Clean up AI written text in one click: remove em dashes, hidden characters and leftover markdown so it reads like a person wrote it.",
    ["ai text cleaner", "remove em dashes", "remove hidden characters", "strip markdown"]),
];

export function getTool(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolInGroup(group: ToolGroup, slug: string): Tool | undefined {
  return tools.find((tool) => tool.group === group && tool.slug === slug);
}

export function toolsInGroup(group: ToolGroup): Tool[] {
  return tools.filter((tool) => tool.group === group);
}

export function liveTools(): Tool[] {
  return tools.filter((tool) => tool.status === "live");
}

export function getRelated(tool: Tool, count = 4): Tool[] {
  const sameCategory = tools.filter((x) => x.slug !== tool.slug && x.category === tool.category && x.group === tool.group);
  const sameGroup = tools.filter(
    (x) => x.slug !== tool.slug && x.group === tool.group && x.category !== tool.category
  );
  const liveFirst = (list: Tool[]) =>
    [...list].sort((a, b) => (a.status === b.status ? 0 : a.status === "live" ? -1 : 1));
  const rest = tools.filter((x) => x.slug !== tool.slug && x.group !== tool.group);
  return [...liveFirst(sameCategory), ...liveFirst(sameGroup), ...liveFirst(rest)].slice(0, count);
}
