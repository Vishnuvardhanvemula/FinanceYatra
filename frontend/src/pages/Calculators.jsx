import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, TrendingUp, Umbrella, FileText, ShieldAlert, ArrowRight, PieChart, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Calculators() {
  const navigate = useNavigate();

  const cards = [
    {
      key: 'budget',
      title: 'Budget Planner',
      subtitle: 'Track expenses, set goals, and earn XP for saving.',
      path: '/budget-planner',
      Icon: Wallet,
      gradient: 'from-emerald-500 to-green-600',
      shadow: 'shadow-emerald-500/20'
    },
    {
      key: 'emi',
      title: 'EMI Calculator',
      subtitle: 'Plan your loans effectively with detailed amortization schedules.',
      path: '/calculators/emi',
      Icon: Calculator,
      gradient: 'from-blue-500 to-indigo-600',
      shadow: 'shadow-blue-500/20'
    },
    {
      key: 'sip',
      title: 'SIP Calculator',
      subtitle: 'Visualize wealth creation with inflation-adjusted returns.',
      path: '/calculators/sip',
      Icon: TrendingUp,
      gradient: 'from-emerald-500 to-teal-600',
      shadow: 'shadow-emerald-500/20'
    },
    {
      key: 'retirement',
      title: 'Retirement Planner',
      subtitle: 'Analyze the gap between your corpus and retirement goals.',
      path: '/calculators/retirement',
      Icon: Umbrella,
      gradient: 'from-violet-500 to-purple-600',
      shadow: 'shadow-violet-500/20'
    },
    {
      key: 'tax',
      title: 'Tax Regime Analyzer',
      subtitle: 'Compare Old vs New regimes to maximize your savings.',
      path: '/calculators/tax',
      Icon: FileText,
      gradient: 'from-orange-500 to-amber-600',
      shadow: 'shadow-orange-500/20'
    },
    {
      key: 'emergency',
      title: 'Emergency Fund',
      subtitle: 'Calculate the safety net needed for financial security.',
      path: '/calculators/emergency',
      Icon: ShieldAlert,
      gradient: 'from-red-500 to-rose-600',
      shadow: 'shadow-red-500/20'
    },
    {
      key: 'market',
      title: 'Market Simulator',
      subtitle: 'Practice trading strategies in a risk-free virtual environment.',
      path: '/market-simulator',
      Icon: TrendingUp,
      gradient: 'from-cyan-500 to-blue-600',
      shadow: 'shadow-cyan-500/20'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0B101B] text-slate-200 font-sans selection:bg-teal-500/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0B101B] to-black"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-teal-400 text-xs font-mono uppercase tracking-wider mb-4">
            <PieChart size={14} />
            Financial Tools
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Command Center
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Advanced calculators to project, plan, and optimize your financial future with precision.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {cards.map((c) => {
            const Icon = c.Icon;
            return (
              <motion.div
                key={c.key}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                onClick={() => navigate(c.path)}
                className="group relative p-1 rounded-3xl bg-gradient-to-b from-white/10 to-white/5 hover:from-teal-500/50 hover:to-blue-500/50 transition-all duration-300 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                <div className="relative h-full bg-[#0f1623] rounded-[22px] p-6 border border-white/5 overflow-hidden group-hover:border-white/10 transition-colors">
                  {/* Card Glow */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-10 blur-[60px] transition-opacity duration-500`}></div>

                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${c.gradient} shadow-lg ${c.shadow} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={26} />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-white/10 group-hover:text-white transition-colors">
                        <ArrowRight size={16} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </div>
                    </div>

                    <div className="mt-auto">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                        {c.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                        {c.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
