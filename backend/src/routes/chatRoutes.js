import express from 'express';
import { ChatSession } from '../models/ChatSession.js';
import translationService from '../services/translationService.js';
import llmService from '../services/llmService.js';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import { optionalAuth, authenticate } from '../middleware/authMiddleware.js';
import proficiencyService from '../services/proficiencyService.js';
import User from '../models/User.js';

import rateLimit from 'express-rate-limit';

const router = express.Router();

// Strict rate limiter for AI Chat (save API costs)
const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per minute
  message: { error: 'Too many messages. Please wait a moment before sending more.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Helper function to check if MongoDB is connected
function isMongoConnected() {
  return mongoose.connection.readyState === 1;
}

/**
 * POST /api/chat/message
 * Send a message and get AI response
 */
router.post('/message', chatLimiter, optionalAuth, async (req, res) => {
  try {
    const { message, sessionId, language } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get or create session (only if user is authenticated and MongoDB is connected)
    let session = null;
    let messageHistory = [];

    if (req.user && isMongoConnected() && sessionId) {
      session = await ChatSession.findOne({ sessionId, userId: req.userId });
      if (session) {
        messageHistory = session.messages;
      }
    }

    if (!session && req.user && isMongoConnected()) {
      const newSessionId = sessionId || uuidv4();
      session = new ChatSession({
        sessionId: newSessionId,
        userId: req.userId,
        preferredLanguage: language || 'en',
        messages: []
      });
    }

    const currentSessionId = sessionId || uuidv4();

    // Log chat mode
    if (req.user) {
      console.log(`💬 Authenticated chat - User: ${req.userId}, Session will be saved`);
    } else {
      console.log(`💬 Guest chat - Session will NOT be saved`);
    }

    // Step 1: Get user proficiency level (if authenticated)
    let userProficiencyLevel = null;
    if (req.user && isMongoConnected()) {
      try {
        const user = await User.findById(req.userId);
        if (user && user.proficiencyLevel !== 'unknown') {
          userProficiencyLevel = user.proficiencyLevel;
          console.log(`👤 User proficiency: ${userProficiencyLevel}`);
        }
      } catch (error) {
        console.warn('⚠️ Could not fetch user proficiency:', error.message);
      }
    }

    // Step 2: Detect language and translate to English if needed
    const { text: translatedMessage, detectedLanguage } =
      await translationService.translateToEnglish(message, language);

    // Update preferred language
    const preferredLanguage = detectedLanguage !== 'en' ? detectedLanguage : (language || 'en');
    if (session) {
      session.preferredLanguage = preferredLanguage;
    }

    // Step 3: Get response from LLM with proficiency level
    // Pass the target language to Python RAG - it will handle translation
    const targetLang = language || preferredLanguage || 'en';
    const response = await llmService.getResponse(
      translatedMessage,
      messageHistory,
      targetLang,  // Python RAG will translate to this language
      userProficiencyLevel  // Pass user's proficiency level
    );

    // Step 4: Check if we need additional translation
    // Python RAG returns translated response based on the 'language' parameter
    // So we use the response directly
    const translatedResponse = response;

    // Step 5: Save messages to database (only if user is authenticated and MongoDB is connected)
    if (req.user && session && isMongoConnected()) {
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
      console.log(`💾 Chat saved to database - Session: ${session.sessionId}`);
    } else if (!req.user) {
      console.log(`⚠️ Guest user - Chat NOT saved to database`);
    }

    // Step 6: Track user progress and assess proficiency (if authenticated)
    if (req.user && isMongoConnected()) {
      try {
        const user = await User.findById(req.userId);
        if (user) {
          // Track this question
          await user.trackQuestion('general'); // You can extract topic from message later

          // Check if we should assess proficiency
          if (proficiencyService.shouldReassess(user)) {
            console.log('🔍 Assessing user proficiency...');

            // Get recent questions from session
            const recentQuestions = session ?
              session.messages
                .filter(msg => msg.role === 'user')
                .slice(-10)
                .map(msg => msg.content)
              : [message];

            // Detect proficiency
            const analysis = await proficiencyService.detectProficiency(recentQuestions);

            // Update user profile
            await user.updateProficiency(analysis.level, analysis.score);

            console.log(`✅ Proficiency updated: ${analysis.level} (score: ${analysis.score})`);
          }
        }
      } catch (error) {
        console.error('⚠️ Proficiency tracking error:', error.message);
        // Don't fail the chat request if proficiency tracking fails
      }
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
 * Get chat history for a session (requires authentication)
 */
router.get('/history/:sessionId', authenticate, async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!isMongoConnected()) {
      return res.status(503).json({
        error: 'Database not available',
        message: 'Chat history is not available without MongoDB connection'
      });
    }

    // IMPORTANT: Verify session belongs to authenticated user
    const session = await ChatSession.findOne({ sessionId, userId: req.userId });

    if (!session) {
      console.log(`❌ Unauthorized access attempt - User: ${req.userId}, Session: ${sessionId}`);
      return res.status(404).json({ error: 'Session not found' });
    }

    console.log(`📜 Chat history retrieved - User: ${req.userId}, Session: ${sessionId}`);

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
 * Create a new chat session (requires authentication to save to database)
 */
router.post('/session', optionalAuth, async (req, res) => {
  try {
    const { language } = req.body;
    const sessionId = uuidv4();

    // For guest users or when database is not available
    if (!req.user || !isMongoConnected()) {
      return res.json({
        sessionId,
        preferredLanguage: language || 'en',
        saved: false,
        note: req.user ? 'Database not available' : 'Guest session - not saved to database'
      });
    }

    // For authenticated users - save to database
    const session = new ChatSession({
      sessionId,
      userId: req.userId,
      preferredLanguage: language || 'en',
      messages: []
    });

    await session.save();

    console.log(`📝 New session created - User: ${req.userId}, Session: ${sessionId}`);

    res.json({
      sessionId: session.sessionId,
      preferredLanguage: session.preferredLanguage,
      saved: true
    });

  } catch (error) {
    console.error('Session creation error:', error);
    res.status(500).json({ error: 'Failed to create session' });
  }
});

/**
 * DELETE /api/chat/session/:sessionId
 * Delete a chat session (requires authentication)
 */
router.delete('/session/:sessionId', authenticate, async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!isMongoConnected()) {
      return res.status(503).json({
        error: 'Database not available',
        message: 'Cannot delete session without MongoDB connection'
      });
    }

    // IMPORTANT: Only delete if session belongs to authenticated user
    const result = await ChatSession.deleteOne({ sessionId, userId: req.userId });

    if (result.deletedCount === 0) {
      console.log(`❌ Unauthorized delete attempt - User: ${req.userId}, Session: ${sessionId}`);
      return res.status(404).json({ error: 'Session not found' });
    }

    console.log(`🗑️ Session deleted - User: ${req.userId}, Session: ${sessionId}`);

    res.json({ message: 'Session deleted successfully' });

  } catch (error) {
    console.error('Delete session error:', error);
    res.status(500).json({ error: 'Failed to delete session' });
  }
});

/**
 * GET /api/chat/sessions
 * Get all sessions for authenticated user
 */
router.get('/sessions', authenticate, async (req, res) => {
  try {
    if (!isMongoConnected()) {
      return res.status(503).json({
        error: 'Database not available',
        message: 'Session list not available without MongoDB connection'
      });
    }

    // Get all sessions for this user
    const sessions = await ChatSession.find({ userId: req.userId })
      .select('sessionId preferredLanguage createdAt updatedAt')
      .sort({ updatedAt: -1 })
      .limit(50);

    console.log(`📋 Sessions list retrieved - User: ${req.userId}, Count: ${sessions.length}`);

    res.json({
      sessions: sessions.map(s => ({
        sessionId: s.sessionId,
        preferredLanguage: s.preferredLanguage,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt
      }))
    });

  } catch (error) {
    console.error('Sessions list error:', error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
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
