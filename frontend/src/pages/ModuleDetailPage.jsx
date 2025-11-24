/**
 * Module Detail Page
 * "Mission Briefing" Aesthetic
 */

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { getModuleById } from '../data/learningModules';
import { getLessonContent } from '../data/lessonContent';
import LessonContentRenderer from '../components/LessonContentRenderer';
import { ChevronLeft, ChevronRight, CheckCircle, Terminal, Shield, Activity, BookOpen, XCircle, Lightbulb } from 'lucide-react';
import { QuizSkeleton, ModalSkeleton } from '../components/LoadingSkeletons';
import { motion, AnimatePresence } from 'framer-motion';
import CelebrationModal from '../components/CelebrationModal';
import ContentDisclaimer from '../components/ContentDisclaimer';
import { XP_VALUES } from '../config/xpConfig';

// Lazy load heavy components
const LessonQuiz = lazy(() => import('../components/LessonQuiz'));

const ModuleDetailPage = () => {
  const { id: moduleId } = useParams(); // Route uses :id, extract and rename to moduleId
  const navigate = useNavigate();
  const { user, updateUserProgress } = useAuth();

  const [module, setModule] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false); // Set to true if disclaimer is needed initially
  const [showCelebration, setShowCelebration] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load Module  Data
  useEffect(() => {
    const loadData = () => {
      setLoading(true);

      if (!moduleId) {
        console.error('[ModuleDetailPage] No moduleId provided');
        toast.error('Mission not found!');
        navigate('/modules');
        return;
      }

      const moduleData = getModuleById(moduleId);

      if (!moduleData) {
        console.error('[ModuleDetailPage] Module not found for ID:', moduleId);
        toast.error('Mission not found!');
        navigate('/modules');
        return;
      }

      setModule(moduleData);

      // Load lesson content
      const lessonData = getLessonContent(moduleId, currentLessonIndex);
      setCurrentLesson(lessonData);

      setLoading(false);
    };

    loadData();
  }, [moduleId, currentLessonIndex, navigate]);

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
    // Update user progress here
    if (user && updateUserProgress) {
      updateUserProgress(moduleId, 'completed');
    }
  };

  // ... (imports)

  const handleQuizComplete = (score) => {
    if (score >= 70) {
      // Calculate XP
      const totalQuestions = currentLesson?.quiz?.length || 5; // Default to 5 if unknown
      const correctAnswers = Math.round((score / 100) * totalQuestions);
      let xpEarned = correctAnswers * XP_VALUES.QUIZ.PER_QUESTION;

      if (score === 100) {
        xpEarned += XP_VALUES.QUIZ.PERFECT_SCORE_BONUS;
        toast.success(`Perfect Score! +${XP_VALUES.QUIZ.PERFECT_SCORE_BONUS} XP Bonus!`, { icon: '🌟' });
      }

      toast.success(`Objective Completed! +${xpEarned} XP`);

      // Pass XP to next handler if needed, or just log it for now since we don't have a direct backend call here yet
      // In a real app, we'd call updateUserProgress(moduleId, 'completed', xpEarned);

      handleNext();
    } else {
      toast.error('Objective Failed. Retrying...');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-cyan-400">
        <div className="flex flex-col items-center gap-4">
          <Activity className="w-12 h-12 animate-pulse" />
          <span className="font-mono text-lg tracking-widest">INITIALIZING MISSION...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-16 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/modules')}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-cyan-400"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-500" />
                {module?.title}
              </h1>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <span>MISSION ID: {module?.id.toUpperCase()}</span>
                <span>•</span>
                <span>SECTOR: {currentLessonIndex + 1}/{module?.lessons}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs text-slate-400 uppercase tracking-wider">Progress</span>
              <div className="w-32 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                <motion.div
                  className="h-full bg-cyan-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentLessonIndex + 1) / module?.lessons) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLessonIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Lesson Header */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono border border-cyan-500/20">
                    PHASE {currentLessonIndex + 1}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-mono border border-purple-500/20">
                    {module?.difficulty.toUpperCase()}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">{currentLesson?.title || `Lesson ${currentLessonIndex + 1}`}</h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  {currentLesson?.description || "Classified mission data loading..."}
                </p>
              </div>
            </div>

            {/* Content Area */}
            <div className="grid gap-6">
              {currentLesson?.content ? (
                <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-8">
                  <LessonContentRenderer content={currentLesson.content} />
                </div>
              ) : (
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center">
                  <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">Content for this phase is currently being decrypted.</p>
                </div>
              )}

              {/* Key Points Section */}
              {currentLesson?.keyPoints && currentLesson.keyPoints.length > 0 && (
                <div className="bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border border-cyan-500/30 rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      <Lightbulb className="text-yellow-400" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-cyan-300">Key Takeaways</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {currentLesson.keyPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-lg border border-slate-700/50 hover:border-cyan-500/30 transition-colors">
                        <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={18} />
                        <span className="text-slate-300 text-sm leading-relaxed">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Area */}
            <div className="flex items-center justify-between pt-8 border-t border-slate-800">
              <button
                onClick={handlePrev}
                disabled={currentLessonIndex === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${currentLessonIndex === 0
                  ? 'text-slate-600 cursor-not-allowed'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Previous Phase
              </button>

              <button
                onClick={() => setShowQuiz(true)}
                className="flex items-center gap-2 px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-bold shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95"
              >
                {currentLessonIndex === (module?.lessons || 0) - 1 ? 'Complete Mission' : 'Next Phase'}
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
            className="fixed inset-0 z-[110] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="w-full max-w-2xl relative">
              <button
                onClick={() => setShowQuiz(false)}
                className="absolute -top-12 right-0 p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-full transition-colors"
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
