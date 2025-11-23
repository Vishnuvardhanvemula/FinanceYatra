/**
 * Content Template Generator
 * Use this as a base template for creating new lesson content
 */

export const lessonTemplate = {
  id: 0, // Lesson number (0-indexed)
  title: 'Lesson Title Here',
  subtitle: 'Engaging One-Line Description',
  duration: '6 mins', // Estimated reading time
  
  content: `
    <h3>What is [Topic]?</h3>
    <p>Introduction paragraph explaining the concept in simple terms. Use everyday language and Indian context.</p>
    
    <h4>Key Features:</h4>
    <ul>
      <li><strong>Feature 1:</strong> Brief explanation</li>
      <li><strong>Feature 2:</strong> Brief explanation</li>
      <li><strong>Feature 3:</strong> Brief explanation</li>
      <li><strong>Feature 4:</strong> Brief explanation</li>
    </ul>

    <h4>Types/Categories:</h4>
    <ul>
      <li><strong>Type 1:</strong> When to use this</li>
      <li><strong>Type 2:</strong> When to use this</li>
      <li><strong>Type 3:</strong> When to use this</li>
    </ul>

    <h4>Example Calculation:</h4>
    <p><strong>Scenario:</strong> Real-world example</p>
    <ul>
      <li>Input 1: Value</li>
      <li>Input 2: Value</li>
      <li>Result: Value</li>
      <li>Key Learning: Insight</li>
    </ul>

    <h4>Advantages:</h4>
    <ul>
      <li>Benefit 1 with explanation</li>
      <li>Benefit 2 with explanation</li>
      <li>Benefit 3 with explanation</li>
    </ul>

    <h4>Disadvantages/Limitations:</h4>
    <ul>
      <li>Limitation 1 with explanation</li>
      <li>Limitation 2 with explanation</li>
      <li>Limitation 3 with explanation</li>
    </ul>

    <h4>Important Tips:</h4>
    <ul>
      <li>Actionable tip 1</li>
      <li>Actionable tip 2</li>
      <li>Actionable tip 3</li>
      <li>Actionable tip 4</li>
    </ul>

    <h4>Common Mistakes to Avoid:</h4>
    <ul>
      <li>❌ Mistake 1 and why it's bad</li>
      <li>❌ Mistake 2 and why it's bad</li>
      <li>❌ Mistake 3 and why it's bad</li>
    </ul>

    <h4>Step-by-Step Guide:</h4>
    <ol>
      <li>Step 1 with details</li>
      <li>Step 2 with details</li>
      <li>Step 3 with details</li>
      <li>Step 4 with details</li>
    </ol>
  `,

  keyPoints: [
    'Concise takeaway 1 - actionable and memorable',
    'Concise takeaway 2 - includes numbers or specifics',
    'Concise takeaway 3 - practical advice',
    'Concise takeaway 4 - common misconception corrected'
  ],

  quiz: [
    // Question 1: MCQ (Multiple Choice)
    {
      type: 'mcq',
      question: 'Clear, specific question testing understanding?',
      options: [
        'Plausible wrong answer',
        'Correct answer with detail',
        'Common misconception',
        'Obviously wrong answer'
      ],
      correct: 1, // Index of correct answer (0-3)
      explanation: 'Detailed explanation of why this is correct. Reference the lesson content. Explain why other options are wrong if needed.'
    },

    // Question 2: Scenario (Story-based)
    {
      type: 'scenario',
      question: '[Name] has [situation]. What should [he/she] do?',
      context: 'Additional background information about the person\'s situation, income, goals, constraints.',
      options: [
        'Common but suboptimal choice',
        'Ideal solution based on lesson',
        'Risky or inappropriate choice',
        'Partial solution missing key element'
      ],
      correct: 1,
      explanation: 'Explain why this is the best choice for this specific scenario. Mention what makes other options less suitable for THIS situation.'
    },

    // Question 3: Calculation
    {
      type: 'calculation',
      question: 'You invest ₹X at Y% interest for Z years. What will be the result?',
      options: [
        '₹Result slightly lower',
        '₹Correct result',
        '₹Result slightly higher',
        '₹Result much different'
      ],
      correct: 1,
      explanation: 'Show the formula used: [Formula]. Calculation: [Step 1] → [Step 2] → [Final Result]. This teaches the methodology, not just the answer.'
    },

    // Question 4: True/False
    {
      type: 'truefalse',
      question: 'Statement that might seem true but requires careful thought.',
      options: ['True', 'False'],
      correct: 1, // 0 for True, 1 for False
      explanation: 'Explain the correct answer. If False, explain the correct version of the statement. If True, reinforce why it\'s important.'
    },

    // Question 5: MCQ (Application)
    {
      type: 'mcq',
      question: 'Which option is BEST for [specific situation]?',
      options: [
        'Option that seems good but has hidden costs',
        'Conservative but safe option',
        'Optimal choice balancing benefits and risks',
        'Aggressive or risky option'
      ],
      correct: 2,
      explanation: 'Explain why this balances the requirements. Acknowledge trade-offs. Mention when other options might be appropriate.'
    }
  ]
};

/**
 * Quiz Question Templates
 */

