import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Home, Zap, ShoppingCart, Heart, Coffee, Tv, ShoppingBag, Settings, AlertTriangle, CheckCircle, Info, HelpCircle } from 'lucide-react';
import { useCalculatorTour } from '../hooks/useCalculatorTour';
import DemoDataButton from '../components/DemoDataButton';

function rupee(n) { return '₹' + (Number(n) || 0).toLocaleString(); }

function SemiCircleGauge({ percent, markerPercent, zone = '#10b981' }) {
  const r = 80;
  const cx = 100;
  const cy = 100;
  const startX = cx - r;
  const startY = cy;
  const endX = cx + r;
  const endY = cy;
  const dash = Math.PI * r;

  // Animation hook
  const useAnimatedValue = (target) => {
    const [value, setValue] = useState(0);
    useEffect(() => {
      let start = 0;
      const animate = () => {
        start += (target - start) * 0.1;
        setValue(start);
        if (Math.abs(target - start) > 0.1) requestAnimationFrame(animate);
      };
      animate();
    }, [target]);
    return value;
  };

  const animatedFill = useAnimatedValue(percent);
  const animatedMarker = useAnimatedValue(markerPercent);

  const theta = Math.PI * (animatedMarker / 100);
  const mx = cx + r * Math.cos(Math.PI - theta);
  const my = cy - r * Math.sin(Math.PI - theta);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g transform="translate(0,10)">
          {/* Track */}
          <path d={`M ${startX} ${startY} A ${r} ${r} 0 0 1 ${endX} ${endY}`} stroke="rgba(255,255,255,0.1)" strokeWidth={12} fill="none" strokeLinecap="round" />

          {/* Progress */}
          <path
            d={`M ${startX} ${startY} A ${r} ${r} 0 0 1 ${endX} ${endY}`}
            stroke="url(#gaugeGradient)"
            strokeWidth={12}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={dash}
            strokeDashoffset={dash * (1 - animatedFill / 100)}
            filter="url(#glow)"
          />

          {/* Marker */}
          <circle cx={mx} cy={my} r={6} fill="#0b101b" stroke="white" strokeWidth={2} className="shadow-lg" />
        </g>
      </svg>

      <div className="absolute bottom-0 text-center transform translate-y-2">
        <div className="text-3xl font-bold text-white">{Math.round(animatedMarker)}%</div>
        <div className="text-xs text-gray-400 uppercase tracking-wider">Coverage</div>
      </div>
    </div>
  );
}

