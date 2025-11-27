import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
    badgeId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String, // Emoji or URL
        required: true
    },
    category: {
        type: String,
        enum: ['activity', 'streak', 'milestone', 'special'],
        required: true
    },
    criteria: {
        type: { type: String, required: true }, // e.g., 'streak_days', 'modules_completed', 'time_of_day'
        value: { type: mongoose.Schema.Types.Mixed, required: true } // e.g., 7, 5, '09:00'
    },
    rarity: {
        type: String,
        enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
        default: 'common'
    },
    xpReward: {
        type: Number,
        default: 0
    },
    isHidden: {
        type: Boolean,
        default: false // If true, details are hidden until unlocked
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Badge = mongoose.model('Badge', badgeSchema);

export default Badge;
