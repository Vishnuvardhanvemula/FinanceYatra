import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['quiz', 'module', 'login', 'streak', 'other'],
    default: 'other'
  },
  target: {
    type: Number,
    default: 1
  },
  points: {
    type: Number,
    default: 50
  }
});

const weeklyChallengeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  weekId: {
    type: String, // e.g., "2023-W45"
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  tasks: [taskSchema],
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const WeeklyChallenge = mongoose.model('WeeklyChallenge', weeklyChallengeSchema);

export default WeeklyChallenge;
