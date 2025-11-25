/**
 * Authentication Routes
 * Handles user registration, login, profile management
 */

import express from 'express';
import authService from '../services/authService.js';
import proficiencyService from '../services/proficiencyService.js';
import { authenticate } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, preferredLanguage } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and name are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Register user
    const result = await authService.register({
      email,
      password,
      name,
      preferredLanguage: preferredLanguage || 'en'
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result
    });

  } catch (error) {
    console.error('❌ Register route error:', error.message);

    res.status(400).json({
      success: false,
      message: error.message || 'Registration failed'
    });
  }
});

/**
 * POST /api/auth/login
 * Login user
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Login user
    const result = await authService.login(email, password);

    res.json({
      success: true,
      message: 'Login successful',
      data: result
    });

  } catch (error) {
    console.error('❌ Login route error:', error.message);

    res.status(401).json({
      success: false,
      message: error.message || 'Login failed'
    });
  }
});

/**
 * GET /api/auth/profile
 * Get current user profile
 */
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password')
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Add virtual fields explicitly for compatibility
    user.xp = user.totalPoints || 0;
    user.points = user.totalPoints || 0;
    user.streak = user.currentStreak || 0;

    res.json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error('❌ Get profile error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile'
    });
  }
});

/**
 * PUT /api/auth/profile
 * Update user profile
 */
router.put('/profile', authenticate, async (req, res) => {
  try {
    const updates = req.body;
    const updatedUser = await authService.updateProfile(req.userId, updates);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });

  } catch (error) {
    console.error('❌ Update profile error:', error.message);

    res.status(400).json({
      success: false,
      message: error.message || 'Profile update failed'
    });
  }
});

/**
 * POST /api/auth/change-password
 * Change user password
 */
router.post('/change-password', authenticate, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    const result = await authService.changePassword(
      req.userId,
      currentPassword,
      newPassword
    );

    res.json({
      success: true,
      message: result.message
    });

  } catch (error) {
    console.error('❌ Change password error:', error.message);

    res.status(400).json({
      success: false,
      message: error.message || 'Password change failed'
    });
  }
});

/**
 * DELETE /api/auth/account
 * Delete user account
 */
router.delete('/account', authenticate, async (req, res) => {
  try {
    const result = await authService.deleteAccount(req.userId);

    res.json({
      success: true,
      message: result.message
    });

  } catch (error) {
    console.error('❌ Delete account error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Failed to delete account'
    });
  }
});

/**
 * POST /api/auth/assess-proficiency
 * Manually trigger proficiency assessment
 */
router.post('/assess-proficiency', authenticate, async (req, res) => {
  try {
    const { questions } = req.body;

    if (!questions || !Array.isArray(questions)) {
      return res.status(400).json({
        success: false,
        message: 'Questions array is required'
      });
    }

    // Detect proficiency
    const analysis = await proficiencyService.detectProficiency(questions);

    // Update user
    const user = await User.findById(req.userId);
    await user.updateProficiency(analysis.level, analysis.score);

    res.json({
      success: true,
      message: 'Proficiency assessed successfully',
      data: {
        level: analysis.level,
        score: analysis.score,
        reasoning: analysis.reasoning
      }
    });

  } catch (error) {
    console.error('❌ Assess proficiency error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Failed to assess proficiency'
    });
  }
});

/**
 * POST /api/auth/logout
 * Logout user (client-side token removal)
 */
router.post('/logout', authenticate, async (req, res) => {
  try {
    // Note: JWT logout is handled client-side by removing the token
    // This endpoint exists for consistency and future server-side session management

    res.json({
      success: true,
      message: 'Logged out successfully'
    });

  } catch (error) {
    console.error('❌ Logout error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Logout failed'
    });
  }
});

/**
 * POST /api/auth/progress
 * Update module progress
 */
router.post('/progress', authenticate, async (req, res) => {
  try {
    const { moduleId, lastCompletedLesson, xpEarned, isCompleted } = req.body;

    if (!moduleId || lastCompletedLesson === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Module ID and last completed lesson are required'
      });
    }

    const result = await authService.updateModuleProgress(
      req.userId,
      moduleId,
      lastCompletedLesson,
      xpEarned,
      isCompleted
    );

    res.json({
      success: true,
      message: result.message,
      xpAwarded: result.xpAwarded
    });

  } catch (error) {
    console.error('❌ Update progress error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Failed to update progress'
    });
  }
});

export default router;
