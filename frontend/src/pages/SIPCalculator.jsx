import React, { useMemo, useState, useRef, useEffect } from 'react';

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
      // push yearly points to reduce chart density
      series.push({ month: m, value });
    }
  }
  // ensure at least one point (month 12) for very small durations
  if (series.length === 0 && months > 0) series.push({ month: months, value });
  return series;
}

export default function SIPCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [inflation, setInflation] = useState(6);

  const series = useMemo(() => computeSIPSeries(monthly, rate, years), [monthly, rate, years]);
  const realSeries = useMemo(() => series.map((p) => ({ month: p.month, value: p.value / Math.pow(1 + inflation / 100, p.month / 12) })), [series, inflation]);

  const finalNominal = series.length ? series[series.length - 1].value : 0;
  const finalReal = finalNominal / Math.pow(1 + inflation / 100, years);

  // Slider background helper
  const sliderBg = (val, min, max) => {
    const pct = Math.round(((val - min) / (max - min || 1)) * 100);
    return { background: `linear-gradient(90deg, rgba(20,184,166,0.95) 0%, rgba(20,184,166,0.95) ${pct}%, rgba(55,65,81,0.25) ${pct}%)` };
  };

  // Chart tooltip state
  const chartRef = useRef(null);
  const [hover, setHover] = useState({ idx: null, x: 0, y: 0 });

  // Chart component (responsive width)
  const Chart = ({ nominal, real }) => {
    const ref = chartRef;
    const [size, setSize] = useState({ w: 700, h: 260 });

    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const ro = new ResizeObserver(() => {
        setSize({ w: el.clientWidth || 700, h: 260 });
      });
      ro.observe(el);
      setSize({ w: el.clientWidth || 700, h: 260 });
      return () => ro.disconnect();
    }, [ref]);

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

    const onMove = (e) => {
      const bounds = ref.current.getBoundingClientRect();
      const x = e.clientX - bounds.left - padding;
      const idx = Math.round((x / chartW) * (points - 1));
      const clamped = Math.max(0, Math.min(points - 1, idx));
      const cx = xFor(clamped);
      const cy = yFor(nominal[clamped].value);
      setHover({ idx: clamped, x: cx, y: cy });
    };

    const onLeave = () => setHover({ idx: null, x: 0, y: 0 });

    return (
      <div ref={ref} className="w-full h-[260px] relative" onMouseMove={onMove} onMouseLeave={onLeave}>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          <rect x="0" y="0" width={width} height={height} fill="transparent" />
          {/* grid lines */}
          <g className="opacity-25 text-gray-500">
            {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
              <line key={i} x1={padding} x2={width - padding} y1={padding + (height - padding * 2) * t} y2={padding + (height - padding * 2) * t} stroke="#374151" strokeWidth={1} />
            ))}
          </g>
          <g>
            <path d={nominalPath} fill="none" stroke="#10b981" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
            <path d={realPath} fill="none" stroke="#f59e0b" strokeWidth={3} strokeDasharray="6 6" strokeLinejoin="round" strokeLinecap="round" />
          </g>
        </svg>

        {/* Hover marker & tooltip */}
        {hover.idx !== null && (
          <div>
            <div className="absolute -translate-x-1/2" style={{ left: hover.x }}>
              <div className="w-0.5 h-28 bg-white/40 mx-auto" style={{ transform: 'translateY(-8px)' }} />
            </div>

            <div className="absolute bg-[#0b101b] text-gray-100 rounded-lg p-2 text-xs shadow-lg" style={{ left: hover.x + 8, top: hover.y - 60, minWidth: 160 }}>
              <div className="font-semibold">Year {Math.round(nominal[hover.idx].month / 12)}</div>
              <div className="flex items-center justify-between mt-1">
                <div className="text-xs text-gray-300">Nominal</div>
                <div className="text-sm font-medium text-teal-300">{formatCurrency(nominal[hover.idx].value)}</div>
              </div>
              <div className="flex items-center justify-between mt-1">
                <div className="text-xs text-gray-300">Real</div>
                <div className="text-sm font-medium text-amber-300">{formatCurrency(real[hover.idx].value)}</div>
              </div>
              <div className="mt-1 text-xs text-gray-400">Difference: {formatCurrency(nominal[hover.idx].value - real[hover.idx].value)}</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-2">SIP Calculator</h2>
      <p className="text-gray-400 mb-6">Visualize your SIP corpus and see inflation-adjusted purchasing power.</p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Control Panel (40%) */}
        <div className="md:w-2/5 w-full">
          <div className="glass-card p-6 rounded-2xl space-y-6">
            <h3 className="text-lg font-semibold text-white">Control Panel</h3>
            <p className="text-sm text-gray-300">Use sliders for quick changes, or enter exact values.</p>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-300">Monthly Investment</label>
                <div className="flex items-center gap-3 mt-2">
                  <input type="range" min="0" max="200000" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} style={sliderBg(monthly, 0, 200000)} className="w-full h-2 rounded-lg accent-teal-500" />
                  <input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value || 0))} className="w-28 p-2 rounded-md bg-white/5 text-white text-sm" />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300">Expected Return (annual %)</label>
                <div className="flex items-center gap-3 mt-2">
                  <input type="range" min="0" max="30" value={rate} onChange={(e) => setRate(Number(e.target.value))} style={sliderBg(rate, 0, 30)} className="w-full h-2 rounded-lg" />
                  <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value || 0))} className="w-20 p-2 rounded-md bg-white/5 text-white text-sm" />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300">Time Period (years)</label>
                <div className="flex items-center gap-3 mt-2">
                  <input type="range" min="1" max="40" value={years} onChange={(e) => setYears(Number(e.target.value))} style={sliderBg(years, 1, 40)} className="w-full h-2 rounded-lg" />
                  <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value || 0))} className="w-20 p-2 rounded-md bg-white/5 text-white text-sm" />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300">Inflation Rate (%)</label>
                <div className="flex items-center gap-3 mt-2">
                  <input type="range" min="0" max="15" value={inflation} onChange={(e) => setInflation(Number(e.target.value))} style={sliderBg(inflation, 0, 15)} className="w-full h-2 rounded-lg" />
                  <input type="number" value={inflation} onChange={(e) => setInflation(Number(e.target.value || 0))} className="w-20 p-2 rounded-md bg-white/5 text-white text-sm" />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5">
              <div className="text-sm text-gray-300">Summary</div>
              <div className="flex items-baseline gap-4 mt-2">
                <div>
                  <div className="text-xs text-gray-400">Monthly</div>
                  <div className="text-lg font-semibold text-white">{formatCurrency(monthly)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Return</div>
                  <div className="text-lg font-semibold text-white">{rate}%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Inflation</div>
                  <div className="text-lg font-semibold text-white">{inflation}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Visualization (60%) */}
        <div className="md:w-3/5 w-full flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex-1 bg-gradient-to-br from-emerald-600 to-teal-500 text-white rounded-2xl p-5 shadow-lg transform hover:scale-[1.01] transition">
              <div className="text-sm text-emerald-100">Projected Value</div>
              <div className="text-3xl md:text-4xl font-extrabold mt-2">{formatCurrency(finalNominal)}</div>
              <div className="text-sm text-emerald-100 mt-2">Estimated corpus at the end of {years} years</div>
            </div>

            <div className="flex-1 bg-gradient-to-br from-amber-500 to-orange-400 text-black rounded-2xl p-5 shadow-lg transform hover:scale-[1.01] transition">
              <div className="text-sm text-amber-900">Real Value</div>
              <div className="text-3xl md:text-4xl font-extrabold mt-2">{formatCurrency(finalReal)}</div>
              <div className="text-xs text-amber-800 mt-2">This is what your money will be worth in today's terms.</div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-teal-400" />
                  <span className="text-sm text-gray-200">Nominal</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full border-2 border-amber-400" />
                  <span className="text-sm text-gray-200">Inflation-adjusted</span>
                </div>
              </div>
              <div className="text-xs text-gray-400">Hover chart to see yearly values and differences</div>
            </div>

            <Chart nominal={series} real={realSeries} />
          </div>
        </div>
      </div>
    </div>
  );
}
