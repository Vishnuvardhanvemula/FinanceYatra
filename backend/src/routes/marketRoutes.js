import express from 'express';
import { getMarketData } from '../controllers/marketController.js';

const router = express.Router();

// Public route - no auth required for ticker
router.get('/overview', getMarketData);

export default router;
