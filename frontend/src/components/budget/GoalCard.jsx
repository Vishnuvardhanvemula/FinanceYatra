import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, Check, Trash2 } from 'lucide-react';
import { updateGoalProgress, deleteGoal } from '../../services/budgetService';
import toast from 'react-hot-toast';

const GoalCard = ({ goal, onUpdate }) => {
    const [addAmount, setAddAmount] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const percentage = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
    const isCompleted = goal.status === 'completed';

    const handleAddProgress = async () => {
        if (!addAmount || isNaN(addAmount) || Number(addAmount) <= 0) return;

        try {
            const result = await updateGoalProgress(goal._id, addAmount);
            if (result.xpAwarded > 0) {
                toast.success(`Goal Completed! +${result.xpAwarded} XP`);
            } else {
                toast.success('Progress updated!');
            }
            setAddAmount('');
            setIsAdding(false);
            onUpdate();
        } catch (error) {
            toast.error('Failed to update progress');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this goal?')) return;
        try {
            await deleteGoal(goal._id);
            toast.success('Goal deleted');
            onUpdate();
        } catch (error) {
            toast.error('Failed to delete goal');
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-4 rounded-xl border ${isCompleted
                    ? 'bg-emerald-900/20 border-emerald-500/30'
                    : 'bg-slate-800/50 border-slate-700'
                }`}
        >
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${isCompleted ? 'bg-emerald-500/20' : 'bg-blue-500/20'}`}>
                        <Target className={`w-5 h-5 ${isCompleted ? 'text-emerald-400' : 'text-blue-400'}`} />
                    </div>
                    <div>
                        <h3 className="font-bold text-white">{goal.name}</h3>
                        <p className="text-xs text-slate-400">
                            Target: ₹{goal.targetAmount.toLocaleString()}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleDelete}
                    className="text-slate-500 hover:text-red-400 transition-colors"
                >
                    <Trash2 size={16} />
                </button>
            </div>

            <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">₹{goal.currentAmount.toLocaleString()}</span>
                    <span className={isCompleted ? 'text-emerald-400' : 'text-blue-400'}>{percentage}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        className={`h-full rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-blue-500'}`}
                    />
                </div>
            </div>

            {!isCompleted && (
                <div className="mt-4 flex gap-2">
                    {isAdding ? (
                        <div className="flex gap-2 w-full">
                            <input
                                type="number"
                                value={addAmount}
                                onChange={(e) => setAddAmount(e.target.value)}
                                placeholder="Amount"
                                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-blue-500"
                                autoFocus
                            />
                            <button
                                onClick={handleAddProgress}
                                className="bg-blue-600 hover:bg-blue-500 text-white p-1 rounded"
                            >
                                <Check size={16} />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsAdding(true)}
                            className="w-full py-1.5 text-xs font-medium text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg transition-colors flex items-center justify-center gap-1"
                        >
                            <Plus size={14} /> Add Funds
                        </button>
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default GoalCard;
