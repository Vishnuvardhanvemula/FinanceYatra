import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import GlowingRing from '../components/GlowingRing';
import SplineChart from '../components/SplineChart';
import ParticleBackground from '../components/ParticleBackground';
import RankAvatar from '../components/RankAvatar';
import RankBadge from '../components/RankBadge';
import SpotlightCard from '../components/SpotlightCard';
import AnimatedCounter from '../components/AnimatedCounter';
import MarketTicker from '../components/dashboard/MarketTicker';
import RecommendedModules from '../components/dashboard/RecommendedModules';
import MarketSentimentWidget from '../components/dashboard/MarketSentimentWidget';
import ArsenalWidget from '../components/dashboard/ArsenalWidget';
import WidgetErrorBoundary from '../components/WidgetErrorBoundary';
import { dashboardService } from '../services/dashboardService';
import { useRankSystem } from '../hooks/useRankSystem';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  Trophy,
  Target,
  TrendingUp,
  BookOpen,
  Activity,
  Zap,
  Star,
  ChevronRight,
  Medal,
  ArrowUpRight,
  Lock,
  Box,
  BarChart2
} from 'lucide-react';

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
      stiffness: 120
    }
  }
};

const DashboardPage = () => {
  const { t } = useTranslation();
  const { user, token, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [stats, setStats] = useState(null);
  const [marketData, setMarketData] = useState(null);

  const { rank, rankTier } = useRankSystem(user?.xp || 0);

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
      const [analyticsData, achievementsData, statsData, marketRes] = await Promise.all([
        dashboardService.getAnalytics(token),
        dashboardService.getAchievements(token),
        dashboardService.getStats(token),
        dashboardService.getMarketData(token)
      ]);

      if (analyticsData) setAnalytics(analyticsData);
      if (achievementsData) setAchievements(achievementsData);
      if (statsData) setStats(statsData);
      if (marketRes) setMarketData(marketRes);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load some dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Mock data for SplineChart if analytics is missing
  const activityData = analytics?.activity?.weekly?.map(d => ({ value: d.count, label: d.day })) || [
    { value: 10, label: 'Mon' }, { value: 25, label: 'Tue' }, { value: 15, label: 'Wed' },
    { value: 30, label: 'Thu' }, { value: 45, label: 'Fri' }, { value: 20, label: 'Sat' }, { value: 35, label: 'Sun' }
  ];

  // --- Rank-Based Atmosphere Logic ---
  const getAtmosphere = () => {
    // 1. Check for Equipped Shop Theme first
    const themeId = user?.equippedItems?.theme;
    if (themeId) {
      const themeMap = {
        'cyber_city': 'bg-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/50 via-slate-900 to-black',
        'neon_nights': 'bg-black bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-900/40 via-black to-slate-900',
        'golden_era': 'bg-slate-950 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-slate-950 to-black',
        'matrix_code': 'bg-[#0a0a0a] text-emerald-400',
        'deep_space': 'bg-[#020617] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-black',
      };
      if (themeMap[themeId]) return themeMap[themeId];
    }

    // 2. Fallback to Rank Defaults
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
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 rounded-full blur-[150px]" style={{ animationDelay: '2s' }} />
            {/* Deep Void Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] opacity-80"></div>
          </>
        )}
      </div>

      <div className="pt-16 relative z-20">
        <MarketTicker userRankTier={rankTier} />
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12 pt-6 relative z-10">

        {/* 1. Cinematic Profile Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.01 }}
          className={`relative w-full h-72 rounded-[2rem] overflow-hidden mb-12 border ${rank.border} shadow-2xl hover:shadow-[0_20px_80px_-15px] hover:shadow-${rankTier >= 3 ? 'amber' : 'indigo'}-500/20 group transition-all duration-700`}
        >
          {/* Banner Background (Rank Specific) - Enhanced with Animation */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className={`absolute inset-0 bg-gradient-to-r ${rankTier === 4 ? 'from-slate-950 via-purple-950/20 to-slate-950' : 'from-slate-900 via-[#0f172a] to-slate-900'} bg-[size:200%_100%]`}
          />

          {/* Holographic Strokes - Animated */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <motion.div
              animate={{ x: [-100, 100], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
              className={`absolute -top-[50%] -left-[10%] w-[50%] h-[200%] bg-gradient-to-r from-transparent ${rankTier >= 3 ? 'via-amber-500/10' : 'via-indigo-500/10'} to-transparent rotate-12 blur-3xl`}
            />
            <motion.div
              animate={{ x: [100, -100], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
              className={`absolute -bottom-[50%] -right-[10%] w-[50%] h-[200%] bg-gradient-to-r from-transparent ${rankTier >= 4 ? 'via-fuchsia-500/10' : 'via-amber-500/10'} to-transparent -rotate-12 blur-3xl`}
            />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-between px-10 md:px-16">
            <div className="flex items-center gap-8 z-10">
              {/* Avatar (Evolving) - Enhanced with Pulse */}
              <motion.div
                className="relative group/avatar"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      `0 0 20px ${rankTier >= 3 ? 'rgba(251, 191, 36, 0.2)' : 'rgba(99, 102, 241, 0.2)'}`,
                      `0 0 40px ${rankTier >= 3 ? 'rgba(251, 191, 36, 0.4)' : 'rgba(99, 102, 241, 0.4)'}`,
                      `0 0 20px ${rankTier >= 3 ? 'rgba(251, 191, 36, 0.2)' : 'rgba(99, 102, 241, 0.2)'}`
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`w-28 h-28 rounded-full p-[3px] backdrop-blur-sm transition-all duration-500 relative
                    ${user?.equippedItems?.frame === 'neon_border' ? 'bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-fuchsia-500 bg-[length:200%_100%] animate-gradient-x' :
                      user?.equippedItems?.frame === 'gold_minimal' ? 'bg-amber-400 border-2 border-amber-200' :
                        user?.equippedItems?.frame === 'stealth_ring' ? 'bg-slate-700 border border-slate-600' :
                          'bg-gradient-to-br from-white/10 to-white/5' // Default
                    }`}
                >
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-4xl font-bold text-white overflow-hidden relative">
                    {/* 3D Avatar for Tier 1+ */}
                    {rankTier > 0 ? (
                      <RankAvatar tier={rankTier} />
                    ) : (
                      user?.avatar ? <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" /> : user?.name?.charAt(0)
                    )}
                  </div>
                </motion.div>
                {/* Rank Badge Indicator */}
                <div className={`absolute bottom-1 right-1 w-8 h-8 ${rankTier === 4 ? 'bg-fuchsia-500' : 'bg-amber-500'} border-4 border-slate-950 rounded-full flex items-center justify-center shadow-lg`}>
                  <Medal size={14} className="text-black" />
                </div>
              </motion.div>

              {/* User Info */}
              <div>
                <div className="flex items-center gap-3 mb-2">

                  <RankBadge tier={rankTier} label={rank.label} />
                </div>
                <h1 className="text-4xl md:text-6xl font-medium text-white tracking-tighter mb-2">
                  {t('dashboard.greeting', { name: user?.name?.split(' ')[0] })}
                </h1>
                <p className="text-slate-400 text-sm md:text-base font-light max-w-md">
                  {rankTier === 4 ? t('dashboard.welcome_legend') : t('dashboard.welcome')}
                </p>
                <div className="flex items-center gap-3 mt-4 text-xs font-mono text-slate-500">
                  {user?.equippedItems?.theme && (
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800/50 border border-slate-700/50">
                      <Zap size={10} className="text-indigo-400" />
                      <span className="uppercase tracking-wide text-indigo-200">{user.equippedItems.theme.replace('_', ' ')}</span>
                    </div>
                  )}
                  {user?.equippedItems?.frame && (
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800/50 border border-slate-700/50">
                      <Box size={10} className="text-amber-400" />
                      <span className="uppercase tracking-wide text-amber-200">{user.equippedItems.frame.replace('_', ' ')}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side Stats (Streak & XP) */}
            <div className="hidden md:flex items-center gap-12 z-10">
              <div className="text-right group/stat" role="status" aria-label={`${t('dashboard.streak')}: ${user?.streak || 0} days`}>
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-1 group-hover/stat:text-amber-400 transition-colors">{t('dashboard.streak')}</div>
                <div className="flex items-center justify-end gap-3 text-4xl font-medium text-white tracking-tight">
                  <Zap className="text-amber-400 fill-amber-400" size={28} aria-hidden="true" />
                  <AnimatedCounter value={user?.streak || 0} />
                  <span className="text-sm font-normal text-slate-500 self-end mb-1">days</span>
                </div>
              </div>
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
              <div className="text-right group/stat" role="status" aria-label={`${t('dashboard.total_xp')}: ${user?.xp || 0}`}>
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-1 group-hover/stat:text-yellow-400 transition-colors">{t('dashboard.total_xp')}</div>
                <div className="flex items-center justify-end gap-3 text-4xl font-medium text-white tracking-tight">
                  <Star className="text-yellow-400 fill-yellow-400" size={28} aria-hidden="true" />
                  <AnimatedCounter value={user?.xp || 0} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 1.5. AI Recommendations & Daily Goal */}
        <WidgetErrorBoundary>
          <RecommendedModules />
        </WidgetErrorBoundary>

        {/* 2. Bento Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]"
        >

          {/* Block A: Learning Trajectory (Large) - 6 cols, 2 rows */}
          <motion.div variants={itemVariants} className="md:col-span-6 md:row-span-2">
            <WidgetErrorBoundary>
              <SpotlightCard className="h-full" variant={rankTier === 4 ? 'legendary' : rankTier === 3 ? 'master' : 'default'}>
                <div className="p-10 h-full flex flex-col relative overflow-hidden">
                  {/* Soft Background Glow */}
                  <div className={`absolute top-0 right-0 w-64 h-64 ${rankTier === 4 ? 'bg-fuchsia-500/10' : 'bg-indigo-500/10'} blur-[80px] rounded-full pointer-events-none`}></div>

                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div>
                      <h2 className="text-2xl font-medium text-white mb-1 tracking-tight">{t('dashboard.learning_trajectory')}</h2>
                      <p className="text-slate-400 text-xs uppercase tracking-widest">{t('dashboard.overall_progress')}</p>
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
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider">{t('dashboard.completed')}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                        <div>
                          <div className="text-2xl font-medium text-white">{analytics?.modules?.inProgressModules || 0}</div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider">{t('dashboard.active')}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                        <div>
                          <div className="text-2xl font-medium text-slate-500">{analytics?.modules?.notStartedModules || 0}</div>
                          <div className="text-[10px] text-slate-600 uppercase tracking-wider">{t('dashboard.locked')}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </WidgetErrorBoundary>
          </motion.div>

          {/* Block B: Resume Mission (Medium) - 3 cols, 2 rows */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-3 md:row-span-2"
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <WidgetErrorBoundary>
              <SpotlightCard className="h-full group cursor-pointer hover:border-amber-500/30 transition-all duration-300" onClick={() => navigate('/modules', { state: { scrollToCurrent: true } })} variant={rankTier === 4 ? 'legendary' : 'default'}>
                <div className="p-8 h-full flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute right-[-20px] bottom-[-20px] text-white/[0.02] transform rotate-12 group-hover:scale-110 transition-transform duration-500">
                    <BookOpen size={160} />
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 border border-amber-500/20">
                      <BookOpen size={20} aria-hidden="true" />
                    </div>
                    <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">{t('dashboard.resume')}</span>
                  </div>

                  <div className="mt-auto relative z-10">
                    <h3 className="text-2xl font-medium text-white mb-2 tracking-tight">{t('dashboard.continue_learning')}</h3>
                    <p className="text-sm text-slate-400 mb-8 font-light leading-relaxed">{t('dashboard.continue_desc')}</p>
                    <button
                      className="w-full py-4 bg-white text-black hover:bg-gray-200 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                      aria-label={t('dashboard.resume')}
                    >
                      {t('dashboard.resume')} <ArrowUpRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </SpotlightCard>
            </WidgetErrorBoundary>
          </motion.div>

          {/* Block C: Daily Objective (Small) - 3 cols, 2 rows */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-3 md:row-span-2"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <WidgetErrorBoundary>
              <SpotlightCard className="h-full group/daily hover:border-emerald-500/30 transition-all duration-300" variant={rankTier === 4 ? 'legendary' : 'default'}>
                <div className="p-8 h-full flex flex-col justify-between relative overflow-hidden">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-0 right-0 p-20 bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none"
                  />

                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500 border border-emerald-500/20">
                        <Target size={20} />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-mono">+50 XP</span>
                    </div>

                    <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2">{t('dashboard.daily_objective')}</div>
                    <h3 className="text-xl font-medium text-white leading-tight">{t('dashboard.complete_daily')}</h3>
                  </div>

                  <button
                    onClick={() => navigate('/challenges')}
                    className="w-full py-4 mt-4 bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all uppercase tracking-widest"
                    aria-label={t('dashboard.engage_mission')}
                  >
                    {t('dashboard.engage_mission')}
                  </button>
                </div>
              </SpotlightCard>
            </WidgetErrorBoundary>
          </motion.div>

          {/* Block D: Arsenal / Digital Vault (New) - 6 cols, 1 row */}
          <motion.div variants={itemVariants} className="md:col-span-6 md:row-span-1">
            <WidgetErrorBoundary>
              <ArsenalWidget />
            </WidgetErrorBoundary>
          </motion.div>

          {/* Block E: Recent Badges (New) - 6 cols, 1 row */}
          <motion.div variants={itemVariants} className="md:col-span-6 md:row-span-1">
            <WidgetErrorBoundary>
              <SpotlightCard className="h-full" onClick={() => navigate('/achievements')} variant={rankTier === 4 ? 'legendary' : 'default'}>
                <div className="p-8 h-full flex flex-col justify-center cursor-pointer group">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Trophy size={18} className="text-amber-400" aria-hidden="true" />
                      <h3 className="text-sm font-bold text-white uppercase tracking-widest">{t('dashboard.recent_badges')}</h3>
                    </div>
                    <ChevronRight size={18} className="text-slate-500 group-hover:text-white transition-colors" aria-hidden="true" />
                  </div>

                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {achievements?.length > 0 ? (
                      achievements.slice(0, 5).map((badge, index) => (
                        <div key={index} className="flex-shrink-0 flex flex-col items-center gap-2 group/badge">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/20 border border-amber-500/30 flex items-center justify-center group-hover/badge:scale-110 transition-transform duration-300">
                            <img src={badge.icon || "/badges/default.png"} alt={badge.name} className="w-8 h-8 object-contain" onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/5987/5987424.png'} />
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider max-w-[60px] text-center truncate">{badge.name}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-slate-500 italic w-full text-center py-4">No badges earned yet. Start a challenge!</div>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </WidgetErrorBoundary>
          </motion.div>

          {/* Block F: Market Intelligence (Expert+ Only) */}
          {rankTier >= 2 && (
            <motion.div variants={itemVariants} className="md:col-span-12 md:row-span-1">
              <WidgetErrorBoundary>
                <MarketSentimentWidget rankTier={rankTier} />
              </WidgetErrorBoundary>
            </motion.div>
          )}

          {/* Block G: AI Wealth Manager (Legendary Exclusive) */}
          {rankTier === 4 && (
            <motion.div variants={itemVariants} className="md:col-span-12 md:row-span-1">
              <WidgetErrorBoundary>
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
                        <h3 className="text-xl font-bold text-white mb-1">{t('dashboard.ai_wealth_manager')}</h3>
                        <p className="text-sm text-fuchsia-300 font-mono">{t('dashboard.system_status')}: <span className="text-emerald-400">OPTIMIZED</span></p>
                      </div>
                    </div>

                    <div className="flex gap-12 relative z-10">
                      <div className="text-right">
                        <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">{t('dashboard.portfolio_health')}</div>
                        <div className="text-2xl font-mono text-white">98.5%</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">{t('dashboard.next_move')}</div>
                        <div className="text-lg font-medium text-white bg-white/10 px-4 py-1 rounded-lg border border-white/10">
                          Rebalance Sector B
                        </div>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </WidgetErrorBoundary>
            </motion.div>
          )}

          {/* Locked Widget Placeholder (For Novice/Apprentice) */}
          {rankTier < 2 && (
            <motion.div variants={itemVariants} className="md:col-span-12 md:row-span-1 opacity-50 grayscale pointer-events-none select-none">
              <div className="h-full p-6 rounded-3xl border border-white/5 bg-white/[0.01] flex items-center justify-center gap-3" role="alert">
                <Lock size={16} className="text-slate-500" aria-hidden="true" />
                <span className="text-sm text-slate-500 font-mono uppercase tracking-widest">{t('dashboard.locked_market')}</span>
              </div>
            </motion.div>
          )}

        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
