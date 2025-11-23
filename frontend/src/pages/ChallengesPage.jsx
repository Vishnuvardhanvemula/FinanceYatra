import React, { useState, useMemo, useEffect } from 'react';
import toast from 'react-hot-toast';
import challengeService from '../services/challengeService';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { learningModules } from '../data/learningModules';
import generateWeeklyTasks from '../utils/generateWeeklyTasks';
import { IconCurrency, IconBook, IconTrophy, IconCrown, IconCheck, IconClock } from '../components/Icons';

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

  // Generate weekly tasks client-side when API is missing or empty
  // use generateWeeklyTasks util instead

  const completed = weeklyTasks.filter(t => t.done).length;
  const total = weeklyTasks.length || 1;
  const progressPct = Math.round((completed / total) * 100);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Page Header */}
      <header className="mb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="w-full lg:max-w-2xl">
            <div className="glass-card p-6 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl neo-card flex items-center justify-center text-white text-2xl font-bold" style={{background: 'linear-gradient(135deg,#12b8a2,#0ea5a3)'}} aria-hidden>
                    <IconCurrency className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-gray-50">Challenges</h1>
                  <p className="mt-2 text-gray-300">Solve daily and weekly missions, earn points, badges, and climb the leaderboard.</p>

                  <div className="mt-4 flex items-center gap-3">
                      <nav className="inline-flex bg-transparent rounded-full p-1 gap-1" role="tablist" aria-label="Challenges tabs">
                        {['daily','weekly','leaderboard'].map(key => (
                          <button
                            key={key}
                            id={`tab-${key}`}
                            role="tab"
                            aria-selected={tab===key}
                            aria-controls={`panel-${key}`}
                            onClick={() => setTab(key)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${tab===key ? 'bg-gradient-to-br from-teal-500 to-teal-400 text-white shadow-md' : 'bg-white/5 text-gray-200 hover:bg-white/10'}`}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </button>
                        ))}
                      </nav>

                    <div className="ml-4 flex items-center gap-4">
                      <div className="hidden sm:flex items-center gap-3">
                        <div className="w-20 h-20" aria-hidden>
                          <ProgressRing size={80} stroke={8} percentage={progressPct} />
                        </div>
                        <div className="text-sm text-gray-300">
                          <div className="font-semibold">Weekly Progress</div>
                          <div className="text-xs opacity-80" aria-live="polite">{completed} / {total} tasks • {progressPct}%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-72">
            <div className="neo-card p-4 rounded-2xl text-center shadow-lg">
              <div className="text-xs text-gray-300">Your Score</div>
              <div className="text-2xl font-bold text-white mt-1">665 <span className="text-sm text-gray-300">pts</span></div>
              <div className="mt-3">
                <button className="btn-gradient w-full">Claim Weekly Bonus</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Question of the Day (left) */}
        <section id="panel-daily" role="region" aria-labelledby="tab-daily" className={`${tab==='daily' || true ? 'block' : 'hidden'}`}>
          <div className="p-6 rounded-2xl glass-card shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg neo-card flex items-center justify-center text-white font-bold" style={{background: 'linear-gradient(135deg,#0ea5a3,#06b6d4)'}} aria-hidden>
                    <IconBook className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-100">Question of the Day</div>
                    <div className="text-xs text-gray-400">Quick daily question to keep you sharp</div>
                  </div>
                </div>
                <h2 className="mt-6 text-xl font-bold text-white">{dailyQuestion?.prompt || 'Question of the day will appear here'}</h2>
                <p className="text-sm text-gray-300 mt-3">{dailyQuestion?.points ? `Worth ${dailyQuestion.points} XP — choose the best answer below.` : 'Choose the best answer below.'}</p>
              </div>

              <div className="hidden sm:flex flex-col items-center">
                <div className="text-xs text-gray-400">Streak</div>
                <div className="mt-2 px-3 py-1 rounded-full bg-white/5 text-white font-semibold">0d</div>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {(dailyQuestion?.choices || []).length > 0 ? (
                (dailyQuestion.choices || []).map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedAnswer(i)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedAnswer(i); } }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={selectedAnswer === i}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 ${selectedAnswer===i ? 'bg-gradient-to-br from-teal-500 to-teal-400 text-white shadow-md transform -translate-y-0.5' : 'bg-white/3 text-gray-100 hover:bg-white/5'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border ${selectedAnswer===i ? 'bg-white border-white' : 'border-gray-400'}`} />
                      <div className="flex-1">{typeof opt === 'string' ? opt : (opt.label || opt)}</div>
                      <div className="text-xs text-gray-300">+{opt.xp || 10} XP</div>
                    </div>
                  </button>
                ))
              ) : (
                ['Equity mutual funds','Recurring deposit','Stock futures'].map((opt, i) => (
                  <button key={i} onClick={() => setSelectedAnswer(i)} className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${selectedAnswer===i ? 'bg-gradient-to-br from-teal-500 to-teal-400 text-white shadow-md transform -translate-y-0.5' : 'bg-white/3 text-gray-100 hover:bg-white/5'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border ${selectedAnswer===i ? 'bg-white border-white' : 'border-gray-400'}`} />
                      <div className="flex-1">{opt}</div>
                      <div className="text-xs text-gray-300">+10 XP</div>
                    </div>
                  </button>
                ))
              )}
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="text-sm text-gray-300">Illustration: <span className="opacity-80">📘</span></div>
              <div className="flex items-center gap-3">
                <button onClick={async () => {
                    try {
                      setLoading(true);
                      const dq = await challengeService.getDailyQuestion();
                      setDailyQuestion(dq?.question || null);
                    } catch (err) {
                      console.error('skip daily', err);
                      toast.error('Could not skip question');
                    } finally {
                      setLoading(false);
                    }
                  }} className="px-4 py-2 rounded-lg bg-white/5 text-gray-100 hover:bg-white/7">Skip</button>
                <button
                  onClick={async () => {
                    if (selectedAnswer === null) { toast.error('Select an answer first'); return; }
                    setSubmitting(true);
                    try {
                      // submit the answer string as required by backend (expecting `answer` to match the choice string)
                      const selectedChoice = (dailyQuestion?.choices || [])[selectedAnswer] ?? selectedAnswer;
                      const payload = { answer: selectedChoice, questionId: dailyQuestion?.id };
                      const res = await challengeService.submitDailyAnswer(payload);
                      // Prefer structured feedback from API when available
                      if (res?.correct === true) {
                        toast.success(res?.message || `Correct! +${res?.xp || 10} XP`);
                      } else if (res?.correct === false) {
                        toast.error(res?.message || 'Incorrect answer');
                        if (res?.explanation) {
                          toast(res.explanation, { icon: 'ℹ️' });
                        }
                      } else {
                        toast.success(res?.message || 'Answer submitted');
                      }

                      // refresh daily question and leaderboard (best effort)
                      try {
                        const dq = await challengeService.getDailyQuestion();
                        setDailyQuestion(dq?.question || null);
                        const lb = await challengeService.getLeaderboard();
                        setLeaderboard(Array.isArray(lb) ? lb : (lb?.entries || []));
                      } catch (innerErr) {
                        // ignore refresh failure
                      }
                      setSelectedAnswer(null);
                    } catch (err) {
                      console.error('submit answer', err);
                      toast.error('Failed to submit answer');
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                  disabled={submitting}
                  aria-disabled={submitting}
                  className={`px-4 py-2 rounded-lg btn-gradient ${submitting ? 'opacity-60 cursor-wait' : ''}`}>
                  {submitting ? 'Submitting…' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Weekly challenges (center) */}
        <section id="panel-weekly" role="region" aria-labelledby="tab-weekly" className="lg:col-span-1">
          <div className="p-6 rounded-2xl glass-card shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold text-white">Weekly Challenges</div>
                <div className="text-sm text-gray-300">Complete missions to earn XP & badges</div>
                {weeklyMeta?.generated && user?.isAdmin && (
                  <div className="mt-1">
                    <span className="badge-warning">Suggested Plan</span>
                  </div>
                )}
                {weeklyMeta?.generated && (
                  <div className="mt-2">
                    <button
                      disabled={publishing}
                      onClick={async () => {
                        // Confirm with user before creating a server-backed weekly plan
                        const doPublish = window.confirm('Publish this generated weekly plan to the server? This will make it visible to all users.');
                        if (!doPublish) return;
                        if (!weeklyMeta?.generated) return;
                        if (!isAuthenticated) { toast('Sign in to publish weekly plans'); navigate('/login'); return; }
                        setPublishing(true);
                        try {
                          const payload = {
                            weekId: weeklyMeta.weekId || `server-${Date.now()}`,
                            theme: weeklyMeta.title || 'Weekly Plan',
                            description: weeklyMeta.description || 'Generated weekly plan',
                            startDate: weeklyMeta.startDate || new Date().toISOString(),
                            endDate: weeklyMeta.endDate || null,
                            tasks: weeklyTasks.map(t => ({ id: t.id, title: t.title, points: t.points || t.xp || 10 }))
                          };
                          const res = await challengeService.createWeeklyChallenge(payload);
                          if (res?.success) {
                            toast.success(res.message || 'Weekly plan published');
                            // If the server created the week, update local state to use the server week
                            const created = res.week || res.weekCreated || null;
                            if (created) {
                              setWeeklyMeta(prev => ({ ...prev, weekId: created.weekId || prev.weekId, generated: false, title: created.theme || prev.title }));
                              setWeeklyTasks(Array.isArray(created.tasks) ? created.tasks : (created.tasks || created));
                              // Remove any persisted generated week from localStorage
                              try { localStorage.removeItem(`weekly_gen_${weeklyMeta.weekId}`); } catch (e) { /* ignore */ }
                            } else {
                              // fallback: refresh from API
                              const wk = await challengeService.getWeeklyChallenges();
                              if (wk) setWeeklyTasks(Array.isArray(wk.tasks) ? wk.tasks : (wk || []));
                            }
                          } else {
                            toast.error(res.message || 'Failed to publish');
                          }
                        } catch (err) {
                          console.error('publish weekly', err);
                          toast.error('Failed to publish weekly plan');
                        } finally {
                          setPublishing(false);
                        }
                      }}
                      className={`px-3 py-1 rounded-md text-sm btn-outline ${publishing ? 'opacity-60 cursor-wait' : ''}`}
                    >
                      {publishing ? 'Publishing…' : 'Publish Plan'}
                    </button>
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-400">Week • Active</div>
            </div>

            <div className="mt-6 grid gap-3" role="list" aria-label="Weekly tasks list">
              {weeklyTasks.map(task => {
                const claimed = !!(task.claimed || task.done);
                return (
                  <div key={task.id} role="listitem" className={`task-tile flex items-center justify-between p-3 rounded-xl ${claimed ? 'done' : ''}`} tabIndex={0}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 text-xl" aria-hidden>{task.icon || <IconClock className="w-5 h-5 text-white" />}</div>
                      <div>
                        <div className="font-semibold text-white">{task.title}</div>
                        <div className="text-xs text-gray-400">{claimed ? 'Completed' : 'Pending'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm text-gray-300">{task.points ?? task.xp} XP</div>
                      <button
                        onClick={async () => {
                          if (claimed) return;
                          setClaimingId(task.id);
                          try {
                            // If this week's tasks were generated client-side, perform a local claim flow
                            if (weeklyMeta?.generated && task.generated) {
                              // simulate a short network delay for UX
                              await new Promise(res => setTimeout(res, 700));
                              setWeeklyTasks(prev => prev.map(t => t.id === task.id ? { ...t, done: true } : t));
                              toast.success(`Claimed ${task.xp} XP`);
                              // persist generated tasks so they survive refresh
                              try {
                                const wkKey = `weekly_gen_${weeklyMeta.weekId}`;
                                const stored = JSON.parse(localStorage.getItem(wkKey) || 'null') || {};
                                stored.tasks = (stored.tasks || weeklyTasks).map(t => t.id === task.id ? { ...t, done: true } : t);
                                localStorage.setItem(wkKey, JSON.stringify(stored));
                              } catch (persistErr) {
                                // ignore persistence errors
                              }
                              return;
                            }

                            const weekId = weeklyMeta.weekId;
                            if (!isAuthenticated) {
                              toast('Please sign in to claim rewards');
                              navigate('/login');
                              setClaimingId(null);
                              return;
                            }
                            const res = await challengeService.claimWeeklyTask(task.id, weekId);
                            toast.success(res?.message || 'Task claimed');
                            // refresh weekly tasks and leaderboard
                            const wk = await challengeService.getWeeklyChallenges();
                            if (wk) setWeeklyTasks(Array.isArray(wk.tasks) ? wk.tasks : (wk || []));
                            const lb = await challengeService.getLeaderboard();
                            setLeaderboard(Array.isArray(lb) ? lb : (lb?.entries || []));
                          } catch (err) {
                            console.error('claim task', err);
                            toast.error('Failed to claim task');
                          } finally {
                            setClaimingId(null);
                          }
                        }}
                        disabled={claimingId === task.id}
                        aria-disabled={claimingId === task.id}
                        aria-label={claimed ? `${task.title} claimed` : `Start ${task.title}`}
                        className={`px-3 py-1 rounded-md text-sm ${claimed ? 'bg-white/6 text-gray-200' : 'btn-gradient-outline'} ${claimingId === task.id ? 'opacity-60 cursor-wait' : ''}`}
                      >
                        {claimingId === task.id ? 'Claiming…' : (claimed ? 'Claimed' : 'Start')}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6">
              <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-teal-400 to-teal-300 glow-progress" style={{width: `${progressPct}%`}} />
              </div>
            </div>
            <div className="mt-4">
              <button
                disabled={claimingAll}
                onClick={async () => {
                  if (!weeklyMeta?.weekId) { toast.error('No weekly challenge available'); return; }
                  setClaimingAll(true);
                  try {
                    // For generated weeks, we can mark all as done locally
                    if (weeklyMeta?.generated) {
                      const updated = weeklyTasks.map(t => ({ ...t, done: true }));
                      setWeeklyTasks(updated);
                      try {
                        const wkKey = `weekly_gen_${weeklyMeta.weekId}`;
                        const stored = JSON.parse(localStorage.getItem(wkKey) || 'null') || {};
                        stored.tasks = updated;
                        localStorage.setItem(wkKey, JSON.stringify(stored));
                      } catch (e) { /* ignore persist error */ }
                      toast.success('All generated weekly tasks marked completed locally — well done!');
                    } else {
                      // For server-backed weekly tasks: claim each task server-side (sequentially for safety)
                      if (!isAuthenticated) {
                        toast('Please sign in to claim weekly rewards');
                        navigate('/login');
                        setClaimingAll(false);
                        return;
                      }

                      const weekId = weeklyMeta.weekId;
                      for (const task of weeklyTasks) {
                        if (!(task.claimed || task.done)) {
                          try {
                            await challengeService.claimWeeklyTask(task.id, weekId);
                            // mark as claimed in UI
                            setWeeklyTasks(prev => prev.map(t => t.id === task.id ? ({ ...t, claimed: true }) : t));
                          } catch (err) {
                            // if a claim fails, continue claiming others but log error
                            console.warn('Claiming weekly task error', err);
                          }
                        }
                      }

                      // Refresh weekly state & leaderboard
                      const wk = await challengeService.getWeeklyChallenges();
                      if (wk) setWeeklyTasks(Array.isArray(wk.tasks) ? wk.tasks : (wk || []));
                      const lb = await challengeService.getLeaderboard();
                      setLeaderboard(Array.isArray(lb) ? lb : (lb?.entries || []));
                      toast.success('Claimed available weekly tasks — check your points');
                    }
                  } catch (err) {
                    console.error('claim all weekly', err);
                    toast.error('Failed to claim weekly tasks');
                  } finally {
                    setClaimingAll(false);
                  }
                }}
                className={`btn-gradient w-full ${claimingAll ? 'opacity-60 cursor-wait' : ''}`}
              >
                {claimingAll ? 'Claiming…' : 'Claim Weekly Bonus'}
              </button>
            </div>
          </div>
        </section>

        {/* Leaderboard (right) */}
        <aside className="lg:col-span-1">
          <div className="p-6 rounded-2xl neo-card shadow-lg overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold text-white">Leaderboard</div>
                <div className="text-sm text-gray-300">Top contributors of the week</div>
              </div>
              <div className="text-xs text-gray-400">Live</div>
            </div>

            <div className="mt-6 space-y-3" aria-live="polite" aria-atomic="true">
              {(leaderboard || []).map((u, i) => {
                const displayName = u.displayName || u.name || u.username || 'Anon';
                const points = u.points || u.totalPoints || u.pts || 0;
                return (
                <div key={u.userId || u.name || i} className={`flex items-center justify-between p-3 rounded-lg ${i===0? 'top-1' : i===1 ? 'top-2' : ''}`}> 
                  <div className="flex items-center gap-3">
                    {/* Top-3 neon badges */}
                    {i === 0 && (
                      <span className="leader-badge text-yellow-300" title="#1" aria-hidden>
                        <IconCrown className="w-4 h-4" />
                      </span>
                    )}
                    {i === 1 && (
                      <span className="leader-badge text-teal-300" title="#2" aria-hidden>
                        <IconTrophy className="w-4 h-4" />
                      </span>
                    )}
                    {i === 2 && (
                      <span className="leader-badge text-indigo-300" title="#3" aria-hidden>
                        <IconCheck className="w-4 h-4" />
                      </span>
                    )}

                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i===0? 'bg-gradient-to-br from-yellow-400 to-yellow-300 text-black' : i===1? 'bg-gradient-to-br from-teal-500 to-teal-400 text-white' : 'bg-white/5 text-gray-200'}`}>{(displayName||'U').charAt(0)}</div>
                    <div>
                      <div className="font-semibold text-white">{displayName}</div>
                      <div className="text-xs text-gray-400">{u.tagline || (i===1? 'You' : u.role || 'learner')}</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-white">{points} pts</div>
                </div>
                );
              })}
            </div>

            <div className="mt-6 text-center">
              <button onClick={() => navigate('/leaderboard')} className="px-4 py-2 btn-gradient">View Full Leaderboard</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ProgressRing({ size = 80, stroke = 8, percentage = 0 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="pg" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#12b8a2" />
        </linearGradient>
      </defs>
      <g transform={`rotate(-90 ${size/2} ${size/2})`}>
        <circle cx={size/2} cy={size/2} r={radius} stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} fill="none" />
        <circle cx={size/2} cy={size/2} r={radius} stroke="url(#pg)" strokeWidth={stroke} strokeLinecap="round" fill="none" strokeDasharray={circumference} strokeDashoffset={offset} style={{transition: 'stroke-dashoffset 0.8s ease'}} />
      </g>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="#ffffff">{percentage}%</text>
    </svg>
  );
}
