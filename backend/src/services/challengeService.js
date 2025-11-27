import User from '../models/User.js';
import DailyChallenge from '../models/DailyChallenge.js';
import WeeklyChallenge from '../models/WeeklyChallenge.js';

class ChallengeService {
    // --- Daily Challenges ---

    async getDailyQuestion(userId) {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        // Check if user already answered today
        const today = new Date().toDateString();
        const lastAnswered = user.dailyChallenge?.lastAnsweredAt
            ? new Date(user.dailyChallenge.lastAnsweredAt).toDateString()
            : null;

        if (lastAnswered === today) {
            return {
                alreadyAnswered: true,
                message: 'You have already completed the daily challenge for today!'
            };
        }

        // Get a random question
        const count = await DailyChallenge.countDocuments({ isActive: true });
        const random = Math.floor(Math.random() * count);
        const question = await DailyChallenge.findOne({ isActive: true }).skip(random);

        if (!question) {
            throw new Error('No daily questions available');
        }

        // Return question without the correct answer
        const { correct, ...questionData } = question.toObject();
        return questionData;
    }

    async submitDailyAnswer(userId, questionId, answer) {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        const question = await DailyChallenge.findOne({ id: questionId });
        if (!question) throw new Error('Question not found');

        const isCorrect = question.correct === answer;
        let pointsEarned = 0;

        if (isCorrect) {
            pointsEarned = question.points;
            await user.awardXP(pointsEarned, 'daily_challenge');
        }

        // Update streak
        user.dailyChallenge = user.dailyChallenge || {};
        user.dailyChallenge.lastAnsweredAt = new Date();
        user.dailyChallenge.lastQuestionId = questionId;

        // Update daily streak logic
        const today = new Date().toDateString();
        const lastActive = user.lastActiveDate ? user.lastActiveDate.toDateString() : null;

        if (lastActive !== today) {
            user.updateDailyStreak();
        }

        await user.save();

        return {
            correct: isCorrect,
            correctAnswer: question.correct,
            pointsEarned,
            newTotalPoints: user.totalPoints,
            streak: user.currentStreak
        };
    }

    // --- Weekly Challenges ---

    async getWeeklyChallenges(userId) {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        // Get active weekly challenge
        const now = new Date();
        const activeChallenge = await WeeklyChallenge.findOne({
            isActive: true,
            startDate: { $lte: now },
            endDate: { $gte: now }
        });

        if (!activeChallenge) {
            return { message: 'No active weekly challenges at the moment.' };
        }

        // Get user progress for this week
        const userProgress = user.weeklyProgress?.find(p => p.weekId === activeChallenge.weekId) || {
            weekId: activeChallenge.weekId,
            claimedTasks: [],
            pointsEarned: 0
        };

        // Map tasks with status
        const tasksWithStatus = activeChallenge.tasks.map(task => {
            const isClaimed = userProgress.claimedTasks.includes(task.id);

            // Calculate progress based on task type
            let progress = 0;
            let isCompleted = false;

            switch (task.type) {
                case 'quiz':
                    progress = user.dailyChallenge?.currentStreak || 0;
                    break;
                case 'module':
                    progress = user.moduleProgress?.filter(m => m.completedAt).length || 0;
                    break;
                case 'streak':
                    progress = user.currentStreak || 0;
                    break;
                default:
                    progress = 0;
            }

            // If claimed, it's definitely completed
            if (isClaimed) {
                isCompleted = true;
                progress = task.target;
            } else {
                isCompleted = progress >= task.target;
            }

            return {
                ...task.toObject(),
                progress,
                isCompleted,
                isClaimed
            };
        });

        return {
            weekId: activeChallenge.weekId,
            title: activeChallenge.title,
            description: activeChallenge.description,
            endDate: activeChallenge.endDate,
            tasks: tasksWithStatus
        };
    }

    async claimTaskReward(userId, weekId, taskId) {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        const challenge = await WeeklyChallenge.findOne({ weekId });
        if (!challenge) throw new Error('Challenge not found');

        const task = challenge.tasks.find(t => t.id === taskId);
        if (!task) throw new Error('Task not found');

        // Initialize weekly progress if not exists
        let userProgress = user.weeklyProgress.find(p => p.weekId === weekId);
        if (!userProgress) {
            userProgress = { weekId, claimedTasks: [], pointsEarned: 0 };
            user.weeklyProgress.push(userProgress);
            // Re-fetch to get the object reference from the array
            userProgress = user.weeklyProgress.find(p => p.weekId === weekId);
        }

        if (userProgress.claimedTasks.includes(taskId)) {
            throw new Error('Reward already claimed');
        }

        userProgress.claimedTasks.push(taskId);
        userProgress.pointsEarned += task.points;

        await user.awardXP(task.points, 'weekly_challenge');
        await user.save();

        return {
            success: true,
            message: 'Reward claimed!',
            pointsEarned: task.points,
            newTotalPoints: user.totalPoints
        };
    }

    // --- Leaderboard ---

    async getLeaderboard(limit = 10) {
        const users = await User.find({}, 'name totalPoints proficiencyLevel currentStreak avatar')
            .sort({ totalPoints: -1 })
            .limit(limit);

        return users.map((user, index) => ({
            rank: index + 1,
            id: user._id,
            name: user.name,
            points: user.totalPoints,
            level: user.proficiencyLevel,
            streak: user.currentStreak,
            avatar: user.avatar // Assuming avatar field exists or handled by frontend
        }));
    }
}

export default new ChallengeService();
