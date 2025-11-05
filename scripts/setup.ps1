# Quick Setup Script for FinanceYatra RAG System
# Run this in PowerShell

Write-Host "🚀 FinanceYatra RAG System - Setup Script" -ForegroundColor Cyan
Write-Host "=========================================`n" -ForegroundColor Cyan

# Step 1: Check Python
Write-Host "1️⃣ Checking Python installation..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "   ✅ Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Python not found. Please install Python 3.8+ first." -ForegroundColor Red
    exit 1
}

# Step 2: Check Ollama
Write-Host "`n2️⃣ Checking Ollama installation..." -ForegroundColor Yellow
try {
    $ollamaCheck = ollama list 2>&1
    Write-Host "   ✅ Ollama is installed" -ForegroundColor Green
    
    if ($ollamaCheck -match "llama3") {
        Write-Host "   ✅ llama3 model found" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  llama3 model not found. Pulling now..." -ForegroundColor Yellow
        Write-Host "   (This will download ~4.7GB, please wait)" -ForegroundColor Yellow
        ollama pull llama3
        Write-Host "   ✅ llama3 model downloaded" -ForegroundColor Green
    }
} catch {
    Write-Host "   ❌ Ollama not found. Please install from https://ollama.ai" -ForegroundColor Red
    Write-Host "   After installation, run: ollama pull llama3" -ForegroundColor Yellow
    exit 1
}

# Step 3: Create Virtual Environment
Write-Host "`n3️⃣ Creating Python virtual environment..." -ForegroundColor Yellow
if (Test-Path "venv") {
    Write-Host "   ⚠️  Virtual environment already exists" -ForegroundColor Yellow
} else {
    python -m venv venv
    Write-Host "   ✅ Virtual environment created" -ForegroundColor Green
}

# Step 4: Activate Virtual Environment
Write-Host "`n4️⃣ Activating virtual environment..." -ForegroundColor Yellow
& .\venv\Scripts\Activate.ps1
Write-Host "   ✅ Virtual environment activated" -ForegroundColor Green

# Step 5: Install Dependencies
Write-Host "`n5️⃣ Installing Python dependencies..." -ForegroundColor Yellow
Write-Host "   (This may take 3-5 minutes on first run)" -ForegroundColor Yellow
pip install --upgrade pip -q
pip install -r requirements.txt
Write-Host "   ✅ Dependencies installed" -ForegroundColor Green

# Step 6: Create directories
Write-Host "`n6️⃣ Creating required directories..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "data/documents" | Out-Null
New-Item -ItemType Directory -Force -Path "chroma_db" | Out-Null
Write-Host "   ✅ Directories created" -ForegroundColor Green

# Step 7: Check if knowledge base exists
Write-Host "`n7️⃣ Checking knowledge base..." -ForegroundColor Yellow
if (Test-Path "data/documents/financial_basics.txt") {
    Write-Host "   ✅ Sample knowledge base found" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  Sample knowledge base not found" -ForegroundColor Yellow
    Write-Host "   Please ensure financial_basics.txt is in data/documents/" -ForegroundColor Yellow
}

# Step 8: Ingest documents
Write-Host "`n8️⃣ Ingesting knowledge base into vector store..." -ForegroundColor Yellow
if (Test-Path "data/documents/financial_basics.txt") {
    python ingest_documents.py data/documents/financial_basics.txt
    Write-Host "   ✅ Knowledge base ingested" -ForegroundColor Green
} else {
    Write-Host "   ⏭️  Skipping ingestion (no documents found)" -ForegroundColor Yellow
}

# Step 9: Test system
Write-Host "`n9️⃣ Testing system..." -ForegroundColor Yellow
Write-Host "   Running test query: 'What is EMI?'" -ForegroundColor Cyan
python query_handler.py --query "What is EMI?" --k 2

# Final message
Write-Host "`n✅ Setup Complete!" -ForegroundColor Green
Write-Host "=========================================`n" -ForegroundColor Cyan

Write-Host "🎉 Your RAG system is ready to use!`n" -ForegroundColor Green

Write-Host "Quick Start Commands:" -ForegroundColor Yellow
Write-Host "  • Interactive mode:  python query_handler.py" -ForegroundColor White
Write-Host "  • Start API server:  python app.py" -ForegroundColor White
Write-Host "  • View docs:         http://localhost:8000/docs`n" -ForegroundColor White

Write-Host "Test Queries:" -ForegroundColor Yellow
Write-Host "  • What is EMI?" -ForegroundColor White
Write-Host "  • EMI क्या है?" -ForegroundColor White
Write-Host "  • UPI అంటే ఏమిటి?" -ForegroundColor White
Write-Host "  • Tell me about Fixed Deposits`n" -ForegroundColor White

Write-Host "Press any key to exit..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
