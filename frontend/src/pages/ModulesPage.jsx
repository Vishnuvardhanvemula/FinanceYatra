/**
 * Learning Modules Page
 * Displays all financial literacy modules with filtering and progress tracking
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/theme-utils.css';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { 
  learningModules, 
  getModulesByDifficulty, 
  getAccessibleModules,
  getModuleStats 
} from '../data/learningModules';

const ModulesPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [completedModules, setCompletedModules] = useState([]);
  const [stats, setStats] = useState(null);

  // Memoize the stringified moduleProgress to detect deep changes
  const moduleProgressKey = useMemo(() => 
    JSON.stringify(user?.moduleProgress || []),
    [user?.moduleProgress]
  );

  useEffect(() => {
    // Fetch user's completed modules if authenticated
    if (isAuthenticated && user) {
      console.log('ModulesPage - User data:', user);
      console.log('ModulesPage - Module progress:', user.moduleProgress);
      
      // Get completed modules (those with completedAt date)
      const completed = user.moduleProgress
        ?.filter(m => {
          console.log('Checking module:', m);
          return m.completedAt;
        })
        ?.map(m => m.moduleId) || [];
      
      console.log('ModulesPage - Completed modules:', completed);
      setCompletedModules(completed);
      
      // Pass both completed modules and full progress to get accurate stats
      setStats(getModuleStats(completed, user.moduleProgress));
    } else {
      setStats(getModuleStats([], []));
    }
  }, [isAuthenticated, user, moduleProgressKey]);

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

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return '🌱';
      case 'intermediate':
        return '🌿';
      case 'expert':
        return '🌳';
      default:
        return '📚';
    }
  };

  const isModuleLocked = (module) => {
    if (!isAuthenticated) return false; // Guest users can view all
    
    if (module.prerequisites.length === 0) return false;
    
    // Check if all prerequisites are completed
    return !module.prerequisites.every(prereqId => 
      completedModules.includes(prereqId)
    );
  };

  const isModuleCompleted = (moduleId) => {
    return completedModules.includes(moduleId);
  };

  const isModuleInProgress = (moduleId) => {
    if (!isAuthenticated || !user?.moduleProgress) return false;
    const progress = user.moduleProgress.find(p => p.moduleId === moduleId);
    return progress && progress.startedAt && !progress.completedAt;
  };

  const getModuleProgress = (moduleId) => {
    if (!isAuthenticated || !user?.moduleProgress) return 0;
    const progress = user.moduleProgress.find(p => p.moduleId === moduleId);
    if (!progress) return 0;
    
    const module = learningModules.find(m => m.id === moduleId);
    if (!module) return 0;
    
    const completedLessons = progress.completedLessons?.length || 0;
    return Math.round((completedLessons / module.lessons) * 100);
  };

  const filteredModules = selectedDifficulty === 'all'
    ? learningModules
    : getModulesByDifficulty(selectedDifficulty);

  const handleModuleClick = (module) => {
    if (isModuleLocked(module)) {
      const missingPrereqs = module.prerequisites
        .filter(prereqId => !completedModules.includes(prereqId))
        .map(prereqId => {
          const prereqModule = learningModules.find(m => m.id === prereqId);
          return prereqModule ? prereqModule.title : prereqId;
        });
      
      if (missingPrereqs.length > 0) {
        toast.error(
          `🔒 Complete these modules first: ${missingPrereqs.join(', ')}`,
          { duration: 4000 }
        );
      }
      return;
    }
    navigate(`/modules/${module.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => navigate('/')}
                className="text-indigo-600 dark:text-teal-400 hover:text-indigo-700 dark:hover:text-teal-300 mb-2 flex items-center gap-2 group"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Home</span>
              </button>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Learning Modules</h1>
              <p className="text-lg font-semibold mt-2 fy-accent-text">
                Interactive Learning. Real-Life Finance.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Master financial literacy with our structured learning path powered by AI
              </p>
            </div>
            
            {!isAuthenticated && (
              <button
                onClick={() => navigate('/login')}
                className="py-2 px-6 rounded-lg fy-theme-button"
              >
                Sign In to Track Progress
              </button>
            )}
          </div>

          {/* Progress Stats */}
          {isAuthenticated && stats && (
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
                <div className="text-2xl font-bold fy-accent-text">
                  {stats.completed}/{stats.total}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Completed Modules</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {stats.completionPercentage}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Overall Progress</div>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {stats.inProgress}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {stats.remaining}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Remaining</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-2">
            <button
            onClick={() => setSelectedDifficulty('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedDifficulty === 'all'
                ? 'text-white fy-theme-button'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border dark:border-gray-600'
            }`}
          >
            All Modules ({learningModules.length})
          </button>
          <button
            onClick={() => setSelectedDifficulty('beginner')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedDifficulty === 'beginner'
                ? 'bg-green-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border dark:border-gray-600'
            }`}
          >
            🌱 Beginner ({stats?.byDifficulty.beginner || 0})
          </button>
          <button
            onClick={() => setSelectedDifficulty('intermediate')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedDifficulty === 'intermediate'
                ? 'bg-yellow-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border dark:border-gray-600'
            }`}
          >
            🌿 Intermediate ({stats?.byDifficulty.intermediate || 0})
          </button>
          <button
            onClick={() => setSelectedDifficulty('expert')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedDifficulty === 'expert'
                ? 'bg-red-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border dark:border-gray-600'
            }`}
          >
            🌳 Expert ({stats?.byDifficulty.expert || 0})
          </button>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => {
            const locked = isModuleLocked(module);
            const completed = isModuleCompleted(module.id);
            const inProgress = isModuleInProgress(module.id);
            const progressPercentage = getModuleProgress(module.id);

            return (
              <div
                key={module.id}
                onClick={() => handleModuleClick(module)}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer border-2 relative overflow-hidden fy-module-card-accent ${
                  locked 
                    ? 'border-gray-300 dark:border-gray-600 opacity-60' 
                    : completed
                    ? 'border-green-500 dark:border-green-600 bg-green-50/50 dark:bg-green-900/10'
                    : inProgress
                    ? 'border-blue-500 dark:border-blue-600 bg-blue-50/50 dark:bg-blue-900/10'
                    : ''
                } ${(!locked && !completed && !inProgress) ? 'fy-theme-border-hover' : ''}`}
              >
                {/* Completion Badge Overlay */}
                {completed && (
                  <div className="absolute top-0 right-0 bg-gradient-to-br from-green-500 to-green-600 text-white px-3 py-1.5 text-xs font-bold rounded-bl-xl shadow-lg flex items-center gap-1 z-10">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>COMPLETED</span>
                  </div>
                )}

                {/* In Progress Badge Overlay */}
                {!completed && inProgress && (
                  <div className="absolute top-0 right-0 text-white px-3 py-1.5 text-xs font-bold rounded-bl-xl shadow-lg flex items-center gap-1 z-10 fy-badge-gradient">
                    <svg className="w-3 h-3 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>IN PROGRESS {progressPercentage}%</span>
                  </div>
                )}

                {/* Lock Overlay for Locked Modules */}
                {locked && (
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900/20 dark:bg-gray-900/40 flex flex-col items-center justify-center backdrop-blur-sm z-10 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-2xl border-2 border-gray-300 dark:border-gray-600 max-w-xs w-full">
                      <div className="text-center mb-3">
                        <span className="text-5xl">🔒</span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-2 text-center">
                        Module Locked
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 text-center">
                        Complete these modules first:
                      </p>
                      <div className="space-y-2">
                        {module.prerequisites.map(prereqId => {
                          const prereqModule = learningModules.find(m => m.id === prereqId);
                          const isCompleted = completedModules.includes(prereqId);
                          return prereqModule ? (
                            <div
                              key={prereqId}
                              className={`flex items-center gap-2 p-2 rounded-lg border ${
                                isCompleted
                                  ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
                                  : 'bg-gray-50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600'
                              }`}
                            >
                              <span className="text-lg">{isCompleted ? '✅' : prereqModule.icon}</span>
                              <div className="flex-1 min-w-0">
                                <p className={`text-xs font-medium truncate ${
                                  isCompleted
                                    ? 'text-green-700 dark:text-green-400'
                                    : 'text-gray-700 dark:text-gray-300'
                                }`}>
                                  {prereqModule.title}
                                </p>
                              </div>
                              {isCompleted && (
                                <span className="text-xs font-bold text-green-600 dark:text-green-400">✓</span>
                              )}
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Progress Bar for In-Progress Modules */}
                {!completed && inProgress && progressPercentage > 0 && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
                    <div 
                      className="h-full transition-all duration-500 fy-progress-gradient"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                )}

                {/* Module Header */}
                <div className={`p-6 ${completed || inProgress ? 'pt-12' : ''}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-4xl">{module.icon}</div>
                    <div className="flex flex-col gap-2 items-end">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(module.difficulty)}`}>
                        {getDifficultyIcon(module.difficulty)} {module.difficulty.charAt(0).toUpperCase() + module.difficulty.slice(1)}
                      </span>
                    </div>
                  </div>

                    <h3 className={`text-xl font-bold mb-2 flex items-center gap-2 ${
                    completed 
                      ? 'text-green-700 dark:text-green-400'
                      : inProgress
                      ? 'text-blue-700 dark:text-blue-400'
                      : 'text-gray-800 dark:text-gray-100'
                  }`}>
                    {completed && (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                    {!completed && inProgress && (
                      <svg className="w-6 h-6 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    )}
                    {module.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {module.description}
                  </p>

                  {/* Module Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <span>⏱️</span>
                      <span>{module.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>📚</span>
                      <span>{module.lessons} lessons</span>
                    </div>
                  </div>

                  {/* Prerequisites */}
                  {module.prerequisites.length > 0 && (
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                        Prerequisites:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {module.prerequisites.map(prereqId => {
                          const prereq = learningModules.find(m => m.id === prereqId);
                          const prereqCompleted = isModuleCompleted(prereqId);
                          return (
                            <span
                              key={prereqId}
                              className={`text-xs px-2 py-1 rounded-full ${
                                prereqCompleted
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                              }`}
                            >
                              {prereqCompleted ? '✓' : '○'} {prereq?.title || prereqId}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Learning Outcomes Preview */}
                  <div className="border-t dark:border-gray-700 pt-4">
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                      You'll Learn:
                    </div>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      {module.learningOutcomes.slice(0, 2).map((outcome, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                            <span className="mt-1 fy-outcome-bullet">•</span>
                            <span>{outcome}</span>
                          </li>
                      ))}
                      {module.learningOutcomes.length > 2 && (
                        <li className="text-xs text-gray-400 dark:text-gray-500 italic">
                          +{module.learningOutcomes.length - 2} more...
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Module Footer */}
                <div className={`px-6 py-3 border-t dark:border-gray-700 ${
                  locked 
                    ? 'bg-gray-50 dark:bg-gray-700' 
                    : completed
                    ? 'bg-green-50 dark:bg-green-900/20'
                    : inProgress
                    ? 'bg-blue-50 dark:bg-blue-900/20'
                    : 'bg-indigo-50 dark:bg-teal-900/20'
                }`}>
                  <div className="text-center font-semibold text-sm">
                    {locked ? (
                      <span className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Complete Prerequisites First
                      </span>
                    ) : completed ? (
                      <span className="flex items-center justify-center gap-2 text-green-700 dark:text-green-400">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Completed - Review Anytime
                      </span>
                    ) : inProgress ? (
                      <span className="flex items-center justify-center gap-2 text-blue-700 dark:text-blue-400">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Continue Learning ({progressPercentage}% Complete)
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-indigo-700 dark:text-teal-400">
                        <span>Start Learning</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Banner for Guests */}
      {!isAuthenticated && (
        <div className="fixed bottom-0 left-0 right-0 bg-indigo-600 dark:bg-teal-700 text-white py-4 px-6 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <div className="font-semibold">Sign in to track your progress!</div>
              <div className="text-sm text-indigo-100 dark:text-teal-100">
                Unlock features like progress tracking, achievements, and personalized learning
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
    </div>
  );
};

export default ModulesPage;
