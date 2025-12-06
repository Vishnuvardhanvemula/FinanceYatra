import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * LLM Service integrated with Google Gemini & Internal Knowledge Base
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

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    } else {
      console.warn("⚠️ GEMINI_API_KEY not found. AI fallback will be disabled.");
    }
  }

  /**
   * Initialize the LLM service
   */
  async initialize() {
    if (this.model) {
      console.log('✅ LLM Service initialized with Google Gemini');
    } else {
      console.log('✅ LLM Service initialized (Knowledge Base Only)');
    }
  }

  /**
   * Get response from LLM based on user query and chat history
   * @param {string} userMessage - User's message
   * @param {Array} chatHistory - Previous messages
   * @param {string} targetLanguage - Target language for response
   * @param {string} proficiencyLevel - User proficiency level
   */
  async getResponse(userMessage, chatHistory = [], targetLanguage = 'en', proficiencyLevel = null) {
    // 1. Try internal knowledge base first (Fast & Free)
    const kbResponse = this.getKnowledgeBaseResponse(userMessage);
    if (kbResponse) {
      return kbResponse;
    }

    // 2. If no KB match, try Gemini AI (Smart & Dynamic)
    if (this.model) {
      try {
        return await this.getGeminiResponse(userMessage);
      } catch (error) {
        console.error("Gemini API Error:", error.message);
        // Fallback if API fails
      }
    }

    // 3. Final Fallback if both fail
    return this.getFallbackResponse();
  }

  /**
   * Call Google Gemini API
   */
  async getGeminiResponse(message) {
    const prompt = `${this.systemPrompt}\n\nUser Question: ${message}`;
    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  /**
   * Check internal knowledge base
   */
  getKnowledgeBaseResponse(userMessage) {
    const message = userMessage.toLowerCase();

    // Enhanced Knowledge Base with comprehensive financial topics
    const knowledgeBase = [
      // --- Greeting & Basics ---
      {
        keywords: ['hello', 'hi', 'hey', 'greetings', 'start', 'good morning', 'good evening'],
        answer: `Hello! 👋 I am your FinanceYatra AI Assistant. I'm here to solve your money doubts.

Ask me about:
• 📈 **Investments** (SIP, Mutual Funds, Gold, Real Estate)
• 💰 **Savings** & Budgeting Tips
• 🏠 **Loans** (Home, Car, Personal) & EMI
• 💸 **Tax Planning** (80C, Old vs New Regime)
• 🪙 **Crypto** & Blockchain
• 🛡️ **Insurance** (Term, Health)

What's on your mind today?`
      },

      // --- Investments ---
      {
        keywords: ['sip', 'systematic', 'mutual fund', 'mf'],
        answer: `**SIP (Systematic Investment Plan)** is the disciplined way to invest in Mutual Funds. 🚀

**Benefits**:
1. **Compounding**: Returns on returns! A small monthly amount grows huge over 10-20 years.
2. **Rupee Cost Averaging**: You buy more units when markets are down, lowering your average cost.
3. **Flexibility**: Start with as low as ₹500/month.

*Tip*: Long-term SIPs (>5 years) in equity funds historically beat inflation significantly.`
      },
      {
        keywords: ['stock', 'share market', 'equity', 'trading', 'sensex', 'nifty'],
        answer: `**Stock Market Investing** means buying a small ownership slice of a company. 📈

• **Why invest?** To beat inflation and build wealth. Stocks differ from FDs as they offer higher potential returns but come with valid risks.
• **Sensex & Nifty**: These are indices tracking the top companies in India.
• **Beginner Advice**: Don't trade daily. Invest in strong companies (Bluechips) for the long term or choose Index Funds.`
      },
      {
        keywords: ['gold', 'sovereign', 'sgb', 'yellow metal'],
        answer: `**Gold** is a favorite Indian investment! 🌟

Ways to invest:
1. **Physical Gold**: Jewelry/Coins (High making charges).
2. **Digital Gold**: Bought via apps (Convenient but check charges).
3. **Sovereign Gold Bonds (SGB)**: *Best option*! 
   • Pays 2.5% interest/year extra.
   • Tax-free capital gains at maturity (8 years).
   • No storage risk.`
      },
      {
        keywords: ['real estate', 'property', 'land', 'buying house'],
        answer: `**Real Estate** is a high-value asset class. 🏠

• **Pros**: Tangible asset, potential rental income, price appreciation.
• **Cons**: High entry cost, illiquid (hard to sell quickly), maintenance costs.
• **REITs**: Real Estate Investment Trusts allow you to invest in commercial property with just ₹300-400! It's like a mutual fund for real estate.`
      },
      {
        keywords: ['fds', 'fixed deposit', 'recurring deposit', 'rd', 'safe investment'],
        answer: `**Fixed Deposits (FDs)** are for safety and guaranteed returns. 🛡️

• **Current Rates**: ~6.5% - 8% p.a. in India.
• **Taxation**: Interest is fully taxable as per your slab.
• **Strategy**: Use FDs for your **Emergency Fund** or goals less than 3 years away. For long-term goals, FDs might barely beat inflation!`
      },

      // --- Loans & Credit ---
      {
        keywords: ['emi', 'calculate emi', 'installment'],
        answer: `**EMI (Equated Monthly Installment)** is your monthly loan repayment.

**Calculation**: Based on Principal, Interest Rate, and Tenure.
**Rule of Thumb**: 
• Home Loan EMI should not exceed **30-40%** of take-home pay.
• Car/Personal Loan EMI should be minimal.

*Hack*: Increase your EMI by just 5% every year to close your home loan years earlier!`
      },
      {
        keywords: ['loan', 'personal loan', 'home loan', 'car loan', 'debt'],
        answer: `**Loans** are leverage, but be careful! 💳

• **Good Debt**: Home Loan (Builds an asset, tax benefits).
• **Bad Debt**: Personal Loan/Credit Card Debt (High interest >12%, used for consumption).
• **Tip**: Always comparing "Processing Fees" and "Prepayment Charges" before signing. Zero prepayment charges are best.`
      },
      {
        keywords: ['cibil', 'credit score', 'credit report'],
        answer: `Your **CIBIL Score** (Credit Score) is your financial report card. 📊

• **Range**: 300 to 900.
• **Good Score**: 750+. Gets you cheaper loans and faster approvals.
• **How to improve**:
  1. Pay EMIs/Credit Card bills on time (Golden Rule).
  2. Don't use >30% of your credit limit.
  3. Don't apply for too many loans at once.`
      },

      // --- Tax & Planning ---
      {
        keywords: ['tax', 'income tax', 'it return', 'itr', '80c', '80d'],
        answer: `**Tax Planning** saves you money legally! 🏛️

**Sections to know**:
• **80C**: Save up to ₹1.5L (EPF, PPF, ELSS, LIC).
• **80D**: Health Insurance premiums (up to ₹25k - ₹75k).
• **80CCD(1B)**: Extra ₹50k in NPS.
• **24(b)**: Home Loan Interest deduction (up to ₹2L).

*Regime Check*: Calculate if Old Regime (with deductions) or New Regime (flat rates) works better for you.`
      },
      {
        keywords: ['budget', 'budgeting', 'expense', 'spending'],
        answer: `**Budgeting** isn't about restriction; it's about freedom! 💸

Try the **50-30-20 Rule**:
• **50% Needs**: Rent, Food, Utilities.
• **30% Wants**: Travel, Dining, Hobbies.
• **20% Savings**: Investing for future.

*Start today*: Track your expenses for one month. You'll be surprised where money leaks!`
      },
      {
        keywords: ['emergency fund', 'liquid fund', 'safety net'],
        answer: `An **Emergency Fund** is your financial oxygen mask. 😷

• **Why?**: For job loss, medical emergencies, or urgent repairs.
• **How much?**: 3 to 6 months of your monthly expenses.
• **Where to keep?**: Savings Account or Liquid Mutual Funds (Accessible anytime).
• **Rule**: Do NOT touch this money for vacations or gadgets!`
      },
      {
        keywords: ['retirement', 'pension', 'nps', 'ppf', 'old age'],
        answer: `**Retirement Planning** cannot wait! 👴👵

• **Inflation**: ₹1 Lakh today will value only ~₹25k in 20 years. You need to grow your money faster than inflation.
• **NPS (National Pension System)**: Low cost, market-linked returns, great for retirement corpus.
• **PPF**: Safe, tax-free, but lock-in of 15 years.
• **Strategy**: Start investing 10-15% of income for retirement from your first paycheck.`
      },

      // --- New Age ---
      {
        keywords: ['crypto', 'bitcoin', 'ethereum', 'blockchain', 'web3'],
        answer: `**Cryptocurrency**: High Risk, High Reward. 🪙

• It is decentralized digital money.
• **Bitcoin**: The main store of value.
• **Risks**: No regulation usage, extreme volatility (can drop 50% in weeks).
• **Tax in India**: Flat 30% tax on profits + 1% TDS on every trade. No set-off for losses.

*Advice*: Allocate max 5% of your portfolio to crypto.`
      },
      {
        keywords: ['upi', 'digital payment', 'phonepe', 'gpay', 'paytm'],
        answer: `**UPI** is India's payment superpower! 🇮🇳

• **Safety Tip**: You only use your PIN to **SEND** money. You NEVER need a PIN to *receive* money. Beware of scams!
• **Limits**: Most banks have a daily limit (e.g., ₹1 Lakh).`
      },

      // --- Concepts ---
      {
        keywords: ['inflation', 'mehangai', 'price rise'],
        answer: `**Inflation** is the silent killer of wealth. 📉

It means goods get expensive over time. If inflation is 6% and your money in bank earns 3%, you are technically **losing** purchasing power.
*Solution*: Invest in assets that beat inflation (Equity, Real Estate, Gold) over the long run.`
      },
      {
        keywords: ['compound', 'compounding', 'eighth wonder'],
        answer: `**Compound Interest** is the 8th Wonder of the World! 🎱

It means earning "interest on interest".
*Example*:
Invest ₹10k at 10%:
Year 1: ₹11,000
Year 2: ₹12,100 (You earned interest on the previous interest!)
Year 20: ₹67,275!

*Key*: Start EARLY. Time is more important than amount.`
      }
    ];

    // Find the best match
    let bestMatch = null;
    let highestScore = 0;

    for (const entry of knowledgeBase) {
      let score = 0;
      for (const keyword of entry.keywords) {
        // Boost score for partial word matches too
        if (message.includes(keyword)) {
          score += 2; // Full word match
        } else {
          // Check for plural/singular variations (simple heuristic)
          const singular = keyword.endsWith('s') ? keyword.slice(0, -1) : keyword;
          if (message.includes(singular)) {
            score += 1;
          }
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = entry;
      }
    }

    if (bestMatch && highestScore > 0) {
      return bestMatch.answer;
    }

    return null;
  }

  getFallbackResponse() {
    // Interactive Fallback - Try to keep conversation going
    return `That's an interesting question! 🤔 

While I'm tuned to be a financial expert, I might not have the specific data for that yet. 

However, **General Financial Wisdom** says:
1. **Earn** more than you spend.
2. **Save** at least 20% of your income.
3. **Invest** to beat inflation.

Can I help you with **SIPs**, **Tax**, **Loans**, **Insurance**, or **Budgeting** instead?`;
  }
}

export default new LLMService();
