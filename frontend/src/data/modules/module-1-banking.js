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
      subtitle: 'Your First Step to Financial Freedom',
      duration: '6 mins',
      content: `
        <h3>What is a Savings Account?</h3>
        <p>Think of a savings account as your <strong>digital piggy bank</strong>, but better! It's the most essential banking product where you can safely park your money while it earns interest for you. It's usually the first relationship anyone starts with a bank.</p>
        
        <div class="bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500 my-4">
          <h4 class="text-blue-300 m-0">💡 Pro Tip</h4>
          <p class="m-0 text-sm">Don't just leave your money idle at home! In a savings account, your money grows automatically thanks to compound interest.</p>
        </div>

        <h4>Why Do You Need One?</h4>
        <ul>
          <li><strong>💰 Earn Interest:</strong> Banks pay you <strong>2.5% - 4%</strong> interest annually just for keeping your money with them.</li>
          <li><strong>🛡️ Safety First:</strong> Your deposits are insured up to <strong>₹5 Lakh</strong> by DICGC. Even if the bank fails, your money is safe.</li>
          <li><strong>🏧 Instant Access:</strong> Need cash? Withdraw anytime via ATMs, UPI, or Net Banking.</li>
          <li><strong>💳 Go Cashless:</strong> Get a Debit Card to shop online, pay bills, and book tickets.</li>
        </ul>

        <h4>Types of Accounts (Choose What Fits You)</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-gray-800 p-3 rounded">
            <strong>Regular Savings</strong>
            <p class="text-sm text-gray-400">Standard account for everyone. Requires a minimum balance (e.g., ₹1,000 - ₹10,000).</p>
          </div>
          <div class="bg-gray-800 p-3 rounded">
            <strong>Salary Account</strong>
            <p class="text-sm text-gray-400">For employees. Zero minimum balance required as long as salary is credited.</p>
          </div>
          <div class="bg-gray-800 p-3 rounded">
            <strong>Zero Balance / Basic</strong>
            <p class="text-sm text-gray-400">Great for students! No minimum balance penalty, but may have transaction limits.</p>
          </div>
          <div class="bg-gray-800 p-3 rounded">
            <strong>Senior Citizen</strong>
            <p class="text-sm text-gray-400">For those 60+. Offers higher interest rates and priority service.</p>
          </div>
        </div>

        <h4>How to Open One?</h4>
        <ol>
          <li><strong>Pick a Bank:</strong> Compare interest rates and app experience.</li>
          <li><strong>KYC is Key:</strong> You'll need your <strong>Aadhaar Card</strong> and <strong>PAN Card</strong>.</li>
          <li><strong>Apply:</strong> Visit a branch or do it online via Video KYC (takes 5 mins!).</li>
          <li><strong>Nomination:</strong> Always add a nominee (family member) who can claim funds in unfortunate events.</li>
        </ol>

        [KYC_DETECTIVE]

        <div class="bg-green-900/30 p-4 rounded-lg border border-green-500/30 my-4">
          <h4 class="text-green-300 m-0">🌟 Real Life Example</h4>
          <p class="m-0 text-sm"><strong>Rahul (22)</strong> just got his first job. He opened a <strong>Salary Account</strong> so he doesn't have to worry about maintaining a minimum balance. He also linked his UPI to this account for easy daily payments.</p>
        </div>
      `,
      keyPoints: [
        'Savings accounts earn you 2.5% - 4% interest annually',
        'Your money is insured up to ₹5 Lakh by DICGC',
        'Salary accounts typically have ZERO minimum balance requirement',
        'Always add a nominee to secure your family\'s future'
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'What is the maximum amount insured by DICGC in your savings account?',
          options: ['₹1 Lakh', '₹2 Lakh', '₹5 Lakh', '₹10 Lakh'],
          correct: 2,
          explanation: 'Your deposits are insured up to ₹5 Lakh per bank by the DICGC. This means even in the rare case a bank fails, your money up to this limit is 100% safe.'
        },
        {
          type: 'scenario',
          question: 'Sarah is a college student with no regular income. She wants to save her pocket money but can\'t maintain a high balance. Which account is best?',
          context: 'Sarah needs a safe place for her savings without penalty charges.',
          options: [
            'Regular Savings Account (Min Bal: ₹10,000)',
            'Zero Balance / Basic Savings Account',
            'Current Account',
            'Fixed Deposit'
          ],
          correct: 1,
          explanation: 'A Zero Balance (BSBDA) account is perfect for students like Sarah. It allows her to save without the stress or penalty of maintaining a minimum monthly balance.'
        },
        {
          type: 'truefalse',
          question: 'You should share your UPI PIN with the bank manager if they call you for verification.',
          options: ['True', 'False'],
          correct: 1,
          explanation: 'FALSE! Never share your PIN, OTP, or Password with anyone, even if they claim to be from the bank. Bank officials will NEVER ask for these details.'
        },
        {
          type: 'mcq',
          question: 'Why is a "Salary Account" better for employees?',
          options: [
            'It has a higher interest rate',
            'It usually requires ZERO minimum balance',
            'It allows unlimited free ATM withdrawals',
            'It comes with a free credit card always'
          ],
          correct: 1,
          explanation: 'The biggest advantage of a Salary Account is the Zero Minimum Balance requirement. As long as your salary is credited regularly, you don\'t need to keep a fixed amount in the account.'
        },
        {
          type: 'scenario',
          question: 'Rahul wants to open a bank account. He has his Aadhaar card but lost his PAN card. Can he still open a regular savings account?',
          context: 'KYC norms are strict for banking.',
          options: [
            'Yes, Aadhaar is enough',
            'No, PAN (or Form 60) is mandatory',
            'Yes, if he promises to submit it later',
            'Yes, with a driving license only'
          ],
          correct: 1,
          explanation: 'For a regular savings account, a PAN Card (or Form 60 if you don\'t have one) is mandatory along with officially valid documents like Aadhaar. It is required for tax tracking purposes.'
        }
      ]
    },
    {
      id: 1,
      title: 'Current Account',
      subtitle: 'The Business Powerhouse',
      duration: '5 mins',
      content: `
        <h3>What is a Current Account?</h3>
        <p>While a savings account is for saving, a <strong>Current Account</strong> is built for <strong>spending and transacting</strong>. It is designed specifically for businesses, shop owners, and professionals who make a large number of transactions daily.</p>
        
        <div class="bg-yellow-900/30 p-4 rounded-lg border-l-4 border-yellow-500 my-4">
          <h4 class="text-yellow-300 m-0">⚠️ Crucial Difference</h4>
          <p class="m-0 text-sm">Current Accounts earn <strong>0% Interest</strong>. Yes, you read that right! The benefit isn't interest; it's the freedom to transact without limits.</p>
        </div>

        <h4>Savings vs. Current: The Showdown</h4>
        <table class="w-full text-sm text-left border-collapse my-4">
          <thead>
            <tr class="border-b border-gray-700 text-gray-300">
              <th class="py-2">Feature</th>
              <th class="py-2">Savings Account</th>
              <th class="py-2">Current Account</th>
            </tr>
          </thead>
          <tbody class="text-gray-400">
            <tr class="border-b border-gray-800">
              <td class="py-2"><strong>Best For</strong></td>
              <td>Individuals</td>
              <td>Businesses</td>
            </tr>
            <tr class="border-b border-gray-800">
              <td class="py-2"><strong>Interest</strong></td>
              <td>2.5% - 4% ✅</td>
              <td>0% ❌</td>
            </tr>
            <tr class="border-b border-gray-800">
              <td class="py-2"><strong>Transactions</strong></td>
              <td>Limited</td>
              <td>Unlimited 🚀</td>
            </tr>
            <tr class="border-b border-gray-800">
              <td class="py-2"><strong>Min Balance</strong></td>
              <td>Low (₹1k - ₹10k)</td>
              <td>High (₹10k - ₹50k)</td>
            </tr>
          </tbody>
        </table>

        <h4>The Superpower: Overdraft (OD) Facility</h4>
        <p>Imagine having ₹10,000 in your account but needing to pay a supplier ₹15,000. With an Overdraft facility, the bank lets you withdraw that extra ₹5,000!</p>
        <ul>
          <li>It's like a short-term loan attached to your account.</li>
          <li>You only pay interest on the <strong>extra amount used</strong> and for the <strong>days used</strong>.</li>
          <li>Great for managing cash flow gaps in business.</li>
        </ul>

        <h4>Who Needs This?</h4>
        <ul>
          <li>🏪 <strong>Shop Owners:</strong> To deposit daily cash sales.</li>
          <li>💻 <strong>Freelancers/Consultants:</strong> To keep business income separate from personal savings.</li>
          <li>🏢 <strong>Companies:</strong> To manage payroll and vendor payments.</li>
        </ul>

        <div class="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30 my-4">
          <h4 class="text-purple-300 m-0">💡 Smart Strategy</h4>
          <p class="m-0 text-sm">Keep your business funds in a Current Account for operations, but sweep excess profit into a Fixed Deposit to earn interest. Don't let large sums sit idle in a Current Account!</p>
        </div>
      `,
      keyPoints: [
        'Current Accounts are for businesses and have NO transaction limits',
        'You earn 0% interest on Current Accounts',
        'Overdraft (OD) lets you withdraw more money than you have',
        'Always separate personal savings from business expenses'
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'What is the interest rate typically offered on a Current Account?',
          options: ['2.5%', '4.0%', '6.0%', '0%'],
          correct: 3,
          explanation: 'Current accounts offer 0% interest. The value they provide is in "unlimited transactions" and business features, not in growing your money.'
        },
        {
          type: 'scenario',
          question: 'Raj runs a busy grocery store with 100+ UPI transactions daily. Why should he switch from his personal Savings account to a Current Account?',
          context: 'Raj is worried about transaction limits and tax confusion.',
          options: [
            'To earn more interest',
            'To avoid transaction limits and separate business income',
            'To get a free credit card',
            'To avoid KYC'
          ],
          correct: 1,
          explanation: 'Savings accounts have limits on the number of free transactions. For a business with high volume like Raj\'s, a Current Account avoids these limits and helps clearly separate business income for tax purposes.'
        },
        {
          type: 'truefalse',
          question: 'An Overdraft facility allows you to withdraw money you don\'t currently have in your account.',
          options: ['True', 'False'],
          correct: 0,
          explanation: 'True! An Overdraft is a credit facility that lets you withdraw more than your balance up to a sanctioned limit, acting as a safety net for cash flow.'
        },
        {
          type: 'calculation',
          question: 'You use an overdraft of ₹50,000 for just 10 days. The interest rate is 12% per annum. Do you pay interest for the whole year?',
          options: [
            'Yes, interest is charged annually',
            'No, interest is charged only for 10 days',
            'No, overdraft is free',
            'Yes, but only 50%'
          ],
          correct: 1,
          explanation: 'Overdraft interest is calculated on a daily basis. You only pay interest for the exact number of days (10 days) you used the money, making it a cost-effective way to borrow for short periods.'
        },
        {
          type: 'mcq',
          question: 'Which of these is NOT a typical feature of a Current Account?',
          options: [
            'Unlimited deposits/withdrawals',
            'Overdraft facility',
            'High interest rates',
            'Higher minimum balance requirement'
          ],
          correct: 2,
          explanation: 'High interest rates are NOT a feature of Current Accounts. In fact, they typically offer 0% interest.'
        }
      ]
    },
    {
      id: 2,
      title: 'Fixed Deposits (FD)',
      subtitle: 'Guaranteed Returns, Zero Stress',
      duration: '7 mins',
      content: `
        <h3>What is a Fixed Deposit?</h3>
        <p>A Fixed Deposit (FD) is the rockstar of safe investments. You deposit a lump sum for a fixed period (say, 1 year or 5 years), and the bank guarantees you a fixed interest rate that is higher than a savings account.</p>
        
        <div class="bg-green-900/30 p-4 rounded-lg border-l-4 border-green-500 my-4">
          <h4 class="text-green-300 m-0">📈 Why People Love FDs</h4>
          <p class="m-0 text-sm">It's predictable! If the bank says you'll get 7%, you get 7%. Market ups and downs don't affect your returns.</p>
        </div>

        <h4>Key Features</h4>
        <ul>
          <li><strong>Higher Returns:</strong> Earn <strong>5% - 8%</strong> interest (Senior citizens get even more!).</li>
          <li><strong>Flexible Tenure:</strong> Park your money for as little as <strong>7 days</strong> or as long as <strong>10 years</strong>.</li>
          <li><strong>Loan Facility:</strong> Need money urgently? Don't break the FD! Take a loan against it (usually up to 90% of value).</li>
        </ul>

        <h4>Types of FDs You Should Know</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-gray-800 p-3 rounded">
            <strong>Standard FD</strong>
            <p class="text-sm text-gray-400">Lock money for a fixed time. Withdraw anytime with a small penalty.</p>
          </div>
          <div class="bg-gray-800 p-3 rounded">
            <strong>Tax Saver FD</strong>
            <p class="text-sm text-gray-400">Lock for <strong>5 years</strong> to save tax under Section 80C. No premature withdrawal allowed.</p>
          </div>
          <div class="bg-gray-800 p-3 rounded">
            <strong>Cumulative FD</strong>
            <p class="text-sm text-gray-400">Interest is reinvested. You get a big lump sum at the end. Great for long-term goals.</p>
          </div>
          <div class="bg-gray-800 p-3 rounded">
            <strong>Non-Cumulative FD</strong>
            <p class="text-sm text-gray-400">Interest is paid out monthly or quarterly. Perfect for regular income (e.g., for retirees).</p>
          </div>
        </div>

        <h4>💡 Pro Strategy: FD Laddering</h4>
        <p>Instead of putting ₹3 Lakh in one 3-year FD, split it!</p>
        <ul>
          <li>Put ₹1 Lakh for 1 year</li>
          <li>Put ₹1 Lakh for 2 years</li>
          <li>Put ₹1 Lakh for 3 years</li>
        </ul>
        <p><strong>Why?</strong> This way, one FD matures every year, giving you liquidity without breaking the investment!</p>

        [INTEREST_LADDER]

        <h4>Tax Talk 📝</h4>
        <p>Interest earned on FDs is <strong>fully taxable</strong>. If your interest income exceeds ₹40,000/year (₹50k for seniors), the bank will deduct TDS (Tax Deducted at Source). Submit <strong>Form 15G/15H</strong> if your total income is below the taxable limit to avoid this.</p>
      `,
      keyPoints: [
        'FDs offer guaranteed returns higher than savings accounts',
        'Tax Saver FDs have a mandatory 5-year lock-in period',
        'You can take a loan against your FD instead of breaking it',
        'Use "FD Laddering" to balance returns and liquidity'
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'You have ₹1 Lakh to invest. You want to save tax under Section 80C. Which FD should you choose?',
          options: [
            'Standard FD for 1 year',
            'Tax Saver FD (5-year lock-in)',
            'Cumulative FD for 3 years',
            'Flexi FD'
          ],
          correct: 1,
          explanation: 'Only a Tax Saver FD with a mandatory lock-in period of 5 years qualifies for tax deduction under Section 80C of the Income Tax Act.'
        },
        {
          type: 'scenario',
          question: 'Meera (65) wants a monthly income from her retirement corpus of ₹10 Lakh. Which FD type is best?',
          context: 'She needs cash flow to pay bills, not a lump sum later.',
          options: [
            'Cumulative FD',
            'Non-Cumulative FD (Monthly Payout)',
            'Tax Saver FD',
            'Recurring Deposit'
          ],
          correct: 1,
          explanation: 'A Non-Cumulative FD with a monthly payout option is perfect for Meera. It will credit the interest directly to her savings account every month, acting like a pension.'
        },
        {
          type: 'truefalse',
          question: 'If you break an FD before maturity, you lose ALL the interest earned.',
          options: ['True', 'False'],
          correct: 1,
          explanation: 'False! You don\'t lose all interest. You typically receive interest at a slightly lower rate (usually 1% less than the original rate) as a penalty for premature withdrawal.'
        },
        {
          type: 'calculation',
          question: 'You invest ₹1,00,000 at 7% interest. After 1 year, you earn ₹7,000. Is this interest taxable?',
          options: [
            'No, FD interest is tax-free',
            'Yes, it is added to your income and taxed as per your slab',
            'Only if it exceeds ₹40,000',
            'Only if you withdraw it'
          ],
          correct: 1,
          explanation: 'FD interest is fully taxable. It is added to your annual income and taxed according to your income tax slab, regardless of whether you withdraw it or reinvest it.'
        },
        {
          type: 'mcq',
          question: 'What is "FD Laddering"?',
          options: [
            'Investing all money in one big FD',
            'Splitting investment across different tenures (1yr, 2yr, 3yr) to maintain liquidity',
            'Taking a loan against FD',
            'Investing only when rates are high'
          ],
          correct: 1,
          explanation: 'FD Laddering is a smart strategy where you divide your investment into multiple FDs with different maturity dates. This ensures you have money becoming available regularly.'
        }
      ]
    },
    {
      id: 3,
      title: 'Recurring Deposits (RD)',
      subtitle: 'Small Steps, Big Goals',
      duration: '6 mins',
      content: `
        <h3>What is a Recurring Deposit?</h3>
        <p>Think of an RD as a <strong>"Reverse EMI"</strong>. Instead of paying the bank after buying something, you pay the bank <em>before</em> to save up for it! You deposit a fixed amount every month, and the bank pays you interest just like an FD.</p>
        
        <div class="bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500 my-4">
          <h4 class="text-blue-300 m-0">🎯 Perfect For Goals</h4>
          <p class="m-0 text-sm">Planning a vacation next year? Want to buy a new iPhone? Start an RD today!</p>
        </div>

        <h4>How It Works</h4>
        <ol>
          <li><strong>Decide Amount:</strong> Say, ₹5,000 per month.</li>
          <li><strong>Choose Tenure:</strong> Say, 12 months.</li>
          <li><strong>Automate:</strong> The bank automatically cuts ₹5,000 from your savings account on a fixed date.</li>
          <li><strong>Enjoy:</strong> At the end of 12 months, you get your principal + interest (e.g., ₹60,000 + ₹2,500 interest).</li>
        </ol>

        <h4>RD vs. FD: Which is Better?</h4>
        <table class="w-full text-sm text-left border-collapse my-4">
          <thead>
            <tr class="border-b border-gray-700 text-gray-300">
              <th class="py-2">Feature</th>
              <th class="py-2">Recurring Deposit (RD)</th>
              <th class="py-2">Fixed Deposit (FD)</th>
            </tr>
          </thead>
          <tbody class="text-gray-400">
            <tr class="border-b border-gray-800">
              <td class="py-2"><strong>Investment Style</strong></td>
              <td>Small monthly amounts</td>
              <td>One-time lump sum</td>
            </tr>
            <tr class="border-b border-gray-800">
              <td class="py-2"><strong>Best For</strong></td>
              <td>Salaried / Regular Savers</td>
              <td>Those with cash in hand</td>
            </tr>
            <tr class="border-b border-gray-800">
              <td class="py-2"><strong>Interest Rate</strong></td>
              <td>High (Same as FD)</td>
              <td>High (Same as RD)</td>
            </tr>
          </tbody>
        </table>

        <h4>⚠️ The "Missed Payment" Trap</h4>
        <p>Since RD is a commitment, you must pay every month. If you miss an installment:</p>
        <ul>
          <li>The bank may charge a penalty (e.g., ₹1.50 per ₹100).</li>
          <li>If you miss 3-4 months continuously, the bank might close your RD account!</li>
        </ul>
        <p><strong>Pro Tip:</strong> Always set the RD deduction date a few days after your salary date so you never run out of balance.</p>
      `,
      keyPoints: [
        'RD is like a "Reverse EMI" to save for specific goals',
        'Interest rates are typically the same as Fixed Deposits',
        'Missing monthly installments can attract penalties',
        'Ideal for people with regular monthly income'
      ],
      quiz: [
        {
          type: 'calculation',
          question: 'You start an RD of ₹5,000/month for 1 year. The interest rate is 7%. Approximately how much will you get at maturity?',
          options: [
            '₹60,000 (Principal only)',
            '₹62,300 (Principal + Interest)',
            '₹70,000',
            '₹55,000'
          ],
          correct: 1,
          explanation: 'You deposited ₹60,000 (5000 x 12). The interest earned would be around ₹2,300. So, you get back approximately ₹62,300. It\'s a great way to beat inflation!'
        },
        {
          type: 'scenario',
          question: 'Amit wants to buy a bike worth ₹1 Lakh next year. He can save ₹8,000 every month. What should he do?',
          context: 'He wants a disciplined approach so he doesn\'t spend the money.',
          options: [
            'Keep cash in a cupboard',
            'Open a Recurring Deposit (RD)',
            'Invest in risky stocks',
            'Leave it in a Savings Account'
          ],
          correct: 1,
          explanation: 'An RD is perfect for goal-based savings. It forces discipline (automatic deduction) and earns decent interest, ensuring he reaches his target of ₹1 Lakh safely.'
        },
        {
          type: 'truefalse',
          question: 'You can withdraw a "part" of your RD money if you have an emergency.',
          options: ['True', 'False'],
          correct: 1,
          explanation: 'False! RDs do not allow partial withdrawals. If you need money, you usually have to close the entire RD account (and pay a penalty) or take a loan against it.'
        },
        {
          type: 'mcq',
          question: 'What happens if you miss 3-4 consecutive RD installments?',
          options: [
            'Nothing happens',
            'The bank pays the installment for you',
            'The bank may close your RD account',
            'The interest rate doubles'
          ],
          correct: 2,
          explanation: 'Banks take RD commitments seriously. If you miss multiple installments, they may prematurely close your account and refund your money after deducting penalties.'
        },
        {
          type: 'mcq',
          question: 'Who is an RD most suitable for?',
          options: [
            'A businessman with irregular income',
            'A salaried person with fixed monthly income',
            'A retired person with a large lump sum',
            'A student with no income'
          ],
          correct: 1,
          explanation: 'RDs are designed for salaried individuals or those with a regular income stream who can commit to setting aside a fixed sum every single month.'
        }
      ]
    },
    {
      id: 4,
      title: 'Bank Services',
      subtitle: 'Mastering Modern Banking',
      duration: '6 mins',
      content: `
        <h3>More Than Just Savings</h3>
        <p>A bank isn't just a place to store money; it's a service hub that makes your life easier. From withdrawing cash at 2 AM to paying bills from your sofa, let's master the essential services.</p>
        
        <h4>1. Cyber Security Cell (Scam Spotter)</h4>
        <p>Modern banking is digital, but so are the thieves. Instead of pickpockets, we now have <strong>Phishers</strong>. Can you spot a fake message from a real one?</p>
        <p class="text-sm text-gray-400"><strong>Mission:</strong> You are now a Fraud Analyst. Review the incoming messages and decide whether to <strong>BLOCK</strong> or <strong>TRUST</strong> them.</p>

        [SCAM_SPOTTER]

        <h4>2. Digital Banking (Bank from Your Sofa) 📱</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div class="bg-gray-800 p-3 rounded border border-gray-700">
            <h5 class="text-blue-400 m-0">Net Banking</h5>
            <p class="text-sm m-0">Great for big tasks: Opening FDs, downloading statements, or transferring large amounts (NEFT/RTGS).</p>
          </div>
          <div class="bg-gray-800 p-3 rounded border border-gray-700">
            <h5 class="text-green-400 m-0">Mobile Banking / UPI</h5>
            <p class="text-sm m-0">Perfect for daily use: Paying chai walas, splitting bills with friends, or recharging your phone.</p>
          </div>
        </div>

        <h4>3. Cheques vs. Demand Drafts (DD)</h4>
        <ul>
          <li><strong>Cheque:</strong> You write it to pay someone. It can bounce if you don't have funds.</li>
          <li><strong>Demand Draft (DD):</strong> You pay the bank first, and they give you a DD. It <strong>cannot bounce</strong>. Used for college fees and official payments.</li>
        </ul>

        [CHEQUE_WRITER]

        <div class="bg-red-900/30 p-4 rounded-lg border-l-4 border-red-500 my-4">
          <h4 class="text-red-300 m-0">🛡️ The Golden Rules of Security</h4>
          <ul class="m-0 text-sm mt-2">
            <li><strong>NEVER</strong> share your OTP, PIN, or Password. Bank officials will NEVER ask for it.</li>
            <li><strong>NEVER</strong> enter your UPI PIN to <em>receive</em> money. You only enter it to <em>send</em> money.</li>
            <li><strong>ALWAYS</strong> enable SMS alerts for every transaction.</li>
          </ul>
        </div>

        <h4>4. Locker Facilities</h4>
        <p>Need to store gold or property papers? Rent a bank locker! It's safer than keeping valuables at home. You pay an annual rent (₹1,000 - ₹10,000).</p>

        <h4>5. Nomination (Crucial!)</h4>
        <p>Ensure every account has a <strong>Nominee</strong> (like your spouse or parent). This ensures that if something happens to you, the money goes to them without legal hassles.</p>
      `,
      keyPoints: [
        'Net Banking is for big tasks; UPI is for daily payments',
        'Demand Drafts (DD) are safer than cheques as they cannot bounce',
        'NEVER enter your UPI PIN to receive money',
        'Always add a nominee to your accounts'
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'You receive a call: "Sir, your KYC is pending. Please share the OTP sent to your phone to unblock your card." What should you do?',
          options: [
            'Share the OTP immediately',
            'Share it only if the caller sounds professional',
            'Disconnect and report the number',
            'Ask for their Employee ID then share'
          ],
          correct: 2,
          explanation: 'This is a classic scam! Banks NEVER ask for OTPs or PINs over the phone. Disconnect immediately and report the incident to your bank.'
        },
        {
          type: 'truefalse',
          question: 'To RECEIVE money on UPI (e.g., selling an old bike), you must enter your UPI PIN.',
          options: ['True', 'False'],
          correct: 1,
          explanation: 'FALSE! You ONLY enter your UPI PIN to deduct money from your account. If someone asks you to enter your PIN to "receive" money, they are trying to steal from you.'
        },
        {
          type: 'scenario',
          question: 'Priya needs to pay her college admission fee of ₹50,000. The college demands a payment method that "cannot bounce". What should she use?',
          context: 'Cheques can bounce if funds are low.',
          options: [
            'A personal Cheque',
            'A Demand Draft (DD)',
            'Cash',
            'Credit Card'
          ],
          correct: 1,
          explanation: 'A Demand Draft (DD) is a prepaid instrument. Since Priya pays the bank upfront to make the DD, it is guaranteed by the bank and cannot bounce, making it the preferred choice for colleges.'
        },
        {
          type: 'mcq',
          question: 'How many free ATM transactions do you typically get per month at your own bank\'s ATM?',
          options: ['3', '5', '10', 'Unlimited'],
          correct: 1,
          explanation: 'RBI rules typically mandate 5 free transactions (financial + non-financial) per month at your own bank\'s ATMs. Beyond this, charges apply.'
        },
        {
          type: 'mcq',
          question: 'What is the primary benefit of adding a "Nominee" to your bank account?',
          options: [
            'You get a higher interest rate',
            'It allows the nominee to use your debit card',
            'It ensures easy transfer of funds to them after your death',
            'It is mandatory for opening the account'
          ],
          correct: 2,
          explanation: 'Nomination is a facility that enables the bank to release the funds in your account to the nominated person without hassle in the unfortunate event of your death.'
        }
      ]
    }
  ]
};
