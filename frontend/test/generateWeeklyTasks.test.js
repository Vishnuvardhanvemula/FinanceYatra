import { describe, it, expect } from 'vitest';
import generateWeeklyTasks from '../src/utils/generateWeeklyTasks';

describe('generateWeeklyTasks', () => {
  it('should return an array of tasks with default count', () => {
    const tasks = generateWeeklyTasks();
    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks.length).toBeGreaterThan(0);
    tasks.forEach(t => {
      expect(t).toHaveProperty('id');
      expect(t).toHaveProperty('title');
      expect(t).toHaveProperty('xp');
      expect(t).toHaveProperty('generated', true);
      expect(t).toHaveProperty('done', false);
    });
  });

  it('should respect the count parameter', () => {
    const tasks = generateWeeklyTasks(3);
    expect(tasks.length).toBe(3);
  });
});
