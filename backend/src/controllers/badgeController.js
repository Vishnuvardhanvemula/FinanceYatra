import Badge from '../models/Badge.js';
import User from '../models/User.js';
import { checkAndAwardBadges } from '../services/badgeService.js';

// Get all badges (including user status)
export const getAllBadges = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        const allBadges = await Badge.find({ isActive: true }).sort({ rarity: 1 });

        const badgesWithStatus = allBadges.map(badge => {
            const userBadge = user.badges.find(b => b.badgeId === badge.badgeId);
            const isEarned = !!userBadge;

            // Handle hidden badges
            if (badge.isHidden && !isEarned) {
                return {
                    badgeId: badge.badgeId,
                    name: '???',
                    description: '???',
                    icon: '🔒', // Or a generic lock icon
                    category: badge.category,
                    rarity: badge.rarity,
                    isEarned: false,
                    isHidden: true
                };
            }

            return {
                ...badge.toObject(),
                isEarned,
                earnedAt: userBadge ? userBadge.earnedAt : null
            };
        });

        res.json({
            success: true,
            data: badgesWithStatus
        });
    } catch (error) {
        console.error('Error fetching badges:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch badges'
        });
    }
};

// Manually trigger badge check (e.g. for debugging or specific events)
export const checkBadges = async (req, res) => {
    try {
        const userId = req.user._id;
        const newBadges = await checkAndAwardBadges(userId);

        res.json({
            success: true,
            newBadges
        });
    } catch (error) {
        console.error('Error checking badges:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to check badges'
        });
    }
};
