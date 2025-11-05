# FinanceYatra - Start All Services Script
# This script starts the Python RAG service, Node.js backend, and Frontend

Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "     FinanceYatra - Starting All Services" -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host ""

$projectRoot = "d:\projects\Finance tutor"

# Check if Ollama is running
Write-Host "Check if Ollama is running..." -ForegroundColor Yellow
try {
    $ollamaResponse = Invoke-RestMethod -Uri "http://localhost:11434/api/tags" -ErrorAction Stop
    Write-Host "Ollama is running with llama3 model" -ForegroundColor Green
} catch {
    Write-Host "Ollama is not responding. Please start Ollama first." -ForegroundColor Red
    Write-Host "   Run: ollama serve" -ForegroundColor Gray
    exit 1
}

Write-Host ""

# Start Python RAG Service
Write-Host "Starting Python RAG Service (port 8000)..." -ForegroundColor Yellow
Write-Host "   Opening new terminal for Python RAG..." -ForegroundColor Gray

$ragPath = Join-Path $projectRoot "rag_system"
$ragCommand = "cd '$ragPath'; .\venv\Scripts\activate; Write-Host '==========================================' -ForegroundColor Green; Write-Host '  Python RAG Service Starting...' -ForegroundColor Green; Write-Host '==========================================' -ForegroundColor Green; python app.py"

Start-Process powershell -ArgumentList "-NoExit", "-Command", $ragCommand

Write-Host "Python RAG terminal opened" -ForegroundColor Green
Write-Host "   Waiting 20 seconds for Python RAG to initialize..." -ForegroundColor Gray
Start-Sleep -Seconds 20

# Verify Python RAG is running
Write-Host "   Verifying Python RAG..." -ForegroundColor Gray
try {
    $ragHealth = Invoke-RestMethod -Uri "http://localhost:8000/health" -ErrorAction Stop
    Write-Host "Python RAG is healthy!" -ForegroundColor Green
    Write-Host "   Documents: $($ragHealth.documents_count)" -ForegroundColor Gray
    Write-Host "   Ollama: $($ragHealth.ollama_status)" -ForegroundColor Gray
} catch {
    Write-Host "Python RAG is not responding yet. Continuing anyway..." -ForegroundColor Yellow
    Write-Host "   Check the Python RAG terminal for status" -ForegroundColor Gray
}

Write-Host ""

# Start Node.js Backend
Write-Host "Starting Node.js Backend (port 5000)..." -ForegroundColor Yellow
Write-Host "   Opening new terminal for Node.js..." -ForegroundColor Gray

$backendPath = Join-Path $projectRoot "backend"
$backendCommand = "cd '$backendPath'; `$env:USE_PYTHON_RAG='true'; `$env:PYTHON_RAG_URL='http://localhost:8000'; Write-Host '==========================================' -ForegroundColor Blue; Write-Host '  Node.js Backend Starting...' -ForegroundColor Blue; Write-Host '==========================================' -ForegroundColor Blue; npm run dev"

Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendCommand

Write-Host "Node.js Backend terminal opened" -ForegroundColor Green
Write-Host "   Waiting 10 seconds for backend to initialize..." -ForegroundColor Gray
Start-Sleep -Seconds 10

Write-Host ""

# Start Frontend
Write-Host "Starting Frontend (port 5173)..." -ForegroundColor Yellow
Write-Host "   Opening new terminal for Frontend..." -ForegroundColor Gray

$frontendCommand = "cd '$projectRoot'; Write-Host '==========================================' -ForegroundColor Magenta; Write-Host '  Frontend Starting...' -ForegroundColor Magenta; Write-Host '==========================================' -ForegroundColor Magenta; npm run dev"

Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendCommand

Write-Host "Frontend terminal opened" -ForegroundColor Green

Write-Host ""
Write-Host "=========================================================" -ForegroundColor Green
Write-Host "     All Services Started Successfully!" -ForegroundColor Green
Write-Host "=========================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Service URLs:" -ForegroundColor Cyan
Write-Host "   Frontend:      http://localhost:5173" -ForegroundColor White
Write-Host "   Node.js:       http://localhost:5000" -ForegroundColor White
Write-Host "   Python RAG:    http://localhost:8000" -ForegroundColor White
Write-Host "   Python Docs:   http://localhost:8000/docs" -ForegroundColor White
Write-Host ""
Write-Host "Quick Tests:" -ForegroundColor Cyan
Write-Host "   Test Python RAG:  curl http://localhost:8000/health" -ForegroundColor Gray
Write-Host "   Test Node.js:     curl http://localhost:5000/api/health" -ForegroundColor Gray
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "   1. Wait 30 seconds for all services to fully initialize" -ForegroundColor White
Write-Host "   2. Open http://localhost:5173 in your browser" -ForegroundColor White
Write-Host "   3. Try asking: 'What is EMI?' in English or Hindi" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to close this window (services will keep running)..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
