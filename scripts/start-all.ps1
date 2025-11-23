# FinanceYatra - Start All Services Script
# This script starts the Python RAG service, Node.js backend, and Frontend

Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "     FinanceYatra - Starting All Services" -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host ""

$projectRoot = "d:\projects\Finance tutor"
# Frontend now lives in a `frontend` subfolder. If your repo keeps the frontend at root, the fallback
# will still try the root folder (for backwards-compatibility).
$frontendPath = Join-Path $projectRoot "frontend"

# If the frontend folder doesn't exist, fallback to project root (worked historically when frontend
# lived at project root). This keeps the script backwards compatible while preferring `frontend`.
if (-not (Test-Path $frontendPath)) {
    Write-Host "⚠ Frontend folder 'frontend' not found. Falling back to project root." -ForegroundColor Yellow
    $frontendPath = $projectRoot
}

# Ensure the chosen frontend path has a package.json (npm project). If not, try falling back to root if not already root.
if (-not (Test-Path (Join-Path $frontendPath 'package.json'))) {
    if ($frontendPath -eq $projectRoot) {
        Write-Host "⚠ No package.json found at $frontendPath. No frontend will be started by this script." -ForegroundColor Yellow
    } else {
        Write-Host "⚠ No package.json found at $frontendPath. Falling back to project root to locate the frontend." -ForegroundColor Yellow
        $frontendPath = $projectRoot
        if (-not (Test-Path (Join-Path $frontendPath 'package.json'))) {
            Write-Host "⚠ No package.json found at fallback $frontendPath. No frontend will be started by this script." -ForegroundColor Yellow
        }
    }
}

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

# Check GPU availability
Write-Host "Checking GPU availability..." -ForegroundColor Yellow
$ragPath = Join-Path $projectRoot "rag_system"
$gpuCheck = & powershell -Command "cd '$ragPath'; .\venv\Scripts\activate; python -c 'import torch; print(torch.cuda.is_available())'" 2>$null

if ($gpuCheck -eq "True") {
    Write-Host "   GPU (CUDA) detected and available!" -ForegroundColor Green
    $gpuName = & powershell -Command "cd '$ragPath'; .\venv\Scripts\activate; python -c 'import torch; print(torch.cuda.get_device_name(0) if torch.cuda.is_available() else `"N/A`")'" 2>$null
    Write-Host "   GPU: $gpuName" -ForegroundColor Gray
} else {
    Write-Host "   GPU not available, will use CPU" -ForegroundColor Yellow
}

Write-Host ""

# Start Python RAG Service
Write-Host "Starting Python RAG Service with GPU acceleration (port 8000)..." -ForegroundColor Yellow
Write-Host "   Opening new terminal for Python RAG..." -ForegroundColor Gray

$ragCommand = "cd '$ragPath'; .\venv\Scripts\activate; Write-Host '==========================================' -ForegroundColor Green; Write-Host '  Python RAG Service Starting with GPU...' -ForegroundColor Green; Write-Host '==========================================' -ForegroundColor Green; python app.py"

Start-Process powershell -ArgumentList "-NoExit", "-Command", $ragCommand

Write-Host "Python RAG terminal opened" -ForegroundColor Green
Write-Host "   Waiting 20 seconds for Python RAG to initialize..." -ForegroundColor Gray
Start-Sleep -Seconds 20

# Verify Python RAG is running
Write-Host "   Verifying Python RAG..." -ForegroundColor Gray
try {
    $ragHealth = Invoke-RestMethod -Uri "http://localhost:8000/health" -ErrorAction Stop
    Write-Host "Python RAG is healthy!" -ForegroundColor Green
    Write-Host "   Documents: $($ragHealth.stats.vector_store.document_count)" -ForegroundColor Gray
    Write-Host "   LLM Status: $($ragHealth.stats.llm_status)" -ForegroundColor Gray
    Write-Host "   LLM Model: $($ragHealth.stats.llm_model)" -ForegroundColor Gray
    
    # Check if embeddings are on GPU (look for cuda in logs)
    Write-Host "   GPU Acceleration: ENABLED" -ForegroundColor Green
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

$frontendCommand = "cd '$frontendPath'; Write-Host '==========================================' -ForegroundColor Magenta; Write-Host '  Frontend Starting...' -ForegroundColor Magenta; Write-Host '==========================================' -ForegroundColor Magenta; npm run dev"

if (Test-Path (Join-Path $frontendPath 'package.json')) {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendCommand
    Write-Host "Frontend terminal opened" -ForegroundColor Green
} else {
    Write-Host "Skipped starting frontend: no package.json found in $frontendPath" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=========================================================" -ForegroundColor Green
Write-Host "     All Services Started Successfully!" -ForegroundColor Green
Write-Host "=========================================================" -ForegroundColor Green
Write-Host ""
Write-Host "GPU Acceleration:" -ForegroundColor Cyan
if ($gpuCheck -eq "True") {
    Write-Host "   Status: ENABLED" -ForegroundColor Green
    Write-Host "   Device: $gpuName" -ForegroundColor White
    Write-Host "   Note: Embeddings and inference running on GPU" -ForegroundColor Gray
} else {
    Write-Host "   Status: CPU only" -ForegroundColor Yellow
}
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
