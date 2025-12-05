/**
 * LLM Service integrated with Python RAG system
 * All LLM inference now happens through Python RAG API
 */


class LLMService {
  constructor() {
    this.systemPrompt = `You are a friendly and knowledgeable financial advisor assistant for financeYatra, 
a platform that helps people understand finance in simple terms. Your role is to:

1. Explain financial concepts simply and clearly
2. Use examples relevant to everyday life in India
3. Be patient and supportive
4. Focus on practical, actionable advice
5. Cover topics like: EMI, loans, UPI, investments, savings, budgeting, insurance, taxes, etc.
6. Use simple language that a beginner can understand
7. Break down complex topics into easy steps

Keep responses concise (2-3 paragraphs) unless the user asks for more detail.
Always be encouraging and supportive of their financial learning journey.`;
  }

  /**
   * Initialize the LLM service
   */
  async initialize() {
    console.log('✅ LLM Service initialized (Mock Mode)');
  }

  /**
   * Get response from LLM based on user query and chat history
   * @param {string} userMessage - User's message
   * @param {Array} chatHistory - Previous messages
   * @param {string} targetLanguage - Target language for response
   * @param {string} proficiencyLevel - User proficiency level
   */
  async getResponse(userMessage, chatHistory = [], targetLanguage = 'en', proficiencyLevel = null) {
    // Return mock response directly since RAG is removed
    return this.getMockResponse(userMessage);
  }

  /**
   * Mock responses for testing without Python RAG
   */
  getMockResponse(userMessage) {
    const message = userMessage.toLowerCase();

    if (message.includes('emi')) {
      return `EMI stands for Equated Monthly Installment. It's a fixed amount you pay every month to repay a loan.

For example, if you take a ₹1,00,000 loan for 12 months at 10% interest, you'll pay around ₹8,792 as EMI each month.

EMI = [Principal × Interest Rate × (1 + Interest Rate)^Tenure] / [(1 + Interest Rate)^Tenure - 1]

Would you like to know how to calculate EMI or understand the interest component?`;
    }

    if (message.includes('upi')) {
      return `UPI (Unified Payments Interface) is a real-time payment system in India that lets you transfer money instantly between bank accounts using your mobile phone.

Key benefits:
• Instant transfers 24/7
• No need to remember bank details
• Just use UPI ID or QR code
• Free for most transactions

Popular UPI apps include Google Pay, PhonePe, Paytm, and BHIM.

Is there something specific about UPI you'd like to know?`;
    }

    if (message.includes('loan')) {
      return `A loan is money borrowed from a bank or lender that you must repay with interest over time.

Common types of loans:
• Personal Loan - for any personal need
• Home Loan - to buy property
• Car Loan - to buy a vehicle
• Education Loan - for studies

Before taking a loan, consider:
1. Interest rate
2. Repayment period
3. Processing fees
4. Your repayment capacity

What type of loan are you interested in learning about?`;
    }

    if (message.includes('invest') || message.includes('investment')) {
      return `Investment means putting your money into assets that can grow over time and generate returns.

Popular investment options in India:
• Fixed Deposits - Safe, fixed returns
• Mutual Funds - Professionally managed
• Stocks - Higher risk, higher returns
• PPF - Tax-free, long-term
• Gold - Traditional safe haven

Start with small amounts and diversify your investments. Would you like to know more about any specific investment option?`;
    }

    if (message.includes('save') || message.includes('saving')) {
      return `Saving is setting aside money for future needs and emergencies.

Simple saving tips:
1. Pay yourself first - save before spending
2. Follow 50-30-20 rule: 50% needs, 30% wants, 20% savings
3. Automate savings with recurring deposits
4. Cut unnecessary expenses
5. Build an emergency fund (3-6 months expenses)

Even small amounts saved regularly can grow significantly over time!

What's your biggest challenge with saving money?`;
    }

    // Default response
    return `Thank you for your question! I'm here to help you understand finance better.

I can explain topics like:
• EMI and loans
• UPI and digital payments
• Investments and savings
• Budgeting and financial planning
• Insurance and tax planning

Could you please tell me which financial topic you'd like to learn about? Feel free to ask in any language - I can understand Hindi, Tamil, Telugu, Bengali, and more!`;
  }
}

export default new LLMService();
