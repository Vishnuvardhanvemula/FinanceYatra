import React, { useMemo, useState } from 'react';

function rupee(n) { return '₹' + (Number(n) || 0).toLocaleString(); }

function SemiCircleGauge({ percent, markerPercent, zone = '#10b981' }) {
  // percent: 0-100 filled area; markerPercent: 0-100 position of the needle
  const r = 80;
  const cx = 100;
  const cy = 100;
  const startX = cx - r;
  const startY = cy;
  const endX = cx + r;
  const endY = cy;

  const dash = `${Math.PI * r}`;

  // animated marker percent (0-100)
  const [animated, setAnimated] = React.useState(markerPercent);
  const rafRef = React.useRef(null);
  const lastRef = React.useRef(markerPercent);

  React.useEffect(() => {
    const from = lastRef.current || 0;
    const to = markerPercent;
    const duration = 700;
    const start = performance.now();

    const ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic

    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const v = from + (to - from) * ease(t);
      setAnimated(v);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        lastRef.current = to;
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(step);

    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [markerPercent]);

  // animated fill percent so the arc animates smoothly to `percent`
  const [animatedFill, setAnimatedFill] = React.useState(percent);
  const fillRafRef = React.useRef(null);
  const fillLastRef = React.useRef(percent);

  React.useEffect(() => {
    const from = fillLastRef.current || 0;
    const to = percent;
    const duration = 700;
    const start = performance.now();

    const ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic

    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const v = from + (to - from) * ease(t);
      setAnimatedFill(v);
      if (t < 1) {
        fillRafRef.current = requestAnimationFrame(step);
      } else {
        fillLastRef.current = to;
      }
    };

    if (fillRafRef.current) cancelAnimationFrame(fillRafRef.current);
    fillRafRef.current = requestAnimationFrame(step);

    return () => { if (fillRafRef.current) cancelAnimationFrame(fillRafRef.current); };
  }, [percent]);

  // compute marker position from animated percent
  const theta = Math.PI * (animated / 100);
  const mx = cx + r * Math.cos(Math.PI - theta);
  const my = cy - r * Math.sin(Math.PI - theta);

  // determine zone color based on monthsLast
  // Note: zone is passed in as a prop now; do not reference external variables here

  return (
    <svg viewBox="0 0 200 120" width="100%" height="100%">
      <defs>
        <linearGradient id="g1" x1="0%" x2="100%">
          <stop offset="0%" stopColor="var(--fy-danger,#ef4444)" />
          <stop offset="50%" stopColor="var(--fy-warning,#f59e0b)" />
          <stop offset="100%" stopColor="var(--fy-gradient-start,#10b981)" />
        </linearGradient>
      </defs>

      <g transform="translate(0,10)">
        {/* background arc */}
        <path d={`M ${startX} ${startY} A ${r} ${r} 0 0 1 ${endX} ${endY}`} stroke="var(--fy-ring, rgba(255,255,255,0.06))" strokeWidth={14} fill="none" strokeLinecap="round" />
        {/* filled arc (animated) */}
        <path d={`M ${startX} ${startY} A ${r} ${r} 0 0 1 ${endX} ${endY}`} stroke="url(#g1)" strokeWidth={14} fill="none" strokeLinecap="round" strokeDasharray={`${dash}`} strokeDashoffset={`${dash * (1 - animatedFill / 100)}`} />
        {/* colored overlay arc (single color based on zone, animated) */}
        <path d={`M ${startX} ${startY} A ${r} ${r} 0 0 1 ${endX} ${endY}`} stroke={zone} strokeWidth={8} fill="none" strokeLinecap="round" strokeDasharray={`${dash}`} strokeDashoffset={`${dash * (1 - animatedFill / 100)}`} opacity={0.95} />
        {/* marker */}
        <line x1={cx} y1={cy} x2={mx} y2={my} stroke="var(--fy-text,#ffffff)" strokeWidth={2} strokeLinecap="round" />
        <circle cx={mx} cy={my} r={6} fill={zone} stroke="var(--fy-text,#fff)" strokeWidth={2} />
      </g>
    </svg>
  );
}

