import express from 'express';
import { optionalAuth, authenticate, requireAdmin } from '../middleware/authMiddleware.js';
import challengeService from '../services/challengeService.js';
import { validateRequest } from '../middleware/validationMiddleware.js';

// Try to import express-validator dynamically or assume it exists if in dependencies
let body = null;
try {
  const ev = await import('express-validator');
  body = ev.body;
} catch (err) {
  console.warn('express-validator not installed; skipping request validation setup');
}

const router = express.Router();

// Validators
const validatorsCreate = body ? [
  body('weekId').isString().trim().notEmpty(),
  body('tasks').isArray({ min: 1 }),
  body('theme').optional().isString().trim().escape(),
  body('description').optional().isString().trim().escape()
] : [];

const validatorsClaim = body ? [
  body('taskId').isString().trim().notEmpty(),
  body('weekId').isString().trim().notEmpty()
] : [];

// --- Routes ---

// Leaderboard
router.get('/leaderboard', optionalAuth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 50;
    const entries = await challengeService.getLeaderboard(limit, req.userId);
    res.json({ success: true, entries });
  } catch (error) {
    console.error('❌ Error fetching leaderboard:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch leaderboard', error: error.message });
  }
});

// Daily Challenge: Get Question
router.get('/daily', optionalAuth, async (req, res) => {
  try {
    const result = await challengeService.getDailyQuestion(req.user);
    res.json({ success: true, ...result });
  } catch (error) {
    console.error('❌ Error fetching daily question:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch daily question' });
  }
});

// Daily Challenge: Submit Answer
router.post('/daily/submit', authenticate, async (req, res) => {
  try {
    const { answer, questionId } = req.body;
    const result = await challengeService.submitDailyAnswer(req.userId, questionId, answer);

    if (result.success === false) {
      return res.json(result); // e.g. "Already answered today"
    }

    res.json(result);
  } catch (error) {
    console.error('❌ Error submitting daily answer:', error);
    if (error.message === 'Invalid or mismatched questionId') {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: 'Daily submit failed', error: error.message });
  }
});

// Weekly Challenge: Get Current
router.get('/weekly', optionalAuth, async (req, res) => {
  try {
    const result = await challengeService.getWeeklyChallenges(req.userId);
    res.json({ success: true, ...result });
  } catch (error) {
    console.error('❌ Error fetching weekly challenges:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch weekly challenges' });
  }
});

// Weekly Challenge: Create (Admin)
router.post('/weekly/create', authenticate, requireAdmin, ...validatorsCreate, validateRequest, async (req, res) => {
  try {
    const newWeek = await challengeService.createWeeklyChallenge(req.body, req.userId);
    res.json({ success: true, message: 'Weekly challenge created', week: newWeek });
  } catch (error) {
    console.error('❌ Error creating weekly challenge:', error);
    if (error.message.includes('already exists')) {
      return res.status(409).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: 'Failed to create weekly challenge' });
  }
});

// Weekly Challenge: Claim Task
router.post('/weekly/claim', authenticate, ...validatorsClaim, validateRequest, async (req, res) => {
  try {
    const { taskId, weekId } = req.body;
    const result = await challengeService.claimWeeklyTask(req.userId, taskId, weekId);

    if (result.success === false) {
      return res.json(result); // e.g. "Task already claimed"
    }

    res.json(result);
  } catch (error) {
    console.error('❌ Error claiming weekly task:', error);
    if (error.message === 'Task not found' || error.message === 'Week not found') {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: 'Failed to claim weekly task' });
  }
});

export default router;

