/**
 * Chat Service
 * Handles AI Financial Advisor logic using RAG (Retrieval-Augmented Generation)
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import embeddingService from './embeddingService.js';
import vectorSearchService from './vectorSearchService.js';

class ChatService {
    constructor() {
        this.model = null;
        this.genAI = null;
    }

    _init() {
        if (this.model) return;

        const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
        if (apiKey) {
            this.genAI = new GoogleGenerativeAI(apiKey);
            // Using gemini-2.5-flash as per available models list
            this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        } else {
            console.error("❌ ChatService: Missing API Key");
        }
    }

    /**
     * Process a user message and generate a response
     * @param {string} message - User's question
     * @param {Array} history - Previous chat history (optional)
     * @returns {Promise<Object>} AI response
     */
    async getResponse(message, history = []) {
        this._init();

        if (!this.model) {
            return {
                message: "I'm currently offline (API Key missing). Please check back later!",
                source: "system"
            };
        }

        try {
            // 1. Generate embedding for the user's question
            const queryEmbedding = await embeddingService.generateEmbedding(message);

            // 2. Find relevant context from Learning Modules
            const relevantModules = await vectorSearchService.findSimilarModules(queryEmbedding, 3);

            // Format context for the AI
            const contextText = relevantModules.map(m =>
                `[Source: ${m.title}]\n${m.description}\n${m.content || ''}`
            ).join('\n\n');

            // 3. Construct the prompt
            const systemPrompt = `
                You are "FinanceYatra AI", a friendly and knowledgeable financial tutor.
                
                Your goal is to answer the user's question using the provided CONTEXT from our learning modules.
                
                RULES:
                1. Only answer based on the provided Context if possible.
                2. If the answer isn't in the Context, use your general financial knowledge but mention "I'm answering from general knowledge".
                3. Keep answers concise (under 100 words) unless asked for detail.
                4. Be encouraging and use emojis occasionally.
                5. If the question is completely unrelated to finance (e.g., "How to bake a cake"), politely refuse.

                CONTEXT:
                ${contextText}
            `;

            // 4. Send to Gemini
            // Sanitize history: Gemini requires the first message to be from 'user'
            let validHistory = history.map(h => ({
                role: h.role === 'user' ? 'user' : 'model',
                parts: [{ text: h.content }]
            }));

            // Remove leading model messages
            while (validHistory.length > 0 && validHistory[0].role === 'model') {
                validHistory.shift();
            }

            const chat = this.model.startChat({
                history: validHistory,
                generationConfig: {
                    maxOutputTokens: 200,
                },
            });

            const result = await chat.sendMessage(`${systemPrompt}\n\nUSER QUESTION: ${message}`);
            const response = result.response;
            const text = response.text();

            return {
                message: text,
                sources: relevantModules.map(m => m.title)
            };

        } catch (error) {
            console.error('❌ Chat Service Error:', error);
            return {
                message: "I'm having trouble thinking right now. Please try again in a moment.",
                source: "system"
            };
        }
    }
}

export default new ChatService();
