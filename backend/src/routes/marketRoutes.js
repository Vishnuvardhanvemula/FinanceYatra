import express from 'express';
import { getMarketPrices, getPortfolio, executeTrade, getLeaderboard } from '../controllers/marketController.js';
import { authenticate as protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/prices', getMarketPrices);
router.get('/portfolio', protect, getPortfolio);
router.post('/trade', protect, executeTrade);
router.get('/leaderboard', protect, getLeaderboard);

export default router;
