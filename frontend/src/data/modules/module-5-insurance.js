/**
 * Module 5: Insurance Essentials
 * Complete lesson content with quizzes
 * 
 * Topics: Life Insurance, Health Insurance, Term vs Whole Life, Premium Calculation, Claim Process, Riders
 */

export const module5Content = {
  title: 'Insurance Essentials',
  lessons: [
    {
      id: 0,
      title: 'Life Insurance Basics',
      subtitle: 'Protecting Your Family\'s Financial Future',
      duration: '8 mins',
      content: `
        <h3>What is Life Insurance?</h3>
        <p>Life insurance is a contract where the insurance company pays a lump sum (sum assured) to your nominated beneficiaries upon your death. It's financial protection for your loved ones when you're no longer there to provide for them.</p>
        
        <h4>Why You NEED Life Insurance:</h4>
        <ul>
          <li><strong>Income Replacement:</strong> Replace your income for your family</li>
          <li><strong>Debt Repayment:</strong> Pay off home loan, car loan, personal loans</li>
          <li><strong>Children's Education:</strong> Fund their education even without you</li>
          <li><strong>Spouse's Future:</strong> Ensure financial independence</li>
          <li><strong>Final Expenses:</strong> Cover funeral and medical bills</li>
          <li><strong>Peace of Mind:</strong> Live without worry about family's future</li>
        </ul>

        <h4>Who Needs Life Insurance?</h4>
        
        <h5>✅ MUST Have Life Insurance:</h5>
        <ul>
          <li><strong>Primary Earner:</strong> Family depends on your income</li>
          <li><strong>Parents:</strong> Young children need education, care</li>
          <li><strong>Home Loan Borrower:</strong> Don't burden family with debt</li>
          <li><strong>Business Owners:</strong> Protect business continuity</li>
          <li><strong>Single Parent:</strong> Critical for sole caregiver</li>
        </ul>

        <h5>⚠️ May Not Need (or need less):</h5>
        <ul>
          <li><strong>Single, No Dependents:</strong> No one relies on your income</li>
          <li><strong>Retired with Adequate Savings:</strong> Corpus already built</li>
          <li><strong>Children (under 18):</strong> No income to insure</li>
        </ul>

        <h4>How Much Life Insurance Do You Need?</h4>
        
        <h5>Method 1: Human Life Value (HLV)</h5>
        <p><strong>Formula:</strong> Annual Income × Years to Retirement</p>
        <p><strong>Example:</strong> Age 30, earning ₹10 lakhs/year, retiring at 60</p>
        <ul>
          <li>HLV = ₹10 lakhs × 30 years = ₹3 crores</li>
          <li>Consider: This doesn't account for inflation or expenses</li>
        </ul>

        <h5>Method 2: Income Replacement Method (Better)</h5>
        <p><strong>Formula:</strong> (Annual Expenses × 25) + Liabilities - Existing Assets</p>
        <p><strong>Example:</strong> Family annual expense: ₹6 lakhs</p>
        <ul>
          <li>Amount needed to generate ₹6L at 6% return: ₹1 crore</li>
          <li>Add home loan: ₹40 lakhs</li>
          <li>Add children education: ₹50 lakhs</li>
          <li>Subtract existing savings: ₹10 lakhs</li>
          <li><strong>Total Insurance Needed: ₹1.8 crores</strong></li>
        </ul>

        <h5>Method 3: Simple Thumb Rule</h5>
        <ul>
          <li><strong>Minimum:</strong> 10× Annual Income</li>
          <li><strong>Recommended:</strong> 15-20× Annual Income</li>
          <li><strong>Example:</strong> ₹10 lakhs salary → ₹1.5 to 2 crores cover</li>
        </ul>

        <h4>Types of Life Insurance:</h4>
        
        <h5>1. Term Insurance (Pure Life Cover) ⭐ BEST</h5>
        <p><strong>What:</strong> Pays only if you die within policy term</p>
        <p><strong>Coverage:</strong> High (₹1 crore for ₹10K-15K yearly)</p>
        <p><strong>Returns:</strong> No maturity benefit, no money back</p>
        <p><strong>Best For:</strong> Maximum protection at lowest cost</p>
        <p><strong>Example:</strong> ₹1 crore cover for 30-year-old = ₹12,000/year premium</p>
        <p><strong>Pros:</strong></p>
        <ul>
          <li>✅ Lowest premium</li>
          <li>✅ Highest coverage</li>
          <li>✅ Pure protection</li>
          <li>✅ Tax benefits under 80C</li>
        </ul>
        <p><strong>Cons:</strong></p>
        <ul>
          <li>❌ No money back if you survive</li>
          <li>❌ Premium increases with age</li>
        </ul>

        <h5>2. Whole Life / Endowment Policy ❌ AVOID</h5>
        <p><strong>What:</strong> Insurance + Investment combined</p>
        <p><strong>Coverage:</strong> Low (₹10-20 lakhs for ₹50K yearly)</p>
        <p><strong>Returns:</strong> 4-6% (lower than FD!)</p>
        <p><strong>Best For:</strong> Insurance agents (high commission!)</p>
        <p><strong>Example:</strong> ₹50,000 yearly for 20 years = ₹10 lakh total paid, get ₹12-15 lakhs (only 4-5% return!)</p>
        <p><strong>Why Avoid:</strong></p>
        <ul>
          <li>❌ Very high premium</li>
          <li>❌ Low coverage (inadequate protection)</li>
          <li>❌ Poor returns (worse than FD)</li>
          <li>❌ Long lock-in (15-25 years)</li>
          <li>❌ High agent commission (40-50% of first year premium!)</li>
        </ul>

        <h5>3. ULIPs (Unit Linked Insurance Plans) ❌ AVOID</h5>
        <p><strong>What:</strong> Insurance + Market investment</p>
        <p><strong>Coverage:</strong> Low</p>
        <p><strong>Returns:</strong> Market-linked but with high charges</p>
        <p><strong>Why Avoid:</strong></p>
        <ul>
          <li>❌ High charges (mortality + fund management + admin = 15-20%)</li>
          <li>❌ Low cover</li>
          <li>❌ 5-year lock-in</li>
          <li>❌ Better to buy term + invest separately in mutual funds</li>
        </ul>

        <h4>Golden Rule of Insurance:</h4>
        <p><strong>"BUY TERM INSURANCE + INVEST THE DIFFERENCE"</strong></p>
        
        <h5>Comparison:</h5>
        <table>
          <tr>
            <th>Option</th>
            <th>Premium</th>
            <th>Coverage</th>
            <th>Investment</th>
          </tr>
          <tr>
            <td><strong>Term Plan</strong></td>
            <td>₹12,000/year</td>
            <td>₹1 crore</td>
            <td>₹0</td>
          </tr>
          <tr>
            <td><strong>Invest Difference</strong></td>
            <td>-</td>
            <td>-</td>
            <td>₹38,000 in mutual funds</td>
          </tr>
          <tr>
            <td colspan="4"><strong>VS</strong></td>
          </tr>
          <tr>
            <td><strong>Endowment</strong></td>
            <td>₹50,000/year</td>
            <td>₹20 lakhs only</td>
            <td>Included (4-5% return)</td>
          </tr>
        </table>
        <p><strong>Result After 20 Years:</strong></p>
        <ul>
          <li>Term + MF: ₹1 crore cover + ₹20 lakhs corpus (at 12% MF return)</li>
          <li>Endowment: ₹20 lakhs cover + ₹12-15 lakhs corpus</li>
        </ul>

        <h4>Where to Buy Term Insurance:</h4>
        
        <h5>Top Insurance Companies:</h5>
        <ul>
          <li><strong>HDFC Life:</strong> Good claim settlement ratio (99%+)</li>
          <li><strong>ICICI Prudential:</strong> Wide network, quick processing</li>
          <li><strong>Max Life:</strong> Low premiums, excellent service</li>
          <li><strong>SBI Life:</strong> Trusted brand, competitive rates</li>
          <li><strong>LIC:</strong> Government-backed, highest trust</li>
          <li><strong>Tata AIA:</strong> Good for online term plans</li>
        </ul>

        <h5>Buying Options:</h5>
        <p><strong>1. Direct from Company Website (BEST)</strong></p>
        <ul>
          <li>✅ Lowest premium (no agent commission)</li>
          <li>✅ Compare features easily</li>
          <li>✅ Instant policy issuance</li>
        </ul>

        <p><strong>2. Comparison Websites</strong></p>
        <ul>
          <li>PolicyBazaar, Coverfox, BankBazaar</li>
          <li>✅ Compare multiple companies</li>
          <li>✅ Get expert advice</li>
          <li>⚠️ Slightly higher premium (commission included)</li>
        </ul>

        <p><strong>3. Through Agent</strong></p>
        <ul>
          <li>✅ Personal guidance</li>
          <li>✅ Help with claims</li>
          <li>❌ Higher premium</li>
          <li>❌ May push commission-heavy products</li>
        </ul>

        <h4>Important Features to Check:</h4>
        <ul>
          <li><strong>Claim Settlement Ratio:</strong> Should be 98%+ (% of claims paid)</li>
          <li><strong>Riders Available:</strong> Critical illness, accidental death</li>
          <li><strong>Policy Term:</strong> Cover till 60-65 years (retirement)</li>
          <li><strong>Premium Payment:</strong> Regular vs Single vs Limited pay</li>
          <li><strong>Return of Premium:</strong> Avoid – increases cost by 50-70%</li>
        </ul>

        <h4>Tax Benefits:</h4>
        <ul>
          <li><strong>Section 80C:</strong> Premium paid up to ₹1.5 lakh tax deductible</li>
          <li><strong>Section 10(10D):</strong> Death benefit received is tax-free</li>
          <li><strong>Example:</strong> ₹12,000 premium saves ₹3,720 tax (31% bracket)</li>
        </ul>

        <h4>Common Mistakes to Avoid:</h4>
        <ul>
          <li>❌ Buying endowment/ULIP instead of term (biggest mistake!)</li>
          <li>❌ Under-insurance (₹10-20 lakhs is NOT enough)</li>
          <li>❌ Buying only company-provided group insurance (stops if you leave job)</li>
          <li>❌ Not disclosing medical history (claims will be rejected!)</li>
          <li>❌ Buying for children (they don't earn – no need)</li>
          <li>❌ Delaying purchase (premium increases with age)</li>
          <li>❌ Relying on parents' policy (need your own)</li>
        </ul>

        <h4>When to Buy Life Insurance:</h4>
        <p><strong>Best Time: NOW!</strong></p>
        <ul>
          <li>✅ Younger = Lower premium (locks in for entire term)</li>
          <li>✅ Good health = Easy approval</li>
          <li>✅ 25-year-old pays ₹8K/year, 40-year-old pays ₹20K+ for same cover</li>
          <li>✅ Buy when you get first job, even if not married yet</li>
        </ul>
      `,
      keyPoints: [
        'Life insurance needed if anyone depends on your income – buy term insurance only',
        'Coverage needed: 15-20× annual income (₹10L salary = ₹1.5-2 crore cover minimum)',
        'Term insurance is best: ₹1 crore cover for ₹12,000/year. Avoid endowment/ULIPs',
        'Buy young for low premium – 25-year-old pays 60% less than 40-year-old'
      ],
      quiz: [
        {
          type: 'calculation',
          question: 'Rahul earns ₹8 lakhs/year. Using the thumb rule (15× income), how much life insurance should he buy?',
          options: ['₹80 lakhs', '₹1 crore', '₹1.2 crores', '₹1.5 crores'],
          correct: 2,
          explanation: 'Life insurance = 15 × Annual Income = 15 × ₹8 lakhs = ₹1.2 crores. This ensures his family can maintain lifestyle for 15+ years even without his income.'
        },
        {
          type: 'mcq',
          question: 'What is the MAIN purpose of life insurance?',
          options: [
            'To save money for retirement',
            'To get high investment returns',
            'To replace income for dependents after your death',
            'To save tax under Section 80C'
          ],
          correct: 2,
          explanation: 'Life insurance\'s primary purpose is income replacement – ensuring your dependents are financially secure after your death. Tax benefits and returns are secondary. Don\'t confuse insurance with investment!'
        },
        {
          type: 'scenario',
          question: 'Agent offers Amit: (A) Term plan ₹1 crore cover for ₹12K/year OR (B) Endowment ₹20 lakhs cover + returns for ₹50K/year. Which should he choose?',
          context: 'Amit is 30, married with 1 kid, earns ₹10 lakhs/year.',
          options: [
            'Endowment (B) – get money back!',
            'Term plan (A) + invest ₹38K in mutual funds',
            'Buy both for double protection',
            'Don\'t buy any – he\'s young'
          ],
          correct: 1,
          explanation: 'Term plan (A) gives 5× more coverage (₹1 cr vs ₹20L) at much lower cost. Invest the ₹38K difference in mutual funds for better returns (12% vs 4-5%). Family needs ₹1 crore+ protection, not measly ₹20 lakhs!'
        },
        {
          type: 'truefalse',
          question: 'Single person with no dependents needs life insurance for financial security.',
          options: ['True', 'False'],
          correct: 1,
          explanation: 'False! If no one depends on your income (no spouse, children, or dependent parents), you don\'t need life insurance. Focus money on health insurance and investments instead. Life insurance is for income replacement – with no dependents, no one needs replacement!'
        },
        {
          type: 'mcq',
          question: 'Why is term insurance better than endowment/ULIP plans?',
          options: [
            'Term insurance gives returns on maturity',
            'Term insurance provides maximum coverage at minimum cost',
            'Term insurance has no tax benefits',
            'Term insurance covers children automatically'
          ],
          correct: 1,
          explanation: 'Term insurance gives MAXIMUM coverage at MINIMUM cost. ₹1 crore cover costs ₹12K/year vs ₹50K+ for endowment with only ₹20L cover. Term is PURE protection without mixing investment (which dilutes both).'
        },
        {
          type: 'scenario',
          question: 'Priya is 40 years old and never bought life insurance. Should she still buy it?',
          context: 'She has 2 kids (age 10, 12), home loan of ₹50 lakhs, earns ₹12 lakhs/year.',
          options: [
            'No – she\'s too old now',
            'Yes – buy immediately, premium will be higher but coverage is critical',
            'Wait till 45 and then decide',
            'Only buy for husband, not herself'
          ],
          correct: 1,
          explanation: 'YES, buy IMMEDIATELY! Priya has huge responsibilities (kids\' education, home loan). Premium at 40 is higher (₹18-20K for ₹1cr) vs ₹12K at 30, but protection is CRITICAL. Waiting longer will make it even costlier. If she\'s the earner, she MUST be insured!'
        }
      ]
    },
    {
      id: 1,
      title: 'Health Insurance',
      subtitle: 'Your Shield Against Medical Expenses',
      duration: '8 mins',
      content: `
        <h3>What is Health Insurance?</h3>
        <p>Health insurance covers medical expenses when you fall ill or get injured. It pays for hospitalization, surgery, medicines, and treatment costs, protecting you from financial disaster due to medical emergencies.</p>
        
        <h4>Why Health Insurance is CRITICAL:</h4>
        
        <h5>Medical Cost Reality Check:</h5>
        <ul>
          <li><strong>Heart Surgery:</strong> ₹3-6 lakhs</li>
          <li><strong>Cancer Treatment:</strong> ₹10-20 lakhs+</li>
          <li><strong>Kidney Transplant:</strong> ₹15-25 lakhs</li>
          <li><strong>ICU (per day):</strong> ₹15,000-50,000</li>
          <li><strong>Normal Delivery:</strong> ₹50,000-1 lakh</li>
          <li><strong>C-Section:</strong> ₹1-2 lakhs</li>
          <li><strong>Dengue Treatment:</strong> ₹30,000-1 lakh</li>
        </ul>
        <p><strong>Without insurance, one medical emergency can wipe out years of savings!</strong></p>

        <h5>Why You Can't Skip Health Insurance:</h5>
        <ul>
          <li>❗ <strong>Medical Inflation:</strong> 10-15% yearly (double of general inflation!)</li>
          <li>❗ <strong>Lifestyle Diseases:</strong> Diabetes, BP, heart issues increasing in 30s</li>
          <li>❗ <strong>Stress & Pollution:</strong> Health problems starting younger</li>
          <li>❗ <strong>Emergency Unplanned:</strong> Accident, illness can strike anytime</li>
          <li>❗ <strong>Protect Savings:</strong> Don't break FDs/emergency fund for medical bills</li>
        </ul>

        <h4>How Much Health Insurance Do You Need?</h4>
        
        <h5>Recommended Coverage:</h5>
        <table>
          <tr>
            <th>Age Group</th>
            <th>Minimum Cover</th>
            <th>Recommended Cover</th>
          </tr>
          <tr>
            <td>20-30 years (Single)</td>
            <td>₹5 lakhs</td>
            <td>₹10 lakhs</td>
          </tr>
          <tr>
            <td>30-40 years (Married)</td>
            <td>₹10 lakhs</td>
            <td>₹15-20 lakhs</td>
          </tr>
          <tr>
            <td>40-50 years (Family)</td>
            <td>₹15 lakhs</td>
            <td>₹25-30 lakhs</td>
          </tr>
          <tr>
            <td>50+ years</td>
            <td>₹20 lakhs</td>
            <td>₹30-50 lakhs</td>
          </tr>
          <tr>
            <td>Metro Cities (any age)</td>
            <td colspan="2">Add 50% more (treatment costs higher)</td>
          </tr>
        </table>

        <h4>Types of Health Insurance:</h4>
        
        <h5>1. Individual Health Insurance</h5>
        <p><strong>Coverage:</strong> One person only</p>
        <p><strong>Sum Insured:</strong> ₹5-50 lakhs</p>
        <p><strong>Best For:</strong> Singles, bachelors, working professionals</p>
        <p><strong>Premium:</strong> ₹6,000-8,000/year for ₹5L cover (30-year-old)</p>

        <h5>2. Family Floater Policy ⭐ BEST for Families</h5>
        <p><strong>Coverage:</strong> Entire family under one policy</p>
        <p><strong>Members:</strong> Self + spouse + 2-4 kids</p>
        <p><strong>Sum Insured:</strong> Shared among all members</p>
        <p><strong>Premium:</strong> ₹15,000-20,000/year for ₹10L cover (family of 4)</p>
        <p><strong>Pros:</strong></p>
        <ul>
          <li>✅ Lower premium than individual policies</li>
          <li>✅ Easy management – one policy</li>
          <li>✅ Flexible usage – anyone can use full amount</li>
        </ul>
        <p><strong>Cons:</strong></p>
        <ul>
          <li>❌ If sum insured exhausted by one member, others not covered</li>
          <li>❌ No bonus for unused members</li>
        </ul>

        <h5>3. Senior Citizen Health Insurance</h5>
        <p><strong>Coverage:</strong> Parents above 60 years</p>
        <p><strong>Sum Insured:</strong> ₹3-25 lakhs</p>
        <p><strong>Premium:</strong> High (₹25,000-50,000/year for ₹5L)</p>
        <p><strong>Features:</strong> Pre-existing diseases covered after waiting period</p>

        <h5>4. Critical Illness Insurance</h5>
        <p><strong>Coverage:</strong> Specific diseases (cancer, heart attack, stroke, kidney failure)</p>
        <p><strong>Payout:</strong> Lump sum on diagnosis</p>
        <p><strong>Use:</strong> Supplement to regular health insurance</p>
        <p><strong>Premium:</strong> ₹5,000-15,000/year for ₹10L cover</p>

        <h5>5. Top-Up Health Insurance</h5>
        <p><strong>What:</strong> Kicks in after deductible amount</p>
        <p><strong>Example:</strong> ₹50L top-up with ₹5L deductible = Covers expenses above ₹5L</p>
        <p><strong>Use:</strong> Affordable way to increase total cover</p>
        <p><strong>Premium:</strong> Very low – ₹3,000-5,000/year for ₹50L</p>

        <h4>What Health Insurance Covers:</h4>
        
        <h5>✅ Covered (Inclusions):</h5>
        <ul>
          <li><strong>Hospitalization:</strong> Room rent, ICU, nursing</li>
          <li><strong>Surgery:</strong> Operation costs, anesthesia</li>
          <li><strong>Pre-Hospitalization:</strong> Tests, consultations (30-60 days before)</li>
          <li><strong>Post-Hospitalization:</strong> Medicines, follow-ups (60-90 days after)</li>
          <li><strong>Ambulance:</strong> Up to certain limit (₹2,000-5,000)</li>
          <li><strong>Day Care:</strong> Procedures not needing 24hr stay (cataract, dialysis)</li>
          <li><strong>Organ Donor:</strong> Expenses for donor in transplant</li>
          <li><strong>AYUSH Treatment:</strong> Ayurveda, Yoga, Unani, Homeopathy</li>
        </ul>

        <h5>❌ NOT Covered (Exclusions):</h5>
        <ul>
          <li><strong>First 30 Days:</strong> Waiting period for most illnesses</li>
          <li><strong>Pre-Existing Diseases:</strong> 2-4 year waiting (diabetes, BP, etc.)</li>
          <li><strong>Cosmetic Surgery:</strong> Plastic surgery for beauty</li>
          <li><strong>Dental Treatment:</strong> Unless due to accident</li>
          <li><strong>Maternity:</strong> 2-4 year waiting period</li>
          <li><strong>Self-Inflicted Injury:</strong> Suicide attempts, drug abuse</li>
          <li><strong>War/Nuclear:</strong> War-related injuries</li>
          <li><strong>OPD:</strong> Outpatient (non-hospitalization) – unless separate OPD cover</li>
        </ul>

        <h4>Key Features to Check:</h4>
        
        <h5>1. Room Rent Limit</h5>
        <ul>
          <li><strong>Single AC Room:</strong> Best option</li>
          <li><strong>% of Sum Insured:</strong> 1-2% per day</li>
          <li><strong>No Capping:</strong> Ideal – choose this if available</li>
          <li><strong>Impact:</strong> If you take higher room, proportionate deduction from all bills!</li>
        </ul>

        <h5>2. Network Hospitals</h5>
        <ul>
          <li>Check if good hospitals near you are in network</li>
          <li>Cashless facility available (no payment needed)</li>
          <li>More networks = better</li>
        </ul>

        <h5>3. Claim Settlement Ratio</h5>
        <ul>
          <li>Should be 90%+ (% of claims settled)</li>
          <li>Higher = more reliable</li>
          <li>Check on IRDAI website</li>
        </ul>

        <h5>4. No Claim Bonus (NCB)</h5>
        <ul>
          <li>Sum insured increases every claim-free year</li>
          <li>Typically 5-50% increase (cumulative bonus)</li>
          <li>Reward for staying healthy</li>
        </ul>

        <h5>5. Co-Payment</h5>
        <ul>
          <li>% of bill you pay (rest by insurer)</li>
          <li><strong>0% co-pay:</strong> Best – insurer pays full bill</li>
          <li><strong>10-20% co-pay:</strong> You pay this %, lowers premium but bad for large bills</li>
        </ul>

        <h5>6. Restoration Benefit</h5>
        <ul>
          <li>Sum insured restored if exhausted in same year</li>
          <li>Useful for multiple hospitalizations</li>
          <li>Premium slightly higher</li>
        </ul>

        <h4>How to Choose the Right Policy:</h4>
        
        <h5>Step 1: Assess Your Needs</h5>
        <ul>
          <li>Age, family size, existing health issues</li>
          <li>Parents to be covered?</li>
          <li>City (metro vs non-metro)</li>
        </ul>

        <h5>Step 2: Compare Plans</h5>
        <ul>
          <li>Use PolicyBazaar, Coverfox</li>
          <li>Compare features, not just premium</li>
          <li>Check claim settlement ratio</li>
        </ul>

        <h5>Step 3: Check Network</h5>
        <ul>
          <li>Are good hospitals near you covered?</li>
          <li>Cashless facility available?</li>
        </ul>

        <h5>Step 4: Read Fine Print</h5>
        <ul>
          <li>Exclusions, waiting periods</li>
          <li>Room rent capping</li>
          <li>Co-payment clauses</li>
        </ul>

        <h5>Step 5: Buy from Reputed Company</h5>
        <ul>
          <li>Star Health, Care Health, HDFC Ergo, ICICI Lombard</li>
          <li>Check reviews, claim experience</li>
        </ul>

        <h4>Top Health Insurance Companies:</h4>
        <ul>
          <li><strong>Star Health:</strong> Specialized in health, good network</li>
          <li><strong>Care Health (Religare):</strong> Wide network, quick claims</li>
          <li><strong>HDFC Ergo:</strong> Comprehensive covers, reliable</li>
          <li><strong>ICICI Lombard:</strong> Good service, fast claims</li>
          <li><strong>Niva Bupa:</strong> International coverage, premium plans</li>
          <li><strong>Bajaj Allianz:</strong> Affordable, decent coverage</li>
        </ul>

        <h4>Tax Benefits:</h4>
        <ul>
          <li><strong>Section 80D:</strong> Premium paid is tax deductible</li>
          <li><strong>Self & Family:</strong> Up to ₹25,000 deduction</li>
          <li><strong>Parents (below 60):</strong> Additional ₹25,000</li>
          <li><strong>Parents (above 60):</strong> Additional ₹50,000</li>
          <li><strong>Maximum Deduction:</strong> ₹1 lakh (₹25K self + ₹50K senior parents)</li>
        </ul>

        <h4>Common Mistakes to Avoid:</h4>
        <ul>
          <li>❌ Relying only on company group insurance (leaves when you leave job)</li>
          <li>❌ Under-insurance (₹3-5L not enough in metros)</li>
          <li>❌ Not covering parents (their need is highest)</li>
          <li>❌ Hiding medical history (claims will be rejected!)</li>
          <li>❌ Choosing only low premium (check features too)</li>
          <li>❌ Not reading policy document</li>
          <li>❌ Delaying purchase (waiting period starts late + premium increases with age)</li>
        </ul>

        <h4>Pro Tips:</h4>
        <ul>
          <li>✅ Buy health insurance EARLY (lower premium, no pre-existing issues)</li>
          <li>✅ Port to better policy after 5 years (preserve No Claim Bonus)</li>
          <li>✅ Add top-up for higher coverage at low cost</li>
          <li>✅ Get separate policy for parents (senior citizen specific)</li>
          <li>✅ Declare all diseases honestly</li>
          <li>✅ Renew on time (grace period only 30 days)</li>
          <li>✅ Keep all medical records, prescriptions safe</li>
        </ul>
      `,
      keyPoints: [
        'Health insurance is MUST – medical costs can be ₹5-20 lakhs for serious illness',
        'Recommended cover: ₹10-15L for singles, ₹15-25L for families (higher for metros)',
        'Family floater is best: covers all members under one policy at lower premium',
        'Buy early for low premium, check claim settlement ratio (90%+), and network hospitals'
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'What is the recommended minimum health insurance cover for a family of 4 in a metro city?',
          options: ['₹5 lakhs', '₹10 lakhs', '₹15-20 lakhs', '₹50 lakhs'],
          correct: 2,
          explanation: 'For a family of 4 in metro cities, minimum ₹15-20 lakhs is recommended. Medical costs are high (heart surgery ₹5L+, cancer ₹15L+). Metro treatments cost 30-50% more than smaller cities.'
        },
        {
          type: 'scenario',
          question: 'Amit has ₹5L company group health insurance. He\'s 30, married with 1 kid. Does he need to buy personal health insurance?',
          context: 'Company insurance seems adequate for now.',
          options: [
            'No – company insurance is enough',
            'Yes – buy personal ₹10-15L policy immediately',
            'Wait till he changes job',
            'Only if he has existing health issues'
          ],
          correct: 1,
          explanation: 'YES, buy personal insurance immediately! Problems with ONLY company insurance: (1) Coverage stops when you leave/change job, (2) ₹5L is insufficient (medical emergencies cost more), (3) Cannot port, (4) Pre-existing waiting period starts afresh. Buy ₹10-15L personal family floater NOW.'
        },
        {
          type: 'truefalse',
          question: 'If your hospital room rent exceeds the policy limit, only the room rent is deducted – other expenses are fully covered.',
          options: ['True', 'False'],
          correct: 1,
          explanation: 'False! This is a CRITICAL mistake people make. If you exceed room rent limit, ALL expenses (surgery, medicines, tests) are proportionately reduced! Example: Policy allows ₹5K room, you take ₹10K room (2× limit) → ALL bills reduced by 50%! Choose "No Room Rent Capping" policies.'
        },
        {
          type: 'calculation',
          question: 'Priya (35) pays ₹15,000 health insurance premium for family and ₹30,000 for parents (65 years). How much tax deduction under Section 80D?',
          options: ['₹15,000', '₹25,000', '₹45,000', '₹75,000'],
          correct: 3,
          explanation: 'Total deduction = ₹15,000 (self & family, max ₹25K) + ₹30,000 (senior parents, max ₹50K) = ₹45,000. Wait – self & family qualifies for full ₹25K since she paid ₹15K < ₹25K limit. Parents qualify for ₹30K < ₹50K limit. Correct answer: ₹15K + ₹30K = ₹45K!'
        },
        {
          type: 'mcq',
          question: 'What is a "Family Floater" health insurance policy?',
          options: [
            'Separate policy for each family member',
            'One policy covering all family members with shared sum insured',
            'Policy that floats premium based on claims',
            'Policy only for floating (water-related) accidents'
          ],
          correct: 1,
          explanation: 'Family Floater covers all members (self, spouse, kids) under ONE policy with SHARED sum insured. Cheaper than individual policies. Anyone can use full amount. Best for families where all are healthy.'
        },
        {
          type: 'scenario',
          question: 'Rahul needs surgery costing ₹8 lakhs. His health insurance is ₹5 lakhs with ₹50 lakh top-up (₹3L deductible). How much will insurance pay?',
          context: 'He has two policies: Base ₹5L + Top-up ₹50L with ₹3L deductible.',
          options: [
            'Only ₹5 lakhs (base policy)',
            '₹8 lakhs (full coverage)',
            '₹5L (base) + ₹3L (top-up) = ₹8L total',
            'Only ₹5.5 lakhs'
          ],
          correct: 2,
          explanation: 'Base policy pays ₹5L. Remaining ₹3L exceeds deductible (₹3L) so top-up also pays ₹3L. Total: ₹5L + ₹3L = ₹8L FULL coverage! Top-up with deductible is smart way to get high cover at low cost.'
        }
      ]
    },
    
    {
      id: 2,
      title: 'Term vs Whole Life Insurance',
      subtitle: 'Understanding the Fundamental Difference',
      duration: '7 mins',
      content: `
        <h3>The Two Main Types</h3>
        <p>When buying life insurance, you'll encounter two primary categories:</p>
        
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Term Insurance</th>
                <th>Whole Life Insurance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Coverage Period</strong></td>
                <td>Fixed term (10-40 years)</td>
                <td>Entire lifetime</td>
              </tr>
              <tr>
                <td><strong>Premium</strong></td>
                <td>Very Low (₹12-15K for ₹1cr)</td>
                <td>Very High (₹80-100K for ₹1cr)</td>
              </tr>
              <tr>
                <td><strong>Returns</strong></td>
                <td>No returns (pure protection)</td>
                <td>Maturity benefit + insurance</td>
              </tr>
              <tr>
                <td><strong>Investment Component</strong></td>
                <td>None - 100% goes to insurance</td>
                <td>Partly insurance, partly investment</td>
              </tr>
              <tr>
                <td><strong>Best For</strong></td>
                <td>Pure financial protection</td>
                <td>Rarely suitable for anyone</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h3>Why Term Insurance is Superior</h3>
        <p>The "Buy Term and Invest the Rest" (BTIR) philosophy is widely accepted by financial experts:</p>
        
        <div class="example-box">
          <h4>Example: 30-Year-Old Comparing Options</h4>
          <p><strong>Scenario:</strong> Need ₹1 crore coverage for 30 years</p>
          
          <p><strong>Option 1: Term Insurance</strong></p>
          <ul>
            <li>Annual Premium: ₹12,000</li>
            <li>Total Paid in 30 years: ₹3.6 lakhs</li>
            <li>Death Benefit: ₹1 crore</li>
            <li>Maturity Benefit: ₹0 (if you survive)</li>
          </ul>
          
          <p><strong>Option 2: Whole Life/Endowment Plan</strong></p>
          <ul>
            <li>Annual Premium: ₹85,000</li>
            <li>Total Paid in 30 years: ₹25.5 lakhs</li>
            <li>Death Benefit: ₹1 crore</li>
            <li>Maturity Benefit: ₹35-40 lakhs (if you survive)</li>
          </ul>
          
          <p><strong>Option 3: Term + Separate Investment</strong></p>
          <ul>
            <li>Term Premium: ₹12,000/year</li>
            <li>Invest Difference: ₹73,000/year in mutual funds</li>
            <li>Death Benefit: ₹1 crore (from term)</li>
            <li>Investment Value after 30 years: ₹1.2-1.5 crores @ 12% returns</li>
          </ul>
          
          <p><strong>Winner:</strong> Option 3 gives you SAME protection + 3-4X better returns!</p>
        </div>
        
        <h3>Problems with Whole Life Insurance</h3>
        <ul>
          <li><strong>Low Returns:</strong> Typically 5-6% vs 12% from mutual funds</li>
          <li><strong>High Costs:</strong> Agent commissions eat into your investment</li>
          <li><strong>Lack of Flexibility:</strong> Can\'t increase/decrease coverage easily</li>
          <li><strong>Opportunity Cost:</strong> Money locked for 20-30 years</li>
          <li><strong>Complexity:</strong> Difficult to understand actual returns</li>
        </ul>
        
        <h3>When Whole Life Might Make Sense</h3>
        <p>In RARE cases, whole life insurance could be considered:</p>
        <ul>
          <li>You have a disabled child needing lifetime support</li>
          <li>You have significant estate tax concerns (₹10+ crore wealth)</li>
          <li>You completely lack financial discipline to invest separately</li>
          <li>You\'ve maxed out all other tax-saving options</li>
        </ul>
        <p><strong>Note:</strong> Even in these cases, term insurance + separate investment is usually better!</p>
        
        <div class="tip-box">
          <h4>💡 Expert Recommendation</h4>
          <p>For 99% of people, term insurance is the ONLY life insurance you need. Don\'t mix insurance and investment - keep them separate for better returns and flexibility.</p>
        </div>
      `,
      keyPoints: [
        'Term insurance provides pure protection at low cost',
        'Whole life insurance combines insurance with poor investment returns',
        'Buy Term and Invest the Rest (BTIR) is the superior strategy',
        'Term insurance is 7-8 times cheaper for the same coverage',
        'Separate investments give 2-3X better returns than whole life plans',
        'Only consider whole life in rare cases like disabled dependents'
      ],
      quiz: [
        {
          question: 'What is the main advantage of term insurance over whole life insurance?',
          options: [
            'It provides maturity benefits',
            'Much lower premium for same coverage',
            'It covers you for lifetime',
            'It has investment returns'
          ],
          correct: 1,
          explanation: 'Term insurance\'s biggest advantage is cost - it\'s 7-8 times cheaper than whole life for the same coverage amount. A ₹1 crore term policy costs ₹12-15K/year vs ₹80-100K for whole life. This lets you buy adequate protection without breaking your budget.'
        },
        {
          question: 'Rahul, 35, needs ₹1 crore coverage. He pays ₹15K for term insurance. How much would equivalent whole life insurance approximately cost?',
          options: [
            '₹25,000 per year',
            '₹50,000 per year',
            '₹90,000 per year',
            '₹1,50,000 per year'
          ],
          correct: 2,
          explanation: 'Whole life insurance typically costs 6-8 times more than term insurance. At ₹15K for term, whole life would cost ₹90,000-₹1,20,000 per year. This massive difference is because whole life includes an investment component that delivers poor returns of 5-6%.'
        },
        {
          question: 'What does the "Buy Term and Invest the Rest" (BTIR) strategy mean?',
          options: [
            'Buy term insurance and invest the premium savings separately',
            'Buy both term and whole life insurance',
            'Buy term insurance and keep rest as emergency fund',
            'Buy term insurance only when you have surplus money'
          ],
          correct: 0,
          explanation: 'BTIR means buying cheap term insurance for protection, then investing the premium difference (what you\'d have paid for whole life) in better-returning investments like mutual funds. Example: Term costs ₹15K, whole life costs ₹90K → Invest the ₹75K difference in mutual funds earning 12% instead of 5%.'
        },
        {
          question: 'If you invest ₹75,000/year for 30 years at 12% annual return, approximately how much will you accumulate?',
          options: [
            '₹50 lakhs',
            '₹85 lakhs',
            '₹1.5 crores',
            '₹2.5 crores'
          ],
          correct: 2,
          explanation: 'At 12% returns, ₹75,000/year for 30 years compounds to approximately ₹1.5 crores. This is 3-4X MORE than the ₹35-40 lakhs maturity benefit you\'d get from whole life insurance. This demonstrates why separating insurance and investment is superior.'
        },
        {
          question: 'TRUE or FALSE: Whole life insurance is a good option because you get your money back at maturity.',
          options: [
            'TRUE - you get maturity benefit',
            'FALSE - the returns are too low'
          ],
          correct: 1,
          explanation: 'FALSE. While you do get maturity benefit, the returns are terrible (5-6%). Your money is locked for 30 years earning less than FD rates! The same money invested in mutual funds would grow 3-4 times larger. Don\'t fall for the "money back" marketing - look at actual returns.'
        },
        {
          question: 'Priya\'s agent says, "Term insurance is waste if you don\'t die." Is this correct advice?',
          options: [
            'Yes, term insurance has no returns',
            'No, insurance is for protection, not returns',
            'Yes, whole life is better because of maturity benefit',
            'Partially correct, should buy some whole life too'
          ],
          correct: 1,
          explanation: 'NO, this is WRONG advice! Insurance is meant to protect your family if you die, not to give you returns. That\'s like saying car insurance is "waste" if you don\'t have an accident. Buy term for protection, invest separately for returns. The agent pushes whole life because he gets 10-15X higher commission!'
        }
      ]
    },
    
    {
      id: 3,
      title: 'Premium Calculation Factors',
      subtitle: 'What Determines Your Insurance Cost',
      duration: '6 mins',
      content: `
        <h3>Factors Affecting Your Premium</h3>
        <p>Insurance companies calculate premiums based on risk assessment. Higher risk = higher premium. Here are the key factors:</p>
        
        <div class="factors-list">
          <h4>1. Age</h4>
          <p><strong>Impact:</strong> VERY HIGH (Most important factor)</p>
          <p>Younger age = lower premium. Every year of delay increases premium by 8-12%.</p>
          
          <div class="example-box">
            <p><strong>Example: ₹1 Crore Coverage for 30 Years</strong></p>
            <ul>
              <li>Age 25: ₹10,000/year</li>
              <li>Age 30: ₹12,500/year</li>
              <li>Age 35: ₹16,000/year</li>
              <li>Age 40: ₹22,000/year</li>
              <li>Age 45: ₹35,000/year</li>
            </ul>
            <p><strong>Lesson:</strong> Buy insurance as early as possible!</p>
          </div>
          
          <h4>2. Coverage Amount (Sum Assured)</h4>
          <p><strong>Impact:</strong> HIGH (Direct proportional)</p>
          <p>Higher coverage = higher premium, but NOT proportionally expensive.</p>
          
          <table>
            <thead>
              <tr>
                <th>Coverage</th>
                <th>Annual Premium (Age 30)</th>
                <th>Per Lakh Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>₹50 lakhs</td>
                <td>₹7,000</td>
                <td>₹140</td>
              </tr>
              <tr>
                <td>₹1 crore</td>
                <td>₹12,000</td>
                <td>₹120</td>
              </tr>
              <tr>
                <td>₹2 crores</td>
                <td>₹22,000</td>
                <td>₹110</td>
              </tr>
            </tbody>
          </table>
          <p><strong>Note:</strong> Per lakh cost DECREASES with higher coverage!</p>
          
          <h4>3. Policy Term (Duration)</h4>
          <p><strong>Impact:</strong> MEDIUM</p>
          <p>Longer term = slightly higher premium, but better value.</p>
          <ul>
            <li>20 years: ₹10,000/year</li>
            <li>30 years: ₹12,000/year (only 20% more for 50% longer coverage!)</li>
            <li>40 years: ₹14,500/year</li>
          </ul>
          
          <h4>4. Health Status</h4>
          <p><strong>Impact:</strong> VERY HIGH</p>
          <ul>
            <li>Normal health: Standard premium</li>
            <li>Smoker: 40-80% higher premium</li>
            <li>Diabetes: 25-50% higher (controlled) or rejection</li>
            <li>High BP: 15-30% higher</li>
            <li>Obesity (BMI > 30): 20-40% higher</li>
            <li>Heart conditions: Often rejected or 100%+ loading</li>
          </ul>
          
          <h4>5. Gender</h4>
          <p><strong>Impact:</strong> LOW (5-10%)</p>
          <p>Women typically pay 5-10% LESS than men due to higher life expectancy.</p>
          
          <h4>6. Occupation & Lifestyle</h4>
          <p><strong>Impact:</strong> LOW to MEDIUM</p>
          <ul>
            <li>Desk job: Standard premium</li>
            <li>High-risk jobs (mining, construction at heights): 20-50% higher</li>
            <li>Adventure sports: 10-30% higher</li>
            <li>Frequent travel to conflict zones: Case-by-case</li>
          </ul>
        </div>
        
        <h3>How to Get the Lowest Premium</h3>
        <div class="tips-box">
          <ol>
            <li><strong>Buy Young:</strong> Don\'t wait! Every year of delay costs you lakhs over the policy term.</li>
            <li><strong>Quit Smoking:</strong> Can save 40-80% on premium. Some insurers reduce rates after 5 years of quitting.</li>
            <li><strong>Maintain Healthy Weight:</strong> BMI between 18.5-25 gets best rates.</li>
            <li><strong>Manage Health Conditions:</strong> Control diabetes/BP before applying for better rates.</li>
            <li><strong>Buy Online:</strong> 15-20% cheaper than offline due to no agent commission.</li>
            <li><strong>Opt for Longer Term:</strong> 30-40 year term gives best value per year.</li>
            <li><strong>Higher Coverage is Cost-Effective:</strong> Per lakh cost decreases with higher sum assured.</li>
            <li><strong>Choose Return of Premium (ROP) Wisely:</strong> Usually NOT worth it - costs 2X more for minimal benefit.</li>
          </ol>
        </div>
        
        <div class="warning-box">
          <h4>⚠️ Common Mistake: Under-insurance to Save Premium</h4>
          <p>Buying ₹50L instead of ₹1cr to save ₹5000/year is FALSE economy. Your family will be under-protected. Term insurance is CHEAP - don\'t compromise coverage to save peanuts!</p>
        </div>
      `,
      keyPoints: [
        'Age is the most important premium factor - buy as young as possible',
        'Smokers pay 40-80% higher premiums than non-smokers',
        'Higher coverage is cost-effective - per lakh cost decreases',
        'Longer policy terms (30-40 years) offer better value',
        'Online purchase is 15-20% cheaper than through agents',
        'Health conditions like diabetes/obesity increase premiums by 25-50%'
      ],
      quiz: [
        {
          question: 'Which factor has the HIGHEST impact on life insurance premium?',
          options: [
            'Gender',
            'Age',
            'Occupation',
            'City of residence'
          ],
          correct: 1,
          explanation: 'Age is the single most important factor affecting premium. A 25-year-old pays ₹10K/year for ₹1cr, while a 40-year-old pays ₹22K - more than DOUBLE! Every year of delay increases premium by 8-12%. This is why buying insurance young is crucial.'
        },
        {
          question: 'Amit (30 years) is deciding between ₹50L and ₹1cr coverage. ₹50L costs ₹7000/year. Approximately how much will ₹1cr cost?',
          options: [
            '₹14,000 (exactly double)',
            '₹12,000 (less than double)',
            '₹16,000 (more than double)',
            '₹20,000 (much more than double)'
          ],
          correct: 1,
          explanation: 'Higher coverage is MORE cost-effective! While ₹50L costs ₹7000, ₹1cr costs around ₹12,000 - that\'s 71% increase in cost for 100% increase in coverage. Per lakh cost drops from ₹140 to ₹120. Insurance companies offer economies of scale, so ALWAYS buy adequate coverage!'
        },
        {
          question: 'How much more do smokers typically pay for life insurance compared to non-smokers?',
          options: [
            '5-10% higher',
            '15-25% higher',
            '40-80% higher',
            '100-150% higher'
          ],
          correct: 2,
          explanation: 'Smokers pay 40-80% HIGHER premiums! If a non-smoker pays ₹12K/year, a smoker pays ₹17-22K for same coverage. Over 30 years, that\'s ₹1.5-3 lakhs extra! Good news: some insurers reduce rates after 5 years of quitting. Massive financial incentive to quit!'
        },
        {
          question: 'Priya is 28 years old, healthy, non-smoker. She wants ₹1cr for 30 years. Approximately how much should she expect to pay annually?',
          options: [
            '₹5,000-7,000',
            '₹10,000-12,000',
            '₹18,000-22,000',
            '₹30,000-35,000'
          ],
          correct: 1,
          explanation: 'A healthy 28-year-old non-smoker should pay around ₹10,000-12,000/year for ₹1 crore coverage for 30 years. This is VERY affordable - less than ₹1000/month for ₹1cr protection! If quoted much higher, shop around or check if there\'s a health loading.'
        },
        {
          question: 'TRUE or FALSE: Buying insurance online is cheaper than through an agent.',
          options: [
            'TRUE - saves agent commission',
            'FALSE - agent gets better rates'
          ],
          correct: 0,
          explanation: 'TRUE! Online insurance is 15-20% cheaper because there\'s no agent commission (agents get 10-15% of first year premium + renewal commissions). A ₹12K online policy might cost ₹14-15K through agent. Use online platforms like PolicyBazaar to compare and buy - save thousands over the policy term!'
        },
        {
          question: 'Rahul wants to save on premium by buying ₹50L instead of ₹1cr coverage. Is this a wise decision?',
          options: [
            'Yes, he should minimize premium cost',
            'No, he should buy adequate coverage first',
            'Yes, he can increase coverage later if needed',
            'No difference, both options are equal'
          ],
          correct: 1,
          explanation: 'NO, this is WRONG thinking! Under-insurance is the biggest mistake. Term insurance is already CHEAP - ₹1cr costs only ₹12K/year (₹1000/month). Saving ₹5000/year by buying ₹50L instead is FALSE economy - your family will be severely under-protected. ALWAYS buy adequate coverage (15-20× income) even if premium is slightly higher.'
        }
      ]
    },
    
    {
      id: 4,
      title: 'Insurance Claim Process',
      subtitle: 'How to Ensure Smooth Claim Settlement',
      duration: '7 mins',
      content: `
        <h3>Life Insurance Claim Process</h3>
        <p>When the insured person passes away, the nominee needs to follow this process to claim the insurance amount:</p>
        
        <div class="process-steps">
          <h4>Step 1: Inform the Insurance Company (Within 3 days recommended)</h4>
          <ul>
            <li>Call the insurer\'s customer service helpline</li>
            <li>Provide policy number and basic details</li>
            <li>Register a claim formally</li>
            <li>Get claim reference number for tracking</li>
          </ul>
          
          <h4>Step 2: Collect Required Documents</h4>
          <p><strong>Essential Documents:</strong></p>
          <ul>
            <li>✅ Original policy document</li>
            <li>✅ Death certificate (from municipal authority)</li>
            <li>✅ Claim form (download from insurer\'s website)</li>
            <li>✅ Identity proof of nominee (Aadhaar/PAN/Passport)</li>
            <li>✅ Cancelled cheque or bank passbook (for payment)</li>
          </ul>
          
          <p><strong>Additional Documents (depending on situation):</strong></p>
          <ul>
            <li>Medical records and hospital papers (if death due to illness)</li>
            <li>Post-mortem report (if death due to accident)</li>
            <li>FIR and police report (if unnatural death)</li>
            <li>Employer\'s certificate (if death during work)</li>
            <li>Last rites certificate</li>
          </ul>
          
          <h4>Step 3: Submit Documents</h4>
          <ul>
            <li>Submit to nearest branch or online portal</li>
            <li>Keep copies of all documents for your records</li>
            <li>Get acknowledgement receipt with submission date</li>
            <li>Note down name and contact of person receiving documents</li>
          </ul>
          
          <h4>Step 4: Claim Investigation</h4>
          <p>Insurance company will investigate, especially if:</p>
          <ul>
            <li>Death within first 3 years of policy (contestability period)</li>
            <li>High sum assured (₹1cr+)</li>
            <li>Unnatural death (accident, suicide)</li>
            <li>Death due to pre-existing conditions not disclosed</li>
          </ul>
          <p><strong>Investigation duration:</strong> 15-90 days depending on complexity</p>
          
          <h4>Step 5: Claim Settlement</h4>
          <p>If approved, amount is credited to nominee\'s bank account within:</p>
          <ul>
            <li>Simple cases: 7-15 days</li>
            <li>With investigation: 30-90 days</li>
            <li>Disputed cases: May take 6-12 months</li>
          </ul>
        </div>
        
        <h3>Health Insurance Claim Process</h3>
        <p>Two types of claims in health insurance:</p>
        
        <div class="claim-types">
          <h4>1. Cashless Claims (Preferred)</h4>
          <p><strong>Used when:</strong> Hospitalized in network hospital</p>
          <ol>
            <li>Inform TPA (Third Party Administrator) within 24 hours of admission</li>
            <li>Hospital submits pre-authorization request to TPA</li>
            <li>TPA approves based on policy coverage</li>
            <li>Hospital directly bills insurance company</li>
            <li>You only pay non-covered expenses (co-pay, room rent excess, etc.)</li>
          </ol>
          <p><strong>Advantage:</strong> No cash outflow for covered expenses!</p>
          
          <h4>2. Reimbursement Claims</h4>
          <p><strong>Used when:</strong> Non-network hospital or emergency</p>
          <ol>
            <li>Pay hospital bills from your pocket</li>
            <li>Collect all original bills, prescriptions, discharge summary</li>
            <li>Submit claim form with documents within 15-30 days</li>
            <li>Insurance company processes and reimburses</li>
            <li>Amount credited to your account in 15-30 days</li>
          </ol>
        </div>
        
        <h3>Why Claims Get Rejected</h3>
        <div class="rejection-reasons">
          <table>
            <thead>
              <tr>
                <th>Reason</th>
                <th>How to Avoid</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Non-disclosure of pre-existing conditions</strong></td>
                <td>Declare ALL health conditions honestly when buying</td>
              </tr>
              <tr>
                <td><strong>Claim during waiting period</strong></td>
                <td>Wait for initial 30-90 days, 2-4 years for specific illnesses</td>
              </tr>
              <tr>
                <td><strong>Incomplete documentation</strong></td>
                <td>Submit all required documents, keep copies</td>
              </tr>
              <tr>
                <td><strong>Non-payment of premium</strong></td>
                <td>Pay premiums on time, set up auto-debit</td>
              </tr>
              <tr>
                <td><strong>Treatment not covered</strong></td>
                <td>Check policy coverage before hospitalization</td>
              </tr>
              <tr>
                <td><strong>Late submission</strong></td>
                <td>File claim within stipulated time (usually 30 days)</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h3>Tips for Smooth Claim Settlement</h3>
        <div class="tips-box">
          <ol>
            <li><strong>Full Disclosure:</strong> Declare ALL health conditions when buying - non-disclosure is #1 rejection reason</li>
            <li><strong>Keep Policy Active:</strong> Pay premiums on time, set up auto-debit</li>
            <li><strong>Inform Nominee:</strong> Tell your family about policy details, keep documents accessible</li>
            <li><strong>Choose High CSR Insurer:</strong> Pick insurer with 95%+ claim settlement ratio</li>
            <li><strong>Understand Coverage:</strong> Read policy document, know what\'s included/excluded</li>
            <li><strong>Keep Documents Ready:</strong> Store policy papers, ID proofs in safe, known location</li>
            <li><strong>Use Network Hospitals:</strong> For health insurance, cashless claims are hassle-free</li>
            <li><strong>Submit Promptly:</strong> Don\'t delay claim filing - do it within 7-15 days</li>
          </ol>
        </div>
        
        <div class="example-box">
          <h4>Real Example: Claim Success Story</h4>
          <p><strong>Case:</strong> Rajesh (42) passed away due to heart attack. His term insurance was ₹1 crore.</p>
          <p><strong>What nominee did right:</strong></p>
          <ul>
            <li>✅ Informed insurer within 2 days of death</li>
            <li>✅ Had all documents ready (policy, death certificate, ID proofs)</li>
            <li>✅ Submitted within 1 week with complete paperwork</li>
            <li>✅ Policy had been active for 8 years with all premiums paid</li>
            <li>✅ All health conditions were properly disclosed when buying</li>
          </ul>
          <p><strong>Result:</strong> Claim approved in 15 days, ₹1 crore credited to nominee account!</p>
        </div>
      `,
      keyPoints: [
        'Inform insurance company within 3 days of death for life insurance claims',
        'Keep essential documents ready: policy, death certificate, ID proof, bank details',
        'Claims during first 3 years undergo detailed investigation (contestability period)',
        'Non-disclosure of pre-existing conditions is the #1 reason for claim rejection',
        'Choose insurers with 95%+ claim settlement ratio (CSR) for better claim experience',
        'For health insurance, cashless claims in network hospitals are hassle-free'
      ],
      quiz: [
        {
          question: 'What is the FIRST step a nominee should take after the insured person passes away?',
          options: [
            'Collect death certificate',
            'Inform insurance company immediately',
            'Hire a lawyer',
            'Submit all documents to police'
          ],
          correct: 1,
          explanation: 'The FIRST step is to inform the insurance company as soon as possible (within 3 days recommended). Call their helpline, provide policy number, and register a claim formally. You\'ll get a claim reference number for tracking. Meanwhile, start collecting required documents like death certificate, policy papers, etc.'
        },
        {
          question: 'Which documents are ESSENTIAL for a life insurance claim? (Multiple applicable)',
          options: [
            'Original policy + death certificate + ID proof',
            'Only death certificate is enough',
            'Post-mortem report is mandatory for all deaths',
            'Hospital records are sufficient'
          ],
          correct: 0,
          explanation: 'Essential documents are: (1) Original policy document, (2) Death certificate from municipal authority, (3) Duly filled claim form, (4) ID proof of nominee (Aadhaar/PAN), (5) Cancelled cheque for payment. Additional documents like post-mortem report are needed only for accidental or unnatural deaths.'
        },
        {
          question: 'What is the "contestability period" in life insurance?',
          options: [
            'Period when premiums can be contested',
            'First 3 years when claims are investigated more thoroughly',
            'Last 3 years before policy expiry',
            'Period when policy can be cancelled'
          ],
          correct: 1,
          explanation: 'Contestability period is the first 3 years of the policy during which insurance companies investigate claims more thoroughly to check for fraud or non-disclosure of health conditions. If death occurs in this period, expect detailed scrutiny. After 3 years, claims are processed faster with minimal investigation (unless unnatural death).'
        },
        {
          question: 'Meera submitted a life insurance claim but it was rejected. What is the MOST COMMON reason for rejection?',
          options: [
            'Policy was too old',
            'Non-disclosure of pre-existing health conditions',
            'Death occurred outside India',
            'Claim amount was too high'
          ],
          correct: 1,
          explanation: 'Non-disclosure of pre-existing health conditions is the #1 reason for claim rejection! If you had diabetes but didn\'t declare it when buying insurance, and later died due to diabetes complications, claim will be rejected. ALWAYS disclose ALL health conditions honestly. Suppressing information is fraud and nullifies your policy.'
        },
        {
          question: 'What is "cashless claim" in health insurance?',
          options: [
            'Insurance company pays you in cash',
            'Hospital directly bills insurance, you pay nothing for covered expenses',
            'You pay in cash and get instant reimbursement',
            'No documentation needed for small claims'
          ],
          correct: 1,
          explanation: 'In cashless claims (available in network hospitals), the hospital directly bills your insurance company. You only pay for non-covered expenses like co-pay or room rent excess. No cash outflow for covered hospitalization! This is MUCH better than reimbursement where you pay first and claim later. Always prefer network hospitals for cashless convenience.'
        },
        {
          question: 'Amit\'s health insurance claim was rejected because he filed it 45 days after discharge. The policy required filing within 30 days. What should he do?',
          options: [
            'Accept rejection, nothing can be done',
            'Appeal with detailed explanation for delay',
            'Buy new policy and re-file',
            'Complain on social media'
          ],
          correct: 1,
          explanation: 'He should APPEAL with a detailed explanation for the delay. Write to insurer\'s grievance cell explaining genuine reasons (illness, lack of awareness, etc.). If rejected again, escalate to Insurance Ombudsman (free grievance redressal). Many late submission rejections are overturned on appeal if delay reason is valid. Don\'t give up - use the escalation mechanism!'
        }
      ]
    },
    
    {
      id: 5,
      title: 'Insurance Riders & Add-ons',
      subtitle: 'Enhancing Your Coverage',
      duration: '6 mins',
      content: `
        <h3>What are Insurance Riders?</h3>
        <p>Riders are additional benefits you can attach to your base life insurance policy for extra protection. They cost extra but provide valuable coverage for specific scenarios.</p>
        
        <div class="important-note">
          <p><strong>Key Principle:</strong> Riders should enhance your protection, NOT be used as investment tools. Only add riders that provide genuine value for your situation.</p>
        </div>
        
        <h3>Essential Riders (Recommended)</h3>
        
        <div class="rider-details">
          <h4>1. Critical Illness Rider ✅ HIGHLY RECOMMENDED</h4>
          <p><strong>What it covers:</strong> Pays a lump sum if you\'re diagnosed with critical illnesses like:</p>
          <ul>
            <li>Cancer (all stages)</li>
            <li>Heart attack / Bypass surgery</li>
            <li>Stroke / Paralysis</li>
            <li>Kidney failure</li>
            <li>Major organ transplant</li>
            <li>Typically covers 30-40 critical illnesses</li>
          </ul>
          
          <p><strong>Why you need it:</strong></p>
          <ul>
            <li>Critical illness treatment costs ₹5-25 lakhs</li>
            <li>You may survive but need income replacement during treatment</li>
            <li>Covers treatment costs + loss of income for 6-12 months</li>
          </ul>
          
          <p><strong>Cost & Coverage:</strong></p>
          <ul>
            <li>Coverage: ₹20-50 lakhs recommended</li>
            <li>Cost: ₹2000-5000/year for ₹25L coverage (age 30)</li>
            <li>Payout: Lump sum on diagnosis (even if you survive)</li>
          </ul>
          
          <p><strong>Example:</strong> Priya has ₹1cr term + ₹25L critical illness rider. She\'s diagnosed with cancer at 40. She receives ₹25L immediately for treatment. If she passes away, nominee gets ₹1cr. If she survives, she already got ₹25L for expenses!</p>
          
          <h4>2. Accidental Death Benefit Rider ✅ RECOMMENDED</h4>
          <p><strong>What it covers:</strong> Additional payout if death is due to accident</p>
          
          <ul>
            <li>Base term pays ₹1cr for any death</li>
            <li>This rider pays EXTRA if death is accidental</li>
            <li>Total payout in accident = Base + Rider amount</li>
          </ul>
          
          <p><strong>Cost & Coverage:</strong></p>
          <ul>
            <li>Coverage: Equal to base sum assured (₹1cr if base is ₹1cr)</li>
            <li>Cost: Very cheap - ₹500-1500/year for ₹1cr coverage</li>
            <li>Example: ₹1cr base + ₹1cr accidental rider = ₹2cr total if accidental death</li>
          </ul>
          
          <p><strong>Who should buy:</strong></p>
          <ul>
            <li>People with high commute time (2+ hours/day)</li>
            <li>Two-wheeler riders</li>
            <li>Jobs involving travel</li>
            <li>Very affordable - consider adding even if low risk</li>
          </ul>
          
          <h4>3. Waiver of Premium Rider ✅ USEFUL</h4>
          <p><strong>What it covers:</strong> Insurer pays your future premiums if you become disabled/critically ill</p>
          
          <ul>
            <li>If you get total permanent disability or critical illness</li>
            <li>Insurance company pays all future premiums</li>
            <li>Your policy remains active without you paying anything</li>
            <li>Coverage continues for your family</li>
          </ul>
          
          <p><strong>Cost:</strong> ₹1000-3000/year additional</p>
          
          <p><strong>Example:</strong> Amit has ₹1cr term with waiver of premium rider. At 35, he meets with accident and becomes permanently disabled. Insurance company pays all his future premiums (₹15K/year) till age 60. His family remains protected with ₹1cr coverage without paying a rupee!</p>
        </div>
        
        <h3>Riders to AVOID ❌</h3>
        
        <div class="avoid-riders">
          <h4>1. Return of Premium (ROP) Rider ❌ NOT RECOMMENDED</h4>
          <p><strong>What it promises:</strong> Return all premiums paid if you survive the policy term</p>
          
          <p><strong>Why to avoid:</strong></p>
          <ul>
            <li>Premium becomes 2X higher (₹12K becomes ₹24K)</li>
            <li>Returns are very low (3-4% per year)</li>
            <li>Better to invest that extra ₹12K in mutual funds (12% returns)</li>
            <li>Classic case of mixing insurance with investment (DON\'T DO IT!)</li>
          </ul>
          
          <div class="calculation-box">
            <p><strong>Math:</strong></p>
            <p>Without ROP: Pay ₹12K/year, invest ₹12K in mutual funds → ₹15L after 30 years</p>
            <p>With ROP: Pay ₹24K/year, get ₹7.2L back after 30 years</p>
            <p><strong>You LOSE ₹7.8 lakhs by choosing ROP!</strong></p>
          </div>
          
          <h4>2. Income Benefit / Monthly Income Rider ❌ EXPENSIVE</h4>
          <p><strong>What it promises:</strong> Monthly income to family instead of lump sum</p>
          <p><strong>Why to avoid:</strong> Very expensive, and family can create their own monthly income from lump sum using FD/MF!</p>
          
          <h4>3. Hospital Cash Rider ❌ OVERLAPS WITH HEALTH INSURANCE</h4>
          <p><strong>What it promises:</strong> Daily cash for hospitalization</p>
          <p><strong>Why to avoid:</strong> Your health insurance already covers this. Don\'t pay twice for same coverage!</p>
        </div>
        
        <h3>Smart Rider Strategy</h3>
        <div class="strategy-box">
          <p><strong>Recommended Combination for Most People:</strong></p>
          <ul>
            <li>✅ Base term insurance: ₹1 crore</li>
            <li>✅ Critical illness rider: ₹25-50 lakhs</li>
            <li>✅ Accidental death rider: ₹1 crore</li>
            <li>✅ Waiver of premium rider (optional but useful)</li>
          </ul>
          
          <p><strong>Total Cost (Age 30):</strong></p>
          <ul>
            <li>Base term: ₹12,000/year</li>
            <li>Critical illness: ₹3,500/year</li>
            <li>Accidental death: ₹1,000/year</li>
            <li>Waiver of premium: ₹2,000/year</li>
            <li><strong>Total: ₹18,500/year for comprehensive protection</strong></li>
          </ul>
          
          <p><strong>What you get:</strong></p>
          <ul>
            <li>₹1cr for any death</li>
            <li>₹2cr if accidental death</li>
            <li>₹25-50L if critical illness (even if you survive)</li>
            <li>Free premiums if disabled</li>
          </ul>
        </div>
        
        <div class="warning-box">
          <h4>⚠️ Important Notes</h4>
          <ul>
            <li>Riders cost 15-30% of base premium - keep total affordable</li>
            <li>Don\'t over-insure with unnecessary riders</li>
            <li>Read rider terms carefully - exclusions and waiting periods apply</li>
            <li>Some riders have separate medical underwriting</li>
            <li>You can add riders later, but medical tests may be required</li>
          </ul>
        </div>
      `,
      keyPoints: [
        'Critical illness rider provides lump sum on diagnosis of serious illnesses - HIGHLY recommended',
        'Accidental death benefit rider doubles payout for accidental death - very affordable',
        'Waiver of premium rider pays future premiums if you become disabled',
        'Return of Premium (ROP) rider is expensive and provides poor returns - AVOID',
        'Don\'t mix insurance with investment - riders should only enhance protection',
        'Smart combination: Base term + Critical illness + Accidental death = comprehensive coverage'
      ],
      quiz: [
        {
          question: 'What is a "rider" in insurance?',
          options: [
            'A person who sells insurance',
            'Additional benefit attached to base policy for extra cost',
            'Free add-on that comes with every policy',
            'Another name for insurance premium'
          ],
          correct: 1,
          explanation: 'A rider is an additional benefit you can attach to your base insurance policy for extra premium. It provides specific coverage beyond the base policy. Example: If base policy pays ₹1cr on death, a critical illness rider pays extra ₹25L if you\'re diagnosed with cancer (even if you survive). Riders enhance protection.'
        },
        {
          question: 'Rajesh has term insurance with critical illness rider. He is diagnosed with cancer and survives after treatment. What happens?',
          options: [
            'He gets nothing as he didn\'t die',
            'He gets the critical illness amount (₹25L) immediately',
            'He gets 50% of critical illness amount',
            'Claim is rejected as policy is only for death'
          ],
          correct: 1,
          explanation: 'He gets the FULL critical illness rider amount (₹25L) immediately upon diagnosis, even though he survived! That\'s the power of CI rider - it pays when you\'re ALIVE and need money for treatment and income replacement. His base term insurance (₹1cr) remains active. CI rider is one of the MOST VALUABLE riders - highly recommended!'
        },
        {
          question: 'What does "Accidental Death Benefit Rider" provide?',
          options: [
            'Covers only accidental deaths, not natural deaths',
            'Provides ADDITIONAL payout if death is due to accident',
            'Replaces base policy for accidents',
            'Pays medical expenses for accidents'
          ],
          correct: 1,
          explanation: 'Accidental death rider provides ADDITIONAL payout on top of base amount if death is due to accident. Example: If base term is ₹1cr and accidental rider is ₹1cr, natural death pays ₹1cr, but accidental death pays ₹2cr total. It\'s VERY cheap (₹500-1500/year for ₹1cr) - great value for commuters and two-wheeler riders!'
        },
        {
          question: 'Why should you AVOID "Return of Premium (ROP)" rider?',
          options: [
            'It doesn\'t return the full premium',
            'Premium doubles but returns are poor (3-4%)',
            'It\'s complicated to claim',
            'Only rich people can buy it'
          ],
          correct: 1,
          explanation: 'ROP rider DOUBLES your premium but gives terrible 3-4% returns! Example: Pay ₹24K/year (vs ₹12K without ROP) for 30 years → Get ₹7.2L back. Instead, pay ₹12K for term and invest ₹12K in mutual funds → Get ₹15L (more than double!). ROP mixes insurance and investment - NEVER do this. Buy pure term and invest separately!'
        },
        {
          question: 'Priya wants maximum protection at affordable cost. Which rider combination is MOST recommended?',
          options: [
            'Return of Premium + Monthly Income rider',
            'Critical Illness + Accidental Death rider',
            'Only base term insurance, no riders needed',
            'All possible riders for maximum coverage'
          ],
          correct: 1,
          explanation: 'Critical Illness + Accidental Death is the BEST combination! CI rider (₹3500/year) covers you if you survive critical illness with ₹25L payout. Accidental death (₹1000/year) doubles your coverage for accidents. Total additional cost: ₹4500/year for massive extra protection. AVOID ROP and monthly income riders - they\'re expensive investment-linked products with poor returns.'
        },
        {
          question: 'What does "Waiver of Premium" rider do?',
          options: [
            'Reduces your premium by 10-20%',
            'Insurer pays your future premiums if you become disabled',
            'Waives first year premium',
            'Allows you to skip premium payments occasionally'
          ],
          correct: 1,
          explanation: 'Waiver of Premium rider is VERY useful! If you become permanently disabled or critically ill, the insurance company pays ALL your future premiums while keeping policy active. Example: You\'re 35, get disabled, would have paid ₹15K/year till 60 (₹3.75L total) - insurer pays it! Your family stays protected without paying anything. Costs ₹2000-3000/year - good value for peace of mind!'
        }
      ]
    }
  ]
};
