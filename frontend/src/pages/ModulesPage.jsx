import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { moduleService } from '../services/moduleService';
import {
  BookOpen,
  CheckCircle,
  Lock,
  Play,
  Clock,
  BarChart,
  Search,
  ChevronRight,
  Zap,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import ParticleBackground from '../components/ParticleBackground';
import TiltCard from '../components/TiltCard';

const ModulesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      setLoading(true);
      const response = await moduleService.getAllModules();
      if (response.success) {
        setModules(response.data);
      }
    } catch (error) {
      console.error('Error fetching modules:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.scrollToCurrent && !loading && modules.length > 0) {
      const currentModule = modules.find(m => {
        const progress = user?.moduleProgress?.find(p => p.moduleId === m.id);
        return progress && !progress.completedAt;
      });

      if (currentModule) {
        const element = document.getElementById(`module-${currentModule.id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }, [location.state, loading, modules, user]);

  const getModuleStatus = (moduleId) => {
    if (!user) return 'locked';
    const progress = user.moduleProgress?.find(m => m.moduleId === moduleId);
    if (progress?.completedAt) return 'completed';
    if (progress) return 'in-progress';

    // Check prerequisites
    const module = modules.find(m => m.id === moduleId);
    if (!module) return 'locked';

    if (module.prerequisites && module.prerequisites.length > 0) {
      const allPrereqsCompleted = module.prerequisites.every(prereqId => {
        const prereqProgress = user.moduleProgress?.find(m => m.moduleId === prereqId);
        return prereqProgress?.completedAt;
      });
      return allPrereqsCompleted ? 'unlocked' : 'locked';
    }

    return 'unlocked';
  };

  const filteredModules = modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || module.difficulty === filter;
    return matchesSearch && matchesFilter;
  });

  const filters = [
    { id: 'all', label: 'All Modules' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'expert', label: 'Expert' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium animate-pulse">Loading Payload...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden font-sans selection:bg-indigo-500/30">
      <ParticleBackground />

      {/* Navbar Placeholder */}
      <div className="h-20" />

      {/* Main Content */}
      <div className="relative pt-12 pb-24 px-6 md:px-12 max-w-7xl mx-auto">

        {/* Hero Section */}
        <div className="flex flex-col items-center text-center space-y-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700 backdrop-blur-md shadow-sm"
          >
            <Target size={16} className="text-indigo-400" />
            <span className="text-sm font-medium text-slate-300">
              Your Journey: <span className="text-white font-bold">{modules.length} Missions Available</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-indigo-100 to-indigo-400"
          >
            Mission Control
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl font-light leading-relaxed"
          >
            Master the art of finance through our tactical learning modules. From rookie basics to elite investing strategies.
          </motion.p>

          {/* Search Bar - Floating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-lg relative group"
          >
            <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-full px-6 py-4 shadow-xl focus-within:border-indigo-500/50 focus-within:bg-slate-900 transition-all">
              <Search className="text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search command log..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none focus:outline-none text-white ml-4 placeholder-slate-500"
              />
            </div>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <div className="sticky top-20 z-40 mb-16 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-1 p-1 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-full shadow-2xl overflow-x-auto max-w-full no-scrollbar"
          >
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${filter === f.id
                    ? 'text-white shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
              >
                {filter === f.id && (
                  <motion.div
                    layoutId="activeModuleFilter"
                    className="absolute inset-0 bg-indigo-600 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Modules Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredModules.map((module, index) => {
              const status = getModuleStatus(module.id);
              const isLocked = status === 'locked';
              const isCompleted = status === 'completed';
              const isInProgress = status === 'in-progress';

              // Dynamic Border Color based on status
              const borderColor = isCompleted ? 'border-emerald-500/30' :
                isInProgress ? 'border-indigo-500/50' :
                  'border-slate-800';

              const glowColor = isCompleted ? 'shadow-[0_0_30px_rgba(16,185,129,0.1)]' :
                isInProgress ? 'shadow-[0_0_30px_rgba(99,102,241,0.15)]' :
                  '';

              return (
                <motion.div
                  key={module.id}
                  id={`module-${module.id}`}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="h-full"
                >
                  <TiltCard
                    className={`h-full bg-slate-900/40 backdrop-blur-md border ${borderColor} ${glowColor} rounded-3xl overflow-hidden group hover:border-indigo-500/30 transition-all duration-500 flex flex-col`}
                  >
                    {/* Progress Bar (Top) */}
                    {isInProgress && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-slate-800/50">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '40%' }} // You could calculate real % if data existed
                          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                        />
                      </div>
                    )}

                    <div className="p-8 flex flex-col h-full relative z-10">
                      {/* Header Row */}
                      <div className="flex justify-between items-start mb-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner ${isLocked ? 'bg-slate-900 text-slate-700' :
                            isCompleted ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20' :
                              'bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors'
                          }`}>
                          {module.icon}
                        </div>

                        {/* Status Badge */}
                        <div className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${isCompleted ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                            isInProgress ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                              'bg-slate-800 text-slate-500 border-slate-700'
                          }`}>
                          {isCompleted ? 'Mission Complete' : isInProgress ? 'Active Mission' : 'Locked'}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="mb-6">
                        <h3 className={`text-2xl font-bold mb-3 transition-colors ${isLocked ? 'text-slate-600' : 'text-white group-hover:text-indigo-400'
                          }`}>
                          {module.title}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                          {module.description}
                        </p>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-8 pt-6 border-t border-slate-800/50">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                          <BarChart size={14} className={
                            module.difficulty === 'beginner' ? 'text-emerald-400' :
                              module.difficulty === 'intermediate' ? 'text-amber-400' : 'text-rose-400'
                          } />
                          {module.difficulty}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                          <Clock size={14} className="text-indigo-400" />
                          {module.duration}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 col-span-2">
                          <BookOpen size={14} className="text-cyan-400" />
                          {module.lessonsCount || module.lessons} Tactical Lessons
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="mt-auto">
                        <button
                          onClick={() => !isLocked && navigate(`/modules/${module.id}`)}
                          disabled={isLocked}
                          className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 group/btn relative overflow-hidden ${isLocked
                              ? 'bg-slate-900 text-slate-700 border border-slate-800 cursor-not-allowed'
                              : isCompleted
                                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30 hover:bg-slate-700'
                                : 'bg-white text-slate-950 hover:bg-indigo-400 hover:text-white shadow-xl shadow-indigo-500/20'
                            }`}
                        >
                          {isLocked ? (
                            <>
                              <Lock size={16} /> Locked
                            </>
                          ) : isCompleted ? (
                            <>
                              <CheckCircle size={16} /> Review Mission
                            </>
                          ) : (
                            <>
                              Start Mission <ChevronRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Fade */}
        <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-30" />
      </div>
    </div>
  );
};

export default ModulesPage;
