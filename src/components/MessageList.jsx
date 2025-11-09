import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function MessageList({ messages, isLoading, selectedLanguage = 'en', autoSpeak = true }) {
  const messagesEndRef = useRef(null);
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const synthesisRef = useRef(null);
  const [availableVoices, setAvailableVoices] = useState([]);
  const currentAudioRef = useRef(null);
  const isStoppingRef = useRef(false);

  // Language code mapping for Text-to-Speech
  const ttsLanguageMap = {
    'en': 'en-US',
    'hi': 'hi-IN',
    'te': 'te-IN',
    'ta': 'ta-IN',
    'bn': 'bn-IN',
    'kn': 'kn-IN',
    'ml': 'ml-IN',
    'mr': 'mr-IN',
    'gu': 'gu-IN',
    'pa': 'pa-IN',
    'or': 'or-IN'
  };

  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis;
      setIsSpeechSupported(true);
      
      // Load voices - important for language support
      const loadVoices = () => {
        const voices = synthesisRef.current.getVoices();
        setAvailableVoices(voices);
        console.log('🎤 Available voices:', voices.length);
        
        // Log Indian language voices if any
        const indianVoices = voices.filter(v => 
          v.lang.includes('hi') || v.lang.includes('te') || 
          v.lang.includes('ta') || v.lang.includes('bn') || 
          v.lang.includes('kn') || v.lang.includes('ml')
        );
        if (indianVoices.length > 0) {
          console.log('🇮🇳 Indian language voices:', indianVoices.map(v => `${v.name} (${v.lang})`));
        } else {
          console.log('⚠️ No Indian language voices found - will use Google TTS for Indian languages');
        }
      };
      
      // Load immediately
      loadVoices();
      
      // Some browsers load voices asynchronously
      if (synthesisRef.current.onvoiceschanged !== undefined) {
        synthesisRef.current.onvoiceschanged = loadVoices;
      }
      
      // Also try loading after a delay (Chrome needs this sometimes)
      setTimeout(loadVoices, 100);
    }

    // Cleanup: stop any ongoing speech when component unmounts
    return () => {
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }
    };
  }, []);

  // Auto-speak new assistant messages
  useEffect(() => {
    if (!autoSpeak || !isSpeechSupported || messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    const lastIndex = messages.length - 1;

    // Only auto-speak assistant messages (not user messages)
    if (lastMessage.role === 'assistant' && lastMessage.content) {
      // Small delay to ensure message is rendered
      const timer = setTimeout(() => {
        speakMessage(lastMessage.content, lastIndex);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [messages, autoSpeak, isSpeechSupported]);

  const speakMessage = (text, index) => {
    if (!synthesisRef.current || !text) return;

    // For non-English languages, check if we have Hindi voice (works for Indian scripts)
    // Skip Google TTS due to CORS/format issues, use Web Speech with Hindi voice
    if (selectedLanguage !== 'en') {
      console.log(`🌐 Non-English language (${selectedLanguage}) - checking for Indian language voices...`);
      
      const voices = synthesisRef.current.getVoices();
      const indianVoice = voices.find(v => 
        v.lang.startsWith(selectedLanguage) || 
        v.lang.startsWith('hi') // Hindi voice can read other Indian scripts
      );
      
      if (indianVoice) {
        console.log(`✅ Found Indian voice: ${indianVoice.name} - using directly`);
        speakWithWebSpeech(text, selectedLanguage, index, indianVoice);
        return;
      } else {
        console.log(`⚠️ No Indian voices found - trying Google TTS as last resort`);
        speakWithGoogleTTS(text, selectedLanguage, index);
        return;
      }
    }

    // For English, use Web Speech API
    speakWithWebSpeech(text, selectedLanguage, index, null);
  };
  
  const speakWithWebSpeech = (text, language, index, voice) => {
    if (!synthesisRef.current) return;
    
    // Cancel any ongoing speech
    synthesisRef.current.cancel();
    
    const ttsLang = ttsLanguageMap[language] || 'en-US';
    
    // For Telugu and other South Indian languages, use Hindi lang code if Hindi voice
    let effectiveLang = ttsLang;
    if (voice && voice.lang.startsWith('hi') && language !== 'hi') {
      effectiveLang = 'hi-IN';
      console.log(`💡 Using Hindi pronunciation for ${language} text`);
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = effectiveLang;
    utterance.rate = 0.8; // Slower for clarity
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    if (voice) {
      utterance.voice = voice;
      console.log(`🔊 Using voice: ${voice.name} (${voice.lang}) for lang: ${effectiveLang}`);
    }

    // Event handlers
    utterance.onstart = () => {
      console.log('🔊 Speaking...');
      setSpeakingIndex(index);
    };

    utterance.onend = () => {
      console.log('✅ Speech finished');
      setSpeakingIndex(null);
    };

    utterance.onerror = (event) => {
      console.error('❌ Speech error:', event.error);
      setSpeakingIndex(null);
      
      // If Web Speech fails for Indian language, try Google TTS
      if (language !== 'en' && event.error !== 'canceled') {
        console.log('🔄 Web Speech failed, trying Google TTS...');
        speakWithGoogleTTS(text, language, index);
      }
    };

    synthesisRef.current.speak(utterance);
  };

  // Use backend TTS service for high-quality pronunciation
  const speakWithGoogleTTS = async (text, language, index) => {
    setSpeakingIndex(index);
    
    console.log(`🔊 Requesting TTS from backend for ${language}...`);
    console.log(`📝 Full text length: ${text.length} chars`);
    
    // Split text into chunks (200 chars max per chunk due to Google TTS limits)
    const chunks = splitIntoChunks(text, 200, language);
    console.log(`📦 Split into ${chunks.length} chunk(s)`);
    
    try {
      // Play chunks sequentially
      await playChunksSequentially(chunks, language, index);
    } catch (error) {
      console.error('❌ Backend TTS error:', error);
      setSpeakingIndex(null);
      
      // Fallback to Web Speech
      console.log('🔄 Backend TTS failed, trying Web Speech API...');
      tryWebSpeechFallback(text, language, index);
    }
  };
  
  // Helper: Split text into chunks
  const splitIntoChunks = (text, maxLength, language) => {
    if (text.length <= maxLength) {
      return [text];
    }
    
    const chunks = [];
    
    // Split by sentences (Telugu uses । or ., English uses .)
    const sentencePattern = /[^।.!?]+[।.!?]+/g;
    const sentences = text.match(sentencePattern) || [text];
    
    let currentChunk = '';
    
    for (const sentence of sentences) {
      const trimmedSentence = sentence.trim();
      if (currentChunk && (currentChunk.length + trimmedSentence.length + 1) > maxLength) {
        chunks.push(currentChunk.trim());
        currentChunk = trimmedSentence;
      } else {
        currentChunk += (currentChunk ? ' ' : '') + trimmedSentence;
      }
    }
    
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }
    
    return chunks.length > 0 ? chunks : [text.substring(0, maxLength)];
  };
  
  // Helper: Play audio chunks one after another
  const playChunksSequentially = async (chunks, language, index) => {
    for (let i = 0; i < chunks.length; i++) {
      // Check if user requested stop
      if (isStoppingRef.current) {
        console.log('⏹️ Playback stopped by user');
        setSpeakingIndex(null);
        return;
      }
      
      const chunk = chunks[i];
      console.log(`🔊 Playing chunk ${i + 1}/${chunks.length} (${chunk.length} chars)`);
      
      try {
        // Fetch audio from backend
        const response = await fetch('http://localhost:5000/api/tts/speak', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: chunk,
            language: language
          })
        });
        
        if (!response.ok) {
          throw new Error(`TTS backend error: ${response.status}`);
        }
        
        // Get audio blob
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Play audio and wait for it to finish
        await new Promise((resolve, reject) => {
          const audio = new Audio(audioUrl);
          currentAudioRef.current = audio;
          
          audio.onended = () => {
            console.log(`✅ Chunk ${i + 1} finished`);
            URL.revokeObjectURL(audioUrl);
            currentAudioRef.current = null;
            resolve();
          };
          
          audio.onerror = (error) => {
            console.error(`❌ Chunk ${i + 1} playback error:`, error);
            URL.revokeObjectURL(audioUrl);
            currentAudioRef.current = null;
            reject(error);
          };
          
          audio.play().catch(reject);
        });
        
        // Check again after each chunk
        if (isStoppingRef.current) {
          console.log('⏹️ Playback stopped by user');
          setSpeakingIndex(null);
          return;
        }
        
      } catch (error) {
        console.error(`❌ Error playing chunk ${i + 1}:`, error);
        throw error;
      }
    }
    
    // All chunks played successfully
    console.log('✅ All chunks played successfully');
    setSpeakingIndex(null);
  };
  
  const tryWebSpeechFallback = (text, language, index) => {
    if (!synthesisRef.current) {
      setSpeakingIndex(null);
      console.error('❌ Speech synthesis not available');
      toast.error(`Cannot play audio in ${language}. Your browser may not support text-to-speech for this language.`, {
        duration: 5000,
      });
      return;
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    const ttsLang = ttsLanguageMap[language] || 'en-US';
    utterance.lang = ttsLang;
    utterance.rate = 0.75; // Slower for Indian languages
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Try to find a voice for the language
    const voices = synthesisRef.current.getVoices();
    
    // First try: exact language match
    let matchingVoice = voices.find(v => v.lang.startsWith(language));
    
    // Second try: For South Indian languages (te, ta, kn, ml), try Hindi as it's closer than English
    if (!matchingVoice && ['te', 'ta', 'kn', 'ml', 'mr', 'gu', 'bn', 'pa', 'or'].includes(language)) {
      console.log(`💡 No ${language} voice, trying Hindi voice as fallback...`);
      matchingVoice = voices.find(v => v.lang.startsWith('hi'));
      if (matchingVoice) {
        utterance.lang = 'hi-IN'; // Use Hindi pronunciation rules
        console.log(`🔊 Using Hindi voice for Indian script: ${matchingVoice.name}`);
      }
    }
    
    if (matchingVoice) {
      utterance.voice = matchingVoice;
      console.log(`🔊 Using Web Speech voice: ${matchingVoice.name} (${matchingVoice.lang})`);
    } else {
      console.warn(`⚠️ No ${language} or hi voice found. Text may be spelled out in English.`);
      console.log(`💡 Available voices:`, voices.map(v => v.lang).join(', '));
    }
    
    utterance.onstart = () => {
      console.log('🔊 Web Speech started');
      setSpeakingIndex(index);
    };
    
    utterance.onend = () => {
      console.log('✅ Web Speech finished');
      setSpeakingIndex(null);
    };
    
    utterance.onerror = (event) => {
      console.error('❌ Web Speech error:', event.error);
      setSpeakingIndex(null);
      
      if (event.error === 'not-allowed') {
        toast.error('Speech blocked by browser. Please allow audio playback and try clicking the speaker icon manually.', {
          duration: 5000,
        });
      } else if (event.error === 'network') {
        toast.error('Network error. Please check your internet connection.', {
          duration: 4000,
        });
      } else {
        toast.error(`Cannot speak in ${language}. Try turning OFF auto-speak and click speaker icons manually.`, {
          duration: 5000,
        });
      }
    };
    
    synthesisRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    isStoppingRef.current = true;
    
    // Stop Web Speech API
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
    }
    
    // Stop audio playback (Google TTS)
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
    
    setSpeakingIndex(null);
    
    // Reset the stopping flag after a short delay
    setTimeout(() => {
      isStoppingRef.current = false;
    }, 100);
  };

  const toggleSpeak = (text, index) => {
    if (speakingIndex === index) {
      stopSpeaking();
    } else {
      speakMessage(text, index);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Welcome to financeYatra!
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            I'm your financial learning assistant. Ask me anything about:
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm text-left">
            <div className="bg-indigo-50 dark:bg-gray-700 dark:text-gray-200 p-3 rounded">💰 EMI & Loans</div>
            <div className="bg-indigo-50 dark:bg-gray-700 dark:text-gray-200 p-3 rounded">📱 UPI & Payments</div>
            <div className="bg-indigo-50 dark:bg-gray-700 dark:text-gray-200 p-3 rounded">📈 Investments</div>
            <div className="bg-indigo-50 dark:bg-gray-700 dark:text-gray-200 p-3 rounded">💵 Savings</div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            🌍 Type in any language - I understand Hindi, Tamil, Telugu, Bengali, and more!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-teal-600 dark:bg-teal-700 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                  {msg.timestamp && (
                    <div
                      className={`text-xs mt-1 ${
                        msg.role === 'user' ? 'text-teal-200 dark:text-teal-300' : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                  )}
                </div>
                
                {/* Speaker button for assistant messages */}
                {msg.role === 'assistant' && isSpeechSupported && (
                  <button
                    onClick={() => toggleSpeak(msg.content, index)}
                    className={`flex-shrink-0 p-1.5 rounded-full transition-all ${
                      speakingIndex === index
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                    }`}
                    title={speakingIndex === index ? 'Stop speaking (click to stop)' : 'Read aloud'}
                  >
                    {speakingIndex === index ? (
                      // Stop icon (square)
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="6" width="12" height="12" rx="2" />
                      </svg>
                    ) : (
                      // Speaker icon
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
