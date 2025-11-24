// Simplified ProfileBanner component for Finance Tutor Dashboard
// Provides a clean gradient background, avatar, user info, stats, theme selector, and recent achievements.

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import Badge from './Badge';

// Theme definitions (retain existing gradients for consistency)
const BANNER_THEMES = {
  default: {
    gradient: 'from-teal-500 via-teal-600 to-teal-700',
    textColor: 'text-teal-700',
    ringColor: 'ring-teal-300',
  },
  bronze: {
    gradient: 'from-orange-700 via-amber-500 to-yellow-600',
    textColor: 'text-orange-600',
    ringColor: 'ring-orange-400',
  },
  silver: {
    gradient: 'from-gray-600 via-slate-400 to-gray-600',
    textColor: 'text-gray-600',
    ringColor: 'ring-gray-400',
  },
  gold: {
    gradient: 'from-yellow-600 via-amber-400 to-orange-500',
    textColor: 'text-yellow-600',
    ringColor: 'ring-yellow-400',
  },
  platinum: {
    gradient: 'from-purple-600 via-fuchsia-500 to-pink-600',
    textColor: 'text-purple-600',
    ringColor: 'ring-purple-400',
  },
  master: {
    gradient: 'from-indigo-900 via-purple-800 to-pink-900',
    textColor: 'text-indigo-600',
    ringColor: 'ring-indigo-400',
  },
};

const ProfileBanner = ({ user, achievements = [], theme = 'default', showCustomization = false, onThemeChange }) => {
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const { theme: globalTheme, setTheme: setGlobalTheme } = useTheme();

  // Sync local theme with global theme
  useEffect(() => {
    if (globalTheme && globalTheme !== selectedTheme) {
      setSelectedTheme(globalTheme);
    }
  }, [globalTheme]);

  const handleThemeChange = (newTheme) => {
    setSelectedTheme(newTheme);
    try {
      setGlobalTheme(newTheme, { user });
    } catch (e) { }
    setShowThemeSelector(false);
    onThemeChange?.(newTheme);
  };

  const bannerTheme = BANNER_THEMES[selectedTheme] || BANNER_THEMES.default;

  // Basic stats
  const totalAchievements = achievements.length;
  const unlockedAchievements = achievements.filter((a) => a.isUnlocked).length;
  const completionPercentage = totalAchievements > 0 ? Math.round((unlockedAchievements / totalAchievements) * 100) : 0;

  const StatItem = ({ label, value, icon }) => (
    <div className="flex items-center space-x-2">
      {icon}
      <span className="font-medium text-gray-800 dark:text-gray-200">{label}:</span>
      <span className="font-bold text-gray-900 dark:text-white">{value}</span>
    </div>
  );

  // Simple grid‑based theme selector (no luxury glows)
  const ThemeSelector = () => (
    <AnimatePresence>
      {showThemeSelector && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowThemeSelector(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-[90vw] max-w-md shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Select Theme</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(BANNER_THEMES).map((key) => {
                const themeDef = BANNER_THEMES[key];
                const required = { default: 0, bronze: 5, silver: 10, gold: 15, platinum: 20, master: 25 }[key];
                const isLocked = unlockedAchievements < required;
                const isActive = selectedTheme === key;
                return (
                  <button
                    key={key}
                    disabled={isLocked}
                    onClick={() => !isLocked && handleThemeChange(key)}
                    className={`p-3 rounded-lg border ${isActive ? 'ring-2 ring-teal-400' : 'border-gray-300 dark:border-gray-600'} ${isLocked ? 'opacity-40 cursor-not-allowed' : 'hover:shadow-md'} transition`}
                  >
                    <div className={`w-full h-12 bg-gradient-to-br ${themeDef.gradient} rounded`}></div>
                    <p className="mt-2 text-center capitalize text-sm text-gray-800 dark:text-gray-200">{key}</p>
                  </button>
                );
              })}
            </div>
            <button
              className="mt-4 w-full py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
              onClick={() => setShowThemeSelector(false)}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative">
      {/* Banner with static gradient background */}
      <div
        className={`h-48 md:h-56 w-full bg-gradient-to-br ${bannerTheme.gradient} flex items-center justify-center`}
      >
        {/* Profile Card */}
        <div className="relative bg-white/10 backdrop-blur-md rounded-xl p-6 max-w-4xl w-full mx-4 shadow-lg">
          {/* Top Row: Avatar + Name/Title */}
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
              {/* Placeholder avatar */}
              <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name || 'User'}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">{user?.email || ''}</p>
            </div>
            {showCustomization && (
              <button
                onClick={() => setShowThemeSelector(true)}
                className="ml-auto px-3 py-1 bg-white/20 backdrop-blur-sm text-gray-800 dark:text-gray-200 rounded"
              >
                Theme
              </button>
            )}
          </div>
          {/* Stats Row */}
          <div className="mt-4 flex justify-between text-sm text-gray-700 dark:text-gray-300">
            <StatItem
              label="Achievements"
              value={`${unlockedAchievements}/${totalAchievements}`}
              icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a7 7 0 100 14A7 7 0 009 2z" /></svg>}
            />
            <StatItem
              label="Points"
              value={user?.points || 0}
              icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09L5.5 12.545 1 8.91l6.061-.88L10 2l2.939 6.03L19 8.91l-4.5 3.635.378 5.545z" /></svg>}
            />
            <StatItem
              label="Streak"
              value={user?.streak || 0}
              icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M3 10h14v2H3z" /></svg>}
            />
          </div>
          {/* Recent Achievements */}
          {achievements.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Recent Achievements</h3>
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {achievements
                  .filter((a) => a.isUnlocked)
                  .slice(0, 5)
                  .map((a) => (
                    <div key={a.id} className="flex-shrink-0 w-24 p-2 bg-white/20 backdrop-blur-sm rounded-lg text-center">
                      <div className="text-xl mb-1">{a.icon}</div>
                      <p className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate">{a.title}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Theme selector modal */}
      <ThemeSelector />
    </div>
  );
};

export default ProfileBanner;
