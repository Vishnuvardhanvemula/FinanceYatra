import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import LanguageSelector from '../components/LanguageSelector';
import chatService from '../services/chatService';

export default function ChatPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, refreshUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [autoSpeak, setAutoSpeak] = useState(false); // Disabled by default to avoid autoplay issues

  // Initialize session when user changes
  useEffect(() => {
    if (user?._id) {
      chatService.initializeUserSession(user._id);
    }
  }, [user?._id]);

  // Load chat history on mount
  useEffect(() => {
    loadHistory();
    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
      setSelectedLanguage(savedLang);
    }
    // Load auto-speak preference
    const savedAutoSpeak = localStorage.getItem('autoSpeak');
    if (savedAutoSpeak !== null) {
      setAutoSpeak(savedAutoSpeak === 'true');
    }
  }, [user?._id]);

  const loadHistory = async () => {
    try {
      const userId = user?._id || null;
      const data = await chatService.getHistory(userId);
      if (data.messages && data.messages.length > 0) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  };

  const handleSendMessage = async (content) => {
    setError(null);
    
    // Add user message immediately
    const userMessage = {
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send to backend with language preference and userId
      const userId = user?._id || null;
      const response = await chatService.sendMessage(content, selectedLanguage, userId);
      
      // Add assistant response
      const assistantMessage = {
        role: 'assistant',
        content: response.message,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Refresh user profile to get updated proficiency (if authenticated)
      if (isAuthenticated) {
        setTimeout(() => {
          refreshUser();
        }, 1000); // Delay to allow backend to update
      }
    } catch (error) {
      setError(error.message);
      console.error('Send message error:', error);
      
      // Add error message
      const errorMessage = {
        role: 'assistant',
        content: '❌ Sorry, I encountered an error. Please make sure the backend server is running and try again.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
  };

  const toggleAutoSpeak = () => {
    const newValue = !autoSpeak;
    setAutoSpeak(newValue);
    localStorage.setItem('autoSpeak', newValue.toString());
  };

  const handleNewChat = () => {
    if (window.confirm('Start a new conversation? Current chat will be saved.')) {
      const userId = user?._id || null;
      chatService.clearSession(userId);
      setMessages([]);
      setError(null);
    }
  };

  const handleLogout = async () => {
    // Clear chat sessions before logout for security
    if (user?._id) {
      chatService.clearAllUserSessions(user._id);
    }
    await logout();
    navigate('/');
  };

  const getProficiencyBadge = () => {
    if (!user || !user.proficiencyLevel || user.proficiencyLevel === 'unknown') {
      return null;
    }

    const badges = {
      beginner: { text: 'Beginner', color: 'bg-green-100 text-green-700' },
      intermediate: { text: 'Intermediate', color: 'bg-yellow-100 text-yellow-700' },
      expert: { text: 'Expert', color: 'bg-red-100 text-red-700' }
    };

    const badge = badges[user.proficiencyLevel];
    return badge ? (
      <span className={`text-xs px-2 py-1 rounded ${badge.color}`}>
        {badge.text}
      </span>
    ) : null;
  };

  return (
    <div className="flex flex-col bg-gradient-to-br from-gray-50 via-teal-50/20 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Clean Chat Controls Bar */}
      <div className="navbar-blur border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    AI Financial Assistant
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Powered by Ollama LLM
                  </p>
                </div>
              </div>
              {isAuthenticated && user && (
                <div className="hidden sm:block">
                  {getProficiencyBadge()}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <LanguageSelector 
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
              />
              <button
                onClick={toggleAutoSpeak}
                className={`px-4 py-2.5 text-sm rounded-xl font-medium transition-all duration-200 shadow-sm ${
                  autoSpeak 
                    ? 'bg-teal-500 text-white hover:bg-teal-600' 
                    : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                }`}
                title={autoSpeak ? 'Auto-speak ON' : 'Auto-speak OFF'}
              >
                {autoSpeak ? '🔊 Auto' : '🔇 Manual'}
              </button>
              <button
                onClick={handleNewChat}
                className="px-4 py-2.5 text-sm bg-white dark:bg-gray-700 hover:bg-teal-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-all duration-200 font-medium border border-gray-200 dark:border-gray-600 shadow-sm"
              >
                🔄 New
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Banner - Clean */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800 px-4 py-3 animate-fadeIn">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">⚠️</span>
            </div>
            <span className="text-sm text-red-800 dark:text-red-200 flex-1">{error}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-auto text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg p-1.5 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      <MessageList 
        messages={messages} 
        isLoading={isLoading} 
        selectedLanguage={selectedLanguage}
        autoSpeak={autoSpeak}
      />

      {/* Input */}
      <MessageInput 
        onSend={handleSendMessage} 
        disabled={isLoading} 
        selectedLanguage={selectedLanguage}
      />
    </div>
  );
}
