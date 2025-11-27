import Badge from '../models/Badge.js';
import User from '../models/User.js';

/**
 * Check and award badges for a user based on their current state
 * @param {String} userId - User ID
 * @param {String} triggerType - What triggered the check (e.g., 'login', 'module_complete')
 */
export const checkAndAwardBadges = async (userId, triggerType = 'all') => {
    try {
        const user = await User.findById(userId);
        if (!user) return;

        // Fetch all active badges
        const badges = await Badge.find({ isActive: true });

        const newBadges = [];

        for (const badge of badges) {
            // Skip if already earned
            if (user.badges.some(b => b.badgeId === badge.badgeId)) continue;

            let earned = false;

            // Evaluate criteria
            switch (badge.criteria.type) {
                case 'streak_days':
                    if (user.currentStreak >= badge.criteria.value) earned = true;
                    break;

                case 'modules_completed':
                    const completedCount = user.moduleProgress?.filter(mp => mp.completedAt).length || 0;
                    if (completedCount >= badge.criteria.value) earned = true;
                    break;

                case 'total_xp':
                    if ((user.xp || 0) >= badge.criteria.value) earned = true; // Assuming user.xp tracks total
                    break;

                case 'time_of_day':
                    // This usually requires passing the specific event time, 
                    // or we check the last activity.
                    // For simplicity, we might handle this in specific controllers.
                    // But let's check if we can do it here if we had context.
                    break;

                // Add more criteria handlers as needed
            }

            if (earned) {
                user.badges.push({
                    badgeId: badge.badgeId,
                    earnedAt: new Date(),
                    isDisplayed: false
                });

                // Award XP
                if (badge.xpReward > 0) {
                    user.xp = (user.xp || 0) + badge.xpReward;
                    // Also update totalPoints if it exists?
                    if (user.totalPoints !== undefined) {
                        user.totalPoints += badge.xpReward;
                    }
                }

                newBadges.push(badge);
            }
        }

        if (newBadges.length > 0) {
            await user.save();
            return newBadges;
        }

        return [];

    } catch (error) {
        console.error('Error checking badges:', error);
        return [];
    }
};

/**
 * Get badge progress for a user
 */
export const getBadgeProgress = async (userId) => {
    // Implementation for progress tracking
    // This would calculate % completion for each unearned badge
    return {};
};
