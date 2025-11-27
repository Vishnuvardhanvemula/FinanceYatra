import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Module from '../src/models/Module.js';

dotenv.config();

const checkModules = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const count = await Module.countDocuments();
        console.log(`Total Modules in DB: ${count}`);

        if (count > 0) {
            const modules = await Module.find({}, 'title id');
            console.log('Sample Modules:', modules.map(m => ({ title: m.title, id: m.id })));
        }

        process.exit(0);
    } catch (error) {
        console.error('Error checking modules:', error);
        process.exit(1);
    }
};

checkModules();
