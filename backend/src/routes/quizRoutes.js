import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { generateQuiz } from '../controllers/quizController.js';

const router = express.Router();

/**
 * GET /api/quiz/generate/:moduleId/:lessonIndex
 * Generate an adaptive quiz for a specific lesson
 */
router.get('/generate/:moduleId/:lessonIndex', authenticate, generateQuiz);

export default router;
