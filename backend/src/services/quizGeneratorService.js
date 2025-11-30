import { GoogleGenerativeAI } from '@google/generative-ai';

class QuizGeneratorService {
    constructor() {
        this.model = null;
        this.genAI = null;
    }

    _init() {
        if (this.model) return;

        const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
        if (apiKey) {
            this.genAI = new GoogleGenerativeAI(apiKey);
            // Use flash model for speed
            this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        } else {
            console.error("❌ QuizGeneratorService: Missing API Key");
        }
    }

    /**
     * Generate adaptive quiz questions
     * @param {string} moduleTitle - Title of the module
     * @param {string} lessonTitle - Title of the specific lesson
     * @param {string} proficiencyLevel - User's level (Beginner, Intermediate, Advanced)
     * @returns {Promise<Array>} Array of quiz questions
     */
    async generateQuiz(moduleTitle, lessonTitle, proficiencyLevel = 'Beginner') {
        this._init();

        if (!this.model) {
            throw new Error("AI Service Unavailable");
        }

        const prompt = `
            Generate 5 multiple-choice quiz questions for a finance lesson.
            
            Context:
            - Module: "${moduleTitle}"
            - Lesson: "${lessonTitle}"
            - Target Audience: ${proficiencyLevel} level student

            Requirements:
            1. Questions should test understanding of the lesson concepts.
            2. Difficulty should match the "${proficiencyLevel}" level.
            3. Return ONLY a valid JSON array. No markdown formatting.
            4. Each question object must have:
               - "id": number (1-5)
               - "question": string
               - "options": array of 4 strings
               - "correctAnswer": number (index of correct option, 0-3)
               - "explanation": string (brief explanation of why it's correct)

            Example JSON structure:
            [
                {
                    "id": 1,
                    "question": "What is...",
                    "options": ["A", "B", "C", "D"],
                    "correctAnswer": 0,
                    "explanation": "Because..."
                }
            ]
        `;

        try {
            const result = await this.model.generateContent(prompt);
            const response = result.response;
            let text = response.text();

            // Clean up markdown code blocks if present
            text = text.replace(/```json/g, '').replace(/```/g, '').trim();

            const questions = JSON.parse(text);
            return questions;
        } catch (error) {
            console.error("❌ Quiz Generation Error:", error);
            // Fallback to empty array or throw, controller will handle fallback to static
            throw error;
        }
    }
}

export default new QuizGeneratorService();
