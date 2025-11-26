import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { learningModules, getModuleStats } from '../data/learningModules';
import ModuleNode from '../components/ModuleNode';
import ParticleBackground from '../components/ParticleBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Target, Zap, ArrowDown, Sparkles, Rocket, Activity } from 'lucide-react';

const ModulesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [completedModules, setCompletedModules] = useState([]);
  const [stats, setStats] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Memoize the stringified moduleProgress to detect deep changes
  const moduleProgressKey = useMemo(() =>
    JSON.stringify(user?.moduleProgress || []),
    [user?.moduleProgress]
  );

  useEffect(() => {
    if (isAuthenticated && user) {
      const completed = user.moduleProgress
        ?.filter(m => m.completedAt)
        ?.map(m => m.moduleId) || [];

      setCompletedModules(completed);
      setStats(getModuleStats(completed, user.moduleProgress));
    } else {
      setStats(getModuleStats([], []));
    }
  }, [isAuthenticated, user, moduleProgressKey]);

  const getModuleStatus = (module) => {
    if (completedModules.includes(module.id)) return 'completed';

    // Check if in progress
    const progress = user?.moduleProgress?.find(p => p.moduleId === module.id);
    if (progress && progress.startedAt && !progress.completedAt) return 'inProgress';

    // Check prerequisites
    if (module.prerequisites.length > 0) {
      const allPrereqsCompleted = module.prerequisites.every(id => completedModules.includes(id));
      if (!allPrereqsCompleted) return 'locked';
    }

    return 'available';
  };

  const currentModuleId = useMemo(() => {
    // Find first inProgress
    const inProgress = learningModules.find(m => getModuleStatus(m) === 'inProgress');
    if (inProgress) return inProgress.id;

    // Or first available that is NOT completed
    const firstAvailable = learningModules.find(m => {
      const status = getModuleStatus(m);
      return status === 'available' && !completedModules.includes(m.id);
    });
    if (firstAvailable) return firstAvailable.id;

    return null;
  }, [completedModules, user?.moduleProgress]);

  // Auto-scroll logic
  useEffect(() => {
    if (location.state?.scrollToCurrent && currentModuleId) {
      setTimeout(() => {
        const element = document.getElementById(currentModuleId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    }
  }, [location.state, currentModuleId]);

  // Scroll button visibility logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 200 && currentModuleId) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentModuleId]);

  const scrollToCurrent = () => {
    if (currentModuleId) {
      const element = document.getElementById(currentModuleId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleModuleClick = (module) => {
    const status = getModuleStatus(module);
    if (status === 'locked') return;
    navigate(`/modules/${module.id}`);
  };

  // Calculate XP and Rank
  const totalXP = useMemo(() => {
    return completedModules.reduce((acc, moduleId) => {
      const module = learningModules.find(m => m.id === moduleId);
      if (!module) return acc;
      const xpMap = { beginner: 100, intermediate: 250, expert: 500 };
      return acc + (xpMap[module.difficulty] || 100);
    }, 0);
  }, [completedModules]);

  const currentRank = useMemo(() => {
    if (totalXP >= 5000) return 'Grandmaster';
    if (totalXP >= 2500) return 'Expert';
    if (totalXP >= 1000) return 'Advanced';
    if (totalXP >= 500) return 'Intermediate';
    return 'Novice';
  }, [totalXP]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 relative overflow-hidden selection:bg-amber-500/30">
      {/* Background Effects (Celestial Gold) */}
      <ParticleBackground />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-[#020617]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 brightness-100 contrast-150 mix-blend-overlay"></div>
        {/* Subtle Golden Haze */}
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-amber-500/5 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-slate-500/5 rounded-full blur-[150px] animate-pulse-slow" />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-20 relative z-10">

        {/* Hero Title (Gold/Platinum) */}
        <div className="text-center mb-32 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 font-sans tracking-tighter relative z-10"
          >
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-slate-300">CURRICULUM</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xl max-w-2xl mx-auto font-light"
          >
            Master the architecture of modern wealth.
          </motion.p>
        </div>

        {/* Glassmorphic Stats HUD (Refined) */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {[
            { label: 'CURRENT RANK', value: currentRank, icon: Trophy, color: 'amber', border: 'border-amber-500/20', bg: 'bg-amber-500/10' },
            { label: 'TOTAL XP', value: totalXP, icon: Star, color: 'slate', border: 'border-slate-500/20', bg: 'bg-slate-500/10' },
            { label: 'MISSIONS', value: `${stats?.completed || 0}/${stats?.total || 0}`, icon: Target, color: 'emerald', border: 'border-emerald-500/20', bg: 'bg-emerald-500/10' },
            { label: 'STREAK', value: '3 DAYS', icon: Zap, color: 'yellow', border: 'border-yellow-500/20', bg: 'bg-yellow-500/10' }
          ].map((stat, index) => (
            <div key={index} className={`relative group overflow-hidden rounded-2xl border ${stat.border} bg-slate-900/40 backdrop-blur-xl p-4 transition-all duration-300 hover:bg-slate-800/60`}>
              <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className="relative z-10 flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bg} text-${stat.color}-400`}>
                  <stat.icon size={20} />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-mono tracking-wider mb-0.5">{stat.label}</div>
                  <div className="font-bold text-slate-100 text-lg">{stat.value}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="relative">
          {/* Modules List */}
          <div className="relative z-10 space-y-12">
            {learningModules.map((module, index) => {
              const status = getModuleStatus(module);
              const prereqTitles = module.prerequisites.map(id => {
                const m = learningModules.find(lm => lm.id === id);
                return m ? m.title : id;
              });
              const isLast = index === learningModules.length - 1;

              return (
                <ModuleNode
                  key={module.id}
                  module={module}
                  index={index}
                  status={status}
                  prereqTitles={prereqTitles}
                  onClick={handleModuleClick}
                  isLast={isLast}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Scroll Button */}
      <AnimatePresence>
        {showScrollButton && currentModuleId && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            onClick={scrollToCurrent}
            className="fixed bottom-8 right-8 z-50 p-4 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all hover:scale-110 group"
          >
            <ArrowDown size={24} className="group-hover:animate-bounce" />
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-slate-900/90 border border-slate-700 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 pointer-events-none backdrop-blur-md">
              Resume Mission
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModulesPage;
