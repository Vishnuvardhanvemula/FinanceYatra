/**
 * Module Routes
 * API endpoints for learning module progress tracking
 */

import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import { learningModules } from '../data/learningModules.js';

const router = express.Router();

/**
 * GET /api/modules/progress
 * Get user's module progress
 */
router.get('/progress', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      moduleProgress: user.moduleProgress,
      totalPoints: user.totalPoints,
      achievements: user.achievements
    });
  } catch (error) {
    console.error('Error fetching module progress:', error);
    res.status(500).json({ error: 'Failed to fetch module progress' });
  }
});

/**
 * GET /api/modules/:moduleId/progress
 * Get progress for a specific module
 */
router.get('/:moduleId/progress', authenticate, async (req, res) => {
  try {
    const { moduleId } = req.params;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const moduleProgress = user.getModuleProgress(moduleId);

    res.json({
      moduleId,
      progress: moduleProgress || {
        moduleId,
        completedLessons: [],
        startedAt: null,
        completedAt: null,
        quizScore: null
      }
    });
  } catch (error) {
    console.error('Error fetching module progress:', error);
    res.status(500).json({ error: 'Failed to fetch module progress' });
  }
});

/**
 * POST /api/modules/:moduleId/start
 * Start a module
 */
router.post('/:moduleId/start', authenticate, async (req, res) => {
  try {
    const { moduleId } = req.params;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.startModule(moduleId);

    console.log(`📚 User ${user.name} started module: ${moduleId}`);

    res.json({
      success: true,
      message: 'Module started',
      moduleId
    });
  } catch (error) {
    console.error('Error starting module:', error);
    res.status(500).json({ error: 'Failed to start module' });
  }
});

/**
 * POST /api/modules/:moduleId/lessons/:lessonIndex/complete
 * Mark a lesson as complete
 */
router.post('/:moduleId/lessons/:lessonIndex/complete', authenticate, async (req, res) => {
  try {
    const { moduleId, lessonIndex } = req.params;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Store current achievements before completing lesson
    const currentAchievements = [...user.achievements];

    await user.completeLesson(moduleId, parseInt(lessonIndex));

    console.log(`✅ User ${user.name} completed lesson ${lessonIndex} in module ${moduleId}`);

    // Check for newly unlocked achievements - pass learningModules data
    const { checkUnlockedAchievements, getNewAchievements, ACHIEVEMENTS } = await import('../services/achievementService.js');
    const allUnlockedIds = checkUnlockedAchievements(user, learningModules);
    const currentAchievementIds = currentAchievements.map(a => a.id);
    const newlyUnlockedAchievements = getNewAchievements(currentAchievementIds, allUnlockedIds);

    // Update user achievements if there are new ones
    if (newlyUnlockedAchievements.length > 0) {
      // Add new achievements to existing ones
      newlyUnlockedAchievements.forEach(achievement => {
        user.achievements.push({
          id: achievement.id,
          name: achievement.title,
          unlockedAt: new Date()
        });
      });
      await user.save();
      console.log(`🏆 User ${user.name} unlocked ${newlyUnlockedAchievements.length} achievement(s) after completing lesson ${lessonIndex}`);
      console.log(`🏆 Achievement details:`, newlyUnlockedAchievements.map(a => ({ id: a.id, name: a.title })));
    }

    const moduleProgress = user.getModuleProgress(moduleId);

    res.json({
      success: true,
      message: 'Lesson marked as complete',
      moduleId,
      lessonIndex: parseInt(lessonIndex),
      completedLessons: moduleProgress.completedLessons,
      newAchievements: newlyUnlockedAchievements
    });
  } catch (error) {
    console.error('Error completing lesson:', error);
    res.status(500).json({ error: 'Failed to complete lesson' });
  }
});

/**
 * POST /api/modules/:moduleId/lessons/:lessonIndex/uncomplete
 * Mark a lesson as incomplete
 */
