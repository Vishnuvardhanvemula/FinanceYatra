import express from 'express';
import { authenticate as protect } from '../middleware/authMiddleware.js';
import {
    getTransactions,
    addTransaction,
    deleteTransaction,
    getGoals,
    addGoal,
    updateGoalProgress,
    deleteGoal
} from '../controllers/budgetController.js';

const router = express.Router();

// Transaction Routes
router.route('/transactions')
    .get(protect, getTransactions)
    .post(protect, addTransaction);

router.route('/transactions/:id')
    .delete(protect, deleteTransaction);

// Goal Routes
router.route('/goals')
    .get(protect, getGoals)
    .post(protect, addGoal);

router.route('/goals/:id')
    .delete(protect, deleteGoal);

router.route('/goals/:id/progress')
    .put(protect, updateGoalProgress);

export default router;
