import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Module from '../models/Module.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/financeyatra';

const checkContent = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const modules = await Module.find({});
        console.log(`Found ${modules.length} modules.`);

        for (const m of modules) {
            console.log(`\nModule: ${m.title} (${m.difficulty})`);
            console.log(`  - Lessons: ${m.lessons.length}/${m.lessonsCount}`);

            let missingContent = 0;
            m.lessons.forEach((l, i) => {
                if (!l.content || l.content.length < 50) {
                    console.log(`    ⚠️ Lesson ${i + 1} seems empty or too short.`);
                    missingContent++;
                }
            });

            if (missingContent === 0) {
                console.log('  ✅ All lessons have content.');
            } else {
                console.log(`  ❌ ${missingContent} lessons missing content.`);
            }
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkContent();
