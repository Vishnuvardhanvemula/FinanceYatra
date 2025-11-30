import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Module from '../models/Module.js';
import { learningModules } from '../data/learningModules.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/financeyatra';
const API_KEY = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error('❌ Missing GOOGLE_API_KEY or GEMINI_API_KEY');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function generateLessonContent(moduleTitle, lessonIndex, totalLessons, difficulty) {
    const prompt = `
        Write a comprehensive educational lesson about "${moduleTitle}" (Part ${lessonIndex + 1} of ${totalLessons}).
        Target Audience: ${difficulty} level student.
        
        Format: HTML (no markdown code blocks, just raw HTML tags like <p>, <h3>, <ul>, <li>).
        Length: ~300-400 words.
        
        **Interactive Tools:**
        If the lesson topic is relevant, YOU MUST insert one of these placeholders on its own line:
        - [CHEQUE_WRITER] (for banking/cheques)
        - [EMI_CALCULATOR] (for loans/mortgages)
        - [INTEREST_LADDER] (for savings/interest rates)
        - [SCAM_SPOTTER] (for security/fraud prevention)
        - [KYC_DETECTIVE] (for identity/KYC)
        - [UPI_SCANNER] (for digital payments/UPI)
        - [COMPOUND_INTEREST] (for investing/compounding)

        **Styling:**
        - Use <h3> for section headers.
        - Use <div class="bg-slate-800/50 p-4 rounded-xl border border-amber-500/20 my-4">...</div> for "Pro Tips" or "Did You Know".
        - Use <ul> or <ol> for lists.
        
        Structure:
        1. <h3>Introduction</h3>
        2. <p>Detailed explanation...</p>
        3. [Interactive Tool Placeholder if relevant]
        4. <h3>Key Concepts</h3>
        5. <ul>...</ul>
        6. <div class="bg-slate-800/50 p-4 rounded-xl border border-amber-500/20 my-4"><strong>Pro Tip:</strong> ...</div>
        
        Make it engaging, easy to understand, and visually structured.
    `;

    try {
        const result = await model.generateContent(prompt);
        let text = result.response.text();
        // Clean up markdown if present
        text = text.replace(/```html/g, '').replace(/```/g, '').trim();
        return text;
    } catch (error) {
        console.error(`❌ Error generating content for ${moduleTitle} Lesson ${lessonIndex + 1}:`, error.message);
        return `<p>Content generation failed. Please try again later.</p>`;
    }
}

async function generateKeyPoints(content) {
    const prompt = `
        Extract 3 short, punchy key takeaways from this text.
        Return ONLY a JSON array of strings.
        
        Text: ${content.substring(0, 1000)}...
    `;

    try {
        const result = await model.generateContent(prompt);
        let text = result.response.text();
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(text);
    } catch (error) {
        return ["Key concept 1", "Key concept 2", "Key concept 3"];
    }
}

async function seedContent() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected');

        console.log(`🌱 Updating content for ${learningModules.length} modules...`);

        for (const m of learningModules) {
            console.log(`\n📘 Processing Module: ${m.title} (${m.difficulty})`);

            const lessons = [];
            for (let i = 0; i < m.lessons; i++) {
                process.stdout.write(`  - Generating Lesson ${i + 1}/${m.lessons}... `);

                const content = await generateLessonContent(m.title, i, m.lessons, m.difficulty);
                const keyPoints = await generateKeyPoints(content);

                lessons.push({
                    id: i + 1,
                    title: `${m.title} - Part ${i + 1}`,
                    subtitle: `Mastering ${m.title}`,
                    duration: '10 mins',
                    content: content,
                    keyPoints: keyPoints,
                    quiz: [] // Quiz will be generated dynamically in Phase 2
                });

                console.log('✅ Done');
                // Increased delay to avoid rate limits (10s)
                await new Promise(resolve => setTimeout(resolve, 10000));
            }

            const moduleData = {
                ...m,
                description: `Comprehensive guide to ${m.title} for ${m.difficulty}s.`,
                lessonsCount: m.lessons,
                lessons: lessons,
                topics: [m.title, 'Finance', m.difficulty],
                learningOutcomes: [`Master ${m.title}`, 'Financial Literacy', 'Practical Application']
            };

            // Upsert: Update if exists, create if not
            await Module.findOneAndUpdate({ id: m.id }, moduleData, { upsert: true, new: true });
            console.log(`💾 Saved/Updated Module: ${m.title}`);
        }

        console.log('🎉 All modules seeded with AI-generated content!');

    } catch (error) {
        console.error('Fatal error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('👋 Disconnected');
        process.exit(0);
    }
}

seedContent();
