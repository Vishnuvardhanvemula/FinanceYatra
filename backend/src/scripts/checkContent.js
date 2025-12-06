import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Module from '../models/Module.js';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/financeyatra';

async function check() {
    try {
        await mongoose.connect(MONGODB_URI);
        const modules = await Module.find({});
        console.log(`Found ${modules.length} modules.`);

        let issues = 0;
        modules.forEach(m => {
            if (!m.lessons || m.lessons.length === 0) {
                console.log(`❌ MODULE EMPTY: "${m.title}" (ID: ${m.id}) has 0 lessons.`);
                issues++;
            } else {
                const emptyContent = m.lessons.filter(l => !l.content || l.content.trim() === '');
                if (emptyContent.length > 0) {
                    console.log(`⚠️ CONTENT MISSING: "${m.title}" has ${emptyContent.length} lessons with empty content.`);
                    issues++;
                }
            }
        });

        if (issues === 0) {
            console.log("✅ All modules have lessons and content.");
        } else {
            console.log(`Found ${issues} modules with issues.`);
        }

    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}
check();
