/**
 * Text-to-Speech Service
 * Provides high-quality TTS for Indian languages using Google Translate TTS
 */

import axios from 'axios';

class TTSService {
  constructor() {
    this.baseURL = 'https://translate.google.com/translate_tts';
  }

  /**
   * Get audio URL for text-to-speech
   * @param {string} text - Text to convert to speech
   * @param {string} language - Language code (en, hi, te, ta, etc.)
   * @returns {Promise<Buffer>} Audio buffer
   */
  async getAudio(text, language = 'en') {
    try {
      // Clean text
      let textToSpeak = text.trim();
      
      // Google TTS has a limit of ~200 characters per request
      // Split long text into chunks
      const maxLength = 200;
      const chunks = this.splitTextIntoChunks(textToSpeak, maxLength, language);
      
      console.log(`TTS: Processing ${chunks.length} chunk(s) for ${language}`);
      
      // If single chunk, process normally
      if (chunks.length === 1) {
        return await this.fetchAudioChunk(chunks[0], language);
      }
      
      // Multiple chunks - fetch all and concatenate (simplified approach)
      // For now, just return first chunk with note
      console.log(`⚠️ Long text detected (${textToSpeak.length} chars). Using first ${maxLength} chars.`);
      return await this.fetchAudioChunk(chunks[0], language);

    } catch (error) {
      console.error('TTS Error:', error.message);
      throw new Error(`Failed to generate speech: ${error.message}`);
    }
  }

  /**
   * Split text into chunks suitable for TTS
   * @param {string} text - Text to split
   * @param {number} maxLength - Maximum length per chunk
   * @param {string} language - Language code
   * @returns {Array<string>} Array of text chunks
   */
  splitTextIntoChunks(text, maxLength, language) {
    if (text.length <= maxLength) {
      return [text];
    }

    const chunks = [];
    
    // Split by sentences (handles both English and Indian language punctuation)
    const sentenceEnders = language === 'en' ? /[.!?]+\s*/g : /[।.!?]+\s*/g;
    const sentences = text.split(sentenceEnders).filter(s => s.trim());
    
    let currentChunk = '';
    
    for (const sentence of sentences) {
      // If adding this sentence would exceed limit, save current chunk
      if (currentChunk && (currentChunk.length + sentence.length + 2) > maxLength) {
        chunks.push(currentChunk.trim());
        currentChunk = sentence;
      } else {
        currentChunk += (currentChunk ? ' ' : '') + sentence;
      }
    }
    
    // Add remaining chunk
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }
    
    // If no sentences found (no punctuation), split by words
    if (chunks.length === 0) {
      const words = text.split(/\s+/);
      currentChunk = '';
      
      for (const word of words) {
        if (currentChunk && (currentChunk.length + word.length + 1) > maxLength) {
          chunks.push(currentChunk.trim());
          currentChunk = word;
        } else {
          currentChunk += (currentChunk ? ' ' : '') + word;
        }
      }
      
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
      }
    }
    
    return chunks.length > 0 ? chunks : [text.substring(0, maxLength)];
  }

  /**
   * Fetch audio for a single chunk
   * @param {string} text - Text chunk
   * @param {string} language - Language code
   * @returns {Promise<Buffer>} Audio buffer
   */
  async fetchAudioChunk(text, language) {
    // Build URL with proper parameters
    const params = new URLSearchParams({
      ie: 'UTF-8',
      tl: language,
      client: 'tw-ob',
      q: text
    });

    const url = `${this.baseURL}?${params.toString()}`;
    
    console.log(`TTS: Fetching audio chunk (${text.length} chars)...`);

    // Fetch audio from Google TTS
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://translate.google.com/'
      },
      timeout: 10000
    });

    if (response.status === 200) {
      console.log(`TTS: Successfully fetched audio (${response.data.length} bytes)`);
      return response.data;
    } else {
      throw new Error(`TTS request failed with status ${response.status}`);
    }
  }

  /**
   * Check if language is supported
   * @param {string} language - Language code
   * @returns {boolean}
   */
  isLanguageSupported(language) {
    const supportedLanguages = [
      'en', 'hi', 'te', 'ta', 'bn', 'kn', 'ml', 'mr', 'gu', 'pa', 'or'
    ];
    return supportedLanguages.includes(language);
  }
}

export default new TTSService();
