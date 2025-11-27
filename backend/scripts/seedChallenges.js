import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import DailyChallenge from '../src/models/DailyChallenge.js';
import WeeklyChallenge from '../src/models/WeeklyChallenge.js';
import { dailyQuestions } from '../src/data/challenges.js';

// Setup environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedChallenges = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Seed Daily Challenges
        await DailyChallenge.deleteMany({});
        console.log('Cleared existing daily challenges');

        const formattedDaily = dailyQuestions.map(q => ({
            ...q,
            isActive: true,
            category: 'General',
            difficulty: 'medium'
        }));

        await DailyChallenge.insertMany(formattedDaily);
        console.log(`Seeded ${formattedDaily.length} daily challenges`);

        // Seed Weekly Challenges (Example Data)
        await WeeklyChallenge.deleteMany({});
        console.log('Cleared existing weekly challenges');

        const currentWeek = getWeekNumber(new Date());
        const year = new Date().getFullYear();
        const weekId = `${year}-W${currentWeek}`;

        const weeklyData = [
            {
                id: `week-${currentWeek}`,
                weekId: weekId,
                title: 'Financial Foundations Week',
                description: 'Build your base by completing these core tasks.',
                startDate: getMonday(new Date()),
                endDate: getSunday(new Date()),
                isActive: true,
                tasks: [
                    {
                        id: 'task-1',
                        description: 'Complete 3 Daily Quizzes',
                        type: 'quiz',
                        target: 3,
                        points: 100
                    },
                    {
                        id: 'task-2',
                        description: 'Finish 1 Learning Module',
                        type: 'module',
                        target: 1,
                        points: 150
                    },
                    {
                        id: 'task-3',
                        description: 'Maintain a 3-day streak',
                        type: 'streak',
                        target: 3,
                        points: 200
                    }
                ]
            }
        ];

        await WeeklyChallenge.insertMany(weeklyData);
        console.log(`Seeded ${weeklyData.length} weekly challenges`);

        console.log('Challenge seeding completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding challenges:', error);
        process.exit(1);
    }
};

// Helper to get week number
function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
}

function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

function getSunday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? 0 : 7);
    return new Date(d.setDate(diff));
}

seedChallenges();
