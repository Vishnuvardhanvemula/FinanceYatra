// Utility: calculateIndianTax(income, deductions) for FY 2024-25
// Returns tax under old and new regimes and which is recommended.

function clamp(v) { return Math.max(0, v); }

function applySlabs(taxable, slabs) {
  // slabs: array of { upto, rate } in ascending order; upto=null means infinity
  let remaining = taxable;
  let tax = 0;
  let lower = 0;
  for (const s of slabs) {
    const upper = s.upto == null ? Infinity : s.upto;
    const band = Math.max(0, Math.min(upper - lower, remaining));
    if (band > 0) {
      tax += band * (s.rate / 100);
      remaining -= band;
    }
    lower = upper;
    if (remaining <= 0) break;
  }
  return tax;
}

export function calculateIndianTax(grossIncome, deductions = {}) {
  // deductions: { hra=0, sec80c=0, sec80d=0, other=0 }
  const { hra = 0, sec80c = 0, sec80d = 0, other = 0 } = deductions || {};

  const stdDeductionNew = 75000; // per user's requirement
  const stdDeductionOld = 75000;

  // Old regime deductions caps
  const sec80cCap = 150000;
  const sec80cAllowed = Math.min(sec80c, sec80cCap);

  const totalDeductionsOld = clamp(sec80cAllowed + sec80d + hra + other + stdDeductionOld);
  const totalDeductionsNew = clamp(stdDeductionNew); // new regime allows only standard deduction per spec

  const taxableOld = Math.max(0, grossIncome - totalDeductionsOld);
  const taxableNew = Math.max(0, grossIncome - totalDeductionsNew);

  // FY 2024-25 slabs (widely used conservative set):
  // Old regime (age < 60): 0-2.5L:0, 2.5-5L:5%, 5-10L:20%, >10L:30%
  const oldSlabs = [
    { upto: 250000, rate: 0 },
    { upto: 500000, rate: 5 },
    { upto: 1000000, rate: 20 },
    { upto: null, rate: 30 },
  ];

  // New regime slabs (progressive lower thresholds): 0-3L:0,3-6L:5,6-9L:10,9-12L:15,12-15L:20,>15L:30
  const newSlabs = [
    { upto: 300000, rate: 0 },
    { upto: 600000, rate: 5 },
    { upto: 900000, rate: 10 },
    { upto: 1200000, rate: 15 },
    { upto: 1500000, rate: 20 },
    { upto: null, rate: 30 },
  ];

  const taxOldBeforeCess = applySlabs(taxableOld, oldSlabs);
  const taxNewBeforeCess = applySlabs(taxableNew, newSlabs);

  // Rebate: basic rebate under section 87A where applicable (income up to 5L) - set for both regimes
  const rebateLimit = 500000;
  const rebateOld = taxableOld <= rebateLimit ? Math.min(taxOldBeforeCess, 12500) : 0; // rebate capped at tax amount; approx
  const rebateNew = taxableNew <= rebateLimit ? Math.min(taxNewBeforeCess, 12500) : 0;

  const taxOldAfterRebate = Math.max(0, taxOldBeforeCess - rebateOld);
  const taxNewAfterRebate = Math.max(0, taxNewBeforeCess - rebateNew);

  // Health & education cess 4%
  const cessRate = 0.04;
  const taxOld = Math.round((taxOldAfterRebate) * (1 + cessRate));
  const taxNew = Math.round((taxNewAfterRebate) * (1 + cessRate));

  const recommended = taxOld <= taxNew ? 'old' : 'new';
  const taxSaved = Math.abs(taxOld - taxNew);

  return {
    grossIncome,
    deductions: { hra: Number(hra), sec80c: Number(sec80cAllowed), sec80d: Number(sec80d), other: Number(other) },
    old: { taxableIncome: taxableOld, taxBeforeCess: Math.round(taxOldBeforeCess), tax: taxOld },
    new: { taxableIncome: taxableNew, taxBeforeCess: Math.round(taxNewBeforeCess), tax: taxNew },
    recommended,
    taxSaved,
  };
}

export default calculateIndianTax;
