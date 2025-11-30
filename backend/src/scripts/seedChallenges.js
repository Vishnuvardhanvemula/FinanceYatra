import mongoose from 'mongoose';
import dotenv from 'dotenv';
import DailyChallenge from '../models/DailyChallenge.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/financeyatra';

const challenges = [
    {
        id: 'dc_001',
        prompt: "What is the primary benefit of compound interest?",
        choices: [
            "It simplifies tax filing",
            "It allows you to earn interest on your interest",
            "It guarantees a fixed stock market return",
            "It reduces your loan interest rate"
        ],
        correct: "It allows you to earn interest on your interest",
        explanation: "Compound interest is the addition of interest to the principal sum of a loan or deposit, or in other words, interest on interest.",
        difficulty: "easy",
        category: "Investing",
        points: 50
    },
    {
        id: 'dc_002',
        prompt: "Which of the following is considered a low-risk investment?",
        choices: [
            "Cryptocurrency",
            "Startups",
            "Government Bonds",
            "Penny Stocks"
        ],
        correct: "Government Bonds",
        explanation: "Government bonds are issued by national governments and are generally considered low-risk because they are backed by the government's ability to tax.",
        difficulty: "easy",
        category: "Investing",
        points: 50
    },
    {
        id: 'dc_003',
        prompt: "What does 'diversification' mean in investing?",
        choices: [
            "Putting all your money in one stock",
            "Spreading investments across various assets to reduce risk",
            "Investing only in international markets",
            "Buying stocks that pay dividends"
        ],
        correct: "Spreading investments across various assets to reduce risk",
        explanation: "Diversification is a risk management strategy that mixes a wide variety of investments within a portfolio.",
        difficulty: "medium",
        category: "Investing",
        points: 75
    },
    {
        id: 'dc_004',
        prompt: "What is a 'Bear Market'?",
        choices: [
            "A market where prices are rising",
            "A market where prices are falling",
            "A market for trading animals",
            "A stable market with no volatility"
        ],
        correct: "A market where prices are falling",
        explanation: "A bear market is a condition in which securities prices fall 20% or more from recent highs.",
        difficulty: "easy",
        category: "Market",
        points: 50
    },
    {
        id: 'dc_005',
        prompt: "What is the purpose of an Emergency Fund?",
        choices: [
            "To save for a vacation",
            "To buy a new car",
            "To cover unexpected expenses like medical bills or job loss",
            "To invest in the stock market"
        ],
        correct: "To cover unexpected expenses like medical bills or job loss",
        explanation: "An emergency fund is a stash of money set aside to cover the financial surprises life throws your way.",
        difficulty: "easy",
        category: "Personal Finance",
        points: 50
    }
];

const seedChallenges = async () => {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected');

        console.log('🗑️ Clearing existing challenges...');
        await DailyChallenge.deleteMany({});

        console.log('🌱 Seeding challenges...');
        await DailyChallenge.insertMany(challenges);

        console.log('🎉 Challenges seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding challenges:', error);
        process.exit(1);
    }
};

seedChallenges();
