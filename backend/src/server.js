import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables FIRST before importing services
dotenv.config();

import chatRoutes from './routes/chatRoutes.js';
import ttsRoutes from './routes/ttsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import moduleRoutes from './routes/moduleRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import challengeRoutes from './routes/challengeRoutes.js';
import marketRoutes from './routes/marketRoutes.js';
import shopRoutes from './routes/shopRoutes.js';
import badgeRoutes from './routes/badgeRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import forumRoutes from './routes/forumRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import llmService from './services/llmService.js';
import pythonRagService from './services/pythonRagService.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Optional security headers and rate limiting
(async () => {
  try {
    const helmetModule = await import('helmet');
    const helmet = helmetModule.default || helmetModule;
    app.use(helmet());
  } catch (err) {
    console.warn('helmet not installed; skipping security headers');
  }

  try {
    const rlModule = await import('express-rate-limit');
    const rateLimit = rlModule.default || rlModule;
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 300,
      standardHeaders: true,
      legacyHeaders: false
    });
    app.use(limiter);
  } catch (err) {
    console.warn('express-rate-limit not installed; skipping rate limiter');
  }
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/tts', ttsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/badges', badgeRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/quiz', quizRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'financeYatra backend is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'financeYatra API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      chat: '/api/chat/message',
      history: '/api/chat/history/:sessionId',
      createSession: '/api/chat/session'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Database connection
async function connectDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/financeyatra';

    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');
    console.log(`📊 Database: ${mongoUri}`);
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.warn('⚠️  Continuing without database. User authentication disabled.');
    return false;
  }
}

// Start server
async function startServer() {
  // Connect to database (optional)
  await connectDatabase();

  // Initialize Python RAG service
  await pythonRagService.initialize();

  // Initialize LLM service
  llmService.initialize();

  // Start listening
  app.listen(PORT, () => {
    console.log('\n🚀 financeYatra Backend Server');
    console.log(`📡 Server running on: http://localhost:${PORT}`);
    console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🦙 AI Model: Ollama (llama3.2:1b)`);
    console.log(`🐍 RAG System: Python FastAPI on http://localhost:8000\n`);
  });
}

startServer();

// Export app & startServer for testing
export default app;
export { startServer };

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});
