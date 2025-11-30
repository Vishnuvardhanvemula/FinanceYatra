/**
 * Embedding Service using Google Generative AI
 * Generates vector embeddings for text content
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

class EmbeddingService {
    constructor() {
        this.model = null;
        this.genAI = null;
    }

    initialize() {
        if (this.model) return;

        const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error('Embedding service not initialized (missing API key)');
        }

        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "text-embedding-004" });
    }

    /**
     * Generate embedding for a single text string
     * @param {string} text - Text to embed
     * @returns {Promise<number[]>} Vector embedding
     */
    async generateEmbedding(text) {
        this.initialize();

        if (!this.model) {
            throw new Error('Embedding service not initialized');
        }

        try {
            // Clean text to avoid token limits or issues
            const cleanText = text.replace(/\n/g, ' ').substring(0, 10000); // Limit length if needed

            const result = await this.model.embedContent(cleanText);
            const embedding = result.embedding;
            return embedding.values;
        } catch (error) {
            console.error('❌ Error generating embedding:', error.message);
            throw error;
        }
    }

    /**
     * Generate embeddings for multiple texts (batch)
     * @param {string[]} texts - Array of texts
     * @returns {Promise<number[][]>} Array of vector embeddings
     */
    async generateBatchEmbeddings(texts) {
        // Note: Gemini API might have batch limits, implementing sequential for safety
        const embeddings = [];
        for (const text of texts) {
            const embedding = await this.generateEmbedding(text);
            embeddings.push(embedding);
        }
        return embeddings;
    }
}

export default new EmbeddingService();
