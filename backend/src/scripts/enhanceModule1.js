import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Module from '../models/Module.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/financeyatra';

const MODULE_1_CONTENT = [
    {
        id: 1,
        title: "The Banking System",
        subtitle: "Why do we need banks?",
        duration: "10 mins",
        content: `
            <h3>The Foundation of Finance</h3>
            <p>Imagine keeping all your life savings under your mattress. It's risky, right? Banks provide a secure place to store your money, but they do much more than that.</p>
            
            <h3>Types of Accounts</h3>
            <ul>
                <li><strong>Savings Account:</strong> The most common type. You deposit money, it stays safe, and the bank pays you a small interest (usually 3-4%). It's highly liquid, meaning you can withdraw it anytime.</li>
                <li><strong>Current Account:</strong> Designed for businesses. It allows unlimited transactions but usually offers zero interest.</li>
            </ul>

            <div class="bg-slate-800/50 p-4 rounded-xl border border-amber-500/20 my-4">
                <strong>Did You Know?</strong> Your money in a bank is insured up to ₹5 Lakhs by the DICGC in India, making it one of the safest places to park your emergency fund.
            </div>

            <h3>Why not just cash?</h3>
            <p>Digital money is easier to track, safer to transport, and helps you build a credit history, which is essential for getting loans later in life.</p>
        `,
        keyPoints: [
            "Banks provide safety and liquidity.",
            "Savings accounts earn interest; Current accounts are for business.",
            "Bank deposits are insured up to ₹5 Lakhs."
        ]
    },
    {
        id: 2,
        title: "Mastering Cheques",
        subtitle: "The classic payment tool",
        duration: "15 mins",
        content: `
            <h3>What is a Cheque?</h3>
            <p>A cheque is a document that orders a bank to pay a specific amount of money from a person's account to the person in whose name the cheque has been issued.</p>

            [CHEQUE_WRITER]

            <h3>Key Components</h3>
            <ul>
                <li><strong>Payee:</strong> The person receiving the money.</li>
                <li><strong>Amount in Words:</strong> Must match the figures. Always end with "Only" to prevent fraud.</li>
                <li><strong>Signature:</strong> Must match bank records exactly.</li>
                <li><strong>Date:</strong> A cheque is valid for 3 months from the date of issue.</li>
            </ul>

            <div class="bg-slate-800/50 p-4 rounded-xl border border-amber-500/20 my-4">
                <strong>Pro Tip:</strong> Always cross a cheque (draw two parallel lines on the top left) and write "A/C Payee Only" to ensure the money goes directly into a bank account and cannot be encashed over the counter.
            </div>
        `,
        keyPoints: [
            "Cheques are valid for 3 months.",
            "Always end amount in words with 'Only'.",
            "Crossing a cheque makes it safer."
        ]
    },
    {
        id: 3,
        title: "Growing Your Money",
        subtitle: "Beat inflation with interest",
        duration: "12 mins",
        content: `
            <h3>Idle Money Loses Value</h3>
            <p>Inflation (rising prices) eats away at the value of your cash. If you keep ₹100 in a drawer, next year it might only buy ₹95 worth of goods. You need to grow your money to stay ahead.</p>

            [INTEREST_LADDER]

            <h3>Savings vs. Fixed Deposits (FD)</h3>
            <p>While a Savings Account is great for daily needs, it offers low returns. A Fixed Deposit (FD) locks your money for a specific period (say, 1 year) but offers much higher interest (6-7%).</p>

            <h3>The Magic of Compound Interest</h3>
            <p>Albert Einstein called compound interest the "eighth wonder of the world". It's earning interest on your interest. The longer you stay invested, the faster your money grows.</p>
        `,
        keyPoints: [
            "Inflation reduces the purchasing power of money.",
            "FDs offer higher interest than savings accounts but have lock-in periods.",
            "Compound interest accelerates wealth creation over time."
        ]
    },
    {
        id: 4,
        title: "Digital Banking 101",
        subtitle: "Banking at your fingertips",
        duration: "10 mins",
        content: `
            <h3>No More Queues</h3>
            <p>Modern banking happens on your phone. You can transfer money, pay bills, and even open accounts without visiting a branch.</p>

            <h3>Transfer Modes Explained</h3>
            <ul>
                <li><strong>NEFT:</strong> For regular transfers. Takes a few hours. Available 24/7.</li>
                <li><strong>RTGS:</strong> For large amounts (> ₹2 Lakhs). Instant transfer.</li>
                <li><strong>IMPS:</strong> Instant transfer for smaller amounts, anytime.</li>
                <li><strong>UPI:</strong> The game changer. Instant, free, and linked to your mobile number.</li>
            </ul>

            <div class="bg-slate-800/50 p-4 rounded-xl border border-amber-500/20 my-4">
                <strong>Security Alert:</strong> Never share your Net Banking password or UPI PIN with anyone, not even bank officials.
            </div>
        `,
        keyPoints: [
            "Digital banking saves time and offers convenience.",
            "Know the difference between NEFT, RTGS, and IMPS.",
            "UPI is the fastest way to transfer small amounts."
        ]
    },
    {
        id: 5,
        title: "ATM & Security",
        subtitle: "Safe cash withdrawals",
        duration: "8 mins",
        content: `
            <h3>Using an ATM Safely</h3>
            <p>ATMs are convenient, but they can be targets for skimming devices. Always wiggle the card slot before inserting your card to check for skimmers.</p>

            <h3>Best Practices</h3>
            <ul>
                <li><strong>Cover the Keypad:</strong> Use your hand to shield your PIN while typing.</li>
                <li><strong>Change PIN Often:</strong> Update your PIN every few months.</li>
                <li><strong>SMS Alerts:</strong> Ensure your phone number is updated to receive instant transaction alerts.</li>
            </ul>

            <h3>Lost Card?</h3>
            <p>If you lose your debit card, block it immediately via your banking app or customer care number. Do not wait.</p>
        `,
        keyPoints: [
            "Check for skimmers at ATMs.",
            "Shield your PIN while entering it.",
            "Block lost cards immediately."
        ]
    }
];

const enhanceModule1 = async () => {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected');

        console.log('📘 Updating Module 1: Banking Basics...');

        const module = await Module.findOne({ id: 'module-1' });
        if (!module) {
            console.error('❌ Module 1 not found!');
            process.exit(1);
        }

        // Update lessons
        module.lessons = MODULE_1_CONTENT;
        module.lessonsCount = MODULE_1_CONTENT.length;

        // Ensure quiz array exists (empty for now, will be generated dynamically)
        module.lessons.forEach(l => l.quiz = []);

        await module.save();
        console.log('✅ Module 1 updated successfully with enhanced content!');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

enhanceModule1();
