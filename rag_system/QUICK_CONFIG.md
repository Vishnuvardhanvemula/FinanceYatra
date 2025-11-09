# Quick Configuration Reference

## ✅ Current Production Setup

### Model Configuration (.env)
```properties
OLLAMA_MODEL=llama3.2:3b
USE_GPU=true
GPU_DEVICE=0
```

### Performance Metrics
- **Response Time**: 7-10 seconds (average)
- **First Query**: 10-20s (model loading)
- **Quality**: ⭐⭐⭐⭐⭐ Excellent
- **GPU Usage**: RTX 3050 4GB

### Token Limits (llm_handler.py)
```python
beginner: 80 tokens      # ~55-60 words, 7-10s
intermediate: 120 tokens # ~80-90 words, 8-12s
expert: 160 tokens       # ~110-120 words, 10-15s
```

### Context Settings
- **Documents Retrieved**: 1
- **Context Size**: 400 chars per document
- **Ollama num_ctx**: 512
- **Ollama num_batch**: 128

## 🚀 Quick Start

```powershell
# Start all services
cd "d:\projects\Finance tutor"
.\scripts\start-all.ps1

# Test RAG performance
curl -X POST http://localhost:8000/api/chat `
  -H "Content-Type: application/json" `
  -d '{"query":"What is EMI?","language":"en","proficiency_level":"beginner"}'

# Check GPU usage
nvidia-smi
```

## 📊 Expected Results

### Sample Query: "What is EMI?"
```
Response Time: 7-10 seconds
Answer Length: ~250-350 characters
Quality: Accurate, clear, no hallucinations
```

### Sample Query: "What is SIP?"
```
Response Time: 7-10 seconds  
Answer Length: ~300-400 characters
Quality: Accurate definition with examples
```

## ⚙️ Fine-Tuning Options

### To Increase Speed (trade quality):
1. Reduce tokens: `beginner: 60`
2. Reduce context: `doc[:300]`
3. Reduce num_ctx: `384`
- Expected: 5-7s, slightly lower quality

### To Increase Quality (trade speed):
1. Increase tokens: `beginner: 100`
2. Increase context: `doc[:500]`
3. Use 2 documents: `k=2`
- Expected: 12-15s, more detailed answers

## ❌ What NOT to Do

- ❌ Don't use phi3:mini - produces garbled text
- ❌ Don't reduce tokens below 60 - answers too short
- ❌ Don't use llama3 (4.7GB) - too slow (35s+)
- ❌ Don't set num_ctx below 256 - context too small
- ❌ Don't disable GPU - 10x slower on CPU

## 🔍 Troubleshooting

### Slow Response (>15s)
1. Check if model is loaded: `ollama list`
2. Check GPU usage: `nvidia-smi`
3. Restart Ollama: `ollama serve`
4. Clear model cache: `ollama rm llama3.2:3b && ollama pull llama3.2:3b`

### Poor Quality Answers
1. Verify model: should be `llama3.2:3b` not `phi3:mini`
2. Check tokens: should be 80/120/160
3. Check context size: should be 400 chars
4. Verify documents in vector store: `curl http://localhost:8000/health`

### GPU Not Being Used
1. Check CUDA: `python -c "import torch; print(torch.cuda.is_available())"`
2. Check venv active: `.\venv\Scripts\activate`
3. Verify Ollama GPU: Check Ollama logs for "GPU detected"
4. Restart services with GPU: `.\scripts\start-all.ps1`

---

**Last Updated**: November 9, 2025  
**Status**: ✅ Production Ready
