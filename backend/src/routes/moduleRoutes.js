/**
 * Module Routes
 * API endpoints for learning module progress tracking
 */

import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import moduleService from '../services/moduleService.js';

const router = express.Router();

/**
 * GET /api/modules
 * Get all available modules
 */
router.get('/', async (req, res) => {
  try {
    const modules = await moduleService.getAllModules();
    res.json({ success: true, data: modules });
  } catch (error) {
    console.error('Error fetching modules:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch modules' });
  }
});

/**
 * GET /api/modules/:id
 * Get a specific module by ID
 */
router.get('/:id', async (req, res, next) => {
  // Skip if the route matches other specific paths like 'progress' or 'stats'
  if (['progress', 'stats'].includes(req.params.id)) return next();

  try {
    const module = await moduleService.getModuleById(req.params.id);
    res.json({ success: true, data: module });
  } catch (error) {
    console.error('Error fetching module:', error);
    if (error.message === 'Module not found') {
      return res.status(404).json({ success: false, message: 'Module not found' });
    }
    res.status(500).json({ success: false, message: 'Failed to fetch module' });
  }
});

/**
 * GET /api/modules/progress
 * Get user's module progress
 */
router.get('/progress', authenticate, async (req, res) => {
  try {
    const stats = await moduleService.getUserStats(req.userId);
    res.json(stats);
  } catch (error) {
    console.error('Error fetching module progress:', error);
    if (error.message === 'User not found') {
      return res.status(404).json({ error: error.message });
    }
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
    const result = await moduleService.getModuleProgress(req.userId, moduleId);
    res.json(result);
  } catch (error) {
    console.error('Error fetching module progress:', error);
    if (error.message === 'User not found') {
      return res.status(404).json({ error: error.message });
    }
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
    const result = await moduleService.startModule(req.userId, moduleId);
    res.json(result);
  } catch (error) {
    console.error('Error starting module:', error);
    if (error.message === 'User not found') {
      return res.status(404).json({ error: error.message });
    }
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
    const result = await moduleService.completeLesson(req.userId, moduleId, lessonIndex);
    res.json(result);
  } catch (error) {
    console.error('Error completing lesson:', error);
    if (error.message === 'User not found') {
      return res.status(404).json({ error: error.message });
    }
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
    const result = await moduleService.uncompleteLesson(req.userId, moduleId, lessonIndex);
    res.json(result);
  } catch (error) {
    console.error('Error uncompleting lesson:', error);
    if (error.message === 'User not found') {
      return res.status(404).json({ error: error.message });
    }
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
    const result = await moduleService.completeModule(req.userId, moduleId, req.body);
    res.json(result);
  } catch (error) {
    console.error('Error completing module:', error);
    if (error.message === 'User not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to complete module' });
  }
});

/**
 * GET /api/modules/stats
 * Get user's overall learning statistics
 */
router.get('/stats', authenticate, async (req, res) => {
  try {
    const stats = await moduleService.getUserStats(req.userId);
    res.json(stats);
  } catch (error) {
    console.error('Error fetching module stats:', error);
    if (error.message === 'User not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to fetch module stats' });
  }
});

// Admin Routes
import { isAdmin } from '../middleware/adminMiddleware.js';

// Create a new module
router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const module = await moduleService.createModule(req.body);
    res.status(201).json({ success: true, data: module });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update a module
router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const module = await moduleService.updateModule(req.params.id, req.body);
    res.json({ success: true, data: module });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete a module
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const result = await moduleService.deleteModule(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
