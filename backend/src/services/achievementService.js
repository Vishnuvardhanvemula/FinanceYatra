/**
 * Achievement Badges System with Tier Support
 * Defines all available achievements and unlock criteria
 * Supports Bronze, Silver, Gold, and Platinum tiers
 */

export const ACHIEVEMENT_TIERS = {
  BRONZE: { name: 'Bronze', color: '#CD7F32', threshold: 1, multiplier: 1 },
  SILVER: { name: 'Silver', color: '#C0C0C0', threshold: 0.5, multiplier: 1.5 },
  GOLD: { name: 'Gold', color: '#FFD700', threshold: 0.75, multiplier: 2 },
  PLATINUM: { name: 'Platinum', color: '#E5E4E2', threshold: 1, multiplier: 3 },
};

export const ACHIEVEMENTS = [
  // Getting Started Achievements
  {
    id: 'first-login',
    title: 'Welcome Aboard! 🎉',
    description: 'Created your account and started your financial journey',
    icon: '🎉',
    category: 'getting-started',
    criteria: 'Sign up for Finance Yatra',
    points: 10,
    rarity: 'common',
  },
  {
    id: 'first-chat',
    title: 'First Question',
    description: 'Asked your first financial question',
    icon: '💬',
    category: 'getting-started',
    criteria: 'Send your first chat message',
    points: 10,
    rarity: 'common',
  },
  {
    id: 'first-module',
    title: 'Learning Begins',
    description: 'Started your first learning module',
    icon: '📚',
    category: 'getting-started',
    criteria: 'Start any learning module',
    points: 25,
    rarity: 'common',
  },
  {
    id: 'module-complete',
    title: 'Module Master',
    description: 'Completed your first learning module',
    icon: '🎓',
    category: 'modules',
    criteria: 'Complete any learning module',
    points: 50,
    rarity: 'common',
  },

  // Module Completion Achievements
  {
    id: 'modules-5',
    title: 'Dedicated Learner',
    description: 'Completed 5 learning modules',
    icon: '⭐',
    category: 'modules',
    criteria: 'Complete 5 modules',
    points: 100,
    rarity: 'uncommon',
  },
  {
    id: 'modules-10',
    title: 'Knowledge Seeker',
    description: 'Completed 10 learning modules',
    icon: '🌟',
    category: 'modules',
    criteria: 'Complete 10 modules',
    points: 200,
    rarity: 'rare',
  },
  {
    id: 'modules-all',
    title: 'Financial Expert',
    description: 'Completed all learning modules',
    icon: '🏆',
    category: 'modules',
    criteria: 'Complete all 15 modules',
    points: 500,
    rarity: 'legendary',
  },

  // Difficulty-Based Achievements
  {
    id: 'beginner-complete',
    title: 'Foundation Builder',
    description: 'Completed all beginner modules',
    icon: '🟢',
    category: 'difficulty',
    criteria: 'Complete all beginner modules',
    points: 100,
    rarity: 'uncommon',
  },
  {
    id: 'intermediate-complete',
    title: 'Knowledge Expander',
    description: 'Completed all intermediate modules',
    icon: '🟡',
    category: 'difficulty',
    criteria: 'Complete all intermediate modules',
    points: 200,
    rarity: 'rare',
  },
  {
    id: 'expert-complete',
    title: 'Financial Guru',
    description: 'Completed all expert modules',
    icon: '🔴',
    category: 'difficulty',
    criteria: 'Complete all expert modules',
    points: 300,
    rarity: 'epic',
  },

  // Streak Achievements (Tiered)
  {
    id: 'streak-master',
    title: 'Streak Master',
    description: 'Maintain consistent learning streaks',
    icon: '🔥',
    category: 'streaks',
    criteria: 'Learn for consecutive days',
    hasTiers: true,
    tiers: {
      bronze: { threshold: 3, title: 'Bronze Streak', description: '3-day streak', points: 50, icon: '🥉' },
      silver: { threshold: 7, title: 'Silver Streak', description: '7-day streak', points: 100, icon: '🥈' },
      gold: { threshold: 30, title: 'Gold Streak', description: '30-day streak', points: 300, icon: '🥇' },
      platinum: { threshold: 100, title: 'Platinum Streak', description: '100-day streak', points: 1000, icon: '💎' },
    },
    points: 50,
    rarity: 'common',
  },

  // Points Achievements
  {
    id: 'points-500',
    title: 'Point Collector',
    description: 'Earned 500 total points',
    icon: '💎',
    category: 'points',
    criteria: 'Accumulate 500 points',
    points: 50,
    rarity: 'uncommon',
  },
  {
    id: 'points-1000',
    title: 'Point Accumulator',
    description: 'Earned 1,000 total points',
    icon: '💎💎',
    category: 'points',
    criteria: 'Accumulate 1,000 points',
    points: 100,
    rarity: 'rare',
  },
  {
    id: 'points-2500',
    title: 'Point Master',
    description: 'Earned 2,500 total points',
    icon: '💎💎💎',
    category: 'points',
    criteria: 'Accumulate 2,500 points',
    points: 250,
    rarity: 'epic',
  },

  // Proficiency Achievements
  {
    id: 'proficiency-intermediate',
    title: 'Progressing Well',
    description: 'Reached intermediate proficiency level',
    icon: '📈',
    category: 'proficiency',
    criteria: 'Achieve intermediate proficiency',
    points: 100,
    rarity: 'uncommon',
  },
  {
    id: 'proficiency-expert',
    title: 'Expert Level',
    description: 'Reached expert proficiency level',
    icon: '🎯',
    category: 'proficiency',
    criteria: 'Achieve expert proficiency',
    points: 300,
    rarity: 'epic',
  },

  // Quiz Achievements
  {
    id: 'perfect-quiz',
    title: 'Perfect Score',
    description: 'Got 100% on a module quiz',
    icon: '💯',
    category: 'quiz',
    criteria: 'Score 100% on any module quiz',
    points: 100,
    rarity: 'rare',
  },
  {
    id: 'quiz-master',
    title: 'Quiz Master',
    description: 'Average quiz score above 90%',
    icon: '🧠',
    category: 'quiz',
    criteria: 'Maintain 90%+ average across all quizzes',
    points: 200,
    rarity: 'epic',
  },

  // Special Achievements
  {
    id: 'early-bird',
    title: 'Early Bird',
    description: 'Completed a module before 9 AM',
    icon: '🌅',
    category: 'special',
    criteria: 'Complete any module before 9 AM',
    points: 50,
    rarity: 'uncommon',
  },
  {
    id: 'night-owl',
    title: 'Night Owl',
    description: 'Completed a module after 10 PM',
    icon: '🦉',
    category: 'special',
    criteria: 'Complete any module after 10 PM',
    points: 50,
    rarity: 'uncommon',
  },
  {
    id: 'speed-learner',
    title: 'Speed Learner',
    description: 'Completed 3 modules in one day',
    icon: '⚡',
    category: 'special',
    criteria: 'Complete 3 modules in a single day',
    points: 150,
    rarity: 'rare',
  },
];

