"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmtMoney, inputClass, parseNum, selectClass } from "@/components/ui";
import { calculateZakat, type NisabBasis } from "./zakat";

const CURRENCIES = ["Rs", "₹", "$", "£", "€", "AED", "SAR"];

export default function ZakatCalculator() {
  const [currency, setCurrency] = useState("Rs");
  const [goldPrice, setGoldPrice] = useState("20000");
  const [silverPrice, setSilverPrice] = useState("250");
  const [cash, setCash] = useState("500000");
  const [goldGrams, setGoldGrams] = useState("0");
  const [silverGrams, setSilverGrams] = useState("0");
  const [businessGoods, setBusinessGoods] = useState("0");
  const [receivables, setReceivables] = useState("0");
  const [otherAssets, setOtherAssets] = useState("0");
  const [liabilities, setLiabilities] = useState("0");
  const [basis, setBasis] = useState<NisabBasis>("silver");

  const money = (n: number) => `${currency} ${fmtMoney(n)}`;

  const result = useMemo(() => {
    const nums = [goldPrice, silverPrice, cash, goldGrams, silverGrams, businessGoods, receivables, otherAssets, liabilities].map(parseNum);
    if (nums.some((v) => v === null)) return null;
    const [gp, sp, c, gg, sg, bg, rec, oa, liab] = nums as number[];
    try {
      return calculateZakat({
        goldPricePerGram: gp,
        silverPricePerGram: sp,
        cash: c,
        goldGrams: gg,
        silverGrams: sg,
        businessGoodsValue: bg,
        receivables: rec,
        otherAssets: oa,
        liabilitiesDue: liab,
        nisabBasis: basis,
      });
    } catch {
      return null;
    }
  }, [goldPrice, silverPrice, cash, goldGrams, silverGrams, businessGoods, receivables, otherAssets, liabilities, basis]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Currency" htmlFor="zk-currency">
          <select id="zk-currency" className={selectClass} value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Gold price per gram" htmlFor="zk-gold-price" hint="Use today's market or jeweller rate.">
          <input id="zk-gold-price" className={inputClass} inputMode="decimal" value={goldPrice} onChange={(e) => setGoldPrice(e.target.value)} />
        </Field>
        <Field label="Silver price per gram" htmlFor="zk-silver-price" hint="Needed for the nisab check.">
          <input id="zk-silver-price" className={inputClass} inputMode="decimal" value={silverPrice} onChange={(e) => setSilverPrice(e.target.value)} />
        </Field>
        <Field label="Cash and bank balances" htmlFor="zk-cash">
          <input id="zk-cash" className={inputClass} inputMode="decimal" value={cash} onChange={(e) => setCash(e.target.value)} />
        </Field>
        <Field label="Gold owned (grams)" htmlFor="zk-gold-grams">
          <input id="zk-gold-grams" className={inputClass} inputMode="decimal" value={goldGrams} onChange={(e) => setGoldGrams(e.target.value)} />
        </Field>
        <Field label="Silver owned (grams)" htmlFor="zk-silver-grams">
          <input id="zk-silver-grams" className={inputClass} inputMode="decimal" value={silverGrams} onChange={(e) => setSilverGrams(e.target.value)} />
        </Field>
        <Field label="Business goods and stock value" htmlFor="zk-business">
          <input id="zk-business" className={inputClass} inputMode="decimal" value={businessGoods} onChange={(e) => setBusinessGoods(e.target.value)} />
        </Field>
        <Field label="Money owed to you (expected back)" htmlFor="zk-receivables">
          <input id="zk-receivables" className={inputClass} inputMode="decimal" value={receivables} onChange={(e) => setReceivables(e.target.value)} />
        </Field>
        <Field label="Other zakatable assets" htmlFor="zk-other">
          <input id="zk-other" className={inputClass} inputMode="decimal" value={otherAssets} onChange={(e) => setOtherAssets(e.target.value)} />
        </Field>
        <Field label="Debts due within the year" htmlFor="zk-liabilities">
          <input id="zk-liabilities" className={inputClass} inputMode="decimal" value={liabilities} onChange={(e) => setLiabilities(e.target.value)} />
        </Field>
        <Field label="Nisab basis" htmlFor="zk-basis" hint="Silver is the lower threshold and the common recommendation for cash wealth.">
          <select id="zk-basis" className={selectClass} value={basis} onChange={(e) => setBasis(e.target.value as NisabBasis)}>
            <option value="silver">Silver (612.36 grams)</option>
            <option value="gold">Gold (87.48 grams)</option>
          </select>
        </Field>
      </div>

      {result ? (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <ResultCard
              label="Zakat due"
              value={money(result.zakatAmount)}
              sub={result.zakatDue ? "2.5% of your net zakatable wealth" : "Your wealth is below the nisab, so no zakat is due"}
            />
            <ResultCard label="Net zakatable wealth" value={money(result.netZakatableWealth)} sub={`Total assets ${money(result.totalAssets)}`} />
            <ResultCard label={`Nisab threshold (${result.nisabBasis})`} sub="The minimum wealth at which zakat becomes due, on the basis you picked." value={money(result.nisabValue)} />
          </div>
          {(result.goldValue > 0 || result.silverValue > 0) && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {result.goldValue > 0 && <ResultCard label="Value of your gold" sub="Your gold weight multiplied by the price per gram you entered." value={money(result.goldValue)} />}
              {result.silverValue > 0 && <ResultCard label="Value of your silver" sub="Your silver weight multiplied by the price per gram you entered." value={money(result.silverValue)} />}
            </div>
          )}
        </>
      ) : (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
          Enter the current gold and silver prices per gram and your assets. A price is required for any metal you hold, and for the metal behind your nisab basis.
        </p>
      )}
    </div>
  );
}
