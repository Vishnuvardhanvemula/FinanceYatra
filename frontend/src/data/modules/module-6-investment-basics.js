/**
 * Module 6: Investment Basics
 * Complete lesson content with quizzes
 * 
 * Topics: Fixed Deposits, Mutual Funds, Stocks, Gold, Real Estate, Risk-Return, Diversification
 */

export const module6Content = {
  title: 'Investment Basics',
  lessons: [
    {
      id: 0,
      title: 'Fixed Deposits (FD)',
      subtitle: 'Safe & Guaranteed Returns',
      duration: '7 mins',
      content: `
        <h3>What is a Fixed Deposit?</h3>
        <p>A Fixed Deposit (FD) is money deposited with a bank for a fixed period at fixed interest (6.5-8%). DICGC insures up to ₹5 lakhs per bank.</p>

        <h4>Types of Fixed Deposits:</h4>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Interest Rate</th>
              <th>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Regular FD</strong></td>
              <td>6.5% - 7.5%</td>
              <td>Safe returns, emergency fund</td>
            </tr>
            <tr>
              <td><strong>Tax Saver FD</strong></td>
              <td>6.5% - 7.0%</td>
              <td>Section 80C deduction (5 year lock-in)</td>
            </tr>
            <tr>
              <td><strong>Senior Citizen FD</strong></td>
              <td>7.5% - 8.5%</td>
              <td>60+ age, 0.5% extra interest</td>
            </tr>
            <tr>
              <td><strong>Corporate FD</strong></td>
              <td>7.5% - 9.0%</td>
              <td>Higher returns but risky (no insurance)</td>
            </tr>
          </tbody>
        </table>

        <h4>FD Interest Calculation:</h4>
        <div class="tip-box">
          <strong>Example:</strong> ₹5L FD at 7% for 3 years
          <br>• Simple Interest: ₹1,05,000 → Maturity = ₹6,05,000
          <br>• Compound (Quarterly): ₹1,15,256 → Maturity = ₹6,15,256
          <br><em>Compounding earns ₹10,256 extra!</em>
        </div>

        <h4>FD Laddering Strategy:</h4>
        <div class="tip-box">
          <strong>₹10 lakh Investment:</strong><br>
          Instead of 1 FD → Split into 5 FDs (₹2L each for 1, 2, 3, 4, 5 years)<br><br>
          <strong>Benefits:</strong> Yearly liquidity, reinvest at better rates, average out rate fluctuations
        </div>

        <h4>Tax on FD Interest:</h4>
        <ul>
          <li><strong>TDS:</strong> 10% if interest > ₹40,000/year</li>
          <li><strong>Tax:</strong> Fully taxable as per your slab (30% for high earners)</li>
          <li><strong>Real Return After Tax:</strong> 7% becomes 4.9% (30% slab) - below 6% inflation!</li>
        </ul>

        <div class="warning-box">
          <strong>Key Insight:</strong> FDs are safe but post-tax returns barely beat inflation. Suitable for short-term goals (1-3 years) or senior citizens, not long-term wealth creation.
        </div>

        <h4>Pro Tips:</h4>
        <ul>
          <li>✓ Spread across banks (max ₹5L per bank for insurance coverage)</li>
          <li>✓ Choose cumulative option for highest returns</li>
          <li>✓ Small finance banks offer 0.5-1% higher rates</li>
          <li>✓ Enable auto-renewal to avoid losing interest</li>
          <li>✓ Use sweep-in FD for emergency fund (instant access)</li>
        </ul>
      `,
      quiz: [
        {
          question: 'You have ₹8 lakh to invest. What is the SAFEST way to invest in FDs while maximizing DICGC insurance coverage?',
          options: [
            'Put entire ₹8L in SBI FD',
            'Put ₹5L in SBI, ₹3L in HDFC',
            'Put ₹4L in SBI, ₹4L in HDFC',
            'Put ₹8L in corporate FD for higher returns'
          ],
          correctAnswer: 2,
          explanation: 'DICGC insures up to ₹5L per bank. Splitting ₹8L into ₹4L each in two different banks keeps both deposits fully insured. Option 2 leaves ₹3L uninsured in one bank.'
        },
        {
          question: 'Rajesh (age 65) deposits ₹10 lakh in senior citizen FD at 8% for 5 years with quarterly compounding. His annual interest income is approximately ₹80,000. He is in 30% tax bracket. What is his post-tax annual return?',
          options: [
            '₹80,000 (8%)',
            '₹56,000 (5.6%)',
            '₹72,000 (7.2%)',
            '₹50,000 (5%)'
          ],
          correctAnswer: 1,
          explanation: 'FD interest is taxable as per income slab. Tax = ₹80,000 × 30% = ₹24,000. Post-tax return = ₹80,000 - ₹24,000 = ₹56,000 (5.6%). High tax bracket significantly reduces FD returns!'
        },
        {
          question: 'Which FD strategy provides BOTH liquidity and optimized returns?',
          options: [
            'Single 10-year FD for highest interest',
            'FD laddering with staggered maturity dates',
            'Multiple 1-year FDs renewed annually',
            'Sweep-in FD linked to savings account'
          ],
          correctAnswer: 1,
          explanation: 'FD laddering creates staggered maturities (e.g., 1-5 years), providing regular liquidity while earning higher rates on longer tenures. Single long FD locks money, multiple 1-year FDs miss higher rates, sweep-in is for savings excess.'
        },
        {
          question: 'Priya wants to save ₹1.5 lakh in taxes under Section 80C. She also needs some liquidity within 2 years. Should she use Tax Saver FD?',
          options: [
            'Yes, it saves tax and gives good returns',
            'No, Tax Saver FD has 5-year lock-in period',
            'Yes, she can withdraw after 2 years with penalty',
            'No, FD interest is taxable anyway'
          ],
          correctAnswer: 1,
          explanation: 'Tax Saver FD has mandatory 5-year lock-in with NO premature withdrawal allowed. Since Priya needs liquidity in 2 years, she should use other 80C options like ELSS (3-year lock-in) or PPF (partial withdrawal after 5 years).'
        },
        {
          question: 'Bank FD interest rates are 7%, inflation is 6%, and you are in 30% tax bracket. What is your REAL return?',
          options: [
            '1% (7% - 6%)',
            '-1.1% (losing money!)',
            '4.9% after tax',
            '1.9% after tax and inflation'
          ],
          correctAnswer: 1,
          explanation: 'Post-tax return = 7% × (1 - 0.30) = 4.9%. Real return = 4.9% - 6% inflation = -1.1%. You are losing purchasing power! High tax bracket investors should consider tax-efficient investments like equity mutual funds.'
        },
        {
          question: 'Compare: ₹5L FD at 7% for 3 years with Simple Interest vs Compound Interest (quarterly). What is the extra amount earned with compounding?',
          options: [
            '₹10,256',
            '₹5,000',
            '₹15,000',
            '₹20,000'
          ],
          correctAnswer: 0,
          explanation: 'Simple Interest = 5L × 7% × 3 = ₹1,05,000. Compound Interest (quarterly) = ₹1,15,256. Difference = ₹10,256. Always choose compound interest FDs for maximum returns!'
        },
        {
          question: 'When is corporate FD a better choice than bank FD?',
          options: [
            'Always, because it offers higher interest rates',
            'For conservative investors needing guaranteed returns',
            'For experienced investors willing to take moderate risk after checking credit rating (AA+ or higher)',
            'Never, bank FDs are always safer'
          ],
          correctAnswer: 2,
          explanation: 'Corporate FDs offer 1-1.5% higher returns but lack DICGC insurance. Only suitable for investors who can take moderate risk, check company credit rating (AA+ or higher), diversify across companies, and do not need full liquidity. Not for conservative investors.'
        }
      ]
    },
    {
      id: 1,
      title: 'Mutual Funds Basics',
      subtitle: 'Professional Money Management',
      duration: '8 mins',
      content: `
        <h3>What is a Mutual Fund?</h3>
        <p>Mutual funds pool money from investors and invest in stocks/bonds. Professional fund managers handle the investments - perfect for beginners wanting diversification without stock picking.</p>

        <h4>Types of Mutual Funds:</h4>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Risk</th>
              <th>Returns</th>
              <th>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Equity Funds</strong></td>
              <td>High</td>
              <td>12-15%</td>
              <td>Long-term wealth (5+ years)</td>
            </tr>
            <tr>
              <td><strong>Debt Funds</strong></td>
              <td>Low</td>
              <td>6-8%</td>
              <td>Stable income (3-5 years)</td>
            </tr>
            <tr>
              <td><strong>Hybrid Funds</strong></td>
              <td>Medium</td>
              <td>9-12%</td>
              <td>Balanced approach</td>
            </tr>
            <tr>
              <td><strong>Index Funds</strong></td>
              <td>Medium</td>
              <td>10-12%</td>
              <td>Passive investing, low cost (0.1-0.5%)</td>
            </tr>
            <tr>
              <td><strong>Liquid Funds</strong></td>
              <td>Very Low</td>
              <td>4-6%</td>
              <td>Emergency fund (instant withdrawal)</td>
            </tr>
          </tbody>
        </table>

        <h4>Key Terms:</h4>
        <ul>
          <li><strong>NAV:</strong> Price per unit (like stock price)</li>
          <li><strong>SIP:</strong> Monthly investment (₹500+) - best for salaried people</li>
          <li><strong>Expense Ratio:</strong> Annual fee (lower is better: <1% for equity, <0.5% for index)</li>
          <li><strong>Exit Load:</strong> 1% penalty if sold before 1 year</li>
        </ul>

        <h4>SIP Power Example:</h4>
        <div class="tip-box">
          ₹5,000/month × 20 years at 12% return:
          <br>• Invested: ₹12 lakh
          <br>• Final corpus: ₹49.95 lakh
          <br>• Wealth created: ₹37.95 lakh (316% gain!)
        </div>

        <h4>How to Choose Good Funds:</h4>
        <ul>
          <li>Check 5-year returns (not just 1-year)</li>
          <li>Compare with Nifty 50 benchmark</li>
          <li>Choose expense ratio <1%</li>
          <li>AUM > ₹100 crore (avoid small funds)</li>
          <li>Fund manager experience 5+ years</li>
        </ul>

        <h4>Tax on Mutual Funds:</h4>
        <table>
          <thead>
            <tr>
              <th>Fund Type</th>
              <th>Holding</th>
              <th>Tax</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Equity</strong></td>
              <td>< 1 year</td>
              <td>15% (STCG)</td>
            </tr>
            <tr>
              <td><strong>Equity</strong></td>
              <td>> 1 year</td>
              <td>10% on gains > ₹1L/year (LTCG)</td>
            </tr>
            <tr>
              <td><strong>Debt</strong></td>
              <td>Any</td>
              <td>As per tax slab (30% max)</td>
            </tr>
          </tbody>
        </table>

        <div class="warning-box">
          <strong>Direct vs Regular Plans:</strong> Always choose Direct plans (buy from Groww/Zerodha/Paytm Money). Regular plans have 1-1.5% lower returns due to agent commission. Over 20 years = ₹8-10 lakh difference!
        </div>

        <h4>Beginner Portfolio (₹1,500/month SIP):</h4>
        <ul>
          <li>60% - Nifty 50 Index Fund (₹900) - stable, low cost</li>
          <li>30% - Multi Cap Fund (₹450) - growth potential</li>
          <li>10% - Liquid Fund (₹150) - emergency backup</li>
        </ul>

        <h4>Pro Tips:</h4>
        <ul>
          <li>✓ Start early - ₹500 SIP at 25 beats ₹5,000 at 35</li>
          <li>✓ Never stop SIP in crashes (buy more units cheap!)</li>
          <li>✓ Increase SIP 10% yearly with salary hike</li>
          <li>✓ Review once a year, not daily</li>
          <li>✓ 3-5 funds are enough (don't over-diversify)</li>
        </ul>
      `,
      quiz: [
        {
          question: 'Amit wants to invest ₹10,000/month for his daughter\'s education (15 years away). Which fund type and strategy is BEST?',
          options: [
            'Liquid fund with lumpsum investment',
            'Debt fund with monthly SIP',
            'Equity fund (large cap + mid cap) with monthly SIP',
            'Fixed deposit for guaranteed returns'
          ],
          correctAnswer: 2,
          explanation: '15 years is long-term, perfect for equity funds which give 12-15% returns. Monthly SIP provides rupee cost averaging and discipline. Liquid funds and debt funds give only 6-8%, not enough for long-term goals. FD barely beats inflation.'
        },
        {
          question: 'You invested ₹5 lakh in equity mutual fund and sold after 2 years with ₹2 lakh profit. What is the LTCG tax you pay?',
          options: [
            '₹10,000 (10% on ₹1 lakh gain above exemption)',
            '₹20,000 (10% on entire ₹2 lakh)',
            '₹60,000 (30% as per tax slab)',
            'Zero (no tax on equity gains)'
          ],
          correctAnswer: 0,
          explanation: 'LTCG on equity (>1 year holding) = 10% on gains exceeding ₹1 lakh per year. First ₹1 lakh is exempt. Tax = 10% × (₹2L - ₹1L) = ₹10,000. This is a huge tax advantage over FDs!'
        },
        {
          question: 'Comparing two Nifty 50 Index Funds: Fund A (expense ratio 0.15%) vs Fund B (expense ratio 1.2%). Which is better for 20-year investment?',
          options: [
            'Fund A - lower cost saves lakhs over 20 years',
            'Fund B - higher expense means better fund management',
            'Both same - they track same index',
            'Doesn\'t matter for long-term'
          ],
          correctAnswer: 0,
          explanation: 'Both track Nifty 50, so returns are identical before expenses. But 1.05% expense difference (1.2% - 0.15%) compounds over 20 years to lakhs of rupees! For ₹10L investment, this difference = ₹2.5L+ over 20 years. Always choose lowest expense ratio for index funds.'
        },
        {
          question: 'Market crashed 30% today. Your SIP of ₹5,000/month is running. What should you do?',
          options: [
            'Stop SIP immediately to avoid further losses',
            'Continue SIP - you will buy more units at lower NAV',
            'Withdraw all money to protect capital',
            'Switch from equity to debt funds'
          ],
          correctAnswer: 1,
          explanation: 'Market crashes are the BEST time for SIP investors! Lower NAV = more units for same ₹5,000. This is rupee cost averaging in action. When market recovers, these cheap units give huge returns. Never stop SIP during crashes!'
        },
        {
          question: 'Priya has ₹10 lakh windfall (bonus). Market is at all-time high. What is the safest strategy?',
          options: [
            'Invest entire ₹10L lumpsum immediately',
            'Keep in savings account and wait for crash',
            'STP (Systematic Transfer Plan) - park in liquid fund, transfer ₹50K/month to equity for 20 months',
            'Invest 50% in FD, 50% in equity'
          ],
          correctAnswer: 2,
          explanation: 'STP is perfect for lumpsum investment at market peaks. Park money in liquid fund (earning 4-6%), transfer fixed amount monthly to equity (rupee cost averaging). This reduces timing risk while keeping money invested. Option 2 loses to inflation, option 4 doesn\'t use STP advantage.'
        },
        {
          question: 'Fund X: Direct plan (expense ratio 1.0%) vs Fund X: Regular plan (expense ratio 2.2%). Investing ₹10,000/month SIP for 20 years at 12% gross return. What is approximate difference in final corpus?',
          options: [
            '₹50,000 - negligible difference',
            '₹2-3 lakh - small difference',
            '₹8-10 lakh - significant difference',
            '₹15 lakh+ - huge difference'
          ],
          correctAnswer: 2,
          explanation: 'Direct plan (11% net return) = ₹99.9L corpus. Regular plan (9.8% net return) = ₹89.7L corpus. Difference = ₹10.2 lakh! This 1.2% expense difference compounds massively over 20 years. Always choose Direct plans!'
        },
        {
          question: 'You want to build emergency fund of ₹3 lakh accessible within 24 hours. Which mutual fund is most suitable?',
          options: [
            'Equity large cap fund - highest returns',
            'Liquid fund - low risk, instant redemption',
            'Debt fund with 3-year lock-in',
            'Small cap fund - high growth potential'
          ],
          correctAnswer: 1,
          explanation: 'Emergency fund needs: 1) Safety, 2) Liquidity (instant access), 3) Better than savings account. Liquid funds are perfect - invest in 91-day securities, redemption in 24 hours, returns 4-6% (vs 3% in savings). Equity is too volatile for emergencies.'
        },
        {
          question: 'Which statement about mutual fund categories is INCORRECT?',
          options: [
            'Large cap funds invest in top 100 companies and have medium risk',
            'Small cap funds can give 15-20% returns but are very volatile',
            'Index funds always beat actively managed funds',
            'Hybrid funds mix equity and debt for balanced risk'
          ],
          correctAnswer: 2,
          explanation: 'Statement 3 is incorrect. Index funds often outperform 70-80% of actively managed funds in long-term due to low cost, but some actively managed funds do beat index with good fund managers. All other statements are correct.'
        }
      ]
    },
    {
      id: 2,
      title: 'Stock Market Basics',
      subtitle: 'Direct Equity Investment',
      duration: '8 mins',
      content: `
        <h3>What is a Stock?</h3>
        <p>A stock represents ownership in a company. Buying Reliance share = becoming part-owner of Reliance! Stocks trade on NSE/BSE exchanges.</p>

        <h4>Major Indices:</h4>
        <ul>
          <li><strong>Nifty 50:</strong> Top 50 companies (NSE benchmark)</li>
          <li><strong>Sensex:</strong> Top 30 companies (BSE benchmark)</li>
        </ul>

        <h4>How to Start:</h4>
        <ol>
          <li>Open Demat account (Zerodha/Groww/Upstox) - 1 day, fully online</li>
          <li>Complete KYC (Aadhaar + PAN)</li>
          <li>Fund account and place orders</li>
        </ol>

        <h4>Order Types:</h4>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>When to Use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Market Order</strong></td>
              <td>Instant execution at current price</td>
            </tr>
            <tr>
              <td><strong>Limit Order</strong></td>
              <td>Buy/sell only at your target price</td>
            </tr>
            <tr>
              <td><strong>Stop Loss</strong></td>
              <td>Auto-sell if price falls (MUST USE!)</td>
            </tr>
          </tbody>
        </table>

        <h4>Fundamental Analysis (Key Ratios):</h4>
        <ul>
          <li><strong>P/E Ratio:</strong> Price ÷ Earnings (lower = cheaper, Nifty avg = 20-25)</li>
          <li><strong>ROE:</strong> Return on equity (>15% = good efficiency)</li>
          <li><strong>Debt-to-Equity:</strong> <1 = healthy, low debt</li>
          <li><strong>Revenue Growth:</strong> >10% YoY = good growth</li>
        </ul>

        <div class="tip-box">
          <strong>TCS Example:</strong> P/E: 28, ROE: 45%, Debt: 0.05, Growth: 12%
          <br><strong>Verdict:</strong> Strong fundamentals for long-term
        </div>

        <h4>Tax on Stocks:</h4>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Holding</th>
              <th>Tax</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Capital Gains</td>
              <td>< 1 year</td>
              <td>15% (STCG)</td>
            </tr>
            <tr>
              <td>Capital Gains</td>
              <td>> 1 year</td>
              <td>10% on gains > ₹1L (LTCG)</td>
            </tr>
            <tr>
              <td>Dividend</td>
              <td>Any</td>
              <td>As per tax slab (30% max)</td>
            </tr>
          </tbody>
        </table>

        <h4>Risk Management (Must Follow!):</h4>
        <ul>
          <li>✓ Always set stop loss (5-10% below buy price)</li>
          <li>✓ Max 5% portfolio in one stock</li>
          <li>✓ Diversify across 5-7 sectors</li>
          <li>✓ Book partial profits at 20-30% gains</li>
          <li>✓ Never average down blindly</li>
        </ul>

        <h4>Blue Chip vs Penny Stocks:</h4>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Blue Chip (TCS, Reliance)</th>
              <th>Penny (<₹10)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Risk</td>
              <td>Low-Medium</td>
              <td>Very High</td>
            </tr>
            <tr>
              <td>Returns</td>
              <td>10-15% stable</td>
              <td>Can double or go to zero</td>
            </tr>
            <tr>
              <td>Recommendation</td>
              <td>✓ Good for wealth building</td>
              <td>✗ Avoid! 90% are scams</td>
            </tr>
          </tbody>
        </table>

        <div class="warning-box">
          <strong>Avoid:</strong> WhatsApp/Telegram stock tips, penny stocks, leverage trading (for beginners), averaging down on losing stocks
        </div>

        <h4>Stocks vs Mutual Funds:</h4>
        <table>
          <thead>
            <tr>
              <th>Factor</th>
              <th>Stocks</th>
              <th>Mutual Funds</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Research</td>
              <td>High effort</td>
              <td>Low (manager handles)</td>
            </tr>
            <tr>
              <td>Diversification</td>
              <td>Need ₹50K+</td>
              <td>₹500 SIP = 50+ stocks</td>
            </tr>
            <tr>
              <td>Best For</td>
              <td>Experienced investors</td>
              <td>Beginners (90% people)</td>
            </tr>
          </tbody>
        </table>

        <h4>Pro Tips:</h4>
        <ul>
          <li>Start with ₹10-20K, learn before big investments</li>
          <li>Think 5-10 years, not daily trading</li>
          <li>5-7 quality stocks > 20 random stocks</li>
          <li>Use Screener.in/Tickertape for research</li>
          <li>Practice on virtual trading apps first</li>
        </ul>
      `,
      quiz: [
        {
          question: 'Rohan bought 100 shares of Infosys at ₹1,500 and sold at ₹1,800 after 8 months. What is his capital gains tax?',
          options: [
            '10% (LTCG) = ₹3,000',
            '15% (STCG) = ₹4,500',
            'Zero (first ₹1 lakh exempt)',
            '30% as per tax slab = ₹9,000'
          ],
          correctAnswer: 1,
          explanation: 'Holding period is 8 months (<1 year), so it is Short Term Capital Gain (STCG). Tax = 15% on profit. Profit = (₹1,800 - ₹1,500) × 100 = ₹30,000. STCG tax = 15% × ₹30,000 = ₹4,500. The ₹1 lakh exemption applies only to LTCG (>1 year holding).'
        },
        {
          question: 'You want to buy TCS stock currently trading at ₹3,500. You believe it will fall to ₹3,400 soon. Which order type should you use?',
          options: [
            'Market order - buy immediately',
            'Limit order at ₹3,400 - buy only if price falls',
            'Stop loss at ₹3,400',
            'GTC order at market price'
          ],
          correctAnswer: 1,
          explanation: 'Limit order lets you specify your buying price (₹3,400). Order will execute only if/when price falls to ₹3,400. Market order buys at current ₹3,500 (instant but at higher price). Stop loss is for selling, not buying.'
        },
        {
          question: 'Analyzing two stocks: Stock A (P/E: 15, ROE: 18%, Debt: 0.3) vs Stock B (P/E: 40, ROE: 8%, Debt: 2.5). Which is fundamentally stronger?',
          options: [
            'Stock A - lower P/E, higher ROE, lower debt',
            'Stock B - higher P/E shows market confidence',
            'Both same - P/E doesn\'t matter',
            'Can\'t determine without price information'
          ],
          correctAnswer: 0,
          explanation: 'Stock A is fundamentally stronger: P/E 15 (cheaper valuation vs 40), ROE 18% (efficient vs 8%), Debt 0.3 (healthy vs 2.5 high debt). Lower P/E = less expensive, Higher ROE = better profitability, Lower Debt = safer. High P/E (Stock B) may indicate overvaluation.'
        },
        {
          question: 'You bought a stock at ₹1,000 and it is now at ₹800 (20% loss). Your friend suggests "average down" by buying more at ₹800. What should you do?',
          options: [
            'Average down - buying at ₹800 reduces average cost',
            'Set stop loss and exit if fundamentals are weak',
            'Hold and wait for recovery to ₹1,000',
            'Buy more aggressively - it is cheap now'
          ],
          correctAnswer: 1,
          explanation: 'Never blindly average down! First check WHY stock fell. If fundamentals are weak (company problems, loss making), EXIT with stop loss. Averaging down on bad stocks leads to bigger losses. Only average down if: 1) Overall market fell (not company-specific issue), 2) Fundamentals still strong, 3) You have researched again.'
        },
        {
          question: 'You have ₹50,000 to invest in stocks. What is the BEST diversification strategy?',
          options: [
            'Buy 1 stock of best company (all in Reliance)',
            'Buy 5-7 stocks across different sectors (₹7K-10K each)',
            'Buy 20 stocks of ₹2,500 each',
            'Buy penny stocks to get 1000+ shares'
          ],
          correctAnswer: 1,
          explanation: '5-7 quality stocks across sectors is optimal for ₹50K portfolio. This provides: Diversification (one sector issue won\'t hurt entire portfolio), Manageable tracking (can research and monitor), Enough capital per stock (₹7-10K per stock). 1 stock = too risky, 20 stocks = too many to track, penny stocks = gambling.'
        },
        {
          question: 'For a beginner with ₹1 lakh and limited time, which investment strategy is MOST suitable?',
          options: [
            'Active stock trading - buy/sell daily for maximum profit',
            'Invest ₹70K in equity mutual funds SIP, ₹30K in 3-5 blue chip stocks for learning',
            'All ₹1L in penny stocks for multibagger returns',
            'All ₹1L in single best stock (highest returns last year)'
          ],
          correctAnswer: 1,
          explanation: 'For beginners with limited time: 70% in mutual funds (professional management, diversification, less time) + 30% in blue chips (learning experience, understanding stock market). This balances safety, learning, and returns. Daily trading needs expertise, penny stocks are gambling, single stock is too risky.'
        },
        {
          question: 'Stock XYZ RSI is 85 (on 100 scale) and has hit resistance level 3 times in past month. What does technical analysis suggest?',
          options: [
            'Strong buy - RSI above 80 means strong momentum',
            'Likely to fall - RSI >70 (overbought) + resistance level indicates selling pressure',
            'Hold - RSI doesn\'t matter for long-term',
            'Buy more - resistance will break on 4th attempt'
          ],
          correctAnswer: 1,
          explanation: 'RSI >70 indicates overbought (too many buyers, correction likely). Resistance level hit 3 times shows strong selling pressure at that price. Combination suggests stock is likely to fall. Technical analysis: overbought + resistance = selling signal. This is useful for short-term traders, not long-term investors.'
        },
        {
          question: 'You invested ₹1 lakh in stocks. Total brokerage charges are ₹200. You made ₹5,000 profit before costs. What is your net return percentage?',
          options: [
            '5% (₹5,000 profit)',
            '4.8% (₹4,800 after charges)',
            '5.2% (profit + brokerage)',
            '4.5% (after all hidden costs)'
          ],
          correctAnswer: 1,
          explanation: 'Net profit = Gross profit - All charges = ₹5,000 - ₹200 = ₹4,800. Net return = (₹4,800 / ₹1,00,000) × 100 = 4.8%. Always calculate returns after all costs (brokerage, STT, GST, stamp duty). Frequent trading has higher cost impact.'
        }
      ]
    },
    {
      id: 3,
      title: 'Gold Investment',
      subtitle: 'Traditional Safe Haven Asset',
      duration: '6 mins',
      content: `
        <h3>Why Invest in Gold?</h3>
        <p>Gold is a traditional safe-haven asset that protects against inflation and currency devaluation. Indians hold 25,000 tonnes of gold - more than any country!</p>

        <h4>Ways to Invest in Gold:</h4>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Returns</th>
              <th>Cost</th>
              <th>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Physical Gold</strong></td>
              <td>8-10% p.a.</td>
              <td>Making charges 10-20%, storage risk</td>
              <td>Jewelry, cultural/emotional value</td>
            </tr>
            <tr>
              <td><strong>Gold ETF</strong></td>
              <td>8-10% p.a.</td>
              <td>Expense ratio 0.5-1%, no making charges</td>
              <td>Pure investment (no physical hassle)</td>
            </tr>
            <tr>
              <td><strong>Sovereign Gold Bonds</strong></td>
              <td>10-12% (Gold + 2.5% interest)</td>
              <td>No charges, tax-free if held 8 years</td>
              <td>Long-term investors (BEST option!)</td>
            </tr>
            <tr>
              <td><strong>Gold Mutual Funds</strong></td>
              <td>8-10% p.a.</td>
              <td>Expense ratio 0.5-1.5%</td>
              <td>SIP in gold, diversification</td>
            </tr>
            <tr>
              <td><strong>Digital Gold</strong></td>
              <td>8-10% p.a.</td>
              <td>3% GST + small spread</td>
              <td>Small amounts (₹100+), easy to buy/sell</td>
            </tr>
          </tbody>
        </table>

        <h4>Sovereign Gold Bonds (SGB) - Best Option:</h4>
        <div class="tip-box">
          <strong>Why SGBs are Superior:</strong><br>
          ✓ Price = Current gold price (no premium)<br>
          ✓ Interest = 2.5% p.a. (paid semi-annually)<br>
          ✓ Tax-free if held 8 years<br>
          ✓ No storage/security risk<br>
          ✓ Can sell on exchange after 5 years<br>
          ✓ Issued by RBI (sovereign guarantee)<br><br>
          <strong>Returns:</strong> Gold appreciation (8-10%) + 2.5% interest = 10.5-12.5% total!
        </div>

        <h4>Physical Gold vs Paper Gold:</h4>
        <table>
          <thead>
            <tr>
              <th>Factor</th>
              <th>Physical Gold (Jewelry/Coins)</th>
              <th>Paper Gold (ETF/SGB)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Making Charges</strong></td>
              <td>10-20% extra cost</td>
              <td>None</td>
            </tr>
            <tr>
              <td><strong>Purity Concern</strong></td>
              <td>22K-24K hallmark needed</td>
              <td>99.99% pure (guaranteed)</td>
            </tr>
            <tr>
              <td><strong>Storage</strong></td>
              <td>Bank locker (₹3K-5K/year)</td>
              <td>Demat form (no physical storage)</td>
            </tr>
            <tr>
              <td><strong>Liquidity</strong></td>
              <td>Must sell to jeweler (lower price)</td>
              <td>Sell on exchange (market price)</td>
            </tr>
            <tr>
              <td><strong>Theft Risk</strong></td>
              <td>High</td>
              <td>Zero</td>
            </tr>
          </tbody>
        </table>

        <h4>Gold Investment Calculation:</h4>
        <div class="tip-box">
          <strong>Example: ₹1 lakh invested in gold for 5 years</strong><br><br>
          <strong>Physical Gold (Jewelry):</strong><br>
          • Purchase: ₹1L + ₹15K making charges = ₹1.15L<br>
          • After 5 years (10% p.a.): Gold value = ₹1.61L<br>
          • Sell to jeweler: ₹1.61L - 10% discount = ₹1.45L<br>
          • Net profit: ₹30K (26% in 5 years)<br><br>
          <strong>Sovereign Gold Bond:</strong><br>
          • Purchase: ₹1L (no extra charges)<br>
          • Gold appreciation (10% p.a.): ₹1.61L<br>
          • Interest (2.5% p.a.): ₹13K<br>
          • Total: ₹1.74L (74% gain!)<br>
          • Tax: Zero if held 8 years<br><br>
          <strong>SGB gives ₹29K more!</strong>
        </div>

        <h4>Tax on Gold Investments:</h4>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Holding Period</th>
              <th>Tax</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Physical Gold</strong></td>
              <td>< 3 years</td>
              <td>As per tax slab (30% max)</td>
            </tr>
            <tr>
              <td><strong>Physical Gold</strong></td>
              <td>> 3 years</td>
              <td>20% with indexation</td>
            </tr>
            <tr>
              <td><strong>Gold ETF/MF</strong></td>
              <td>< 3 years</td>
              <td>As per tax slab</td>
            </tr>
            <tr>
              <td><strong>Gold ETF/MF</strong></td>
              <td>> 3 years</td>
              <td>20% with indexation</td>
            </tr>
            <tr>
              <td><strong>Sovereign Gold Bonds</strong></td>
              <td>8 years</td>
              <td>Completely tax-free!</td>
            </tr>
          </tbody>
        </table>

        <h4>How Much Gold in Portfolio?</h4>
        <ul>
          <li><strong>Conservative investors:</strong> 10-15% of portfolio</li>
          <li><strong>Moderate investors:</strong> 5-10% of portfolio</li>
          <li><strong>Aggressive investors:</strong> 0-5% of portfolio</li>
        </ul>

        <div class="warning-box">
          <strong>Important:</strong> Gold doesn't give regular income (except SGB interest). Use for: 1) Portfolio diversification, 2) Hedge against inflation, 3) Emergency backup. Don't exceed 15% portfolio allocation.
        </div>

        <h4>Where to Buy:</h4>
        <ul>
          <li><strong>Physical Gold:</strong> Tanishq, Malabar Gold (check hallmark certification)</li>
          <li><strong>Gold ETF:</strong> Zerodha, Groww (SBI Gold ETF, HDFC Gold ETF)</li>
          <li><strong>Sovereign Gold Bonds:</strong> SBI, HDFC Bank, NSE/BSE (RBI issues 6 times/year)</li>
          <li><strong>Digital Gold:</strong> Paytm, PhonePe, Google Pay (start with ₹100)</li>
        </ul>

        <h4>Gold Price Tracking:</h4>
        <p>Gold prices fluctuate based on:</p>
        <ul>
          <li>USD strength (strong dollar = lower gold prices)</li>
          <li>Inflation (high inflation = higher gold demand)</li>
          <li>Global uncertainty (wars, recession = higher gold prices)</li>
          <li>India import duty (currently 15%)</li>
        </ul>

        <h4>Pro Tips:</h4>
        <ul>
          <li>✓ <strong>Best:</strong> Sovereign Gold Bonds (2.5% extra interest + tax-free)</li>
          <li>✓ Buy SGBs during RBI tranches (6 times/year, watch for announcements)</li>
          <li>✓ Avoid physical gold jewelry for investment (high making charges)</li>
          <li>✓ Use digital gold for small amounts (₹100-10,000)</li>
          <li>✓ Gold ETF for demat investors wanting liquidity</li>
          <li>✓ Don't time the market - use SIP in gold mutual funds</li>
          <li>✓ Max 10-15% portfolio allocation in gold</li>
        </ul>
      `,
      quiz: [
        {
          question: 'You want to invest ₹50,000 in gold for 8 years. Which option gives MAXIMUM returns with lowest risk?',
          options: [
            'Physical gold jewelry from Tanishq',
            'Gold ETF through Zerodha',
            'Sovereign Gold Bonds from RBI',
            'Digital gold on Paytm'
          ],
          correctAnswer: 2,
          explanation: 'Sovereign Gold Bonds are best for 8-year investment: 1) Gold appreciation (8-10%), 2) Additional 2.5% p.a. interest, 3) Completely tax-free after 8 years, 4) No making charges or storage costs. Total returns = 10.5-12.5% vs 8-10% for other options.'
        },
        {
          question: 'Comparing ₹1 lakh investment: Physical gold jewelry costs ₹15K making charges. After 5 years, gold appreciates 50%. Selling to jeweler gives 10% discount. What is net profit?',
          options: [
            '₹50,000 (50% appreciation)',
            '₹35,000 (after discount)',
            '₹20,000 (after all costs)',
            '₹30,000 (₹1.15L → ₹1.45L)'
          ],
          correctAnswer: 2,
          explanation: 'Purchase = ₹1L + ₹15K making = ₹1.15L. After 50% appreciation = ₹1.5L gold value. Jeweler discount 10% = ₹1.35L realized. Net profit = ₹1.35L - ₹1.15L = ₹20,000. Making charges and selling discount significantly reduce returns!'
        },
        {
          question: 'You bought Sovereign Gold Bonds and need money after 6 years. What is the BEST way to liquidate?',
          options: [
            'Wait 2 more years for 8-year maturity to get tax benefit',
            'Sell on NSE/BSE exchange (allowed after 5 years)',
            'Approach RBI for premature redemption',
            'Cannot sell before 8 years'
          ],
          correctAnswer: 1,
          explanation: 'SGBs can be sold on stock exchanges (NSE/BSE) after completing 5 years. You will get current market price of gold. However, selling before 8 years means capital gains tax applies. If you can wait 2 more years till 8-year maturity, gains will be completely tax-free.'
        },
        {
          question: 'Gold ETF has 0.5% expense ratio, Digital Gold has 3% GST + spread. For ₹10,000 investment for 3 years, which is more cost-effective?',
          options: [
            'Digital Gold - easier to buy',
            'Gold ETF - lower annual costs',
            'Both same over 3 years',
            'Digital Gold - no demat needed'
          ],
          correctAnswer: 1,
          explanation: 'Gold ETF costs: 0.5% × 3 years = 1.5% total. Digital Gold costs: 3% upfront + spread. Gold ETF is more cost-effective for amounts >₹10K and longer holding periods. Digital Gold is better only for very small amounts (₹100-5000) where convenience matters.'
        },
        {
          question: 'Your portfolio is ₹10 lakh. You want to add gold for diversification. What allocation is recommended for moderate risk investors?',
          options: [
            '30-40% (₹3-4 lakh) - gold is safest',
            '20-25% (₹2-2.5 lakh) - match equity allocation',
            '5-10% (₹50K-1L) - moderate diversification',
            '0% - gold gives no returns'
          ],
          correctAnswer: 2,
          explanation: 'Moderate investors should allocate 5-10% to gold. Gold is for: 1) Diversification (moves opposite to stocks sometimes), 2) Inflation hedge, 3) Portfolio stability. Too much gold (>15%) reduces overall returns as gold gives 8-10% vs equity 12-15%. Balance is key!'
        },
        {
          question: 'Sovereign Gold Bonds mature after 8 years with complete tax exemption. What is the approximate total return (gold + interest)?',
          options: [
            '8-10% (only gold appreciation)',
            '2.5% (only interest component)',
            '10.5-12.5% (gold + interest combined)',
            '15-20% (guaranteed returns)'
          ],
          correctAnswer: 2,
          explanation: 'SGB returns = Gold appreciation (8-10% historical average) + Interest (2.5% p.a. fixed) = 10.5-12.5% total. Plus tax-free benefit after 8 years! This makes SGBs better than physical gold, ETFs, or even some debt funds.'
        },
        {
          question: 'When is gold price typically HIGHER?',
          options: [
            'When dollar strengthens and economy is stable',
            'During high inflation and global uncertainty (wars, recession)',
            'When stock market is doing very well',
            'During summer wedding season only'
          ],
          correctAnswer: 1,
          explanation: 'Gold prices rise during: 1) High inflation (people buy gold to protect wealth), 2) Global uncertainty/wars (safe-haven demand), 3) Weak dollar (gold priced in USD), 4) Economic recession fears. Gold and stocks often move in opposite directions - gold shines when stocks struggle!'
        }
      ]
    },
    {
      id: 4,
      title: 'Real Estate Investment',
      subtitle: 'Property as Investment Asset',
      duration: '7 mins',
      content: `
        <h3>Real Estate as Investment</h3>
        <p>Real estate can generate wealth through rental income + property appreciation. However, it requires large capital (₹20L+), has high transaction costs (10-15%), and low liquidity.</p>

        <h4>Ways to Invest in Real Estate:</h4>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Investment</th>
              <th>Returns</th>
              <th>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Residential Property</strong></td>
              <td>₹50L - ₹5Cr</td>
              <td>6-8% rental + appreciation</td>
              <td>Own use + rental income</td>
            </tr>
            <tr>
              <td><strong>Commercial Property</strong></td>
              <td>₹1Cr+</td>
              <td>8-12% rental yield</td>
              <td>High rental income (offices, shops)</td>
            </tr>
            <tr>
              <td><strong>REITs</strong></td>
              <td>₹10K - ₹10L</td>
              <td>7-10% (dividends + appreciation)</td>
              <td>Small investors, diversification</td>
            </tr>
            <tr>
              <td><strong>Land/Plot</strong></td>
              <td>₹10L - ₹1Cr</td>
              <td>5-15% (only appreciation, no rental)</td>
              <td>Long-term holding (5-10 years)</td>
            </tr>
          </tbody>
        </table>

        <h4>Real Estate vs Other Investments:</h4>
        <table>
          <thead>
            <tr>
              <th>Factor</th>
              <th>Real Estate</th>
              <th>Equity/Mutual Funds</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Entry Capital</strong></td>
              <td>High (₹20L minimum)</td>
              <td>Low (₹500 SIP)</td>
            </tr>
            <tr>
              <td><strong>Liquidity</strong></td>
              <td>Very Low (6-12 months to sell)</td>
              <td>High (1-3 days)</td>
            </tr>
            <tr>
              <td><strong>Transaction Cost</strong></td>
              <td>High (10-15% total)</td>
              <td>Low (0.1-0.5%)</td>
            </tr>
            <tr>
              <td><strong>Maintenance</strong></td>
              <td>High (repairs, taxes, tenant issues)</td>
              <td>None</td>
            </tr>
            <tr>
              <td><strong>Returns</strong></td>
              <td>8-12% (rental + appreciation)</td>
              <td>12-15% (long-term)</td>
            </tr>
            <tr>
              <td><strong>Diversification</strong></td>
              <td>Difficult (one property)</td>
              <td>Easy (50+ stocks in one fund)</td>
            </tr>
          </tbody>
        </table>

        <h4>Real Estate Costs Breakdown:</h4>
        <div class="warning-box">
          <strong>Buying ₹50 lakh property - Hidden costs:</strong><br>
          • Stamp Duty: 5-7% = ₹2.5L - ₹3.5L<br>
          • Registration: 1% = ₹50K<br>
          • GST (under-construction): 5% = ₹2.5L<br>
          • Broker: 1-2% = ₹50K - ₹1L<br>
          • Legal/Documentation: ₹50K<br>
          <strong>Total Extra: ₹6L - ₹8L (12-16% of property value!)</strong><br><br>
          <em>Your ₹50L property actually costs ₹56-58L</em>
        </div>

        <h4>Rental Yield Calculation:</h4>
        <div class="tip-box">
          <strong>Example: ₹50 lakh apartment</strong><br>
          • Monthly rent: ₹20,000<br>
          • Annual rent: ₹2.4L<br>
          • Rental Yield = (₹2.4L / ₹50L) × 100 = 4.8%<br><br>
          <strong>After expenses:</strong><br>
          • Property tax: ₹20K/year<br>
          • Maintenance: ₹40K/year<br>
          • Vacancy (1 month): ₹20K<br>
          • Repairs: ₹20K/year<br>
          • Net rental income: ₹2.4L - ₹1L = ₹1.4L<br>
          <strong>Net Yield: 2.8% (lower than FD!)</strong>
        </div>

        <h4>REITs (Real Estate Investment Trusts):</h4>
        <p>REITs let you invest in commercial real estate with small amounts (₹10,000+). They own malls, offices, warehouses and distribute 90% rental income to investors.</p>

        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Physical Property</th>
              <th>REITs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Minimum Investment</strong></td>
              <td>₹20L+</td>
              <td>₹10K-50K</td>
            </tr>
            <tr>
              <td><strong>Liquidity</strong></td>
              <td>6-12 months</td>
              <td>Sell in 1 day (listed on stock exchange)</td>
            </tr>
            <tr>
              <td><strong>Maintenance</strong></td>
              <td>Your responsibility</td>
              <td>Managed by professionals</td>
            </tr>
            <tr>
              <td><strong>Diversification</strong></td>
              <td>One property</td>
              <td>Multiple properties (10-20)</td>
            </tr>
            <tr>
              <td><strong>Dividend Yield</strong></td>
              <td>2-4% net rental</td>
              <td>6-8% regular dividends</td>
            </tr>
          </tbody>
        </table>

        <h4>Popular REITs in India:</h4>
        <ul>
          <li><strong>Embassy REIT:</strong> Commercial offices (Bengaluru, Mumbai) - 7-8% yield</li>
          <li><strong>Mindspace REIT:</strong> IT parks (Hyderabad, Pune) - 6-7% yield</li>
          <li><strong>Brookfield REIT:</strong> Office buildings - 7% yield</li>
        </ul>

        <h4>Tax on Real Estate:</h4>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Tax Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Rental Income</td>
              <td>As per tax slab (30% for highest) - can deduct 30% standard deduction + loan interest</td>
            </tr>
            <tr>
              <td>Capital Gains (< 2 years)</td>
              <td>Short term: As per tax slab</td>
            </tr>
            <tr>
              <td>Capital Gains (> 2 years)</td>
              <td>Long term: 20% with indexation benefit</td>
            </tr>
            <tr>
              <td>REIT Dividends</td>
              <td>Tax-free up to ₹10L/year</td>
            </tr>
          </tbody>
        </table>

        <h4>When to Buy Real Estate:</h4>
        <ul>
          <li>✓ You need own house for living (not purely investment)</li>
          <li>✓ You have ₹50L+ surplus (after emergency fund)</li>
          <li>✓ Location has strong rental demand (near IT parks, colleges)</li>
          <li>✓ Ready possession property (avoid under-construction risk)</li>
          <li>✓ Home loan rate < 8.5% (low interest environment)</li>
        </ul>

        <h4>When NOT to Buy:</h4>
        <ul>
          <li>✗ Based on builder's promises of "guaranteed returns"</li>
          <li>✗ Under-construction projects with 3-5 year timeline (delivery risk)</li>
          <li>✗ Remote locations with "upcoming metro" (speculation)</li>
          <li>✗ When loan EMI > 40% of income (financial stress)</li>
          <li>✗ Expecting 20-30% annual appreciation (unrealistic)</li>
        </ul>

        <h4>Pro Tips:</h4>
        <ul>
          <li>✓ <strong>For small investors:</strong> REITs > Physical property (lower capital, better liquidity)</li>
          <li>✓ Check property title clearly (hire lawyer, avoid litigation properties)</li>
          <li>✓ Location matters most: Tier-1 cities > Tier-2 > Tier-3 for investment</li>
          <li>✓ Commercial properties give 2× rental yield vs residential</li>
          <li>✓ Buy only ready-to-move properties (avoid construction delays)</li>
          <li>✓ Calculate total cost including stamp duty, registration, GST</li>
          <li>✓ Real estate suits HNI investors (₹1Cr+ surplus), not beginners</li>
        </ul>
      `,
      quiz: [
        {
          question: 'You have ₹60 lakh to invest. You buy ₹50L property (stamp duty 6%, registration 1%, broker 1%). What is your TOTAL investment?',
          options: [
            '₹50 lakh (property cost)',
            '₹54 lakh (including stamp duty)',
            '₹54 lakh (including all costs)',
            '₹58 lakh (6% + 1% + 1% = 8% extra)'
          ],
          correctAnswer: 3,
          explanation: 'Total costs = Property (₹50L) + Stamp duty 6% (₹3L) + Registration 1% (₹50K) + Broker 1% (₹50K) = ₹54L. But forgot GST (if under-construction), legal fees. Actual total = ₹56-58L. Real estate has 12-16% transaction costs!'
        },
        {
          question: 'Your ₹50L property gives ₹20K/month rent. After property tax (₹20K), maintenance (₹40K), repairs (₹20K), vacancy (₹20K), what is NET annual yield?',
          options: [
            '4.8% (₹2.4L rent / ₹50L)',
            '3.6% (after some expenses)',
            '2.8% (₹1.4L net / ₹50L)',
            '6% (rental income is pure profit)'
          ],
          correctAnswer: 2,
          explanation: 'Gross rent = ₹2.4L/year. Expenses = ₹20K + ₹40K + ₹20K + ₹20K = ₹1L. Net income = ₹1.4L. Net yield = (₹1.4L / ₹50L) × 100 = 2.8%. This is lower than FD (6.5-7%)! Many investors ignore maintenance costs and overestimate rental returns.'
        },
        {
          question: 'You want real estate exposure with ₹50,000 investment. Which is the BEST option?',
          options: [
            'Down payment for ₹50L property (take ₹45L loan)',
            'Buy land in tier-3 city',
            'Invest in REITs (₹50K in Embassy/Mindspace REIT)',
            'Wait and save ₹20L for full property'
          ],
          correctAnswer: 2,
          explanation: 'With ₹50K, REITs are perfect: 1) Instant diversification (10-20 properties), 2) 6-8% dividend yield, 3) Listed on exchange (sell anytime), 4) Professional management, 5) No maintenance headache. Taking huge loan (option 1) is risky. Small land (option 2) has zero rental income.'
        },
        {
          question: 'Compare investments: ₹50L in residential property (4% net yield + 5% appreciation) vs ₹50L in equity mutual fund (12% CAGR). After 10 years, what is approximate difference?',
          options: [
            'Both give same returns (₹80-90L)',
            'Property gives more (₹90L vs ₹80L)',
            'Equity gives ₹30-40L more (₹1.5Cr vs ₹1.1Cr)',
            'Property safer, returns don\'t matter'
          ],
          correctAnswer: 2,
          explanation: 'Property (9% total return): ₹50L → ₹1.18Cr in 10 years. Equity (12% CAGR): ₹50L → ₹1.55Cr. Difference = ₹37L! Plus property has: low liquidity, maintenance costs, tenant issues. Equity is simpler and gives better returns for most investors.'
        },
        {
          question: 'Under-construction property promises possession in 2 years. Builder offers "guaranteed 10% rental returns for 3 years". Should you invest?',
          options: [
            'Yes - guaranteed returns are safe',
            'Yes - builder will manage tenants',
            'No - high risk of delays and false promises',
            'Yes - 10% return beats market'
          ],
          correctAnswer: 2,
          explanation: 'RED FLAGS: 1) Under-construction = delivery delays common (3-5 years vs promised 2), 2) "Guaranteed returns" are marketing gimmicks (who guarantees if builder fails?), 3) Usually in remote locations with no real rental demand, 4) Builder may disappear after sale. Avoid such schemes! Buy only ready-to-move properties.'
        },
        {
          question: 'REITs vs Physical Property: For a salaried person with ₹5L to invest annually, which is better?',
          options: [
            'Save for 5 years, then buy ₹25L property',
            'Invest ₹5L yearly in REITs (get immediate exposure + dividends)',
            'Take loan and buy property immediately',
            'Wait for 10 years to buy ₹50L property'
          ],
          correctAnswer: 1,
          explanation: 'REITs are better for salaried investors: 1) Immediate real estate exposure, 2) 6-8% dividends from day 1, 3) Compounding benefits (reinvest dividends), 4) No management hassle, 5) High liquidity. Waiting 5-10 years (options 1,4) means losing compounding years. Loan (option 3) = EMI burden.'
        },
        {
          question: 'Your rental income is ₹3L/year. Home loan interest paid is ₹2L/year. What is taxable rental income?',
          options: [
            '₹3 lakh (full rental income)',
            '₹1 lakh (₹3L - ₹2L interest)',
            '₹10,000 only (₹3L - 30% standard deduction - ₹2L interest)',
            'Zero (interest cancels rental income)'
          ],
          correctAnswer: 2,
          explanation: 'Rental income calculation: Gross rent (₹3L) - Standard deduction 30% (₹90K) - Home loan interest (₹2L) = Taxable income ₹10K. You can deduct: 1) 30% standard deduction (mandatory), 2) Full home loan interest, 3) Property tax paid. This reduces tax burden significantly!'
        }
      ]
    },
    {
      id: 5,
      title: 'Risk-Return Tradeoff',
      subtitle: 'Understanding Investment Risk',
      duration: '6 mins',
      content: `
        <h3>What is Risk-Return Tradeoff?</h3>
        <p>Simple rule: <strong>Higher returns = Higher risk</strong>. Safe investments (FD) give low returns (6-7%). Risky investments (stocks) can give high returns (12-15%) but also losses.</p>

        <h4>Risk-Return Pyramid:</h4>
        <table>
          <thead>
            <tr>
              <th>Risk Level</th>
              <th>Investment</th>
              <th>Expected Returns</th>
              <th>Loss Risk</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Very Low</strong></td>
              <td>Savings Account, FD, PPF</td>
              <td>3-7%</td>
              <td>Almost zero</td>
            </tr>
            <tr>
              <td><strong>Low</strong></td>
              <td>Debt Mutual Funds, Bonds</td>
              <td>6-8%</td>
              <td>Very low</td>
            </tr>
            <tr>
              <td><strong>Medium</strong></td>
              <td>Hybrid Funds, Gold, REITs</td>
              <td>8-10%</td>
              <td>Moderate</td>
            </tr>
            <tr>
              <td><strong>High</strong></td>
              <td>Large Cap Equity Funds</td>
              <td>10-12%</td>
              <td>Can fall 20-30% in bad years</td>
            </tr>
            <tr>
              <td><strong>Very High</strong></td>
              <td>Mid/Small Cap Funds, Individual Stocks</td>
              <td>12-20%</td>
              <td>Can fall 40-60% in crashes</td>
            </tr>
            <tr>
              <td><strong>Extreme</strong></td>
              <td>Penny Stocks, Crypto, F&O Trading</td>
              <td>Can double or -100%</td>
              <td>Can lose entire capital!</td>
            </tr>
          </tbody>
        </table>

        <h4>Types of Investment Risks:</h4>

        <h5>1. Market Risk (Systematic Risk):</h5>
        <p>Entire market falls due to recession, war, pandemic. Example: 2020 COVID crash - Nifty fell 40%. Affects all stocks.</p>

        <h5>2. Company Risk (Unsystematic Risk):</h5>
        <p>Specific company problems. Example: Yes Bank fell 90% due to bad loans. Can be reduced by diversification.</p>

        <h5>3. Inflation Risk:</h5>
        <p>Your returns don't beat inflation. Example: FD gives 7%, inflation is 6%, real return = 1%.</p>

        <h5>4. Liquidity Risk:</h5>
        <p>Can't sell quickly. Example: Real estate takes 6-12 months to sell. Stocks sell in 1 day.</p>

        <h5>5. Interest Rate Risk:</h5>
        <p>Rising interest rates hurt bond prices. Example: If RBI increases rates, existing bonds lose value.</p>

        <h4>Investment Risk Comparison:</h4>
        <table>
          <thead>
            <tr>
              <th>Investment</th>
              <th>Capital Safety</th>
              <th>Return Volatility</th>
              <th>Inflation Protection</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Fixed Deposits</strong></td>
              <td>Very High</td>
              <td>Zero (fixed returns)</td>
              <td>Poor (barely beats inflation)</td>
            </tr>
            <tr>
              <td><strong>Debt Funds</strong></td>
              <td>High</td>
              <td>Low</td>
              <td>Moderate</td>
            </tr>
            <tr>
              <td><strong>Gold</strong></td>
              <td>High</td>
              <td>Medium</td>
              <td>Excellent (classic hedge)</td>
            </tr>
            <tr>
              <td><strong>Equity Funds</strong></td>
              <td>Medium (long-term)</td>
              <td>High (short-term)</td>
              <td>Excellent (12-15% beats 6% inflation)</td>
            </tr>
            <tr>
              <td><strong>Real Estate</strong></td>
              <td>High</td>
              <td>Low (but illiquid)</td>
              <td>Good</td>
            </tr>
          </tbody>
        </table>

        <h4>Risk Tolerance by Age:</h4>
        <table>
          <thead>
            <tr>
              <th>Age Group</th>
              <th>Risk Capacity</th>
              <th>Recommended Allocation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>20-35 years</strong></td>
              <td>High (long investment horizon)</td>
              <td>Equity: 70-80%, Debt: 20-30%</td>
            </tr>
            <tr>
              <td><strong>35-50 years</strong></td>
              <td>Medium (some responsibilities)</td>
              <td>Equity: 50-60%, Debt: 40-50%</td>
            </tr>
            <tr>
              <td><strong>50-60 years</strong></td>
              <td>Low-Medium (near retirement)</td>
              <td>Equity: 30-40%, Debt: 60-70%</td>
            </tr>
            <tr>
              <td><strong>60+ years</strong></td>
              <td>Low (need stability)</td>
              <td>Equity: 20-30%, Debt: 70-80%</td>
            </tr>
          </tbody>
        </table>

        <div class="tip-box">
          <strong>Rule of Thumb:</strong> Equity allocation = 100 - Your age
          <br>• Age 25 → 75% equity, 25% debt
          <br>• Age 50 → 50% equity, 50% debt
          <br>• Age 65 → 35% equity, 65% debt
        </div>

        <h4>How to Reduce Risk:</h4>
        <ul>
          <li><strong>Time Diversification:</strong> Invest for 10+ years (short-term volatility averages out)</li>
          <li><strong>Asset Diversification:</strong> Mix equity + debt + gold (don't put all eggs in one basket)</li>
          <li><strong>SIP Strategy:</strong> Invest monthly (rupee cost averaging reduces timing risk)</li>
          <li><strong>Rebalancing:</strong> Annually adjust to target allocation (sell high, buy low)</li>
          <li><strong>Emergency Fund:</strong> Keep 6-12 months expenses in liquid funds (avoid panic selling)</li>
        </ul>

        <h4>Real Example - Risk Impact:</h4>
        <div class="warning-box">
          <strong>2020 COVID Crash (March 2020):</strong><br>
          • Nifty fell from 12,000 → 7,500 (40% drop)<br>
          • Small cap stocks fell 50-70%<br>
          • FD/PPF investors: Zero impact (safe but low returns)<br><br>
          <strong>Recovery (March 2020 → Dec 2021):</strong><br>
          • Nifty recovered to 18,000 (140% gain from bottom!)<br>
          • Investors who sold in panic: Lost money<br>
          • Investors who held/bought more: Made huge gains<br><br>
          <em>Lesson: Short-term volatility is normal. Long-term patience wins!</em>
        </div>

        <h4>Match Investment to Goal Timeline:</h4>
        <table>
          <thead>
            <tr>
              <th>Goal Timeline</th>
              <th>Risk You Can Take</th>
              <th>Recommended Investment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>< 1 year</strong></td>
              <td>Very Low</td>
              <td>Liquid funds, savings account</td>
            </tr>
            <tr>
              <td><strong>1-3 years</strong></td>
              <td>Low</td>
              <td>FD, short-term debt funds</td>
            </tr>
            <tr>
              <td><strong>3-5 years</strong></td>
              <td>Medium</td>
              <td>Hybrid funds, debt funds</td>
            </tr>
            <tr>
              <td><strong>5-10 years</strong></td>
              <td>High</td>
              <td>Equity funds (large cap)</td>
            </tr>
            <tr>
              <td><strong>10+ years</strong></td>
              <td>Very High</td>
              <td>Equity funds (mid/small cap), stocks</td>
            </tr>
          </tbody>
        </table>

        <h4>Risk Mistakes to Avoid:</h4>
        <ul>
          <li>✗ Taking too much risk for short-term goals (equity for 1-year goal = disaster if market crashes)</li>
          <li>✗ Taking too little risk for long-term goals (only FD for 20-year retirement = inflation eats returns)</li>
          <li>✗ Panic selling during crashes (locking losses instead of buying opportunity)</li>
          <li>✗ Chasing high returns without understanding risk (penny stocks, crypto without research)</li>
          <li>✗ No emergency fund (forced to sell investments at loss during emergencies)</li>
        </ul>

        <h4>Pro Tips:</h4>
        <ul>
          <li>✓ Young investors: Take more equity risk (time to recover from crashes)</li>
          <li>✓ Risk capacity ≠ Risk tolerance (you may afford risk but can't sleep at night = reduce equity)</li>
          <li>✓ Never invest money you need in next 3 years in equity</li>
          <li>✓ Higher risk doesn't guarantee higher returns (penny stocks are risky but most lose money)</li>
          <li>✓ Equity risk reduces significantly after 10+ years (almost no negative returns in 15-year periods)</li>
        </ul>
      `,
      quiz: [
        {
          question: 'Rohan (age 28) is saving for home down payment in 2 years (₹20 lakh needed). Where should he invest monthly SIP?',
          options: [
            'Small cap equity fund (high returns potential)',
            'Large cap equity fund (moderate risk)',
            'Debt fund or FD (low risk, stable)',
            'Gold ETF (inflation protection)'
          ],
          correctAnswer: 2,
          explanation: '2 years = short-term goal. Equity is too risky (market can fall 30-40% in 2 years, seen in 2020). Use low-risk options: Debt funds (6-8% stable) or FD (guaranteed 7%). Rule: Never use equity for goals < 3-5 years!'
        },
        {
          question: 'During 2020 COVID crash, Nifty fell 40% (12,000 → 7,500). Your ₹10 lakh equity portfolio is now ₹6 lakh. What should you do?',
          options: [
            'Sell everything to prevent further losses',
            'Hold and continue monthly SIP (buy more at lower prices)',
            'Stop SIP and wait for market to recover',
            'Switch to FD for safety'
          ],
          correctAnswer: 1,
          explanation: 'Market crashes are buying opportunities for long-term investors! Continuing SIP means buying more units at lower prices (rupee cost averaging). Nifty recovered to 18,000 by Dec 2021 (140% gain from bottom). Selling locks losses. Those who stayed invested made huge gains!'
        },
        {
          question: 'Priya (age 45) has ₹50L to invest for retirement (age 60). Using "100 - age" rule, what should be her equity allocation?',
          options: [
            '80% equity (100 - 45 = 55, round to 80%)',
            '55% equity, 45% debt',
            '45% equity, 55% debt',
            '30% equity, 70% debt (retirement is risky)'
          ],
          correctAnswer: 1,
          explanation: 'Rule: Equity % = 100 - age = 100 - 45 = 55%. She has 15 years till retirement (long enough for equity exposure). 55% equity gives growth potential while 45% debt provides stability. She can adjust to 50-50 if she is conservative.'
        },
        {
          question: 'Compare two investors in March 2020 crash: Investor A (kept ₹6 months expenses in emergency fund, continued SIP). Investor B (no emergency fund, sold equity at loss for medical emergency). Who made better decision?',
          options: [
            'Investor B - saved money when needed',
            'Investor A - emergency fund prevented panic selling',
            'Both same - emergency is emergency',
            'Investor B - sold at right time before more fall'
          ],
          correctAnswer: 1,
          explanation: 'Emergency fund is crucial! Investor A: Had liquid money ready, continued SIP at low prices, portfolio recovered. Investor B: Forced to sell at 40% loss, missed 140% recovery. Emergency fund prevents forced selling at worst time. This is why 6-12 months expenses in liquid fund is essential!'
        },
        {
          question: 'Which investment has HIGHEST liquidity (can sell fastest)?',
          options: [
            'Real estate property',
            'Fixed deposit',
            'Equity mutual funds or stocks',
            'Gold jewelry'
          ],
          correctAnswer: 2,
          explanation: 'Liquidity ranking: Equity/MF (1-3 days) > Liquid funds (1 day) > FD (instant but penalty) > Gold jewelry (few days) > Real estate (6-12 months). Equity traded on exchanges has highest liquidity. Real estate has lowest (finding buyer takes months).'
        },
        {
          question: 'Your FD gives 7% return, inflation is 6%. Your ₹10L investment after 1 year becomes ₹10.7L. What is your REAL purchasing power gain?',
          options: [
            '₹70,000 (7% gain)',
            '₹10,000 (1% real return)',
            'Negative (after tax at 30% slab)',
            '₹60,000 (inflation-adjusted)'
          ],
          correctAnswer: 2,
          explanation: 'Real return = Nominal return - Inflation - Tax. Nominal = 7% (₹70K), Tax at 30% = ₹21K, Post-tax return = ₹49K (4.9%). Real return = 4.9% - 6% inflation = -1.1%! You are LOSING purchasing power. This is inflation risk - FDs can\'t beat inflation for high tax bracket investors.'
        },
        {
          question: 'You have 15-year horizon for child\'s education. Which strategy gives BEST risk-adjusted returns?',
          options: [
            '100% FD (safe, guaranteed)',
            '100% small cap equity (highest returns)',
            '70% equity, 30% debt, rebalance annually',
            '50-50 equity-debt (balanced)'
          ],
          correctAnswer: 2,
          explanation: '15 years is long-term. 70% equity captures growth (12-15% returns), 30% debt provides stability. Annual rebalancing (sell high, buy low) optimizes returns. 100% FD gives only 7% (inflation eats it). 100% small cap is too risky (60% volatility). 70-30 is optimal for long-term goals with rebalancing discipline.'
        }
      ]
    },
    {
      id: 6,
      title: 'Portfolio Diversification',
      subtitle: 'Don\'t Put All Eggs in One Basket',
      duration: '6 mins',
      content: `
        <h3>What is Diversification?</h3>
        <p>"Don't put all eggs in one basket." Spread investments across different asset classes, sectors, and geographies to reduce risk. If one investment fails, others can compensate.</p>

        <h4>Why Diversify?</h4>
        <div class="tip-box">
          <strong>Example:</strong> 2020 Pandemic Impact<br>
          • Aviation stocks fell 60-70% (no flights)<br>
          • Pharma stocks rose 50-100% (vaccines, medicines)<br>
          • IT stocks rose 40-60% (work from home)<br>
          • Diversified portfolio: -10% to +5% (some sectors up, some down)<br><br>
          <em>Diversification saved investors from huge losses!</em>
        </div>

        <h4>Types of Diversification:</h4>

        <h5>1. Asset Class Diversification:</h5>
        <table>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Allocation</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Equity</strong></td>
              <td>50-70%</td>
              <td>Growth, wealth creation</td>
            </tr>
            <tr>
              <td><strong>Debt</strong></td>
              <td>20-40%</td>
              <td>Stability, regular income</td>
            </tr>
            <tr>
              <td><strong>Gold</strong></td>
              <td>5-10%</td>
              <td>Inflation hedge, safe haven</td>
            </tr>
            <tr>
              <td><strong>Real Estate/REITs</strong></td>
              <td>0-10%</td>
              <td>Rental income, diversification</td>
            </tr>
          </tbody>
        </table>

        <h5>2. Sector Diversification (Within Equity):</h5>
        <p>Don't invest all equity in one sector (IT, Banking, Pharma). Spread across 5-7 sectors:</p>
        <ul>
          <li>Banking & Financial Services (HDFC, ICICI)</li>
          <li>Information Technology (TCS, Infosys)</li>
          <li>FMCG (HUL, ITC)</li>
          <li>Pharma (Sun Pharma, Dr. Reddy's)</li>
          <li>Auto (Maruti, Tata Motors)</li>
          <li>Energy (Reliance, ONGC)</li>
          <li>Manufacturing (L&T, Tata Steel)</li>
        </ul>

        <h5>3. Market Cap Diversification:</h5>
        <ul>
          <li><strong>Large Cap:</strong> 60-70% (stable, low risk)</li>
          <li><strong>Mid Cap:</strong> 20-30% (growth potential)</li>
          <li><strong>Small Cap:</strong> 0-10% (high risk, high return)</li>
        </ul>

        <h5>4. Geographic Diversification:</h5>
        <ul>
          <li><strong>India:</strong> 70-80% (home market advantage)</li>
          <li><strong>International:</strong> 20-30% (US, China, Europe exposure via international funds)</li>
        </ul>

        <h4>Sample Diversified Portfolios:</h4>

        <div class="tip-box">
          <strong>Beginner Portfolio (₹10,000/month SIP):</strong><br>
          • 60% Nifty 50 Index Fund (₹6,000) - Stable<br>
          • 30% Multi Cap Fund (₹3,000) - Growth<br>
          • 10% Liquid Fund (₹1,000) - Emergency<br><br>
          <strong>Risk:</strong> Medium | <strong>Expected Return:</strong> 10-12%
        </div>

        <div class="tip-box">
          <strong>Intermediate Portfolio (₹25,000/month SIP):</strong><br>
          • 40% Large Cap Fund (₹10,000)<br>
          • 25% Mid Cap Fund (₹6,250)<br>
          • 15% International Fund (₹3,750)<br>
          • 10% Debt Fund (₹2,500)<br>
          • 10% Gold ETF (₹2,500)<br><br>
          <strong>Risk:</strong> Medium-High | <strong>Expected Return:</strong> 12-14%
        </div>

        <div class="tip-box">
          <strong>Aggressive Portfolio (₹50,000/month SIP):</strong><br>
          • 35% Nifty 50 Index (₹17,500)<br>
          • 30% Mid Cap Fund (₹15,000)<br>
          • 20% Small Cap Fund (₹10,000)<br>
          • 10% International Fund (₹5,000)<br>
          • 5% Gold ETF (₹2,500)<br><br>
          <strong>Risk:</strong> High | <strong>Expected Return:</strong> 14-18%
        </div>

        <h4>Correlation Between Assets:</h4>
        <p>Choose assets that don't move together (low correlation = better diversification):</p>
        <table>
          <thead>
            <tr>
              <th>Asset Pair</th>
              <th>Correlation</th>
              <th>Diversification Benefit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Equity + Debt</td>
              <td>Low</td>
              <td>Excellent (when equity falls, debt stable)</td>
            </tr>
            <tr>
              <td>Equity + Gold</td>
              <td>Negative</td>
              <td>Excellent (often move opposite)</td>
            </tr>
            <tr>
              <td>Large Cap + Mid Cap</td>
              <td>Medium</td>
              <td>Good (some diversification)</td>
            </tr>
            <tr>
              <td>Banking + IT Stocks</td>
              <td>Medium</td>
              <td>Good (different sector risks)</td>
            </tr>
            <tr>
              <td>TCS + Infosys</td>
              <td>High</td>
              <td>Poor (same sector, move together)</td>
            </tr>
          </tbody>
        </table>

        <h4>Rebalancing - Key to Success:</h4>
        <p>Review portfolio annually and restore target allocation:</p>

        <div class="tip-box">
          <strong>Rebalancing Example:</strong><br>
          <strong>Target:</strong> 60% equity, 40% debt<br><br>
          <strong>After 1 year (equity did well):</strong><br>
          • Portfolio value: ₹11L<br>
          • Equity: ₹7.7L (70%) - grew faster<br>
          • Debt: ₹3.3L (30%)<br><br>
          <strong>Rebalancing Action:</strong><br>
          • Sell ₹1.1L equity (bring to 60% = ₹6.6L)<br>
          • Buy ₹1.1L debt (bring to 40% = ₹4.4L)<br><br>
          <em>This "sells high, buys low" automatically!</em>
        </div>

        <h4>Over-Diversification Warning:</h4>
        <div class="warning-box">
          <strong>Too Many Funds = Problem:</strong><br>
          • Holding 15-20 mutual funds = over-diversification<br>
          • Difficult to track performance<br>
          • Funds may overlap (same stocks)<br>
          • Returns become average (not beating index)<br><br>
          <strong>Optimal:</strong> 3-5 mutual funds for beginners, 5-8 for experienced investors
        </div>

        <h4>Diversification Mistakes:</h4>
        <ul>
          <li>✗ Buying 5 large cap funds (all hold TCS, Reliance - not really diversified!)</li>
          <li>✗ Only Indian equity (no debt, gold, international exposure)</li>
          <li>✗ All money in one sector (IT crash = entire portfolio crash)</li>
          <li>✗ Never rebalancing (equity becomes 90% after bull run = too risky)</li>
          <li>✗ Over-diversification (20+ funds, can't track)</li>
        </ul>

        <h4>Diversification by Goal:</h4>
        <table>
          <thead>
            <tr>
              <th>Goal</th>
              <th>Timeline</th>
              <th>Recommended Mix</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Emergency Fund</td>
              <td>Immediate need</td>
              <td>100% Liquid Fund</td>
            </tr>
            <tr>
              <td>Home Down Payment</td>
              <td>3 years</td>
              <td>70% Debt, 30% Equity</td>
            </tr>
            <tr>
              <td>Child Education</td>
              <td>10 years</td>
              <td>60% Equity, 30% Debt, 10% Gold</td>
            </tr>
            <tr>
              <td>Retirement</td>
              <td>25 years</td>
              <td>70% Equity, 20% Debt, 10% Gold</td>
            </tr>
          </tbody>
        </table>

        <h4>International Diversification:</h4>
        <p>20-30% allocation to international funds gives exposure to US tech giants (Apple, Google, Amazon) and reduces India-specific risk.</p>

        <ul>
          <li><strong>Motilal Oswal S&P 500 Index Fund:</strong> Top 500 US companies</li>
          <li><strong>Parag Parikh Flexi Cap:</strong> 25-30% in US stocks (Google, Meta, Amazon)</li>
          <li><strong>ICICI Pru US Bluechip:</strong> US large caps</li>
        </ul>

        <h4>Pro Tips:</h4>
        <ul>
          <li>✓ Start simple: 2-3 funds initially, add more as you learn</li>
          <li>✓ Rebalance annually (not monthly!) to maintain target allocation</li>
          <li>✓ Check fund overlap using tools (Morningstar X-ray)</li>
          <li>✓ Don't chase returns - stick to diversification plan</li>
          <li>✓ Review allocation every 3-5 years as goals approach</li>
          <li>✓ Emergency fund separate from investment portfolio</li>
          <li>✓ Different goals = different portfolios (don't mix)</li>
        </ul>
      `,
      quiz: [
        {
          question: 'Your portfolio: 5 large cap funds holding TCS, Reliance, HDFC Bank. Are you well diversified?',
          options: [
            'Yes - 5 different funds means diversification',
            'No - all funds hold same stocks (overlap)',
            'Yes - large caps are always safe',
            'No - need small cap funds too'
          ],
          correctAnswer: 1,
          explanation: 'This is false diversification! All 5 large cap funds likely hold same top stocks (TCS, Reliance, HDFC). If these stocks fall, entire portfolio falls. Real diversification = different asset classes (equity + debt + gold) or different sectors, not multiple funds with same holdings.'
        },
        {
          question: '2020 Aviation stocks fell 70%, Pharma rose 80%, IT rose 50%. Diversified portfolio (33% each sector) performance?',
          options: [
            '-10% loss (aviation dragged down)',
            '+20% gain (pharma and IT gains compensate aviation loss)',
            '+50% (average of all three)',
            'Zero (balanced out)'
          ],
          correctAnswer: 1,
          explanation: 'Calculation: (33% × -70%) + (33% × +80%) + (33% × +50%) = -23.1% + 26.4% + 16.5% = +19.8% ≈ +20%. Diversification saved the portfolio! If invested only in aviation = -70% loss. This is the power of sector diversification!'
        },
        {
          question: 'Your target: 60% equity, 40% debt. After bull run: ₹11L portfolio (70% equity = ₹7.7L, 30% debt = ₹3.3L). Rebalancing action?',
          options: [
            'Keep as is - equity is performing well',
            'Sell ₹1.1L equity, buy ₹1.1L debt (restore 60-40)',
            'Sell all equity and move to debt',
            'Buy more equity - double down on winners'
          ],
          correctAnswer: 1,
          explanation: 'Target 60% equity = ₹6.6L (currently ₹7.7L). Sell excess ₹1.1L equity. Target 40% debt = ₹4.4L (currently ₹3.3L). Buy ₹1.1L debt. This automatically "sells high (equity after bull run) and buys low (underallocated debt)". Rebalancing is forced discipline!'
        },
        {
          question: 'For 15-year retirement goal with ₹20K/month SIP, which diversification is BEST?',
          options: [
            '100% Nifty 50 Index (simple, one fund)',
            '50% Large Cap, 30% Mid Cap, 10% Gold, 10% International',
            '100% Small Cap (highest returns)',
            '50% Equity, 50% FD (safe)'
          ],
          correctAnswer: 1,
          explanation: '15 years = long-term, can take risk. Option 2 gives: Large cap (stability 50%), Mid cap (growth 30%), Gold (inflation hedge 10%), International (geographic diversification 10%). Balanced across asset classes and geographies. 100% Nifty (option 1) lacks gold/international exposure. 50% FD (option 4) too conservative for 15 years.'
        },
        {
          question: 'You hold 18 mutual funds (tracking individually is difficult). What should you do?',
          options: [
            'Keep all - more funds = more safety',
            'Consolidate to 4-5 quality funds covering different categories',
            'Sell all and buy one index fund',
            'Add 10 more funds for better diversification'
          ],
          correctAnswer: 1,
          explanation: '18 funds = over-diversification! Problems: 1) Can\'t track all, 2) Funds overlap (same stocks), 3) Returns become mediocre, 4) Confusion in rebalancing. Consolidate to 4-5 funds: 1 Large Cap, 1 Mid Cap, 1 Debt, 1 International, 1 Gold/Hybrid. Quality over quantity!'
        },
        {
          question: 'Equity and Gold have negative correlation (move opposite). Your portfolio: 80% equity, 10% gold, 10% debt. Market crashes 40%. Expected impact?',
          options: [
            '-40% loss (equity crashed)',
            '-28% loss (gold gains partially offset equity loss)',
            '-50% loss (everything falls together)',
            '-10% loss (debt and gold compensate)'
          ],
          correctAnswer: 1,
          explanation: 'Rough calculation: Equity 80% × -40% = -32%. Gold 10% may rise 20% (negative correlation) = +2%. Debt 10% stays stable = 0%. Total ≈ -30% (not -40%). Gold and debt provide cushion. With 100% equity = -40% loss. This shows diversification reduces downside!'
        },
        {
          question: 'Why add international funds (US stocks) to Indian portfolio?',
          options: [
            'Higher returns than Indian stocks',
            'Geographic diversification - reduces India-specific risk, access to global tech giants',
            'USD gains against INR',
            'US market never crashes'
          ],
          correctAnswer: 1,
          explanation: 'International funds provide: 1) Geographic diversification (India recession may not affect US), 2) Access to companies unavailable in India (Apple, Google, Amazon), 3) Currency diversification (if INR weakens, USD gains). Not about guaranteed higher returns (both markets can crash), but about reducing concentration risk in single geography.'
        },
        {
          question: 'When is rebalancing most important?',
          options: [
            'Every month to capture gains',
            'After major market moves (bull run or crash)',
            'Never - let winners run',
            'Only when adding new money'
          ],
          correctAnswer: 1,
          explanation: 'Rebalance after significant market moves: 1) After bull run - equity grows too much (sell high, buy debt/gold), 2) After crash - equity shrinks (buy low, sell debt). Rebalancing annually or when allocation drifts 5-10% from target is optimal. Monthly = too frequent, never = portfolio becomes risky, only when adding money = misses rebalancing benefit.'
        }
      ]
    }
  ]
};