export const quizTemplates = {
  // Format 1: Direct Knowledge Test
  directKnowledge: {
    type: 'mcq',
    pattern: 'What is [concept/term]?',
    example: 'What is the maximum investment limit in PPF per year?',
    options: ['₹1 lakh', '₹1.5 lakh', '₹2 lakh', '₹5 lakh'],
    tips: 'Test recall of specific facts from lesson'
  },

  // Format 2: Comparative Choice
  comparative: {
    type: 'mcq',
    pattern: 'Which is better for [situation]: Option A or Option B?',
    example: 'For long-term wealth creation, which is better: SIP in equity funds or Monthly RD?',
    tips: 'Test understanding of when to use each option'
  },

  // Format 3: Real-Life Scenario
  scenario: {
    type: 'scenario',
    pattern: '[Name], [age], [situation], wants [goal]. What should [he/she] do?',
    example: 'Priya, 28, earns ₹50,000/month, wants to buy house in 5 years. Should she invest in equity or debt?',
    tips: 'Give enough context: age, income, goal, timeline, constraints'
  },

  // Format 4: Calculation Problem
  calculation: {
    type: 'calculation',
    pattern: 'Calculate [result] given [inputs]',
    example: 'If you invest ₹5,000/month via SIP for 10 years at 12% returns, what will be the corpus?',
    tips: 'Keep calculations realistic. Show formula in explanation.'
  },

  // Format 5: True/False with Twist
  trueFalse: {
    type: 'truefalse',
    pattern: 'Statement that challenges common misconception',
    example: 'Term insurance provides maturity benefit if you survive the policy term.',
    tips: 'False! Term insurance only pays on death, not survival. Bust myths.'
  },

  // Format 6: Error Identification
  errorIdentification: {
    type: 'mcq',
    pattern: 'What is WRONG with this approach/statement?',
    example: 'Raj keeps all savings in savings account earning 3% interest. What\'s the main problem?',
    tips: 'Test critical thinking about common mistakes'
  },

  // Format 7: Best Practice
  bestPractice: {
    type: 'mcq',
    pattern: 'What is the FIRST/BEST thing to do in [situation]?',
    example: 'You suspect fraud in your bank account. What should you do FIRST?',
    tips: 'Test prioritization and practical application'
  }
};

/**
 * Indian Financial Context - Quick Reference
 */

export const indianContext = {
  amounts: {
    small: '₹1,000 - ₹10,000',
    medium: '₹50,000 - ₹5,00,000',
    large: '₹10,00,000 - ₹1,00,00,000',
    notation: 'Use ₹ symbol, lakhs/crores (not thousands/millions)'
  },

  banks: {
    public: ['SBI', 'PNB', 'Bank of Baroda', 'Canara Bank'],
    private: ['HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra'],
    payments: ['Paytm Payments Bank', 'Airtel Payments Bank']
  },

  regulators: {
    banking: 'RBI (Reserve Bank of India)',
    securities: 'SEBI (Securities and Exchange Board of India)',
    insurance: 'IRDAI (Insurance Regulatory and Development Authority)',
    deposits: 'DICGC (Deposit Insurance and Credit Guarantee Corporation)'
  },

  products: {
    savings: ['PPF', 'EPF', 'NPS', 'Sukanya Samriddhi Yojana', 'Senior Citizens Savings Scheme'],
    tax: ['Section 80C', '80D', '80G', '80CCD(1B)', '24(b)'],
    loans: ['Home Loan', 'Education Loan', 'Personal Loan', 'Gold Loan', 'Loan Against Property'],
    payments: ['UPI', 'NEFT', 'RTGS', 'IMPS', 'Net Banking']
  },

  limits: {
    upi: '₹1 lakh per transaction',
    neft: 'No limit, free for individuals',
    rtgs: '₹2 lakhs minimum, real-time',
    imps: '₹2 lakhs per transaction, ₹5 lakhs per day',
    cashWithdrawal: '₹10,000 per day without PAN',
    walletKYC: '₹1 lakh/month with KYC, ₹10,000 without'
  }
};

/**
 * Content Writing Tips
 */

export const writingTips = {
  doThis: [
    '✅ Use simple, conversational language (write like you\'re explaining to a friend)',
    '✅ Include specific numbers and examples (₹5,000, 7%, 3 years)',
    '✅ Break long paragraphs into bullet points for scannability',
    '✅ Use Indian context (Indian banks, ₹, Indian regulations)',
    '✅ Add real-life scenarios people can relate to',
    '✅ Explain WHY something works, not just WHAT it is',
    '✅ Include both benefits AND limitations/risks',
    '✅ Use tables for comparisons (side-by-side is powerful)',
    '✅ Add formulas for calculations (show the math)',
    '✅ Use emojis sparingly for emphasis (✅ ❌ 💡 ⚠️)'
  ],

  avoidThis: [
    '❌ Don\'t use jargon without explanation',
    '❌ Don\'t assume prior financial knowledge',
    '❌ Don\'t make content too text-heavy (use formatting)',
    '❌ Don\'t forget to explain abbreviations (EMI, SIP, NAV, etc.)',
    '❌ Don\'t use US/Western examples (401k, SSN, etc.)',
    '❌ Don\'t make statements without backing them up',
    '❌ Don\'t ignore the "why should I care?" factor',
    '❌ Don\'t skip practical implementation steps'
  ],

  structure: [
    '1. Hook: Start with relatable question or statistic',
    '2. Definition: Explain concept in simple terms',
    '3. Deep Dive: Key features, types, examples',
    '4. Practical: How-to steps, tips, calculations',
    '5. Warnings: Common mistakes, what to avoid',
    '6. Summary: Key takeaways, action items'
  ]
};

export default {
  lessonTemplate,
  quizTemplates,
  indianContext,
  writingTips
};
