import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Badge from '../src/models/Badge.js';

dotenv.config();

const badges = [
    {
        badgeId: 'early_bird',
        name: 'Early Bird',
        description: 'Complete a lesson before 8 AM',
        icon: '🌅',
        category: 'activity',
        criteria: { type: 'time_of_day', value: '08:00' },
        rarity: 'common',
        xpReward: 50
    },
    {
        badgeId: 'streak_7',
        name: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        icon: '🔥',
        category: 'streak',
        criteria: { type: 'streak_days', value: 7 },
        rarity: 'rare',
        xpReward: 200
    },
    {
        badgeId: 'streak_30',
        name: 'Monthly Master',
        description: 'Maintain a 30-day streak',
        icon: '👑',
        category: 'streak',
        criteria: { type: 'streak_days', value: 30 },
        rarity: 'epic',
        xpReward: 1000
    },
    {
        badgeId: 'module_1',
        name: 'First Step',
        description: 'Complete your first module',
        icon: '🎓',
        category: 'milestone',
        criteria: { type: 'modules_completed', value: 1 },
        rarity: 'common',
        xpReward: 100
    },
    {
        badgeId: 'module_5',
        name: 'High Five',
        description: 'Complete 5 modules',
        icon: '🖐️',
        category: 'milestone',
        criteria: { type: 'modules_completed', value: 5 },
        rarity: 'rare',
        xpReward: 300
    },
    {
        badgeId: 'secret_clicker',
        name: 'Curious Cat',
        description: 'You found the hidden button!',
        icon: '🐱',
        category: 'special',
        criteria: { type: 'clicks', value: 100 },
        rarity: 'legendary',
        xpReward: 500,
        isHidden: true
    }
];

const seedBadges = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/financeyatra');
        console.log('Connected to MongoDB');

        await Badge.deleteMany({}); // Clear existing badges
        console.log('Cleared existing badges');

        await Badge.insertMany(badges);
        console.log(`Seeded ${badges.length} badges`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding badges:', error);
        process.exit(1);
    }
};

seedBadges();
