/* Cleaned up challengeRoutes.js */
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';
import { optionalAuth, authenticate, requireAdmin } from '../middleware/authMiddleware.js';
import { dailyQuestions, weeklyChallenges } from '../data/challenges.js';
import WeeklyChallenge from '../models/WeeklyChallenge.js';

const router = express.Router();

// Optional dynamic imports
let rateLimit = null;
let body = null;
let validationResult = null;
try {
  const mod = await import('express-rate-limit');
  rateLimit = mod.default || mod;
} catch (err) {
  console.warn('express-rate-limit not installed; skipping route limiter');
}
try {
  const ev = await import('express-validator');
  body = ev.body;
  validationResult = ev.validationResult;
} catch (err) {
  console.warn('express-validator not installed; skipping request validation');
}

// Apply route-level rate limiter if available
if (rateLimit) {
  const challengeLimiter = rateLimit({ max: 120, windowMs: 15 * 60 * 1000, standardHeaders: true, legacyHeaders: false });
  router.use(challengeLimiter);
}

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

// Helper: Check if two dates are the same day
function isSameDay(d1, d2) {
  const a = new Date(d1);
  const b = new Date(d2);
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

// Routes
router.get('/leaderboard', optionalAuth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 50;
    const users = await User.find({ isActive: true })
      .sort({ totalPoints: -1, updatedAt: -1 })
      .limit(limit)
      .select('name totalPoints proficiencyLevel _id')
      .lean();

    const entries = (users || []).map((u, idx) => ({
      rank: idx + 1,
      points: u.totalPoints || 0,
      displayName: `Anonymous ${idx + 1}`,
      nameInitial: u.name ? u.name.charAt(0).toUpperCase() : 'A',
      badge: u.proficiencyLevel || null,
      isMe: !!(req.userId && u._id && req.userId.toString() === u._id.toString())
    }));

    res.json({ success: true, entries });
  } catch (error) {
    console.error('❌ Error fetching leaderboard:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch leaderboard', error: error.message });
  }
});

router.get('/daily', optionalAuth, async (req, res) => {
  try {
    const todayIndex = Math.abs(new Date().getDate() % dailyQuestions.length);
    const question = dailyQuestions[todayIndex];

    let answeredToday = false;
    let userStreak = 0;
    if (req.user) {
      const lastAnswered = req.user.dailyChallenge?.lastAnsweredAt;
      if (lastAnswered && isSameDay(new Date(lastAnswered), new Date())) answeredToday = true;
      userStreak = req.user.dailyChallenge?.currentStreak || 0;
    }

    res.json({ success: true, question: { id: question.id, prompt: question.prompt, choices: question.choices, points: question.points }, answeredToday, userStreak });
  } catch (error) {
    console.error('❌ Error fetching daily question:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch daily question' });
  }
});

router.post('/daily/submit', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const todayIndex = Math.abs(new Date().getDate() % dailyQuestions.length);
    const question = dailyQuestions[todayIndex];

    if (!user.dailyChallenge) user.dailyChallenge = {};
    const lastAnsweredAt = user.dailyChallenge?.lastAnsweredAt;
    if (lastAnsweredAt && isSameDay(new Date(lastAnsweredAt), new Date())) {
      return res.json({ success: false, message: 'Already answered today' });
    }

    const { answer, questionId } = req.body;
    if (!questionId || questionId !== question.id) {
      return res.status(400).json({ success: false, message: 'Invalid or mismatched questionId' });
    }

    const correct = answer === question.correct;
    let bonus = 0;
    if (correct) {
      const basePoints = question.points || 10;
      const prevStreak = user.dailyChallenge?.currentStreak || 0;
      bonus = Math.round(basePoints * (0.1 * Math.min(prevStreak, 5)));
      user.totalPoints = (user.totalPoints || 0) + basePoints + bonus;

      const lastAnswered = user.dailyChallenge?.lastAnsweredAt;
      if (lastAnswered && isSameDay(new Date(lastAnswered), new Date(Date.now() - 86400000))) {
        user.dailyChallenge.currentStreak = (user.dailyChallenge.currentStreak || 0) + 1;
      } else {
        user.dailyChallenge.currentStreak = 1;
      }
      user.dailyChallenge.lastAnsweredAt = new Date();
      user.dailyChallenge.lastQuestionId = question.id;
    } else {
      user.dailyChallenge.currentStreak = 0;
      user.dailyChallenge.lastAnsweredAt = new Date();
      user.dailyChallenge.lastQuestionId = question.id;
    }

    await user.save();
    res.json({ success: true, correct, bonus, currentStreak: user.dailyChallenge.currentStreak });
  } catch (error) {
    console.error('❌ Error submitting daily answer:', error);
    res.status(500).json({ success: false, message: 'Daily submit failed', error: error.message });
  }
});

