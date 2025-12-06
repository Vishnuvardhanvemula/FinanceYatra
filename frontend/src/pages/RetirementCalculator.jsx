import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, TrendingUp, AlertTriangle, CheckCircle, Settings, ChevronDown, ChevronUp, DollarSign, Calendar, HelpCircle } from 'lucide-react';
import { useCalculatorTour } from '../hooks/useCalculatorTour';
import DemoDataButton from '../components/DemoDataButton';

function formatCurrency(v) {
  if (!isFinite(v)) return '₹0';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);
}

function computeRequiredCorpus({ monthlyExpenses, yearsToRetire, yearsInRetirement, expectedReturn, inflation }) {
  const annualExpenseToday = monthlyExpenses * 12;
  const expenseAtRetirement = annualExpenseToday * Math.pow(1 + inflation / 100, yearsToRetire);
  const r = expectedReturn / 100;
  const g = inflation / 100;
  const realReturn = (1 + r) / (1 + g) - 1;

  if (Math.abs(realReturn) < 1e-6) return expenseAtRetirement * yearsInRetirement;

  const denom = r - g;
  if (Math.abs(denom) < 1e-9) return expenseAtRetirement * yearsInRetirement;

  const factor = 1 - Math.pow((1 + g) / (1 + r), yearsInRetirement);
  return expenseAtRetirement * (factor / denom);
}

