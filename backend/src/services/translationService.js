import axios from 'axios';
import https from 'https';

class TranslationService {
  constructor() {
    this.myMemoryBaseUrl = 'https://api.mymemory.translated.net/get';
    this.maxChunkLength = 400; // MyMemory limit is 500, use 400 for safety
    
    // Create axios instance with SSL verification disabled for MyMemory API
    // This is needed because MyMemory has certificate issues
    this.axiosInstance = axios.create({
      httpsAgent: new https.Agent({  
        rejectUnauthorized: false
      })
    });
    
    // Supported languages with their names
    this.supportedLanguages = {
      'en': { name: 'English', nativeName: 'English' },
      'hi': { name: 'Hindi', nativeName: 'हिंदी' },
      'te': { name: 'Telugu', nativeName: 'తెలుగు' },
      'ta': { name: 'Tamil', nativeName: 'தமிழ்' },
      'bn': { name: 'Bengali', nativeName: 'বাংলা' },
      'kn': { name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
      'ml': { name: 'Malayalam', nativeName: 'മലയാളം' },
      'mr': { name: 'Marathi', nativeName: 'मराठी' },
      'gu': { name: 'Gujarati', nativeName: 'ગુજરાતી' },
      'pa': { name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' }
    };
  }

  /**
   * Get list of supported languages
   */
  getSupportedLanguages() {
    return this.supportedLanguages;
  }

  /**
   * Split text into chunks at sentence boundaries
   * Respects sentence structure to maintain translation quality
   */
  splitIntoChunks(text) {
    // If text is short enough, return as is
    if (text.length <= this.maxChunkLength) {
      return [text];
    }

    const chunks = [];
    const sentences = text.split(/(?<=[.!?।])\s+/); // Split on sentence endings
    let currentChunk = '';

    for (const sentence of sentences) {
      // If single sentence is too long, split by words
      if (sentence.length > this.maxChunkLength) {
        if (currentChunk) {
          chunks.push(currentChunk.trim());
          currentChunk = '';
        }
        
        // Split long sentence by words
        const words = sentence.split(' ');
        let wordChunk = '';
        
        for (const word of words) {
          if ((wordChunk + ' ' + word).length > this.maxChunkLength) {
            if (wordChunk) chunks.push(wordChunk.trim());
            wordChunk = word;
          } else {
            wordChunk += (wordChunk ? ' ' : '') + word;
          }
        }
        
        if (wordChunk) chunks.push(wordChunk.trim());
        continue;
      }

      // Check if adding this sentence exceeds limit
      if ((currentChunk + ' ' + sentence).length > this.maxChunkLength) {
        if (currentChunk) {
          chunks.push(currentChunk.trim());
        }
        currentChunk = sentence;
      } else {
        currentChunk += (currentChunk ? ' ' : '') + sentence;
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk.trim());
    }

    return chunks;
  }

  /**
   * Detect language of the text (Unicode-based detection)
   * Supports all major Indian languages
   */
  async detectLanguage(text) {
    // Unicode ranges for Indian languages
    const languagePatterns = {
      'hi': /[\u0900-\u097F]/, // Devanagari (Hindi, Marathi)
      'bn': /[\u0980-\u09FF]/, // Bengali
      'ta': /[\u0B80-\u0BFF]/, // Tamil
      'te': /[\u0C00-\u0C7F]/, // Telugu
      'kn': /[\u0C80-\u0CFF]/, // Kannada
      'ml': /[\u0D00-\u0D7F]/, // Malayalam
      'gu': /[\u0A80-\u0AFF]/, // Gujarati
      'pa': /[\u0A00-\u0A7F]/  // Gurmukhi (Punjabi)
    };

    // Check each language pattern
    for (const [langCode, pattern] of Object.entries(languagePatterns)) {
      if (pattern.test(text)) {
        return langCode;
      }
    }

    // Default to English
    return 'en';
  }

  /**
   * Translate text using MyMemory API (free, no API key required)
   * Handles long text by splitting into chunks
   */
  async translate(text, sourceLang, targetLang) {
    // If source and target are the same, no translation needed
    if (sourceLang === targetLang) {
      return text;
    }

    try {
      // Split text into chunks if too long
      const chunks = this.splitIntoChunks(text);
      
      // If only one chunk, translate directly
      if (chunks.length === 1) {
        const response = await this.axiosInstance.get(this.myMemoryBaseUrl, {
          params: {
            q: chunks[0],
            langpair: `${sourceLang}|${targetLang}`
          }
        });

        if (response.data && response.data.responseData) {
          return response.data.responseData.translatedText;
        }
        return text;
      }

      // Translate each chunk and combine
      const translatedChunks = [];
      for (const chunk of chunks) {
        try {
          const response = await this.axiosInstance.get(this.myMemoryBaseUrl, {
            params: {
              q: chunk,
              langpair: `${sourceLang}|${targetLang}`
            }
          });

          if (response.data && response.data.responseData) {
            translatedChunks.push(response.data.responseData.translatedText);
          } else {
            translatedChunks.push(chunk); // Keep original if translation fails
          }

          // Small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch (error) {
          console.error('Chunk translation error:', error.message);
          translatedChunks.push(chunk); // Keep original on error
        }
      }

      return translatedChunks.join(' ');

    } catch (error) {
      console.error('Translation error:', error.message);
      return text; // Return original text on error
    }
  }

  /**
   * Translate user message to English for LLM processing
   */
  async translateToEnglish(text, sourceLang = null) {
    // Auto-detect language if not provided
    const detectedLang = sourceLang || await this.detectLanguage(text);
    
    console.log(`🔍 Detected language: ${detectedLang} (${this.supportedLanguages[detectedLang]?.nativeName || detectedLang})`);
    
    if (detectedLang === 'en') {
      return { text, detectedLanguage: 'en' };
    }

    console.log(`🔄 Translating to English: "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"`);
    const translatedText = await this.translate(text, detectedLang, 'en');
    console.log(`✅ Translated: "${translatedText.substring(0, 50)}${translatedText.length > 50 ? '...' : ''}"`);
    
    return {
      text: translatedText,
      detectedLanguage: detectedLang
    };
  }

  /**
   * Translate bot response back to user's language
   */
  async translateFromEnglish(text, targetLang) {
    if (targetLang === 'en') {
      return text;
    }

    console.log(`🔄 Translating response to ${targetLang} (${this.supportedLanguages[targetLang]?.nativeName || targetLang})`);
    console.log(`📝 Text length: ${text.length} characters`);
    
    if (text.length > this.maxChunkLength) {
      const chunks = this.splitIntoChunks(text);
      console.log(`✂️  Split into ${chunks.length} chunks for translation`);
    }

    const translated = await this.translate(text, 'en', targetLang);
    console.log(`✅ Translation complete`);
    
    return translated;
  }
}

export default new TranslationService();
