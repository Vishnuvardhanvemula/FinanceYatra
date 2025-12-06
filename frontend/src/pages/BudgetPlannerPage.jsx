import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Wallet, TrendingUp, TrendingDown, Plus,
    DollarSign, PieChart as PieChartIcon, Target,
    Calendar, Trash2, HelpCircle
} from 'lucide-react';
import {
    getTransactions, addTransaction, deleteTransaction,
    getGoals, addGoal
} from '../services/budgetService';
import { useCalculatorTour } from '../hooks/useCalculatorTour';
import BudgetChart from '../components/budget/BudgetChart';
import GoalCard from '../components/budget/GoalCard';
import toast from 'react-hot-toast';

const BudgetPlannerPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form States
    const [showAddTx, setShowAddTx] = useState(false);
    const [txForm, setTxForm] = useState({
        type: 'expense',
        amount: '',
        category: 'Food',
        description: ''
    });

    const [showAddGoal, setShowAddGoal] = useState(false);
    const [goalForm, setGoalForm] = useState({
        name: '',
        targetAmount: '',
        deadline: ''
    });

    const { restartTour } = useCalculatorTour('budget_tour_v1', [
        {
            element: '#budget-actions',
            popover: { title: 'Quick Actions', description: 'Start tracking by adding a new transaction or setting a savings goal.', side: 'bottom' }
        },
        {
            element: '#summary-cards',
            popover: { title: 'Financial Snapshot', description: 'See your total balance, income, and expenses at a glance.', side: 'bottom' }
        },
        {
            element: '#charts-section',
            popover: { title: 'Analysis & Goals', description: 'Visualize your spending habits and track progress towards your goals.', side: 'right' }
        },
        {
            element: '#recent-activity',
            popover: { title: 'Recent Activity', description: 'Review your latest transactions here.', side: 'left' }
        }
    ]);

    const expenseCategories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Health', 'Education', 'Other'];
    const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'];

    const currentCategories = txForm.type === 'income' ? incomeCategories : expenseCategories;

    const fetchData = async () => {
        try {
            const [txData, goalData] = await Promise.all([getTransactions(), getGoals()]);
            setTransactions(txData);
            setGoals(goalData);
        } catch (error) {
            toast.error('Failed to load budget data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddTransaction = async (e) => {
        e.preventDefault();
        try {
            await addTransaction(txForm);
            toast.success('Transaction added');
            setShowAddTx(false);
            setTxForm({ type: 'expense', amount: '', category: 'Food', description: '' });
            fetchData();
        } catch (error) {
            toast.error('Failed to add transaction');
        }
    };

    const handleAddGoal = async (e) => {
        e.preventDefault();
        try {
            await addGoal(goalForm);
            toast.success('Goal created');
            setShowAddGoal(false);
            setGoalForm({ name: '', targetAmount: '', deadline: '' });
            fetchData();
        } catch (error) {
            toast.error('Failed to create goal');
        }
    };

    const handleDeleteTx = async (id) => {
        if (!window.confirm('Delete this transaction?')) return;
        try {
            await deleteTransaction(id);
            toast.success('Transaction deleted');
            fetchData();
        } catch (error) {
            toast.error('Failed to delete transaction');
        }
    };

    // Calculations
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const balance = totalIncome - totalExpense;

    if (loading) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020617] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <Wallet className="text-emerald-400" />
                            Budget Planner
                        </h1>
                        <p className="text-slate-400 mt-1 flex items-center gap-2">
                            Track expenses and reach your savings goals
                            <button onClick={restartTour} className="text-teal-400 hover:text-teal-300 transition-colors" title="Replay Tour">
                                <HelpCircle className="w-4 h-4" />
                            </button>
                        </p>
                    </div>
                    <div className="flex gap-3" id="budget-actions">
                        <button
                            onClick={() => setShowAddTx(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
                        >
                            <Plus size={18} /> Add Transaction
                        </button>
                        <button
                            onClick={() => setShowAddGoal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                        >
                            <Target size={18} /> New Goal
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="summary-cards">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-2xl"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-500/20 rounded-xl">
                                <Wallet className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-slate-400 text-sm">Total Balance</p>
                                <h3 className="text-2xl font-bold text-white">₹{balance.toLocaleString()}</h3>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-2xl"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-emerald-500/20 rounded-xl">
                                <TrendingUp className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-slate-400 text-sm">Total Income</p>
                                <h3 className="text-2xl font-bold text-emerald-400">+₹{totalIncome.toLocaleString()}</h3>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-2xl"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-500/20 rounded-xl">
                                <TrendingDown className="w-6 h-6 text-red-400" />
                            </div>
                            <div>
                                <p className="text-slate-400 text-sm">Total Expenses</p>
                                <h3 className="text-2xl font-bold text-red-400">-₹{totalExpense.toLocaleString()}</h3>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Charts & Goals */}
                    <div className="lg:col-span-2 space-y-8" id="charts-section">

                        {/* Expense Chart */}
                        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <PieChartIcon className="text-purple-400" size={20} />
                                Expense Breakdown
                            </h3>
                            <BudgetChart transactions={transactions} />
                        </div>

                        {/* Savings Goals */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Target className="text-blue-400" size={20} />
                                Savings Goals
                            </h3>
                            {goals.length === 0 ? (
                                <div className="text-center py-8 bg-slate-900/30 rounded-xl border border-dashed border-slate-700">
                                    <p className="text-slate-400">No active goals. Set a target to earn XP!</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {goals.map(goal => (
                                        <GoalCard key={goal._id} goal={goal} onUpdate={fetchData} />
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Right Column: Recent Transactions */}
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-2xl h-fit" id="recent-activity">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Calendar className="text-orange-400" size={20} />
                            Recent Activity
                        </h3>

                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            {transactions.length === 0 ? (
                                <p className="text-slate-500 text-center py-4">No transactions yet</p>
                            ) : (
                                transactions.map(tx => (
                                    <div key={tx._id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                                {tx.type === 'income' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{tx.category}</p>
                                                <p className="text-xs text-slate-400">{new Date(tx.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`font-bold ${tx.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                                                {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                                            </span>
                                            <button
                                                onClick={() => handleDeleteTx(tx._id)}
                                                className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

            </div>

            {/* Add Transaction Modal & Add Goal Modal (Original content remains below) */}
            {showAddTx && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-slate-900 border border-white/10 p-6 rounded-2xl w-full max-w-md"
                    >
                        <h2 className="text-xl font-bold text-white mb-4">Add Transaction</h2>
                        <form onSubmit={handleAddTransaction} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setTxForm({ ...txForm, type: 'expense', category: expenseCategories[0] })}
                                    className={`p-2 rounded-lg border text-center transition-colors ${txForm.type === 'expense' ? 'bg-red-500/20 border-red-500 text-red-400' : 'border-slate-700 text-slate-400'}`}
                                >
                                    Expense
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTxForm({ ...txForm, type: 'income', category: incomeCategories[0] })}
                                    className={`p-2 rounded-lg border text-center transition-colors ${txForm.type === 'income' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'border-slate-700 text-slate-400'}`}
                                >
                                    Income
                                </button>
                            </div>

                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Amount (₹)</label>
                                <input
                                    type="number"
                                    required
                                    value={txForm.amount}
                                    onChange={e => setTxForm({ ...txForm, amount: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:border-emerald-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Category</label>
                                <select
                                    value={txForm.category}
                                    onChange={e => setTxForm({ ...txForm, category: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:border-emerald-500 outline-none"
                                >
                                    {currentCategories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Description (Optional)</label>
                                <input
                                    type="text"
                                    value={txForm.description}
                                    onChange={e => setTxForm({ ...txForm, description: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:border-emerald-500 outline-none"
                                />
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowAddTx(false)}
                                    className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {showAddGoal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-slate-900 border border-white/10 p-6 rounded-2xl w-full max-w-md"
                    >
                        <h2 className="text-xl font-bold text-white mb-4">Create Savings Goal</h2>
                        <form onSubmit={handleAddGoal} className="space-y-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Goal Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., New Laptop"
                                    value={goalForm.name}
                                    onChange={e => setGoalForm({ ...goalForm, name: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:border-blue-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Target Amount (₹)</label>
                                <input
                                    type="number"
                                    required
                                    value={goalForm.targetAmount}
                                    onChange={e => setGoalForm({ ...goalForm, targetAmount: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:border-blue-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Deadline (Optional)</label>
                                <input
                                    type="date"
                                    value={goalForm.deadline}
                                    onChange={e => setGoalForm({ ...goalForm, deadline: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:border-blue-500 outline-none"
                                />
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowAddGoal(false)}
                                    className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                                >
                                    Create Goal
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

        </div>
    );
};

export default BudgetPlannerPage;
