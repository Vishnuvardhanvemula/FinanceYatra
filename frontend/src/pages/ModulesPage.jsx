import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { learningModules, getModuleStats } from '../data/learningModules';
import ModuleNode from '../components/ModuleNode';
import RoadmapPath from '../components/RoadmapPath';
import ParticleBackground from '../components/ParticleBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Target, Zap, ChevronDown, ArrowDown } from 'lucide-react';

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

    // Or just the last completed + 1 (which is basically first available)
    // If all completed, return null or last one
    return null;
  }, [completedModules, user?.moduleProgress]);

  // Auto-scroll logic
  useEffect(() => {
    if (location.state?.scrollToCurrent && currentModuleId) {
      // Small delay to ensure rendering
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
      // If user is at the top, show button (if not auto-scrolled)
      if (window.scrollY < 200 && currentModuleId) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
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
    <div className="min-h-screen bg-[#0b101b] text-white relative overflow-hidden selection:bg-cyan-500/30">
      {/* Background Effects */}
      <ParticleBackground />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">

        {/* Stats HUD */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="bg-gray-900/50 border border-cyan-500/30 p-4 rounded-xl backdrop-blur-md flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg"><Trophy className="text-cyan-400" size={20} /></div>
            <div>
              <div className="text-xs text-gray-400 font-mono">CURRENT_RANK</div>
              <div className="font-bold text-cyan-100">{currentRank}</div>
            </div>
          </div>
          <div className="bg-gray-900/50 border border-purple-500/30 p-4 rounded-xl backdrop-blur-md flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg"><Star className="text-purple-400" size={20} /></div>
            <div>
              <div className="text-xs text-gray-400 font-mono">TOTAL_XP</div>
              <div className="font-bold text-purple-100">{totalXP}</div>
            </div>
          </div>
          <div className="bg-gray-900/50 border border-emerald-500/30 p-4 rounded-xl backdrop-blur-md flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg"><Target className="text-emerald-400" size={20} /></div>
            <div>
              <div className="text-xs text-gray-400 font-mono">MISSIONS_DONE</div>
              <div className="font-bold text-emerald-100">{stats?.completed || 0}/{stats?.total || 0}</div>
            </div>
          </div>
          <div className="bg-gray-900/50 border border-yellow-500/30 p-4 rounded-xl backdrop-blur-md flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg"><Zap className="text-yellow-400" size={20} /></div>
            <div>
              <div className="text-xs text-gray-400 font-mono">STREAK</div>
              <div className="font-bold text-yellow-100">3 DAYS</div>
            </div>
          </div>
        </motion.div>

        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block mb-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest"
          >
            SYSTEM_READY
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-4 font-sans tracking-tight"
          >
            Mission Roadmap
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Navigate through the financial galaxy. Complete missions to unlock new sectors and upgrade your rank.
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical SVG Path */}
          <RoadmapPath totalModules={learningModules.length} />

          {/* Modules List */}
          <div className="relative z-10 space-y-8">
            {learningModules.map((module, index) => {
              const status = getModuleStatus(module);
              const prereqTitles = module.prerequisites.map(id => {
                const m = learningModules.find(lm => lm.id === id);
                return m ? m.title : id;
              });

              return (
                <ModuleNode
                  key={module.id}
                  module={module}
                  index={index}
                  status={status}
                  prereqTitles={prereqTitles}
                  onClick={handleModuleClick}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToCurrent}
            className="fixed bottom-8 right-8 z-50 p-4 bg-cyan-500 hover:bg-cyan-400 text-white rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-colors group"
          >
            <ArrowDown size={24} className="group-hover:animate-bounce" />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900/80 text-cyan-400 text-xs font-bold px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Jump to Current
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModulesPage;
