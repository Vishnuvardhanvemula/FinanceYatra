# 🧪 Testing Phase 3.1 Authentication

## Prerequisites

### 1. Install MongoDB
```powershell
# Windows (using winget)
winget install MongoDB.Server

# OR download from: https://www.mongodb.com/try/download/community

# Start MongoDB service
net start MongoDB

# OR manually run:
mongod --dbpath="C:\data\db"
```

### 2. Verify MongoDB is Running
```powershell
# Test connection
mongo --eval "db.version()"

# Should show MongoDB version (e.g., 6.0.0)
```

## Quick Test Flow

### Test 1: Registration
```powershell
# Start all services
.\scripts\start-all.ps1

# Open browser: http://localhost:5173

# Click "Get Started" or navigate to /signup
# Fill in:
#   Name: Test User
#   Email: test@example.com
#   Password: test123
#   Confirm Password: test123
#   Language: English

# Click "Sign Up"
# Should redirect to /onboarding
```

**Expected Result**: ✅ User created in MongoDB, JWT token stored in localStorage

### Test 2: Onboarding
```
# After signup, you're on /onboarding page

# Step 1: Welcome message with your name
# Click "Continue"

# Step 2: How It Works (3 steps explanation)
# Click "Next"

# Step 3: You're All Set! (Features list)
# Click "Start Learning"

# Should redirect to /chat
```

**Expected Result**: ✅ Complete 3-step flow, redirected to chat

### Test 3: Chat with Authentication
```
# On /chat page, navbar should show:
# "Hi, Test User" with logout button

# Ask a question: "What is SIP?"
# Wait for response

# Ask more questions (3-5 total):
# - "How does compound interest work?"
# - "What is the difference between FD and RD?"
# - "Explain tax harvesting strategies"

# After 3 questions, AI analyzes proficiency
```

**Expected Result**: 
- ✅ User name displayed in navbar
- ✅ Questions tracked in user profile
- ✅ After 3-5 questions, proficiency level detected
- ✅ Level shown in navbar (beginner/intermediate/expert badge)

### Test 4: Proficiency Detection
```powershell
# Open browser DevTools (F12)
# Go to Application > Local Storage > http://localhost:5173
# Find "authToken" key - copy the JWT token

# Test API directly:
curl -X GET http://localhost:5000/api/auth/profile `
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Should show:
{
  "success": true,
  "data": {
    "name": "Test User",
    "email": "test@example.com",
    "proficiencyLevel": "intermediate",  // Detected!
    "proficiencyScore": 55,
    "totalQuestionsAsked": 5,
    "currentStreak": 1,
    "achievements": ["first_question"],
    "totalPoints": 5
  }
}
```

**Expected Result**: ✅ Proficiency level automatically detected after questions

### Test 5: Logout & Login
```
# Click "Logout" in navbar
# Should redirect to home page (/)

# Click "Sign In"
# Enter:
#   Email: test@example.com
#   Password: test123

# Click "Log In"
# Should redirect to /chat
```

**Expected Result**: 
- ✅ Token cleared on logout
- ✅ Login successful with correct credentials
- ✅ User profile and progress preserved

### Test 6: Guest Mode
```
# On /login page, click "Continue as Guest"
# Should go to /chat

# Navbar shows: "Sign In" / "Get Started" buttons
# Chat works normally
# No progress tracking
```

**Expected Result**: ✅ Chat works without authentication

## Manual Proficiency Assessment

```powershell
# Use API to manually assess proficiency
curl -X POST http://localhost:5000/api/auth/assess-proficiency `
  -H "Authorization: Bearer YOUR_TOKEN" `
  -H "Content-Type: application/json" `
  -d '{
    "questions": [
      "What is EMI?",
      "How do I calculate loan interest?",
      "Explain tax loss harvesting for capital gains"
    ]
  }'

# Response:
{
  "success": true,
  "data": {
    "level": "intermediate",
    "score": 55,
    "reasoning": "User asks basic to intermediate questions..."
  }
}
```

## MongoDB Verification

```powershell
# Connect to MongoDB
mongo

# Switch to database
use financeyatra

