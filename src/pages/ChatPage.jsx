import { useState, useEffect } from 'react';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import LanguageSelector from '../components/LanguageSelector';
import chatService from '../services/chatService';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [autoSpeak, setAutoSpeak] = useState(false); // Disabled by default to avoid autoplay issues

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
  }, []);

  const loadHistory = async () => {
    try {
      const data = await chatService.getHistory();
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
      // Send to backend with language preference
      const response = await chatService.sendMessage(content, selectedLanguage);
      
      // Add assistant response
      const assistantMessage = {
        role: 'assistant',
        content: response.message,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
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
      chatService.clearSession();
      setMessages([]);
      setError(null);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-indigo-600">financeYatra</h1>
            <p className="text-sm text-gray-600">Your Multilingual Financial Learning Assistant 🦙</p>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector 
              selectedLanguage={selectedLanguage}
              onLanguageChange={handleLanguageChange}
            />
            <button
              onClick={toggleAutoSpeak}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                autoSpeak 
                  ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={autoSpeak ? 'Auto-speak ON' : 'Auto-speak OFF'}
            >
              {autoSpeak ? '🔊 Auto-speak' : '🔇 Auto-speak'}
            </button>
            <button
              onClick={handleNewChat}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              🔄 New Chat
            </button>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center gap-2 text-red-800">
            <span>⚠️</span>
            <span className="text-sm">{error}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              ✕
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

      {/* Footer info */}
      <div className="bg-white border-t px-4 py-2 text-center text-xs text-gray-500">
        <div className="mb-1">
          Supports: English, हिंदी, தமிழ், తెలుగు, বাংলা, ಕನ್ನಡ, മലയാളം, मराठी, ગુજરાતી, ਪੰਜਾਬੀ | Powered by Ollama 🦙
        </div>
        <div className={autoSpeak ? "text-indigo-600" : "text-amber-600"}>
          {autoSpeak ? (
            <>🔊 Auto-speak ON | Click speaker icons to replay</>
          ) : (
            <>💡 <strong>Tip:</strong> Click speaker icons (🔊) next to responses to hear them spoken in your language!</>
          )}
        </div>
      </div>
    </div>
  );
}
