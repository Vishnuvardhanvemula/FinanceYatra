import React, { useState, useMemo } from 'react';
import { calculateEMI, amortizationSchedule, sumSchedule } from '../utils/emiCalculator';
import DonutChart from '../components/DonutChart';
import { IconCurrency } from '../components/Icons';
import { motion, AnimatePresence } from 'framer-motion';

export default function EMICalculatorPage() {
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(7.5);
  const [months, setMonths] = useState(120);
  const [showAllSchedule, setShowAllSchedule] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [expandedYears, setExpandedYears] = useState({});

  const emi = useMemo(() => calculateEMI(principal, rate, months), [principal, rate, months]);
  const schedule = useMemo(() => amortizationSchedule(principal, rate, months), [principal, rate, months]);
  const totals = useMemo(() => sumSchedule(schedule), [schedule]);
  const displayedSchedule = showAllSchedule ? schedule : schedule.slice(0, 36);

  const groupedYears = useMemo(() => {
    if (!Array.isArray(schedule) || schedule.length === 0) return [];
    const map = schedule.reduce((acc, s) => {
      const year = Math.max(1, Math.ceil(s.month / 12));
      if (!acc[year]) acc[year] = [];
      acc[year].push(s);
      return acc;
    }, {});
    const years = Object.keys(map).map(Number).sort((a, b) => a - b);
    return years.map((y) => {
      const monthsForYear = map[y];
      const yearPrincipal = monthsForYear.reduce((sum, m) => sum + m.principalPaid, 0);
      const yearInterest = monthsForYear.reduce((sum, m) => sum + m.interestPaid, 0);
      const endBalance = monthsForYear[monthsForYear.length - 1].remainingBalance;
      return { year: y, months: monthsForYear, yearPrincipal, yearInterest, endBalance };
    });
  }, [schedule]);

  const toggleYear = (y) => setExpandedYears((p) => ({ ...p, [y]: !p[y] }));
  const reset = () => { setPrincipal(1000000); setRate(7.5); setMonths(120); setShowAllSchedule(false); setExpandedYears({}); };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="glass-card p-6 rounded-3xl shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-lg neo-card flex items-center justify-center text-white font-bold" style={{ background: 'linear-gradient(135deg,var(--fy-gradient-start,#12b8a2),var(--fy-gradient-mid,#0ea5a3))' }} aria-hidden={true}>
            <IconCurrency className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-50">EMI Calculator</h1>
            <p className="text-sm text-gray-300">Estimate your monthly payments and view a visual amortization schedule</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="glass-card glass-emi p-4 rounded-xl">
              <label className="text-sm text-gray-300">Loan Amount (₹)</label>
              <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value || 0))} className="w-full p-3 rounded-lg bg-white/5 text-white mt-2" />
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-gray-400">Rate (%)</label>
                  <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value || 0))} className="w-full p-2 rounded-md bg-white/5 mt-1 text-white placeholder:text-gray-400" />
                </div>
                <div>
                  <label className="text-xs text-gray-400">Tenure (months)</label>
                  <input type="number" value={months} onChange={(e) => setMonths(Number(e.target.value || 0))} className="w-full p-2 rounded-md bg-white/5 mt-1 text-white placeholder:text-gray-400" />
                </div>
                <div className="flex items-end">
                  <button onClick={reset} className="px-3 py-2 rounded-md btn-outline text-white hover:brightness-105">Reset</button>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm text-gray-300">Monthly EMI</div>
                <div className="text-3xl font-bold text-white">₹{emi ? emi.toFixed(0) : '0'}</div>
              </div>
            </div>
          </div>

          <aside className="col-span-1">
            <div className="loan-summary-sticky glass-card p-4 rounded-xl text-gray-300">
              <div className="text-sm font-semibold text-gray-100">Loan Summary</div>
              <div className="mt-2">Principal: ₹{Number(principal).toLocaleString()}</div>
              <div>Rate: {rate}%</div>
              <div>Tenure: {months} months</div>
            </div>
          </aside>
        </div>

        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-300 font-semibold">Loan Composition</div>
            <div className="flex gap-2">
              <button onClick={() => setShowSchedule((s) => !s)} className="px-3 py-1 rounded-md btn-outline text-xs text-white hover:brightness-105">{showSchedule ? 'Hide Breakdown' : 'Year-by-Year'}</button>
              <button onClick={() => setShowAllSchedule((s) => !s)} className="px-3 py-1 rounded-md btn-gradient text-xs text-white hover:brightness-105">{showAllSchedule ? 'Show First 36' : 'Show Full'}</button>
            </div>
          </div>
          <div className="flex items-center justify-center py-4">
            <DonutChart principal={totals.totalPrincipal || principal} interest={totals.totalInterest || (emi * months - principal)} size={200} stroke={18} animate />
          </div>
        </section>

        <section>
          <div className="rounded-lg bg-white/5">
            <div className="flex items-center justify-between p-3 border-b border-white/6">
              <div className="text-sm text-gray-300 font-semibold">Amortization Schedule</div>
              <div className="flex items-center gap-2">
                <button onClick={() => {
                  // build CSV for full schedule
                  const rows = [['Month', 'Payment', 'Principal', 'Interest', 'Balance']];
                  (schedule || []).forEach((r) => rows.push([r.month, r.payment.toFixed(2), r.principalPaid.toFixed(2), r.interestPaid.toFixed(2), r.remainingBalance.toFixed(2)]));
                  const csv = rows.map((r) => r.join(',')).join('\n');
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'amortization_schedule.csv';
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  URL.revokeObjectURL(url);
                }} className="px-3 py-1 rounded-md btn-outline text-xs text-white hover:brightness-105">Download CSV</button>
                <button onClick={() => setShowAllSchedule((s) => !s)} className="px-3 py-1 rounded-md btn-gradient text-xs text-white hover:brightness-105">{showAllSchedule ? 'Show First 36' : 'Show Full'}</button>
              </div>
            </div>

            <div className="overflow-auto p-3">
              <table className="w-full text-sm text-gray-200">
                <thead>
                  <tr className="text-xs text-gray-300 border-b border-gray-700">
                    <th className="p-2">Period</th>
                    <th className="p-2">Payment</th>
                    <th className="p-2">Principal</th>
                    <th className="p-2">Interest</th>
                    <th className="p-2">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Show only month rows if collapsed view (first 36) and not year grouping */}
                  {!showSchedule && displayedSchedule.map((r) => (
                    <tr key={r.month} className="border-b border-gray-800">
                      <td className="p-2">{r.month}</td>
                      <td className="p-2">₹{r.payment.toFixed(2)}</td>
                      <td className="p-2">₹{r.principalPaid.toFixed(2)}</td>
                      <td className="p-2">₹{r.interestPaid.toFixed(2)}</td>
                      <td className="p-2">₹{r.remainingBalance.toFixed(2)}</td>
                    </tr>
                  ))}

                  {/* Year grouped accordion */}
                  {showSchedule && groupedYears.map(({ year, months: monthsForYear, yearPrincipal, yearInterest, endBalance }) => (
                    <React.Fragment key={`year-${year}`}>
                      <tr className="cursor-pointer bg-white/6 text-gray-100 hover:bg-white/10" onClick={() => toggleYear(year)} aria-expanded={!!expandedYears[year]}>
                        <td className="p-3 font-semibold">Year {year} ({monthsForYear.length}m)</td>
                        <td className="p-3">₹{(monthsForYear.reduce((s, m) => s + m.payment, 0)).toFixed(2)}</td>
                        <td className="p-3">₹{yearPrincipal.toFixed(0)}</td>
                        <td className="p-3">₹{yearInterest.toFixed(0)}</td>
                        <td className="p-3">₹{endBalance.toFixed(0)}</td>
                      </tr>

                      <tr>
                        <td colSpan={5} className="p-0">
                          <AnimatePresence initial={false}>
                            {expandedYears[year] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.32 }}
                                style={{ overflow: 'hidden' }}
                              >
                                <div className="px-4 py-3 bg-white/3">
                                  <table className="w-full text-sm text-gray-200">
                                    <tbody>
                                      {monthsForYear.map((m) => (
                                        <tr key={`y-${year}-m-${m.month}`} className="border-b border-gray-800">
                                          <td className="p-2 pl-6 text-gray-200">Month {m.month}</td>
                                          <td className="p-2 text-gray-200">₹{m.payment.toFixed(2)}</td>
                                          <td className="p-2 text-gray-200">₹{m.principalPaid.toFixed(2)}</td>
                                          <td className="p-2 text-gray-200">₹{m.interestPaid.toFixed(2)}</td>
                                          <td className="p-2 text-gray-200">₹{m.remainingBalance.toFixed(2)}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
