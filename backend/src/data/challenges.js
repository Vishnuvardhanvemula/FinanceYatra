import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STORE_PATH = path.resolve(__dirname, './weekly_store.json');

export const dailyQuestions = [
  {
    id: 'q1',
    prompt: 'If you invest ₹10,000 at an annual interest rate of 5% compounded yearly, how much will you have after 2 years?',
    choices: ['₹10,050', '₹10,500', '₹11,025', '₹10,200'],
    correct: '₹11,025',
    points: 10
  },
  {
    id: 'q2',
    prompt: 'Which of the following is considered a safe investment for short-term parking of cash?',
    choices: ['Equity mutual funds', 'Recurring deposit', 'Stock futures', 'Peer-to-peer lending'],
    correct: 'Recurring deposit',
    points: 8
  },
  {
    id: 'q3',
    prompt: 'Which financial instrument typically offers the highest long-term returns?',
    choices: ['Savings account', 'Government bonds', 'Equity stocks', 'Fixed deposits'],
    correct: 'Equity stocks',
    points: 15
  },
  {
    id: 'q4',
    prompt: 'What does "diversification" mean in investing?',
    choices: ['Putting all money in one stock', 'Spreading investments across different assets', 'Investing only in foreign markets', 'Buying insurance policies'],
    correct: 'Spreading investments across different assets',
    points: 10
  },
  {
    id: 'q5',
    prompt: 'What is the primary purpose of an Emergency Fund?',
    choices: ['To buy luxury items', 'To cover unexpected expenses', 'To invest in stocks', 'To pay for vacations'],
    correct: 'To cover unexpected expenses',
    points: 10
  },
  {
    id: 'q6',
    prompt: 'Which of these is a direct tax in India?',
    choices: ['GST', 'Income Tax', 'Excise Duty', 'Customs Duty'],
    correct: 'Income Tax',
    points: 12
  },
  {
    id: 'q7',
    prompt: 'What is the full form of SIP?',
    choices: ['Systematic Investment Plan', 'Simple Interest Plan', 'Secure Income Plan', 'Stock Investment Plan'],
    correct: 'Systematic Investment Plan',
    points: 8
  },
  {
    id: 'q8',
    prompt: 'A higher credit score helps you to:',
    choices: ['Get loans at lower interest rates', 'Avoid paying taxes', 'Get free insurance', 'Earn more interest on savings'],
    correct: 'Get loans at lower interest rates',
    points: 15
  },
  {
    id: 'q9',
    prompt: 'What is the lock-in period for ELSS mutual funds?',
    choices: ['1 year', '3 years', '5 years', '10 years'],
    correct: '3 years',
    points: 12
  },
  {
    id: 'q10',
    prompt: 'Which of these is NOT a cryptocurrency?',
    choices: ['Bitcoin', 'Ethereum', 'Digital Rupee (e₹)', 'Dogecoin'],
    correct: 'Digital Rupee (e₹)',
    points: 10
  },
  {
    id: 'q11',
    prompt: 'What does ROI stand for?',
    choices: ['Rate of Inflation', 'Return on Investment', 'Risk of Investment', 'Return on Interest'],
    correct: 'Return on Investment',
    points: 8
  },
  {
    id: 'q12',
    prompt: 'Which term refers to the rise in prices of goods and services over time?',
    choices: ['Deflation', 'Inflation', 'Recession', 'Depreciation'],
    correct: 'Inflation',
    points: 10
  },
  {
    id: 'q13',
    prompt: 'What is a "Bear Market"?',
    choices: ['Market prices are rising', 'Market prices are falling', 'Market is stable', 'Market is closed'],
    correct: 'Market prices are falling',
    points: 12
  },
  {
    id: 'q14',
    prompt: 'Which document is mandatory for filing Income Tax Returns in India?',
    choices: ['Passport', 'PAN Card', 'Driving License', 'Voter ID'],
    correct: 'PAN Card',
    points: 10
  },
  {
    id: 'q15',
    prompt: 'Compound interest is often called the eighth wonder of the world because:',
    choices: ['It is complicated', 'It allows money to grow exponentially', 'It is only for rich people', 'It reduces risk'],
    correct: 'It allows money to grow exponentially',
    points: 10
  }
];

export let weeklyChallenges = [];

try {
  if (fs.existsSync(STORE_PATH)) {
    const raw = fs.readFileSync(STORE_PATH, 'utf8');
    weeklyChallenges = JSON.parse(raw);
  }
} catch (err) {
  console.error('Failed to load weekly_store.json, falling back to empty array', err);
  weeklyChallenges = [];
}
