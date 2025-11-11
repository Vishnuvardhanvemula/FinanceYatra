/**
 * Module 1: Banking Basics
 * Complete lesson content with quizzes
 */

export const module1Content = {
  title: 'Banking Basics',
  lessons: [
    {
      id: 0,
      title: 'Savings Account',
      subtitle: 'Understanding Your First Bank Account',
      duration: '6 mins',
      content: `
        <h3>What is a Savings Account?</h3>
        <p>A savings account is the most basic and essential banking product designed to help you safely store your money while earning interest. It's your first step toward financial independence.</p>
        
        <h4>Key Features:</h4>
        <ul>
          <li><strong>Interest Earnings:</strong> Banks pay you 2.5% - 4% interest annually on your balance</li>
          <li><strong>Safety:</strong> Your deposits are insured up to ₹5 lakh by DICGC</li>
          <li><strong>Easy Access:</strong> Withdraw money anytime through ATM, net banking, or branch</li>
          <li><strong>Minimum Balance:</strong> Most banks require ₹1,000 - ₹10,000 minimum balance</li>
        </ul>

        <h4>Types of Savings Accounts:</h4>
        <ul>
          <li><strong>Regular Savings Account:</strong> For individuals with basic banking needs</li>
          <li><strong>Salary Account:</strong> Zero balance account for salaried employees</li>
          <li><strong>Women's Savings Account:</strong> Special benefits and higher interest rates for women</li>
          <li><strong>Senior Citizen Account:</strong> Higher interest rates (0.25% - 0.5% extra)</li>
          <li><strong>Kids Savings Account:</strong> Accounts for minors with parental control</li>
        </ul>

        <h4>How to Open a Savings Account:</h4>
        <ol>
          <li>Choose a bank (compare interest rates, branch network, digital services)</li>
          <li>Gather KYC documents: Aadhaar card, PAN card, address proof, passport-size photos</li>
          <li>Visit branch or apply online</li>
          <li>Fill application form with personal and nominee details</li>
          <li>Make initial deposit (₹100 - ₹1,000)</li>
          <li>Get your account number, debit card, and checkbook</li>
        </ol>

        <h4>Important Tips:</h4>
        <ul>
          <li>Link your Aadhaar and PAN for seamless transactions</li>
          <li>Activate internet and mobile banking immediately</li>
          <li>Set up SMS and email alerts for all transactions</li>
          <li>Never share your PIN, password, or OTP with anyone</li>
          <li>Maintain minimum balance to avoid penalty charges</li>
        </ul>
      `,
      keyPoints: [
        'Savings accounts earn 2.5% - 4% annual interest',
        'Deposits are insured up to ₹5 lakh',
        'Choose account type based on your needs',
        'Always maintain minimum balance to avoid charges'
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'What is the maximum amount insured by DICGC in a savings account?',
          options: ['₹1 lakh', '₹2 lakh', '₹5 lakh', '₹10 lakh'],
          correct: 2,
          explanation: 'DICGC (Deposit Insurance and Credit Guarantee Corporation) insures deposits up to ₹5 lakh per bank per depositor. This provides safety for your money even if the bank fails.'
        },
        {
          type: 'mcq',
          question: 'Which type of savings account typically requires ZERO minimum balance?',
          options: ['Regular Savings Account', 'Salary Account', 'Senior Citizen Account', 'Kids Savings Account'],
          correct: 1,
          explanation: 'Salary accounts are specifically designed for salaried employees and don\'t require any minimum balance. However, if no salary is credited for 2-3 months, it may be converted to a regular savings account.'
        },
        {
          type: 'scenario',
          question: 'Priya wants to open a savings account. She has ₹50,000 to deposit and makes frequent ATM withdrawals. Which feature should she prioritize?',
          context: 'Priya is a college student who needs regular access to her money for expenses.',
          options: [
            'Highest interest rate only',
            'Large branch network with many ATMs',
            'Minimum balance requirement',
            'Only online banking facility'
          ],
          correct: 1,
          explanation: 'Since Priya makes frequent withdrawals, a bank with a large ATM network is most important. This helps her avoid charges for using other banks\' ATMs and provides convenient access to her money.'
        },
        {
          type: 'truefalse',
          question: 'Senior citizens get extra interest (0.25%-0.5%) on their savings accounts.',
          options: ['True', 'False'],
          correct: 0,
          explanation: 'True! Most banks offer additional interest of 0.25% to 0.5% to senior citizens (60+ years) on savings accounts as a benefit for retired individuals.'
        },
        {
          type: 'mcq',
          question: 'What documents are mandatory for opening a savings account under KYC norms?',
          options: [
            'Only Aadhaar card',
            'Aadhaar and PAN card',
            'Only passport',
            'Only driving license'
          ],
          correct: 1,
          explanation: 'Under KYC (Know Your Customer) norms, both Aadhaar card (for identity and address proof) and PAN card (for tax purposes) are mandatory documents for opening a savings account in India.'
        }
      ]
    },
    {
      id: 1,
      title: 'Current Account',
      subtitle: 'Banking for Business and Frequent Transactions',
      duration: '5 mins',
      content: `
        <h3>What is a Current Account?</h3>
        <p>A current account is designed for businesses, professionals, and individuals who need to make frequent transactions. Unlike savings accounts, current accounts do not earn interest but offer unlimited transaction capabilities.</p>
        
        <h4>Key Features:</h4>
        <ul>
          <li><strong>Unlimited Transactions:</strong> No limit on number of deposits and withdrawals</li>
          <li><strong>Overdraft Facility:</strong> Withdraw more than your balance (subject to approval)</li>
          <li><strong>No Interest:</strong> Banks don't pay interest on current accounts</li>
          <li><strong>Higher Minimum Balance:</strong> Typically ₹5,000 - ₹25,000 required</li>
          <li><strong>Business Features:</strong> Multiple user access, cash management services</li>
        </ul>

        <h4>Who Needs a Current Account?</h4>
        <ul>
          <li><strong>Business Owners:</strong> For daily business transactions and payments</li>
          <li><strong>Freelancers & Professionals:</strong> Separate account for professional income</li>
          <li><strong>Traders:</strong> High-frequency transactions without limits</li>
          <li><strong>Companies & Partnerships:</strong> Required for registered businesses</li>
        </ul>

        <h4>Types of Current Accounts:</h4>
        <ul>
          <li><strong>Regular Current Account:</strong> For small businesses and professionals</li>
          <li><strong>Premium Current Account:</strong> Additional features for medium businesses</li>
          <li><strong>Packaged Current Account:</strong> Bundled with insurance and other services</li>
          <li><strong>Foreign Currency Account:</strong> For businesses dealing in foreign exchange</li>
        </ul>

        <h4>Overdraft Facility:</h4>
        <p>An overdraft allows you to withdraw more money than you have in your account, up to a pre-approved limit. This is useful for managing short-term cash flow issues.</p>
        <ul>
          <li>Interest charged only on the amount used</li>
          <li>Flexible repayment options</li>
          <li>Requires good credit history</li>
          <li>Typical rate: 10% - 14% per annum</li>
        </ul>

        <h4>Documents Required:</h4>
        <ul>
          <li>Business registration certificate</li>
          <li>PAN card of business and owners</li>
          <li>Address proof of business premises</li>
          <li>Partnership deed or MOA/AOA for companies</li>
          <li>Board resolution for authorized signatories</li>
        </ul>
      `,
      keyPoints: [
        'Current accounts are for businesses and frequent transactions',
        'No interest earned, but unlimited transactions allowed',
        'Overdraft facility available for cash flow management',
        'Higher minimum balance requirement than savings accounts'
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'What is the main difference between a savings account and a current account?',
          options: [
            'Current accounts earn higher interest',
            'Current accounts allow unlimited transactions but don\'t earn interest',
            'Savings accounts require higher minimum balance',
            'Current accounts are only for individuals'
          ],
          correct: 1,
          explanation: 'Current accounts are designed for businesses with unlimited transaction capabilities but don\'t earn any interest. Savings accounts earn interest (2.5%-4%) but may have transaction limits.'
        },
        {
          type: 'scenario',
          question: 'Rajesh runs a small retail shop with daily sales of ₹20,000-₹30,000. He makes 50-60 transactions daily. Which account should he choose?',
          context: 'Rajesh needs to deposit daily sales, pay suppliers, and manage multiple transactions.',
          options: [
            'Regular Savings Account',
            'Fixed Deposit',
            'Current Account',
            'Recurring Deposit'
          ],
          correct: 2,
          explanation: 'Rajesh should open a Current Account because it offers unlimited transactions without restrictions, which is essential for his business with 50-60 daily transactions. Savings accounts have transaction limits.'
        },
        {
          type: 'calculation',
          question: 'If a current account has a minimum balance requirement of ₹10,000 and offers overdraft facility up to ₹50,000 at 12% annual interest, how much interest will be charged if you use ₹30,000 overdraft for 2 months?',
          options: [
            '₹600',
            '₹3,600',
            '₹1,200',
            '₹7,200'
          ],
          correct: 0,
          explanation: 'Interest = Principal × Rate × Time. Here: ₹30,000 × 12% × (2/12) = ₹30,000 × 0.12 × 0.1667 = ₹600. Overdraft interest is calculated only on the amount used and for the period used.'
        },
        {
          type: 'truefalse',
          question: 'Freelancers and self-employed professionals don\'t need a current account since they are not running a registered company.',
          options: ['True', 'False'],
          correct: 1,
          explanation: 'False! Freelancers and self-employed professionals benefit from current accounts as they help separate personal and professional finances, handle frequent client payments, and maintain better financial records even without company registration.'
        },
        {
          type: 'mcq',
          question: 'What is the typical minimum balance requirement for a current account?',
          options: [
            '₹500 - ₹1,000',
            '₹5,000 - ₹25,000',
            '₹50,000 - ₹1,00,000',
            'No minimum balance required'
          ],
          correct: 1,
          explanation: 'Current accounts typically require ₹5,000 to ₹25,000 as minimum balance, which is significantly higher than savings accounts. This is because they are designed for businesses with higher transaction volumes.'
        }
      ]
    },
    {
      id: 2,
      title: 'Fixed Deposits (FD)',
      subtitle: 'Guaranteed Returns with Fixed Tenure',
      duration: '7 mins',
      content: `
        <h3>What is a Fixed Deposit?</h3>
        <p>A Fixed Deposit (FD) is a secure investment where you deposit a lump sum for a fixed period and earn guaranteed interest. It's one of the safest investment options with predictable returns.</p>
        
        <h4>Key Features:</h4>
        <ul>
          <li><strong>Fixed Interest Rate:</strong> Interest rate locked at the time of deposit</li>
          <li><strong>Higher Returns:</strong> 5% - 8% interest per annum (higher than savings)</li>
          <li><strong>Flexible Tenure:</strong> 7 days to 10 years</li>
          <li><strong>Safety:</strong> Insured up to ₹5 lakh by DICGC</li>
          <li><strong>Loan Facility:</strong> Get loan against FD (80% - 90% of FD value)</li>
        </ul>

        <h4>Types of Fixed Deposits:</h4>
        <ul>
          <li><strong>Regular FD:</strong> Fixed tenure, interest paid at maturity or periodically</li>
          <li><strong>Tax Saver FD:</strong> 5-year lock-in, eligible for 80C tax deduction</li>
          <li><strong>Senior Citizen FD:</strong> Extra 0.25% - 0.5% interest for seniors</li>
          <li><strong>Cumulative FD:</strong> Interest compounded and paid at maturity</li>
          <li><strong>Non-Cumulative FD:</strong> Interest paid monthly, quarterly, or annually</li>
          <li><strong>Flexi FD:</strong> Automatic sweep-in facility from savings to FD</li>
        </ul>

        <h4>Interest Rate Factors:</h4>
        <ul>
          <li><strong>Tenure:</strong> Longer tenure = higher interest rates</li>
          <li><strong>Bank Type:</strong> Small finance banks offer 7.5% - 9%, scheduled banks offer 5% - 7%</li>
          <li><strong>Senior Citizens:</strong> Additional 0.25% - 0.5% interest</li>
          <li><strong>Deposit Amount:</strong> Some banks offer higher rates for larger deposits</li>
        </ul>

        <h4>Example Calculation:</h4>
        <p><strong>Investment:</strong> ₹1,00,000 for 5 years at 7% per annum (compounded quarterly)</p>
        <ul>
          <li>Maturity Amount: ₹1,41,478</li>
          <li>Interest Earned: ₹41,478</li>
          <li>Quarterly Compounding Benefit: ₹828 extra vs simple interest</li>
        </ul>

        <h4>Premature Withdrawal:</h4>
        <ul>
          <li>You can break FD before maturity</li>
          <li>Penalty: 0.5% - 1% reduction in interest rate</li>
          <li>No penalty in case of senior citizen death</li>
          <li>Better to use loan against FD instead of breaking it</li>
        </ul>

        <h4>Tax Implications:</h4>
        <ul>
          <li>Interest income is fully taxable as per your income tax slab</li>
          <li>TDS deducted if interest exceeds ₹40,000 per year (₹50,000 for seniors)</li>
          <li>Submit Form 15G/15H if your income is below taxable limit</li>
          <li>Tax Saver FD offers deduction under Section 80C (up to ₹1.5 lakh)</li>
        </ul>

        <h4>When to Choose FD:</h4>
        <ul>
          <li>For short-term goals (1-5 years)</li>
          <li>When you need guaranteed, risk-free returns</li>
          <li>For emergency fund (choose short tenure or flexi FD)</li>
          <li>For senior citizens looking for regular income</li>
          <li>To save tax using 5-year tax saver FD</li>
        </ul>
      `,
      keyPoints: [
        'FDs offer guaranteed returns of 5% - 8% per annum',
        'Longer tenure means higher interest rates',
        'Senior citizens get extra 0.25% - 0.5% interest',
        'Interest income is taxable as per your tax slab'
      ],
      quiz: [
        {
          type: 'calculation',
          question: 'You invest ₹1,00,000 in an FD for 3 years at 7% per annum with quarterly compounding. What will be the approximate maturity amount?',
          options: [
            '₹1,21,000',
            '₹1,23,000',
            '₹1,25,000',
            '₹1,27,000'
          ],
          correct: 1,
          explanation: 'With quarterly compounding at 7% for 3 years, the formula is: A = P(1 + r/4)^(4×3). This gives approximately ₹1,23,000. Quarterly compounding gives better returns than simple interest.'
        },
        {
          type: 'mcq',
          question: 'What is the lock-in period for a Tax Saver FD that qualifies for Section 80C deduction?',
          options: [
            '1 year',
            '3 years',
            '5 years',
            '10 years'
          ],
          correct: 2,
          explanation: 'Tax Saver FDs have a mandatory lock-in period of 5 years and qualify for tax deduction under Section 80C up to ₹1.5 lakh. You cannot withdraw or take a loan against this FD during the lock-in period.'
        },
        {
          type: 'scenario',
          question: 'Meera has ₹5 lakh and needs monthly income for household expenses. Which FD option suits her best?',
          context: 'Meera is 62 years old, retired, and wants regular monthly income without taking risks.',
          options: [
            'Cumulative FD with maturity payout',
            'Non-cumulative FD with monthly interest payout',
            'Tax Saver FD',
            'Flexi FD with sweep-in facility'
          ],
          correct: 1,
          explanation: 'Non-cumulative FD with monthly interest payout is ideal for Meera. It provides regular monthly income while keeping the principal safe. As a senior citizen, she\'ll also get 0.25%-0.5% extra interest.'
        },
        {
          type: 'truefalse',
          question: 'Breaking an FD before maturity always results in complete loss of interest earned.',
          options: ['True', 'False'],
          correct: 1,
          explanation: 'False! When you prematurely withdraw an FD, you still get interest but at a reduced rate (typically 0.5%-1% less than the contracted rate). You don\'t lose all the interest, just a penalty is applied.'
        },
        {
          type: 'mcq',
          question: 'What is the maximum amount you can borrow as a loan against your FD?',
          options: [
            '50% - 60% of FD value',
            '70% - 75% of FD value',
            '80% - 90% of FD value',
            '100% of FD value'
          ],
          correct: 2,
          explanation: 'Banks typically offer loans of 80%-90% of the FD value. This is better than breaking the FD because you keep earning interest on the FD while paying interest on the loan (difference is only 1%-2%).'
        }
      ]
    },
    {
      id: 3,
      title: 'Recurring Deposits (RD)',
      subtitle: 'Build Savings with Monthly Deposits',
      duration: '6 mins',
      content: `
        <h3>What is a Recurring Deposit?</h3>
        <p>A Recurring Deposit (RD) is a savings scheme where you deposit a fixed amount every month for a predetermined period and earn interest on the accumulated amount. It's perfect for building savings discipline.</p>
        
        <h4>Key Features:</h4>
        <ul>
          <li><strong>Monthly Deposits:</strong> Fixed amount deposited every month</li>
          <li><strong>Flexible Amount:</strong> Start with as low as ₹100 per month</li>
          <li><strong>Fixed Tenure:</strong> 6 months to 10 years</li>
          <li><strong>Interest Rate:</strong> Similar to FD rates (5% - 8% per annum)</li>
          <li><strong>Disciplined Saving:</strong> Builds habit of regular savings</li>
        </ul>

        <h4>How RD Works:</h4>
        <ol>
          <li>Choose monthly deposit amount (e.g., ₹5,000)</li>
          <li>Select tenure (e.g., 3 years)</li>
          <li>Bank automatically debits amount from savings account every month</li>
          <li>Interest calculated quarterly and compounded</li>
          <li>At maturity, receive principal + interest</li>
        </ol>

        <h4>Example Calculation:</h4>
        <p><strong>Monthly Deposit:</strong> ₹5,000 for 3 years at 7% interest</p>
        <ul>
          <li>Total Deposits: ₹5,000 × 36 months = ₹1,80,000</li>
          <li>Interest Earned: ₹20,432</li>
          <li>Maturity Amount: ₹2,00,432</li>
          <li>Your money grows by 11.4%!</li>
        </ul>

        <h4>RD vs FD - Which is Better?</h4>
        <table>
          <tr>
            <th>Feature</th>
            <th>Recurring Deposit</th>
            <th>Fixed Deposit</th>
          </tr>
          <tr>
            <td>Investment</td>
            <td>Monthly installments</td>
            <td>Lump sum</td>
          </tr>
          <tr>
            <td>Best For</td>
            <td>Salaried persons, regular savers</td>
            <td>Those with lump sum money</td>
          </tr>
          <tr>
            <td>Interest Rate</td>
            <td>5% - 8%</td>
            <td>5% - 8% (slightly higher)</td>
          </tr>
          <tr>
            <td>Flexibility</td>
            <td>Requires monthly commitment</td>
            <td>One-time investment</td>
          </tr>
        </table>

        <h4>Benefits of RD:</h4>
        <ul>
          <li><strong>Builds Savings Habit:</strong> Forced monthly savings</li>
          <li><strong>No Large Capital Needed:</strong> Start with small amounts</li>
          <li><strong>Goal-Based Saving:</strong> Perfect for future expenses (vacation, gadgets)</li>
          <li><strong>Safe Investment:</strong> Guaranteed returns, insured by DICGC</li>
          <li><strong>Flexible Tenure:</strong> Choose based on your goal timeline</li>
        </ul>

        <h4>Penalties & Rules:</h4>
        <ul>
          <li><strong>Missed Installment:</strong> ₹1.5 - ₹5 per month penalty (varies by bank)</li>
          <li><strong>Default Period:</strong> If 3-4 consecutive months missed, RD may be closed</li>
          <li><strong>Premature Withdrawal:</strong> 1% penalty on interest rate</li>
          <li><strong>Partial Withdrawal:</strong> Not allowed (must close entire RD)</li>
        </ul>

        <h4>Tax Implications:</h4>
        <ul>
          <li>Interest earned is taxable as per your income tax slab</li>
          <li>TDS applicable if interest exceeds ₹40,000 per year</li>
          <li>No tax benefit available (unlike PPF or tax saver FD)</li>
          <li>Include RD interest in your income tax return</li>
        </ul>

        <h4>Ideal Use Cases:</h4>
        <ul>
          <li><strong>Emergency Fund:</strong> Build 6 months of expenses over 2-3 years</li>
          <li><strong>Future Purchase:</strong> Save for car, bike, gadgets, vacation</li>
          <li><strong>Festival Savings:</strong> Plan for Diwali, wedding expenses</li>
          <li><strong>Education:</strong> Save for child's tuition, coaching fees</li>
          <li><strong>Down Payment:</strong> Accumulate for home loan down payment</li>
        </ul>
      `,
      keyPoints: [
        'RD helps build savings discipline with monthly deposits',
        'Interest rates similar to FD (5% - 8%)',
        'Perfect for salaried persons and goal-based savings',
        'Penalty for missed installments, so set up auto-debit'
      ],
      quiz: [
        {
          type: 'calculation',
          question: 'If you deposit ₹2,000 per month in an RD for 2 years at 6.5% interest, what will be your approximate maturity amount?',
          options: [
            '₹48,000',
            '₹49,680',
            '₹50,450',
            '₹51,200'
          ],
          correct: 1,
          explanation: 'Total deposits = ₹2,000 × 24 = ₹48,000. With 6.5% interest compounded quarterly on RD, the interest earned is approximately ₹1,680. Maturity amount ≈ ₹49,680.'
        },
        {
          type: 'scenario',
          question: 'Amit wants to buy a bike costing ₹1,20,000 after 2 years. He can save ₹4,500 per month. What should he do?',
          context: 'Amit is salaried and gets paid on the 1st of every month.',
          options: [
            'Keep cash at home',
            'Open RD with ₹4,500 monthly deposit',
            'Invest in stocks',
            'Open a savings account only'
          ],
          correct: 1,
          explanation: 'RD is perfect for Amit\'s goal-based saving. With ₹4,500/month for 24 months, he\'ll deposit ₹1,08,000 and earn ₹8,000-10,000 as interest (at 7%), reaching his ₹1,20,000 target safely.'
        },
        {
          type: 'mcq',
          question: 'What happens if you miss 3-4 consecutive monthly installments in an RD?',
          options: [
            'Nothing, you can continue normally',
            'Only penalty charges are applied',
            'The RD may be closed by the bank',
            'Interest rate is increased'
          ],
          correct: 2,
          explanation: 'If you miss 3-4 consecutive installments, the bank may close your RD account. The accumulated amount with interest (minus penalties) will be returned to you. It\'s important to set up auto-debit to avoid this.'
        },
        {
          type: 'truefalse',
          question: 'You can partially withdraw money from an RD account without closing it.',
          options: ['True', 'False'],
          correct: 1,
          explanation: 'False! Unlike savings accounts, RDs don\'t allow partial withdrawals. If you need money, you must close the entire RD, which attracts a penalty (typically 1% reduction in interest rate).'
        },
        {
          type: 'mcq',
          question: 'What is the typical penalty for missing an RD installment?',
          options: [
            '₹0.50 - ₹1 per month',
            '₹1.50 - ₹5 per month',
            '₹10 - ₹20 per month',
            '₹50 - ₹100 per month'
          ],
          correct: 1,
          explanation: 'Most banks charge ₹1.50 to ₹5 per month as penalty for missed installments. While small, repeated defaults can lead to RD closure. Always set up auto-debit to avoid penalties.'
        }
      ]
    },
    {
      id: 4,
      title: 'Bank Services',
      subtitle: 'Essential Banking Services for Everyday Use',
      duration: '6 mins',
      content: `
        <h3>Essential Banking Services</h3>
        <p>Modern banks offer a wide range of services beyond just savings and deposits. Understanding these services helps you manage money efficiently and securely.</p>
        
        <h4>1. ATM Services</h4>
        <ul>
          <li><strong>Cash Withdrawal:</strong> 24/7 access to your money</li>
          <li><strong>Balance Inquiry:</strong> Check account balance anytime</li>
          <li><strong>Mini Statement:</strong> View last 5-10 transactions</li>
          <li><strong>PIN Change:</strong> Update ATM PIN securely</li>
          <li><strong>Cash Deposit:</strong> Some ATMs accept cash deposits</li>
          <li><strong>Fund Transfer:</strong> Transfer money to other accounts</li>
        </ul>
        <p><strong>Free Transactions:</strong> 5 free transactions per month at own bank ATMs, 3 free at other bank ATMs in metro cities (5 in non-metro)</p>

        <h4>2. Net Banking / Internet Banking</h4>
        <ul>
          <li><strong>Fund Transfer:</strong> NEFT, RTGS, IMPS for instant transfers</li>
          <li><strong>Bill Payments:</strong> Pay electricity, water, phone, DTH bills</li>
          <li><strong>Mobile Recharge:</strong> Prepaid and postpaid recharge</li>
          <li><strong>Account Statement:</strong> Download statements anytime</li>
          <li><strong>FD/RD Creation:</strong> Open deposits online</li>
          <li><strong>Loan Application:</strong> Apply for personal, home, car loans</li>
          <li><strong>Cheque Book Request:</strong> Order new cheque books</li>
          <li><strong>Stop Payment:</strong> Stop issued cheques</li>
        </ul>

        <h4>3. Mobile Banking</h4>
        <ul>
          <li><strong>UPI Payments:</strong> Instant payments using mobile number/UPI ID</li>
          <li><strong>Quick Transfer:</strong> Send money using mobile number</li>
          <li><strong>QR Code Scanning:</strong> Pay at shops by scanning QR code</li>
          <li><strong>Request Money:</strong> Send payment requests to others</li>
          <li><strong>Transaction Alerts:</strong> Real-time notifications</li>
          <li><strong>Biometric Security:</strong> Fingerprint/face unlock</li>
        </ul>

        <h4>4. Cheque Services</h4>
        <ul>
          <li><strong>Cheque Book:</strong> 10-25 cheque leaves per book</li>
          <li><strong>Cheque Types:</strong> Bearer, Order, Crossed, Account Payee</li>
          <li><strong>Post-Dated Cheque:</strong> Cheque with future date</li>
          <li><strong>Stop Payment:</strong> Cancel issued cheque (charges apply)</li>
          <li><strong>Clearing Time:</strong> 2-3 working days for clearance</li>
        </ul>
        <p><strong>Important:</strong> Always write cheques clearly, never sign blank cheques, and maintain sufficient balance to avoid cheque bounce penalties.</p>

        <h4>5. Demand Draft (DD) & Pay Orders</h4>
        <ul>
          <li><strong>Demand Draft:</strong> Guaranteed payment instrument for inter-city payments</li>
          <li><strong>Pay Order:</strong> Similar to DD but for same-city payments</li>
          <li><strong>Usage:</strong> College fees, security deposits, official payments</li>
          <li><strong>Charges:</strong> ₹50 - ₹100 per DD/Pay Order</li>
          <li><strong>Validity:</strong> 3 months from date of issue</li>
        </ul>

        <h4>6. Locker Facilities</h4>
        <ul>
          <li><strong>Safe Storage:</strong> Store jewelry, documents, valuables</li>
          <li><strong>Sizes Available:</strong> Small, Medium, Large</li>
          <li><strong>Annual Rent:</strong> ₹1,000 - ₹10,000 depending on size and location</li>
          <li><strong>Access:</strong> Only locker holder can access (with bank staff present)</li>
          <li><strong>Insurance:</strong> Not automatically covered; consider separate insurance</li>
        </ul>

        <h4>7. SMS & Email Alerts</h4>
        <ul>
          <li><strong>Transaction Alerts:</strong> Every debit/credit notification</li>
          <li><strong>Balance Alerts:</strong> When balance falls below threshold</li>
          <li><strong>Card Alerts:</strong> ATM/Card transactions, online payments</li>
          <li><strong>Bill Reminders:</strong> Credit card bill, loan EMI reminders</li>
          <li><strong>Security Alerts:</strong> Suspicious activity detection</li>
        </ul>
        <p><strong>Pro Tip:</strong> Enable alerts for all transactions – it's the first line of defense against fraud!</p>

        <h4>8. Nomination Facility</h4>
        <ul>
          <li><strong>Importance:</strong> Ensures your money goes to the right person after you</li>
          <li><strong>Who to Nominate:</strong> Spouse, parents, children</li>
          <li><strong>Multiple Nominees:</strong> Split percentages among nominees</li>
          <li><strong>Update Anytime:</strong> Change nominee as life circumstances change</li>
        </ul>

        <h4>9. Foreign Exchange Services</h4>
        <ul>
          <li><strong>Currency Exchange:</strong> Buy/sell foreign currency for travel</li>
          <li><strong>Forex Card:</strong> Prepaid card in foreign currency</li>
          <li><strong>Traveler's Cheques:</strong> Safe alternative to cash</li>
          <li><strong>Wire Transfer:</strong> Send money abroad</li>
          <li><strong>Rates:</strong> Check bank's forex rates before exchange</li>
        </ul>

        <h4>10. Banking Ombudsman</h4>
        <ul>
          <li><strong>Complaint Resolution:</strong> RBI-appointed authority for customer grievances</li>
          <li><strong>Free Service:</strong> No fees for filing complaints</li>
          <li><strong>Timeline:</strong> Bank must respond within 30 days</li>
          <li><strong>Issues Covered:</strong> Unauthorized transactions, service deficiency, charges dispute</li>
          <li><strong>How to Complain:</strong> First complain to bank, then approach ombudsman if unsatisfied</li>
        </ul>

        <h4>Digital Banking Security Tips:</h4>
        <ul>
          <li>Never share OTP, PIN, or password with anyone (not even bank staff)</li>
          <li>Use strong passwords with mix of letters, numbers, symbols</li>
          <li>Enable two-factor authentication for all transactions</li>
          <li>Logout after every net banking session</li>
          <li>Don't use public Wi-Fi for banking transactions</li>
          <li>Check bank statement regularly for unauthorized transactions</li>
          <li>Update mobile number and email for alerts</li>
          <li>Install bank's official app only (check developer name)</li>
        </ul>
      `,
      keyPoints: [
        'Net banking and mobile banking offer 24/7 banking convenience',
        'Enable SMS alerts for all transactions for security',
        'Use ATMs wisely – 5 free transactions per month',
        'Never share OTP, PIN, or password with anyone'
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'How many free ATM transactions per month are allowed at your own bank\'s ATMs?',
          options: [
            '3 transactions',
            '5 transactions',
            '10 transactions',
            'Unlimited transactions'
          ],
          correct: 1,
          explanation: 'You get 5 free transactions per month at your own bank\'s ATMs. At other banks\' ATMs, you get 3 free transactions in metro cities and 5 in non-metro cities. After that, ₹20-21 is charged per transaction.'
        },
        {
          type: 'scenario',
          question: 'Ravi receives an SMS: "Your account will be blocked. Click link and enter OTP to reactivate." What should he do?',
          context: 'The SMS looks like it\'s from his bank and has a link.',
          options: [
            'Click the link and enter OTP immediately',
            'Call the number in the SMS',
            'Ignore the SMS and call bank\'s official customer care',
            'Forward the SMS to friends for advice'
          ],
          correct: 2,
          explanation: 'This is a phishing scam! Banks NEVER ask for OTP, PIN, or password via SMS/email. Ravi should ignore the SMS and call his bank\'s official customer care number (printed on debit card or passbook) to verify.'
        },
        {
          type: 'mcq',
          question: 'What is UPI in mobile banking?',
          options: [
            'Universal Payment Interface for instant money transfer',
            'United Payment Integration for bill payments',
            'User Password Identification for security',
            'Universal Phone Identification for KYC'
          ],
          correct: 0,
          explanation: 'UPI (Unified Payments Interface) is a real-time payment system that allows instant money transfer between bank accounts using a mobile number, UPI ID, or QR code. It\'s fast, secure, and free!'
        },
        {
          type: 'truefalse',
          question: 'You should enable SMS alerts only for large transactions to avoid too many messages.',
          options: ['True', 'False'],
          correct: 1,
          explanation: 'False! Enable SMS alerts for ALL transactions, no matter how small. This is your first line of defense against fraud. If you see an unauthorized transaction, you can report it immediately and block your card.'
        },
        {
          type: 'mcq',
          question: 'What is the clearing time for a cheque deposited in your bank account?',
          options: [
            'Same day',
            '1 working day',
            '2-3 working days',
            '7 working days'
          ],
          correct: 2,
          explanation: 'Cheques typically take 2-3 working days for clearance. This is the time needed for the bank to verify funds with the issuing bank. Same-city cheques may clear in 1-2 days, while outstation cheques take 3-4 days.'
        },
        {
          type: 'scenario',
          question: 'Priya wants to pay her son\'s college fees of ₹1,50,000. The college doesn\'t accept cash or cheques. What banking service should she use?',
          context: 'The college wants guaranteed payment with a reference number.',
          options: [
            'Cash deposit at college',
            'Demand Draft (DD)',
            'Personal cheque',
            'ATM transfer'
          ],
          correct: 1,
          explanation: 'Demand Draft (DD) is perfect for this situation. It\'s a guaranteed payment instrument that costs ₹50-100, provides a reference number, and is widely accepted for official payments like college fees, security deposits, etc.'
        }
      ]
    }
  ]
};
