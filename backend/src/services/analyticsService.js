/**
 * Analytics Service
 * Calculates user learning statistics, streaks, and progress metrics
 */

/**
 * Calculate learning streak (consecutive days of activity)
 * @param {Array} activityLog - Array of activity dates
 * @returns {Number} Current streak in days
 */
export function calculateStreak(activityLog) {
  if (!activityLog || activityLog.length === 0) return 0;

  // Sort dates in descending order (most recent first)
  const sortedDates = activityLog
    .map(date => new Date(date))
    .sort((a, b) => b - a);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const mostRecent = new Date(sortedDates[0]);
  mostRecent.setHours(0, 0, 0, 0);

  // Check if streak is still active (activity today or yesterday)
  const daysDiff = Math.floor((today - mostRecent) / (1000 * 60 * 60 * 24));
  if (daysDiff > 1) return 0; // Streak broken

  let streak = 0;
  let expectedDate = new Date(today);

  for (const activityDate of sortedDates) {
    const date = new Date(activityDate);
    date.setHours(0, 0, 0, 0);

    const diff = Math.floor((expectedDate - date) / (1000 * 60 * 60 * 24));

    if (diff === 0) {
      streak++;
      expectedDate.setDate(expectedDate.getDate() - 1);
    } else if (diff === 1) {
      streak++;
      expectedDate = new Date(date);
      expectedDate.setDate(expectedDate.getDate() - 1);
    } else {
      break; // Streak broken
    }
  }

  return streak;
}

/**
 * Calculate module completion statistics
 * @param {Array} moduleProgress - User's module progress array
 * @param {Array} allModules - All available modules
 * @returns {Object} Module statistics
 */
export function calculateModuleStats(moduleProgress, allModules) {
  const totalModules = allModules.length;
  const completedModules = moduleProgress.filter(mp => mp.completedAt).length;
  const inProgressModules = moduleProgress.filter(
    mp => !mp.completedAt && mp.startedAt
  ).length;

  // Calculate average quiz score
  const quizScores = moduleProgress
    .filter(mp => mp.quizScore !== undefined && mp.quizScore !== null)
    .map(mp => mp.quizScore);

  const avgQuizScore = quizScores.length > 0
    ? Math.round(quizScores.reduce((sum, score) => sum + score, 0) / quizScores.length)
    : 0;

  // Calculate completion rate by difficulty
  const beginnerModules = allModules.filter(m => m.difficulty === 'beginner');
  const intermediateModules = allModules.filter(m => m.difficulty === 'intermediate');
  const expertModules = allModules.filter(m => m.difficulty === 'expert');

  const completedByDifficulty = {
    beginner: moduleProgress.filter(mp =>
      mp.completedAt && beginnerModules.some(m => m.id === mp.moduleId)
    ).length,
    intermediate: moduleProgress.filter(mp =>
      mp.completedAt && intermediateModules.some(m => m.id === mp.moduleId)
    ).length,
    expert: moduleProgress.filter(mp =>
      mp.completedAt && expertModules.some(m => m.id === mp.moduleId)
    ).length,
  };

  return {
    totalModules,
    completedModules,
    inProgressModules,
    notStartedModules: totalModules - completedModules - inProgressModules,
    completionPercentage: Math.round((completedModules / totalModules) * 100),
    avgQuizScore,
    completedByDifficulty,
    totalByDifficulty: {
      beginner: beginnerModules.length,
      intermediate: intermediateModules.length,
      expert: expertModules.length,
    },
  };
}

/**
 * Calculate total learning time estimate
 * @param {Array} moduleProgress - User's module progress array
 * @param {Array} allModules - All available modules
 * @returns {Number} Total minutes spent learning
 */
export function calculateLearningTime(moduleProgress, allModules) {
  let totalMinutes = 0;

  for (const progress of moduleProgress) {
    const module = allModules.find(m => m.id === progress.moduleId);
    if (!module) continue;

    if (progress.completedAt) {
      // Completed module - count full duration
      const duration = parseInt(module.duration) || 30;
      totalMinutes += duration;
    } else if (progress.startedAt && progress.completedLessons?.length > 0) {
      // In progress - estimate based on lessons completed
      const module = allModules.find(m => m.id === progress.moduleId);
      const duration = parseInt(module.duration) || 30;
      const lessonsCompleted = progress.completedLessons.length;
      const totalLessons = module.lessons || 1;
      totalMinutes += Math.round((duration * lessonsCompleted) / totalLessons);
    }
  }

  return totalMinutes;
}

/**
 * Calculate weekly activity data for charts
 * @param {Array} activityLog - Array of activity dates
 * @returns {Array} Array of {date, count} objects for last 7 days
 */
