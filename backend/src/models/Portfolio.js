import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        default: 10000 // $10,000 starting balance
    },
    holdings: [{
        symbol: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 0
        },
        averagePrice: {
            type: Number,
            required: true
        }
    }],
    totalValue: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Calculate total value before saving (approximate, real-time value requires live prices)
// This field might be better calculated on-the-fly in the controller
portfolioSchema.pre('save', function (next) {
    // We don't update totalValue here because we don't have live prices.
    // It serves as a cache or snapshot if needed.
    next();
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export default Portfolio;
