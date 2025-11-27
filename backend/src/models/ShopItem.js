import mongoose from 'mongoose';

const shopItemSchema = new mongoose.Schema({
    itemId: {
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
    category: {
        type: String,
        enum: ['frame', 'accessory', 'theme', 'effect', 'mystery_box'],
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    rarity: {
        type: String,
        enum: ['common', 'rare', 'epic', 'legendary'],
        default: 'common'
    },
    previewImage: {
        type: String, // URL or asset path
        required: true
    },
    // Conditions to be able to purchase this item
    unlockCondition: {
        rankTier: { type: Number, default: 0 }, // Minimum rank tier required
        achievementIds: [{ type: String }] // Specific achievements required
    },
    // For mystery boxes: potential drops and their probabilities
    dropRates: [{
        rarity: { type: String, enum: ['common', 'rare', 'epic', 'legendary'] },
        probability: { type: Number, min: 0, max: 100 } // Percentage
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const ShopItem = mongoose.model('ShopItem', shopItemSchema);

export default ShopItem;
