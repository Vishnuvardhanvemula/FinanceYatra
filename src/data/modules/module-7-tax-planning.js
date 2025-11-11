/**
 * Module 7: Tax Planning
 * Complete lesson content with quizzes
 * 
 * Topics: Income Tax Basics, Section 80C, Tax Deductions, ITR Filing, TDS, Tax Saving Investments
 */

export const module7Content = {
  title: 'Tax Planning',
  lessons: [
    {
      id: 0,
      title: 'Income Tax Basics',
      subtitle: 'Understanding Tax Slabs & Regimes',
      duration: '7 mins',
      content: `
        <h3>What is Income Tax?</h3>
        <p>Income tax is charged by the government on your income. In India, Financial Year (FY) runs from April 1 to March 31. Assessment Year (AY) is the next year when you file returns.</p>

        <h4>Two Tax Regimes (Choose One):</h4>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Old Regime</th>
              <th>New Regime</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Tax Rates</strong></td>
              <td>5%, 20%, 30%</td>
              <td>5%, 10%, 15%, 20%, 30%</td>
            </tr>
            <tr>
              <td><strong>Deductions Allowed</strong></td>
              <td>✓ Yes (80C, 80D, HRA, etc.)</td>
              <td>✗ No deductions (except 50C, 50D)</td>
            </tr>
            <tr>
              <td><strong>Standard Deduction</strong></td>
              <td>✓ ₹50,000</td>
              <td>✓ ₹75,000 (higher!)</td>
            </tr>
            <tr>
              <td><strong>Best For</strong></td>
              <td>Those with deductions (home loan, 80C investments)</td>
              <td>Those without deductions, simple filers</td>
            </tr>
          </tbody>
        </table>

        <h4>New Tax Regime Slabs (FY 2024-25):</h4>
        <table>
          <thead>
            <tr>
              <th>Income Range</th>
              <th>Tax Rate</th>
              <th>Tax on Range</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>₹0 - ₹3 lakh</td>
              <td>0%</td>
              <td>₹0</td>
            </tr>
            <tr>
              <td>₹3L - ₹7L</td>
              <td>5%</td>
              <td>₹20,000</td>
            </tr>
            <tr>
              <td>₹7L - ₹10L</td>
              <td>10%</td>
              <td>₹30,000</td>
            </tr>
            <tr>
              <td>₹10L - ₹12L</td>
              <td>15%</td>
              <td>₹30,000</td>
            </tr>
            <tr>
              <td>₹12L - ₹15L</td>
              <td>20%</td>
              <td>₹60,000</td>
            </tr>
            <tr>
              <td>Above ₹15L</td>
              <td>30%</td>
              <td>30% on excess</td>
            </tr>
          </tbody>
        </table>

        <h4>Old Tax Regime Slabs:</h4>
        <table>
          <thead>
            <tr>
              <th>Income Range</th>
              <th>Tax Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>₹0 - ₹2.5 lakh</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>₹2.5L - ₹5L</td>
              <td>5%</td>
            </tr>
            <tr>
              <td>₹5L - ₹10L</td>
              <td>20%</td>
            </tr>
            <tr>
              <td>Above ₹10L</td>
              <td>30%</td>
            </tr>
          </tbody>
        </table>

        <h4>Tax Calculation Example (New Regime):</h4>
        <div class="tip-box">
          <strong>Income: ₹12 lakh/year</strong><br><br>
          • ₹0-3L: ₹0 (0%)<br>
          • ₹3-7L: ₹20,000 (5% on ₹4L)<br>
          • ₹7-10L: ₹30,000 (10% on ₹3L)<br>
          • ₹10-12L: ₹30,000 (15% on ₹2L)<br>
          <strong>Total Tax: ₹80,000</strong><br>
          Less: Rebate u/s 87A: ₹0 (income > ₹7L)<br>
          Add: 4% Cess: ₹3,200<br>
          <strong>Final Tax: ₹83,200 (6.9% effective rate)</strong>
        </div>

        <h4>Tax Calculation Example (Old Regime with Deductions):</h4>
        <div class="tip-box">
          <strong>Gross Income: ₹12 lakh</strong><br>
          Less: Standard deduction: ₹50,000<br>
          Less: 80C (PPF, ELSS): ₹1.5L<br>
          Less: 80D (Health insurance): ₹25,000<br>
          Less: HRA exemption: ₹1L<br>
          <strong>Taxable Income: ₹9.25L</strong><br><br>
          Tax calculation:<br>
          • ₹0-2.5L: ₹0<br>
          • ₹2.5-5L: ₹12,500 (5%)<br>
          • ₹5-9.25L: ₹85,000 (20%)<br>
          <strong>Total: ₹97,500 + 4% cess = ₹1,01,400</strong><br><br>
          <em>Old regime better if deductions > ₹3.25L!</em>
        </div>

        <h4>Which Regime to Choose?</h4>
        <table>
          <thead>
            <tr>
              <th>Situation</th>
              <th>Better Regime</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>No home loan, no 80C investments</td>
              <td><strong>New Regime</strong></td>
            </tr>
            <tr>
              <td>Have home loan (interest > ₹2L)</td>
              <td><strong>Old Regime</strong></td>
            </tr>
            <tr>
              <td>Invest ₹1.5L in 80C + health insurance</td>
              <td><strong>Old Regime</strong></td>
            </tr>
            <tr>
              <td>Income < ₹7 lakh</td>
              <td><strong>New Regime</strong> (₹7L tax-free!)</td>
            </tr>
            <tr>
              <td>Income > ₹15L with deductions</td>
              <td>Calculate both, choose lower tax</td>
            </tr>
          </tbody>
        </table>

        <h4>Types of Income:</h4>
        <ul>
          <li><strong>Salary Income:</strong> Basic + DA + HRA + Allowances</li>
          <li><strong>House Property:</strong> Rental income (can deduct 30% standard + interest)</li>
          <li><strong>Business/Profession:</strong> Net profit from business</li>
          <li><strong>Capital Gains:</strong> Profit from selling stocks, property</li>
          <li><strong>Other Sources:</strong> Interest from FD/savings, dividends</li>
        </ul>

        <h4>Additional Tax - Surcharge & Cess:</h4>
        <ul>
          <li><strong>Cess:</strong> 4% on total tax (everyone pays)</li>
          <li><strong>Surcharge:</strong> 10% if income > ₹50L, 15% if > ₹1Cr, 25% if > ₹2Cr</li>
        </ul>

        <h4>Pro Tips:</h4>
        <ul>
          <li>✓ Use online tax calculators to compare both regimes</li>
          <li>✓ New regime default from FY 2023-24, but can switch to old yearly</li>
          <li>✓ Income up to ₹7L = zero tax in new regime!</li>
          <li>✓ Old regime better if home loan interest + 80C > ₹3L</li>
          <li>✓ Can't change regime mid-year (choose at ITR filing)</li>
        </ul>
      `,
      quiz: [
        {
          question: 'Amit earns ₹10 lakh/year with no deductions (no home loan, no 80C). Which regime saves more tax?',
          options: [
            'Old regime - lower rates',
            'New regime - ₹75K standard deduction + lower tax',
            'Both same',
            'Old regime - can claim standard deduction'
          ],
          correctAnswer: 1,
          explanation: 'New regime: Tax = ₹70,000 (after ₹75K standard deduction). Old regime: Tax = ₹1,12,500 (₹10L - ₹50K std deduction = ₹9.5L taxable). New regime saves ₹42,500! Without deductions, new regime is always better.'
        },
        {
          question: 'Priya (₹12L income) has: Home loan interest ₹2L, 80C ₹1.5L, 80D ₹25K. Which regime is better?',
          options: [
            'New regime - higher standard deduction',
            'Old regime - can claim ₹3.75L deductions',
            'Both same',
            'New regime - simpler'
          ],
          correctAnswer: 1,
          explanation: 'Old regime: Taxable = ₹12L - ₹50K std - ₹2L (home loan) - ₹1.5L (80C) - ₹25K (80D) = ₹7.75L. Tax ≈ ₹77,500. New regime: Tax ≈ ₹83,200. Old regime saves ₹5,700! With significant deductions (>₹3L), old regime wins.'
        },
        {
          question: 'Income ₹6.5 lakh/year. How much tax in new regime?',
          options: [
            '₹20,000',
            '₹17,500',
            'Zero - income below ₹7 lakh exempted',
            '₹30,000'
          ],
          correctAnswer: 2,
          explanation: 'New regime gives tax rebate under section 87A for income up to ₹7 lakh. Even though calculated tax may be ₹17,500 (5% on ₹3.5-6.5L), full rebate makes final tax ZERO! This is huge benefit for middle-class earning up to ₹7L.'
        },
        {
          question: 'In new regime, which deductions are NOT allowed?',
          options: [
            'Standard deduction ₹75,000',
            'Section 80C (PPF, ELSS, LIC)',
            'Employer NPS contribution 80CCD(2)',
            'Professional tax'
          ],
          correctAnswer: 1,
          explanation: 'New regime does NOT allow: 80C, 80D, HRA, home loan interest. Allowed: Standard deduction (₹75K), employer NPS 80CCD(2), leave encashment, professional tax. Section 80C is biggest loss - can\'t claim ₹1.5L deduction for PPF/ELSS/insurance.'
        },
        {
          question: 'Your ₹15 lakh income, tax calculated as ₹1.5L. What is final payable amount?',
          options: [
            '₹1,50,000 (as calculated)',
            '₹1,56,000 (add 4% cess)',
            '₹1,65,000 (surcharge applicable)',
            '₹1,62,240 (surcharge + cess)'
          ],
          correctAnswer: 1,
          explanation: 'Surcharge applies only if income > ₹50L. For ₹15L income, only 4% Health & Education cess applies. Final tax = ₹1,50,000 + (4% × ₹1,50,000) = ₹1,56,000. Cess is mandatory for everyone.'
        },
        {
          question: 'Can you switch between old and new tax regime?',
          options: [
            'No - once chosen, permanent',
            'Yes - can switch every year at ITR filing (if no business income)',
            'Yes - but only once in lifetime',
            'No - regime is fixed based on age'
          ],
          correctAnswer: 1,
          explanation: 'Salaried individuals can switch between regimes every year while filing ITR. Calculate tax in both, choose the one with lower tax. Business income holders can switch only once. New regime is default, but you can opt for old regime annually.'
        },
        {
          question: 'What is the effective tax rate for ₹20L income in new regime (no surcharge, include cess)?',
          options: [
            '15% (marginal rate)',
            '9.88% (average after cess)',
            '20% (slab rate)',
            '12.48% (effective rate with cess)'
          ],
          correctAnswer: 3,
          explanation: 'Tax on ₹20L: ₹0 (0-3L) + ₹20K (3-7L) + ₹30K (7-10L) + ₹30K (10-12L) + ₹60K (12-15L) + ₹1.5L (15-20L) = ₹2.9L. Add 4% cess = ₹3.016L. Effective rate = (₹3.016L/₹20L) × 100 = 15.08% But with std deduction ₹75K, taxable = ₹19.25L, so actual is ~12.48%'
        }
      ]
    },
    {
      id: 1,
      title: 'Section 80C Deductions',
      subtitle: 'Save ₹46,800 Tax Annually',
      duration: '6 mins',
      content: `
        <h3>What is Section 80C?</h3>
        <p>Section 80C allows deduction up to ₹1.5 lakh from taxable income. In 30% tax bracket, this saves ₹46,800 tax! (Only in old tax regime)</p>

        <h4>Investments Eligible for 80C:</h4>
        <table>
          <thead>
            <tr>
              <th>Investment</th>
              <th>Lock-in</th>
              <th>Returns</th>
              <th>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>ELSS Mutual Funds</strong></td>
              <td>3 years</td>
              <td>12-15%</td>
              <td>Best returns + shortest lock-in</td>
            </tr>
            <tr>
              <td><strong>PPF</strong></td>
              <td>15 years</td>
              <td>7.1%</td>
              <td>Safe, tax-free returns, retirement</td>
            </tr>
            <tr>
              <td><strong>NPS (Tier-1)</strong></td>
              <td>Till 60 years</td>
              <td>10-12%</td>
              <td>Retirement planning (extra ₹50K in 80CCD)</td>
            </tr>
            <tr>
              <td><strong>Tax Saver FD</strong></td>
              <td>5 years</td>
              <td>6.5-7%</td>
              <td>Risk-averse investors</td>
            </tr>
            <tr>
              <td><strong>Life Insurance Premium</strong></td>
              <td>Till maturity</td>
              <td>5-6%</td>
              <td>Insurance need (avoid for tax saving)</td>
            </tr>
            <tr>
              <td><strong>Home Loan Principal</strong></td>
              <td>-</td>
              <td>-</td>
              <td>Reduces taxable income</td>
            </tr>
            <tr>
              <td><strong>Sukanya Samriddhi (Girl child)</strong></td>
              <td>Till 21 years</td>
              <td>8.2%</td>
              <td>Best for daughter's education/marriage</td>
            </tr>
          </tbody>
        </table>

        <h4>80C Limit Breakdown Example:</h4>
        <div class="tip-box">
          <strong>Total 80C limit: ₹1.5 lakh</strong><br><br>
          • ELSS SIP: ₹12,500/month = ₹1.5L/year ✓ (Full limit)<br><br>
          OR mix:<br>
          • EPF contribution: ₹50,000<br>
          • PPF: ₹50,000<br>
          • ELSS: ₹30,000<br>
          • Home loan principal: ₹20,000<br>
          <strong>Total: ₹1,50,000 ✓</strong><br><br>
          <em>Can't exceed ₹1.5L total across all 80C investments!</em>
        </div>

        <h4>ELSS vs PPF vs NPS (80C Comparison):</h4>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>ELSS</th>
              <th>PPF</th>
              <th>NPS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Returns</strong></td>
              <td>12-15%</td>
              <td>7.1%</td>
              <td>10-12%</td>
            </tr>
            <tr>
              <td><strong>Lock-in</strong></td>
              <td>3 years (shortest)</td>
              <td>15 years</td>
              <td>Till 60 years</td>
            </tr>
            <tr>
              <td><strong>Risk</strong></td>
              <td>High (equity)</td>
              <td>Zero (govt backed)</td>
              <td>Medium (60% equity max)</td>
            </tr>
            <tr>
              <td><strong>Tax on Returns</strong></td>
              <td>10% on gains >₹1L</td>
              <td>Tax-free</td>
              <td>40% taxable at withdrawal</td>
            </tr>
            <tr>
              <td><strong>Extra Tax Benefit</strong></td>
              <td>No</td>
              <td>No</td>
              <td>Yes - ₹50K extra in 80CCD(1B)</td>
            </tr>
            <tr>
              <td><strong>Best For</strong></td>
              <td>Short-term (3-5 years), young investors</td>
              <td>Long-term safety, retirement</td>
              <td>Retirement corpus</td>
            </tr>
          </tbody>
        </table>

        <h4>Tax Saving Calculation:</h4>
        <div class="tip-box">
          <strong>Without 80C:</strong><br>
          Income: ₹10 lakh → Tax: ₹1,12,500<br><br>
          <strong>With 80C (₹1.5L ELSS):</strong><br>
          Taxable: ₹8.5L → Tax: ₹82,500<br><br>
          <strong>Tax Saved: ₹30,000 (20% bracket)</strong><br>
          <strong>In 30% bracket: ₹46,800 saved!</strong><br><br>
          ELSS returns (12%): ₹18,000/year<br>
          Total benefit: ₹48,000 (tax) + ₹18,000 (returns) = ₹66,000!
        </div>

        <h4>Section 80CCD(1B) - Extra ₹50K for NPS:</h4>
        <p>Additional ₹50,000 deduction exclusively for NPS (over and above ₹1.5L of 80C)</p>
        <ul>
          <li>Total possible deduction: ₹1.5L (80C) + ₹50K (80CCD1B) = ₹2 lakh</li>
          <li>Tax saved in 30% bracket: ₹62,400 (₹2L × 31.2% with cess)</li>
          <li>Lock-in till 60 years, 60% equity allowed, 10-12% returns</li>
        </ul>

        <h4>Common Mistakes in 80C:</h4>
        <ul>
          <li>✗ Buying life insurance only for tax (expensive, low returns)</li>
          <li>✗ Not utilizing full ₹1.5L limit (losing tax benefit)</li>
          <li>✗ Investing lumpsum in March rush (better to SIP monthly)</li>
          <li>✗ Choosing tax saver FD over ELSS (lower returns, longer lock-in)</li>
          <li>✗ Forgetting home loan principal repayment counts in 80C</li>
        </ul>

        <h4>80C Strategy by Age:</h4>
        <table>
          <thead>
            <tr>
              <th>Age Group</th>
              <th>Recommended 80C Mix</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>25-35 years</strong></td>
              <td>₹1L ELSS + ₹50K PPF (growth + safety)</td>
            </tr>
            <tr>
              <td><strong>35-45 years</strong></td>
              <td>₹1L ELSS + ₹50K NPS (growth + retirement)</td>
            </tr>
            <tr>
              <td><strong>45-55 years</strong></td>
              <td>₹75K PPF + ₹50K ELSS + ₹25K NPS (safety focus)</td>
            </tr>
            <tr>
              <td><strong>55+ years</strong></td>
              <td>₹1L PPF/SCSS + ₹50K Tax FD (pure safety)</td>
            </tr>
          </tbody>
        </table>

        <h4>Pro Tips:</h4>
        <ul>
          <li>✓ Start ELSS SIP of ₹12,500/month from April (automatic ₹1.5L by March)</li>
          <li>✓ EPF contribution auto-counts in 80C (check how much left)</li>
          <li>✓ PPF account mandatory if no provident fund (govt employees)</li>
          <li>✓ NPS extra ₹50K is best tax benefit (total ₹2L deduction possible)</li>
          <li>✓ Home loan principal (not interest) counts in 80C limit</li>
          <li>✓ Children's tuition fees eligible (school/college)</li>
        </ul>
      `,
      quiz: [
        {
          question: 'Rahul (30% tax bracket) invests ₹1.5L in ELSS. How much tax does he save?',
          options: [
            '₹45,000 (30% of ₹1.5L)',
            '₹46,800 (including 4% cess)',
            '₹1,50,000 (full amount)',
            '₹30,000 (20% tax)'
          ],
          correctAnswer: 1,
          explanation: 'Tax savings = ₹1.5L × 30% = ₹45,000. Add 4% cess = ₹45,000 × 1.04 = ₹46,800. This is immediate benefit! Plus ELSS returns (12-15%) add more gains. 80C benefit only in old tax regime, not new regime.'
        },
        {
          question: 'You contributed: EPF ₹60K, PPF ₹80K, ELSS ₹50K. Total 80C deduction allowed?',
          options: [
            '₹1,90,000 (all investments)',
            '₹1,50,000 (maximum limit)',
            '₹1,30,000 (PPF + ELSS only)',
            '₹1,40,000 (EPF + ELSS)'
          ],
          correctAnswer: 1,
          explanation: '80C has maximum limit of ₹1.5 lakh. Even if you invest ₹1.9L (₹60K + ₹80K + ₹50K), only ₹1.5L deduction allowed. The extra ₹40K gives no tax benefit. Plan your 80C investments to not exceed ₹1.5L unless targeting returns.'
        },
        {
          question: 'ELSS (3-year lock-in) vs Tax Saver FD (5-year lock-in). Which is better for 80C?',
          options: [
            'Tax FD - safe, guaranteed returns',
            'ELSS - higher returns (12-15%) + shorter lock-in',
            'Both same - same tax benefit',
            'Tax FD - no market risk'
          ],
          correctAnswer: 1,
          explanation: 'ELSS is superior: 1) Shortest lock-in (3 years vs 5 years FD), 2) Higher returns (12-15% vs 6.5% FD), 3) Same tax benefit (₹1.5L deduction). FD returns (6.5%) barely beat inflation. ELSS creates wealth. Tax FD only if extremely risk-averse and very close to retirement.'
        },
        {
          question: 'NPS offers extra ₹50K deduction under 80CCD(1B). Total possible tax deduction?',
          options: [
            '₹1.5 lakh (80C limit)',
            '₹2 lakh (₹1.5L 80C + ₹50K 80CCD1B)',
            '₹2.5 lakh (cumulative)',
            '₹50,000 (only NPS)'
          ],
          correctAnswer: 1,
          explanation: 'Maximum deduction = ₹1.5L (80C for ELSS/PPF/etc) + ₹50K (80CCD1B exclusively for NPS) = ₹2 lakh! In 30% bracket, saves ₹62,400 tax. This is highest tax saving available through investments. But NPS locked till 60 years.'
        },
        {
          question: 'You pay home loan EMI ₹40K/month (₹25K principal + ₹15K interest). What counts in 80C?',
          options: [
            '₹40K × 12 = ₹4.8L (full EMI)',
            '₹25K × 12 = ₹3L (only principal)',
            '₹1.5L (80C limit on principal)',
            '₹15K × 12 = ₹1.8L (only interest)'
          ],
          correctAnswer: 2,
          explanation: 'Home loan principal (₹3L/year) is eligible for 80C, but 80C max limit is ₹1.5L. So only ₹1.5L deduction. Interest (₹1.8L) is separate deduction under 24(b) up to ₹2L (not in 80C). Total benefit: ₹1.5L principal (80C) + ₹1.8L interest (24b) = ₹3.3L deduction!'
        },
        {
          question: 'Which 80C investment has the HIGHEST returns historically?',
          options: [
            'PPF (7.1%, government backed)',
            'Tax Saver FD (6.5%, guaranteed)',
            'ELSS (12-15%, equity linked)',
            'Life Insurance (5-6%)'
          ],
          correctAnswer: 2,
          explanation: 'ELSS gives highest returns (12-15% long-term) as it invests in equity. PPF (7.1%) and FD (6.5%) are safe but lower returns. Life insurance (5-6%) is worst - high charges, low returns. For young investors (<40 years), ELSS is best 80C option for wealth creation + tax saving.'
        },
        {
          question: 'Investing ₹1.5L in ELSS saves ₹46,800 tax (30% bracket). ELSS returns 12% annually. What is total 1-year benefit?',
          options: [
            '₹46,800 (only tax benefit)',
            '₹18,000 (only returns)',
            '₹64,800 (tax saved + returns)',
            '₹1,96,800 (₹1.5L + tax + returns)'
          ],
          correctAnswer: 2,
          explanation: 'Tax saved = ₹46,800 (immediate). ELSS returns (12% on ₹1.5L) = ₹18,000. Total benefit = ₹46,800 + ₹18,000 = ₹64,800 in first year itself! Your ₹1.5L investment effectively becomes ₹2.14L (₹1.5L + ₹46,800 tax saved + ₹18,000 returns). This is power of 80C + ELSS!'
        }
      ]
    }
  ]
};