export function calculateWeeklyActivity(activityLog) {
  const weekData = [];
  const today = new Date();

  // Create array for last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);

    weekData.push({
      date: date.toISOString().split('T')[0],
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      count: 0,
    });
  }

  // Count activities per day
  if (activityLog && activityLog.length > 0) {
    for (const activity of activityLog) {
      const activityDate = new Date(activity);
      activityDate.setHours(0, 0, 0, 0);
      const dateStr = activityDate.toISOString().split('T')[0];

      const dayData = weekData.find(d => d.date === dateStr);
      if (dayData) {
        dayData.count++;
      }
    }
  }

  return weekData;
}

/**
 * Get recent activity items
 * @param {Array} moduleProgress - User's module progress array
 * @param {Array} allModules - All available modules
 * @param {Number} limit - Maximum number of items to return
 * @returns {Array} Recent activity items
 */
export function getRecentActivity(moduleProgress, allModules, limit = 5) {
  const activities = [];

  for (const progress of moduleProgress) {
    const module = allModules.find(m => m.id === progress.moduleId);
    if (!module) continue;

    if (progress.completedAt) {
      activities.push({
        type: 'module_completed',
        moduleId: progress.moduleId,
        moduleTitle: module.title,
        timestamp: progress.completedAt,
        description: `Completed ${module.title}`,
        points: 100,
      });
    }

    if (progress.startedAt) {
      activities.push({
        type: 'module_started',
        moduleId: progress.moduleId,
        moduleTitle: module.title,
        timestamp: progress.startedAt,
        description: `Started ${module.title}`,
      });
    }
  }

  // Sort by timestamp (most recent first) and limit
  return activities
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, limit);
}

/**
 * Calculate proficiency growth over time
 * @param {Array} proficiencyHistory - Array of proficiency assessments
 * @returns {Array} Proficiency trend data
 */
export function calculateProficiencyTrend(proficiencyHistory) {
  if (!proficiencyHistory || proficiencyHistory.length === 0) {
    return [];
  }

  return proficiencyHistory.map(assessment => ({
    date: new Date(assessment.assessedAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    }),
    level: assessment.level,
    score: assessment.score,
    timestamp: assessment.assessedAt,
  }));
}

/**
 * Generate comprehensive analytics summary
 * @param {Object} user - User object with all data
 * @param {Array} allModules - All available modules
 * @returns {Object} Complete analytics summary
 */
export function generateAnalyticsSummary(user, allModules) {
  const moduleStats = calculateModuleStats(user.moduleProgress || [], allModules);
  const streak = calculateStreak(user.activityLog || []);
  const learningTime = calculateLearningTime(user.moduleProgress || [], allModules);
  const weeklyActivity = calculateWeeklyActivity(user.activityLog || []);
  const recentActivity = getRecentActivity(user.moduleProgress || [], allModules, 5);
  const proficiencyTrend = calculateProficiencyTrend(user.proficiencyHistory || []);

  return {
    overview: {
      totalPoints: user.totalPoints || 0,
      currentStreak: streak,
      learningTimeMinutes: learningTime,
      learningTimeFormatted: formatLearningTime(learningTime),
      proficiencyLevel: user.proficiencyLevel || 'beginner',
      memberSince: user.createdAt,
    },
    modules: moduleStats,
    activity: {
      weekly: weeklyActivity,
      recent: recentActivity,
    },
    proficiency: {
      current: user.proficiencyLevel || 'beginner',
      score: user.proficiencyScore || 0,
      trend: proficiencyTrend,
    },
  };
}

/**
 * Format learning time in human-readable format
 * @param {Number} minutes - Total minutes
 * @returns {String} Formatted time string
 */
function formatLearningTime(minutes) {
  if (minutes < 60) {
    return `${minutes} mins`;
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours < 24) {
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }

  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  if (remainingHours > 0) {
    return `${days}d ${remainingHours}h`;
  }

  return `${days}d`;
}

/**
 * Log user activity and update streak
 * @param {Object} user - User object
 * @returns {Object} Updated streak info
 */
export async function logActivity(user) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if already logged today
  const alreadyLogged = user.activityLog?.some(date => {
    const logDate = new Date(date);
    logDate.setHours(0, 0, 0, 0);
    return logDate.getTime() === today.getTime();
  });

  if (!alreadyLogged) {
    if (!user.activityLog) {
      user.activityLog = [];
    }
    user.activityLog.push(new Date());

    // Update streak
    const streak = calculateStreak(user.activityLog);
    user.currentStreak = streak;

    if (streak > user.longestStreak) {
      user.longestStreak = streak;
    }

    user.lastActiveDate = new Date();
    await user.save();

    return {
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      activityLogged: true
    };
  }

  return {
    currentStreak: user.currentStreak,
    longestStreak: user.longestStreak,
    activityLogged: false
  };
}

export default {
  calculateStreak,
  calculateModuleStats,
  calculateLearningTime,
  calculateWeeklyActivity,
  getRecentActivity,
  calculateProficiencyTrend,
  generateAnalyticsSummary,
  logActivity
};

