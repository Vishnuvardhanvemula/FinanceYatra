import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Module from '../models/Module.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/financeyatra';

const ENHANCED_CONTENT = {
    'module-2': [
        {
            id: 1,
            title: "The UPI Revolution",
            subtitle: "Cashless is King",
            duration: "8 mins",
            content: `
                <h3>What is UPI?</h3>
                <p>Unified Payments Interface (UPI) is India's digital payment revolution. It allows you to transfer money instantly using just a mobile number or QR code, 24/7.</p>
                
                <h3>Safety First</h3>
                <p>With great power comes great responsibility. UPI scams are common. Remember: <strong>You never need to enter your PIN to RECEIVE money.</strong></p>

                [UPI_SCANNER]

                <h3>Common UPI Scams</h3>
                <ul>
                    <li><strong>QR Code Fraud:</strong> Scammers ask you to scan a QR code to "receive" a prize. Scanning implies *paying*.</li>
                    <li><strong>Collect Requests:</strong> Fraudsters send a "Collect Request" hoping you'll click Pay thinking it's a refund.</li>
                </ul>
            `,
            keyPoints: ["UPI is instant and 24/7.", "Never enter PIN to receive money.", "Beware of fake collect requests."],
            quiz: [
                {
                    question: "Do you need to enter your UPI PIN to receive money?",
                    options: ["Yes, always", "No, never", "Only for large amounts", "Only from strangers"],
                    correct: 1,
                    explanation: "You only enter your PIN when *sending* money. If someone asks for a PIN to send you money, it's a scam."
                }
            ]
        }
    ],
    'module-3': [
        {
            id: 1,
            title: "Good Debt vs. Bad Debt",
            subtitle: "Borrowing smart",
            duration: "12 mins",
            content: `
                <h3>Not All Loans are Bad</h3>
                <p><strong>Good Debt</strong> helps you build an asset (like a Home Loan or Education Loan). <strong>Bad Debt</strong> drains your wealth significantly (like Credit Card debt for luxury items).</p>

                [EMI_CALCULATOR]

                <h3>Understanding EMI</h3>
                <p>Equated Monthly Installment (EMI) is what you pay back. It has two parts: Principal (the actual loan) and Interest (the cost of borrowing).</p>
            `,
            keyPoints: ["Good debt builds assets; bad debt drains wealth.", "High interest rates kill wealth.", "EMI = Principal + Interest"],
            quiz: [
                {
                    question: "Which of these is considered 'Bad Debt'?",
                    options: ["Home Loan", "Education Loan", "Credit Card Debt for a Vacation", "Business Loan"],
                    correct: 2,
                    explanation: "Borrowing at high interest rates (like credit cards) for depreciating assets or experiences (vacations) is bad debt."
                }
            ]
        }
    ],
    'module-4': [
        {
            id: 1,
            title: "The Eighth Wonder",
            subtitle: "Power of Compounding",
            duration: "10 mins",
            content: `
                <h3>Start Early, Retire Rich</h3>
                <p>Compounding is magic. It means earning interest on your interest. The biggest factor in compounding is not the amount, but <strong>Time</strong>.</p>

                [COMPOUND_INTEREST]

                <h3>The Rule of 72</h3>
                <p>Want to know when your money will double? Divide 72 by your interest rate. If you get 8% returns, your money doubles in 72/8 = 9 years.</p>
            `,
            keyPoints: ["Time is the most important factor in investing.", "Compounding accelerates wealth growth.", "Rule of 72 estimates doubling time."],
            quiz: [
                {
                    question: "Which factor impacts compound interest the most?",
                    options: ["Principal Amount", "Interest Rate", "Time (Duration)", "Bank Name"],
                    correct: 2,
                    explanation: "Time allows compounding to work its magic exponentially. Starting early is better than starting big."
                }
            ]
        }
    ]
};

const enhanceAllModules = async () => {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected');

        for (const [moduleId, lessons] of Object.entries(ENHANCED_CONTENT)) {
            console.log(`📘 Updating ${moduleId}...`);
            const module = await Module.findOne({ id: moduleId });
            if (module) {
                // Preserve existing lessons but update the first ones with our rich content
                const updatedLessons = [...module.lessons];
                // Replace/Update first lesson
                updatedLessons[0] = { ...updatedLessons[0], ...lessons[0] };

                module.lessons = updatedLessons;
                await module.save();
                console.log(`✅ ${moduleId} updated.`);
            } else {
                console.warn(`⚠️ ${moduleId} not found.`);
            }
        }

        console.log('🎉 All modules enhanced successfully!');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

enhanceAllModules();
