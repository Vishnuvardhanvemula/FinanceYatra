import React, { useMemo, useState, useRef, useEffect } from 'react';

function formatCurrency(v) {
  if (!isFinite(v)) return '₹0';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);
}

function AdvancedSettings({ expectedReturn, setExpectedReturn, inflation, setInflation }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4">
      <button onClick={() => setOpen((s) => !s)} className="text-sm text-gray-300 hover:text-white flex items-center gap-2">
        <span>{open ? '▼' : '▶'}</span>
        <span>Advanced Settings</span>
      </button>
      {open && (
        <div className="mt-3 p-3 bg-white/3 rounded-lg">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-200">Expected Return (%)</label>
              <input type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value || 0))} className="w-full p-2 rounded-md bg-white/5 text-white text-sm mt-2" />
            </div>
            <div>
              <label className="text-xs text-gray-200">Inflation (%)</label>
              <input type="number" value={inflation} onChange={(e) => setInflation(Number(e.target.value || 0))} className="w-full p-2 rounded-md bg-white/5 text-white text-sm mt-2" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Compute required corpus at retirement using real return formula
function computeRequiredCorpus({ monthlyExpenses, yearsToRetire, yearsInRetirement, expectedReturn, inflation }) {
  const annualExpenseToday = monthlyExpenses * 12;
  const expenseAtRetirement = annualExpenseToday * Math.pow(1 + inflation / 100, yearsToRetire);

  // real return approx
  const r = expectedReturn / 100;
  const g = inflation / 100;
  const realReturn = (1 + r) / (1 + g) - 1;

  if (Math.abs(realReturn) < 1e-6) {
    // if return ~= inflation, required corpus is N * expense at retirement
    return expenseAtRetirement * yearsInRetirement;
  }

  // Present value of increasing annuity (growth = g, discount = r) at retirement
  // PV = expenseAtRetirement * (1 - ((1+g)/(1+r))^{yearsInRetirement}) / (r - g)
  const denom = r - g;
  if (Math.abs(denom) < 1e-9) {
    return expenseAtRetirement * yearsInRetirement;
  }
  const factor = 1 - Math.pow((1 + g) / (1 + r), yearsInRetirement);
  const pv = expenseAtRetirement * (factor / denom);
  return pv;
}

function computeProjection({ currentAge, retirementAge, lifeExpectancy, existingCorpus, monthlySavings, expectedReturn, inflation }) {
  const values = [];
  const r = expectedReturn / 100;
  const g = inflation / 100;
  const startAge = currentAge;
  const endAge = lifeExpectancy;
  const yearsToRetire = Math.max(0, retirementAge - currentAge);
  const yearsTotal = Math.max(0, endAge - startAge);

  let corpus = Number(existingCorpus || 0);

  for (let y = 0; y <= yearsTotal; y++) {
    const age = startAge + y;
    // record before update so the chart shows starting corpus at current age
    values.push({ age, yearIndex: y, corpus: Math.max(-1e12, corpus) });

    if (age < retirementAge) {
      // accumulation: annualized monthly savings added at year-end for simplicity
      corpus = corpus * (1 + r) + monthlySavings * 12;
    } else {
      // withdrawal phase: apply growth, then we withdraw inflation-adjusted annual expense
      corpus = corpus * (1 + r);
      const yearsSinceRet = age - retirementAge;
      const annualExpense = monthlySavings /* placeholder */; // avoid lint
      // compute withdrawal: monthlyExpenses grows with inflation from today
      // BUT we need monthlyExpenses input; caller will provide via closure
    }
  }

  return values;
}

