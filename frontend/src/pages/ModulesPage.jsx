import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { moduleService } from '../services/moduleService';
import {
  Lock,
  CheckCircle,
  Search,
  ChevronRight,
  Target,
  MapPin
} from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

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

  // Scroll Progress for the Timeline
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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

  const getModuleStatus = (moduleId) => {
    // ALWAYS unlock the first module
    if (moduleId === 'module-1') return { status: 'unlocked' };

    if (!user) return { status: 'locked', reason: 'Sign in required' };
    const progress = user.moduleProgress?.find(m => m.moduleId === moduleId);
    if (progress?.completedAt) return { status: 'completed' };
    if (progress) return { status: 'in-progress' };

    // Check prerequisites
    const module = modules.find(m => m.id === moduleId);
    if (!module) return { status: 'locked', reason: 'Unknown Module' };

    if (module.prerequisites && module.prerequisites.length > 0) {
      for (const prereqId of module.prerequisites) {
        const prereqProgress = user.moduleProgress?.find(m => m.moduleId === prereqId);
        if (!prereqProgress?.completedAt) {
          const prereqModule = modules.find(m => m.id === prereqId);
          return {
            status: 'locked',
            reason: prereqModule ? `Complete "${prereqModule.title}"` : 'Prerequisite missing'
          };
        }
      }
    }

    return { status: 'unlocked' };
  };

  const filteredModules = modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || module.difficulty === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium animate-pulse">Loading Mission Data...</p>
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
      <div className="relative pt-12 pb-24 px-4 md:px-12 max-w-6xl mx-auto" ref={containerRef}>

        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-6 mb-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700 backdrop-blur-md shadow-sm"
          >
            <MapPin size={16} className="text-indigo-400" />
            <span className="text-sm font-medium text-slate-300">
              Campaign Map: <span className="text-white font-bold">{filteredModules.length} Sectors</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-indigo-100 to-indigo-400"
          >
            Mission Roadmap
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full max-w-md relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search missions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-800 rounded-full py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
          </motion.div>
        </div>

        {/* The Timeline */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-slate-800/50 -translate-x-1/2 rounded-full overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-500"
              style={{ height: '100%', scaleY, transformOrigin: 'top' }}
            />
          </div>

          <div className="space-y-12 md:space-y-16 pb-24">
            {filteredModules.map((module, index) => {
              const { status, reason } = getModuleStatus(module.id);
              const isLocked = status === 'locked';
              const isCompleted = status === 'completed';
              const isInProgress = status === 'in-progress';
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.05 }}
                  className={`relative flex flex-col md:flex-row items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Dot & Connector Wrapper */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">

                    {/* The Dot */}
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={`w-6 h-6 rounded-full border-4 border-slate-950 box-content shadow-xl z-20 transition-colors duration-500 ${isCompleted ? 'bg-emerald-400 shadow-emerald-500/50' :
                        isInProgress ? 'bg-indigo-400 shadow-indigo-500/50 animate-pulse' :
                          'bg-slate-700'
                        }`} />

                    {/* Horizontal Connector Line (Desktop Only) */}
                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-0.5 bg-slate-800/80 w-16 -z-10 ${isEven ? 'right-1/2 origin-right' : 'left-1/2 origin-left'}`}>
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`h-full w-full origin-inherit ${isCompleted ? 'bg-emerald-500/50' : isInProgress ? 'bg-indigo-500/50' : 'bg-transparent'}`}
                      />
                    </div>
                  </div>

                  {/* Content Card Side */}
                  <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${isEven ? 'md:pr-20' : 'md:pl-20'}`}>
                    <TiltCard
                      className={`relative group overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-1 ${isLocked
                        ? 'bg-slate-900/40 border-slate-800 backdrop-blur-[2px]'
                        : isCompleted
                          ? 'bg-gradient-to-br from-slate-900/90 to-emerald-950/30 border-emerald-500/20 shadow-lg shadow-emerald-900/10'
                          : 'bg-gradient-to-br from-slate-900/90 to-indigo-950/30 border-indigo-500/30 shadow-xl shadow-indigo-500/10'
                        }`}
                    >
                      {/* Connection Nodule (Where the line meets the card) */}
                      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-700 ${isEven ? '-right-1' : '-left-1'}`} />

                      {/* Active Glow */}
                      {isInProgress && !isLocked && (
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      )}

                      <div className="relative p-6 z-10">
                        {/* Top Badge Row */}
                        <div className="flex justify-between items-start mb-4">
                          <div className={`p-3 rounded-xl transition-colors duration-300 ${isLocked ? 'bg-slate-800/50 text-slate-600' :
                            isCompleted ? 'bg-emerald-500/10 text-emerald-400' :
                              'bg-white/5 text-indigo-400 group-hover:bg-indigo-500/20'
                            }`}>
                            {module.icon}
                          </div>

                          {isLocked && (
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-red-500/10 border border-red-500/10 rounded-full text-red-400 text-[10px] font-bold uppercase tracking-wider">
                              <Lock size={10} />
                              <span>{reason || 'Locked'}</span>
                            </div>
                          )}

                          {isCompleted && (
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                              <CheckCircle size={10} />
                              <span>Complete</span>
                            </div>
                          )}

                          {isInProgress && (
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-wider">
                              <Target size={10} />
                              <span>Active</span>
                            </div>
                          )}
                        </div>

                        <h3 className={`text-xl font-bold mb-2 transition-colors ${isLocked ? 'text-slate-600' : 'text-slate-100 group-hover:text-white'}`}>
                          {module.title}
                        </h3>
                        <p className={`text-sm leading-relaxed mb-6 h-10 line-clamp-2 ${isLocked ? 'text-slate-700' : 'text-slate-400'}`}>
                          {module.description}
                        </p>

                        {/* Meta Footer */}
                        <div className={`flex items-center justify-between pt-4 border-t ${isLocked ? 'border-slate-800/30' : 'border-slate-800/80'}`}>
                          <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${isLocked ? 'opacity-50' : ''}`}>
                            <span className={`${module.difficulty === 'beginner' ? 'text-emerald-500' :
                              module.difficulty === 'intermediate' ? 'text-amber-500' : 'text-rose-500'
                              }`}>{module.difficulty}</span>
                            <span className="text-slate-800">•</span>
                            <span className="text-slate-500">{module.duration}</span>
                          </div>

                          <button
                            onClick={() => !isLocked && navigate(`/modules/${module.id}`)}
                            disabled={isLocked}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isLocked ? 'bg-slate-800/50 text-slate-700 cursor-not-allowed' :
                              isCompleted ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white' :
                                'bg-white text-slate-950 hover:scale-110 hover:bg-indigo-400 hover:text-white'
                              }`}
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    </TiltCard>
                  </div>

                  {/* Empty space for the other side */}
                  <div className="hidden md:block w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ModulesPage;
