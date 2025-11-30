import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Module from '../models/Module.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/financeyatra';

const findBadContent = async () => {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected');

        const modules = await Module.find({});
        let badCount = 0;

        for (const m of modules) {
            for (const lesson of m.lessons) {
                if (lesson.content.includes('Content generation failed') || lesson.content.length < 100) {
                    console.log(`❌ Bad Content Found: Module "${m.title}" - Lesson ${lesson.id}`);
                    console.log(`   Content Preview: ${lesson.content.substring(0, 100)}...`);
                    badCount++;
                }
            }
        }

        if (badCount === 0) {
            console.log('✨ No bad content found! All lessons look good.');
        } else {
            console.log(`⚠️ Found ${badCount} lessons with bad content.`);
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

findBadContent();
