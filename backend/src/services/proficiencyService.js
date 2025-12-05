/**
 * AI-based Proficiency Detection Service
 * Analyzes user questions using Ollama LLM to determine proficiency level
 */


class ProficiencyDetectionService {
  constructor() {
    this.minQuestionsForAssessment = 3; // Need at least 3 questions to assess
    this.reassessmentThreshold = 10; // Reassess every 10 questions
  }

  /**
   * Analyze user's questions to determine proficiency level
   * @param {Array} questions - Array of user questions
   * @returns {Promise<Object>} { level: string, score: number, reasoning: string }
   */
  async detectProficiency(questions) {
    if (!questions || questions.length < this.minQuestionsForAssessment) {
      return {
        level: 'unknown',
        score: 0,
        reasoning: 'Not enough questions to assess proficiency. Need at least 3 questions.'
      };
    }

    try {
      console.log('🔍 Analyzing user proficiency (Rule-based)...');

      // Use fallback rule-based detection since RAG is disabled
      return this.fallbackDetection(questions);

    } catch (error) {
      console.error('❌ Proficiency detection error:', error.message);
      return this.fallbackDetection(questions);
    }
  }

  /**
   * Parse LLM response to extract level, score, and reasoning
   */
  parseAnalysisResponse(text) {
    try {
      // Extract LEVEL
      const levelMatch = text.match(/LEVEL:\s*(beginner|intermediate|expert)/i);
      const level = levelMatch ? levelMatch[1].toLowerCase() : 'beginner';

      // Extract SCORE
      const scoreMatch = text.match(/SCORE:\s*(\d+)/);
      let score = scoreMatch ? parseInt(scoreMatch[1]) : 0;

      // Validate score range
      if (score < 0) score = 0;
      if (score > 100) score = 100;

      // If score doesn't match level, adjust it
      if (level === 'beginner' && score > 33) score = Math.min(score, 33);
      if (level === 'intermediate' && (score < 34 || score > 66)) {
        score = 50; // Middle of intermediate range
      }
      if (level === 'expert' && score < 67) score = Math.max(score, 67);

      // Extract REASONING
      const reasoningMatch = text.match(/REASONING:\s*(.+?)(?:\n\n|$)/s);
      const reasoning = reasoningMatch ? reasoningMatch[1].trim() : 'Unable to extract reasoning';

      return { level, score, reasoning };

    } catch (error) {
      console.error('❌ Failed to parse proficiency response:', error.message);
      return {
        level: 'beginner',
        score: 25,
        reasoning: 'Failed to parse AI response, defaulting to beginner level.'
      };
    }
  }

  /**
   * Fallback rule-based detection if AI fails
   */
  fallbackDetection(questions) {
    console.log('⚠️ Using fallback rule-based proficiency detection');

    let score = 0;
    const questionTexts = questions.join(' ').toLowerCase();

    // Beginner indicators
    const beginnerKeywords = ['what is', 'what does', 'how to', 'explain', 'basic', 'simple'];
    const beginnerCount = beginnerKeywords.filter(kw => questionTexts.includes(kw)).length;

    // Intermediate indicators
    const intermediateKeywords = ['difference between', 'compare', 'which is better', 'how does', 'calculate', 'example'];
    const intermediateCount = intermediateKeywords.filter(kw => questionTexts.includes(kw)).length;

    // Expert indicators
    const expertKeywords = ['optimize', 'tax', 'strategy', 'portfolio', 'diversification', 'return on investment', 'compound'];
    const expertCount = expertKeywords.filter(kw => questionTexts.includes(kw)).length;

    // Calculate score
    score = (beginnerCount * 5) + (intermediateCount * 15) + (expertCount * 30);
    score = Math.min(score, 100);

    let level = 'beginner';
    if (score >= 67) level = 'expert';
    else if (score >= 34) level = 'intermediate';

    return {
      level,
      score,
      reasoning: `Rule-based assessment: Found ${beginnerCount} beginner, ${intermediateCount} intermediate, and ${expertCount} expert indicators in questions.`
    };
  }

  /**
   * Check if user needs proficiency reassessment
   */
  shouldReassess(user) {
    // Reassess if:
    // 1. Never assessed
    if (user.proficiencyLevel === 'unknown') return true;

    // 2. Enough new questions since last assessment
    if (user.questionsAnalyzed >= this.reassessmentThreshold) return true;

    // 3. Assessment is old (30 days)
    if (user.proficiencyAssessedAt) {
      const daysSinceAssessment = (Date.now() - user.proficiencyAssessedAt.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceAssessment > 30) return true;
    }

    return false;
  }

  /**
   * Get recent questions for proficiency assessment
   */
  async getRecentQuestions(sessionId) {
    try {
      // Read session file
      const fs = await import('fs/promises');
      const path = await import('path');

      const sessionPath = path.join(process.cwd(), 'data', 'sessions', `${sessionId}.json`);
      const sessionData = await fs.readFile(sessionPath, 'utf-8');
      const session = JSON.parse(sessionData);

      // Extract user questions from messages
      const userQuestions = session.messages
        .filter(msg => msg.role === 'user')
        .map(msg => msg.content)
        .slice(-10); // Last 10 questions

      return userQuestions;

    } catch (error) {
      console.error('❌ Failed to get recent questions:', error.message);
      return [];
    }
  }
}

export default new ProficiencyDetectionService();
