/**
 * Python RAG Service Integration
 * Connects Node.js backend to Python RAG system via REST API
 */

import axios from 'axios';

class PythonRAGService {
  constructor() {
    this.pythonApiUrl = process.env.PYTHON_RAG_URL || 'http://localhost:8000';
    this.enabled = process.env.USE_PYTHON_RAG === 'true';
    this.isHealthy = false;
    
    console.log('🐍 Python RAG Service Configuration:');
    console.log(`   URL: ${this.pythonApiUrl}`);
    console.log(`   Enabled: ${this.enabled}`);
  }

  /**
   * Initialize and check Python RAG service health
   */
  async initialize() {
    if (!this.enabled) {
      console.log('ℹ️  Python RAG service is disabled');
      return false;
    }

    try {
      const response = await axios.get(`${this.pythonApiUrl}/health`, {
        timeout: 5000
      });

      if (response.status === 200 && response.data.status === 'healthy') {
        this.isHealthy = true;
        const stats = response.data.stats;
        
        console.log('✅ Python RAG service is healthy');
        console.log(`   📚 Documents: ${stats.vector_store.document_count}`);
        console.log(`   🤖 LLM: ${stats.llm_model} (${stats.llm_status})`);
        console.log(`   🌍 Languages: ${stats.supported_languages}`);
        
        return true;
      }

      console.warn('⚠️  Python RAG service responded but is not healthy');
      return false;

    } catch (error) {
      console.warn('⚠️  Python RAG service not available:', error.message);
      console.warn('   To start: cd rag_system && python app.py');
      this.isHealthy = false;
      return false;
    }
  }

  /**
   * Query the Python RAG system
   * @param {string} query - User query
   * @param {string} language - Target language code (optional)
   * @param {string} proficiencyLevel - User proficiency level (beginner/intermediate/expert)
   * @param {number} k - Number of context documents to retrieve
   * @param {boolean} returnSources - Include source documents
   * @returns {Promise<Object>} RAG response with answer and metadata
   */
  async query(query, language = null, proficiencyLevel = null, k = 3, returnSources = true) {
    if (!this.enabled || !this.isHealthy) {
      throw new Error('Python RAG service is not available');
    }

    try {
      const response = await axios.post(
        `${this.pythonApiUrl}/api/chat`,
        {
          query: query,
          language: language,
          proficiency_level: proficiencyLevel,
          k: k,
          return_sources: returnSources
        },
        {
          timeout: 30000, // 30 second timeout for RAG queries
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        return {
          success: true,
          answer: response.data.answer,
          queryLanguage: response.data.query_language,
          translationUsed: response.data.translation_used,
          sources: response.data.sources || [],
          englishQuery: response.data.english_query,
          englishAnswer: response.data.english_answer
        };
      }

      throw new Error(`Python RAG API returned status ${response.status}`);

    } catch (error) {
      if (error.response) {
        console.error('❌ Python RAG API error:', error.response.status, error.response.data);
        throw new Error(`Python RAG API error: ${error.response.data.detail || error.response.statusText}`);
      } else if (error.request) {
        console.error('❌ Python RAG service not responding');
        throw new Error('Python RAG service not responding. Please ensure it is running.');
      } else {
        console.error('❌ Python RAG query error:', error.message);
        throw error;
      }
    }
  }

  /**
   * Get supported languages from Python RAG
   */
  async getSupportedLanguages() {
    if (!this.enabled || !this.isHealthy) {
      return null;
    }

    try {
      const response = await axios.get(`${this.pythonApiUrl}/api/languages`, {
        timeout: 5000
      });

      return response.data;
    } catch (error) {
      console.error('Failed to fetch languages from Python RAG:', error.message);
      return null;
    }
  }

  /**
   * Get statistics from Python RAG system
   */
  async getStats() {
    if (!this.enabled || !this.isHealthy) {
      return null;
    }

    try {
      const response = await axios.get(`${this.pythonApiUrl}/api/stats`, {
        timeout: 5000
      });

      return response.data;
    } catch (error) {
      console.error('Failed to fetch stats from Python RAG:', error.message);
      return null;
    }
  }

  /**
   * Check if Python RAG service is available and healthy
   */
  isAvailable() {
    return this.enabled && this.isHealthy;
  }

  /**
   * Re-check health (for periodic health checks)
   */
  async checkHealth() {
    return await this.initialize();
  }
}

export default new PythonRAGService();