# List all users
db.users.find().pretty()

# Check specific user
db.users.findOne({ email: "test@example.com" })

# Should show:
{
  "_id": ObjectId("..."),
  "name": "Test User",
  "email": "test@example.com",
  "password": "$2a$10$...",  // Hashed
  "proficiencyLevel": "intermediate",
  "proficiencyScore": 55,
  "questionsAnalyzed": 5,
  "totalQuestionsAsked": 5,
  "currentStreak": 1,
  "achievements": ["first_question"],
  "totalPoints": 5,
  "createdAt": ISODate("..."),
  "lastLogin": ISODate("...")
}
```

## Common Issues

### Issue 1: MongoDB Not Running
```
Error: MongooseServerSelectionError: connect ECONNREFUSED
```

**Fix**:
```powershell
# Check if MongoDB is running
net start MongoDB

# OR start manually
mongod --dbpath="C:\data\db"
```

### Issue 2: JWT Token Invalid
```
Error: Invalid or expired token
```

**Fix**:
```
1. Clear localStorage in DevTools
2. Log out and log in again
3. Check JWT_SECRET in backend/.env
```

### Issue 3: Proficiency Not Detecting
```
Level stays "unknown" after 5+ questions
```

**Fix**:
```powershell
# Check if Python RAG is running
curl http://localhost:8000/health

# Should return: {"status": "healthy"}

# Check Ollama is running
ollama list

# Should show llama3 model
```

### Issue 4: Password Too Short
```
Error: Password must be at least 6 characters long
```

**Fix**: Use password with minimum 6 characters

## Test API Endpoints

### 1. Register
```powershell
curl -X POST http://localhost:5000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{
    "name": "API Test User",
    "email": "apitest@example.com",
    "password": "test123",
    "preferredLanguage": "en"
  }'
```

### 2. Login
```powershell
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{
    "email": "apitest@example.com",
    "password": "test123"
  }'
```

### 3. Get Profile
```powershell
curl -X GET http://localhost:5000/api/auth/profile `
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 4. Update Profile
```powershell
curl -X PUT http://localhost:5000/api/auth/profile `
  -H "Authorization: Bearer YOUR_TOKEN" `
  -H "Content-Type: application/json" `
  -d '{
    "name": "Updated Name",
    "preferredLanguage": "hi"
  }'
```

### 5. Change Password
```powershell
curl -X POST http://localhost:5000/api/auth/change-password `
  -H "Authorization: Bearer YOUR_TOKEN" `
  -H "Content-Type: application/json" `
  -d '{
    "currentPassword": "test123",
    "newPassword": "newpass123"
  }'
```

## Success Checklist

- [ ] MongoDB running and connected
- [ ] User can register with email/password
- [ ] User receives JWT token
- [ ] Onboarding flow completes successfully
- [ ] User name displayed in navbar
- [ ] User can ask questions in chat
- [ ] After 3-5 questions, proficiency level detected
- [ ] Proficiency badge shown in navbar
- [ ] User can logout successfully
- [ ] User can login with same credentials
- [ ] Progress preserved after logout/login
- [ ] Guest mode works without authentication
- [ ] Profile API returns correct data
- [ ] MongoDB shows user with correct fields

## Performance Benchmarks

**Expected Performance:**
- Registration: < 200ms
- Login: < 150ms
- Profile fetch: < 50ms
- Proficiency detection: 2-5 seconds (Ollama analysis)
- MongoDB query: < 10ms

## Next Steps After Testing

1. **Implement Phase 3.2: Dashboard UI**
   - Visual progress charts
   - Achievements showcase
   - Topic breakdown
   - Learning statistics

2. **Enhance Proficiency Detection**
   - More sophisticated analysis
   - Category-wise proficiency (investment, budgeting, tax)
   - Confidence score

3. **Add More Features**
   - Password reset via email
   - Profile picture upload
   - Notification preferences
   - Data export

---

**All tests passing?** ✅ Phase 3.1 is working perfectly!

**Having issues?** Check [PHASE_3.1_IMPLEMENTATION.md](./PHASE_3.1_IMPLEMENTATION.md) for detailed troubleshooting.
