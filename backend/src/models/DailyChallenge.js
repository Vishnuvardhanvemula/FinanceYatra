import mongoose from 'mongoose';

const dailyChallengeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    prompt: {
        type: String,
        required: true
    },
    choices: [{
        type: String,
        required: true
    }],
    correct: {
        type: String,
        required: true
    },
    explanation: {
        type: String
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
    },
    category: {
        type: String,
        default: 'General'
    },
    points: {
        type: Number,
        default: 10
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const DailyChallenge = mongoose.model('DailyChallenge', dailyChallengeSchema);

export default DailyChallenge;