// Chart Component
const Chart = ({ data, target }) => {
  const chartRef = useRef(null);
  const [hover, setHover] = useState({ idx: null, x: 0, y: 0 });
  const [size, setSize] = useState({ w: 0, h: 300 });

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: 300 }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const padding = 40;
  const width = Math.max(300, size.w);
  const height = size.h;
  const points = data.length;
  const values = data.map((d) => d.corpus);
  const maxVal = Math.max(...values, target * 1.1, 1);
  const minVal = Math.min(...values, 0);
  const chartW = width - padding * 2;

  const xFor = (i) => padding + (chartW * i) / Math.max(1, points - 1);
  const yFor = (v) => {
    const range = maxVal - minVal || 1;
    return height - padding - ((height - padding * 2) * (v - minVal)) / range;
  };

  const pts = data.map((d, i) => ({ x: xFor(i), y: yFor(d.corpus) }));
  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${xFor(points - 1)} ${height - padding} L ${xFor(0)} ${height - padding} Z`;
  const targetY = yFor(target);

  const onMove = (e) => {
    const bounds = chartRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left - padding;
    const idx = Math.round((x / chartW) * (points - 1));
    const clamped = Math.max(0, Math.min(points - 1, idx));
    setHover({ idx: clamped, x: xFor(clamped), y: yFor(data[clamped].corpus) });
  };

  return (
    <div ref={chartRef} className="w-full h-[300px] relative cursor-crosshair" onMouseMove={onMove} onMouseLeave={() => setHover({ idx: null, x: 0, y: 0 })}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="gradRetire" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
          <line key={i} x1={padding} x2={width - padding} y1={padding + (height - padding * 2) * t} y2={padding + (height - padding * 2) * t} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
        ))}

        {/* Target Line */}
        <line x1={padding} x2={width - padding} y1={targetY} y2={targetY} stroke="#ef4444" strokeWidth={2} strokeDasharray="4 4" opacity={0.6} />
        <text x={width - padding} y={targetY - 8} fill="#ef4444" fontSize="12" textAnchor="end" opacity={0.8}>Required: {formatCurrency(target)}</text>

        {/* Paths */}
        <path d={areaPath} fill="url(#gradRetire)" />
        <path d={linePath} fill="none" stroke="#10b981" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />

        {/* Hover */}
        {hover.idx !== null && (
          <g>
            <line x1={hover.x} x2={hover.x} y1={padding} y2={height - padding} stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" />
            <circle cx={hover.x} cy={hover.y} r={6} fill="#0b101b" stroke="#10b981" strokeWidth={2} />
          </g>
        )}
      </svg>

      {/* Tooltip */}
      {hover.idx !== null && (
        <div
          className="absolute z-10 bg-[#0b101b]/90 backdrop-blur-xl border border-white/10 p-3 rounded-xl shadow-2xl pointer-events-none min-w-[140px]"
          style={{ left: hover.x, top: hover.y - 20, transform: 'translate(-50%, -100%)' }}
        >
          <div className="text-xs font-medium text-gray-400 mb-1">Age {data[hover.idx].age}</div>
          <div className="text-sm font-bold text-white">{formatCurrency(data[hover.idx].corpus)}</div>
        </div>
      )}
    </div>
  );
};

const InputGroup = ({ title, icon: Icon, children }) => (
  <div className="bg-[#0b101b]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
      {Icon && <Icon className="w-5 h-5 text-teal-400" />}
      {title}
    </h3>
    <div className="space-y-6">{children}</div>
  </div>
);

const SliderField = ({ label, value, onChange, min, max, step = 1, prefix = '', suffix = '' }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 flex items-center min-w-[80px]">
        <span className="text-gray-400 text-sm mr-1">{prefix}</span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="bg-transparent text-white text-right w-full focus:outline-none font-medium text-sm"
        />
        <span className="text-gray-400 text-sm ml-1">{suffix}</span>
      </div>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal-500"
    />
  </div>
);


export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [existingCorpus, setExistingCorpus] = useState(1000000);
  const [monthlySavings, setMonthlySavings] = useState(20000);
  const [expectedReturn, setExpectedReturn] = useState(10);
  const [inflation, setInflation] = useState(6);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { restartTour } = useCalculatorTour('retire_tour_v1', [
    {
      element: '#retire-inputs',
      popover: { title: 'Your Profile', description: 'Enter your age, expenses, and savings details here.', side: 'right' }
    },
    {
      element: '#retire-status',
      popover: { title: 'Projected Status', description: 'Instantly see if you are "On Track" or "At Risk".', side: 'left' }
    },
    {
      element: '#retire-chart',
      popover: { title: 'The Gap', description: 'Visualize the difference between your projected corpus and what you actually need.', side: 'top' }
    }
  ]);

  const onFillDemoData = () => {
    setCurrentAge(30);
    setRetirementAge(55); // Retire early!
    setLifeExpectancy(90);
    setMonthlyExpenses(75000);
    setExistingCorpus(500000);
    setMonthlySavings(35000);
    setExpectedReturn(12);
  };

  const yearsToRetire = Math.max(0, retirementAge - currentAge);
  const yearsInRetirement = Math.max(0, lifeExpectancy - retirementAge);

  const requiredCorpus = useMemo(() => computeRequiredCorpus({ monthlyExpenses, yearsToRetire, yearsInRetirement, expectedReturn, inflation }), [monthlyExpenses, yearsToRetire, yearsInRetirement, expectedReturn, inflation]);

  const projectedAtRetirement = useMemo(() => {
    const r = expectedReturn / 100;
    let corpus = Number(existingCorpus || 0);
    for (let y = 0; y < yearsToRetire; y++) {
      corpus = corpus * (1 + r) + monthlySavings * 12;
    }
    return corpus;
  }, [existingCorpus, monthlySavings, expectedReturn, yearsToRetire]);

  const wealthGap = projectedAtRetirement - requiredCorpus;
  const onTrack = wealthGap >= 0;
  const shortfallAmount = Math.max(0, requiredCorpus - projectedAtRetirement);

  const projection = useMemo(() => {
    const r = expectedReturn / 100;
    const g = inflation / 100;
    const arr = [];
    let corpus = Number(existingCorpus || 0);

    for (let i = 0; i <= (lifeExpectancy - currentAge); i++) {
      const age = currentAge + i;
      arr.push({ age, corpus });

      if (age < retirementAge) {
        corpus = corpus * (1 + r) + monthlySavings * 12;
      } else {
        corpus = corpus * (1 + r);
        const yearsSinceRet = age - retirementAge;
        const annualExpenseToday = monthlyExpenses * 12;
        const withdrawal = annualExpenseToday * Math.pow(1 + g, yearsToRetire + yearsSinceRet);
        corpus = corpus - withdrawal;
      }
    }
    return arr;
  }, [currentAge, lifeExpectancy, retirementAge, existingCorpus, monthlySavings, expectedReturn, inflation]);

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
            Retirement Planner
          </h1>
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg text-gray-400 max-w-2xl mx-auto flex items-center justify-center gap-2">
              Analyze the gap between your corpus and retirement goals.
              <button onClick={restartTour} className="text-teal-400 hover:text-teal-300 transition-colors" title="Replay Tour">
                <HelpCircle className="w-4 h-4" />
              </button>
            </p>
            <DemoDataButton onFill={onFillDemoData} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-4 space-y-6" id="retire-inputs">
            <InputGroup title="Life Stage" icon={User}>
              <SliderField label="Current Age" value={currentAge} onChange={setCurrentAge} min={18} max={70} suffix="Yr" />
              <SliderField label="Retirement Age" value={retirementAge} onChange={setRetirementAge} min={40} max={75} suffix="Yr" />
              <SliderField label="Life Expectancy" value={lifeExpectancy} onChange={setLifeExpectancy} min={70} max={100} suffix="Yr" />
            </InputGroup>

            <InputGroup title="Financials" icon={Briefcase}>
              <SliderField label="Monthly Expense" value={monthlyExpenses} onChange={setMonthlyExpenses} min={5000} max={500000} step={500} prefix="₹" />
              <SliderField label="Existing Corpus" value={existingCorpus} onChange={setExistingCorpus} min={0} max={50000000} step={100000} prefix="₹" />
              <SliderField label="Monthly Savings" value={monthlySavings} onChange={setMonthlySavings} min={0} max={500000} step={500} prefix="₹" />

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300 transition-colors w-full justify-center"
                >
                  <Settings className="w-4 h-4" />
                  {showAdvanced ? 'Hide Advanced' : 'Advanced Settings'}
                  {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 space-y-4">
                        <SliderField label="Expected Return" value={expectedReturn} onChange={setExpectedReturn} min={5} max={20} step={0.5} suffix="%" />
                        <SliderField label="Inflation Rate" value={inflation} onChange={setInflation} min={2} max={12} step={0.5} suffix="%" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </InputGroup>
          </div>

          {/* Right Column: Visualization */}
          <div className="lg:col-span-8 space-y-6">
            {/* Status Card */}
            <div id="retire-status" className={`rounded-3xl p-8 border ${onTrack ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'} relative overflow-hidden`}>
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    {onTrack ? (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium border border-emerald-500/20">
                        <CheckCircle className="w-4 h-4" /> On Track
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-sm font-medium border border-rose-500/20">
                        <AlertTriangle className="w-4 h-4" /> At Risk
                      </div>
                    )}
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-1">
                    {formatCurrency(projectedAtRetirement)}
                  </h2>
                  <p className="text-gray-400 text-sm">Projected corpus at age {retirementAge}</p>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-400 mb-1">Required Corpus</div>
                  <div className="text-xl font-semibold text-white">{formatCurrency(requiredCorpus)}</div>
                  {!onTrack && (
                    <div className="text-sm text-rose-400 mt-1">Shortfall: {formatCurrency(shortfallAmount)}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-[#0b101b]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl" id="retire-chart">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Wealth Projection</h3>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${onTrack ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <span className="text-gray-300">Corpus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-t-2 border-rose-500 border-dashed w-6" />
                    <span className="text-gray-300">Required</span>
                  </div>
                </div>
              </div>
              <Chart data={projection} target={requiredCorpus} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
