/**
 * Module Detail Page
 */

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { moduleService } from '../services/moduleService';
import LessonContentRenderer from '../components/LessonContentRenderer';
import { ChevronLeft, ChevronRight, CheckCircle, Terminal, Shield, Activity, BookOpen, XCircle, Lightbulb, Sparkles } from 'lucide-react';
import { QuizSkeleton, ModalSkeleton } from '../components/LoadingSkeletons';
import { motion, AnimatePresence } from 'framer-motion';
import CelebrationModal from '../components/CelebrationModal';
import ContentDisclaimer from '../components/ContentDisclaimer';
import { XP_VALUES } from '../config/xpConfig';

// Lazy load heavy components
const LessonQuiz = lazy(() => import('../components/LessonQuiz'));

const ModuleDetailPage = () => {
  const { id: moduleId } = useParams();
  const navigate = useNavigate();
  const { user, updateUserProgress } = useAuth();

  const [module, setModule] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [loading, setLoading] = useState(true);

  const lastModuleIdRef = React.useRef(null);

  // Effect 1: Load Module & Restore Progress
  useEffect(() => {
    if (!moduleId) {
      navigate('/modules');
      return;
    }

    const fetchModuleData = async () => {
      try {
        const response = await moduleService.getModuleById(moduleId);
        if (response.success) {
          const moduleData = response.data;
          setModule(moduleData);

          // Restore progress
          if (lastModuleIdRef.current !== moduleId) {
            lastModuleIdRef.current = moduleId;

            let startingLessonIndex = 0;
            if (user?.moduleProgress) {
              let savedProgress;
              if (Array.isArray(user.moduleProgress)) {
                savedProgress = user.moduleProgress.find(m => m.moduleId === moduleId);
              } else {
                savedProgress = user.moduleProgress[moduleId];
              }

              if (savedProgress) {
                startingLessonIndex = (savedProgress.lastCompletedLesson ?? -1) + 1;
                // Ensure index doesn't exceed available lessons
                if (moduleData.lessons && startingLessonIndex >= moduleData.lessons.length) {
                  startingLessonIndex = moduleData.lessons.length - 1;
                }
                if (startingLessonIndex > 0) {
                  toast.success(`Resuming from Phase ${startingLessonIndex + 1}`);
                }
              }
            }
            setCurrentLessonIndex(startingLessonIndex);
          }
        } else {
          toast.error('Mission not found!');
          navigate('/modules');
        }
      } catch (error) {
        console.error('Error loading module:', error);
        toast.error('Failed to load mission data');
      } finally {
        setLoading(false);
      }
    };

    fetchModuleData();
  }, [moduleId, user, navigate]);

  // Effect 2: Sync Lesson Content
  useEffect(() => {
    if (module && module.lessons && module.lessons[currentLessonIndex]) {
      setCurrentLesson(module.lessons[currentLessonIndex]);
    }
  }, [module, currentLessonIndex]);

  const handleNext = () => {
    if (currentLessonIndex < (module?.lessons || 0) - 1) {
      setCurrentLessonIndex(prev => prev + 1);
      setShowQuiz(false);
      window.scrollTo(0, 0);
    } else {
      handleModuleComplete();
    }
  };

  const handlePrev = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prev => prev - 1);
      setShowQuiz(false);
      window.scrollTo(0, 0);
    }
  };

  const handleModuleComplete = () => {
    setShowCelebration(true);
  };

  const handleQuizComplete = (score) => {
    if (score >= 70) {
      const totalQuestions = currentLesson?.quiz?.length || 5;
      const correctAnswers = Math.round((score / 100) * totalQuestions);
      let xpEarned = correctAnswers * XP_VALUES.QUIZ.PER_QUESTION;

      if (score === 100) {
        xpEarned += XP_VALUES.QUIZ.PERFECT_SCORE_BONUS;
        toast.success(`Perfect Score! +${XP_VALUES.QUIZ.PERFECT_SCORE_BONUS} XP Bonus!`, { icon: '🌟' });
      }

      toast.success(`Objective Completed! +${xpEarned} XP`);

      if (user && updateUserProgress) {
        const progressData = {
          moduleId,
          lastCompletedLesson: currentLessonIndex,
          timestamp: Date.now(),
          xpEarned,
          isCompleted: currentLessonIndex >= (module?.lessons || 0) - 1
        };
        updateUserProgress(progressData);
      }

      setShowQuiz(false);

      if (currentLessonIndex >= (module?.lessons || 0) - 1) {
        handleModuleComplete();
      } else {
        setTimeout(() => handleNext(), 500);
      }
    } else {
      toast.error(`Objective Failed (${score}% < 70% required). Review and retry!`);
    }
  };

  const handlePhaseTransition = () => {
    let isCompleted = false;
    if (user?.moduleProgress) {
      const savedProgress = Array.isArray(user.moduleProgress)
        ? user.moduleProgress.find(m => m.moduleId === moduleId)
        : user.moduleProgress[moduleId];

      if (savedProgress && savedProgress.lastCompletedLesson >= currentLessonIndex) {
        isCompleted = true;
      }
    }

    if (isCompleted) {
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-[#0f172a]/95 backdrop-blur-xl shadow-2xl rounded-2xl pointer-events-auto ring-1 ring-white/10 border border-slate-700/50 overflow-hidden transform transition-all hover:scale-[1.02]`}>
          <div className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <CheckCircle className="h-6 w-6 text-emerald-400" />
                </div>
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-bold text-white tracking-wide">
                    SECTOR SECURED
                  </p>
                  <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                    COMPLETED
                  </span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  You've already mastered this phase. Do you want to replay the challenge for practice?
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-t border-slate-700/50 bg-slate-900/50">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                setShowQuiz(true);
              }}
              className="flex-1 p-3.5 text-sm font-bold text-amber-400 hover:bg-amber-500/10 hover:text-amber-300 transition-colors flex items-center justify-center gap-2 border-r border-slate-700/50"
            >
              <Terminal className="w-4 h-4" />
              RETAKE QUIZ
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                handleNext();
              }}
              className="flex-1 p-3.5 text-sm font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              SKIP AHEAD
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ), { duration: 8000, position: 'top-center' });
    } else {
      setShowQuiz(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-cyan-400">
        <div className="flex flex-col items-center gap-4">
          <Activity className="w-12 h-12 animate-pulse" />
          <span className="font-mono text-lg tracking-widest">INITIALIZING MISSION...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Cinematic Header */}
      <header className="sticky top-0 z-40 bg-[#020617]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/modules')}
              className="p-2 hover:bg-white/5 rounded-xl transition-colors text-slate-400 hover:text-white group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-3 tracking-tight">
                <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Terminal className="w-4 h-4" />
                </div>
                {module?.title}
              </h1>
              <div className="flex items-center gap-3 text-[10px] text-slate-500 font-mono mt-1">
                <span className="tracking-widest">ID: {module?.id.toUpperCase()}</span>
                <span className="w-1 h-1 rounded-full bg-slate-700" />
                <span className="text-amber-400">SECTOR {currentLessonIndex + 1}/{module?.lessons?.length || 0}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1.5">Mission Progress</span>
              <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentLessonIndex + 1) / (module?.lessons?.length || 1)) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLessonIndex}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            {/* Cinematic Lesson Banner */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-md group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-slate-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute top-0 right-0 p-12 opacity-20 pointer-events-none">
                <Sparkles className="w-64 h-64 text-amber-400 blur-3xl" />
              </div>

              <div className="relative z-10 p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono border border-amber-500/20 tracking-wider">
                    PHASE {currentLessonIndex + 1}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-500/10 text-slate-300 text-xs font-mono border border-slate-500/20 tracking-wider">
                    {module?.difficulty.toUpperCase()}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
                  {currentLesson?.title || `Lesson ${currentLessonIndex + 1}`}
                </h2>
                <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-3xl font-light">
                  {currentLesson?.description || "Classified mission data loading..."}
                </p>
              </div>
            </div>

            {/* Content Area (Spotlight Container) */}
            <div className="grid gap-8">
              {currentLesson?.content ? (
                <div className="bg-slate-900/20 border border-white/5 rounded-2xl p-8 md:p-10 backdrop-blur-sm shadow-2xl">
                  <LessonContentRenderer content={currentLesson.content} />
                </div>
              ) : (
                <div className="bg-slate-900/20 border border-white/5 rounded-2xl p-16 text-center backdrop-blur-sm">
                  <BookOpen className="w-16 h-16 text-slate-700 mx-auto mb-6" />
                  <p className="text-slate-500 text-lg">Content for this phase is currently being decrypted.</p>
                </div>
              )}

              {/* Key Points Section */}
              {currentLesson?.keyPoints && currentLesson.keyPoints.length > 0 && (
                <div className="bg-gradient-to-br from-amber-950/20 to-slate-950/30 border border-amber-500/20 rounded-2xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="p-2.5 bg-amber-500/10 rounded-xl border border-amber-500/20">
                      <Lightbulb className="text-amber-400" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">Key Takeaways</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 relative z-10">
                    {currentLesson.keyPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-4 bg-slate-950/50 p-5 rounded-xl border border-white/5 hover:border-amber-500/30 transition-colors group">
                        <CheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={20} />
                        <span className="text-slate-300 text-base leading-relaxed font-light">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Area */}
            <div className="flex items-center justify-between pt-8 border-t border-white/5">
              <button
                onClick={handlePrev}
                disabled={currentLessonIndex === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${currentLessonIndex === 0
                  ? 'text-slate-700 cursor-not-allowed'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Previous Phase
              </button>

              <button
                onClick={handlePhaseTransition}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-900 rounded-xl font-bold shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] tracking-wide"
              >
                {currentLessonIndex === (module?.lessons?.length || 0) - 1 ? 'COMPLETE MISSION' : 'NEXT PHASE'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Modals */}
      <Suspense fallback={<ModalSkeleton />}>
        {showDisclaimer && (
          <ContentDisclaimer onClose={() => setShowDisclaimer(false)} />
        )}
      </Suspense>

      <AnimatePresence>
        {showCelebration && (
          <CelebrationModal
            onClose={() => {
              setShowCelebration(false);
              navigate('/modules');
            }}
            xpEarned={150}
            rankProgress={85}
          />
        )}
      </AnimatePresence>

      {/* Quiz Modal Overlay */}
      <AnimatePresence>
        {showQuiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-[#020617]/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="w-full max-w-2xl relative">
              <button
                onClick={() => setShowQuiz(false)}
                className="absolute -top-12 right-0 p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
              <Suspense fallback={<QuizSkeleton />}>
                <LessonQuiz
                  quiz={currentLesson?.quiz}
                  lessonTitle={currentLesson?.title}
                  onComplete={handleQuizComplete}
                />
              </Suspense>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModuleDetailPage;
