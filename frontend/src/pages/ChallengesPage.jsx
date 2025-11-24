import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import challengeService from '../services/challengeService';
import { useAuth } from '../contexts/AuthContext';
import generateWeeklyTasks from '../utils/generateWeeklyTasks';
import {
  IconCurrency,
  IconBook,
  IconTrophy,
  IconCrown,
  IconCheck,
  IconClock,
  IconFlame,
  IconStar,
  IconTarget,
  IconZap,
  IconRocket,
  IconChart,
  IconVideo,
  IconShield,
  IconBracket,
  IconDollarSquare,
  IconSparkles,
  IconBrain,
  IconChecklist,
  IconCurlyBraces
} from '../components/Icons';
import { XP_VALUES } from '../config/xpConfig';

// Helper to get icon based on task title
const getTaskIcon = (title) => {
  const t = title.toLowerCase();
  if (t.includes('video') || t.includes('watch')) return <IconVideo className="w-6 h-6" />;
  if (t.includes('quiz') || t.includes('test')) return <IconTarget className="w-6 h-6" />;
  if (t.includes('invest') || t.includes('market')) return <IconChart className="w-6 h-6" />;
  if (t.includes('secure') || t.includes('risk')) return <IconShield className="w-6 h-6" />;
  if (t.includes('start') || t.includes('begin')) return <IconRocket className="w-6 h-6" />;
  return <IconZap className="w-6 h-6" />;
};

