import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: '📚'
    },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'expert'],
        required: true
    },
    duration: {
        type: String,
        default: '30 mins'
    },
    lessonsCount: {
        type: Number,
        required: true
    },
    topics: [{
        type: String
    }],
    prerequisites: [{
        type: String // Storing Module IDs
    }],
    learningOutcomes: [{
        type: String
    }],
    lessons: [{
        id: Number,
        title: String,
        subtitle: String,
        duration: String,
        content: String, // HTML content
        keyPoints: [String],
        quiz: [{
            type: { type: String, enum: ['mcq', 'scenario', 'truefalse', 'calculation'] },
            question: String,
            context: String,
            options: [String],
            correct: Number,
            explanation: String
        }]
    }],
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    // Vector embedding for RAG
    embedding: {
        type: [Number],
        select: false // Don't return by default to save bandwidth
    }
}, {
    timestamps: true
});

// Index for faster queries
moduleSchema.index({ id: 1 });
moduleSchema.index({ difficulty: 1 });

const Module = mongoose.model('Module', moduleSchema);

export default Module;
