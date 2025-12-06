/**
 * Learning Modules Configuration (Backend)
 * Defines the structure of all financial literacy modules
 */

export const learningModules = [
  {
    id: 'module-1',
    title: 'Banking Basics',
    difficulty: 'beginner',
    lessons: 5,
    prerequisites: []
  },
  {
    id: 'module-2',
    title: 'Digital Payments',
    difficulty: 'beginner',
    lessons: 4,
    prerequisites: ['module-1']
  },
  {
    id: 'module-4', // Saving & Budgeting (Moved up in logic)
    title: 'Saving & Budgeting',
    difficulty: 'beginner',
    lessons: 5,
    prerequisites: ['module-2']
  },
  {
    id: 'module-3', // Loans
    title: 'Understanding Loans',
    difficulty: 'beginner',
    lessons: 6,
    prerequisites: ['module-1']
  },
  {
    id: 'module-13', // Credit Cards
    title: 'Credit Cards & Credit Score',
    difficulty: 'intermediate',
    lessons: 6,
    prerequisites: ['module-3']
  },
  {
    id: 'module-5', // Insurance
    title: 'Insurance Essentials',
    difficulty: 'intermediate',
    lessons: 6,
    prerequisites: ['module-4']
  },
  {
    id: 'module-12', // Goal Planning
    title: 'Financial Goal Planning',
    difficulty: 'intermediate',
    lessons: 6,
    prerequisites: ['module-4']
  },
  {
    id: 'module-6', // Investment Basics
    title: 'Investment Basics',
    difficulty: 'intermediate',
    lessons: 7,
    prerequisites: ['module-4', 'module-12']
  },
  {
    id: 'module-7', // Tax
    title: 'Tax Planning',
    difficulty: 'intermediate',
    lessons: 7,
    prerequisites: ['module-4']
  },
  {
    id: 'module-8', // Mutual Funds
    title: 'Mutual Funds Mastery',
    difficulty: 'intermediate',
    lessons: 8,
    prerequisites: ['module-6']
  },
  {
    id: 'module-9', // Stocks
    title: 'Stock Market Fundamentals',
    difficulty: 'expert',
    lessons: 9,
    prerequisites: ['module-8']
  },
  {
    id: 'module-10', // Retirement
    title: 'Retirement Planning',
    difficulty: 'expert',
    lessons: 8,
    prerequisites: ['module-6', 'module-8']
  },
  {
    id: 'module-11', // Real Estate
    title: 'Real Estate Investment',
    difficulty: 'expert',
    lessons: 9,
    prerequisites: ['module-6']
  },
  {
    id: 'module-14', // Adv Tax
    title: 'Advanced Tax Strategies',
    difficulty: 'expert',
    lessons: 10,
    prerequisites: ['module-7']
  },
  {
    id: 'module-15', // Portfolio
    title: 'Portfolio Management',
    difficulty: 'expert',
    lessons: 10,
    prerequisites: ['module-9', 'module-10']
  }
];
