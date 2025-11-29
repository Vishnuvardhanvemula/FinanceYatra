import mongoose from 'mongoose';

const budgetGoalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    targetAmount: {
        type: Number,
        required: true
    },
    currentAmount: {
        type: Number,
        default: 0
    },
    deadline: {
        type: Date
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active'
    },
    xpAwarded: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const BudgetGoal = mongoose.model('BudgetGoal', budgetGoalSchema);

export default BudgetGoal;