export default function RetirementCalculator() {
  // Required inputs from the user (as specified)
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [monthlyExpenses, setMonthlyExpenses] = useState(40000);
  const [existingCorpus, setExistingCorpus] = useState(2000000);

  // Additional sensible inputs
  const [monthlySavings, setMonthlySavings] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(8); // %
  const [inflation, setInflation] = useState(5); // %

  const yearsToRetire = Math.max(0, retirementAge - currentAge);
  const yearsInRetirement = Math.max(0, lifeExpectancy - retirementAge);

  // Required corpus at retirement
  const requiredCorpus = useMemo(() => computeRequiredCorpus({ monthlyExpenses, yearsToRetire, yearsInRetirement, expectedReturn, inflation }), [monthlyExpenses, yearsToRetire, yearsInRetirement, expectedReturn, inflation]);

  // Projected corpus at retirement considering existing corpus growth and yearly savings
  const projectedAtRetirement = useMemo(() => {
    const r = expectedReturn / 100;
    let corpus = Number(existingCorpus || 0);
    for (let y = 0; y < yearsToRetire; y++) {
      corpus = corpus * (1 + r) + monthlySavings * 12;
    }
    return corpus;
  }, [existingCorpus, monthlySavings, expectedReturn, yearsToRetire]);

  const wealthGap = projectedAtRetirement - requiredCorpus; // positive = surplus
  const onTrack = wealthGap >= 0;

  // Shortfall amount (positive means shortfall)
  const shortfallAmount = Math.max(0, requiredCorpus - projectedAtRetirement);

  // Estimate extra monthly savings needed using binary search
  const estimateExtraMonthly = (target, params) => {
    const { existingCorpus, monthlySavings, expectedReturn, yearsToRetire } = params;
    const r = expectedReturn / 100;
    const projectWith = (extraMonthly) => {
      let corpus = Number(existingCorpus || 0);
      for (let y = 0; y < yearsToRetire; y++) {
        corpus = corpus * (1 + r) + (monthlySavings + extraMonthly) * 12;
      }
      return corpus;
    };

    if (projectWith(0) >= target) return 0;
    // binary search
    let lo = 0;
    let hi = Math.max(10000, Math.ceil((target - projectWith(0)) / Math.max(1, yearsToRetire * 12)) * 2);
    // expand hi until it's enough
    while (projectWith(hi) < target && hi < 5_000_000) hi *= 2;
    for (let i = 0; i < 60; i++) {
      const mid = (lo + hi) / 2;
      if (projectWith(mid) >= target) hi = mid; else lo = mid;
    }
    return Math.ceil(hi);
  };

  const extraMonthlyNeeded = useMemo(() => {
    if (shortfallAmount <= 0) return 0;
    return estimateExtraMonthly(requiredCorpus, { existingCorpus, monthlySavings, expectedReturn, yearsToRetire });
  }, [shortfallAmount, requiredCorpus, existingCorpus, monthlySavings, expectedReturn, yearsToRetire]);

  // Generate yearly projection for chart: accumulation then withdrawal
  const projection = useMemo(() => {
    const r = expectedReturn / 100;
    const g = inflation / 100;
    const startAge = currentAge;
    const endAge = lifeExpectancy;
    const years = endAge - startAge;
    const arr = [];
    let corpus = Number(existingCorpus || 0);

    for (let i = 0; i <= years; i++) {
      const age = startAge + i;
      arr.push({ age, corpus });

      if (age < retirementAge) {
        // accumulation: corpus grows and we add annual savings
        corpus = corpus * (1 + r) + monthlySavings * 12;
      } else {
        // withdrawal phase: corpus grows, then we withdraw inflation-adjusted expense
        corpus = corpus * (1 + r);
        const yearsSinceRet = age - retirementAge;
        const annualExpenseToday = monthlyExpenses * 12;
        const withdrawal = annualExpenseToday * Math.pow(1 + g, yearsToRetire + yearsSinceRet);
        corpus = corpus - withdrawal;
      }
    }

    return arr;
  }, [currentAge, lifeExpectancy, retirementAge, existingCorpus, monthlySavings, expectedReturn, inflation]);

  // Chart interactions
  const chartRef = useRef(null);
  const [hover, setHover] = useState({ idx: null, x: 0, y: 0 });

  const Chart = ({ data }) => {
    const ref = chartRef;
    const [size, setSize] = useState({ w: 700, h: 300 });

    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const ro = new ResizeObserver(() => {
        setSize({ w: el.clientWidth || 700, h: 300 });
      });
      ro.observe(el);
      setSize({ w: el.clientWidth || 700, h: 300 });
      return () => ro.disconnect();
    }, [ref]);

    const padding = 40;
    const width = Math.max(300, size.w);
    const height = size.h;
    const points = data.length;
    const values = data.map((d) => d.corpus);
    const maxVal = Math.max(...values, 1);
    const minVal = Math.min(...values, 0);
    const chartW = width - padding * 2;

    const xFor = (i) => padding + (chartW * i) / Math.max(1, points - 1);
    const yFor = (v) => {
      // map minVal..maxVal to bottom..top
      const range = maxVal - minVal || 1;
      return height - padding - ((height - padding * 2) * (v - minVal)) / range;
    };

    const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i)} ${yFor(d.corpus)}`).join(' ');
    const areaPath = `${data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i)} ${yFor(d.corpus)}`).join(' ')} L ${xFor(points - 1)} ${height - padding} L ${xFor(0)} ${height - padding} Z`;

    const onMove = (e) => {
      const bounds = ref.current.getBoundingClientRect();
      const x = e.clientX - bounds.left - padding;
      const idx = Math.round((x / chartW) * (points - 1));
      const clamped = Math.max(0, Math.min(points - 1, idx));
      const cx = xFor(clamped);
      const cy = yFor(data[clamped].corpus);
      setHover({ idx: clamped, x: cx, y: cy });
    };

    return (
      <div ref={ref} className="w-full h-[300px] relative" onMouseMove={onMove} onMouseLeave={() => setHover({ idx: null, x: 0, y: 0 })}>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          <defs>
            <linearGradient id="gradArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="gradDanger" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width={width} height={height} fill="transparent" />
          <g>
            <path d={areaPath} fill="url(#gradArea)" stroke="none" />
            <path d={linePath} fill="none" stroke="#10b981" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
          </g>
          {/* Target line for required corpus */}
          {typeof window !== 'undefined' && (() => {
            // compute Y for required corpus (if in scope)
            return null;
          })()}
        </svg>

        {hover.idx !== null && (
          <div>
            <div className="absolute -translate-x-1/2" style={{ left: hover.x }}>
              <div className="w-0.5 h-28 bg-white/30 mx-auto" style={{ transform: 'translateY(-8px)' }} />
            </div>

            <div className="absolute bg-[#0b101b] text-gray-100 rounded-lg p-2 text-xs shadow-lg" style={{ left: hover.x + 8, top: hover.y - 60, minWidth: 160 }}>
              <div className="font-semibold">Age {data[hover.idx].age}</div>
              <div className="mt-1 text-sm">Corpus: {formatCurrency(data[hover.idx].corpus)}</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render Chart with target line and danger shading by wrapping Chart and augmenting SVG via a small wrapper
  const ChartWithTarget = ({ data, target }) => {
    // reuse chart Ref logic by directly recreating similar rendering here to inject overlays
    const ref = chartRef;
    const [size, setSize] = useState({ w: 700, h: 300 });

    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const ro = new ResizeObserver(() => {
        setSize({ w: el.clientWidth || 700, h: 300 });
      });
      ro.observe(el);
      setSize({ w: el.clientWidth || 700, h: 300 });
      return () => ro.disconnect();
    }, [ref]);

    const padding = 40;
    const width = Math.max(300, size.w);
    const height = size.h;
    const points = data.length;
    const values = data.map((d) => d.corpus);
    const maxVal = Math.max(...values, 1, target);
    const minVal = Math.min(...values, 0);
    const chartW = width - padding * 2;

    const xFor = (i) => padding + (chartW * i) / Math.max(1, points - 1);
    const yFor = (v) => {
      const range = maxVal - minVal || 1;
      return height - padding - ((height - padding * 2) * (v - minVal)) / range;
    };

    const pts = data.map((d, i) => ({ x: xFor(i), y: yFor(d.corpus) }));
    const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaPath = `${pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')} L ${xFor(points - 1)} ${height - padding} L ${xFor(0)} ${height - padding} Z`;

    // find first index where corpus <= 0
    const firstBelowZero = data.findIndex((d) => d.corpus <= 0);
    const retirementIndex = Math.max(0, data.findIndex((d) => d.age >= retirementAge));

    const yTarget = yFor(target);

    // x-axis ticks every 5 years for readability
    const ages = data.map((d) => d.age);
    const firstAge = ages[0];
    const lastAge = ages[ages.length - 1];
    const tickStep = 5;
    const ticks = [];
    for (let a = Math.ceil(firstAge / tickStep) * tickStep; a <= lastAge; a += tickStep) ticks.push(a);

    return (
      <div ref={ref} className="w-full h-[320px] relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          <defs>
            <linearGradient id="gradArea2" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.28" />
              <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="gradDanger2" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#fb7185" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#fb7185" stopOpacity="0.02" />
            </linearGradient>
            <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#000" floodOpacity="0.35" />
            </filter>
            <filter id="dangerGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* background grid */}
          <g className="opacity-20">
            {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
              <line key={i} x1={padding} x2={width - padding} y1={padding + (height - padding * 2) * t} y2={padding + (height - padding * 2) * t} stroke="#374151" strokeWidth={1} />
            ))}
          </g>

          {/* danger shading below zero */}
          {firstBelowZero >= 0 && (
            (() => {
              const xStart = xFor(firstBelowZero);
              const xEnd = xFor(points - 1);
              const yZero = yFor(0);
              const d = `M ${xStart} ${yZero} L ${xStart} ${height - padding} L ${xEnd} ${height - padding} L ${xEnd} ${yZero} Z`;
              // draw a thin outline with a soft glow instead of a heavy fill
              return (
                <g>
                  <path d={d} fill="none" stroke="#fb7185" strokeWidth={2} strokeOpacity={0.85} filter="url(#dangerGlow)" />
                  <path d={d} fill="none" stroke="#fb7185" strokeWidth={1} strokeOpacity={0.55} />
                </g>
              );
            })()
          )}

          {/* area and line */}
          <g filter="url(#softShadow)">
            <path d={areaPath} fill="url(#gradArea2)" stroke="none" />
            <path d={linePath} fill="none" stroke="#06b6d4" strokeWidth={3.5} strokeLinejoin="round" strokeLinecap="round" />
          </g>

          {/* target dashed line with label */}
          <g>
            <line x1={padding} x2={width - padding} y1={yTarget} y2={yTarget} stroke="#f59e0b" strokeWidth={2} strokeDasharray="8 6" />
            <rect x={width - padding - 160} y={yTarget - 22} width={150} height={20} rx={6} fill="#f59e0b" opacity={0.12} />
            <text x={width - padding - 148} y={yTarget - 8} fill="#f59e0b" fontSize="12" fontWeight="600">Target: {formatCurrency(target)}</text>
          </g>

          {/* retirement vertical marker */}
          {retirementIndex >= 0 && (
            <g>
              <line x1={xFor(retirementIndex)} x2={xFor(retirementIndex)} y1={padding} y2={height - padding} stroke="#94a3b8" strokeWidth={1} strokeDasharray="4 6" />
              <circle cx={xFor(retirementIndex)} cy={yFor(data[retirementIndex].corpus)} r={4} fill="#fff" stroke="#06b6d4" strokeWidth={2} />
              <text x={xFor(retirementIndex) + 6} y={padding + 14} fill="#cbd5e1" fontSize="11">Retirement</text>
            </g>
          )}

          {/* x-axis ticks */}
          <g>
            {ticks.map((age, i) => {
              const idx = data.findIndex((d) => d.age >= age);
              if (idx < 0) return null;
              return (
                <g key={age}>
                  <line x1={xFor(idx)} x2={xFor(idx)} y1={height - padding} y2={height - padding + 6} stroke="#475569" strokeWidth={1} />
                  <text x={xFor(idx)} y={height - padding + 20} fill="#94a3b8" fontSize="11" textAnchor="middle">{age}</text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* hover overlay reused from Chart */}
        {hover.idx !== null && hover.idx < data.length && (
          <div>
            <div className="absolute -translate-x-1/2" style={{ left: xFor(hover.idx) }}>
              <div className="w-0.5 h-28 bg-white/30 mx-auto" style={{ transform: 'translateY(-8px)' }} />
            </div>

            <div className="absolute bg-gradient-to-br from-slate-900/80 to-slate-800/70 text-gray-100 rounded-lg p-3 text-sm shadow-2xl" style={{ left: xFor(hover.idx) + 12, top: yFor(data[hover.idx].corpus) - 72, minWidth: 180 }}>
              <div className="font-semibold">Age {data[hover.idx].age}</div>
              <div className="mt-1">Corpus: <span className="font-medium">{formatCurrency(data[hover.idx].corpus)}</span></div>
              <div className="text-xs text-gray-400 mt-1">Projected</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-2">Retirement Gap Analyzer</h2>
      <p className="text-gray-400 mb-6">Estimate if you're on track for retirement and visualize your wealth gap.</p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Grouped Inputs (two cards) */}
        <div className="md:w-2/5 w-full flex flex-col gap-4">
          <div className="glass-card p-5 rounded-2xl">
            <h3 className="text-lg font-semibold text-white">Personal Profile</h3>
            <p className="text-sm text-gray-400">Basic life-stage inputs</p>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm text-gray-300">Current Age</label>
                <div className="flex items-center gap-3 mt-2">
                  <input type="range" min="18" max="70" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full h-2 rounded-lg" />
                  <input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value || 0))} className="w-20 p-2 rounded-md bg-white/5 text-white text-sm" />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300">Retirement Age</label>
                <div className="flex items-center gap-3 mt-2">
                  <input type="range" min="40" max="75" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} className="w-full h-2 rounded-lg" />
                  <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value || 0))} className="w-20 p-2 rounded-md bg-white/5 text-white text-sm" />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300">Life Expectancy</label>
                <div className="flex items-center gap-3 mt-2">
                  <input type="range" min="70" max="100" value={lifeExpectancy} onChange={(e) => setLifeExpectancy(Number(e.target.value))} className="w-full h-2 rounded-lg" />
                  <input type="number" value={lifeExpectancy} onChange={(e) => setLifeExpectancy(Number(e.target.value || 0))} className="w-20 p-2 rounded-md bg-white/5 text-white text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl">
            <h3 className="text-lg font-semibold text-white">Financial Details</h3>
            <p className="text-sm text-gray-400">Your current expenses, corpus and savings</p>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm text-gray-300">Current Monthly Expenses</label>
                <div className="flex items-center gap-3 mt-2">
                  <input type="range" min="5000" max="500000" step="500" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))} className="w-full h-2 rounded-lg" />
                  <input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value || 0))} className="w-32 p-2 rounded-md bg-white/5 text-white text-sm" />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300">Existing Corpus</label>
                <div className="flex items-center gap-3 mt-2">
                  <input type="range" min="0" max="20000000" step="50000" value={existingCorpus} onChange={(e) => setExistingCorpus(Number(e.target.value))} className="w-full h-2 rounded-lg" />
                  <input type="number" value={existingCorpus} onChange={(e) => setExistingCorpus(Number(e.target.value || 0))} className="w-32 p-2 rounded-md bg-white/5 text-white text-sm" />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300">Monthly Savings (you add)</label>
                <div className="flex items-center gap-3 mt-2">
                  <input type="range" min="0" max="200000" step="500" value={monthlySavings} onChange={(e) => setMonthlySavings(Number(e.target.value))} className="w-full h-2 rounded-lg" />
                  <input type="number" value={monthlySavings} onChange={(e) => setMonthlySavings(Number(e.target.value || 0))} className="w-28 p-2 rounded-md bg-white/5 text-white text-sm" />
                </div>
              </div>
            </div>

            <AdvancedSettings expectedReturn={expectedReturn} setExpectedReturn={setExpectedReturn} inflation={inflation} setInflation={setInflation} />
          </div>
        </div>

        {/* Right: Results & Chart */}
        <div className="md:w-3/5 w-full flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <div className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${onTrack ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
                {onTrack ? 'On Track' : 'At Risk'}
              </div>
              <div className="mt-3 text-sm text-gray-300">Projected corpus at retirement</div>
              <div className="text-2xl md:text-3xl font-extrabold text-white">{formatCurrency(projectedAtRetirement)}</div>
            </div>

            <div className="w-full sm:w-1/2 bg-gradient-to-br from-slate-900/40 to-slate-800/30 rounded-2xl p-4">
              {shortfallAmount > 0 ? (
                <div className="bg-rose-600/10 border border-rose-600/20 rounded-lg p-3 mb-3">
                  <div className="text-sm font-semibold text-rose-300">Action Required</div>
                  <div className="text-sm text-gray-200 mt-1">You need to save an extra <span className="font-bold text-rose-100">{formatCurrency(extraMonthlyNeeded)}</span>/month to reach your goal.</div>
                </div>
              ) : (
                <div className="bg-emerald-600/10 border border-emerald-600/20 rounded-lg p-3 mb-3">
                  <div className="text-sm font-semibold text-emerald-300">Good Progress</div>
                  <div className="text-sm text-gray-200 mt-1">You're on track for retirement.</div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-gray-400">Required Corpus</div>
                  <div className="text-lg font-semibold text-white">{formatCurrency(requiredCorpus)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Projected Corpus</div>
                  <div className="text-lg font-semibold text-white">{formatCurrency(projectedAtRetirement)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-teal-400" /> <span className="text-sm text-gray-200">Corpus</span></div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-rose-400" /> <span className="text-sm text-gray-200">Danger Zone</span></div>
              </div>
              <div className="text-xs text-gray-400">Accumulation → Withdrawal</div>
            </div>

            <ChartWithTarget data={projection} target={requiredCorpus} />
          </div>
        </div>
      </div>
    </div>
  );
}
