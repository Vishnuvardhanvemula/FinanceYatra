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
  Filter,
  ChevronRight,
  Star,
  Award,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20">
      {/* Header Section */}
      <div className="relative bg-slate-900 border-b border-slate-800 pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/10 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Modules</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mb-8">
              Master financial literacy through our structured curriculum. Start from the basics and advance to expert strategies.
            </p>

            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-slate-500 transition-all"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                {['all', 'beginner', 'intermediate', 'expert'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-6 py-3 rounded-xl capitalize font-medium transition-all whitespace-nowrap ${filter === f
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                        : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700'
                      }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredModules.map((module) => {
              const status = getModuleStatus(module.id);
              const isLocked = status === 'locked';
              const isCompleted = status === 'completed';
              const isInProgress = status === 'in-progress';

              return (
                <motion.div
                  key={module.id}
                  id={`module-${module.id}`}
                  variants={itemVariants}
                  layout
                  className={`group relative bg-slate-900 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${isLocked
                      ? 'border-slate-800 opacity-75'
                      : isInProgress
                        ? 'border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.15)]'
                        : isCompleted
                          ? 'border-emerald-500/30'
                          : 'border-slate-800 hover:border-indigo-500/30 hover:shadow-xl'
                    }`}
                >
                  {/* Progress Bar for In-Progress */}
                  {isInProgress && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-slate-800 rounded-t-2xl overflow-hidden">
                      <div className="h-full bg-indigo-500 w-1/3 animate-pulse"></div>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${isLocked ? 'bg-slate-800 grayscale' : 'bg-slate-800'
                        }`}>
                        {module.icon}
                      </div>

                      {isCompleted && (
                        <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                          <CheckCircle size={12} /> Completed
                        </div>
                      )}
                      {isInProgress && (
                        <div className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                          <Play size={12} /> In Progress
                        </div>
                      )}
                      {isLocked && (
                        <div className="bg-slate-800 text-slate-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                          <Lock size={12} /> Locked
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-6 line-clamp-2">
                      {module.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium uppercase tracking-wider mb-6">
                      <div className="flex items-center gap-1">
                        <BarChart size={14} className={
                          module.difficulty === 'beginner' ? 'text-emerald-400' :
                            module.difficulty === 'intermediate' ? 'text-amber-400' : 'text-rose-400'
                        } />
                        {module.difficulty}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {module.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen size={14} />
                        {module.lessonsCount || module.lessons} Lessons
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => !isLocked && navigate(`/modules/${module.id}`)}
                      disabled={isLocked}
                      className={`w-full py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${isLocked
                          ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                          : isCompleted
                            ? 'bg-slate-800 text-white hover:bg-slate-700'
                            : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/25'
                        }`}
                    >
                      {isLocked ? (
                        <>Locked <Lock size={16} /></>
                      ) : isCompleted ? (
                        <>Review <BookOpen size={16} /></>
                      ) : isInProgress ? (
                        <>Continue <ChevronRight size={16} /></>
                      ) : (
                        <>Start Learning <ChevronRight size={16} /></>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ModulesPage;
