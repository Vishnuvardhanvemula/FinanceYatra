import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Module from '../models/Module.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/financeyatra';
const API_KEY = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error('❌ Missing GOOGLE_API_KEY or GEMINI_API_KEY');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

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
        return null; // Return null instead of error message to retry later
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

const repairContent = async () => {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected');

        const modules = await Module.find({});
        let repairedCount = 0;

        for (const m of modules) {
            let moduleUpdated = false;
            console.log(`Checking Module: ${m.title}`);

            for (let i = 0; i < m.lessons.length; i++) {
                const lesson = m.lessons[i];

                if (lesson.content.includes('Content generation failed') || lesson.content.length < 100) {
                    console.log(`  🔧 Repairing Lesson ${lesson.id}...`);

                    const newContent = await generateLessonContent(m.title, i, m.lessons.length, m.difficulty);

                    if (newContent) {
                        lesson.content = newContent;

                        // Also regenerate key points if they look generic or missing
                        if (!lesson.keyPoints || lesson.keyPoints.length === 0 || lesson.keyPoints[0] === "Key concept 1") {
                            lesson.keyPoints = await generateKeyPoints(newContent);
                        }

                        moduleUpdated = true;
                        repairedCount++;
                        console.log('    ✅ Fixed');
                    } else {
                        console.log('    ❌ Failed to regenerate (API Error)');
                    }

                    // Delay to avoid rate limits
                    await new Promise(resolve => setTimeout(resolve, 5000));
                }
            }

            if (moduleUpdated) {
                // Use findOneAndUpdate to ensure we don't overwrite other changes if any (though unlikely here)
                // But since we modified the 'm' object in place (mongoose document), we can just save it?
                // Actually, 'modules' are mongoose documents.
                await m.save();
                console.log(`  💾 Saved Module: ${m.title}`);
            }
        }

        console.log(`🎉 Repair complete! Fixed ${repairedCount} lessons.`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

repairContent();