export default function EmergencyFund() {
  const [rent, setRent] = useState(20000);
  const [utilities, setUtilities] = useState(3000);
  const [groceries, setGroceries] = useState(5000);
  const [insurance, setInsurance] = useState(2000);

  const [dining, setDining] = useState(2000);
  const [subs, setSubs] = useState(800);
  const [shopping, setShopping] = useState(1500);

  const [months, setMonths] = useState(6);
  const [savings, setSavings] = useState(50000);

  const essentials = useMemo(() => Number(rent)+Number(utilities)+Number(groceries)+Number(insurance), [rent,utilities,groceries,insurance]);
  const lifestyle = useMemo(() => Number(dining)+Number(subs)+Number(shopping), [dining,subs,shopping]);

  const survivalTarget = essentials * months;
  const comfortTarget = (essentials + lifestyle) * months;

  const monthsLast = essentials > 0 ? (savings / essentials) : 0;

  // For gauge we show progress toward the user-selected `months` target.
  // This keeps the filled arc and the marker consistent: both represent
  // how close `savings` are to covering the selected `months` of expenses.
  const percent = months > 0 ? Math.min(100, Math.round((monthsLast / months) * 100)) : 0;

  const percentAgainstSurvival = survivalTarget > 0 ? Math.min(100, Math.round((savings / survivalTarget) * 100)) : 0;
  const percentAgainstComfort = comfortTarget > 0 ? Math.min(100, Math.round((savings / comfortTarget) * 100)) : 0;
  // Marker shows the same metric as the filled arc (progress toward selected months)
  const markerPercent = percent;

  // determine zone color based on monthsLast (for gauge overlay and needle tip)
  const zoneColor = monthsLast < 3 ? '#ef4444' : (monthsLast >= 6 ? '#10b981' : '#f59e0b');

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-2">Emergency Fund Calculator</h2>
      <p className="text-gray-400 mb-6">Choose between Survival and Comfort targets and see how long your savings will last.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4 relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-4 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">Essentials <span className="text-sm text-gray-300">(Needs)</span></h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><span>🏠</span><span className="text-sm text-gray-300">Rent / EMI</span></div>
                  <div className="relative w-48">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-300">₹</span>
                    <input type="number" value={rent} onChange={(e)=>setRent(Number(e.target.value||0))} className="w-full p-2 pl-9 rounded-md bg-white/5 text-white" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><span>💡</span><span className="text-sm text-gray-300">Utilities</span></div>
                  <div className="relative w-48">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-300">₹</span>
                    <input type="number" value={utilities} onChange={(e)=>setUtilities(Number(e.target.value||0))} className="w-full p-2 pl-9 rounded-md bg-white/5 text-white" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><span>🛒</span><span className="text-sm text-gray-300">Groceries</span></div>
                  <div className="relative w-48">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-300">₹</span>
                    <input type="number" value={groceries} onChange={(e)=>setGroceries(Number(e.target.value||0))} className="w-full p-2 pl-9 rounded-md bg-white/5 text-white" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><span>🛡️</span><span className="text-sm text-gray-300">Insurance</span></div>
                  <div className="relative w-48">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-300">₹</span>
                    <input type="number" value={insurance} onChange={(e)=>setInsurance(Number(e.target.value||0))} className="w-full p-2 pl-9 rounded-md bg-white/5 text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">Lifestyle <span className="text-sm text-gray-300">(Wants)</span></h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><span>🍽️</span><span className="text-sm text-gray-300">Dining Out</span></div>
                  <div className="relative w-48">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-300">₹</span>
                    <input type="number" value={dining} onChange={(e)=>setDining(Number(e.target.value||0))} className="w-full p-2 pl-9 rounded-md bg-white/5 text-white" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><span>📺</span><span className="text-sm text-gray-300">Subscriptions</span></div>
                  <div className="relative w-48">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-300">₹</span>
                    <input type="number" value={subs} onChange={(e)=>setSubs(Number(e.target.value||0))} className="w-full p-2 pl-9 rounded-md bg-white/5 text-white" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><span>🛍️</span><span className="text-sm text-gray-300">Shopping</span></div>
                  <div className="relative w-48">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-300">₹</span>
                    <input type="number" value={shopping} onChange={(e)=>setShopping(Number(e.target.value||0))} className="w-full p-2 pl-9 rounded-md bg-white/5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl mt-2">
            <h3 className="text-lg font-semibold text-white mb-3">Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-300">Months of Coverage: <span className="font-semibold text-white">{months} months</span></label>
                <input type="range" min={3} max={12} value={months} onChange={(e)=>setMonths(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="text-sm text-gray-300">Current Savings</label>
                <div className="relative w-48">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-300">₹</span>
                  <input type="number" value={savings} onChange={(e)=>setSavings(Number(e.target.value||0))} className="w-full p-2 pl-9 rounded-md bg-white/5 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Sticky total monthly burn */}
          <div className="sticky bottom-4">
            <div className="glass-card p-4 rounded-2xl">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-300">Total Monthly Burn</div>
                <div className="text-xl font-bold text-white">{rupee(essentials + lifestyle)}</div>
              </div>
              <div className="text-xs text-gray-400 mt-1">Essentials: {rupee(essentials)} • Lifestyle: {rupee(lifestyle)}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-card p-6 rounded-2xl flex flex-col items-center">
            <div style={{ width: 340, height: 220 }}>
              <SemiCircleGauge percent={percent} markerPercent={markerPercent} zone={zoneColor} />
            </div>
            <div className="mt-4 w-full grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-white/3">
                <div className="text-xs text-gray-300">Survival Target</div>
                <div className="text-lg font-bold text-white">{rupee(survivalTarget)}</div>
                <div className="w-full bg-white/6 rounded-full h-2 mt-3 overflow-hidden">
                  <div className="h-2 bg-emerald-500" style={{ width: `${percentAgainstSurvival}%` }} />
                </div>
                <div className="text-xs text-gray-400 mt-2">{percentAgainstSurvival}% covered</div>
              </div>

              <div className="p-3 rounded-lg bg-white/3">
                <div className="text-xs text-gray-300">Comfort Target</div>
                <div className="text-lg font-bold text-white">{rupee(comfortTarget)}</div>
                <div className="w-full bg-white/6 rounded-full h-2 mt-3 overflow-hidden">
                  <div className="h-2 bg-amber-400" style={{ width: `${percentAgainstComfort}%` }} />
                </div>
                <div className="text-xs text-gray-400 mt-2">{percentAgainstComfort}% covered</div>
              </div>
            </div>

            {/* Status Alert Card */}
            <div className="w-full mt-4">
              {monthsLast < 3 ? (
                <div className="p-4 rounded-lg bg-red-600 text-white">
                  <div className="text-sm">High Risk</div>
                  <div className="text-4xl font-extrabold">{Math.floor(monthsLast)} <span className="text-base font-medium">months</span></div>
                  <div className="text-sm mt-1">Your current savings will last you approximately {Math.max(0, monthsLast.toFixed(1))} months.</div>
                </div>
              ) : monthsLast >= 6 ? (
                <div className="p-4 rounded-lg bg-emerald-600 text-white">
                  <div className="text-sm">Secure</div>
                  <div className="text-4xl font-extrabold">{Math.floor(monthsLast)} <span className="text-base font-medium">months</span></div>
                  <div className="text-sm mt-1">You're well covered in case of an emergency.</div>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-amber-500 text-white">
                  <div className="text-sm">Caution</div>
                  <div className="text-4xl font-extrabold">{Math.floor(monthsLast)} <span className="text-base font-medium">months</span></div>
                  <div className="text-sm mt-1">Consider increasing savings or reducing non-essential expenses.</div>
                </div>
              )}
            </div>

            <div className="glass-card p-4 rounded-2xl">
              <div className="text-sm text-gray-300">Breakdown</div>
              <div className="mt-2 text-white">
                <div>Essentials / month: {rupee(essentials)}</div>
                <div>Lifestyle / month: {rupee(lifestyle)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
