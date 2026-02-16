import express from 'express';
import { authenticate, optionalAuth } from '../middleware/authMiddleware.js';
import { getShopItems, purchaseItem, equipItem, getInventory } from '../controllers/shopController.js';

const router = express.Router();

router.get('/items', optionalAuth, getShopItems);
router.post('/purchase', authenticate, purchaseItem);
router.post('/equip', authenticate, equipItem);
router.get('/inventory', authenticate, getInventory);

export default router;
