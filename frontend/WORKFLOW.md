# 🔄 FinanceYatra - Complete System Workflow

This document explains the complete workflow of FinanceYatra from when a user speaks/types a question to when they receive and hear the response.

---

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [Complete User Journey](#complete-user-journey)
3. [Voice Input Workflow](#voice-input-workflow)
4. [Text Input Workflow](#text-input-workflow)
5. [Backend Processing Workflow](#backend-processing-workflow)
6. [RAG System Workflow](#rag-system-workflow)
7. [Translation Workflow](#translation-workflow)
8. [Text-to-Speech Workflow](#text-to-speech-workflow)
9. [Error Handling Workflow](#error-handling-workflow)
10. [Data Flow Diagram](#data-flow-diagram)

---

## 🎯 System Overview

FinanceYatra is a 3-tier multilingual voice-enabled RAG chatbot:

```
┌─────────────────────────────────────────────────────────────┐
│  TIER 1: Frontend (React + Vite)                            │
│  - User Interface                                            │
│  - Voice Input (Web Speech API)                              │
│  - Text-to-Speech Playback                                   │
│  - Language Selection                                        │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/REST API
┌─────────────────────────────────────────────────────────────┐
│  TIER 2: Backend (Node.js + Express)                        │
│  - API Gateway                                               │
│  - Session Management                                        │
│  - TTS Service (Google TTS Proxy)                           │
│  - Translation Fallback                                      │
│  - Request Routing                                           │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/REST API
┌─────────────────────────────────────────────────────────────┐
│  TIER 3: Python RAG System (FastAPI + LangChain)            │
│  - RAG Pipeline                                              │
│  - Vector Search (ChromaDB)                                  │
│  - LLM Integration (Ollama)                                  │
│  - Semantic Retrieval                                        │
│  - Translation (Deep Translator)                             │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│  Ollama Server (localhost:11434)                            │
│  - llama3 Model (4.7GB)                                      │
│  - Local LLM Inference                                       │
└─────────────────────────────────────────────────────────────┘
```

**Ports:**
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Python RAG: `http://localhost:8000`
- Ollama: `http://localhost:11434`

---

## 🚀 Complete User Journey

### Step-by-Step Flow (Example: Telugu User Asking About SIP)

```
1. USER OPENS APP
   └─> Browser loads: http://localhost:5173
   └─> React app initializes
   └─> Language selector shows 11 languages

2. USER SELECTS LANGUAGE
   └─> Clicks dropdown: "తెలుగు (Telugu)"
   └─> Frontend stores: selectedLanguage = "te"
   └─> State updated in ChatPage.jsx

3. USER CLICKS MICROPHONE 🎤
   └─> MessageInput.jsx: handleVoiceInput()
   └─> Checks browser support for Web Speech API
   └─> Requests microphone permission
   └─> Microphone icon turns RED (recording)

4. USER SPEAKS: "SIP అంటే ఏమిటి?"
   └─> Web Speech API listens (lang: te-IN)
   └─> Converts speech to text
   └─> onResult event fires with transcript
   └─> MessageInput displays: "SIP అంటే ఏమిటి?"
   └─> Microphone icon turns GRAY (stopped)

5. USER PRESSES SEND
   └─> ChatPage.jsx: handleSendMessage()
   └─> Creates message object:
       {
         message: "SIP అంటే ఏమిటి?",
         language: "te",
         sessionId: "uuid-1234"
       }
   └─> Adds user message to chat UI
   └─> Shows loading indicator: "AI is thinking..."

6. FRONTEND SENDS REQUEST
   └─> chatService.js: sendMessage()
   └─> POST http://localhost:5000/api/chat/message
   └─> Headers: Content-Type: application/json
   └─> Body: { message, language, sessionId }

7. BACKEND RECEIVES REQUEST
   └─> server.js: Express receives POST
   └─> Routes to: chatRoutes.js
   └─> Middleware: body parser, CORS
   └─> Extracts: message, language, sessionId

8. BACKEND CALLS PYTHON RAG
   └─> pythonRagService.js: sendToPythonRAG()
   └─> POST http://localhost:8000/query
   └─> Body:
       {
         query: "SIP అంటే ఏమిటి?",
         language: "te",
         session_id: "uuid-1234"
       }

9. PYTHON RAG RECEIVES REQUEST
   └─> app.py: FastAPI receives POST /query
   └─> Extracts: query, language, session_id
   └─> Calls: rag_pipeline.py: process_query()

10. TRANSLATION (Query → English)
    └─> translation_service.py: translate_text()
    └─> Detects source language: Telugu
    └─> Uses Deep Translator (Google Translate)
    └─> Translates: "SIP అంటే ఏమిటి?" → "What is SIP?"
    └─> Stores: english_query = "What is SIP?"

11. VECTOR SEARCH
    └─> vector_store.py: search_documents()
    └─> Generates query embedding (384-dim)
    └─> Searches ChromaDB for similar documents
    └─> Retrieves top 3 relevant chunks:
        [
          "SIP stands for Systematic Investment Plan...",
          "Benefits of SIP include rupee cost averaging...",
          "You can start SIP with as little as ₹500..."
        ]

12. CONTEXT PREPARATION
    └─> rag_pipeline.py: prepare_context()
    └─> Combines retrieved documents
    └─> Adds metadata (source, relevance score)
    └─> Context ready for LLM

13. LLM GENERATION
    └─> llm_handler.py: generate_response()
    └─> Calls Ollama: POST http://localhost:11434/api/generate
    └─> Model: llama3
    └─> Prompt template:
        """
        Context: {retrieved_documents}
        Question: What is SIP?
        Answer based on the context provided.
        """
    └─> Ollama generates response (English)
    └─> Response: "SIP (Systematic Investment Plan) is a method 
                   of investing in mutual funds..."

14. TRANSLATION (Response → Telugu)
    └─> translation_service.py: translate_text()
    └─> Translates English response → Telugu
    └─> Handles long text (chunking if needed)
    └─> Telugu response ready:
        "SIP (సిస్టమాటిక్ ఇన్వెస్ట్‌మెంట్ ప్లాన్) మ్యూచువల్ 
         ఫండ్స్‌లో పెట్టుబడి పెట్టే పద్ధతి..."

15. PYTHON RAG RETURNS RESPONSE
    └─> app.py: Returns JSON response
    └─> Status: 200 OK
    └─> Body:
        {
          "response": "SIP (సిస్టమాటిక్...",
          "session_id": "uuid-1234",
          "language": "te",
          "sources": ["financial_basics.txt"]
        }

16. BACKEND RECEIVES RAG RESPONSE
    └─> pythonRagService.js: receives response
    └─> Validates response structure
    └─> Returns to chatRoutes.js

17. BACKEND RETURNS TO FRONTEND
    └─> chatRoutes.js: res.json()
    └─> Status: 200 OK
    └─> Body:
        {
          "message": "SIP (సిస్టమాటిక్...",
          "sessionId": "uuid-1234"
        }

18. FRONTEND RECEIVES RESPONSE
    └─> chatService.js: receives response
    └─> ChatPage.jsx: updates messages state
    └─> Removes loading indicator
    └─> Displays AI message in chat UI

19. AUTO-SPEAK (if enabled)
    └─> MessageList.jsx: useEffect watches new messages
    └─> Checks: autoSpeak === true
    └─> If true: calls speakMessage()
    └─> If false: shows speaker icon 🔊

20. USER CLICKS SPEAKER ICON 🔊
    └─> MessageList.jsx: speakMessage()
    └─> Checks language: "te" (Telugu)
    └─> Routes to: speakWithGoogleTTS()

21. TEXT-TO-SPEECH PREPARATION
    └─> splitIntoChunks(): splits text into sentences
    └─> Pattern: /[^।.!?]+[।.!?]+/g
    └─> Chunks (max 200 chars each):
        [
          "SIP (సిస్టమాటిక్ ఇన్వెస్ట్‌మెంట్ ప్లాన్) మ్యూచువల్ ఫండ్స్‌లో పెట్టుబడి పెట్టే పద్ధతి।",
          "మీరు ప్రతి నెల నిర్ణీత మొత్తాన్ని పెట్టుబడి పెడతారు।",
          ...
        ]

22. TTS REQUEST TO BACKEND
    └─> For each chunk:
    └─> POST http://localhost:5000/api/tts/speak
    └─> Body:
        {
          text: "SIP (సిస్టమాటిక్...",
          language: "te"
        }

23. BACKEND TTS SERVICE
    └─> ttsRoutes.js: receives POST /speak
    └─> ttsService.js: getAudio()
    └─> Validates language support (11 languages)
    └─> Calls: fetchAudioChunk()

24. GOOGLE TTS API CALL
    └─> ttsService.js: fetchAudioChunk()
    └─> GET https://translate.google.com/translate_tts
    └─> Params:
        - ie=UTF-8
        - tl=te (Telugu)
        - client=tw-ob
        - q={encoded_text}
    └─> Headers:
        - User-Agent: Mozilla/5.0...
        - Referer: https://translate.google.com
    └─> Receives: audio/mpeg buffer

25. BACKEND RETURNS AUDIO
    └─> ttsRoutes.js: res.send(audioBuffer)
    └─> Headers:
        - Content-Type: audio/mpeg
        - Cache-Control: public, max-age=3600

26. FRONTEND RECEIVES AUDIO
    └─> MessageList.jsx: playChunksSequentially()
    └─> For each chunk:
        - Creates Blob from audio buffer
        - Creates object URL
        - Creates Audio element
        - Plays audio
        - Waits for "ended" event
        - Cleans up object URL
        - Moves to next chunk

27. USER HEARS RESPONSE
    └─> Browser plays Telugu audio
    └─> Speaker icon pulses (speaking indicator)
    └─> Plays all chunks sequentially
    └─> Speaker icon returns to normal
    └─> User can click again to replay

WORKFLOW COMPLETE ✅
```

---

## 🎤 Voice Input Workflow

**File:** `src/components/MessageInput.jsx`

```
┌─────────────────────────────────────────────────────────────┐
│  1. USER CLICKS MICROPHONE ICON                              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  2. handleVoiceInput() Function                              │
│     - Checks: isListening state                              │
│     - If false: Start recording                              │
│     - If true: Stop recording                                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  3. Web Speech API Initialization (useEffect)                │
│     - Check: 'webkitSpeechRecognition' in window            │
│     - Create: new webkitSpeechRecognition()                  │
│     - Set: continuous = false (single utterance)             │
│     - Set: interimResults = false (final only)               │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  4. Language Mapping                                         │
│     Selected Language → Speech API Code                      │
│     - en → en-US                                             │
│     - te → te-IN                                             │
│     - hi → hi-IN                                             │
│     - ta → ta-IN                                             │
│     - bn → bn-IN                                             │
│     - kn → kn-IN                                             │
│     - ml → ml-IN                                             │
│     - mr → mr-IN                                             │
│     - gu → gu-IN                                             │
│     - pa → pa-IN                                             │
│     - or → or-IN                                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  5. Start Recording                                          │
│     - recognition.lang = 'te-IN'                             │
│     - recognition.start()                                    │
│     - Update UI: Microphone icon → RED + pulsing             │
│     - setIsListening(true)                                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  6. User Speaks                                              │
│     - Microphone captures audio                              │
│     - Browser sends to Speech Recognition Service            │
│     - Real-time processing                                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  7. Speech Recognition Result                                │
│     - onresult event fires                                   │
│     - Extract: event.results[0][0].transcript                │
│     - Confidence: event.results[0][0].confidence             │
│     - Example: "SIP అంటే ఏమిటి?" (confidence: 0.95)         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  8. Update Input Field                                       │
│     - setMessage(transcript)                                 │
│     - Text appears in input box                              │
│     - User can edit if needed                                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  9. Stop Recording                                           │
│     - recognition.stop()                                     │
│     - Update UI: Microphone icon → GRAY (normal)             │
│     - setIsListening(false)                                  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  10. Ready to Send                                           │
│      - User clicks Send button                               │
│      - OR presses Enter                                      │
│      - Proceeds to Backend Processing                        │
└─────────────────────────────────────────────────────────────┘
```

**Error Handling:**
- `onerror`: Network issues, no speech detected, not allowed
- `onend`: Automatic stop, UI reset
- Browser compatibility check: Chrome/Edge recommended

---

## ⌨️ Text Input Workflow

**File:** `src/components/MessageInput.jsx`

```
┌─────────────────────────────────────────────────────────────┐
│  1. USER TYPES MESSAGE                                       │
│     - Input field: controlled component                      │
│     - onChange: setMessage(e.target.value)                   │
│     - Real-time state update                                 │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  2. USER PRESSES SEND                                        │
│     - Option A: Click Send button                            │
│     - Option B: Press Enter key (onKeyPress)                 │
│     - Triggers: onSendMessage() callback                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  3. VALIDATION                                               │
│     - Check: message.trim() !== ''                           │
│     - If empty: Do nothing                                   │
│     - If valid: Proceed                                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  4. SEND TO PARENT                                           │
│     - onSendMessage(message) → ChatPage.jsx                  │
│     - Clear input: setMessage('')                            │
│     - Reset focus: input.focus()                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Backend Processing Workflow

**File:** `backend/src/routes/chatRoutes.js`

```
┌─────────────────────────────────────────────────────────────┐
│  1. REQUEST ARRIVES                                          │
│     POST /api/chat/message                                   │
│     Headers: Content-Type: application/json                  │
│     Body: { message, language, sessionId }                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  2. MIDDLEWARE CHAIN                                         │
│     - CORS: Validates origin (localhost:5173)                │
│     - Body Parser: Parses JSON                               │
│     - Logging: Logs request details                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  3. ROUTE HANDLER                                            │
│     - Extract: req.body (message, language, sessionId)       │
│     - Validate: All required fields present                  │
│     - If missing: Return 400 Bad Request                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  4. SESSION MANAGEMENT                                       │
│     - Check: sessionId exists                                │
│     - If new: Create session in data/sessions/{id}.json      │
│     - Load: Previous conversation history                    │
│     - Store: User message in history                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  5. CHECK PYTHON RAG AVAILABILITY                            │
│     - Read: process.env.USE_PYTHON_RAG                       │
│     - If 'true': Call Python RAG Service                     │
│     - If 'false': Use direct Ollama (deprecated)             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  6. CALL PYTHON RAG SERVICE                                  │
│     pythonRagService.js: sendToPythonRAG()                   │
│     - URL: http://localhost:8000/query                       │
│     - Method: POST                                           │
│     - Body: { query, language, session_id, history }         │
│     - Timeout: 30 seconds                                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  7. ERROR HANDLING                                           │
│     - Try/Catch block                                        │
│     - Network errors: Fallback to mock response              │
│     - Timeout errors: Return helpful message                 │
│     - Invalid response: Log and return error                 │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  8. RESPONSE PROCESSING                                      │
│     - Extract: response.data.response                        │
│     - Validate: Response is string                           │
│     - Store: AI message in session history                   │
│     - Update: Session file                                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  9. RETURN TO FRONTEND                                       │
│     - Status: 200 OK                                         │
│     - Body: { message, sessionId }                           │
│     - Headers: Content-Type: application/json                │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧠 RAG System Workflow

**File:** `rag_system/rag_pipeline.py`

```
┌─────────────────────────────────────────────────────────────┐
│  1. QUERY ARRIVES                                            │
│     POST /query                                              │
│     Body: { query, language, session_id }                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  2. QUERY PREPROCESSING                                      │
│     - Clean: Remove extra whitespace                         │
│     - Validate: Not empty                                    │
│     - Log: Query details                                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  3. LANGUAGE DETECTION                                       │
│     translation_service.py: detect_language()                │
│     - Detects: Source language                               │
│     - Example: "SIP అంటే ఏమిటి?" → "te" (Telugu)           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  4. TRANSLATION TO ENGLISH                                   │
│     translation_service.py: translate_text()                 │
│     - Library: Deep Translator (Google Translate)            │
│     - From: Telugu (te)                                      │
│     - To: English (en)                                       │
│     - Result: "What is SIP?"                                 │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  5. QUERY EMBEDDING                                          │
│     embeddings_handler.py: generate_embedding()              │
│     - Model: paraphrase-multilingual-MiniLM-L12-v2           │
│     - Dimension: 384                                         │
│     - Input: "What is SIP?"                                  │
│     - Output: [0.12, -0.34, 0.56, ..., 0.78] (384 values)   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  6. VECTOR SEARCH                                            │
│     vector_store.py: search_documents()                      │
│     - Database: ChromaDB (persistent)                        │
│     - Collection: financial_docs                             │
│     - Query: Embedding vector                                │
│     - Method: Cosine similarity                              │
│     - Top K: 3 documents                                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  7. RETRIEVE RELEVANT DOCUMENTS                              │
│     Results: [                                               │
│       {                                                      │
│         text: "SIP stands for Systematic Investment Plan...",│
│         metadata: { source: "financial_basics.txt" },        │
│         distance: 0.15 (very relevant)                       │
│       },                                                     │
│       {                                                      │
│         text: "Benefits of SIP include...",                  │
│         metadata: { source: "sip_guide.txt" },               │
│         distance: 0.23                                       │
│       },                                                     │
│       {                                                      │
│         text: "You can start SIP with ₹500...",             │
│         metadata: { source: "investment_tips.txt" },         │
│         distance: 0.31                                       │
│       }                                                      │
│     ]                                                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  8. CONTEXT PREPARATION                                      │
│     - Combine: Retrieved documents                           │
│     - Format: Context string                                 │
│     - Add: Source citations                                  │
│     - Limit: 2000 tokens max                                 │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  9. PROMPT CONSTRUCTION                                      │
│     Template:                                                │
│     """                                                      │
│     You are a helpful financial advisor.                     │
│                                                              │
│     Context from knowledge base:                             │
│     {retrieved_documents}                                    │
│                                                              │
│     User Question: What is SIP?                              │
│                                                              │
│     Please answer based on the context provided.             │
│     Be clear, concise, and helpful.                          │
│     """                                                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  10. LLM CALL                                                │
│      llm_handler.py: generate_response()                     │
│      - URL: http://localhost:11434/api/generate              │
│      - Model: llama3                                         │
│      - Prompt: Constructed prompt                            │
│      - Temperature: 0.7                                      │
│      - Max tokens: 500                                       │
│      - Stream: false                                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  11. OLLAMA GENERATES RESPONSE                               │
│      - Processing time: 2-5 seconds                          │
│      - Response (English):                                   │
│        "SIP (Systematic Investment Plan) is a method of      │
│         investing in mutual funds where you invest a fixed   │
│         amount regularly. It helps with rupee cost averaging │
│         and disciplined investing. You can start with as     │
│         little as ₹500 per month."                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  12. TRANSLATION TO TARGET LANGUAGE                          │
│      translation_service.py: translate_text()                │
│      - From: English (en)                                    │
│      - To: Telugu (te)                                       │
│      - Method: Deep Translator                               │
│      - Handles: Long text (chunking if needed)               │
│      - Result: Telugu response                               │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  13. RESPONSE FORMATTING                                     │
│      - Add: Source citations                                 │
│      - Add: Confidence score                                 │
│      - Format: JSON response                                 │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  14. RETURN TO BACKEND                                       │
│      - Status: 200 OK                                        │
│      - Body: {                                               │
│          response: "SIP (సిస్టమాటిక్...",                   │
│          session_id: "uuid-1234",                            │
│          language: "te",                                     │
│          sources: ["financial_basics.txt", "sip_guide.txt"]  │
│        }                                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🌐 Translation Workflow

**File:** `rag_system/translation_service.py`

```
┌─────────────────────────────────────────────────────────────┐
│  1. TRANSLATION REQUEST                                      │
│     - Input: Text to translate                               │
│     - Source language: Auto-detect or specified              │
│     - Target language: Specified                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  2. TEXT LENGTH CHECK                                        │
│     - If length <= 5000 chars: Single translation            │
│     - If length > 5000 chars: Chunking required              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  3. CHUNKING (if needed)                                     │
│     - Split by: Sentences (।, ., !, ?)                       │
│     - Max chunk size: 4500 chars                             │
│     - Preserve: Sentence boundaries                          │
│     - Example: [chunk1, chunk2, chunk3]                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  4. DEEP TRANSLATOR CALL                                     │
│     - Library: deep-translator                               │
│     - Provider: Google Translate                             │
│     - Free tier: No API key required                         │
│     - Rate limit: Handled with retry                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  5. TRANSLATION PROCESSING                                   │
│     For each chunk:                                          │
│     - GoogleTranslator(source='te', target='en')             │
│     - .translate(text)                                       │
│     - Wait: 0.5s between requests (rate limiting)            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  6. ERROR HANDLING                                           │
│     - Timeout: Retry up to 3 times                           │
│     - Rate limit: Exponential backoff                        │
│     - Invalid language: Return original text                 │
│     - Network error: Log and raise exception                 │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  7. COMBINE CHUNKS                                           │
│     - Join: Translated chunks                                │
│     - Preserve: Spacing and punctuation                      │
│     - Clean: Remove extra whitespace                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  8. RETURN TRANSLATED TEXT                                   │
│     - Complete translated string                             │
│     - Same length (approximately)                            │
│     - Maintains meaning and context                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔊 Text-to-Speech Workflow

**Files:** 
- Frontend: `src/components/MessageList.jsx`
- Backend: `backend/src/services/ttsService.js`

```
┌─────────────────────────────────────────────────────────────┐
│  1. USER CLICKS SPEAKER ICON 🔊                              │
│     - MessageList.jsx: speakMessage(message, language)       │
│     - Message: Telugu text                                   │
│     - Language: "te"                                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  2. LANGUAGE CHECK                                           │
│     - If English: Use Web Speech API (local)                 │
│     - If Other: Use Google TTS via backend proxy             │
│     - Telugu → Backend proxy                                 │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  3. TEXT CHUNKING (Frontend)                                 │
│     splitIntoChunks(text):                                   │
│     - Pattern: /[^।.!?]+[।.!?]+/g                            │
│     - Splits by: Telugu (।) and English (.) punctuation      │
│     - Max: 200 chars per chunk (Google TTS limit)            │
│     - Fallback: Split by words if no sentences               │
│     Result: ["chunk1", "chunk2", "chunk3"]                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  4. SEQUENTIAL PLAYBACK STARTS                               │
│     playChunksSequentially(chunks):                          │
│     - Loop: For each chunk                                   │
│     - Async: Wait for each to finish before next             │
│     - Update UI: Speaking state, icon pulsing                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  5. TTS REQUEST (Per Chunk)                                  │
│     Frontend → Backend                                       │
│     POST http://localhost:5000/api/tts/speak                 │
│     Body: { text: "chunk1", language: "te" }                 │
│     Headers: Content-Type: application/json                  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  6. BACKEND TTS SERVICE                                      │
│     ttsRoutes.js receives request:                           │
│     - Validate: text and language                            │
│     - Check: Language support (11 languages)                 │
│     - Call: ttsService.getAudio(text, language)              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  7. GOOGLE TTS API CALL                                      │
│     ttsService.js: fetchAudioChunk()                         │
│     GET https://translate.google.com/translate_tts           │
│     Params:                                                  │
│     - ie=UTF-8                                               │
│     - tl=te (Telugu)                                         │
│     - client=tw-ob                                           │
│     - q={url_encoded_text}                                   │
│     Headers:                                                 │
│     - User-Agent: Mozilla/5.0...                             │
│     - Referer: https://translate.google.com                  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  8. AUDIO BUFFER RECEIVED                                    │
│     - Content-Type: audio/mpeg                               │
│     - Format: MP3                                            │
│     - Size: ~10-50 KB per chunk                              │
│     - Quality: High (native Telugu pronunciation)            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  9. BACKEND RETURNS AUDIO                                    │
│     - Status: 200 OK                                         │
│     - Body: Audio buffer (binary)                            │
│     - Headers:                                               │
│       * Content-Type: audio/mpeg                             │
│       * Cache-Control: public, max-age=3600                  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  10. FRONTEND RECEIVES AUDIO                                 │
│      - Convert: arrayBuffer to Blob                          │
│      - Create: Object URL                                    │
│      - Create: new Audio(objectURL)                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  11. PLAY AUDIO                                              │
│      - audio.play()                                          │
│      - Update UI: Speaker icon pulsing                       │
│      - Log: "Playing chunk 1/3"                              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  12. WAIT FOR COMPLETION                                     │
│      - Listen: 'ended' event                                 │
│      - Promise: Resolves when audio finishes                 │
│      - Cleanup: URL.revokeObjectURL(objectURL)               │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  13. NEXT CHUNK                                              │
│      - Repeat steps 5-12 for chunk 2                         │
│      - Then chunk 3                                          │
│      - Continue until all chunks played                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  14. PLAYBACK COMPLETE                                       │
│      - Update UI: Stop pulsing animation                     │
│      - Reset: Speaking state                                 │
│      - Ready: For next playback                              │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚠️ Error Handling Workflow

```
┌─────────────────────────────────────────────────────────────┐
│  ERROR TYPE: Network Error                                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
Frontend → Backend: Request timeout
├─> Frontend: Display "Network error, please try again"
├─> Log: Error details to console
└─> Fallback: Retry button appears

┌─────────────────────────────────────────────────────────────┐
│  ERROR TYPE: RAG Service Unavailable                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
Backend → Python RAG: Connection refused (port 8000)
├─> Backend: Catch error in pythonRagService.js
├─> Fallback: Return mock response
│   "I'm having trouble connecting to the knowledge base.
│    Please ensure the RAG service is running."
└─> Frontend: Display fallback message

┌─────────────────────────────────────────────────────────────┐
│  ERROR TYPE: Ollama Not Running                              │
└─────────────────────────────────────────────────────────────┘
                            ↓
Python RAG → Ollama: Connection refused (port 11434)
├─> Python RAG: Catch OllamaConnectionError
├─> Return: Error response with status 503
│   {
│     "error": "Ollama service unavailable",
│     "message": "Please start Ollama: ollama serve"
│   }
└─> Frontend: Display helpful error message

┌─────────────────────────────────────────────────────────────┐
│  ERROR TYPE: Translation Failure                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
Translation Service: Google Translate timeout
├─> Retry: Up to 3 times with exponential backoff
├─> If all fail: Return original text (English)
└─> Log: Warning, continue processing

┌─────────────────────────────────────────────────────────────┐
│  ERROR TYPE: TTS Audio Unavailable                           │
└─────────────────────────────────────────────────────────────┘
                            ↓
TTS Service → Google TTS: 403 Forbidden or timeout
├─> Backend: Catch error, return 500
├─> Frontend: Show alert
│   "Cannot play audio in te. This might be due to:
│    1. Browser autoplay restrictions
│    2. Network connectivity issues
│    Please try clicking the speaker icon manually."
└─> Fallback: User can still read text

┌─────────────────────────────────────────────────────────────┐
│  ERROR TYPE: Voice Input Not Supported                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
Browser: No webkitSpeechRecognition support
├─> Frontend: Detect in useEffect
├─> Hide: Microphone button
└─> Display: "Voice input not supported in this browser"

┌─────────────────────────────────────────────────────────────┐
│  ERROR TYPE: Invalid Language                                │
└─────────────────────────────────────────────────────────────┘
                            ↓
Language Selector: Invalid code provided
├─> Frontend: Validate against supported list
├─> Default: Fallback to English (en)
└─> Warning: Log to console

┌─────────────────────────────────────────────────────────────┐
│  ERROR TYPE: Session Expired                                 │
└─────────────────────────────────────────────────────────────┘
                            ↓
Backend: Session file not found
├─> Create: New session
├─> Return: New sessionId to frontend
└─> Frontend: Update sessionId, continue normally
```

---

## 📊 Data Flow Diagram

### Complete System Data Flow

```
┌──────────────┐
│    USER      │
└──────┬───────┘
       │ 1. Voice/Text Input
       │    (Telugu: "SIP అంటే ఏమిటి?")
       ↓
┌──────────────────────────────┐
│  FRONTEND (React)            │
│  - MessageInput.jsx          │
│  - Web Speech API            │
│  - Language: te              │
└──────────┬───────────────────┘
           │ 2. HTTP POST
           │    /api/chat/message
           │    { message, language, sessionId }
           ↓
┌──────────────────────────────┐
│  BACKEND (Node.js)           │
│  - chatRoutes.js             │
│  - Session Management        │
│  - Request Validation        │
└──────────┬───────────────────┘
           │ 3. HTTP POST
           │    /query
           │    { query, language, session_id }
           ↓
┌──────────────────────────────┐
│  PYTHON RAG (FastAPI)        │
│  Step 1: Translation         │
│    Telugu → English          │
│    "SIP అంటే ఏమిటి?"        │
│    → "What is SIP?"          │
└──────────┬───────────────────┘
           │
┌──────────▼───────────────────┐
│  Step 2: Embedding           │
│    Text → Vector (384-dim)   │
│    "What is SIP?"            │
│    → [0.12, -0.34, ...]      │
└──────────┬───────────────────┘
           │
┌──────────▼───────────────────┐
│  Step 3: Vector Search       │
│    Query: ChromaDB           │
│    Return: Top 3 docs        │
│    - SIP definition          │
│    - Benefits of SIP         │
│    - How to start SIP        │
└──────────┬───────────────────┘
           │
┌──────────▼───────────────────┐
│  Step 4: LLM Generation      │
│    Call: Ollama (llama3)     │
│    Context + Question        │
│    → English Response        │
└──────────┬───────────────────┘
           │
┌──────────▼───────────────────┐
│  Step 5: Translation         │
│    English → Telugu          │
│    Response translated       │
│    back to Telugu            │
└──────────┬───────────────────┘
           │ 4. HTTP Response
           │    { response, session_id, language }
           ↓
┌──────────────────────────────┐
│  BACKEND (Node.js)           │
│  - Store in session          │
│  - Return to frontend        │
└──────────┬───────────────────┘
           │ 5. HTTP Response
           │    { message, sessionId }
           ↓
┌──────────────────────────────┐
│  FRONTEND (React)            │
│  - MessageList.jsx           │
│  - Display Telugu response   │
│  - Show speaker icon 🔊      │
└──────────┬───────────────────┘
           │ 6. User clicks speaker
           ↓
┌──────────────────────────────┐
│  TTS WORKFLOW                │
│  Step 1: Split into chunks   │
│    Split by sentences        │
│    Max 200 chars/chunk       │
└──────────┬───────────────────┘
           │
┌──────────▼───────────────────┐
│  Step 2: For each chunk      │
│    POST /api/tts/speak       │
│    { text, language }        │
└──────────┬───────────────────┘
           │
┌──────────▼───────────────────┐
│  BACKEND TTS Service         │
│  - Call Google TTS API       │
│  - Return audio buffer       │
└──────────┬───────────────────┘
           │
┌──────────▼───────────────────┐
│  Step 3: Play audio          │
│    Create Audio element      │
│    Play sequentially         │
│    Wait for completion       │
└──────────┬───────────────────┘
           │
┌──────────▼───────────────────┐
│  Step 4: Next chunk          │
│    Repeat until all played   │
└──────────┬───────────────────┘
           │ 7. Audio complete
           ↓
┌──────────────────────────────┐
│    USER HEARS RESPONSE       │
│    Complete Telugu audio     │
│    Fluent pronunciation      │
└──────────────────────────────┘
```

---

## 🎬 Summary

This workflow document covers the complete end-to-end journey of a user interaction in FinanceYatra:

1. **Voice Input** → Web Speech API captures Telugu speech
2. **Frontend** → Sends query to backend with language
3. **Backend** → Routes to Python RAG service
4. **Translation** → Telugu → English (for processing)
5. **RAG Pipeline** → Retrieval + Generation with context
6. **Translation** → English → Telugu (for response)
7. **Backend** → Returns Telugu response to frontend
8. **Display** → Shows message in chat UI
9. **TTS** → Converts Telugu text to speech (Google TTS)
10. **Playback** → Multi-chunk sequential audio playback
11. **User** → Hears complete response in Telugu

**Total Time:** ~5-10 seconds from voice input to audio output

**Technologies Used:**
- Frontend: React, Web Speech API, Axios
- Backend: Node.js, Express, Axios
- RAG: Python, FastAPI, LangChain, ChromaDB, Sentence Transformers
- LLM: Ollama (llama3)
- Translation: Deep Translator (Google Translate)
- TTS: Google Translate TTS API

---

**Document Version:** 1.0  
**Last Updated:** November 6, 2025  
**Project:** FinanceYatra - Multilingual Financial Learning Assistant
