import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Module from '../src/models/Module.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Configure dotenv
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const learningModules = [
    {
        id: 'module-1',
        title: 'Banking Basics',
        description: 'Learn about bank accounts, deposits, and basic banking services',
        icon: '🏦',
        difficulty: 'beginner',
        duration: '30 mins',
        lessonsCount: 5,
        topics: ['Savings Account', 'Current Account', 'Fixed Deposits', 'Recurring Deposits', 'Bank Services'],
        prerequisites: [],
        learningOutcomes: [
            'Understand different types of bank accounts',
            'Know how to open and manage bank accounts',
            'Learn about deposit schemes and interest rates'
        ],
        order: 1
    },
    {
        id: 'module-2',
        title: 'Digital Payments',
        description: 'Master UPI, online banking, and digital wallets for safe transactions',
        icon: '💳',
        difficulty: 'beginner',
        duration: '25 mins',
        lessonsCount: 4,
        topics: ['UPI Payments', 'Net Banking', 'Mobile Wallets', 'Payment Security'],
        prerequisites: [],
        learningOutcomes: [
            'Use UPI for instant money transfers',
            'Understand digital payment security',
            'Compare different payment methods'
        ],
        order: 2
    },
    {
        id: 'module-3',
        title: 'Understanding Loans',
        description: 'Learn about different types of loans, EMI, and borrowing wisely',
        icon: '💰',
        difficulty: 'beginner',
        duration: '40 mins',
        lessonsCount: 6,
        topics: ['Personal Loans', 'Home Loans', 'Education Loans', 'EMI Calculation', 'Interest Rates', 'Credit Score'],
        prerequisites: ['module-1'],
        learningOutcomes: [
            'Understand EMI and interest calculations',
            'Compare different loan types',
            'Know how to maintain good credit score'
        ],
        order: 3
    },
    {
        id: 'module-4',
        title: 'Saving & Budgeting',
        description: 'Build healthy money habits with smart saving and budgeting strategies',
        icon: '💵',
        difficulty: 'beginner',
        duration: '35 mins',
        lessonsCount: 5,
        topics: ['Budget Planning', '50-30-20 Rule', 'Emergency Fund', 'Saving Goals', 'Expense Tracking'],
        prerequisites: [],
        learningOutcomes: [
            'Create a personal budget',
            'Build an emergency fund',
            'Develop consistent saving habits'
        ],
        order: 4
    },
    {
        id: 'module-5',
        title: 'Insurance Essentials',
        description: 'Protect yourself and your family with the right insurance coverage',
        icon: '🛡️',
        difficulty: 'intermediate',
        duration: '45 mins',
        lessonsCount: 6,
        topics: ['Life Insurance', 'Health Insurance', 'Term vs Whole Life', 'Premium Calculation', 'Claim Process', 'Riders'],
        prerequisites: ['module-1'],
        learningOutcomes: [
            'Choose the right insurance coverage',
            'Understand premium calculations',
            'Learn about claim processes'
        ],
        order: 5
    },
    {
        id: 'module-6',
        title: 'Investment Basics',
        description: 'Start your investment journey with stocks, mutual funds, and more',
        icon: '📈',
        difficulty: 'intermediate',
        duration: '50 mins',
        lessonsCount: 7,
        topics: ['Fixed Deposits', 'Mutual Funds', 'Stocks', 'Gold', 'Real Estate', 'Risk-Return', 'Diversification'],
        prerequisites: ['module-4'],
        learningOutcomes: [
            'Understand different investment options',
            'Learn about risk and return',
            'Start building an investment portfolio'
        ],
        order: 6
    },
    {
        id: 'module-7',
        title: 'Tax Planning',
        description: 'Understand taxes, deductions, and how to save tax legally',
        icon: '📊',
        difficulty: 'intermediate',
        duration: '55 mins',
        lessonsCount: 7,
        topics: ['Income Tax Basics', 'Section 80C', 'Tax Deductions', 'ITR Filing', 'TDS', 'Tax Saving Investments', 'GST'],
        prerequisites: ['module-1', 'module-6'],
        learningOutcomes: [
            'Understand income tax slabs',
            'Maximize tax deductions',
            'File income tax returns'
        ],
        order: 7
    },
    {
        id: 'module-8',
        title: 'Mutual Funds Mastery',
        description: 'Deep dive into mutual funds, SIP, and fund selection strategies',
        icon: '🎯',
        difficulty: 'intermediate',
        duration: '60 mins',
        lessonsCount: 8,
        topics: ['SIP', 'Lump Sum', 'Equity Funds', 'Debt Funds', 'NAV', 'Expense Ratio', 'Exit Load', 'Fund Performance'],
        prerequisites: ['module-6'],
        learningOutcomes: [
            'Choose the right mutual funds',
            'Understand SIP vs lump sum',
            'Analyze fund performance'
        ],
        order: 8
    },
    {
        id: 'module-9',
        title: 'Stock Market Fundamentals',
        description: 'Learn how stock markets work and start trading with confidence',
        icon: '📉',
        difficulty: 'expert',
        duration: '70 mins',
        lessonsCount: 9,
        topics: ['Stock Exchanges', 'Demat Account', 'Trading vs Investing', 'Technical Analysis', 'Fundamental Analysis', 'IPO', 'Dividends', 'Stock Selection', 'Risk Management'],
        prerequisites: ['module-6'],
        learningOutcomes: [
            'Understand stock market mechanics',
            'Open and use demat account',
            'Analyze stocks for investment'
        ],
        order: 9
    },
    {
        id: 'module-10',
        title: 'Retirement Planning',
        description: 'Build a secure retirement corpus with smart planning and investments',
        icon: '🏖️',
        difficulty: 'expert',
        duration: '65 mins',
        lessonsCount: 8,
        topics: ['Retirement Needs', 'PPF', 'NPS', 'EPF', 'Pension Plans', 'Annuity', 'Retirement Corpus', 'Healthcare Planning'],
        prerequisites: ['module-6', 'module-7'],
        learningOutcomes: [
            'Calculate retirement corpus needed',
            'Choose right retirement instruments',
            'Build a retirement investment plan'
        ],
        order: 10
    },
    {
        id: 'module-11',
        title: 'Real Estate Investment',
        description: 'Understand property investment, home loans, and real estate returns',
        icon: '🏠',
        difficulty: 'expert',
        duration: '75 mins',
        lessonsCount: 9,
        topics: ['Property Types', 'Home Loan Process', 'Rental Income', 'Capital Appreciation', 'RERA', 'Property Documentation', 'Stamp Duty', 'REITs', 'Investment vs Residence'],
        prerequisites: ['module-3', 'module-6'],
        learningOutcomes: [
            'Evaluate real estate investments',
            'Understand home loan process',
            'Calculate property investment returns'
        ],
        order: 11
    },
    {
        id: 'module-12',
        title: 'Financial Goal Planning',
        description: 'Set and achieve financial goals for education, marriage, home, and more',
        icon: '🎯',
        difficulty: 'intermediate',
        duration: '45 mins',
        lessonsCount: 6,
        topics: ['Goal Setting', 'Time Horizon', 'Goal Prioritization', 'Investment Allocation', 'Progress Tracking', 'Goal Revision'],
        prerequisites: ['module-4', 'module-6'],
        learningOutcomes: [
            'Set SMART financial goals',
            'Create goal-based investment plan',
            'Track and adjust goal progress'
        ],
        order: 12
    },
    {
        id: 'module-13',
        title: 'Credit Cards & Credit Score',
        description: 'Master credit card usage and build excellent credit score',
        icon: '💳',
        difficulty: 'intermediate',
        duration: '40 mins',
        lessonsCount: 6,
        topics: ['Credit Card Types', 'Rewards & Cashback', 'Credit Score', 'CIBIL', 'Credit Utilization', 'Debt Management'],
        prerequisites: ['module-1'],
        learningOutcomes: [
            'Use credit cards responsibly',
            'Build and maintain good credit score',
            'Avoid credit card debt traps'
        ],
        order: 13
    },
    {
        id: 'module-14',
        title: 'Advanced Tax Strategies',
        description: 'Advanced tax planning, optimization, and wealth structuring',
        icon: '🧮',
        difficulty: 'expert',
        duration: '80 mins',
        lessonsCount: 10,
        topics: ['Tax Optimization', 'Capital Gains', 'Estate Planning', 'Trust & Will', 'HUF Benefits', 'Tax Arbitrage', 'International Taxation', 'Wealth Transfer', 'Tax Audit', 'Advance Tax'],
        prerequisites: ['module-7'],
        learningOutcomes: [
            'Optimize tax through legal strategies',
            'Understand capital gains taxation',
            'Plan for wealth transfer'
        ],
        order: 14
    },
    {
        id: 'module-15',
        title: 'Portfolio Management',
        description: 'Build and manage a diversified investment portfolio for long-term wealth',
        icon: '📊',
        difficulty: 'expert',
        duration: '85 mins',
        lessonsCount: 10,
        topics: ['Asset Allocation', 'Rebalancing', 'Risk Assessment', 'Portfolio Diversification', 'Index Funds', 'Alternative Investments', 'Commodity Investment', 'Portfolio Review', 'Wealth Protection', 'Legacy Planning'],
        prerequisites: ['module-6', 'module-8', 'module-9'],
        learningOutcomes: [
            'Create optimal asset allocation',
            'Rebalance portfolio effectively',
            'Manage portfolio for long-term growth'
        ],
        order: 15
    }
];

const seedModules = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/finance-tutor';
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');

        // Clear existing modules
        await Module.deleteMany({});
        console.log('Cleared existing modules');

        // Insert new modules
        await Module.insertMany(learningModules);
        console.log(`Seeded ${learningModules.length} modules successfully`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding modules:', error);
        process.exit(1);
    }
};

seedModules();
