import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, TrendingUp, Umbrella, FileText, ShieldAlert } from 'lucide-react';

export default function Calculators() {
  const navigate = useNavigate();

  const cards = [
    { key: 'emi', title: 'EMI Calculator', subtitle: 'Monthly loan payments and amortization', path: '/calculators/emi', Icon: Calculator, gradient: 'from-blue-400 to-blue-600' },
    { key: 'sip', title: 'SIP Calculator', subtitle: 'Systematic Investment Plan with inflation', path: '/calculators/sip', Icon: TrendingUp, gradient: 'from-emerald-400 to-emerald-600' },
    { key: 'retirement', title: 'Retirement Gap Analyzer', subtitle: 'Estimate required corpus vs projected corpus', path: '/calculators/retirement', Icon: Umbrella, gradient: 'from-violet-400 to-violet-600' },
    { key: 'tax', title: 'Income Tax Calculator', subtitle: 'Compare Old vs New tax regimes', path: '/calculators/tax', Icon: FileText, gradient: 'from-orange-400 to-orange-600' },
    { key: 'emergency', title: 'Emergency Fund', subtitle: 'Survival vs Comfort savings target', path: '/calculators/emergency', Icon: ShieldAlert, gradient: 'from-red-400 to-red-600' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-4">Calculators</h2>
      <p className="text-gray-400 mb-6">Quick financial tools to help plan and project your finances.</p>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.Icon;
          return (
            <div
              key={c.key}
              role="button"
              tabIndex={0}
              onClick={() => navigate(c.path)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(c.path); }}
              className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md cursor-pointer transform transition will-change-transform hover:scale-105 hover:border-teal-500/50"
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center text-white bg-gradient-to-br ${c.gradient}` }>
                  <Icon size={22} />
                </div>

                <div className="flex-1">
                  <div className="text-lg font-semibold text-gray-50">{c.title}</div>
                  <div className="text-sm text-gray-300 mt-1">{c.subtitle}</div>
                </div>
              </div>

              <div className="mt-6">
                {/* Make CTA visible on small screens (no hover), appear on hover for md+ */}
                <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 text-sm">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(c.path); }}
                    className="inline-flex items-center gap-2 text-sm font-medium text-teal-300 hover:text-white"
                  >
                    <span>Launch Tool</span>
                    <span aria-hidden>→</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
