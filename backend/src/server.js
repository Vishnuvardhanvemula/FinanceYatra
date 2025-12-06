import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit'; // Security: Rate limiting


// Load environment variables
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


const app = express();
const PORT = process.env.PORT || 5000;

// Security: Release the helmet! (Sets various HTTP headers for security)
app.use(helmet());

// Security: Rate Limiter (Prevent brute-force and DoS)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);

app.use(cors({
  origin: (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, ''),
  credentials: true
}));

app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

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

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'financeYatra backend is running',
    timestamp: new Date().toISOString()
  });
});

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

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

async function connectDatabase() {
  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/financeyatra';

      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000, // Fail fast if no network access
      });

      console.log('✅ Connected to MongoDB');
      return true;
    } catch (error) {
      retries++;
      console.error(`❌ MongoDB connection attempt ${retries} failed:`, error.message);

      if (retries < MAX_RETRIES) {
        console.log(`⏳ Retrying in ${RETRY_DELAY / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      } else {
        console.error('🔥 Max retries reached. Database unavailable.');
        return false;
      }
    }
  }
}

async function startServer() {
  const isConnected = await connectDatabase();

  if (!isConnected) {
    console.error('🚫 Server fail to start due to database connection error.');
    process.exit(1); // Hard exit to prevent buffering timeouts
  }

  llmService.initialize();

  app.listen(PORT, () => {
    console.log('\n🚀 financeYatra Backend Server');
    console.log(`📡 Server running on: http://localhost:${PORT}`);
    console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
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
