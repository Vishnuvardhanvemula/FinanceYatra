/**
 * Module 3: Understanding Loans
 * Complete lesson content with quizzes
 * 
 * Topics: Personal Loans, Home Loans, Education Loans, EMI Calculation, Interest Rates, Credit Score
 */

export const module3Content = {
  title: 'Understanding Loans',
  lessons: [
    {
      id: 0,
      title: 'Personal Loans',
      subtitle: 'Quick Funds for Your Immediate Needs',
      duration: '7 mins',
      content: `
        <h3>What is a Personal Loan?</h3>
        <p>A personal loan is an unsecured loan that you can use for any purpose without needing to specify the reason. Banks provide the money based on your creditworthiness and income.</p>
        
        <h4>Key Features:</h4>
        <ul>
          <li><strong>Unsecured:</strong> No collateral required (unlike home or gold loans)</li>
          <li><strong>Flexible Purpose:</strong> Medical emergency, wedding, travel, education, debt consolidation</li>
          <li><strong>Fixed EMI:</strong> Same monthly installment throughout loan tenure</li>
          <li><strong>Loan Amount:</strong> ₹50,000 to ₹40 lakhs (based on income and credit score)</li>
          <li><strong>Tenure:</strong> 1 year to 5 years typically</li>
          <li><strong>Interest Rate:</strong> 10% - 24% per annum (higher than secured loans)</li>
        </ul>

        <h4>Eligibility Criteria:</h4>
        <ul>
          <li><strong>Age:</strong> 21 to 60 years</li>
          <li><strong>Income:</strong> Minimum ₹15,000 - ₹25,000 per month (varies by bank)</li>
          <li><strong>Employment:</strong> Salaried (6 months experience) or Self-employed (2 years business)</li>
          <li><strong>Credit Score:</strong> 750+ preferred, 650+ minimum</li>
          <li><strong>Existing Loans:</strong> Total EMI should not exceed 50% of monthly income</li>
        </ul>

        <h4>Types of Personal Loans:</h4>
        <ul>
          <li><strong>Instant Personal Loan:</strong> Quick approval in 2-24 hours, for existing bank customers</li>
          <li><strong>Pre-approved Personal Loan:</strong> Already sanctioned based on your relationship with bank</li>
          <li><strong>Wedding Loan:</strong> Special rates for wedding expenses</li>
          <li><strong>Medical Emergency Loan:</strong> Fast processing for health emergencies</li>
          <li><strong>Travel Loan:</strong> For vacation expenses</li>
          <li><strong>Debt Consolidation Loan:</strong> Pay off multiple high-interest debts</li>
        </ul>

        <h4>Example Calculation:</h4>
        <p><strong>Loan Amount:</strong> ₹5,00,000 | <strong>Interest Rate:</strong> 12% per annum | <strong>Tenure:</strong> 3 years</p>
        <ul>
          <li><strong>Monthly EMI:</strong> ₹16,607</li>
          <li><strong>Total Interest:</strong> ₹97,852</li>
          <li><strong>Total Repayment:</strong> ₹5,97,852</li>
        </ul>

        <h4>Documents Required:</h4>
        <ul>
          <li><strong>Identity Proof:</strong> Aadhaar card, PAN card, Passport, Voter ID</li>
          <li><strong>Address Proof:</strong> Aadhaar, Passport, Utility bills, Rent agreement</li>
          <li><strong>Income Proof:</strong> Last 3 months salary slips, Bank statements (6 months)</li>
          <li><strong>Employment Proof:</strong> Employment certificate, Office ID card</li>
          <li><strong>For Self-Employed:</strong> ITR for 2 years, Business proof, GST certificate</li>
        </ul>

        <h4>Fees & Charges:</h4>
        <ul>
          <li><strong>Processing Fee:</strong> 1% - 3% of loan amount (₹5,000 - ₹15,000)</li>
          <li><strong>Prepayment Charges:</strong> 2% - 5% if you repay early</li>
          <li><strong>Late Payment Fee:</strong> ₹500 - ₹1,000 per missed EMI</li>
          <li><strong>Bounce Charges:</strong> ₹500 - ₹750 if EMI check/auto-debit bounces</li>
          <li><strong>Loan Cancellation:</strong> ₹3,000 - ₹5,000 if cancelled after sanctio

n</li>
        </ul>

        <h4>Advantages:</h4>
        <ul>
          <li>Quick processing and disbursement (24-48 hours)</li>
          <li>No collateral or security needed</li>
          <li>Can be used for any purpose</li>
          <li>Fixed EMI helps in budgeting</li>
          <li>Balance transfer option to lower interest rates</li>
        </ul>

        <h4>Disadvantages:</h4>
        <ul>
          <li>Higher interest rates compared to secured loans</li>
          <li>Prepayment penalties in many banks</li>
          <li>Processing fees and other charges</li>
          <li>Can affect credit score if mismanaged</li>
          <li>Debt burden if taken without proper planning</li>
        </ul>

        <h4>When to Take a Personal Loan:</h4>
        <ul>
          <li><strong>✅ Medical Emergency:</strong> Life-saving treatment, surgery</li>
          <li><strong>✅ Debt Consolidation:</strong> Clear multiple high-interest credit card debts</li>
          <li><strong>✅ Home Renovation:</strong> Essential repairs or upgrades</li>
          <li><strong>✅ Wedding:</strong> If you have no other savings (but plan carefully!)</li>
          <li><strong>❌ Lifestyle Purchases:</strong> Latest phone, vacation, gadgets</li>
          <li><strong>❌ Speculation:</strong> Stock market, cryptocurrency investment</li>
          <li><strong>❌ Regular Expenses:</strong> Monthly bills, rent (indicates living beyond means)</li>
        </ul>

        <h4>Tips to Get Best Personal Loan Deal:</h4>
        <ul>
          <li><strong>Compare Banks:</strong> Check interest rates of 4-5 banks</li>
          <li><strong>Improve Credit Score:</strong> Wait and build score to 750+ for better rates</li>
          <li><strong>Negotiate:</strong> If you're an existing customer, negotiate for lower rates</li>
          <li><strong>Choose Shorter Tenure:</strong> Pay less interest overall (but higher EMI)</li>
          <li><strong>Avoid Small Loans:</strong> Processing fee makes small loans expensive</li>
          <li><strong>Read Fine Print:</strong> Understand all fees and charges</li>
          <li><strong>Check Pre-payment Policy:</strong> Opt for loans with zero prepayment charges</li>
        </ul>

        <h4>How to Repay Personal Loan Faster:</h4>
        <ul>
          <li>Increase EMI amount when you get salary hike</li>
          <li>Use bonus, incentive for part-prepayment</li>
          <li>Round up EMI (e.g., ₹16,607 → ₹17,000)</li>
          <li>Make bi-weekly payments instead of monthly</li>
          <li>Refinance if you find lower interest rate</li>
        </ul>

        <h4>Red Flags - When NOT to Take Personal Loan:</h4>
        <ul>
          <li>If total EMI exceeds 50% of your monthly income</li>
          <li>If you're taking loan to pay another loan</li>
          <li>If you don't have emergency fund</li>
          <li>If the purpose is not essential</li>
          <li>If you're planning to change job soon</li>
        </ul>
      `,
      keyPoints: [
        'Personal loans are unsecured with 10-24% interest rates',
        'Credit score 750+ gets you best rates and quick approval',
        'Total EMI should not exceed 50% of monthly income',
        'Use for emergencies, not lifestyle expenses'
      ],
      quiz: [
        {
          type: 'calculation',
          question: 'You take a personal loan of ₹3,00,000 at 14% annual interest for 2 years. What will be your approximate monthly EMI?',
          options: ['₹12,500', '₹13,500', '₹14,500', '₹15,500'],
          correct: 2,
          explanation: 'Using EMI formula: [P × R × (1+R)^N] / [(1+R)^N-1] where P=₹3L, R=14%/12/100, N=24 months. The EMI comes out to approximately ₹14,500. You will pay ₹48,000 as total interest over 2 years.'
        },
        {
          type: 'scenario',
          question: 'Amit earns ₹60,000/month. He has a home loan EMI of ₹20,000 and car loan EMI of ₹8,000. Can he safely take a personal loan with EMI of ₹15,000?',
          context: 'Amit wants personal loan for his sister\'s wedding.',
          options: [
            'Yes, he can easily afford it',
            'No, total EMI will exceed safe limit',
            'Yes, if he reduces other expenses',
            'No, he should not take any more loans'
          ],
          correct: 1,
          explanation: 'No! His total EMI would be ₹43,000 (71% of income), which exceeds the safe 50% limit. His maximum additional EMI capacity is ₹30,000 - ₹28,000 = ₹2,000 only. Taking this loan will put him in financial stress.'
        },
        {
          type: 'mcq',
          question: 'What is the main reason personal loans have higher interest rates than home loans?',
          options: [
            'Banks want to earn more profit',
            'Personal loans are unsecured (no collateral)',
            'Processing personal loans is more expensive',
            'Personal loans have shorter tenure'
          ],
          correct: 1,
          explanation: 'Personal loans are unsecured - you don\'t pledge any asset. If you default, the bank can\'t seize property like in home loans. Higher risk for bank = higher interest rate for borrower. That\'s why personal loan rates (10-24%) are much higher than home loan rates (7-9%).'
        },
        {
          type: 'truefalse',
          question: 'Personal loans can be used for any purpose, including investing in stock market or cryptocurrencies.',
          options: ['True', 'False'],
          correct: 1,
          explanation: 'While technically you CAN use personal loans for any purpose, you SHOULD NOT use borrowed money for speculative investments like stocks or crypto. If investments fail, you\'re still stuck with loan EMI + interest. Only use personal loans for essential needs.'
        },
        {
          type: 'mcq',
          question: 'What is the ideal credit score to get the best personal loan interest rates?',
          options: ['600+', '650+', '750+', '850+'],
          correct: 2,
          explanation: 'A credit score of 750 and above is considered excellent and will fetch you the lowest interest rates (10-12%). Scores between 650-749 get moderate rates (14-18%), while below 650 may face rejection or very high rates (20-24%).'
        }
      ]
    },

    {
      id: 1,
      title: 'Home Loans',
      subtitle: 'Financing Your Dream Home',
      duration: '6 mins',
      content: `
        <h3>Home Loan Basics</h3>
        <p>A home loan helps you purchase property by paying 75-90% of the property value. You repay in monthly EMIs over 15-30 years.</p>
        
        <h4>Key Features:</h4>
        <table>
          <tr>
            <td><strong>Interest Rate</strong></td>
            <td>7% - 9.5% per annum</td>
          </tr>
          <tr>
            <td><strong>Loan Amount</strong></td>
            <td>Up to 90% of property value</td>
          </tr>
          <tr>
            <td><strong>Tenure</strong></td>
            <td>5 to 30 years</td>
          </tr>
          <tr>
            <td><strong>Tax Benefits</strong></td>
            <td>Up to ₹3.5L deduction (80C + 24B)</td>
          </tr>
        </table>

        <h4>Eligibility:</h4>
        <ul>
          <li><strong>Age:</strong> 21-65 years (should repay before 65)</li>
          <li><strong>Income:</strong> Minimum ₹25,000/month for salaried</li>
          <li><strong>Credit Score:</strong> 750+ for best rates</li>
          <li><strong>EMI/Income Ratio:</strong> Total EMI < 50% of income</li>
        </ul>

        <h4>Types of Home Loans:</h4>
        <ul>
          <li><strong>Purchase:</strong> Buy ready/under-construction property</li>
          <li><strong>Construction:</strong> Build house on owned land</li>
          <li><strong>Extension:</strong> Expand existing property</li>
          <li><strong>Balance Transfer:</strong> Switch to lower interest bank</li>
        </ul>

        <h4>Interest Rate Types:</h4>
        <ul>
          <li><strong>Floating Rate:</strong> Changes with market (7-8.5%) - RECOMMENDED for most</li>
          <li><strong>Fixed Rate:</strong> Same throughout (8-10%) - Expensive, rarely beneficial</li>
        </ul>

        <h4>Tax Benefits (Section 80C + 24B):</h4>
        <ul>
          <li><strong>Principal:</strong> Up to ₹1.5L deduction under 80C</li>
          <li><strong>Interest:</strong> Up to ₹2L deduction under 24B</li>
          <li><strong>First-time Buyer:</strong> Additional ₹50K under 80EEA</li>
          <li><strong>Total Benefit:</strong> ₹3.5 lakhs deduction = Save ₹1.2L tax/year (30% bracket)</li>
        </ul>

        <h4>Hidden Costs:</h4>
        <ul>
          <li>Processing Fee: 0.5% - 1% of loan (₹25K - ₹50K)</li>
          <li>Stamp Duty: 4-7% of property value (state-dependent)</li>
          <li>Registration: 1-2% of property value</li>
          <li>Legal Charges: ₹10K - ₹30K</li>
          <li>Insurance: ₹5K - ₹15K per year</li>
        </ul>

        <h4>Smart Tips:</h4>
        <ul>
          <li>Save 20% down payment to avoid higher interest</li>
          <li>Choose shorter tenure if affordable (saves lakhs in interest)</li>
          <li>Make prepayments annually to reduce burden</li>
          <li>Avoid builder tie-ups (interest rates are higher)</li>
          <li>Get property legally verified before applying</li>
        </ul>

        <div class="example-box">
          <h4>Example Comparison:</h4>
          <p><strong>Loan:</strong> ₹50 lakhs at 8% interest</p>
          <ul>
            <li><strong>20 years:</strong> EMI ₹41,822 | Total Interest: ₹50.37L</li>
            <li><strong>30 years:</strong> EMI ₹36,686 | Total Interest: ₹82.07L</li>
            <li><strong>Savings with 20 years:</strong> ₹31.7 lakhs!</li>
          </ul>
        </div>
      `,
      keyPoints: [
        'Home loans offer lowest interest rates (7-9%) due to property collateral',
        'Tax benefits up to ₹3.5L (saves ₹1.2L for 30% bracket)',
        'Choose shorter tenure if affordable - saves lakhs in interest',
        'Maintain 750+ credit score for best rates'
      ],
      quiz: [
        {
          question: 'Rahul earns ₹80,000/month. Maximum home loan EMI he can afford safely?',
          options: ['₹20,000', '₹30,000', '₹40,000', '₹50,000'],
          correct: 2,
          explanation: 'Safe EMI limit is 50% of monthly income. For ₹80K salary: 50% = ₹40,000 maximum EMI. This ensures he has ₹40K left for other expenses and emergencies.'
        },
        {
          question: 'What\'s the main advantage of choosing 20-year tenure over 30-year for ₹50L loan at 8%?',
          options: [
            'Lower EMI payment',
            'Save ₹30+ lakhs in total interest',
            'Get loan approval faster',
            'Higher tax benefits'
          ],
          correct: 1,
          explanation: '20-year tenure saves ₹31.7 lakhs in interest compared to 30 years! Though EMI is ₹5,136 higher (₹41,822 vs ₹36,686), the massive interest savings make it worth choosing if affordable.'
        },
        {
          question: 'TRUE or FALSE: Fixed interest rate home loans are better than floating rates.',
          options: ['True', 'False'],
          correct: 1,
          explanation: 'FALSE! Floating rates are BETTER for most borrowers. They\'re 1-2% cheaper (7-8.5% vs 8-10%) and decrease when RBI cuts rates. Fixed rates are expensive and you miss out on rate cuts. Only choose fixed if expecting sharp rate increases (rare).'
        },
        {
          question: 'Priya\'s ₹50L home loan gives ₹3.5L tax deduction. How much tax does she ACTUALLY save if in 30% bracket?',
          options: ['₹3.5 lakhs', '₹2.1 lakhs', '₹1.05 lakhs', '₹70,000'],
          correct: 2,
          explanation: 'Tax deduction ≠ tax saving! ₹3.5L deduction in 30% tax bracket = ₹3.5L × 30% = ₹1.05 lakh actual tax saved. This is still significant - ₹1.05L saved every year for 20-30 years!'
        },
        {
          question: 'What\'s the recommended down payment to get best home loan rates?',
          options: ['10%', '20%', '30%', '50%'],
          correct: 1,
          explanation: '20% down payment is ideal. Banks give lowest interest rates when you pay 20% upfront (loan = 80% of property value). Below 80% LTV (Loan-to-Value), rates increase by 0.25-0.5%. Save 20% before buying!'
        },
        {
          question: 'Which home loan type should salaried employees typically choose?',
          options: [
            'Fixed rate for stability',
            'Floating rate for lower cost',
            'Mix of both (hybrid)',
            'Builder tie-up loans'
          ],
          correct: 1,
          explanation: 'Floating rate is BEST for salaried employees. It\'s 1-2% cheaper than fixed rates and benefits from RBI rate cuts. Fixed rates are expensive and rarely beneficial. Avoid builder tie-ups - they have higher rates.'
        }
      ]
    },

    {
      id: 2,
      title: 'Education Loans',
      subtitle: 'Investing in Your Future',
      duration: '5 mins',
      content: `
        <h3>Education Loan Overview</h3>
        <p>Government-backed loans for higher education in India or abroad. Low interest rates and flexible repayment make education accessible.</p>
        
        <h4>Key Benefits:</h4>
        <ul>
          <li><strong>Low Interest:</strong> 7-12% (lower for premier institutes)</li>
          <li><strong>Moratorium Period:</strong> No EMI during study + 6-12 months after</li>
          <li><strong>Tax Benefit:</strong> Interest deduction under Section 80E (no upper limit!)</li>
          <li><strong>No Collateral:</strong> For loans up to ₹7.5L</li>
        </ul>

        <h4>Loan Coverage:</h4>
        <table>
          <tr>
            <th>Expense</th>
            <th>Covered?</th>
          </tr>
          <tr>
            <td>Tuition Fees</td>
            <td>✅ Yes (100%)</td>
          </tr>
          <tr>
            <td>Hostel/Accommodation</td>
            <td>✅ Yes</td>
          </tr>
          <tr>
            <td>Books & Equipment</td>
            <td>✅ Yes</td>
          </tr>
          <tr>
            <td>Travel (Study Abroad)</td>
            <td>✅ Yes (one-way initially)</td>
          </tr>
          <tr>
            <td>Personal Expenses</td>
            <td>❌ No</td>
          </tr>
        </table>

        <h4>Loan Limits:</h4>
        <ul>
          <li><strong>Up to ₹7.5L:</strong> No collateral, just co-borrower</li>
          <li><strong>₹7.5L - ₹15L:</strong> Third-party guarantee required</li>
          <li><strong>Above ₹15L:</strong> Collateral mandatory (property/FD)</li>
        </ul>

        <h4>Interest Rates by Institute:</h4>
        <ul>
          <li><strong>IIT/IIM/NIT:</strong> 7-9% (preferential rates)</li>
          <li><strong>Top Universities Abroad:</strong> 8-10%</li>
          <li><strong>Private Indian Colleges:</strong> 10-12%</li>
          <li><strong>Deemed Universities:</strong> 11-13%</li>
        </ul>

        <h4>Repayment:</h4>
        <ul>
          <li><strong>Grace Period:</strong> Start repaying 6-12 months after course or getting job</li>
          <li><strong>Tenure:</strong> 5-15 years typically</li>
          <li><strong>Flexible EMI:</strong> Can increase EMI as salary grows</li>
        </ul>

        <h4>Government Schemes:</h4>
        <ul>
          <li><strong>Central Scheme (SBI):</strong> 4% interest subsidy for ₹10L+ income families</li>
          <li><strong>Vidya Lakshmi Portal:</strong> Apply to multiple banks at once</li>
          <li><strong>Dr. Ambedkar Interest Subsidy:</strong> For SC/ST students</li>
        </ul>

        <div class="example-box">
          <h4>Example: IIT BTech Student</h4>
          <p><strong>Total Cost:</strong> ₹12 lakhs (4 years)</p>
          <p><strong>Loan Amount:</strong> ₹10 lakhs at 8%</p>
          <p><strong>Moratorium:</strong> 4 years study + 1 year grace</p>
          <p><strong>EMI (10 years):</strong> ₹12,133/month</p>
          <p><strong>Tax Benefit:</strong> Interest paid is 100% deductible (saves ₹30K/year in tax)</p>
        </div>

        <h4>Documents Required:</h4>
        <ul>
          <li>Admission letter from institute</li>
          <li>Fee structure certificate</li>
          <li>Academic records (10th, 12th, graduation)</li>
          <li>Parents\' income proof (last 2 years ITR)</li>
          <li>Collateral documents (if loan > ₹15L)</li>
        </ul>

        <h4>Smart Tips:</h4>
        <ul>
          <li>Apply early - processing takes 3-4 weeks</li>
          <li>Compare banks - rates vary by 2-3%</li>
          <li>Pay simple interest during study if possible (reduces burden)</li>
          <li>Use Vidya Lakshmi portal for easy comparison</li>
          <li>Explore scholarships to reduce loan amount</li>
        </ul>
      `,
      keyPoints: [
        'Education loans have 7-12% interest with moratorium during studies',
        'No collateral needed for loans up to ₹7.5 lakhs',
        'Tax benefit: Interest fully deductible under 80E (no limit)',
        'Repayment starts 6-12 months after course completion'
      ],
      quiz: [
        {
          question: 'What is the main advantage of education loan "moratorium period"?',
          options: [
            'Lower interest rate',
            'No EMI during studies + 6-12 months after',
            'No collateral required',
            'Loan approval is faster'
          ],
          correct: 1,
          explanation: 'Moratorium means NO EMI during study period + 6-12 months after course. This allows students to focus on studies without financial stress and find a job before starting repayment. Huge relief!'
        },
        {
          question: 'Amit takes ₹6 lakh education loan at 9%. Does he need collateral?',
          options: [
            'Yes, mandatory for all education loans',
            'No, below ₹7.5L requires only co-borrower',
            'Yes, if studying abroad',
            'No, never needed for education loans'
          ],
          correct: 1,
          explanation: 'NO collateral needed for loans up to ₹7.5 lakhs! Only a co-borrower (parent/guardian) is required. ₹7.5L-15L needs third-party guarantee. Above ₹15L needs collateral (property/FD).'
        },
        {
          question: 'What expenses does education loan NOT cover?',
          options: [
            'Tuition fees',
            'Books and laptop',
            'Personal shopping and entertainment',
            'Hostel accommodation'
          ],
          correct: 2,
          explanation: 'Education loans cover tuition, hostel, books, equipment, travel (for study abroad). They DON\'T cover personal expenses like shopping, entertainment, or vacation. Only genuine education-related expenses are funded.'
        },
        {
          question: 'TRUE or FALSE: Interest paid on education loans has an upper limit for tax deduction.',
          options: ['True - ₹1.5L limit', 'False - NO upper limit'],
          correct: 1,
          explanation: 'FALSE - there\'s NO UPPER LIMIT! Section 80E allows deduction of FULL interest paid on education loans for up to 8 years. If you pay ₹5L interest, full ₹5L is deductible! This is unique - other loan tax benefits have limits.'
        },
        {
          question: 'Priya is going to IIT. What interest rate can she expect for education loan?',
          options: ['5-6%', '7-9%', '12-15%', '18-20%'],
          correct: 1,
          explanation: 'Premier institutes like IIT/IIM/NIT get preferential rates of 7-9% due to low default risk (good placements). Private colleges get 10-12%, deemed universities 11-13%. Banks trust IIT graduates will repay!'
        },
        {
          question: 'When should you start repaying education loan?',
          options: [
            'Immediately after loan disbursement',
            'From second year of studies',
            '6-12 months after course completion or getting job',
            'After 5 years of graduation'
          ],
          correct: 2,
          explanation: 'Repayment starts 6-12 months after course completion (or getting job, whichever is earlier). This moratorium period allows you to find a job and settle. However, you can pay simple interest during studies to reduce burden later.'
        }
      ]
    },

    {
      id: 3,
      title: 'EMI Calculation & Management',
      subtitle: 'Understanding Your Monthly Payments',
      duration: '6 mins',
      content: `
        <h3>What is EMI?</h3>
        <p>EMI (Equated Monthly Installment) is a fixed monthly payment combining principal + interest. Same amount every month makes budgeting easier.</p>
        
        <h4>EMI Formula:</h4>
        <p><strong>EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]</strong></p>
        <ul>
          <li>P = Principal loan amount</li>
          <li>R = Monthly interest rate (Annual ÷ 12 ÷ 100)</li>
          <li>N = Number of months</li>
        </ul>

        <h4>Quick EMI Calculation (Approximate):</h4>
        <p>For rough estimate: <strong>EMI ≈ Loan Amount × [Interest% ÷ 12] × 1.5</strong></p>
        
        [EMI_CALCULATOR]

        <div class="example-box">
          <h4>Example Calculations:</h4>
          
          <h5>Case 1: Car Loan</h5>
          <p><strong>Loan:</strong> ₹5 lakhs | <strong>Rate:</strong> 10% | <strong>Tenure:</strong> 5 years</p>
          <ul>
            <li>EMI: ₹10,624/month</li>
            <li>Total Interest: ₹1,37,440</li>
            <li>Total Payment: ₹6,37,440</li>
          </ul>

          <h5>Case 2: Personal Loan</h5>
          <p><strong>Loan:</strong> ₹2 lakhs | <strong>Rate:</strong> 14% | <strong>Tenure:</strong> 3 years</p>
          <ul>
            <li>EMI: ₹6,821/month</li>
            <li>Total Interest: ₹45,556</li>
            <li>Total Payment: ₹2,45,556</li>
          </ul>
        </div>

        <h4>Impact of Interest Rate:</h4>
        <p>₹10 lakh loan for 10 years:</p>
        <table>
          <tr>
            <th>Interest Rate</th>
            <th>EMI</th>
            <th>Total Interest</th>
          </tr>
          <tr>
            <td>8%</td>
            <td>₹12,133</td>
            <td>₹4.56L</td>
          </tr>
          <tr>
            <td>10%</td>
            <td>₹13,215</td>
            <td>₹5.86L</td>
          </tr>
          <tr>
            <td>12%</td>
            <td>₹14,347</td>
            <td>₹7.22L</td>
          </tr>
          <tr>
            <td>15%</td>
            <td>₹16,134</td>
            <td>₹9.36L</td>
          </tr>
        </table>
        <p><strong>Insight:</strong> 7% rate difference = ₹4.8L extra interest! Shop for lowest rate.</p>

        <h4>Impact of Tenure:</h4>
        <p>₹10 lakh loan at 10% interest:</p>
        <table>
          <tr>
            <th>Tenure</th>
            <th>EMI</th>
            <th>Total Interest</th>
          </tr>
          <tr>
            <td>5 years</td>
            <td>₹21,247</td>
            <td>₹2.75L</td>
          </tr>
          <tr>
            <td>10 years</td>
            <td>₹13,215</td>
            <td>₹5.86L</td>
          </tr>
          <tr>
            <td>15 years</td>
            <td>₹10,746</td>
            <td>₹9.34L</td>
          </tr>
          <tr>
            <td>20 years</td>
            <td>₹9,650</td>
            <td>₹13.16L</td>
          </tr>
        </table>
        <p><strong>Insight:</strong> Longer tenure = Lower EMI but 4-5X more interest!</p>

        <h4>EMI Management Rules:</h4>
        <ul>
          <li><strong>50% Rule:</strong> Total EMIs should not exceed 50% of monthly income</li>
          <li><strong>Priority Order:</strong> Home > Education > Car > Personal</li>
          <li><strong>Emergency Fund First:</strong> Have 6-month expenses before taking loans</li>
          <li><strong>Prepayment Strategy:</strong> Target highest-interest loans first</li>
        </ul>

        <h4>Reducing EMI Burden:</h4>
        <ul>
          <li><strong>Increase Down Payment:</strong> 20% down reduces EMI by 20%</li>
          <li><strong>Balance Transfer:</strong> Switch to bank with 2% lower rate</li>
          <li><strong>Part-Prepayment:</strong> Use bonus/savings to reduce principal</li>
          <li><strong>Increase EMI with Salary:</strong> Pay 10-15% extra each year</li>
        </ul>

        <h4>Prepayment: Full vs Partial:</h4>
        <ul>
          <li><strong>Reduce Tenure:</strong> Keep same EMI, finish loan earlier</li>
          <li><strong>Reduce EMI:</strong> Lower monthly burden, same tenure</li>
          <li><strong>Recommendation:</strong> Reduce tenure for maximum interest savings</li>
        </ul>

        <div class="example-box">
          <h4>Prepayment Impact Example:</h4>
          <p><strong>Original:</strong> ₹10L loan, 10% interest, 10 years = ₹13,215 EMI</p>
          <p><strong>After 3 years,</strong> prepay ₹2 lakhs:</p>
          <ul>
            <li><strong>Option A (Reduce Tenure):</strong> EMI remains ₹13,215, finish in 6 years instead of 7</li>
            <li><strong>Option B (Reduce EMI):</strong> EMI reduces to ₹10,872, finish in 7 years</li>
            <li><strong>Interest Saved in Option A:</strong> ₹1.2 lakhs more than Option B!</li>
          </ul>
        </div>

        <h4>Common EMI Mistakes:</h4>
        <ul>
          <li>❌ Taking maximum loan amount bank offers</li>
          <li>❌ Choosing longest tenure to minimize EMI</li>
          <li>❌ Not considering other financial goals</li>
          <li>❌ Missing EMI payments (affects credit score)</li>
          <li>❌ Taking loans for depreciating assets (gadgets)</li>
        </ul>

        <h4>Smart EMI Planning:</h4>
        <ul>
          <li>✅ Use online EMI calculators before applying</li>
          <li>✅ Keep total EMI below 40% of income (50% is max)</li>
          <li>✅ Choose shortest affordable tenure</li>
          <li>✅ Set up auto-debit for EMI (never miss payment)</li>
          <li>✅ Review and prepay when you get salary hikes</li>
        </ul>
      `,
      keyPoints: [
        'EMI = [P × R × (1+R)^N] / [(1+R)^N-1] - fixed monthly payment',
        'Keep total EMIs below 50% of monthly income for safety',
        'Shorter tenure saves lakhs in interest (choose if affordable)',
        'Prepayment with tenure reduction saves maximum interest'
      ],
      quiz: [
        {
          question: 'Rahul earns ₹80,000/month. What is the maximum safe total EMI amount?',
          options: ['₹20,000', '₹30,000', '₹40,000', '₹60,000'],
          correct: 2,
          explanation: 'Maximum safe EMI limit is 50% of monthly income. For ₹80,000 salary: 50% = ₹40,000. This ensures ₹40,000 remains for other expenses, savings, and emergencies. Going beyond 50% causes financial stress.'
        },
        {
          question: 'For ₹10L loan at 10%, which tenure has LOWEST total interest?',
          options: ['20 years (₹9,650 EMI)', '10 years (₹13,215 EMI)', '5 years (₹21,247 EMI)', 'All same'],
          correct: 2,
          explanation: '5 years has lowest interest (₹2.75L) vs 10 years (₹5.86L) vs 20 years (₹13.16L). Shorter tenure = higher EMI but MUCH lower interest. If you can afford ₹21,247 EMI, choose 5 years to save ₹10 lakhs!'
        },
        {
          question: 'You have ₹1L to prepay. What gives maximum interest savings?',
          options: [
            'Reduce EMI, keep same tenure',
            'Reduce tenure, keep same EMI',
            'Both options are identical',
            'Don\'t prepay, invest in stocks'
          ],
          correct: 1,
          explanation: 'Reducing TENURE gives maximum interest savings! When you reduce tenure, you finish loan earlier and pay significantly less interest. Reducing EMI keeps you in debt longer with more interest. Always choose tenure reduction for prepayments.'
        },
        {
          question: 'Priya has 3 loans: Home (8%), Car (10%), Personal (14%). She has ₹50K to prepay. Which should she target?',
          options: [
            'Home loan (biggest amount)',
            'Personal loan (highest interest)',
            'Car loan (medium interest)',
            'Split equally among all'
          ],
          correct: 1,
          explanation: 'Prepay the HIGHEST INTEREST loan first! Personal loan at 14% costs most, so prepaying it saves maximum money. This is called "avalanche method" - always target highest rate first for maximum savings.'
        },
        {
          question: 'What happens if you miss an EMI payment?',
          options: [
            'Nothing, you can pay next month',
            'Late fee + negative impact on credit score',
            'Loan gets cancelled',
            'Interest rate increases'
          ],
          correct: 1,
          explanation: 'Missing EMI has SERIOUS consequences: (1) Late payment fee (₹500-1000), (2) Credit score drops by 50-100 points (affects future loans), (3) Bank can declare loan "NPA" after 90 days. Always set auto-debit for EMI payments!'
        },
        {
          question: 'For same loan amount and rate, doubling the tenure from 10 to 20 years approximately:',
          options: [
            'Doubles the EMI',
            'Halves the EMI',
            'Doubles the total interest paid',
            'Halves the total interest paid'
          ],
          correct: 2,
          explanation: 'Doubling tenure approximately DOUBLES the total interest! Example: ₹10L at 10% → 10 years = ₹5.86L interest, 20 years = ₹13.16L interest (2.2× more!). Longer tenure = much more interest. Choose shortest affordable tenure.'
        }
      ]
    },

    {
      id: 4,
      title: 'Credit Score',
      subtitle: 'Your Financial Report Card',
      duration: '6 mins',
      content: `
        <h3>What is Credit Score?</h3>
        <p>A 3-digit number (300-900) representing your creditworthiness. Higher score = better loan terms and faster approvals.</p>
        
        <h4>Credit Score Ranges:</h4>
        <table>
          <tr>
            <th>Score</th>
            <th>Rating</th>
            <th>Impact</th>
          </tr>
          <tr>
            <td>750-900</td>
            <td>Excellent</td>
            <td>Best rates, instant approval</td>
          </tr>
          <tr>
            <td>700-749</td>
            <td>Good</td>
            <td>Approved, moderate rates</td>
          </tr>
          <tr>
            <td>650-699</td>
            <td>Fair</td>
            <td>May need negotiation</td>
          </tr>
          <tr>
            <td>550-649</td>
            <td>Poor</td>
            <td>High rates or rejection</td>
          </tr>
          <tr>
            <td>Below 550</td>
            <td>Very Poor</td>
            <td>Likely rejection</td>
          </tr>
        </table>

        <h4>Credit Score Factors:</h4>
        <table>
          <tr>
            <th>Factor</th>
            <th>Weightage</th>
            <th>What It Means</th>
          </tr>
          <tr>
            <td>Payment History</td>
            <td>35%</td>
            <td>On-time EMI/credit card payments</td>
          </tr>
          <tr>
            <td>Credit Utilization</td>
            <td>30%</td>
            <td>% of credit limit used (<30% ideal)</td>
          </tr>
          <tr>
            <td>Credit Age</td>
            <td>15%</td>
            <td>How long you\'ve had credit</td>
          </tr>
          <tr>
            <td>Credit Mix</td>
            <td>10%</td>
            <td>Variety: secured + unsecured loans</td>
          </tr>
          <tr>
            <td>Recent Inquiries</td>
            <td>10%</td>
            <td>How many loan applications recently</td>
          </tr>
        </table>

        <h4>How to Build Excellent Credit Score:</h4>
        
        <h5>1. Payment History (35% - Most Important!)</h5>
        <ul>
          <li>✅ Pay ALL EMIs on time (set auto-debit)</li>
          <li>✅ Pay credit card bills in FULL before due date</li>
          <li>✅ Never miss even ₹100 payment (hurts score badly)</li>
          <li>❌ Even one 30-day delay drops score by 50-100 points</li>
        </ul>

        <h5>2. Credit Utilization (30%)</h5>
        <ul>
          <li>✅ Keep usage below 30% of credit limit</li>
          <li>✅ If limit is ₹1L, use max ₹30K</li>
          <li>✅ Pay before statement generation to show low usage</li>
          <li>✅ Request credit limit increase (lowers utilization%)</li>
        </ul>

        <h5>3. Credit Age (15%)</h5>
        <ul>
          <li>✅ Keep old credit cards active (increases average age)</li>
          <li>✅ Don\'t close oldest credit card</li>
          <li>✅ Start credit early (student card at 21)</li>
          <li>❌ Closing old accounts reduces credit age</li>
        </ul>

        <h5>4. Credit Mix (10%)</h5>
        <ul>
          <li>✅ Have mix of secured (home/car) + unsecured (personal/credit card)</li>
          <li>✅ 1-2 credit cards + 1 loan shows balanced credit</li>
          <li>❌ Having only credit cards or only loans is not ideal</li>
        </ul>

        <h5>5. Recent Inquiries (10%)</h5>
        <ul>
          <li>✅ Limit loan applications to 1-2 per year</li>
          <li>✅ Apply to multiple banks within 15-day window (counts as one)</li>
          <li>❌ Multiple applications in 6 months = desperate for credit</li>
          <li>❌ Each hard inquiry drops score by 5-10 points</li>
        </ul>

        <h4>Common Credit Score Mistakes:</h4>
        <ul>
          <li>❌ Paying minimum due on credit card (use full limit monthly)</li>
          <li>❌ Closing old credit cards</li>
          <li>❌ Not checking credit report regularly</li>
          <li>❌ Applying for multiple loans simultaneously</li>
          <li>❌ Becoming guarantor for others (you\'re liable if they default!)</li>
          <li>❌ Settling loans (shows as "settled" not "closed" - bad!)</li>
        </ul>

        <h4>How to Check Credit Score (Free):</h4>
        <ul>
          <li><strong>CIBIL:</strong> www.cibil.com (₹1200/year or free via bank apps)</li>
          <li><strong>Free Platforms:</strong> Paytm, PhonePe, CRED, OneScore (check monthly)</li>
          <li><strong>Bank Apps:</strong> Many banks show CIBIL score free</li>
          <li><strong>Frequency:</strong> Check every 3 months (doesn\'t affect score)</li>
        </ul>

        <h4>Improving Bad Credit Score:</h4>
        <p><strong>Timeline:</strong> 6-24 months depending on severity</p>
        <ol>
          <li><strong>Clear all dues:</strong> Pay off any pending EMIs/bills immediately</li>
          <li><strong>Check report:</strong> Get CIBIL report, identify errors</li>
          <li><strong>Dispute errors:</strong> File dispute for wrong entries (30-45 days)</li>
          <li><strong>Secured credit card:</strong> Get FD-backed card if regular card denied</li>
          <li><strong>Maintain 30% utilization:</strong> Use credit card but pay full</li>
          <li><strong>Wait it out:</strong> Negative marks stay 3-7 years (but impact reduces)</li>
        </ol>

        <div class="example-box">
          <h4>Real Example: Rahul\'s Score Journey</h4>
          <p><strong>Starting Point (Jan 2023):</strong> Score = 620 (Poor)</p>
          <p><strong>Issues:</strong> 2 missed EMIs, credit card utilization 85%</p>
          
          <p><strong>Actions Taken:</strong></p>
          <ul>
            <li>Set auto-debit for all EMIs</li>
            <li>Paid off 50% credit card debt</li>
            <li>Kept utilization below 30%</li>
            <li>Paid full bill before due date (6 months)</li>
          </ul>
          
          <p><strong>Result (Jul 2023):</strong> Score jumped to 745 in 6 months! Now eligible for home loan at 8.5%.</p>
        </div>

        <h4>Credit Score vs Loan Approval:</h4>
        <ul>
          <li><strong>750+:</strong> Approved within 24-48 hours, best rates (8-10%)</li>
          <li><strong>700-749:</strong> Approved in 3-5 days, moderate rates (10-12%)</li>
          <li><strong>650-699:</strong> May need collateral, higher rates (12-15%)</li>
          <li><strong>Below 650:</strong> Likely rejection or very high rates (18-24%)</li>
        </ul>

        <h4>Quick Score Improvement Hacks:</h4>
        <ul>
          <li>Pay credit card bill BEFORE statement date (shows 0% utilization)</li>
          <li>Request credit limit increase every 6 months</li>
          <li>Set up auto-debit for ALL recurring payments</li>
          <li>Become authorized user on parent\'s old credit card (inherits age)</li>
          <li>Use credit card for small purchases monthly and pay immediately</li>
        </ul>

        <div class="warning-box">
          <h4>⚠️ What DOESN\'T Affect Credit Score:</h4>
          <ul>
            <li>Checking your own score (soft inquiry)</li>
            <li>Income or salary</li>
            <li>Bank balance or savings</li>
            <li>Age, gender, caste, religion</li>
            <li>Job changes</li>
          </ul>
        </div>
      `,
      keyPoints: [
        'Credit score 750+ gives best loan rates and instant approvals',
        'Payment history (35%) is most important - never miss EMIs',
        'Keep credit card usage below 30% of limit',
        'Check score free on Paytm/PhonePe/CRED every 3 months'
      ],
      quiz: [
        {
          question: 'Which factor has MAXIMUM impact on credit score?',
          options: [
            'Credit utilization (30%)',
            'Payment history (35%)',
            'Credit age (15%)',
            'Recent inquiries (10%)'
          ],
          correct: 1,
          explanation: 'Payment history at 35% has maximum impact! Even ONE missed EMI payment can drop score by 50-100 points. Always pay ALL EMIs and credit card bills on time. Set auto-debit to never miss payments.'
        },
        {
          question: 'Priya has ₹1 lakh credit limit. What\'s the ideal maximum usage to maintain good score?',
          options: ['₹10,000', '₹30,000', '₹50,000', '₹90,000'],
          correct: 1,
          explanation: 'Keep usage below 30% of credit limit. For ₹1L limit: 30% = ₹30,000 maximum. Using ₹90K (90% utilization) badly hurts score - shows credit dependency. Banks prefer seeing you use credit responsibly, not maxing out.'
        },
        {
          question: 'TRUE or FALSE: Checking your own credit score hurts your score.',
          options: ['True - avoid checking', 'False - checking is safe'],
          correct: 1,
          explanation: 'FALSE! Checking your OWN score is a "soft inquiry" and does NOT hurt score. Check monthly via Paytm/CRED/PhonePe for free. Only "hard inquiries" (when bank checks for loan) affect score temporarily. Monitor regularly to track progress!'
        },
        {
          question: 'Rahul has score 620. How long to improve to 750+ with good behavior?',
          options: ['1 month', '3 months', '6-12 months', '5 years'],
          correct: 2,
          explanation: '6-12 months of consistent good behavior! Pay all EMIs on time, keep credit usage below 30%, don\'t apply for new loans. Score can jump 100-150 points in 6 months. But negative marks (defaults) stay 3-7 years.'
        },
        {
          question: 'What\'s the WORST thing for credit score?',
          options: [
            'Using 40% of credit limit',
            'Applying for 2 loans in a month',
            'Missing EMI payment by 60 days',
            'Closing an old credit card'
          ],
          correct: 2,
          explanation: 'Missing EMI by 60+ days is WORST! It drops score by 100+ points and stays on report for 3-7 years. Shows you\'re high-risk borrower. Even one default can block future loans for years. ALWAYS pay EMIs on time!'
        },
        {
          question: 'Smart strategy to improve credit score quickly?',
          options: [
            'Apply for multiple credit cards',
            'Close old unused credit cards',
            'Pay credit card bill BEFORE statement date',
            'Use full credit limit monthly'
          ],
          correct: 2,
          explanation: 'Pay BEFORE statement date! If you spend ₹20K but pay before statement generates, it reports as 0% utilization (excellent!). This hack can boost score by 30-50 points quickly. Also request limit increases every 6 months.'
        }
      ]
    }
  ]
};
