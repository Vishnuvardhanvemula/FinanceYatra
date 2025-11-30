/**
 * Script to generate embeddings for all existing modules
 * Usage: node src/scripts/generateEmbeddings.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Module from '../models/Module.js';
import embeddingService from '../services/embeddingService.js';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/financeyatra';

async function generateEmbeddings() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected');

        const modules = await Module.find({});
        console.log(`📚 Found ${modules.length} modules to process`);

        let successCount = 0;
        let errorCount = 0;

        for (const module of modules) {
            try {
                console.log(`Processing: ${module.title}...`);

                // Combine title, description, and key points for rich context
                let contentText = `${module.title}. ${module.description}. `;

                if (module.lessons && module.lessons.length > 0) {
                    module.lessons.forEach(lesson => {
                        contentText += `${lesson.title}: ${lesson.content || ''} `;
                        if (lesson.keyPoints) {
                            contentText += lesson.keyPoints.join(' ') + ' ';
                        }
                    });
                }

                const embedding = await embeddingService.generateEmbedding(contentText);

                module.embedding = embedding;
                await module.save();

                console.log(`✅ Saved embedding for: ${module.title}`);
                successCount++;

                // Rate limit protection (very conservative)
                console.log('⏳ Waiting 10 seconds to respect rate limits...');
                await new Promise(resolve => setTimeout(resolve, 10000));

            } catch (error) {
                console.error(`❌ Failed to process ${module.title}:`, error.message);
                errorCount++;

                if (error.message.includes('429')) {
                    console.error('🛑 Rate limit hit! Stopping script to prevent lockout.');
                    break;
                }
            }
        }

        console.log('\n🎉 Embedding generation complete!');
        console.log(`✅ Success: ${successCount}`);
        console.log(`❌ Failed: ${errorCount}`);

    } catch (error) {
        console.error('Fatal error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('👋 Disconnected');
        process.exit(0);
    }
}

generateEmbeddings();
