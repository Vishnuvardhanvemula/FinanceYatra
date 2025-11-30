/**
 * Script to seed the database with initial learning modules
 * Usage: node src/scripts/seedModules.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Module from '../models/Module.js';
import { learningModules } from '../data/learningModules.js';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/financeyatra';

async function seedModules() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected');

        console.log('🧹 Clearing existing modules...');
        await Module.deleteMany({});

        console.log(`🌱 Seeding ${learningModules.length} modules...`);

        const modulesToInsert = learningModules.map(m => ({
            ...m,
            description: `Learn about ${m.title}. Comprehensive guide for ${m.difficulty} level.`,
            lessonsCount: m.lessons,
            lessons: Array.from({ length: m.lessons }, (_, i) => ({
                id: i + 1,
                title: `${m.title} - Lesson ${i + 1}`,
                subtitle: `Part ${i + 1} of the comprehensive guide`,
                duration: '10 mins',
                content: `<p>This is the content for lesson ${i + 1} of ${m.title}.</p>`,
                keyPoints: ['Key point 1', 'Key point 2', 'Key point 3']
            })),
            topics: [m.title, 'Finance', m.difficulty],
            learningOutcomes: [`Understand ${m.title}`, 'Apply concepts in real life']
        }));

        await Module.insertMany(modulesToInsert);

        console.log('🎉 Modules seeded successfully!');
        console.log('👉 You can now go to MongoDB Atlas and create the "vector_index" on the "modules" collection.');

    } catch (error) {
        console.error('Fatal error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('👋 Disconnected');
        process.exit(0);
    }
}

seedModules();
