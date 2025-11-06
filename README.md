# 🦙 financeYatra - Free, Private, Multilingual Financial Learning

> Your personal AI financial tutor powered by Ollama - Learn finance in your language!

[![Ollama](https://img.shields.io/badge/Powered%20by-Ollama-ff6b6b?style=flat-square)](https://ollama.com)
[![Languages](https://img.shields.io/badge/Languages-11-blue?style=flat-square)](./FEATURES_GUIDE.md#language-support)
[![React](https://img.shields.io/badge/React-18.2-61dafb?style=flat-square&logo=react)](https://react.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## ✨ What is financeYatra?

**financeYatra** is a free, privacy-focused multilingual chatbot that helps you learn financial concepts in your native language. Built with **Ollama** for local AI inference and supports **11 Indian languages** including Telugu, Hindi, Tamil, Bengali, and more!

### 🎯 Key Highlights

- 🆓 **Completely Free** - No API costs, runs locally
- 🔒 **100% Private** - All data stays on your machine
- 🌏 **11 Languages** - English + Indian languages (తెలుగు, हिंदी, தமிழ், বাংলা, etc.)
- 🎤 **Voice Input** - Speak your questions in any supported language
- 🔊 **Text-to-Speech** - Listen to responses with native pronunciation
- 🦙 **Powered by Ollama** - Local LLM inference (llama3, gemma, qwen2.5)
- 📚 **RAG System** - 34+ financial documents with semantic search
- ⚡ **Fast & Smart** - GPU-accelerated, context-aware responses
- 📴 **Works Offline** - No internet required after setup (except TTS)

---

## 📚 Documentation

**Choose your guide:**

| Guide | Description | When to Use |
|-------|-------------|-------------|
| **[🚀 Setup Guide](./SETUP_GUIDE.md)** | Complete installation & configuration | First-time setup, troubleshooting |
| **[🌟 Features Guide](./FEATURES_GUIDE.md)** | All features, languages, usage examples | Learn what you can do |
| **[🛠️ Development Guide](./DEVELOPMENT_GUIDE.md)** | Architecture, APIs, Phase 3 RAG | Technical deep-dive, contributing |

---

## ⚡ Quick Start (5 Minutes)

### 1. Install Ollama
```powershell
# Windows
winget install Ollama.Ollama

# macOS/Linux
curl -fsSL https://ollama.com/install.sh | sh
```

**Note**: Ollama now runs **with the Python RAG service**, not the Node.js backend. See [OLLAMA_SETUP.md](./OLLAMA_SETUP.md) for details.

### 2. Pull Model
```powershell
ollama pull llama3  # Recommended (4.7GB)
```

### 3. Start Python RAG Service
```powershell
cd "d:/projects/Finance tutor/rag_system"
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python ingest_documents.py data/documents/financial_basics.txt
python app.py  # Port 8000
```

### 4. Start Backend (New Terminal)
```powershell
cd "d:/projects/Finance tutor/backend"
npm install
npm run dev  # Port 5000
```

### 5. Start Frontend (New Terminal)
```powershell
cd "d:/projects/Finance tutor"
npm install
npm run dev  # Port 5173
```

### 6. Open Browser
```
http://localhost:5173
```

**🎉 Done! Start chatting in any language!**

**Tip**: Use the automated script to start all services:
```powershell
.\scripts\start-all.ps1
```

**🎤 Pro Tip**: Click the microphone icon to speak your questions, and click the speaker icon 🔊 to hear responses!

---

## 🌐 Supported Languages

All languages support both **text input**, **voice input**, and **text-to-speech output**!

| Language | Script | Code | Voice | TTS |
|----------|--------|------|-------|-----|
| English | English | `en` | ✅ | ✅ |
| Hindi | हिंदी | `hi` | ✅ | ✅ |
| Telugu | తెలుగు | `te` | ✅ | ✅ |
| Tamil | தமிழ் | `ta` | ✅ | ✅ |
| Bengali | বাংলা | `bn` | ✅ | ✅ |
| Kannada | ಕನ್ನಡ | `kn` | ✅ | ✅ |
| Malayalam | മലയാളം | `ml` | ✅ | ✅ |
| Marathi | मराठी | `mr` | ✅ | ✅ |
| Gujarati | ગુજરાતી | `gu` | ✅ | ✅ |
| Punjabi | ਪੰਜਾਬੀ | `pa` | ✅ | ✅ |
| Odia | ଓଡ଼ିଆ | `or` | ✅ | ✅ |

**See [Features Guide](./FEATURES_GUIDE.md#language-support) for details**

---

## 💡 Usage Examples

### English
```
Q: What is EMI?
A: EMI stands for Equated Monthly Installment. It's a fixed 
   payment amount made by a borrower to a lender...
```

### Telugu (తెలుగు)
```
Q: EMI అంటే ఏమిటి?
A: EMI అంటే సమాన నెలవారీ వాయిదా. ఇది రుణగ్రహీత ప్రతి నెల 
   రుణదాతకు చెల్లించే నిర్ణీత చెల్లింపు మొత్తం...
```

### Hindi (हिंदी)
```
Q: EMI क्या है?
A: EMI का मतलब है समान मासिक किस्त। यह एक निश्चित भुगतान 
   राशि है जो उधारकर्ता हर महीने ऋणदाता को देता है...
```

**More examples in [Features Guide](./FEATURES_GUIDE.md#usage-examples)**

---

## 🏗️ Architecture

```
Client (React + Tailwind)
    ├─ Voice Input (Web Speech API)
    ├─ Text-to-Speech Playback
    └─ Chat Interface
        ↕ REST API
Backend (Express + Node.js)
    ├─ Session Management
    ├─ Chat Routing
    ├─ TTS Service (Google TTS Proxy)  ← NEW
    └─ Translation Fallback
        ↕ HTTP (axios)
Python RAG Service (FastAPI)
    ├─ RAG Pipeline (LangChain)
    ├─ Vector Store (ChromaDB)
    ├─ Embeddings (HuggingFace)
    ├─ Translation (Deep Translator)
    └─ Ollama LLM
        ↕
Ollama Server (localhost:11434)
    └─ llama3 Model (4.7GB)
```

**Note**: 
- Voice input uses browser's Web Speech API (works offline)
- Text-to-Speech uses Google Translate TTS via backend proxy (requires internet)
- Ollama runs exclusively with the Python RAG service

---

## 📦 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 + Vite + Tailwind CSS |
| **Voice Input** | Web Speech API (11 languages) |
| **Voice Output** | Google Translate TTS (backend proxy) |
| **Backend** | Node.js + Express + Mongoose |
| **RAG System** | Python FastAPI + LangChain |
| **Vector DB** | ChromaDB (persistent) |
| **Embeddings** | HuggingFace Sentence Transformers |
| **AI** | Ollama (llama3, gemma, qwen2.5, mistral) |
| **Translation** | Deep Translator (Google Translate) |
| **Database** | MongoDB (optional) |

---

## 🚧 Project Status

### ✅ Completed (Phase 1, 2, 3, 4 & 5.1)

- [x] React + Tailwind UI
- [x] Ollama integration (direct API)
- [x] 11 language support
- [x] Translation with chunking
- [x] Language selector component
- [x] Session management
- [x] MongoDB optional mode
- [x] **Python RAG System** (6,650+ lines, production-ready)
- [x] **RAG Integration** (Python FastAPI + Node.js Express)
- [x] **ChromaDB Vector Database** (persistent storage)
- [x] **HuggingFace Multilingual Embeddings** (384-dim)
- [x] **LangChain Framework** (complete RAG pipeline)
- [x] **Knowledge Base** (34+ documents, 15+ financial topics)
- [x] **Voice Input** (Web Speech API, 11 languages)
- [x] **Text-to-Speech** (Google TTS via backend proxy)
- [x] **Multi-chunk TTS** (sequential playback for long responses)
- [x] **Auto-speak Toggle** (with localStorage persistence)
- [x] **User Authentication** (JWT + MongoDB) ← NEW Phase 3.1
- [x] **AI Proficiency Detection** (Ollama-powered level assessment) ← NEW Phase 3.1
- [x] **User Profiles** (progress tracking, streaks, achievements) ← NEW Phase 3.1
- [x] **Onboarding Flow** (3-step welcome experience) ← NEW Phase 3.1

### 🎯 NEW: Phase 3.1 - User Authentication & Profiles

**financeYatra now has intelligent user management!**

- 🔐 **Secure Authentication**: JWT tokens + bcrypt password hashing
- 🧠 **AI Proficiency Detection**: Ollama analyzes questions to determine user level (beginner/intermediate/expert)
- 📊 **Progress Tracking**: Questions asked, topics explored, time spent, learning streaks
- 🎮 **Gamification**: Achievements, points, streak tracking
- 👤 **User Profiles**: Personalized learning experience based on detected proficiency
- 🌐 **Multilingual Onboarding**: Welcome flow in 11 languages
- 👻 **Guest Mode**: Full functionality without login

**Key Features:**
- No quiz required - AI automatically assesses proficiency after 3-5 questions
- Reassessment every 10 questions or 30 days
- Fallback rule-based detection if AI fails
- Complete user dashboard (coming in Phase 3.2)

**See [PHASE_3.1_IMPLEMENTATION.md](./PHASE_3.1_IMPLEMENTATION.md) for complete documentation**

### 🎉 NEW: Python RAG Integration

**financeYatra now has enterprise-grade RAG capabilities!**

- 🐍 **Python RAG Service**: FastAPI microservice with complete RAG pipeline
- 📚 **Knowledge Grounding**: Retrieves relevant context from curated financial knowledge base
- 🔍 **Semantic Search**: ChromaDB vector store with 384-dim embeddings
- 🌐 **Multilingual RAG**: Automatic translation in RAG pipeline
- 🔄 **3-Tier Fallback**: Python RAG → Direct Ollama → Mock responses
- 📊 **42 Comprehensive Tests**: Complete integration test suite

**See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for complete documentation**

**Quick Integration Start

```powershell
# One-command startup (all services)
.\scripts\start-all.ps1

# OR Manual startup:

# Terminal 1: Python RAG Service
cd rag_system
.\venv\Scripts\activate
python app.py  # Port 8000

# Terminal 2: Node.js Backend
cd backend
npm run dev    # Port 5000
```

**Integration Documentation:**
- **[INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)** - Complete integration architecture
- **[INTEGRATION_TEST_CHECKLIST.md](./INTEGRATION_TEST_CHECKLIST.md)** - 42 test cases
- **[INTEGRATION_SUMMARY.md](./INTEGRATION_SUMMARY.md)** - Quick reference
- **[rag_system/README.md](./rag_system/README.md)** - Python RAG system docs (1,500+ lines)

### 🔮 Future Enhancements (Phase 3.2+)

- [ ] **Dashboard UI** (Phase 3.2) - Visual progress tracking, achievements showcase
- [ ] **Analytics** (Phase 3.3) - Learning velocity, topic preferences, engagement patterns
- [ ] Offline TTS (local models)
- [ ] Mobile app (React Native)
- [ ] Financial calculators
- [ ] Voice conversation mode (continuous)
- [ ] Advanced gamification (badges, leaderboard)

---

## 🐛 Troubleshooting

### Quick Fixes

| Issue | Solution |
|-------|----------|
| "Ollama not running" | Run `ollama serve` |
| "Model not found" | Run `ollama pull llama3` |
| "Port in use" | Change PORT in .env |
| "Translation limit" | Already fixed with chunking! |
| "MongoDB timeout" | Comment out MONGODB_URI in .env |
| "Voice input not working" | Use Chrome/Edge, allow microphone permissions |
| "TTS not speaking" | Click speaker icon manually (autoplay may be blocked) |
| "Telugu sounds wrong" | Backend TTS proxy uses native Google TTS - should be fluent |

**See [Setup Guide - Troubleshooting](./SETUP_GUIDE.md#troubleshooting) for complete list**

---

## 📖 Learn More

### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | This file - Project overview |
| `SETUP_GUIDE.md` | Installation & configuration |
| `FEATURES_GUIDE.md` | Features & usage examples |
| `DEVELOPMENT_GUIDE.md` | Technical architecture & API docs |
| `RAG_IMPLEMENTATION.md` | Phase 3 implementation guide |

### External Resources

- **Ollama**: https://ollama.com
- **LangChain**: https://langchain.com
- **React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

**See [Development Guide](./DEVELOPMENT_GUIDE.md#contributing) for guidelines**

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 🙏 Acknowledgments

- **Ollama** - For making local LLM inference accessible
- **MyMemory Translation API** - For free translation services
- **LangChain** - For AI framework and tools
- **React & Tailwind** - For excellent UI development tools

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/financeyatra/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/financeyatra/discussions)
- **Email**: support@financeyatra.com

---

## 🌟 Star Us!

If you find financeYatra useful, please give us a ⭐ on GitHub!

---

**Built with 🦙 Ollama + ⚛️ React + � for financial literacy in every language**

*Making finance education accessible, private, and free for everyone!*

### Frontend
- React 18
