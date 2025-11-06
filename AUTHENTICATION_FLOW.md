# 🔐 Authentication & Proficiency Detection Flow

## User Registration Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                        NEW USER JOURNEY                              │
└─────────────────────────────────────────────────────────────────────┘

Step 1: Homepage (/)
   │
   ├─> Click "Get Started"
   │
   ↓
Step 2: Signup Page (/signup)
   │
   ├─> Fill form:
   │   • Name
   │   • Email (validated)
   │   • Password (min 6 chars, hashed with bcrypt)
   │   • Confirm Password
   │   • Preferred Language (11 options)
   │
   ├─> Submit → POST /api/auth/register
   │   │
   │   ├─> Backend validates input
   │   ├─> Check if email exists
   │   ├─> Hash password (bcrypt, 10 rounds)
   │   ├─> Create user in MongoDB
   │   ├─> Generate JWT token (7 days)
   │   └─> Return { token, user }
   │
   ├─> Store token in localStorage
   ├─> Set axios default header
   │
   ↓
Step 3: Onboarding (/onboarding)
   │
   ├─> Step 1/3: Welcome with user name
   ├─> Step 2/3: How it works (3 features)
   ├─> Step 3/3: Ready to start (feature list)
   │
   ↓
Step 4: Chat Page (/chat)
   │
   └─> Start asking questions!

┌─────────────────────────────────────────────────────────────────────┐
│                     REGISTRATION SUCCESS ✅                          │
│  • User account created in MongoDB                                   │
│  • JWT token stored in localStorage                                  │
│  • Auto-logged in                                                    │
│  • Ready to track progress                                           │
└─────────────────────────────────────────────────────────────────────┘
```

## User Login Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                    EXISTING USER JOURNEY                             │
└─────────────────────────────────────────────────────────────────────┘

Step 1: Homepage (/)
   │
   ├─> Click "Sign In"
   │
   ↓
Step 2: Login Page (/login)
   │
   ├─> Fill form:
   │   • Email
   │   • Password
   │
   ├─> Submit → POST /api/auth/login
   │   │
   │   ├─> Backend finds user by email
   │   ├─> Compare password (bcrypt.compare)
   │   ├─> Update lastLogin timestamp
   │   ├─> Generate new JWT token
   │   └─> Return { token, user }
   │
   ├─> Store token in localStorage
   ├─> Set axios default header
   │
   ↓
Step 3: Chat Page (/chat)
   │
   └─> All progress preserved!

┌─────────────────────────────────────────────────────────────────────┐
│                       LOGIN SUCCESS ✅                               │
│  • User authenticated                                                │
│  • Previous progress loaded                                          │
│  • Proficiency level restored                                        │
│  • Streak continues if within 24 hours                               │
└─────────────────────────────────────────────────────────────────────┘
```

## AI Proficiency Detection Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│              🧠 AI-POWERED PROFICIENCY DETECTION                     │
└─────────────────────────────────────────────────────────────────────┘

Question 1: "What is EMI?"
   │
   ├─> Sent to Python RAG service
   ├─> Response generated
   └─> Stored in session history
   
   [Proficiency: unknown] - Need more questions

   ↓

Question 2: "How does compound interest work?"
   │
   ├─> Sent to Python RAG service
   ├─> Response generated
   └─> Stored in session history
   
   [Proficiency: unknown] - Need 1 more question

   ↓

Question 3: "What is the difference between FD and RD?"
   │
   ├─> Sent to Python RAG service
   ├─> Response generated
   └─> Stored in session history
   
   🎯 TRIGGER PROFICIENCY ASSESSMENT (3 questions reached)
   
   ↓

PROFICIENCY DETECTION PROCESS:
   │
   ├─> Collect last 3-10 questions from user
   │
   ├─> Prepare analysis prompt:
   │   """
   │   Analyze these financial questions and classify user level:
   │   1. What is EMI?
   │   2. How does compound interest work?
   │   3. What is the difference between FD and RD?
   │   
   │   Classify as: beginner/intermediate/expert
   │   Provide score (0-100) and reasoning
   │   """
   │
   ├─> Send to Ollama LLM (via Python RAG service)
   │
   ↓

OLLAMA ANALYZES:
   │
   ├─> Question complexity analysis
   ├─> Financial concept understanding
   ├─> Query sophistication
   │
   └─> Response:
       """
       LEVEL: beginner
       SCORE: 25
       REASONING: User asks basic "what is" questions about
       fundamental concepts like EMI and compound interest.
       Shows no prior knowledge of financial terms.
       """
   
   ↓

