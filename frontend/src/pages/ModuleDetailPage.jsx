/**
 * Module Detail Page
 * Shows detailed information about a module and its lessons
 */

import React, { useState, useEffect, useCallback, useMemo, useRef, lazy, Suspense } from 'react';
import { API_URL } from '../config/api';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { getModuleById, learningModules } from '../data/learningModules';
import { getLessonContent, hasLessonContent } from '../data/lessonContent';
import { ChevronLeft, ChevronRight, BookOpen, Clock, CheckCircle, Info } from 'lucide-react';
import { QuizSkeleton, ModalSkeleton } from '../components/LoadingSkeletons';

// Lazy load heavy components for better initial load performance
const LessonQuiz = lazy(() => import('../components/LessonQuiz'));
const ContentDisclaimer = lazy(() => import('../components/ContentDisclaimer'));

const ModuleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, refreshUser } = useAuth();
  const [module, setModule] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentLessonContent, setCurrentLessonContent] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const hasInitialized = useRef(false); // Track if we've loaded initial user data

  // Initialize module data
  useEffect(() => {
    const foundModule = getModuleById(id);
    if (!foundModule) {
      navigate('/modules');
      return;
    }
    setModule(foundModule);
    setSelectedLesson(0); // Select first lesson by default
    hasInitialized.current = false; // Reset on module change
  }, [id, navigate]);

  // Load user progress - only on initial load, not on subsequent user updates
  useEffect(() => {
    if (isAuthenticated && user && !hasInitialized.current) {
      const progress = user.moduleProgress?.find(m => m.moduleId === id);
      if (progress) {
        setCompletedLessons(progress.completedLessons || []);
        setIsCompleted(!!progress.completedAt);
      }
      hasInitialized.current = true; // Mark as initialized
    }
  }, [id, isAuthenticated, user]);

  // Load lesson content when lesson changes
  useEffect(() => {
    if (module && selectedLesson !== null) {
      const lessonData = getLessonContent(module.id, selectedLesson);
      setCurrentLessonContent(lessonData);
    }
  }, [module, selectedLesson]);

  // Memoize difficulty color to avoid recalculation
  const difficultyColor = useMemo(() => {
    if (!module) return 'bg-gray-100 text-gray-700 border-gray-300';
    switch (module.difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'expert':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  }, [module?.difficulty]);

  const logDailyActivity = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    
    try {
      await fetch(`${API_URL}/dashboard/log-activity`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('❌ Error logging activity:', error);
    }
  };

  const handleLessonComplete = useCallback(async (lessonIndex, skipScroll = false) => {
    if (!isAuthenticated) {
      toast.error('Sign in to track your progress!', { duration: 3000 });
      return;
    }

    try {
      // Call backend API to mark lesson complete/incomplete
      const isCompleting = !completedLessons.includes(lessonIndex);
      
      const endpoint = isCompleting 
        ? `${API_URL}/modules/${module.id}/lessons/${lessonIndex}/complete`
        : `${API_URL}/modules/${module.id}/lessons/${lessonIndex}/uncomplete`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      const result = await response.json();

      if (isCompleting) {
        setCompletedLessons([...completedLessons, lessonIndex]);
        toast.success('Lesson completed! 🎉', { duration: 2000 });
        
        // Log daily activity when lesson is completed
        await logDailyActivity();
      } else {
        setCompletedLessons(completedLessons.filter(l => l !== lessonIndex));
        toast.success('Lesson unmarked', { duration: 2000 });
      }

      // Refresh user data to update progress
      // Achievement toasts will be shown automatically by AuthContext when user data updates
      await refreshUser();
    } catch (error) {
      console.error('Error updating lesson progress:', error);
      // Update UI even if backend call fails (for demo purposes)
      if (completedLessons.includes(lessonIndex)) {
        setCompletedLessons(completedLessons.filter(l => l !== lessonIndex));
        toast.success('Lesson unmarked', { duration: 2000 });
      } else {
        setCompletedLessons([...completedLessons, lessonIndex]);
        toast.success('Lesson completed! 🎉', { duration: 2000 });
      }
    }
    
    // Scroll to top of page (unless skipScroll is true)
    if (!skipScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isAuthenticated, completedLessons, module, refreshUser]);

  const handleCompleteModule = useCallback(async () => {
    if (!isAuthenticated) {
      toast.error('Sign in to track your progress!', { duration: 3000 });
      return;
    }

    if (completedLessons.length < module.lessons) {
      toast.error(`Complete all ${module.lessons} lessons first!`, { duration: 3000 });
      return;
    }

    try {
      // Call backend API to mark module complete
      await fetch(`${API_URL}/progress/module/${module.id}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      setIsCompleted(true);
      setShowCelebration(true);
      
      // Refresh user data to update module progress in context
      // This will automatically update the ModulesPage analytics when user navigates back
      await refreshUser();
    } catch (error) {
      console.error('Error completing module:', error);
      // Still show celebration even if backend call fails (for demo purposes)
      setIsCompleted(true);
      setShowCelebration(true);
    }
  }, [isAuthenticated, completedLessons, module, refreshUser]);

  const handleCelebrationClose = useCallback(() => {
    setShowCelebration(false);
    // Redirect to modules page after celebration
    setTimeout(() => {
      navigate('/modules');
    }, 300);
  }, [navigate]);

  // Memoize progress percentage calculation
  const progressPercentage = useMemo(() => 
    module ? Math.round((completedLessons.length / module.lessons) * 100) : 0,
    [completedLessons.length, module?.lessons]
  );

  // Optimized navigation handlers
  const handlePreviousLesson = useCallback(() => {
    setSelectedLesson(prev => Math.max(0, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNextLesson = useCallback(async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to continue', { duration: 3000 });
      return;
    }

    // Store current lesson index before async operations
    const currentLesson = selectedLesson;
    const nextLesson = currentLesson + 1;
    
    // Always mark current lesson as complete (if not already)
    if (!completedLessons.includes(currentLesson)) {
      await handleLessonComplete(currentLesson, true);
    }
    
    // Move to next lesson (use stored value to avoid stale state)
    if (nextLesson < module.lessons) {
      setSelectedLesson(nextLesson);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If this was the last lesson, just show success
      toast.success('Lesson completed! 🎉', { duration: 2000 });
    }
  }, [isAuthenticated, selectedLesson, completedLessons, module?.lessons, handleLessonComplete]);

  const handleCompleteModuleAndLastLesson = useCallback(async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to complete the module', { duration: 3000 });
      return;
    }

    // Mark last lesson as complete if not already
    let updatedCompletedLessons = completedLessons;
    if (!completedLessons.includes(selectedLesson)) {
      await handleLessonComplete(selectedLesson, true);
      updatedCompletedLessons = [...completedLessons, selectedLesson];
    }
    
    // Check if all lessons are now completed
    if (updatedCompletedLessons.length < module.lessons) {
      toast.error(`Complete all ${module.lessons} lessons first! (${updatedCompletedLessons.length}/${module.lessons} completed)`, { duration: 3000 });
      return;
    }

    // Complete the module
    try {
      console.log('Completing module:', module.id);
      const response = await fetch(`${API_URL}/modules/${module.id}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      const result = await response.json();
      console.log('Module completion response:', result);
      console.log('newAchievements array:', result.newAchievements);
      console.log('newAchievements length:', result.newAchievements?.length);

      setIsCompleted(true);
      setShowCelebration(true);
      console.log('Refreshing user data...');
      // Achievement toasts will be shown automatically by AuthContext when user data updates
      await refreshUser();
      console.log('User data refreshed');
    } catch (error) {
      console.error('Error completing module:', error);
      setIsCompleted(true);
      setShowCelebration(true);
    }
  }, [isAuthenticated, selectedLesson, completedLessons, handleLessonComplete, module, refreshUser]);

  const handleLessonClick = useCallback((lessonIndex) => {
    setSelectedLesson(lessonIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <div className="text-xl text-gray-600 dark:text-gray-400">Loading module...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => navigate('/modules')}
            className="text-indigo-600 dark:text-teal-400 hover:text-indigo-700 dark:hover:text-teal-300 mb-4 flex items-center gap-2 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to All Modules</span>
          </button>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="text-5xl">{module.icon}</div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                    {module.title}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">{module.description}</p>
                </div>
              </div>

              {/* Module Meta */}
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${difficultyColor}`}>
                  {module.difficulty.charAt(0).toUpperCase() + module.difficulty.slice(1)}
                </span>
                <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <span>⏱️</span>
                  <span>{module.duration}</span>
                </span>
                <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <span>📚</span>
                  <span>{module.lessons} lessons</span>
                </span>
                {isCompleted && (
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Completed
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {isAuthenticated && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Progress: {completedLessons.length}/{module.lessons} lessons
                </span>
                <span className="text-sm font-bold text-indigo-600 dark:text-teal-400">
                  {progressPercentage}%
                </span>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-teal-500 dark:to-teal-600 transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Lesson List */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                📋 Lessons
              </h2>
              <div className="space-y-2">
                {Array.from({ length: module.lessons }, (_, i) => i).map((lessonIndex) => {
                  const isCurrentLesson = selectedLesson === lessonIndex;
                  const isLessonCompleted = completedLessons.includes(lessonIndex);
                  const topic = module.topics[lessonIndex] || `Lesson ${lessonIndex + 1}`;

                  return (
                    <div
                      key={lessonIndex}
                      onClick={() => handleLessonClick(lessonIndex)}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                        isCurrentLesson
                          ? 'bg-indigo-100 dark:bg-teal-900/30 border-2 border-indigo-400 dark:border-teal-600'
                          : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-2 border-transparent'
                      }`}
                    >
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLessonComplete(lessonIndex);
                        }}
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${
                          isLessonCompleted
                            ? 'bg-green-500 dark:bg-green-600 border-green-500 dark:border-green-600'
                            : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-teal-400'
                        }`}
                      >
                        {isLessonCompleted && (
                          <span className="text-white text-sm">✓</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-semibold ${
                          isCurrentLesson ? 'text-indigo-700 dark:text-teal-300' : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          Lesson {lessonIndex + 1}
                        </div>
                        <div className={`text-xs truncate ${
                          isCurrentLesson ? 'text-indigo-600 dark:text-teal-400' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {topic}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Content - Lesson Details */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
              {/* Lesson Header */}
              <div className="border-b dark:border-gray-700 pb-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Lesson {selectedLesson + 1}: {currentLessonContent?.title || module.topics[selectedLesson] || 'Introduction'}
                  </h2>
                  {completedLessons.includes(selectedLesson) && (
                    <svg className="w-7 h-7 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                {currentLessonContent?.subtitle && (
                  <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
                    {currentLessonContent.subtitle}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {currentLessonContent?.duration || '5 mins'}
                    </span>
                    <span>
                      Part {selectedLesson + 1} of {module.lessons} in {module.title}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowDisclaimer(true)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors text-sm font-medium border border-yellow-200 dark:border-yellow-800"
                    title="Content accuracy information"
                  >
                    <Info size={16} />
                    <span className="hidden sm:inline">Verify Info</span>
                  </button>
                </div>
              </div>

              {/* Lesson Content */}
              {currentLessonContent ? (
                <div className="prose prose-lg max-w-none">
                  {/* Learning Outcomes */}
                  {currentLessonContent.keyPoints && (
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 dark:border-indigo-600 p-4 mb-6 rounded-r-lg">
                      <p className="text-indigo-900 dark:text-indigo-300 font-semibold mb-3 flex items-center gap-2">
                        <BookOpen size={20} />
                        Key Takeaways from this Lesson:
                      </p>
                      <ul className="text-indigo-800 dark:text-indigo-400 space-y-2">
                        {currentLessonContent.keyPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle size={18} className="mt-0.5 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Main Content */}
                  <div 
                    className="lesson-content text-gray-700 dark:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: currentLessonContent.content }}
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.8'
                    }}
                  />

                  {/* Interactive Learning Prompt */}
                  <div className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 border-l-4 border-teal-500 dark:border-teal-600 p-6 my-8 rounded-r-lg">
                    <p className="text-blue-900 dark:text-blue-300 font-bold text-lg mb-3 flex items-center gap-2">
                      🎯 Ready to Practice?
                    </p>
                    <p className="text-blue-800 dark:text-blue-400 mb-4">
                      Get hands-on practice with our AI chat assistant! Ask specific questions about {currentLessonContent.title} and get personalized explanations tailored to your proficiency level.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => navigate('/chat', { state: { initialMessage: `Explain ${currentLessonContent.title} with a real-world example` } })}
                        className="bg-teal-600 dark:bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 dark:hover:bg-teal-700 transition-colors font-semibold flex items-center gap-2"
                      >
                        💬 Ask AI Tutor
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Fallback content when no detailed lesson content available */
                <div className="prose max-w-none">
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 dark:border-indigo-600 p-4 mb-6">
                    <p className="text-indigo-900 dark:text-indigo-300 font-semibold mb-2">
                      📚 In this lesson, you'll learn:
                    </p>
                    <ul className="text-indigo-800 dark:text-indigo-400 space-y-1">
                      {module.learningOutcomes.map((outcome, idx) => (
                        <li key={idx}>{outcome}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-gray-700 dark:text-gray-300 space-y-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                      Understanding {module.topics[selectedLesson]}
                    </h3>
                    
                    <p>
                      This lesson covers the essential concepts of <strong>{module.topics[selectedLesson]}</strong> as part of your journey through {module.title}.
                    </p>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-600 p-4 my-4">
                      <p className="text-yellow-900 dark:text-yellow-300 font-semibold mb-2">💡 Coming Soon:</p>
                      <p className="text-yellow-800 dark:text-yellow-400">
                        Detailed lesson content for this topic is being prepared. In the meantime, 
                        use the <strong>Chat</strong> feature to ask specific questions and get personalized explanations!
                      </p>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-600 p-4 my-6">
                      <p className="text-blue-900 dark:text-blue-300 font-semibold mb-2">🎯 Interactive Learning:</p>
                      <p className="text-blue-800 dark:text-blue-400 mb-3">
                        Get hands-on practice with our AI chat assistant! Try asking questions like:
                      </p>
                      <ul className="text-blue-800 dark:text-blue-400 space-y-1 list-disc list-inside">
                        <li>"Explain {module.topics[selectedLesson]} with an example"</li>
                        <li>"What are the benefits of {module.topics[selectedLesson]}?"</li>
                        <li>"How does {module.topics[selectedLesson]} work in India?"</li>
                      </ul>
                      <button
                        onClick={() => navigate('/chat')}
                        className="mt-4 bg-blue-500 dark:bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-teal-700 transition-colors flex items-center gap-2 group"
                      >
                        <span>Ask AI Tutor</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Interactive Quiz Section */}
              {currentLessonContent?.quiz && currentLessonContent.quiz.length > 0 && (
                <div className="mt-8">
                  <Suspense fallback={<QuizSkeleton />}>
                    <LessonQuiz 
                      key={`quiz-${id}-${selectedLesson}`}
                      quiz={currentLessonContent.quiz}
                      lessonTitle={currentLessonContent.title}
                      onComplete={(score, total) => {
                        // Optionally track quiz completion
                        const percentage = Math.round((score / total) * 100);
                        if (percentage >= 80 && !completedLessons.includes(selectedLesson)) {
                          toast.success('Great score! Consider marking this lesson as complete!', { duration: 4000 });
                        }
                      }}
                    />
                  </Suspense>
                </div>
              )}

              {/* Lesson Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t dark:border-gray-700">
                <button
                  onClick={handlePreviousLesson}
                  disabled={selectedLesson === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors group ${
                    selectedLesson === 0
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Previous Lesson</span>
                </button>

                {selectedLesson === module.lessons - 1 ? (
                  // Last lesson - Show Complete Module button
                  <button
                    onClick={handleCompleteModuleAndLastLesson}
                    disabled={!isAuthenticated || isCompleted}
                    className={`flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all shadow-lg ${
                      !isAuthenticated || isCompleted
                        ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-teal-500 dark:from-green-600 dark:to-teal-600 text-white hover:from-green-600 hover:to-teal-600 dark:hover:from-green-700 dark:hover:to-teal-700'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Module Completed
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Complete Module
                      </>
                    )}
                  </button>
                ) : (
                  // Not last lesson - Single button to complete and continue
                  <button
                    onClick={handleNextLesson}
                    disabled={!isAuthenticated}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-md group ${
                      !isAuthenticated
                        ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        : 'bg-green-500 dark:bg-green-600 text-white hover:bg-green-600 dark:hover:bg-green-700'
                    }`}
                  >
                    <span>Complete & Continue</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sign In Prompt for Guests */}
      {!isAuthenticated && (
        <div className="fixed bottom-0 left-0 right-0 bg-indigo-600 dark:bg-teal-600 text-white py-4 px-6 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <div className="font-semibold">Sign in to track your progress!</div>
              <div className="text-sm text-indigo-100 dark:text-teal-100">
                Mark lessons complete and earn achievements
              </div>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="bg-white dark:bg-gray-800 text-indigo-600 dark:text-teal-400 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      )}

      {/* Content Disclaimer Modal */}
      {showDisclaimer && (
        <Suspense fallback={<ModalSkeleton />}>
          <ContentDisclaimer onClose={() => setShowDisclaimer(false)} />
        </Suspense>
      )}

      {/* Module Completion Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center transform animate-slideUp">
            {/* Celebration Animation */}
            <div className="mb-6">
              <div className="text-8xl animate-celebration-float mb-4">🎉</div>
              <div className="flex justify-center gap-3 mb-4">
                <span className="text-4xl animate-celebration-float" style={{ animationDelay: '0.3s' }}>🏆</span>
                <span className="text-4xl animate-celebration-float" style={{ animationDelay: '0.6s' }}>✨</span>
                <span className="text-4xl animate-celebration-float" style={{ animationDelay: '0.9s' }}>🎊</span>
              </div>
            </div>

            {/* Congratulations Message */}
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Congratulations!
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
              You've completed
            </p>
            <p className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-6">
              {module?.title}
            </p>

            {/* Achievement Stats */}
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">{module?.lessons}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Lessons</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">100%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Complete</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">+50</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">XP Points</div>
                </div>
              </div>
            </div>

            {/* Motivational Message */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 italic">
              "Financial literacy is the first step to financial freedom. Keep learning!"
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleCelebrationClose}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-3 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-200 font-semibold shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Continue Learning
              </button>
              <button
                onClick={() => {
                  setShowCelebration(false);
                  navigate('/dashboard');
                }}
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleDetailPage;
