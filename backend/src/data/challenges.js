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
