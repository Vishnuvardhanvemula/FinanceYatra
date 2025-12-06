import api from './api';

class ChallengeService {
  async getDailyQuestion() {
    const res = await api.get('/challenges/daily');
    return res.data;
  }

  async submitDailyAnswer(payload) {
    const res = await api.post('/challenges/daily/submit', payload);
    return res.data;
  }

  async getWeeklyChallenges() {
    const res = await api.get('/challenges/weekly');
    return res.data;
  }

  async createWeeklyChallenge(payload) {
    const res = await api.post('/challenges/weekly/create', payload);
    return res.data;
  }

  async claimWeeklyTask(taskId, weekId) {
    const res = await api.post('/challenges/weekly/claim', { taskId, weekId });
    return res.data;
  }

  async getLeaderboard() {
    const res = await api.get('/challenges/leaderboard');
    return res.data;
  }
}

export default new ChallengeService();
