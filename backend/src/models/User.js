/**
 * User Model
 * Stores user authentication, profile, progress, and gamification data.
 */

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // 1. Core Identity & Authentication
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  isAdmin: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  emailVerified: { type: Boolean, default: false },

  // 2. Profile & Preferences
  language: {
    type: String,
    default: 'en',
    enum: ['en', 'hi', 'te', 'ta', 'bn', 'kn', 'ml', 'mr', 'gu', 'pa', 'or']
  },
  preferences: {
    theme: { type: String, default: 'default' },
    isDarkMode: { type: Boolean, default: false },
    notifications: { type: Boolean, default: true }
  },
  learningGoals: [{ type: String }],
  preferredTopics: [{ type: String }],

  // 3. Proficiency & Assessment
  proficiencyLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'expert', 'unknown'],
    default: 'unknown'
  },
  proficiencyScore: { type: Number, default: 0, min: 0, max: 100 },
  proficiencyAssessedAt: { type: Date },
  proficiencyHistory: [{
    level: { type: String, enum: ['beginner', 'intermediate', 'expert'] },
    score: Number,
    assessedAt: { type: Date, default: Date.now }
  }],

  // 4. Gamification & Rewards
  totalPoints: { type: Number, default: 0 },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  lastActiveDate: { type: Date },

  inventory: [{
    itemId: { type: String, required: true },
    purchasedAt: { type: Date, default: Date.now },
    isEquipped: { type: Boolean, default: false }
  }],
  equippedItems: {
    frame: { type: String, default: null },
    accessory: { type: String, default: null },
    theme: { type: String, default: null },
    effect: { type: String, default: null }
  },

  badges: [{
    badgeId: { type: String, required: true },
    earnedAt: { type: Date, default: Date.now },
    isDisplayed: { type: Boolean, default: false }
  }],
  achievements: [{
    id: String,
    name: String,
    unlockedAt: Date
  }],

  // 5. Learning Progress
  moduleProgress: [{
    moduleId: { type: String, required: true },
    completedLessons: [{ type: Number }],
    lastCompletedLesson: { type: Number, default: -1 },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
    quizScore: { type: Number, min: 0, max: 100 }
  }],

  weeklyProgress: [{
    weekId: String,
    claimedTasks: [String],
    pointsEarned: { type: Number, default: 0 }
  }],

  dailyChallenge: {
    lastAnsweredAt: { type: Date },
    currentStreak: { type: Number, default: 0 },
    lastQuestionId: { type: String }
  },

  // 
  // 6. Analytics & Activity Metrics
  // 
  totalQuestionsAsked: { type: Number, default: 0 },
  questionsAnalyzed: { type: Number, default: 0 },
  chatCount: { type: Number, default: 0 },
  totalTimeSpent: { type: Number, default: 0 },

  topicsExplored: [{
    topic: String,
    count: Number,
    lastAsked: Date
  }],

  activityLog: [{ type: Date }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtuals & Indexes

userSchema.virtual('xp').get(function () { return this.totalPoints || 0; });
userSchema.virtual('points').get(function () { return this.totalPoints || 0; });
userSchema.virtual('streak').get(function () { return this.currentStreak || 0; });

userSchema.index({ proficiencyLevel: 1 });
userSchema.index({ totalPoints: -1 });

// Methods


//Update user proficiency level and log histort
userSchema.methods.updateProficiency = function (level, score) {
  this.proficiencyLevel = level;
  this.proficiencyScore = score;
  this.proficiencyAssessedAt = new Date();
  
  this.proficiencyHistory.push({
    level,
    score,
    assessedAt: new Date()
  });
  
  return this.save();
};


//  Track a question asked by the user
userSchema.methods.trackQuestion = function (topic) {
  this.totalQuestionsAsked += 1;
  this.questionsAnalyzed += 1;

  const topicIndex = this.topicsExplored.findIndex(t => t.topic === topic);
  if (topicIndex >= 0) {
    this.topicsExplored[topicIndex].count += 1;
    this.topicsExplored[topicIndex].lastAsked = new Date();
  } else {
    this.topicsExplored.push({ topic, count: 1, lastAsked: new Date() });
  }

  const today = new Date().toDateString();
  const lastActive = this.lastActiveDate ? this.lastActiveDate.toDateString() : null;
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (lastActive !== today) {
    if (lastActive === yesterday) {
      this.currentStreak += 1;
      if (this.currentStreak > this.longestStreak) {
        this.longestStreak = this.currentStreak;
      }
    } else {
      this.currentStreak = 1;
    }
  }

  this.lastActiveDate = new Date();
  return this.save();
};

//  Update daily activity streak
userSchema.methods.updateDailyStreak = function () {
  const today = new Date().toDateString();
  const lastActive = this.lastActiveDate ? this.lastActiveDate.toDateString() : null;

  if (lastActive === today) return this.currentStreak;

  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (lastActive === yesterday) {
    this.currentStreak += 1;
    if (this.currentStreak > this.longestStreak) {
      this.longestStreak = this.currentStreak;
    }
  } else {
    this.currentStreak = 1;
  }

  this.lastActiveDate = new Date();

  const streakBonuses = { 7: 50, 30: 200, 100: 1000 };
  if (streakBonuses[this.currentStreak]) {
    this.totalPoints = (this.totalPoints || 0) + streakBonuses[this.currentStreak];
  }

  return this.currentStreak;
};

//  Award XP to user
userSchema.methods.awardXP = function (amount, source = 'general') {
  if (amount && amount > 0) {
    this.totalPoints = (this.totalPoints || 0) + amount;

    const today = new Date().toDateString();
    const lastActive = this.lastActiveDate ? this.lastActiveDate.toDateString() : null;

    if (lastActive !== today) {
      this.updateDailyStreak();
    }
  }
  return this.totalPoints;
};

//  Start a learning module
userSchema.methods.startModule = function (moduleId) {
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

//  Complete a lesson in a module
userSchema.methods.completeLesson = function (moduleId, lessonIndex) {
  let moduleProgress = this.moduleProgress.find(m => m.moduleId === moduleId);

  if (!moduleProgress) {
    this.moduleProgress.push({
      moduleId,
      completedLessons: [lessonIndex],
      startedAt: new Date()
    });
  } else {
    if (!moduleProgress.completedLessons.includes(lessonIndex)) {
      moduleProgress.completedLessons.push(lessonIndex);
    }
  }

  return this.save();
};

//  Uncomplete a lesson (for testing/undo)
userSchema.methods.uncompleteLesson = function (moduleId, lessonIndex) {
  const moduleProgress = this.moduleProgress.find(m => m.moduleId === moduleId);
  if (moduleProgress) {
    moduleProgress.completedLessons = moduleProgress.completedLessons.filter(l => l !== lessonIndex);
  }
  return this.save();
};

//  Complete a module and award XP
userSchema.methods.completeModule = function (moduleId, difficulty = 'beginner', quizScore = null, correctAnswers = 0, totalQuestions = 0) {
  const moduleProgress = this.moduleProgress.find(m => m.moduleId === moduleId);

  if (moduleProgress && !moduleProgress.completedAt) {
    moduleProgress.completedAt = new Date();
    if (quizScore !== null) {
      moduleProgress.quizScore = quizScore;
    }

    const moduleXP = { beginner: 100, intermediate: 250, expert: 500 };
    const baseModuleXP = moduleXP[difficulty] || 100;

    let quizXP = 0;
    if (correctAnswers > 0) {
      quizXP = correctAnswers * 10;
      if (quizScore === 100 || (totalQuestions > 0 && correctAnswers === totalQuestions)) {
        quizXP += 50;
      }
    }

    this.awardXP(baseModuleXP + quizXP, 'module_completion');
  }

  return this.save();
};

//  Get progress for a specific module
userSchema.methods.getModuleProgress = function (moduleId) {
  return this.moduleProgress.find(m => m.moduleId === moduleId);
};

const User = mongoose.model('User', userSchema);

export default User;