router.post('/:moduleId/lessons/:lessonIndex/uncomplete', authenticate, async (req, res) => {
  try {
    const { moduleId, lessonIndex } = req.params;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.uncompleteLesson(moduleId, parseInt(lessonIndex));

    console.log(`❌ User ${user.name} unmarked lesson ${lessonIndex} in module ${moduleId}`);

    const moduleProgress = user.getModuleProgress(moduleId);

    res.json({
      success: true,
      message: 'Lesson marked as incomplete',
      moduleId,
      lessonIndex: parseInt(lessonIndex),
      completedLessons: moduleProgress?.completedLessons || []
    });
  } catch (error) {
    console.error('Error uncompleting lesson:', error);
    res.status(500).json({ error: 'Failed to uncomplete lesson' });
  }
});

/**
 * POST /api/modules/:moduleId/complete
 * Mark entire module as complete
 */
router.post('/:moduleId/complete', authenticate, async (req, res) => {
  try {
    const { moduleId } = req.params;
    const { quizScore, correctAnswers, totalQuestions, difficulty } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Store current achievements before completing module
    const currentAchievements = [...user.achievements];

    // Find module difficulty from learningModules if not provided
    let moduleDifficulty = difficulty || 'beginner';
    if (!difficulty) {
      const module = learningModules.find(m => m.id === moduleId);
      moduleDifficulty = module?.difficulty || 'beginner';
    }

    // Complete module with XP config parameters
    await user.completeModule(
      moduleId,
      moduleDifficulty,
      quizScore || null,
      correctAnswers || 0,
      totalQuestions || 0
    );

    // Import achievement service dynamically
    const { checkUnlockedAchievements, getNewAchievements, ACHIEVEMENTS } = await import('../services/achievementService.js');

    // Check for newly unlocked achievements - pass learningModules data
    const allUnlockedIds = checkUnlockedAchievements(user, learningModules);
    const currentAchievementIds = currentAchievements.map(a => a.id);
    const newlyUnlocked = getNewAchievements(currentAchievementIds, allUnlockedIds);

    // Update user achievements if there are new ones
    if (newlyUnlocked.length > 0) {
      // Add new achievements to existing ones
      newlyUnlocked.forEach(achievement => {
        user.achievements.push({
          id: achievement.id,
          name: achievement.title,
          unlockedAt: new Date()
        });
      });
      await user.save();
      console.log(`🏆 New achievements unlocked: ${newlyUnlocked.map(a => a.title).join(', ')}`);
      console.log(`🏆 Achievement details:`, newlyUnlocked.map(a => ({ id: a.id, name: a.title })));
    } else {
      // Still need to save the module completion even if no new achievements
      await user.save();
    }

    console.log(`🎉 User ${user.name} completed module: ${moduleId} (${moduleDifficulty})`);

    const moduleProgress = user.getModuleProgress(moduleId);

    // Calculate XP earned
    const moduleXP = {
      beginner: 100,
      intermediate: 250,
      expert: 500
    };
    const baseModuleXP = moduleXP[moduleDifficulty] || 100;
    let quizXP = (correctAnswers || 0) * 10;
    if (quizScore === 100 || (totalQuestions > 0 && correctAnswers === totalQuestions)) {
      quizXP += 50;
    }
    const totalXPEarned = baseModuleXP + quizXP;

    res.json({
      success: true,
      message: 'Module completed! Congratulations! 🎉',
      moduleId,
      completedAt: moduleProgress.completedAt,
      quizScore: moduleProgress.quizScore,
      pointsEarned: totalXPEarned,
      totalPoints: user.totalPoints,
      xp: user.totalPoints, // Alias for compatibility
      newAchievements: newlyUnlocked
    });
  } catch (error) {
    console.error('Error completing module:', error);
    res.status(500).json({ error: 'Failed to complete module' });
  }
});

/**
 * GET /api/modules/stats
 * Get user's overall learning statistics
 */
router.get('/stats', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const totalModules = 15; // From learningModules.js
    const completedModules = user.moduleProgress.filter(m => m.completedAt).length;
    const inProgressModules = user.moduleProgress.filter(m => !m.completedAt).length;

    res.json({
      totalModules,
      completedModules,
      inProgressModules,
      remainingModules: totalModules - completedModules - inProgressModules,
      completionPercentage: Math.round((completedModules / totalModules) * 100),
      totalPoints: user.totalPoints,
      achievements: user.achievements.length,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak
    });
  } catch (error) {
    console.error('Error fetching module stats:', error);
    res.status(500).json({ error: 'Failed to fetch module stats' });
  }
});

export default router;
