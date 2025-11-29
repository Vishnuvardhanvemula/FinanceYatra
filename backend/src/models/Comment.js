import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ForumPost',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    isAcceptedAnswer: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