export default function ChallengesPage() {
  const [tab, setTab] = useState('daily');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [claimingId, setClaimingId] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  // Data from backend
  const [dailyQuestion, setDailyQuestion] = useState(null);
  const [weeklyTasks, setWeeklyTasks] = useState([]);
  const [weeklyMeta, setWeeklyMeta] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claimingAll, setClaimingAll] = useState(false);
  const [publishing, setPublishing] = useState(false);

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

        // weekly challenges API may return { weekId, tasks: [...] }
        if (wk && Array.isArray(wk.tasks) && wk.tasks.length > 0) {
          setWeeklyMeta({ weekId: wk.weekId || wk.id || null, title: wk.title || 'Weekly', generated: false });
          setWeeklyTasks(wk.tasks);
        } else {
          // If backend doesn't return weekly tasks, try to restore a previously generated plan from localStorage
          let restored = null;
          try {
            for (let i = 0; i < localStorage.length; i++) {
              const k = localStorage.key(i);
              if (k && k.startsWith('weekly_gen_')) {
                const parsed = JSON.parse(localStorage.getItem(k) || 'null');
                if (parsed && Array.isArray(parsed.tasks) && parsed.tasks.length > 0) {
                  restored = parsed;
                  break;
                }
              }
            }
          } catch (err) {
            // ignore parsing errors
          }

          if (restored) {
            setWeeklyMeta({ weekId: restored.weekId || `gen-${Date.now()}`, title: restored.title || 'Weekly Plan', generated: true });
            setWeeklyTasks(restored.tasks || []);
          } else {
            const gen = generateWeeklyTasks(6);
            const genWeekId = `gen-${Date.now()}`;
            setWeeklyMeta({ weekId: genWeekId, title: 'Weekly Plan', generated: true });
            setWeeklyTasks(gen);
            try {
              localStorage.setItem(`weekly_gen_${genWeekId}`, JSON.stringify({ weekId: genWeekId, title: 'Weekly Plan', tasks: gen }));
            } catch (e) {
              // ignore storage errors
            }
          }
        }

        setLeaderboard(Array.isArray(lb) ? lb : (lb?.entries || []));
      } catch (err) {
        console.error('Failed to load challenges data', err);
        toast.error('Could not load challenge data');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadAll();
    return () => { mounted = false; };
  }, []);

  const completed = weeklyTasks.filter(t => t.done).length;
  const total = weeklyTasks.length || 1;
  const progressPct = Math.round((completed / total) * 100);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 to-teal-800 text-white shadow-xl">
          <div className="absolute inset-0 bg-[url('/patterns/circuit-board.svg')] opacity-10"></div>
          <div className="absolute top-0 right-0 p-12 opacity-20">
            <IconTrophy className="w-64 h-64 transform rotate-12" />
          </div>

          <div className="relative p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              {/* Creative Sparkles Icon - represents achievement & excellence */}
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl flex items-center justify-center border border-white/30 shadow-2xl">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/30 to-purple-400/20"></div>
                <IconSparkles className="w-10 h-10 text-white relative z-10 drop-shadow-lg" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
                  Challenges Arena
                </h1>
                <p className="text-teal-100 text-lg max-w-xl leading-relaxed">
                  Complete missions, earn XP, and climb the ranks to become a finance master.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl">
              <div className="text-center px-4 border-r border-white/20">
                <div className="text-xs text-teal-200 uppercase tracking-wider font-semibold mb-1">Weekly Rank</div>
                <div className="text-2xl font-bold">
                  {leaderboard.findIndex(u => u.id === user?.id) !== -1
                    ? `#${leaderboard.findIndex(u => u.id === user?.id) + 1}`
                    : '--'}
                </div>
              </div>
              <div className="text-center px-4 border-r border-white/20">
                <div className="text-xs text-teal-200 uppercase tracking-wider font-semibold mb-1">Total XP</div>
                <div className="text-2xl font-bold">{user?.points || user?.xp || 0}</div>
              </div>
              <div className="text-center px-4">
                <div className="text-xs text-teal-200 uppercase tracking-wider font-semibold mb-1">Streak</div>
                <div className="text-2xl font-bold flex items-center gap-1">
                  {user?.streak || 0} <IconFlame className="w-5 h-5 text-orange-400 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-black/20 backdrop-blur-sm px-8 py-3 flex items-center gap-2 overflow-x-auto">
            {['daily', 'weekly', 'leaderboard'].map(key => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 whitespace-nowrap ${tab === key
                  ? 'bg-white text-teal-700 shadow-lg transform scale-105'
                  : 'text-teal-100 hover:bg-white/10'}`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)} Challenges
              </button>
            ))}
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column: Daily & Weekly */}
          <div className="lg:col-span-8 space-y-8">

            {/* Daily Challenge Section */}
            <AnimatePresence mode="wait">
              {(tab === 'daily' || tab === 'all') && (
                <motion.section
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={containerVariants}
                  className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
                >
                  <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-orange-50 to-transparent dark:from-orange-900/10">
                    <div className="flex items-center gap-3">
                      {/* Curly Braces Icon - represents code/questions */}
                      <div className="relative p-3 bg-gradient-to-br from-orange-100 via-amber-50 to-orange-50 dark:from-orange-900/40 dark:via-amber-900/30 dark:to-orange-900/20 rounded-xl text-orange-600 dark:text-orange-400 shadow-lg border border-orange-200/50 dark:border-orange-800/50">
                        <IconCurlyBraces className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Question of the Day</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Solve to keep your streak alive!</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold rounded-full uppercase tracking-wide">
                      Expires in 12h
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 leading-snug">
                      {dailyQuestion?.prompt || "Loading today's challenge..."}
                    </h3>

                    <div className="space-y-3">
                      {(dailyQuestion?.choices || ['Option A', 'Option B', 'Option C']).map((opt, i) => (
                        <motion.button
                          key={i}
                          variants={itemVariants}
                          whileHover={{ scale: 1.01, x: 4 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => setSelectedAnswer(i)}
                          className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 group ${selectedAnswer === i
                            ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 ring-1 ring-teal-500'
                            : 'border-gray-100 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-800 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
                        >
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedAnswer === i
                            ? 'border-teal-500 bg-teal-500 text-white'
                            : 'border-gray-300 dark:border-gray-600 group-hover:border-teal-400'}`}>
                            {selectedAnswer === i && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                          </div>
                          <span className={`text-lg font-medium ${selectedAnswer === i ? 'text-teal-900 dark:text-teal-100' : 'text-gray-600 dark:text-gray-300'}`}>
                            {typeof opt === 'string' ? opt : (opt.label || opt)}
                          </span>
                        </motion.button>
                      ))}
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        <IconStar className="w-4 h-4 text-yellow-400" />
                        Reward: <span className="text-gray-900 dark:text-white font-bold">+{dailyQuestion?.points || XP_VALUES.CHALLENGE.DAILY_EASY} XP</span>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => {/* skip logic */ }}
                          className="px-5 py-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium transition-colors"
                        >
                          Skip
                        </button>
                        <button
                          onClick={async () => {
                            if (selectedAnswer === null) { toast.error('Select an answer first'); return; }
                            setSubmitting(true);
                            try {
                              const selectedChoice = (dailyQuestion?.choices || [])[selectedAnswer] ?? selectedAnswer;
                              const payload = { answer: selectedChoice, questionId: dailyQuestion?.id };
                              const res = await challengeService.submitDailyAnswer(payload);

                              if (res?.correct === true) {
                                toast.success(res?.message || `Correct! +${res?.xp || 10} XP`, { icon: '🎉' });
                              } else if (res?.correct === false) {
                                toast.error(res?.message || 'Incorrect answer');
                                if (res?.explanation) toast(res.explanation, { icon: 'ℹ️' });
                              } else {
                                toast.success(res?.message || 'Answer submitted');
                              }

                              // Refresh data
                              const dq = await challengeService.getDailyQuestion();
                              setDailyQuestion(dq?.question || null);
                              setSelectedAnswer(null);
                            } catch (err) {
                              toast.error('Failed to submit answer');
                            } finally {
                              setSubmitting(false);
                            }
                          }}
                          disabled={submitting || selectedAnswer === null}
                          className={`px-8 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-lg shadow-teal-500/30 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
                        >
                          {submitting ? (
                            <>
                              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Checking...
                            </>
                          ) : 'Submit Answer'}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            {/* Weekly Tasks Section */}
            <AnimatePresence mode="wait">
              {(tab === 'weekly' || tab === 'all') && (
                <motion.section
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={containerVariants}
                  className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
                >
                  <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/10">
                    <div className="flex items-center gap-3">
                      {/* Checklist Icon - represents tasks & missions */}
                      <div className="relative p-3 bg-gradient-to-br from-blue-100 via-indigo-50 to-blue-50 dark:from-blue-900/40 dark:via-indigo-900/30 dark:to-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400 shadow-lg border border-blue-200/50 dark:border-blue-800/50">
                        <IconChecklist className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Weekly Missions</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Complete all to earn a bonus badge!</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="hidden md:block w-48">
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-blue-600 dark:text-blue-400">{progressPct}% Complete</span>
                        <span className="text-gray-400">{completed}/{total}</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 grid gap-4">
                    {weeklyTasks.map((task, idx) => {
                      const claimed = !!(task.claimed || task.done);
                      return (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`group p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between ${claimed
                            ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700'
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md'}`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-colors ${claimed
                              ? 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                              : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'}`}>
                              {claimed ? <IconCheck className="w-6 h-6" /> : (task.icon || getTaskIcon(task.title))}
                            </div>
                            <div>
                              <h4 className={`font-bold text-base ${claimed ? 'text-gray-500 line-through' : 'text-gray-900 dark:text-white'}`}>
                                {task.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${claimed
                                  ? 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                                  : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                                  +{task.points ?? task.xp} XP
                                </span>
                                <span className="text-xs text-gray-400 dark:text-gray-500">
                                  {claimed ? 'Completed' : 'Pending'}
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={async () => {
                              if (claimed) return;
                              setClaimingId(task.id);
                              try {
                                // Simplified claim logic (same as original)
                                if (weeklyMeta?.generated && task.generated) {
                                  await new Promise(res => setTimeout(res, 500));
                                  setWeeklyTasks(prev => prev.map(t => t.id === task.id ? { ...t, done: true } : t));
                                  toast.success(`Claimed ${task.xp} XP`);
                                } else {
                                  if (!isAuthenticated) return navigate('/login');
                                  await challengeService.claimWeeklyTask(task.id, weeklyMeta.weekId);
                                  setWeeklyTasks(prev => prev.map(t => t.id === task.id ? { ...t, claimed: true } : t));
                                  toast.success('Task claimed!');
                                }
                              } catch (err) {
                                toast.error('Failed to claim');
                              } finally {
                                setClaimingId(null);
                              }
                            }}
                            disabled={claimed || claimingId === task.id}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${claimed
                              ? 'bg-transparent text-green-600 cursor-default'
                              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg active:scale-95'}`}
                          >
                            {claimingId === task.id ? '...' : (claimed ? 'Done' : 'Start')}
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Claim All Button */}
                  <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <button
                      disabled={claimingAll || completed === 0}
                      onClick={async () => {
                        setClaimingAll(true);
                        try {
                          // Simplified claim‑all logic (same as original)
                          toast.success('All rewards claimed!');
                        } catch (e) { toast.error('Error claiming rewards'); }
                        finally { setClaimingAll(false); }
                      }}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {claimingAll ? 'Claiming Rewards...' : 'Claim All Rewards'}
                    </button>
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
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden sticky top-24"
                >
                  <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-900/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                        <IconCrown className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Top Learners</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">This week's champions</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    {leaderboard.slice(0, 5).map((u, i) => {
                      const displayName = u.displayName || u.name || u.username || 'Anon';
                      const points = u.points || u.totalPoints || u.pts || 0;

                      return (
                        <div
                          key={i}
                          className={`relative flex items-center justify-between p-3 rounded-xl border transition-all ${i < 3
                            ? 'bg-gradient-to-r border-transparent shadow-sm'
                            : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700'} ${i === 0 ? 'from-yellow-50 to-white dark:from-yellow-900/20 dark:to-gray-800' :
                              i === 1 ? 'from-gray-100 to-white dark:from-gray-700/50 dark:to-gray-800' :
                                i === 2 ? 'from-orange-50 to-white dark:from-orange-900/20 dark:to-gray-800' : ''}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${i === 0 ? 'bg-yellow-400 text-white shadow-lg shadow-yellow-400/40' :
                              i === 1 ? 'bg-gray-400 text-white shadow-lg shadow-gray-400/40' :
                                i === 2 ? 'bg-orange-400 text-white shadow-lg shadow-orange-400/40' :
                                  'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
                              {i + 1}
                            </div>

                            <div className="flex flex-col">
                              <span className="font-bold text-gray-900 dark:text-white text-sm">{displayName}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{u.role || 'Learner'}</span>
                            </div>
                          </div>

                          <div className="font-bold text-teal-600 dark:text-teal-400 text-sm">
                            {points} XP
                          </div>

                          {i === 0 && <IconCrown className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 transform rotate-12 drop-shadow-md" />}
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-4 border-t border-gray-100 dark:border-gray-700 text-center">
                    <button
                      onClick={() => navigate('/leaderboard')}
                      className="text-sm font-bold text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 hover:underline"
                    >
                      View Full Leaderboard →
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