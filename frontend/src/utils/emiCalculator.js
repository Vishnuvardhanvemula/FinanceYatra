/**
 * EMI Calculator utilities
 * - calculateEMI: monthly payment
 * - amortizationSchedule: returns per-month breakdown of principal and interest
 */

export function calculateEMI(principal, annualRate, totalMonths) {
  const P = Number(principal) || 0;
  const annual = Number(annualRate) || 0;
  const n = Number(totalMonths) || 0;
  if (!P || !n) return 0;
  const r = annual / 12 / 100; // monthly rate
  if (r === 0) return P / n;
  const x = Math.pow(1 + r, n);
  const emi = P * r * x / (x - 1);
  return emi;
}

export function amortizationSchedule(principal, annualRate, totalMonths) {
  const P = Number(principal) || 0;
  const annual = Number(annualRate) || 0;
  const n = Number(totalMonths) || 0;
  if (!P || !n) return [];
  const r = annual / 12 / 100; // monthly rate
  const emi = calculateEMI(P, annual, n);

  let balance = P;
  const schedule = [];
  for (let i = 1; i <= n; i++) {
    const interest = r === 0 ? 0 : balance * r;
    const principalPaid = emi - interest;
    balance = Math.max(0, balance - principalPaid);
    schedule.push({
      month: i,
      payment: emi,
      principalPaid: Number(principalPaid.toFixed(2)),
      interestPaid: Number(interest.toFixed(2)),
      remainingBalance: Number(balance.toFixed(2)),
    });
  }
  return schedule;
}

export function sumSchedule(schedule) {
  return schedule.reduce((acc, s) => {
    acc.totalPayment += s.payment;
    acc.totalPrincipal += s.principalPaid;
    acc.totalInterest += s.interestPaid;
    return acc;
  }, { totalPayment: 0, totalPrincipal: 0, totalInterest: 0 });
}
