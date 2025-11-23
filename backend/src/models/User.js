/**
 * User Model
 * Stores user authentication and profile information
 */

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // Authentication
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  
  // Profile
  language: {
    type: String,
    default: 'en',
    enum: ['en', 'hi', 'te', 'ta', 'bn', 'kn', 'ml', 'mr', 'gu', 'pa', 'or']
  },
  
  // Proficiency (AI-detected)
  proficiencyLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'expert', 'unknown'],
    default: 'unknown'
  },
  proficiencyScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  proficiencyAssessedAt: {
    type: Date
  },
  questionsAnalyzed: {
    type: Number,
    default: 0
  },
  
  // Learning preferences
  learningGoals: [{
    type: String
  }],
  preferredTopics: [{
    type: String
  }],
  
  // Progress tracking
  totalQuestionsAsked: {
    type: Number,
    default: 0
  },
  totalTimeSpent: {
    type: Number,
    default: 0 // in seconds
  },
  topicsExplored: [{
    topic: String,
    count: Number,
    lastAsked: Date
  }],
  currentStreak: {
    type: Number,
    default: 0
  },
  longestStreak: {
    type: Number,
    default: 0
  },
  lastActiveDate: {
    type: Date
  },
  // Daily challenge tracking
  dailyChallenge: {
    lastAnsweredAt: { type: Date },
    currentStreak: { type: Number, default: 0 },
    lastQuestionId: { type: String }
  },
  
  // Learning Modules Progress
  moduleProgress: [{
    moduleId: {
      type: String,
      required: true
    },
    completedLessons: [{
      type: Number
    }],
    startedAt: {
      type: Date,
      default: Date.now
    },
    completedAt: {
      type: Date
    },
    quizScore: {
      type: Number,
      min: 0,
      max: 100
    }
  }],
  
  // Gamification
  achievements: [{
    id: String,
    name: String,
    unlockedAt: Date
  }],
  totalPoints: {
    type: Number,
    default: 0
  },
  // Weekly challenges progress
  weeklyProgress: [
    {
      weekId: String,
      claimedTasks: [String],
      pointsEarned: { type: Number, default: 0 }
    }
  ],
  
  // Analytics & Activity Tracking
  activityLog: [{
    type: Date
  }],
  proficiencyHistory: [{
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'expert']
    },
    score: Number,
    assessedAt: {
      type: Date,
      default: Date.now
    }
  }],
  chatCount: {
    type: Number,
    default: 0
  },
  
  // Account status
  isActive: {
    type: Boolean,
    default: true
  },
  // Admin flag - controls access to management routes
  isAdmin: {
    type: Boolean,
    default: false
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ proficiencyLevel: 1 });

// Method to update proficiency level
userSchema.methods.updateProficiency = function(level, score) {
  this.proficiencyLevel = level;
  this.proficiencyScore = score;
  this.proficiencyAssessedAt = new Date();
  return this.save();
};

// Method to track question
userSchema.methods.trackQuestion = function(topic) {
  this.totalQuestionsAsked += 1;
  this.questionsAnalyzed += 1;
  
  // Update topic tracking
  const topicIndex = this.topicsExplored.findIndex(t => t.topic === topic);
  if (topicIndex >= 0) {
    this.topicsExplored[topicIndex].count += 1;
    this.topicsExplored[topicIndex].lastAsked = new Date();
  } else {
    this.topicsExplored.push({
      topic,
      count: 1,
      lastAsked: new Date()
    });
  }
  
  // Update streak
  const today = new Date().toDateString();
  const lastActive = this.lastActiveDate ? this.lastActiveDate.toDateString() : null;
  
  if (lastActive === today) {
    // Same day, no change
  } else if (lastActive === new Date(Date.now() - 86400000).toDateString()) {
    // Yesterday, increment streak
    this.currentStreak += 1;
    if (this.currentStreak > this.longestStreak) {
      this.longestStreak = this.currentStreak;
    }
  } else {
    // Streak broken
    this.currentStreak = 1;
  }
  
  this.lastActiveDate = new Date();
  return this.save();
};

// Method to start a module
userSchema.methods.startModule = function(moduleId) {
  const existing = this.moduleProgress.find(m => m.moduleId === moduleId);
  if (!existing) {
    this.moduleProgress.push({
      moduleId,
      completedLessons: [],
      startedAt: new Date()
    });
  }
  return this.save();
};

// Method to complete a lesson
userSchema.methods.completeLesson = function(moduleId, lessonIndex) {
  let moduleProgress = this.moduleProgress.find(m => m.moduleId === moduleId);
  
  if (!moduleProgress) {
    // Start module if not started
    this.moduleProgress.push({
      moduleId,
      completedLessons: [lessonIndex],
      startedAt: new Date()
    });
  } else {
    // Add lesson if not already completed
    if (!moduleProgress.completedLessons.includes(lessonIndex)) {
      moduleProgress.completedLessons.push(lessonIndex);
    }
  }
  
  return this.save();
};

// Method to uncomplete a lesson
userSchema.methods.uncompleteLesson = function(moduleId, lessonIndex) {
  const moduleProgress = this.moduleProgress.find(m => m.moduleId === moduleId);
  
  if (moduleProgress) {
    moduleProgress.completedLessons = moduleProgress.completedLessons.filter(
      l => l !== lessonIndex
    );
  }
  
  return this.save();
};

// Method to complete a module
userSchema.methods.completeModule = function(moduleId, quizScore = null) {
  const moduleProgress = this.moduleProgress.find(m => m.moduleId === moduleId);
  
  if (moduleProgress) {
    moduleProgress.completedAt = new Date();
    if (quizScore !== null) {
      moduleProgress.quizScore = quizScore;
    }
    
    // Award points
    this.totalPoints += 100; // Base points for completing a module
  }
  
  return this.save();
};

// Method to get module progress
userSchema.methods.getModuleProgress = function(moduleId) {
  return this.moduleProgress.find(m => m.moduleId === moduleId);
};

const User = mongoose.model('User', userSchema);

export default User;
