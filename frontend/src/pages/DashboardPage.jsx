import { useState, useEffect, useMemo, useRef } from 'react';
import { API_URL } from '../config/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import GlowingRing from '../components/GlowingRing';
import SplineChart from '../components/SplineChart';
import ParticleBackground from '../components/ParticleBackground';
import RankAvatar from '../components/RankAvatar';
import RankBadge from '../components/RankBadge';
import { useRankSystem } from '../hooks/useRankSystem';
import { motion, useMotionTemplate, useMotionValue, useSpring, animate } from 'framer-motion';
import {
  Trophy,
  Target,
  TrendingUp,
  BookOpen,
  Activity,
  Zap,
  Star,
  ChevronRight,
  PieChart,
  Medal,
  ArrowUpRight,
  Lock,
  BarChart2
} from 'lucide-react';

// --- Spotlight Card Component (Local Definition for Dashboard) ---
const SpotlightCard = ({ children, className = "", onClick, variant = "default" }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  // Variant Styles
  const getBorderColor = () => {
    if (variant === "legendary") return "border-fuchsia-500/30 shadow-[0_0_15px_rgba(232,121,249,0.15)]";
    if (variant === "master") return "border-amber-500/20";
    return "border-white/10";
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden rounded-3xl border bg-white/[0.02] transition-all duration-300 ${getBorderColor()} ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${variant === 'legendary' ? 'rgba(232,121,249,0.15)' : 'rgba(255,255,255,0.1)'}, transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// --- Animated Counter Component ---
const AnimatedCounter = ({ value, duration = 2 }) => {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(0, value, {
      duration: duration,
      onUpdate: (value) => {
        node.textContent = Math.round(value).toLocaleString();
      },
      ease: "easeOut"
    });

    return () => controls.stop();
  }, [value, duration]);

  return <span ref={nodeRef} />;
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
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
      stiffness: 120,
      damping: 20
    }
  }
};

