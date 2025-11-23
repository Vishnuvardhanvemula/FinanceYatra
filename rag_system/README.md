# FinanceYatra RAG System - Complete Documentation

## 📚 Table of Contents

1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Installation & Setup](#installation--setup)
4. [Quick Start Guide](#quick-start-guide)
5. [Module Documentation](#module-documentation)
6. [API Reference](#api-reference)
7. [Usage Examples](#usage-examples)
8. [Customization Guide](#customization-guide)
9. [Troubleshooting](#troubleshooting)
10. [Future Enhancements](#future-enhancements)

---

## 🎯 Overview

**FinanceYatra** is a production-ready RAG (Retrieval-Augmented Generation) system for a multilingual financial literacy chatbot. It helps users understand Indian financial concepts (EMI, UPI, loans, investments, etc.) in simple language across 10+ Indian languages.

### Key Features

✅ **Multilingual Support**: English + 10 Indian languages (Hindi, Telugu, Tamil, Bengali, Kannada, Malayalam, Marathi, Gujarati, Punjabi)  
✅ **Local LLM**: Uses Ollama (llama3) for privacy and zero API costs  
✅ **Advanced RAG**: ChromaDB vector store with HuggingFace multilingual embeddings  
✅ **Smart Translation**: Automatic language detection and chunked translation  
✅ **Production Ready**: FastAPI REST API with CORS, error handling, logging  
✅ **Modular Design**: Easy to extend and customize  
✅ **Document Ingestion**: Supports PDF, TXT, DOCX formats  
✅ **Zero Cloud Dependency**: Runs 100% locally

### Tech Stack

- **LLM**: Ollama (llama3, 4.7GB)
- **Framework**: LangChain
- **Vector DB**: ChromaDB (persistent, embedded)
- **Embeddings**: HuggingFace sentence-transformers (multilingual-MiniLM-L12-v2)
- **API**: FastAPI + Uvicorn
- **Translation**: Google Translate (via deep-translator)
- **Document Processing**: pypdf, python-docx

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    USER QUERY                            │
│          (Any language: English/Hindi/Telugu)            │
└─────────────────┬───────────────────────────────────────┘
                  │
                  v
┌─────────────────────────────────────────────────────────┐
│              TRANSLATION SERVICE                         │
│  - Detect language (Unicode pattern matching)           │
│  - Translate to English if needed                       │
└─────────────────┬───────────────────────────────────────┘
                  │
                  v
┌─────────────────────────────────────────────────────────┐
│              VECTOR STORE (ChromaDB)                     │
│  - Embed query (multilingual embeddings)                │
│  - Similarity search (cosine similarity)                │
│  - Retrieve top-k relevant documents                    │
└─────────────────┬───────────────────────────────────────┘
                  │
                  v
┌─────────────────────────────────────────────────────────┐
│                LLM (Ollama/llama3)                       │
│  - Build RAG prompt with context                        │
│  - Generate grounded answer                             │
│  - Financial advisor persona                            │
└─────────────────┬───────────────────────────────────────┘
                  │
                  v
┌─────────────────────────────────────────────────────────┐
│              TRANSLATION SERVICE                         │
│  - Translate answer back to user's language             │
└─────────────────┬───────────────────────────────────────┘
                  │
                  v
┌─────────────────────────────────────────────────────────┐
│                    RESPONSE                              │
│  - Answer in user's preferred language                  │
│  - Source documents with scores                         │
│  - Metadata (language, translation used, etc.)          │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Query Input** → User asks question in any supported language
2. **Language Detection** → Unicode-based pattern matching identifies language
3. **Translation to English** → Query translated if not in English
4. **Embedding** → Query converted to 384-dim vector (multilingual model)
5. **Retrieval** → ChromaDB returns top-k similar document chunks
6. **Prompt Construction** → Context + query + system prompt assembled
7. **Generation** → Ollama generates grounded answer
8. **Translation to User Language** → Answer translated back if needed
9. **Response** → JSON response with answer, sources, metadata

---

## 🚀 Installation & Setup

### Prerequisites

1. **Python 3.8+** installed
2. **Ollama** installed and running
3. **Git** (optional, for cloning)

### Step 1: Install Ollama

Download and install Ollama from: https://ollama.ai

```powershell
# Pull llama3 model (4.7GB download)
ollama pull llama3

# Verify Ollama is running
ollama list
```

### Step 2: Clone/Create Project

```powershell
# Navigate to your project
cd "d:\projects\Finance tutor\rag_system"
```

### Step 3: Create Python Virtual Environment

```powershell
# Create virtual environment
python -m venv venv

# Activate it
.\venv\Scripts\activate

# Verify activation (should show venv path)
which python
```

### Step 4: Install Python Dependencies

```powershell
# Install all dependencies
pip install -r requirements.txt

# This will install:
# - langchain & langchain-community
# - chromadb
# - sentence-transformers
# - ollama, fastapi, uvicorn
# - pypdf, python-docx
# - deep-translator
# - python-dotenv
```

**Note**: First run will download ~500MB of embeddings model (paraphrase-multilingual-MiniLM-L12-v2)

### Step 5: Configure Environment

```powershell
# Copy example config
cp .env.example .env

# Edit .env (optional - defaults work fine)
# Set OLLAMA_MODEL=llama3
# Set CHROMA_PERSIST_DIRECTORY=./chroma_db
```

### Step 6: Ingest Knowledge Base

```powershell
# Ingest the sample financial knowledge base
python ingest_documents.py data/documents/financial_basics.txt

# You should see:
# ✅ Loaded X document chunks
# ✅ Successfully ingested X documents
# 📊 Final Statistics: document_count: X
```

### Step 7: Verify Setup

```powershell
# Test with interactive query handler
python query_handler.py

# Try a test query:
# You: What is EMI?
# Should get a response grounded in knowledge base
```

---

## ⚡ Quick Start Guide

### Option 1: Interactive CLI

```powershell
python query_handler.py

# Interactive mode starts
# Type queries in any language:
You: What is EMI?
You: UPI क्या है?
You: Fixed Deposit అంటే ఏమిటి?

# Commands:
# - Type 'stats' to see system statistics
# - Type 'quit' to exit
```

### Option 2: Single Query

```powershell
# English query
python query_handler.py --query "What is EMI?"

# Hindi query
python query_handler.py --query "EMI क्या है?" --language hi

# Retrieve more context
python query_handler.py --query "Tell me about UPI" --k 5
```

### Option 3: REST API

```powershell
# Start FastAPI server
python app.py

# Server starts at http://localhost:8000
# API docs available at http://localhost:8000/docs
```

Test the API:

```powershell
# Health check
curl http://localhost:8000/health

# Query endpoint
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is EMI?",
    "k": 3,
    "return_sources": true
  }'
```

---

## 📦 Module Documentation

### 1. `config.py`

**Purpose**: Centralized configuration management

**Key Classes**:
- `Config`: Stores all configuration (Ollama URL, ChromaDB path, embedding model, etc.)

**Usage**:
```python
from config import config

print(config.OLLAMA_MODEL)  # llama3
print(config.EMBEDDING_MODEL)  # paraphrase-multilingual-MiniLM-L12-v2
print(config.SUPPORTED_LANGUAGES)  # Dict of 10 languages
```

### 2. `data_loader.py`

**Purpose**: Load and chunk documents for RAG

**Key Classes**:
- `DocumentLoader`: Loads PDF, TXT, DOCX and chunks them

**Methods**:
- `load_txt_file(path)` → str
- `load_pdf_file(path)` → str  
- `load_docx_file(path)` → str
- `chunk_text(text)` → List[Document]
- `load_and_chunk_document(path)` → List[Document]
- `load_directory(path)` → List[Document]

**Usage**:
```python
from data_loader import DocumentLoader

loader = DocumentLoader()

# Load single file
docs = loader.load_and_chunk_document("data/financial_basics.txt")

# Load directory
docs = loader.load_directory("data/documents/")

print(f"Loaded {len(docs)} chunks")
```

**Chunking Strategy**:
- Uses `RecursiveCharacterTextSplitter`
- Chunk size: 250 words (~1250 characters)
- Overlap: 50 words (~250 characters)
- Splits at natural boundaries (paragraphs, sentences)

### 3. `embeddings_handler.py`

**Purpose**: Create multilingual embeddings for RAG

**Key Classes**:
- `MultilingualEmbeddings`: Wrapper for HuggingFace embeddings

**Methods**:
- `embed_documents(texts)` → List[List[float]]
- `embed_query(text)` → List[float]
- `get_embedding_dimension()` → int

**Usage**:
```python
from embeddings_handler import get_embeddings

embedder = get_embeddings()

# Embed query
query_vector = embedder.embed_query("What is EMI?")
print(f"Dimension: {len(query_vector)}")  # 384

# Embed documents
texts = ["EMI is...", "UPI is..."]
doc_vectors = embedder.embed_documents(texts)
```

**Models**:
- **Default**: `paraphrase-multilingual-MiniLM-L12-v2`
  - 384 dimensions
  - Fast, efficient (50MB)
  - Good for 50+ languages

- **Alternative**: `intfloat/multilingual-e5-base`
  - 768 dimensions
  - More accurate (500MB)
  - Slower but better quality

### 4. `vector_store.py`

**Purpose**: Manage ChromaDB vector database

**Key Classes**:
- `VectorStore`: ChromaDB wrapper with persistence

**Methods**:
- `add_documents(docs, batch_size)` → List[str]
- `similarity_search(query, k)` → List[Document]
- `similarity_search_with_score(query, k)` → List[(Document, float)]
- `get_collection_stats()` → Dict
- `delete_collection()` → None
- `reset()` → None

**Usage**:
```python
from vector_store import get_vector_store

vs = get_vector_store()

# Add documents
docs = [...]  # List of Document objects
vs.add_documents(docs)

# Search
results = vs.similarity_search("What is EMI?", k=3)

# Search with scores
results = vs.similarity_search_with_score("What is EMI?", k=3)
for doc, score in results:
    print(f"Score: {score:.3f} - {doc.page_content[:100]}")

# Stats
stats = vs.get_collection_stats()
print(f"Total documents: {stats['document_count']}")
```

**ChromaDB Features**:
- Persistent storage (survives restarts)
- Metadata filtering support
- Fast similarity search (HNSW algorithm)
- Embedded (no separate server needed)

### 5. `llm_handler.py`

**Purpose**: Interact with Ollama LLM

**Key Classes**:
- `OllamaLLM`: Ollama API client

**Methods**:
- `check_health()` → bool
- `generate(prompt, system_prompt, temperature, max_tokens)` → str
- `generate_with_context(query, context_docs, system_prompt)` → str

**Usage**:
```python
from llm_handler import get_llm

llm = get_llm()

# Check if Ollama is running
if llm.check_health():
    print("Ollama is ready")

# Generate basic response
response = llm.generate(
    prompt="What is EMI?",
    system_prompt="You are a financial advisor"
)

# Generate with RAG context
context_docs = ["EMI is...", "Formula is..."]
response = llm.generate_with_context(
    query="How is EMI calculated?",
    context_documents=context_docs
)
```

**Parameters**:
- `temperature`: 0.7 (default) - controls randomness
- `max_tokens`: 500 (default) - response length limit
- `model`: llama3 (configurable via env)

### 6. `translation_service.py`

**Purpose**: Handle multilingual translation

**Key Classes**:
- `TranslationService`: Language detection and translation

**Methods**:
- `detect_language(text)` → str
- `translate(text, source_lang, target_lang)` → str
- `translate_to_english(text)` → str
- `translate_from_english(text, target_lang)` → str
- `get_language_name(lang_code)` → str

**Usage**:
```python
from translation_service import get_translator

translator = get_translator()

# Detect language
lang = translator.detect_language("EMI क्या है?")  # 'hi'

# Translate to English
english = translator.translate_to_english("EMI క్యా है?")

# Translate from English
hindi = translator.translate_from_english("What is EMI?", "hi")
```

**Language Detection**:
- Uses Unicode ranges for Indian scripts
- Supports: Devanagari, Telugu, Tamil, Bengali, Kannada, Malayalam, Gujarati, Gurmukhi
- Falls back to English if no script detected

**Translation Features**:
- Auto-chunking for long text (>4000 chars)
- Sentence boundary preservation
- Free (uses Google Translate API)

### 7. `rag_pipeline.py`

**Purpose**: Complete RAG orchestration

**Key Classes**:
- `RAGPipeline`: End-to-end query processing

**Methods**:
- `query(user_query, k, language, metadata_filter, return_sources)` → Dict
- `get_stats()` → Dict

**Usage**:
```python
from rag_pipeline import get_rag_pipeline

rag = get_rag_pipeline()

# Query
result = rag.query(
    user_query="EMI క్యా है?",
    k=3,
    return_sources=True
)

print(result['answer'])  # Translated answer
print(result['query_language'])  # 'hi'
print(result['translation_used'])  # True
print(result['sources'])  # List of source docs

# System stats
stats = rag.get_stats()
```

**Response Structure**:
```python
{
    "answer": "EMI का मतलब...",  # Answer in user's language
    "query_language": "hi",  # Detected language
    "translation_used": True,  # Whether translation was used
    "english_query": "What is EMI?",  # Translated query
    "english_answer": "EMI means...",  # Answer in English
    "sources": [  # Retrieved documents (if return_sources=True)
        {
            "content": "EMI is...",
            "metadata": {"source": "financial_basics.txt"},
            "score": 0.85
        }
    ]
}
```

### 8. `app.py`

**Purpose**: FastAPI REST API

**Endpoints**:
- `GET /` - Root endpoint
- `GET /health` - Health check with system stats
- `POST /api/chat` - Main query endpoint
- `GET /api/languages` - List supported languages
- `GET /api/stats` - Detailed system statistics

**Usage**:
```python
# Start server
python app.py

# Server runs at http://localhost:8000
# API docs at http://localhost:8000/docs
```

**Example API Calls**:

```bash
# Health check
curl http://localhost:8000/health

# Chat query
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "EMI क्या है?",
    "k": 3,
    "language": "hi",
    "return_sources": true
  }'

# Get supported languages
curl http://localhost:8000/api/languages
```

### 9. `ingest_documents.py`

**Purpose**: CLI tool for document ingestion

**Usage**:
```powershell
# Ingest single file
python ingest_documents.py data/documents/financial_basics.txt

# Ingest directory
python ingest_documents.py data/documents/

# Reset collection and ingest
python ingest_documents.py data/documents/ --reset

# Custom collection name
python ingest_documents.py data/documents/ --collection my_kb

# Custom batch size
python ingest_documents.py data/documents/ --batch-size 50
```

**Options**:
- `source`: Path to file or directory (required)
- `--collection`: ChromaDB collection name
- `--reset`: Delete existing collection first
- `--batch-size`: Documents per batch (default: 100)

### 10. `query_handler.py`

**Purpose**: Interactive CLI for testing

**Usage**:
```powershell
# Interactive mode
python query_handler.py

# Single query mode
python query_handler.py --query "What is EMI?"

# With language specification
python query_handler.py --query "Tell me about UPI" --language hi

# More context documents
python query_handler.py --query "Fixed Deposits?" --k 5

# Custom collection
python query_handler.py --collection my_kb
```

---

## 🔌 API Reference

### POST /api/chat

**Description**: Main chat endpoint for querying the RAG system

**Request Body**:
```json
{
  "query": "string (required)",
  "language": "string (optional)",
  "k": "integer (optional, default: 3, range: 1-10)",
  "return_sources": "boolean (optional, default: true)",
  "metadata_filter": "object (optional)"
}
```

**Example Request**:
```json
{
  "query": "EMI అంటే ఏమిటి?",
  "language": "te",
  "k": 3,
  "return_sources": true
}
```

**Response**:
```json
{
  "answer": "EMI అంటే సమానమైన మాసిక వాయిదా...",
  "query_language": "te",
  "translation_used": true,
  "english_query": "What is EMI?",
  "english_answer": "EMI stands for...",
  "sources": [
    {
      "content": "EMI stands for Equated Monthly Installment...",
      "metadata": {
        "source": "financial_basics.txt",
        "category": "loans",
        "chunk_id": 0
      },
      "score": 0.85
    }
  ]
}
```

**Status Codes**:
- 200: Success
- 400: Invalid request
- 500: Server error
- 503: Service unavailable (Ollama not running)

### GET /health

**Description**: Health check endpoint

**Response**:
```json
{
  "status": "healthy",
  "message": "All systems operational",
  "stats": {
    "vector_store": {
      "collection_name": "financial_knowledge",
      "document_count": 156
    },
    "llm_model": "llama3",
    "llm_status": "online",
    "translation_enabled": true,
    "supported_languages": 10
  }
}
```

### GET /api/languages

**Description**: Get list of supported languages

**Response**:
```json
{
  "languages": {
    "en": {"name": "English", "code": "en"},
    "hi": {"name": "Hindi", "code": "hi"},
    "te": {"name": "Telugu", "code": "te"},
    ...
  },
  "count": 10
}
```

### GET /api/stats

**Description**: Detailed system statistics

**Response**:
```json
{
  "vector_store": {
    "collection_name": "financial_knowledge",
    "document_count": 156,
    "persist_directory": "./chroma_db"
  },
  "llm_model": "llama3",
  "llm_status": "online",
  "translation_enabled": true,
  "supported_languages": 10
}
```

---

## 💡 Usage Examples

### Example 1: Basic Query (Python)

```python
from rag_pipeline import get_rag_pipeline

# Initialize
rag = get_rag_pipeline()

# Query
result = rag.query("What is EMI?")
print(result['answer'])
```

### Example 2: Multilingual Query

```python
# Hindi query
result = rag.query("EMI क्या है?", language="hi")
print(f"Answer: {result['answer']}")
print(f"Language: {result['query_language']}")

# Telugu query with sources
result = rag.query("UPI అంటే ఏమిటి?", k=3, return_sources=True)
for i, source in enumerate(result['sources'], 1):
    print(f"{i}. {source['content'][:100]}... (score: {source['score']})")
```

### Example 3: Metadata Filtering

```python
# Only search in "loans" category
result = rag.query(
    "Tell me about loans",
    metadata_filter={"category": "loans"}
)
```

### Example 4: FastAPI Integration (React Frontend)

```javascript
// React component
async function askQuestion(query) {
  const response = await fetch('http://localhost:8000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: query,
      k: 3,
      return_sources: true
    })
  });
  
  const data = await response.json();
  return data.answer;
}

// Usage
const answer = await askQuestion("What is EMI?");
console.log(answer);
```

### Example 5: Batch Ingestion

```python
from data_loader import DocumentLoader
from vector_store import get_vector_store

loader = DocumentLoader()
vs = get_vector_store()

# Load multiple files
files = ["file1.txt", "file2.pdf", "file3.docx"]

for file_path in files:
    docs = loader.load_and_chunk_document(
        file_path,
        metadata={"source": file_path, "category": "finance"}
    )
    vs.add_documents(docs)
    print(f"✅ Ingested {file_path}")
```

---

## 🎨 Customization Guide

### Change LLM Model

Edit `.env`:
```
OLLAMA_MODEL=llama2  # or mistral, codellama, etc.
```

Or in code:
```python
from rag_pipeline import RAGPipeline
rag = RAGPipeline(llm_model="mistral")
```

### Change Embedding Model

Edit `.env`:
```
EMBEDDING_MODEL=intfloat/multilingual-e5-base
```

Or in code:
```python
from embeddings_handler import MultilingualEmbeddings
embedder = MultilingualEmbeddings("intfloat/multilingual-e5-base")
```

### Adjust Chunking Strategy

Edit `config.py`:
```python
CHUNK_SIZE = 300  # words per chunk (default: 250)
CHUNK_OVERLAP = 75  # overlap words (default: 50)
```

### Modify System Prompt

Edit `rag_pipeline.py`, change `self.system_prompt`:
```python
self.system_prompt = """You are a financial advisor specialized in...
[Your custom instructions]
"""
```

### Add New Language

Edit `config.py`, add to `SUPPORTED_LANGUAGES`:
```python
"or": {"name": "Odia", "code": "or"}
```

Edit `translation_service.py`, add Unicode range to `detect_language()`:
```python
'or': (0x0B00, 0x0B7F),  # Odia
```

### Use Different Vector Database

Replace `vector_store.py` with FAISS, Pinecone, Weaviate, etc.

Example with FAISS:
```python
from langchain.vectorstores import FAISS

vectorstore = FAISS.from_documents(
    documents,
    embedding=embeddings
)
```

### Add Authentication

Edit `app.py`, add middleware:
```python
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer

security = HTTPBearer()

@app.post("/api/chat")
async def chat_query(request: QueryRequest, token: str = Depends(security)):
    # Verify token
    if token != "your-secret-token":
        raise HTTPException(status_code=401)
    ...
```

### Enable Logging to File

Edit any module:
```python
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("rag_system.log"),
        logging.StreamHandler()
    ]
)
```

---

## 🔧 Troubleshooting

### Issue 1: Ollama Not Running

**Error**: `❌ Ollama health check failed`

**Solution**:
```powershell
# Check if Ollama is running
ollama list

# Start Ollama service (if not running)
ollama serve

# Pull model if not available
ollama pull llama3
```

### Issue 2: Embedding Model Download Fails

**Error**: `❌ Error loading embedding model`

**Solution**:
```powershell
# Manually download using huggingface_hub
pip install huggingface_hub

python -c "from sentence_transformers import SentenceTransformer; model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')"
```

### Issue 3: ChromaDB Permission Error

**Error**: `❌ Permission denied: ./chroma_db`

**Solution**:
```powershell
# Change persist directory in .env
CHROMA_PERSIST_DIRECTORY=C:/Users/YourName/chroma_db

# Or create directory with permissions
mkdir chroma_db
icacls chroma_db /grant Everyone:F
```

### Issue 4: Translation Fails

**Error**: `❌ Translation error`

**Solution**:
- Check internet connection (translation needs internet)
- Try alternative translation library (googletrans vs deep-translator)
- Disable translation temporarily:
  ```python
  # In .env
  ENABLE_TRANSLATION=false
  ```

### Issue 5: Out of Memory

**Error**: `MemoryError`

**Solution**:
- Reduce batch size:
  ```python
  python ingest_documents.py data/ --batch-size 50
  ```
- Use smaller embedding model
- Reduce chunk size in config.py

### Issue 6: Slow Response Times

**Causes & Solutions**:
- **Ollama slow**: Use smaller model (llama2:7b instead of llama2:13b)
- **Embedding slow**: Switch to faster model (MiniLM instead of E5-base)
- **Too many context docs**: Reduce `k` parameter from 5 to 2-3
- **CPU only**: Consider GPU setup for Ollama

---

## 🚀 Future Enhancements

### 1. Voice Integration

```python
# Add speech-to-text
import speech_recognition as sr

def voice_query():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        audio = recognizer.listen(source)
        query = recognizer.recognize_google(audio, language="hi-IN")
    return rag.query(query)
```

### 2. Personalized Learning Paths

```python
# Track user queries and progress
class UserProfile:
    def __init__(self, user_id):
        self.user_id = user_id
        self.query_history = []
        self.knowledge_level = "beginner"
    
    def recommend_next_topic(self):
        # Analyze history and suggest topics
        pass
```

### 3. Multi-modal (Images/Charts)

```python
# Add support for financial charts
from PIL import Image
import matplotlib.pyplot as plt

def generate_emi_chart(principal, rate, tenure):
    # Generate EMI breakdown chart
    plt.savefig("emi_chart.png")
    return "emi_chart.png"
```

### 4. Real-time Market Data

```python
# Integrate with market APIs
import yfinance as yf

def get_stock_price(ticker):
    stock = yf.Ticker(ticker)
    return stock.history(period="1d")
```

### 5. Chatbot Memory

```python
# Add conversation history tracking
class ConversationMemory:
    def __init__(self):
        self.history = []
    
    def add_exchange(self, query, answer):
        self.history.append({"query": query, "answer": answer})
    
    def get_context(self, last_n=3):
        return self.history[-last_n:]
```

### 6. A/B Testing Framework

```python
# Test different prompts/models
class ABTestFramework:
    def __init__(self):
        self.variants = {
            "A": {"model": "llama3", "temperature": 0.7},
            "B": {"model": "mistral", "temperature": 0.5}
        }
    
    def test_variant(self, variant_id, query):
        config = self.variants[variant_id]
        # Run query with variant config
        pass
```

### 7. Feedback Loop

```python
# Collect user feedback for improvement
class FeedbackSystem:
    def collect_feedback(self, query_id, rating, comment):
        # Store feedback in database
        pass
    
    def retrain_model(self):
        # Use feedback to improve responses
        pass
```

### 8. Integration with Existing Backend

```javascript
// Node.js/Express integration
const axios = require('axios');

async function getFinancialAdvice(query, language) {
  const response = await axios.post('http://localhost:8000/api/chat', {
    query: query,
    language: language,
    k: 3
  });
  return response.data.answer;
}

// Use in your existing backend
app.post('/api/chat/message', async (req, res) => {
  const { query, language } = req.body;
  const answer = await getFinancialAdvice(query, language);
  res.json({ answer });
});
```

---

## 📊 Performance Benchmarks

**System**: Intel i5, 16GB RAM, Windows 11

| Operation | Time | Notes |
|-----------|------|-------|
| Embedding model load | 2-3s | First time only |
| Document ingestion (100 chunks) | 15-20s | Includes embedding |
| Single query (cold start) | 3-5s | Includes LLM generation |
| Single query (warm) | 1-2s | Cache hit |
| Translation | 500ms-1s | Per 1000 chars |

**Optimization Tips**:
- Keep Ollama warm (preload model)
- Use smaller embedding models for production
- Cache frequently asked questions
- Use async processing for batch queries

---

## 🤝 Contributing

To extend this system:

1. **Add new document loaders** in `data_loader.py`
2. **Add new translation providers** in `translation_service.py`
3. **Add new LLM providers** (OpenAI, Anthropic) in `llm_handler.py`
4. **Add new endpoints** in `app.py`
5. **Add new features** following modular pattern

---

## 📝 License

This project is open-source. Feel free to use, modify, and distribute.

---

## 🎓 Credits

Built using:
- LangChain
- ChromaDB
- Ollama
- HuggingFace Transformers
- FastAPI

---

**FinanceYatra RAG System v1.0**  
Production-ready multilingual financial literacy chatbot with RAG  
Made with ❤️ for financial inclusion in India
