import React, { useState, useMemo } from 'react';
import { calculateEMI, amortizationSchedule, sumSchedule } from '../utils/emiCalculator';
import DonutChart from '../components/DonutChart';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Calendar, Percent, RefreshCw, Download, ChevronDown, ChevronUp, IndianRupee } from 'lucide-react';

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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen pt-12 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
            EMI Calculator
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Plan your loans effectively with our advanced EMI calculator. Visualize your repayment schedule and manage your finances better.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0b101b]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-teal-400" />
                  Loan Details
                </h2>
                <button
                  onClick={reset}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </button>
              </div>

              <div className="space-y-8">
                {/* Loan Amount */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">Loan Amount</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <IndianRupee className="h-5 w-5 text-gray-500 group-focus-within:text-teal-400 transition-colors" />
                    </div>
                    <input
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(Number(e.target.value || 0))}
                      className="block w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all text-lg font-medium"
                      placeholder="Enter amount"
                    />
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="10000000"
                    step="10000"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Interest Rate */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-300">Interest Rate (% p.a)</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Percent className="h-5 w-5 text-gray-500 group-focus-within:text-teal-400 transition-colors" />
                      </div>
                      <input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value || 0))}
                        className="block w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all text-lg font-medium"
                      />
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="0.1"
                      value={rate}
                      onChange={(e) => setRate(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal-500"
                    />
                  </div>

                  {/* Tenure */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-300">Tenure (Months)</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-500 group-focus-within:text-teal-400 transition-colors" />
                      </div>
                      <input
                        type="number"
                        value={months}
                        onChange={(e) => setMonths(Number(e.target.value || 0))}
                        className="block w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all text-lg font-medium"
                      />
                    </div>
                    <input
                      type="range"
                      min="6"
                      max="360"
                      step="6"
                      value={months}
                      onChange={(e) => setMonths(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal-500"
                    />
                    <div className="text-right text-xs text-gray-500">{(months / 12).toFixed(1)} Years</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="bg-[#0b101b]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Breakdown</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowSchedule((s) => !s)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${showSchedule ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                  >
                    {showSchedule ? 'Hide Table' : 'View Schedule'}
                  </button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                <div className="relative">
                  <DonutChart
                    principal={totals.totalPrincipal || principal}
                    interest={totals.totalInterest || (emi * months - principal)}
                    size={240}
                    stroke={20}
                    animate
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xs text-gray-400 uppercase tracking-wider">Total Amount</span>
                    <span className="text-xl font-bold text-white mt-1">{formatCurrency((totals.totalPrincipal || principal) + (totals.totalInterest || (emi * months - principal)))}</span>
                  </div>
                </div>

                <div className="space-y-4 w-full md:w-auto">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="w-3 h-3 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
                    <div>
                      <div className="text-xs text-gray-400">Principal Amount</div>
                      <div className="text-lg font-semibold text-white">{formatCurrency(totals.totalPrincipal || principal)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                    <div>
                      <div className="text-xs text-gray-400">Total Interest</div>
                      <div className="text-lg font-semibold text-white">{formatCurrency(totals.totalInterest || (emi * months - principal))}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Monthly EMI Card */}
              <div className="bg-gradient-to-br from-teal-500/20 to-blue-600/20 backdrop-blur-xl border border-teal-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-teal-500/30" />

                <h3 className="text-gray-300 font-medium mb-2 relative z-10">Monthly EMI</h3>
                <div className="text-4xl md:text-5xl font-bold text-white mb-4 relative z-10 tracking-tight">
                  {formatCurrency(emi)}
                </div>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />
                <div className="space-y-2 relative z-10">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Principal</span>
                    <span className="text-white font-medium">{formatCurrency(principal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Interest Rate</span>
                    <span className="text-teal-400 font-medium">{rate}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tenure</span>
                    <span className="text-white font-medium">{months} Months</span>
                  </div>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="bg-[#0b101b]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm mb-1">Did you know?</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Increasing your EMI by just 5% every year can help you close your loan significantly earlier and save huge on interest.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Amortization Schedule */}
        <AnimatePresence>
          {showSchedule && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 overflow-hidden"
            >
              <div className="bg-[#0b101b]/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <h3 className="text-lg font-semibold text-white">Amortization Schedule</h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
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
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-medium transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download CSV
                    </button>
                    <button
                      onClick={() => setShowAllSchedule((s) => !s)}
                      className="px-4 py-2 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 rounded-xl text-sm font-medium transition-colors"
                    >
                      {showAllSchedule ? 'Show Less' : 'Show All'}
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-400 uppercase bg-white/5">
                      <tr>
                        <th className="px-6 py-4 font-medium">Period</th>
                        <th className="px-6 py-4 font-medium">EMI</th>
                        <th className="px-6 py-4 font-medium">Principal</th>
                        <th className="px-6 py-4 font-medium">Interest</th>
                        <th className="px-6 py-4 font-medium">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {!showAllSchedule && displayedSchedule.map((r) => (
                        <tr key={r.month} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-gray-300">{r.month}</td>
                          <td className="px-6 py-4 text-white font-medium">{formatCurrency(r.payment)}</td>
                          <td className="px-6 py-4 text-teal-400">{formatCurrency(r.principalPaid)}</td>
                          <td className="px-6 py-4 text-purple-400">{formatCurrency(r.interestPaid)}</td>
                          <td className="px-6 py-4 text-gray-300">{formatCurrency(r.remainingBalance)}</td>
                        </tr>
                      ))}

                      {showAllSchedule && groupedYears.map(({ year, months: monthsForYear, yearPrincipal, yearInterest, endBalance }) => (
                        <React.Fragment key={`year-${year}`}>
                          <tr
                            className="bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
                            onClick={() => toggleYear(year)}
                          >
                            <td className="px-6 py-4 font-semibold text-white flex items-center gap-2">
                              {expandedYears[year] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              Year {year}
                            </td>
                            <td className="px-6 py-4 text-gray-300 font-medium">{formatCurrency(monthsForYear.reduce((s, m) => s + m.payment, 0))}</td>
                            <td className="px-6 py-4 text-teal-400 font-medium">{formatCurrency(yearPrincipal)}</td>
                            <td className="px-6 py-4 text-purple-400 font-medium">{formatCurrency(yearInterest)}</td>
                            <td className="px-6 py-4 text-white font-medium">{formatCurrency(endBalance)}</td>
                          </tr>

                          <AnimatePresence>
                            {expandedYears[year] && (
                              <tr>
                                <td colSpan={5} className="p-0">
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden bg-[#0b101b]/40"
                                  >
                                    <table className="w-full">
                                      <tbody className="divide-y divide-white/5">
                                        {monthsForYear.map((m) => (
                                          <tr key={`y-${year}-m-${m.month}`} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-3 pl-12 text-gray-400 text-xs">Month {m.month}</td>
                                            <td className="px-6 py-3 text-gray-300 text-xs">{formatCurrency(m.payment)}</td>
                                            <td className="px-6 py-3 text-teal-500/80 text-xs">{formatCurrency(m.principalPaid)}</td>
                                            <td className="px-6 py-3 text-purple-500/80 text-xs">{formatCurrency(m.interestPaid)}</td>
                                            <td className="px-6 py-3 text-gray-400 text-xs">{formatCurrency(m.remainingBalance)}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </motion.div>
                                </td>
                              </tr>
                            )}
                          </AnimatePresence>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
