/**
 * Zakat calculator logic.
 *
 * Zakat is charged at 2.5 percent on zakatable wealth held for a full
 * lunar year (hawl), once that wealth reaches the nisab threshold.
 * The nisab is defined by weight of metal:
 *   gold nisab   = 87.48 grams (7.5 tola)
 *   silver nisab = 612.36 grams (52.5 tola)
 * The silver nisab gives the lower threshold and is the basis most
 * commonly used for cash and mixed wealth, so it is the default here.
 * The user can switch the basis to gold.
 *
 * Figures follow the widely published classical weights used by the
 * major fatwa and zakat bodies. Prices per gram are entered by the user
 * because metal prices change daily.
 */

export const NISAB_GOLD_GRAMS = 87.48;
export const NISAB_SILVER_GRAMS = 612.36;
export const ZAKAT_RATE = 0.025; // 2.5 percent

export type NisabBasis = "silver" | "gold";

export interface ZakatInput {
  /** Cash in hand and in bank accounts. */
  cash?: number;
  /** Weight of gold owned, in grams. */
  goldGrams?: number;
  /** Current gold price per gram in the chosen currency. */
  goldPricePerGram?: number;
  /** Weight of silver owned, in grams. */
  silverGrams?: number;
  /** Current silver price per gram in the chosen currency. */
  silverPricePerGram?: number;
  /** Value of business stock and trade goods. */
  businessGoodsValue?: number;
  /** Money owed to you that you expect to recover (loans given, receivables). */
  receivables?: number;
  /** Any other zakatable assets, valued in currency. */
  otherAssets?: number;
  /** Debts due within the year that may be deducted. */
  liabilitiesDue?: number;
  /** Which metal defines the nisab threshold. Defaults to silver. */
  nisabBasis?: NisabBasis;
}

export interface ZakatResult {
  /** Market value of the gold held. */
  goldValue: number;
  /** Market value of the silver held. */
  silverValue: number;
  /** Sum of every zakatable asset before liabilities. */
  totalAssets: number;
  liabilitiesDue: number;
  /** Assets minus liabilities, never below zero. */
  netZakatableWealth: number;
  /** Currency value of the nisab threshold on the chosen basis. */
  nisabValue: number;
  nisabBasis: NisabBasis;
  /** True when net wealth reaches the nisab and zakat is payable. */
  zakatDue: boolean;
  /** Amount payable: 2.5 percent of net wealth when due, otherwise zero. */
  zakatAmount: number;
}

function valueOrZero(value: number | undefined, label: string): number {
  const v = value ?? 0;
  if (!Number.isFinite(v) || v < 0) {
    throw new RangeError(`${label} must be zero or greater.`);
  }
  return v;
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateZakat(input: ZakatInput): ZakatResult {
  const cash = valueOrZero(input.cash, "Cash");
  const goldGrams = valueOrZero(input.goldGrams, "Gold weight");
  const goldPricePerGram = valueOrZero(input.goldPricePerGram, "Gold price");
  const silverGrams = valueOrZero(input.silverGrams, "Silver weight");
  const silverPricePerGram = valueOrZero(input.silverPricePerGram, "Silver price");
  const businessGoodsValue = valueOrZero(input.businessGoodsValue, "Business goods");
  const receivables = valueOrZero(input.receivables, "Receivables");
  const otherAssets = valueOrZero(input.otherAssets, "Other assets");
  const liabilitiesDue = valueOrZero(input.liabilitiesDue, "Liabilities");
  const nisabBasis: NisabBasis = input.nisabBasis ?? "silver";

  if (goldGrams > 0 && goldPricePerGram <= 0) {
    throw new RangeError("Enter the gold price per gram to value your gold.");
  }
  if (silverGrams > 0 && silverPricePerGram <= 0) {
    throw new RangeError("Enter the silver price per gram to value your silver.");
  }
  if (nisabBasis === "gold" && goldPricePerGram <= 0) {
    throw new RangeError("Enter the gold price per gram to compute the gold nisab.");
  }
  if (nisabBasis === "silver" && silverPricePerGram <= 0) {
    throw new RangeError("Enter the silver price per gram to compute the nisab.");
  }

  const goldValue = round2(goldGrams * goldPricePerGram);
  const silverValue = round2(silverGrams * silverPricePerGram);
  const totalAssets = round2(
    cash + goldValue + silverValue + businessGoodsValue + receivables + otherAssets,
  );
  const netZakatableWealth = Math.max(0, round2(totalAssets - liabilitiesDue));
  const nisabValue =
    nisabBasis === "gold"
      ? round2(NISAB_GOLD_GRAMS * goldPricePerGram)
      : round2(NISAB_SILVER_GRAMS * silverPricePerGram);
  const zakatDue = netZakatableWealth >= nisabValue && netZakatableWealth > 0;

  return {
    goldValue,
    silverValue,
    totalAssets,
    liabilitiesDue,
    netZakatableWealth,
    nisabValue,
    nisabBasis,
    zakatDue,
    zakatAmount: zakatDue ? round2(netZakatableWealth * ZAKAT_RATE) : 0,
  };
}