/**
 * Check which achievements a user has unlocked
 * @param {Object} user - User object
 * @param {Array} allModules - All available modules
 * @returns {Array} Array of unlocked achievement IDs
 */
export function checkUnlockedAchievements(user, allModules) {
  const unlocked = [];

  // Getting Started
  if (user.createdAt) unlocked.push('first-login');
  if (user.chatCount && user.chatCount > 0) unlocked.push('first-chat');
  if (user.moduleProgress?.some(mp => mp.startedAt)) unlocked.push('first-module');
  if (user.moduleProgress?.some(mp => mp.completedAt)) unlocked.push('module-complete');

  // Module Completion
  const completedCount = user.moduleProgress?.filter(mp => mp.completedAt).length || 0;
  if (completedCount >= 5) unlocked.push('modules-5');
  if (completedCount >= 10) unlocked.push('modules-10');
  if (completedCount === allModules.length) unlocked.push('modules-all');

  // Difficulty-Based
  const completedModuleIds = user.moduleProgress
    ?.filter(mp => mp.completedAt)
    .map(mp => mp.moduleId) || [];
  
  const beginnerComplete = allModules
    .filter(m => m.difficulty === 'beginner')
    .every(m => completedModuleIds.includes(m.id));
  if (beginnerComplete) unlocked.push('beginner-complete');

  const intermediateComplete = allModules
    .filter(m => m.difficulty === 'intermediate')
    .every(m => completedModuleIds.includes(m.id));
  if (intermediateComplete) unlocked.push('intermediate-complete');

  const expertComplete = allModules
    .filter(m => m.difficulty === 'expert')
    .every(m => completedModuleIds.includes(m.id));
  if (expertComplete) unlocked.push('expert-complete');

  // Streak
  const streak = user.currentStreak || 0;
  if (streak >= 3) unlocked.push('streak-3');
  if (streak >= 7) unlocked.push('streak-7');
  if (streak >= 30) unlocked.push('streak-30');
  if (streak >= 100) unlocked.push('streak-100');

  // Points
  const points = user.totalPoints || 0;
  if (points >= 500) unlocked.push('points-500');
  if (points >= 1000) unlocked.push('points-1000');
  if (points >= 2500) unlocked.push('points-2500');

  // Proficiency
  if (user.proficiencyLevel === 'intermediate' || user.proficiencyLevel === 'expert') {
    unlocked.push('proficiency-intermediate');
  }
  if (user.proficiencyLevel === 'expert') {
    unlocked.push('proficiency-expert');
  }

  // Quiz
  const quizScores = user.moduleProgress
    ?.filter(mp => mp.quizScore !== undefined && mp.quizScore !== null)
    .map(mp => mp.quizScore) || [];
  
  if (quizScores.some(score => score === 100)) unlocked.push('perfect-quiz');
  
  if (quizScores.length > 0) {
    const avgScore = quizScores.reduce((sum, score) => sum + score, 0) / quizScores.length;
    if (avgScore >= 90) unlocked.push('quiz-master');
  }

  // Special Achievements - Early Bird (completed module before 9 AM)
  const hasEarlyBird = user.moduleProgress?.some(mp => {
    if (mp.completedAt) {
      const completedHour = new Date(mp.completedAt).getHours();
      return completedHour < 9;
    }
    return false;
  });
  if (hasEarlyBird) unlocked.push('early-bird');

  // Special Achievements - Night Owl (completed module after 10 PM)
  const hasNightOwl = user.moduleProgress?.some(mp => {
    if (mp.completedAt) {
      const completedHour = new Date(mp.completedAt).getHours();
      return completedHour >= 22; // 10 PM = 22:00
    }
    return false;
  });
  if (hasNightOwl) unlocked.push('night-owl');

  // Special Achievements - Speed Learner (3 modules in one day)
  if (user.moduleProgress && user.moduleProgress.length > 0) {
    const completedByDate = {};
    user.moduleProgress
      .filter(mp => mp.completedAt)
      .forEach(mp => {
        const dateKey = new Date(mp.completedAt).toDateString();
        completedByDate[dateKey] = (completedByDate[dateKey] || 0) + 1;
      });
    
    const hasSpeedLearner = Object.values(completedByDate).some(count => count >= 3);
    if (hasSpeedLearner) unlocked.push('speed-learner');
  }

  return unlocked;
}

