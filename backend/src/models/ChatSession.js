import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  originalLanguage: {
    type: String,
    default: 'en'
  },
  translatedContent: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const chatSessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  userId: {
    type: String,
    default: 'anonymous'
  },
  messages: [messageSchema],
  preferredLanguage: {
    type: String,
    default: 'en'
  },
  metadata: {
    userAgent: String,
    ipAddress: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp on save
chatSessionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export const ChatSession = mongoose.model('ChatSession', chatSessionSchema);
