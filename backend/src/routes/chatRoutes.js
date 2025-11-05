import express from 'express';
import { ChatSession } from '../models/ChatSession.js';
import translationService from '../services/translationService.js';
import llmService from '../services/llmService.js';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

const router = express.Router();

// Helper function to check if MongoDB is connected
function isMongoConnected() {
  return mongoose.connection.readyState === 1;
}

/**
 * POST /api/chat/message
 * Send a message and get AI response
 */
router.post('/message', async (req, res) => {
  try {
    const { message, sessionId, language } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get or create session (only if MongoDB is connected)
    let session = null;
    let messageHistory = [];
    
    if (isMongoConnected() && sessionId) {
      session = await ChatSession.findOne({ sessionId });
      if (session) {
        messageHistory = session.messages;
      }
    }
    
    if (!session && isMongoConnected()) {
      const newSessionId = sessionId || uuidv4();
      session = new ChatSession({
        sessionId: newSessionId,
        preferredLanguage: language || 'en',
        messages: []
      });
    }

    const currentSessionId = sessionId || uuidv4();

    // Step 1: Detect language and translate to English if needed
    const { text: translatedMessage, detectedLanguage } = 
      await translationService.translateToEnglish(message, language);

    // Update preferred language
    const preferredLanguage = detectedLanguage !== 'en' ? detectedLanguage : (language || 'en');
    if (session) {
      session.preferredLanguage = preferredLanguage;
    }

    // Step 2: Get response from LLM
    // Pass the target language to Python RAG - it will handle translation
    const targetLang = language || preferredLanguage || 'en';
    const response = await llmService.getResponse(
      translatedMessage,
      messageHistory,
      targetLang  // Python RAG will translate to this language
    );

    // Step 3: Check if we need additional translation
    // Python RAG returns translated response based on the 'language' parameter
    // So we use the response directly
    const translatedResponse = response;

    // Step 4: Save messages to database (only if MongoDB is connected)
    if (session && isMongoConnected()) {
      session.messages.push({
        role: 'user',
        content: message,
        originalLanguage: detectedLanguage,
        translatedContent: translatedMessage
      });

      session.messages.push({
        role: 'assistant',
        content: translatedResponse,
        originalLanguage: targetLang,
        translatedContent: translatedResponse  // Same as content since Python RAG handles translation
      });

      await session.save();
    }

    // Return response
    res.json({
      message: translatedResponse,
      sessionId: session ? session.sessionId : currentSessionId,
      detectedLanguage,
      messageId: session && session.messages.length > 0 
        ? session.messages[session.messages.length - 1]._id 
        : uuidv4()
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to process message',
      details: error.message 
    });
  }
});

/**
 * GET /api/chat/history/:sessionId
 * Get chat history for a session
 */
router.get('/history/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    if (!isMongoConnected()) {
      return res.status(503).json({ 
        error: 'Database not available',
        message: 'Chat history is not available without MongoDB connection'
      });
    }
    
    const session = await ChatSession.findOne({ sessionId });
    
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json({
      sessionId: session.sessionId,
      messages: session.messages,
      preferredLanguage: session.preferredLanguage,
      createdAt: session.createdAt
    });

  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

/**
 * POST /api/chat/session
 * Create a new chat session
 */
router.post('/session', async (req, res) => {
  try {
    const { language } = req.body;
    const sessionId = uuidv4();

    if (!isMongoConnected()) {
      // Return session info without saving to database
      return res.json({
        sessionId,
        preferredLanguage: language || 'en',
        note: 'Session created in-memory (database not available)'
      });
    }

    const session = new ChatSession({
      sessionId,
      preferredLanguage: language || 'en',
      messages: []
    });

    await session.save();

    res.json({
      sessionId: session.sessionId,
      preferredLanguage: session.preferredLanguage
    });

  } catch (error) {
    console.error('Session creation error:', error);
    res.status(500).json({ error: 'Failed to create session' });
  }
});

/**
 * DELETE /api/chat/session/:sessionId
 * Delete a chat session
 */
router.delete('/session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    if (!isMongoConnected()) {
      return res.status(503).json({ 
        error: 'Database not available',
        message: 'Cannot delete session without MongoDB connection'
      });
    }
    
    const result = await ChatSession.deleteOne({ sessionId });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json({ message: 'Session deleted successfully' });

  } catch (error) {
    console.error('Delete session error:', error);
    res.status(500).json({ error: 'Failed to delete session' });
  }
});

/**
 * GET /api/chat/languages
 * Get list of supported languages
 */
router.get('/languages', async (req, res) => {
  try {
    const languages = translationService.getSupportedLanguages();
    res.json(languages);
  } catch (error) {
    console.error('Languages fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch languages' });
  }
});

export default router;
