import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Badge from '../models/Badge.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/financeyatra';

const badges = [
    // --- Streak Badges ---
    {
        badgeId: 'streak_3',
        name: 'Consistency is Key',
        description: 'Maintain a 3-day learning streak.',
        icon: '🔥',
        category: 'streak',
        criteria: { type: 'streak_days', value: 3 },
        rarity: 'common',
        xpReward: 50
    },
    {
        badgeId: 'streak_7',
        name: 'Week Warrior',
        description: 'Maintain a 7-day learning streak.',
        icon: '⚡',
        category: 'streak',
        criteria: { type: 'streak_days', value: 7 },
        rarity: 'uncommon',
        xpReward: 150
    },
    {
        badgeId: 'streak_30',
        name: 'Unstoppable',
        description: 'Maintain a 30-day learning streak.',
        icon: '🚀',
        category: 'streak',
        criteria: { type: 'streak_days', value: 30 },
        rarity: 'epic',
        xpReward: 500
    },

    // --- Module Badges ---
    {
        badgeId: 'module_1',
        name: 'First Step',
        description: 'Complete your first learning module.',
        icon: '🌱',
        category: 'milestone',
        criteria: { type: 'modules_completed', value: 1 },
        rarity: 'common',
        xpReward: 100
    },
    {
        badgeId: 'module_5',
        name: 'Knowledge Seeker',
        description: 'Complete 5 learning modules.',
        icon: '📚',
        category: 'milestone',
        criteria: { type: 'modules_completed', value: 5 },
        rarity: 'rare',
        xpReward: 300
    },
    {
        badgeId: 'module_all',
        name: 'Finance Guru',
        description: 'Complete all available modules.',
        icon: '🎓',
        category: 'milestone',
        criteria: { type: 'modules_completed', value: 10 }, // Adjust based on total modules
        rarity: 'legendary',
        xpReward: 1000
    },

    // --- XP Badges ---
    {
        badgeId: 'xp_1000',
        name: 'Rising Star',
        description: 'Earn 1,000 Total XP.',
        icon: '⭐',
        category: 'milestone',
        criteria: { type: 'total_xp', value: 1000 },
        rarity: 'uncommon',
        xpReward: 0
    },
    {
        badgeId: 'xp_5000',
        name: 'High Roller',
        description: 'Earn 5,000 Total XP.',
        icon: '💎',
        category: 'milestone',
        criteria: { type: 'total_xp', value: 5000 },
        rarity: 'epic',
        xpReward: 0
    },

    // --- Special Badges ---
    {
        badgeId: 'early_adopter',
        name: 'Early Adopter',
        description: 'Joined during the beta phase.',
        icon: '🦄',
        category: 'special',
        criteria: { type: 'special', value: true },
        rarity: 'rare',
        xpReward: 100
    },
    {
        badgeId: 'market_wizard',
        name: 'Market Wizard',
        description: 'Use the AI Market Analyst tool.',
        icon: '🧙‍♂️',
        category: 'activity',
        criteria: { type: 'feature_usage', value: 'market_analyst' },
        rarity: 'epic',
        xpReward: 200
    }
];

const seedBadges = async () => {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected');

        console.log('🗑️ Clearing existing badges...');
        await Badge.deleteMany({});

        console.log('🌱 Seeding badges...');
        await Badge.insertMany(badges);

        console.log('🎉 Badges seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding badges:', error);
        process.exit(1);
    }
};

seedBadges();
