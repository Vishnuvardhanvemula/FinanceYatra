/**
 * Vector Search Service
 * Performs similarity search using MongoDB Atlas Vector Search
 */

import Module from '../models/Module.js';

class VectorSearchService {
    /**
     * Find modules similar to the query vector
     * @param {number[]} queryVector - The embedding vector of the query
     * @param {number} limit - Max number of results
     * @returns {Promise<Object[]>} List of similar modules with score
     */
    async findSimilarModules(queryVector, limit = 5) {
        try {
            // MongoDB Atlas Vector Search Aggregation Pipeline
            const pipeline = [
                {
                    "$vectorSearch": {
                        "index": "vector_index", // Ensure this matches your Atlas Index name
                        "path": "embedding",
                        "queryVector": queryVector,
                        "numCandidates": limit * 10, // Number of nearest neighbors to consider
                        "limit": limit
                    }
                },
                {
                    "$project": {
                        "_id": 1,
                        "id": 1,
                        "title": 1,
                        "description": 1,
                        "difficulty": 1,
                        "score": { "$meta": "vectorSearchScore" } // Include similarity score
                    }
                }
            ];

            const results = await Module.aggregate(pipeline);
            return results;

        } catch (error) {
            console.error('❌ Vector search failed:', error.message);
            // Fallback: Return random modules if search fails (e.g., index not ready)
            console.warn('⚠️ Falling back to random modules');
            return await Module.aggregate([{ $sample: { size: limit } }]);
        }
    }
}

export default new VectorSearchService();
