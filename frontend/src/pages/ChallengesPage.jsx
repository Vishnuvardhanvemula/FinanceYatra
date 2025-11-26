import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import challengeService from '../services/challengeService';
import { useAuth } from '../contexts/AuthContext';
import generateWeeklyTasks from '../utils/generateWeeklyTasks';
import {
  IconTrophy,
  IconCrown,
  IconCheck,
  IconFlame,
  IconStar,
  IconTarget,
  IconZap,
  IconRocket,
  IconChecklist,
  IconCurlyBraces,
  IconClock
} from '../components/Icons';
import { XP_VALUES } from '../config/xpConfig';

// --- Components ---

const TabButton = ({ active, onClick, children, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`relative px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 overflow-hidden ${active
      ? 'text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] border border-emerald-500/50'
      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
      }`}
  >
    {active && (
      <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-sm z-0"></div>
    )}
    <span className="relative z-10 flex items-center gap-2">
      {Icon && <Icon className={`w-4 h-4 ${active ? 'text-emerald-400' : 'text-slate-500'}`} />}
      {children}
    </span>
    {active && (
      <motion.div
        layoutId="activeTab"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_10px_#10b981]"
      />
    )}
  </button>
);

const StatCard = ({ label, value, icon: Icon, colorClass, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-slate-800/50 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4 relative overflow-hidden group"
  >
    <div className={`absolute inset-0 bg-gradient-to-r ${colorClass} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
    <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${colorClass.replace('from-', 'text-').split(' ')[0]}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">{label}</p>
      <p className="text-xl font-black text-white">{value}</p>
    </div>
  </motion.div>
);

export default function ChallengesPage() {
  const [tab, setTab] = useState('daily');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [claimingId, setClaimingId] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  // Data
  const [dailyQuestion, setDailyQuestion] = useState(null);
  const [weeklyTasks, setWeeklyTasks] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const [answeredToday, setAnsweredToday] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  // Timer Logic
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setHours(24, 0, 0, 0);
      const diff = tomorrow - now;

      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      );
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Load Data
  useEffect(() => {
    let mounted = true;
    async function loadAll() {
      setLoading(true);
      try {
        const [dq, wk, lb] = await Promise.all([
          challengeService.getDailyQuestion(),
          challengeService.getWeeklyChallenges(),
          challengeService.getLeaderboard()
        ]);

        if (!mounted) return;

        setDailyQuestion(dq?.question || null);
        setAnsweredToday(dq?.answeredToday || false);

        // Weekly Tasks Logic
        if (wk && Array.isArray(wk.tasks) && wk.tasks.length > 0) {
          setWeeklyTasks(wk.tasks);
        } else {
          // Check Local Storage for current week's tasks
          const currentWeek = getWeekNumber(new Date());
          const storageKey = `weekly_tasks_v2_${currentWeek}`; // v2 for new format
          const stored = localStorage.getItem(storageKey);

          if (stored) {
            setWeeklyTasks(JSON.parse(stored));
          } else {
            // Generate new tasks
            const newTasks = generateWeeklyTasks(5);
            setWeeklyTasks(newTasks);
            localStorage.setItem(storageKey, JSON.stringify(newTasks));
          }
        }

        setLeaderboard(Array.isArray(lb) ? lb : (lb?.entries || []));
      } catch (err) {
        console.error('Failed to load challenges', err);
        toast.error('Could not load mission data');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadAll();
    return () => { mounted = false; };
  }, []);

  // Helper: Get Week Number
  const getWeekNumber = (d) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  };

  // Derived State
  const completedTasks = weeklyTasks.filter(t => t.done || t.claimed).length;
  const totalTasks = weeklyTasks.length || 1;
  const progressPct = Math.round((completedTasks / totalTasks) * 100);

  // Handlers
  const handleDailySubmit = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to submit answers');
      navigate('/login');
      return;
    }
    if (selectedAnswer === null) { toast.error('Select an answer first'); return; }
    if (!dailyQuestion) { toast.error('No active mission loaded'); return; }

    setSubmitting(true);
    try {
      const selectedChoice = (dailyQuestion?.choices || [])[selectedAnswer] ?? selectedAnswer;
      const payload = { answer: selectedChoice, questionId: dailyQuestion?.id };
      const res = await challengeService.submitDailyAnswer(payload);

      if (res?.correct === true) {
        toast.success(res?.message || `Correct! +${res?.xp || 10} XP`, { icon: '🎉' });
        setAnsweredToday(true);
      } else if (res?.correct === false) {
        toast.error(res?.message || 'Incorrect answer');
        if (res?.explanation) toast(res.explanation, { icon: '💡' });
        setAnsweredToday(true); // Mark as answered even if wrong to enforce once-per-day
      } else {
        toast.success(res?.message || 'Answer submitted');
        setAnsweredToday(true);
      }

      // Refresh Question
      const dq = await challengeService.getDailyQuestion();
      setDailyQuestion(dq?.question || null);
      setAnsweredToday(dq?.answeredToday || true);
      setSelectedAnswer(null);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to submit answer');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClaimTask = async (task) => {
    if (task.claimed || task.done) return;
    setClaimingId(task.id);
    try {
      if (task.generated) {
        // Local task claim
        await new Promise(res => setTimeout(res, 800)); // Simulate network
        const updatedTasks = weeklyTasks.map(t => t.id === task.id ? { ...t, done: true } : t);
        setWeeklyTasks(updatedTasks);

        // Update storage
        const currentWeek = getWeekNumber(new Date());
        localStorage.setItem(`weekly_tasks_v2_${currentWeek}`, JSON.stringify(updatedTasks));

        toast.success(`Mission Complete! +${task.xp} XP`);
      } else {
        // Backend task claim
        if (!isAuthenticated) return navigate('/login');
        await challengeService.claimWeeklyTask(task.id);
        setWeeklyTasks(prev => prev.map(t => t.id === task.id ? { ...t, claimed: true } : t));
        toast.success('Reward Claimed!');
      }
    } catch (err) {
      toast.error('Failed to claim reward');
    } finally {
      setClaimingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 font-sans selection:bg-emerald-500/30">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* --- Header Section --- */}
        <header className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6 z-10">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative w-20 h-20 bg-slate-900 rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl">
                  <IconTrophy className="w-10 h-10 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
                  Mission <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Control</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-xl">
                  Complete daily ops and weekly missions to rank up.
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
              <StatCard
                label="Rank"
                value={leaderboard.findIndex(u => u.id === user?.id) !== -1 ? `#${leaderboard.findIndex(u => u.id === user?.id) + 1}` : '--'}
                icon={IconCrown}
                colorClass="from-yellow-500/20 to-amber-500/20"
                delay={0.1}
              />
              <StatCard
                label="XP"
                value={user?.points || user?.xp || 0}
                icon={IconZap}
                colorClass="from-cyan-500/20 to-blue-500/20"
                delay={0.2}
              />
              <StatCard
                label="Streak"
                value={`${user?.streak || 0} Days`}
                icon={IconFlame}
                colorClass="from-orange-500/20 to-red-500/20"
                delay={0.3}
              />
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="px-8 py-4 border-t border-white/5 bg-black/20 backdrop-blur-md flex gap-4 overflow-x-auto no-scrollbar">
            <TabButton active={tab === 'daily'} onClick={() => setTab('daily')} icon={IconTarget}>Daily Ops</TabButton>
            <TabButton active={tab === 'weekly'} onClick={() => setTab('weekly')} icon={IconChecklist}>Weekly Missions</TabButton>
            <TabButton active={tab === 'leaderboard'} onClick={() => setTab('leaderboard')} icon={IconCrown}>Hall of Fame</TabButton>
          </div>
        </header>

        {/* --- Main Content --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">

            {/* Daily Challenge */}
            <AnimatePresence mode="wait">
              {(tab === 'daily' || tab === 'all') && (
                <motion.section
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/30 to-amber-500/30 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                  <div className="relative bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                    {/* Card Header */}
                    <div className="p-6 border-b border-white/5 bg-gradient-to-r from-orange-500/10 to-transparent flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-500/20 rounded-lg border border-orange-500/30">
                          <IconCurlyBraces className="w-5 h-5 text-orange-400" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-white">Daily Operation</h2>
                          <p className="text-xs text-orange-400 font-mono uppercase tracking-wider">Priority: High</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-black/30 px-3 py-1.5 rounded-full border border-white/5">
                        <IconClock className="w-3 h-3" />
                        <span>EXPIRES IN {timeLeft}</span>
                      </div>
                    </div>

                    {/* Question Content */}
                    <div className="p-8">
                      {loading ? (
                        <div className="animate-pulse space-y-6">
                          <div className="h-8 bg-slate-800 rounded w-3/4"></div>
                          <div className="space-y-3">
                            <div className="h-16 bg-slate-800 rounded-xl w-full"></div>
                            <div className="h-16 bg-slate-800 rounded-xl w-full"></div>
                            <div className="h-16 bg-slate-800 rounded-xl w-full"></div>
                          </div>
                        </div>
                      ) : answeredToday ? (
                        <div className="text-center py-12">
                          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                            <IconCheck className="w-10 h-10 text-emerald-400" />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">Mission Accomplished</h3>
                          <p className="text-slate-400 max-w-md mx-auto mb-8">
                            You have successfully completed today's operation. Return tomorrow for new orders.
                          </p>
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg border border-white/5 text-sm font-mono text-slate-300">
                            <IconClock className="w-4 h-4 text-emerald-400" />
                            <span>NEXT MISSION: {timeLeft}</span>
                          </div>
                        </div>
                      ) : !dailyQuestion ? (
                        <div className="text-center py-12 text-slate-400">
                          <p>No active mission available.</p>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-2xl font-bold text-slate-100 mb-8 leading-relaxed">
                            {dailyQuestion.prompt}
                          </h3>

                          <div className="space-y-3 mb-8">
                            {(dailyQuestion.choices || []).map((opt, i) => (
                              <button
                                key={i}
                                onClick={() => setSelectedAnswer(i)}
                                className={`w-full text-left p-5 rounded-xl border transition-all duration-200 flex items-center gap-4 group relative overflow-hidden ${selectedAnswer === i
                                  ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                                  : 'bg-slate-800/50 border-white/5 hover:bg-slate-800 hover:border-white/20'
                                  }`}
                              >
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${selectedAnswer === i
                                  ? 'border-emerald-500 bg-emerald-500 text-white'
                                  : 'border-slate-600 group-hover:border-slate-400'
                                  }`}>
                                  {selectedAnswer === i && <div className="w-2 h-2 bg-white rounded-full" />}
                                </div>
                                <span className={`text-lg font-medium ${selectedAnswer === i ? 'text-emerald-400' : 'text-slate-300'}`}>
                                  {typeof opt === 'string' ? opt : (opt.label || opt)}
                                </span>
                              </button>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-6 border-t border-white/5">
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                              <IconStar className="w-4 h-4 text-yellow-500" />
                              <span>Reward: <span className="text-white font-bold">+{dailyQuestion.points || XP_VALUES.CHALLENGE.DAILY_EASY} XP</span></span>
                            </div>

                            <div className="flex gap-4">
                              <button className="px-6 py-2.5 text-slate-400 hover:text-white font-bold transition-colors text-sm">
                                Skip Mission
                              </button>
                              <button
                                onClick={handleDailySubmit}
                                disabled={submitting || selectedAnswer === null}
                                className={`px-8 py-2.5 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2 ${submitting || selectedAnswer === null
                                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/50 hover:shadow-emerald-900/80 hover:-translate-y-0.5'
                                  }`}
                              >
                                {submitting ? 'Verifying...' : 'Submit Solution'}
                                {!submitting && <IconRocket className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            {/* Weekly Missions */}
            <AnimatePresence mode="wait">
              {(tab === 'weekly' || tab === 'all') && (
                <motion.section
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                >
                  <div className="p-6 border-b border-white/5 bg-gradient-to-r from-blue-500/10 to-transparent flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                        <IconChecklist className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">Weekly Protocol</h2>
                        <p className="text-xs text-blue-400 font-mono uppercase tracking-wider">Status: Active</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="hidden md:block w-48">
                      <div className="flex justify-between text-[10px] font-bold uppercase mb-1 text-slate-400">
                        <span>Progress</span>
                        <span className="text-white">{progressPct}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 grid gap-4">
                    {weeklyTasks.map((task, idx) => {
                      const isDone = task.done || task.claimed;
                      return (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`group relative p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between overflow-hidden ${isDone
                            ? 'bg-slate-900/50 border-white/5 opacity-60'
                            : 'bg-slate-800/40 border-white/10 hover:border-blue-500/30 hover:bg-slate-800/80'
                            }`}
                        >
                          <div className="flex items-center gap-4 relative z-10">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-colors border ${isDone
                              ? 'bg-slate-800 border-white/5 text-slate-600'
                              : 'bg-blue-500/10 border-blue-500/20 text-blue-400 group-hover:text-blue-300'
                              }`}>
                              {isDone ? <IconCheck className="w-6 h-6" /> : (task.icon || '📋')}
                            </div>
                            <div>
                              <h4 className={`font-bold text-base ${isDone ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                                {task.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${isDone
                                  ? 'bg-slate-800 border-slate-700 text-slate-500'
                                  : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                                  }`}>
                                  +{task.xp} XP
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleClaimTask(task)}
                            disabled={isDone || claimingId === task.id}
                            className={`relative z-10 px-5 py-2 rounded-lg text-sm font-bold transition-all ${isDone
                              ? 'text-emerald-500 cursor-default'
                              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/50 active:scale-95'
                              }`}
                          >
                            {claimingId === task.id ? '...' : (isDone ? 'COMPLETED' : 'START')}
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Leaderboard */}
          <div className="lg:col-span-4 space-y-8">
            <AnimatePresence mode="wait">
              {(tab === 'leaderboard' || tab === 'all' || true) && (
                <motion.aside
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl sticky top-8"
                >
                  <div className="p-6 border-b border-white/5 bg-gradient-to-r from-purple-500/10 to-transparent">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
                        <IconCrown className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">Elite Agents</h2>
                        <p className="text-xs text-purple-400 font-mono uppercase tracking-wider">Top Performers</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    {leaderboard.length === 0 ? (
                      <div className="text-center py-12">
                        <IconTrophy className="w-16 h-16 mx-auto text-slate-700 mb-4" />
                        <h3 className="text-lg font-bold text-white mb-2">No Data Available</h3>
                        <p className="text-sm text-slate-400">Be the first to claim the top spot.</p>
                      </div>
                    ) : (
                      leaderboard.slice(0, 5).map((u, i) => (
                        <div
                          key={i}
                          className={`relative flex items-center justify-between p-3 rounded-xl border transition-all ${i === 0 ? 'bg-gradient-to-r from-yellow-500/20 to-transparent border-yellow-500/30' :
                            i === 1 ? 'bg-gradient-to-r from-slate-400/20 to-transparent border-slate-400/30' :
                              i === 2 ? 'bg-gradient-to-r from-orange-500/20 to-transparent border-orange-500/30' :
                                'bg-slate-800/30 border-white/5 hover:bg-slate-800'
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm ${i === 0 ? 'bg-yellow-500 text-black shadow-[0_0_10px_#eab308]' :
                              i === 1 ? 'bg-slate-400 text-black shadow-[0_0_10px_#94a3b8]' :
                                i === 2 ? 'bg-orange-500 text-black shadow-[0_0_10px_#f97316]' :
                                  'bg-slate-700 text-slate-400'
                              }`}>
                              {i + 1}
                            </div>
                            <div>
                              <span className="font-bold text-white text-sm block">{u.displayName || u.name || 'Agent'}</span>
                              <span className="text-[10px] text-slate-400 uppercase">{u.role || 'Recruit'}</span>
                            </div>
                          </div>
                          <div className="font-mono font-bold text-emerald-400 text-sm">
                            {u.points || 0} XP
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-4 border-t border-white/5">
                    <button
                      onClick={() => navigate('/leaderboard')}
                      className="w-full py-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      View Full Roster
                    </button>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
