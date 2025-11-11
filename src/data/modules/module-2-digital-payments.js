/**
 * Module 2: Digital Payments
 * Complete lesson content with quizzes
 */

export const module2Content = {
  title: 'Digital Payments',
  lessons: [
    {
      id: 0,
      title: 'UPI Payments',
      subtitle: 'Instant Money Transfer at Your Fingertips',
      duration: '6 mins',
      content: `
        <h3>What is UPI?</h3>
        <p>UPI (Unified Payments Interface) is a revolutionary real-time payment system that allows you to instantly transfer money between bank accounts using just a mobile number or UPI ID. No need to remember bank account numbers!</p>
        
        <h4>Key Features:</h4>
        <ul>
          <li><strong>Instant Transfer:</strong> Money reaches in seconds, 24/7</li>
          <li><strong>Zero Charges:</strong> Completely free for personal transactions</li>
          <li><strong>Multiple Banks:</strong> Link multiple bank accounts to one UPI app</li>
          <li><strong>Simple:</strong> Pay using mobile number, UPI ID, or QR code</li>
          <li><strong>Secure:</strong> Protected by UPI PIN + device binding</li>
          <li><strong>Transaction Limit:</strong> ₹1 lakh per transaction</li>
        </ul>

        <h4>Popular UPI Apps:</h4>
        <ul>
          <li><strong>Google Pay (GPay):</strong> User-friendly, rewards, bill payments</li>
          <li><strong>PhonePe:</strong> Wide merchant network, insurance, mutual funds</li>
          <li><strong>Paytm:</strong> Wallet + UPI, e-commerce integration</li>
          <li><strong>BHIM:</strong> Government app, simple interface</li>
          <li><strong>Bank Apps:</strong> SBI YONO, ICICI iMobile, etc.</li>
        </ul>

        <h4>How to Set Up UPI:</h4>
        <ol>
          <li>Download a UPI app (GPay, PhonePe, Paytm, BHIM)</li>
          <li>Register with mobile number (linked to bank account)</li>
          <li>Verify mobile number with OTP</li>
          <li>Select your bank from the list</li>
          <li>Verify account with last 6 digits of debit card + expiry</li>
          <li>Set 4-6 digit UPI PIN</li>
          <li>Create your UPI ID (yourname@bank or yourname@paytm)</li>
          <li>Start transacting!</li>
        </ol>

        <h4>Ways to Send Money via UPI:</h4>
        <ul>
          <li><strong>Mobile Number:</strong> Send to contacts in your phone</li>
          <li><strong>UPI ID:</strong> Send to username@bankname</li>
          <li><strong>QR Code:</strong> Scan merchant or person's QR code</li>
          <li><strong>Bank Account:</strong> Enter account number + IFSC</li>
        </ul>

        <h4>UPI Security Features:</h4>
        <ul>
          <li><strong>Device Binding:</strong> UPI PIN works only on registered device</li>
          <li><strong>UPI PIN:</strong> Required for every transaction</li>
          <li><strong>No Password Sharing:</strong> Never share UPI PIN, even with bank</li>
          <li><strong>Verified Merchants:</strong> Check merchant name before paying</li>
          <li><strong>Transaction History:</strong> Track all payments in app</li>
        </ul>

        <h4>Common UPI Use Cases:</h4>
        <ul>
          <li>Split bills with friends (restaurants, movies, trips)</li>
          <li>Pay to local shops, vegetable vendors, auto drivers</li>
          <li>Recharge mobile, DTH, pay utility bills</li>
          <li>Send money to family members instantly</li>
          <li>Pay for online shopping</li>
          <li>Donate to charitable organizations</li>
        </ul>

        <h4>Important Tips:</h4>
        <ul>
          <li>Set strong UPI PIN (don't use birth date, phone number)</li>
          <li>Never share UPI PIN with anyone</li>
          <li>Verify recipient details before sending money</li>
          <li>Check transaction status before paying again</li>
          <li>Don't scan unknown QR codes</li>
          <li>Report fraudulent transactions immediately</li>
          <li>Link only active bank accounts</li>
        </ul>

        <h4>What to Do If Transaction Fails:</h4>
        <ol>
          <li>Check if money debited from your account (bank statement)</li>
          <li>Wait 24 hours for auto-reversal</li>
          <li>If not reversed, raise complaint in UPI app</li>
          <li>Note transaction reference number (UPI Ref No)</li>
          <li>Contact bank customer care if needed</li>
        </ol>
      `,
      keyPoints: [
        'UPI enables instant money transfer using mobile number or UPI ID',
        'Completely free for personal transactions, ₹1 lakh limit',
        'Secured by UPI PIN and device binding',
        'Never share your UPI PIN with anyone'
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'What is the maximum transaction limit for UPI payments?',
          options: ['₹10,000', '₹50,000', '₹1,00,000', '₹5,00,000'],
          correct: 2,
          explanation: 'The UPI transaction limit is ₹1,00,000 per transaction for most banks. Some banks may have lower limits, which can be checked in your UPI app settings.'
        },
        {
          type: 'scenario',
          question: 'Rahul receives a call from someone claiming to be from his bank, asking for his UPI PIN to "verify his account". What should he do?',
          context: 'The caller knows Rahul\'s name and last 4 digits of account number.',
          options: [
            'Share UPI PIN to verify',
            'Ask caller to send SMS first',
            'Hang up immediately and report to bank',
            'Share half of the PIN for verification'
          ],
          correct: 2,
          explanation: 'This is a fraud attempt! Banks NEVER ask for UPI PIN. Rahul should hang up immediately, block the number, and report to his bank. UPI PIN should NEVER be shared with anyone, even bank staff.'
        },
        {
          type: 'truefalse',
          question: 'UPI transactions are charged at ₹5 per transaction for amounts above ₹1000.',
          options: ['True', 'False'],
          correct: 1,
          explanation: 'False! UPI transactions are completely FREE for personal transactions of any amount. There are no charges for sending or receiving money via UPI. This is one of the biggest advantages of UPI.'
        },
        {
          type: 'mcq',
          question: 'Which of these is the SAFEST way to pay a shopkeeper via UPI?',
          options: [
            'Share your UPI PIN with the shopkeeper',
            'Give your phone to shopkeeper to complete payment',
            'Scan the shopkeeper\'s QR code and enter amount yourself',
            'Share your UPI ID and let shopkeeper pull money'
          ],
          correct: 2,
          explanation: 'Scanning the merchant\'s QR code and entering the amount yourself is the safest method. Never share your UPI PIN or give your phone to anyone. Always verify the merchant name before paying.'
        },
        {
          type: 'mcq',
          question: 'What should you do if a UPI transaction fails but money is debited from your account?',
          options: [
            'Immediately make another payment',
            'Wait 24 hours for auto-reversal, then raise complaint',
            'Share UPI PIN with bank to get refund',
            'Create a new UPI account'
          ],
          correct: 1,
          explanation: 'Wait 24 hours as most failed transactions are auto-reversed by banks. If not reversed, raise a complaint in your UPI app with the transaction reference number. Never share UPI PIN.'
        }
      ]
    },

    {
      id: 1,
      title: 'Net Banking',
      subtitle: 'Manage Your Bank Account Online',
      duration: '7 mins',
      content: `
        <h3>What is Net Banking?</h3>
        <p>Net Banking (Internet Banking) allows you to access your bank account and perform transactions online through your bank's website or app. It's like having a bank branch on your computer/phone, available 24/7!</p>
        
        <h4>Key Services Available:</h4>
        <ul>
          <li><strong>Account Management:</strong> Check balance, view statements, download passbook</li>
          <li><strong>Fund Transfers:</strong> NEFT, RTGS, IMPS to any bank account</li>
          <li><strong>Bill Payments:</strong> Electricity, water, gas, credit cards, insurance</li>
          <li><strong>Investments:</strong> Fixed deposits, recurring deposits, mutual funds</li>
          <li><strong>Loan Management:</strong> Apply for loans, check EMI status, prepay loans</li>
          <li><strong>Card Services:</strong> Block/unblock cards, set limits, request new cards</li>
          <li><strong>Cheque Services:</strong> Request cheque book, stop cheque payment</li>
          <li><strong>Tax Payments:</strong> Income tax, GST, property tax</li>
        </ul>

        <h4>How to Register for Net Banking:</h4>
        <ol>
          <li><strong>Visit Bank Branch:</strong> Request net banking activation (for first time)</li>
          <li><strong>Get Credentials:</strong> Receive User ID and temporary password</li>
          <li><strong>Online Activation:</strong> Visit bank website, login with credentials</li>
          <li><strong>Create Password:</strong> Set strong password (8-15 characters, alphanumeric + special chars)</li>
          <li><strong>Set Security Questions:</strong> Choose questions and answers</li>
          <li><strong>Register Mobile/Email:</strong> For OTP-based authentication</li>
          <li><strong>Activation Complete:</strong> Start using net banking services</li>
        </ol>

        <div class="tip-box">
          <h4>💡 Modern Method: Instant Activation</h4>
          <p>Many banks now offer instant net banking activation through debit card details:</p>
          <ul>
            <li>Visit bank website → Select "Register for Net Banking"</li>
            <li>Enter account number + debit card number</li>
            <li>Verify with OTP sent to registered mobile</li>
            <li>Create User ID and password</li>
            <li>Start using immediately!</li>
          </ul>
        </div>

        <h4>Types of Fund Transfers in Net Banking:</h4>
        
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Full Form</th>
              <th>Speed</th>
              <th>Limit</th>
              <th>Charges</th>
              <th>Timing</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>IMPS</strong></td>
              <td>Immediate Payment Service</td>
              <td>Instant</td>
              <td>₹5 lakh</td>
              <td>₹2-5</td>
              <td>24/7</td>
            </tr>
            <tr>
              <td><strong>NEFT</strong></td>
              <td>National Electronic Funds Transfer</td>
              <td>30 mins - 2 hours</td>
              <td>No limit</td>
              <td>₹2-25 (based on amount)</td>
              <td>24/7</td>
            </tr>
            <tr>
              <td><strong>RTGS</strong></td>
              <td>Real Time Gross Settlement</td>
              <td>30 mins</td>
              <td>Min ₹2 lakh</td>
              <td>₹25-50</td>
              <td>9 AM - 4:30 PM</td>
            </tr>
          </tbody>
        </table>

        <h4>When to Use Which Transfer Method:</h4>
        <ul>
          <li><strong>IMPS:</strong> Urgent small transfers (emergency, paying bills, instant needs)</li>
          <li><strong>NEFT:</strong> Non-urgent transfers of any amount (paying rent, sending money to family)</li>
          <li><strong>RTGS:</strong> Large urgent transfers above ₹2 lakhs (property deals, business payments)</li>
          <li><strong>UPI:</strong> Daily small transactions below ₹1 lakh (free and instant!)</li>
        </ul>

        <h4>Net Banking Security Features:</h4>
        <ul>
          <li><strong>Two-Factor Authentication:</strong> Password + OTP for transactions</li>
          <li><strong>Session Timeout:</strong> Auto-logout after inactivity</li>
          <li><strong>Transaction Limits:</strong> Daily/per-transaction limits (can customize)</li>
          <li><strong>Secure Connection:</strong> HTTPS encryption (look for padlock icon)</li>
          <li><strong>Transaction Alerts:</strong> SMS/email for every transaction</li>
          <li><strong>Beneficiary Management:</strong> Add payees first, verify after 30 mins</li>
        </ul>

        <h4>Common Net Banking Tasks:</h4>
        
        <div class="example-box">
          <h5>1. Checking Account Balance</h5>
          <p>Login → Accounts → View Balance/Statement</p>
          
          <h5>2. Transferring Money</h5>
          <p>Login → Funds Transfer → Add Beneficiary → Wait 30 mins → Transfer Money → Confirm with OTP</p>
          
          <h5>3. Paying Bills</h5>
          <p>Login → Bill Payments → Select Category (Electricity/Water/etc.) → Enter Details → Pay → Confirm</p>
          
          <h5>4. Opening Fixed Deposit</h5>
          <p>Login → Deposits → Open FD → Select Amount & Tenure → Confirm → FD Created</p>
        </div>

        <h4>Net Banking Safety Tips:</h4>
        <ul>
          <li><strong>Strong Password:</strong> Use mix of uppercase, lowercase, numbers, special characters</li>
          <li><strong>Never Share:</strong> Don't share User ID, password, OTP with anyone</li>
          <li><strong>Check URL:</strong> Always verify bank's website URL (https://www.bankname.com)</li>
          <li><strong>Avoid Public WiFi:</strong> Don't use net banking on public WiFi networks</li>
          <li><strong>Logout Properly:</strong> Always click "Logout" button, don't just close browser</li>
          <li><strong>Update Contact:</strong> Keep mobile number and email updated for alerts</li>
          <li><strong>Regular Monitoring:</strong> Check transaction history weekly</li>
          <li><strong>Phishing Awareness:</strong> Don't click links in suspicious emails</li>
        </ul>

        <h4>What to Do If You Forget Password:</h4>
        <ol>
          <li>Click "Forgot Password" on login page</li>
          <li>Enter User ID and registered mobile number</li>
          <li>Verify with OTP sent to mobile</li>
          <li>Answer security questions</li>
          <li>Create new password</li>
          <li>Login with new password</li>
        </ol>

        <div class="warning-box">
          <h4>⚠️ Common Net Banking Frauds to Avoid:</h4>
          <ul>
            <li><strong>Phishing Emails:</strong> Fake emails asking to "verify account" or "update KYC"</li>
            <li><strong>Fake Websites:</strong> Look-alike bank websites with slightly different URLs</li>
            <li><strong>Phone Calls:</strong> Fraudsters posing as bank staff asking for OTP/password</li>
            <li><strong>Remote Access:</strong> Requests to install TeamViewer/AnyDesk to "fix" issues</li>
          </ul>
          <p><strong>Remember:</strong> Banks NEVER ask for password, OTP, or remote access!</p>
        </div>

        <h4>Advantages of Net Banking:</h4>
        <ul>
          <li>✅ 24/7 availability - bank anytime, anywhere</li>
          <li>✅ No need to visit branch for most tasks</li>
          <li>✅ Instant fund transfers with IMPS</li>
          <li>✅ Lower charges compared to branch transactions</li>
          <li>✅ Track all transactions in one place</li>
          <li>✅ Download statements instantly</li>
          <li>✅ Pay bills without standing in queues</li>
        </ul>
      `,
      keyPoints: [
        'Net banking provides 24/7 access to bank services from anywhere',
        'IMPS (instant), NEFT (2 hours), RTGS (₹2L+ only) for fund transfers',
        'Always use strong passwords and never share OTP with anyone',
        'Verify bank website URL and avoid public WiFi for transactions'
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'Priya needs to urgently send ₹5,000 to her friend. Which is the BEST option?',
          options: [
            'RTGS - fastest for urgent transfers',
            'NEFT - will reach in 2-3 hours',
            'IMPS - instant and costs only ₹2-5',
            'Cheque - safe and instant'
          ],
          correct: 2,
          explanation: 'IMPS is the best option for urgent small transfers - it\'s instant (money reaches in seconds), available 24/7, and costs only ₹2-5. RTGS requires minimum ₹2 lakhs. NEFT takes 30 mins - 2 hours. Cheques take 1-2 days to clear.'
        },
        {
          type: 'mcq',
          question: 'What is the minimum amount required for RTGS transfer?',
          options: ['₹1,000', '₹10,000', '₹50,000', '₹2,00,000'],
          correct: 3,
          explanation: 'RTGS requires a minimum of ₹2,00,000 per transaction. It\'s meant for large-value urgent transfers. For smaller amounts, use IMPS (instant) or NEFT (no minimum limit).'
        },
        {
          type: 'scenario',
          question: 'Amit receives an email from "sbibank-secure.com" asking him to "verify his account within 24 hours" by clicking a link. What should he do?',
          context: 'The email looks professional with SBI logo and threatens account suspension.',
          options: [
            'Click the link and verify immediately to avoid suspension',
            'Reply to email asking if it\'s genuine',
            'Delete email, report as phishing, contact bank directly',
            'Forward to friends to warn them'
          ],
          correct: 2,
          explanation: 'This is a PHISHING scam! The URL "sbibank-secure.com" is fake (real SBI is sbi.co.in or onlinesbi.sbi). Banks NEVER send such emails or threaten suspension. Delete immediately, mark as spam, and contact bank through official channels to report.'
        },
        {
          type: 'truefalse',
          question: 'It is safe to use net banking on public WiFi at cafes and airports if you logout properly.',
          options: ['True - as long as you logout', 'False - avoid public WiFi'],
          correct: 1,
          explanation: 'FALSE! Public WiFi is NOT SAFE for net banking, even if you logout. Hackers can intercept data on public networks. Always use your mobile data or secure home WiFi for banking. If urgent, use your phone\'s hotspot instead of public WiFi.'
        },
        {
          type: 'mcq',
          question: 'Rahul forgot his net banking password. What is the correct way to recover it?',
          options: [
            'Call customer care and share OTP to reset',
            'Email account details to bank',
            'Use "Forgot Password" on bank website, verify with OTP',
            'Visit branch with Aadhaar card'
          ],
          correct: 2,
          explanation: 'Use the "Forgot Password" option on the bank\'s official website. You\'ll verify your identity with OTP sent to registered mobile and security questions. NEVER share OTP over phone calls - that\'s fraud! Bank website is the safest password reset method.'
        },
        {
          type: 'mcq',
          question: 'Which of these is a RED FLAG for net banking fraud?',
          options: [
            'Bank website URL starts with https://',
            'OTP is valid only for 5 minutes',
            'Someone calls asking for your OTP to "complete verification"',
            'Transaction confirmation sent via SMS'
          ],
          correct: 2,
          explanation: 'RED FLAG! Banks NEVER ask for OTP over phone. OTP (One Time Password) is only for YOUR use to authenticate transactions. Anyone asking for OTP is a FRAUDSTER. Hang up immediately and report to bank. Never share OTP, password, or card CVV with anyone.'
        },
        {
          type: 'mcq',
          question: 'Comparing NEFT and IMPS, which statement is TRUE?',
          options: [
            'NEFT is faster than IMPS',
            'IMPS is available 24/7, NEFT only during banking hours',
            'Both are instant and take same time',
            'NEFT is more expensive than IMPS'
          ],
          correct: 1,
          explanation: 'IMPS is available 24/7 including holidays and works instantly. NEFT also works 24/7 now (changed in 2020) but takes 30 mins - 2 hours. For urgent transfers, IMPS is better. Both have similar charges (₹2-5 for small amounts). IMPS limit is ₹5 lakhs, NEFT has no limit.'
        }
      ]
    },

    {
      id: 2,
      title: 'Mobile Wallets & Digital Payment Apps',
      subtitle: 'Convenient Digital Money Storage',
      duration: '6 mins',
      content: `
        <h3>What are Mobile Wallets?</h3>
        <p>Mobile wallets (e-wallets) are digital storage for money on your smartphone. Think of them as a virtual purse where you can store money and use it to pay for purchases, transfer to others, or cash out to your bank account.</p>
        
        <h4>Popular Mobile Wallets in India:</h4>
        
        <div class="wallet-comparison">
          <table>
            <thead>
              <tr>
                <th>Wallet</th>
                <th>Key Features</th>
                <th>Best For</th>
                <th>KYC Limit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Paytm</strong></td>
                <td>Wallet + UPI, e-commerce, investments, insurance</td>
                <td>All-in-one solution</td>
                <td>₹10K (min KYC), ₹1L (full KYC)</td>
              </tr>
              <tr>
                <td><strong>PhonePe</strong></td>
                <td>UPI-focused, bill payments, mutual funds, gold</td>
                <td>UPI transactions</td>
                <td>No wallet limit (UPI-based)</td>
              </tr>
              <tr>
                <td><strong>Google Pay</strong></td>
                <td>Simple UPI, rewards, bill payments</td>
                <td>Quick peer-to-peer transfers</td>
                <td>No wallet (UPI-based)</td>
              </tr>
              <tr>
                <td><strong>Amazon Pay</strong></td>
                <td>Amazon shopping, bill payments, recharges</td>
                <td>Amazon shoppers</td>
                <td>₹10K (min KYC), ₹1L (full KYC)</td>
              </tr>
              <tr>
                <td><strong>Mobikwik</strong></td>
                <td>Wallet, credit line, investments</td>
                <td>Wallet users</td>
                <td>₹10K (min KYC), ₹1L (full KYC)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4>Wallet vs UPI: What\'s the Difference?</h4>
        
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Mobile Wallet</th>
              <th>UPI</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Money Storage</strong></td>
              <td>Money stored IN wallet app</td>
              <td>Money stays in bank account</td>
            </tr>
            <tr>
              <td><strong>KYC Required</strong></td>
              <td>Yes (for ₹10K+ balance)</td>
              <td>Not needed (bank KYC sufficient)</td>
            </tr>
            <tr>
              <td><strong>Monthly Limit</strong></td>
              <td>₹10K (min KYC), ₹1L (full KYC)</td>
              <td>₹1L per transaction</td>
            </tr>
            <tr>
              <td><strong>Cashback/Offers</strong></td>
              <td>Good offers on wallet payments</td>
              <td>Varies by platform</td>
            </tr>
            <tr>
              <td><strong>Transfer to Bank</strong></td>
              <td>Needs transfer (may have charges)</td>
              <td>No need (already in bank)</td>
            </tr>
          </tbody>
        </table>

        <h4>How to Load Money in Wallet:</h4>
        <ul>
          <li><strong>Debit/Credit Card:</strong> Add card details, enter amount, verify with OTP</li>
          <li><strong>Net Banking:</strong> Link bank account, transfer money</li>
          <li><strong>UPI:</strong> Use UPI to add money (most common now)</li>
          <li><strong>Cash Deposit:</strong> Some wallets allow cash deposit at partner stores</li>
          <li><strong>Cashback/Rewards:</strong> Earned from transactions</li>
        </ul>

        <h4>KYC Requirements for Wallets:</h4>
        
        <div class="kyc-box">
          <h5>Minimum KYC (₹10,000/month limit):</h5>
          <ul>
            <li>Mobile number verification (OTP)</li>
            <li>Basic details (name, address)</li>
          </ul>
          
          <h5>Full KYC (₹1,00,000/month limit):</h5>
          <ul>
            <li>Aadhaar verification (eKYC)</li>
            <li>PAN card details</li>
            <li>Video KYC or In-Person Verification</li>
          </ul>
          
          <p><strong>Tip:</strong> Complete full KYC for higher limits and better features!</p>
        </div>

        <h4>Common Uses of Mobile Wallets:</h4>
        <ul>
          <li>🛒 <strong>Shopping:</strong> Pay at online stores (Flipkart, Amazon, Myntra)</li>
          <li>🍕 <strong>Food Delivery:</strong> Zomato, Swiggy, Uber Eats</li>
          <li>🚗 <strong>Transportation:</strong> Uber, Ola, metro recharge</li>
          <li>📱 <strong>Recharges:</strong> Mobile, DTH, broadband</li>
          <li>⚡ <strong>Bill Payments:</strong> Electricity, water, gas, credit cards</li>
          <li>🎬 <strong>Entertainment:</strong> Movie tickets, event bookings</li>
          <li>💰 <strong>Peer Transfers:</strong> Send money to friends/family</li>
          <li>🎁 <strong>Cashback:</strong> Earn rewards on transactions</li>
        </ul>

        <h4>Advantages of Mobile Wallets:</h4>
        <ul>
          <li>✅ Quick payments without entering card details every time</li>
          <li>✅ Attractive cashback and discount offers</li>
          <li>✅ Works even without internet (some wallets)</li>
          <li>✅ Useful for small merchants without POS machines</li>
          <li>✅ Track spending history in one app</li>
          <li>✅ Multiple payment options (wallet + UPI + cards)</li>
        </ul>

        <h4>Disadvantages to Consider:</h4>
        <ul>
          <li>❌ Money locked in wallet (can\'t earn interest)</li>
          <li>❌ KYC limits restrict transaction amounts</li>
          <li>❌ Transfer to bank may have charges (varies by wallet)</li>
          <li>❌ Less secure than direct bank accounts if phone is lost</li>
          <li>❌ Wallet company closure risk (though rare with big players)</li>
        </ul>

        <h4>Wallet Security Tips:</h4>
        <ul>
          <li><strong>Strong PIN/Password:</strong> Set 6-digit PIN for app access</li>
          <li><strong>Biometric Lock:</strong> Enable fingerprint/face unlock</li>
          <li><strong>Limited Balance:</strong> Don\'t store more than needed (use UPI for larger amounts)</li>
          <li><strong>Regular Monitoring:</strong> Check transaction history weekly</li>
          <li><strong>Immediate Action:</strong> Block wallet if phone is lost/stolen</li>
          <li><strong>Avoid Sharing:</strong> Never share OTP, PIN, or wallet password</li>
          <li><strong>Official Apps Only:</strong> Download from Play Store/App Store only</li>
        </ul>

        <h4>What to Do If Phone is Lost/Stolen:</h4>
        <ol>
          <li><strong>Immediately:</strong> Call customer care to block wallet</li>
          <li><strong>Online:</strong> Login to wallet website and block account</li>
          <li><strong>Report:</strong> File police complaint if unauthorized transactions</li>
          <li><strong>New Phone:</strong> Login with OTP, verify identity, resume usage</li>
          <li><strong>Check:</strong> Review all transactions after phone recovery</li>
        </ol>

        <div class="tip-box">
          <h4>💡 Smart Wallet Strategy</h4>
          <p>Best approach for Indian users:</p>
          <ul>
            <li><strong>Primary Method:</strong> Use UPI for most transactions (free, instant, no lock-in)</li>
            <li><strong>Secondary:</strong> Keep ₹500-2000 in wallet for quick payments and cashback offers</li>
            <li><strong>Complete KYC:</strong> Get full KYC done for ₹1L limit</li>
            <li><strong>Regular Transfer:</strong> Transfer wallet balance to bank weekly</li>
            <li><strong>Avoid:</strong> Don\'t store large amounts (₹10K+) in wallets</li>
          </ul>
        </div>

        <h4>Recent RBI Regulations (2023-24):</h4>
        <ul>
          <li>Mandatory KYC for wallet balances above ₹10,000</li>
          <li>Transaction limits linked to KYC level</li>
          <li>Interoperability: Transfer between wallets (coming soon)</li>
          <li>Enhanced security: Two-factor authentication mandatory</li>
        </ul>
      `,
      keyPoints: [
        'Mobile wallets store money digitally for quick payments',
        'Minimum KYC allows ₹10K/month, full KYC allows ₹1L/month',
        'Use UPI as primary method, wallets for cashback offers',
        'Don\'t store large amounts - transfer to bank regularly'
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'What is the maximum monthly transaction limit for a wallet with MINIMUM KYC?',
          options: ['₹5,000', '₹10,000', '₹50,000', '₹1,00,000'],
          correct: 1,
          explanation: 'With minimum KYC (mobile number + basic details), the monthly wallet limit is ₹10,000 as per RBI regulations. For ₹1 lakh monthly limit, you need full KYC (Aadhaar + PAN verification).'
        },
        {
          type: 'truefalse',
          question: 'Money stored in mobile wallets earns interest like savings accounts.',
          options: ['True - same as bank account', 'False - no interest earned'],
          correct: 1,
          explanation: 'FALSE! Mobile wallets do NOT pay interest on stored money. Money just sits idle in the wallet. This is why you should keep minimal balance in wallets and use UPI for larger amounts (money stays in bank earning interest).'
        },
        {
          type: 'scenario',
          question: 'Priya has ₹5,000 in Paytm wallet. She wants to buy ₹8,000 worth groceries on BigBasket. What happens?',
          context: 'Her wallet has ₹5000, transaction is ₹8000.',
          options: [
            'Transaction fails - insufficient wallet balance',
            'Remaining ₹3000 auto-debited from linked bank via UPI/card',
            'She can only buy ₹5000 worth',
            'Wallet allows negative balance'
          ],
          correct: 1,
          explanation: 'Most wallet apps now support combined payments! Paytm will use ₹5000 from wallet and auto-charge remaining ₹3000 from linked UPI/card. This is called "Wallet + Bank" payment mode. Very convenient for larger purchases!'
        },
        {
          type: 'mcq',
          question: 'Amit\'s phone was stolen with Paytm app open (no lock). What should be his FIRST action?',
          options: [
            'Wait 24 hours to see if phone is found',
            'File police complaint first',
            'Immediately call Paytm customer care to block wallet',
            'Change Google password to block phone'
          ],
          correct: 2,
          explanation: 'IMMEDIATELY call Paytm customer care (or use website) to BLOCK the wallet! Every minute counts. Thief can make unauthorized transactions if wallet is unlocked. After blocking wallet, then file police complaint and block SIM. Always keep wallet apps locked with PIN/biometric!'
        },
        {
          type: 'mcq',
          question: 'Why is UPI generally better than wallets for regular use?',
          options: [
            'UPI gives more cashback',
            'Money stays in bank (earns interest), no KYC limits, free transfers',
            'UPI is faster than wallets',
            'Wallets are not secure'
          ],
          correct: 1,
          explanation: 'UPI is better because: (1) Money stays in bank account earning 3-4% interest, (2) No need to "load" money, (3) No KYC limits - direct bank transfer up to ₹1L, (4) Easy to transfer to anyone\'s bank. Use wallets only for cashback offers or quick repeated payments to same merchant.'
        },
        {
          type: 'mcq',
          question: 'To get full KYC (₹1 lakh limit) on Paytm/PhonePe, which documents are needed?',
          options: [
            'Just mobile number and name',
            'Aadhaar + PAN card verification',
            'Passport + driving license',
            'Bank statement + Aadhaar'
          ],
          correct: 1,
          explanation: 'Full KYC requires Aadhaar (for identity + address proof) and PAN card (for tax compliance). Process is simple: Enter Aadhaar number → OTP verification → Upload PAN → Video KYC or instant eKYC. Takes 5-10 minutes. This increases limit from ₹10K to ₹1L per month.'
        }
      ]
    },

    {
      id: 3,
      title: 'Digital Payment Security',
      subtitle: 'Protect Yourself from Online Frauds',
      duration: '8 mins',
      content: `
        <h3>Understanding Digital Payment Frauds</h3>
        <p>As digital payments grow, so do fraud attempts. Understanding common scams and security measures is crucial to protect your hard-earned money!</p>
        
        <h4>Common Types of Digital Payment Frauds:</h4>
        
        <div class="fraud-types">
          <h5>1. Phishing Attacks</h5>
          <p><strong>What it is:</strong> Fraudsters send fake emails/SMS pretending to be from your bank, asking for sensitive information.</p>
          <p><strong>Example:</strong> "Your account will be blocked! Click here to verify KYC within 24 hours"</p>
          <p><strong>How to identify:</strong></p>
          <ul>
            <li>Check sender email (suspicious domain like "sbi-bank.com" instead of "sbi.co.in")</li>
            <li>Urgent threats ("account will be blocked")</li>
            <li>Asks for password, OTP, CVV, PIN</li>
            <li>Poor grammar and spelling mistakes</li>
          </ul>
          <p><strong>Protection:</strong> Never click suspicious links. Visit bank website directly by typing URL.</p>

          <h5>2. Vishing (Voice Phishing)</h5>
          <p><strong>What it is:</strong> Fraudsters call pretending to be bank officials, asking for OTP or personal details.</p>
          <p><strong>Example:</strong> "I\'m calling from SBI security. Your card has suspicious activity. Please share OTP to block it."</p>
          <p><strong>Red flags:</strong></p>
          <ul>
            <li>Asks for OTP, PIN, CVV, full card number</li>
            <li>Claims urgent action needed</li>
            <li>Threatens account blocking</li>
            <li>Pressures you to act immediately</li>
          </ul>
          <p><strong>Protection:</strong> Hang up immediately! Banks NEVER ask for OTP/PIN/password on calls. Call bank on official number if concerned.</p>

          <h5>3. UPI QR Code Scams</h5>
          <p><strong>What it is:</strong> Fraudsters send fake QR codes claiming "scan to receive money".</p>
          <p><strong>Example:</strong> Selling something online? Buyer says "I sent QR code, scan to receive payment." But it\'s actually a PAYMENT request!</p>
          <p><strong>How it works:</strong></p>
          <ul>
            <li>Victim scans QR thinking money will come</li>
            <li>Actually shows "Pay ₹X" screen (not receive)</li>
            <li>Victim enters UPI PIN thinking it\'s to receive</li>
            <li>Money gets DEBITED instead of credited!</li>
          </ul>
          <p><strong>Protection:</strong> NEVER enter UPI PIN to "receive" money. Money comes automatically without PIN!</p>

          <h5>4. Remote Access Scams</h5>
          <p><strong>What it is:</strong> Fraudsters ask you to install apps like TeamViewer, AnyDesk claiming to "fix" issues.</p>
          <p><strong>Example:</strong> "Your KYC is incomplete. Install this app so our agent can help you update it."</p>
          <p><strong>Danger:</strong> Once installed, they can see your screen, access banking apps, and transfer money!</p>
          <p><strong>Protection:</strong> NEVER install remote access apps on request. Banks never use these.</p>

          <h5>5. Fake Customer Care Numbers</h5>
          <p><strong>What it is:</strong> Google search shows fake customer care numbers (paid ads by fraudsters).</p>
          <p><strong>Example:</strong> You search "Paytm customer care" → First result is fake number → They ask for wallet password/OTP.</p>
          <p><strong>Protection:</strong> Use customer care number from official app/website only. Don\'t trust Google search ads.</p>

          <h5>6. SIM Swap Fraud</h5>
          <p><strong>What it is:</strong> Fraudsters get duplicate SIM of your number, receive OTPs, and access accounts.</p>
          <p><strong>How they do it:</strong> Social engineering with telecom company or using fake ID proof.</p>
          <p><strong>Warning signs:</strong></p>
          <ul>
            <li>Sudden "No Network" on your phone</li>
            <li>Can\'t make calls/receive SMS</li>
            <li>Receiving "Welcome" SMS from operator</li>
          </ul>
          <p><strong>Protection:</strong> Enable SIM lock/PIN. If network suddenly stops, call operator immediately from another phone!</p>
        </div>

        <h4>Golden Security Rules - NEVER Share These:</h4>
        
        <div class="never-share-box">
          <h5>❌ NEVER SHARE:</h5>
          <ul>
            <li>🔒 <strong>OTP</strong> (One Time Password) - Not even to bank staff!</li>
            <li>🔒 <strong>UPI PIN</strong> - Only enter yourself in your phone</li>
            <li>🔒 <strong>CVV</strong> (3-digit code on card back) - For online payments ONLY</li>
            <li>🔒 <strong>ATM PIN</strong> - Never share or write down</li>
            <li>🔒 <strong>Net Banking Password</strong> - Your private key to bank account</li>
            <li>🔒 <strong>Debit/Credit Card Full Number</strong> - Except on secure payment pages</li>
            <li>🔒 <strong>Aadhaar OTP</strong> - Can be used for identity theft</li>
          </ul>
          <p><strong>Remember:</strong> If someone asks for ANY of these, it\'s 100% FRAUD!</p>
        </div>

        <h4>Strong Password Practices:</h4>
        <ul>
          <li><strong>Length:</strong> Minimum 12 characters (longer = stronger)</li>
          <li><strong>Mix:</strong> Uppercase, lowercase, numbers, special characters (@#$%)</li>
          <li><strong>Avoid:</strong> Don\'t use name, birth date, phone number, "password123"</li>
          <li><strong>Unique:</strong> Different passwords for different accounts</li>
          <li><strong>Update:</strong> Change passwords every 3-6 months</li>
          <li><strong>Manager:</strong> Use password manager apps (1Password, LastPass) for complex passwords</li>
        </ul>

        <div class="example-box">
          <h5>Password Examples:</h5>
          <p>❌ <strong>Weak:</strong> "priya123", "password", "12345678"</p>
          <p>✅ <strong>Strong:</strong> "P@ssw0rd!2024#Bank", "MyS3cur3P@ss!", "B@nk1ng#2024"</p>
        </div>

        <h4>Two-Factor Authentication (2FA):</h4>
        <p>2FA adds extra security layer beyond password:</p>
        <ul>
          <li><strong>What it is:</strong> Password + OTP (something you know + something you have)</li>
          <li><strong>How it works:</strong> Enter password → Receive OTP on mobile → Enter OTP → Access granted</li>
          <li><strong>Why important:</strong> Even if password is stolen, fraudster can\'t access without your phone</li>
          <li><strong>Where to enable:</strong> Net banking, UPI apps, email, social media</li>
        </ul>

        <h4>Safe Digital Payment Checklist:</h4>
        
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Why Important</th>
              <th>Frequency</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Check bank statements</td>
              <td>Detect unauthorized transactions early</td>
              <td>Weekly</td>
            </tr>
            <tr>
              <td>Enable transaction alerts</td>
              <td>Real-time notification of every transaction</td>
              <td>Once (keep enabled)</td>
            </tr>
            <tr>
              <td>Update mobile number</td>
              <td>Ensure OTPs reach you</td>
              <td>When changed</td>
            </tr>
            <tr>
              <td>Review app permissions</td>
              <td>Remove unnecessary access</td>
              <td>Monthly</td>
            </tr>
            <tr>
              <td>Update apps</td>
              <td>Get latest security patches</td>
              <td>As available</td>
            </tr>
            <tr>
              <td>Use secure networks</td>
              <td>Avoid public WiFi for banking</td>
              <td>Always</td>
            </tr>
          </tbody>
        </table>

        <h4>What to Do If You\'re Scammed:</h4>
        
        <ol>
          <li><strong>Immediate Actions (Within Minutes):</strong>
            <ul>
              <li>Call bank customer care to block account/card</li>
              <li>Report unauthorized transaction in banking app</li>
              <li>Note transaction reference number</li>
              <li>Take screenshots of fraudulent messages/calls</li>
            </ul>
          </li>
          
          <li><strong>File Complaints (Within 24 Hours):</strong>
            <ul>
              <li><strong>Cyber Crime Portal:</strong> Visit cybercrime.gov.in to file online complaint</li>
              <li><strong>Local Police:</strong> File FIR at nearest police station</li>
              <li><strong>Bank:</strong> Written complaint to branch</li>
              <li><strong>RBI Ombudsman:</strong> If bank doesn\'t respond within 30 days</li>
            </ul>
          </li>
          
          <li><strong>Follow Up (Week 1-2):</strong>
            <ul>
              <li>Track complaint status on cybercrime portal</li>
              <li>Contact bank for investigation update</li>
              <li>Provide additional documents if requested</li>
            </ul>
          </li>
          
          <li><strong>Bank Liability (Good News!):</strong>
            <ul>
              <li>If you report within 3 days: Zero liability (bank refunds full amount)</li>
              <li>If reported 4-7 days: Limited liability (you pay up to ₹10,000)</li>
              <li>After 7 days: Bank decides on case-by-case basis</li>
            </ul>
          </li>
        </ol>

        <div class="tip-box">
          <h4>💡 Smart Security Habits</h4>
          <ul>
            <li>Set daily transaction limits in banking apps (₹10K-50K based on needs)</li>
            <li>Enable biometric lock for all payment apps</li>
            <li>Keep small balance in UPI-linked account, bulk in other accounts</li>
            <li>Never save card details on shopping websites</li>
            <li>Use virtual cards for online shopping (many banks offer this)</li>
            <li>Regularly check credit report for unauthorized loans/cards</li>
          </ul>
        </div>

        <h4>Government Helplines:</h4>
        <ul>
          <li><strong>National Cyber Crime Helpline:</strong> 1930 (24/7)</li>
          <li><strong>Cyber Crime Portal:</strong> www.cybercrime.gov.in</li>
          <li><strong>RBI Complaint:</strong> cms.rbi.org.in</li>
          <li><strong>Banking Ombudsman:</strong> For unresolved bank issues</li>
        </ul>

        <div class="warning-box">
          <h4>⚠️ Remember: Prevention is Better Than Cure</h4>
          <p>Most frauds succeed because victims share OTP/PIN under pressure or fear. Stay calm, verify independently, and when in doubt, DON\'T proceed with the transaction!</p>
        </div>
      `,
      keyPoints: [
        'Never share OTP, UPI PIN, CVV, or passwords with anyone - including "bank officials"',
        'UPI money comes automatically - never enter PIN to "receive" payment',
        'Report fraud within 3 days for zero liability (full refund)',
        'Enable transaction alerts and check bank statements weekly'
      ],
      quiz: [
        {
          type: 'scenario',
          question: 'Rahul sells his old phone online. Buyer sends a QR code saying "Scan this to receive ₹8000". What should Rahul do?',
          context: 'Buyer seems genuine, has good reviews on platform.',
          options: [
            'Scan QR code and enter UPI PIN to receive money',
            'Scan QR code but don\'t enter PIN',
            'Refuse to scan - it\'s a scam! Money comes without scanning',
            'Ask buyer to resend QR code'
          ],
          correct: 2,
          explanation: 'This is a SCAM! You NEVER need to scan QR or enter PIN to RECEIVE money. Money automatically comes to your account. The QR code is actually a PAYMENT REQUEST - if Rahul scans and enters PIN, ₹8000 will be DEBITED from his account! Tell buyer to send money via UPI ID/phone number.'
        },
        {
          type: 'truefalse',
          question: 'Bank officials may ask for OTP over phone call to verify and block suspicious transactions.',
          options: ['True - for security verification', 'False - banks never ask for OTP'],
          correct: 1,
          explanation: 'FALSE! Banks will NEVER, EVER ask for OTP on phone calls, emails, or SMS. OTP is strictly confidential and only for YOUR use. Anyone asking for OTP is a FRAUDSTER, even if they know your account details. Hang up and call bank on official number if concerned.'
        },
        {
          type: 'mcq',
          question: 'Priya\'s phone suddenly shows "No Network". What should she suspect and do?',
          options: [
            'Normal network issue, wait for it to return',
            'Possible SIM swap fraud - call operator from another phone immediately',
            'Phone is damaged, visit service center',
            'Restart phone and wait'
          ],
          correct: 1,
          explanation: 'Sudden "No Network" could be SIM SWAP FRAUD! Fraudsters might have gotten duplicate SIM to receive your OTPs and access bank accounts. IMMEDIATELY call operator from another phone to block SIM. Also call bank to freeze accounts temporarily. Don\'t wait - act within minutes!'
        },
        {
          type: 'mcq',
          question: 'What is the bank\'s liability if you report unauthorized transaction within 3 days?',
          options: [
            'You bear full loss',
            'Bank refunds 50% of amount',
            'Zero liability - bank refunds full amount',
            'Bank investigates and decides'
          ],
          correct: 2,
          explanation: 'ZERO LIABILITY within 3 days! RBI rules state if you report unauthorized transaction within 3 days, bank must refund FULL amount (assuming no gross negligence like sharing PIN). 4-7 days = ₹10,000 max liability. After 7 days = case-by-case. So always check statements regularly and report immediately!'
        },
        {
          type: 'scenario',
          question: 'Amit gets call: "This is from SBI security. Suspicious activity on your account. Install TeamViewer app so we can help secure your account." What should he do?',
          context: 'Caller knows Amit\'s account number and sounds professional.',
          options: [
            'Install TeamViewer to let them fix the issue',
            'Ask for employee ID and call back on official number',
            'Hang up immediately - it\'s a scam. Banks never use TeamViewer',
            'Share account details to verify identity'
          ],
          correct: 2,
          explanation: 'HANG UP IMMEDIATELY! This is REMOTE ACCESS SCAM. Banks NEVER ask to install TeamViewer/AnyDesk. Once installed, fraudsters can see your screen, access banking apps, and steal money. Even if they know account details (could be data breach), NEVER install such apps. Call bank directly on official number if concerned.'
        },
        {
          type: 'mcq',
          question: 'Which of these passwords is STRONGEST for net banking?',
          options: [
            'priya1990',
            'password123',
            'Pr!y@2024#Bank',
            'priyasingh'
          ],
          correct: 2,
          explanation: 'Option 3 "Pr!y@2024#Bank" is strongest because it has: (1) Mix of uppercase and lowercase, (2) Numbers, (3) Special characters (@!#), (4) Good length (14 chars), (5) Not a dictionary word. Never use name, birth year, or common words. Other options are weak - easily guessed by hackers.'
        },
        {
          type: 'mcq',
          question: 'What is Two-Factor Authentication (2FA) in digital payments?',
          options: [
            'Using two different passwords',
            'Password + OTP (something you know + something you have)',
            'Logging in from two devices',
            'Having two bank accounts'
          ],
          correct: 1,
          explanation: '2FA means Password + OTP. Even if hacker steals your password, they can\'t access account without OTP sent to YOUR mobile. It\'s like having two locks on a door - much more secure! Always enable 2FA on banking apps, email, UPI apps. Small inconvenience for huge security improvement!'
        },
        {
          type: 'mcq',
          question: 'You get email from "sbi-secure-banking.com" asking to update KYC. What\'s wrong?',
          options: [
            'Nothing wrong, it\'s from SBI',
            'Should be "sbi.co.in" - this is phishing!',
            'SBI uses this domain for security',
            'Need to click to verify'
          ],
          correct: 1,
          explanation: 'PHISHING SCAM! Real SBI website is "sbi.co.in" or "onlinesbi.sbi". The domain "sbi-secure-banking.com" is FAKE created by fraudsters. Never click links in such emails. Fraudsters buy similar-looking domains to trick people. Always type bank URL directly or use official app.'
        }
      ]
    }
  ]
};
