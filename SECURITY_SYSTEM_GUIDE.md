# Security System Guide - Finance Tutor Application

## Table of Contents
1. [Overview](#overview)
2. [Authentication System](#authentication-system)
3. [Chat History Security](#chat-history-security)
4. [Data Protection Layers](#data-protection-layers)
5. [Security Workflow](#security-workflow)
6. [API Security](#api-security)
7. [Frontend Security](#frontend-security)
8. [Best Practices Implemented](#best-practices-implemented)

---

## Overview

The Finance Tutor application implements a **multi-layered security architecture** to protect user data and ensure privacy. The system follows the principle of **defense in depth**, where multiple independent security measures work together to prevent unauthorized access.

### Core Security Principles

1. **Authentication**: Who you are (verified through JWT tokens)
2. **Authorization**: What you can access (verified through ownership checks)
3. **Isolation**: Your data is separate from others (user-specific storage)
4. **Cleanup**: No data leakage when you logout (automatic session cleanup)

---

## Authentication System

### How JWT (JSON Web Tokens) Works

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   User      │         │   Server    │         │  Database   │
│   Browser   │         │   Backend   │         │   MongoDB   │
└─────────────┘         └─────────────┘         └─────────────┘
      │                        │                        │
      │  1. Login Request      │                        │
      │  (email + password)    │                        │
      ├───────────────────────>│                        │
      │                        │  2. Verify Credentials │
      │                        ├───────────────────────>│
      │                        │<───────────────────────┤
      │                        │  3. User Found         │
      │                        │                        │
      │  4. JWT Token          │                        │
      │  (signed with secret)  │                        │
      │<───────────────────────┤                        │
      │                        │                        │
      │  5. Subsequent Request │                        │
      │  (with token in header)│                        │
      ├───────────────────────>│                        │
      │                        │  6. Verify Token       │
      │                        │  Extract userId        │
      │                        │                        │
      │  7. Protected Data     │                        │
      │<───────────────────────┤                        │
```

### Token Structure

```javascript
// JWT Token contains:
{
  userId: "507f1f77bcf86cd799439011",  // MongoDB User ID
  email: "user@example.com",            // User email
  iat: 1699459200,                      // Issued at (timestamp)
  exp: 1699545600                       // Expires at (timestamp)
}
```

### Authentication Middleware

**File**: `backend/src/middleware/authMiddleware.js`

```javascript
// This middleware runs before every protected route
authenticate = (req, res, next) => {
  // 1. Extract token from Authorization header
  const token = req.headers.authorization?.split(' ')[1];
  
  // 2. Verify token is valid and not expired
  const decoded = jwt.verify(token, JWT_SECRET);
  
  // 3. Attach userId to request for later use
  req.userId = decoded.userId;
  
  // 4. Allow request to continue
  next();
}
```

### What This Protects Against

- ❌ **Unauthorized Access**: No token = no access
- ❌ **Token Tampering**: Modified tokens fail verification
- ❌ **Expired Sessions**: Old tokens are rejected
- ❌ **Impersonation**: Can't fake another user's identity

---

## Chat History Security

### The Problem We Solved

**Before Security Fix**:
```javascript
// ❌ VULNERABLE CODE
const session = await ChatSession.findOne({ sessionId });
// Any user with a sessionId could access ANY conversation!
```

**After Security Fix**:
```javascript
// ✅ SECURE CODE
const session = await ChatSession.findOne({ 
  sessionId, 
  userId: req.userId  // Only returns if YOU own this session
});
```

### Complete Security Implementation

#### 1. Database Level Security

**ChatSession Model** - Each session is linked to its owner:

```javascript
{
  sessionId: "abc123",              // Unique session identifier
  userId: "507f1f77bcf86cd799439011", // Owner's user ID
  title: "Personal Finance Questions",
  messages: [...],                  // Chat history
  createdAt: "2024-01-15T10:30:00Z"
}
```

#### 2. API Level Security

**All Chat Operations Verify Ownership**:

```javascript
// Creating a new session
router.post('/sessions', authenticate, async (req, res) => {
  const session = new ChatSession({
    sessionId: generateId(),
    userId: req.userId,  // ✅ Attach to authenticated user
    messages: []
  });
});

// Loading a session
router.get('/sessions/:sessionId', authenticate, async (req, res) => {
  const session = await ChatSession.findOne({
    sessionId: req.params.sessionId,
    userId: req.userId  // ✅ Only find if you own it
  });
  
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }
});

// Getting history
router.get('/history/:sessionId', authenticate, async (req, res) => {
  const session = await ChatSession.findOne({
    sessionId: req.params.sessionId,
    userId: req.userId  // ✅ Ownership verification
  });
  
  if (!session) {
    // Security: Don't reveal if session exists
    return res.status(404).json({ error: 'Session not found' });
  }
});

// Deleting a session
router.delete('/sessions/:sessionId', authenticate, async (req, res) => {
  const result = await ChatSession.deleteOne({
    sessionId: req.params.sessionId,
    userId: req.userId  // ✅ Can only delete your own
  });
});
```

#### 3. Frontend Security

**User-Specific Session Storage**:

```javascript
// ❌ OLD: Single key for everyone
localStorage.setItem('chatSessionId', 'abc123');

// ✅ NEW: Each user has their own key
localStorage.setItem('chatSessionId_507f1f77bcf86cd799439011', 'abc123');
localStorage.setItem('chatSessionId_608e2b4af8c37d1234567890', 'xyz789');
```

**Authentication Headers on Every Request**:

```javascript
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`  // ✅ Always include token
  };
};

// All API calls include authentication
fetch('/api/chat/history/abc123', {
  headers: getAuthHeaders()  // ✅ Token sent with every request
});
```

**Automatic Cleanup on Logout**:

```javascript
const logout = () => {
  const userId = user?._id;
  
  // Clear authentication token
  localStorage.removeItem('token');
  
  // Clear user-specific chat session
  if (userId) {
    localStorage.removeItem(`chatSessionId_${userId}`);
  }
  
  // Clear user data from memory
  setUser(null);
};
```

---

## Data Protection Layers

### Layer 1: Network Level
- **HTTPS**: All data encrypted in transit (in production)
- **CORS**: Only allowed origins can make requests
- **Headers**: Security headers prevent common attacks

### Layer 2: Authentication Level
- **JWT Tokens**: Cryptographically signed, can't be forged
- **Token Expiration**: Tokens expire after 7 days
- **Middleware**: All protected routes verify token first

### Layer 3: Authorization Level
- **Ownership Checks**: Every operation verifies you own the data
- **User Isolation**: Database queries filter by userId
- **404 Responses**: Don't reveal if other users' data exists

### Layer 4: Application Level
- **Input Validation**: Sanitize all user inputs
- **Error Handling**: Don't leak sensitive information in errors
- **Logging**: Security-relevant events are logged

### Layer 5: Data Level
- **Password Hashing**: bcrypt with salt, never store plain passwords
- **User Isolation**: Each user's data is separate in database
- **Session Cleanup**: Data removed when no longer needed

---

## Security Workflow

### Complete User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER REGISTRATION                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Password Hashed │
                    │  (bcrypt + salt)│
                    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  User Created   │
                    │   in Database   │
                    └─────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                            USER LOGIN                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Verify Password │
                    │  (bcrypt check) │
                    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Generate JWT   │
                    │  (sign + expire)│
                    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Store Token    │
                    │  in localStorage│
                    └─────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        CHAT SESSION START                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Extract userId │
                    │   from JWT      │
                    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Create Session  │
                    │ sessionId +     │
                    │ userId          │
                    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Store sessionId │
                    │ chatSessionId_  │
                    │ {userId}        │
                    └─────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                       SEND CHAT MESSAGE                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Verify JWT     │
                    │  (authenticate) │
                    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Check Session  │
                    │  Ownership      │
                    │  (userId match) │
                    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Save Message   │
                    │  to User's      │
                    │  Session        │
                    └─────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                          USER LOGOUT                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Remove Token   │
                    │  from localStorage│
                    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Clear Session  │
                    │  chatSessionId_ │
                    │  {userId}       │
                    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Clear User     │
                    │  from Memory    │
                    └─────────────────┘
```

---

## API Security

### Protected Endpoints

All chat endpoints require authentication:

| Endpoint | Method | Protection | What It Does |
|----------|--------|------------|--------------|
| `/api/chat/sessions` | POST | `authenticate` | Create new chat session (with userId) |
| `/api/chat/sessions` | GET | `authenticate` | List user's sessions only |
| `/api/chat/sessions/:id` | GET | `authenticate` + ownership | Load specific session if you own it |
| `/api/chat/history/:id` | GET | `authenticate` + ownership | Get messages if you own session |
| `/api/chat/sessions/:id` | DELETE | `authenticate` + ownership | Delete session if you own it |
| `/api/chat` | POST | `authenticate` + ownership | Send message to your session |

### Request Flow Example

**Sending a Chat Message**:

```
1. User Types Message
   └─> Frontend: ChatPage.jsx
       │
       │  const token = localStorage.getItem('token');
       │  const sessionId = localStorage.getItem(`chatSessionId_${userId}`);
       │
       └─> API Call: POST /api/chat
           Headers: { Authorization: "Bearer eyJhbGc..." }
           Body: { message, sessionId, userId }
                 │
                 ▼
2. Backend Receives Request
   └─> Middleware: authenticate
       │  - Verify token signature
       │  - Check token not expired
       │  - Extract userId from token
       │  - Attach to req.userId
       │
       └─> Route Handler: chatRoutes.js
           │  - Find session: { sessionId, userId: req.userId }
           │  - If not found: 404 error
           │  - If found: Process message
           │
           └─> AI Processing
               │  - Generate response
               │  - Save both messages
               │
               └─> Response to User
                   { userMessage, aiResponse }
```

---

## Frontend Security

### Authentication Context

**File**: `src/contexts/AuthContext.jsx`

The AuthContext manages authentication state across the entire application:

```javascript
const AuthContext = {
  // State
  user: null,              // Current logged-in user
  loading: true,           // Loading authentication state
  
  // Functions
  login: (email, password) => {
    // 1. Send credentials to backend
    // 2. Receive JWT token
    // 3. Store token in localStorage
    // 4. Store user data in state
  },
  
  logout: () => {
    // 1. Remove token from localStorage
    // 2. Clear user-specific chat session
    // 3. Clear user from state
    // 4. Redirect to login
  },
  
  checkAuth: () => {
    // 1. Check if token exists
    // 2. Verify token with backend
    // 3. Load user data if valid
    // 4. Remove token if invalid
  }
};
```

### Protected Routes

**File**: `src/App.jsx`

```javascript
// Only accessible when logged in
<Route path="/chat" element={
  <ProtectedRoute>
    <ChatPage />
  </ProtectedRoute>
} />

// ProtectedRoute component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  
  // Not logged in? Redirect to login page
  if (!user) return <Navigate to="/login" />;
  
  // Logged in? Show the page
  return children;
}
```

### Local Storage Security

**What We Store**:
```javascript
localStorage = {
  'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  'chatSessionId_507f1f77bcf86cd799439011': 'session-abc-123',
  'chatSessionId_608e2b4af8c37d1234567890': 'session-xyz-789'
};
```

**Security Measures**:
- ✅ **User-Specific Keys**: Each user has their own session key
- ✅ **Automatic Cleanup**: Removed on logout
- ✅ **Token Expiration**: JWT expires after 7 days
- ✅ **No Sensitive Data**: Only IDs, no passwords or personal info

---

## Best Practices Implemented

### 1. Never Trust the Client

```javascript
// ❌ BAD: Trusting client-sent userId
router.post('/chat', async (req, res) => {
  const { userId, message } = req.body;  // User could send ANY userId!
  // ...
});

// ✅ GOOD: Using authenticated userId
router.post('/chat', authenticate, async (req, res) => {
  const userId = req.userId;  // From verified JWT token
  const { message } = req.body;
  // ...
});
```

### 2. Verify Ownership on Every Operation

```javascript
// Every database query includes userId
const session = await ChatSession.findOne({
  sessionId: req.params.sessionId,
  userId: req.userId  // ✅ Always verify ownership
});
```

### 3. Don't Leak Information

```javascript
// ❌ BAD: Revealing if session exists
if (!session) {
  return res.status(403).json({ 
    error: 'This session belongs to another user' 
  });
}

// ✅ GOOD: Generic response
if (!session) {
  return res.status(404).json({ 
    error: 'Session not found' 
  });
}
```

### 4. Secure Password Handling

```javascript
// ✅ Passwords are hashed with bcrypt
const hashedPassword = await bcrypt.hash(password, 10);

// ✅ Compare hashed passwords
const isValid = await bcrypt.compare(password, user.password);

// ❌ NEVER store or log plain passwords
```

### 5. Token Security

```javascript
// ✅ Tokens expire
const token = jwt.sign(
  { userId, email },
  JWT_SECRET,
  { expiresIn: '7d' }  // Auto-expire after 7 days
);

// ✅ Tokens are signed (can't be forged)
// ✅ Secret key is in environment variables (not in code)
```

### 6. Input Validation

```javascript
// ✅ Validate all inputs
if (!message || typeof message !== 'string') {
  return res.status(400).json({ error: 'Invalid message' });
}

// ✅ Sanitize inputs to prevent injection
const sanitizedMessage = message.trim().substring(0, 5000);
```

### 7. Error Handling

```javascript
try {
  // ... operation
} catch (error) {
  console.error('Error:', error);  // Log full error for debugging
  
  // ❌ DON'T send full error to client
  // res.status(500).json({ error: error.message });
  
  // ✅ Send generic error to client
  res.status(500).json({ error: 'An error occurred' });
}
```

---

## Security Guarantees

### ✅ What Our System Prevents

1. **Unauthorized Access**
   - No access without valid JWT token
   - Expired tokens are rejected
   - Invalid tokens are rejected

2. **Data Isolation**
   - Users can only see their own data
   - Database queries filter by userId
   - Frontend storage is user-specific

3. **Session Hijacking**
   - Can't access sessions you don't own
   - Ownership verified on every operation
   - Generic 404 if session doesn't belong to you

4. **Cross-User Data Leakage**
   - User-specific localStorage keys
   - Automatic cleanup on logout
   - No shared state between users

5. **Token Forgery**
   - JWT tokens are cryptographically signed
   - Tampering invalidates the token
   - Secret key never exposed to client

6. **Password Security**
   - Passwords hashed with bcrypt + salt
   - Never stored or transmitted in plain text
   - Can't reverse hash to get password

---

## Testing Security

### Manual Security Tests

**Test 1: Session Isolation**
```bash
# 1. Login as User A
# 2. Create a chat session
# 3. Note the sessionId
# 4. Logout
# 5. Login as User B
# 6. Try to access User A's sessionId
# Result: Should get 404 error
```

**Test 2: Token Expiration**
```bash
# 1. Login and get token
# 2. Wait 7 days (or modify token expiry for testing)
# 3. Try to access protected route
# Result: Should get 401 Unauthorized
```

**Test 3: Token Tampering**
```bash
# 1. Login and get token
# 2. Modify the token payload (change userId)
# 3. Try to access protected route
# Result: Should get 401 Unauthorized (signature invalid)
```

**Test 4: Logout Cleanup**
```bash
# 1. Login and create chat session
# 2. Check localStorage (token + sessionId present)
# 3. Logout
# 4. Check localStorage again
# Result: Token and user-specific sessionId should be gone
```

---

## Summary

The Finance Tutor security system implements **defense in depth** with multiple layers:

1. **Authentication** (JWT tokens) - Verify who you are
2. **Authorization** (Ownership checks) - Verify what you can access
3. **Isolation** (User-specific keys) - Keep data separate
4. **Cleanup** (Logout procedures) - Remove data when done

Every request goes through:
1. Token verification (middleware)
2. Ownership verification (database query)
3. Operation execution (only if authorized)

This ensures **complete privacy and security** of user data, with no possibility of cross-user access.

---

## Related Documentation

- `CHAT_SECURITY_IMPLEMENTATION.md` - Detailed security vulnerability fix documentation
- `backend/src/middleware/authMiddleware.js` - Authentication implementation
- `backend/src/routes/chatRoutes.js` - Secure chat endpoints
- `src/contexts/AuthContext.jsx` - Frontend authentication management
- `src/services/chatService.js` - Secure chat API communication

---

**Last Updated**: November 8, 2025  
**Version**: 1.0  
**Status**: Complete Implementation ✅
