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
  MapPin,
  Landmark,
  Wallet,
  CreditCard,
  TrendingUp,
  Shield,
  PieChart,
  Zap,
  BookOpen,
  Smartphone,
  FileText,
  Percent
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

  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  const getModuleIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes('bank')) return <Landmark size={24} />;
    if (t.includes('pay') || t.includes('digital')) return <Smartphone size={24} />;
    if (t.includes('sav') || t.includes('budget')) return <Wallet size={24} />;
    if (t.includes('loan') || t.includes('debt')) return <Percent size={24} />;
    if (t.includes('credit')) return <CreditCard size={24} />;
    if (t.includes('insur')) return <Shield size={24} />;
    if (t.includes('invest') || t.includes('stock') || t.includes('market')) return <TrendingUp size={24} />;
    if (t.includes('tax')) return <FileText size={24} />;
    if (t.includes('goal') || t.includes('plan')) return <Target size={24} />;
    if (t.includes('crypto')) return <Zap size={24} />;
    if (t.includes('fund') || t.includes('asset')) return <PieChart size={24} />;
    return <BookOpen size={24} />;
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

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden font-sans selection:bg-indigo-500/30">
      <ParticleBackground />

      {/* Navbar Placeholder */}
      <div className="h-20" />

      {/* Main Content */}
      <div className="relative pt-12 pb-24 px-4 md:px-12 max-w-6xl mx-auto" ref={containerRef}>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
            <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="text-slate-400 font-medium animate-pulse tracking-widest uppercase text-sm">Initializing Mission Data...</p>
          </div>
        ) : (
          <>
            {/* HERO SECTION: Cinematic Command Center */}
            <div className="relative w-full min-h-[60vh] flex flex-col items-center justify-center overflow-hidden mb-20">
              {/* Orbital Rings Animation */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="w-[800px] h-[800px] border border-indigo-500/20 rounded-full border-dashed"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[600px] h-[600px] border border-cyan-500/20 rounded-full opacity-50"
                />
                <motion.div
                  animate={{ rotate: 180 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[400px] h-[400px] border-2 border-slate-800/50 rounded-full border-t-indigo-500/50"
                />
              </div>

              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 flex flex-col items-center text-center px-4"
              >
                {/* System Badge - Static Position */}
                <div className="mb-12 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/50 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-300 tracking-widest uppercase">
                    System Online • Grid active
                  </span>
                </div>

                {/* Main Title */}
                <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white mb-6 relative">
                  <span className="relative z-10">MISSION</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-400 animate-gradient-x pb-4 pr-4">
                    ROADMAP
                  </span>
                  {/* Decorative Elements */}
                  <Shield className="absolute -top-8 -right-8 text-slate-800/50 w-24 h-24 rotate-12 hidden md:block" />
                  <Target className="absolute -bottom-4 -left-12 text-slate-800/50 w-32 h-32 -rotate-12 hidden md:block" />
                </h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-slate-400 max-w-2xl text-lg md:text-xl leading-relaxed font-light mb-10"
                >
                  Clearance Level 1 Verified. <br className="hidden md:block" />
                  Initialize tactical financial learning protocols.
                </motion.p>

                {/* Holographic Search Bar */}
                <div className="w-full max-w-xl group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500" />
                  <div className="relative flex items-center bg-slate-950/90 backdrop-blur-xl rounded-xl border border-white/10 p-2 shadow-2xl">
                    <Search className="ml-4 text-indigo-400 shrink-0" size={24} />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search mission objectives..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent border-none py-4 px-4 text-white placeholder-slate-500 focus:ring-0 focus:outline-none text-lg tracking-wide font-medium"
                    />
                    <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-slate-900 rounded-lg border border-slate-800 mx-1">
                      <span className="text-xs font-bold text-slate-500 font-mono">CTRL + K</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="relative pl-0 md:pl-16">
              {/* Neural Beam Timeline */}
              <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-slate-800 -translate-x-1/2 rounded-full overflow-hidden">
                <motion.div
                  className="w-full bg-gradient-to-b from-indigo-500 via-cyan-400 to-indigo-500 shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                  style={{ height: '100%', scaleY, transformOrigin: 'top' }}
                />
              </div>

              <div className="space-y-16 pb-32">
                {filteredModules.map((module, index) => {
                  const { status, reason } = getModuleStatus(module.id);
                  const isLocked = status === 'locked';
                  const isCompleted = status === 'completed';
                  const isInProgress = status === 'in-progress';
                  const missionId = `0${index + 1}`.slice(-2);

                  return (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
                      className="relative flex items-center w-full group/timeline"
                    >
                      {/* Timeline Dot & Connector Wrapper */}
                      <div className="absolute left-[-2rem] md:left-[-4rem] -translate-x-1/2 flex items-center justify-center z-20">

                        {/* The Dot */}
                        <motion.div
                          whileHover={{ scale: 1.3 }}
                          className={`w-6 h-6 rounded-full box-content z-20 transition-all duration-500 relative ${isCompleted ? 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]' :
                            isInProgress ? 'bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.6)] ring-4 ring-indigo-500/20' :
                              'bg-slate-800 border-2 border-slate-600'
                            }`}
                        >
                          {isInProgress && (
                            <div className="absolute inset-0 rounded-full animate-ping bg-indigo-500 opacity-30" />
                          )}
                        </motion.div>

                        {/* Horizontal Connector Line (Desktop Only) */}
                        <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 h-0.5 bg-slate-800/80 w-8 md:w-16 -z-10 origin-left">
                          <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className={`h-full w-full origin-inherit ${isCompleted ? 'bg-gradient-to-r from-emerald-500 to-transparent' :
                              isInProgress ? 'bg-gradient-to-r from-indigo-500 to-transparent' :
                                'bg-transparent'
                              }`}
                          />
                        </div>
                      </div>

                      {/* Holographic Mission Card */}
                      <div className="w-full pl-0 md:pl-12 mt-8 md:mt-0">
                        <TiltCard
                          className={`relative group overflow-hidden rounded-3xl border transition-all duration-500 hover:-translate-y-2 ${isLocked
                            ? 'bg-slate-950/40 border-slate-800/60 backdrop-blur-[2px]'
                            : 'bg-slate-900/40 border-white/5 backdrop-blur-xl shadow-2xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] hover:border-indigo-500/30'
                            }`}
                        >
                          {/* Glow Effects */}
                          {!isLocked && (
                            <>
                              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-indigo-400/20 transition-colors duration-700" />
                              <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                            </>
                          )}

                          {/* Connection Port */}
                          <div className={`absolute top-1/2 -translate-y-1/2 w-2 h-4 rounded-r-lg border-y border-r border-slate-700 bg-slate-900 z-10 -left-[1px] ${isInProgress ? 'border-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.4)]' : ''
                            }`} />

                          <div className="relative p-5 md:p-8 z-10">
                            {/* Top Meta Hub */}
                            <div className="flex justify-between items-start mb-6">
                              <div className="flex flex-col">
                                <span className={`text-[10px] uppercase font-bold tracking-[0.2em] mb-2 ${isLocked ? 'text-slate-600' :
                                  isInProgress ? 'text-cyan-400' : 'text-slate-500'
                                  }`}>
                                  Sequence {missionId}
                                </span>
                                <h3 className={`text-2xl md:text-3xl font-bold transition-colors ${isLocked ? 'text-slate-700' : 'text-white'
                                  }`}>
                                  {module.title}
                                </h3>
                              </div>

                              <div className={`p-4 rounded-2xl border transition-all duration-500 ${isLocked ? 'bg-slate-900 border-slate-800 text-slate-700' :
                                isInProgress ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]' :
                                  isCompleted ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                                    'bg-white/5 border-white/10 text-slate-400 group-hover:bg-white/10 group-hover:text-white'
                                }`}>
                                {getModuleIcon(module.title)}
                              </div>
                            </div>

                            <p className={`text-base leading-relaxed mb-8 max-w-2xl font-light ${isLocked ? 'text-slate-700' : 'text-slate-400'}`}>
                              {module.description}
                            </p>

                            {/* Tech Spec Footer */}
                            <div className={`flex items-end justify-between pt-6 border-t ${isLocked ? 'border-slate-800/30' : 'border-white/5'}`}>
                              <div className="flex gap-6">
                                <div className="flex flex-col gap-1">
                                  <span className="text-[10px] uppercase tracking-wider text-slate-600 font-bold">Duration</span>
                                  <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
                                    <BookOpen size={12} />
                                    <span>{module.duration}</span>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <span className="text-[10px] uppercase tracking-wider text-slate-600 font-bold">Complexity</span>
                                  <div className={`flex items-center gap-1.5 text-xs font-mono uppercase ${module.difficulty === 'beginner' ? 'text-emerald-400' :
                                    module.difficulty === 'intermediate' ? 'text-amber-400' : 'text-rose-400'
                                    }`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${module.difficulty === 'beginner' ? 'bg-emerald-400' :
                                      module.difficulty === 'intermediate' ? 'bg-amber-400' : 'bg-rose-400'
                                      }`} />
                                    <span>{module.difficulty}</span>
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={() => !isLocked && navigate(`/modules/${module.id}`)}
                                disabled={isLocked}
                                className={`group/btn relative px-6 py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 overflow-hidden ${isLocked ? 'bg-slate-900 text-slate-700 cursor-not-allowed border border-slate-800' :
                                  isCompleted ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white' :
                                    'bg-white text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                                  }`}
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 -z-10" />
                                <span className="relative flex items-center gap-2">
                                  {isLocked ? (
                                    <> <Lock size={14} /> <span className="truncate max-w-[150px]">{reason || 'LOCKED'}</span> </>
                                  ) : isCompleted ? (
                                    <> <CheckCircle size={14} /> REPLAY MISSION </>
                                  ) : (
                                    <> START MISSION <ChevronRight size={14} /> </>
                                  )}
                                </span>
                              </button>
                            </div>
                          </div>
                        </TiltCard>
                      </div>

                    </motion.div>
                  );
                })}

                {/* GRAND FINALE: Classified Section - ULTIMATE EDITION */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  className="relative flex items-center w-full py-16"
                >
                  {/* Connection to previous */}
                  <div className="absolute left-4 md:left-8 top-0 h-24 w-0.5 bg-gradient-to-b from-indigo-500 to-transparent -translate-x-1/2" />

                  <div className="w-full pl-0 md:pl-12">
                    <div className="relative overflow-hidden rounded-[2rem] border border-red-500/30 bg-slate-950 text-center group cursor-pointer selection:bg-red-500/30">

                      {/* Background: Digital Noise & Hazard */}
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-slate-950 to-slate-950" />
                      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />

                      {/* Floating Data Stream Effect */}
                      <div className="absolute inset-0 opacity-10 font-mono text-[10px] text-red-500 overflow-hidden leading-none select-none pointer-events-none">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div key={i} className="whitespace-nowrap animate-marquee" style={{ animationDuration: `${10 + i}s`, opacity: Math.random() }}>
                            01010010 01000101 01010011 01010100 01010010 01001001 01000011 01010100 01000101 01000100 00100000 01000001 01010010 01000101 01000001
                          </div>
                        ))}
                      </div>

                      <div className="relative z-10 flex flex-col items-center gap-8 py-16 px-6">
                        {/* Radar Pulse Badge */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-red-500 blur-xl opacity-20 animate-pulse" />
                          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-red-950/50 border border-red-500/50 text-red-400 text-xs font-bold tracking-[0.4em] uppercase shadow-[0_0_20px_rgba(239,68,68,0.3)] backdrop-blur-md">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                            Restricted Access
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">
                            Phase II: <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-red-600">Black Ops</span>
                          </h3>
                          <p className="text-red-500/50 text-xs md:text-sm tracking-[0.5em] uppercase font-mono animate-pulse">
                            Awaiting Security Clearance
                          </p>
                        </div>

                        <div className="max-w-xl mx-auto space-y-4">
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-red-900 to-transparent" />
                          <p className="text-slate-400 font-mono text-sm leading-relaxed">
                            <span className="text-red-500">WARNING:</span> You are approaching a high-security sector. <br className="hidden md:block" />
                            Advanced algorithmic trading protocols and stealth wealth strategies ahead.
                          </p>
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-red-900 to-transparent" />
                        </div>

                        <button className="mt-8 group relative px-10 py-4 bg-transparent overflow-hidden rounded-xl transition-all hover:scale-105 active:scale-95">
                          <div className="absolute inset-0 bg-red-600/10 group-hover:bg-red-600/20 transition-all duration-300" />
                          {/* Scan Line on Button */}
                          <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50 blur-[2px] animate-[scan_2s_ease-in-out_infinite]" />
                          <div className="absolute inset-0 border border-red-500/30 rounded-xl max-w-full" />

                          {/* Corner accents */}
                          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-500 rounded-tl-sm" />
                          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-red-500 rounded-tr-sm" />
                          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-red-500 rounded-bl-sm" />
                          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-500 rounded-br-sm" />

                          <span className="relative flex items-center gap-4 text-red-500 font-bold tracking-[0.2em] group-hover:text-red-400 transition-colors uppercase text-sm">
                            <Zap size={16} className="animate-pulse" /> Request Biometric Scan
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModulesPage;
