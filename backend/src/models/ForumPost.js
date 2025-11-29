import mongoose from 'mongoose';

const forumPostSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 200
    },
    content: {
        type: String,
        required: true,
        minlength: 10
    },
    category: {
        type: String,
        enum: ['General', 'Module Help', 'Ask an Expert', 'Challenge'],
        default: 'General'
    },
    tags: [{
        type: String,
        trim: true
    }],
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    views: {
        type: Number,
        default: 0
    },
    isSolved: {
        type: Boolean,
        default: false
    },
    commentCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Index for search
forumPostSchema.index({ title: 'text', content: 'text', tags: 'text' });

const ForumPost = mongoose.model('ForumPost', forumPostSchema);

export default ForumPost;