BACKEND PROCESSES RESULT:
   │
   ├─> Parse level: "beginner"
   ├─> Parse score: 25
   ├─> Parse reasoning: "User asks basic..."
   │
   ├─> Update MongoDB:
   │   user.proficiencyLevel = "beginner"
   │   user.proficiencyScore = 25
   │   user.questionsAnalyzed = 3
   │   user.proficiencyAssessedAt = Date.now()
   │
   └─> Save to database

   ↓

FRONTEND UPDATES:
   │
   ├─> Refresh user profile (GET /api/auth/profile)
   ├─> Update navbar with badge:
   │   "Hi, User Name [beginner]" 🟢
   │
   └─> Badge color:
       • Beginner: 🟢 Green
       • Intermediate: 🟡 Yellow
       • Expert: 🔴 Red

┌─────────────────────────────────────────────────────────────────────┐
│                  PROFICIENCY DETECTED! ✅                            │
│  • Level: beginner                                                   │
│  • Score: 25/100                                                     │
│  • Badge visible in navbar                                           │
│  • Reassessment in 10 questions or 30 days                           │
└─────────────────────────────────────────────────────────────────────┘

   ↓

Questions 4-13: Continue learning...
   │
   └─> After 10 more questions → RE-ASSESS
       (Level may upgrade to intermediate or expert)
```

## Proficiency Level Examples

### 🟢 Beginner Level (Score: 0-33)
**Question Patterns:**
- "What is EMI?"
- "What does SIP mean?"
- "How to open a bank account?"
- "What is compound interest?"
- "Explain mutual fund"

**Characteristics:**
- Basic "what is" questions
- No understanding of financial terms
- Asks for definitions
- Simple concepts
- Needs foundational knowledge

### 🟡 Intermediate Level (Score: 34-66)
**Question Patterns:**
- "What's the difference between FD and RD?"
- "How to calculate SIP returns?"
- "Which is better: term insurance or whole life?"
- "How does tax saving work with ELSS?"
- "Compare debt funds vs equity funds"

**Characteristics:**
- Understands basic concepts
- Asks comparative questions
- Wants practical applications
- Uses financial terminology correctly
- Ready for advanced topics

### 🔴 Expert Level (Score: 67-100)
**Question Patterns:**
- "Tax loss harvesting strategies for capital gains?"
- "How to optimize portfolio allocation for retirement?"
- "Explain debt to equity ratio impact on ROE"
- "What are the implications of inverted yield curve?"
- "Compare alpha vs beta in portfolio management"

**Characteristics:**
- Deep understanding of finance
- Asks strategic questions
- Uses advanced terminology
- Wants optimization advice
- Discusses complex scenarios

## Progress Tracking

```
┌─────────────────────────────────────────────────────────────────────┐
│                     AUTOMATIC PROGRESS TRACKING                      │
└─────────────────────────────────────────────────────────────────────┘

Every Question Asked:
   │
   ├─> user.totalQuestionsAsked++
   ├─> user.topicsExplored.push(topic)  // Unique topics
   ├─> user.totalTimeSpent += sessionDuration
   │
   ├─> Check streak:
   │   │
   │   ├─> Last activity < 24 hours ago?
   │   │   └─> user.currentStreak++
   │   │
   │   └─> Last activity > 24 hours ago?
   │       └─> user.currentStreak = 1 (reset)
   │
   ├─> Update longestStreak if needed:
   │   if (currentStreak > longestStreak) {
   │     longestStreak = currentStreak
   │   }
   │
   └─> Check for achievements:
       │
       ├─> First question? → Award "first_question" badge
       ├─> 10 questions? → Award "10_questions" badge
       ├─> 7-day streak? → Award "weekly_warrior" badge
       ├─> Reached expert? → Award "expert_status" badge
       │
       └─> user.totalPoints += pointsEarned

Every 10 Questions OR 30 Days:
   │
   └─> Trigger RE-ASSESSMENT
       • Analyze recent questions
       • Update proficiency level
       • Adjust score
       • User may level up!
