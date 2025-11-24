/**
 * Reset User Data Script
 * Resets all user progress data while keeping accounts intact
 * Run with: node scripts/resetUserData.js
 */

import mongoose from 'mongoose';
import User from '../src/models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/financeyatra';

async function resetUserData() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Get all users
        const users = await User.find({});
        console.log(`📊 Found ${users.length} users`);

        // Reset each user's progress data
        for (const user of users) {
            console.log(`\n🔄 Resetting data for: ${user.name} (${user.email})`);

            // Reset progress fields
            user.totalPoints = 0;
            user.currentStreak = 0;
            user.longestStreak = 0;
            user.lastActiveDate = null;

            // Reset module progress
            user.moduleProgress = [];

            // Reset achievements
            user.achievements = [];

            // Reset weekly progress
            user.weeklyProgress = [];

            // Reset daily challenge
            user.dailyChallenge = {
                lastAnsweredAt: null,
                currentStreak: 0,
                lastQuestionId: null
            };

            // Reset activity tracking
            user.totalQuestionsAsked = 0;
            user.totalTimeSpent = 0;
            user.topicsExplored = [];
            user.activityLog = [];
            user.chatCount = 0;

            // Reset proficiency
            user.proficiencyLevel = 'unknown';
            user.proficiencyScore = 0;
            user.proficiencyAssessedAt = null;
            user.questionsAnalyzed = 0;
            user.proficiencyHistory = [];

            await user.save();
            console.log(`✅ Reset complete for ${user.name}`);
        }

        console.log('\n🎉 All user data has been reset!');
        console.log('📝 Summary:');
        console.log(`   - Users processed: ${users.length}`);
        console.log('   - All XP, streaks, and progress reset to 0');
        console.log('   - User accounts and credentials preserved');

    } catch (error) {
        console.error('❌ Error resetting user data:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('\n🔌 Database connection closed');
        process.exit(0);
    }
}

// Run the reset
resetUserData();
