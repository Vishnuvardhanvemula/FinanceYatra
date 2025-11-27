import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ShopItem from '../src/models/ShopItem.js';

dotenv.config();

const shopItems = [
    // Frames
    {
        itemId: 'frame_gold',
        name: 'Golden Frame',
        description: 'A shiny golden frame for your profile.',
        category: 'frame',
        price: 1000,
        rarity: 'rare',
        previewImage: 'https://cdn-icons-png.flaticon.com/512/2550/2550223.png',
        isActive: true
    },
    {
        itemId: 'frame_neon',
        name: 'Neon Cyber Frame',
        description: 'A futuristic neon frame that glows.',
        category: 'frame',
        price: 2500,
        rarity: 'epic',
        previewImage: 'https://cdn-icons-png.flaticon.com/512/3159/3159310.png',
        isActive: true
    },
    {
        itemId: 'frame_bull',
        name: 'Bull Run Horns',
        description: 'Show you are bullish on your future.',
        category: 'frame',
        price: 1500,
        rarity: 'rare',
        previewImage: 'https://cdn-icons-png.flaticon.com/512/2316/2316680.png',
        isActive: true
    },
    {
        itemId: 'frame_diamond',
        name: 'Diamond Hands',
        description: 'For those who hold through the volatility.',
        category: 'frame',
        price: 4000,
        rarity: 'legendary',
        previewImage: 'https://cdn-icons-png.flaticon.com/512/616/616556.png',
        isActive: true
    },
    {
        itemId: 'frame_rocket',
        name: 'To The Moon',
        description: 'Blast off with this rocket frame.',
        category: 'frame',
        price: 3000,
        rarity: 'epic',
        previewImage: 'https://cdn-icons-png.flaticon.com/512/1356/1356479.png',
        isActive: true
    },

    // Accessories
    {
        itemId: 'acc_sunglasses',
        name: 'Cool Sunglasses',
        description: 'Look cool while learning finance.',
        category: 'accessory',
        price: 500,
        rarity: 'common',
        previewImage: 'https://cdn-icons-png.flaticon.com/512/664/664468.png',
        isActive: true
    },
    {
        itemId: 'acc_tophat',
        name: 'Monopoly Hat',
        description: 'Feel like a tycoon.',
        category: 'accessory',
        price: 1500,
        rarity: 'rare',
        previewImage: 'https://cdn-icons-png.flaticon.com/512/1063/1063376.png',
        isActive: true
    },
    {
        itemId: 'acc_monocle',
        name: 'The Monocle',
        description: 'Classy and sophisticated.',
        category: 'accessory',
        price: 1200,
        rarity: 'rare',
        previewImage: 'https://cdn-icons-png.flaticon.com/512/2292/2292398.png',
        isActive: true
    },
    {
        itemId: 'acc_vr',
        name: 'VR Headset',
        description: 'Ready for the metaverse.',
        category: 'accessory',
        price: 2000,
        rarity: 'epic',
        previewImage: 'https://cdn-icons-png.flaticon.com/512/2983/2983720.png',
        isActive: true
    },
    {
        itemId: 'acc_chain',
        name: 'Golden Chain',
        description: 'Drip too hard.',
        category: 'accessory',
        price: 3500,
        rarity: 'legendary',
        previewImage: 'https://cdn-icons-png.flaticon.com/512/2761/2761118.png',
        isActive: true
    },

    // Themes
    {
        itemId: 'theme_dark_gold',
        name: 'Luxury Dark Theme',
        description: 'A premium dark theme with gold accents.',
        category: 'theme',
        price: 5000,
        rarity: 'legendary',
        previewImage: 'https://cdn-icons-png.flaticon.com/512/566/566312.png',
        isActive: true
    },
    {
        itemId: 'theme_cyberpunk',
        name: 'Cyberpunk Finance',
        description: 'Neon lights and high tech vibes.',
        category: 'theme',
        price: 3000,
        rarity: 'epic',
        previewImage: 'https://cdn-icons-png.flaticon.com/512/3662/3662588.png',
        isActive: true
    },
    {
        itemId: 'theme_matrix',
        name: 'Matrix Code',
        description: 'Enter the financial matrix.',
        category: 'theme',
        price: 2500,
        rarity: 'rare',
        previewImage: 'https://cdn-icons-png.flaticon.com/512/2083/2083213.png',
        isActive: true
    },
    {
        itemId: 'theme_old_money',
        name: 'Old Money Aesthetic',
        description: 'Timeless elegance and wealth.',
        category: 'theme',
        price: 2000,
        rarity: 'rare',
        previewImage: 'https://cdn-icons-png.flaticon.com/512/2482/2482528.png',
        isActive: true
    },

    // Mystery Boxes
    {
        itemId: 'box_common',
        name: 'Standard Supply Drop',
        description: 'Contains random common or rare items.',
        category: 'mystery_box',
        price: 800,
        rarity: 'common',
        dropRates: { common: 0.7, rare: 0.25, epic: 0.05 },
        previewImage: 'https://cdn-icons-png.flaticon.com/512/4577/4577660.png',
        isActive: true
    },
    {
        itemId: 'box_epic',
        name: 'Elite Cache',
        description: 'High chance for epic and legendary loot.',
        category: 'mystery_box',
        price: 3000,
        rarity: 'epic',
        dropRates: { rare: 0.5, epic: 0.4, legendary: 0.1 },
        previewImage: 'https://cdn-icons-png.flaticon.com/512/4577/4577660.png',
        isActive: true
    }
];

const seedShop = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/financeyatra');
        console.log('Connected to MongoDB');

        await ShopItem.deleteMany({}); // Clear existing items
        console.log('Cleared existing shop items');

        await ShopItem.insertMany(shopItems);
        console.log(`Seeded ${shopItems.length} shop items`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding shop items:', error);
        process.exit(1);
    }
};

seedShop();
