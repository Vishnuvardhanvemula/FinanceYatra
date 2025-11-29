import Transaction from '../models/Transaction.js';
import BudgetGoal from '../models/BudgetGoal.js';
import User from '../models/User.js';

// --- Transactions ---

export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id })
            .sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export const addTransaction = async (req, res) => {
    try {
        const { type, amount, category, description, date } = req.body;

        const transaction = new Transaction({
            user: req.user._id,
            type,
            amount,
            category,
            description,
            date: date || Date.now()
        });

        const savedTransaction = await transaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error: error.message });
    }
};

export const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        if (transaction.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await transaction.deleteOne();
        res.json({ message: 'Transaction removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// --- Goals ---

export const getGoals = async (req, res) => {
    try {
        const goals = await BudgetGoal.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(goals);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export const addGoal = async (req, res) => {
    try {
        const { name, targetAmount, deadline } = req.body;

        const goal = new BudgetGoal({
            user: req.user._id,
            name,
            targetAmount,
            deadline
        });

        const savedGoal = await goal.save();
        res.status(201).json(savedGoal);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error: error.message });
    }
};

export const updateGoalProgress = async (req, res) => {
    try {
        const { amount } = req.body; // Amount to ADD to currentAmount
        const goal = await BudgetGoal.findById(req.params.id);

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        if (goal.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        goal.currentAmount += Number(amount);

        // Check for completion and award XP
        let xpAwardedNow = 0;
        if (goal.currentAmount >= goal.targetAmount && goal.status !== 'completed') {
            goal.status = 'completed';

            if (!goal.xpAwarded) {
                const user = await User.findById(req.user._id);
                const xpBonus = 500; // XP for completing a financial goal
                user.xp += xpBonus;
                user.totalXp += xpBonus;

                // Check for level up (simple logic, can be abstracted)
                const nextLevelXp = user.level * 1000;
                if (user.xp >= nextLevelXp) {
                    user.level += 1;
                    user.xp -= nextLevelXp;
                }

                await user.save();
                goal.xpAwarded = true;
                xpAwardedNow = xpBonus;
            }
        }

        const updatedGoal = await goal.save();
        res.json({ goal: updatedGoal, xpAwarded: xpAwardedNow });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export const deleteGoal = async (req, res) => {
    try {
        const goal = await BudgetGoal.findById(req.params.id);

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        if (goal.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await goal.deleteOne();
        res.json({ message: 'Goal removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
