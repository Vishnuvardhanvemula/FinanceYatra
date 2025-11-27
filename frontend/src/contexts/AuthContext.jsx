/**
 * Authentication Context
 * Manages user authentication state across the app
 */

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';
import toast from 'react-hot-toast';
import { useTheme } from './ThemeContext';

const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);
  const previousAchievementsRef = useRef([]);

  // Set axios default headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Access theme setter from ThemeContext to apply server preference on login/load
  const { setTheme, theme: currentTheme } = useTheme();

  const applyServerThemeIfPresent = (usr) => {
    try {
      const serverTheme = usr?.preferences?.theme || usr?.theme || usr?.preferredTheme;
      // If server has a saved theme, apply it (and notify) when it differs
      if (serverTheme && serverTheme !== currentTheme) {
        setTheme(serverTheme, { user: usr });
        try { toast.success(`Applied your saved theme: ${serverTheme}`); } catch (e) { }
        return;
      }

      // No server preference — derive a safe theme from the user's unlocked achievements
      // This prevents leaking a previous user's theme stored in localStorage
      const unlockedCount = (usr?.achievements || []).filter(a => a.isUnlocked).length;
      let derived = 'default';
      if (unlockedCount >= 25) derived = 'master';
      else if (unlockedCount >= 20) derived = 'platinum';
      else if (unlockedCount >= 15) derived = 'gold';
      else if (unlockedCount >= 10) derived = 'silver';
      else if (unlockedCount >= 5) derived = 'bronze';

      if (derived !== currentTheme) {
        setTheme(derived, { user: usr });
        try { toast(`Applied a theme based on your progress: ${derived}`); } catch (e) { }
      }
    } catch (err) {
      console.warn('Failed to apply server theme', err);
    }
  };

  // Load user profile on mount
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API_URL}/auth/profile`);
          if (response.data.success) {
            setUser(response.data.data);
            applyServerThemeIfPresent(response.data.data);
          } else {
            // Invalid token response, clear it
            setToken(null);
            setUser(null);
            localStorage.removeItem('authToken');
            delete axios.defaults.headers.common['Authorization'];
          }
        } catch (error) {
          console.error('Failed to load user:', error);
          // Only logout if it's an authentication error (401)
          // Don't logout on network errors or server errors
          if (error.response?.status === 401) {
            console.log('Token expired or invalid, logging out...');
            setToken(null);
            setUser(null);
            localStorage.removeItem('authToken');
            delete axios.defaults.headers.common['Authorization'];
          } else {
            console.log('Network or server error, keeping user logged in');
            // Keep the user in memory but mark as loaded
          }
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []); // Run only once on mount, not when token changes

  // Monitor achievements and show toasts for new ones
  useEffect(() => {
    if (!user || !user.achievements) return;

    const currentAchievements = user.achievements || [];
    const previousAchievements = previousAchievementsRef.current;

    // Skip on first load (when previousAchievements is empty)
    if (previousAchievements.length > 0) {
      // Find newly unlocked achievements (unlocked within the last 10 seconds)
      const now = Date.now();
      const newAchievements = currentAchievements.filter(current => {
        // Check if this achievement wasn't in the previous list
        const isNew = !previousAchievements.some(prev => prev.id === current.id);

        // Check if it was unlocked recently (within last 10 seconds)
        const unlockedAt = new Date(current.unlockedAt).getTime();
        const isRecent = (now - unlockedAt) < 10000; // 10 seconds

        // Only show toast if it's both new to our tracking AND recently unlocked
        return isNew && isRecent;
      });

      // Show toast for each new achievement
      if (newAchievements.length > 0) {
        console.log('🎉 New achievements detected:', newAchievements);
        newAchievements.forEach((achievement, index) => {
          setTimeout(() => {
            toast.custom(
              (t) => (
                <div
                  className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 shadow-2xl rounded-2xl pointer-events-auto flex items-center ring-2 ring-yellow-300 ring-opacity-50`}
                >
                  <div className="flex-1 w-0 p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg animate-achievement-glow">
                          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-xs font-extrabold text-white uppercase tracking-widest mb-1 opacity-90">
                          Achievement Unlocked!
                        </p>
                        <p className="text-xl font-extrabold text-white drop-shadow-lg leading-tight">
                          {achievement.name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="px-4 py-6 flex items-center justify-center text-white hover:bg-white/20 focus:outline-none transition-all rounded-r-2xl group"
                      aria-label="Close notification"
                    >
                      <svg
                        className="w-5 h-5 group-hover:scale-110 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ),
              {
                duration: 6000,
                position: 'top-right',
              }
            );
          }, index * 1200); // Stagger multiple achievements by 1.2 seconds each
        });
      }
    }

    // Update the ref with current achievements
    previousAchievementsRef.current = currentAchievements;
  }, [user?.achievements]);

  // Register new user
  const register = async (email, password, name, preferredLanguage = 'en') => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
        name,
        preferredLanguage
      });

      if (response.data.success) {
        const { token, user } = response.data.data;
        setToken(token);
        setUser(user);
        applyServerThemeIfPresent(user);
        localStorage.setItem('authToken', token);
        return { success: true, user };
      }

      return { success: false, message: response.data.message };

    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });

      if (response.data.success) {
        const { token, user } = response.data.data;
        setToken(token);
        setUser(user);
        applyServerThemeIfPresent(user);
        localStorage.setItem('authToken', token);
        return { success: true, user };
      }

      return { success: false, message: response.data.message };

    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  // Logout user
  const logout = async () => {
    try {
      // Clear user-specific chat sessions before logout
      if (user?._id) {
        const userId = user._id;
        // Clear user-specific chat session from localStorage
        localStorage.removeItem(`chatSessionId_${userId}`);
        console.log(`🔐 Cleared chat session for user: ${userId}`);
      }

      if (token) {
        await axios.post(`${API_URL}/auth/logout`);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('token'); // Also remove 'token' key if used
      delete axios.defaults.headers.common['Authorization'];
      // Reset theme to default on logout to avoid leaking previous user's theme
      try {
        setTheme('default');
      } catch (e) {
        // ignore
      }
    }
  };

  // Update user profile
  const updateProfile = async (updates) => {
    try {
      const response = await axios.put(`${API_URL}/auth/profile`, updates);

      if (response.data.success) {
        setUser(response.data.data);
        return { success: true };
      }

      return { success: false, message: response.data.message };

    } catch (error) {
      console.error('Update profile error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Profile update failed'
      };
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await axios.post(`${API_URL}/auth/change-password`, {
        currentPassword,
        newPassword
      });

      return {
        success: response.data.success,
        message: response.data.message
      };

    } catch (error) {
      console.error('Change password error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Password change failed'
      };
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    if (!token) {
      console.log('RefreshUser - No token available');
      return;
    }

    try {
      console.log('RefreshUser - Fetching updated user data...');
      const response = await axios.get(`${API_URL}/auth/profile`);
      if (response.data.success) {
        console.log('RefreshUser - Updated user data:', response.data.data);
        console.log('RefreshUser - Module progress:', response.data.data.moduleProgress);
        setUser(response.data.data);
        applyServerThemeIfPresent(response.data.data);
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  // Update user's module progress
  const updateUserProgress = async (progressData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/progress`, {
        moduleId: progressData.moduleId,
        lastCompletedLesson: progressData.lastCompletedLesson,
        timestamp: progressData.timestamp,
        xpEarned: progressData.xpEarned, // Send XP earned
        isCompleted: progressData.isCompleted // Send completion flag
      });

      if (response.data.success) {
        // Update local user state with new progress
        setUser(prev => {
          const currentProgressArray = Array.isArray(prev?.moduleProgress)
            ? [...prev.moduleProgress]
            : [];

          const existingIndex = currentProgressArray.findIndex(m => m.moduleId === progressData.moduleId);

          if (existingIndex >= 0) {
            const existingModule = currentProgressArray[existingIndex];
            const updatedCompletedLessons = Array.isArray(existingModule.completedLessons)
              ? [...existingModule.completedLessons]
              : [];

            if (!updatedCompletedLessons.includes(progressData.lastCompletedLesson)) {
              updatedCompletedLessons.push(progressData.lastCompletedLesson);
            }

            currentProgressArray[existingIndex] = {
              ...existingModule,
              lastCompletedLesson: progressData.lastCompletedLesson,
              timestamp: progressData.timestamp,
              completedLessons: updatedCompletedLessons,
              ...(progressData.isCompleted && { completedAt: new Date() }) // Set completedAt if finished
            };
          } else {
            currentProgressArray.push({
              moduleId: progressData.moduleId,
              lastCompletedLesson: progressData.lastCompletedLesson,
              timestamp: progressData.timestamp,
              completedLessons: [progressData.lastCompletedLesson],
              ...(progressData.isCompleted && { completedAt: new Date() }) // Set completedAt if finished
            });
          }

          const newTotalPoints = (prev.totalPoints || 0) + (response.data.xpAwarded || 0);
          return {
            ...prev,
            moduleProgress: currentProgressArray,
            totalPoints: newTotalPoints,
            xp: newTotalPoints, // Sync alias for Dashboard
            points: newTotalPoints // Sync alias for Challenges
          };
        });
        return { success: true };
      }

      return { success: false, message: response.data.message };
    } catch (error) {
      console.error('Update progress error:', error);
      // Still update local state even if API fails (offline mode)
      setUser(prev => {
        const currentProgressArray = Array.isArray(prev?.moduleProgress)
          ? [...prev.moduleProgress]
          : [];

        const existingIndex = currentProgressArray.findIndex(m => m.moduleId === progressData.moduleId);

        if (existingIndex >= 0) {
          const existingModule = currentProgressArray[existingIndex];
          const updatedCompletedLessons = Array.isArray(existingModule.completedLessons)
            ? [...existingModule.completedLessons]
            : [];

          if (!updatedCompletedLessons.includes(progressData.lastCompletedLesson)) {
            updatedCompletedLessons.push(progressData.lastCompletedLesson);
          }

          currentProgressArray[existingIndex] = {
            ...existingModule,
            lastCompletedLesson: progressData.lastCompletedLesson,
            timestamp: progressData.timestamp,
            completedLessons: updatedCompletedLessons,
            ...(progressData.isCompleted && { completedAt: new Date() }) // Set completedAt if finished
          };
        } else {
          currentProgressArray.push({
            moduleId: progressData.moduleId,
            lastCompletedLesson: progressData.lastCompletedLesson,
            timestamp: progressData.timestamp,
            completedLessons: [progressData.lastCompletedLesson],
            ...(progressData.isCompleted && { completedAt: new Date() }) // Set completedAt if finished
          });
        }

        return {
          ...prev,
          moduleProgress: currentProgressArray
        };
      });
      return { success: false, message: 'Progress saved locally only' };
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateProfile,
    changePassword,
    refreshUser,
    updateUserProgress
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
