/**
 * Module 4: Saving & Budgeting
 * Complete lesson content with quizzes
 * 
 * Topics: Budget Planning, 50-30-20 Rule, Emergency Fund, Saving Goals, Expense Tracking
 */

export const module4Content = {
  title: 'Saving & Budgeting',
  lessons: [
    {
      id: 0,
      title: 'Budget Planning Basics',
      subtitle: 'Master the Art of Managing Your Money',
      duration: '7 mins',
      content: `
        <h3>What is Budgeting?</h3>
        <p>Budgeting is a financial plan that helps you track income and expenses, ensuring you live within your means while saving for future goals. It's the foundation of financial success!</p>
        
        <h4>Why Budget is Important:</h4>
        <ul>
          <li><strong>Control Your Money:</strong> Know where every rupee goes</li>
          <li><strong>Avoid Debt:</strong> Spend less than you earn</li>
          <li><strong>Achieve Goals:</strong> Save systematically for big purchases</li>
          <li><strong>Build Wealth:</strong> Invest surplus money for growth</li>
          <li><strong>Reduce Stress:</strong> Financial clarity brings peace of mind</li>
          <li><strong>Emergency Ready:</strong> Buffer for unexpected expenses</li>
        </ul>

        <h4>Steps to Create Your First Budget:</h4>
        
        <h5>Step 1: Calculate Monthly Income</h5>
        <ul>
          <li><strong>Salary:</strong> In-hand salary (after tax deduction)</li>
          <li><strong>Freelance Income:</strong> Average monthly earnings</li>
          <li><strong>Rental Income:</strong> Property rent received</li>
          <li><strong>Interest Income:</strong> From FD, savings account</li>
          <li><strong>Other Sources:</strong> Part-time work, investments</li>
        </ul>
        <p><strong>Example:</strong> Rahul's monthly income = ₹50,000 (salary) + ₹5,000 (freelance) = ₹55,000</p>

        <h5>Step 2: List All Expenses</h5>
        <p><strong>Fixed Expenses (Same every month):</strong></p>
        <ul>
          <li>Rent/EMI: ₹15,000</li>
          <li>Loan EMIs: ₹8,000</li>
          <li>Insurance premiums: ₹2,000</li>
          <li>Mobile/Internet: ₹1,000</li>
          <li>SIP/Investments: ₹5,000</li>
        </ul>

        <p><strong>Variable Expenses (Changes monthly):</strong></p>
        <ul>
          <li>Groceries: ₹6,000</li>
          <li>Electricity/Water: ₹2,000</li>
          <li>Transportation: ₹3,000</li>
          <li>Food/Dining out: ₹4,000</li>
          <li>Entertainment: ₹2,000</li>
          <li>Shopping: ₹3,000</li>
          <li>Miscellaneous: ₹2,000</li>
        </ul>

        <h5>Step 3: Calculate Surplus/Deficit</h5>
        <p><strong>Total Income:</strong> ₹55,000<br>
        <strong>Total Expenses:</strong> ₹53,000<br>
        <strong>Surplus:</strong> ₹2,000 (Can save/invest this!)</p>

        <p>If expenses exceed income, you have a <strong>deficit</strong> – cut unnecessary expenses immediately!</p>

        <h5>Step 4: Categorize Expenses</h5>
        <ul>
          <li><strong>Needs (50%):</strong> Rent, food, utilities, transport, insurance</li>
          <li><strong>Wants (30%):</strong> Entertainment, shopping, dining out, hobbies</li>
          <li><strong>Savings (20%):</strong> Emergency fund, investments, retirement</li>
        </ul>

        <h4>Common Budgeting Methods:</h4>
        
        <h5>1. Zero-Based Budget</h5>
        <p>Every rupee is assigned a purpose. Income - Expenses = 0</p>
        <ul>
          <li>Best for: Detail-oriented people</li>
          <li>Effort: High (track every expense)</li>
          <li>Control: Maximum</li>
        </ul>

        <h5>2. Envelope Method</h5>
        <p>Allocate cash in envelopes for different categories. When envelope empty, stop spending!</p>
        <ul>
          <li>Best for: Overspenders, cash users</li>
          <li>Effort: Medium</li>
          <li>Control: High (physical limit)</li>
        </ul>

        <h5>3. 50-30-20 Rule</h5>
        <p>50% needs, 30% wants, 20% savings – simple and flexible</p>
        <ul>
          <li>Best for: Beginners</li>
          <li>Effort: Low</li>
          <li>Control: Medium</li>
        </ul>

        <h5>4. Pay Yourself First</h5>
        <p>Save first, then spend remainder on needs and wants</p>
        <ul>
          <li>Best for: Goal-focused savers</li>
          <li>Effort: Low</li>
          <li>Priority: Savings</li>
        </ul>

        <h4>Budget Mistakes to Avoid:</h4>
        <ul>
          <li>❌ Not tracking small expenses (₹50 coffee daily = ₹1,500/month!)</li>
          <li>❌ Forgetting annual expenses (insurance, subscriptions)</li>
          <li>❌ Being too strict (allow some flexibility)</li>
          <li>❌ Not reviewing budget monthly</li>
          <li>❌ No emergency buffer</li>
          <li>❌ Ignoring credit card spending</li>
          <li>❌ Budget without goals</li>
        </ul>

        <h4>Tips for Budget Success:</h4>
        <ul>
          <li>✅ Use budgeting apps (Walnut, Money Manager, ET Money)</li>
          <li>✅ Set realistic targets</li>
          <li>✅ Review and adjust monthly</li>
          <li>✅ Automate savings (auto-debit to RD/SIP)</li>
          <li>✅ Track expenses daily</li>
          <li>✅ Involve family in budgeting</li>
          <li>✅ Celebrate small wins</li>
          <li>✅ Be consistent</li>
        </ul>

        <h4>Sample Monthly Budget (₹50,000 income):</h4>
        <table>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>%</th>
          </tr>
          <tr>
            <td><strong>NEEDS (50%)</strong></td>
            <td><strong>₹25,000</strong></td>
            <td><strong>50%</strong></td>
          </tr>
          <tr>
            <td>Rent</td>
            <td>₹12,000</td>
            <td>24%</td>
          </tr>
          <tr>
            <td>Groceries</td>
            <td>₹5,000</td>
            <td>10%</td>
          </tr>
          <tr>
            <td>Utilities</td>
            <td>₹2,000</td>
            <td>4%</td>
          </tr>
          <tr>
            <td>Transportation</td>
            <td>₹3,000</td>
            <td>6%</td>
          </tr>
          <tr>
            <td>Insurance</td>
            <td>₹2,000</td>
            <td>4%</td>
          </tr>
          <tr>
            <td>Loan EMI</td>
            <td>₹1,000</td>
            <td>2%</td>
          </tr>
          <tr>
            <td><strong>WANTS (30%)</strong></td>
            <td><strong>₹15,000</strong></td>
            <td><strong>30%</strong></td>
          </tr>
          <tr>
            <td>Dining Out</td>
            <td>₹4,000</td>
            <td>8%</td>
          </tr>
          <tr>
            <td>Entertainment</td>
            <td>₹3,000</td>
            <td>6%</td>
          </tr>
          <tr>
            <td>Shopping</td>
            <td>₹5,000</td>
            <td>10%</td>
          </tr>
          <tr>
            <td>Hobbies</td>
            <td>₹3,000</td>
            <td>6%</td>
          </tr>
          <tr>
            <td><strong>SAVINGS (20%)</strong></td>
            <td><strong>₹10,000</strong></td>
            <td><strong>20%</strong></td>
          </tr>
          <tr>
            <td>Emergency Fund</td>
            <td>₹4,000</td>
            <td>8%</td>
          </tr>
          <tr>
            <td>Investments (SIP)</td>
            <td>₹5,000</td>
            <td>10%</td>
          </tr>
          <tr>
            <td>Retirement (PPF)</td>
            <td>₹1,000</td>
            <td>2%</td>
          </tr>
        </table>
      `,
      keyPoints: [
        'Budget = Income - Expenses. Track both to stay in control',
        'Use 50-30-20 rule: 50% needs, 30% wants, 20% savings',
        'Review and adjust budget monthly based on actual spending',
        'Automate savings first, then spend from remainder'
      ],
      quiz: [
        {
          type: 'calculation',
          question: 'Priya earns ₹60,000/month. She spends ₹30,000 on needs, ₹18,000 on wants, and saves ₹10,000. What percentage is she saving?',
          options: ['16.67%', '18%', '20%', '25%'],
          correct: 0,
          explanation: 'Savings percentage = (₹10,000 / ₹60,000) × 100 = 16.67%. Priya is saving less than the recommended 20%. She should reduce wants spending to increase savings.'
        },
        {
          type: 'mcq',
          question: 'Which budgeting method requires you to allocate every rupee of income to a specific purpose?',
          options: ['Envelope Method', 'Zero-Based Budget', '50-30-20 Rule', 'Pay Yourself First'],
          correct: 1,
          explanation: 'Zero-Based Budget requires every rupee to be assigned a purpose, making Income - Expenses = 0. It gives maximum control but requires detailed tracking.'
        },
        {
          type: 'scenario',
          question: 'Amit spends ₹50 on coffee daily at work. How much is this costing him annually?',
          context: 'He works 25 days a month, 12 months a year.',
          options: ['₹12,000', '₹15,000', '₹18,000', '₹21,000'],
          correct: 1,
          explanation: '₹50 × 25 days × 12 months = ₹15,000 per year! Small daily expenses add up significantly. Making coffee at home could save ₹15,000 annually.'
        },
        {
          type: 'truefalse',
          question: 'In the 50-30-20 rule, credit card EMI payments should be categorized under "Wants" (30%).',
          options: ['True', 'False'],
          correct: 1,
          explanation: 'False! Credit card EMI payments are debt obligations and should be categorized under "Needs" (50%), not wants. Reducing debt is a financial necessity, not a discretionary expense.'
        },
        {
          type: 'mcq',
          question: 'What is the FIRST step in creating a budget?',
          options: [
            'List all expenses',
            'Calculate total income',
            'Set savings goals',
            'Download budgeting app'
          ],
          correct: 1,
          explanation: 'First, calculate your total monthly income (salary + other sources). You need to know how much money is coming in before planning how to allocate it.'
        },
        {
          type: 'scenario',
          question: 'Sneha earns ₹40,000/month but spends ₹45,000. What should she do FIRST?',
          context: 'She has no emergency fund and ₹20,000 in credit card debt.',
          options: [
            'Take a personal loan',
            'Immediately cut non-essential expenses',
            'Increase credit card limit',
            'Start investing in stocks'
          ],
          correct: 1,
          explanation: 'Sneha has a ₹5,000 deficit – she\'s spending more than earning! First priority is cutting non-essential "wants" spending to stop increasing debt. Then focus on paying off credit card debt.'
        }
      ]
    },
    {
      id: 1,
      title: '50-30-20 Rule',
      subtitle: 'Simple Formula for Financial Balance',
      duration: '6 mins',
      content: `
        <h3>What is the 50-30-20 Rule?</h3>
        <p>The 50-30-20 rule is a simple budgeting framework that divides your after-tax income into three categories: 50% for needs, 30% for wants, and 20% for savings and debt repayment. It's beginner-friendly and flexible!</p>
        
        <h4>The Three Categories:</h4>
        
        <h5>50% - NEEDS (Essential Expenses)</h5>
        <p>Expenses you cannot avoid for basic living:</p>
        <ul>
          <li><strong>Housing:</strong> Rent, home loan EMI, property tax</li>
          <li><strong>Food:</strong> Groceries, basic meals (not dining out)</li>
          <li><strong>Utilities:</strong> Electricity, water, gas, internet</li>
          <li><strong>Transportation:</strong> Commute costs, fuel, public transport</li>
          <li><strong>Insurance:</strong> Health, life, vehicle insurance premiums</li>
          <li><strong>Minimum Loan Payments:</strong> EMIs you must pay</li>
          <li><strong>Healthcare:</strong> Regular medicines, doctor visits</li>
          <li><strong>Childcare/Education:</strong> School fees, daycare</li>
        </ul>
        <p><strong>Important:</strong> If your needs exceed 50%, your lifestyle is too expensive for your income. Consider downsizing rent, using public transport, or increasing income.</p>

        <h5>30% - WANTS (Discretionary Spending)</h5>
        <p>Non-essential expenses that improve quality of life:</p>
        <ul>
          <li><strong>Entertainment:</strong> Movies, concerts, OTT subscriptions</li>
          <li><strong>Dining Out:</strong> Restaurants, cafes, food delivery</li>
          <li><strong>Shopping:</strong> Clothes, gadgets, accessories (beyond basic needs)</li>
          <li><strong>Hobbies:</strong> Gym, sports, music classes, gaming</li>
          <li><strong>Travel:</strong> Vacations, weekend trips</li>
          <li><strong>Luxury Items:</strong> Latest phone, premium brands</li>
          <li><strong>Personal Care:</strong> Salon, spa, grooming (beyond basic)</li>
        </ul>
        <p><strong>Flexibility Zone:</strong> This is where you adjust when you need to save more. Cut wants, not needs!</p>

        <h5>20% - SAVINGS & DEBT PAYMENT</h5>
        <p>Building wealth and financial security:</p>
        <ul>
          <li><strong>Emergency Fund:</strong> 6 months of expenses in liquid savings</li>
          <li><strong>Retirement:</strong> PPF, NPS, EPF contributions</li>
          <li><strong>Investments:</strong> Mutual fund SIPs, stocks, gold</li>
          <li><strong>Debt Repayment:</strong> Extra payments beyond minimum EMI</li>
          <li><strong>Goal-Based Savings:</strong> House down payment, child education</li>
          <li><strong>Fixed Deposits:</strong> Tax-saver FD, regular FD</li>
        </ul>
        <p><strong>Golden Rule:</strong> Save FIRST, spend LATER. Automate your savings!</p>

        <h4>Example 1: ₹50,000 Monthly Income</h4>
        <table>
          <tr>
            <th>Category</th>
            <th>Allocation</th>
            <th>Examples</th>
          </tr>
          <tr>
            <td><strong>Needs (50%)</strong></td>
            <td><strong>₹25,000</strong></td>
            <td>
              • Rent: ₹12,000<br>
              • Groceries: ₹5,000<br>
              • Utilities: ₹2,000<br>
              • Transport: ₹3,000<br>
              • Insurance: ₹2,000<br>
              • Loan EMI: ₹1,000
            </td>
          </tr>
          <tr>
            <td><strong>Wants (30%)</strong></td>
            <td><strong>₹15,000</strong></td>
            <td>
              • Dining out: ₹4,000<br>
              • Entertainment: ₹3,000<br>
              • Shopping: ₹5,000<br>
              • Hobbies: ₹3,000
            </td>
          </tr>
          <tr>
            <td><strong>Savings (20%)</strong></td>
            <td><strong>₹10,000</strong></td>
            <td>
              • Emergency fund: ₹4,000<br>
              • SIP: ₹5,000<br>
              • PPF: ₹1,000
            </td>
          </tr>
        </table>

        <h4>Example 2: ₹1,00,000 Monthly Income</h4>
        <ul>
          <li><strong>Needs (50%):</strong> ₹50,000 (Rent ₹25K, Bills ₹10K, Food ₹8K, Transport ₹4K, Insurance ₹3K)</li>
          <li><strong>Wants (30%):</strong> ₹30,000 (Travel ₹10K, Shopping ₹8K, Dining ₹7K, Entertainment ₹5K)</li>
          <li><strong>Savings (20%):</strong> ₹20,000 (Emergency ₹5K, SIP ₹10K, PPF ₹3K, RD ₹2K)</li>
        </ul>

        <h4>How to Implement 50-30-20 Rule:</h4>
        
        <h5>Step 1: Calculate After-Tax Income</h5>
        <p>Use your in-hand salary (after PF, TDS deductions). Don't use gross salary!</p>
        <p><strong>Example:</strong> Gross ₹70,000, In-hand ₹60,000 → Use ₹60,000 for calculations</p>

        <h5>Step 2: Calculate Each Category</h5>
        <ul>
          <li>Needs: ₹60,000 × 50% = ₹30,000</li>
          <li>Wants: ₹60,000 × 30% = ₹18,000</li>
          <li>Savings: ₹60,000 × 20% = ₹12,000</li>
        </ul>

        <h5>Step 3: Track Your Spending</h5>
        <p>For one month, categorize every expense as Need, Want, or Savings. Use apps or spreadsheet.</p>

        <h5>Step 4: Adjust as Needed</h5>
        <p>If needs exceed 50%, look for ways to reduce (cheaper rent, less expensive phone plan). If wants exceed 30%, cut discretionary spending.</p>

        <h4>Variations of the Rule:</h4>
        
        <h5>For High Earners: 50-30-20</h5>
        <p>If income is high, needs might be less than 50%. Consider:</p>
        <ul>
          <li><strong>40-30-30:</strong> 40% needs, 30% wants, 30% savings</li>
          <li><strong>50-20-30:</strong> 50% needs, 20% wants, 30% savings (aggressive)</li>
        </ul>

        <h5>For Tight Budgets: 60-20-20 or 70-20-10</h5>
        <p>If costs are high relative to income (expensive city, family obligations):</p>
        <ul>
          <li><strong>60-20-20:</strong> 60% needs, 20% wants, 20% savings (temporary)</li>
          <li>Work on increasing income or reducing needs to get to 50-30-20</li>
        </ul>

        <h5>For Aggressive Savers: 50-20-30</h5>
        <p>Want to reach financial goals faster?</p>
        <ul>
          <li>Reduce wants to 20%</li>
          <li>Increase savings to 30%</li>
          <li>Great for: Early retirement, buying house, starting business</li>
        </ul>

        <h4>Common Challenges & Solutions:</h4>
        
        <h5>Challenge 1: "My needs are 70%, not 50%!"</h5>
        <p><strong>Solutions:</strong></p>
        <ul>
          <li>Find cheaper accommodation or get a roommate</li>
          <li>Use public transport instead of personal vehicle</li>
          <li>Cook at home, reduce food delivery</li>
          <li>Negotiate better insurance rates</li>
          <li>Increase income through side hustle</li>
        </ul>

        <h5>Challenge 2: "I can't differentiate needs vs wants"</h5>
        <p><strong>Ask yourself:</strong> "Will I survive without this?" If yes, it's a want!</p>
        <ul>
          <li>Basic phone plan = Need | Unlimited 5G data = Want</li>
          <li>Groceries = Need | Dining at restaurant = Want</li>
          <li>Work clothes = Need | Designer clothes = Want</li>
        </ul>

        <h5>Challenge 3: "I have no money left for wants"</h5>
        <p>Your income is too low or needs are too high. Options:</p>
        <ul>
          <li>Increase income (ask for raise, freelance, part-time job)</li>
          <li>Reduce needs (cheaper rent, shared transport)</li>
          <li>Temporary: Use 60-20-20 until situation improves</li>
        </ul>

        <h4>Benefits of 50-30-20 Rule:</h4>
        <ul>
          <li>✅ <strong>Simple:</strong> Easy to understand and implement</li>
          <li>✅ <strong>Flexible:</strong> Adapt percentages to your situation</li>
          <li>✅ <strong>Balanced:</strong> Allows for both saving and enjoyment</li>
          <li>✅ <strong>Automatic:</strong> Works once you set up auto-debit for savings</li>
          <li>✅ <strong>Goal-Oriented:</strong> Clear savings target every month</li>
          <li>✅ <strong>Stress-Free:</strong> No need to track every single rupee</li>
        </ul>
      `,
      keyPoints: [
        '50% for needs (rent, food, utilities), 30% for wants (entertainment), 20% for savings',
        'If needs exceed 50%, your lifestyle is too expensive – reduce costs or increase income',
        'Adjust percentages based on your situation: 40-30-30 for high earners, 60-20-20 temporarily for tight budgets',
        'Automate your 20% savings first, then spend the remainder guilt-free'
      ],
      quiz: [
        {
          type: 'calculation',
          question: 'Maya earns ₹80,000/month. Using 50-30-20 rule, how much should she allocate for wants?',
          options: ['₹16,000', '₹20,000', '₹24,000', '₹28,000'],
          correct: 2,
          explanation: 'Wants = 30% of income = ₹80,000 × 0.30 = ₹24,000. This is her budget for dining out, entertainment, shopping, and other non-essential expenses.'
        },
        {
          type: 'mcq',
          question: 'Which of these should be categorized as a "NEED" (50%) in the 50-30-20 rule?',
          options: [
            'Netflix subscription',
            'Weekend vacation',
            'Health insurance premium',
            'Designer handbag'
          ],
          correct: 2,
          explanation: 'Health insurance premium is a NEED – it protects you from financial disaster during medical emergencies. Netflix, vacations, and designer items are WANTS.'
        },
        {
          type: 'scenario',
          question: 'Rahul earns ₹50,000/month but spends ₹32,000 on rent, food, and bills (needs). What should he do?',
          context: 'His needs are 64% of income, exceeding the 50% recommendation.',
          options: [
            'Continue as is – 64% is fine',
            'Find cheaper rent or get a roommate',
            'Stop saving completely',
            'Take a loan to cover expenses'
          ],
          correct: 1,
          explanation: 'Rahul\'s needs are consuming 64% of income, leaving only 36% for wants and savings combined. He should reduce his biggest expense (rent) by finding cheaper accommodation or getting a roommate to bring needs under 50%.'
        },
        {
          type: 'truefalse',
          question: 'According to the 50-30-20 rule, if you want to save more aggressively, you should reduce money allocated to "needs".',
          options: ['True', 'False'],
          correct: 1,
          explanation: 'False! Never compromise on needs (food, shelter, insurance). To save more, reduce WANTS (30% category) and increase savings. For example, use 50-20-30 (reduce wants to 20%, increase savings to 30%).'
        },
        {
          type: 'mcq',
          question: 'Priya earns ₹1,00,000/month and her needs cost only ₹35,000 (35%). What should she do with the extra 15%?',
          options: [
            'Increase wants spending to 45%',
            'Move it to savings, making it 35%',
            'Split between wants and savings',
            'Let it accumulate in savings account'
          ],
          correct: 1,
          explanation: 'Since Priya\'s needs are only 35% (below the 50% limit), she should move the extra 15% to SAVINGS, making it 35% total. This accelerates wealth building. She can use 35-30-35 or even 35-25-40 for aggressive saving.'
        },
        {
          type: 'scenario',
          question: 'Which expense category should be your FIRST priority when following the 50-30-20 rule?',
          context: 'You just received your salary and need to allocate funds.',
          options: [
            'Pay for needs (50%)',
            'Allocate for wants (30%)',
            'Transfer to savings (20%)',
            'Spend freely, save what\'s left'
          ],
          correct: 2,
          explanation: 'ALWAYS save first! Transfer 20% to savings/investment accounts immediately when salary arrives. This is "Pay Yourself First" principle. Then use 50% for needs and 30% for wants from the remainder.'
        }
      ]
    },
    {
      id: 2,
      title: 'Emergency Fund',
      subtitle: 'Your Financial Safety Net',
      duration: '7 mins',
      content: `
        <h3>What is an Emergency Fund?</h3>
        <p>An emergency fund is money set aside specifically for unexpected expenses or financial emergencies. It's your safety net that prevents you from going into debt when life throws curveballs!</p>
        
        <h4>Why You NEED an Emergency Fund:</h4>
        <ul>
          <li><strong>Job Loss:</strong> Survive 3-6 months without salary while job hunting</li>
          <li><strong>Medical Emergency:</strong> Cover hospital bills not covered by insurance</li>
          <li><strong>Vehicle Repair:</strong> Fix car/bike breakdown without stress</li>
          <li><strong>Home Repairs:</strong> Handle urgent repairs (leaking roof, broken AC)</li>
          <li><strong>Family Emergency:</strong> Travel urgently to hometown</li>
          <li><strong>Avoid Debt:</strong> Don't use credit cards or loans for emergencies</li>
          <li><strong>Peace of Mind:</strong> Sleep better knowing you're financially protected</li>
        </ul>

        <h4>Real-Life Examples:</h4>
        <p><strong>Case 1: Amit's Medical Emergency</strong></p>
        <p>Amit had a sudden appendicitis operation. Total bill: ₹1,50,000. Insurance covered ₹1,00,000. Without emergency fund, he would've taken a personal loan at 15% interest. His ₹2 lakh emergency fund saved him ₹15,000+ in interest!</p>

        <p><strong>Case 2: Priya's Job Loss</strong></p>
        <p>Priya's company shut down unexpectedly. With 6-month emergency fund (₹3 lakhs), she could pay rent, bills, and survive while finding a new job in 4 months without borrowing money.</p>

        <h4>How Much Emergency Fund Do You Need?</h4>
        
        <h5>Recommended Amount:</h5>
        <table>
          <tr>
            <th>Your Situation</th>
            <th>Emergency Fund Size</th>
            <th>Reasoning</th>
          </tr>
          <tr>
            <td>Single, Salaried</td>
            <td>3-4 months expenses</td>
            <td>Lower obligations, easier to find job</td>
          </tr>
          <tr>
            <td>Married, Dual Income</td>
            <td>3-6 months expenses</td>
            <td>More expenses, but two incomes</td>
          </tr>
          <tr>
            <td>Single Income Family</td>
            <td>6-9 months expenses</td>
            <td>Only one earner, more risk</td>
          </tr>
          <tr>
            <td>Self-Employed/Freelancer</td>
            <td>9-12 months expenses</td>
            <td>Irregular income, high uncertainty</td>
          </tr>
          <tr>
            <td>With Dependents (kids/parents)</td>
            <td>9-12 months expenses</td>
            <td>More people to support</td>
          </tr>
        </table>

        <h5>Calculation Example:</h5>
        <p><strong>Monthly Essential Expenses:</strong></p>
        <ul>
          <li>Rent/EMI: ₹15,000</li>
          <li>Groceries: ₹6,000</li>
          <li>Utilities: ₹2,000</li>
          <li>Transport: ₹3,000</li>
          <li>Insurance: ₹2,000</li>
          <li>Loan EMIs: ₹5,000</li>
          <li>Misc. essentials: ₹2,000</li>
        </ul>
        <p><strong>Total Monthly Expenses:</strong> ₹35,000</p>
        <p><strong>Emergency Fund Target (6 months):</strong> ₹35,000 × 6 = <strong>₹2,10,000</strong></p>

        <h4>Where to Keep Your Emergency Fund:</h4>
        
        <h5>✅ Good Options (Liquid + Safe):</h5>
        
        <p><strong>1. Savings Account</strong></p>
        <ul>
          <li><strong>Pros:</strong> Instant access, 100% safe</li>
          <li><strong>Cons:</strong> Low interest (3-4%)</li>
          <li><strong>Recommended:</strong> Keep 1-2 months here</li>
        </ul>

        <p><strong>2. Liquid Mutual Funds</strong></p>
        <ul>
          <li><strong>Pros:</strong> Better returns (4-6%), money in 1 day</li>
          <li><strong>Cons:</strong> Not instant (T+1 settlement)</li>
          <li><strong>Recommended:</strong> Keep 3-4 months here</li>
        </ul>

        <p><strong>3. Sweep-in Fixed Deposit</strong></p>
        <ul>
          <li><strong>Pros:</strong> FD rates (6-7%), breaks automatically when needed</li>
          <li><strong>Cons:</strong> Penalty on premature withdrawal</li>
          <li><strong>Recommended:</strong> Keep 2-3 months here</li>
        </ul>

        <p><strong>4. Fixed Deposits (Short tenure)</strong></p>
        <ul>
          <li><strong>Pros:</strong> Safe, predictable returns (6-7%)</li>
          <li><strong>Cons:</strong> Premature withdrawal penalty</li>
          <li><strong>Recommended:</strong> Keep 1-2 months here</li>
        </ul>

        <h5>❌ Bad Options (Not Liquid or Risky):</h5>
        <ul>
          <li>❌ <strong>Stocks/Equity Mutual Funds:</strong> Too risky, can lose value when you need it</li>
          <li>❌ <strong>Real Estate:</strong> Cannot sell quickly</li>
          <li>❌ <strong>Gold Jewelry:</strong> Making charges, hard to sell at fair price</li>
          <li>❌ <strong>PPF/ELSS:</strong> Lock-in period, not accessible</li>
          <li>❌ <strong>Crypto:</strong> Highly volatile, can lose 50% overnight</li>
        </ul>

        <h4>How to Build Your Emergency Fund:</h4>
        
        <h5>Strategy 1: Small Steps (Beginner Friendly)</h5>
        <p><strong>Goal:</strong> Build ₹1,00,000 in 20 months</p>
        <ol>
          <li>Month 1-2: Save ₹10,000 (starter emergency fund)</li>
          <li>Month 3-8: Add ₹5,000/month (₹30,000 total)</li>
          <li>Month 9-20: Add ₹5,000/month (₹60,000 more)</li>
          <li>Total after 20 months: ₹1,00,000</li>
        </ol>

        <h5>Strategy 2: Aggressive Build</h5>
        <p><strong>Goal:</strong> Build ₹2,00,000 in 10 months</p>
        <ul>
          <li>Set aside salary bonus: ₹40,000</li>
          <li>Save ₹16,000/month for 10 months: ₹1,60,000</li>
          <li>Total: ₹2,00,000</li>
        </ul>

        <h5>Strategy 3: Windfall Method</h5>
        <p>Use unexpected money to jumpstart fund:</p>
        <ul>
          <li>Annual bonus: ₹1,00,000 → Emergency fund</li>
          <li>Tax refund: ₹20,000 → Add to fund</li>
          <li>Incentive/gift money → Add to fund</li>
          <li>Then maintain with monthly contributions</li>
        </ul>

        <h4>Emergency Fund Mistakes to Avoid:</h4>
        <ul>
          <li>❌ <strong>Using it for non-emergencies:</strong> New phone is NOT emergency!</li>
          <li>❌ <strong>Keeping in risky investments:</strong> Stocks can be down when you need money</li>
          <li>❌ <strong>Not replenishing:</strong> After using, rebuild immediately</li>
          <li>❌ <strong>Mixing with other savings:</strong> Keep separate account</li>
          <li>❌ <strong>Waiting to start:</strong> Begin with ₹1,000 if needed, but START!</li>
          <li>❌ <strong>Ignoring inflation:</strong> Increase fund size yearly (5-7%)</li>
        </ul>

        <h4>What Qualifies as an "Emergency"?</h4>
        
        <h5>✅ True Emergencies (Use Fund):</h5>
        <ul>
          <li>Job loss or sudden income drop</li>
          <li>Medical emergency not covered by insurance</li>
          <li>Major home repair (flooding, fire damage)</li>
          <li>Vehicle breakdown (if needed for work)</li>
          <li>Emergency travel for family crisis</li>
          <li>Urgent pet medical care</li>
        </ul>

        <h5>❌ NOT Emergencies (Don't Use Fund):</h5>
        <ul>
          <li>Sale/discount on gadgets or clothes</li>
          <li>Vacation/wedding expenses</li>
          <li>New phone because yours is "old"</li>
          <li>Friend's birthday party</li>
          <li>Planned expenses (annual insurance, car service)</li>
        </ul>

        <h4>Emergency Fund Checklist:</h4>
        <p>Use this to build and maintain your fund:</p>
        <ul>
          <li>☐ Calculate 6 months of essential expenses</li>
          <li>☐ Open separate savings account for emergency fund</li>
          <li>☐ Set up auto-transfer of 10-20% salary to this account</li>
          <li>☐ Reach initial goal of ₹10,000 (mini emergency fund)</li>
          <li>☐ Build to 3 months expenses</li>
          <li>☐ Gradually reach 6 months expenses</li>
          <li>☐ Keep 50% in savings account, 50% in liquid funds</li>
          <li>☐ Review and increase fund annually for inflation</li>
          <li>☐ Never use for non-emergencies</li>
          <li>☐ Replenish within 3 months after using</li>
        </ul>

        <h4>After Building Emergency Fund:</h4>
        <p>Once you have 6 months expenses saved, you can:</p>
        <ul>
          <li>Start aggressive investing for wealth creation</li>
          <li>Increase retirement contributions</li>
          <li>Save for specific goals (house, child education)</li>
          <li>Take calculated investment risks with surplus</li>
          <li>Feel financially secure and sleep peacefully!</li>
        </ul>

        <p><strong>Remember:</strong> Emergency fund is NOT an investment – it's INSURANCE against life's uncertainties!</p>
      `,
      keyPoints: [
        'Emergency fund = 6 months of essential expenses saved for unexpected events',
        'Keep in liquid, safe places: savings account (50%) + liquid funds (50%)',
        'True emergencies: job loss, medical bills, urgent repairs. NOT sales or wants!',
        'Build gradually: Start with ₹10,000, then ₹5,000/month until target reached'
      ],
      quiz: [
        {
          type: 'calculation',
          question: 'Rahul\'s monthly essential expenses are ₹40,000. He\'s married with one kid. How much emergency fund does he need?',
          options: ['₹1,20,000', '₹2,40,000', '₹3,00,000', '₹3,60,000'],
          correct: 1,
          explanation: 'Married with kids = 6 months expenses recommended. ₹40,000 × 6 = ₹2,40,000. Single income families should aim for 6-9 months for better safety.'
        },
        {
          type: 'scenario',
          question: 'Priya has ₹1,50,000 emergency fund. iPhone 15 is on sale at ₹60,000 (₹20,000 discount). Should she use emergency fund?',
          context: 'Her phone is 2 years old and works fine.',
          options: [
            'Yes, it\'s a great deal!',
            'No, this is not an emergency',
            'Yes, but only if she replenishes next month',
            'Yes, phone is essential'
          ],
          correct: 1,
          explanation: 'Absolutely NO! A sale on a phone is NOT an emergency. Her current phone works fine. Emergency fund is only for unexpected, unavoidable expenses like job loss or medical bills – not for wants or planned purchases!'
        },
        {
          type: 'mcq',
          question: 'Where should you NOT keep your emergency fund?',
          options: [
            'Savings bank account',
            'Liquid mutual funds',
            'Equity mutual funds',
            'Sweep-in fixed deposit'
          ],
          correct: 2,
          explanation: 'Never keep emergency fund in equity mutual funds or stocks! They\'re too volatile – when you need money urgently (job loss, medical emergency), the market might be down 30%, forcing you to sell at a loss.'
        },
        {
          type: 'truefalse',
          question: 'Once you build your emergency fund, you never need to touch it or add to it again.',
          options: ['True', 'False'],
          correct: 1,
          explanation: 'False! You must: (1) Replenish immediately after using it for emergencies, (2) Increase it annually for inflation (5-7% yearly), and (3) Adjust if your expenses or family size increases.'
        },
        {
          type: 'mcq',
          question: 'Amit is a freelancer with irregular income. How many months of expenses should his emergency fund cover?',
          options: ['3 months', '6 months', '9-12 months', '12-18 months'],
          correct: 2,
          explanation: 'Freelancers and self-employed people face income uncertainty and should have 9-12 months of expenses saved. Salaried people with stable jobs can manage with 6 months.'
        },
        {
          type: 'scenario',
          question: 'Sneha has ₹50,000 saved. Should she invest it in stocks or keep it as emergency fund?',
          context: 'She has no other savings and earns ₹35,000/month.',
          options: [
            'Invest in stocks for higher returns',
            'Keep ₹50,000 as emergency fund',
            'Put ₹25,000 in stocks, ₹25,000 in emergency fund',
            'Buy gold jewelry'
          ],
          correct: 1,
          explanation: 'Sneha must keep the entire ₹50,000 as emergency fund! This covers only 1.4 months of salary. She needs at least 6 months (₹2,10,000 minimum). Only after building adequate emergency fund should she invest in stocks.'
        }
      ]
    },
    {
      id: 3,
      title: 'Setting Saving Goals',
      subtitle: 'Turn Dreams into Achievable Financial Targets',
      duration: '6 mins',
      content: `
        <h3>What are Saving Goals?</h3>
        <p>Saving goals are specific financial targets you set for future needs or wants. Instead of saving aimlessly, goal-based saving gives purpose, motivation, and a clear timeline to your savings journey.</p>
        
        <h4>Why Set Saving Goals?</h4>
        <ul>
          <li><strong>Motivation:</strong> Clear target keeps you focused</li>
          <li><strong>Discipline:</strong> Less likely to spend impulsively</li>
          <li><strong>Better Planning:</strong> Know exactly how much to save monthly</li>
          <li><strong>Right Investment:</strong> Choose investments based on goal timeline</li>
          <li><strong>Achievement Satisfaction:</strong> Feel accomplished when goals are met</li>
          <li><strong>Priority Management:</strong> Focus on important goals first</li>
        </ul>

        <h4>Types of Saving Goals:</h4>
        
        <h5>1. Short-Term Goals (0-2 years)</h5>
        <p><strong>Examples:</strong></p>
        <ul>
          <li>Vacation trip (₹50,000 - ₹1,00,000)</li>
          <li>New phone/laptop (₹30,000 - ₹80,000)</li>
          <li>Festival shopping (₹20,000 - ₹50,000)</li>
          <li>Home appliances (₹15,000 - ₹60,000)</li>
          <li>Wedding gift/expense (₹50,000+)</li>
        </ul>
        <p><strong>Where to Save:</strong> Savings account, liquid funds, short-term FD</p>

        <h5>2. Medium-Term Goals (2-5 years)</h5>
        <p><strong>Examples:</strong></p>
        <ul>
          <li>Car/bike purchase (₹3,00,000 - ₹8,00,000)</li>
          <li>Marriage expenses (₹5,00,000 - ₹15,00,000)</li>
          <li>Higher education course (₹2,00,000 - ₹10,00,000)</li>
          <li>Home down payment (₹5,00,000 - ₹20,00,000)</li>
          <li>Starting a business (₹3,00,000 - ₹10,00,000)</li>
        </ul>
        <p><strong>Where to Save:</strong> Debt mutual funds, FD, recurring deposits, balanced funds</p>

        <h5>3. Long-Term Goals (5+ years)</h5>
        <p><strong>Examples:</strong></p>
        <ul>
          <li>Retirement corpus (₹1 crore - ₹5 crore)</li>
          <li>Child's education (₹25 lakhs - ₹1 crore)</li>
          <li>Buying a house (₹30 lakhs - ₹2 crore)</li>
          <li>Child's marriage (₹20 lakhs - ₹50 lakhs)</li>
          <li>Financial independence (₹2 crore+)</li>
        </ul>
        <p><strong>Where to Save:</strong> Equity mutual funds, PPF, NPS, stocks, real estate</p>

        <h4>SMART Goal Framework:</h4>
        <p>Make your goals SMART for better success:</p>
        
        <h5>S - Specific</h5>
        <ul>
          <li>❌ Bad: "I want to buy a car"</li>
          <li>✅ Good: "I want to buy Honda City worth ₹12 lakhs"</li>
        </ul>

        <h5>M - Measurable</h5>
        <ul>
          <li>❌ Bad: "Save some money for vacation"</li>
          <li>✅ Good: "Save ₹80,000 for Thailand trip"</li>
        </ul>

        <h5>A - Achievable</h5>
        <ul>
          <li>❌ Bad: "Buy ₹1 crore house in 1 year with ₹30K salary"</li>
          <li>✅ Good: "Save ₹15 lakhs down payment in 5 years"</li>
        </ul>

        <h5>R - Relevant</h5>
        <ul>
          <li>❌ Bad: Save for sports car when you need family car</li>
          <li>✅ Good: Save for family car that fits needs and budget</li>
        </ul>

        <h5>T - Time-Bound</h5>
        <ul>
          <li>❌ Bad: "Save for house someday"</li>
          <li>✅ Good: "Save ₹20 lakhs down payment by December 2028"</li>
        </ul>

        <h4>How to Calculate Monthly Savings Needed:</h4>
        
        <h5>Example 1: Vacation Goal (Short-term)</h5>
        <p><strong>Goal:</strong> Europe trip in 18 months<br>
        <strong>Cost:</strong> ₹2,50,000<br>
        <strong>Current Savings:</strong> ₹50,000<br>
        <strong>Need to Save:</strong> ₹2,00,000<br>
        <strong>Timeline:</strong> 18 months<br>
        <strong>Monthly Savings:</strong> ₹2,00,000 ÷ 18 = ₹11,111</p>

        <h5>Example 2: Car Purchase (Medium-term)</h5>
        <p><strong>Goal:</strong> Buy car in 4 years<br>
        <strong>Cost:</strong> ₹8,00,000<br>
        <strong>Down Payment Needed (20%):</strong> ₹1,60,000<br>
        <strong>Current Savings:</strong> ₹20,000<br>
        <strong>Need to Save:</strong> ₹1,40,000<br>
        <strong>Timeline:</strong> 48 months<br>
        <strong>Monthly Savings:</strong> ₹1,40,000 ÷ 48 = ₹2,917<br>
        <strong>With Investment Returns (8%):</strong> Save ₹2,500/month</p>

        <h5>Example 3: Child Education (Long-term)</h5>
        <p><strong>Goal:</strong> College fund in 15 years<br>
        <strong>Cost Today:</strong> ₹25 lakhs<br>
        <strong>Cost After Inflation (7%):</strong> ₹69 lakhs<br>
        <strong>Timeline:</strong> 15 years<br>
        <strong>Expected Returns:</strong> 12% (equity mutual funds)<br>
        <strong>Monthly SIP Needed:</strong> ₹14,500</p>

        [COMPOUND_INTEREST_CALCULATOR]

        <h4>Prioritizing Multiple Goals:</h4>
        
        <h5>Priority 1: Essential Goals (Must Do)</h5>
        <ul>
          <li>Emergency fund (6 months expenses)</li>
          <li>Health insurance</li>
          <li>Life insurance (if dependents)</li>
          <li>Retirement savings</li>
          <li>Loan/debt repayment</li>
        </ul>

        <h5>Priority 2: Important Goals (Should Do)</h5>
        <ul>
          <li>Child's education fund</li>
          <li>House down payment</li>
          <li>Parents' medical care fund</li>
          <li>Skill development courses</li>
        </ul>

        <h5>Priority 3: Lifestyle Goals (Nice to Have)</h5>
        <ul>
          <li>Vacation fund</li>
          <li>Car upgrade</li>
          <li>Gadgets and electronics</li>
          <li>Home renovation</li>
        </ul>

        <h4>Goal-Based Savings Strategy:</h4>
        
        <h5>Step 1: List All Goals</h5>
        <p>Write down everything you want to save for with approximate costs</p>

        <h5>Step 2: Categorize by Timeline</h5>
        <p>Short-term (0-2 years), Medium-term (2-5 years), Long-term (5+ years)</p>

        <h5>Step 3: Estimate Costs</h5>
        <p>Research actual costs, add inflation buffer</p>

        <h5>Step 4: Calculate Monthly Savings</h5>
        <p>For each goal, calculate how much to save monthly</p>

        <h5>Step 5: Choose Investment Vehicles</h5>
        <ul>
          <li>Short-term → Savings account, liquid funds</li>
          <li>Medium-term → Debt funds, FD, balanced funds</li>
          <li>Long-term → Equity funds, PPF, NPS</li>
        </ul>

        <h5>Step 6: Automate Savings</h5>
        <p>Set up auto-debit for each goal on salary day</p>

        <h5>Step 7: Review Quarterly</h5>
        <p>Track progress, adjust if needed</p>

        <h4>Sample Multi-Goal Plan:</h4>
        <p><strong>Profile:</strong> 28-year-old, earning ₹60,000/month</p>
        
        <table>
          <tr>
            <th>Goal</th>
            <th>Timeline</th>
            <th>Target Amount</th>
            <th>Monthly Savings</th>
            <th>Investment</th>
          </tr>
          <tr>
            <td>Emergency Fund</td>
            <td>12 months</td>
            <td>₹2,40,000</td>
            <td>₹5,000</td>
            <td>Savings + Liquid fund</td>
          </tr>
          <tr>
            <td>Vacation</td>
            <td>18 months</td>
            <td>₹1,00,000</td>
            <td>₹5,500</td>
            <td>RD</td>
          </tr>
          <tr>
            <td>Car Down Payment</td>
            <td>4 years</td>
            <td>₹2,00,000</td>
            <td>₹3,500</td>
            <td>Debt funds</td>
          </tr>
          <tr>
            <td>Retirement</td>
            <td>32 years</td>
            <td>₹3 crores</td>
            <td>₹8,000</td>
            <td>Equity SIP + NPS</td>
          </tr>
          <tr>
            <td><strong>Total</strong></td>
            <td>-</td>
            <td>-</td>
            <td><strong>₹22,000</strong></td>
            <td>-</td>
          </tr>
        </table>

        <h4>Common Mistakes to Avoid:</h4>
        <ul>
          <li>❌ Too many goals at once (spreads money too thin)</li>
          <li>❌ Unrealistic timelines (₹50 lakh house in 2 years with ₹30K salary)</li>
          <li>❌ Not adjusting for inflation</li>
          <li>❌ Wrong investment choice (stocks for 1-year goal)</li>
          <li>❌ No emergency fund before other goals</li>
          <li>❌ Not reviewing progress regularly</li>
          <li>❌ Dipping into goal savings for other expenses</li>
        </ul>

        <h4>Goal Achievement Tips:</h4>
        <ul>
          <li>✅ Visualize your goal (pictures, vision board)</li>
          <li>✅ Separate bank accounts for each major goal</li>
          <li>✅ Automate savings on salary day</li>
          <li>✅ Track progress monthly (use apps or spreadsheet)</li>
          <li>✅ Celebrate milestones (25%, 50%, 75% complete)</li>
          <li>✅ Increase savings with salary hikes</li>
          <li>✅ Use bonuses/windfalls for goals</li>
          <li>✅ Stay flexible (adjust if circumstances change)</li>
        </ul>

        <h4>What to Do When Goal is Achieved:</h4>
        <ol>
          <li>Celebrate your success! 🎉</li>
          <li>Evaluate what worked well</li>
          <li>Set your next goal</li>
          <li>Maintain the savings habit</li>
          <li>Help others with your learnings</li>
        </ol>
      `,
      keyPoints: [
        'Set SMART goals: Specific, Measurable, Achievable, Relevant, Time-bound',
        'Categorize by timeline: Short (0-2 yrs), Medium (2-5 yrs), Long (5+ yrs)',
        'Prioritize: Emergency fund first, then essential goals, finally lifestyle goals',
        'Automate savings and track progress monthly for each goal'
      ],
      quiz: [
        {
          type: 'calculation',
          question: 'Amit wants to save ₹3,00,000 for a vacation in 24 months. He has ₹50,000 already saved. How much should he save monthly?',
          options: ['₹10,417', '₹12,500', '₹15,000', '₹10,000'],
          correct: 0,
          explanation: 'Need to save: ₹3,00,000 - ₹50,000 = ₹2,50,000. Timeline: 24 months. Monthly savings = ₹2,50,000 ÷ 24 = ₹10,417.'
        },
        {
          type: 'mcq',
          question: 'Which investment is MOST suitable for a short-term goal (1 year timeline)?',
          options: [
            'Equity mutual funds',
            'Stocks',
            'Liquid funds and savings account',
            'Real estate'
          ],
          correct: 2,
          explanation: 'For short-term goals (less than 2 years), use liquid and safe options like savings accounts, liquid funds, or short-term FDs. Stocks and equity funds are too risky for short timelines.'
        },
        {
          type: 'scenario',
          question: 'Priya earns ₹50,000/month. She wants to save for: retirement (₹10K/month), car (₹5K/month), vacation (₹3K/month), gadgets (₹4K/month). What should she prioritize?',
          context: 'She has no emergency fund yet.',
          options: [
            'Start all four goals equally',
            'Build emergency fund first, then retirement',
            'Focus only on vacation (shortest timeline)',
            'Prioritize car (biggest purchase)'
          ],
          correct: 1,
          explanation: 'ALWAYS build emergency fund FIRST (6 months expenses = ₹2-3 lakhs). Then focus on retirement since it\'s long-term and benefits from compounding. Vacation and gadgets can wait – they\'re lifestyle goals, not essentials.'
        },
        {
          type: 'truefalse',
          question: 'When setting financial goals, you should ignore inflation because it\'s unpredictable.',
          options: ['True', 'False'],
          correct: 1,
          explanation: 'False! Always factor inflation into long-term goals. A ₹25 lakh education cost today will be ₹50+ lakhs in 10 years at 7% inflation. Use inflation calculator or assume 6-7% annual increase for Indian expenses.'
        },
        {
          type: 'mcq',
          question: 'Which of these is a SMART goal?',
          options: [
            '"I want to be rich"',
            '"Save ₹20 lakhs for house down payment by Dec 2029"',
            '"Buy a car someday"',
            '"Save as much as possible"'
          ],
          correct: 1,
          explanation: 'SMART goals are Specific (₹20L), Measurable (can track progress), Achievable (depends on income), Relevant (house purchase), and Time-bound (Dec 2029). The other options lack specificity and timelines.'
        },
        {
          type: 'scenario',
          question: 'Rahul wants to save for his child\'s education (₹50 lakhs) in 15 years. Which investment should he choose?',
          context: 'He can save ₹10,000/month consistently.',
          options: [
            'Keep in savings account (3% return)',
            'Put in FD (6% return)',
            'Equity mutual fund SIP (12% expected return)',
            'Buy gold jewelry'
          ],
          correct: 2,
          explanation: 'For long-term goals (15 years), equity mutual fund SIP is best. With 12% returns, ₹10,000/month SIP becomes ₹50 lakhs in 15 years. Savings account and FD won\'t beat inflation. Gold lacks liquidity and predictability.'
        }
      ]
    },
    {
      id: 4,
      title: 'Expense Tracking',
      subtitle: 'Know Where Your Money Goes',
      duration: '6 mins',
      content: `
        <h3>What is Expense Tracking?</h3>
        <p>Expense tracking is the practice of recording and monitoring all your spending – from ₹10 chai to ₹10,000 shopping. It helps you understand spending patterns, identify waste, and stay within budget.</p>
        
        <h4>Why Track Expenses?</h4>
        <ul>
          <li><strong>Awareness:</strong> Know exactly where money goes</li>
          <li><strong>Budget Control:</strong> Stay within spending limits</li>
          <li><strong>Identify Leaks:</strong> Spot unnecessary expenses</li>
          <li><strong>Better Decisions:</strong> Make informed financial choices</li>
          <li><strong>Achieve Goals:</strong> Save more by cutting waste</li>
          <li><strong>Reduce Stress:</strong> No "where did my salary go?" anxiety</li>
          <li><strong>Guilt-Free Spending:</strong> Spend on wants without worry when budget allows</li>
        </ul>

        <h4>Shocking Reality:</h4>
        <p>Studies show that people who don't track expenses typically overspend by 20-30%! That's ₹10,000-₹15,000 wasted monthly on a ₹50,000 salary.</p>
        
        <p><strong>Common "Invisible" Expenses:</strong></p>
        <ul>
          <li>Daily ₹50 coffee = ₹1,500/month = ₹18,000/year!</li>
          <li>Unused gym membership ₹1,500/month = ₹18,000/year wasted</li>
          <li>Food delivery (₹300 × 10 times) = ₹3,000/month extra vs cooking</li>
          <li>Auto rides instead of bus = ₹2,000/month extra</li>
          <li>Impulse online shopping = ₹3,000-5,000/month</li>
        </ul>
        <p><strong>Total "Invisible" Waste: ₹10,000-12,000/month!</strong></p>

        <h4>Methods to Track Expenses:</h4>
        
        <h5>1. Mobile Apps (Best for Most People)</h5>
        <p><strong>Popular Indian Apps:</strong></p>
        <ul>
          <li><strong>Walnut:</strong> Auto-tracks from SMS, categorizes expenses, budget alerts</li>
          <li><strong>Money Manager:</strong> Manual entry, detailed reports, multi-currency</li>
          <li><strong>ET Money:</strong> Expense tracking + investment tracking combined</li>
          <li><strong>Spendee:</strong> Beautiful interface, shared wallets for couples</li>
          <li><strong>1Money:</strong> Simple, fast entry, offline works</li>
        </ul>
        <p><strong>Pros:</strong> Automatic, always with you, instant insights, reports<br>
        <strong>Cons:</strong> Needs internet, may miss cash expenses if not entered manually</p>

        <h5>2. Spreadsheet/Excel (For Detail-Lovers)</h5>
        <p><strong>Setup:</strong></p>
        <ul>
          <li>Column A: Date</li>
          <li>Column B: Category (Food, Transport, Bills, etc.)</li>
          <li>Column C: Description</li>
          <li>Column D: Amount</li>
          <li>Column E: Payment Mode (Cash, Card, UPI)</li>
          <li>Auto-sum formulas for totals</li>
          <li>Monthly tabs for comparison</li>
        </ul>
        <p><strong>Pros:</strong> Full control, custom categories, powerful analysis<br>
        <strong>Cons:</strong> Time-consuming, not real-time, requires discipline</p>

        <h5>3. Notebook/Diary (Old School)</h5>
        <p>Write every expense in a pocket notebook.</p>
        <p><strong>Pros:</strong> No phone needed, works offline, mindful spending<br>
        <strong>Cons:</strong> No automatic totals, can lose notebook, hard to analyze</p>

        <h5>4. Envelope Method (Cash Users)</h5>
        <p>Divide cash into envelopes for each category. Track by counting remaining cash.</p>
        <p><strong>Pros:</strong> Visual limit, forces spending control<br>
        <strong>Cons:</strong> Cash-only, doesn't work for digital payments</p>

        <h4>Expense Categories to Track:</h4>
        
        <h5>Fixed Expenses (Same Monthly)</h5>
        <ul>
          <li>Rent/EMI</li>
          <li>Loan EMIs (car, personal, education)</li>
          <li>Insurance premiums (life, health, vehicle)</li>
          <li>Mobile/internet bills</li>
          <li>DTH/OTT subscriptions</li>
          <li>School fees</li>
          <li>SIP/investments</li>
        </ul>

        <h5>Variable Expenses (Changes Monthly)</h5>
        <ul>
          <li>Groceries</li>
          <li>Electricity, water, gas</li>
          <li>Transportation (fuel, auto, metro)</li>
          <li>Food and dining out</li>
          <li>Healthcare (medicines, doctor visits)</li>
          <li>Personal care (salon, grooming)</li>
          <li>Entertainment (movies, events)</li>
          <li>Shopping (clothes, gadgets)</li>
          <li>Miscellaneous</li>
        </ul>

        <h4>How to Track Effectively:</h4>
        
        <h5>Daily Routine:</h5>
        <ol>
          <li><strong>Morning:</strong> Check yesterday's expenses, enter if missed</li>
          <li><strong>Throughout Day:</strong> Enter each expense immediately (2 minutes)</li>
          <li><strong>Night:</strong> Quick review, ensure nothing missed</li>
        </ol>

        <h5>Weekly Review (15 minutes):</h5>
        <ul>
          <li>Check total spent in each category</li>
          <li>Compare with weekly budget (Monthly ÷ 4)</li>
          <li>Identify any overspending categories</li>
          <li>Plan adjustments for next week</li>
        </ul>

        <h5>Monthly Review (30 minutes):</h5>
        <ul>
          <li>Total income vs total expenses</li>
          <li>Category-wise breakdown (% of income)</li>
          <li>Compare with budget targets</li>
          <li>Identify spending leaks</li>
          <li>Set next month's budget</li>
          <li>Celebrate if under budget!</li>
        </ul>

        <h4>Sample Monthly Expense Report:</h4>
        <table>
          <tr>
            <th>Category</th>
            <th>Budget</th>
            <th>Actual</th>
            <th>Difference</th>
            <th>Status</th>
          </tr>
          <tr>
            <td>Rent</td>
            <td>₹12,000</td>
            <td>₹12,000</td>
            <td>₹0</td>
            <td>✅</td>
          </tr>
          <tr>
            <td>Groceries</td>
            <td>₹5,000</td>
            <td>₹5,800</td>
            <td>-₹800</td>
            <td>⚠️</td>
          </tr>
          <tr>
            <td>Dining Out</td>
            <td>₹3,000</td>
            <td>₹4,500</td>
            <td>-₹1,500</td>
            <td>❌</td>
          </tr>
          <tr>
            <td>Transport</td>
            <td>₹2,500</td>
            <td>₹2,200</td>
            <td>+₹300</td>
            <td>✅</td>
          </tr>
          <tr>
            <td>Entertainment</td>
            <td>₹2,000</td>
            <td>₹1,500</td>
            <td>+₹500</td>
            <td>✅</td>
          </tr>
          <tr>
            <td>Shopping</td>
            <td>₹4,000</td>
            <td>₹6,200</td>
            <td>-₹2,200</td>
            <td>❌</td>
          </tr>
          <tr>
            <td>Utilities</td>
            <td>₹2,000</td>
            <td>₹1,900</td>
            <td>+₹100</td>
            <td>✅</td>
          </tr>
          <tr>
            <td><strong>TOTAL</strong></td>
            <td><strong>₹30,500</strong></td>
            <td><strong>₹34,100</strong></td>
            <td><strong>-₹3,600</strong></td>
            <td><strong>❌</strong></td>
          </tr>
        </table>
        <p><strong>Analysis:</strong> Overspent ₹3,600 mainly in dining out and shopping. Cut these next month!</p>

        <h4>Tips for Successful Expense Tracking:</h4>
        
        <h5>Getting Started:</h5>
        <ul>
          <li>✅ Start tracking TODAY, don't wait for "perfect time"</li>
          <li>✅ Choose ONE method and stick to it for 3 months</li>
          <li>✅ Track EVERYTHING – even ₹5 expenses</li>
          <li>✅ Set realistic categories (don't make it too complex)</li>
          <li>✅ Make it a habit – track same time daily</li>
        </ul>

        <h5>Staying Consistent:</h5>
        <ul>
          <li>✅ Set phone reminder (9 PM: "Did you track expenses?")</li>
          <li>✅ Link to existing habit (track while having dinner)</li>
          <li>✅ Keep it simple (2-3 minutes daily maximum)</li>
          <li>✅ Forgive yourself if you miss a day, resume next day</li>
          <li>✅ Review weekly – see progress</li>
        </ul>

        <h5>Advanced Tips:</h5>
        <ul>
          <li>✅ Use payment app transaction history to cross-check</li>
          <li>✅ Take photos of cash receipts</li>
          <li>✅ Set up automatic categorization rules in apps</li>
          <li>✅ Link bank accounts for auto-import</li>
          <li>✅ Share tracking with spouse for complete picture</li>
        </ul>

        <h4>Red Flags in Your Expenses:</h4>
        <ul>
          <li>🚩 Food delivery > 20% of food budget</li>
          <li>🚩 Shopping > 10% of income</li>
          <li>🚩 Entertainment > 5% of income</li>
          <li>🚩 Subscriptions you don't use</li>
          <li>🚩 Late fees, penalties (sign of poor planning)</li>
          <li>🚩 Cash withdrawals with no record where it went</li>
          <li>🚩 Credit card bills higher than income</li>
        </ul>

        <h4>What to Do After Tracking:</h4>
        
        <h5>Weekly Actions:</h5>
        <ul>
          <li>Identify highest expense category</li>
          <li>Find one thing to cut next week</li>
          <li>Adjust spending if over budget</li>
        </ul>

        <h5>Monthly Actions:</h5>
        <ul>
          <li>Calculate savings rate (Savings ÷ Income × 100)</li>
          <li>Find spending patterns (weekend overspending?)</li>
          <li>Set next month's category budgets</li>
          <li>Cancel unused subscriptions</li>
          <li>Negotiate bills (insurance, phone plan)</li>
        </ul>

        <h5>Yearly Actions:</h5>
        <ul>
          <li>See total annual spending in each category</li>
          <li>Calculate annual savings</li>
          <li>Identify major expense patterns</li>
          <li>Set financial goals for next year</li>
          <li>Celebrate financial wins!</li>
        </ul>

        <h4>Common Mistakes to Avoid:</h4>
        <ul>
          <li>❌ Tracking for 3 days then stopping (need 3 months minimum)</li>
          <li>❌ Too many categories (keep it simple: 8-10 max)</li>
          <li>❌ Tracking but not reviewing (data without action is useless)</li>
          <li>❌ Being too harsh on yourself (allow some flexibility)</li>
          <li>❌ Not tracking small expenses (they add up!)</li>
          <li>❌ Forgetting cash expenses</li>
          <li>❌ Not involving family (spouse's spending matters too!)</li>
        </ul>

        <h4>The Power of Awareness:</h4>
        <p>Just by tracking expenses, most people reduce spending by 10-15% WITHOUT making any major changes! Why? Because awareness leads to mindful spending.</p>
        
        <p><strong>Real Example:</strong> Raj started tracking and realized he spent ₹4,500/month on food delivery. Shocked, he reduced to ₹1,500 (cooking more). Saved ₹3,000/month = ₹36,000/year!</p>
      `,
      keyPoints: [
        'Track EVERY expense daily, even small ₹5-10 purchases – they add up to thousands',
        'Use apps (Walnut, Money Manager) or spreadsheets – choose one method and stick to it',
        'Review weekly (quick check) and monthly (detailed analysis) to identify spending leaks',
        'Small daily expenses (₹50 coffee, auto rides) can waste ₹10,000+ monthly without tracking'
      ],
      quiz: [
        {
          type: 'scenario',
          question: 'Amit spends ₹50 on coffee daily at work (25 working days/month). He also orders food delivery 10 times a month at ₹300 average. How much is he spending on these two items monthly?',
          context: 'He could make coffee at home and carry lunch.',
          options: ['₹2,500', '₹3,000', '₹4,250', '₹5,000'],
          correct: 2,
          explanation: 'Coffee: ₹50 × 25 days = ₹1,250. Food delivery: ₹300 × 10 = ₹3,000. Total = ₹4,250/month = ₹51,000/year! Making coffee at home and carrying lunch could save ₹40,000+ yearly.'
        },
        {
          type: 'mcq',
          question: 'What is the BEST time to track your daily expenses?',
          options: [
            'End of the month',
            'Once a week',
            'Immediately after each expense',
            'Only for large expenses'
          ],
          correct: 2,
          explanation: 'Track expenses immediately after spending (or at least same day). Waiting till week-end or month-end leads to forgotten expenses. Small expenses add up – track everything, even ₹5 chai!'
        },
        {
          type: 'truefalse',
          question: 'You only need to track large expenses (above ₹500). Small expenses don\'t matter much.',
          options: ['True', 'False'],
          correct: 1,
          explanation: 'False! Small expenses are where most "invisible" spending happens. Daily ₹50 coffee = ₹18,000/year. ₹20 vada pav daily = ₹7,200/year. Track EVERYTHING to spot these leaks!'
        },
        {
          type: 'scenario',
          question: 'Priya tracked expenses for a month and found she spent ₹12,000 on shopping (budget was ₹5,000). What should she do?',
          context: 'Most shopping was impulse online purchases during sales.',
          options: [
            'Stop shopping completely next month',
            'Uninstall shopping apps and set ₹4,000 budget',
            'Continue same – shopping is necessary',
            'Take a loan to cover overspending'
          ],
          correct: 1,
          explanation: 'Priya should remove temptation (uninstall shopping apps, unsubscribe from sale emails) and set a realistic lower budget. Extreme restriction (₹0) won\'t work. Gradual reduction from ₹12,000 to ₹4,000 is achievable.'
        },
        {
          type: 'mcq',
          question: 'Which expense tracking method is best for someone who makes mostly digital payments (UPI, cards)?',
          options: [
            'Notebook diary',
            'Envelope cash method',
            'Mobile app with SMS auto-tracking',
            'Memory (no tracking needed)'
          ],
          correct: 2,
          explanation: 'Mobile apps like Walnut automatically track expenses from SMS alerts for UPI/card transactions. This is perfect for digital payments and requires minimal manual effort while providing detailed reports.'
        },
        {
          type: 'calculation',
          question: 'Rahul earns ₹60,000/month and saves ₹8,000. After tracking, he found he can cut ₹4,000 waste. What will be his new savings rate?',
          options: ['13.3%', '16.7%', '20%', '25%'],
          correct: 2,
          explanation: 'Current savings: ₹8,000. After cutting waste: ₹8,000 + ₹4,000 = ₹12,000 savings. Savings rate = (₹12,000 ÷ ₹60,000) × 100 = 20%. This is the recommended minimum savings rate!'
        }
      ]
    }
  ]
};
