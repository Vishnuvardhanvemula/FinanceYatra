/**
 * Learning Modules Page
 * Displays all financial literacy modules with filtering and progress tracking
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  useEffect(() => {
    // Fetch user's completed modules if authenticated
    if (isAuthenticated && user) {
      // TODO: Fetch from backend API
      const completed = user.moduleProgress?.map(m => m.moduleId) || [];
      setCompletedModules(completed);
      setStats(getModuleStats(completed));
    } else {
      setStats(getModuleStats([]));
    }
  }, [isAuthenticated, user]);

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

  const filteredModules = selectedDifficulty === 'all'
    ? learningModules
    : getModulesByDifficulty(selectedDifficulty);

  const handleModuleClick = (module) => {
    if (isModuleLocked(module)) {
      toast.error('Complete the prerequisite modules first!', { duration: 3000 });
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
                className="text-indigo-600 dark:text-teal-400 hover:text-indigo-700 dark:hover:text-teal-300 mb-2 flex items-center gap-2"
              >
                ← Back to Home
              </button>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Learning Modules</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Master financial literacy with our structured learning path
              </p>
            </div>
            
            {!isAuthenticated && (
              <button
                onClick={() => navigate('/login')}
                className="bg-indigo-600 dark:bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-teal-700 transition-colors"
              >
                Sign In to Track Progress
              </button>
            )}
          </div>

          {/* Progress Stats */}
          {isAuthenticated && stats && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
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
                ? 'bg-indigo-600 dark:bg-teal-600 text-white'
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

            return (
              <div
                key={module.id}
                onClick={() => handleModuleClick(module)}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer border-2 ${
                  locked 
                    ? 'border-gray-300 dark:border-gray-600 opacity-60' 
                    : completed
                    ? 'border-green-400 dark:border-green-600'
                    : 'border-transparent hover:border-indigo-300 dark:hover:border-teal-500'
                }`}
              >
                {/* Module Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-4xl">{module.icon}</div>
                    <div className="flex flex-col gap-2 items-end">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(module.difficulty)}`}>
                        {getDifficultyIcon(module.difficulty)} {module.difficulty.charAt(0).toUpperCase() + module.difficulty.slice(1)}
                      </span>
                      {locked && (
                        <span className="text-2xl">🔒</span>
                      )}
                      {completed && (
                        <span className="text-2xl">✅</span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
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
                          <span className="text-indigo-500 dark:text-teal-400 mt-1">•</span>
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
                    : 'bg-indigo-50 dark:bg-teal-900/20'
                }`}>
                  <div className="text-center font-semibold text-sm">
                    {locked ? (
                      <span className="text-gray-600 dark:text-gray-400">🔒 Complete Prerequisites First</span>
                    ) : completed ? (
                      <span className="text-green-700 dark:text-green-400">✅ Completed - Review Anytime</span>
                    ) : (
                      <span className="text-indigo-700 dark:text-teal-400">Start Learning →</span>
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
