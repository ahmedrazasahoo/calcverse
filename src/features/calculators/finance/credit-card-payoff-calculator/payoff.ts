/**
 * Credit card payoff simulation logic, pure and framework free.
 *
 * Each month, every card charges interest of balance times APR
 * divided by 1200 (the yearly rate spread over twelve months). The
 * minimum due on a card is the larger of its floor payment and its
 * minimum percent of the balance, plus that month interest, capped
 * at the full amount owed. Three strategies are simulated:
 *
 * Minimums only pays each card its minimum. A fixed monthly budget
 * pays every minimum first, then sends the spare money to one
 * target card: the highest APR card for the avalanche method, or
 * the smallest balance for the snowball method. Leftover spare
 * money cascades to the next target when a card clears.
 *
 * The simulation stops at 600 months. A strategy is flagged not
 * payable when a month payment fails to cover that month interest
 * while debt remains, because the balance can then never fall.
 *
 * Closing month rule for the budget strategies: when everything
 * still owed after interest fits within the budget plus that month
 * minimums, the borrower settles the full amount that month rather
 * than leaving a small trailing balance for one more month. That is
 * why a 300 balance at 12 percent with a 100 budget ends in month 3
 * with a final payment of 106.08 instead of dragging 6.08 into a
 * fourth month.
 */

export interface CardInput {
  name: string;
  balance: number;
  aprPercent: number;
  /** Percent of the balance inside the minimum payment. Default 2. */
  minPaymentPercent?: number;
  /** Smallest allowed minimum payment in currency units. Default 25. */
  minPaymentFloor?: number;
}

export type StrategyId = "minimums" | "avalanche" | "snowball";

export interface PayoffEntry {
  name: string;
  /** Month number, counting from 1, in which the card cleared. */
  month: number;
  /** Calendar label such as "March 2027". */
  monthLabel: string;
}

export interface StrategyResult {
  strategy: StrategyId;
  label: string;
  months: number;
  totalInterest: number;
  totalPaid: number;
  payoffOrder: PayoffEntry[];
  notPayable: boolean;
  /** Set when the inputs themselves are unusable, for example a budget that does not beat the minimums. */
  error: string | null;
}

export interface StartMonth {
  /** Full year, for example 2026. */
  year: number;
  /** Month index from 0 (January) to 11 (December). */
  month: number;
}

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const MAX_MONTHS = 600;
const EPSILON = 0.005;

export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

/** Calendar label for a payoff month counted from the start month. */
export function monthLabel(start: StartMonth, monthNumber: number): string {
  const offset = start.month + (monthNumber - 1);
  const name = MONTH_NAMES[((offset % 12) + 12) % 12];
  const year = start.year + Math.floor(offset / 12);
  return `${name} ${year}`;
}

/** Interest charged on a balance for one month. */
export function monthlyInterest(balance: number, aprPercent: number): number {
  return (balance * aprPercent) / 1200;
}

/** Minimum due for one card this month, before the cap at the amount owed is applied. */
export function minimumDue(balance: number, aprPercent: number, card: CardInput): number {
  const percent = card.minPaymentPercent ?? 2;
  const floor = card.minPaymentFloor ?? 25;
  const interest = monthlyInterest(balance, aprPercent);
  return Math.max(floor, (percent / 100) * balance + interest);
}

interface CardState {
  name: string;
  balance: number;
  aprPercent: number;
  minPaymentPercent: number;
  minPaymentFloor: number;
  paidOffMonth: number | null;
}

const STRATEGY_LABELS: Record<StrategyId, string> = {
  minimums: "Minimums only",
  avalanche: "Fixed budget, avalanche",
  snowball: "Fixed budget, snowball",
};

function validateCards(cards: CardInput[]): string | null {
  if (cards.length === 0) return "Add at least one card to run the comparison.";
  for (const card of cards) {
    if (!Number.isFinite(card.balance) || card.balance < 0) {
      return `The balance for ${card.name || "a card"} must be zero or more.`;
    }
    if (!Number.isFinite(card.aprPercent) || card.aprPercent < 0 || card.aprPercent > 100) {
      return `The APR for ${card.name || "a card"} must sit between 0 and 100 percent.`;
    }
  }
  if (cards.every((c) => c.balance <= 0)) return "Every balance is zero, so there is nothing to pay off.";
  return null;
}

/** Total of the first month minimum payments across all cards with a balance. */
export function totalFirstMinimums(cards: CardInput[]): number {
  let total = 0;
  for (const card of cards) {
    if (card.balance <= 0) continue;
    const owed = card.balance + monthlyInterest(card.balance, card.aprPercent);
    total += Math.min(owed, minimumDue(card.balance, card.aprPercent, card));
  }
  return round2(total);
}

