/**
 * Recommendation Service
 * Analyzes user performance and recommends modules using Vector Search + AI
 */

import User from '../models/User.js';
import vectorSearchService from './vectorSearchService.js';
import embeddingService from './embeddingService.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

class RecommendationService {
    constructor() {
        this.apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
        if (this.apiKey) {
            this.genAI = new GoogleGenerativeAI(this.apiKey);
            this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
        }
    }

    /**
     * Get recommendations for a user based on recent activity
     * @param {string} userId 
     * @returns {Promise<Object>} Recommendations and Daily Goal
     */
    async getRecommendations(userId) {
        try {
            const user = await User.findById(userId).populate('moduleProgress.moduleId');
            if (!user) throw new Error('User not found');

            // 1. Analyze weak areas (low quiz scores)
            const weakModules = user.moduleProgress.filter(p => p.quizScore !== undefined && p.quizScore < 70);

            let searchContext = "";
            if (weakModules.length > 0) {
                // Get the titles of modules they struggled with
                // Note: We need to fetch the actual Module docs if populate didn't work fully or if we need more info
                // Assuming populate works or we have the IDs
                searchContext = `User struggled with: ${weakModules.map(m => m.moduleId).join(', ')}. `;
            } else {
                // If no weak areas, look at interests or last completed
                searchContext = "Advanced finance topics, investment strategies, market analysis. ";
            }

            // 2. Generate embedding for the "Gap"
            // We want to find modules that FILL this gap.
            const queryEmbedding = await embeddingService.generateEmbedding(searchContext);

            // 3. Vector Search for relevant modules
            const recommendedModules = await vectorSearchService.findSimilarModules(queryEmbedding, 3);

            // 4. Generate Daily Goal using LLM
            const dailyGoal = await this.generateDailyGoal(user, recommendedModules);

            return {
                recommendations: recommendedModules,
                dailyGoal: dailyGoal
            };

        } catch (error) {
            console.error('❌ Recommendation error:', error.message);
            return { recommendations: [], dailyGoal: null };
        }
    }

    /**
     * Generate a dynamic daily goal message
     */
    async generateDailyGoal(user, recommendations) {
        if (!this.model) return { message: "Complete 1 lesson today!", type: "generic" };

        try {
            const prompt = `
        User Profile:
        - Name: ${user.name}
        - Streak: ${user.currentStreak} days
        - Level: ${user.proficiencyLevel}
        
        Recommended Modules: ${recommendations.map(r => r.title).join(', ')}

        Generate a short, motivating "Daily Goal" for this user (max 15 words). 
        Example: "Master the basics of Tax to keep your 5-day streak alive!"
      `;

            const result = await this.model.generateContent(prompt);
            const response = result.response;
            const text = response.text().trim();

            return {
                message: text,
                type: "ai_generated"
            };
        } catch (error) {
            return { message: "Keep learning! Complete a lesson today.", type: "fallback" };
        }
    }
}

export default new RecommendationService();
