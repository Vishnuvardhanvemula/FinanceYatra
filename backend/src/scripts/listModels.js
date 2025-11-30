import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error('❌ No API Key found in environment variables.');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        console.log('Fetching available models...');
        // Note: The SDK might not expose listModels directly on genAI instance in all versions,
        // but let's try to infer or use a generic request if possible.
        // Actually, for the JS SDK, we might just try to instantiate a model and run a simple prompt.
        // But the error said "Call ListModels". 
        // The JS SDK usually doesn't have a direct listModels method exposed easily in the main class in older versions.
        // Let's try to just run a simple prompt with 'gemini-pro' again, but logging everything.

        // However, if we want to list models, we might need to use the REST API if the SDK doesn't support it.
        // Let's try a direct fetch to the API endpoint to list models.

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.models) {
            console.log('✅ Available Models:');
            const generativeModels = data.models.filter(m => m.supportedGenerationMethods.includes('generateContent'));
            generativeModels.slice(0, 5).forEach(m => console.log(m.name));
        } else {
            console.error('❌ Failed to list models:', data);
        }

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

listModels();