/**
 * Get newly unlocked achievements (not in user's existing achievements)
 * @param {Array} currentAchievements - User's current achievement IDs
 * @param {Array} newAchievements - Newly unlocked achievement IDs
 * @returns {Array} Array of new achievement objects
 */
export function getNewAchievements(currentAchievements, newAchievements) {
  const newIds = newAchievements.filter(id => !currentAchievements.includes(id));
  return ACHIEVEMENTS.filter(achievement => newIds.includes(achievement.id));
}

/**
 * Get achievement progress for display
 * @param {Object} user - User object
 * @param {Array} allModules - All available modules
 * @returns {Object} Progress data for each achievement category
 */
export function getAchievementProgress(user, allModules) {
  const completedCount = user.moduleProgress?.filter(mp => mp.completedAt).length || 0;
  const streak = user.currentStreak || 0;
  const points = user.totalPoints || 0;

  return {
    modules: {
      current: completedCount,
      targets: [
        { value: 5, achieved: completedCount >= 5 },
        { value: 10, achieved: completedCount >= 10 },
        { value: 15, achieved: completedCount >= 15 },
      ],
    },
    streaks: {
      current: streak,
      targets: [
        { value: 3, achieved: streak >= 3 },
        { value: 7, achieved: streak >= 7 },
        { value: 30, achieved: streak >= 30 },
        { value: 100, achieved: streak >= 100 },
      ],
    },
    points: {
      current: points,
      targets: [
        { value: 500, achieved: points >= 500 },
        { value: 1000, achieved: points >= 1000 },
        { value: 2500, achieved: points >= 2500 },
      ],
    },
  };
}

/**
 * Get all achievements with unlock status
 * @param {Array} unlockedIds - Array of unlocked achievement IDs
 * @returns {Array} All achievements with isUnlocked flag
 */
export function getAllAchievementsWithStatus(unlockedIds) {
  return ACHIEVEMENTS.map(achievement => ({
    ...achievement,
    isUnlocked: unlockedIds.includes(achievement.id),
  }));
}

/**
 * Get achievements by category
 * @param {String} category - Category name
 * @returns {Array} Achievements in that category
 */
export function getAchievementsByCategory(category) {
  return ACHIEVEMENTS.filter(achievement => achievement.category === category);
}

/**
 * Calculate total achievement points earned
 * @param {Array} unlockedIds - Array of unlocked achievement IDs
 * @returns {Number} Total points from achievements
 */
export function calculateAchievementPoints(unlockedIds) {
  return ACHIEVEMENTS
    .filter(achievement => unlockedIds.includes(achievement.id))
    .reduce((sum, achievement) => sum + achievement.points, 0);
}

export default {
  ACHIEVEMENTS,
  checkUnlockedAchievements,
  getNewAchievements,
  getAchievementProgress,
  getAllAchievementsWithStatus,
  getAchievementsByCategory,
  calculateAchievementPoints,
};
