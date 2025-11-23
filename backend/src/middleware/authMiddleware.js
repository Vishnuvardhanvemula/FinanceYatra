/**
 * Authentication Middleware
 * Verifies JWT tokens and protects routes
 */

import authService from '../services/authService.js';

/**
 * Middleware to verify JWT token and attach user to request
 */
export const authenticate = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please log in.'
      });
    }

    // Extract token
    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = authService.verifyToken(token);

    // Get user from database
    const user = await authService.getUserById(decoded.userId);

    // Attach user to request
    req.user = user;
    req.userId = user._id;

    next();

  } catch (error) {
    console.error('❌ Authentication error:', error.message);
    
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please log in again.',
      error: error.message
    });
  }
};

/**
 * Optional authentication - doesn't fail if no token
 * Used for routes that work with or without login
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = authService.verifyToken(token);
      const user = await authService.getUserById(decoded.userId);
      
      req.user = user;
      req.userId = user._id;
    }
    
    next();

  } catch (error) {
    // Don't fail, just proceed without user
    console.log('⚠️ Optional auth failed, proceeding without user');
    next();
  }
};

/**
 * Middleware to check if user has specific proficiency level
 */
export const requireProficiency = (minLevel) => {
  const levels = { beginner: 1, intermediate: 2, expert: 3 };
  
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const userLevel = levels[req.user.proficiencyLevel] || 0;
    const requiredLevel = levels[minLevel] || 0;

    if (userLevel < requiredLevel) {
      return res.status(403).json({
        success: false,
        message: `This feature requires ${minLevel} level or higher`
      });
    }

    next();
  };
};

/**
 * Middleware to ensure the user is an admin.
 */
export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }
  if (!req.user.isAdmin) {
    return res.status(403).json({ success: false, message: 'Administrator privileges required' });
  }
  next();
};
