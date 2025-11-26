import { learningModules } from '../data/learningModules';

const TASK_TYPES = [
  { type: 'quiz', label: 'Ace the Quiz', icon: '🎯', xpMult: 1.5 },
  { type: 'tool', label: 'Use Calculator', icon: '🧮', xpMult: 1.2 },
  { type: 'read', label: 'Study Module', icon: '📖', xpMult: 1.0 },
  { type: 'perfect', label: 'Perfect Score', icon: '🏆', xpMult: 2.0 }
];

export function generateWeeklyTasks(count = 5) {
  const tasks = [];
  const usedModules = new Set();

  for (let i = 0; i < count; i++) {
    // Pick a random module that hasn't been used too much if possible
    let moduleIndex = Math.floor(Math.random() * learningModules.length);
    let attempts = 0;
    while (usedModules.has(moduleIndex) && attempts < 5) {
      moduleIndex = Math.floor(Math.random() * learningModules.length);
      attempts++;
    }
    usedModules.add(moduleIndex);

    const m = learningModules[moduleIndex];
    const taskType = TASK_TYPES[Math.floor(Math.random() * TASK_TYPES.length)];

    // Base XP based on difficulty
    const baseXp = m.difficulty === 'expert' ? 50 : m.difficulty === 'intermediate' ? 30 : 20;
    const finalXp = Math.round(baseXp * taskType.xpMult);

    let title = '';
    switch (taskType.type) {
      case 'quiz':
        title = `Complete Quiz: ${m.title}`;
        break;
      case 'tool':
        title = `Use Tools in ${m.title}`;
        break;
      case 'perfect':
        title = `Get 100% in ${m.title} Quiz`;
        break;
      default:
        title = `Review Chapter: ${m.title}`;
    }

    tasks.push({
      id: `wk-task-${Date.now()}-${i}`,
      title: title,
      xp: finalXp,
      icon: taskType.icon,
      type: taskType.type,
      moduleId: m.id,
      done: false,
      generated: true
    });
  }

  return tasks;
}

export default generateWeeklyTasks;
