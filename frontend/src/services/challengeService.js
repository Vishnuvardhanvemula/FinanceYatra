import axios from "axios";
import { API_URL } from '../config/api';

// Create an axios instance for consistent defaults and interceptors
const http = axios.create({ baseURL: API_URL, timeout: 8000 });

// Request interceptor to attach auth header
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  return config;
}, (err) => Promise.reject(err));

// Response interceptor to centralize error handling (e.g., token expiration)
http.interceptors.response.use((res) => res, (error) => {
  if (error.response && error.response.status === 401) {
    // Optionally, emit global event to signal re-login could be required
    // window.dispatchEvent(new Event('auth:expired'));
  }
  return Promise.reject(error);
});

class ChallengeService {
  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  async getDailyQuestion() {
    const res = await http.get('/challenges/daily');
    return res.data;
  }

  async submitDailyAnswer(payload) {
    const res = await http.post('/challenges/daily/submit', payload);
    return res.data;
  }

  async getWeeklyChallenges() {
    try {
      const res = await http.get('/challenges/weekly');
      return res.data;
    } catch (err) {
      // Retry once for transient server errors
      if (err.response && err.response.status >= 500) {
        await new Promise(r => setTimeout(r, 700));
        const res = await http.get('/challenges/weekly');
        return res.data;
      }
      throw err;
    }
  }

  async createWeeklyChallenge(payload) {
    const res = await http.post('/challenges/weekly/create', payload);
    return res.data;
  }

  async claimWeeklyTask(taskId, weekId) {
    const res = await http.post('/challenges/weekly/claim', { taskId, weekId });
    return res.data;
  }

  async getLeaderboard() {
    const res = await http.get('/challenges/leaderboard');
    return res.data;
  }
}

export default new ChallengeService();
