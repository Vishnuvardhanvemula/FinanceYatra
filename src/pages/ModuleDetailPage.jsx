/**
 * Module Detail Page
 * Shows detailed information about a module and its lessons
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { getModuleById, learningModules } from '../data/learningModules';

const ModuleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [module, setModule] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const foundModule = getModuleById(id);
    if (!foundModule) {
      navigate('/modules');
      return;
    }
    setModule(foundModule);
    setSelectedLesson(0); // Select first lesson by default

    // Load user progress if authenticated
    if (isAuthenticated && user) {
      // TODO: Fetch from backend API
      const progress = user.moduleProgress?.find(m => m.moduleId === id);
      if (progress) {
        setCompletedLessons(progress.completedLessons || []);
        setIsCompleted(!!progress.completedAt);
      }
    }
  }, [id, isAuthenticated, user, navigate]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'expert':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const handleLessonComplete = async (lessonIndex) => {
    if (!isAuthenticated) {
      toast.error('Sign in to track your progress!', { duration: 3000 });
      return;
    }

    // TODO: Call backend API to mark lesson complete
    if (completedLessons.includes(lessonIndex)) {
      setCompletedLessons(completedLessons.filter(l => l !== lessonIndex));
      toast.success('Lesson unmarked', { duration: 2000 });
    } else {
      setCompletedLessons([...completedLessons, lessonIndex]);
      toast.success('Lesson completed! 🎉', { duration: 2000 });
    }
  };

  const handleModuleComplete = async () => {
    if (!isAuthenticated) {
      toast.error('Sign in to track your progress!', { duration: 3000 });
      return;
    }

    if (completedLessons.length < module.lessons) {
      toast.error(`Complete all ${module.lessons} lessons first!`, { duration: 3000 });
      return;
    }

    // TODO: Call backend API to mark module complete
    setIsCompleted(true);
    toast.success('🎉 Congratulations! Module completed!', { duration: 4000 });
  };

  const progressPercentage = module 
    ? Math.round((completedLessons.length / module.lessons) * 100)
    : 0;

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <div className="text-xl text-gray-600">Loading module...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => navigate('/modules')}
            className="text-indigo-600 hover:text-indigo-700 mb-4 flex items-center gap-2"
          >
            ← Back to All Modules
          </button>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="text-5xl">{module.icon}</div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    {module.title}
                  </h1>
                  <p className="text-gray-600 mt-1">{module.description}</p>
                </div>
              </div>

              {/* Module Meta */}
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getDifficultyColor(module.difficulty)}`}>
                  {module.difficulty.charAt(0).toUpperCase() + module.difficulty.slice(1)}
                </span>
                <span className="text-gray-600 flex items-center gap-2">
                  <span>⏱️</span>
                  <span>{module.duration}</span>
                </span>
                <span className="text-gray-600 flex items-center gap-2">
                  <span>📚</span>
                  <span>{module.lessons} lessons</span>
                </span>
                {isCompleted && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    ✅ Completed
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {isAuthenticated && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-600">
                  Progress: {completedLessons.length}/{module.lessons} lessons
                </span>
                <span className="text-sm font-bold text-indigo-600">
                  {progressPercentage}%
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
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
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
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
                      onClick={() => setSelectedLesson(lessonIndex)}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                        isCurrentLesson
                          ? 'bg-indigo-100 border-2 border-indigo-400'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                      }`}
                    >
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLessonComplete(lessonIndex);
                        }}
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${
                          isLessonCompleted
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-300 hover:border-indigo-400'
                        }`}
                      >
                        {isLessonCompleted && (
                          <span className="text-white text-sm">✓</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-semibold ${
                          isCurrentLesson ? 'text-indigo-700' : 'text-gray-700'
                        }`}>
                          Lesson {lessonIndex + 1}
                        </div>
                        <div className={`text-xs truncate ${
                          isCurrentLesson ? 'text-indigo-600' : 'text-gray-500'
                        }`}>
                          {topic}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Complete Module Button */}
              {isAuthenticated && (
                <button
                  onClick={handleModuleComplete}
                  disabled={completedLessons.length < module.lessons || isCompleted}
                  className={`w-full mt-6 py-3 rounded-lg font-semibold transition-all ${
                    completedLessons.length < module.lessons || isCompleted
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {isCompleted ? '✅ Module Completed' : '🎉 Complete Module'}
                </button>
              )}
            </div>
          </div>

          {/* Right Content - Lesson Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8">
              {/* Lesson Header */}
              <div className="border-b pb-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Lesson {selectedLesson + 1}: {module.topics[selectedLesson] || 'Introduction'}
                  </h2>
                  {completedLessons.includes(selectedLesson) && (
                    <span className="text-2xl">✅</span>
                  )}
                </div>
                <p className="text-gray-600">
                  Part {selectedLesson + 1} of {module.lessons} in {module.title}
                </p>
              </div>

              {/* Lesson Content */}
              <div className="prose max-w-none">
                <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-6">
                  <p className="text-indigo-900 font-semibold mb-2">
                    📚 In this lesson, you'll learn:
                  </p>
                  <ul className="text-indigo-800 space-y-1">
                    {module.learningOutcomes.map((outcome, idx) => (
                      <li key={idx}>{outcome}</li>
                    ))}
                  </ul>
                </div>

                {/* Main Content Area */}
                <div className="text-gray-700 space-y-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    Understanding {module.topics[selectedLesson]}
                  </h3>
                  
                  <p>
                    This lesson covers the essential concepts of <strong>{module.topics[selectedLesson]}</strong> as part of your journey through {module.title}.
                  </p>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
                    <p className="text-yellow-900 font-semibold mb-2">💡 Pro Tip:</p>
                    <p className="text-yellow-800">
                      To get the most personalized learning experience with detailed explanations about {module.topics[selectedLesson]}, 
                      use the <strong>Chat</strong> feature and ask specific questions. Our AI tutor will provide answers 
                      tailored to your proficiency level!
                    </p>
                  </div>

                  <h4 className="text-lg font-semibold text-gray-800 mt-6">
                    Key Concepts
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Core principles of {module.topics[selectedLesson]}</li>
                    <li>Real-world applications in Indian financial context</li>
                    <li>Common mistakes to avoid</li>
                    <li>Best practices and strategies</li>
                  </ul>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                    <p className="text-blue-900 font-semibold mb-2">🎯 Interactive Learning:</p>
                    <p className="text-blue-800 mb-3">
                      Get hands-on practice with our AI chat assistant! Try asking questions like:
                    </p>
                    <ul className="text-blue-800 space-y-1 list-disc list-inside">
                      <li>"Explain {module.topics[selectedLesson]} with an example"</li>
                      <li>"What are the benefits of {module.topics[selectedLesson]}?"</li>
                      <li>"How does {module.topics[selectedLesson]} work in India?"</li>
                    </ul>
                    <button
                      onClick={() => navigate('/chat')}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Ask AI Tutor →
                    </button>
                  </div>

                  <h4 className="text-lg font-semibold text-gray-800 mt-6">
                    Practice & Apply
                  </h4>
                  <p>
                    Understanding theory is just the first step. Use our chat feature to explore real-world scenarios 
                    and get personalized explanations based on your proficiency level.
                  </p>
                </div>
              </div>

              {/* Lesson Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <button
                  onClick={() => setSelectedLesson(Math.max(0, selectedLesson - 1))}
                  disabled={selectedLesson === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    selectedLesson === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                  }`}
                >
                  ← Previous Lesson
                </button>

                <button
                  onClick={() => handleLessonComplete(selectedLesson)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                    completedLessons.includes(selectedLesson)
                      ? 'bg-gray-200 text-gray-600'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {completedLessons.includes(selectedLesson) ? '✓ Completed' : 'Mark as Complete'}
                </button>

                <button
                  onClick={() => setSelectedLesson(Math.min(module.lessons - 1, selectedLesson + 1))}
                  disabled={selectedLesson === module.lessons - 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    selectedLesson === module.lessons - 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                  }`}
                >
                  Next Lesson →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sign In Prompt for Guests */}
      {!isAuthenticated && (
        <div className="fixed bottom-0 left-0 right-0 bg-indigo-600 text-white py-4 px-6 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <div className="font-semibold">Sign in to track your progress!</div>
              <div className="text-sm text-indigo-100">
                Mark lessons complete and earn achievements
              </div>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleDetailPage;
