/**
 * XP Economy Configuration
 * Centralized values for all XP rewards in the application.
 */

export const XP_VALUES = {
    // Module Completion (based on difficulty)
    MODULE: {
        beginner: 100,
        intermediate: 250,
        expert: 500
    },

    // Quiz Rewards
    QUIZ: {
        PER_QUESTION: 10,
        PERFECT_SCORE_BONUS: 50
    },

    // Challenges
    CHALLENGE: {
        DAILY_EASY: 10,
        DAILY_MEDIUM: 25,
        DAILY_HARD: 50,
        WEEKLY: 150
    },

    // Streaks
    STREAK: {
        DAILY_LOGIN: 5,
        MILESTONE_7_DAYS: 50,
        MILESTONE_30_DAYS: 200
    },

    // Achievements (Generic fallback if not specified in DB)
    ACHIEVEMENT: {
        BRONZE: 50,
        SILVER: 100,
        GOLD: 250,
        PLATINUM: 500,
        LEGENDARY: 1000
    },

    // Rank Thresholds (Centralized)
    RANKS: {
        NOVICE: { min: 0, max: 500, label: 'Novice' },
        APPRENTICE: { min: 500, max: 1500, label: 'Apprentice' },
        EXPERT: { min: 1500, max: 3000, label: 'Expert' },
        MASTER: { min: 3000, max: 5000, label: 'Master' },
        LEGENDARY: { min: 5000, max: Infinity, label: 'Legendary' }
    }
};

export const getModuleXP = (difficulty) => {
    return XP_VALUES.MODULE[difficulty?.toLowerCase()] || XP_VALUES.MODULE.beginner;
};
