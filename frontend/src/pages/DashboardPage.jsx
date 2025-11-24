import { useState, useEffect, useMemo } from 'react';
import { API_URL } from '../config/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import TiltCard from '../components/TiltCard';
import GlowingRing from '../components/GlowingRing';
import SplineChart from '../components/SplineChart';
import ParticleBackground from '../components/ParticleBackground'; // Import ParticleBackground
import { useRankSystem } from '../hooks/useRankSystem'; // Import Hook
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
  PieChart,
  CreditCard,
  Medal
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
      stiffness: 120,
      damping: 20
    }
  }
};

const DashboardPage = () => {
  const { user, token, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { rank, isLegendary } = useRankSystem(); // Use Hook
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B101B] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin"></div>
          <span className="text-teal-500 font-medium tracking-wider text-sm">LOADING FINANCEYATRA...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B101B] text-slate-200 font-sans selection:bg-teal-500/30 overflow-x-hidden transition-colors duration-700">

      {/* Background Elements */}
      {isLegendary && <ParticleBackground />} {/* Legendary Perk */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--fy-surface)] via-[var(--fy-bg)] to-black transition-colors duration-700"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">

        {/* 1. Cinematic Profile Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`relative w-full h-64 rounded-3xl overflow-hidden mb-10 border ${rank.border} shadow-2xl group transition-all duration-500`}
        >
          {/* Banner Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-[#0f172a] to-slate-900"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>

          {/* Holographic Strokes */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-[50%] -left-[10%] w-[50%] h-[200%] bg-gradient-to-r from-transparent via-[var(--fy-gradient-start)] to-transparent rotate-12 blur-3xl opacity-20"></div>
            <div className="absolute -bottom-[50%] -right-[10%] w-[50%] h-[200%] bg-gradient-to-r from-transparent via-[var(--fy-gradient-end)] to-transparent -rotate-12 blur-3xl opacity-20"></div>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-between px-10 md:px-16">
            <div className="flex items-center gap-8 z-10">
              {/* Avatar */}
              <div className="relative">
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-[var(--fy-gradient-start)] to-[var(--fy-gradient-end)] p-[2px] ${rank.glow}`}>
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-3xl font-bold text-white overflow-hidden">
                    {user?.avatar ? <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" /> : user?.name?.charAt(0)}
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-[var(--fy-accent)] border-4 border-slate-900 rounded-full"></div>
              </div>

              {/* User Info */}
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className={`px-2 py-0.5 rounded-full bg-white/5 border ${rank.border} ${rank.color} text-[10px] font-mono tracking-wider uppercase`}>
                    System Online
                  </span>
                  <span className={`px-2 py-0.5 rounded-full bg-white/5 border ${rank.border} ${rank.color} text-[10px] font-mono tracking-wider uppercase flex items-center gap-1`}>
                    <Medal size={10} /> {rank.label}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
                  Hello, <span className={`text-transparent bg-clip-text bg-gradient-to-r from-[var(--fy-gradient-start)] to-[var(--fy-gradient-end)]`}>{user?.name?.split(' ')[0]}</span>
                </h1>
                <p className="text-slate-400 text-sm md:text-base font-light max-w-md">
                  Welcome back to FinanceYatra. Your financial command center is ready.
                </p>
              </div>
            </div>

            {/* Right Side Stats (Streak & XP) */}
            <div className="hidden md:flex items-center gap-8 z-10">
              <div className="text-right">
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Current Streak</div>
                <div className="flex items-center justify-end gap-2 text-3xl font-bold text-white">
                  <Zap className="text-amber-400 fill-amber-400" size={24} />
                  {stats?.streak || 0}
                  <span className="text-sm font-normal text-slate-500">days</span>
                </div>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div className="text-right">
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total XP</div>
                <div className="flex items-center justify-end gap-2 text-3xl font-bold text-white">
                  <Star className="text-yellow-400 fill-yellow-400" size={24} />
                  {user?.xp || 0}
                </div>
              </div>
            </div>

            {/* Decorative Icons (Faint) */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 flex gap-8 opacity-5 pointer-events-none">
              <PieChart size={180} strokeWidth={0.5} />
            </div>
          </div>
        </motion.div>

        {/* 2. Bento Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(160px,auto)]"
        >

          {/* Block A: Learning Trajectory (Large) - 6 cols, 2 rows */}
          <motion.div variants={itemVariants} className="md:col-span-6 md:row-span-2">
            <TiltCard className={`h-full bg-slate-900/40 ${rank.border}`}>
              <div className="p-8 h-full flex flex-col relative overflow-hidden">
                {/* Soft Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--fy-gradient-start)] opacity-10 blur-[80px] rounded-full pointer-events-none"></div>

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">Learning Trajectory</h2>
                    <p className="text-slate-400 text-xs uppercase tracking-wider">Overall Progress</p>
                  </div>
                  <Activity className="text-[var(--fy-gradient-start)] opacity-80" size={24} />
                </div>

                <div className="flex-1 flex items-center justify-center gap-8">
                  <div className="relative">
                    <GlowingRing
                      percentage={analytics?.modules?.completionPercentage || 0}
                      size={180}
                      strokeWidth={16}
                      color="var(--fy-gradient-start)"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[var(--fy-gradient-start)] shadow-[0_0_8px_var(--fy-gradient-start)]"></div>
                      <div>
                        <div className="text-lg font-bold text-white">{analytics?.modules?.completedModules || 0}</div>
                        <div className="text-[10px] text-slate-500 uppercase">Completed</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[var(--fy-gradient-mid)] shadow-[0_0_8px_var(--fy-gradient-mid)]"></div>
                      <div>
                        <div className="text-lg font-bold text-white">{analytics?.modules?.inProgressModules || 0}</div>
                        <div className="text-[10px] text-slate-500 uppercase">Active</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                      <div>
                        <div className="text-lg font-bold text-slate-400">{analytics?.modules?.notStartedModules || 0}</div>
                        <div className="text-[10px] text-slate-600 uppercase">Locked</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Block B: Resume Mission (Medium) - 3 cols, 2 rows (Taller to fill gap) */}
          <motion.div variants={itemVariants} className="md:col-span-3 md:row-span-2">
            <TiltCard className="h-full group cursor-pointer" onClick={() => navigate('/modules', { state: { scrollToCurrent: true } })}>
              <div className="p-6 h-full flex flex-col justify-between relative overflow-hidden">
                <div className="absolute right-[-20px] bottom-[-20px] text-white/5 transform rotate-12 group-hover:scale-110 transition-transform duration-500">
                  <BookOpen size={140} />
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/5 rounded-lg text-[var(--fy-accent)]">
                    <BookOpen size={24} />
                  </div>
                  <span className="text-xs font-bold text-[var(--fy-accent)] uppercase tracking-wider">Resume</span>
                </div>

                <div className="mt-auto">
                  <h3 className="text-xl font-bold text-white mb-2">Continue Learning</h3>
                  <p className="text-sm text-slate-400 mb-6">Pick up where you left off in your financial journey.</p>
                  <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold text-white transition-colors flex items-center justify-center gap-2">
                    RESUME <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Block C: Daily Objective (Small) - 3 cols, 2 rows (Taller to fill gap) */}
          <motion.div variants={itemVariants} className="md:col-span-3 md:row-span-2">
            <TiltCard className="h-full">
              <div className="p-6 h-full flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 p-16 bg-[var(--fy-gradient-end)] opacity-10 blur-[50px] rounded-full pointer-events-none"></div>

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-white/5 rounded-lg text-[var(--fy-gradient-mid)]">
                      <Target size={24} />
                    </div>
                    <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[var(--fy-gradient-mid)] text-[10px] font-mono">+50 XP</span>
                  </div>

                  <div className="text-xs font-bold text-[var(--fy-gradient-mid)] uppercase tracking-wider mb-2">Daily Objective</div>
                  <h3 className="text-lg font-bold text-white leading-tight">Complete Daily Challenge</h3>
                </div>

                <button
                  onClick={() => navigate('/challenges')}
                  className="w-full py-3 mt-4 bg-gradient-to-r from-[var(--fy-gradient-start)] to-[var(--fy-gradient-end)] hover:opacity-90 text-white text-sm font-bold rounded-xl shadow-lg shadow-[var(--fy-gradient-start)]/20 transition-all"
                >
                  ENGAGE MISSION
                </button>
              </div>
            </TiltCard>
          </motion.div>

          {/* Block D: Activity Log (Wide) - 6 cols, 1 row */}
          <motion.div variants={itemVariants} className="md:col-span-6 md:row-span-1">
            <TiltCard>
              <div className="p-5 h-full flex items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={16} className="text-[var(--fy-gradient-start)]" />
                    <h3 className="text-sm font-bold text-white">Weekly Activity</h3>
                  </div>
                  <div className="h-20 w-full">
                    <SplineChart data={activityData} height={80} color="var(--fy-gradient-start)" />
                  </div>
                </div>
                <div className="w-px h-16 bg-white/5"></div>
                <div className="flex flex-col gap-3 min-w-[100px]">
                  <div className="text-center">
                    <div className="text-xs text-slate-500 uppercase">Study Time</div>
                    <div className="text-lg font-bold text-white">4.2h</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-500 uppercase">Modules</div>
                    <div className="text-lg font-bold text-white">3</div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Block E: Achievements (New) - 6 cols, 1 row */}
          <motion.div variants={itemVariants} className="md:col-span-6 md:row-span-1">
            <TiltCard className="h-full" onClick={() => navigate('/achievements')}>
              <div className="p-5 h-full flex flex-col justify-center cursor-pointer group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Trophy size={18} className="text-[var(--fy-accent)]" />
                    <h3 className="text-sm font-bold text-white">Recent Achievements</h3>
                  </div>
                  <ChevronRight size={16} className="text-slate-500 group-hover:text-white transition-colors" />
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {achievements?.achievements?.filter(a => a.isUnlocked).slice(0, 3).map((achievement, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 min-w-[140px]">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <div className="text-xs font-bold text-white truncate max-w-[80px]">{achievement.title}</div>
                        <div className="text-[10px] text-slate-400">+{achievement.points} XP</div>
                      </div>
                    </div>
                  ))}
                  {(!achievements?.achievements?.filter(a => a.isUnlocked).length) && (
                    <div className="text-xs text-slate-500 italic">No achievements yet. Keep learning!</div>
                  )}
                </div>
              </div>
            </TiltCard>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
