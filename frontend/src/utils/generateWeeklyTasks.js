import { learningModules } from '../data/learningModules';

export function generateWeeklyTasks(count = 6) {
  // simple shuffle
  const modules = [...learningModules];
  for (let i = modules.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [modules[i], modules[j]] = [modules[j], modules[i]];
  }

  const tasks = [];
  for (let i = 0; i < Math.min(count, modules.length); i++) {
    const m = modules[i];
    const lessonNum = Math.max(1, Math.min(m.lessons || 1, Math.ceil(Math.random() * (m.lessons || 3))));
    const topic = (m.topics && m.topics.length) ? m.topics[Math.floor(Math.random() * m.topics.length)] : null;
    const difficultyXp = m.difficulty === 'expert' ? 60 : m.difficulty === 'intermediate' ? 40 : 25;

    tasks.push({
      id: `gen-${m.id}-${Date.now()}-${i}`,
      title: topic ? `Read about ${topic} — ${m.title}` : `Complete lesson ${lessonNum} of ${m.title}`,
      xp: difficultyXp,
      icon: m.icon || '📘',
      done: false,
      generated: true
    });
  }

  return tasks;
}

export default generateWeeklyTasks;
