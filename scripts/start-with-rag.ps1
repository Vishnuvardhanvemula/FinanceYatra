# Start Node.js Backend with Python RAG Integration
# This ensures environment variables are properly set

Write-Host "===================================================" -ForegroundColor Blue
Write-Host "  Starting Node.js Backend with Python RAG" -ForegroundColor Blue
Write-Host "===================================================" -ForegroundColor Blue
Write-Host ""

# Set environment variables explicitly
$env:USE_PYTHON_RAG = "true"
$env:PYTHON_RAG_URL = "http://localhost:8000"
$env:PORT = "5000"
$env:NODE_ENV = "development"
$env:FRONTEND_URL = "http://localhost:5173"

Write-Host "Environment Configuration:" -ForegroundColor Yellow
Write-Host "   USE_PYTHON_RAG: $env:USE_PYTHON_RAG" -ForegroundColor White
Write-Host "   PYTHON_RAG_URL: $env:PYTHON_RAG_URL" -ForegroundColor White
Write-Host "   PORT: $env:PORT" -ForegroundColor White
Write-Host ""

# Check if Python RAG is running
Write-Host "Checking Python RAG service..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8000/health" -TimeoutSec 2 -ErrorAction Stop
    Write-Host "Python RAG is running!" -ForegroundColor Green
    Write-Host "   Documents: $($response.stats.vector_store.document_count)" -ForegroundColor Gray
    Write-Host "   LLM: $($response.stats.llm_model) ($($response.stats.llm_status))" -ForegroundColor Gray
} catch {
    Write-Host "WARNING: Python RAG is not responding!" -ForegroundColor Red
    Write-Host "   Please start Python RAG first:" -ForegroundColor Yellow
    Write-Host "   cd ..\rag_system" -ForegroundColor Gray
    Write-Host "   .\venv\Scripts\activate" -ForegroundColor Gray
    Write-Host "   python app.py" -ForegroundColor Gray
    Write-Host ""
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne "y") {
        exit 1
    }
}

Write-Host ""
Write-Host "Starting Node.js Backend..." -ForegroundColor Green
Write-Host ""

# Start the server
npm run dev
