import api from './api';

class ChatService {
  constructor() {
    this.sessionId = null;
  }

  // Get session ID specific to current user
  getOrCreateSessionId(userId) {
    // Use user-specific key to prevent cross-user session access
    const storageKey = userId ? `chatSessionId_${userId}` : 'chatSessionId_guest';

    let sessionId = localStorage.getItem(storageKey);
    if (!sessionId) {
      sessionId = this.generateSessionId();
      localStorage.setItem(storageKey, sessionId);
    }
    this.sessionId = sessionId;
    return sessionId;
  }

  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  async sendMessage(message, language = 'en', userId = null) {
    try {
      // Ensure we have a session ID for the current user
      if (!this.sessionId) {
        this.getOrCreateSessionId(userId);
      }

      const response = await api.post('/chat/message', {
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

  async getHistory(userId = null) {
    try {
      // Ensure we have a session ID for the current user
      if (!this.sessionId) {
        this.getOrCreateSessionId(userId);
      }

      const response = await api.get(`/chat/history/${this.sessionId}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404 || error.response?.status === 401) {
        return { messages: [] };
      }
      console.error('Failed to fetch history:', error);
      return { messages: [] };
    }
  }

  async createNewSession(language = 'en', userId = null) {
    try {
      const response = await api.post('/chat/session', { language });

      this.sessionId = response.data.sessionId;

      // Store with user-specific key
      const storageKey = userId ? `chatSessionId_${userId}` : 'chatSessionId_guest';
      localStorage.setItem(storageKey, this.sessionId);

      return response.data;
    } catch (error) {
      console.error('Failed to create session:', error);
      throw error;
    }
  }

  // Clear session for current user
  clearSession(userId = null) {
    const storageKey = userId ? `chatSessionId_${userId}` : 'chatSessionId_guest';
    localStorage.removeItem(storageKey);
    this.sessionId = this.generateSessionId();
    localStorage.setItem(storageKey, this.sessionId);
  }

  // Clear all user sessions (called on logout)
  clearAllUserSessions(userId) {
    if (userId) {
      const storageKey = `chatSessionId_${userId}`;
      localStorage.removeItem(storageKey);
      console.log(`🧹 Cleared chat session for user: ${userId}`);
    }
    // Also clear guest session
    localStorage.removeItem('chatSessionId_guest');
    this.sessionId = null;
  }

  // Initialize session for logged-in user
  initializeUserSession(userId) {
    if (userId) {
      this.getOrCreateSessionId(userId);
      console.log(`🔐 Initialized chat session for user: ${userId}`);
    }
  }
}

export default new ChatService();
