/**
 * Authentication Service
 * Handles user registration, login, and JWT token management
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

class AuthService {
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    this.jwtExpire = process.env.JWT_EXPIRE || '7d';
    this.saltRounds = 10;
  }

  /**
   * Register a new user
   */
  async register(userData) {
    const { email, password, name, preferredLanguage } = userData;

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        throw new Error('User already exists with this email');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, this.saltRounds);

      // Create new user
      const user = new User({
        email: email.toLowerCase(),
        password: hashedPassword,
        name,
        preferredLanguage: preferredLanguage || 'en',
        proficiencyLevel: 'unknown', // Will be detected after questions
        createdAt: new Date()
      });

      await user.save();

      // Generate JWT token
      const token = this.generateToken(user._id);

      console.log(`✅ New user registered: ${email}`);

      return {
        token,
        user: this.sanitizeUser(user)
      };

    } catch (error) {
      console.error('❌ Registration error:', error.message);
      throw error;
    }
  }

  /**
   * Login user with email and password
   */
  async login(email, password) {
    try {
      // Find user
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      // Update last login
      user.lastLogin = new Date();

      // Update daily streak (Daily Active User)
      user.updateDailyStreak();

      await user.save();

      // Generate JWT token
      const token = this.generateToken(user._id);

      console.log(`✅ User logged in: ${email}`);

      return {
        token,
        user: this.sanitizeUser(user)
      };

    } catch (error) {
      console.error('❌ Login error:', error.message);
      throw error;
    }
  }

  /**
   * Generate JWT token
   */
  generateToken(userId) {
    return jwt.sign(
      { userId },
      this.jwtSecret,
      { expiresIn: this.jwtExpire }
    );
  }

  /**
   * Verify JWT token
   */
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return this.sanitizeUser(user);
    } catch (error) {
      console.error('❌ Get user error:', error.message);
      throw error;
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(userId, updates) {
    try {
      const allowedUpdates = ['name', 'preferredLanguage'];
      const filteredUpdates = {};

      // Only allow specific fields to be updated
      Object.keys(updates).forEach(key => {
        if (allowedUpdates.includes(key)) {
          filteredUpdates[key] = updates[key];
        }
      });

      const user = await User.findByIdAndUpdate(
        userId,
        filteredUpdates,
        { new: true, runValidators: true }
      );

      if (!user) {
        throw new Error('User not found');
      }

      console.log(`✅ Profile updated for user: ${user.email}`);

      return this.sanitizeUser(user);

    } catch (error) {
      console.error('❌ Update profile error:', error.message);
      throw error;
    }
  }

  /**
   * Change password
   */
  async changePassword(userId, currentPassword, newPassword) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Verify current password
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        throw new Error('Current password is incorrect');
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, this.saltRounds);
      user.password = hashedPassword;
      await user.save();

      console.log(`✅ Password changed for user: ${user.email}`);

      return { message: 'Password changed successfully' };

    } catch (error) {
      console.error('❌ Change password error:', error.message);
      throw error;
    }
  }

  /**
   * Remove sensitive data from user object
   */
  sanitizeUser(user) {
    const userObject = user.toObject ? user.toObject() : user;
    const { password, __v, ...sanitized } = userObject;
    return sanitized;
  }

  /**
   * Delete user account
   */
  async deleteAccount(userId) {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        throw new Error('User not found');
      }

      console.log(`✅ User account deleted: ${user.email}`);

      return { message: 'Account deleted successfully' };

    } catch (error) {
      console.error('❌ Delete account error:', error.message);
      throw error;
    }
  }

  /**
   * Update module progress
   */
  async updateModuleProgress(userId, moduleId, lastCompletedLesson, xpEarned = 0, isCompleted = false) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }



      let moduleProgress = user.moduleProgress.find(m => m.moduleId === moduleId);
      let isNewLesson = false;

      if (!moduleProgress) {
        // Start module if not started
        user.moduleProgress.push({
          moduleId,
          completedLessons: [lastCompletedLesson],
          lastCompletedLesson,
          startedAt: new Date()
        });
        isNewLesson = true;
      } else {
        // Update existing progress
        moduleProgress.lastCompletedLesson = lastCompletedLesson;

        // Add to completed lessons if not already there
        if (!moduleProgress.completedLessons.includes(lastCompletedLesson)) {
          moduleProgress.completedLessons.push(lastCompletedLesson);
          isNewLesson = true;
        }
      }

      // Mark as completed if flag is set
      if (isCompleted) {
        moduleProgress.completedAt = new Date();
        console.log(`🏆 Module ${moduleId} completed by user ${user.email}`);
      }

      // Award XP only if it's a new lesson (prevent farming)
      if (xpEarned > 0 && isNewLesson) {
        user.awardXP(xpEarned, 'lesson_quiz');
        console.log(`✨ Awarded ${xpEarned} XP to ${user.email} for new lesson completion`);
      } else if (xpEarned > 0) {
        console.log(`⚠️ No XP awarded to ${user.email} (Lesson already completed)`);
      }


      await user.save();
      return {
        message: 'Progress updated successfully',
        xpAwarded: (xpEarned > 0 && isNewLesson) ? xpEarned : 0
      };

    } catch (error) {
      console.error('❌ Update progress error:', error.message);
      throw error;
    }
  }
}

export default new AuthService();