```

## Database Schema

```javascript
// MongoDB User Document
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  
  // Authentication
  name: "Raj Kumar",
  email: "raj@example.com",
  password: "$2a$10$hashed_password...",  // bcrypt hash
  
  // Proficiency
  proficiencyLevel: "intermediate",        // beginner/intermediate/expert
  proficiencyScore: 55,                    // 0-100
  questionsAnalyzed: 15,                   // Total analyzed
  proficiencyAssessedAt: ISODate("2024-01-15T10:30:00Z"),
  
  // Progress
  totalQuestionsAsked: 25,
  totalTimeSpent: 3600,                    // seconds
  topicsExplored: ["EMI", "SIP", "Mutual Funds", "Insurance"],
  currentStreak: 5,                        // consecutive days
  longestStreak: 12,
  lastActivity: ISODate("2024-01-15T14:20:00Z"),
  
  // Gamification
  achievements: [
    "first_question",
    "10_questions",
    "weekly_warrior"
  ],
  totalPoints: 85,
  
  // Settings
  preferredLanguage: "hi",                 // Hindi
  
  // Metadata
  createdAt: ISODate("2024-01-01T09:00:00Z"),
  lastLogin: ISODate("2024-01-15T09:00:00Z")
}
```

## API Request Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PROTECTED API REQUEST FLOW                        │
└─────────────────────────────────────────────────────────────────────┘

Client Side (React):
   │
   ├─> User clicks "Send Message"
   │
   ├─> Get token from localStorage
   │   const token = localStorage.getItem('authToken')
   │
   ├─> Make API request with Authorization header:
   │   axios.post('/api/chat/message', { message }, {
   │     headers: {
   │       'Authorization': `Bearer ${token}`
   │     }
   │   })
   │
   ↓

Server Side (Express):
   │
   ├─> Request hits authMiddleware.authenticate
   │
   ├─> Extract token from Authorization header
   │   const token = req.headers.authorization.split(' ')[1]
   │
   ├─> Verify JWT token
   │   const decoded = jwt.verify(token, JWT_SECRET)
   │   // decoded = { userId: "507f1f77...", iat: 1705315200, exp: 1705920000 }
   │
   ├─> Get user from database
   │   const user = await User.findById(decoded.userId)
   │
   ├─> Attach user to request
   │   req.user = user
   │   req.userId = user._id
   │
   ├─> Call next() → Route handler executes
   │
   ├─> Route handler has access to:
   │   • req.user (full user object)
   │   • req.userId (user ID)
   │
   └─> Process request with user context

┌─────────────────────────────────────────────────────────────────────┐
│                      REQUEST AUTHENTICATED ✅                        │
│  • User identified from JWT token                                    │
│  • User data available in route handler                              │
│  • Progress can be tracked                                           │
│  • Proficiency can be updated                                        │
└─────────────────────────────────────────────────────────────────────┘
```

## Logout Flow

```
User clicks "Logout":
   │
   ├─> Frontend:
   │   • localStorage.removeItem('authToken')
   │   • setUser(null)
   │   • setToken(null)
   │   • delete axios.defaults.headers.common['Authorization']
   │
   ├─> Backend (optional):
   │   • POST /api/auth/logout
   │   • Log logout event
   │
   └─> Redirect to homepage (/)

┌─────────────────────────────────────────────────────────────────────┐
│                         LOGGED OUT ✅                                │
│  • Token removed from localStorage                                   │
│  • User state cleared                                                │
│  • Redirected to homepage                                            │
└─────────────────────────────────────────────────────────────────────┘
```

## Error Handling

```
┌─────────────────────────────────────────────────────────────────────┐
│                       ERROR SCENARIOS                                │
└─────────────────────────────────────────────────────────────────────┘

1. Invalid Credentials
   POST /api/auth/login
   → 401 Unauthorized
   { "success": false, "message": "Invalid email or password" }

2. Email Already Exists
   POST /api/auth/register
   → 400 Bad Request
   { "success": false, "message": "User already exists with this email" }

3. Expired Token
   GET /api/auth/profile
   → 401 Unauthorized
   { "success": false, "message": "Invalid or expired token" }
   → Frontend: Clear token, redirect to /login

4. Password Too Short
   POST /api/auth/register
   → 400 Bad Request
   { "success": false, "message": "Password must be at least 6 characters long" }

5. Proficiency Detection Failed (Ollama down)
   → Fallback to rule-based detection
   → Still assigns proficiency level (no error to user)

6. MongoDB Not Running
   → Server shows warning: "Continuing without database"
   → Auth features disabled
   → Chat works in guest mode
```

---

## Quick Reference

### User States
- **Unknown** → New user, < 3 questions asked
- **Beginner** → Score 0-33, basic questions
- **Intermediate** → Score 34-66, applied questions
- **Expert** → Score 67-100, advanced questions

### Reassessment Triggers
- Every 10 questions asked
- Every 30 days since last assessment
- Manual trigger via API

### Token Lifespan
- JWT expires in 7 days
- Refresh by logging in again
- Auto-logout on expiration

### Progress Tracking
- Questions: Incremented with each ask
- Time: Session duration tracked
- Topics: Unique topics array
- Streaks: Reset after 24 hours inactivity
- Points: +1 per question, +5 per daily login, +20 per level up
