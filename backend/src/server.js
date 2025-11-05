import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import chatRoutes from './routes/chatRoutes.js';
import ttsRoutes from './routes/ttsRoutes.js';
import llmService from './services/llmService.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
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
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri || mongoUri === 'mongodb://localhost:27017/financeyatra') {
      console.warn('⚠️  MongoDB URI not configured. Running without database.');
      console.warn('   Chat history will not be persisted.');
      return false;
    }

    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.warn('   Continuing without database. Chat history will not be persisted.');
    return false;
  }
}

// Start server
async function startServer() {
  // Connect to database (optional)
  await connectDatabase();

  // Initialize LLM service
  llmService.initialize();

  // Start listening
  app.listen(PORT, () => {
    console.log('\n🚀 financeYatra Backend Server');
    console.log(`📡 Server running on: http://localhost:${PORT}`);
    console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}\n`);
    
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      console.log('ℹ️  Note: Using mock AI responses. Set OPENAI_API_KEY for real GPT responses.\n');
    }
  });
}

startServer();

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});
