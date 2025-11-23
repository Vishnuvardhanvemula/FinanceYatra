import React, { useState, useMemo } from 'react';
import calculateIndianTax from '../utils/taxCalculator';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

function rupee(n) { return '₹' + (Number(n) || 0).toLocaleString(); }

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const items = payload.slice().reverse();
  return (
    <div className="backdrop-blur-md bg-slate-900/40 border border-white/8 rounded-lg p-3 text-sm text-white">
      <div className="text-xs text-gray-300 mb-2">{label}</div>
      {items.map((p, i) => (
        <div key={i} className="flex items-center justify-between text-white/90">
          <div className="text-sm">{p.name}</div>
          <div className="font-semibold">{rupee(p.value)}</div>
        </div>
      ))}
    </div>
  );
}

export default function TaxCalculator() {
  const [gross, setGross] = useState(1200000);
  const [showDeductions, setShowDeductions] = useState(true);
  const [sec80c, setSec80c] = useState(150000);
  const [sec80d, setSec80d] = useState(5000);
  const [hra, setHra] = useState(0);

  const result = useMemo(() => calculateIndianTax(Number(gross || 0), { hra: Number(hra || 0), sec80c: Number(sec80c || 0), sec80d: Number(sec80d || 0) }), [gross, hra, sec80c, sec80d]);

  const oldTake = Math.max(0, result.grossIncome - result.old.tax);
  const newTake = Math.max(0, result.grossIncome - result.new.tax);

  const data = [
    { name: 'Old Regime', tax: result.old.tax, take: oldTake },
    { name: 'New Regime', tax: result.new.tax, take: newTake },
  ];

  const winner = result.old.tax < result.new.tax ? 'old' : (result.new.tax < result.old.tax ? 'new' : 'tie');

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-2">Income Tax Calculator (FY 2024-25)</h2>
      <p className="text-gray-400 mb-6">Compare Old vs New tax regimes and see savings.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left controls */}
        <div className="lg:w-2/5 w-full">
          <div className="glass-card p-6 rounded-2xl space-y-4">
            <label className="text-sm text-gray-300">Gross Salary (annual)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-300">₹</span>
              <input type="number" value={gross} onChange={(e) => setGross(Number(e.target.value || 0))} className="w-full p-3 pl-9 rounded-md bg-white/5 text-white" />
            </div>

            <div className="mt-4">
              <div className="bg-white/3 border border-white/6 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-300">Include Old-Regime Deductions</div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only" checked={showDeductions} onChange={() => setShowDeductions(s => !s)} />
                    <div className={`w-11 h-6 flex items-center bg-white/6 rounded-full p-1 ${showDeductions ? 'justify-end' : 'justify-start'}`}>
                      <div className="w-4 h-4 bg-white rounded-full shadow" />
                    </div>
                  </label>
                </div>

                <AnimatePresence initial={false}>
                  {showDeductions && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.24 }}
                      className="mt-3 overflow-hidden"
                    >
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-gray-300">Section 80C (max ₹1.5L)</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-300">₹</span>
                            <input type="number" value={sec80c} onChange={(e) => setSec80c(Number(e.target.value || 0))} className="w-full p-2 pl-9 rounded-md bg-white/5 text-white text-sm mt-1" />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-gray-300">Section 80D</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-300">₹</span>
                            <input type="number" value={sec80d} onChange={(e) => setSec80d(Number(e.target.value || 0))} className="w-full p-2 pl-9 rounded-md bg-white/5 text-white text-sm mt-1" />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-gray-300">HRA (annual)</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-300">₹</span>
                            <input type="number" value={hra} onChange={(e) => setHra(Number(e.target.value || 0))} className="w-full p-2 pl-9 rounded-md bg-white/5 text-white text-sm mt-1" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Right visualization */}
        <div className="lg:w-3/5 w-full space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div className={`p-5 rounded-2xl text-white flex items-center justify-between ${winner === 'old' ? 'bg-emerald-700 shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/10' : 'bg-slate-800'}`}>
              <div>
                <div className="text-sm">Old Regime</div>
                <div className="text-2xl font-bold mt-2">{rupee(result.old.tax)}</div>
              </div>
              <div className="text-sm text-right">
                {winner === 'old' && <div className="text-xs">🏆 Winner</div>}
              </div>
            </div>

            <div className="col-span-1 sm:col-span-1 flex items-center justify-center">
              <div className="text-center p-4 rounded-3xl bg-gradient-to-r from-slate-800/50 via-emerald-700/8 to-slate-800/50">
                <div className="text-sm text-gray-300">Tax Saved</div>
                <div className="text-4xl font-extrabold text-white mt-1">{rupee(result.taxSaved)}</div>
                <div className="text-xs text-gray-400 mt-1">Save with {result.recommended === 'old' ? 'Old' : 'New'} Regime</div>
              </div>
            </div>

            <div className={`p-5 rounded-2xl text-white flex items-center justify-between ${winner === 'new' ? 'bg-emerald-700 shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/10' : 'bg-slate-800'}`}>
              <div>
                <div className="text-sm">New Regime</div>
                <div className="text-2xl font-bold mt-2">{rupee(result.new.tax)}</div>
              </div>
              <div className="text-sm text-right">
                {winner === 'new' && <div className="text-xs">🏆 Winner</div>}
              </div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl">
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" strokeOpacity={0.04} />
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} />
                  <YAxis tickFormatter={(v) => (v >= 100000 ? `${v/100000}L` : v)} tick={{ fill: '#94a3b8' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  {/* Stack: bottom -> take (green), top -> tax (red) */}
                  <Bar dataKey="take" stackId="a" fill="#10b981" name="Take Home" barSize={48} radius={[10,10,0,0]}>
                    {data.map((entry, idx) => (<Cell key={`cell-take-${idx}`} />))}
                  </Bar>
                  <Bar dataKey="tax" stackId="a" fill="#ef4444" name="Tax Liability" barSize={48} radius={[10,10,0,0]}>
                    {data.map((entry, idx) => (<Cell key={`cell-tax-${idx}`} />))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