const InputField = ({ label, icon: Icon, value, onChange }) => (
  <div className="flex items-center justify-between group">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors text-gray-400 group-hover:text-teal-400">
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-sm text-gray-300">{label}</span>
    </div>
    <div className="relative w-32">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">₹</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value || 0))}
        className="w-full p-2 pl-7 rounded-lg bg-white/5 border border-white/10 text-white text-right focus:outline-none focus:border-teal-500/50 transition-all font-medium text-sm"
      />
    </div>
  </div>
);


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

  const { restartTour } = useCalculatorTour('emergency_tour_v1', [
    {
      element: '#emergency-inputs',
      popover: { title: 'Expenses & Lifestyle', description: 'Break down your monthly spending into Essentials (Needs) and Lifestyle (Wants).', side: 'right' }
    },
    {
      element: '#emergency-result',
      popover: { title: 'Safety Net', description: 'See how long your current savings will last if income stops.', side: 'left' }
    }
  ]);

  const onFillDemoData = () => {
    setRent(25000);
    setUtilities(4000);
    setGroceries(6000);
    setInsurance(3000);
    setDining(5000);
    setSubs(1200);
    setShopping(3000);
    setMonths(6);
    setSavings(250000); // Decent emergency fund
  };

  const essentials = useMemo(() => Number(rent) + Number(utilities) + Number(groceries) + Number(insurance), [rent, utilities, groceries, insurance]);
  const lifestyle = useMemo(() => Number(dining) + Number(subs) + Number(shopping), [dining, subs, shopping]);

  const survivalTarget = essentials * months;
  const comfortTarget = (essentials + lifestyle) * months;

  const monthsLast = essentials > 0 ? (savings / essentials) : 0;
  const percent = months > 0 ? Math.min(100, Math.round((monthsLast / months) * 100)) : 0;

  const percentAgainstSurvival = survivalTarget > 0 ? Math.min(100, Math.round((savings / survivalTarget) * 100)) : 0;
  const percentAgainstComfort = comfortTarget > 0 ? Math.min(100, Math.round((savings / comfortTarget) * 100)) : 0;

  const zoneColor = monthsLast < 3 ? '#ef4444' : (monthsLast >= 6 ? '#10b981' : '#f59e0b');

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
            Emergency Fund
          </h1>
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg text-gray-400 max-w-2xl mx-auto flex items-center justify-center gap-2">
              Calculate the safety net needed for your financial security.
              <button onClick={restartTour} className="text-teal-400 hover:text-teal-300 transition-colors" title="Replay Tour">
                <HelpCircle className="w-4 h-4" />
              </button>
            </p>
            <DemoDataButton onFill={onFillDemoData} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Inputs */}
          <div className="lg:col-span-7 space-y-6" id="emergency-inputs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Essentials Card */}
              <div className="bg-[#0b101b]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-teal-400" />
                    Essentials
                  </h3>
                  <span className="text-xs font-medium px-2 py-1 rounded-md bg-white/5 text-gray-400">Needs</span>
                </div>
                <div className="space-y-4">
                  <InputField label="Rent / EMI" icon={Home} value={rent} onChange={setRent} />
                  <InputField label="Utilities" icon={Zap} value={utilities} onChange={setUtilities} />
                  <InputField label="Groceries" icon={ShoppingCart} value={groceries} onChange={setGroceries} />
                  <InputField label="Insurance" icon={Heart} value={insurance} onChange={setInsurance} />
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-sm text-gray-400">Total Essentials</span>
                  <span className="text-lg font-bold text-white">{rupee(essentials)}</span>
                </div>
              </div>

              {/* Lifestyle Card */}
              <div className="bg-[#0b101b]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Coffee className="w-5 h-5 text-amber-400" />
                    Lifestyle
                  </h3>
                  <span className="text-xs font-medium px-2 py-1 rounded-md bg-white/5 text-gray-400">Wants</span>
                </div>
                <div className="space-y-4">
                  <InputField label="Dining Out" icon={Coffee} value={dining} onChange={setDining} />
                  <InputField label="Subscriptions" icon={Tv} value={subs} onChange={setSubs} />
                  <InputField label="Shopping" icon={ShoppingBag} value={shopping} onChange={setShopping} />
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-sm text-gray-400">Total Lifestyle</span>
                  <span className="text-lg font-bold text-white">{rupee(lifestyle)}</span>
                </div>
              </div>
            </div>

            {/* Settings Card */}
            <div className="bg-[#0b101b]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
                <Settings className="w-5 h-5 text-gray-400" />
                Configuration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-sm text-gray-300">Target Coverage</label>
                    <span className="text-sm font-bold text-teal-400">{months} Months</span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={12}
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal-500"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm text-gray-300">Current Savings</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">₹</span>
                    <input
                      type="number"
                      value={savings}
                      onChange={(e) => setSavings(Number(e.target.value || 0))}
                      className="w-full p-3 pl-8 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-teal-500/50 transition-all font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Visualization */}
          <div className="lg:col-span-5 space-y-6" id="emergency-result">
            {/* Gauge Card */}
            <div className="bg-[#0b101b]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-amber-500 to-teal-500 opacity-50" />

              <div className="w-64 h-40 mb-4">
                <SemiCircleGauge percent={percent} markerPercent={percent} zone={zoneColor} />
              </div>

              <div className={`w-full p-4 rounded-xl border ${monthsLast < 3 ? 'bg-red-500/10 border-red-500/20' : monthsLast >= 6 ? 'bg-teal-500/10 border-teal-500/20' : 'bg-amber-500/10 border-amber-500/20'} mb-6`}>
                <div className="flex items-start gap-3">
                  {monthsLast < 3 ? <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" /> :
                    monthsLast >= 6 ? <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" /> :
                      <Info className="w-5 h-5 text-amber-400 flex-shrink-0" />}
                  <div>
                    <div className={`font-bold ${monthsLast < 3 ? 'text-red-400' : monthsLast >= 6 ? 'text-teal-400' : 'text-amber-400'}`}>
                      {monthsLast < 3 ? 'High Risk' : monthsLast >= 6 ? 'Secure' : 'Caution'}
                    </div>
                    <p className="text-sm text-gray-300 mt-1">
                      Your savings will last approximately <span className="font-bold text-white">{Math.max(0, monthsLast.toFixed(1))} months</span> covering essentials.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-xs text-gray-400 mb-1">Survival Target</div>
                  <div className="text-lg font-bold text-white mb-2">{rupee(survivalTarget)}</div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 transition-all duration-1000" style={{ width: `${percentAgainstSurvival}%` }} />
                  </div>
                  <div className="text-xs text-right text-teal-400 mt-1">{percentAgainstSurvival}%</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-xs text-gray-400 mb-1">Comfort Target</div>
                  <div className="text-lg font-bold text-white mb-2">{rupee(comfortTarget)}</div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 transition-all duration-1000" style={{ width: `${percentAgainstComfort}%` }} />
                  </div>
                  <div className="text-xs text-right text-amber-400 mt-1">{percentAgainstComfort}%</div>
                </div>
              </div>
            </div>

            {/* Summary Sticky */}
            <div className="bg-gradient-to-br from-teal-500/10 to-blue-600/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-300 font-medium">Monthly Burn</span>
                <span className="text-2xl font-bold text-white">{rupee(essentials + lifestyle)}</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Essentials</span>
                  <span>{rupee(essentials)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Lifestyle</span>
                  <span>{rupee(lifestyle)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