/** Runs one payoff strategy month by month. */
export function simulatePayoff(
  cards: CardInput[],
  strategy: StrategyId,
  monthlyBudget: number | null,
  start: StartMonth,
): StrategyResult {
  const base: StrategyResult = {
    strategy,
    label: STRATEGY_LABELS[strategy],
    months: 0,
    totalInterest: 0,
    totalPaid: 0,
    payoffOrder: [],
    notPayable: false,
    error: null,
  };

  const cardError = validateCards(cards);
  if (cardError) return { ...base, error: cardError };

  if (strategy !== "minimums") {
    if (monthlyBudget === null || !Number.isFinite(monthlyBudget) || monthlyBudget <= 0) {
      return { ...base, error: "Enter a monthly budget above zero for the budget strategies." };
    }
    const minimums = totalFirstMinimums(cards);
    if (monthlyBudget <= minimums) {
      return {
        ...base,
        error: `The monthly budget must be more than the first month minimums of ${round2(minimums).toFixed(2)}. Raise the budget or use the minimums only strategy.`,
      };
    }
  }

  const states: CardState[] = cards
    .filter((c) => c.balance > 0)
    .map((c) => ({
      name: c.name,
      balance: c.balance,
      aprPercent: c.aprPercent,
      minPaymentPercent: c.minPaymentPercent ?? 2,
      minPaymentFloor: c.minPaymentFloor ?? 25,
      paidOffMonth: null,
    }));

  let totalInterest = 0;
  let totalPaid = 0;
  let month = 0;
  let notPayable = false;

  while (states.some((s) => s.balance > EPSILON) && month < MAX_MONTHS) {
    month += 1;
    const active = states.filter((s) => s.balance > EPSILON);

    // Step 1: interest lands on every active card.
    const interestByCard = new Map<CardState, number>();
    let monthInterest = 0;
    for (const s of active) {
      const interest = monthlyInterest(s.balance, s.aprPercent);
      interestByCard.set(s, interest);
      monthInterest += interest;
    }
    totalInterest += monthInterest;

    // Step 2: minimum payment for every active card, capped at what is owed.
    const paymentByCard = new Map<CardState, number>();
    let minimumTotal = 0;
    for (const s of active) {
      const owed = s.balance + (interestByCard.get(s) ?? 0);
      const due = Math.min(
        owed,
        Math.max(
          s.minPaymentFloor,
          (s.minPaymentPercent / 100) * s.balance + (interestByCard.get(s) ?? 0),
        ),
      );
      paymentByCard.set(s, due);
      minimumTotal += due;
    }

    // Step 3: budget strategies send the spare money to the target card first.
    if (strategy !== "minimums" && monthlyBudget !== null) {
      const totalOwed = active.reduce(
        (acc, s) => acc + s.balance + (interestByCard.get(s) ?? 0),
        0,
      );
      if (totalOwed <= monthlyBudget + minimumTotal + EPSILON) {
        // Closing month: settle everything that is left.
        for (const s of active) {
          paymentByCard.set(s, s.balance + (interestByCard.get(s) ?? 0));
        }
      } else {
        let spare = monthlyBudget - minimumTotal;
      if (spare > 0) {
        const targets = [...active].sort((a, b) => {
          if (strategy === "avalanche") {
            if (b.aprPercent !== a.aprPercent) return b.aprPercent - a.aprPercent;
            return a.balance - b.balance;
          }
          if (a.balance !== b.balance) return a.balance - b.balance;
          return b.aprPercent - a.aprPercent;
        });
        for (const target of targets) {
          if (spare <= EPSILON) break;
          const owed = target.balance + (interestByCard.get(target) ?? 0);
          const alreadyPaying = paymentByCard.get(target) ?? 0;
          const room = owed - alreadyPaying;
          const extra = Math.min(room, spare);
          if (extra > 0) {
            paymentByCard.set(target, alreadyPaying + extra);
            spare -= extra;
          }
        }
      }
      }
    }

    // Step 4: apply payments, watch for the never shrinking trap.
    let monthPaid = 0;
    for (const s of active) {
      const payment = paymentByCard.get(s) ?? 0;
      monthPaid += payment;
      s.balance = s.balance + (interestByCard.get(s) ?? 0) - payment;
      if (s.balance <= EPSILON) {
        s.balance = 0;
        if (s.paidOffMonth === null) s.paidOffMonth = month;
      }
    }
    totalPaid += monthPaid;

    const stillOwing = states.some((s) => s.balance > EPSILON);
    if (stillOwing && monthPaid <= monthInterest + EPSILON) {
      notPayable = true;
      break;
    }
  }

  if (states.some((s) => s.balance > EPSILON)) {
    notPayable = true;
  }

  const payoffOrder: PayoffEntry[] = states
    .filter((s) => s.paidOffMonth !== null)
    .sort((a, b) => (a.paidOffMonth ?? 0) - (b.paidOffMonth ?? 0))
    .map((s) => ({
      name: s.name,
      month: s.paidOffMonth ?? 0,
      monthLabel: monthLabel(start, s.paidOffMonth ?? 0),
    }));

  return {
    strategy,
    label: STRATEGY_LABELS[strategy],
    months: notPayable ? month : month,
    totalInterest: round2(totalInterest),
    totalPaid: round2(totalPaid),
    payoffOrder,
    notPayable,
    error: null,
  };
}

/** Runs all three strategies for the side by side comparison table. */
export function compareStrategies(
  cards: CardInput[],
  monthlyBudget: number | null,
  start: StartMonth,
): StrategyResult[] {
  return [
    simulatePayoff(cards, "minimums", monthlyBudget, start),
    simulatePayoff(cards, "avalanche", monthlyBudget, start),
    simulatePayoff(cards, "snowball", monthlyBudget, start),
  ];
}
