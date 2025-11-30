import express from 'express';
import { getMarketPrices, getPortfolio, executeTrade, getLeaderboard, getMarketOverview, getMarketSentiment } from '../controllers/marketController.js';
import { authenticate as protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/prices', getMarketPrices);
router.get('/overview', getMarketOverview);
router.get('/portfolio', protect, getPortfolio);
router.post('/trade', protect, executeTrade);
router.get('/leaderboard', protect, getLeaderboard);
router.get('/sentiment', protect, getMarketSentiment);

export default router;