const DashboardPage = () => {
  const { user, token, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { rank, rankTier, isLegendary } = useRankSystem(); // Use rankTier
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [achievements, setAchievements] = useState(null);
  const [stats, setStats] = useState(null);

  // Memoize user progress
  const userProgressKey = useMemo(() =>
    JSON.stringify(user?.moduleProgress || []),
    [user?.moduleProgress]
  );

  useEffect(() => {
    if (authLoading) return;
    if (!user || !token) {
      navigate('/login');
      return;
    }
    fetchDashboardData();
  }, [user, token, authLoading, navigate, userProgressKey]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [analyticsRes, achievementsRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/dashboard/analytics`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/dashboard/achievements`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/dashboard/stats`, { headers: { Authorization: `Bearer ${token}` } })
      ]);

      const [analyticsData, achievementsData, statsData] = await Promise.all([
        analyticsRes.json(),
        achievementsRes.json(),
        statsRes.json()
      ]);

      if (analyticsData.success) setAnalytics(analyticsData.data);
      if (achievementsData.success) setAchievements(achievementsData.data);
      if (statsData.success) setStats(statsData.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mock data for SplineChart
  const activityData = analytics?.activity?.weekly?.map(d => ({ value: d.count, label: d.day })) || [
    { value: 10, label: 'Mon' }, { value: 25, label: 'Tue' }, { value: 15, label: 'Wed' },
    { value: 30, label: 'Thu' }, { value: 45, label: 'Fri' }, { value: 20, label: 'Sat' }, { value: 35, label: 'Sun' }
  ];

  // --- Rank-Based Atmosphere Logic ---
  const getAtmosphere = () => {
    if (rankTier === 0) return "bg-[#020617]"; // Novice: Clean Slate
    if (rankTier === 1) return "bg-[#0f172a]"; // Apprentice: Deep Blue
    if (rankTier === 2) return "bg-[#1e293b]"; // Expert: Slate
    if (rankTier === 3) return "bg-gradient-to-br from-[#0f172a] to-[#312e81]"; // Master: Indigo Gradient
    if (rankTier === 4) return "bg-black"; // Legendary: The Void
    return "bg-[#020617]";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
          <span className="text-white/50 font-medium tracking-wider text-sm">INITIALIZING...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${getAtmosphere()} text-white font-sans selection:bg-amber-500/30 selection:text-amber-100 overflow-x-hidden transition-colors duration-1000`}>

      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Background Elements (Evolving) */}
      {rankTier >= 4 && <ParticleBackground />} {/* Legendary Only */}

      <div className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000">
        {/* Novice/Apprentice: Simple Glows */}
        {rankTier < 2 && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]" />
        )}

        {/* Expert: Digital Rain / Tech Feel */}
        {rankTier === 2 && (
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        )}

        {/* Master: Golden Haze */}
        {rankTier === 3 && (
          <>
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-amber-500/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[150px]" />
          </>
        )}

        {/* Legendary: Aurora & Nebula */}
        {rankTier === 4 && (
          <>
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-900/20 rounded-full blur-[150px] animate-pulse-slow" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
            {/* Deep Void Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] opacity-80"></div>
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">

        {/* 1. Cinematic Profile Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`relative w-full h-72 rounded-[2rem] overflow-hidden mb-12 border ${rank.border} shadow-2xl group transition-all duration-700`}
        >
          {/* Banner Background (Rank Specific) */}
          <div className={`absolute inset-0 bg-gradient-to-r ${rankTier === 4 ? 'from-slate-950 via-purple-950/20 to-slate-950' : 'from-slate-900 via-[#0f172a] to-slate-900'}`}></div>

          {/* Holographic Strokes */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className={`absolute -top-[50%] -left-[10%] w-[50%] h-[200%] bg-gradient-to-r from-transparent ${rankTier >= 3 ? 'via-amber-500/10' : 'via-indigo-500/10'} to-transparent rotate-12 blur-3xl opacity-50`}></div>
            <div className={`absolute -bottom-[50%] -right-[10%] w-[50%] h-[200%] bg-gradient-to-r from-transparent ${rankTier >= 4 ? 'via-fuchsia-500/10' : 'via-amber-500/10'} to-transparent -rotate-12 blur-3xl opacity-50`}></div>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-between px-10 md:px-16">
            <div className="flex items-center gap-8 z-10">
              {/* Avatar (Evolving) */}
              <div className="relative group/avatar">
                <div className={`w-28 h-28 rounded-full bg-gradient-to-br from-white/10 to-white/5 p-[2px] backdrop-blur-sm ${rank.glow} transition-all duration-500`}>
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-4xl font-bold text-white overflow-hidden relative">
                    {/* 3D Avatar for Tier 1+ */}
                    {rankTier > 0 ? (
                      <RankAvatar tier={rankTier} />
                    ) : (
                      user?.avatar ? <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" /> : user?.name?.charAt(0)
                    )}
                  </div>
                </div>
                {/* Rank Badge Indicator */}
                <div className={`absolute bottom-1 right-1 w-8 h-8 ${rankTier === 4 ? 'bg-fuchsia-500' : 'bg-amber-500'} border-4 border-slate-950 rounded-full flex items-center justify-center shadow-lg`}>
                  <Medal size={14} className="text-black" />
                </div>
              </div>

              {/* User Info */}
              <div>
                <div className="flex items-center gap-3 mb-2">

                  <RankBadge tier={rankTier} label={rank.label} />
                </div>
                <h1 className="text-4xl md:text-6xl font-medium text-white tracking-tighter mb-2">
                  Hello, <span className={`text-transparent bg-clip-text bg-gradient-to-r ${rankTier === 4 ? 'from-white to-fuchsia-300' : 'from-white to-slate-400'} font-serif italic`}>{user?.name?.split(' ')[0]}</span>
                </h1>
                <p className="text-slate-400 text-sm md:text-base font-light max-w-md">
                  {rankTier === 4 ? "Welcome to the Void, Legend." : "Welcome back. Your financial command center is ready."}
                </p>
              </div>
            </div>

            {/* Right Side Stats (Streak & XP) */}
            <div className="hidden md:flex items-center gap-12 z-10">
              <div className="text-right group/stat">
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-1 group-hover/stat:text-amber-400 transition-colors">Current Streak</div>
                <div className="flex items-center justify-end gap-3 text-4xl font-medium text-white tracking-tight">
                  <Zap className="text-amber-400 fill-amber-400" size={28} />
                  <AnimatedCounter value={stats?.streak || 0} />
                  <span className="text-sm font-normal text-slate-500 self-end mb-1">days</span>
                </div>
              </div>
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
              <div className="text-right group/stat">
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-1 group-hover/stat:text-yellow-400 transition-colors">Total XP</div>
                <div className="flex items-center justify-end gap-3 text-4xl font-medium text-white tracking-tight">
                  <Star className="text-yellow-400 fill-yellow-400" size={28} />
                  <AnimatedCounter value={user?.xp || 0} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. Bento Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]"
        >

          {/* Block A: Learning Trajectory (Large) - 6 cols, 2 rows */}
          <motion.div variants={itemVariants} className="md:col-span-6 md:row-span-2">
            <SpotlightCard className="h-full" variant={rankTier === 4 ? 'legendary' : rankTier === 3 ? 'master' : 'default'}>
              <div className="p-10 h-full flex flex-col relative overflow-hidden">
                {/* Soft Background Glow */}
                <div className={`absolute top-0 right-0 w-64 h-64 ${rankTier === 4 ? 'bg-fuchsia-500/10' : 'bg-indigo-500/10'} blur-[80px] rounded-full pointer-events-none`}></div>

                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div>
                    <h2 className="text-2xl font-medium text-white mb-1 tracking-tight">Learning Trajectory</h2>
                    <p className="text-slate-400 text-xs uppercase tracking-widest">Overall Progress</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <Activity className="text-white/80" size={24} />
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center gap-12">
                  <div className="relative">
                    <GlowingRing
                      percentage={analytics?.modules?.completionPercentage || 0}
                      size={200}
                      strokeWidth={12}
                      color={rankTier === 4 ? "#e879f9" : "#6366f1"} // Fuchsia for Legendary
                    />
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${rankTier === 4 ? 'bg-fuchsia-500 shadow-[0_0_10px_rgba(232,121,249,0.5)]' : 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]'}`}></div>
                      <div>
                        <div className="text-2xl font-medium text-white">{analytics?.modules?.completedModules || 0}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Completed</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                      <div>
                        <div className="text-2xl font-medium text-white">{analytics?.modules?.inProgressModules || 0}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Active</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                      <div>
                        <div className="text-2xl font-medium text-slate-500">{analytics?.modules?.notStartedModules || 0}</div>
                        <div className="text-[10px] text-slate-600 uppercase tracking-wider">Locked</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Block B: Resume Mission (Medium) - 3 cols, 2 rows */}
          <motion.div variants={itemVariants} className="md:col-span-3 md:row-span-2">
            <SpotlightCard className="h-full group cursor-pointer" onClick={() => navigate('/modules', { state: { scrollToCurrent: true } })} variant={rankTier === 4 ? 'legendary' : 'default'}>
              <div className="p-8 h-full flex flex-col justify-between relative overflow-hidden">
                <div className="absolute right-[-20px] bottom-[-20px] text-white/[0.02] transform rotate-12 group-hover:scale-110 transition-transform duration-500">
                  <BookOpen size={160} />
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 border border-amber-500/20">
                    <BookOpen size={20} />
                  </div>
                  <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Resume</span>
                </div>

                <div className="mt-auto relative z-10">
                  <h3 className="text-2xl font-medium text-white mb-2 tracking-tight">Continue Learning</h3>
                  <p className="text-sm text-slate-400 mb-8 font-light leading-relaxed">Pick up where you left off in your financial journey.</p>
                  <button className="w-full py-4 bg-white text-black hover:bg-gray-200 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                    Resume <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Block C: Daily Objective (Small) - 3 cols, 2 rows */}
          <motion.div variants={itemVariants} className="md:col-span-3 md:row-span-2">
            <SpotlightCard className="h-full" variant={rankTier === 4 ? 'legendary' : 'default'}>
              <div className="p-8 h-full flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 p-20 bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none"></div>

                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500 border border-emerald-500/20">
                      <Target size={20} />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-mono">+50 XP</span>
                  </div>

                  <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2">Daily Objective</div>
                  <h3 className="text-xl font-medium text-white leading-tight">Complete Daily Challenge</h3>
                </div>

                <button
                  onClick={() => navigate('/challenges')}
                  className="w-full py-4 mt-4 bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all uppercase tracking-widest"
                >
                  Engage Mission
                </button>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Block D: Activity Log (Wide) - 6 cols, 1 row */}
          <motion.div variants={itemVariants} className="md:col-span-6 md:row-span-1">
            <SpotlightCard className="h-full" variant={rankTier === 4 ? 'legendary' : 'default'}>
              <div className="p-8 h-full flex items-center gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp size={18} className="text-indigo-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest">Weekly Activity</h3>
                  </div>
                  <div className="h-24 w-full">
                    <SplineChart data={activityData} height={100} color="#818cf8" />
                  </div>
                </div>
                <div className="w-px h-20 bg-white/10"></div>
                <div className="flex flex-col gap-6 min-w-[120px]">
                  <div className="text-center">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Study Time</div>
                    <div className="text-2xl font-medium text-white">4.2h</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Modules</div>
                    <div className="text-2xl font-medium text-white">3</div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Block E: Achievements (New) - 6 cols, 1 row */}
          <motion.div variants={itemVariants} className="md:col-span-6 md:row-span-1">
            <SpotlightCard className="h-full" onClick={() => navigate('/achievements')} variant={rankTier === 4 ? 'legendary' : 'default'}>
              <div className="p-8 h-full flex flex-col justify-center cursor-pointer group">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Trophy size={18} className="text-amber-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest">Recent Achievements</h3>
                  </div>
                  <ChevronRight size={18} className="text-slate-500 group-hover:text-white transition-colors" />
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {achievements?.achievements?.filter(a => a.isUnlocked).slice(0, 3).map((achievement, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 min-w-[160px] hover:bg-white/10 transition-colors">
                      <div className="text-3xl filter drop-shadow-md">{achievement.icon}</div>
                      <div>
                        <div className="text-xs font-bold text-white truncate max-w-[100px] mb-1">{achievement.title}</div>
                        <div className="text-[10px] text-slate-400 font-mono">+{achievement.points} XP</div>
                      </div>
                    </div>
                  ))}
                  {(!achievements?.achievements?.filter(a => a.isUnlocked).length) && (
                    <div className="text-sm text-slate-500 italic font-light">No achievements yet. Keep learning!</div>
                  )}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Block F: Market Intelligence (Expert+ Only) */}
          {rankTier >= 2 && (
            <motion.div variants={itemVariants} className="md:col-span-12 md:row-span-1">
              <SpotlightCard className="h-full" variant={rankTier === 4 ? 'legendary' : 'default'}>
                <div className="p-6 flex flex-col gap-6">
                  {/* Row 1: Standard Market Data */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                        <BarChart2 className="text-cyan-400" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Market Intelligence</h3>
                        <p className="text-xs text-cyan-400 uppercase tracking-widest">Exclusive Expert Insight</p>
                      </div>
                    </div>
                    <div className="flex gap-8 text-right">
                      <div>
                        <div className="text-xs text-slate-500 uppercase">NIFTY 50</div>
                        <div className="text-lg font-mono text-emerald-400">+1.2% ▲</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase">SENSEX</div>
                        <div className="text-lg font-mono text-emerald-400">+0.8% ▲</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase">GOLD</div>
                        <div className="text-lg font-mono text-rose-400">-0.3% ▼</div>
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Insider Signals (Legendary Only) */}
                  {rankTier === 4 && (
                    <>
                      <div className="w-full h-px bg-white/10"></div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap size={16} className="text-fuchsia-400" />
                          <span className="text-sm font-bold text-fuchsia-400 uppercase tracking-widest">Insider Signals</span>
                        </div>
                        <div className="flex gap-8">
                          <div className="flex items-center gap-3 bg-fuchsia-500/10 px-4 py-2 rounded-lg border border-fuchsia-500/20">
                            <span className="text-xs text-fuchsia-300 uppercase">Whale Alert</span>
                            <span className="text-sm font-mono text-white">BTC Accumulation</span>
                          </div>
                          <div className="flex items-center gap-3 bg-fuchsia-500/10 px-4 py-2 rounded-lg border border-fuchsia-500/20">
                            <span className="text-xs text-fuchsia-300 uppercase">Sentiment</span>
                            <span className="text-sm font-mono text-emerald-400">Extreme Greed (85)</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </SpotlightCard>
            </motion.div>
          )}

          {/* Block G: AI Wealth Manager (Legendary Exclusive) */}
          {rankTier === 4 && (
            <motion.div variants={itemVariants} className="md:col-span-12 md:row-span-1">
              <SpotlightCard className="h-full" variant="legendary">
                <div className="p-8 flex items-center justify-between relative overflow-hidden">
                  {/* Holographic Background */}
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-fuchsia-900/20 to-transparent"></div>

                  <div className="flex items-center gap-6 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 p-[1px] shadow-[0_0_20px_rgba(217,70,239,0.4)]">
                      <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-fuchsia-500 animate-pulse"></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">AI Wealth Manager</h3>
                      <p className="text-sm text-fuchsia-300 font-mono">System Status: <span className="text-emerald-400">OPTIMIZED</span></p>
                    </div>
                  </div>

                  <div className="flex gap-12 relative z-10">
                    <div className="text-right">
                      <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">Portfolio Health</div>
                      <div className="text-2xl font-mono text-white">98.5%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">Next Best Move</div>
                      <div className="text-lg font-medium text-white bg-white/10 px-4 py-1 rounded-lg border border-white/10">
                        Rebalance Sector B
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          )}

          {/* Locked Widget Placeholder (For Novice/Apprentice) */}
          {rankTier < 2 && (
            <motion.div variants={itemVariants} className="md:col-span-12 md:row-span-1 opacity-50 grayscale pointer-events-none select-none">
              <div className="h-full p-6 rounded-3xl border border-white/5 bg-white/[0.01] flex items-center justify-center gap-3">
                <Lock size={16} className="text-slate-500" />
                <span className="text-sm text-slate-500 font-mono uppercase tracking-widest">Reach Expert Rank to Unlock Market Intelligence</span>
              </div>
            </motion.div>
          )}

        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
