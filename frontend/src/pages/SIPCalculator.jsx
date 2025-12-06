import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Calendar, Percent, RefreshCw, ArrowUpRight, Info, HelpCircle } from 'lucide-react';
import { useCalculatorTour } from '../hooks/useCalculatorTour';
import DemoDataButton from '../components/DemoDataButton';

function formatCurrency(v) {
  if (!isFinite(v)) return '₹0';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);
}

function computeSIPSeries(monthly, annualRate, years) {
  const r = annualRate / 100 / 12; // monthly rate
  const months = Math.round(years * 12);
  const series = [];
  let value = 0;
  for (let m = 1; m <= months; m++) {
    value = value * (1 + r) + monthly;
    if (m % 12 === 0) {
      series.push({ month: m, value });
    }
  }
  if (series.length === 0 && months > 0) series.push({ month: months, value });
  return series;
}

// Chart Component
const Chart = ({ nominal, real }) => {
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
  const points = nominal.length;
  const dataMax = Math.max(...nominal.map((d) => d.value), 1);
  const chartW = width - padding * 2;

  const xFor = (i) => padding + (chartW * i) / Math.max(1, points - 1);
  const yFor = (v) => height - padding - ((height - padding * 2) * v) / dataMax;

  const nominalPath = nominal.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i)} ${yFor(d.value)}`).join(' ');
  const realPath = real.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i)} ${yFor(d.value)}`).join(' ');

  // Area fill for nominal
  const areaPath = `${nominalPath} L ${xFor(points - 1)} ${height - padding} L ${xFor(0)} ${height - padding} Z`;

  const onMove = (e) => {
    const bounds = chartRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left - padding;
    const idx = Math.round((x / chartW) * (points - 1));
    const clamped = Math.max(0, Math.min(points - 1, idx));
    setHover({ idx: clamped, x: xFor(clamped), y: yFor(nominal[clamped].value) });
  };

  return (
    <div ref={chartRef} className="w-full h-[300px] relative cursor-crosshair" onMouseMove={onMove} onMouseLeave={() => setHover({ idx: null, x: 0, y: 0 })}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="gradTeal" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
          <line
            key={i}
            x1={padding}
            x2={width - padding}
            y1={padding + (height - padding * 2) * t}
            y2={padding + (height - padding * 2) * t}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={1}
          />
        ))}

        {/* Paths */}
        <path d={areaPath} fill="url(#gradTeal)" />
        <path d={nominalPath} fill="none" stroke="#2dd4bf" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        <path d={realPath} fill="none" stroke="#fbbf24" strokeWidth={2} strokeDasharray="4 4" strokeOpacity={0.8} />

        {/* Hover */}
        {hover.idx !== null && (
          <g>
            <line x1={hover.x} x2={hover.x} y1={padding} y2={height - padding} stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" />
            <circle cx={hover.x} cy={hover.y} r={6} fill="#0b101b" stroke="#2dd4bf" strokeWidth={2} />
          </g>
        )}
      </svg>

      {/* Tooltip */}
      {hover.idx !== null && (
        <div
          className="absolute z-10 bg-[#0b101b]/90 backdrop-blur-xl border border-white/10 p-3 rounded-xl shadow-2xl pointer-events-none min-w-[180px]"
          style={{
            left: hover.x,
            top: hover.y - 20,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="text-xs font-medium text-gray-400 mb-2">Year {Math.round(nominal[hover.idx].month / 12)}</div>
          <div className="space-y-1">
            <div className="flex justify-between gap-4">
              <span className="text-xs text-teal-400">Projected</span>
              <span className="text-sm font-bold text-white">{formatCurrency(nominal[hover.idx].value)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-xs text-amber-400">Real Value</span>
              <span className="text-sm font-medium text-gray-300">{formatCurrency(real[hover.idx].value)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SliderInput = ({ label, value, onChange, min, max, step = 1, prefix = '', suffix = '', icon: Icon }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-teal-400" />}
        {label}
      </label>
      <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 flex items-center min-w-[100px]">
        <span className="text-gray-400 text-sm mr-1">{prefix}</span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="bg-transparent text-white text-right w-full focus:outline-none font-medium"
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


export default function SIPCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [inflation, setInflation] = useState(6);

  // Tour Configuration
  const { restartTour } = useCalculatorTour('sip_tour_v1', [
    {
      element: '#sip-controls',
      popover: {
        title: 'Adjust Your Inputs',
        description: 'Set your monthly investment, expected return, and time horizon here.',
        side: 'right',
        align: 'start'
      }
    },
    {
      element: '#sip-summary',
      popover: {
        title: 'Quick Summary',
        description: 'See your total investment vs wealth gained at a glance.',
        side: 'top'
      }
    },
    {
      element: '#sip-chart',
      popover: {
        title: 'Visual Projection',
        description: 'This graph shows your projected growth. The dotted line represents "Real Value" adjusted for inflation.',
        side: 'left',
        align: 'center'
      }
    }
  ]);

  const onFillDemoData = () => {
    setMonthly(25000);
    setRate(15);
    setYears(20);
    setInflation(7);
  };

  const series = useMemo(() => computeSIPSeries(monthly, rate, years), [monthly, rate, years]);
  const realSeries = useMemo(() => series.map((p) => ({ month: p.month, value: p.value / Math.pow(1 + inflation / 100, p.month / 12) })), [series, inflation]);

  const finalNominal = series.length ? series[series.length - 1].value : 0;
  const finalReal = finalNominal / Math.pow(1 + inflation / 100, years);
  const totalInvested = monthly * years * 12;
  const wealthGained = finalNominal - totalInvested;

  const reset = () => {
    setMonthly(5000);
    setRate(12);
    setYears(10);
    setInflation(6);
  };

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
            SIP Calculator
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto flex items-center justify-center gap-2">
            Visualize wealth creation with inflation-adjusted returns.
            <button onClick={restartTour} className="text-teal-400 hover:text-teal-300 transition-colors" title="Replay Tour">
              <HelpCircle className="w-4 h-4" />
            </button>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Controls */}
          <div className="lg:col-span-4 space-y-6" id="sip-controls">
            <div className="bg-[#0b101b]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8 flex-wrap gap-2">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-teal-400" />
                  Parameters
                </h2>
                <div className="flex items-center gap-2">
                  <DemoDataButton onFill={onFillDemoData} />
                  <button
                    onClick={reset}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-8">
                <SliderInput
                  label="Monthly Investment"
                  value={monthly}
                  onChange={setMonthly}
                  min={500}
                  max={200000}
                  step={500}
                  prefix="₹"
                  icon={DollarSign}
                />
                <SliderInput
                  label="Expected Return (p.a)"
                  value={rate}
                  onChange={setRate}
                  min={1}
                  max={30}
                  step={0.5}
                  suffix="%"
                  icon={Percent}
                />
                <SliderInput
                  label="Time Period"
                  value={years}
                  onChange={setYears}
                  min={1}
                  max={40}
                  suffix="Yr"
                  icon={Calendar}
                />
                <div className="pt-4 border-t border-white/10">
                  <SliderInput
                    label="Inflation Rate"
                    value={inflation}
                    onChange={setInflation}
                    min={0}
                    max={15}
                    step={0.5}
                    suffix="%"
                    icon={ArrowUpRight}
                  />
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    Adjusts for purchasing power over time
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Visualization */}
          <div className="lg:col-span-8 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="sip-summary">
              <div className="bg-[#0b101b]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                <div className="text-sm text-gray-400 mb-1">Invested Amount</div>
                <div className="text-2xl font-bold text-white">{formatCurrency(totalInvested)}</div>
              </div>
              <div className="bg-[#0b101b]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                <div className="text-sm text-gray-400 mb-1">Wealth Gained</div>
                <div className="text-2xl font-bold text-teal-400">+{formatCurrency(wealthGained)}</div>
              </div>
              <div className="bg-gradient-to-br from-teal-500/20 to-blue-600/20 border border-teal-500/30 rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-teal-500/20 rounded-full blur-2xl -mr-10 -mt-10" />
                <div className="text-sm text-teal-200 mb-1">Projected Value</div>
                <div className="text-2xl font-bold text-white">{formatCurrency(finalNominal)}</div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-[#0b101b]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl" id="sip-chart">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Wealth Projection</h3>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-teal-400" />
                    <span className="text-gray-300">Projected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border border-amber-400 border-dashed" />
                    <span className="text-gray-300">Real Value</span>
                  </div>
                </div>
              </div>
              <Chart nominal={series} real={realSeries} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