router.get('/weekly', optionalAuth, async (req, res) => {
  try {
    // Prefer DB-backed weekly challenge if available
    let week = null;
    try {
      week = await WeeklyChallenge.findOne().sort({ createdAt: -1 }).lean();
    } catch (e) {
      console.warn('WeeklyChallenge DB lookup failed, falling back to local store', e.message);
      week = null;
    }
    if (!week && (!weeklyChallenges || weeklyChallenges.length === 0)) {
      return res.json({ success: true, theme: null, description: '', tasks: [], weekId: null });
    }
    if (!week) week = weeklyChallenges[0];
    let claimedTasks = [];
    if (req.user) {
      const wp = (req.user.weeklyProgress || []).find(w => w.weekId === week.weekId);
      claimedTasks = wp ? wp.claimedTasks : [];
    }
    const tasks = (week.tasks || []).map(t => ({ ...t, claimed: claimedTasks.includes(t.id) }));
    res.json({ success: true, theme: week.theme, description: week.description, tasks, weekId: week.weekId });
  } catch (error) {
    console.error('❌ Error fetching weekly challenges:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch weekly challenges' });
  }
});

router.post('/weekly/create', authenticate, requireAdmin, ...validatorsCreate, async (req, res) => {
  if (validationResult) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: 'Invalid request payload', errors: errors.array() });
  }
  try {
    const { weekId, theme, description, startDate, endDate, tasks } = req.body;
    if (!weekId || !tasks || !Array.isArray(tasks)) return res.status(400).json({ success: false, message: 'Missing required fields (weekId, tasks)' });

    const valid = tasks.every(t => t.id && t.title);
    if (!valid) return res.status(400).json({ success: false, message: 'Each task must include id and title' });

    // Prevent duplicate weekId (DB check first)
    const existsDb = await WeeklyChallenge.findOne({ weekId });
    if (existsDb) return res.status(409).json({ success: false, message: 'Week with this weekId already exists' });

    const newWeekDoc = await WeeklyChallenge.create({ weekId, theme: theme || 'Weekly', description: description || '', startDate: startDate || null, endDate: endDate || null, tasks, createdBy: req.userId });
    const newWeek = newWeekDoc.toObject();
    console.log(`Weekly challenge ${weekId} created by ${req.user?.email || req.user?.name || req.userId}`);

    // Persist to disk (for backwards-compatible local store)
    try {
      const storePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../data/weekly_store.json');
      const tmpPath = `${storePath}.tmp`;
      // If json store exists, update it to include the new week as first element
      let current = [];
      if (fs.existsSync(storePath)) {
        const raw = fs.readFileSync(storePath, 'utf8');
        current = JSON.parse(raw || '[]') || [];
      }
      current.unshift(newWeek);
      const data = JSON.stringify(current, null, 2);
      // atomic write: write to tmp, then rename
      fs.writeFileSync(tmpPath, data, 'utf8');
      fs.renameSync(tmpPath, storePath);
    } catch (ioErr) {
      console.warn('Could not persist weekly store to disk', ioErr);
    }

    res.json({ success: true, message: 'Weekly challenge created', week: newWeek });
  } catch (error) {
    console.error('❌ Error creating weekly challenge:', error);
    res.status(500).json({ success: false, message: 'Failed to create weekly challenge' });
  }
});

router.post('/weekly/claim', authenticate, ...validatorsClaim, async (req, res) => {
  if (validationResult) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: 'Invalid request payload', errors: errors.array() });
  }
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    const { taskId, weekId } = req.body;
    if (!taskId || !weekId) return res.status(400).json({ success: false, message: 'Missing taskId or weekId' });
    
    let week = null;
    try {
      week = await WeeklyChallenge.findOne({ weekId }).lean();
    } catch (e) {
      // DB not available; fall back to JSON
      week = weeklyChallenges.find(w => w.weekId === weekId);
    }
    if (!week) return res.status(404).json({ success: false, message: 'Week not found' });
    const task = week.tasks.find(t => t.id === taskId);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    if (!user.weeklyProgress) user.weeklyProgress = [];
    const wp = user.weeklyProgress.find(w => w.weekId === weekId);
    if (wp && wp.claimedTasks.includes(taskId)) return res.json({ success: false, message: 'Task already claimed' });
    if (!wp) user.weeklyProgress.push({ weekId, claimedTasks: [taskId], pointsEarned: (task.points || 0) });
    else {
      wp.claimedTasks.push(taskId);
      wp.pointsEarned = (wp.pointsEarned || 0) + (task.points || 0);
    }
    user.totalPoints = (user.totalPoints || 0) + (task.points || 0);
    await user.save();
    console.log(`Weekly task ${taskId} claimed by ${req.user?.email || req.userId}`);
    res.json({ success: true, message: 'Task claimed', points: task.points || 0 });
  } catch (error) {
    console.error('❌ Error claiming weekly task:', error);
    res.status(500).json({ success: false, message: 'Failed to claim weekly task' });
  }
});

export default router;

