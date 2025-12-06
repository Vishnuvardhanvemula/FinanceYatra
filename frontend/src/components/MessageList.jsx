import { useEffect, useRef, useState } from 'react';
import api from '../services/api';
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
        // Fetch audio from backend (Updated to use api client)
        const response = await api.post('/tts/speak', {
          text: chunk,
          language: language
        }, {
          responseType: 'blob'
        });

        // Get audio blob (axios returns it in data when responseType is blob)
        const audioBlob = response.data;
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
        <div className="text-center max-w-2xl">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-xl">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-3">
            Welcome to financeYatra AI Assistant!
          </h3>
          <p className="text-lg font-semibold text-teal-600 dark:text-teal-400 mb-4">
            Your AI Mentor for Smart Money Decisions
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            I'm here to help you learn about finance. Ask me anything about:
          </p>
          <div className="grid grid-cols-2 gap-3 text-sm mb-6">
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/20 border border-teal-200 dark:border-teal-700 p-4 rounded-xl hover:shadow-lg transition-all duration-200">
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-5 h-5 text-teal-600 dark:text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold text-teal-800 dark:text-teal-300">EMI & Loans</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700 p-4 rounded-xl hover:shadow-lg transition-all duration-200">
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold text-purple-800 dark:text-purple-300">UPI & Payments</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700 p-4 rounded-xl hover:shadow-lg transition-all duration-200">
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold text-blue-800 dark:text-blue-300">Investments</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 border border-green-200 dark:border-green-700 p-4 rounded-xl hover:shadow-lg transition-all duration-200">
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold text-green-800 dark:text-green-300">Savings</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-teal-50 via-purple-50 to-blue-50 dark:from-teal-900/20 dark:via-purple-900/20 dark:to-blue-900/20 border border-teal-200 dark:border-teal-700 rounded-xl p-4">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <svg className="w-5 h-5 text-teal-600 dark:text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Type or speak in any language - I understand Hindi, Tamil, Telugu, Bengali, and 7+ more!</span>
            </div>
          </div>
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
              className={`max-w-[80%] rounded-lg px-4 py-3 ${msg.role === 'user'
                  ? 'bg-teal-600 dark:bg-teal-700 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
            >
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                  {msg.timestamp && (
                    <div
                      className={`text-xs mt-1 ${msg.role === 'user' ? 'text-teal-200 dark:text-teal-300' : 'text-gray-500 dark:text-gray-400'
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
                    className={`flex-shrink-0 p-1.5 rounded-full transition-all ${speakingIndex === index
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
