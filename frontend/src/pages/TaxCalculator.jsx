import React, { useState, useMemo } from 'react';
import calculateIndianTax from '../utils/taxCalculator';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Shield, TrendingUp, AlertCircle, Check, X, ChevronDown, ChevronUp, IndianRupee, HelpCircle } from 'lucide-react';
import { useCalculatorTour } from '../hooks/useCalculatorTour';
import DemoDataButton from '../components/DemoDataButton';

function rupee(n) { return '₹' + (Number(n) || 0).toLocaleString(); }

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const items = payload.slice().reverse();
  return (
    <div className="bg-[#0b101b]/90 backdrop-blur-xl border border-white/10 p-3 rounded-xl shadow-2xl">
      <div className="text-xs font-medium text-gray-400 mb-2">{label}</div>
      {items.map((p, i) => (
        <div key={i} className="flex items-center justify-between gap-4 text-sm mb-1 last:mb-0">
          <div className="text-gray-300">{p.name}</div>
          <div className="font-semibold text-white">{rupee(p.value)}</div>
        </div>
      ))}
    </div>
  );
}

const InputField = ({ label, value, onChange, prefix = '₹' }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-300">{label}</label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-500 group-focus-within:text-teal-400 transition-colors">{prefix}</span>
      </div>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value || 0))}
        className="block w-full pl-8 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all font-medium"
      />
    </div>
  </div>
);

export default function TaxCalculator() {
  const [gross, setGross] = useState(1200000);
  const [showDeductions, setShowDeductions] = useState(true);
  const [sec80c, setSec80c] = useState(150000);
  const [sec80d, setSec80d] = useState(25000);
  const [hra, setHra] = useState(0);

  const { restartTour } = useCalculatorTour('tax_tour_v1', [
    {
      element: '#tax-inputs',
      popover: { title: 'Income & Deductions', description: 'Enter your total income and claimed deductions here.', side: 'right' }
    },
    {
      element: '#tax-comparison',
      popover: { title: 'Regime Comparison', description: 'See side-by-side which tax regime saves you more money.', side: 'left' }
    },
    {
      element: '#tax-chart',
      popover: { title: 'Visual Breakdown', description: 'Compare Tax Liability vs Take Home pay visually.', side: 'top' }
    }
  ]);

  const onFillDemoData = () => {
    setGross(1800000);
    setSec80c(150000);
    setSec80d(50000);
    setHra(100000);
    setShowDeductions(true);
  };

  const result = useMemo(() => calculateIndianTax(Number(gross || 0), { hra: Number(hra || 0), sec80c: Number(sec80c || 0), sec80d: Number(sec80d || 0) }), [gross, hra, sec80c, sec80d]);

  const oldTake = Math.max(0, result.grossIncome - result.old.tax);
  const newTake = Math.max(0, result.grossIncome - result.new.tax);

  const data = [
    { name: 'Old Regime', tax: result.old.tax, take: oldTake },
    { name: 'New Regime', tax: result.new.tax, take: newTake },
  ];

  const winner = result.old.tax < result.new.tax ? 'old' : (result.new.tax < result.old.tax ? 'new' : 'tie');

  return (
    <div className="min-h-screen pt-12 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
            Tax Regime Analyzer
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto flex items-center justify-center gap-2">
            Compare Old vs New tax regimes instantly.
            <button onClick={restartTour} className="text-teal-400 hover:text-teal-300 transition-colors" title="Replay Tour">
              <HelpCircle className="w-4 h-4" />
            </button>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Inputs */}
          <div className="lg:col-span-4 space-y-6" id="tax-inputs">
            <div className="bg-[#0b101b]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8 flex-wrap gap-2">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-teal-400" />
                  Income Details
                </h2>
                <DemoDataButton onFill={onFillDemoData} />
              </div>

              <div className="space-y-6">
                <InputField label="Gross Annual Income" value={gross} onChange={setGross} />

                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={() => setShowDeductions(!showDeductions)}
                    className="flex items-center justify-between w-full text-left group"
                  >
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Deductions (Old Regime)</span>
                    <div className={`p-1 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors ${showDeductions ? 'text-teal-400' : 'text-gray-500'}`}>
                      {showDeductions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {showDeductions && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 space-y-4">
                          <InputField label="Section 80C (Max 1.5L)" value={sec80c} onChange={setSec80c} />
                          <InputField label="Section 80D (Health Ins)" value={sec80d} onChange={setSec80d} />
                          <InputField label="HRA Exemption" value={hra} onChange={setHra} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Comparison */}
          <div className="lg:col-span-8 space-y-8">
            {/* Battle Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="tax-comparison">
              {/* Old Regime Card */}
              <div className={`relative overflow-hidden rounded-3xl p-6 border transition-all duration-300 ${winner === 'old' ? 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'bg-[#0b101b]/60 border-white/10'}`}>
                {winner === 'old' && (
                  <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                    RECOMMENDED
                  </div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Old Regime</h3>
                    <p className="text-sm text-gray-400">With Deductions</p>
                  </div>
                  <Shield className={`w-6 h-6 ${winner === 'old' ? 'text-emerald-400' : 'text-gray-600'}`} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tax Payable</span>
                    <span className={`font-bold ${winner === 'old' ? 'text-emerald-400' : 'text-white'}`}>{rupee(result.old.tax)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Take Home</span>
                    <span className="text-white">{rupee(oldTake)}</span>
                  </div>
                </div>
              </div>

              {/* New Regime Card */}
              <div className={`relative overflow-hidden rounded-3xl p-6 border transition-all duration-300 ${winner === 'new' ? 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'bg-[#0b101b]/60 border-white/10'}`}>
                {winner === 'new' && (
                  <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                    RECOMMENDED
                  </div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">New Regime</h3>
                    <p className="text-sm text-gray-400">Default (No Deductions)</p>
                  </div>
                  <TrendingUp className={`w-6 h-6 ${winner === 'new' ? 'text-emerald-400' : 'text-gray-600'}`} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tax Payable</span>
                    <span className={`font-bold ${winner === 'new' ? 'text-emerald-400' : 'text-white'}`}>{rupee(result.new.tax)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Take Home</span>
                    <span className="text-white">{rupee(newTake)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Banner */}
            <div className="bg-gradient-to-r from-teal-500/20 to-blue-600/20 border border-teal-500/30 rounded-2xl p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-teal-500/20 rounded-full text-teal-400">
                  <IndianRupee className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-teal-200">Total Savings</div>
                  <div className="text-2xl font-bold text-white">{rupee(result.taxSaved)}</div>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-sm text-gray-400">By choosing</div>
                <div className="text-lg font-semibold text-white">{result.recommended === 'old' ? 'Old Regime' : 'New Regime'}</div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-[#0b101b]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl" id="tax-chart">
              <h3 className="text-lg font-semibold text-white mb-6">Comparison</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" strokeOpacity={0.05} vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                    <YAxis tickFormatter={(v) => (v >= 100000 ? `${v / 100000}L` : v)} tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar dataKey="take" stackId="a" fill="#10b981" name="Take Home" radius={[0, 0, 4, 4]} barSize={60} />
                    <Bar dataKey="tax" stackId="a" fill="#ef4444" name="Tax Liability" radius={[4, 4, 0, 0]} barSize={60} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
