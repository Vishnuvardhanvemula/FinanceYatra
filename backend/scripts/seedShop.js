
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ShopItem from '../src/models/ShopItem.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const sampleItems = [
    // Themes
    {
        itemId: 'theme_dark_gold',
        name: 'Grand Luxury (Dark)',
        description: 'A premium dark theme with gold accents and regal vibes. Perfect for the high roller.',
        category: 'theme',
        price: 5000,
        rarity: 'legendary',
        previewImage: 'https://cdn-icons-png.flaticon.com/512/566/566312.png',
        unlockCondition: { rankTier: 2 },
        isActive: true
    },
    {
        itemId: 'theme_cyberpunk',
        name: 'Neon City',
        description: 'A vibrant cyberpunk theme with neon pinks and cyans. Future is now.',
        category: 'theme',
        price: 2500,
        rarity: 'epic',
        previewImage: 'https://cdn-icons-png.flaticon.com/512/3665/3665922.png',
        unlockCondition: { rankTier: 1 },
        isActive: true
    },
    {
        itemId: 'theme_minimal',
        name: 'Zen Minimalist',
        description: 'Clean, white, and distraction-free. For the focused investor.',
        category: 'theme',
        price: 1000,
        rarity: 'rare',
        previewImage: 'https://cdn-icons-png.flaticon.com/512/4333/4333609.png',
        isActive: true
    },

    // Frames
    {
        itemId: 'frame_gold_wreath',
        name: 'Golden Laurel',
        description: 'A wreath of pure gold to adorn your avatar.',
        category: 'frame',
        price: 3000,
        rarity: 'legendary',
        previewImage: 'https://cdn-icons-png.flaticon.com/512/1152/1152912.png',
        unlockCondition: { rankTier: 3 },
        isActive: true
    },
    {
        itemId: 'frame_cyber_border',
        name: 'Holographic Rim',
        description: 'A glitching, animated holographic border.',
        category: 'frame',
        price: 1500,
        rarity: 'epic',
        previewImage: 'https://cdn-icons-png.flaticon.com/512/4456/4456985.png',
        isActive: true
    },
    {
        itemId: 'frame_wood',
        name: 'Oak Frame',
        description: 'Sturdy and reliable. A classic choice.',
        category: 'frame',
        price: 500,
        rarity: 'common',
        previewImage: 'https://cdn-icons-png.flaticon.com/512/10692/10692985.png',
        isActive: true
    },

    // Accessories
    {
        itemId: 'acc_tophat',
        name: 'Monopoly Hat',
        description: 'You mean business.',
        category: 'accessory',
        price: 2000,
        rarity: 'rare',
        previewImage: 'https://cdn-icons-png.flaticon.com/512/138/138308.png',
        isActive: true
    },
    {
        itemId: 'acc_glasses',
        name: 'Deal With It',
        description: 'Pixelated sunglasses. Very cool.',
        category: 'accessory',
        price: 1200,
        rarity: 'rare',
        previewImage: 'https://cdn-icons-png.flaticon.com/512/265/265691.png',
        isActive: true
    },

    // Mystery Boxes
    {
        itemId: 'box_starter',
        name: 'Starter Box',
        description: 'Contains common and rare items. Good for beginners.',
        category: 'mystery_box',
        price: 800,
        rarity: 'common',
        previewImage: 'https://cdn-icons-png.flaticon.com/512/679/679821.png',
        dropRates: { common: 0.8, rare: 0.19, epic: 0.01 },
        isActive: true
    },
    {
        itemId: 'box_premium',
        name: 'Premium Crate',
        description: 'High chance of Epic items. Small chance of Legendary.',
        category: 'mystery_box',
        price: 3500,
        rarity: 'epic',
        previewImage: 'https://cdn-icons-png.flaticon.com/512/2850/2850236.png',
        dropRates: { common: 0.1, rare: 0.5, epic: 0.35, legendary: 0.05 },
        isActive: true
    }
];

const seedShop = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/financeyatra';
        await mongoose.connect(mongoUri);
        console.log('✅ Connected to MongoDB');

        // Clear existing items? Maybe optional. Let's strict updating to avoid duplicates.
        // Or just upsert.

        let count = 0;
        for (const item of sampleItems) {
            await ShopItem.findOneAndUpdate(
                { itemId: item.itemId },
                item,
                { upsert: true, new: true }
            );
            count++;
        }

        console.log(`✅ Seeded ${count} shop items successfully`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
};

seedShop();
