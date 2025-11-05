/**
 * Text-to-Speech Routes
 * Provides audio generation for multilingual text
 */

import express from 'express';
import ttsService from '../services/ttsService.js';

const router = express.Router();

/**
 * POST /api/tts/speak
 * Generate speech audio for given text
 */
router.post('/speak', async (req, res) => {
  try {
    const { text, language = 'en' } = req.body;

    // Validate input
    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Text is required'
      });
    }

    if (!ttsService.isLanguageSupported(language)) {
      return res.status(400).json({
        success: false,
        error: `Language '${language}' is not supported`
      });
    }

    console.log(`TTS request: ${text.substring(0, 50)}... (${language})`);

    // Get audio buffer
    const audioBuffer = await ttsService.getAudio(text, language);

    // Send audio as response
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': audioBuffer.length,
      'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
    });

    res.send(audioBuffer);

  } catch (error) {
    console.error('TTS endpoint error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate speech'
    });
  }
});

/**
 * GET /api/tts/languages
 * Get list of supported languages
 */
router.get('/languages', (req, res) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी (Hindi)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'bn', name: 'বাংলা (Bengali)' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'ml', name: 'മലയാളം (Malayalam)' },
    { code: 'mr', name: 'मराठी (Marathi)' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'or', name: 'ଓଡ଼ିଆ (Odia)' }
  ];

  res.json({
    success: true,
    languages
  });
});

export default router;
