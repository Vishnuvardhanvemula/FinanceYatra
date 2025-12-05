/**
 * Dashboard Routes
 * API endpoints for user dashboard, analytics, and achievements
 */

import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import analyticsService from '../services/analyticsService.js';
import achievementService from '../services/achievementService.js';
import recommendationService from '../services/recommendationService.js';
import { learningModules } from '../data/learningModules.js';
import { handleChat } from '../controllers/chatController.js';

const router = express.Router();

/**
 * GET /api/dashboard/analytics
 * Get comprehensive analytics summary for the user
 */
router.get('/analytics', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Generate analytics summary
    const analytics = analyticsService.generateAnalyticsSummary(user, learningModules);

    console.log(`📊 Analytics retrieved - User: ${req.userId}`);

    res.json({
      success: true,
      data: analytics
    });

  } catch (error) {
    console.error('❌ Error fetching analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics',
      error: error.message
    });
  }
});

/**
 * GET /api/dashboard/achievements
 * Get all achievements with unlock status
 */
router.get('/achievements', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check unlocked achievements
    const unlockedIds = achievementService.checkUnlockedAchievements(user, learningModules);

    // Get all achievements with status
    const achievements = achievementService.getAllAchievementsWithStatus(unlockedIds);

    // Get achievement progress
    const progress = achievementService.getAchievementProgress(user, learningModules);

    // Calculate achievement points
    const achievementPoints = achievementService.calculateAchievementPoints(unlockedIds);

    console.log(`🏆 Achievements retrieved - User: ${req.userId}, Unlocked: ${unlockedIds.length}`);

    res.json({
      success: true,
      data: {
        achievements,
        progress,
        stats: {
          total: achievementService.ACHIEVEMENTS.length,
          unlocked: unlockedIds.length,
          locked: achievementService.ACHIEVEMENTS.length - unlockedIds.length,
          achievementPoints,
        }
      }
    });

  } catch (error) {
    console.error('❌ Error fetching achievements:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch achievements',
      error: error.message
    });
  }
});

/**
 * POST /api/dashboard/check-achievements
 * Check and unlock new achievements for the user
 */
router.post('/check-achievements', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const currentAchievementIds = user.achievements.map(a => a.id);

    const unlockedIds = achievementService.checkUnlockedAchievements(user, learningModules);

    const newAchievements = achievementService.getNewAchievements(
      currentAchievementIds,
      unlockedIds
    );

    if (newAchievements.length > 0) {
      for (const achievement of newAchievements) {
        user.achievements.push({
          id: achievement.id,
          name: achievement.title,
          unlockedAt: new Date()
        });

        // Award achievement points
        user.totalPoints += achievement.points;
      }

      await user.save();

      console.log(`🎉 New achievements unlocked - User: ${req.userId}, Count: ${newAchievements.length}`);
    }

    res.json({
      success: true,
      data: {
        newAchievements,
        totalPoints: user.totalPoints,
        totalAchievements: user.achievements.length
      }
    });

  } catch (error) {
    console.error('❌ Error checking achievements:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check achievements',
      error: error.message
    });
  }
});

/**
 * GET /api/dashboard/stats
 * Get quick stats for dashboard overview
 */
router.get('/stats', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Calculate key statistics
    const streak = user.currentStreak || 0;
    const moduleStats = analyticsService.calculateModuleStats(
      user.moduleProgress || [],
      learningModules
    );
    const learningTime = analyticsService.calculateLearningTime(
      user.moduleProgress || [],
      learningModules
    );
    const unlockedAchievements = achievementService.checkUnlockedAchievements(
      user,
      learningModules
    );

    const stats = {
      totalPoints: user.totalPoints || 0,
      streak: streak,
      modulesCompleted: moduleStats.completedModules,
      totalModules: moduleStats.totalModules,
      achievementsUnlocked: unlockedAchievements.length,
      totalAchievements: achievementService.ACHIEVEMENTS.length,
      learningTimeMinutes: learningTime,
      proficiencyLevel: user.proficiencyLevel || 'beginner',
      proficiencyScore: user.proficiencyScore || 0,
    };

    console.log(`📈 Quick stats retrieved - User: ${req.userId}`);

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('❌ Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stats',
      error: error.message
    });
  }
});

/**
 * POST /api/dashboard/activity
 * Log user activity for streak tracking
 */
router.post('/activity', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const result = await analyticsService.logActivity(user);

    console.log(`✅ Activity logged - User: ${req.userId}, Streak: ${result.currentStreak}`);

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('❌ Error logging activity:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to log activity',
      error: error.message
    });
  }
});

/**
 * GET /api/dashboard/recommendations
 * Get personalized learning recommendations
 */
router.get('/recommendations', authenticate, async (req, res) => {
  try {
    const data = await recommendationService.getRecommendations(req.userId);

    res.json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('❌ Recommendation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get recommendations'
    });
  }
});

/**
 * POST /api/dashboard/chat
 * Chat with the AI Financial Advisor
 */
router.post('/chat', authenticate, handleChat);

export default router;
