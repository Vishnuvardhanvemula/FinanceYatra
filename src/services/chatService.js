import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ChatService {
  constructor() {
    this.sessionId = this.getOrCreateSessionId();
  }

  getOrCreateSessionId() {
    let sessionId = localStorage.getItem('chatSessionId');
    if (!sessionId) {
      sessionId = this.generateSessionId();
      localStorage.setItem('chatSessionId', sessionId);
    }
    return sessionId;
  }

  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  async sendMessage(message, language = 'en') {
    try {
      const response = await axios.post(`${API_BASE_URL}/chat/message`, {
        message,
        sessionId: this.sessionId,
        language
      });

      return response.data;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw new Error('Failed to send message. Please try again.');
    }
  }

  async getHistory() {
    try {
      const response = await axios.get(`${API_BASE_URL}/chat/history/${this.sessionId}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return { messages: [] };
      }
      console.error('Failed to fetch history:', error);
      return { messages: [] };
    }
  }

  async createNewSession(language = 'en') {
    try {
      const response = await axios.post(`${API_BASE_URL}/chat/session`, { language });
      this.sessionId = response.data.sessionId;
      localStorage.setItem('chatSessionId', this.sessionId);
      return response.data;
    } catch (error) {
      console.error('Failed to create session:', error);
      throw error;
    }
  }

  clearSession() {
    localStorage.removeItem('chatSessionId');
    this.sessionId = this.generateSessionId();
    localStorage.setItem('chatSessionId', this.sessionId);
  }
}

export default new ChatService();
