import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  points: { type: Number, default: 10 }
}, { _id: false });

const WeeklySchema = new mongoose.Schema({
  weekId: { type: String, required: true, unique: true, index: true },
  theme: { type: String, default: 'Weekly' },
  description: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  tasks: { type: [TaskSchema], default: [] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const WeeklyChallenge = mongoose.models.WeeklyChallenge || mongoose.model('WeeklyChallenge', WeeklySchema);
export default WeeklyChallenge;
