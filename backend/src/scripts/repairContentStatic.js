import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Module from '../models/Module.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/financeyatra';

const STATIC_CONTENT_TEMPLATES = {
    'Banking Basics': `
        <h3>Introduction to Banking</h3>
        <p>Banking is the foundation of personal finance. It allows you to store money securely, earn interest, and make payments efficiently.</p>
        
        <h3>Key Concepts</h3>
        <ul>
            <li><strong>Savings Account:</strong> A deposit account that earns interest.</li>
            <li><strong>Current Account:</strong> Designed for frequent transactions.</li>
            <li><strong>FD/RD:</strong> Fixed and Recurring Deposits for higher interest.</li>
        </ul>

        [CHEQUE_WRITER]

        <div class="bg-slate-800/50 p-4 rounded-xl border border-amber-500/20 my-4">
            <strong>Pro Tip:</strong> Always keep your PIN and OTP secret. Banks never ask for them.
        </div>
    `,
    'Digital Payments': `
        <h3>The Digital Payment Revolution</h3>
        <p>UPI (Unified Payments Interface) has transformed how India pays. It's instant, secure, and works 24/7.</p>

        [UPI_SCANNER]

        <h3>Safety First</h3>
        <ul>
            <li>Verify the receiver's name before paying.</li>
            <li>Never enter your UPI PIN to receive money.</li>
            <li>Use a screen lock on your payment apps.</li>
        </ul>
    `,
    'Understanding Loans': `
        <h3>Mastering Loans & EMIs</h3>
        <p>Loans can help you achieve goals like buying a home or education, but they come with a cost: Interest.</p>

        [EMI_CALCULATOR]

        <h3>Types of Loans</h3>
        <ul>
            <li><strong>Home Loan:</strong> Long tenure, lower interest.</li>
            <li><strong>Personal Loan:</strong> Unsecured, higher interest.</li>
            <li><strong>Car Loan:</strong> Secured against the vehicle.</li>
        </ul>
    `,
    'Investing 101': `
        <h3>The Power of Compounding</h3>
        <p>Investing is about making your money work for you. The earlier you start, the more you earn due to compound interest.</p>

        [COMPOUND_INTEREST]

        <h3>Asset Classes</h3>
        <ul>
            <li><strong>Stocks:</strong> High risk, high reward.</li>
            <li><strong>Bonds:</strong> Lower risk, steady income.</li>
            <li><strong>Mutual Funds:</strong> Diversified portfolios managed by experts.</li>
        </ul>
    `,
    'Cyber Security': `
        <h3>Staying Safe Online</h3>
        <p>Financial fraud is on the rise. Learning to spot scams is a crucial life skill.</p>

        [SCAM_SPOTTER]

        <h3>Common Scams</h3>
        <ul>
            <li><strong>Phishing:</strong> Fake emails asking for passwords.</li>
            <li><strong>Vishing:</strong> Fake calls pretending to be bank officials.</li>
            <li><strong>Lottery Scams:</strong> "You won a prize" messages.</li>
        </ul>
    `
};

const DEFAULT_CONTENT = `
    <h3>Learning Module</h3>
    <p>This lesson covers essential financial concepts designed to improve your financial literacy.</p>
    
    <h3>Key Takeaways</h3>
    <ul>
        <li>Understand the core principles.</li>
        <li>Apply knowledge to real-world scenarios.</li>
        <li>Review regularly to retain information.</li>
    </ul>

    <div class="bg-slate-800/50 p-4 rounded-xl border border-amber-500/20 my-4">
        <strong>Note:</strong> Practice makes perfect. Try the interactive tools available in the dashboard.
    </div>
`;

const repairContentStatic = async () => {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected');

        const modules = await Module.find({});
        let repairedCount = 0;

        for (const m of modules) {
            let moduleUpdated = false;
            console.log(`Checking Module: ${m.title}`);

            for (let i = 0; i < m.lessons.length; i++) {
                const lesson = m.lessons[i];

                if (lesson.content.includes('Content generation failed') || lesson.content.length < 100) {
                    console.log(`  🔧 Repairing Lesson ${lesson.id} with STATIC content...`);

                    // Select template based on module title match
                    let newContent = DEFAULT_CONTENT;
                    for (const key in STATIC_CONTENT_TEMPLATES) {
                        if (m.title.includes(key)) {
                            newContent = STATIC_CONTENT_TEMPLATES[key];
                            break;
                        }
                    }

                    // Inject specific tool if relevant to the lesson index (simple heuristic)
                    if (m.title.includes('Loans') && i === 1) newContent += '\n[EMI_CALCULATOR]';
                    if (m.title.includes('Investing') && i === 0) newContent += '\n[COMPOUND_INTEREST]';
                    if (m.title.includes('Security') && i === 0) newContent += '\n[SCAM_SPOTTER]';

                    lesson.content = newContent;

                    if (!lesson.keyPoints || lesson.keyPoints.length === 0 || lesson.keyPoints[0] === "Key concept 1") {
                        lesson.keyPoints = ["Financial Literacy", "Smart Money Management", "Wealth Creation"];
                    }

                    moduleUpdated = true;
                    repairedCount++;
                }
            }

            if (moduleUpdated) {
                await m.save();
                console.log(`  💾 Saved Module: ${m.title}`);
            }
        }

        console.log(`🎉 Repair complete! Fixed ${repairedCount} lessons with static content.`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

repairContentStatic();
