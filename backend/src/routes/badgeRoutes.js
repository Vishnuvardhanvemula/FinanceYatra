import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { getAllBadges, checkBadges } from '../controllers/badgeController.js';

const router = express.Router();

router.get('/', authenticate, getAllBadges);
router.post('/check', authenticate, checkBadges);

export default router;
