import User from '../models/User.js';
import Module from '../models/Module.js';

class ModuleService {
    async getAllModules() {
        const modules = await Module.find({ isActive: true }).sort({ order: 1 });
        return modules;
    }

    async getModuleById(id) {
        let module = await Module.findOne({ id });
        if (!module && id.match(/^[0-9a-fA-F]{24}$/)) {
            module = await Module.findById(id);
        }
        if (!module) throw new Error('Module not found');
        return module;
    }

    async startModule(userId, moduleId) {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        const module = await Module.findOne({ id: moduleId });
        if (!module) throw new Error('Module not found');

        await user.startModule(moduleId);
        return { success: true, message: 'Module started', moduleId };
    }

    async completeLesson(userId, moduleId, lessonIndex) {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        const module = await Module.findOne({ id: moduleId });
        if (!module) throw new Error('Module not found');

        const currentAchievements = [...user.achievements];
        await user.completeLesson(moduleId, parseInt(lessonIndex));

        // Check for achievements
        const allModules = await Module.find({ isActive: true });
        const { checkUnlockedAchievements, getNewAchievements } = await import('./achievementService.js');
        const allUnlockedIds = checkUnlockedAchievements(user, allModules);
        const currentAchievementIds = currentAchievements.map(a => a.id);
        const newlyUnlocked = getNewAchievements(currentAchievementIds, allUnlockedIds);

        let newAchievementData = [];
        if (newlyUnlocked.length > 0) {
            let achievementPoints = 0;
            newlyUnlocked.forEach(achievement => {
                user.achievements.push({
                    id: achievement.id,
                    name: achievement.title,
                    unlockedAt: new Date()
                });
                achievementPoints += (achievement.points || 0);
                newAchievementData.push({ id: achievement.id, name: achievement.title, points: achievement.points });
            });

            if (achievementPoints > 0) {
                await user.awardXP(achievementPoints, 'achievement');
            }
            await user.save();
        }

        const moduleProgress = user.getModuleProgress(moduleId);

        return {
            success: true,
            message: 'Lesson marked as complete',
            moduleId,
            lessonIndex: parseInt(lessonIndex),
            completedLessons: moduleProgress.completedLessons,
            newAchievements: newAchievementData
        };
    }

    async uncompleteLesson(userId, moduleId, lessonIndex) {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        await user.uncompleteLesson(moduleId, parseInt(lessonIndex));
        const moduleProgress = user.getModuleProgress(moduleId);

        return {
            success: true,
            message: 'Lesson marked as incomplete',
            moduleId,
            lessonIndex: parseInt(lessonIndex),
            completedLessons: moduleProgress?.completedLessons || []
        };
    }

    async completeModule(userId, moduleId, data) {
        const { quizScore, correctAnswers, totalQuestions, difficulty } = data;
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        const module = await Module.findOne({ id: moduleId });
        if (!module) throw new Error('Module not found');

        const currentAchievements = [...user.achievements];

        let moduleDifficulty = difficulty || module.difficulty || 'beginner';

        await user.completeModule(
            moduleId,
            moduleDifficulty,
            quizScore || null,
            correctAnswers || 0,
            totalQuestions || 0
        );

        // Check achievements
        const allModules = await Module.find({ isActive: true });
        const { checkUnlockedAchievements, getNewAchievements } = await import('./achievementService.js');
        const allUnlockedIds = checkUnlockedAchievements(user, allModules);
        const currentAchievementIds = currentAchievements.map(a => a.id);
        const newlyUnlocked = getNewAchievements(currentAchievementIds, allUnlockedIds);

        let newAchievementData = [];
        if (newlyUnlocked.length > 0) {
            let achievementPoints = 0;
            newlyUnlocked.forEach(achievement => {
                user.achievements.push({
                    id: achievement.id,
                    name: achievement.title,
                    unlockedAt: new Date()
                });
                achievementPoints += (achievement.points || 0);
                newAchievementData.push({ id: achievement.id, name: achievement.title, points: achievement.points });
            });

            if (achievementPoints > 0) {
                await user.awardXP(achievementPoints, 'achievement');
            }
        }
        await user.save();

        const moduleProgress = user.getModuleProgress(moduleId);

        // Calculate XP
        const moduleXP = { beginner: 100, intermediate: 250, expert: 500 };
        const baseModuleXP = moduleXP[moduleDifficulty] || 100;
        let quizXP = (correctAnswers || 0) * 10;
        if (quizScore === 100 || (totalQuestions > 0 && correctAnswers === totalQuestions)) {
            quizXP += 50;
        }
        const totalXPEarned = baseModuleXP + quizXP;

        return {
            success: true,
            message: 'Module completed! Congratulations! 🎉',
            moduleId,
            completedAt: moduleProgress.completedAt,
            quizScore: moduleProgress.quizScore,
            pointsEarned: totalXPEarned,
            totalPoints: user.totalPoints,
            xp: user.totalPoints,
            newAchievements: newAchievementData
        };
    }

    async getModuleProgress(userId, moduleId) {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        const moduleProgress = user.getModuleProgress(moduleId);
        return {
            moduleId,
            progress: moduleProgress || {
                moduleId,
                completedLessons: [],
                startedAt: null,
                completedAt: null,
                quizScore: null
            }
        };
    }

    async getUserStats(userId) {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        const totalModules = await Module.countDocuments({ isActive: true });
        const completedModules = user.moduleProgress.filter(m => m.completedAt).length;
        const inProgressModules = user.moduleProgress.filter(m => !m.completedAt).length;

        return {
            totalModules,
            completedModules,
            inProgressModules,
            remainingModules: totalModules - completedModules - inProgressModules,
            completionPercentage: totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0,
            totalPoints: user.totalPoints,
            achievements: user.achievements.length,
            currentStreak: user.currentStreak,
            longestStreak: user.longestStreak
        };
    }

    async createModule(data) {
        // Check if module ID already exists
        const existing = await Module.findOne({ id: data.id });
        if (existing) {
            throw new Error('Module with this ID already exists');
        }

        // Get the highest order to append to the end
        if (!data.order) {
            const lastModule = await Module.findOne().sort({ order: -1 });
            data.order = lastModule ? lastModule.order + 1 : 1;
        }

        const module = new Module(data);
        await module.save();
        return module;
    }

    async updateModule(id, data) {
        let module = await Module.findOne({ id });
        if (!module) {
            // Try finding by _id if it looks like an ObjectId
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                module = await Module.findById(id);
            }
        }

        if (!module) {
            throw new Error('Module not found');
        }

        Object.assign(module, data);
        await module.save();
        return module;
    }

    async deleteModule(id) {
        let result = await Module.deleteOne({ id });

        if (result.deletedCount === 0) {
            // Try deleting by _id if it looks like an ObjectId
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                result = await Module.deleteOne({ _id: id });
            }
        }

        if (result.deletedCount === 0) {
            throw new Error('Module not found');
        }
        return { success: true, message: 'Module deleted successfully' };
    }
}

export default new ModuleService();
